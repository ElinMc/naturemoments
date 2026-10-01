#!/usr/bin/env python3
"""
Klets - mine class recordings for the phrases that come up most, and cut them.

Give it one or more recordings with their Soniox transcripts (Dutch, with timestamps) and,
optionally, the Soniox English translations. It counts words and multi-word phrases across
all recordings, picks the ones that recur, finds the clearest spoken example of each in the
teacher's voice, cuts a phrase clip and a full-sentence clip, and writes phrases.json for the app.

    python3 klets_class.py --out ~/klets-class \
        --audio les1.m4a --transcript les1.srt --translation les1.en.srt \
        --audio les2.m4a --transcript les2.srt --translation les2.en.srt

Transcript formats: .srt, .vtt, Soniox JSON (tokens with start_ms/end_ms), whisper.cpp JSON.
A plain .txt transcript has no timestamps, so the tool then transcribes the audio itself with
Whisper for timing and uses the .txt only for counting.

Options worth knowing:
    --speaker "Speaker 1"   keep only this speaker's segments (the teacher) when the transcript has labels
    --top 40 --min-count 3  how many phrases, and how often a phrase must occur
    --ngram 2 6             phrase length in words
    --words 40              how many single words to list in the report
    --refine                use Whisper word timestamps to cut the phrase tightly (needs whisper.cpp)
    --examples 2            how many example sentences to cut per phrase

Needs ffmpeg. Whisper only for --refine or .txt transcripts. Standard library only. Nothing is uploaded.
"""
import argparse, json, os, re, shutil, subprocess, sys, tempfile, difflib, pathlib, datetime, collections

STOP = set("""de het een en of maar dat die dit is zijn was waren ben bent heb hebt heeft hebben had hadden ik je jij u we wij
jullie ze zij hij hem haar ons onze mijn jouw uw hun er hier daar niet geen wel ook nog al te aan in op van voor met bij om
naar uit over door als dan want dus toch nou nu zo heel erg ja nee oké ok eh euh hè he hoor eens even maar ge gij""".split())

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise SystemExit(f"command failed: {' '.join(cmd)}\n{r.stderr[-2000:]}")
    return r

def norm(t):
    t = t.lower().replace("’", "'").replace("'t ", "het ")
    t = re.sub(r"[^a-zà-ÿ0-9' ]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()

def words(t):
    return norm(t).split()

# ---------- transcript readers ----------

def ts_to_s(ts):
    ts = ts.strip().replace(",", ".")
    parts = ts.split(":")
    parts = [float(p) for p in parts]
    while len(parts) < 3:
        parts.insert(0, 0.0)
    return parts[0] * 3600 + parts[1] * 60 + parts[2]

def read_srt(path):
    txt = pathlib.Path(path).read_text(encoding="utf-8", errors="replace")
    segs = []
    for block in re.split(r"\n\s*\n", txt.strip()):
        lines = [l.strip() for l in block.strip().splitlines() if l.strip()]
        if not lines:
            continue
        tl = next((l for l in lines if "-->" in l), None)
        if not tl:
            continue
        a, b = [ts_to_s(x) for x in tl.split("-->")[:2]]
        text_lines = [l for l in lines if "-->" not in l and not re.fullmatch(r"\d+", l) and l.upper() != "WEBVTT"]
        text = " ".join(text_lines)
        spk = None
        m = re.match(r"^(?:\[|<v )?([^\]:>]{1,40})(?:\]|>)?:\s*(.*)$", text)
        if m and len(m.group(1).split()) <= 3 and not m.group(1)[0].islower():
            spk, text = m.group(1).strip(), m.group(2)
        text = re.sub(r"<[^>]+>", "", text).strip()
        if text:
            segs.append({"start": a, "end": b, "text": text, "speaker": spk})
    return segs

def read_json(path):
    data = json.loads(pathlib.Path(path).read_text(encoding="utf-8"))
    if isinstance(data, dict) and "tokens" in data:               # Soniox API style
        segs, cur = [], None
        for t in data["tokens"]:
            txt = t.get("text", "")
            if txt in ("<end>", "<fin>") or not txt:
                continue
            spk = str(t.get("speaker", "")) or None
            s, e = t.get("start_ms", 0) / 1000.0, t.get("end_ms", 0) / 1000.0
            new = cur is None or spk != cur["speaker"] or s - cur["end"] > 1.0 or cur["text"].rstrip().endswith((".", "?", "!"))
            if new:
                cur = {"start": s, "end": e, "text": "", "speaker": spk, "words": []}; segs.append(cur)
            cur["text"] += txt; cur["end"] = e
            cur["words"].append({"w": txt.strip(), "start": s, "end": e})
        for s in segs:
            s["text"] = s["text"].strip()
        return [s for s in segs if s["text"]]
    if isinstance(data, dict) and "transcription" in data:        # whisper.cpp
        return [{"start": s["offsets"]["from"] / 1000.0, "end": s["offsets"]["to"] / 1000.0, "text": s["text"].strip(), "speaker": None}
                for s in data["transcription"] if s.get("text", "").strip()]
    if isinstance(data, list) and data and "start" in data[0]:
        return [{"start": float(s["start"]), "end": float(s["end"]), "text": s.get("text", "").strip(), "speaker": s.get("speaker")} for s in data]
    raise SystemExit(f"unrecognised JSON transcript: {path}")

def read_transcript(path, audio, whisper):
    ext = pathlib.Path(path).suffix.lower()
    if ext in (".srt", ".vtt"):
        return read_srt(path)
    if ext == ".json":
        return read_json(path)
    if ext == ".txt":
        if not whisper:
            raise SystemExit(f"{path} has no timestamps; add --refine (Whisper) so the audio can be timed")
        print(f"  {os.path.basename(path)} has no timestamps: timing the audio with Whisper")
        return whisper.segments(audio)
    raise SystemExit(f"unsupported transcript: {path}")

# ---------- whisper ----------

class Whisper:
    def __init__(self, binary, model, lang):
        self.bin = shutil.which(binary or "") or shutil.which("whisper-cli") or shutil.which("whisper-cpp")
        d = os.environ.get("KLETS_MODEL_DIR", os.path.expanduser("~/.klets/models"))
        self.model = model or next((os.path.join(d, m) for m in ["ggml-large-v3-turbo.bin", "ggml-large-v3.bin", "ggml-medium.bin", "ggml-small.bin"] if os.path.exists(os.path.join(d, m))), None)
        self.lang = lang
        self.ok = bool(self.bin and self.model)
    def _wav(self, src, a=None, b=None):
        tmp = tempfile.NamedTemporaryFile(suffix=".wav", delete=False); tmp.close()
        cmd = ["ffmpeg", "-y", "-v", "error"]
        if a is not None: cmd += ["-ss", f"{a:.3f}", "-to", f"{b:.3f}"]
        cmd += ["-i", src, "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", tmp.name]
        run(cmd); return tmp.name
    def segments(self, audio):
        wav = self._wav(audio); base = wav[:-4]
        run([self.bin, "-m", self.model, "-l", self.lang, "-oj", "-of", base, "-f", wav])
        segs = read_json(base + ".json"); os.remove(wav); os.remove(base + ".json"); return segs
    def word_times(self, audio, a, b):
        wav = self._wav(audio, a, b); base = wav[:-4]
        run([self.bin, "-m", self.model, "-l", self.lang, "-ml", "1", "-oj", "-of", base, "-f", wav])
        data = json.loads(pathlib.Path(base + ".json").read_text(encoding="utf-8"))
        out = [{"w": s["text"].strip(), "start": a + s["offsets"]["from"] / 1000.0, "end": a + s["offsets"]["to"] / 1000.0}
               for s in data["transcription"] if s.get("text", "").strip()]
        os.remove(wav); os.remove(base + ".json"); return out

# ---------- frequency ----------

def mine(segs, nmin, nmax, min_count):
    phrases = collections.Counter(); occ = collections.defaultdict(list); wc = collections.Counter()
    for si, s in enumerate(segs):
        for w in words(s["text"]):
            if w not in STOP and len(w) > 2:
                wc[w] += 1
        # phrases never cross a comma, full stop or question mark
        offset = 0
        for clause in re.split(r"[.,;:!?]+", s["text"]):
            ws = words(clause)
            for n in range(nmin, nmax + 1):
                for i in range(len(ws) - n + 1):
                    g = tuple(ws[i:i + n])
                    if all(w in STOP for w in g) and n <= 2:
                        continue
                    if g[0] in ("en", "of", "maar", "dat") and n == 2:
                        continue
                    phrases[g] += 1; occ[g].append((si, offset + i))
            offset += len(ws)
    kept = {g: c for g, c in phrases.items() if c >= min_count}
    # drop a phrase that is contained in a longer kept phrase with the same count
    final = {}
    for g, c in kept.items():
        gs = " ".join(g)
        if any(len(h) > len(g) and kept[h] == c and (" " + gs + " ") in (" " + " ".join(h) + " ") for h in kept):
            continue
        final[g] = c
    scored = sorted(final.items(), key=lambda kv: (-(kv[1] * (1 + 0.35 * (len(kv[0]) - 1))), -len(kv[0])))
    return scored, occ, wc

def best_occurrence(g, occ, segs, prefer_speaker):
    cands = []
    for si, i in occ[g]:
        s = segs[si]; n = len(words(s["text"])); dur = s["end"] - s["start"]
        cover = len(g) / max(n, 1)
        spk_ok = 1 if (prefer_speaker is None or s.get("speaker") == prefer_speaker) else 0
        cands.append((spk_ok, cover, -dur, si, i))
    cands.sort(reverse=True)
    return cands[0][3], cands[0][4]

def locate(g, wordtimes):
    target = " ".join(g); n = len(g); best, bi = 0.0, None
    toks = [norm(w["w"]) for w in wordtimes]
    for i in range(0, max(1, len(toks) - n + 1)):
        sc = difflib.SequenceMatcher(None, " ".join(toks[i:i + n]), target).ratio()
        if sc > best: best, bi = sc, i
    if bi is None or best < 0.6: return None
    return wordtimes[bi]["start"], wordtimes[bi + n - 1]["end"], best

def export(src, a, b, dst, bitrate="64k"):
    run(["ffmpeg", "-y", "-v", "error", "-ss", f"{a:.3f}", "-to", f"{b:.3f}", "-i", src,
         "-af", "loudnorm=I=-18:TP=-1.5:LRA=7", "-ac", "1", "-ar", "44100", "-c:a", "aac", "-b:a", bitrate, "-movflags", "+faststart", dst])

# ---------- main ----------

def main():
    ap = argparse.ArgumentParser(description="Mine class recordings for frequent phrases and cut them.")
    ap.add_argument("--audio", action="append", required=True)
    ap.add_argument("--transcript", action="append", required=True)
    ap.add_argument("--translation", action="append", default=[])
    ap.add_argument("--out", required=True)
    ap.add_argument("--speaker", help="speaker label of the teacher, as it appears in the transcript")
    ap.add_argument("--top", type=int, default=40)
    ap.add_argument("--min-count", type=int, default=3)
    ap.add_argument("--ngram", type=int, nargs=2, default=[2, 6])
    ap.add_argument("--words", type=int, default=40)
    ap.add_argument("--examples", type=int, default=1)
    ap.add_argument("--refine", action="store_true", help="tighten phrase clips with Whisper word timestamps")
    ap.add_argument("--pad", type=float, default=0.15)
    ap.add_argument("--lang", default="nl")
    ap.add_argument("--model"); ap.add_argument("--whisper-bin")
    args = ap.parse_args()
    if len(args.audio) != len(args.transcript):
        raise SystemExit("give one --transcript per --audio, in the same order")
    whisper = Whisper(args.whisper_bin, args.model, args.lang)
    if args.refine and not whisper.ok:
        raise SystemExit("--refine needs whisper.cpp and a model (run setup-mac.sh)")
    out = pathlib.Path(args.out); (out / "clips").mkdir(parents=True, exist_ok=True)

    segs = []
    for k, (audio, tr) in enumerate(zip(args.audio, args.transcript)):
        print(f"reading {os.path.basename(tr)}")
        ss = read_transcript(tr, audio, whisper if whisper.ok else None)
        en = read_srt(args.translation[k]) if k < len(args.translation) and args.translation[k].lower().endswith((".srt", ".vtt")) else []
        for s in ss:
            s["audio"] = audio; s["file"] = os.path.basename(audio)
            if en:   # translation segment that overlaps most in time
                mid = (s["start"] + s["end"]) / 2
                best = max(en, key=lambda e: min(e["end"], s["end"]) - max(e["start"], s["start"]))
                s["en"] = best["text"] if best["start"] <= mid <= best["end"] or (min(best["end"], s["end"]) - max(best["start"], s["start"])) > 0 else ""
            else:
                s["en"] = ""
        segs += ss
    if args.speaker:
        labels = collections.Counter(s.get("speaker") for s in segs)
        print(f"speakers found: {dict(labels)}")
    print(f"{len(segs)} segments, {sum(len(words(s['text'])) for s in segs)} words")

    scored, occ, wc = mine(segs, args.ngram[0], args.ngram[1], args.min_count)
    top = scored[:args.top]
    print(f"{len(scored)} recurring phrases, keeping {len(top)}")

    stamp = datetime.datetime.now().isoformat(timespec="seconds")
    phrases, report = [], [f"# Class phrases report\n\nRun: {stamp}\nRecordings: {', '.join(os.path.basename(a) for a in args.audio)}\n"]
    report.append(f"## Top {len(top)} phrases (count, words)\n")
    for rank, (g, c) in enumerate(top, 1):
        si, i = best_occurrence(g, occ, segs, args.speaker)
        s = segs[si]; text = " ".join(g)
        pid = f"c{rank:03d}"
        a, b, how, score = s["start"], s["end"], "segment", None
        if args.refine:
            try:
                wt = whisper.word_times(s["audio"], s["start"], s["end"])
                loc = locate(g, wt)
                if loc: a, b, score = loc[0] - args.pad, loc[1] + args.pad, round(loc[2], 2); how = "word"
            except SystemExit as e:
                print(f"  refine failed for {text}: {e}")
        a = max(0.0, a)
        pf = f"{pid}-phrase.m4a"; export(s["audio"], a, b, str(out / "clips" / pf))
        examples = []
        seen = {si}
        ex_list = [(si, i)] + [(sj, j) for sj, j in occ[g] if sj not in seen][:max(0, args.examples - 1)]
        for n_ex, (sj, _) in enumerate(ex_list[:args.examples], 1):
            e = segs[sj]; ef = f"{pid}-zin{n_ex}.m4a"
            export(e["audio"], max(0.0, e["start"] - args.pad), e["end"] + args.pad, str(out / "clips" / ef))
            examples.append({"nl": e["text"], "en": e.get("en", ""), "file": f"clips/{ef}", "duration": round(e["end"] - e["start"], 2),
                             "source": {"file": e["file"], "start": round(e["start"], 2), "end": round(e["end"], 2)}})
        phrases.append({"id": pid, "nl": text, "en": "", "count": c, "words": len(g), "file": f"clips/{pf}", "cut": how, "match": score,
                        "duration": round(b - a, 2), "speaker": s.get("speaker"), "examples": examples,
                        "source": {"file": s["file"], "start": round(a, 2), "end": round(b, 2)}})
        report.append(f"{rank}. **{text}** - {c} times. Example: _{s['text']}_" + (f" ({s['en']})" if s.get("en") else ""))
        print(f"  {rank:3d}. {c:3d}x  {text}")
    report.append(f"\n## Top {args.words} words (without the small function words)\n")
    report += [f"- {w}: {c}" for w, c in wc.most_common(args.words)]
    report.append("\n## Next\n\n- Fill in the `en` field of each phrase in phrases.json (the example sentence translation from Soniox is in `examples[].en` to help).\n- Listen to each phrase clip once; delete any that caught a student or noise.\n- Load the folder in the Klets player.")
    (out / "phrases.json").write_text(json.dumps({"generated": stamp, "mode": "class", "voices": 1, "phrases": phrases}, ensure_ascii=False, indent=2), encoding="utf-8")
    (out / "report.md").write_text("\n".join(report), encoding="utf-8")
    print(f"\nwrote {len(phrases)} phrases with clips to {out}")

if __name__ == "__main__":
    main()

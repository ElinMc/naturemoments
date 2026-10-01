#!/usr/bin/env python3
"""
Klets - turn a recording into phrase clips and a phrase list.

Two ways to use it:

1. Aligned to a recording sheet (the speaker read a klets from recording-A1.md or -A2.md):
   python3 klets_clips.py --audio A1-03-anne.m4a --list ../content/recording-A1.md --klets A1-03 --speaker anne --out ../audio
   The recording is cut on silences, each piece is transcribed with Whisper and matched
   to the expected line. Retakes (the same line said again) keep the last take.

2. Free recording (a conversation, a voice note, a podcast clip):
   python3 klets_clips.py --audio gesprek.m4a --out ~/Desktop/klets-free
   Whisper's own sentence segments become the phrases.

Output in --out:
   clips/<id>.m4a          one clip per phrase, loudness-matched, AAC mono
   phrases.json            the list an app can load (id, nl, en, file, duration, source times)
   report.md               what matched, what did not, what to re-record

Needs: ffmpeg and whisper.cpp on PATH (see setup-mac.sh). Python standard library only.
Whisper runs locally; nothing is uploaded.
"""
import argparse, json, os, re, shutil, subprocess, sys, tempfile, difflib, pathlib, datetime

# ---------- helpers ----------

def run(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, text=True, **kw)
    if r.returncode != 0:
        raise SystemExit(f"command failed: {' '.join(cmd)}\n{r.stderr[-2000:]}")
    return r

def find_whisper(explicit):
    for name in ([explicit] if explicit else []) + ["whisper-cli", "whisper-cpp", "main"]:
        if name and shutil.which(name):
            return shutil.which(name)
    raise SystemExit("whisper.cpp not found. Run setup-mac.sh or pass --whisper-bin.")

def find_model(explicit):
    if explicit:
        return explicit
    d = os.environ.get("KLETS_MODEL_DIR", os.path.expanduser("~/.klets/models"))
    for m in ["ggml-large-v3-turbo.bin", "ggml-large-v3.bin", "ggml-medium.bin", "ggml-small.bin"]:
        p = os.path.join(d, m)
        if os.path.exists(p):
            return p
    raise SystemExit(f"no Whisper model found in {d}. Run setup-mac.sh or pass --model.")

def duration_of(path):
    r = run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path])
    return float(r.stdout.strip())

def to_wav16k(src, dst):
    run(["ffmpeg", "-y", "-v", "error", "-i", src, "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", dst])

def normalise_text(t):
    t = t.lower()
    t = re.sub(r"\([^)]*\)", "", t)            # drop (u), (vraag), (TT)
    t = t.replace("'t", "het").replace("’", "'")
    t = re.sub(r"[^a-zà-ÿ0-9' ]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()

# ---------- silence splitting ----------

def split_on_silence(wav, min_silence, noise_db, min_len, pad):
    total = duration_of(wav)
    r = subprocess.run(["ffmpeg", "-v", "info", "-i", wav, "-af",
                        f"silencedetect=noise={noise_db}dB:d={min_silence}", "-f", "null", "-"],
                       capture_output=True, text=True)
    starts = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", r.stderr)]
    ends = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", r.stderr)]
    # speech segments are the gaps between silences
    cuts = []
    cur = 0.0
    for s, e in zip(starts, ends):
        if s - cur >= min_len:
            cuts.append((cur, s))
        cur = e
    if total - cur >= min_len:
        cuts.append((cur, total))
    if starts and (not ends or starts[-1] > ends[-1]):  # file ends in silence
        pass
    return [(max(0.0, a - pad), min(total, b + pad)) for a, b in cuts]

def cut(wav, a, b, dst):
    run(["ffmpeg", "-y", "-v", "error", "-ss", f"{a:.3f}", "-to", f"{b:.3f}", "-i", wav, "-c", "copy", dst])

# ---------- whisper ----------

def whisper_text(wbin, model, wav, lang):
    r = run([wbin, "-m", model, "-l", lang, "-nt", "-np", "-f", wav])
    return " ".join(line.strip() for line in r.stdout.splitlines() if line.strip())

def whisper_segments(wbin, model, wav, lang, tmp):
    base = os.path.join(tmp, "whole")
    run([wbin, "-m", model, "-l", lang, "-oj", "-of", base, "-f", wav])
    with open(base + ".json", encoding="utf-8") as f:
        data = json.load(f)
    segs = []
    for s in data.get("transcription", []):
        off = s.get("offsets", {})
        text = s.get("text", "").strip()
        if text:
            segs.append((off.get("from", 0) / 1000.0, off.get("to", 0) / 1000.0, text))
    return segs

# ---------- recording sheet ----------

def load_lines(path, klets):
    lines = []
    for line in pathlib.Path(path).read_text(encoding="utf-8").splitlines():
        m = re.match(r"^\| (A[12]-\d\d-\d\d) \| (.+?) \| (.+?) \|$", line)
        if m and m.group(1).startswith(klets + "-"):
            lines.append({"id": m.group(1), "nl": re.sub(r"\s*\((u|vraag|TT)(, (u|vraag|TT))*\)\s*$", "", m.group(2)).strip(), "en": m.group(3).strip()})
    if not lines:
        raise SystemExit(f"no lines for klets {klets} in {path}")
    return lines

def align(segments, expected, min_score):
    """segments: list of (a, b, text). expected: list of dicts in order.
    Walks the segments in order; each one is matched to the best expected line within a window
    of the current position. A repeat of the line just matched is a retake and replaces it."""
    out = {}
    pos = 0
    unmatched = []
    for a, b, text in segments:
        nt = normalise_text(text)
        best, best_i = 0.0, None
        for i in range(max(0, pos - 1), min(len(expected), pos + 4)):
            sc = difflib.SequenceMatcher(None, nt, normalise_text(expected[i]["nl"])).ratio()
            if sc > best:
                best, best_i = sc, i
        if best_i is None or best < min_score:
            unmatched.append({"start": a, "end": b, "heard": text, "score": round(best, 2)})
            continue
        eid = expected[best_i]["id"]
        out[eid] = {"start": a, "end": b, "heard": text, "score": round(best, 2), "retake": eid in out}
        pos = best_i + 1
    return out, unmatched

# ---------- output ----------

def export_clip(src, a, b, dst, bitrate):
    run(["ffmpeg", "-y", "-v", "error", "-ss", f"{a:.3f}", "-to", f"{b:.3f}", "-i", src,
         "-af", "loudnorm=I=-18:TP=-1.5:LRA=7,afade=t=in:d=0.01,afade=t=out:st=0:d=0",
         "-ac", "1", "-ar", "44100", "-c:a", "aac", "-b:a", bitrate, "-movflags", "+faststart", dst])

def main():
    ap = argparse.ArgumentParser(description="Turn a recording into phrase clips and a phrase list.")
    ap.add_argument("--audio", required=True, help="input recording (.m4a, .wav, .mp3, .flac ...)")
    ap.add_argument("--out", required=True, help="output folder")
    ap.add_argument("--list", help="recording sheet (recording-A1.md or recording-A2.md) for aligned mode")
    ap.add_argument("--klets", help="klets id to align to, e.g. A1-03")
    ap.add_argument("--speaker", default="", help="speaker name, added to clip file names")
    ap.add_argument("--lang", default="nl")
    ap.add_argument("--model", help="path to ggml model file")
    ap.add_argument("--whisper-bin", help="whisper.cpp binary (default: whisper-cli on PATH)")
    ap.add_argument("--min-silence", type=float, default=0.7, help="seconds of silence that separate phrases")
    ap.add_argument("--noise-db", type=float, default=-35.0, help="silence threshold in dB")
    ap.add_argument("--min-len", type=float, default=0.35, help="ignore pieces shorter than this (seconds)")
    ap.add_argument("--pad", type=float, default=0.12, help="seconds kept before and after each phrase")
    ap.add_argument("--min-score", type=float, default=0.55, help="lowest text match accepted in aligned mode")
    ap.add_argument("--bitrate", default="64k")
    ap.add_argument("--keep-original-audio", action="store_true", help="cut clips from the original file instead of the 16 kHz working copy")
    args = ap.parse_args()

    if bool(args.list) != bool(args.klets):
        raise SystemExit("--list and --klets go together")
    wbin = find_whisper(args.whisper_bin)
    model = find_model(args.model)
    out = pathlib.Path(args.out); (out / "clips").mkdir(parents=True, exist_ok=True)
    src_for_clips = args.audio if args.keep_original_audio else None

    with tempfile.TemporaryDirectory() as tmp:
        wav = os.path.join(tmp, "work.wav")
        to_wav16k(args.audio, wav)
        clip_src = src_for_clips or wav
        phrases, report = [], []
        stamp = datetime.datetime.now().isoformat(timespec="seconds")

        if args.list:
            expected = load_lines(args.list, args.klets)
            pieces = split_on_silence(wav, args.min_silence, args.noise_db, args.min_len, args.pad)
            print(f"{len(pieces)} pieces found, {len(expected)} lines expected")
            segs = []
            for i, (a, b) in enumerate(pieces):
                piece = os.path.join(tmp, f"p{i:03d}.wav")
                cut(wav, a, b, piece)
                text = whisper_text(wbin, model, piece, args.lang)
                segs.append((a, b, text))
                print(f"  {a:7.2f}-{b:7.2f}  {text}")
            matched, unmatched = align(segs, expected, args.min_score)
            missing = [e for e in expected if e["id"] not in matched]
            suffix = f"-{args.speaker}" if args.speaker else ""
            for e in expected:
                m = matched.get(e["id"])
                if not m:
                    continue
                fname = f"{e['id']}{suffix}.m4a"
                export_clip(clip_src, m["start"], m["end"], str(out / "clips" / fname), args.bitrate)
                phrases.append({"id": e["id"], "nl": e["nl"], "en": e["en"], "speaker": args.speaker,
                                "file": f"clips/{fname}", "duration": round(m["end"] - m["start"], 2),
                                "heard": m["heard"], "match": m["score"], "retake": m["retake"],
                                "source": {"file": os.path.basename(args.audio), "start": round(m["start"], 2), "end": round(m["end"], 2)}})
            report.append(f"# Klets clips report - {args.klets} {args.speaker}\n\nRun: {stamp}\nInput: {args.audio}\n")
            report.append(f"Expected {len(expected)} lines, matched {len(matched)}, missing {len(missing)}, unmatched pieces {len(unmatched)}.\n")
            if missing:
                report.append("## Missing lines (re-record these)\n")
                report += [f"- {e['id']}  {e['nl']}" for e in missing] + [""]
            low = [p for p in phrases if p["match"] < 0.8]
            if low:
                report.append("## Weak matches (listen and check)\n")
                report += [f"- {p['id']}  expected: {p['nl']}  |  heard: {p['heard']}  ({p['match']})" for p in low] + [""]
            if unmatched:
                report.append("## Pieces that matched nothing\n")
                report += [f"- {u['start']:.2f}-{u['end']:.2f}  heard: {u['heard']}" for u in unmatched] + [""]
        else:
            segs = whisper_segments(wbin, model, wav, args.lang, tmp)
            print(f"{len(segs)} segments")
            base = re.sub(r"[^A-Za-z0-9]+", "-", pathlib.Path(args.audio).stem).strip("-") or "rec"
            for i, (a, b, text) in enumerate(segs, 1):
                a2, b2 = max(0.0, a - args.pad), b + args.pad
                pid = f"{base}-{i:03d}"
                fname = f"{pid}.m4a"
                export_clip(clip_src, a2, b2, str(out / "clips" / fname), args.bitrate)
                phrases.append({"id": pid, "nl": text, "en": "", "speaker": args.speaker, "file": f"clips/{fname}",
                                "duration": round(b2 - a2, 2), "source": {"file": os.path.basename(args.audio), "start": round(a, 2), "end": round(b, 2)}})
                print(f"  {a:7.2f}-{b:7.2f}  {text}")
            report.append(f"# Klets clips report - free mode\n\nRun: {stamp}\nInput: {args.audio}\n{len(phrases)} phrases. Fill in the English column in phrases.json, or leave it empty for listening-only practice.\n")

        data = {"generated": stamp, "source": os.path.basename(args.audio), "mode": "aligned" if args.list else "free",
                "klets": args.klets, "voices": 1, "phrases": phrases}
        pj = out / "phrases.json"
        if args.list and pj.exists():
            # a second speaker for the same klets: keep the first speaker's clip as file, add this one as file2
            try:
                old = json.loads(pj.read_text(encoding="utf-8"))
            except Exception:
                old = None
            if old and old.get("klets") == args.klets and old.get("phrases"):
                byid = {p["id"]: p for p in old["phrases"]}
                for p in phrases:
                    o = byid.get(p["id"])
                    if o and o.get("speaker") != args.speaker:
                        o["file2"] = p["file"]; o["speaker2"] = args.speaker; o["duration2"] = p["duration"]
                    elif o:
                        byid[p["id"]] = p
                    else:
                        byid[p["id"]] = p
                merged = [byid[e["id"]] for e in expected if e["id"] in byid]
                data = {**old, "generated": stamp, "voices": 2 if any("file2" in p for p in merged) else 1, "phrases": merged}
                print("merged with the existing phrases.json as a second voice")
        pj.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        (out / "report.md").write_text("\n".join(report), encoding="utf-8")
        print(f"\nwrote {len(phrases)} clips to {out/'clips'}, plus phrases.json and report.md")

if __name__ == "__main__":
    main()

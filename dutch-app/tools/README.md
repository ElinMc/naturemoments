# Klets tools - from a recording to phrase clips

Two tools. `klets_clips.py` cuts a recording of someone reading a sheet (or any recording) into phrase clips. `klets_class.py` mines long class recordings for the phrases the teacher says most and cuts those. Both write a folder the player in `../app` opens directly.

`klets_clips.py` takes any recording (.m4a from Voice Memos, the Soniox app, a WAV from Audacity) and produces:

- `clips/<id>.m4a` - one loudness-matched mono AAC clip per phrase (plays in every browser, including Safari)
- `phrases.json` - the list an app loads: id, Dutch text, English prompt, file, duration, where it came from
- `report.md` - what matched, what was weak, what is missing and needs re-recording

Whisper runs on the Mac. No audio leaves the machine. The model weights are OpenAI's (US origin, downloaded once from Hugging Face); after that everything is offline. That is the same position as the sovereignty table in VISION.md: self-hosted Whisper is acceptable, a US speech API is not.

## One-time setup on the Mac

```bash
cd dutch-app/tools
bash setup-mac.sh
```

Installs ffmpeg and whisper.cpp with Homebrew and downloads the `large-v3-turbo` model (about 1.6 GB) to `~/.klets/models`. Needs Homebrew (brew.sh). On Apple Silicon Whisper uses the GPU through Metal; a five-minute recording transcribes in well under a minute.

## Mode 1: a speaker read a klets from the recording sheet

```bash
python3 klets_clips.py --audio ~/Downloads/A1-03-anne.m4a \
  --list ../content/recording-A1.md --klets A1-03 --speaker anne --out ../audio
```

The recording is cut wherever there is 0.7 s of silence, each piece is transcribed and matched against the expected lines in order. If the speaker said a line twice, the last take wins. Then read `report.md`: missing lines and weak matches are the re-record list. Clips are named `A1-03-07-anne.m4a`, so two speakers never collide.

Useful knobs: `--min-silence 0.5` if the speaker paused less than asked; `--noise-db -30` in a noisier room; `--min-score 0.45` if Whisper mishears a dialect word but the timing is right; `--keep-original-audio` to cut from the original file rather than the 16 kHz working copy (better quality, slower).

## Mode 2: a free recording

```bash
python3 klets_clips.py --audio ~/Downloads/gesprek.m4a --out ~/Desktop/klets-free
```

Whisper's own sentence segments become phrases. The English column is empty; fill it in `phrases.json` by hand or leave it empty for listening practice. This is the mode for vocabulary from real life: ask your Flemish speaker to talk you through a shop visit or a school letter, record it, run the script, and you have clips of exactly the phrases you will meet.

## Class recordings: klets_class.py

```bash
python3 klets_class.py --out ~/klets-class --speaker "Speaker 1" --top 40 --min-count 3 \
  --audio les1.m4a --transcript les1.srt --translation les1.en.srt \
  --audio les2.m4a --transcript les2.srt --translation les2.en.srt
```

Export the Dutch transcript from Soniox with timestamps (SRT or VTT is ideal; Soniox JSON with tokens also works) and the English translation as SRT too. The tool counts every two-to-six-word phrase across all the lessons, keeps the ones that recur, drops phrases that cross a comma or full stop, and for each one finds the clearest example in the teacher's voice (give the teacher's speaker label with `--speaker`). It writes:

- `clips/c001-phrase.m4a` - the phrase, cut from the sentence (tight when you add `--refine`, which uses Whisper word timestamps; otherwise the whole sentence)
- `clips/c001-zin1.m4a` - the full sentence it came from, plus more examples with `--examples 2`
- `phrases.json` - phrase, count, clip, example sentences with their Soniox English
- `report.md` - the top phrases with counts, the top words, and what to do next

If the Soniox export has no timestamps (plain text), the tool times the audio with Whisper itself; `--refine` then needs the setup from `setup-mac.sh`.

Honest limits: a classroom recording has students, noise and overlap. Expect to delete a quarter of the clips after listening once. The counting is on the transcript, so Soniox mishearings count too; the report shows the example sentence so you can spot them.

## phrases.json shape

```json
{ "mode": "aligned", "klets": "A1-03", "phrases": [
  { "id": "A1-03-07", "nl": "gaan", "en": "to go", "speaker": "anne",
    "file": "clips/A1-03-07-anne.m4a", "duration": 0.9,
    "heard": "gaan", "match": 1.0, "retake": false,
    "source": { "file": "A1-03-anne.m4a", "start": 12.4, "end": 13.3 } } ] }
```

## Limits worth knowing

- Whisper is good at Dutch and reasonable at Flemish, but it will mishear tussentaal words and short single words. In aligned mode that rarely matters because the expected text does the work. In free mode, check the text before you learn from it.
- Silence splitting needs real pauses. Two phrases with no gap come out as one clip.
- The script does not translate. A later step can add DeepL (Cologne, EU) for the English column in free mode.

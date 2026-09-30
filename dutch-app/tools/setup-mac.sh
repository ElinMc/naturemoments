#!/bin/bash
# Klets - one-time setup of Whisper and ffmpeg on a Mac.
# Run:  bash setup-mac.sh
# Everything runs locally on the Mac. No audio leaves the machine.
set -euo pipefail

MODEL="${KLETS_WHISPER_MODEL:-large-v3-turbo}"
MODEL_DIR="${KLETS_MODEL_DIR:-$HOME/.klets/models}"

echo "== Klets setup =="

if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew is not installed. Install it first from https://brew.sh (one command), then run this script again."
  exit 1
fi

echo "-- Installing ffmpeg and whisper.cpp with Homebrew"
brew list ffmpeg >/dev/null 2>&1 || brew install ffmpeg
brew list whisper-cpp >/dev/null 2>&1 || brew install whisper-cpp

if command -v whisper-cli >/dev/null 2>&1; then WBIN=whisper-cli
elif command -v whisper-cpp >/dev/null 2>&1; then WBIN=whisper-cpp
else echo "whisper.cpp installed but no whisper-cli or whisper-cpp binary found on PATH"; exit 1; fi
echo "   whisper binary: $WBIN"

mkdir -p "$MODEL_DIR"
FILE="$MODEL_DIR/ggml-$MODEL.bin"
if [ ! -f "$FILE" ]; then
  echo "-- Downloading Whisper model $MODEL (about 1.6 GB, once) to $FILE"
  echo "   Source: Hugging Face (ggerganov/whisper.cpp). This is the one download from outside the EU; the model then runs offline."
  curl -L --progress-bar -o "$FILE.part" "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-$MODEL.bin"
  mv "$FILE.part" "$FILE"
else
  echo "-- Model already present: $FILE"
fi

echo "-- Checking python3"
python3 --version

echo
echo "Done. Test with:"
echo "  python3 klets_clips.py --audio ~/Downloads/A1-01-anne.m4a --list ../content/recording-A1.md --klets A1-01 --speaker anne --out ../audio"
echo "or, for a free recording with no list:"
echo "  python3 klets_clips.py --audio ~/Downloads/gesprek.m4a --out ~/Desktop/klets-free"

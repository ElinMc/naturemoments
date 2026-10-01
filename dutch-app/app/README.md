# Klets player (stage 1)

One HTML file, no build step, no dependencies. It plays the SaySomethingin loop over any folder made by the tools in `../tools`: English prompt, pause, you speak, then the Flemish voice (and a second voice when there is one). During a klets the screen never shows Dutch. See `../METHOD.md`.

## Use it on the Mac now

1. Make a folder with one of the tools (`klets_clips.py` or `klets_class.py`). It contains `phrases.json` and `clips/`.
2. Open `index.html` in Safari or Chrome (double-click it).
3. Press "Open a klets folder" and pick that folder. Press "Start je klets".

The English prompt is spoken by the Mac's built-in English voice (on-device, nothing sent anywhere); switch to "text only" in the settings if you prefer. Progress is remembered per folder in the browser.

## Use it on the phone

Phones cannot pick a folder, so the phone version is served from the web: put `index.html` next to a `phrases.json` and its `clips/` folder on the server (klets.mclworks.eu) and open the URL. The player loads `phrases.json` from the same folder on its own. Add it to the home screen. That is Part B of `../SETUP.md`.

## What it does with the two kinds of folder

- **Aligned recordings** (klets_clips.py with a recording sheet): each line has its own English prompt. With two speakers merged into one folder you hear voice one then voice two, as in the method.
- **Class recordings** (klets_class.py): a phrase without its own English prompt is practised through the sentence the teacher said it in: you hear the English of the sentence, you say it, you hear the teacher say the sentence, then the phrase alone. Fill in `en` in `phrases.json` for a phrase to practise it on its own.

## Weaving old material in

A klets is up to 18 items. After every four new items the player brings back two earlier ones at random from the last sixteen, so nothing is heard once and forgotten. Proper authored interleaving across kletsen comes with the scripted content in stage 2.

## Not here yet

Daily email, two profiles with login, listening at speed, the review block, offline packs. Those are stage 2 and need the server from `../SETUP.md`.

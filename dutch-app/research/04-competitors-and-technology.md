# Research briefing 4: competitors, architecture, audio, speech, spaced repetition, pricing and legal

Research date: 21 September 2026. About 60 web searches plus direct fetches of Apple Developer, GitHub and Microsoft docs. Several vendor and review sites were blocked by the research sandbox's proxy, so some figures rest on secondary sources and are marked **[unverified]**.

## 1. Competitors for learning Dutch (2026)

| Product | Price (approx.) | Method | Strengths | Gaps |
|---|---|---|---|---|
| **Duolingo Dutch** | Free with ads; Super about €9.25 a month on annual in the EU **[UK price unverified]** | Gamified tap and translate exercises; CEFR-labelled sections | Largest user base; fast early progress | 6 sections and 123 units as of 2022; 2026 reviews say it plateaus around A2, "speaking is mostly fake", de/het under-taught, no real listening at native speed |
| **Babbel Dutch** | About $8.95 a month on annual; $299 lifetime all languages | Structured lessons with explicit grammar, 10 to 15 min each | Rated best paid app for Dutch by DutchReview; teaches word order | Covers A1 to B1; speaking is recognition-based |
| **Pimsleur Dutch** | $19.95 a month | Audio only, graduated-interval recall, speak in the pause | Closest analogue to the SSi method | **Only one level (30 x 30-min lessons, about 15 h)**; most Pimsleur languages have up to five |
| **Michel Thomas Dutch** | Foundation and Intermediate via the Michel Thomas app **[price unverified]** | Teacher plus two students; build sentences from blocks | Good for structure and confidence in 15 to 20 h | Two courses only, years old; no spaced repetition, no listening at speed |
| **Language Transfer** | Free | Thinking-method audio | | **No Dutch course** (confirmed) |
| **Mondly Dutch** | $9.99 a month, $89.99 lifetime | Short gamified lessons, chatbot | Cheap | "You'll outgrow Mondly inside a month"; chat is a multiple-choice tree |
| **Busuu Dutch** | $13.95 a month, $83.40 a year | CEFR-structured A1 to B2, community correction | Broadest CEFR coverage | Text first; speaking practice weak |
| **Memrise** | Freemium | Native-speaker video clips plus word-list SRS | Native video | Community courses removed in 2024; vocabulary-centric |
| **Bart de Pau / learndutch.org / dutchgrammar.com** | Free YouTube plus paid video grammar course; summer school €634 for 40 academic hours | Video grammar lessons | Very popular with expats; strong grammar explanations | Grammar first; no speak-in-the-pause, no chunk SRS |
| **DutchPod101** | About $9.99 a month | Podcast-style lessons | Big library | Mostly beginner; passive |
| **The Dutch Online Academy** | Free podcasts plus paid Zoom courses | Live small-group teaching | Human teachers | Not an app |
| **Oefenen.nl** | Free | Foundation platform for basic skills | Free | Aimed at low-literacy adults; reading and writing centred |
| **TaalCompleet** (KleurRijker) | Book plus e-learning licence | Inburgering textbook series | Aligned to the inburgering exam | Coursebook model |
| **Inburgering apps** (inburgering.app, Inburgering Coach €14.99 a month) | | AI feedback on speaking and writing | Exam-focused | Not a spoken course |
| **SaySomethingin Dutch** | Standard monthly subscription **[price unverified]** | SSi method | Free Tourist course plus Course 1; "Dutch course 3" discussed on forum | Older format; presence in the new app unverified |

**Does the gap exist?** Partly. Pure audio speak-in-the-pause Dutch exists (Pimsleur, Michel Thomas, SSi's older Dutch, Glossika's sentence SRS). But every one is **short (about 40 hours or less), several years old, and none combines** (a) a long chunk-based script that keeps recycling learnt pieces, (b) modern spaced repetition on chunks, (c) offline mobile playback and (d) content aimed at expats in the Netherlands needing spoken A2 to B1 for daily life. Duolingo is the default and its 2026 reviews concede it fails on speaking. The market is niche (Dutch is a small learner language and most learners are in NL or BE), so the opportunity is a focused, affordable product rather than a Duolingo competitor.

## 2. Technical architecture: web first, App Store later

### Constraints that drive the decision

- **App Store guideline 4.2 (Minimum Functionality):** "Your app should include features, content, and UI that elevate it beyond a repackaged website." 4.2.2 prohibits apps that are primarily web clippings. 4.2.3(ii): an app that downloads additional resources on first launch must **disclose the size and prompt the user**. The fix for wrapper rejections is native push, genuine offline mode, native purchases and bundled web content.
- **iOS web audio:** an AudioContext is created suspended and must be resumed inside a user gesture; Web Audio is muted by the silent switch unless a silent looping audio element is also started in the same gesture. Safari is the only browser implementing the AudioSession API (still a draft).
- **PWA background and lock-screen audio:** installed iOS home-screen apps historically stop audio when the screen locks or the app is minimised; the Media Session API works in Safari but in a PWA the lock-screen play button stops working after about 30 s paused (Apple Developer Forums thread 762582, unresolved); WebKit bugs 261858 and 261554 partially fixed on iOS 17.5 onward. Wake Lock is unsupported on iOS Safari. **An audio-first course on iOS cannot rely on the WebView or PWA audio stack.**
- **Even inside Capacitor**, HTML5 audio in the WKWebView stops about 15 s after backgrounding (Capacitor discussion 3446). Fix: play through a native plugin (for example `@capgo/capacitor-native-audio`, MPL-2.0: background playback, lock-screen controls, audio session set to playback).
- **Storage:** WebKit's Intelligent Tracking Prevention deletes all script-writable storage (IndexedDB, localStorage, Cache API, Service Worker registrations) after **7 days of Safari use** without interaction with the site. Home-screen web apps have their own days-of-use counter, so an installed PWA that is used is safe, but a bookmark-in-Safari user can lose cached lessons. Use `navigator.storage.persist()` and treat browser caches as disposable.

### Options

| | (a) PWA plus Capacitor | (b) Expo / React Native plus web | (c) Flutter | (d) Native Swift later |
|---|---|---|---|---|
| Web quality | Best (real DOM, any framework) | Good; Expo Router static rendering is production-grade on SDK 54 onward | Weakest for content-heavy web | n/a |
| iOS audio | Native via plugin; must not use WebView audio | expo-audio supports web and iOS background with lock-screen metadata | just_audio plus audio_service mature | Full AVFoundation control |
| 4.2 risk | Medium; mitigated by bundled assets, offline, native audio, IAP, push | Low | Low | Lowest |
| Code sharing | One web codebase, native shell | One RN codebase | One Dart codebase | Two codebases |
| Team fit | Any web stack | React only | Dart | Swift |

### Recommendation

**Build the web app with a standard web framework, ship it as a PWA, and wrap it with Capacitor for the App Store, but route all playback and lesson-asset storage through native plugins on iOS from day one.** The content is HTML-shaped (transcripts, progress, marketing site, SEO) and the web launch comes first; Capacitor keeps that codebase intact while giving a native audio session, Filesystem storage for downloaded audio packs (immune to ITP), StoreKit in-app purchase and push, which is the checklist that gets Capacitor apps through 4.2. Abstract playback behind an interface (WebAudioPlayer versus NativeAudioPlayer). Expo is the credible alternative if the team wants one React runtime. Flutter web or a later Swift rewrite would duplicate work for no user benefit at this stage.

## 3. Audio generation for the Dutch voices

### Human recording
- E-learning narration rates cluster at **$100 to 300 per finished hour**; Dutch-specific rates not captured **[unverified]**.
- A sentence bank is not narration: 6,000 short sentences x 2 speakers is about 5 finished hours per voice, but isolated-sentence recording runs roughly 150 to 250 sentences per studio hour, so budget **25 to 40 studio hours per voice plus editing and segmentation** (forced alignment can cut this). Rough all-in estimate **€3k to 8k per professional voice** **[estimate]**. Semi-professional native speakers plus automated segmentation could bring this to €1.5k to 3k. Advantages: real accent and prosody, no vendor terms. Disadvantage: re-recording every script change.

### Neural TTS (cloud)

| Vendor | Dutch voices | Price per 1M characters | Output rights |
|---|---|---|---|
| **Azure** | nl-NL: FennaNeural (F), MaartenNeural (M), ColetteNeural (F); **Neural HD**: nl-NL-Fleur:MAI-Voice-2, nl-NL-Sander:MAI-Voice-2 (Sander supports styles); nl-BE: DenaNeural, ArnaudNeural | Neural about $15 to 16; HD $22 | Paid tier grants commercial use of output; **free tier does not** |
| **Google** | nl-NL Standard and WaveNet voices A to G; Chirp 3 HD covers nl-NL **[voice list unverified]** | Standard/WaveNet $4, Neural2 $16, Chirp 3 HD $30, Studio $160; free monthly allowances | Output usable in apps under GCP terms; forum guidance warns against redistributing as a standalone media library |
| **Amazon Polly** | nl-NL: **Laura** (neural, 2022), Ruben and Lotte (standard); nl-BE: **Lisa** (neural, 2023) | Neural $16; standard $4; 1M neural characters a month free for 12 months | "Your Polly output belongs to you" |
| **ElevenLabs** | Multilingual v2 (29 languages including Dutch) and v3 (70 plus) | Creator $22 a month for about 121k credits; Pro $99; API about $0.10 per 1k characters **[secondary]** | Commercial licence from Starter tier; Voice Library voices carry per-voice terms |
| **OpenAI gpt-4o-mini-tts** | Dutch supported; no Dutch-native voices | About $0.015 a minute | Standard OpenAI terms; prosody rated more synthetic than specialised vendors |

### Open source
- **Piper** (MIT; repo archived October 2025, development moved to `OHF-Voice/piper1-gpl`, GPL): nl_NL voices mls, mls_5809, mls_7432, pim, ronnie; nl_BE nathalie, rdh. Robotic next to cloud HD voices; check each voice's model-card licence.
- **Coqui XTTS v2**: Dutch supported but weights are non-commercial; company defunct.
- **Kokoro-82M**: Apache-2.0 but **no Dutch**.
- **F5-TTS**: code MIT, pretrained weights CC-BY-NC; not commercial-safe.

### Cost to generate about 6,000 sentences x 2 voices
Assume about 60 characters a sentence, so about 360k characters a voice, **about 720k characters total** (double if the English prompts are also generated):
- Google WaveNet about $3; Azure, Polly or Neural2 about $11 to 12; Azure HD about $16; Chirp 3 HD about $22; Google Studio about $115.
- ElevenLabs about $72 at API rate, or one to two months of Creator or Pro.
- OpenAI about $10.
- Polly's 12-month free tier could make the whole batch free.

Practical advice: generate with two vendors, have a native speaker audit 200 random sentences for stress and the g, ch and ui sounds, and keep the text so regeneration is cheap. Because the audio is heard thousands of times, consider human voices for the highest-frequency chunks and TTS for the long tail.

## 4. Learner speech (optional pronunciation feedback)

- **Web Speech API:** Chrome 25 onward, Safari 14.1 onward. Chrome sends audio to Google servers by default; on-device recognition shipped for 17 languages, Dutch not confirmed **[unverified]**. Safari uses Apple's dictation stack; behaviour in a WKWebView and offline is not guaranteed. Suitable only for rough "did the words come out" checks.
- **Azure Pronunciation Assessment:** **nl-NL is supported** (nl-BE is not). Gives accuracy, fluency, completeness and word or phoneme scores; audio leaves the device (needs a data processing agreement and an EU region).
- **Whisper in the browser:** whisper.cpp WASM runs tiny to small models at 2 to 3x real time; tiny and base Dutch accuracy is poor and it yields transcripts, not pronunciation scores.
- **Is it needed?** SSi-style courses deliberately do not score speech. The feedback loop is self-comparison. Scoring adds latency, microphone permissions, privacy burden and false negatives on a language with regional variation, and it moves attention from meaning to accuracy anxiety. Ship without it; add an optional "compare my recording" (record locally, play back, no scoring) first, and Azure assessment only if users ask for a number.

## 5. Spaced repetition and content model

**Chunks versus sentences.** Represent every target sentence as an ordered composition of chunk IDs (for example `ik_wil` + `graag` + `koffie_drinken`). Chunks are the unit of memory; sentences are the unit of practice. Store chunk-level metadata (level, introduced-in lesson, frequency rank, register) and sentence-level metadata (prompt text, pause length, voices and takes).

**Authored interleaving versus flashcard SRS.** In SSi and Pimsleur the schedule is **baked into the script**: a chunk is introduced, then recombined with older chunks at expanding intervals inside the same lesson and across the next lessons; every learner hears the same sequence. Flashcard SRS (SM-2, FSRS) is adaptive per item. The two are compatible: keep the authored script as the primary experience (no grading, no interruption), and run a lightweight FSRS pass in the background on chunks, using implicit signals (a "that got me" tap, replay count) to select a short recap block or a separate review mode.

**SM-2 versus FSRS.** SM-2 (1987) tracks one ease factor. FSRS models difficulty, stability and retrievability, was trained on about 727M reviews, needs 20 to 30% fewer reviews for the same retention and exposes a "desired retention" setting. `ts-fsrs` (MIT, FSRS-6, TypeScript) is production-ready. Use default parameters.

**Suggested lesson-script JSON**

```json
{
  "courseId": "nl-speak",
  "lessonId": "L07",
  "level": "A1",
  "voices": { "prompt": "en-narrator", "nl": ["nl-f-1", "nl-m-1"] },
  "chunks": {
    "ik_wil": { "nl": "ik wil", "en": "I want", "level": "A1", "introducedIn": "L02" },
    "koffie_drinken": { "nl": "koffie drinken", "en": "to drink coffee", "level": "A1", "introducedIn": "L07" }
  },
  "items": [
    { "type": "intro", "chunk": "koffie_drinken", "audio": { "en": "L07/p01.mp3", "nl": ["L07/f01.mp3", "L07/m01.mp3"] } },
    { "type": "produce",
      "id": "L07-s03",
      "prompt_en": "I want to drink coffee",
      "target_nl": "Ik wil koffie drinken",
      "chunks": ["ik_wil", "koffie_drinken"],
      "pauseMs": 3200,
      "audio": { "prompt": "L07/p03.mp3", "nl": ["L07/f03.mp3", "L07/m03.mp3"] },
      "tags": ["A1", "daily-life", "inburgering:spreken"] }
  ]
}
```

Keep audio file references relative to a versioned pack (`packs/L07-v3.zip`) so the client can download and cache a lesson as a unit and declare the size for guideline 4.2.3(ii).

**Offline-first storage.**
- **Dexie (IndexedDB, Apache-2.0):** simplest, works in browsers and Capacitor; ideal for progress, FSRS state and settings.
- **wa-sqlite (MIT) with OPFS:** relational queries; heavier startup; use if SQL analytics over exposures is wanted. In Capacitor, `@capacitor-community/sqlite` gives native SQLite.
- **Audio blobs:** Cache API on web (request persistence, expect eviction), Capacitor Filesystem on iOS. Never keep the only copy of progress on-device; sync to an EU-hosted backend.

## 6. Monetisation and legal

**Price anchors (2026).** Duolingo Super about €9.25 a month annual in the EU; Babbel about $8 to 15 a month; Busuu $13.95 a month or $83.40 a year; Mondly $9.99 a month or $89.99 lifetime; Pimsleur $19.95 a month; DutchPod101 about $9.99 a month; Inburgering Coach €14.99 a month. A focused Dutch speaking course can sit at **€7 to 10 a month, €50 to 70 a year, or a one-off €60 to 120 a level**. Sell on the web first (Stripe, no store commission) and offer iOS in-app purchase as convenience.

**App Store commission.** Standard 30%; **Small Business Program 15%** under $1M prior-year proceeds; subscriptions drop to 15% after year one. **EU (DMA):** Apple's terms effective 1 October 2026 - IAP 26% (15% small business or second-year subscriptions); in-app alternative payment 20% (10%); link-out to your website 15% (10%) on sales within 7 days of the tap plus a 5% Core Technology Commission. **US:** since the May 2025 Epic v Apple contempt order, US-storefront apps may include external purchase links without an entitlement; the Ninth Circuit (December 2025) upheld the order but held a total ban on commissions overbroad; the Supreme Court will hear Apple's appeal in the term starting October 2026. Practical posture: use IAP inside the app, keep web checkout as the primary channel.

**GDPR basics.** Collect the minimum (email for login, progress events); no microphone audio leaves the device unless the user opts in; host in the EU with a data processing agreement for every processor; retention limits; export and delete self-service; no third-party ad SDKs. GDPR's digital consent age in the Netherlands is 16; simplest is 16 plus terms.

**Naming.** UKIPO and EUIPO could not be queried from the sandbox, so registration status of "SaySomethingin" and "SSi" is **unverified**. Regardless, they are the established brand of a Welsh company that actively sells Dutch; using them, or "Say Something in Dutch", in the name or marketing would invite passing-off claims and App Store metadata rejection. Give the app its own name and describe the approach generically. Do not reuse SSi or Pimsleur scripts; the technique itself is not protectable.

## Could not verify
SaySomethingin Dutch course count and pricing; current Duolingo Dutch unit count; Michel Thomas, Bart de Pau and Dutch Online Academy prices; Google's exact nl-NL voice list; Dutch voice-actor rates; whether Chrome on-device recognition includes nl-NL; UK Super Duolingo price; trademark registrations.

## Sources
- Duolingo Dutch: https://duoplanet.com/duolingo-dutch-review/ ; https://duolingodata.com/dat/nlfen123v2.html ; https://trykaiwa.com/blog/dutch-duolingo-vs-real-speaking-2026 ; https://geopriced.com/cost/duolingo-super
- Round-ups: https://www.mezzoguild.com/online-dutch-courses/ ; https://dutchreview.com/expat/best-apps-to-learn-dutch/
- Babbel: https://testprepinsight.com/resources/how-much-does-babbel-cost/ ; https://learn-dutch-with-ai.com/inburgering/babbel-dutch-course-review/
- Pimsleur: https://www.pimsleur.com/learn-dutch/ ; https://speakfluentreviews.com/pimsleur-cost/
- Michel Thomas: https://michelthomas.com/titles/michel-thomas/foundation-dutch-michel-thomas-method-full-course/9781529397130/
- Language Transfer: https://www.languagetransfer.org/courses
- Mondly: https://www.studyfrenchspanish.com/mondly-review/ ; Busuu: https://www.busuu.com/en/it-works/courses ; Memrise: https://memrise.zendesk.com/hc/en-us/articles/29804562432913
- Bart de Pau: https://www.learndutch.org/ ; https://bartdepau.com/ ; DutchPod101: https://www.dutchpod101.com/pricing ; Dutch Online Academy: https://thedutchonlineacademy.com/en
- Oefenen.nl: https://oefenen.nl/ ; TaalCompleet: https://kleurrijker.nl/taalcompleet-knm/ ; Inburgering apps: https://inburgering.app/
- SaySomethingin: https://en.saysomethingin.com/dutch ; https://en.forum.saysomethingin.com/t/dutch-course-3/10278 ; https://www.saysomethingin.com/pricing
- App Store: https://developer.apple.com/app-store/review/guidelines/ ; https://developer.apple.com/app-store/small-business-program/ ; https://developer.apple.com/support/apps-in-the-eu/ ; https://www.mobiloud.com/blog/app-store-review-guidelines-webview-wrapper/
- EU and US payments: https://www.revenuecat.com/blog/growth/apple-eu-dma-update-june-2025 ; https://law.justia.com/cases/federal/appellate-courts/ca9/25-2935/25-2935-2025-12-11.html ; https://techcrunch.com/2026/04/06/apple-epic-games-lawsuit-supreme-court-appeal-app-store-commission/
- iOS web audio and PWA: https://dbushell.com/2023/03/20/ios-pwa-media-session-api/ ; https://developer.apple.com/forums/thread/762582 ; https://bugs.webkit.org/show_bug.cgi?id=261858 ; https://www.mattmontag.com/web/unlock-web-audio-in-safari-for-ios-and-macos ; https://github.com/ionic-team/capacitor/discussions/3446 ; https://github.com/Cap-go/capacitor-native-audio ; https://capawesome.io/blog/how-to-play-audio-in-the-background-in-capacitor/
- ITP storage: https://support.didomi.io/apple-adds-a-7-day-cap-on-all-script-writable-storage ; https://lapcatsoftware.com/articles/2023/8/5.html
- Expo: https://docs.expo.dev/workflow/web/ ; https://docs.expo.dev/router/web/static-rendering/
- TTS: https://github.com/MicrosoftDocs/azure-ai-docs/blob/main/articles/ai-services/speech-service/includes/language-support/tts.md ; https://learn.microsoft.com/en-us/answers/questions/460557/microsoft-azure-text-to-speech-commercial-usage ; https://cloud.google.com/text-to-speech/pricing ; https://aws.amazon.com/about-aws/whats-new/2022/11/amazon-polly-launches-dutch-ntts-voice ; https://aws.amazon.com/polly/pricing/ ; https://elevenlabs.io/pricing ; https://platform.openai.com/docs/models/gpt-4o-mini-tts ; https://github.com/rhasspy/piper ; https://github.com/hexgrad/kokoro ; https://github.com/coqui-ai/TTS ; https://github.com/SWivid/F5-TTS
- Voice actors: https://voice123.com/pages/categories/dutch-voice-actors/ ; https://voice123.com/blog/voice123/voice-over-pricing/
- Speech: https://github.com/MicrosoftDocs/azure-ai-docs/blob/main/articles/ai-services/speech-service/includes/language-support/pronunciation-assessment.md ; https://github.com/WebAudio/web-speech-api/blob/main/explainers/on-device-speech-recognition.md ; https://github.com/ggml-org/whisper.cpp/blob/master/examples/whisper.wasm/README.md
- SRS and storage: https://github.com/open-spaced-repetition/awesome-fsrs/wiki/ABC-of-FSRS ; https://github.com/open-spaced-repetition/ts-fsrs ; https://github.com/rhashimoto/wa-sqlite ; https://github.com/dexie/Dexie.js ; https://rxdb.info/articles/localstorage-indexeddb-cookies-opfs-sqlite-wasm.html
- GDPR: https://sunbytes.io/blog/software-development/gdpr-compliance-for-mobile-apps/ ; https://www.edpb.europa.eu/news/news/2026/data-protection-day-2026-keeping-childrens-personal-data-safe-online_en

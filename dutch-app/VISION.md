# Zeg het maar - vision and outline for a spoken Dutch app

Working title: **Zeg het maar** ("go on, say it" - the phrase every Dutch shopkeeper uses when it is your turn). Alternatives: *Hardop* (out loud), *Gewoon Zeggen*. The name is a placeholder until you choose one. It must not use "SaySomethingin", "SSi" or "Say Something in Dutch" - that is an existing Welsh company's brand and they sell a Dutch course.

Status: vision and outline only. Nothing has been built. Four research briefings sit in `research/` and this document draws on them.

---

## 1. The vision in one paragraph

An audio-first Dutch course for English-speaking adults who live in the Netherlands, built around the situations of their actual lives. You speak out loud from the first minute. An English prompt, a pause, you say the Dutch, then two native speakers say it. Nothing to read, nothing to type, no flashcards, no streaks. The script recycles what you know into new sentences so that speaking becomes automatic rather than remembered. The course runs from CEFR A1 to B2 along a core spine plus four scenario strands: being sociable, going into shops, doing DIY and being a parent with children at secondary school. Web app first, App Store second.

The promise to the learner: *after your first session you will have said things in Dutch you can use tomorrow, and after Level A2 you will hold your own at the school gate, the bouwmarkt and the kringverjaardag.*

## 2. Who it is for

- **Primary:** English-speaking adults settled in the Netherlands for the medium to long term - partners, parents, people with Dutch employers who work in English. They have tried Duolingo, maybe a course, and still freeze when the neighbour speaks to them.
- **Secondary:** people planning a move, and partners of Dutch speakers living elsewhere.
- **Not for:** inburgering candidates who need reading and writing at exam standard, children, and people who want grammar explained. The app can point them elsewhere.

The four strands are chosen for this person. They are life-stage specific in a way no existing Dutch product is. That is the wedge.

## 3. What the research says (short version)

Full detail is in the four research files. The points that shape the design:

**The market gap is real but narrow.** Speak-in-the-pause Dutch exists: Pimsleur Dutch (one level only, about 15 hours), Michel Thomas Dutch (two courses, years old), and SaySomethingin's own older-format Dutch course. All are short and none goes past low A2 in practice. Duolingo Dutch is the default and its 2026 reviews concede that speaking is where it fails. Babbel and Busuu are text-first. Nobody covers school-parent or DIY Dutch. So the gap is: a long, chunk-based, offline, spoken course aimed at expats' real lives. Dutch is a small learner language, so this is a focused product at a fair price, not a Duolingo competitor.

**The SaySomethingin method is well defined and copyable as a technique.** The technique is not protectable; their scripts and brand are. Their core: full sentences from minute one, formulaic chunks recombined, no writing or notes, do not repeat lessons, mistakes are the point, double-speed listening practice from a few lessons in, warm and cheeky first-person copy. Known criticisms: no reading or writing (visual learners struggle), no grammar (people do not know why), pace can overwhelm, and their newer adaptive product has had bugs. We should copy the strengths and fix the criticisms.

**CEFR gives us the yardstick.** Dutch has its own exams (Staatsexamen NT2 I at B1 and II at B2, inburgering now targeted at B1, CNaVT profiles). Vocabulary targets for NT2 from Bossers (2022): roughly 1,000 words at A1, 2,000 at A2, 5,000 at B1. Guided learning hours are only published for English (Cambridge: A2 180 to 200, B1 350 to 400, B2 500 to 600 cumulative) and are commonly transferred to Dutch. An audio course supplies part of those hours; we should not claim it supplies all of them.

**Teach Netherlands Dutch.** Randstad standard, hard g, *je/jij* as default with explicit *u* rules, any r tolerated. A short awareness module on Flemish later. All TTS voices nl-NL.

**Technology is a solved problem, content is not.** Web first with Capacitor for iOS works if audio and storage go through native plugins on iOS. Two neural TTS voices for around 6,000 sentences cost tens of dollars, not thousands. The real cost is writing and checking about 200 scripted sessions of interleaved Dutch. Budget the project around authoring, not code.

## 4. The method

Described generically so that we own the description.

### 4.1 The loop

1. The narrator (English, warm, first person) says a short prompt: *"I want to drink coffee."*
2. A pause. A ring on screen fills to show it is your turn. You say it out loud.
3. Native voice one says it: *Ik wil koffie drinken.*
4. Native voice two says it.
5. Next prompt. Roughly every fourth or fifth prompt combines two or three things you already know into a sentence you have never heard.

There is no grading and no microphone required. The feedback loop is you noticing the gap between what you said and what you heard.

### 4.2 The rules (told to the learner in the first session)

- Say it out loud. Muttering in your head does not build the muscle.
- Do not write anything down. Do not look anything up.
- Do not repeat a session. If you got about three in four right, move on. The script brings everything back.
- Use the pause button if you need it, but try to need it less each week.
- Mistakes are the lesson working. Everyone freezes at first.

### 4.3 Chunks, not words

The unit of memory is a chunk: *ik wil*, *even kijken*, *heb je zin om*, *kunt u me helpen*. The unit of practice is a sentence built from chunks. Each session introduces 8 to 12 new chunks and produces 40 to 50 sentences, most of which recombine old chunks with new. Grammar is never explained; word order, *de/het*, verb-second and subordinate-clause order are learned by producing hundreds of correct sentences.

### 4.4 Authored spacing plus light adaptive review

The spacing is written into the script, as it is in Pimsleur and SaySomethingin. Rule of thumb for authors: a new chunk is used three times in its session, returns in each of the next two sessions, then roughly every fifth session, and is combined with something new each time it returns. This gives every learner the same tested experience.

On top of that, an optional five-minute *Herhaling* (review) block at the end of a session uses FSRS scheduling on chunks. Signals are implicit: a "that one got me" tap during the pause and replay counts. This is the one adaptive element and it is optional. We do not interrupt the flow to grade people.

### 4.5 Listening practice at speed

From around session eight of each level, each session ends with a two-minute listening file made from sentences you already know, played at 1.5x and later 2x. The learner is told they do not need to understand it. Purpose: normal speed starts to feel slow. This is one of SaySomethingin's most praised features and it is cheap to make.

### 4.6 Where we deliberately differ from SaySomethingin

- **A transcript after the session, never during.** The single biggest criticism of SaySomethingin is that visual learners are lost and later find the spelling alien. We keep the session audio-only, then offer a "peek" at the transcript afterwards, with *de/het* marked. Off by default until Level A2.
- **A one-line note when the language does something odd.** Not grammar teaching. A spoken aside such as *"Notice the verb jumped to the end there. It always does after 'omdat'. You do not need to know why yet."*
- **Culture asides.** The four strands are as much about unwritten rules as words. The narrator explains the one-biscuit rule, the birthday circle and the Tikkie in twenty seconds each, at the moment the phrase comes up.
- **The English problem.** Dutch people switch to English the moment they hear an accent. Every level has a short module on holding the line: *"Ik oefen mijn Nederlands, mag ik het in het Nederlands proberen?"* No other course addresses this and it is the main reason expats give up.
- **Real institutions by name.** Albert Heijn, Gamma, Magister, Marktplaats, Tikkie. Learners meet them tomorrow, so the course should too.
- **No streaks.** Streaks make people do a minimum to keep a number alive. We show minutes spoken this week and sentences produced. Gentle nudges by email, in the narrator's voice.

## 5. Level structure A1 to B2

### 5.1 What each level promises

| Level | CEFR can-do (spoken) | What the learner can do in the Netherlands | Content |
|---|---|---|---|
| A1 | Simple phrases about people and places. Simple interaction if the other person is slow and helpful. | Greet, order at the bakker, get through the checkout, say who they are and where they live, congratulate everyone at a birthday circle, phone the school to say a child is ill. | 25 core sessions + 8 per strand |
| A2 | Routine exchanges on familiar matters. Short descriptions of daily life. | Invite and decline with the agenda dance, deal with a shop return, ask for wood cut to size, apply for school leave, handle the WhatsApp parent group. | 25 core + 9 per strand |
| B1 | Deal with most everyday situations, explain a problem, give reasons, tell a story. | Argue politely at dinner, negotiate on Marktplaats, describe a leak to a plumber and read a quote, hold a ten-minute talk with a teacher, choose a profile with the decaan. | 25 core + 10 per strand |
| B2 | Fluent, spontaneous interaction without strain. Present a viewpoint with pros and cons. | Recognise sarcasm and use it, escalate a complaint, manage a builder's extra work, hold a mentor conversation about a child's wellbeing, write and read an email to the school. | 25 core + 10 per strand |

Total: roughly 250 sessions of 20 minutes, about 80 hours of guided speaking, plus listening files. Around 6,000 unique Dutch sentences and 1,500 to 2,000 chunks. That is comparable to three SaySomethingin levels and five times what Pimsleur offers for Dutch.

### 5.2 Honest claims about hours

We will not claim "B2 in 80 hours". The app supplies the speaking and listening strands of the CEFR hours, densely. The learner still needs real conversations. The marketing line should be about confidence in named situations, not exam levels. The CEFR labels exist so people can place themselves and so the content is disciplined.

### 5.3 What the script carries implicitly at each level

Authors need this list; learners never see it.

- **A1:** present tense, *zijn/hebben*, verb-second word order and inversion, *de/het* and plurals, *niet/geen*, modal verbs (*kunnen, moeten, mogen, willen*), *er is/er zijn*, numbers, time, *graag*, imperative, the particles *even* and *hoor*.
- **A2:** perfectum with *hebben/zijn*, imperfectum of common verbs, separable verbs, subordinate clauses with verb-final order (*omdat, als, dat, of*), comparatives, *om ... te*, future with *gaan*, object pronouns, diminutives, *er* with place.
- **B1:** relative clauses, *zou/zouden* for conditional and politeness, passive with *worden*, *er* with prepositions, indirect speech, conjunctions of contrast and cause, plusquamperfectum, formal *u* register in full.
- **B2:** complex subordination, discourse markers for argument, passive across tenses, idiom and understatement, irony markers, register switching between neighbour and school, formal email structure.

### 5.4 Placement

Onboarding asks three questions and then plays a two-minute spoken self-check at A1, A2 or B1: ten prompts, no scoring, the learner says whether it felt easy, ok or hard. That is enough to choose a start point. Anyone can move.

### 5.5 Progress metaphor

Dutch children earn swimming diplomas A, B and C. The course should use a diploma metaphor rather than belts: *Diploma A1*, *Diploma A2* and so on, with a short spoken "you did it" from the narrator and a certificate that is fun to share. Checkpoints inside a level are called *Tussenstand* (halfway score) rather than tests.

## 6. Course architecture

```
Level A1
├── Core spine (25 sessions)      everyday Dutch, the grammar carrier, the English problem
├── Strand: Gezellig (8)          being sociable
├── Strand: Winkelen (8)          going into shops
├── Strand: Klussen (8)           doing DIY
└── Strand: Ouders (8)            parent of a secondary school child
```

Rules:

- Core sessions come first and unlock the strand sessions at the same level. Learners can do any strand in any order and skip strands that do not apply. A parent without children will never see *Ouders*.
- Strand sessions use only chunks the core has taught plus the strand's own. Strand chunks flow back into later core sessions so nothing is orphaned.
- Every session is scripted as a small scene with a beginning and an end so it feels like a situation, not a drill.
- Each level ends with a *Diploma* session: a long free-flow scene that mixes everything.

## 7. The four strands

Each strand below gives the situations, the cultural rules the narrator explains, sample chunks at each level and the scenes. Full vocabulary lists, about 60 to 120 items per strand, are in `research/03-scenario-vocabulary.md`.

### 7.1 Gezellig - being sociable

**Situations:** the stairwell neighbour, first day at work, the birthday circle, the Friday borrel, coffee at someone's house, texting to arrange and cancel, the sports club and bar duty, the dinner where everyone says what they think, the friend who is being sarcastic.

**Rules the narrator explains:** three kisses versus a handshake; walking the whole circle saying *gefeliciteerd* to everyone, including *met je moeder*; the biscuit tin comes round once; *even in mijn agenda kijken* is a real step, not a brush-off; a plain *nee* needs no excuse; *doe normaal*; the Tikkie arrives and you say *komt in orde*; volunteering is implied by club membership.

**Sample chunks:**
- A1: *Hoe gaat het? Goed, en met jou? Lekker weertje, hè? Gefeliciteerd met je moeder. Koffie, graag. Ik ga ervandoor. Bedankt voor de gezellige avond.*
- A2: *Heb je zin om zaterdag te komen eten? Even in mijn agenda kijken. Dan kan ik helaas niet. Zal ik iets meenemen? Dat hoeft niet, hoor. Kun je een pakketje voor me aannemen? Ik stuur je wel een Tikkie.*
- B1: *Volgens mij ... Daar ben ik het niet mee eens. Daar zit wat in. Je raadt het nooit. Wat een gedoe. Niet verkeerd. Ik heb er geen zin in.*
- B2: *Lekker dan. Ja, dat zal wel. Meen je dat? Zo bedoelde ik het niet. Eerlijk gezegd vind ik het niet zo'n goed idee. We komen er wel uit.*

**Scenes:** Op de trap (A1), Even voorstellen (A1), De kringverjaardag (A1/A2), Koffie doen? (A2), De nieuwe buren (A2), Vrijmibo (B1), Hoe was je weekend? (B1), Bardienst bij de club (B1), Daar ben ik het niet mee eens (B2), Lekker dan (B2).

### 7.2 Winkelen - going into shops

**Situations:** the bakker on Saturday, the supermarket checkout script, the bottle return machine, the market by weight, drogist versus apotheek, trying on and exchanging clothes, the bike repair shop, a faulty item, haggling on Marktplaats.

**Rules the narrator explains:** the checkout has a fixed script (*bonuskaart, bon, zegels, pinnen, tasje*); many shops are pin only; *een ons* is 100 g and *een pond* is 500 g; painkillers at Kruidvat, prescriptions at the apotheek; change-of-mind returns get a *tegoedbon*, faulty goods fall under *wettelijke garantie*; on Marktplaats bidding is expected and same-day pickup earns a discount.

**Sample chunks:**
- A1: *Wie is er aan de beurt? Zegt u het maar. Een heel bruinbrood, gesneden. Anders nog iets? Nee, dat was het. Wilt u de bon? Pinnen, graag. Ik kijk even rond.*
- A2: *Een pond kaas, alstublieft. Heeft u dit in een andere maat? Mag ik dit passen? Het zit te strak. Kan ik dit ruilen? Mijn band is lek. Wanneer is hij klaar?*
- B1: *Ik wil graag een klacht indienen. Het is na twee weken kapotgegaan. Volgens de wet heb ik recht op reparatie of vervanging. Is dit nog beschikbaar? Wat is je laatste prijs? Als je hem voor 40 doet, haal ik hem morgen op.*
- B2: *Kunt u dit uit coulance vergoeden? Ik wil dit graag schriftelijk bevestigd hebben. De prijs is aan de hoge kant vergeleken met vergelijkbare advertenties. Laten we elkaar in het midden ontmoeten.*

**Scenes:** Bij de bakker (A1), De kassa bij Albert Heijn (A1), Statiegeld inleveren (A1/A2), Op de markt (A2), Bij Kruidvat en de apotheek (A2), In de kledingwinkel (A2), Bij de fietsenmaker (A2/B1), Dit is kapot (B1), Marktplaats-onderhandeling (B1), Ik wil mijn geld terug (B2).

### 7.3 Klussen - doing DIY

**Situations:** finding the right plugs at Gamma, the wood-cutting service, mixing paint, hiring a trailer, painting walls white before handing back a rental, the pre-inspection, a leaking tap or blocked drain, a tripped fuse group, phoning a plumber, reading a quote, buying second-hand tools, checking with the VvE or gemeente before a dormer.

**Rules the narrator explains:** staff are addressed with *u* and the opener is *Kunt u me even helpen?*; mixed paint cannot be returned; a rental must go back in the state of the *opnamerapport* and the *voorinspectie* tells you what to fix; a tripped *groep* is yours to reset, anything else is for an *erkend installateur*; always get an *offerte* first and agree *meerwerk* before it happens; VvE permission is needed for anything touching common parts even when the gemeente does not need a permit.

**Sample chunks:**
- A1: *Waar vind ik de schroeven? Ik zoek pluggen voor een gipswand. Kunt u dit op maat zagen? Twee stukken van 60 bij 40. Hoeveel liter heb ik nodig voor 20 m²? De kraan lekt. De afvoer is verstopt. Er is geen stroom.* Tools: *de boormachine, de schroevendraaier, de waterpas, de rolmaat, het kitpistool, het plamuurmes.* Fixings: *de schroef, de plug, de spijker, de bout, de moer.*
- A2: *Ik ga dit weekend klussen. Ik ben niet zo handig. Kan ik je boormachine even lenen? Kunt u deze kleur mengen? Ik wil RAL 9010. Wat is de borg? Ik moet de muren wit opleveren. Mag ik hier behangen?* Verbs: *boren, schuren, plamuren, gronden, aflakken, sausen, witten, kitten, tegelen, laminaat leggen.*
- B1: *Ik bel over een lekkage. Kunt u langskomen? Het is geen spoed. Kunt u een offerte maken? Zijn de voorrijkosten inbegrepen? Is dat inclusief btw? Er is een groep uitgevallen. De aardlekschakelaar is eruit gesprongen. Heb ik hier een vergunning voor nodig?*
- B2: *Sinds een week hoor ik een tikkend geluid in de leidingen. Ik heb zelf al geprobeerd om ..., maar dat hielp niet. Ik vermoed dat het aan de ... ligt. Meerwerk graag eerst overleggen. Dat is meer dan we hadden afgesproken. Afspraak is afspraak.*

**Scenes:** Waar liggen de pluggen? (A1), Hout op maat (A1/A2), Verf mengen (A2), Een aanhanger huren (A2), De voorinspectie (A2/B1), Geen stroom (B1), De loodgieter bellen (B1), Tweedehands boormachine (B1/B2), De offerte bespreken (B2), De VvE en de dakkapel (B2).

### 7.4 Ouders - parent of a child at secondary school

**Situations:** phoning in sick before 8.15, the timetable and homework chat at home, the parents' WhatsApp group and school gate, applying for leave, the open day, the ten-minute talk with a subject teacher, profile choice with the decaan, the mentor conversation about wellbeing, the promotion meeting outcome, emailing the school.

**Rules the narrator explains:** the system from groep 8 through doorstroomtoets and schooladvies to vmbo, havo and vwo; brugklas and dakpanklas; grades out of 10 where 5.5 rounds to a pass and *een zesje* is scraping by; SO versus proefwerk versus toetsweek; PTA, schoolexamen and centraal examen; the flag and schoolbag when a child passes; *overgaan* versus *blijven zitten*; Magister and Somtoday; leave only for *gewichtige omstandigheden* and the leerplichtambtenaar; the parental contribution is voluntary; the support ladder from mentor to zorgcoördinator; you address teachers as *u* and *meneer/mevrouw* plus surname; emails open with *Beste* or *Geachte* and close *Met vriendelijke groet*.

**Sample chunks:**
- A1: *Ze zit in de tweede. Hij doet havo. Hoe laat ben je uit? Heb je huiswerk? Wat heb je gehaald? Een 6 is voldoende. Mijn dochter is ziek, ze komt vandaag niet. Ze is weer beter. Geslaagd!*
- A2: *De cijfers staan in Magister. Kan ik verlof aanvragen voor een bruiloft? Ik wil graag een tienminutengesprek met de docent Engels. Moet ik de ouderbijdrage betalen? Wie kan er rijden naar het gala? Ik stuur een Tikkie.* Vocabulary: *de mentor, de decaan, de brugklas, het rapport, de toetsweek, de herkansing, overgaan, blijven zitten, het kluisje, de ouderavond.*
- B1: *Ze twijfelt tussen N&G en E&M. Ze heeft moeite met wiskunde. Hij loopt achter met Frans. Het gaat de goede kant op. Hij zit midden in de puberteit. Ze zit niet lekker in haar vel. Succes met de toetsweek allemaal! Herkenbaar!*
- B2: *Ik wilde het graag hebben over hoe het gaat met Tom. Hoe ervaart u hem in de klas? We maken ons zorgen over haar welzijn. Ligt ze op koers om over te gaan? Wat kunnen wij thuis doen? Kunt u me doorverwijzen naar de zorgcoördinator? Zijn er signalen van pesten? Geachte mevrouw De Vries, ik ben de moeder van Sara uit 2B.*

**Scenes:** Ziekmelden (A1), Hoe laat ben je uit? (A1), Aan het hek en in de groepsapp (A2), Verlof aanvragen (A2), De open dag (A2/B1), Het tienminutengesprek (B1), Profielkeuze bij de decaan (B1), Het mentorgesprek (B2), Blijven zitten of afstromen? (B2), De mail aan school (B2).

**A deliberate deviation:** this strand needs a little reading and writing at B2, because school communication is written. The email scene shows the text after the spoken version. That is the only place the course touches writing.

## 8. Product outline

### 8.1 Screens

1. **Vandaag (Today).** One big button: continue where you left off. Under it: minutes spoken this week, next Diploma, and one line from the narrator.
2. **Player.** The whole screen is the session. Large pause ring, a pause button, a "that one got me" tap, replay last, speed control for the native voices (0.8x to 1.2x), and a session timeline as a thin bar. No text of the sentence during the session. Lock-screen controls on iOS.
3. **Na de les (After).** Optional transcript with *de/het* colours, the culture asides as text, the option to start the five-minute Herhaling.
4. **Het pad (The path).** The level map: core spine down the middle, four strands branching off, Diploma at the bottom. Strands can be hidden.
5. **Luisteren.** The listening files at speed, downloadable, meant for the bike or the washing up.
6. **Instellingen.** Voices, transcript on or off, downloads, account, subscription.

### 8.2 Onboarding

Three questions (why Dutch, which strands apply, how much Dutch already), then the spoken self-check, then straight into session one. Session one is free, no account. Account required from session two. Paywall after the first five core sessions of the chosen level.

### 8.3 Optional record and compare

Record your attempt during the pause, then hear yours and the native voice back to back. No scoring. Off by default. Nothing leaves the device. Pronunciation scoring can come later if users ask for a number, and Azure supports nl-NL if we ever want it.

### 8.4 Tone of voice

First person, warm, plain, a little cheeky, never cute. The narrator is a person who learned Dutch as an adult and remembers how it felt. Examples:

- *"You just said your first sentence in Dutch out loud. That is more than most people manage in a year."*
- *"You will get this wrong a few times. Good. That is the bit where it sticks."*
- *"Take one biscuit. Only one. I will explain later."*

Copy rules match your own writing preferences: British spelling, no contractions, no comma before *and* in a short list, plain words.

### 8.5 Visual direction

SaySomethingin's look could not be inspected directly, so this is our own direction rather than a copy: a single-purpose player, lots of space, one accent colour, large type, dark and light themes. Suggested palette: warm off-white and deep ink, with Dutch orange used sparingly as the action colour and a second accent of canal green for progress. Typography: a friendly humanist sans for the interface and a rounded display face for the narrator's lines. Illustration: small line drawings of the scenes (a biscuit tin, a Gamma trolley, a schoolbag on a flag). Every screen must work at phone width with one thumb.

## 9. Technical outline

### 9.1 Recommendation

Build the web app with **Vite, TypeScript and Svelte** as an installable Progressive Web App, then wrap it with **Capacitor** for the App Store. On iOS, playback and downloaded audio go through native plugins from day one, because WebView audio stops when the screen locks and Safari can evict cached files after seven days. Abstract playback behind one interface with a web implementation and a native implementation.

Why not the current single-file vanilla style of the other apps in this repository: offline audio packs, spaced repetition state, accounts and payments justify a build step. Why Svelte: small output, easy to read, no framework overhead in the player. React with Expo is the credible alternative if you prefer one runtime for web and native.

### 9.2 Pieces

- **Content:** lesson scripts as JSON (prompt, target, chunk IDs, pause length, audio refs, level and strand tags). Scripts live in the repository; audio is generated from them and packed per session.
- **Audio:** two nl-NL neural voices, one female and one male, from Azure Neural HD or ElevenLabs, plus a native narrator recording for English prompts or a good English neural voice. A native Dutch speaker audits 200 random sentences for stress and the g, ch and ui sounds before launch. Later, record human voices for the 300 most frequent chunks. Cost for 6,000 sentences in two voices: tens of dollars in TTS.
- **Scheduling:** authored interleaving in the script, plus ts-fsrs for the optional review block.
- **Storage:** Dexie (IndexedDB) for progress and settings, Cache API on web and Capacitor Filesystem on iOS for audio packs, progress synced to an EU-hosted backend.
- **Backend:** small. Accounts, progress sync, entitlements. Supabase in an EU region or similar. Stripe on the web. App Store in-app purchase as convenience later, with the web as the primary sales channel.
- **Privacy:** email and progress events only. No microphone audio leaves the device. EU hosting. Sixteen plus terms.

### 9.3 App Store path

Apple's minimum functionality rule rejects thin web wrappers. Our app passes because it has native audio with lock-screen controls, genuine offline packs, native purchase and bundled content. Downloaded packs must declare their size on first download.

## 10. Content production

This is the real project. Suggested pipeline:

1. **Chunk inventory per level** from the vocabulary research and frequency data (SUBTLEX-NL, the Routledge frequency dictionary), cross-checked with the NT2 coursebook grammar order.
2. **Session scripting** in a spreadsheet-like format: order, prompt, target, chunks used, new or recycled, aside text. One author drafts, one native NT2 teacher reviews every session. Budget: a 20-minute session takes roughly half a day to script and check.
3. **Generation:** a script turns the sheet into JSON and audio, assembles the session file with pauses, and produces the listening file at speed.
4. **Listening test:** two learners do each session cold before it ships. If more than a quarter of sentences freeze them, the interleaving is too aggressive.

Ordering of authoring: A1 core, then A1 Gezellig and Winkelen, then Klussen and Ouders, then A2 and so on. Ship each level as it is ready.

## 11. Phases

| Phase | Scope | Purpose |
|---|---|---|
| 0. Prototype | Web only. A1 core sessions 1 to 5 plus one Winkelen scene. TTS voices. No accounts. | Prove the loop feels right and the voices are good enough. Test with five expats. |
| 1. A1 on the web | Full A1 (core and four strands), accounts, offline, Stripe, transcript peek, listening files. | Launch to a small paying audience. |
| 2. A2 and iOS | A2 content, Capacitor wrap, native audio, App Store submission, in-app purchase. | Broaden distribution. |
| 3. B1 | B1 content, record and compare, weekly narrator email. | Retain learners past the beginner cliff. |
| 4. B2 | B2 content, the email scene with text, Flemish awareness module. | Complete the promise. |

No timelines here on purpose. Phase 0 is a few weeks of work; each content level is months of authoring.

## 12. Risks and where I disagree with the brief

- **The market is small.** Dutch learners are mostly in the Netherlands and Belgium and many get by in English. This is a good product for a niche, not a growth business. Price it accordingly: around €8 a month or €60 a year, or a one-off price per level, which audio learners like.
- **Content volume is the cost.** Eighty hours of scripted, checked, interleaved Dutch is the equivalent of writing several textbooks. Start with A1 and see whether people finish it before committing to B2.
- **Pure audio has limits at B2.** B2 is about nuance and register and the Dutch you meet at B2 is often written (school emails, quotes, contracts). The course should admit that and add reading at B2 rather than pretend. I have done that in the Ouders strand and I would do it in Klussen for quotes too.
- **The Dutch switch to English.** If the app does not train learners to hold the conversation in Dutch, the rest is wasted. I have made this a core module at every level. It is the feature I would market hardest.
- **TTS on the hard sounds.** The g, ch and ui are exactly where neural voices are sometimes off. The native audit is not optional.
- **Overwhelm.** SaySomethingin's learners report feeling lost early on. The three-in-four rule, the optional pause and the transcript peek are there to soften this without losing the method.
- **Naming.** Own name, generic description of the method, no reuse of anyone's scripts.

## 13. Decisions I need from you before building

1. **Name.** Zeg het maar, Hardop, something else?
2. **Netherlands Dutch only** for the first version, with Flemish as a later awareness module. I recommend yes.
3. **Voices.** Neural TTS for launch with a native audit, human recordings later for the most frequent chunks. I recommend yes.
4. **Transcript peek after sessions.** I recommend yes, off by default at A1.
5. **Stack.** Vite, TypeScript and Svelte with Capacitor. Or Expo if you prefer React.
6. **Pricing model.** Subscription, per-level purchase or both.
7. **Which strand goes into the prototype.** I suggest Winkelen because the checkout script is short, universal and instantly useful.
8. **Who checks the Dutch.** A native NT2 teacher needs to review every script. Do you have someone, or should the plan include finding one?

Once you decide, the first build is Phase 0: the player, five core sessions and one shop scene, on the web.

---

Appendices in `research/`:
- `01-saysomethingin-method.md` - the method, product, community and comparisons with Pimsleur, Michel Thomas and Language Transfer
- `02-cefr-dutch.md` - CEFR descriptors, Dutch exams, hours, vocabulary sizes, grammar by level, resources and pronunciation
- `03-scenario-vocabulary.md` - situations, rules, vocabulary and scenes for the four strands
- `04-competitors-and-technology.md` - competitor table, architecture, audio generation, speech, spaced repetition, pricing and legal

# Klets - vision and outline for a spoken Dutch app

Name: **Klets** (from *kletsen*, to chat; *een klets* is a chat and, in this app, one five-minute session). Tagline for English readers: *Klets - Dutch, out loud*. A quick web check found no Dutch learning app of that name; a proper trademark and app store check is still needed before launch. The name must never lean on "SaySomethingin", "SSi" or "Say Something in Dutch" - that is an existing Welsh company's brand and they sell a Dutch course.

Status: vision and outline only. Nothing has been built. Four research briefings sit in `research/` and this document draws on them.

---

## 1. The vision in one paragraph

An audio-first Dutch course for English-speaking adults who live in Flanders, taught in Belgian Dutch and built around the situations of their actual lives. You speak out loud from the first minute. An English prompt, a pause, you say the Dutch, then two native speakers say it. Nothing to read, nothing to type, no flashcards, no streaks. The script recycles what you know into new sentences so that speaking becomes automatic rather than remembered. The course runs from CEFR A1 to B2 along a core spine plus four scenario strands: being sociable, going into shops, doing DIY and being a parent with children at secondary school. Web app first, App Store second.

The promise to the learner: *after your first session you will have said things in Dutch you can use tomorrow, and after Level A2 you will hold your own at the schoolpoort, the Brico and the buurtfeest.*

## 2. Who it is for

- **Primary:** English-speaking adults settled in Flanders for the medium to long term - partners, parents, people with Belgian employers who work in English. A Netherlands edition can follow: the core spine is largely shared, the strands are not. They have tried Duolingo, maybe a course, and still freeze when the neighbour speaks to them.
- **Secondary:** people planning a move, and partners of Dutch speakers living elsewhere.
- **Not for:** inburgering candidates who need reading and writing at exam standard (though the Flemish inburgering requirement moves to B1 spoken from September 2027, which this course serves directly), children, and people who want grammar explained. The app can point them elsewhere.

The four strands are chosen for this person. They are life-stage specific in a way no existing Dutch product is. That is the wedge.

## 3. What the research says (short version)

Full detail is in the four research files. The points that shape the design:

**The market gap is real but narrow.** Speak-in-the-pause Dutch exists: Pimsleur Dutch (one level only, about 15 hours), Michel Thomas Dutch (two courses, years old), and SaySomethingin's own older-format Dutch course. All are short and none goes past low A2 in practice. Duolingo Dutch is the default and its 2026 reviews concede that speaking is where it fails. Babbel and Busuu are text-first. Nobody covers school-parent or DIY Dutch. So the gap is: a long, chunk-based, offline, spoken course aimed at expats' real lives. Dutch is a small learner language, so this is a focused product at a fair price, not a Duolingo competitor.

**The SaySomethingin method is well defined and copyable as a technique.** The technique is not protectable; their scripts and brand are. Their core: full sentences from minute one, formulaic chunks recombined, no writing or notes, do not repeat lessons, mistakes are the point, double-speed listening practice from a few lessons in, warm and cheeky first-person copy. Known criticisms: no reading or writing (visual learners struggle), no grammar (people do not know why), pace can overwhelm, and their newer adaptive product has had bugs. We should copy the strengths and fix the criticisms.

**CEFR gives us the yardstick.** Flanders teaches NT2 in *richtgraden* at CVO and Ligo: richtgraad 1 is A1 to A2 and ends with the NT2-test, richtgraad 2 is B1, richtgraad 3 is B2. Inburgering asks for A2 today and B1 spoken from 1 September 2027. The Netherlands has its own exams (Staatsexamen NT2 I at B1 and II at B2) and CNaVT covers both countries. Vocabulary targets for NT2 from Bossers (2022): roughly 1,000 words at A1, 2,000 at A2, 5,000 at B1. Guided learning hours are only published for English (Cambridge: A2 180 to 200, B1 350 to 400, B2 500 to 600 cumulative) and are commonly transferred to Dutch. An audio course supplies part of those hours; we should not claim it supplies all of them.

**Teach Belgian Dutch.** Standard Dutch as spoken in Flanders (the VRT norm): soft g, *u* as the default with strangers, shop staff, teachers and officials, *je/jij* with friends and once a colleague switches. The spoken vernacular is tussentaal with *ge/gij* and words like *goesting*, *plezant*, *allee* and *amai*: the learner must understand it from A1 and should not try to produce *gij* below B2. Both recorded voices are Flemish. A Netherlands awareness module comes later, not the other way round.

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

On top of that, an optional two-minute *Herhaling* (review) block after a klets uses FSRS scheduling on chunks. Signals are implicit: a "that one got me" tap during the pause and replay counts. This is the one adaptive element and it is optional. We do not interrupt the flow to grade people.

### 4.5 Listening practice at speed

From around session eight of each level, each session ends with a two-minute listening file made from sentences you already know, played at 1.5x and later 2x. The learner is told they do not need to understand it. Purpose: normal speed starts to feel slow. This is one of SaySomethingin's most praised features and it is cheap to make.

### 4.6 Where we deliberately differ from SaySomethingin

- **A transcript after the session, never during.** The single biggest criticism of SaySomethingin is that visual learners are lost and later find the spelling alien. We keep the session audio-only, then offer a "peek" at the transcript afterwards, with *de/het* marked. Off by default until Level A2.
- **A one-line note when the language does something odd.** Not grammar teaching. A spoken aside such as *"Notice the verb jumped to the end there. It always does after 'omdat'. You do not need to know why yet."*
- **Culture asides.** The four strands are as much about unwritten rules as words. The narrator explains one kiss not three, *trakteren* on your birthday, the Payconiq and the Chiro in twenty seconds each, at the moment the phrase comes up.
- **The English problem.** Flemings switch to English (or French) the moment they hear an accent. Every level has a short module on holding the line: *"Ik oefen mijn Nederlands, mag ik het in het Nederlands proberen?"* No other course addresses this and it is the main reason expats give up.
- **Real institutions by name.** Colruyt, Brico, Smartschool, 2dehands, Payconiq, the CLB. Learners meet them tomorrow, so the course should too.
- **No streaks.** Streaks make people do a minimum to keep a number alive. We show minutes spoken this week and sentences produced. The daily email (section 8.5) points at one five-minute klets and waits patiently if you miss it.
- **Five minutes is the unit.** Every klets is authored to take five minutes and hold 15 to 20 spoken sentences. Four kletsen make a session in the sense used by SaySomethingin. Five minutes fits a spare moment and, more important, gets finished. Because one klets is too short to recycle much inside itself, the recycling is written across the chain of kletsen, and the player offers "nog een klets?" at the end so that a spare ten minutes turns into two.

## 5. Level structure A1 to B2

### 5.1 What each level promises

| Level | CEFR can-do (spoken) | What the learner can do in Flanders | Content |
|---|---|---|---|
| A1 | Simple phrases about people and places. Simple interaction if the other person is slow and helpful. | Greet, order at the bakker, get through the Colruyt checkout, say who they are and where they live, wish someone *proficiat*, phone the school to say a child is ill. | 25 core sessions + 8 per strand (each session is four kletsen) |
| A2 | Routine exchanges on familiar matters. Short descriptions of daily life. | Invite and decline, deal with a shop return with the ticket, ask for wood cut to size at Brico, write a *briefje* for an absence, handle the class WhatsApp group. | 25 core + 9 per strand |
| B1 | Deal with most everyday situations, explain a problem, give reasons, tell a story. | Argue politely at dinner, negotiate on 2dehands, describe a leak to a plumber and read an offerte, hold an oudercontact with the klastitularis, talk richtingen and attesten. | 25 core + 10 per strand |
| B2 | Fluent, spontaneous interaction without strain. Present a viewpoint with pros and cons. | Recognise sarcasm and use it, escalate a complaint, manage a builder's extra work, talk to the CLB about a child's wellbeing, contest a B-attest, write and read an email to the school. | 25 core + 10 per strand |

Total: roughly 1,000 kletsen of five minutes (250 sessions of 20 minutes), about 80 hours of guided speaking, plus listening files. Around 6,000 unique Dutch sentences and 1,500 to 2,000 chunks. That is comparable to three SaySomethingin levels and five times what Pimsleur offers for Dutch.

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

Flemish children earn *zwembrevetten* for 25, 50 and 100 metres. The course uses a brevet metaphor rather than belts: *Brevet A1*, *Brevet A2* and so on, with a short spoken "you did it" from the narrator and a certificate that is fun to share. Checkpoints inside a level are called *Tussenstand* (halfway score) rather than tests.

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
- Each level ends with a *Brevet* session: a long free-flow scene that mixes everything.

## 7. The four strands

Each strand below gives the situations, the cultural rules the narrator explains, sample chunks at each level and the scenes. The Netherlands-oriented vocabulary lists are in `research/03-scenario-vocabulary.md`; the Flemish differences, which take precedence, are in `research/05-flemish-differences.md`.

### 7.1 Gezellig - being sociable

**Situations:** the neighbour on the stairs, first day at work, a birthday at work, op café with a round, the frituur, coffee at someone's house, texting to arrange and cancel, the Chiro or scouts and what parents are roped into, the buurtfeest and the kermis, the dinner where everyone says what they think, the friend who is being sarcastic.

**Rules the narrator explains:** one kiss with friends, a handshake otherwise, let the Fleming lead; *proficiat* not *gefeliciteerd*, and on your birthday you *trakteert* at work; *'t is mijn tournee* in the café; the Payconiq request that follows a shared bill; Flemings move to first names and *je* slowly, so keep *u* until they say *zeg maar Els*; *ge/gij* is what you hear, *je* is what you say; the jeugdbeweging is a national institution and parents cook on camp, drive and turn up to the spaghettiavond; the zomerbar and the kermis are where the village is in summer.

**Sample chunks:**
- A1: *Hoe is 't? Goed, en met u? Schoon weer, hè? Proficiat! Koffie, graag. Merci. Aangenaam. Dag! Salut!*
- A2: *Heb je zin om zaterdag te komen eten? Even in mijn agenda kijken. Dan kan ik jammer genoeg niet. Zal ik iets meebrengen? Dat is niet nodig. Kun je een pakje voor mij aannemen? Ik stuur je een Payconiq. 't Is mijn tournee. Mijn zoon zit in de Chiro.*
- B1: *Volgens mij ... Daar ben ik het niet mee eens. Kom eens langs. We spreken af op café. Ik ben content. Dat trekt op niets. Rap, rap. Op voorhand bedankt.*
- B2: *Zijde zeker? (understood) Ik zit ermee verveeld. Dat kan tellen. Eerlijk gezegd vind ik het geen goed idee. We komen er wel uit.* Recognising a colleague's switch to *ge* as friendliness.

**Scenes:** Op de trap (A1), Even voorstellen (A1), Proficiat! (A1/A2), Iets gaan drinken? (A2), De nieuwe buren (A2), Op café (B1), Hoe was je weekend? (B1), Kookploeg op kamp (B1), Daar ben ik het niet mee eens (B2), Allee, dat meent ge niet (B2).

### 7.2 Winkelen - going into shops

**Situations:** the bakker on Saturday (*aan wie is 't?*), the Colruyt or Delhaize checkout, the blauwe zak and the containerpark, the market by weight, the apotheek and the apotheek van wacht, trying on and exchanging clothes, the velomaker, a faulty item under the two-year guarantee, haggling on 2dehands.

**Rules the narrator explains:** the checkout script is *klantenkaart, ticket, cash of met de kaart, zakje*; free plastic bags are banned; there is no deposit on cans or bottles, they go in the blauwe zak; painkillers are sold only at the apotheek, not at Kruidvat or Di; *hesp* is ham and *een pistolet* is a roll; the legal guarantee is two years and a physical shop need not take goods back if you change your mind; on 2dehands bidding is expected and *enkel afhalen* is normal.

**Sample chunks:**
- A1: *Aan wie is 't? Zeg het maar. Een bruin brood, alstublieft. Gesneden? Nog iets? Nee, dat is alles. Wilt u het ticket? Met de kaart. Ik kijk eens rond. Hoeveel is 't?*
- A2: *Een halve kilo kaas. Tweehonderd gram hesp. Heeft u dit in een andere maat? Mag ik dit passen? Het is te klein. Kan ik dit ruilen? Ik heb het ticket nog. Mijn band is plat. Ik heb een voorschrift. Waar is de apotheek van wacht? In promotie. De solden.*
- B1: *Ik wil een klacht indienen. Valt dit onder de garantie? Herstellen of vervangen? Is dit nog beschikbaar? Wat is uw laatste prijs? Kan ik het afhalen in Gent? Ik bied 40 euro.*
- B2: *Ik verwacht dat u dit oplost. Ik ga naar Test Aankoop. Het herroepingsrecht geldt hier niet, dat weet ik, maar ... Laten we elkaar in het midden vinden.*

**Scenes:** Bij de bakker (A1), De kassa bij Colruyt (A1), De blauwe zak (A1/A2), Op de markt (A2), Bij de apotheek (A2), In de kledingwinkel (A2), Bij de velomaker (A2/B1), Dit is stuk (B1), 2dehands-onderhandeling (B1), Ik wil mijn geld terug (B2).

### 7.3 Klussen - doing DIY

**Situations:** finding the right *vijzen* and *pluggen* at Brico or Hubo, the wood-cutting service, mixing paint, hiring a trailer, the plaatsbeschrijving when renting, a leaking tap or blocked drain, a tripped fuse in the zekeringkast, phoning a loodgieter, reading an offerte, buying second-hand tools on 2dehands, the syndicus and the VME, checking the Omgevingsloket before an extension.

**Rules the narrator explains:** staff are addressed with *u*; mixed paint cannot be returned; a rental needs a *plaatsbeschrijving* at move-in and the *huurwaarborg* is at most three months' rent on a blocked account; every flat building has a syndicus and the VME meets once a year; interior works need no permit, an extension up to 40 m² needs a *melding*, the rest goes through the Omgevingsloket; renovation of a house older than ten years is at 6% VAT with a contractor; always get an *offerte* and agree extra work first; *verplaatsingskosten* not *voorrijkosten*; dienstencheques for a poetshulp.

**Sample chunks:**
- A1: *Waar vind ik de vijzen? Ik zoek pluggen voor een gipswand. Kunt u dit op maat zagen? Twee stukken van 60 op 40. De kraan lekt. De afvoer is verstopt. De stroom is uitgevallen. De lamp is stuk.* Tools: *de boormachine, de schroevendraaier, de waterpas, de rolmeter, de borstel, de vijs, de nagel, de plug.*
- A2: *Ik ga dit weekend klussen. Ik ben niet zo handig. Kan ik je boormachine even lenen? Kunt u deze kleur mengen? Wat is de waarborg? De zekeringkast. De chauffage werkt niet. De plaatsbeschrijving. De syndicus. Dienstencheques.*
- B1: *Ik bel voor een lek. Kunt u langskomen? Kunt u een offerte maken? Zijn de verplaatsingskosten inbegrepen? Is dat met 6% btw? Heb ik hier een vergunning voor nodig? Ik heb een melding gedaan via het Omgevingsloket. Mijn VerbouwPremie.*
- B2: *Sinds een week hoor ik een tikkend geluid in de leidingen. Ik vermoed dat het aan de ... ligt. Meerwerk graag eerst overleggen. Dat is meer dan we hadden afgesproken. Kunt u dat schriftelijk bevestigen? De tegensprekelijke plaatsbeschrijving. Naar de vrederechter.*

**Scenes:** Waar liggen de vijzen? (A1), Hout op maat (A1/A2), Verf mengen (A2), Een aanhangwagen huren (A2), De plaatsbeschrijving (A2/B1), Geen stroom (B1), De loodgieter bellen (B1), Tweedehands boormachine (B1/B2), De offerte bespreken (B2), De algemene vergadering van de VME (B2).

### 7.4 Ouders - parent of a child at secondary school (het secundair)

**Situations:** the *briefje* for a sick day and the doktersattest from day four, the agenda and homework chat at home, the class WhatsApp group and the schoolpoort, the schoolrekening, the opendeurdag, the oudercontact with the klastitularis, richtingen and finaliteiten at the end of the eerste graad, the klassenraad and an A, B or C-attest, bijkomende proeven in August, talking to the CLB, emailing the school, the 100 dagen and the proclamatie.

**Rules the narrator explains:** the system from the lager (*het zesde leerjaar*) into *het eerste middelbaar*, A-stroom and B-stroom, then finaliteiten (doorstroom, dubbele, arbeidsmarkt) that everyone still calls ASO, TSO and BSO; typical richtingen (Latijn, STEM, Economie, Humane wetenschappen, Moderne talen); points and percentages where 50% passes and below is a *tekort*; *dagelijks werk* versus the exams at Kerst and juni; the klassenraad gives an A-attest (go on freely), a B-attest (go on but not into certain richtingen) or a C-attest (repeat, *bissen*), and parents can appeal; four parental *briefjes* a year of up to three days, then a doktersattest, always one in exam weeks; Smartschool and the co-account; no maximumfactuur in secondary, so the schoolrekening is real money; the CLB is outside the school and handles study choice, medical checks and wellbeing; *redelijke aanpassingen* for dyslexia under the leersteundecreet; teachers are *mevrouw* or *meneer* plus surname; emails open *Beste* or *Geachte* and close *Met vriendelijke groeten*; the jeugdbeweging, the 100 dagen and the proclamatie are the rituals.

**Sample chunks:**
- A1: *Ze zit in het derde middelbaar. Hij doet Latijn. Hoe laat ben je thuis? Heb je huiswerk? Hoeveel had je? Vijftig procent is geslaagd. Ze is ziek, ik schrijf een briefje. Ze is weer beter. De boekentas. De brooddoos. De refter. De speelplaats.*
- A2: *De punten staan op Smartschool. Ik heb een bericht gestuurd via het co-account. Ik wil graag een oudercontact met de klastitularis. Wanneer is het rapport? Wie kan er rijden naar het zwemmen? Merci voor het doorsturen! Denk aan het ziektebriefje. De schoolrekening. De bosklassen. De examens beginnen maandag.*
- B1: *Ze twijfelt tussen Economie en Humane wetenschappen. Hij heeft een tekort voor wiskunde. Hij is gebuisd voor Frans. Ze moet bijkomende proeven doen. Hij is aan 't blokken. Ze zit de hele dag op haar gsm. Hij trekt zijn plan. Ze heeft weinig goesting om te studeren. Kunnen we redelijke aanpassingen aanvragen?*
- B2: *Hoe doet hij het in de klas? Hoe zit het met zijn inzet? Welke richting raadt u aan? Dreigt er een B-attest? Wat is het advies van de klassenraad? Kunnen we het CLB betrekken? We gaan in beroep tegen het attest. Beste mevrouw Peeters, ik ben de mama van Arthur uit 3 Latijn.*

**Scenes:** Een briefje schrijven (A1), Hoe laat ben je thuis? (A1), Aan de schoolpoort en in de klasgroep (A2), Het doktersattest (A2), De opendeurdag (A2/B1), Het oudercontact (B1), Welke richting? (B1), Het CLB (B2), Een B-attest (B2), De mail aan school (B2).

**A deliberate deviation:** this strand needs a little reading and writing at B2, because school communication is written and Smartschool is text. The email scene shows the text after the spoken version. That is the only place the course touches writing.

## 8. Product outline

### 8.1 Screens

1. **Vandaag (Today).** One big button: today's klets, the same one the morning email pointed at. Under it: a tick when it is done, minutes spoken this week, next Brevet and one line from the narrator.
2. **Player.** The whole screen is the session. Large pause ring, a pause button, a "that one got me" tap, replay last, speed control for the native voices (0.8x to 1.2x), and a session timeline as a thin bar. No text of the sentence during the session. Lock-screen controls on iOS.
3. **Na de les (After).** Optional transcript with *de/het* colours, the culture asides as text, the option to start the two-minute Herhaling or the next klets.
4. **Het pad (The path).** The level map: core spine down the middle, four strands branching off, Brevet at the bottom. Strands can be hidden.
5. **Luisteren.** The listening files at speed, downloadable, meant for the bike or the washing up.
6. **Instellingen.** Voices, transcript on or off, downloads, account, subscription, and the daily email: address, time, days of the week, pause.

### 8.2 Onboarding

Three questions (why Dutch, which strands apply, how much Dutch already), then the spoken self-check, then straight into the first klets. The first klets is free with no account. From the second klets the learner gives an email address, which is both the login (a magic link, no password) and the address for the daily email. Paywall after the first twenty kletsen of the chosen level.

### 8.3 Optional record and compare

Record your attempt during the pause, then hear yours and the native voice back to back. No scoring. Off by default. Nothing leaves the device. Pronunciation scoring can come later if users ask for a number, and Azure supports nl-NL if we ever want it.

### 8.4 The daily klets email

The email is the spine of the habit and replaces streaks.

- **One email a day, at a time the learner chooses** (default 07.30 local time), on the days they choose. It names today's klets, says what it is about, gives the key Dutch phrase as a hook and has one button: *Start je klets* (five minutes). The button deep-links straight into the player with the learner signed in.
- **Done means finished, not opened.** A klets is ticked off when the player reaches the end. The app reports that to the server; if the phone was offline it reports when it is next online.
- **If it is not done, tomorrow's email points at the same klets.** No guilt, no counter of missed days on the first few misses. The copy changes tone gently: day one *"Vandaag: Klets 7, Bij de bakker"*; day two *"Klets 7 is still waiting for you, no rush"*; from day four the email offers a two-minute *proefje* of three phrases as a way back in. The content never moves on without you.
- **Pause and unsubscribe in one tap** from every email. Holiday pause with a return date. After fourteen days of silence the emails drop to one a week until the learner comes back.
- **Two people, two emails.** Each profile has its own address, time and days, so a household on different levels each gets their own klets.
- **Nothing to read in the email except the hook.** The learning happens in the app, out loud. The phrase in the email is there so that people who only skim still meet one piece of Dutch a day.

### 8.5 Tone of voice

First person, warm, plain, a little cheeky, never cute. The narrator is a person who learned Dutch as an adult and remembers how it felt. Examples:

- *"You just said your first sentence in Dutch out loud. That is more than most people manage in a year."*
- *"You will get this wrong a few times. Good. That is the bit where it sticks."*
- *"Take one biscuit. Only one. I will explain later."*

Copy rules match your own writing preferences: British spelling, no contractions, no comma before *and* in a short list, plain words.

### 8.6 Visual direction

SaySomethingin's look could not be inspected directly, so this is our own direction rather than a copy: a single-purpose player, lots of space, one accent colour, large type, dark and light themes. Suggested palette: warm off-white and deep ink, with Dutch orange used sparingly as the action colour and a second accent of canal green for progress. Typography: a friendly humanist sans for the interface and a rounded display face for the narrator's lines. Illustration: small line drawings of the scenes (a biscuit tin, a Gamma trolley, a schoolbag on a flag). Every screen must work at phone width with one thumb.

## 9. Technical outline

### 9.1 Recommendation

Build the web app as an installable Progressive Web App, then wrap it with **Capacitor** for the App Store. For the household trial use plain HTML, CSS and JavaScript with no build step and no dependencies, as the other apps in this repository do; move to **Vite, TypeScript and Svelte** when the proper build starts. On iOS, playback and downloaded audio go through native plugins from day one, because WebView audio stops when the screen locks and Safari can evict cached files after seven days. Abstract playback behind one interface with a web implementation and a native implementation.

Why not the current single-file vanilla style of the other apps in this repository: offline audio packs, spaced repetition state, accounts and payments justify a build step. Why Svelte: small output, easy to read, no framework overhead in the player. React with Expo is the credible alternative if you prefer one runtime for web and native.

### 9.2 Pieces

- **Content:** lesson scripts as JSON (prompt, target, chunk IDs, pause length, audio refs, level and strand tags). Scripts live in the repository; audio is generated from them and packed per session.
- **Audio:** two Flemish voices, one female and one male. EU-first order of preference: (1) human recordings by two Flemish speakers, which is the most sovereign option and the best quality, and for a household trial of 300 phrases is under an hour of recording; (2) Acapela (Belgium), a long-standing EU text-to-speech vendor with Belgian Dutch voices; (3) Piper, open source and self-hosted on our own EU server, free but noticeably robotic. The best-sounding neural Dutch voices (Azure, Google, Amazon, ElevenLabs) are all US companies; if the EU options are not good enough, that is a quality-versus-sovereignty decision to take explicitly, not by default. A native Dutch speaker audits 200 random sentences for stress and the g, ch and ui sounds before launch.
- **Scheduling:** authored interleaving in the script, plus ts-fsrs for the optional review block.
- **Storage:** Dexie (IndexedDB) for progress and settings, Cache API on web and Capacitor Filesystem on iOS for audio packs, progress synced to an EU-hosted backend.
- **Backend:** small but present from the first build, because a page in a browser cannot send email on a schedule while it is closed. Needed: a store of learners (email, time zone, send time, days, current klets, completed kletsen), a job that runs every fifteen minutes and sends the emails due, an email sender and an endpoint the app calls when a klets is finished. Recommended, EU-first: one small Hetzner (Germany) cloud server in Falkenstein at about €5.50 a month running Caddy for TLS, a small Node service, SQLite and a systemd timer for the email job. Scaleway (France) serverless jobs and object storage are the managed alternative. Email through Scaleway Transactional Email (France; 300 a month free, then €0.25 per thousand) or Brevo (France). Payments later through Mollie (Netherlands), not Stripe.
- **Login:** magic link by email. The learner already gives an email for the reminders, so there is no password to invent. The daily email's start button carries a short-lived token that signs the learner in on that device.
- **Privacy:** email and progress events only. No microphone audio leaves the device. EU hosting. Sixteen plus terms.

### 9.3 EU sovereignty: what is EU, what is not

The rule is EU-based companies and EU-hosted data wherever a workable option exists, and an explicit note where it does not.

| Component | EU choice | Notes |
|---|---|---|
| Domain and DNS | Theory7 or INWX (NL, DE) for the registration; DNS at the registrar or Hetzner DNS (DE, free) | EU throughout. EURid, the .eu registry, is in Brussels. |
| Hosting, database, scheduled email job | Hetzner (DE) server in Falkenstein, or Scaleway (FR) | EU throughout. Replaces the earlier Cloudflare and Supabase suggestions, both US. |
| Email sending | Scaleway Transactional Email (FR) or Brevo (FR) | EU. The recipients' own mailboxes (Gmail, Outlook) are outside our control. |
| TLS certificates | Buypass (Norway, EEA) or ZeroSSL (Austria) via ACME | Let's Encrypt is a US non-profit; Caddy can use either alternative. |
| Fonts | Self-hosted, sourced from Bunny Fonts (Slovenia) | Never load from Google Fonts. |
| Flemish voices | Human recordings (decided), then Acapela (BE), then self-hosted Piper nl_BE | **Not fully possible at top quality from a vendor.** The best neural Belgian Dutch voices are US (Azure nl-BE, Google, Amazon Lisa). ReadSpeaker is Dutch-founded but owned by HOYA (Japan). Human recording sidesteps the problem. |
| Pronunciation scoring (later, optional) | Self-hosted Whisper on our EU server, or Mistral Voxtral (FR) for transcription | **Not possible for scoring.** No EU service offers phoneme-level pronunciation assessment for Dutch; Azure is the only one found. Recommendation stands: do not score. |
| Payments (later) | Mollie (NL) or Adyen (NL) | EU. |
| Analytics and error tracking | None for the trial; Plausible (Estonia) or self-hosted Matomo later | EU. |
| Frontend code (Svelte, Vite, Capacitor) | Open source, MIT licences | Origin is mixed and partly US, but nothing runs on their servers and no data flows to them. For the trial, plain JavaScript with no build step and no dependencies avoids the question entirely. |
| Package registry (npm) | Vendored dependencies, or none | **Not possible to replace.** npm is owned by GitHub (Microsoft, US). Keeping dependencies to zero or vendoring them removes the runtime exposure. |
| Code hosting | GitHub today | **Not EU.** Codeberg (Germany, non-profit) is the EU alternative and a mirror there is easy. This assistant's session can only push to GitHub, so a move means adding a second remote on your side. |
| The AI building it | Anthropic (US) | **Not EU.** Stated for completeness. Mistral (France) is the EU alternative if that matters to you. |
| App Store distribution (later) | Install from the web as a home-screen app, which needs no store | **Not possible via Apple** without Apple (US). The DMA allows alternative marketplaces in the EU but their reach is small. Push notifications also go through Apple and Google, which is one more reason the reminder is email. |

### 9.4 App Store path

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
| 0. Household trial, stage 1 | Web only. The player and one klets of about 30 phrases spoken in the pause, two generated voices, one profile. | Prove the loop feels right and the voices are good enough. |
| 0. Household trial, stage 2 | Two profiles (A1 and A2), ten kletsen per level with recombined sentences, the "that one got me" tap, the daily email with tick-off and carry-over, magic-link login. | Does the recycling make things automatic? Does the email bring you back? |
| 0. Household trial, stage 3 | Transcript peek, listening at speed, the review block, one Winkelen scene per level. | Which supports matter. Does situation-based content beat general content. |
| 1. A1 on the web | Full A1 (core and four strands), offline, Mollie payments, native audit of the Dutch, five outside testers. | Launch to a small paying audience. |
| 2. A2 and iOS | A2 content, Capacitor wrap, native audio, App Store submission, in-app purchase. | Broaden distribution. |
| 3. B1 | B1 content, record and compare, weekly narrator email. | Retain learners past the beginner cliff. |
| 4. B2 | B2 content, the email scene with text, Netherlands awareness module. | Complete the promise. |

No timelines here on purpose. Each stage of the household trial is days, not weeks, and each stage must put phrases in your mouth on its own. Each content level after that is months of authoring. The trial's success test: after two weeks, did both of you finish eight or more kletsen without forcing it, and did either of you use a phrase on a real Dutch person?

## 12. Risks and where I disagree with the brief

- **The market is small.** Dutch learners are mostly in Belgium and the Netherlands and many get by in English. Flanders alone is a niche within a niche, but it is the one nobody serves: every Dutch app teaches Hollands, and a Fleming can hear it in one sentence. This is a good product for a niche, not a growth business. Price it accordingly: around €8 a month or €60 a year, or a one-off price per level, which audio learners like.
- **Content volume is the cost.** Eighty hours of scripted, checked, interleaved Dutch is the equivalent of writing several textbooks. Start with A1 and see whether people finish it before committing to B2.
- **Pure audio has limits at B2.** B2 is about nuance and register and the Dutch you meet at B2 is often written (school emails, quotes, contracts). The course should admit that and add reading at B2 rather than pretend. I have done that in the Ouders strand and I would do it in Klussen for quotes too.
- **The Dutch switch to English.** If the app does not train learners to hold the conversation in Dutch, the rest is wasted. I have made this a core module at every level. It is the feature I would market hardest.
- **Voices.** With human Flemish recordings the risk moves from synthetic voices to consistency: same speaker, room and microphone for every session, and enough sessions to cover 1,000 kletsen over time.
- **Overwhelm.** SaySomethingin's learners report feeling lost early on. The three-in-four rule, the optional pause and the transcript peek are there to soften this without losing the method.
- **Naming.** Own name, generic description of the method, no reuse of anyone's scripts.

## 13. Decisions I need from you before building

1. **Name.** Decided: Klets.
2. **Variety.** Decided: Belgian Dutch first, because you live in Flanders. A Netherlands edition of the strands can follow.
3. **Voices.** Decided: human recordings by native speakers, lists in content/.
4. **Transcript peek after sessions.** I recommend yes, off by default at A1.
5. **Stack.** Decided in outline: EU-first (section 9.3), plain JavaScript for the trial, Vite and Svelte with Capacitor later.
6. **Pricing model.** Subscription, per-level purchase or both.
7. **Which strand goes into the prototype.** I suggest Winkelen because the checkout script is short, universal and instantly useful.
8. **Who checks the Dutch.** A native NT2 teacher needs to review every script. Do you have someone, or should the plan include finding one?

Decided so far: the name is Klets; the app lives at klets.mclworks.eu (domain at INWX); hosting on Hetzner, email via Scaleway (see SETUP.md); voices are human recordings (see content/RECORDING.md); the first build is a private household trial on the web for two learners at A1 and A2; the daily email with tick-off and carry-over is part of the trial. Once the rest is decided, the first build is stage 1 of the trial.

---

Appendices in `research/`:
- `01-saysomethingin-method.md` - the method, product, community and comparisons with Pimsleur, Michel Thomas and Language Transfer
- `02-cefr-dutch.md` - CEFR descriptors, Dutch exams, hours, vocabulary sizes, grammar by level, resources and pronunciation
- `03-scenario-vocabulary.md` - situations, rules, vocabulary and scenes for the four strands
- `04-competitors-and-technology.md` - competitor table, architecture, audio generation, speech, spaced repetition, pricing and legal

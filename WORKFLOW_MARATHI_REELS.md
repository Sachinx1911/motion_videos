# Marathi Motion-Graphics Reels - Master Workflow (any brand)

One workflow for every Marathi Instagram reel we make - Spardha Times (MPSC), SRS Dwell (real estate), or any new page/client.
Built from: MASTER_PROMPT.md, MOTION_GRAPHICS_GUIDE.md, SKILL_spardha-motion-reels.md, HANDOFF_GUIDE.md and everything learned on 13 reels (Oct 2026).
If two files disagree, THIS file wins, then MASTER_PROMPT.md.

---

## 0. Start of every session
1. `git pull` (repo `Sachinx1911/motion_videos` is the single source of truth - Mac and Windows).
2. Check machine: Mac -> `python3`, mlx-whisper, 4 render parts. Windows -> `python`, faster-whisper, 6-8 parts, no `/tmp`.
3. Ask (once) which BRAND the reel is for, unless obvious. Load its profile from section 1. New brand -> fill the template in 1.4 first.
4. Each reel gets its own folder `reel_<topic>/` (raw/, site/, site/a/, out/).

---

## 1. Brand profiles

| | Spardha Times (स्पर्धा टाइम्स) | SRS Dwell |
|---|---|---|
| Topic | MPSC / competitive-exam GK, maps, polity, current affairs | Real-estate info: UDCPR, RERA, redevelopment, CIDCO, buying tips |
| Audience | 18+ aspirants (not kids) | adult home buyers, society members, plot owners in Maharashtra |
| Logo | white rounded tile, black "स्पर्धा" over red "टाइम्स", top-left | `brand/srs_dwell_logo.png` (gold) / `_white.png`, top-left x205 y300 |
| Palette | navy + red + gold, white cards | champagne gold #e8cf9f/#c9a66f/#b8935f, navy #0d1729/#1b2a45, ivory #faf7f2 |
| Mascot | Ramu (chubby Marathi farmer) - ONLY in general-knowledge explainers, 55-75% of frame height; never in promos / serious MPSC-question reels | NONE (user decision) |
| Address viewers | "मित्रांनो" ok | neutral |
| Outro (voice) | "अशाच स्पर्धा परीक्षा संबंधित माहितीसाठी आत्ताच स्पर्धा टाइम्सला फॉलो करा!" | "अशाच real estate माहितीसाठी आत्ताच आमच्या पेज ला फॉलो करा!" (brand name not spoken) |
| Footer / disclaimer | source line if needed | UDCPR reels: "* UDCPR-2020 नियम X - मुंबई (MCGM) सोडून"; CIDCO reels: "CIDCO चा अधिकृत video नाही" |
| Legal care | Survey-of-India maps for LOC/LAC/PoK | no guaranteed returns, no fake numbers, quote regulation / GR, no govt logos as if official |
| Hashtags (5) | #MPSC #स्पर्धापरीक्षा #MPSCMarathi #GK #SpardhaTimes | #RealEstateMarathi #MaharashtraRealEstate + 2 topic tags + #SRSDwell |

### 1.4 New brand template (fill before the first reel)
Name - topic - audience - logo file + placement - palette (3 colours) - mascot yes/no - outro line - footer/disclaimer - 5 base hashtags - tone (formal / friendly). Save it as a new column above and commit.

---

## 2. Working with the user (always)
- Reply in Marathi (Devanagari), short, address as "सर". English digits, hyphen (-), never em dash. Use ◾ main points / ➢ sub-points, no bold.
- Never build until he says "कर / बनव / video banav / suru kar". Voice or images arriving = only check and report.
- "थांब" = stop, just save. "दे / संपूर्ण दे" = everything at once. "पहिल्यापासून व्यवस्थित दे" = full numbered list again from 1. "तूच ठरव" = decide, say it in one line, continue.
- Corrections all together at the END, exactly:
  ⚠चूक कुठे आहे नेमकं - ... / ❌ चूक काय आहे - ... / ✅ बरोबर काय हवे - ..., सर.
- Images come without numbers - identify each, map to scene, report missing/defects (stray text, ✦ watermark, wrong size, duplicates).
- If his list misses an obvious item, add it and say so.
- After every step: commit + push.

---

## 3. Content rules
- FACT-CHECK GATE (mandatory, before voice): list every number, date, ratio and claim in the script; check each against the source file (CSV/PDF/research.md) with a calculation, recompute ratios and totals, and confirm spelled-out Marathi numbers match the digits (76,500 = शहात्तर हजार पाचशे). Never round into a false claim ("200 पटीहून जास्त" when one is 198x → "जवळपास"). Show a fact-check table with the script for approval. Voice re-recording costs the client money.
- Hook in first 2 s: twist / shocking fact / direct question. Never "अरे थांबा!".
- Every script = hook -> short story or example -> facts -> twist/climax -> engagement -> outro. Save-worthy (checklist / numbers).
- Pack static facts (numbers, dates, rule numbers) so motion graphics have something to animate.
- Only 100% sure facts. Research online from 2+ sources for news/GR/rules; save `reel_<topic>/research.md` with links; flag disagreements. Unconfirmed figures stay OUT of the script.
- Never: political, caste/religious, violence ("खून", "गोळीबार", blood), accusations ("भ्रष्टाचार") against bodies, celebrity faces.
- Updated names: छत्रपती संभाजीनगर, अहिल्यानगर, धाराशिव.
- ENGAGEMENT in every reel (user rule): one of - numbered vote ("1, 2 की 3? फक्त नंबर लिहा"), "तुमचा size/node/stage comment करा", mid-video quiz answered later, keyword comment, myth-vs-fact. Show it as a card in the last 10 s; caption ends with the same question.
- NEWS FRESHNESS (user, 25 Oct 2026): re-verify every number/date on the day the script is written, prefer official sources (CIDCO, MahaRERA, NMMC, GR) over news; put "* माहिती दि. <date> पर्यंत" in the footer; if a scheme has closed, change the angle ("पुढची lottery येतेय", "मागच्या lottery तून शिका") instead of using stale figures.
- INDEPENDENT VOICE (user, 25 Oct 2026): we inform the public, we do NOT work for CIDCO / builders / govt. Never sound like a promotion: no "सुवर्णसंधी", "लवकर अर्ज करा", "आत्ताच book करा"; always include the buyer's side - risks, delays, hidden costs, what to check, past complaints (water, possession, transfer charges); use "CIDCO म्हणतं..." / "योजना सांगते..." phrasing, show both sides; CTA is "तुमचा अनुभव comment करा", not "apply now". Footer "CIDCO चा अधिकृत video नाही" stays on CIDCO reels.
- Series: if a topic goes viral, make "भाग 2" and reference भाग 1 in the voice + on screen.

---

## 4. The pipeline (gates in CAPS = wait for the user)

| # | Step | Output | Gate |
|---|---|---|---|
| S1 | Topic list (use research/udcpr/TOPICS.md or brand list) with angle + engagement idea, recommend one | 3-4 options | USER PICKS |
| S2 | Research | research.md + sources | - |
| S3 | Script (75-95 s, emotion tags, voice number rules) | script in chat | USER "ठीक" -> save `reel_x/script.md` + `scripts/NN_<Topic>.md`, push |
| S4 | Image prompts grouped by Flow size + cut-out list + scene table | prompts in chat | - |
| S5 | Images arrive -> rename into raw/, watermark out, cut-outs, contact sheet, report | raw/, site/a/ | - |
| S6 | Voice arrives -> trim, Whisper check (isolated snippets for numbers), cue_words.json; wrong line -> give exact line to re-record -> splice | vo_t.wav, cue_words.json | RE-RECORD if needed |
| S7 | New look? render 2-3 STYLE FRAMES first | out/style_frames.jpg | USER OK |
| S8 | Storyboard: build all scenes, key frame per scene with safe-area guide, overlap check | out/storyboard_safe_area.jpg + scene list | USER "बनव" |
| S9 | Render: sfx -> audio -> parallel parts -> concat -> 2-pass | out/<Brand>_<Topic>.mp4 | - |
| S10 | QC (section 10) - fix and re-render parts | - | - |
| S11 | Deliver: file link, ◾/➢ summary, corrections, sources; then caption + pin comments when asked | - | - |
| S12 | Commit + push (raw, voice, site, final mp4; never intermediates) | git | - |

---

## 5. Voice (ElevenLabs "Bunty", Eleven v3, Stability Creative)
- Tags only: [excited] [confident] [serious] [curious] [punchy] [proud] [warmly]. NEVER [whispers] / soft tags / pause tags / "...". Loud, fast, energetic.
- Short sentences. English terms with Marathi meaning (Carpet Area - वापरण्याजोगी जागा).
- NUMBERS (tested): round hundreds in romanized words - "shambhar", "teenshe" (digits "100" -> "एकशे"; even Devanagari "शंभर" failed once). Decimals "27 पॉइंट 87". Rule numbers "9 पॉइंट 2 पॉइंट 1". "%" -> "टक्के". sq.ft -> "स्क्वेअर फूट", sq.m -> "चौरस मीटर". Big numbers in Marathi words ("दोन हजार सहाशे पंचवीस"). On screen keep normal digits.
- Acronyms ElevenLabs mispronounces: write them in Devanagari in the voice script - CIDCO -> सिडको (user, 26 Oct 2026). Screen text keeps the English acronym.
- Re-record ONE line, not the whole voice; splice with `tools/splice.py` (cuts snap to silence - never cut inside a word: the TDR "हक्क" glitch).

---

## 6. Image prompts (Google Flow / Nano Banana)
- Sizes available: 16:9, 4:3, 1:1, 3:4, 9:16 only. Backgrounds 9:16; object cut-outs 3:4; round/compact objects 1:1; panoramas 16:9.
- GROUP prompts by size: "Flow मध्ये 9:16 निवडा" block, then 3:4, then 1:1. Size also in each heading.
- Each prompt: first line "Size 9:16 vertical." -> real-photo description (camera + lens + f-stop, natural light) -> "Realistic, no CGI look." -> "No text, no labels, no logo, no watermark." Documents/books: add "no emblem, no national symbol". People: "not famous people", hands only when possible. Cut-outs: "on a pure plain white background, soft studio shadow".
- Images must TELL the story of the sentence (hand signing a contract, lawyer + PMC reviewing, shield on bank paper) - not empty rooms. This was the #1 reason Redevelopment-Karar v1 was rejected.
- Every reel gets NEW images (no reuse).
- After prompts: table "script line -> image -> what code draws on top".

---

## 7. Design system
### 7.1 Instagram safe area (1080x1920)
Logo top-left x205 y300 (w~170). Key content y 250-1480, x 110-970. Between y 880-1700 nothing right of x 860. No text below y 1480. Footer next to logo row (y~300-370). Check with `site/index_safe.html`.

### 7.2 Look that the user approved (reference board, 14 Oct 2026)
- Full-bleed real photo per scene (slow push-in) + light top/bottom shade.
- Numbered header pill: navy circle number + bold title on white pill (y~470).
- White rounded icon cards: coloured icon tile (gold/navy/red) + bold 40-46 px text, staggered in on the spoken word.
- Red banner with ⚠ for warnings ("सही करू नका!", "उशीर = दंड"), slight tilt, stamp entry + shake.
- Photo tiles (2x2) with ✓ chips for lists of things (amenities).
- Documents + stamps landing ("REGISTERED"), floor plan with highlighted room, timeline bars, counters.
- CTA: 3 option tiles with icons -> "Comment करा!" pill + cursor tap -> green WhatsApp share pill -> outro logo + Follow button + click + confetti.
- Fonts: Poppins; headings 800, body 600-700. Never letter-spacing on Devanagari.
- Rejected looks: neo-brutal stickers, plain blueprint, light editorial with tiny text, dark card-only scenes with empty-room photos ("chutiya" feedback).

### 7.2b VARY THE LOOK EVERY REEL (user, 25 Oct 2026)
Two consecutive reels must never share the same design system or image style. Before S4 (prompts) pick and NAME: storyboard type (7.5), palette (not always ivory/gold/navy), card language (white icon cards / dark glass / paper cut-outs / sketch / 3D), typography accent, transition, AND image style (authentic photo / archival B&W / isometric render / flat-lay / sketch-to-render / cinematic night / halftone collage). Keep only the logo + safe area constant. Log the look used in the reel's script.md so the next reel avoids it.
### 7.3 Motion (never static)
Glass/white cards, gold gradient numbers, count-ups, self-drawing arrows/lines, camera punch on key words, shake on stamps, constant slow zoom, grain + vignette, particles. Every animation is tied to a WORD (`C('word', approxTime)` from cue_words.json), not to a hard-coded time - a re-recorded line then re-times automatically.

### 7.4 Transitions
A NEW one per reel, with a reason (continue camera move, match cut object -> next scene). Library: flash, light sweep, gold wipe-line, blinds, diagonal bars, vault ring + iris, warp zoom + speed lines, plot-grid TILES, paper tear, brush wipe, clouds, frost, book fly-in, light leak. One whoosh per cut.

### 7.5 Storyboard types (pick 2-4 and name them)
Cinematic, Minimal, Explainer, Photorealistic, 3D Architectural, Infographic, Before-After, Problem->Solution, Character, POV, Split-screen, Motion graphic, Documentary, News/Breaking, Social-native, Whiteboard, Isometric, Editorial, Timeline, Metaphor. References: `research/reference_styles/STYLE_LIBRARY.md`.

### 7.6 Maps / 3D
Maps only from real data (`brand/geo/`, Natural Earth, district data) + NASA/Esri imagery - never AI maps. "3D" = real 3D (extruded regions, camera orbit, 3D text).

---

## 8. Audio
- Voice + synthesized SFX, NO music. `FXG=0.24 DUCK=0.4 END=<len> python3 ../tools/audio.py` -> about -15 LUFS, voice clearly louder.
- No bell-type sounds (ding, chime, bell, coin, sparkle). One sound per beat (none within 0.15 s). Sound lands on its word, visual on the same frame.
- Voice gaps capped ~0.25 s (`tools/trim.py`).

---

## 9. Tools (run inside `reel_<topic>/`)
| Tool | Use |
|---|---|
| `trim.py` | vo.mp3 -> vo_t.f32 / vo_t.wav (pauses capped) |
| mlx-whisper (Mac) / faster-whisper (Win) | `whisper-large-v3-turbo`, language mr, word_timestamps, 20 s overlapping chunks -> cue_words.json; numbers re-checked on 2-4 s clips in mr + hi |
| `splice.py BASE LINE A B` | replace one line, cuts snapped to silence |
| `isnet.py names...` | cut-outs; cream/white objects -> `keycut.py` (or LAB matte) |
| `render.py shots t1,t2 x out/sh` + `sheet.py N` | key frames -> out/sheet.jpg (PAGE=site/index_safe.html for guide) |
| `overlap.py 0.1 END` | no text/object may cross another (mark intended overlays `allowOver:1`) |
| `render.py sfx 0 0 out/sfx.json` -> `audio.py` | SFX list + mix |
| `render.py video a b out/pN.mp4` | parallel parts |
| encode | concat -> 2-pass x264 with `-vf "scale=in_range=full:out_range=tv,format=yuv420p" -color_range tv`, bitrate for ~27-28 MB (2250k for 95 s, 2800k for 75 s), AAC 128k, `-movflags +faststart` |

Watermark ✦ bottom-right: patch with nearby texture (best-match offset + feathered mask), never blurry inpaint.

---

## 10. QC checklist (before telling the user it is done)
- [ ] 2 fps frame sheets of the FINAL mp4 - no empty frames, no clipped/overlapping text, everything in the safe area.
- [ ] overlap.py clean (only intended overlays).
- [ ] Splice joints: no double words / clicks (check 1 s around each cut).
- [ ] Loudness ~-15 LUFS, peak < 1.0, no bell sounds.
- [ ] Facts on screen match research.md; footer/disclaimer present.
- [ ] File plays: yuv420p, TV range, size <= 29 MB, duration = voice.
- [ ] Commit + push.

---

## 11. Lessons learned (do not repeat)
- Digits "100" read as "एकशे" -> use "shambhar" (TDR, Bedroom).
- Splice cut inside a word -> double "हक्क" glitch -> always snap to silence.
- yuvj420p file would not open -> always TV-range yuv420p.
- Whisper chunks drop words at boundaries -> overlapping chunks.
- Logo cut on phones -> safe area rules + storyboard before render.
- Empty-room photos + tiny pale text = rejected video -> story-telling images + reference-board design.
- Government logos (CIDCO) -> only as name text unless user insists; add "अधिकृत video नाही".
- Unverified big numbers in hook (₹2,125 कोटी) -> safer verified hook ("3-4 पट").
- Bank guarantee under GR 30 Sep 2026 is set by the general body (no fixed %).

---

## 12. Delivery templates
Caption: hook line (shown before "more") -> 3-7 short ◾-style lines of value -> engagement question with numbered options -> save/share line -> disclaimer if any -> 5 hashtags. Write like a person, not like AI.
Pin comment: (a) the vote question, (b) link to भाग 1/भाग 2 on profile, or (c) "save करा" reminder. Tell the user to reply to comments in the first hour.

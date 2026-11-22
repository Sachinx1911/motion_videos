# SRS Dwell - VIDEO RULES (portable brief, 22 Nov 2026)
Paste this whole file into any tool / chat / editor so the video comes out the same way. Source of truth: MASTER_PROMPT.md §4-4d and WORKFLOW_MARATHI_REELS.md.

## 1. Format
- 1080 x 1920 (9:16), 30 fps, H.264 + AAC, file under 29 MB.
- Length 55-65 s. ONE idea per reel. Script 155-175 words (after 1.12x speed-up).
- Languages: Marathi / Hindi / English. Numbers as English digits on screen.

## 2. Structure (every reel)
1. Hook, 0-3 s: a shocking number or a question. Daylight photo, text on a navy glass box.
2. Body: 3-4 numbered sections (pill "1 · ...", "2 · ..."), progress bar on top.
3. One-line verdict / comparison.
4. CTA: question card + Instagram-style comment box (answer types itself, Post is clicked, comment posts with a heart).
5. Outro, 2-3 s: SRS Dwell gold logo card in the centre, Follow pill directly under it that flips to "Following ✓". Source / disclaimer line only here. End 1.3-1.5 s after the last spoken word (no long silence).

## 3. Safe area (1080 x 1920)
- Instagram covers the top 220 px, the bottom 420 px, and the right side (x > 890) from y 860 down.
- All key text and graphics: x 110-970, y 250-1480.
- Between y 880 and 1700 nothing right of x 860.
- Nothing below y 1600, except the comment box (may reach y 1730).
- Logo: top-left corner, white logo, width ~190 px, centre about x 128, y 108 (as in the approved reels). If the platform crops the top, use x 205, y 300, width 170.
- Top band: progress bar at y ~104 (x 350-1010), small series chip at y ~162 on the right. HUD items must never touch titles or pills.

## 4. Layout grid (max 3 things on screen)
- TITLE slot y ~395-430: one line.
- HERO slot y ~980-1000 (centre): one cut-out, card, number or stamp.
- CAPTION slot y ~1480: one card or pill. A new caption REPLACES the old one.
- Nothing floats at random positions. A cut-out appears only on the word that names it and leaves when the sentence ends.

## 5. Look ("first style", approved reference = Index II v3b and China vs India v1)
- Palette: navy #3d5a94 → #15264a (never darker, never black), gold #f2dfb6 → #c9a66f, bright coral red #ff5a48 / #e8382a, ink #0d1729, ivory card #faf7f2.
- Backgrounds: photo-real, DAYLIGHT, with a navy gradient tint top and bottom. Weak vignette, light bokeh.
- Text: white on dark, ink on white cards. NO gradient-coloured words. A stressed word sits on a gold pill (good / fact) or red pill (problem / warning).
- Cards: white glass cards with rounded corners (24-28 px), gold icon tile on the left.
- Font: Poppins (covers Devanagari). Titles 800 weight 56-62 px, big numbers 900 weight 96-120 px, card text 40-52 px, footer 21-22 px. Text never spills outside its card.
- No subtitles. Only key words and numbers on screen.
- One theme from first frame to last: outro and CTA use the same backgrounds and palette, never a plain colour screen.
- Alternative look for Hindi/English "TRUE CASE" riddles: flat 2D cartoon backgrounds, English labels on yellow #ffd23f / red #e8382a boxes rotated -2°, "TRUE CASE" tag top-right.

## 6. Motion
- Text and animation land ON the spoken word, never before it.
- A word-driven animation must finish before the next cue word: duration = min(0.45 s, gap to next word - 0.05 s).
- Everything moves: slow push/zoom on every background, nothing static for more than ~3 s.
- Entrances: pop, slide up, stamp (for warnings), zoom (for the big answer). Exits: quick fade.
- Section changes get a big transition (gold bars, blinds, ring, light sweep); a new one per reel. Cuts only on sentence boundaries.
- Counters count up to the number while it is spoken. Table rows wipe in one by one on their words.
- Blur-behind focus only at the 2-3 key reveals (big number, the answer, final stamp, outro logo): mild, 3-4 px blur + 15-18 % darker. Never everywhere.
- No invented decorative props (pens, magnifiers, random icons). Use real cut-out images; data graphics (bars, counters, charts, flags, checklists) may be drawn.

## 7. Voice and timing
- Voice: ElevenLabs "Bunty", energetic, clear. Never whisper. Emotion tags: [excited] [confident] [serious] [curious] [punchy].
- Speed up 1.12x, trim pauses to 0.15 s.
- Word timings from Whisper word timestamps (not forced alignment: it drifted 2 s on mixed Hindi/English). Check every sentence start before building.
- URLs are never spoken.

## 8. Sound
- No background music (optional very low tone bed). No bell-type sounds (ding, chime, coin, sparkle).
- Three sounds only: soft pop on labels, swoosh on cuts, impact / stamp on the 3-4 big reveals. Plus typing ticks + click on the comment box.
- One sound per beat: never two sounds within 0.15 s. Each sound lands on its word and its visual.
- Voice clearly louder than effects. Final loudness about -15 LUFS.

## 9. Content rules
- Every number has a source and date; fact-check table in the script file. Unverified claims are left out.
- No society / builder / person names in true cases. No real ID cards or government documents on screen.
- Outro footer: "* स्रोत: ... · कायदेशीर / गुंतवणूक सल्ला नाही".
- Caption: hook in the first line, short, exactly 5 hashtags.

## 10. Images
- Backgrounds: 9:16, photo-real, daylight, "no text, no logo, no watermark".
- Cut-outs: object on solid pure green (or transparent PNG), full object, no shadow.
- Sizes allowed: 9:16, 3:4, 1:1, 4:3, 16:9.
- AI video clips: never ask for text, numbers or Devanagari inside the clip; text is added afterwards.

## 11. Pre-render checklist (one pass, before every render)
1. No overlaps (top band especially). 2. No gradient text. 3. Fresh navy, daylight hook. 4. Text on its word. 5. Slot grid respected. 6. Sounds not doubled. 7. Safe area respected. 8. Outro: logo + Follow under it, short ending. 9. Sources in footer. 10. File under 29 MB, about -15 LUFS.

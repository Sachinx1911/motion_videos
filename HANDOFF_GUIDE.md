# स्पर्धा टाइम्स - Reel बनवण्याची संपूर्ण पद्धत (Handoff Guide)

> **मराठी सारांश:** ही फाईल आणि सोबतचा zip दुसऱ्या Claude ला द्या. यात लिहिलं आहे:
> - मी (Claude) reels कसे बनवतो.
> - तुमच्या सगळ्या आवडी-नावडी आणि नियम.
> - script, image prompts, voice, animation code, sound आणि render हे सगळं टप्प्याटप्प्याने.
>
> तो Claude याच पद्धतीने पुढचे reels बनवू शकेल.
>
> **For the next Claude:** Read this whole file before replying to the user. Section 1 (working rules) matters more than the code.
> The zip contains working source for three finished projects:
> - Seasons reel: `reel_seasons/`
> - Book promo: `promo_book/`
> - Maharashtra formation reel: `reel_maharashtra_sthapana_scenes.js`
>
> It also contains the shared engine (`engine/`) and the Python tools (`tools/`).

---

## 0. Output spec

| Item | Value |
|---|---|
| Format | 9:16 vertical, **1080×1920**, 30 fps, H.264 + AAC |
| Length | 50-120 s (follows the voice exactly) |
| File size | **≤ 29 MB** (chat upload limit). Use a 2-pass x264 encode at the bitrate that fits. |
| Fonts | **Poppins** for video text (it covers Devanagari). The user chose it explicitly. |
| Audio | User's ElevenLabs voice + synthesized SFX. **No background music.** |
| Brand | "स्पर्धा टाइम्स" logo: white rounded tile, black "स्पर्धा" over red "टाइम्स". Top-left in reels. |

---

## 1. Working with this user (MOST IMPORTANT)

### Communication
- The user writes romanized Marathi or Marathi. **Reply in Marathi (Devanagari)**, short and clear, and address him as **"सर"**.
- Always use **English digits** (1, 2, 3) and a **hyphen (-)**, never an em dash.
- **Do not start building until he says "कर" / "yes kar" / "suru kar".**
  - Propose the idea, then the script, then the prompts, then wait.
  - If he says "थांब" or "lagech karu nko", stop and only save the files.
- When he says "दे" or "संपूर्ण दे", give **everything at once**. Do not ask for confirmation part by part.
- Corrections (factual or grammar) go **all together at the end**, in exactly this format:
  ```
  ⚠चूक कुठे आहे नेमकं - ...
  ❌ चूक काय आहे - ...
  ✅ बरोबर काय हवे - ..., सर.
  ```
- He sends images **without numbers**. Identify each image yourself, then say which ones are missing or have defects (stray text, wrong shapes, watermark).

### Content rules
- Audience: **18+ MPSC / competitive-exam aspirants**, not children. Use simple language, but no childish explanations.
- **Never** include:
  - controversial, political, caste or religious content
  - violence, killings, blood, "गोळीबार"

  Instagram flags these (he said "खून वगैरे नको नाहीतर त्याला error येतो").
- Stay on topic. He dislikes side points ("मुद्दा सोडून भरकटत आहे").
- Hooks: start strong and energetic. **Avoid the old-style opener "अरे थांबा!"**
- Standard outro line: "अशाच स्पर्धा परीक्षा संबंधित माहितीसाठी आत्ताच स्पर्धा टाइम्सला फॉलो करा!"
- Only state facts you are 100% sure of. If an exam fact looks wrong in his source, flag it at the end. Example: his book said 2025 women's chess World Cup = Goryachkina, but the winner is **Divya Deshmukh**.

### Visual rules (learned from his feedback)
1. **Visuals must EXPLAIN, not decorate.**
   - His biggest complaint: "तू फक्त फोटोच दाखवले आहेस."
   - For any process (seasons, monsoon, winds), show it **happening**: a real globe or map, sun rays falling, air rising, an L/H pressure system, winds flowing as arrows with moving dots.
   - His words: "माहिती सांगणे आपलं aim नाही, visuals मध्ये असे समजावणे की कधीच लक्षातून जाणार नाही."
2. **No cheap code-drawn pictures.** He said "तुझ्या images वापरतो आणि सीन खराब करतो, AI generated वाटतो."
   - Real objects (Earth, Sun, galaxy, people, places) must come from **his premium AI images** or **real NASA satellite data**.
   - Code is only for overlays: arrows, glass cards, counters, lines, labels and highlights.
3. **Maps must be accurate and satellite-style.**
   - Never use AI-generated maps; their shapes are wrong.
   - Build maps from the NASA Blue Marble photo plus real boundaries (see 4.6).
4. **Ramu** (the chubby Marathi farmer character) is the mascot of the educational reels.
   - Make him **BIG**: 55-75% of the frame height. He kept saying "रामू मोठा कर."
   - Do **not** use Ramu in product/book promos. He said "नको आता रामू नको, professional पद्धतीने."
5. **Premium motion everywhere:**
   - glass cards, gold/red gradient numbers, counters that count up, self-drawing arrows
   - camera punch on key numbers, subtle continuous zoom, film grain, particles
   - **Never let a section sit still.** He flagged "14 सेकंदापासून transition नाही, एकदम शांत वाटतंय."
6. **Unique transitions per reel.** He wants new ones, not the same every time. Ones already built:
   - paper-tear (`PAPER`), brush wipe (`TR`), light-sweep (`SWEEP`), flare (`FLARE`)
   - iris/ring opening (`IRIS`/`RINGT`), coloured diagonal bars (`SLICE`/`BARS`)
   - clouds pass (`CLOUDS`), frost shards (`FROST`), warp-zoom with speed lines (`WARP`)
   - book "fly-into-camera" zoom
7. **No subtitles/captions** (he turned them off). Keep only on-screen key words and numbers.
8. Product promos: the **product must be big and central**.
   - Build a real 3D CSS book from the cover photo, with spine and back.
   - Use the real inside pages and the real phone numbers, nothing invented.
   - No fake reviews or claims.

### Audio rules
- **Voice must be clearly louder than SFX.** He complained "voice कमी, transition आवाज मोठा."
- Mix: `vo*1.0 + fx*0.16*duck`, with SFX ducked 50% under the voice.
- No music: `mus*=0` stays in `audio.py`.
- Trim long pauses in the voice. Max gap ≈ 0.22-0.26 s (`trim.py`, `MAXG`).

### Image prompts (when he asks "prompt de")
- Give **complete, copy-ready prompts**. Never ask him to append a style line.
- Each prompt starts with its size line:
  - **"Size 2:3 vertical."** for characters and objects
  - **"Size 9:16 vertical."** for backgrounds
- End every prompt with: "No text, no labels, no logo, no watermark."
- Give **all prompts at once**, numbered, with a one-line Marathi description above each.
- **Ramu prompt base** (reuse verbatim, then change only the pose):
  > Pixar-style 3D cartoon character, full body, pure plain white background. A chubby, round-bellied Marathi village farmer named Ramu, about 45 years old, warm brown skin, chubby cheeks, thick black curled handlebar mustache, short black hair, wearing a white Gandhi cap, cream-colored cotton kurta with a chest pocket, white dhoti, red-and-white checked gamcha towel on one shoulder, brown leather Kolhapuri chappals. Pose: ... Soft studio lighting, soft shadow under feet, high detail fabric textures, expressive face, cinematic quality. No text, no logo, no watermark, no background objects.
- His AI images arrive at 2400×1792 (4:3) with a small ✦ watermark bottom-right. Inpaint it out (4.3).

### Voice (ElevenLabs)
- He uses the voice "Bunty - Funny Best Friend" for Ramu reels.
- For a professional promo, suggest an energetic announcer voice with these settings: Speed 1.15, Stability 30, Style 45. He may still send Bunty; then just trim pauses.
- In the script he records, numbers are digits.
- In `script.txt` used for alignment, **write numbers as spoken words**: 2625 = "दोन हजार सहाशे पंचवीस".
- Eleven v3 accepts emotion tags such as `[excited]`, `[confident]`, `[warmly]`.

---

## 2. Pipeline (step by step)

1. **Idea**: propose a topic with a hook. MPSC angle, simple, viral.
2. **Script**: Marathi, 80-120 s for reels and 35-55 s for promos. Revise until he approves ("he final").
3. **Image prompts**: scene-by-scene list, then a mapping table (which image goes with which sentence).
4. **Receive images** (in batches):
   - copy them from the uploads folder into `raw/` under scene names (`B01_galaxy.jpg`, `R3_sweat.jpg`, `I1_sun.jpg`)
   - check each one and report missing or bad images
5. **Receive voice MP3**, then run:
   - `trim.py`: caps silences (reads `vo.mp3`, writes `vo_t.f32` and `vo_t.wav`)
   - write `script.txt` with numbers as words
   - `align.py`: DP alignment of script words to speech chunks, writes `words.json`
   - print the word timings and plan every visual beat on exact word times
6. **Cut-outs**: `tools/isnet.py`, ISNet ONNX background removal (4.2).
7. **Build the page** `site/index.html`: deterministic `seek(t)` engine (Section 3).
8. **Preview**:
   - `python3 render.py shots 1.5,4.9,... x out/sh`
   - `python3 sheet.py 5` makes a contact sheet at `/tmp/claude-0/sheet.jpg`
   - **Look at it** (Read the image). Fix overlaps, clipping, empty frames.
9. **SFX list**: `python3 render.py sfx 0 0 out/sfx.json`, then `python3 audio.py` writes `out/mix.m4a`. Set `END=` in `audio.py` to the video length.
10. **Render** in 3 parallel parts (2 CPUs, ≈0.55 s per frame):
    ```bash
    for r in "0 32 p1" "32 63 p2" "63 93.8 p3"; do set -- $r; setsid nohup python3 render.py video $1 $2 out/$3.mp4 > out/$3.log 2>&1 & done
    ```
11. **Concat + 2-pass encode ≤ 29 MB:**
    ```bash
    printf "file p1.mp4\nfile p2.mp4\nfile p3.mp4\n" > out/list.txt
    ffmpeg -f concat -i out/list.txt -c copy out/full.mp4
    ffmpeg -y -i out/full.mp4 -c:v libx264 -preset slow -b:v 2250k -pass 1 -an -f null /dev/null
    ffmpeg -y -i out/full.mp4 -i out/mix.m4a -c:v libx264 -preset slow -b:v 2250k -pass 2 -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart out/FINAL.mp4
    ```
    Bitrate: ~2250k for 94 s, ~3800k for 55 s. Target ≈ 28 MB.
12. **Deliver** with SendUserFile, then a short Marathi summary of what's in it. Corrections go at the end.

---

## 3. The engine (`engine/engine.js`, `engine/fx.js`)

- Everything is a pure function of time `t`. `seek(t)` positions every item, so any frame can be rendered independently. This is why parallel rendering works.
- `A(o)` creates an animated item:
  - `{t0, t1, x, y, w, img | html, enter, din, exit, dout, z, float, moves, fn, draw, shine, count, sfx}`
  - `enter`: `pop | flip | flipx | drop | up | down | left | right | stamp | zoom | fade | rise | spin | wipe`
  - `fn(t, lt, o)` returns extra `{dx, dy, s, r, o, ry}` per frame. `draw(t, lt, o)` is free-form DOM or canvas work per frame.
  - `count: {t0, t1, from, to, fmt}` gives counting numbers.
- `sfx(t, name, vol)` registers a sound event. Items with `sfx:` register automatically.
- `punch(t, a)`, `shake(t, a)` and `flash(t, a, color)` are camera effects.
- `PART({type: 'sparks' | 'confetti' | 'dust' | 'petals' | 'rain' | 'snow' | 'embers' | 'stars', ...})` adds particles.
- `BG({img, t0, t1, s0, s1, x0, x1, filter})` is a Ken-Burns background. `TINT(t0, t1, css)` overlays a gradient.
- Fonts must be fully loaded before `window.READY = true`. `render.py` waits for it.
- Gotcha: very large JPGs (2400 px) sometimes fail `decode()` in headless Chromium. Downscale backgrounds to 2000 px.
- Gotcha: a `<canvas>` inside an item needs `position:relative`, otherwise a global `canvas{position:absolute}` rule breaks the layout.

### Reel-specific helper libraries (in the zip)
- `reel_seasons/globe.js` is a **photoreal NASA globe** rendered per pixel on canvas from `world.jpg` (Blue Marble). It has:
  - axial tilt, sun lighting with a terminator, atmosphere glow
  - latitude lines (equator, Tropic of Cancer/Capricorn) and sun-ray bundles
  - "beam footprint" (direct vs slanted rays)
- `reel_seasons/helpers.js` has the scene helpers:
  - `SIDE` (side view of the tilted Earth vs Sun, through the seasons) and `ORBIT` (Earth orbiting the Sun with month labels)
  - `MINI` (small orbit inset) and `MAPIT` (satellite India map with SVG overlays)
  - overlay animations: `draw`, `pop`, `fill`, `ring`, `rise`, `fall`
  - `WIND` (glowing arrows with moving dots), plus the transitions listed in 1.6
- `promo_book/lib.js` has `BOOK` (CSS 3D book from the cover photo, with spine and back), `GL` (glass card), `PILL`, `SWEEP`, `BARS`, `RINGT`, bokeh and icon SVGs.
- `reel_maharashtra_sthapana_scenes.js` shows maps of Maharashtra districts splitting (union shapes fading into child districts).

---

## 4. Tools (`tools/`)

1. `trim.py`: caps pauses. `MAXG` is in 10 ms units (22 = 0.22 s).
2. `isnet.py`: background removal.
   - Model: `~/.u2net/isnet.onnx`. If missing, download it from `https://github.com/danielgatis/rembg/releases/download/v0.0.0/isnet-general-use.onnx`. GitHub releases work through the proxy.
   - Set `R=` (raw folder) and the output path. Run `python3 isnet.py R1_space R2_fire ...`.
   - It includes a dark-pixel fill so hands, caps and white clothes don't get cut. The user complained earlier that "टोपी cut झाली".
   - **Always look at a contact sheet of the cut-outs.**
3. Watermark: inpaint the bottom-right ✦ with `cv2.inpaint`, using the box `(w*.925, h*.915)` to `(w*.975, h*.985)`.
4. `align.py`: forced alignment, prints chunk/word timing for planning.
5. `audio.py`: synthesized SFX. Available sounds:
   - whoosh, swoosh, rewind, impact, boom, thud, stamp, pop, coin(s), paper, ticks, buzz, alert
   - ding, chime, question, reveal, scratch, riser, heart, clock, pen, click, cheer, chisel, brush
   - tutari, dhol, bell, rumble, sparkle, wind, rain, thunder
6. `geo.py`: builds the satellite India map plus geo overlay (`geo.js`).
   - Inputs: NASA Blue Marble mosaic (`/home/claude/geo/bm_region.jpg`) and Natural Earth admin-0/admin-1 geojson.
   - Produces: India outline, state lines, the 8 Tropic-of-Cancer states, Kerala, Tamil Nadu and Maharashtra paths, and the tropic y-coordinate.
   - Data sources if the session is fresh:
     - Blue Marble tiles: `https://github.com/TomaszWu14/timporye-map-tiles/releases/latest/download/tiles.tar.gz`
     - Districts: `git clone --sparse https://github.com/udit-001/india-maps-data`
     - Natural Earth geojson: any GitHub mirror
   - curl to nasa.gov is blocked. shapely can't be installed, so do unions with a cv2 raster (fillPoly, then findContours, then approxPolyDP).
7. `render.py`: `shots`, `sfx` and `video` modes. **Edit the hard-coded page path** for each project.
8. `sheet.py`: contact sheet of `out/sh/*.jpg`.
9. Safety note: `rm` with globs after `cd` gets blocked. Use `find <abs-path> -name '*.jpg' -delete`.

---

## 5. Finished projects (for reference)

| Reel | Notes |
|---|---|
| अभिजात मराठी भाषा दिवस (v1, v2) | petals, carved inscriptions, Ramu |
| महाराष्ट्र बनला कसा? (Deccan Trap) v1, v2 | satellite hook, big Ramu |
| महाराष्ट्राची स्थापना / संयुक्त महाराष्ट्र | district split maps, timeline HUD, paper-tear transitions |
| भारतात उन्हाळा, पावसाळा, हिवाळा कसे येतात (v1, then **v2**) | v2 = real NASA globe, orbit, tropic explanation, living India map with L/H pressure, monsoon onset lines, winter wind reversal, Tamil Nadu NE monsoon |
| कोतवाल भरती पुस्तक promo (v1, v2) | 3D book, glass infographics, donut chart 24+28=52, 2625+ counter, district map, ₹460 badge, phone numbers 9028967547 / 7888005554, "महाराष्ट्रात सर्वत्र उपलब्ध" |

**Next request from the user:** a **Vox-style** reel. The look:
- paper/cardboard textures, cut-out photo collages with white borders, newspaper clippings
- highlighter swipes, hand-drawn red circles and arrows, typewriter text
- halftone + grain, a muted palette with yellow/red accents, slow camera drift

Ask for the topic and whether Ramu should appear (as a paper cut-out) before building.

# Pinterest motion-graphics style study (8 Oct 2026)

Sources studied: Pinterest search "motion graphics video" (~80 pins scrolled), "real estate motion graphics reel" (~25 pins), and frame-by-frame:
- pin 30610472463090689 "our brains operates in two distinct modes" (@frameco, 10 s) - user's reference
- pin 23081016837350060 "Bricks Marvella" real-estate promo (39 s)

## The dominant style ("editorial minimal")
1. **Light background**, not dark: off-white / soft grey radial gradient (#f4f4f4 centre to #d9d9d9 edges), very faint square grid (40-60 px, 6-8% opacity), soft vignette at the bottom.
2. **One hero object per scene**, photoreal 3D cut-out (brain, tower, house model, money, chess piece), big - 50-80% of frame width, often **cropped by the frame edge** (bleeds off left/right) for scale and drama.
3. **Typography is the design**:
   - Huge bold geometric sans (Poppins/Montserrat Black) word in black, **object replaces a letter** ("br🧠ins", "N👁T").
   - Mixed with an **elegant italic serif** (Playfair / Bodoni italic) for the emotional word ("One Size", "lifestyle", "Fast · Automatic").
   - **One accent colour** for the key word (red #e3262f / brand colour), everything else black/grey.
   - Small tiny lead-in words above/below the big word ("our", "operates in two distinct").
4. **Text reveals word by word**, synced to voice: each word fades in with a blur-to-sharp (blur 8 px -> 0, opacity 0 -> 1, 6-10 px rise) over ~0.3 s. The next word starts as the previous lands. Upcoming word shown ghosted (10-15% opacity) before it is "spoken" (see "· Automatic" ghost under "· Fast").
5. **Bullet lists** in italic serif with a small dot "·", stacked, one per beat.
6. **Thin line elements**: a vertical stick/line from the object (lollipop), dashed curved arrow connecting text to subject, small zig-zag doodles in corners that wiggle.
7. **Big soft background arc / ring** (light grey, 5-10% darker than bg, 200+ px thick) sweeping across the frame and rotating slowly; on Marvella a navy semicircle/ring behind the cut-out.
8. **Dotted grid patch** (small dots, 20 px spacing) behind the object on one side.
9. **Camera**: object moves between scenes by **scale + position transform** (brain small centre -> large right -> large left) instead of hard cuts - a "match move" of the same object. Slow continuous push-in.
10. **Colour of hero changes per scene** (grey brain in title -> coral brain in content) to signal "now explaining".
11. **Real-estate promos** (Marvella): B&W cut-out photo of people/tower on grid + navy semicircle; elegant serif headline; arched window frame masks for interior photos; tower photo cut-out with soft ground shadow; floating ellipse shadow; final **dark CTA card** with logo, BHK list, phone, location pin, "BOOK SITE VISIT" pill.
12. Other recurring tricks seen: polaroid/phone-UI frames for photos, paper-tear reveal of 3D city from a map, money bills flying past with motion blur, before/after split phone frames, isometric towers with golden light trails, map pin dropping on land plot.

## How to apply to our SRS Dwell reels
- Keep brand gold/navy but switch most scenes to the **light editorial look**: ivory bg (#f6f3ee) + faint grid, black text, gold/navy accents; use navy only for CTA/outro and "warning" scenes.
- Headline formula: small lead-in word + HUGE bold word with an object replacing a letter (e.g. "red🏢velopment", "FS₹", "300" with a tape measure as the "1") + italic serif emotional word in gold.
- Word-by-word blur reveal synced to whisper word times (we already have per-word timings) - becomes our default text animation.
- One hero cut-out per beat that **travels** between scenes (same object, new scale/position) instead of new cards each time.
- Replace heavy glass cards with: italic serif bullet lists, thin connector lines, dashed arrows, rotating soft arc behind.
- Fewer elements per frame (max: 1 object + 1 headline + 1 support line).
- Keep: counters, floor-plan drawing, maps (they explain) - restyle them in thin black/gold line-art on light bg.

## Engine work needed
- `WORDS(t0, words[], style)` helper: word-by-word blur reveal with ghost of next word.
- `HERO` helper: one cut-out with keyframed x/y/scale/rotation across scenes + colour swap (CSS filter).
- `ARC` background (big rotating soft ring), `DOTGRID` patch, `DOODLE` (wiggling zig-zag/arrow SVG), `LOLLIPOP` line.
- Serif italic font: add Playfair Display Italic (supports Latin only - for Marathi use Poppins Medium Italic / Mukta with skew) to `brand/fonts/`.
- Light theme CSS variables in index.html (`--bg`, `--ink`, `--accent`).

---

# SRS Dwell HOUSE THEME: "White model city" (user reference, 26 Oct 2026)
Reference: Pinterest pin 1116329826405118815 (OCTO Bureau, "Madison", Dnipro): https://i.pinimg.com/736x/55/a5/e8/55a5e89065c384b8ea8a214bb4986c01.jpg
User: "aplyala video madhe asa theme pahije, ekdam decent ani images pan ya sarkhya".

## What the reference does
- Whole city is a matte white clay / architectural massing model: white buildings, white roads, white trees, no colour, no signage, no people detail.
- ONE hero building (or plot/subject) is fully rendered in real material: dark glass + bronze frames + warm interior light + red brick. It is the only colour in the frame.
- High 3/4 aerial view (45-60 deg down), slightly isometric, vertical 9:16 crop with the hero in the centre third.
- Soft overcast daylight, long soft shadows, ambient occlusion, very low contrast, airy and calm. No sky drama, no night, no neon.
- Feels like an architect's presentation board: premium, quiet, trustworthy.

## Video theme rules (default for SRS Dwell from now on)
- Background: white/ivory (#f5f4f1 to #e9e7e2), faint grid allowed. Text black #151515, secondary grey #7a7a7a.
- ONE accent colour per reel taken from the hero material (bronze #9a7348, brick #a5523a, glass teal #2f5d62 or brand gold #b8935f). Red only for a real warning, used once.
- Typography: Poppins SemiBold/Bold for Marathi, thin weights for labels, generous spacing, small sizes. No heavy black boxes, no neon, no glow, no glitch.
- Graphics language = architect's drawing: thin 2 px leader lines from a label to the hero, small dot markers, dimension lines with arrows (road width, plot size), hairline outlines, numbered callouts (01, 02) in small circles.
- Cards: white with 1 px #d8d5cf border and very soft shadow, or no card at all (text straight on the white model).
- Motion: slow push-in / orbit on the model image (Ken Burns 3-5%), labels draw-on (line grows, then text fades up), soft white wipe or blur-dissolve between scenes. Calm, eased, nothing shakes.
- Variety still required per reel (see vary-design memory): change the accent colour, camera angle, hero subject and transition, but keep the white-model world.

## Google Flow image prompt template (9:16 backgrounds)
"Architectural presentation render, high aerial three-quarter view of a [Navi Mumbai node, e.g. Kharghar sector with wide roads and a central park], entire city shown as a matte white clay massing model: white buildings, white roads, white stylised trees, no colours, no text, no signage. One hero [subject: 12-storey residential tower / empty rectangular land plot with boundary / old 4-storey society building] rendered in realistic materials [dark glass, bronze frames, warm lit interiors / red soil plot with orange boundary line] as the only colour in the image. Soft overcast daylight, soft long shadows, ambient occlusion, low contrast, clean and calm, premium architecture studio style, photoreal 3D render, vertical 9:16, hero in the centre, empty light space in the top third for text."
- Same seed/look for every scene of a reel; change only the hero and camera.
- Variants: top-down plan view (for plot size / road width), eye-level street view (for buildings), close-up of the hero facade (for detail), "before/after" pair with the same white city and two different heroes.
- Cut-outs (3:4): "single white clay architectural model of [object], one part in [material], plain white background, soft shadow, studio light".
- Avoid in prompts: people close-up, night, neon, sunset, logos, text, flags, watermark.

## Reference 2: "Step-by-step concept diagram" board (user, 26 Oct 2026)
File: research/style_refs/02_concept_diagram_steps.jpg (@archtemplatestudio). User: "baground te bag kase ahe ekdam chan".
- Background: pure clean white / very light warm grey (#f7f7f5), completely empty, no grid, no texture, no gradient. Lots of white space; content takes at most 60% of the frame.
- Title block top-left: small caps lead-in ("STEP-BY-STEP:") + huge heavy condensed sans in black ("CONCEPT DIAGRAM"), a short black rule under it, then a 2-line plain sub-text. Left-aligned, not centred.
- Steps column: big number (01, 02...) bold, small caps label (MASS, SUBTRACT...), 3-4 line grey body text, a thin black leader line ending in a dot that touches the drawing.
- Drawings: white isometric line-art models with thin black outlines and soft grey shadow; each step adds detail (box → cut → glass → full material with trees). Only the last step gets real materials (wood, glass, concrete, greenery).
- Hero photo: one realistic white-concrete + wood house, cut out and BLEEDING off the left/bottom edge, sitting on the white page with no frame.
- Footer: tiny outlined pill with the handle (we use the SRS Dwell handle the same way).
- Colour: black, greys, white, plus natural wood/green only inside the final render. No accent colour at all.

### How we use it in reels
- Default reel background = this empty white page. Text left-aligned, title in heavy black, labels in small caps grey.
- "Process" topics (redevelopment steps, plot buying steps, FSI calculation, OC/CC steps) = numbered step column + isometric drawing that grows one stage per voice beat (outline draws on, then shading, then material in the last step).
- Leader line + dot connects each label to the drawing; it draws on before the text fades up.
- Hero image enters cropped from a frame edge, no box around it.
- Image prompts for these drawings (Google Flow, 3:4 cut-outs on white): "isometric architectural line drawing of [subject], thin black outlines, white surfaces, soft grey shadow, pure white background, minimal, architecture diagram style" → final step: "same isometric model fully rendered in white concrete, wood and glass, small trees, pure white background".

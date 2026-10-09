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

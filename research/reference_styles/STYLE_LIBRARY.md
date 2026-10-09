# Reference style library (user-sent Pinterest/Klickpin videos, 9 Oct 2026)
Files: `videos/refNN.mp4` (originals), `sheets/refNN.jpg` (16-frame contact sheets). All 720x1280 unless noted. ref14 = ref15 (duplicate).

## Per video
| # | Len | Name we use | What it is |
|---|---|---|---|
| 01 | 10s | **Hero-object editorial** | grey studio bg, giant word with object replacing a letter ("br🧠ins") on a lollipop stick, word-by-word reveal; same 3D object travels/scales to fill frame (coral), italic serif bullets "· Fast · Automatic" with next item ghosted; big soft grey arc + dot grid; corner zig-zag doodles |
| 02 | 77s | **Mono silhouette** | pure B/W: white bg, giant black blurred brush/claw shapes sweeping corners, black business silhouettes + money cut-outs, Comfortaa-like rounded font with one bold word, dashed-border text boxes, faint dot circle behind text, watermark bottom; ends "LINK IN BIO" button + cursor click |
| 03 | 12s | **Brand-story cards** (Starbucks) | pale mint bg with huge faint brand logo, green ribbon curve weaving behind, product hero cut-out, rounded photo cards stacked/sliding (store, crowd, café, laptop), mixed sans + italic serif ("built a *lifestyle*"), big black flower-shape blobs as transitions, ending giant product crop + "It was about the *feeling*" |
| 04 | 15s | **Brand comparison** | product hero on colour-matched bg, competitor scene in different colour ("others brands" red), brand logo zoom-wipe as transition, arrow bullet list ">", stat counter "$9800 billion dollar brand", coffee beans floating with blur, "DM for PAID WORK" |
| 05 | 6s | **3D calendar flip** | photoreal 3D desk calendar, pages flying off one by one (1→30), dark glossy table reflection - pure time-passing loop |
| 06 | 25s | **Agency ad - light** (untuch) | light grey grid bg, brand logo fixed top-centre, navy pill highlight on key words, money stacks flying in, chart card with dropping line "Leads 40 ↓", B&W statue with phone ("HOLD attention"), suited man in navy square, "DM 'Help'" button that grows, contact card + phone numbers |
| 07 | 25s | **Agency ad - dark neon** | same script as 06 but black bg + teal glow + grid, typewriter text with cursor, outline wide font ("IS WEEK"), cyan pill highlights, dashboard card, screaming man cut-out, contact pills (phone/email/web) |
| 08 | 25s | **Agency ad - light red/blue** | same template 3rd variant: red highlights, leaves flying, closing "Book A Consultation Now!" poster with contact box + red cursor |
| 09 | 54s | **Newspaper collage explainer** (AI in Industries) | white bg + small grid patches, B&W halftone cut-out illustrations with torn paper edges + yellow accents, yellow highlighter bars behind keywords, Hinglish captions word-by-word, big "80%" stat with highlight, clock + paper pile, profile card + logo end |
| 10 | 4s | **Cartoon character emotion** | white round-head cartoon in suit, red warning chaos bg (BOND/IPO/FOREX) → whip-pan to calm green "INFORMED INVESTING", magnifier on report, icons pop on a curved path (goal/time/research/risk), thumbs up |
| 11 | 19s | **Pencil-sketch storyboard** | grey pencil-sketch illustrations with only green accents (plant, arrow, money), same boy across scenes, small round logo bottom-right; ends walking path to money tree |
| 12 | 60s | **Cinematic AI ad** (Utilizor) | photoreal suited Indian man, dark navy/purple office, holographic floating labels (CUSTOMERS, ORDERS, LEADS), gold network nodes, glass UI dashboards, serif gold captions centred, logo reveal with glow |
| 13 | 49s | **Portfolio frame** (rovix) | fixed layout: logo top, "Our Work" title, small audio-waveform card left + tall rounded video card right, green diagonal band, palm-leaf shadow bg, "DM for work @handle" - the inner card plays a history story with kinetic serif/italic text over vintage manuscripts |
| 14/15 | 18s | **Did-you-know infographic** | light grid bg, purple "Did You Know?" block, brain in dotted circle, big orange glowing counter "26,027 → 35,000", condensed black serif headline "Problem Solving" with blur reveal, bar chart growing with labels in dashed boxes (Faster/Sharper/Effective), 3D purple star/puzzle props, dart hitting target |
| 16 | 5s | **Floor-plan reveal** (real estate) | grey architectural line drawing → white plan with room labels types in → vertical wipe line sweeps right revealing fully furnished rendered plan (wood floors, beds, sofa); caption "Apartment Type 'C'" in serif; logo top-right |

## Reusable techniques (engine to-do / already have)
1. **Word-by-word blur reveal + ghost of next word** (01, 09, 14) - have `WORDS()`.
2. **Hero object travels between scenes** (01, 03, 04) - one cut-out keyframed x/y/scale across beats.
3. **Highlighter / pill behind key word** (06, 07, 09) - yellow marker bar or navy/teal pill that wipes in from left.
4. **Typewriter text with blinking cursor** (07).
5. **Big counters with glow** (04, 14) - have counters; add orange glow.
6. **Rounded photo cards sliding/stacking** (03, 13) - phone-style cards with radius 28 + soft shadow.
7. **Giant soft shapes as transitions** (02 black claws, 03 black flower blobs) - a shape grows across frame then reveals next scene.
8. **Logo/brand zoom-wipe** (04) - zoom into logo mark until it fills screen = transition.
9. **Wipe-line reveal** (16) - vertical line sweeps, left side old state, right side new state. ⭐ for before/after, plan → furnished, old building → redeveloped.
10. **Halftone B&W cut-outs with torn paper edge + one accent colour** (09).
11. **Holographic floating labels / network nodes** over a photo (12).
12. **CTA ending**: button grows + cursor click + contact pills (02, 06, 07, 08).
13. **Fixed frame template** (13): logo, title, side card - consistent series branding.
14. **Dashed-border label boxes** (02, 14).
15. **Bar chart growing + trend line** (14).

## Best fits for SRS Dwell (professional real estate)
- **16 Floor-plan reveal** → every flat / carpet / BHK topic (line plan → rendered plan wipe).
- **12 Cinematic AI ad** → premium brand/hook scenes (holographic labels over buildings: "FSI", "RERA", "OC").
- **14 Did-you-know infographic** → UDCPR facts with big counters and bar charts.
- **06 Agency ad light** → navy pill highlights + clean grid; matches our navy/gold.
- **03 Brand-story cards** → stacked photo cards for "what you get" lists.
- **09 Newspaper collage** → GR / news-type reels (highlighter on key words).
- Avoid for SRS Dwell: 02 mono silhouettes and 10/11 cartoons (not premium), unless user asks.

## Reference images (user-sent, 9 Oct 2026) - `images/`
| File | Style | Use in reels | Prompt keywords |
|---|---|---|---|
| img01_sketch_to_render_stages | same isometric flat shown 3 stages: pencil line sketch → partly coloured → full photoreal render | "plan to reality", construction stages, carpet explained: animate stage1→2→3 with wipe | "three-stage isometric cutaway: pencil sketch, half-rendered, fully rendered" |
| img02_interior_presentation_board | architect presentation board: floor plan + numbered legend, big isometric room with callout leader lines, material palette circles, furniture schedule, lighting plan | callout-line labels on a hero render (draw line + label), material swatch circles, numbered room legend | "architectural presentation board, callout leader lines, material palette swatches" |
| img03_isometric_on_blueprint | 3D isometric house cutaway rising out of a 2D blueprint drawing | hook: blueprint lines on table → 3D model rises out (FSI, plot, UDCPR topics) | "isometric 3D cutaway rising from technical blueprint lines, soft grey" |
| img04_topdown_model_with_trees | top-down white architectural model flat with miniature trees + long soft shadows | carpet/BHK layouts seen from above; overlay coloured zones; trees frame the safe area | "top-down architectural scale model, white and light wood, miniature trees, soft long shadows" |
| img05_exploded_axonometric | exploded axonometric: roof/ceiling/elements floating above the floor with dashed vertical guide lines; grey bg; thin header row | super built-up / loading: lift, stairs, clubhouse float above flat with dashed lines, then drop in; redevelopment layers | "exploded axonometric diagram, components floating with dashed vertical guide lines" |

Rule (user): use this architectural-visualisation look in SRS Dwell reels and write image-generation prompts in these styles (always no text/no emblem, warm neutral palette, plain light background, 9:16 or 2:3).

## Batch 2 (9 Oct 2026) - location / timeline / card images + 3 videos
| File | Style | Use for SRS Dwell |
|---|---|---|
| img06_location_pin_minutes | ⭐ aerial hazy satellite of the plot, big brand map-pin on the site, dashed curved lines to round photo bubbles "1 min to Temple / 3 mins to NH-44 / 5 mins to Town", serif headline "Your new address, minutes from everything", big "6.04 Acres Approved" stat, approval badge | **location reels**: pin drops on our NASA map, dashed lines draw to landmark photo circles with "X min" counters |
| img07_checkin_route_map | street photo bg dimmed, thick white route line zig-zags up, numbered yellow circles, white polaroid photo cards with dotted connectors | route / "जवळ काय आहे" lists, step-by-step process along a line |
| img08_projects_pins_dark_map | dark purple city map + skyline sunset, yellow pins with project names on dotted path | builder portfolio / multiple projects |
| img09_glow_chart_card | dark red bokeh bg, white rounded card with big number + % badge + line chart glowing | price growth / appreciation stat card |
| img10_torn_paper_landmark_card | torn vintage paper pinned with red push-pin over blurred newspaper, serif title + paragraph, landmark cut-out breaking out of the paper with clouds | area/landmark history, "why this location" |
| img11_ticket_popout_3d | hand holds a ticket, 3D scene (tram, building) pops out of it, pencil sketches around | creative hook: hand holds flat brochure/agreement, building pops out |
| img12_route_dotted_photo_cards | travel poster: dotted wavy route with city dots, row of rounded photo cards, icon row, contact footer | amenities row, connectivity summary, ending CTA card |
| img13/14_corkboard_timeline | inshorts style: wooden/paper board, torn paper notes with years, red pins + red string connecting, B&W photos | **timelines**: UDCPR history, GR dates, project milestones |
| ref17 (=ref14) | did-you-know infographic (dup) | - |
| ref18 (45s) Finqube SaaS ad | green gradient blur bg, word highlight box, floating 3D XLS icons, chat notification pills sliding, glass dashboard cards orbiting, cursor clicks, emoji burst, "Join the Waitlist" end | notification-pill hook ("Builder: possession उशिरा"), floating document icons |
| ref19 (13s) Advarz | stack of social-post cards flipping one after another (deck shuffle), serif-italic headline "Plan your *Monthly* content", blue wipe to CTA with input pill + cursor | card-deck shuffle for "7 नियम", project gallery |

Recurring patterns now confirmed: map pin + dashed connectors + photo bubbles + minute counters (location); red-string corkboard (timeline); photo-card rows/decks; hand-held object with 3D pop-out; glowing stat card on dark bokeh.
| ref20 (15s) Pride services | solid red bg, Spider-Man hand shoots a vertical web line; each service word (condensed bold yellow/white "BULK SMS", "SEO", "WEB DESIGNING") zooms in with motion blur caught in a spider-web net, line runs through; ends logo + contact + social icons | fast service/feature list: one word per beat on a single brand colour with a "thread" line linking them (use our gold line on navy) |
| (image) newspaper portrait | B&W man on newspaper page, red censor bar over eyes with white text "JUST DO IT", big headline bar | hook cover: red bar across a photo with key word ("OC नाही?") |
| (image) Hinglish meme cover | B&W cut-out of a known face with orange outline offset, grid bg, serif headline with orange/black highlight word boxes, dashed curved arrow | relatable hook covers - use only licensed/own faces, never celebrities |
| (image) Mr Bean growth cover | cut-out person on grid, yellow marker highlight on key word, hand-drawn curly arrow, "Share it" | carousel/cover style; same note on faces |
| (image) Navdrishti "Don't Swipe" | ⭐ real-estate brand: solid brand red, 3D cartoon man pulling rope across frame, big bold "Don't Swipe" | scroll-stopper opening shot (3D character pulling the next scene in) |
Note: celebrity faces (Mr Bean, Paresh Rawal, etc.) must NOT be used in our reels - copyright/personality rights; recreate the layout with our own AI person.
| ref21 (47s) "History of tea" | ⭐ monochrome documentary explainer: soft grey radial bg, B&W/sepia 3D-ish cut-out illustrations (Great Wall, emperor, tea-picker, Gateway of India, Himalaya) appear one per sentence, short 2-4 word captions in clean sans above/below (word-by-word), big curved number "over 4000 years ago", 3D map of Asia with curved arrows (spread), country flag circles orbit a cup, vintage archival photo in rounded card, single giant date "17th" | **history / "कसं सुरू झालं" reels**: UDCPR history, RERA history, city growth - B&W cut-outs on grey + one accent, arrows on 3D map |
| ref22 (10s) After-Effects promo | white bg, mesh grid patch, leafy shadow overlay in corner, serif display text stacked ("Anyone can learn it / But not Everyone can master it"), single photoreal 3D prop per line (Ae icon, gold chess king, white mask, bulb), butterfly flutters onto the last word | premium quote/hook beats: one 3D prop + serif stacked line on white with leaf shadow |

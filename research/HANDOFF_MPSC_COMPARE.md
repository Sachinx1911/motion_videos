# MPSC स्पर्धा टाइम्स reel process (handoff PDF, 21 Nov 2026) vs our SRS Dwell process - what to take
Source: `Reel_Process_Handoff.pdf` from the other Claude tab (18 pages; engine A/B/C, rules, full code). That project lives in a cloud sandbox (`/home/claude/<reel>`), not in this repo.

## Same lineage (nothing to change)
- Engine A = same idea as ours: HTML page, deterministic `seek(t)`, `A({t0,t1,x,y,enter,exit,fn})`, punch/shake/FLASH, Playwright screenshots -> ffmpeg, 4 parallel parts, 2-pass x264 < 29 MB, voice + synthesized SFX (numpy/scipy `audio.py`), no music.
- `trim.py` (pause cap), `align.py` (script-to-audio DP alignment), contact sheet, ebur128 check, delivery format (file -> ◾/➢ summary -> ⚠❌✅ -> sources) - all identical or ours is a superset (lib.js, fx.js, cta.js, BG/TINT/CROPS, overlap.py, whisper_win.py, wm_remove.py).

## Worth adopting (ranked)
| # | Their practice | Ours today | Recommendation |
|---|---|---|---|
| 1 | Bitrate from length: `BR = 28.3*8*1024/D - 160` kbps so the file lands just under 29 MB | fixed `-b:v 2100k` | ADOPT in the encode step (and in make.py) |
| 2 | Voice speed-up before trim: `ffmpeg -af atempo=1.12..1.15` (1.06 too slow, 1.25 too fast) | no speed-up; pauses trimmed only | OPTIONAL - helps the 55-60 s target of the fast-paced rule. Needs the user's OK (changes the voice feel) |
| 3 | Word timing from the known script (`align.py`, numbers written in words in script.txt) instead of Whisper | Whisper large-v3-turbo (word list is garbled; numbers verified on snippets) | ADOPT as primary when the voice matches the script: align.py gives clean words to cue on; Whisper stays as a check for numbers / wrong lines |
| 4 | "First 10 seconds very strong": shocking fact, big text, zoom, punch, shake | implicit | ADOPT as a written rule |
| 5 | "Visuals must explain, not decorate - show the process (arrows drawing, counters, timelines, stamps); photos alone are the biggest complaint" | mostly followed | ADOPT as a written rule |
| 6 | Voice error -> keep the voice, show the correct fact on screen, say so in the summary | we re-record / splice | ADOPT as the fallback when a re-record is not possible |
| 7 | Safe area: nothing below 1600 px (22 %) and keep the right edge clear (Instagram UI) | bottom 1730, comment box x+w/2 <= 860 | TIGHTEN to 1600 for text; keep 1730 only for the CTA comment box |
| 8 | Devanagari: never `letter-spacing` (matras break); `white-space:nowrap` on titles | followed ad hoc | ADOPT as a written rule |
| 9 | Green-screen cut-out script `key.py` (greenness alpha 25-85, despill, crop, resize) | same code inline in this session | SAVED as `tools/keygreen.py` |
| 10 | Caption: exactly 5 hashtags | 7-12 hashtags | ASK the user (platform-wise fewer tags is current IG advice) |
| 11 | Map data pipeline: datameet SOI geojson + world.geo.json -> `mapdata.js`, camera keyframes `ck()`, labels stuck to the map (`LBL`) | maps as images (Navi Mumbai aerial / node images) | USE when a reel needs a real Navi Mumbai node map (sectors, metro, airport) - port `build.py` + map layer |
| 12 | 3D engine B (three.js low-poly, swiftshader, `shoot.py`) | our site3d test (three.js) | same approach; their "objects grow one by one, camera always moving, colour theme per section" notes apply to our building walkthrough |
| 13 | "Do not ask before starting, just do" | user rule: wait for "कर"/"बनव" | DO NOT change - different user preference per project |
| 14 | New transition in every reel (list: flash, streak, blinds, bars, iris, warp, wipe, light leak, paper tear, brush, glitch) | zoom-dissolve + reason-based | DO NOT change (user: transitions need a reason; orange rule) |

## Not applicable to us
- MPSC brand (logo box, "परीक्षेसाठी लक्षात ठेवा" block, 5 hashtags format), India map / PoK rules, missile reels (engine C), Whisper-small ONNX fallback (we have faster-whisper).

## Code kept from the PDF
- `tools/keygreen.py` - green-screen cut-out (from their key.py, ours already did the same inline).
- Bitrate formula - added to the encode recipe below.

## Encode recipe (updated)
```
D=<length s>; BR=$(python -c "print(int(28.3*8*1024/$D-160))")
ffmpeg -v error -y -i parts/all.mp4 -vf "scale=in_range=full:out_range=tv,format=yuv420p" -color_range tv -c:v libx264 -preset medium -b:v ${BR}k -pass 1 -an -f null NUL
ffmpeg -v error -y -i parts/all.mp4 -i mix.m4a -map 0:v -map 1:a -vf "scale=in_range=full:out_range=tv,format=yuv420p" -color_range tv -c:v libx264 -preset medium -b:v ${BR}k -pass 2 -c:a aac -b:a 160k -shortest -movflags +faststart NAME.mp4
```

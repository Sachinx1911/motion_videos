---
name: "spardha-motion-reels"
description: "Make premium Marathi motion-graphics Instagram reels (1080x1920 MP4) from the user's script, ElevenLabs voice and images - Spardha Times / real-estate explainer videos."
---

# Marathi Motion-Graphics Reels - full workflow

Use this whenever the user asks for a reel / motion graphics video / "video banav", sends a voice MP3 + images for a video, or asks for reel scripts, voice prompts or image prompts for a reel. The code is NOT carried between chats - rebuild it from Section 5 (engine + renderer are included verbatim below).

---

## 0. Output spec

| Item | Value |
|---|---|
| Format | 9:16 vertical, 1080x1920, 30 fps, H.264 + AAC |
| Length | follows the voice exactly (usually 50-120 s) |
| File size | 29 MB or less (2-pass x264; ~2100k video + 192k audio for ~98 s; ~3800k for 55 s) |
| Font | Poppins for all video text (covers Devanagari). Medium/SemiBold weights, ~20% smaller than first instinct, generous spacing = premium look. Never letter-spacing on Devanagari text (it breaks matras). |
| Audio | user's ElevenLabs voice + synthesized SFX. NO background music. |
| Brand | Spardha Times reels: logo top-left (white rounded tile, black "स्पर्धा" over red "टाइम्स"). Not every reel is Spardha Times (e.g. real-estate/redevelopment reels end with "आमच्या पेजला फॉलो करा") - if the brand/page name is unclear, ask once; if no answer, put no logo and say so. |

---

## 1. Working with this user (MOST IMPORTANT)

### Communication
- Reply in Marathi (Devanagari), short and clear, address him as "सर". English digits (1, 2, 3), hyphen (-), never an em dash.
- Use ◾ for main points and ➢ for sub-points in replies; no bold.
- Do NOT start building until he says "कर" / "yes kar" / "suru kar" / "video banav". Propose idea -> script -> prompts -> wait. If he sends voice + images with no text, do the prep (transcribe, check images, report) and ask him to say "कर".
- "थांब" / "lagech karu nko" = stop, only save files.
- "दे" / "संपूर्ण दे" = give everything at once (full script, all image prompts, full voice text). Never piecemeal, never ask confirmation part by part.
- Factual/grammar corrections go ALL together at the very end, exactly:
  ⚠चूक कुठे आहे नेमकं - ...
  ❌ चूक काय आहे - ...
  ✅ बरोबर काय हवे - ..., सर.
- He sends images without numbers. Identify each image yourself, map it to its scene, and report missing ones or defects (stray text, wrong shapes, duplicates, watermark).
- "पहिल्यापासून व्यवस्थित दे" = resend the complete numbered list from item 1.
- When done: send the MP4 with SendUserFile, then a short ◾/➢ summary of what is in the video, then corrections, then Sources if facts were checked.

### Content rules
- Audience: 18+ MPSC / competitive-exam aspirants (or adult home-owners for real-estate reels). Simple language, never childish ("lahan mule" style rejected).
- Never: controversial, political, caste/religious content; violence, killings, blood, "गोळीबार", "खून" (Instagram flags them).
- Stay on topic; no side points.
- Strong energetic hook in first 2-3 s; avoid the old opener "अरे थांबा!".
- Spardha Times outro: "अशाच स्पर्धा परीक्षा संबंधित माहितीसाठी आत्ताच स्पर्धा टाइम्सला फॉलो करा!"
- Only 100% sure facts. Verify current facts/rules with web search (e.g. Maharashtra redevelopment GR of 30 Sept 2026: bank-guarantee amount decided by the general body, no fixed %; construction 2 years from plinth/foundation certificate, max 3 in exceptional cases). If the voice has a wrong fact, keep the voice but show the correct fact on screen and flag it at the end.
- Add obvious missing items to his lists and say so.
- Sensitive geography (LOC/LAC/PoK/Aksai Chin/Siachen): India's official map (Survey of India), source-accurate lines, neutral tone.
- Updated names: छत्रपती संभाजीनगर, अहिल्यानगर, धाराशिव.

### Visual rules (from his feedback)
1. Visuals must EXPLAIN, not decorate ("तू फक्त फोटोच दाखवले आहेस" is his biggest complaint). Show processes happening: maps, globe, flows with self-drawing arrows, timelines filling, floor plans drawing, stamps hitting documents, counters counting.
2. "AI सारखं वाटलं नाही पाहिजे." Real objects come from his images / real photos / NASA data. Code only draws overlays (glass cards, arrows, lines, counters, labels, icons).
3. Maps: never AI-generated; build from real boundary data (Natural Earth, district data) + satellite/relief imagery.
4. Ramu (chubby Marathi farmer mascot) only in general-knowledge explainers, BIG (55-75% of frame height). Never in product promos, real-estate reels or serious MPSC-question reels.
5. Premium motion everywhere: glass cards, gold gradient numbers, count-ups, camera punch on key words, shakes on stamps, slow continuous drift, film grain, particles. Never let a section sit still.
6. New transitions every reel (Premiere-Pro quality). Already used: flash, light sweep, blinds/shutters, diagonal colour bars, vault-dial ring + iris, warp zoom with speed lines, diagonal clip, wipe-up, light leak, paper tear, brush wipe, clouds pass, frost shards, book fly-in.
7. No subtitles. Only key words and numbers on screen.
8. Keep all important elements on screen together; full maps must stay visible.
9. True 3D when he asks for 3D (extruded regions, 3D camera orbit, 3D text), not a tilted flat map.
10. Promos: product big and central, real pages / real phone numbers, no fake reviews.

### Audio rules
- Voice clearly louder than SFX (he complained "voice कमी, transition आवाज मोठा"). Target SFX RMS about 15 dB below voice; duck SFX 50% under speech.
- No music.
- Trim long pauses: cap gaps at ~0.25 s.

### Voice prompts (ElevenLabs)
- Voice "Bunty" (Funny Best Friend / Punchy Crisp Reel King), Eleven v3, Stability "Creative".
- Tags like [excited], [shouts], [confident], [punchy], [proud]. NEVER [whispers] or soft/quiet tags; voice stays loud and excited.
- No pause tags (pauses lose viewers). Short, clear sentences.
- Numbers as Marathi words for pronunciation (2625 = "दोन हजार सहाशे पंचवीस").

### Image prompts
- Complete, copy-ready; never ask him to append anything.
- Start with "Size 2:3 vertical." (objects/characters) or "Size 9:16 vertical." (backgrounds/scenes).
- Cut-out objects: "pure plain white background".
- Real-photo look: camera + lens ("shot on Canon EOS R5 35mm lens"), natural light, slight grain. Old events: "black and white archival photograph, film grain".
- End: "No text, no labels, no logo, no watermark."
- All prompts at once, numbered, one Marathi line above each, each in its own code block; then a table: which image goes with which sentence.
- Ramu base prompt (change only Pose): Pixar-style 3D cartoon character, full body, pure plain white background. A chubby, round-bellied Marathi village farmer named Ramu, about 45 years old, warm brown skin, chubby cheeks, thick black curled handlebar mustache, short black hair, wearing a white Gandhi cap, cream-colored cotton kurta with a chest pocket, white dhoti, red-and-white checked gamcha towel on one shoulder, brown leather Kolhapuri chappals. Pose: ... Soft studio lighting, soft shadow under feet, high detail fabric textures, expressive face, cinematic quality. No text, no logo, no watermark, no background objects.
- His images have a small ✦ watermark bottom-right (at about x=0.926w, y=0.958h on 9:16 images) - inpaint it out.

---

## 2. Pipeline

1. Idea with hook -> script (revise until "he final") -> voice prompt + all image prompts + mapping table.
2. Images arrive: copy into `raw/` with scene names (B01_old_building.jpg for backgrounds, O1_helmet.jpg for cut-out objects). Check and report.
3. Voice arrives: transcribe offline (Section 4), reconstruct the exact script, verify facts.
4. After "कर": trim pauses + time map, align words, watermark removal, cut-outs, build page, preview contact sheet, fix, render, SFX mix, encode, verify frames, deliver.
5. Use a task list (prep / build+preview / render+encode+check).

---

## 3. Environment facts (cloud sandbox)

- PyPI and npm are BLOCKED; huggingface.co is BLOCKED. GitHub (releases + public repo clones) works.
- Already installed: ffmpeg, onnxruntime, opencv, Pillow, numpy, playwright + Chromium (PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; never run playwright install).
- Fonts: `GIT_LFS_SKIP_SMUDGE=1 git clone --depth 1 --filter=blob:none --sparse https://github.com/google/fonts /home/claude/google/fonts && cd /home/claude/google/fonts && git sparse-checkout set ofl/poppins ofl/mukta` (raw.githubusercontent is blocked; use the clone). Call add_repo(google, fonts) first if asked.
- Background-removal model: `curl -sSL -o ~/.u2net/isnet.onnx https://github.com/danielgatis/rembg/releases/download/v0.0.0/isnet-general-use.onnx`
- Offline ASR model: `curl -sSL -o ws.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2` (640 MB; use the int8 encoder/decoder).
- 2 CPUs: render in 3 parallel parts (~0.25 s/frame per process; ~10-12 min for a 98 s reel).

---

## 4. Tools (rebuild in /home/claude/<project>/tools)

### 4.1 ASR (Whisper-small ONNX via onnxruntime)
- Log-mel: 16 kHz, n_fft 400, hop 160, 80 slaney mel filters, log10 clamp(1e-10), max-8, (x+4)/4, pad/crop to 3000 frames.
- Encoder input `mel` [1,80,3000] -> n_layer_cross_k/v. Decoder inputs: tokens, in_n_layer_self_k_cache/v (zeros [12,1,448,768]), n_layer_cross_k/v, offset; greedy decode with prompt [sot, lang_token('mr'), transcribe, no_timestamps]; allow up to 400 tokens (Marathi uses many byte tokens); stop on eot or repetition.
- Tokens file lines = base64 bytes + id; join bytes then decode utf-8.
- Language code -> token from metadata all_language_codes / all_language_tokens.
- Split audio on silences (10 ms energy VAD) into chunks of ~9 s; Whisper-small Marathi is rough - reconstruct the true script by meaning, re-transcribe unclear 4-5 s windows.

### 4.2 Pause trim + time map
- Keep voiced segments; any gap > 0.25 s is cut down to 0.25 s (keep 0.10 s after speech, 0.15 s before next). 8 ms fades at cuts. Save vo_t.f32 / vo_t.wav and timemap [(old_a, old_b, new_start)].

### 4.3 Word alignment
- Write the corrected script split per ASR chunk. Within each chunk, distribute words over the voiced segments proportionally to character count; map to trimmed time. Save words.json [{w,t0,t1}]. Print index + time list and plan every visual beat on word indices (T(i) = W[i].t0, start beats ~0.1 s early).

### 4.4 Images
- Backgrounds: inpaint watermark circle (r = 1.45% of height) at (0.926w, 0.958h) with cv2.INPAINT_TELEA, resize to 2000 px height, JPEG 90.
- Cut-outs: ISNet (input 1024x1024 RGB, (x/255-0.5)/1.0, sigmoid map normalized), alpha = clip((a-0.08)/0.84), crop to content, max 1100 px PNG.
- Cream/white objects on white (paper, calendar, file): ISNet fails - use LAB matte: chroma distance from border colour > 5 OR darker by > 45 L, morphology close 31, largest contour filled, erode 5, blur 5.
- Always look at a contact sheet of cut-outs and background corners before building.

### 4.5 SFX synth (numpy) + mix
- Sounds: whoosh/swoosh/sweep/warp (band-pass noise sweep with sine envelope), impact (pitch-drop sine + noise burst), thud, stamp, pop, click, ding, chime, buzz, tick/ticks, riser, shimmer, cash/keys (random high pings), paper, vault (clicks + clunk).
- Mix: voice*1.0 + fx*0.35*duck (duck 0.5 where voice frame RMS > 0.02, smoothed), normalize to 0.97 peak, AAC 192k. Check voice RMS is ~5x SFX RMS.

### 4.6 Render + encode
- Concat parts, then 2-pass: `ffmpeg -i full.mp4 -c:v libx264 -preset slow -b:v 2100k -pass 1 -an -f null /dev/null` then pass 2 with `-i mix.m4a -c:a aac -b:a 192k -shortest -movflags +faststart -pix_fmt yuv420p`. Confirm size <= 29 MB and extract 6-8 frames from the final file to verify.

---

## 5. Engine (verbatim) - site/engine.js

```js
const STAGE=document.getElementById('stage'),CAM=document.getElementById('cam'),FX=document.getElementById('fx');
const ITEMS=[],SFX=[],CAMEV=[];
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),lerp=(a,b,p)=>a+(b-a)*p;
const E={out:p=>1-Math.pow(1-p,3),in:p=>p*p*p,inout:p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2,
 back:p=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(p-1,3)+c1*Math.pow(p-1,2)},sine:p=>-(Math.cos(Math.PI*p)-1)/2};
function sfx(t,name,vol=1){SFX.push({t,name,vol})}
function A(o){const el=document.createElement('div');el.className='it '+(o.cls||'');
 if(o.img){const im=document.createElement('img');im.src=o.img;im.style.width='100%';im.style.display='block';el.appendChild(im)}
 if(o.html)el.insertAdjacentHTML('beforeend',o.html);if(o.w)el.style.width=o.w+'px';if(o.h)el.style.height=o.h+'px';
 el.style.zIndex=o.z||10;(o.parent||(o.layer==='fx'?FX:STAGE)).appendChild(el);o.el=el;
 o.din=o.din??.45;o.dout=o.dout??.3;o.x=o.x??540;o.y=o.y??960;o.t1=o.t1??1e9;
 if(o.sfx)sfx(o.t0+(o.sfxd||0),o.sfx,o.sfxv??.8);ITEMS.push(o);return o}
function enterT(k,p){const q=1-p;switch(k){
 case'pop':return{s:lerp(.4,1,E.back(p)),o:clamp(p*2.5)};case'zoom':return{s:lerp(1.6,1,E.out(p)),o:p,blur:q*14};
 case'up':return{dy:120*(1-E.out(p)),o:p};case'down':return{dy:-120*(1-E.out(p)),o:p};
 case'left':return{dx:-260*(1-E.out(p)),o:p};case'right':return{dx:260*(1-E.out(p)),o:p};
 case'flip':return{ry:-90*(1-E.out(p)),o:clamp(p*2)};case'flipx':return{rx:90*(1-E.out(p)),o:clamp(p*2)};
 case'drop':return{dy:-700*(1-E.out(p)),r:-12*q,o:clamp(p*3)};case'stamp':return{s:lerp(2.6,1,E.in(clamp(p))),o:clamp(p*4)};
 case'rise':return{dy:400*(1-E.out(p)),s:lerp(.85,1,E.out(p)),o:clamp(p*2)};case'spin':return{r:-180*(1-E.out(p)),s:lerp(.3,1,E.back(p)),o:clamp(p*2)};
 case'blur':return{o:p,blur:q*20,s:lerp(1.08,1,p)};default:return{o:p}}}
function seek(t){for(const o of ITEMS){if(!(t>=o.t0&&t<o.t1)){o.el.style.display='none';continue}o.el.style.display='';
 const lt=t-o.t0;let tr={dx:0,dy:0,s:1,r:0,o:1,ry:0,rx:0,blur:0};const pin=clamp(lt/o.din);
 if(o.enter&&pin<1)Object.assign(tr,enterT(o.enter,pin));
 const pout=o.t1<1e8?clamp((t-(o.t1-o.dout))/o.dout):0;
 if(pout>0){const ex=o.exit||'fade',k=E.in(pout);tr.o*=1-pout;
  if(ex==='up')tr.dy-=160*k;if(ex==='down')tr.dy+=160*k;if(ex==='left')tr.dx-=400*k;if(ex==='right')tr.dx+=400*k;
  if(ex==='zoom'){tr.s*=1+.5*k;tr.blur+=12*k}if(ex==='shrink')tr.s*=1-.7*k}
 if(o.float){tr.dy+=Math.sin(lt*1.6+(o.ph||0))*o.float;tr.r+=Math.sin(lt*1.1+(o.ph||0))*o.float*.05}
 if(o.fn){const x=o.fn(t,lt,o,o.el)||{};for(const k in x){if(k==='s')tr.s*=x.s;else if(k==='o')tr.o*=x.o;else tr[k]=(tr[k]||0)+x[k]}}
 const el=o.el;if(!o.raw){el.style.left=o.x+'px';el.style.top=o.y+'px';
  el.style.transform=`translate(-50%,-50%) translate(${tr.dx}px,${tr.dy}px) perspective(1400px) rotateX(${tr.rx}deg) rotateY(${tr.ry}deg) rotate(${tr.r}deg) scale(${tr.s})`}
 el.style.opacity=clamp(tr.o);el.style.filter=tr.blur>.3?`blur(${tr.blur}px)`:(o.filter||'')}
 let s=1,dx=0,dy=0,r=0;for(const c of CAMEV){const lt=t-c.t;if(lt<0||lt>c.d)continue;const p=lt/c.d;
  if(c.k==='punch')s*=1+c.a*Math.sin(Math.PI*p)*(1-p);
  if(c.k==='shake'){const a=c.a*(1-p);dx+=Math.sin(lt*90)*a;dy+=Math.cos(lt*77)*a;r+=Math.sin(lt*60)*a*.02}}
 CAM.style.transform=`translate(${dx}px,${dy}px) rotate(${r}deg) scale(${s*(1+.012*Math.sin(t*.35))})`;if(window.HUD)HUD(t)}
function punch(t,a=.06,d=.45){CAMEV.push({t,k:'punch',a,d})}
function shake(t,a=14,d=.4){CAMEV.push({t,k:'shake',a,d})}
// Ken-Burns background with optional clip entries: clip:'iris'|'wipeup'|'diag' (cd=duration), zin (warp-in), zout
function BG(o){return A(Object.assign({cls:'bg',z:o.z||1,raw:true,din:.01,
 html:`<div class="bgimg" style="background-image:url(${o.img})"></div><div class="shade" style="background:${o.shade||'linear-gradient(180deg,rgba(6,10,20,.55) 0%,rgba(6,10,20,.15) 35%,rgba(6,10,20,.35) 60%,rgba(6,10,20,.92) 100%)'}"></div>`,
 fn:(t,lt,oo,el)=>{const p=clamp((t-oo.t0)/Math.max(.1,oo.t1-oo.t0)),im=el.firstChild;
  im.style.transform=`translate(${lerp(oo.x0??0,oo.x1??0,E.sine(p))}px,${lerp(oo.y0??0,oo.y1??0,E.sine(p))}px) scale(${lerp(oo.s0??1.06,oo.s1??1.18,E.sine(p))})`;
  if(oo.filt)im.style.filter=oo.filt;
  if(oo.clip){const q=E.inout(clamp(lt/oo.cd));
   if(oo.clip==='iris')el.style.clipPath=q<1?`circle(${q*120}% at ${oo.cx||50}% ${oo.cy||50}%)`:'none';
   if(oo.clip==='wipeup')el.style.clipPath=q<1?`inset(${(1-q)*100}% 0 0 0)`:'none';
   if(oo.clip==='diag')el.style.clipPath=q<1?`polygon(0 0,${q*200}% 0,${q*200-100}% 100%,0 100%)`:'none'}
  if(oo.zin){const q=E.out(clamp(lt/oo.zin));im.style.transform+=` scale(${lerp(1.6,1,q)})`;el.style.filter=q<1?`blur(${(1-q)*16}px)`:''}
  return{}}},o))}
```

### Page skeleton (site/index.html) essentials
- `@font-face` for Poppins 400-900 from ../fonts; html/body 1080x1920, background #05080f.
- Layers: `#cam > #stage` (scenes), `#fx` (transitions, z 500), `.vig` radial vignette (z 800), `.grain` SVG fractal-noise overlay opacity .06 (z 900), optional `#hud` progress bar (z 700).
- Classes: `.it{position:absolute}`, `.bg{inset:0;overflow:hidden}`, `.bgimg{inset:-3%;background-size:cover}`, `.glass` (white 16%->5% gradient, backdrop blur 18px, 1.5px white 22% border, radius 30, big shadow), `.dark` (navy 82% + gold 35% border), `.goldtxt` (gradient #FFF1C9 -> #F2C063 -> #C8892B clipped to text), `.pill` + `.p-red/.p-green/.p-gold/.p-dark/.p-glass`, `.badge` (round gold number), `.strike::after` (red bar scaleX(var(--k))).
- `const W = __WORDS__;` replaced with words.json at build time. Wait for `document.fonts.ready`, decode all images, preload bg URLs, `document.fonts.load('600 40px P','मराठी')`, then `seek(0); window.READY=true`.
- Reusable scene helpers to write each time: TITLE (huge "0N" flash -> badge + title row), CHECK/pill chips with ✓/✕ icons (inline SVG), PART (bokeh particles), FLASH, SWEEP, BLINDS, BARS, RING (vault dial), SPEED (speed lines), LEAK (light leak). Inline SVG icons (check, cross, warn, rupee, calendar, clock, parking, gym, list, talk, bank, building, user, law, comment, share, plus, doc).
- A good layout: HUD at y 150, title row at y 400, main content y 700-1500, chips/pills y 1400-1800, CTA in the last 10 s (question chips A/B/C -> Comment -> Share -> Follow button with cursor click + ring pulse).

## 6. Renderer (verbatim) - tools/render.py

```python
import sys, base64, subprocess, asyncio, os
from playwright.async_api import async_playwright
ROOT = '/home/claude/PROJECT/site/'; FPS = 30
def build():
    W = open(ROOT + '../words.json').read()
    open(ROOT + 'page.html', 'w').write(open(ROOT + 'index.html').read().replace('__WORDS__', W))
async def main():
    mode = sys.argv[1]; build()
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--allow-file-access-from-files', '--disable-web-security', '--font-render-hinting=none'])
        pg = await b.new_page(viewport={'width': 1080, 'height': 1920}, device_scale_factor=1)
        pg.on('pageerror', lambda e: print('PAGEERROR', e))
        await pg.goto('file://' + ROOT + 'page.html')
        await pg.wait_for_function('window.READY === true', timeout=120000)
        cdp = await pg.context.new_cdp_session(pg)
        async def shot(t):
            await pg.evaluate(f'seek({t})')
            r = await cdp.send('Page.captureScreenshot', {'format': 'jpeg', 'quality': 93})
            return base64.b64decode(r['data'])
        if mode == 'shots':   # render.py shots 1.5,4.9,... out/sh
            out = sys.argv[3]; os.makedirs(out, exist_ok=True)
            for f in os.listdir(out): os.remove(os.path.join(out, f))
            for i, t in enumerate(float(x) for x in sys.argv[2].split(',')):
                open(f'{out}/{i:03d}_{t:06.2f}.jpg', 'wb').write(await shot(t))
        elif mode == 'sfx':   # render.py sfx out/sfx.json
            open(sys.argv[2], 'w').write(await pg.evaluate('JSON.stringify({sfx:SFX,end:window.END})'))
        elif mode == 'video': # render.py video 0 33 out/p1.mp4
            a, z, out = float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
            ff = subprocess.Popen(['ffmpeg', '-y', '-v', 'error', '-f', 'image2pipe', '-framerate', str(FPS), '-c:v', 'mjpeg', '-i', '-',
                                   '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '14', '-pix_fmt', 'yuv420p', out], stdin=subprocess.PIPE)
            for i in range(round(a * FPS), round(z * FPS)):
                ff.stdin.write(await shot(i / FPS))
            ff.stdin.close(); ff.wait()
        await b.close()
asyncio.run(main())
```
- Parallel: `for r in "0 33 p1" "33 66 p2" "66 END p3"; do set -- $r; setsid nohup python3 tools/render.py video $1 $2 out/$3.mp4 > out/$3.log 2>&1 & done`
- Preview: render ~30 shots across the timeline, build a contact sheet (270x480 thumbs, 8 per row), LOOK at it, then a few full-size frames. Fix overflow (long Latin words, wrapped lines), overlaps with the HUD, and empty frames before the full render.

---

## 7. Finished reels (reference)
अभिजात मराठी भाषा दिवस; महाराष्ट्र बनला कसा (Deccan Trap); संयुक्त महाराष्ट्र (district maps); भारतातील ऋतू (NASA globe, monsoon winds); एल निनो/ला निना; निवडणूक आयोग; MPSC रचना; Asian Games 2026; नोबेल; पर्वतरांगा आणि नद्या; IST/रेखांश; ग्रामपंचायत कर प्रश्न; कोतवाल पुस्तक promo (3D book); Vox style reel; राज्य प्रतीके; LOC/LAC 3D map; 36 जिल्हे; व्याघ्र प्रकल्प; हिल स्टेशन्स; Redevelopment करार - 7 गोष्टी (real-estate page, 97.6 s: old building hook, floor-plan carpet, rent checklist, corpus coins, bank-guarantee flow, 2/3-year timeline, amenities tiles, registration stamp on two agreements, lawyer + PMC, A/B/C comment CTA).
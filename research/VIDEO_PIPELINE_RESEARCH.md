# How professional 3D real-estate walkthrough reels are made - research (27 Oct 2026)
Why: our hand-coded three.js "golden hour" frame looked fake. This note records how the industry does it and what fits our hardware (Windows laptop: RTX 3050 4 GB VRAM, 16 GB RAM, Ryzen 7 7435HS; plus a Mac).

## 1. Why professional renders look real (and ours did not)
- They render a full 3D model in a **real-time arch-viz engine** (Twinmotion, D5 Render, Lumion, Enscape, Unreal Engine 5) or an offline path tracer (V-Ray, Corona, Blender Cycles). These engines do global illumination, real sky/HDRI light, reflections, depth of field, motion blur.
- They drop in **ready asset libraries**: Twinmotion ~10,000 assets + Quixel Megascans (scanned trees, cars, people, materials); D5 Pro 13,000+ assets (Community ~2,000). Our trees were spheres, our cars were boxes - that is what gave the toy look.
- PBR materials with real texture maps (plaster, wood, glass with mullions, asphalt), not flat colours.
- A **reel is cut from a longer walkthrough**: studios render the full camera path, then cut 30-45 s vertical clips around the key views, keeping text inside the mobile safe zone (centre third).
- Instagram target: 9:16, 1080x1920, 24-30 fps, up to 90 s.

## 2. Tools compared (for our hardware and licence)
| Tool | Cost | Realism | Our laptop (RTX 3050 4 GB) | Vertical 9:16 | Floor-by-floor build | Notes |
|---|---|---|---|---|---|---|
| **Twinmotion 2026** | Free incl. commercial use if company revenue < $1M | High (Lumen GI; Path Tracer needs 8 GB VRAM, Windows only) | Minimum is **6 GB VRAM** -> our 4 GB is below spec; runs on **Apple Silicon Mac** (M1+) | Custom resolution supported; one doc says height is locked to aspect - verify in app | Yes: **Phasing tool** (timeline shows/hides groups) | Import FBX/OBJ/glTF/Datasmith; 10,000 assets + Megascans + Sketchfab |
| **D5 Render** | Community free for **non-commercial only**; Pro $360/yr for commercial | High (real-time ray tracing) | Needs ray-tracing GPU; users report RTX 3050 4 GB ok with 32 GB RAM; we have 16 GB; Windows only | 9:16 was a forum feature request - unverified | Keyframe path + object animation | Blender live-sync plugin; Community ~2,000 assets |
| **Blender 4.x** | Free, any use | Eevee: good; Cycles: photo-real but slow (30-60 s/frame on this GPU) | Eevee fine on 4 GB; Cycles ok for stills | Any resolution, native | Yes, by keyframes/geometry nodes (script it) | We can **export our generator's building as glTF** straight into Blender; free assets from Poly Haven (CC0), tree add-ons |
| **Lumion** | ~$76/month | Very high, best vegetation | Needs strong GPU | Yes | Yes | Not free - skip for now |
| **Unreal Engine 5** | Free (<$1M) | Highest | Heavy on 4 GB | Yes | Yes | Steep learning curve - skip |
| **AI image-to-video** (Kling 3.0, Runway Gen-4.5, Veo 3.1) | Runway $15/mo, Kling ~similar, Luma $30/mo | Looks photo-real | Cloud, no GPU needed | Yes (prompt portrait) | No - geometry drifts | 5-10 s clips from one good render; use **start+end frame** and a short camera prompt ("drone orbits the building"). Good for hero/intro shots only, not for rule explanations |

## 3. Recommended pipeline for the series "Plot किती, Building कशी?"
1. **Generator (ours, keep):** plot + road + UDCPR margins + FSI -> building mass, floors, refuge floor, crown, site. Export as **glTF/FBX** (three.js GLTFExporter) instead of rendering in the browser.
2. **Render in a real engine:**
   - Best free option on the **Mac** (if Apple Silicon): Twinmotion - free commercial licence, Phasing for the floor-by-floor rise, Megascans trees/cars/people, golden-hour sky.
   - On this Windows laptop: Twinmotion is under the 6 GB spec; use **Blender Eevee** (free, scriptable, our generator can even build the scene via Python) or D5 Pro if we pay.
3. **Camera path** as in our study (research/PLANS_TO_3D_STUDY.md §7): road corner -> gate -> driveway -> lobby -> lift ride -> refuge floor -> terrace pool -> orbit -> dusk pull-back.
4. **Vertical cut:** render 1080x1920 directly where allowed, else render 4K 16:9 and reframe 9:16 in ffmpeg.
5. **Text, numbers, CTA stay in our HTML engine** (engine.js/cta.js) composited over the rendered footage - so the rules, labels, comment box and Follow flip stay exactly as in the other reels.
6. Optional polish: one hero still -> Kling/Runway 5-10 s orbit for the hook.

## 4. Decision needed
- Which Mac (M1/M2/M3?) -> Twinmotion free route works there.
- Budget: $0 (Blender / Twinmotion on Mac) vs D5 Pro $360/yr vs Runway $15/mo for AI hero clips.

## Sources
- https://www.renderahouse.com/blog/3d-model-to-ai-video-walkthrough
- https://www.myarchitectai.com/blog/d5-render-vs-twinmotion
- https://www.myarchitectai.com/blog/twinmotion-system-requirements
- https://d5render.com/blog/system-requirements-for-d5-render
- https://dev.epicgames.com/documentation/en-us/twinmotion/export-settings-for-videos-in-twinmotion
- https://dev.epicgames.com/documentation/en-us/twinmotion/phasing-and-view-sets
- https://archademia.com/blog/enscape-vs-lumion-vs-twinmotion-the-best-real-time-renderer-for-architects-in-2026/
- https://marygold-studio.com/service/3d-reels-creation-services
- https://monkyvision.com/blog/3d-animation-real-estate/
- https://rundiffusion.com/drone-flyovers
- https://www.tripo3d.ai/blog/best-free-3d-rendering-software

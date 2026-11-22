/* Reel engine core - every frame is a pure function of time: seek(t).
 *
 * Scenes:   scene(t0, t1, draw, {tin:'cut'|'push'|'iris'|'fade', dur})
 *           draw(ctx, t) draws the full frame at global time t (may be called after t1 during transitions).
 * Overlays: overlay(t0, t1, draw)  - drawn on top of scenes, not affected by transitions.
 * SFX:      sfx(t, name, gain)      - exported by render.py for audio.py.
 * Impacts:  punch(t, amp), shake(t, amp, dur) - camera on the whole frame (fx.js).
 */
const W = 1080, H = 1920, FPS = 30;
const E = { scenes: [], overlays: [], sfx: [], fx: [], img: {}, duration: 0, bg: '#0d1729' };

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, p) => a + (b - a) * p;
const ease = {
  lin: p => p,
  out: p => 1 - Math.pow(1 - p, 3),
  out5: p => 1 - Math.pow(1 - p, 5),
  in: p => p * p * p,
  inOut: p => (p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
  back: p => { const c = 1.70158, c3 = c + 1; return 1 + c3 * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); },
  sine: p => -(Math.cos(Math.PI * p) - 1) / 2,
};
/* progress of an animation that starts at t0 and lasts d seconds */
function A(t, t0, d = .5, e = ease.out) { return e(clamp((t - t0) / d)); }
/* visibility: fade in at t0, fade out ending at t1 */
function V(t, t0, t1 = 1e9, fi = .3, fo = .3) { return clamp((t - t0) / fi) * clamp((t1 - t) / fo); }

/* tin: cut | push | fade | iris | circle (o.cx, o.cy, o.ring color) | diag (o.ring) | zoom | whip | up */
function scene(t0, t1, draw, o = {}) { E.scenes.push({ t0, t1, draw, tin: o.tin || 'cut', dur: o.dur || .4, cx: o.cx, cy: o.cy, ring: o.ring }); E.duration = Math.max(E.duration, t1); }
function overlay(t0, t1, draw) { E.overlays.push({ t0, t1, draw }); }
function sfx(t, name, gain = 1) { E.sfx.push({ t: +t.toFixed(3), name, gain }); }

function loadImages(map) {
  return Promise.all(Object.entries(map).map(([k, src]) => new Promise((res, rej) => {
    const im = new Image(); im.onload = () => { E.img[k] = im; res(); }; im.onerror = () => rej(new Error('image ' + src)); im.src = src;
  })));
}
function loadFonts() {
  return Promise.all([400, 500, 600, 700, 800].map(w => document.fonts.load(`${w} 40px Poppins`, 'अआ Aa ₹')));
}

let canvas, ctx;
function initCanvas() {
  canvas = document.getElementById('c'); canvas.width = W; canvas.height = H;
  ctx = canvas.getContext('2d'); ctx.imageSmoothingQuality = 'high';
}

function drawScene(s, t) { ctx.save(); s.draw(ctx, t); ctx.restore(); }

function seek(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none';
  ctx.fillStyle = E.bg; ctx.fillRect(0, 0, W, H);
  const i = E.scenes.findIndex(s => t >= s.t0 && t < s.t1);
  const idx = i < 0 ? E.scenes.length - 1 : i;
  const s = E.scenes[idx], prev = E.scenes[idx - 1];
  ctx.save();
  FX.camera(ctx, t);
  const p = clamp((t - s.t0) / s.dur);
  if (prev && s.tin !== 'cut' && p < 1) {
    const e = ease.inOut(p);
    if (s.tin === 'push') {
      ctx.save(); ctx.translate(-W * e, 0); drawScene(prev, t); ctx.restore();
      ctx.save(); ctx.translate(W * (1 - e), 0); drawScene(s, t); ctx.restore();
    } else if (s.tin === 'iris' || s.tin === 'circle') {
      drawScene(prev, t);
      const cx = s.cx ?? W / 2, cy = s.cy ?? H / 2;
      if (s.tin === 'circle' && s.ring) { ctx.save(); ctx.fillStyle = s.ring; ctx.beginPath(); ctx.arc(cx, cy, e * 1.15 * Math.hypot(W, H) + 1, 0, 7); ctx.fill(); ctx.restore(); }
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, e * Math.hypot(W, H) + 1, 0, 7); ctx.clip(); drawScene(s, t); ctx.restore();
    } else if (s.tin === 'diag') {
      drawScene(prev, t);
      const d = (W + H) * e;
      ctx.save(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(d, 0); ctx.lineTo(0, d); ctx.closePath(); ctx.clip(); drawScene(s, t); ctx.restore();
      if (s.ring) { ctx.save(); ctx.strokeStyle = s.ring; ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(d, 0); ctx.lineTo(0, d); ctx.stroke(); ctx.restore(); }
    } else if (s.tin === 'zoom') {
      ctx.save(); ctx.globalAlpha = 1 - e; ctx.translate(W / 2, H / 2); ctx.scale(1 + e * .6, 1 + e * .6); ctx.translate(-W / 2, -H / 2); drawScene(prev, t); ctx.restore();
      ctx.save(); ctx.globalAlpha = e; ctx.translate(W / 2, H / 2); ctx.scale(.75 + .25 * e, .75 + .25 * e); ctx.translate(-W / 2, -H / 2); drawScene(s, t); ctx.restore();
    } else if (s.tin === 'whip') {
      for (let g = 0; g < 4; g++) { // motion-blur ghosts
        const off = g * 40 * Math.sin(Math.PI * e);
        ctx.save(); ctx.globalAlpha = g ? .22 : 1; ctx.translate(-W * e - off, 0); drawScene(prev, t); ctx.restore();
        ctx.save(); ctx.globalAlpha = g ? .22 : 1; ctx.translate(W * (1 - e) + off, 0); drawScene(s, t); ctx.restore();
      }
    } else if (s.tin === 'up') {
      ctx.save(); ctx.translate(0, -H * e * .35); drawScene(prev, t); ctx.restore();
      ctx.save(); ctx.translate(0, H * (1 - e)); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 60; drawScene(s, t); ctx.restore();
    } else { // fade
      drawScene(prev, t); ctx.save(); ctx.globalAlpha = e; drawScene(s, t); ctx.restore();
    }
  } else drawScene(s, t);
  ctx.restore();
  for (const o of E.overlays) if (t >= o.t0 && t < o.t1) { ctx.save(); o.draw(ctx, t); ctx.restore(); }
  FX.flashes(ctx, t);
}
window.seek = seek;

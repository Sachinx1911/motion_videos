/* Drawing helpers.
 *
 * HELPER LIST
 *   C                      brand colors (set per brand in scenes.js via Object.assign(C, ...))
 *   IMG(ctx, img, o)       cover-fit image into rect {x,y,w,h, z(zoom), fx,fy(focus 0-1), blur, bright, alpha}
 *   RR(ctx, x,y,w,h,r)     rounded-rect path
 *   CARD(ctx, x,y,w,h,o)   card {fill, stroke, lw, r, alpha, shadow}
 *   TXT(ctx, s, x,y,o)     text {size, weight, color, align, alpha, ls, base, maxW}; returns width
 *   TW(ctx, s, size, wt)   text width
 *   GRAD(ctx, y0,y1,color,a0,a1)  vertical fade band
 *   CHECK(ctx, x,y,s,color,p,lw)  check mark drawn progressively (p 0-1)
 *   ARROW(ctx, x1,y1,x2,y2,color,lw,p)
 *   LINE(ctx, x1,y1,x2,y2,color,lw,p)
 *   RING(ctx, x,y,r,color,lw,p)    progressive circle
 *   SHIELD / LOCK / CAL / VAULT / COIN / DOC / MAG / RUPEE_ICON / HOMEI  - icons
 *   POP(t,t0,d)            scale for pop-in (back ease)
 *   INR(n)                 Indian number format 250000 -> 2,50,000
 */
const C = { gold: '#e8cf9f', gold2: '#c9a66f', gold3: '#b8935f', navy: '#0d1729', navy2: '#1b2a45', ivory: '#faf7f2', ink: '#0d1729', muted: 'rgba(250,247,242,.62)', coral: '#e8907a' };
const FONT = 'Poppins';

function IMG(ctx, img, o = {}) {
  const x = o.x ?? 0, y = o.y ?? 0, w = o.w ?? W, h = o.h ?? H, z = o.z ?? 1;
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  const s = Math.max(w / iw, h / ih) * z, dw = iw * s, dh = ih * s;
  let dx = x + w / 2 - (o.fx ?? .5) * dw, dy = y + h / 2 - (o.fy ?? .5) * dh;
  dx = clamp(dx, x + w - dw, x); dy = clamp(dy, y + h - dh, y);
  ctx.save();
  if (o.clip !== false) { ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); }
  const f = [];
  if (o.blur) f.push(`blur(${o.blur}px)`);
  if (o.bright != null && o.bright !== 1) f.push(`brightness(${o.bright})`);
  if (o.sat != null) f.push(`saturate(${o.sat})`);
  ctx.filter = f.length ? f.join(' ') : 'none';
  ctx.globalAlpha *= o.alpha ?? 1;
  const pad = o.blur ? o.blur * 2 : 0; // avoid blurred dark edges
  ctx.drawImage(img, dx - pad, dy - pad, dw + pad * 2, dh + pad * 2);
  ctx.restore();
}

function RR(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

function CARD(ctx, x, y, w, h, o = {}) {
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  if (o.shadow !== false) { ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = o.shadowBlur ?? 40; ctx.shadowOffsetY = 14; }
  RR(ctx, x, y, w, h, o.r ?? 28);
  if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); }
  ctx.shadowColor = 'transparent';
  if (o.stroke) { ctx.lineWidth = o.lw ?? 3; ctx.strokeStyle = o.stroke; ctx.stroke(); }
  ctx.restore();
}

function TXT(ctx, s, x, y, o = {}) {
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  const size = o.size ?? 48;
  ctx.font = `${o.weight ?? 600} ${size}px ${FONT}`;
  ctx.fillStyle = o.color ?? C.ivory; ctx.textAlign = o.align ?? 'center'; ctx.textBaseline = o.base ?? 'middle';
  if (o.ls) ctx.letterSpacing = o.ls + 'px';
  if (o.shadow) { ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 4; }
  let w = ctx.measureText(s).width;
  if (o.maxW && w > o.maxW) { const k = o.maxW / w; ctx.translate(x, y); ctx.scale(k, k); ctx.fillText(s, 0, 0); w = o.maxW; }
  else ctx.fillText(s, x, y);
  ctx.restore(); return w;
}
function TW(ctx, s, size, wt = 600, ls = 0) { ctx.save(); ctx.font = `${wt} ${size}px ${FONT}`; if (ls) ctx.letterSpacing = ls + 'px'; const w = ctx.measureText(s).width; ctx.restore(); return w; }

function GRAD(ctx, y0, y1, color, a0, a1) {
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  g.addColorStop(0, hexA(color, a0)); g.addColorStop(1, hexA(color, a1));
  ctx.fillStyle = g; ctx.fillRect(0, Math.min(y0, y1), W, Math.abs(y1 - y0));
}
function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }

function polyP(ctx, pts, p) { // draw polyline up to fraction p of its length
  const seg = []; let L = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let rem = L * clamp(p); ctx.beginPath(); ctx.moveTo(...pts[0]);
  for (let i = 1; i < pts.length && rem > 0; i++) {
    const k = Math.min(1, rem / seg[i - 1]);
    ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)); rem -= seg[i - 1];
  }
  ctx.stroke();
}
function CHECK(ctx, x, y, s, color, p = 1, lw) {
  if (p <= 0) return; ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw ?? s * .16; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  polyP(ctx, [[x - s * .42, y + s * .02], [x - s * .12, y + s * .32], [x + s * .46, y - s * .34]], p); ctx.restore();
}
function LINE(ctx, x1, y1, x2, y2, color, lw = 4, p = 1) {
  if (p <= 0) return; ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; polyP(ctx, [[x1, y1], [x2, y2]], p); ctx.restore();
}
function ARROW(ctx, x1, y1, x2, y2, color, lw = 6, p = 1) {
  if (p <= 0) return; const xe = lerp(x1, x2, p), ye = lerp(y1, y2, p);
  LINE(ctx, x1, y1, xe, ye, color, lw);
  const a = Math.atan2(y2 - y1, x2 - x1), hs = lw * 3.2;
  ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(xe + Math.cos(a) * hs * .4, ye + Math.sin(a) * hs * .4);
  ctx.lineTo(xe + Math.cos(a + 2.5) * hs, ye + Math.sin(a + 2.5) * hs); ctx.lineTo(xe + Math.cos(a - 2.5) * hs, ye + Math.sin(a - 2.5) * hs); ctx.closePath(); ctx.fill(); ctx.restore();
}
function RING(ctx, x, y, r, color, lw = 4, p = 1) {
  if (p <= 0) return; ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(p)); ctx.stroke(); ctx.restore();
}
function POP(t, t0, d = .45) { return t < t0 ? 0 : ease.back(clamp((t - t0) / d)); }
function INR(n) {
  n = Math.round(n); const s = String(n); if (s.length <= 3) return s;
  const last3 = s.slice(-3), rest = s.slice(0, -3);
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
}
function scaled(ctx, x, y, k, fn) { ctx.save(); ctx.translate(x, y); ctx.scale(k, k); fn(); ctx.restore(); }

/* ---------- icons (centered at x,y, size s) ---------- */
function SHIELD(ctx, x, y, s, fill, stroke) {
  ctx.save(); ctx.translate(x, y); ctx.beginPath();
  ctx.moveTo(0, -s * .5); ctx.bezierCurveTo(s * .2, -s * .38, s * .36, -s * .36, s * .42, -s * .36);
  ctx.bezierCurveTo(s * .44, s * .05, s * .3, s * .32, 0, s * .52);
  ctx.bezierCurveTo(-s * .3, s * .32, -s * .44, s * .05, -s * .42, -s * .36);
  ctx.bezierCurveTo(-s * .36, -s * .36, -s * .2, -s * .38, 0, -s * .5); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.lineWidth = s * .035; ctx.strokeStyle = stroke; ctx.stroke(); }
  ctx.restore();
}
function LOCK(ctx, x, y, s, color, body) {
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = color; ctx.lineWidth = s * .12; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -s * .12, s * .26, Math.PI, 0); ctx.lineTo(s * .26, s * .05); ctx.moveTo(-s * .26, -s * .12); ctx.lineTo(-s * .26, s * .05); ctx.stroke();
  RR(ctx, -s * .4, 0, s * .8, s * .55, s * .1); ctx.fillStyle = color; ctx.fill();
  ctx.fillStyle = body || C.navy; ctx.beginPath(); ctx.arc(0, s * .25, s * .07, 0, 7); ctx.fill();
  ctx.restore();
}
function CAL(ctx, x, y, s, top, big, o = {}) { // calendar card with header text + big text; o.flip 0-1 page flip
  ctx.save(); ctx.translate(x, y);
  const w = s, h = s * 1.05;
  CARD(ctx, -w / 2, -h / 2, w, h, { fill: C.ivory, r: s * .08 });
  RR(ctx, -w / 2, -h / 2, w, h * .26, s * .08); ctx.save(); ctx.clip(); ctx.fillStyle = o.head || C.gold2; ctx.fillRect(-w / 2, -h / 2, w, h * .26); ctx.restore();
  for (const k of [-1, 1]) { ctx.fillStyle = C.navy2; RR(ctx, k * w * .25 - s * .03, -h / 2 - s * .06, s * .06, s * .14, s * .03); ctx.fill(); }
  TXT(ctx, top, 0, -h / 2 + h * .13, { size: s * .1, weight: 600, color: C.navy });
  const f = o.flip ?? 0;
  if (f > 0 && f < 1) { // page lifting
    ctx.save(); ctx.translate(0, -h / 2 + h * .26); ctx.scale(1, Math.cos(f * Math.PI));
    ctx.fillStyle = f < .5 ? '#ece6dc' : '#d9d1c4'; ctx.fillRect(-w / 2, 0, w, h * .74); ctx.restore();
  }
  TXT(ctx, big, 0, h * .14, { size: s * (o.bigSize ?? .3), weight: 700, color: o.bigColor || C.navy });
  ctx.restore();
}
function VAULT(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y);
  CARD(ctx, -s / 2, -s * .42, s, s * .84, { fill: C.navy2, stroke: C.gold2, lw: s * .025, r: s * .07 });
  RING(ctx, 0, 0, s * .2, C.gold, s * .03); ctx.fillStyle = C.gold;
  for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; ctx.fillRect(Math.cos(a) * s * .2 - s * .015, Math.sin(a) * s * .2 - s * .015, s * .03, s * .03); }
  ctx.beginPath(); ctx.arc(0, 0, s * .06, 0, 7); ctx.fill();
  ctx.fillRect(s * .36, -s * .12, s * .05, s * .24);
  ctx.restore();
}
function COIN(ctx, x, y, r, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha;
  const g = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r);
  g.addColorStop(0, '#f6e6c2'); g.addColorStop(1, C.gold3);
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  ctx.lineWidth = r * .1; ctx.strokeStyle = '#a07e4c'; ctx.stroke();
  TXT(ctx, '₹', x, y + r * .04, { size: r * 1.05, weight: 700, color: C.navy2 });
  ctx.restore();
}
function DOC(ctx, x, y, s, o = {}) { // generic code-drawn certificate, s = width
  ctx.save(); ctx.translate(x, y);
  const w = s, h = s * 1.3;
  CARD(ctx, -w / 2, -h / 2, w, h, { fill: '#fbf8f1', r: s * .03, shadowBlur: 50 });
  ctx.strokeStyle = C.gold2; ctx.lineWidth = s * .008; RR(ctx, -w / 2 + s * .04, -h / 2 + s * .04, w - s * .08, h - s * .08, s * .02); ctx.stroke();
  TXT(ctx, 'OCCUPANCY', 0, -h / 2 + s * .2, { size: s * .085, weight: 700, color: C.navy, ls: s * .01 });
  TXT(ctx, 'CERTIFICATE', 0, -h / 2 + s * .3, { size: s * .06, weight: 500, color: C.navy2, ls: s * .02 });
  LINE(ctx, -s * .18, -h / 2 + s * .37, s * .18, -h / 2 + s * .37, C.gold2, s * .006);
  ctx.fillStyle = 'rgba(13,23,41,.13)';
  const rows = [.46, .53, .6, .67, .74, .81, .88];
  rows.forEach((r, i) => { const lw = i % 3 === 2 ? .45 : .7; RR(ctx, -w * .35, -h / 2 + s * r, w * lw, s * .022, s * .011); ctx.fill(); });
  // signature line + seal placeholder
  LINE(ctx, s * .05, h / 2 - s * .16, s * .36, h / 2 - s * .16, 'rgba(13,23,41,.35)', s * .005);
  RING(ctx, -s * .22, h / 2 - s * .2, s * .09, 'rgba(201,166,111,.55)', s * .008);
  if (o.highlight) { ctx.save(); ctx.globalAlpha = .38; ctx.fillStyle = C.gold; RR(ctx, -s * .36, -h / 2 + s * .145, s * .72 * clamp(o.highlight), s * .11, s * .02); ctx.fill(); ctx.restore(); }
  ctx.restore();
}
function STAMP(ctx, x, y, s, label, t, t0) { // gold seal stamp landing at t0
  if (t < t0 - .12) return;
  const u = clamp((t - t0 + .12) / .12), k = lerp(1.9, 1, ease.out(u));
  ctx.save(); ctx.translate(x, y); ctx.rotate(-.14); ctx.scale(k, k); ctx.globalAlpha *= u;
  ctx.fillStyle = 'rgba(201,166,111,.18)'; ctx.beginPath(); ctx.arc(0, 0, s * .5, 0, 7); ctx.fill();
  RING(ctx, 0, 0, s * .5, C.gold2, s * .06); RING(ctx, 0, 0, s * .4, C.gold2, s * .025);
  TXT(ctx, label, 0, s * .03, { size: s * .36, weight: 800, color: C.gold3 });
  ctx.restore();
}
function MAG(ctx, x, y, s, color) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = s * .1; ctx.lineCap = 'round';
  ctx.fillStyle = 'rgba(250,247,242,.18)'; ctx.beginPath(); ctx.arc(x, y, s * .35, 0, 7); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + s * .25, y + s * .25); ctx.lineTo(x + s * .55, y + s * .55); ctx.lineWidth = s * .14; ctx.stroke(); ctx.restore();
}
function HOMEI(ctx, x, y, s, color) {
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = color; ctx.lineWidth = s * .09; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-s * .45, -s * .02); ctx.lineTo(0, -s * .42); ctx.lineTo(s * .45, -s * .02); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-s * .32, -s * .12); ctx.lineTo(-s * .32, s * .4); ctx.lineTo(s * .32, s * .4); ctx.lineTo(s * .32, -s * .12); ctx.stroke();
  ctx.restore();
}

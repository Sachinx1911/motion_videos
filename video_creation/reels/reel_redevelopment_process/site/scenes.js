/* reel_redevelopment_process - PART 1 scenes v2 "MIX + BRIGHT"
 * User feedback on v1 (dark, calm): too plain. v2 = light ivory theme, kinetic typography hook,
 * photos as floating 2.5D cards (full image shown, Gemini mark untouched), flat animated icons,
 * a different transition per step (circle / diag / up / zoom / whip). Timings from cue_words.json.
 */
const ASSETS = {
  R1: 'a/R1_old_building.jpg', R2: 'a/R2_dilapidated_closeup.jpg', R3: 'a/R3_lobby_notice_board.jpg',
  R4: 'a/R4_meeting_hall.jpg', R5: 'a/R5_architect_desk.jpg', RT: 'a/img2_ready_tower_v2.webp', LOGO: 'a/logo_embossed_ivory.jpg',
};
const END = 114.6;
const L = { bg: '#faf7f2', ink: '#0d1729', ink2: '#1b2a45', gold: '#c9a66f', goldL: '#e8cf9f', teal: '#13958a', coral: '#e05a47', blue: '#2c6bd1', muted: '#6b7488', card: '#ffffff' };
const STEPS = { starts: [6.68, 16.86, 30.90, 54.19, 68.29, 81.09], end: 102.58, labels: ['पात्रता', 'सुरुवात', 'सभा', 'तज्ज्ञ', 'Tender', 'निवड'], colors: [L.coral, L.teal, L.blue, L.gold, L.teal, L.coral] };

/* ---------- light background with drifting dots + blobs ---------- */
function bgLight(ctx, t, accent = L.gold) {
  ctx.fillStyle = L.bg; ctx.fillRect(0, 0, W, H);
  const blob = (x, y, r, c, a) => { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, hexA(c, a)); g.addColorStop(1, hexA(c, 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); };
  blob(200 + 80 * Math.sin(t * .3), 500 + 60 * Math.cos(t * .25), 520, accent, .16);
  blob(880 + 70 * Math.cos(t * .27), 1400 + 80 * Math.sin(t * .2), 600, L.gold, .14);
  ctx.fillStyle = 'rgba(13,23,41,.07)';
  const off = (t * 18) % 60;
  for (let y = -60; y < H + 60; y += 60) for (let x = 30; x < W; x += 60) { ctx.beginPath(); ctx.arc(x, y - off, 2.4, 0, 7); ctx.fill(); }
}

/* ---------- kinetic text ---------- */
function popWord(ctx, s, x, y, t, t0, o = {}) {
  if (t < t0) return;
  const k = ease.back(clamp((t - t0) / (o.d ?? .35))), a = clamp((t - t0) / .12) * (o.out ? 1 - A(t, o.out, .25, ease.in) : 1);
  const dy = o.out ? -120 * A(t, o.out, .3, ease.in) : 0;
  ctx.save(); ctx.translate(x, y + dy); ctx.rotate(o.rot ?? 0); ctx.scale(lerp(o.from ?? .3, 1, k), lerp(o.from ?? .3, 1, k));
  if (o.hl) { const w = TW(ctx, s, o.size ?? 80, 800) + 40, p = A(t, t0 + .15, .35); ctx.globalAlpha = a; ctx.fillStyle = o.hl; RR(ctx, -w / 2, -(o.size ?? 80) * .42, w * p, (o.size ?? 80) * .9, 14); ctx.fill(); }
  TXT(ctx, s, 0, 0, { size: o.size ?? 80, weight: o.weight ?? 800, color: o.color ?? L.ink, alpha: a, maxW: o.maxW ?? 980 });
  ctx.restore();
}
function maskUp(ctx, s, x, y, t, t0, o = {}) {
  if (t < t0) return;
  const size = o.size ?? 80, p = A(t, t0, o.d ?? .4, ease.out5), a = o.out ? 1 - A(t, o.out, .25, ease.in) : 1;
  ctx.save(); ctx.beginPath(); ctx.rect(0, y - size * .75, W, size * 1.5); ctx.clip();
  TXT(ctx, s, x, y + size * 1.3 * (1 - p) - (o.out ? 120 * A(t, o.out, .3, ease.in) : 0), { size, weight: o.weight ?? 800, color: o.color ?? L.ink, alpha: a, maxW: o.maxW ?? 980, align: o.align });
  ctx.restore();
}
function chip(ctx, s, x, y, t, t0, o = {}) {
  if (t < t0) return;
  const size = o.size ?? 34, k = ease.back(clamp((t - t0) / .4)), w = TW(ctx, s, size, 700) + 64 + (o.icon ? size * 1.1 : 0), h = size * 1.9;
  const dx = o.from === 'left' ? -500 * (1 - k) : o.from === 'right' ? 500 * (1 - k) : 0;
  ctx.save(); ctx.translate(x + dx, y); if (!o.from) ctx.scale(k, k);
  CARD(ctx, -w / 2, -h / 2, w, h, { fill: o.fill ?? L.card, stroke: o.stroke, lw: 3, r: h / 2, shadowBlur: 24 });
  const tx = o.icon ? size * .55 : 0;
  if (o.icon === 'check') { ctx.fillStyle = o.ic ?? L.teal; ctx.beginPath(); ctx.arc(-w / 2 + size * 1.1, 0, size * .62, 0, 7); ctx.fill(); CHECK(ctx, -w / 2 + size * 1.1, 0, size * .7, '#fff', A(t, t0 + .2, .3), size * .15); }
  if (o.icon === 'cross') { ctx.fillStyle = o.ic ?? L.coral; ctx.beginPath(); ctx.arc(-w / 2 + size * 1.1, 0, size * .62, 0, 7); ctx.fill(); CROSS(ctx, -w / 2 + size * 1.1, 0, size * .62, '#fff', A(t, t0 + .2, .3), size * .15); }
  TXT(ctx, s, tx, size * .06, { size, weight: 700, color: o.color ?? L.ink });
  ctx.restore();
}
function stepHead(ctx, t, i, title, t0) {
  const c = STEPS.colors[i], a = A(t, t0, .45, ease.out5);
  TXT(ctx, String(i + 1).padStart(2, '0'), lerp(-200, 150, a), 330, { size: 150, weight: 800, color: hexA(c, .22) });
  ctx.save(); ctx.beginPath(); ctx.rect(0, 280, W, 110); ctx.clip();
  TXT(ctx, title, 260, 338 + 90 * (1 - A(t, t0 + .12, .4, ease.out5)), { size: 64, weight: 800, color: L.ink, align: 'left' });
  ctx.restore();
  LINE(ctx, 262, 382, 262 + 240, 382, c, 8, A(t, t0 + .25, .4));
}

/* ---------- floating 2.5D photo card (whole image visible) ---------- */
function photoCard(ctx, img, cx, cy, h, t, o = {}) {
  const t0 = o.t0 ?? -1, a = A(t, t0, .7, ease.out5);
  if (a <= 0) return;
  const out = o.out ? A(t, o.out, .45, ease.in) : 0;
  const w = h * img.naturalWidth / img.naturalHeight, b = 14;
  const fy = Math.sin((t + (o.ph ?? 0)) * 1.1) * 10, rot = (o.rot ?? 0) + Math.sin((t + (o.ph ?? 0)) * .7) * .012 + (1 - a) * (o.inRot ?? .25) + out * .4;
  ctx.save();
  ctx.translate(cx + (o.inX ?? 0) * (1 - a) + out * 1500, cy + (o.inY ?? 700) * (1 - a) + fy);
  ctx.rotate(rot); ctx.transform(1, o.skew ?? 0, 0, 1, 0, 0);
  const z = 1 + (o.zoom ?? .04) * clamp((t - t0) / 8);
  ctx.scale(z, z);
  ctx.globalAlpha = a;
  ctx.shadowColor = 'rgba(13,23,41,.35)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 26;
  RR(ctx, -w / 2 - b, -h / 2 - b, w + b * 2, h + b * 2, 26); ctx.fillStyle = '#fff'; ctx.fill(); ctx.shadowColor = 'transparent';
  ctx.save(); RR(ctx, -w / 2, -h / 2, w, h, 16); ctx.clip(); ctx.drawImage(img, -w / 2, -h / 2, w, h); ctx.restore();
  ctx.restore();
}

/* ---------- small flat icons / effects ---------- */
function slamStamp(ctx, s, x, y, t, t0, o = {}) {
  if (t < t0 - .1) return;
  const u = clamp((t - t0 + .1) / .12), k = lerp(2.2, 1, ease.out(u)), size = o.size ?? 60, c = o.color ?? L.coral;
  const w = TW(ctx, s, size, 800) + 70;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -.1); ctx.scale(k, k); ctx.globalAlpha = u;
  CARD(ctx, -w / 2, -size * .9, w, size * 1.8, { fill: 'rgba(255,255,255,.88)', stroke: c, lw: 9, r: 14, shadow: false });
  TXT(ctx, s, 0, size * .06, { size, weight: 800, color: c });
  ctx.restore();
  ring(ctx, x, y, t, t0, c, 180);
}
function ring(ctx, x, y, t, t0, c, r0 = 120) { const u = A(t, t0, .6, ease.lin); if (u > 0 && u < 1) RING(ctx, x, y, r0 + 260 * u, hexA(c, .7 * (1 - u)), 8); }
function burst(ctx, x, y, t, t0, c, n = 18) {
  const u = A(t, t0, .7, ease.out); if (u <= 0 || u >= 1) return;
  for (let i = 0; i < n; i++) {
    const ang = i / n * Math.PI * 2 + i * .37, r = 60 + 260 * u * (.6 + .4 * ((i * 7) % 5) / 5);
    ctx.save(); ctx.globalAlpha = 1 - u; ctx.fillStyle = i % 3 ? c : L.gold;
    ctx.translate(x + Math.cos(ang) * r, y + Math.sin(ang) * r); ctx.rotate(ang);
    ctx.fillRect(-10, -4, 20, 8); ctx.restore();
  }
}
function personIcon(ctx, x, y, s, c) { PERSON(ctx, x, y, s, c); }
function groupIcon(ctx, x, y, s, c) { PERSON(ctx, x - s * .45, y + s * .05, s * .8, hexA(c, .6)); PERSON(ctx, x + s * .45, y + s * .05, s * .8, hexA(c, .6)); PERSON(ctx, x, y, s, c); }
function bell(ctx, x, y, s, t, t0) {
  if (t < t0) return;
  const w = Math.sin((t - t0) * 22) * .35 * Math.exp(-(t - t0) * 2.5), k = POP(t, t0, .3);
  ctx.save(); ctx.translate(x, y - s * .4); ctx.scale(k, k); ctx.rotate(w); ctx.translate(0, s * .4); ctx.fillStyle = L.gold;
  ctx.beginPath(); ctx.moveTo(-s * .4, s * .25); ctx.quadraticCurveTo(-s * .4, -s * .45, 0, -s * .45); ctx.quadraticCurveTo(s * .4, -s * .45, s * .4, s * .25); ctx.lineTo(s * .5, s * .35); ctx.lineTo(-s * .5, s * .35); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(0, s * .45, s * .1, 0, 7); ctx.fill(); ctx.restore();
}
function globe(ctx, x, y, s, c) { ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = s * .07; ctx.beginPath(); ctx.arc(x, y, s * .42, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, y, s * .18, s * .42, 0, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - s * .42, y); ctx.lineTo(x + s * .42, y); ctx.stroke(); ctx.restore(); }
function medCross(ctx, x, y, s, c) { ctx.fillStyle = c; RR(ctx, x - s * .13, y - s * .4, s * .26, s * .8, 6); ctx.fill(); RR(ctx, x - s * .4, y - s * .13, s * .8, s * .26, 6); ctx.fill(); }
function wheel(ctx, x, y, s, c) { ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = s * .08; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x - s * .05, y + s * .12, s * .28, 0, 7); ctx.stroke(); ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x - s * .05, y - s * .38, s * .09, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - s * .05, y - s * .25); ctx.lineTo(x - s * .05, y + s * .05); ctx.lineTo(x + s * .3, y + s * .05); ctx.lineTo(x + s * .38, y + s * .38); ctx.stroke(); ctx.restore(); }
function officeIcon(ctx, x, y, s, c) { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x - s * .5, y - s * .2); ctx.lineTo(x, y - s * .5); ctx.lineTo(x + s * .5, y - s * .2); ctx.closePath(); ctx.fill(); for (let i = 0; i < 4; i++) ctx.fillRect(x - s * .38 + i * s * .24, y - s * .12, s * .1, s * .44); ctx.fillRect(x - s * .5, y + s * .34, s, s * .1); }
function liquidBar(ctx, x, y, w, h, p, t, c, label) {
  CARD(ctx, x, y, w, h, { fill: 'rgba(13,23,41,.08)', r: h / 2, shadow: false });
  if (p > 0) {
    ctx.save(); RR(ctx, x, y, w, h, h / 2); ctx.clip(); ctx.fillStyle = c;
    ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y);
    const fx = x + w * p; for (let yy = 0; yy <= h; yy += 4) ctx.lineTo(fx + Math.sin(yy * .12 + t * 9) * 7, y + yy);
    ctx.lineTo(x, y + h); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  if (label && p > 0) TXT(ctx, label, x + w * p + 70, y + h / 2 + 2, { size: h * .8, weight: 800, color: c });
}

/* ---------- top progress rail (segmented) ---------- */
function rail(ctx, t) {
  const a = A(t, 5.6, .4) * (1 - A(t, 108.3, .3, ease.lin)); if (a <= 0) return;
  ctx.globalAlpha = a;
  const sw = 150, gap = 8, x0 = 540 - (6 * sw + 5 * gap) / 2, y = 165;
  STEPS.starts.forEach((s, i) => {
    const e = STEPS.starts[i + 1] ?? STEPS.end, x = x0 + i * (sw + gap), k = POP(t, 5.6 + i * .1, .35);
    if (k <= 0) return;
    const p = clamp((t - s) / (e - s)), act = t >= s && t < e;
    ctx.save(); ctx.translate(x + sw / 2, y); ctx.scale(k, k);
    CARD(ctx, -sw / 2, -8, sw, 16, { fill: 'rgba(13,23,41,.12)', r: 8, shadow: false });
    if (p > 0) CARD(ctx, -sw / 2, -8, sw * p, 16, { fill: STEPS.colors[i], r: 8, shadow: false });
    TXT(ctx, STEPS.labels[i], 0, 38, { size: act ? 26 : 22, weight: act ? 800 : 600, color: act ? STEPS.colors[i] : L.muted });
    ctx.restore();
  });
}

function build() {
  const I = E.img;
  const lc = document.createElement('canvas'); lc.width = lc.height = 1254;
  const lx = lc.getContext('2d'); lx.drawImage(I.LOGO, 0, 0); lx.globalCompositeOperation = 'destination-in';
  for (const dir of ['h', 'v']) {
    const g = dir === 'h' ? lx.createLinearGradient(0, 0, 1254, 0) : lx.createLinearGradient(0, 0, 0, 1254);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.1, 'rgba(0,0,0,1)'); g.addColorStop(.9, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    lx.fillStyle = g; lx.fillRect(0, 0, 1254, 1254);
  }
  E.logoF = lc;

  /* 01 HOOK - kinetic typography 0.00-6.68 */
  scene(0, 6.68, (ctx, t) => {
    bgLight(ctx, t, L.teal);
    popWord(ctx, 'तुमच्या', 540, 520, t, 0.0, { size: 62, color: L.muted, out: 2.2 });
    popWord(ctx, 'SOCIETY', 540, 650, t, 0.45, { size: 130, rot: -.04, out: 2.2 });
    maskUp(ctx, 'REDEVELOPMENT', 540, 800, t, 1.05, { size: 112, color: L.gold, out: 2.2 });
    popWord(ctx, 'होणार आहे?', 540, 950, t, 1.8, { size: 76, color: L.teal, out: 2.2 });
    maskUp(ctx, 'कोणत्याही कागदावर', 540, 600, t, 2.85, { size: 66, out: 4.55 });
    popWord(ctx, 'सही', 540, 800, t, 3.65, { size: 230, color: L.coral, from: 2.2, out: 4.55 });
    if (t > 3.8 && t < 4.8) { // signature squiggle
      const p = A(t, 3.8, .45), pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([300 + 480 * u, 935 + Math.sin(u * 18) * 22 * (1 - u * .5) - u * 20]); }
      ctx.save(); ctx.globalAlpha = 1 - A(t, 4.55, .2); ctx.strokeStyle = L.ink; ctx.lineWidth = 7; ctx.lineCap = 'round'; polyP(ctx, pts, p); ctx.restore();
    }
    popWord(ctx, 'करण्याआधी!', 540, 1040, t, 4.2, { size: 74, out: 4.55 });
    photoCard(ctx, I.R1, 540, 1080, 700, t, { t0: 4.65, rot: -.05, skew: .03, inRot: .5 });
    popWord(ctx, 'ही पूर्ण', 360, 470, t, 4.7, { size: 60, color: L.muted });
    popWord(ctx, 'PROCESS', 700, 470, t, 5.5, { size: 86, color: L.teal, hl: hexA(L.teal, .14) });
    popWord(ctx, 'समजून घ्या', 540, 570, t, 5.9, { size: 60 });
    chip(ctx, 'शासन आदेश दि. 30.09.2026 नुसार', 540, 1520, t, 0.6, { size: 30, fill: L.ink, color: L.goldL });
  });

  /* 02 पात्रता 6.68-16.86 */
  scene(6.68, 16.86, (ctx, t) => {
    bgLight(ctx, t, L.coral);
    stepHead(ctx, t, 0, 'पात्रता', 6.75);
    photoCard(ctx, I.R2, 400, 920, 760, t, { t0: 6.8, rot: -.05, inX: -600, inY: 0, out: 13.3, skew: -.03 });
    popWord(ctx, 'सक्षम प्राधिकरणाने', 700, 520, t, 8.3, { size: 46, color: L.ink2, out: 13.3 });
    if (t < 13.6) { ctx.save(); ctx.globalAlpha = 1 - A(t, 13.25, .3, ease.lin); slamStamp(ctx, 'धोकादायक', 600, 820, t, 10.7, { rot: -.12 }); slamStamp(ctx, 'मोडकळीस', 640, 1020, t, 11.2, { rot: .08, color: '#b23b2b' }); ctx.restore(); }
    if (t < 13.6) maskUp(ctx, 'जाहीर केलेली हवी', 540, 1450, t, 12.4, { size: 56, color: L.coral, out: 13.3 });
    if (t >= 13.4) {
      chip(ctx, 'सक्षम प्राधिकरणाने जाहीर', 540, 700, t, 13.55, { size: 40, icon: 'check', from: 'right' });
      chip(ctx, 'नियमावलीनुसार society पात्र', 540, 850, t, 14.3, { size: 40, icon: t >= 16.1 ? 'check' : null, from: 'left' });
      if (t >= 16.1) burst(ctx, 540, 850, t, 16.1, L.teal, 14);
      popWord(ctx, 'दोन्ही अटी हव्यात', 540, 1060, t, 14.9, { size: 62, color: L.coral, hl: hexA(L.coral, .12) });
      photoCard(ctx, I.R1, 540, 1360, 300, t, { t0: 13.6, rot: .06, inY: 500 });
    }
  }, { tin: 'circle', cx: 540, cy: 1080, ring: L.coral, dur: .55 });

  /* 03 सुरुवात 16.86-30.90 */
  scene(16.86, 30.90, (ctx, t) => {
    bgLight(ctx, t, L.teal);
    stepHead(ctx, t, 1, 'सुरुवात', 16.95);
    for (let i = 0; i < 5; i++) {
      const k = POP(t, 18.55 + i * .09, .4); if (k <= 0) continue;
      const big = i === 0 ? lerp(1, 1.35, A(t, 19.4, .35, ease.back)) : 1;
      scaled(ctx, 280 + i * 130, 530 + Math.sin(t * 3 + i) * 4, k * big, () => personIcon(ctx, 0, 0, 100, i === 0 && t >= 19.4 ? L.teal : '#b9bfcb'));
    }
    popWord(ctx, '1/5', 250, 700, t, 19.45, { size: 90, color: L.teal });
    maskUp(ctx, 'सभासदांचा लेखी अर्ज', 640, 700, t, 20.0, { size: 46 });
    if (t >= 21.5) {
      const m = A(t, 21.5, .8, ease.inOut);
      for (let g = 3; g >= 0; g--) { const mm = clamp(m - g * .06); ctx.save(); ctx.globalAlpha = g ? .15 : 1; ctx.translate(lerp(280, 830, mm), lerp(560, 860, mm) - Math.sin(Math.PI * mm) * 180); ctx.rotate(lerp(-.3, .1, mm)); ctx.scale(.42, .42); DOC(ctx, 0, 0, 260, { title: 'अर्ज', sub: ' ', titleSize: .16 }); ctx.restore(); }
    }
    chip(ctx, 'सचिवाकडे', 830, 1000, t, 20.9, { size: 32, fill: L.teal, color: '#fff' });
    const ca = A(t, 22.6, .45, ease.back);
    if (ca > 0) {
      scaled(ctx, 300, 1200, ca, () => { CARD(ctx, -190, -120, 380, 240, { fill: '#fff', stroke: L.teal, lw: 4 }); groupIcon(ctx, 0, -25, 90, L.teal); TXT(ctx, 'निवडून आलेली', 0, 62, { size: 30, weight: 700, color: L.ink }); TXT(ctx, 'Committee', 0, 100, { size: 32, weight: 800, color: L.teal }); });
      if (t >= 25.1) { burst(ctx, 300, 1200, t, 25.1, L.teal, 12); scaled(ctx, 450, 1095, POP(t, 25.1, .35), () => { ctx.fillStyle = L.teal; ctx.beginPath(); ctx.arc(0, 0, 36, 0, 7); ctx.fill(); CHECK(ctx, 0, 0, 40, '#fff', 1, 7); }); }
      scaled(ctx, 780, 1200, ca, () => { CARD(ctx, -190, -120, 380, 240, { fill: '#fff', stroke: '#d0d4dc', lw: 4 }); personIcon(ctx, 0, -25, 90, '#b9bfcb'); TXT(ctx, 'प्रशासक', 0, 80, { size: 36, weight: 800, color: L.muted }); });
      if (t >= 25.7) { const k = lerp(2.4, 1, A(t, 25.7, .15, ease.out)); scaled(ctx, 780, 1190, k, () => CROSS(ctx, 0, 0, 260, L.coral, 1, 26)); }
    }
    const ty = 1450;
    LINE(ctx, 180, ty, 900, ty, hexA(L.ink, .15), 10);
    LINE(ctx, 180, ty, 900, ty, L.teal, 10, A(t, 26.8, 3.0, ease.inOut));
    chip(ctx, '2 महिन्यांत सभा', 330, ty - 70, t, 26.9, { size: 30 });
    bell(ctx, 880, ty - 80, 70, t, 29.5);
    chip(ctx, '14 दिवस आधी Notice', 680, ty + 70, t, 29.5, { size: 30, fill: L.gold, color: L.ink });
  }, { tin: 'diag', ring: L.teal, dur: .5 });

  /* 04 पहिली सभा 30.90-41.24 */
  scene(30.90, 41.24, (ctx, t) => {
    bgLight(ctx, t, L.blue);
    stepHead(ctx, t, 2, 'पहिली सभा', 31.0);
    popWord(ctx, 'उदा. 100 सभासद', 540, 460, t, 33.4, { size: 40, color: L.muted });
    const x0 = 540 - 4.5 * 58, y0 = 540;
    const lit = Math.round(67 * A(t, 35.0, .8, ease.out)), gold = Math.round(51 * A(t, 38.6, .7, ease.out));
    for (let i = 0; i < 100; i++) {
      const col = i % 10, row = Math.floor(i / 10), d = (col + row) * .03;
      const k = POP(t, 31.4 + d, .35); if (k <= 0) continue;
      const pulse = i < gold && t > 38.6 ? 1 + .12 * Math.sin((t - 38.6) * 8 - d * 20) * Math.exp(-(t - 39.3)) : 1;
      scaled(ctx, x0 + col * 58, y0 + row * 58, k * pulse, () => personIcon(ctx, 0, 0, 44, i < gold ? L.gold : i < lit ? L.blue : '#d4d8e0'));
    }
    popWord(ctx, `QUORUM 2/3 = ${lit}`, 540, 1180, t, 35.0, { size: 66, color: L.blue });
    popWord(ctx, `मंजुरी: एकूण सभासदांच्या 51% = ${gold}`, 540, 1290, t, 38.6, { size: 48, color: L.gold, hl: hexA(L.gold, .16) });
    chip(ctx, 'फक्त हजर असलेल्यांच्या 51% नाही', 540, 1420, t, 39.7, { size: 34, icon: 'cross', color: L.coral, stroke: L.coral });
  }, { tin: 'up', dur: .5 });

  /* 05 VC 41.24-49.60 */
  scene(41.24, 49.60, (ctx, t) => {
    bgLight(ctx, t, L.blue);
    stepHead(ctx, t, 2, 'पहिली सभा', 40.9);
    [['परदेशातले', 220, 41.3, (x, y) => globe(ctx, x, y, 90, L.blue)], ['आजारी', 540, 42.45, (x, y) => medCross(ctx, x, y, 80, L.coral)], ['दिव्यांग', 860, 43.15, (x, y) => wheel(ctx, x, y, 100, L.teal)]].forEach(([s, x, t0, ic]) => {
      const k = POP(t, t0, .4); if (k <= 0) return;
      scaled(ctx, x, 560, k, () => { CARD(ctx, -130, -110, 260, 220, { fill: '#fff' }); ic(0, -25); TXT(ctx, s, 0, 70, { size: 32, weight: 700, color: L.ink }); });
    });
    const la = A(t, 44.2, .5, ease.out5);
    if (la > 0) { ctx.save(); ctx.translate(540, 1080); ctx.scale(1, lerp(.05, 1, la)); ctx.translate(-540, -1080); LAPTOP(ctx, 540, 1080, 560, t); ctx.restore(); }
    chip(ctx, 'Video Conference', 540, 1180, t, 44.8, { size: 36, icon: 'check', ic: L.blue });
    popWord(ctx, 'पण प्रत्यक्ष हजर हवेतच', 540, 1310, t, 46.0, { size: 54, color: L.coral });
    const fp = A(t, 46.3, 1.0, ease.inOut);
    liquidBar(ctx, 160, 1390, 640, 60, .51 * fp, t, L.blue, `${Math.round(51 * fp)}%`);
  }, { tin: 'zoom', dur: .45 });

  /* 06 3 महिने 49.60-54.19 */
  scene(49.60, 54.19, (ctx, t) => {
    bgLight(ctx, t, L.coral);
    [[330, 49.7], [750, 50.6]].forEach(([x, t0]) => { if (t < t0) return; const k = lerp(2.2, 1, A(t, t0, .15, ease.out)); scaled(ctx, x, 560, k, () => { CARD(ctx, -170, -90, 340, 180, { fill: '#fff' }); TXT(ctx, 'QUORUM', 0, -20, { size: 40, weight: 800, color: L.ink }); CROSS(ctx, 0, 35, 70, L.coral, 1, 12); }); });
    let f = 0, n = 0; [51.9, 52.15, 52.4].forEach((s, i) => { if (t >= s + .22) n = i + 1; else if (t >= s) f = (t - s) / .22; });
    const ca = POP(t, 51.4, .4);
    if (ca > 0) scaled(ctx, 540, 960, ca, () => CAL(ctx, 0, 0, 380, 'पुढचे', n ? `${n} ${n > 1 ? 'महिने' : 'महिना'}` : '...', { flip: f, bigSize: .17, head: L.coral }));
    if (t >= 52.9) { scaled(ctx, 760, 790, POP(t, 52.9, .3), () => LOCK(ctx, 0, 0, 130, L.ink, '#fff')); ring(ctx, 760, 800, t, 52.9, L.ink, 80); }
    maskUp(ctx, 'विषय 3 महिने बंद', 540, 1330, t, 52.55, { size: 74, color: L.coral });
  }, { tin: 'whip', dur: .35 });

  /* 07 तज्ज्ञ 54.19-68.29 */
  scene(54.19, 68.29, (ctx, t) => {
    bgLight(ctx, t, L.gold);
    stepHead(ctx, t, 3, 'तज्ज्ञ', 54.3);
    photoCard(ctx, I.R5, 820, 1150, 600, t, { t0: 54.5, rot: .08, inX: 500, inY: 0, zoom: .03, ph: 1 });
    popWord(ctx, 'सभेआधी किमान 3 Quotations', 540, 470, t, 55.9, { size: 46 });
    [[-1, 'Architect'], [0, 'PMC'], [1, 'Architect']].forEach(([d, s], i) => {
      const a = A(t, 57.0 + i * .12, .45, ease.back); if (a <= 0) return;
      const sel = t >= 61.0, me = i === 1, fly = sel && !me ? A(t, 61.0, .5, ease.in) : 0;
      const flip = sel && me ? A(t, 61.0, .5, ease.inOut) : 0, sx = Math.abs(Math.cos(Math.PI * flip));
      ctx.save(); ctx.translate(540 + d * 230 + d * 600 * fly, 680 + 300 * (1 - a) + 40 * Math.abs(d)); ctx.rotate(d * .14 * (1 - flip)); ctx.scale(Math.max(sx, .01), 1); ctx.globalAlpha = a * (1 - fly);
      const front = flip < .5;
      CARD(ctx, -115, -140, 230, 280, { fill: front ? '#fff' : L.gold, stroke: front ? '#d9dde4' : null });
      if (front) { TXT(ctx, s, 0, -40, { size: 32, weight: 800, color: L.ink }); TXT(ctx, 'Quotation', 0, 10, { size: 26, weight: 500, color: L.muted }); TXT(ctx, String(i + 1), 0, 75, { size: 70, weight: 800, color: hexA(L.gold, .7) }); }
      else { TXT(ctx, 'निवड', 0, -10, { size: 48, weight: 800, color: L.ink }); CHECK(ctx, 0, 70, 70, L.ink, 1, 12); }
      ctx.restore();
    });
    if (t > 61.5) burst(ctx, 540, 680, t, 61.5, L.gold);
    const ra = A(t, 61.55, .5, ease.back);
    if (ra > 0) {
      ctx.save(); ctx.translate(360, 1180); ctx.scale(ra, ra); ctx.rotate(-.03);
      CARD(ctx, -280, -320, 560, 640, { fill: '#fff', stroke: hexA(L.gold, .6), lw: 4 });
      TXT(ctx, 'Project Report', -235, -255, { size: 40, weight: 800, color: L.ink, align: 'left' });
      CARD(ctx, -235, -215, 200, 44, { fill: L.gold, r: 22, shadow: false }); TXT(ctx, '2 महिन्यांत', -135, -191, { size: 26, weight: 800, color: L.ink });
      [['FSI', 63.6], ['TDR', 64.5], ['घरांचं क्षेत्र', 65.0], ['Parking', 66.4], ['Open space', 67.3]].forEach(([s, t0], i) => {
        const y = -120 + i * 92, on = A(t, t0, .3);
        ctx.fillStyle = on > 0 ? L.teal : '#e3e6ec'; ctx.beginPath(); ctx.arc(-205, y, 26, 0, 7); ctx.fill();
        CHECK(ctx, -205, y, 30, '#fff', on, 6);
        TXT(ctx, s, -160, y + 2, { size: 38, weight: 700, color: on > 0 ? L.ink : '#a3a9b6', align: 'left' });
        if (on > 0) LINE(ctx, -160, y + 30, -160 + TW(ctx, s, 38, 700), y + 30, hexA(L.teal, .5), 4, on);
      });
      ctx.restore();
    }
  }, { tin: 'circle', cx: 540, cy: 960, ring: L.gold, dur: .5 });

  /* 08 Tender 68.29-81.09 */
  scene(68.29, 81.09, (ctx, t) => {
    bgLight(ctx, t, L.teal);
    stepHead(ctx, t, 4, 'Tender', 68.4);
    [[330, 'मराठी', 70.8, -.08], [750, 'English', 71.7, .08]].forEach(([x, s, t0, r]) => {
      const a = A(t, t0, .7, ease.out5); if (a <= 0) return;
      ctx.save(); ctx.translate(x, 680); ctx.rotate(r + (1 - a) * Math.PI * 4); ctx.scale(a, a); NEWSPAPER(ctx, 0, 0, 300, s); ctx.restore();
    });
    maskUp(ctx, 'वृत्तपत्रात जाहिरात', 540, 960, t, 72.3, { size: 54, color: L.teal });
    [[-.14, 360], [0, 540], [.14, 720]].forEach(([r, x], i) => {
      const t0 = 73.3 + i * .18, u = clamp((t - t0) / .45); if (u <= 0) return;
      const y = lerp(-200, 1160, ease.in(Math.min(1, u * 1.15))) - (u > .87 ? Math.sin((u - .87) / .13 * Math.PI) * 40 : 0);
      ENVELOPE(ctx, x, y, 210, r);
    });
    const cnt = t < 73.3 ? 0 : Math.min(3, 1 + Math.floor((t - 73.3) / .18));
    if (t >= 73.3) popWord(ctx, `किमान ${cnt} Tenders`, 540, 1320, t, 73.3, { size: 58, color: L.ink, hl: hexA(L.teal, .14) });
    chip(ctx, '+15 दिवस', 340, 1440, t, 75.8, { size: 34, from: 'left', fill: L.teal, color: '#fff' });
    chip(ctx, '+1 आठवडा', 740, 1440, t, 77.2, { size: 34, from: 'right', fill: L.teal, color: '#fff' });
    popWord(ctx, 'तरीही कमी? आलेल्या tenders वर निर्णय', 540, 1545, t, 78.5, { size: 38, color: L.ink2 });
  }, { tin: 'whip', dur: .4 });

  /* 09 Builder निवड 81.09-90.04 */
  scene(81.09, 90.04, (ctx, t) => {
    bgLight(ctx, t, L.coral);
    stepHead(ctx, t, 5, 'Builder निवड', 81.2);
    photoCard(ctx, I.R4, 540, 760, 580, t, { t0: 81.3, rot: .04, skew: .02 });
    if (t >= 84.4) {
      const y = lerp(-100, 1150, ease.out5(clamp((t - 84.4) / .45)));
      ctx.save(); ctx.translate(540, y); CARD(ctx, -420, -66, 840, 132, { fill: L.ink, r: 66 }); SHIELD(ctx, -350, 0, 80, L.gold); TXT(ctx, 'Registrar चा प्राधिकृत अधिकारी', 40, 4, { size: 38, weight: 800, color: L.goldL, maxW: 680 }); ctx.restore();
      ring(ctx, 540, 1150, t, 84.85, L.gold, 200);
    }
    const ia = A(t, 87.3, .4, ease.back);
    if (ia > 0) scaled(ctx, 320, 1400, ia, () => IDCARD(ctx, 0, 0, 380, A(t, 87.6, .7, ease.lin)));
    chip(ctx, 'स्वतः हजर', 790, 1340, t, 87.6, { size: 34, icon: 'check', from: 'right' });
    chip(ctx, 'प्रतिनिधी', 790, 1460, t, 88.5, { size: 34, icon: 'cross', from: 'right', color: L.coral });
  }, { tin: 'diag', ring: L.coral, dur: .5 });

  /* 10 मतदान + video 90.04-102.58 */
  scene(90.04, 102.58, (ctx, t) => {
    bgLight(ctx, t, L.gold);
    maskUp(ctx, 'एकूण सभासदांच्या किमान 51% लेखी मंजुरी', 540, 330, t, 90.1, { size: 40 });
    const fp = A(t, 91.8, 1.0, ease.inOut);
    liquidBar(ctx, 140, 400, 680, 64, .51 * fp, t, L.gold, `${Math.round(51 * fp)}%`);
    const ba = POP(t, 93.2, .5);
    if (ba > 0) scaled(ctx, 540, 820, ba, () => { ctx.fillStyle = L.ink2; RR(ctx, -230, -230, 460, 460, 40); ctx.fill(); BALLOT(ctx, 0, 0, 400, t, 98.0); });
    chip(ctx, '1/5 मागणी = गुप्त मतदान', 540, 1120, t, 95.3, { size: 36, fill: L.ink, color: L.goldL });
    const ca = POP(t, 99.6, .45);
    if (ca > 0) scaled(ctx, 300, 1390, ca, () => { CARD(ctx, -150, -150, 300, 300, { fill: '#fff' }); CAMERA(ctx, 0, 10, 230, t); });
    if (t >= 99.8) { const on = Math.floor(t * 2) % 2 === 0; CARD(ctx, 200, 1205, 130, 56, { fill: on ? '#ff3b30' : '#c42a22', r: 28, shadow: false }); TXT(ctx, 'REC', 265, 1235, { size: 28, weight: 800, color: '#fff' }); }
    if (t >= 101.3) {
      const m = A(t, 101.3, .6, ease.inOut);
      ctx.save(); ctx.translate(lerp(380, 760, m), 1390 - Math.sin(Math.PI * m) * 140); ctx.scale(.35, .35); DOC(ctx, 0, 0, 260, { title: 'Copy', sub: ' ', titleSize: .16 }); ctx.restore();
    }
    const oa = POP(t, 101.2, .4);
    if (oa > 0) scaled(ctx, 820, 1390, oa, () => { CARD(ctx, -150, -150, 300, 300, { fill: '#fff' }); officeIcon(ctx, 0, -20, 150, L.ink); TXT(ctx, 'Registrar', 0, 105, { size: 32, weight: 800, color: L.ink }); });
  }, { tin: 'up', dur: .45 });

  /* 11 तुमचा हक्क 102.58-108.64 */
  scene(102.58, 108.64, (ctx, t) => {
    bgLight(ctx, t, L.teal);
    maskUp(ctx, 'तुमचा हक्क', 540, 380, t, 102.6, { size: 92, color: L.teal });
    [['Notice', 102.6], ['इतिवृत्त', 103.3], ['Project Report', 104.2], ['Tenders', 105.2], ['Video', 106.1]].forEach(([s, t0], i) => {
      const a = A(t, t0, .5, ease.back); if (a <= 0) return;
      ctx.save(); ctx.translate(540 + (i - 2) * 150, 860 + Math.abs(i - 2) * 40 + 400 * (1 - a)); ctx.rotate((i - 2) * .22 * a);
      DOC(ctx, 0, 0, 230, { title: s, sub: ' ', titleSize: .12 }); ctx.restore();
    });
    if (t >= 107.3) { slamStamp(ctx, 'मोफत', 540, 1260, t, 107.4, { size: 90, color: L.teal, rot: -.08 }); burst(ctx, 540, 1260, t, 107.45, L.teal, 22); }
    popWord(ctx, 'प्रत्येक सभासदाला पाहता येतं', 540, 1460, t, 107.6, { size: 44 });
  }, { tin: 'zoom', dur: .45 });

  /* 12 Part 2 teaser 108.64-110.30 */
  scene(108.64, 110.3, (ctx, t) => {
    bgLight(ctx, t, L.gold);
    photoCard(ctx, I.RT, 540, 980, 760, t, { t0: 108.7, rot: -.04 });
    popWord(ctx, 'PART 2', 540, 430, t, 108.7, { size: 120, color: L.gold });
    ['करार', 'भाडं', 'नवा Flat', 'ताबा'].forEach((s, i) => chip(ctx, s, 180 + i * 240, 1480, t, 108.9 + i * .22, { size: 34, fill: L.ink, color: L.goldL }));
  }, { tin: 'up', dur: .4 });

  /* 13 End card 110.30-END */
  scene(110.3, END, (ctx, t) => {
    ctx.fillStyle = L.bg; ctx.fillRect(0, 0, W, H);
    const s = 900 * (1 + .04 * clamp((t - 110.3) / 4.3));
    ctx.drawImage(E.logoF, 540 - s / 2, 820 - s / 2, s, s);
    const k = POP(t, 111.9, .45) * (1 + .07 * Math.sin(Math.PI * A(t, 112.8, .5, ease.lin)));
    if (k > 0) scaled(ctx, 540, 1400, k, () => { CARD(ctx, -250, -66, 500, 132, { fill: L.ink, r: 66 }); TXT(ctx, 'Follow करा', 0, 4, { size: 54, weight: 700, color: '#fff' }); });
  }, { tin: 'circle', ring: L.gold, dur: .6 });

  overlay(5.6, 108.64, rail);

  punch(3.65, .04); punch(10.7, .025); shake(10.7, 8, .25); punch(25.7, .02); punch(38.6, .03); shake(49.7, 7, .25); shake(50.6, 7, .25); punch(107.4, .03);

  sfx(0.0, 'pop', .6); sfx(0.45, 'pop', .8); sfx(1.05, 'whoosh_soft', .7); sfx(1.8, 'pop', .6); sfx(2.85, 'whoosh_soft', .6); sfx(3.65, 'hit_soft'); sfx(3.8, 'paper', .5); sfx(4.65, 'whoosh');
  [5.6, 5.7, 5.8, 5.9, 6.0, 6.1].forEach(x => sfx(x, 'tick', .4));
  sfx(6.68, 'whoosh'); sfx(10.6, 'stamp'); sfx(11.1, 'stamp', .7); sfx(13.4, 'whoosh_soft', .7); sfx(13.6, 'click'); sfx(16.1, 'click');
  sfx(16.86, 'whoosh'); [18.55, 18.64, 18.73, 18.82, 18.91].forEach(x => sfx(x, 'pop', .4)); sfx(19.45, 'rise', .5); sfx(21.5, 'whoosh_soft', .7); sfx(22.6, 'pop', .6); sfx(25.1, 'click'); sfx(25.7, 'hit_soft', .7); sfx(26.8, 'rise', .4); sfx(29.5, 'tick');
  sfx(30.9, 'whoosh'); sfx(31.4, 'whoosh_soft', .5); sfx(35.0, 'rise', .5); sfx(38.6, 'hit_soft', .8); sfx(39.7, 'tick');
  sfx(41.24, 'whoosh'); [41.3, 42.45, 43.15].forEach(x => sfx(x, 'pop', .6)); sfx(44.2, 'whoosh_soft', .6); sfx(44.8, 'click'); sfx(46.3, 'rise', .5);
  sfx(49.6, 'whoosh'); sfx(49.7, 'hit_soft', .7); sfx(50.6, 'hit_soft', .7); [51.9, 52.15, 52.4].forEach(x => sfx(x, 'flip', .6)); sfx(52.9, 'stamp', .7);
  sfx(54.19, 'whoosh'); [57.0, 57.12, 57.24].forEach(x => sfx(x, 'paper', .4)); sfx(61.0, 'whoosh_soft', .6); sfx(61.5, 'rise', .5); [63.6, 64.5, 65.0, 66.4, 67.3].forEach(x => sfx(x, 'click', .6));
  sfx(68.29, 'whoosh'); sfx(70.8, 'whoosh_soft', .6); sfx(71.7, 'whoosh_soft', .6); [73.7, 73.9, 74.1].forEach(x => sfx(x, 'pop', .5)); sfx(75.8, 'tick'); sfx(77.2, 'tick');
  sfx(81.09, 'whoosh'); sfx(84.4, 'whoosh_soft', .6); sfx(84.85, 'hit_soft', .5); sfx(87.3, 'pop', .6); sfx(87.6, 'rise', .4); sfx(88.5, 'tick');
  sfx(90.04, 'whoosh'); sfx(91.8, 'rise', .5); sfx(93.2, 'pop', .7); sfx(98.0, 'paper', .5); sfx(99.6, 'click'); sfx(101.3, 'whoosh_soft', .6);
  sfx(102.58, 'whoosh'); [102.6, 103.3, 104.2, 105.2, 106.1].forEach(x => sfx(x, 'paper', .4)); sfx(107.35, 'stamp'); sfx(107.45, 'coin', .5);
  sfx(108.64, 'whoosh'); sfx(110.3, 'whoosh_soft', .8);
}

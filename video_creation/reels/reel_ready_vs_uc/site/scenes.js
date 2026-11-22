/* reel_ready_vs_uc - scenes v1 (storyboard v1 APPROVED, timings from cue_words.json) */
const ASSETS = {
  U: 'a/img1_uc_tower_v2.webp',
  R: 'a/img2_ready_tower_v2.webp',
  IN: 'a/img3_interior_v2.webp',
  K: 'a/img4_keys_v2.png',
  LOGO: 'a/logo_embossed_ivory.jpg',
};
const END = 96.0;
const RAIL = { starts: [11.90, 27.24, 38.26, 62.50], end: 71.74, labels: ['GST', 'पैसे', 'धोका', 'खात्री'] };

/* ---------- shared pieces ---------- */
function bgNavy(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.navy2); g.addColorStop(1, C.navy);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const r = ctx.createRadialGradient(W / 2, H * .45, 100, W / 2, H * .45, H * .75);
  r.addColorStop(0, 'rgba(232,207,159,.07)'); r.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = r; ctx.fillRect(0, 0, W, H);
}
function pill(ctx, s, x, y, o = {}) {
  const size = o.size ?? 30, w = TW(ctx, s, size, o.weight ?? 600, o.ls ?? 0) + (o.padX ?? 52), h = size * 1.9;
  CARD(ctx, x - w / 2, y - h / 2, w, h, { fill: o.fill ?? 'rgba(13,23,41,.78)', stroke: o.stroke, lw: 2.5, r: h / 2, alpha: o.alpha, shadow: o.shadow ?? false });
  TXT(ctx, s, x, y + size * .06, { size, weight: o.weight ?? 600, color: o.color ?? C.ivory, ls: o.ls, alpha: o.alpha });
  return w;
}
function source(ctx, s, t, t0, y = 1462) { TXT(ctx, s, 540, y, { size: 28, weight: 500, color: C.muted, alpha: V(t, t0, 1e9, .4) }); }
function badge(ctx, t, t0) { // RERA shield flying from scene-10 center to the corner badge
  const m = A(t, t0, .5, ease.inOut);
  const x = lerp(540, 150, m), y = lerp(860, 372, m), s = lerp(380, 120, m);
  SHIELD(ctx, x, y, s, C.gold2, C.gold);
  TXT(ctx, 'RERA', x, y + s * .03, { size: s * .22, weight: 800, color: C.navy });
}
function goldGrad(ctx, x, y, w, h) { const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, C.gold); g.addColorStop(1, C.gold2); return g; }

/* ---------- 4-point progress rail (overlay) ---------- */
function rail(ctx, t) {
  const m = A(t, 11.55, .45, ease.inOut);
  const y = lerp(1080, 212, m), k = lerp(1.35, 1, m);
  const fade = 1 - A(t, 90.55, .35, ease.lin);
  ctx.globalAlpha = fade;
  if (m > 0) GRAD(ctx, 0, 380, C.navy, .88 * m, 0);
  ctx.translate(540, y); ctx.scale(k, k);
  const xs = [-330, -110, 110, 330];
  let act = -1; RAIL.starts.forEach((s, i) => { if (t >= s) act = i; });
  const done = i => t >= (RAIL.starts[i + 1] ?? RAIL.end);
  const built = i => POP(t, 10.54 + i * .3, .4);
  LINE(ctx, xs[0], 0, xs[3], 0, 'rgba(250,247,242,.22)', 4, A(t, 10.54, 1.1, ease.lin));
  if (act >= 0) LINE(ctx, xs[0], 0, xs[act], 0, C.gold2, 5);
  xs.forEach((x, i) => {
    const b = built(i); if (b <= 0) return;
    ctx.save(); ctx.translate(x, 0); ctx.scale(b, b);
    const isAct = i === act && !done(i);
    if (isAct) { const pu = .5 + .5 * Math.sin((t - RAIL.starts[i]) * 5); ctx.fillStyle = `rgba(232,207,159,${.18 + .12 * pu})`; ctx.beginPath(); ctx.arc(0, 0, 44, 0, 7); ctx.fill(); }
    ctx.beginPath(); ctx.arc(0, 0, 30, 0, 7);
    ctx.fillStyle = isAct ? C.gold : done(i) ? C.navy2 : C.navy; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = isAct || done(i) ? C.gold : 'rgba(250,247,242,.4)'; ctx.stroke();
    if (done(i)) CHECK(ctx, 0, 0, 30, C.gold, 1, 5);
    else TXT(ctx, String(i + 1), 0, 2, { size: 30, weight: 700, color: isAct ? C.navy : 'rgba(250,247,242,.7)' });
    TXT(ctx, RAIL.labels[i], 0, 62, { size: 26, weight: isAct ? 700 : 500, color: isAct ? C.gold : 'rgba(250,247,242,.72)', shadow: true });
    ctx.restore();
  });
}

function build() {
  const I = E.img;
  // feathered logo for the ivory end card
  const lc = document.createElement('canvas'); lc.width = lc.height = 1254;
  const lx = lc.getContext('2d'); lx.drawImage(I.LOGO, 0, 0);
  lx.globalCompositeOperation = 'destination-in';
  for (const dir of ['h', 'v']) {
    const g = dir === 'h' ? lx.createLinearGradient(0, 0, 1254, 0) : lx.createLinearGradient(0, 0, 0, 1254);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.1, 'rgba(0,0,0,1)'); g.addColorStop(.9, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    lx.fillStyle = g; lx.fillRect(0, 0, 1254, 1254);
  }
  E.logoF = lc;

  /* SCENE 01-03 - Hook: 2 flats, GST contrast, the certificate (0.00-7.76) */
  scene(0, 7.76, (ctx, t) => {
    bgNavy(ctx);
    const p = A(t, 0, .6, ease.out5), z = 1 + .05 * clamp(t / 7.76), d = A(t, 5.36, .5);
    const bright = 1 - .62 * d, blur = 10 * d;
    ctx.save(); ctx.beginPath(); ctx.rect(540 - 540 * p, 0, 540 * p, H); ctx.clip();
    IMG(ctx, I.U, { x: 0, w: 540, z, fx: .49, fy: .5, bright, blur }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(540, 0, 540 * p, H); ctx.clip();
    IMG(ctx, I.R, { x: 540, w: 540, z, fx: .5, fy: .5, bright, blur }); ctx.restore();
    GRAD(ctx, 1000, H, C.navy, 0, .7 * (1 - d));
    LINE(ctx, 540, 0, 540, H, C.gold, 4, p);
    const fo = 1 - A(t, 5.36, .35, ease.lin);
    pill(ctx, 'UNDER CONSTRUCTION', 270, 330, { size: 28, ls: 2, alpha: V(t, .3) * fo });
    pill(ctx, 'READY', 810, 330, { size: 30, ls: 3, color: C.navy, fill: C.gold, alpha: V(t, .3) * fo });
    // price tags
    for (const [x, t0] of [[270, .5], [810, .62]]) {
      const k = POP(t, t0); if (k <= 0) continue;
      scaled(ctx, x, 1150, k, () => { CARD(ctx, -190, -66, 380, 132, { fill: 'rgba(13,23,41,.86)', stroke: C.gold2, alpha: fo }); TXT(ctx, '₹50 लाख', 0, 4, { size: 62, weight: 700, alpha: fo }); });
    }
    // left: GST count-up
    if (t >= 2.06) {
      const v = 2.5 * A(t, 2.62, .84, ease.out), a = V(t, 2.06, 1e9, .25) * fo;
      CARD(ctx, 60, 1262, 420, 170, { fill: 'rgba(13,23,41,.9)', stroke: C.coral, alpha: a });
      TXT(ctx, `+₹${v.toFixed(1)} लाख`, 270, 1330, { size: 58, weight: 800, color: C.coral, alpha: a });
      TXT(ctx, 'GST', 270, 1395, { size: 34, weight: 600, color: C.ivory, alpha: a, ls: 3 });
    }
    // right: zero GST
    if (t >= 4.22) {
      const a = V(t, 4.22, 1e9, .25) * fo, k = t < 4.82 ? 0 : lerp(1.7, 1, A(t, 4.82, .3, ease.out5));
      CARD(ctx, 600, 1262, 420, 170, { fill: 'rgba(13,23,41,.9)', stroke: C.gold, alpha: a });
      if (k > 0) scaled(ctx, 810, 1330, k, () => TXT(ctx, '₹0', 0, 0, { size: 74, weight: 800, color: C.gold, alpha: a * clamp((t - 4.82) / .08) }));
      TXT(ctx, 'GST', 810, 1395, { size: 34, weight: 600, color: C.ivory, alpha: a, ls: 3 });
    }
    // certificate
    if (t >= 5.36) {
      const y = lerp(2300, 1000, A(t, 5.36, .6, ease.out5)), k = 1 + .03 * A(t, 5.9, 1.8, ease.lin);
      scaled(ctx, 540, y, k, () => { DOC(ctx, 0, 0, 500); STAMP(ctx, 140, 205, 200, 'OC', t, 6.72); });
      TXT(ctx, 'फरक = 1 Certificate', 540, 470, { size: 64, weight: 700, color: C.gold, alpha: V(t, 5.9), shadow: true });
    }
  });

  /* SCENE 04 - Question + rail build (7.76-11.90) */
  scene(7.76, 11.90, (ctx, t) => {
    bgNavy(ctx);
    const fo = 1 - A(t, 10.25, .35, ease.lin), up = -60 * A(t, 10.25, .35);
    TXT(ctx, 'READY POSSESSION', lerp(-500, 540, A(t, 7.76, .55, ease.out5)), 800 + up, { size: 82, weight: 800, color: C.gold, maxW: 940, alpha: fo });
    const k = POP(t, 8.66);
    if (k > 0) scaled(ctx, 540, 930 + up, k, () => { RING(ctx, 0, 0, 62, C.gold2, 4); TXT(ctx, 'VS', 0, 4, { size: 56, weight: 800, alpha: fo }); });
    TXT(ctx, 'UNDER CONSTRUCTION', lerp(1600, 540, A(t, 9.04, .55, ease.out5)), 1060 + up, { size: 74, weight: 800, color: C.ivory, maxW: 940, alpha: fo });
    TXT(ctx, 'काय better?', 540, 1200 + up, { size: 52, weight: 600, color: C.muted, alpha: V(t, 9.5) * fo });
    TXT(ctx, '4 मुद्दे', 540, 900, { size: 64, weight: 700, color: C.ivory, alpha: V(t, 10.54, 11.6, .3, .25) });
  });

  /* SCENE 05 - Point 1 GST: rates (11.90-18.70) */
  scene(11.90, 18.70, (ctx, t) => {
    IMG(ctx, I.U, { z: 1.04 + .08 * clamp((t - 11.9) / 6.8), fx: .56, fy: .45, bright: .92 });
    GRAD(ctx, 900, H, C.navy, 0, .9);
    TXT(ctx, 'Under Construction घरावर', 540, 1010, { size: 44, weight: 600, shadow: true, alpha: V(t, 13.54) });
    const k = POP(t, 15.18);
    if (k > 0) scaled(ctx, 540, 1215, k, () => {
      CARD(ctx, -260, -140, 520, 280, { fill: goldGrad(ctx, -260, -140, 520, 280) });
      TXT(ctx, '5%', 0, -30, { size: 150, weight: 800, color: C.navy });
      TXT(ctx, 'GST', 0, 90, { size: 54, weight: 700, color: C.navy, ls: 6 });
    });
    const a = A(t, 18.10, .4);
    if (a > 0) { CARD(ctx, 220, 1410 + 40 * (1 - a), 640, 110, { fill: C.ivory, alpha: a }); TXT(ctx, 'Affordable घर: 1%', 540, 1468 + 40 * (1 - a), { size: 46, weight: 700, color: C.navy, alpha: a }); }
  }, { tin: 'push' });

  /* SCENE 06 - Point 1 GST: OC rule timeline (18.70-23.50) */
  scene(18.70, 23.50, (ctx, t) => {
    bgNavy(ctx);
    TXT(ctx, 'GST कधी लागत नाही?', 540, 430, { size: 50, weight: 600, color: C.muted, alpha: V(t, 18.8) });
    const rows = [[640, 19.14, 'OC मिळाले'], [960, 20.98, 'पूर्ण पेमेंट'], [1280, 22.42, 'GST ₹0']];
    LINE(ctx, 290, 725, 290, 875, C.gold2, 6, A(t, 19.8, 1.0, ease.inOut));
    LINE(ctx, 290, 1045, 290, 1195, C.gold2, 6, A(t, 21.6, .8, ease.inOut));
    rows.forEach(([y, t0, s], i) => {
      const a = A(t, t0, .35); if (a <= 0) return;
      const last = i === 2, pulse = last ? 1 + .06 * Math.sin(Math.PI * A(t, 23.24, .3, ease.lin)) : 1;
      scaled(ctx, 540, y + 40 * (1 - a), pulse, () => {
        CARD(ctx, -350, -85, 700, 170, { fill: last ? goldGrad(ctx, -350, -85, 700, 170) : C.navy2, stroke: last ? null : 'rgba(232,207,159,.5)', alpha: a });
        ctx.globalAlpha = a;
        ctx.fillStyle = last ? C.navy : C.gold; ctx.beginPath(); ctx.arc(-250, 0, 50, 0, 7); ctx.fill();
        if (i === 0) DOC(ctx, -250, 0, 52);
        if (i === 1) TXT(ctx, '₹', -250, 4, { size: 56, weight: 700, color: C.navy });
        if (i === 2) CHECK(ctx, -250, 0, 50, C.gold, A(t, 23.24, .3), 8);
        TXT(ctx, s, -160, 4, { size: 58, weight: 700, align: 'left', color: last ? C.navy : C.ivory });
      });
    });
    const u = A(t, 23.24, .6, ease.lin);
    if (u > 0 && u < 1) RING(ctx, 540, 1280, 380 + 160 * u, `rgba(232,207,159,${1 - u})`, 6);
  });

  /* SCENE 07 - Point 1 GST: check OC (23.50-27.24) */
  scene(23.50, 27.24, (ctx, t) => {
    IMG(ctx, I.R, { z: 1.1, blur: 16, bright: .42 });
    const k = lerp(1.06, 1, clamp((t - 23.5) / 3.74));
    scaled(ctx, 540, 860, k, () => DOC(ctx, 0, 0, 520, { highlight: A(t, 25.2, .5, ease.inOut) }));
    const m = A(t, 24.3, .9, ease.inOut);
    MAG(ctx, lerp(900, 700, m), lerp(1180, 640, m), 150, C.gold);
    const a = A(t, 24.16, .4);
    if (a > 0) {
      CARD(ctx, 140, 1300, 800, 140, { fill: C.ivory, alpha: a });
      ctx.globalAlpha = a; ctx.strokeStyle = C.navy; ctx.lineWidth = 5; RR(ctx, 190, 1338, 64, 64, 12); ctx.stroke();
      CHECK(ctx, 222, 1370, 56, C.gold3, A(t, 26.96, .3), 9);
      TXT(ctx, 'Ready flat: आधी OC तपासा', 285, 1374, { size: 44, weight: 700, color: C.navy, align: 'left', maxW: 620 });
    }
  });

  /* SCENE 08 - Point 2 पैसे (27.24-38.26) */
  scene(27.24, 38.26, (ctx, t) => {
    bgNavy(ctx);
    LINE(ctx, 540, 410, 540, 1520, 'rgba(250,247,242,.14)', 3);
    TXT(ctx, 'UNDER CONSTRUCTION', 270, 350, { size: 30, weight: 700, ls: 2, alpha: .45 + .55 * A(t, 28.9, .4), maxW: 480 });
    TXT(ctx, 'READY', 810, 350, { size: 34, weight: 800, ls: 4, color: C.gold, alpha: .45 + .55 * A(t, 35.04, .4) });
    // left: price + staged payments
    TXT(ctx, 'किंमत', 270, 520, { size: 46, weight: 700, alpha: V(t, 30.28) });
    ARROW(ctx, 270, 585, 270, 720, C.gold, 9, A(t, 31.42, .45));
    TXT(ctx, 'साधारणपणे कमी', 270, 790, { size: 42, weight: 600, color: C.gold, alpha: V(t, 31.42) });
    for (let i = 0; i < 5; i++) {
      const t0 = 32.96 + i * .32, a = A(t, t0, .3); if (a <= 0) continue;
      const y = 1300 - i * 80 - 40 * (1 - a);
      CARD(ctx, 160, y, 220, 70, { fill: C.navy2, stroke: C.gold2, lw: 3, r: 12, alpha: a, shadow: false });
      TXT(ctx, '₹', 270, y + 37, { size: 38, weight: 700, color: C.gold, alpha: a });
    }
    TXT(ctx, 'पेमेंट: टप्प्यांनुसार', 270, 1440, { size: 38, weight: 700, alpha: V(t, 34.4), maxW: 480 });
    // right: lump sum
    TXT(ctx, 'मोठी रक्कम', 810, 620, { size: 46, weight: 700, alpha: V(t, 36.46) });
    if (t >= 37.05) {
      const p = A(t, 37.05, .35, ease.in), y = lerp(-500, 970, p);
      CARD(ctx, 660, y, 300, 400, { fill: goldGrad(ctx, 660, y, 300, 400), r: 22 });
      TXT(ctx, '₹', 810, y + 205, { size: 180, weight: 800, color: C.navy });
    }
    TXT(ctx, 'पेमेंट: एकदम', 810, 1440, { size: 38, weight: 700, color: C.gold, alpha: V(t, 37.6) });
  }, { tin: 'push' });

  /* SCENE 09 - Point 3 धोका: delay + double cost (38.26-46.42) */
  scene(38.26, 46.42, (ctx, t) => {
    IMG(ctx, I.U, { z: 1.08 + .08 * clamp((t - 38.26) / 8.16), fx: .5, fy: .42, bright: .36 });
    TXT(ctx, 'Possession उशिरा?', 540, 450, { size: 64, weight: 700, shadow: true, alpha: V(t, 41.3) });
    const f = t >= 41.8 && t < 42.55 ? ((t - 41.8) / .25) % 1 : 0;
    const big = t < 41.8 ? 'तारीख' : t < 42.55 ? ['तारीख', '...', '...'][Math.floor((t - 41.8) / .25)] : '?';
    const ca = A(t, 39.96, .4);
    if (ca > 0) scaled(ctx, 540, 820, ca, () => CAL(ctx, 0, 0, 360, 'POSSESSION', big, { flip: f, bigColor: big === '?' ? C.coral : C.navy, bigSize: big === '?' ? .42 : .2 }));
    const bill = (x, t0, s) => {
      const a = A(t, t0, .35, ease.back); if (a <= 0) return;
      scaled(ctx, x, 1210, a, () => { CARD(ctx, -150, -80, 300, 160, { fill: C.ivory }); TXT(ctx, s, 0, 4, { size: 58, weight: 800, color: C.navy }); });
    };
    bill(330, 43.60, 'भाडं'); bill(750, 44.46, 'EMI');
    TXT(ctx, '+', 540, 1210, { size: 80, weight: 700, color: C.gold, alpha: V(t, 44.46) });
    LINE(ctx, 180, 1330, 900, 1330, C.gold, 6, A(t, 44.9, .45, ease.inOut));
    TXT(ctx, 'दोन्ही', 540, 1395, { size: 46, weight: 700, color: C.gold, alpha: V(t, 44.9) });
  }, { tin: 'push' });

  /* SCENE 10 - RERA shield (46.42-49.00) */
  scene(46.42, 49.00, (ctx, t) => {
    bgNavy(ctx);
    const u = A(t, 48.2, .8, ease.lin);
    if (u > 0 && u < 1) RING(ctx, 540, 860, 230 + 90 * u, `rgba(232,207,159,${.9 * (1 - u)})`, 8);
    const k = POP(t, 46.78, .6);
    if (k > 0) scaled(ctx, 540, 860, k, () => { SHIELD(ctx, 0, 0, 380, C.gold2, C.gold); TXT(ctx, 'RERA', 0, 12, { size: 84, weight: 800, color: C.navy }); });
    TXT(ctx, 'RERA = संरक्षण', 540, 1300, { size: 72, weight: 800, color: C.gold, alpha: V(t, 47.6) });
    TXT(ctx, 'RERA project मध्ये', 540, 1205, { size: 40, weight: 500, color: C.muted, alpha: V(t, 46.9) });
  });

  /* SCENE 11 - RERA: 10% advance (49.00-53.68) */
  scene(49.00, 53.68, (ctx, t) => {
    bgNavy(ctx); badge(ctx, t, 49.0);
    TXT(ctx, 'Registered Agreement आधी', 540, 580, { size: 50, weight: 700, alpha: V(t, 49.84), maxW: 900 });
    const x0 = 110, w = 860, y = 900, fill = .1 * w * A(t, 51.0, .6, ease.inOut);
    CARD(ctx, x0, y - 22, w, 44, { fill: 'rgba(250,247,242,.12)', r: 22, shadow: false, alpha: V(t, 50.5) });
    ctx.save(); ctx.globalAlpha = .5 * A(t, 53.38, .3); ctx.strokeStyle = 'rgba(232,144,122,.7)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.rect(x0 + 86, y - 22, w - 86, 44); ctx.clip();
    for (let k = 0; k < 40; k++) { ctx.beginPath(); ctx.moveTo(x0 + 86 + k * 24, y + 24); ctx.lineTo(x0 + 86 + k * 24 + 30, y - 24); ctx.stroke(); }
    ctx.restore();
    if (fill > 0) CARD(ctx, x0, y - 22, Math.max(fill, 44), 44, { fill: C.gold, r: 22, shadow: false });
    TXT(ctx, '0%', x0 + 10, y + 70, { size: 30, weight: 500, color: C.muted, alpha: V(t, 50.5) });
    TXT(ctx, '100%', x0 + w - 30, y + 70, { size: 30, weight: 500, color: C.muted, alpha: V(t, 50.5) });
    const lk = POP(t, 53.38, .35);
    if (lk > 0) scaled(ctx, x0 + 90, y - 110, lk, () => LOCK(ctx, 0, 0, 90, C.gold));
    TXT(ctx, 'Advance: max 10%', 540, 1160, { size: 80, weight: 800, color: C.gold, alpha: V(t, 52.0), maxW: 940 });
    source(ctx, 'RERA कलम 13', t, 50.0);
  });

  /* SCENE 12 - RERA: 70% separate account (53.68-57.82) */
  scene(53.68, 57.82, (ctx, t) => {
    bgNavy(ctx); badge(ctx, t, -1);
    TXT(ctx, 'तुमचे पैसे', 540, 480, { size: 46, weight: 700, alpha: V(t, 53.7) });
    const vk = POP(t, 55.6, .4);
    if (vk > 0) scaled(ctx, 540, 1215, vk, () => VAULT(ctx, 0, 0, 300));
    for (let i = 0; i < 10; i++) {
      const cx = 540 + ((i % 5) - 2) * 130, cy = i < 5 ? 600 : 720;
      const a = A(t, 53.8 + i * .04, .3); if (a <= 0) continue;
      if (i < 7) {
        const m = A(t, 55.88 + i * .07, .5, ease.inOut);
        const x = lerp(cx, 540, m), y = lerp(cy, 1215, m) - Math.sin(Math.PI * m) * 120;
        COIN(ctx, x, y, 52 * lerp(1, .45, m), a * (1 - A(t, 55.88 + i * .07 + .42, .1, ease.lin)));
      } else COIN(ctx, cx, cy, 52, a * (1 - .55 * A(t, 56.4, .4)));
    }
    const c = Math.round(70 * A(t, 55.0, .7, ease.out));
    TXT(ctx, `${c}%`, 540, 920, { size: 140, weight: 800, color: C.gold, alpha: V(t, 55.0, 1e9, .15) });
    TXT(ctx, 'वेगळे Bank Account', 540, 1410, { size: 50, weight: 700, alpha: V(t, 56.38) });
    source(ctx, 'RERA कलम 4(2)(l)(D)', t, 54.2, 1482);
  });

  /* SCENE 13 - RERA: delay interest (57.82-62.50) */
  scene(57.82, 62.50, (ctx, t) => {
    bgNavy(ctx); badge(ctx, t, -1);
    TXT(ctx, 'Possession उशिरा झाला तर', 540, 480, { size: 46, weight: 600, color: C.muted, alpha: V(t, 58.22), maxW: 900 });
    const flips = [59.94, 60.46, 60.94];
    let n = 0, f = 0; flips.forEach((s, i) => { if (t >= s + .25) n = i + 1; else if (t >= s) f = (t - s) / .25; });
    const big = n === 0 ? '?' : `महिना ${n}`;
    CAL(ctx, 540, 790, 340, 'POSSESSION', big, { flip: f, bigColor: n === 0 ? C.coral : C.navy, bigSize: n === 0 ? .42 : .17 });
    flips.forEach((s, i) => {
      const m = A(t, s + .1, .6, ease.inOut); if (m <= 0) return;
      const x = lerp(540, 330 + i * 210, m), y = lerp(960, 1170, m);
      pill(ctx, '+ व्याज', x, y, { size: 36, weight: 700, color: C.navy, fill: C.gold, alpha: m });
    });
    TXT(ctx, 'दर महिन्याला व्याज', 540, 1320, { size: 60, weight: 800, color: C.gold, alpha: V(t, 60.46) });
    source(ctx, 'RERA कलम 18', t, 58.5);
  });

  /* SCENE 14 - Point 4 खात्री (62.50-71.74) */
  scene(62.50, 71.74, (ctx, t) => {
    IMG(ctx, I.IN, { z: 1 + .1 * ease.sine(clamp((t - 62.5) / 9.24)), fx: .5, fy: .45 });
    GRAD(ctx, 950, H, C.navy, 0, .88);
    TXT(ctx, 'जे दिसतं,', 540, 1130, { size: 66, weight: 700, shadow: true, alpha: V(t, 65.38, 1e9, .2) });
    TXT(ctx, 'तेच मिळतं', 540, 1225, { size: 72, weight: 800, color: C.gold, shadow: true, alpha: V(t, 66.04, 1e9, .2) });
    for (const [x, t0, s] of [[340, 66.92, 'Quality'], [740, 67.90, 'परिसर']]) {
      const k = POP(t, t0, .4); if (k <= 0) continue;
      scaled(ctx, x, 1390, k, () => {
        CARD(ctx, -160, -50, 320, 100, { fill: 'rgba(250,247,242,.95)', r: 50 });
        ctx.fillStyle = C.gold2; ctx.beginPath(); ctx.arc(-100, 0, 30, 0, 7); ctx.fill();
        CHECK(ctx, -100, 0, 34, C.navy, A(t, t0 + .1, .3), 6);
        TXT(ctx, s, 25, 3, { size: 40, weight: 700, color: C.navy });
      });
    }
    if (t >= 70.52) {
      const m = A(t, 70.52, .8, ease.out5), bob = Math.sin((t - 70.52) * 2.4) * 8 * m;
      const kw = 280, kh = kw * I.K.height / I.K.width;
      ctx.save(); ctx.globalAlpha = m; ctx.translate(lerp(900, 790, m), lerp(1150, 820, m) + bob); ctx.rotate(lerp(.35, -.08, m));
      ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 16;
      ctx.drawImage(I.K, -kw / 2, -kh / 2, kw, kh); ctx.restore();
    }
  }, { tin: 'push' });

  /* SCENE 15 - Answer (71.74-83.20) */
  scene(71.74, 83.20, (ctx, t) => {
    bgNavy(ctx);
    const m = A(t, 72.6, .45, ease.inOut), k = lerp(.7, 1, A(t, 71.74, .35, ease.out5));
    scaled(ctx, 540, lerp(940, 390, m), lerp(k, .72, m), () => TXT(ctx, 'मग better काय?', 0, 0, { size: 88, weight: 800 }));
    const ga = A(t, 72.92, .45);
    if (ga > 0) {
      const dx = -80 * (1 - ga);
      CARD(ctx, 90 + dx, 470, 900, 430, { fill: goldGrad(ctx, 90, 470, 900, 430), alpha: ga });
      TXT(ctx, 'लगेच घर + Budget तयार', 540 + dx, 565, { size: 48, weight: 700, color: C.navy, alpha: ga * V(t, 73.48), maxW: 820 });
      ARROW(ctx, 540 + dx, 625, 540 + dx, 715, C.navy, 7, A(t, 74.9, .4));
      TXT(ctx, 'OC असलेला READY', 540 + dx, 800, { size: 62, weight: 800, color: C.navy, alpha: ga * V(t, 75.6), maxW: 820 });
    }
    const ia = A(t, 76.96, .45);
    if (ia > 0) {
      const dx = 80 * (1 - ia);
      CARD(ctx, 90 + dx, 960, 900, 520, { fill: C.ivory, alpha: ia });
      ctx.globalAlpha = ia;
      TXT(ctx, 'थांबू शकता?', 540 + dx, 1045, { size: 48, weight: 700, color: C.navy });
      [[1145, 79.52, 'MahaRERA Registration'], [1240, 81.32, 'Builder Track Record']].forEach(([y, t0, s]) => {
        ctx.strokeStyle = C.navy; ctx.lineWidth = 5; RR(ctx, 170 + dx, y - 28, 56, 56, 10); ctx.stroke();
        CHECK(ctx, 198 + dx, y, 48, C.gold3, A(t, t0, .3), 8);
        TXT(ctx, s, 255 + dx, y + 3, { size: 44, weight: 600, color: C.navy, align: 'left', maxW: 680 });
      });
      TXT(ctx, 'UNDER CONSTRUCTION', 540 + dx, 1375, { size: 54, weight: 800, color: C.navy2, alpha: V(t, 82.18), maxW: 820 });
      LINE(ctx, 270 + dx, 1420, 810 + dx, 1420, C.gold2, 6, A(t, 82.4, .4, ease.inOut));
    }
  });

  /* SCENE 16 - Bonus: 5 years (83.20-90.90) */
  scene(83.20, 90.90, (ctx, t) => {
    IMG(ctx, I.R, { z: lerp(1.12, 1, ease.sine(clamp((t - 83.2) / 7.7))), fx: .5, fy: .45, bright: .4 });
    TXT(ctx, 'लक्षात ठेवा', 540, 440, { size: 48, weight: 700, color: C.gold, shadow: true, alpha: V(t, 83.68) });
    TXT(ctx, 'Builder कडून घेतलेल्या घरात', 540, 560, { size: 40, weight: 500, color: C.ivory, shadow: true, alpha: V(t, 84.32), maxW: 900 });
    TXT(ctx, 'Possession नंतर', 540, 700, { size: 50, weight: 600, shadow: true, alpha: V(t, 86.04) });
    const k = t < 86.88 ? 0 : lerp(1.6, 1, A(t, 86.88, .35, ease.out5));
    if (k > 0) scaled(ctx, 540, 880, k, () => TXT(ctx, '5 वर्षं', 0, 0, { size: 210, weight: 800, color: C.gold, shadow: true, alpha: clamp((t - 86.88) / .08) }));
    TXT(ctx, 'Structural defect दुरुस्ती', 540, 1100, { size: 54, weight: 700, shadow: true, alpha: V(t, 87.62), maxW: 940 });
    TXT(ctx, 'Builder ची जबाबदारी', 540, 1190, { size: 60, weight: 800, color: C.gold, shadow: true, alpha: V(t, 89.46) });
    LINE(ctx, 250, 1245, 830, 1245, C.gold, 6, A(t, 89.7, .5, ease.inOut));
    source(ctx, 'RERA कलम 14(3)', t, 87.0);
  });

  /* SCENE 17 - CTA end card (90.90-END) */
  scene(90.90, END, (ctx, t) => {
    ctx.fillStyle = C.ivory; ctx.fillRect(0, 0, W, H);
    const s = 900 * (1 + .04 * clamp((t - 90.9) / 5));
    ctx.drawImage(E.logoF, 540 - s / 2, 820 - s / 2, s, s);
    const k = POP(t, 92.74, .45) * (1 + .07 * Math.sin(Math.PI * A(t, 94.44, .5, ease.lin)));
    if (k > 0) scaled(ctx, 540, 1400, k, () => { CARD(ctx, -250, -66, 500, 132, { fill: C.navy, r: 66 }); TXT(ctx, 'Follow करा', 0, 4, { size: 54, weight: 700, color: C.ivory }); });
  }, { tin: 'iris', dur: .6 });

  overlay(10.54, 90.90, rail);

  /* impacts (3 only) */
  punch(4.82, .03); shake(37.40, 9, .3); punch(86.88, .03);

  /* SFX */
  sfx(0.00, 'whoosh_soft', .8); sfx(0.50, 'pop', .7);
  sfx(3.46, 'tick'); sfx(4.82, 'hit_soft');
  sfx(5.40, 'paper'); sfx(6.72, 'stamp');
  sfx(7.76, 'whoosh'); [10.54, 10.84, 11.14, 11.44].forEach(x => sfx(x, 'tick', .6));
  sfx(11.90, 'whoosh'); sfx(15.18, 'pop');
  sfx(19.14, 'tick', .7); sfx(20.98, 'tick', .7); sfx(23.24, 'stamp', .8);
  sfx(26.96, 'click');
  sfx(27.24, 'whoosh'); sfx(31.42, 'whoosh_soft', .5); sfx(32.96, 'tick', .5); sfx(37.40, 'hit_soft');
  sfx(38.26, 'whoosh'); sfx(41.80, 'flip', .8); sfx(43.60, 'pop', .7); sfx(44.46, 'pop', .7);
  sfx(46.78, 'rise', .8);
  sfx(53.38, 'click');
  sfx(55.88, 'coin', .7); sfx(56.10, 'coin', .5); sfx(56.32, 'coin', .4);
  sfx(59.94, 'flip', .7); sfx(60.46, 'flip', .7); sfx(60.94, 'flip', .7);
  sfx(62.50, 'whoosh'); sfx(66.92, 'click'); sfx(67.90, 'click'); sfx(70.52, 'rise', .6);
  sfx(71.74, 'whoosh_soft', .7); sfx(79.52, 'click'); sfx(81.32, 'click');
  sfx(86.88, 'hit_soft');
  sfx(90.90, 'whoosh_soft', .8);
}

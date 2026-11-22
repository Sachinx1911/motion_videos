/* reel_redevelopment_process - PART 1 scenes v1 (storyboard_part1 v1 APPROVED, cue_words.json)
 * Watermark rule: photos (R1-R5) keep their visible Gemini mark - zoom <= 1.05, no bottom gradient over the corner,
 * nothing placed over the bottom-right corner. Object cut-outs replaced by code icons (option 3).
 */
const ASSETS = {
  R1: 'a/R1_old_building.jpg', R2: 'a/R2_dilapidated_closeup.jpg', R3: 'a/R3_lobby_notice_board.jpg',
  R4: 'a/R4_meeting_hall.jpg', R5: 'a/R5_architect_desk.jpg', RT: 'a/img2_ready_tower_v2.webp', LOGO: 'a/logo_embossed_ivory.jpg',
};
const END = 114.6;
const STEPS = { starts: [6.68, 16.86, 30.90, 54.19, 68.29, 81.09], end: 102.58, labels: ['पात्रता', 'सुरुवात', 'सभा', 'तज्ज्ञ', 'Tender', 'निवड'] };

function bgNavy(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.navy2); g.addColorStop(1, C.navy);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const r = ctx.createRadialGradient(W / 2, H * .45, 100, W / 2, H * .45, H * .75);
  r.addColorStop(0, 'rgba(232,207,159,.07)'); r.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = r; ctx.fillRect(0, 0, W, H);
}
function photo(ctx, img, t, t0, dur, o = {}) { // slow push, max zoom 1.05, keeps corners
  IMG(ctx, img, { z: 1 + .05 * clamp((t - t0) / dur), fx: .5, fy: .5, bright: o.bright ?? .5, blur: o.blur });
}
function pill(ctx, s, x, y, o = {}) {
  const size = o.size ?? 34, w = TW(ctx, s, size, o.weight ?? 700) + (o.padX ?? 60) + (o.icon ? size * 1.2 : 0), h = size * 1.9;
  CARD(ctx, x - w / 2, y - h / 2, w, h, { fill: o.fill ?? 'rgba(13,23,41,.86)', stroke: o.stroke, lw: 3, r: h / 2, alpha: o.alpha, shadow: false });
  const tx = x + (o.icon ? size * .6 : 0);
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  if (o.icon === 'check') CHECK(ctx, x - w / 2 + size * 1.05, y, size * .9, o.iconColor ?? C.gold, o.p ?? 1, size * .17);
  if (o.icon === 'cross') CROSS(ctx, x - w / 2 + size * 1.05, y, size * .8, o.iconColor ?? C.coral, o.p ?? 1, size * .17);
  ctx.restore();
  TXT(ctx, s, tx, y + size * .06, { size, weight: o.weight ?? 700, color: o.color ?? C.ivory, alpha: o.alpha });
  return w;
}
function stepTitle(ctx, t, t0, n, s) {
  const a = V(t, t0 + .25, 1e9, .3);
  TXT(ctx, `${n}`, 120, 330, { size: 30, weight: 800, color: C.navy, alpha: a, align: 'center' });
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(120, 330, 26, 0, 7); ctx.fill(); ctx.restore();
  TXT(ctx, `${n}`, 120, 333, { size: 30, weight: 800, color: C.navy, alpha: a });
  TXT(ctx, s, 165, 333, { size: 48, weight: 800, color: C.gold, align: 'left', alpha: a, shadow: true });
}
function caption(ctx, s, y, t, t0, o = {}) { TXT(ctx, s, 540, y, { size: o.size ?? 46, weight: o.weight ?? 700, color: o.color ?? C.ivory, alpha: V(t, t0, o.t1 ?? 1e9, .25), shadow: true, maxW: 940 }); }

/* 6-step rail */
function rail(ctx, t) {
  const a = A(t, 5.1, .4) * (1 - A(t, 108.3, .3, ease.lin));
  ctx.globalAlpha = a;
  GRAD(ctx, 0, 290, C.navy, .85, 0);
  const xs = [-375, -225, -75, 75, 225, 375].map(v => v + 540), y = 200;
  let act = -1; STEPS.starts.forEach((s, i) => { if (t >= s) act = i; });
  const done = i => t >= (STEPS.starts[i + 1] ?? STEPS.end);
  LINE(ctx, xs[0], y, xs[5], y, 'rgba(250,247,242,.22)', 4);
  if (act >= 0) LINE(ctx, xs[0], y, xs[act], y, C.gold2, 5);
  xs.forEach((x, i) => {
    const b = POP(t, 5.1 + i * .18, .35); if (b <= 0) return;
    const isAct = i === act && !done(i);
    scaled(ctx, x, y, b, () => {
      if (isAct) { ctx.fillStyle = `rgba(232,207,159,${.2 + .1 * Math.sin((t - STEPS.starts[i]) * 5)})`; ctx.beginPath(); ctx.arc(0, 0, 36, 0, 7); ctx.fill(); }
      ctx.beginPath(); ctx.arc(0, 0, 24, 0, 7); ctx.fillStyle = isAct ? C.gold : done(i) ? C.navy2 : C.navy; ctx.fill();
      ctx.lineWidth = 3; ctx.strokeStyle = isAct || done(i) ? C.gold : 'rgba(250,247,242,.4)'; ctx.stroke();
      if (done(i)) CHECK(ctx, 0, 0, 24, C.gold, 1, 4); else TXT(ctx, String(i + 1), 0, 2, { size: 24, weight: 700, color: isAct ? C.navy : 'rgba(250,247,242,.7)' });
      TXT(ctx, STEPS.labels[i], 0, 50, { size: 22, weight: isAct ? 700 : 500, color: isAct ? C.gold : 'rgba(250,247,242,.72)', shadow: true });
    });
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

  /* 01 HOOK 0.00-6.68 */
  scene(0, 6.68, (ctx, t) => {
    photo(ctx, I.R1, t, 0, 6.68, { bright: .55 });
    TXT(ctx, 'Society', 540, 420, { size: 70, weight: 700, color: C.ivory, shadow: true, alpha: V(t, .3) });
    TXT(ctx, 'Redevelopment', 540, 510, { size: 92, weight: 800, color: C.gold, shadow: true, alpha: V(t, .5) });
    pill(ctx, 'शासन आदेश दि. 30.09.2026 नुसार', 540, 620, { size: 32, stroke: C.gold2, alpha: V(t, .8) });
    if (t >= 3.5) {
      const y = lerp(2100, 1150, A(t, 3.5, .55, ease.out5));
      DOC(ctx, 540, y, 420, { title: 'शासन आदेश', sub: 'REDEVELOPMENT', titleSize: .1 });
      CHECK(ctx, 650, y + 180, 70, C.gold3, A(t, 4.2, .4), 10);
    }
    TXT(ctx, 'सही करण्याआधी!', 540, 1520, { size: 62, weight: 800, color: C.coral, shadow: true, alpha: V(t, 3.7) });
  });

  /* 02 पात्रता 6.68-16.86 */
  scene(6.68, 16.86, (ctx, t) => {
    if (t < 13.45) {
      photo(ctx, I.R2, t, 6.68, 6.8, { bright: .62 });
      stepTitle(ctx, t, 6.68, 1, 'पात्रता');
      const k = t < 10.7 ? 0 : lerp(1.8, 1, A(t, 10.7, .14, ease.out));
      if (k > 0) scaled(ctx, 540, 960, k, () => {
        ctx.rotate(-.09); ctx.globalAlpha = clamp((t - 10.7) / .1);
        CARD(ctx, -330, -95, 660, 190, { fill: 'rgba(13,23,41,.6)', stroke: C.coral, lw: 8, r: 18, shadow: false });
        TXT(ctx, 'धोकादायक / मोडकळीस', 0, 6, { size: 58, weight: 800, color: C.coral });
      });
      caption(ctx, 'सक्षम प्राधिकरणाने जाहीर', 1200, t, 12.2);
    } else {
      photo(ctx, I.R1, t, 13.45, 3.4, { bright: .38 });
      stepTitle(ctx, t, 13.2, 1, 'पात्रता');
      const a = A(t, 13.5, .35);
      CARD(ctx, 120, 760 + 30 * (1 - a), 840, 360, { fill: C.ivory, alpha: a });
      ctx.globalAlpha = a;
      [[860, 'सक्षम प्राधिकरणाने जाहीर', 13.6], [1020, 'नियमावलीनुसार society पात्र', 16.1]].forEach(([y, s, t0]) => {
        ctx.strokeStyle = C.navy; ctx.lineWidth = 5; RR(ctx, 170, y - 30 + 30 * (1 - a), 60, 60, 10); ctx.stroke();
        CHECK(ctx, 200, y + 30 * (1 - a), 52, C.gold3, A(t, t0, .3), 9);
        TXT(ctx, s, 260, y + 3 + 30 * (1 - a), { size: 44, weight: 700, color: C.navy, align: 'left', maxW: 660 });
      });
      ctx.globalAlpha = 1;
      TXT(ctx, 'दोन्ही अटी हव्यात', 540, 1240, { size: 46, weight: 700, color: C.gold, shadow: true, alpha: V(t, 14.0) });
    }
  }, { tin: 'push' });

  /* 03 सुरुवात 16.86-30.90 */
  scene(16.86, 30.90, (ctx, t) => {
    photo(ctx, I.R3, t, 16.86, 14, { bright: .4 });
    stepTitle(ctx, t, 16.86, 2, 'सुरुवात');
    for (let i = 0; i < 5; i++) {
      const k = POP(t, 18.6 + i * .1, .35); if (k <= 0) continue;
      scaled(ctx, 300 + i * 120, 470, k, () => PERSON(ctx, 0, 0, 90, i === 0 && t >= 19.5 ? C.gold : 'rgba(250,247,242,.75)'));
    }
    pill(ctx, '1/5 सभासद = लेखी अर्ज', 540, 590, { size: 36, stroke: C.gold2, alpha: V(t, 19.5) });
    if (t >= 21.6) { // application flies to the notice board
      const m = A(t, 21.6, .8, ease.inOut);
      ctx.save(); ctx.translate(lerp(300, 540, m), lerp(470, 780, m)); ctx.scale(lerp(.4, .55, m), lerp(.4, .55, m));
      DOC(ctx, 0, 0, 300, { title: 'अर्ज', sub: 'REDEVELOPMENT', titleSize: .14 }); ctx.restore();
    }
    const cy = 1060;
    pill(ctx, 'निवडून आलेली Committee', 540, cy, { size: 38, icon: 'check', p: A(t, 23.6, .3), fill: 'rgba(13,23,41,.9)', stroke: C.gold, alpha: V(t, 23.4) });
    pill(ctx, 'प्रशासक', 540, cy + 100, { size: 38, icon: 'cross', p: A(t, 25.8, .3), stroke: C.coral, color: C.coral, alpha: V(t, 25.7) });
    // timeline
    const ty = 1360, a = V(t, 26.8);
    LINE(ctx, 250, ty, 830, ty, C.gold2, 6, A(t, 26.8, 2.8, ease.inOut));
    pill(ctx, '2 महिन्यांत सभा', 330, ty + 80, { size: 32, alpha: a, stroke: C.gold2 });
    pill(ctx, '14 दिवस आधी Notice', 760, ty + 80, { size: 32, alpha: V(t, 29.5), stroke: C.gold2 });
    for (const [x, t0] of [[250, 26.8], [830, 29.5]]) { const k = POP(t, t0, .3); if (k > 0) scaled(ctx, x, ty, k, () => { ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(0, 0, 14, 0, 7); ctx.fill(); }); }
  }, { tin: 'push' });

  /* 04 पहिली सभा 30.90-41.24 */
  scene(30.90, 41.24, (ctx, t) => {
    photo(ctx, I.R4, t, 30.9, 10.3, { bright: .3 });
    stepTitle(ctx, t, 30.9, 3, 'पहिली सभा');
    caption(ctx, 'उदा. society मध्ये 100 सभासद', 450, t, 33.6, { size: 38, weight: 600, color: C.muted });
    const x0 = 540 - 4.5 * 52, y0 = 540;
    const lit = Math.round(67 * A(t, 35.0, .7, ease.out)), gold = Math.round(51 * A(t, 38.6, .6, ease.out));
    for (let i = 0; i < 100; i++) {
      const a = A(t, 31.4 + i * .008, .25); if (a <= 0) continue;
      ctx.globalAlpha = a; ctx.fillStyle = i < gold ? C.gold : i < lit ? 'rgba(250,247,242,.9)' : 'rgba(250,247,242,.16)';
      ctx.beginPath(); ctx.arc(x0 + (i % 10) * 52, y0 + Math.floor(i / 10) * 52, 17, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
    TXT(ctx, `Quorum: 2/3 = ${lit}/100`, 540, 1130, { size: 50, weight: 800, color: C.ivory, shadow: true, alpha: V(t, 35.0) });
    TXT(ctx, `मंजुरी: एकूण सभासदांच्या 51% = ${gold}`, 540, 1225, { size: 46, weight: 800, color: C.gold, shadow: true, alpha: V(t, 38.6), maxW: 940 });
    const sa = V(t, 39.7);
    TXT(ctx, 'फक्त हजर असलेल्यांच्या नाही', 540, 1330, { size: 42, weight: 700, color: C.coral, shadow: true, alpha: sa });
    if (sa > 0) LINE(ctx, 270, 1332, 810, 1332, C.coral, 5, A(t, 40.0, .4));
  }, { tin: 'push' });

  /* 05 VC 41.24-49.60 */
  scene(41.24, 49.60, (ctx, t) => {
    photo(ctx, I.R4, t, 41.24, 8.4, { bright: .24 });
    stepTitle(ctx, t, 40.8, 3, 'पहिली सभा');
    [['परदेशातले', 260, 41.3], ['आजारी', 540, 42.5], ['दिव्यांग', 820, 43.2]].forEach(([s, x, t0]) => pill(ctx, s, x, 470, { size: 36, stroke: C.gold2, alpha: V(t, t0) }));
    const k = POP(t, 44.3, .5); if (k > 0) scaled(ctx, 540, 960, k, () => LAPTOP(ctx, 0, 0, 520, t));
    pill(ctx, 'Video Conference', 540, 1110, { size: 40, icon: 'check', p: A(t, 45.0, .3), alpha: V(t, 44.8), stroke: C.gold });
    const ba = V(t, 46.0);
    TXT(ctx, 'पण प्रत्यक्ष हजर हवेतच', 540, 1260, { size: 46, weight: 800, color: C.gold, shadow: true, alpha: ba });
    CARD(ctx, 140, 1320, 800, 56, { fill: 'rgba(250,247,242,.14)', r: 28, shadow: false, alpha: ba });
    const f = .51 * A(t, 46.3, .9, ease.inOut);
    if (f > 0) CARD(ctx, 140, 1320, Math.max(56, 800 * f), 56, { fill: C.gold, r: 28, shadow: false });
    TXT(ctx, `${Math.round(f * 100)}%`, 140 + 800 * f + 60, 1350, { size: 40, weight: 800, color: C.gold, alpha: V(t, 46.3) });
  });

  /* 06 3 महिने 49.60-54.19 */
  scene(49.60, 54.19, (ctx, t) => {
    bgNavy(ctx);
    stepTitle(ctx, t, 49.3, 3, 'पहिली सभा');
    pill(ctx, 'Quorum', 360, 500, { size: 38, icon: 'cross', p: A(t, 49.8, .3), color: C.coral, stroke: C.coral, alpha: V(t, 49.7) });
    pill(ctx, 'Quorum', 720, 500, { size: 38, icon: 'cross', p: A(t, 50.7, .3), color: C.coral, stroke: C.coral, alpha: V(t, 50.6) });
    let f = 0, n = 0; [51.9, 52.15, 52.4].forEach((s, i) => { if (t >= s + .22) n = i + 1; else if (t >= s) f = (t - s) / .22; });
    const ca = A(t, 51.4, .4);
    if (ca > 0) scaled(ctx, 540, 900, ca, () => CAL(ctx, 0, 0, 360, 'पुढचे', n ? `${n} महिना` : '...', { flip: f, bigSize: .17 }));
    const lk = POP(t, 52.9, .35); if (lk > 0) scaled(ctx, 720, 760, lk, () => LOCK(ctx, 0, 0, 120, C.coral, C.navy));
    TXT(ctx, '3 महिने विषय पुन्हा घेता येत नाही', 540, 1240, { size: 48, weight: 800, color: C.gold, alpha: V(t, 52.6), maxW: 940 });
  });

  /* 07 तज्ज्ञ 54.19-68.29 */
  scene(54.19, 68.29, (ctx, t) => {
    photo(ctx, I.R5, t, 54.19, 14, { bright: .36 });
    stepTitle(ctx, t, 54.19, 4, 'तज्ज्ञ');
    caption(ctx, 'सभेआधी किमान 3 Quotations', 440, t, 56.5);
    [250, 540, 830].forEach((x, i) => {
      const a = A(t, 57.0 + i * .15, .35); if (a <= 0) return;
      const sel = t >= 61.0, me = i === 1, k = sel && me ? lerp(1, 1.14, A(t, 61.0, .3)) : 1;
      scaled(ctx, x, 600 + 30 * (1 - a), k, () => {
        CARD(ctx, -115, -75, 230, 150, { fill: sel && me ? goldG(ctx) : C.ivory, alpha: a * (sel && !me ? .45 : 1) });
        TXT(ctx, i < 2 ? (i ? 'PMC' : 'Architect') : 'Architect', 0, -18, { size: 30, weight: 700, color: C.navy, alpha: a * (sel && !me ? .45 : 1) });
        TXT(ctx, `Quotation ${i + 1}`, 0, 30, { size: 24, weight: 500, color: C.navy2, alpha: a * (sel && !me ? .45 : 1) });
      });
    });
    caption(ctx, 'सभेत 1 निवड', 760, t, 61.0, { color: C.gold });
    const ra = A(t, 61.6, .4);
    if (ra > 0) {
      CARD(ctx, 160, 860, 760, 620, { fill: C.ivory, alpha: ra });
      ctx.globalAlpha = ra;
      TXT(ctx, 'Project Report', 220, 930, { size: 44, weight: 800, color: C.navy, align: 'left' });
      pill(ctx, '2 महिन्यांत', 770, 930, { size: 28, fill: C.navy, color: C.gold });
      [['FSI', 63.6], ['TDR', 64.5], ['घरांचं क्षेत्र', 65.0], ['Parking', 66.4], ['Open space', 67.3]].forEach(([s, t0], i) => {
        const y = 1030 + i * 88;
        ctx.strokeStyle = C.navy; ctx.lineWidth = 4; RR(ctx, 220, y - 24, 48, 48, 8); ctx.stroke();
        CHECK(ctx, 244, y, 42, C.gold3, A(t, t0, .3), 8);
        TXT(ctx, s, 300, y + 3, { size: 40, weight: 700, color: C.navy, align: 'left', alpha: .35 + .65 * A(t, t0 - .1, .25) });
      });
      ctx.globalAlpha = 1;
    }
  }, { tin: 'push' });

  /* 08 Tender 68.29-81.09 */
  scene(68.29, 81.09, (ctx, t) => {
    bgNavy(ctx);
    stepTitle(ctx, t, 68.29, 5, 'Tender');
    for (const [x, s, t0, r] of [[350, 'मराठी', 70.8, -.05], [730, 'English', 71.7, .05]]) {
      const a = A(t, t0, .4); if (a <= 0) continue;
      ctx.save(); ctx.globalAlpha = a; ctx.translate(x, 640 + 40 * (1 - a)); ctx.rotate(r); NEWSPAPER(ctx, 0, 0, 300, s); ctx.restore();
    }
    caption(ctx, 'जाहिरात: मराठी + English वृत्तपत्र', 460, t, 70.1, { size: 42 });
    [[-.12, 380], [0, 540], [.12, 700]].forEach(([r, x], i) => { const a = A(t, 73.4 + i * .15, .35); if (a > 0) { ctx.save(); ctx.globalAlpha = a; ENVELOPE(ctx, x, 1060 - 40 * (1 - a), 220, r); ctx.restore(); } });
    TXT(ctx, 'किमान 3 Tenders', 540, 1210, { size: 50, weight: 800, color: C.gold, alpha: V(t, 73.4) });
    pill(ctx, '+15 दिवस', 380, 1340, { size: 36, stroke: C.gold2, alpha: V(t, 75.8) });
    pill(ctx, '+1 आठवडा', 700, 1340, { size: 36, stroke: C.gold2, alpha: V(t, 77.2) });
    TXT(ctx, 'तरीही कमी? आलेल्या tenders वर निर्णय', 540, 1460, { size: 40, weight: 700, color: C.ivory, alpha: V(t, 78.6), maxW: 940 });
  }, { tin: 'push' });

  /* 09 Builder निवड 81.09-90.04 */
  scene(81.09, 90.04, (ctx, t) => {
    photo(ctx, I.R4, t, 81.09, 9, { bright: .36 });
    stepTitle(ctx, t, 81.09, 6, 'Builder निवड');
    const b = A(t, 84.4, .4, ease.back);
    if (b > 0) scaled(ctx, 540, 520, b, () => {
      CARD(ctx, -400, -70, 800, 140, { fill: goldG(ctx), r: 24 });
      SHIELD(ctx, -330, 0, 90, C.navy); TXT(ctx, 'Registrar चा प्राधिकृत अधिकारी', 30, 4, { size: 38, weight: 800, color: C.navy, maxW: 640 });
    });
    const ia = A(t, 87.3, .4);
    if (ia > 0) { ctx.save(); ctx.globalAlpha = ia; IDCARD(ctx, 540, 900, 500, A(t, 87.6, .7, ease.lin)); ctx.restore(); }
    pill(ctx, 'स्वतः, ओळखपत्रासह', 540, 1150, { size: 38, icon: 'check', p: A(t, 88.1, .3), stroke: C.gold, alpha: V(t, 87.6) });
    pill(ctx, 'प्रतिनिधी', 540, 1270, { size: 38, icon: 'cross', p: A(t, 88.6, .3), color: C.coral, stroke: C.coral, alpha: V(t, 88.5) });
  }, { tin: 'push' });

  /* 10 मतदान + video 90.04-102.58 */
  scene(90.04, 102.58, (ctx, t) => {
    photo(ctx, I.R4, t, 90.04, 12.5, { bright: .24 });
    stepTitle(ctx, t, 89.8, 6, 'Builder निवड');
    TXT(ctx, 'एकूण सभासदांच्या किमान 51% लेखी मंजुरी', 540, 440, { size: 40, weight: 800, color: C.ivory, shadow: true, alpha: V(t, 90.2), maxW: 940 });
    CARD(ctx, 140, 500, 800, 52, { fill: 'rgba(250,247,242,.14)', r: 26, shadow: false, alpha: V(t, 90.6) });
    const f = .51 * A(t, 91.8, .9, ease.inOut);
    if (f > 0) CARD(ctx, 140, 500, Math.max(52, 800 * f), 52, { fill: C.gold, r: 26, shadow: false });
    const ba = A(t, 94.8, .4, ease.back);
    if (ba > 0) scaled(ctx, 540, 880, ba, () => BALLOT(ctx, 0, 0, 380, t, 98.0));
    pill(ctx, '1/5 मागणी = गुप्त मतदान', 540, 1150, { size: 38, stroke: C.gold2, alpha: V(t, 95.3) });
    const ca = A(t, 99.6, .4);
    if (ca > 0) {
      ctx.save(); ctx.globalAlpha = ca; CAMERA(ctx, 330, 1380, 260, t); ctx.restore();
      pill(ctx, 'REC', 330, 1230, { size: 30, fill: '#ff3b30', alpha: ca });
    }
    ARROW(ctx, 480, 1340, 650, 1340, C.gold, 7, A(t, 101.4, .4));
    pill(ctx, 'Copy: Registrar', 800, 1340, { size: 32, stroke: C.gold, alpha: V(t, 101.6) });
  });

  /* 11 तुमचा हक्क 102.58-108.64 */
  scene(102.58, 108.64, (ctx, t) => {
    bgNavy(ctx);
    TXT(ctx, 'तुमचा हक्क', 540, 360, { size: 64, weight: 800, color: C.gold, alpha: V(t, 102.7) });
    [['Notice', 102.6], ['इतिवृत्त', 103.3], ['Project Report', 104.2], ['Tenders', 105.2], ['Video', 106.1]].forEach(([s, t0], i) => {
      const a = A(t, t0, .35); if (a <= 0) return;
      const x = 200 + i * 170, y = 760 + (i % 2) * 70;
      ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y + 40 * (1 - a)); ctx.rotate((i - 2) * .05);
      DOC(ctx, 0, 0, 200, { title: s, sub: ' ', titleSize: .12 }); ctx.restore();
    });
    const k = t < 107.4 ? 0 : lerp(1.8, 1, A(t, 107.4, .15, ease.out));
    if (k > 0) scaled(ctx, 540, 1180, k, () => { ctx.rotate(-.08); CARD(ctx, -170, -70, 340, 140, { fill: 'rgba(13,23,41,.5)', stroke: C.gold, lw: 8, r: 16, shadow: false }); TXT(ctx, 'मोफत', 0, 6, { size: 72, weight: 800, color: C.gold }); });
    TXT(ctx, 'प्रत्येक सभासदाला पाहता येतं', 540, 1360, { size: 44, weight: 700, alpha: V(t, 107.6) });
  });

  /* 12 CTA 108.64-END */
  scene(108.64, 110.3, (ctx, t) => {
    IMG(ctx, I.RT, { z: 1.02, bright: .42 });
    const a = A(t, 108.7, .35);
    CARD(ctx, 120, 600 + 40 * (1 - a), 840, 360, { fill: 'rgba(13,23,41,.88)', stroke: C.gold, alpha: a });
    TXT(ctx, 'Part 2', 540, 690 + 40 * (1 - a), { size: 80, weight: 800, color: C.gold, alpha: a });
    TXT(ctx, 'करार · भाडं · नवा Flat · ताबा', 540, 820 + 40 * (1 - a), { size: 42, weight: 700, alpha: a, maxW: 780 });
  }, { tin: 'push' });
  scene(110.3, END, (ctx, t) => {
    ctx.fillStyle = C.ivory; ctx.fillRect(0, 0, W, H);
    const s = 900 * (1 + .04 * clamp((t - 110.3) / 4.3));
    ctx.drawImage(E.logoF, 540 - s / 2, 820 - s / 2, s, s);
    const k = POP(t, 111.9, .45) * (1 + .07 * Math.sin(Math.PI * A(t, 112.8, .5, ease.lin)));
    if (k > 0) scaled(ctx, 540, 1400, k, () => { CARD(ctx, -250, -66, 500, 132, { fill: C.navy, r: 66 }); TXT(ctx, 'Follow करा', 0, 4, { size: 54, weight: 700, color: C.ivory }); });
  }, { tin: 'iris', dur: .6 });

  overlay(5.1, 108.64, rail);

  punch(38.6, .02);

  sfx(0.0, 'whoosh_soft', .8); sfx(3.6, 'paper'); [5.1, 5.28, 5.46, 5.64, 5.82, 6.0].forEach(x => sfx(x, 'tick', .5));
  sfx(6.68, 'whoosh'); sfx(10.7, 'stamp'); sfx(13.6, 'click'); sfx(16.1, 'click');
  sfx(16.86, 'whoosh'); sfx(19.5, 'pop', .7); sfx(21.6, 'paper', .7); sfx(23.6, 'click'); sfx(25.8, 'tick'); sfx(26.8, 'tick', .6); sfx(29.5, 'tick', .6);
  sfx(30.9, 'whoosh'); sfx(35.0, 'tick'); sfx(38.6, 'hit_soft', .8);
  sfx(44.3, 'pop', .8); sfx(46.3, 'rise', .5);
  sfx(49.8, 'tick', .6); sfx(50.7, 'tick', .6); [51.9, 52.15, 52.4].forEach(x => sfx(x, 'flip', .6)); sfx(52.9, 'click');
  sfx(54.19, 'whoosh'); sfx(57.0, 'paper', .6); sfx(61.0, 'pop', .7); [63.6, 64.5, 65.0, 66.4, 67.3].forEach(x => sfx(x, 'click', .6));
  sfx(68.29, 'whoosh'); sfx(70.8, 'paper', .6); sfx(73.4, 'pop', .6); sfx(75.8, 'tick'); sfx(77.2, 'tick');
  sfx(81.09, 'whoosh'); sfx(84.4, 'pop', .7); sfx(87.6, 'rise', .4); sfx(88.6, 'tick');
  sfx(91.8, 'rise', .5); sfx(98.0, 'paper', .5); sfx(99.6, 'click'); sfx(101.4, 'whoosh_soft', .6);
  sfx(102.6, 'paper', .5); sfx(107.4, 'stamp');
  sfx(108.64, 'whoosh'); sfx(110.3, 'whoosh_soft', .8);
}
function goldG(ctx) { const g = ctx.createLinearGradient(-400, -100, 400, 100); g.addColorStop(0, C.gold); g.addColorStop(1, C.gold2); return g; }

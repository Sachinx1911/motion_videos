/* Instagram cover for reel_ready_vs_uc. Key content kept inside the 3:4 grid crop (y 240-1680).
 * ?t1 = half-built tower background, ?t2 = half-raw room background, default = split UC/Ready photos (v1 cover). */
const Q = location.search;
const ASSETS = Q.includes('t1') ? { BG: 'a/thumb_t1_tower.webp' }
  : Q.includes('t2') ? { BG: 'a/thumb_t2_room.webp' }
  : { U: 'a/img1_uc_tower_v2.webp', R: 'a/img2_ready_tower_v2.webp' };

function build() {
  const I = E.img;
  scene(0, 1, ctx => {
    if (I.BG) {
      IMG(ctx, I.BG, { fx: .5, fy: .5, bright: Q.includes('t2') ? .92 : 1 });
      GRAD(ctx, 0, 860, C.navy, Q.includes('t2') ? .96 : .9, 0);
      GRAD(ctx, 1080, H, C.navy, 0, .96);
      if (Q.includes('t2')) LINE(ctx, 540, 700, 540, 1150, C.gold, 5);
    } else {
      IMG(ctx, I.U, { x: 0, w: 540, z: 1.02, fx: .49, fy: .5, bright: .9 });
      IMG(ctx, I.R, { x: 540, w: 540, z: 1.02, fx: .5, fy: .5, bright: .95 });
      GRAD(ctx, 0, 900, C.navy, .95, 0);
      GRAD(ctx, 1150, H, C.navy, 0, .95);
      LINE(ctx, 540, 0, 540, H, C.gold, 5);
    }

    // headline
    TXT(ctx, 'READY', 540, 400, { size: 150, weight: 800, color: C.gold, shadow: true });
    TXT(ctx, 'की', 540, 520, { size: 64, weight: 700, color: C.ivory, shadow: true });
    TXT(ctx, 'UNDER CONSTRUCTION?', 540, 625, { size: 84, weight: 800, color: C.ivory, shadow: true, maxW: 980 });

    // hook numbers
    const tag = (x, top, num, col) => {
      CARD(ctx, x - 230, 1240, 460, 250, { fill: 'rgba(13,23,41,.9)', stroke: col, lw: 4, r: 30 });
      TXT(ctx, top, x, 1300, { size: 34, weight: 700, color: C.ivory, ls: 2 });
      TXT(ctx, num, x, 1390, { size: 78, weight: 800, color: col });
      TXT(ctx, 'GST', x, 1455, { size: 32, weight: 600, color: C.muted, ls: 4 });
    };
    tag(270, 'UNDER CONST.', '+₹2.5 लाख', C.coral);
    tag(810, 'READY', '₹0', C.gold);
    TXT(ctx, '₹50 लाखांच्या flat वर', 540, 1185, { size: 40, weight: 600, color: C.ivory, shadow: true });

    TXT(ctx, 'काय better? पूर्ण गणित पाहा', 540, 1570, { size: 44, weight: 700, color: C.gold, shadow: true });
    TXT(ctx, 'SRS DWELL', 540, 1650, { size: 30, weight: 600, color: C.ivory, ls: 10, alpha: .85 });
  });
}

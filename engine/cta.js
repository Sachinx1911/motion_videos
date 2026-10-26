// Standard CTA pieces for every SRS Dwell reel (user, 26 Oct 2026: "ithun pudhe apan he use karuya").
// First used in reel_cidco_bid_error (S9 / S10). Needs engine.js (A, E, clamp, sfx) and a CURSOR svg string.
// Copy into the reel's site/ folder and load after lib.js.

// Instagram-style comment bar: `txt` types itself from tType, Post is clicked at tPost, the comment posts with a heart.
// x/y = centre, w = width (keep x+w/2 <= 860 so Instagram's right-side buttons don't cover it).
function COMMENT_BOX(t0, t1, tType, tPost, txt, o = {}) {
  const x = o.x || 480, y = o.y || 1345, w = o.w || 760, typeDur = o.typeDur || .4;
  const tDone = tPost + .16, tHeart = tDone + .15;
  A({t0, t1, x, y, w, cls: 'noshadow', enter: 'up', din: .4, sfx: 'whoosh', sfxv: .35, z: 66, float: 0, exit: 'fade', dout: .2,
    html: `<div style="position:relative;height:250px"><div class="post" style="position:absolute;left:0;right:0;top:0;opacity:0;display:flex;align-items:center;gap:18px;background:rgba(255,255,255,.96);border-radius:24px;padding:16px 22px;box-shadow:0 10px 30px rgba(0,0,0,.25)"><div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7);flex:none"></div><div style="flex:1;text-align:left"><div style="font:700 24px/1.2 P;color:#17191c">you</div><div style="font:700 34px/1.3 P;color:${o.col || '#1d8a4a'}">${txt}</div></div><div class="hr" style="font:400 40px/1 P;transform:scale(0)">❤️</div></div>
     <div style="position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;gap:16px;background:#fff;border-radius:999px;padding:14px 16px 14px 22px;box-shadow:0 10px 30px rgba(0,0,0,.3)"><div style="width:56px;height:56px;border-radius:50%;background:#e9e6e1;flex:none"></div><div style="flex:1;text-align:left;font:600 32px/1 P;color:#17191c"><span class="ty"></span><span class="cu" style="display:inline-block;width:3px;height:34px;background:#17191c;vertical-align:middle;margin-left:3px"></span><span class="ph" style="color:#9aa0a6">${o.placeholder || 'Comment करा...'}</span></div><div class="pb" style="font:800 30px/1 P;color:#9cc7f5;padding:10px 14px">Post</div></div></div>`,
    draw: (t, lt, oo) => {
      const ch = [...txt]; const n = Math.floor(clamp((t - tType) / typeDur) * ch.length + 1e-6);
      const ty = oo.el.querySelector('.ty'); ty.textContent = t >= tType && t < tDone ? ch.slice(0, Math.max(1, n)).join('') : '';
      oo.el.querySelector('.ph').style.display = ty.textContent ? 'none' : 'inline';
      oo.el.querySelector('.cu').style.opacity = (t < tDone && Math.floor(t * 3) % 2 === 0) ? 1 : 0;
      const pb = oo.el.querySelector('.pb'); pb.style.color = t >= tType + typeDur && t < tDone ? '#0095f6' : '#9cc7f5'; pb.style.transform = `scale(${t > tPost && t < tDone ? .88 : 1})`;
      const pq = E.out(clamp((t - tDone) / .3)); const po = oo.el.querySelector('.post'); po.style.opacity = pq; po.style.transform = `translateY(${(1 - pq) * 60}px)`;
      oo.el.querySelector('.hr').style.transform = `scale(${t > tHeart ? E.back(clamp((t - tHeart) / .3)) : 0})`;
    }});
  A({t0: tPost - .4, t1, x: x + w / 2 - 50, y: y + 125, w: 80, cls: 'noshadow', over: 1, html: CURSOR, enter: 'up', din: .3, z: 68, float: 0, exit: 'fade', dout: .2,
    fn: t => ({s: t > tPost && t < tDone ? .85 : 1})});
  sfx(tType, 'ticks', .35); sfx(tPost, 'click', .8); sfx(tHeart, 'pop', .5);
}

// Follow pill that is clicked at tClick and flips to "Following ✓".
function FOLLOW_FLIP(t0, t1, tClick, o = {}) {
  const x = o.x || 540, y = o.y || 1250, label = o.label || 'आमच्या पेजला Follow करा →', col = o.col || '#ff8a2a';
  A({t0, t1, x, y, w: o.w || 720, cls: 'chipw', enter: 'pop', din: .35, sfx: 'pop', sfxv: .5, z: 65, float: 0,
    html: `<span style="display:inline-block;background:${col};color:#fff;font:700 ${o.fs || 36}px/1 P;padding:18px 30px 14px;border-radius:999px;box-shadow:0 8px 28px rgba(0,0,0,.3);white-space:nowrap">${label}</span>`,
    fn: t => ({s: t > tClick - .05 && t < tClick + .15 ? .92 : 1, ry: t > tClick && t < tClick + .3 ? Math.sin((t - tClick) / .3 * Math.PI) * 70 : 0}),
    draw: (t, lt, oo) => { const sp = oo.el.querySelector('span'); const f = t >= tClick + .15; if (oo.f !== f) { oo.f = f; sp.innerHTML = f ? 'Following ✓' : label; sp.style.background = f ? '#efefef' : col; sp.style.color = f ? '#17191c' : '#fff'; } }});
  A({t0: tClick - .45, t1, x: x + 180, y: y + 80, w: 90, cls: 'noshadow', over: 1, html: CURSOR, enter: 'up', din: .3, z: 68, float: 0,
    fn: t => ({s: t > tClick - .05 && t < tClick + .15 ? .85 : 1})});
  sfx(tClick, 'click', .8);
}

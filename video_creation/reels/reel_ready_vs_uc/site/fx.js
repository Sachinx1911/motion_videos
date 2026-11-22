/* Camera impacts and flashes - deterministic in t. */
const FX = {
  camera(ctx, t) {
    let sc = 1, dx = 0, dy = 0;
    for (const f of E.fx) {
      const u = t - f.t;
      if (u < 0 || u > f.dur) continue;
      const k = 1 - u / f.dur;
      if (f.type === 'punch') sc += f.amp * Math.sin(Math.PI * Math.min(1, u / f.dur)) * k;
      if (f.type === 'shake') {
        const n = Math.floor(u * 40); // 40 Hz deterministic jitter
        dx += f.amp * k * Math.sin(n * 12.9898) ; dy += f.amp * k * Math.cos(n * 78.233);
      }
    }
    if (sc !== 1 || dx || dy) { ctx.translate(W / 2 + dx, H / 2 + dy); ctx.scale(sc, sc); ctx.translate(-W / 2, -H / 2); }
  },
  flashes(ctx, t) {
    for (const f of E.fx) {
      if (f.type !== 'flash') continue;
      const u = t - f.t; if (u < 0 || u > f.dur) continue;
      ctx.save(); ctx.globalAlpha = f.amp * (1 - u / f.dur); ctx.fillStyle = f.color; ctx.fillRect(0, 0, W, H); ctx.restore();
    }
  },
};
function punch(t, amp = .035, dur = .35) { E.fx.push({ type: 'punch', t, amp, dur }); }
function shake(t, amp = 10, dur = .35) { E.fx.push({ type: 'shake', t, amp, dur }); }
function flash(t, amp = .5, dur = .25, color = '#ffffff') { E.fx.push({ type: 'flash', t, amp, dur, color }); }

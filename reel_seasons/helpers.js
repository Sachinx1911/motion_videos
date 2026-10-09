// ================= helpers =================
const IMG=(t0,t1,img,x,y,w,o={})=>A(Object.assign({t0,t1,img,x,y,w},o));
const CHIP=(t0,t1,txt,c='c-gold',_u,o={})=>A(Object.assign({t0,t1,x:540,y:960,w:1040,cls:'chipw',html:`<span class="chip ${c}" style="${o.st||''}">${txt}</span>`,enter:'pop',din:.4,sfx:'pop',float:.35,z:40},o));
function STAMP(t0,t1,txt,x,y,o={}){shake(t0+.22,16);punch(t0+.2,.04);return A(Object.assign({t0,t1,x,y,w:1040,cls:'chipw',html:`<span class="stampx ${o.g?'g':''}" style="${o.st||''}">${txt}</span>`,enter:'stamp',din:.26,sfx:'stamp',sfxd:.2,rot:-6,float:0,z:60},o))}
const WG=(t0,t1,x,y,w,inner,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'wg',html:`${o.acc?`<div class="acc" style="background:${o.acc}"></div>`:''}<div style="padding:${o.pad||'28px 34px'};text-align:center">${inner}</div>`,enter:'up',sfx:'whoosh',z:35,float:.4},o));
const GL=(t0,t1,x,y,w,inner,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'glass dk',html:`<div style="padding:${o.pad||'26px 34px'};text-align:center">${inner}</div>`,enter:'up',sfx:'whoosh',z:35,float:.4},o));
const RAMU=(t0,t1,img,x,y,w,o={})=>IMG(t0,t1,img,x,y,w,Object.assign({enter:'rise',din:.55,sfx:'swoosh',z:48,float:.5},o));
const CAL=(t0,t1,x,y,w,d,m,o={})=>A(Object.assign({t0,t1,x,y,w,enter:'flipx',din:.5,sfx:'paper',z:46,float:.3,html:`<div style="position:relative"><img src="a/I02_cal.png" style="width:100%;display:block;filter:drop-shadow(0 20px 26px rgba(0,0,0,.5))">
  <div style="position:absolute;left:10%;right:14%;top:34%;bottom:10%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center"><div style="font:900 ${w*.36}px/1 B;color:#1d2140">${d}</div><div style="font:800 ${w*.15}px/1.25 B;color:#e53935">${m}</div></div></div>`},o));
const SVGX=`<svg viewBox="0 0 200 200" width="100%"><g stroke="#ff1f3d" stroke-width="26" stroke-linecap="round" filter="drop-shadow(0 8px 10px rgba(0,0,0,.5))"><line x1="30" y1="30" x2="170" y2="170"/><line x1="170" y1="30" x2="30" y2="170"/></g></svg>`;
const CHECK=`<svg viewBox="0 0 100 100" width="100%"><circle cx="50" cy="50" r="46" fill="#22b14c" stroke="#fff" stroke-width="7"/><path d="M28 52 L44 67 L73 36" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const segs=s=>[...new Intl.Segmenter('mr',{granularity:'grapheme'}).segment(s)].map(x=>x.segment);
// full-bleed photo as a floating item (keeps whole subject visible), soft masked edges
const PHOTO=(t0,t1,img,x,y,w,o={})=>A(Object.assign({t0,t1,img,x,y,w,cls:'noshadow',enter:'fade',din:.5,exit:'fade',dout:.4,float:0,z:5,
  mask:o.mask||'radial-gradient(ellipse 50% 50% at 50% 50%,#000 62%,transparent 100%)'},o));
// season badge
function SB(t0,t1,img,txt,c1,c2,o={}){punch(t0+.2,.06);shake(t0+.25,10);RAYW.push([t0,t1-.3]);PART({type:'sparks',t0:t0+.2,t1:t0+.4,n:70,seed:Math.floor(t0*10),x:540,y:o.y||760,speed:900,color:'#ffe9a8'});sfx(t0+.2,'boom',.8);sfx(t0+.25,'sparkle',.7);
  return A(Object.assign({t0,t1,x:540,y:760,w:1000,cls:'chipw',html:`<div class="sbadge" style="display:inline-flex;background:linear-gradient(180deg,${c1},${c2});box-shadow:0 30px 70px rgba(0,0,0,.55),inset 0 4px 0 rgba(255,255,255,.4),inset 0 -10px 0 rgba(0,0,0,.18);border:4px solid rgba(255,255,255,.75)"><img src="a/${img}"><b>${txt}</b></div>`,enter:'stamp',din:.35,sfx:'impact',sfxd:.18,float:.4,z:60},o))}
// month cells
function MONTHS(t0,t1,x,y,list,col,o={}){return A(Object.assign({t0,t1,x,y,w:1040,cls:'chipw',html:list.map(([m],i)=>`<span class="mon" data-i="${i}">${m}</span>`).join(''),enter:'up',din:.4,sfx:'whoosh',z:44,float:.3,
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.mon').forEach(s=>{const i=+s.dataset.i;const ts=list[i][1];const p=clamp((t-ts)/.3);s.classList.toggle('on',t>=ts);
    s.style.background=t>=ts?col:'';s.style.boxShadow=t>=ts?`0 0 30px ${col},0 12px 26px rgba(0,0,0,.4)`:'';s.style.transform=`scale(${t>=ts?1+Math.sin(p*Math.PI)*.22:1})`})}},o));}
// sun north/south indicator
function NS(t0,t1,x,y,keys,o={}){ // keys:[[t,pos]] pos: -1 north, 0 equator, 1 south
  const H=560;
  const it=A(Object.assign({t0,t1,x,y,w:330,cls:'glass dk',enter:'right',din:.5,sfx:'whoosh',z:47,float:.3,html:`<div style="position:relative;height:${H}px">
   <div style="position:absolute;left:0;right:0;top:10px;font:800 36px B;color:#ffd84d">उत्तर ▲</div>
   <div style="position:absolute;left:0;right:0;bottom:12px;font:800 36px B;color:#7fdcff">दक्षिण ▼</div>
   <div style="position:absolute;left:30px;right:30px;top:${H/2}px;border-top:4px dashed rgba(255,255,255,.7)"></div>
   <div style="position:absolute;right:16px;top:${H/2+6}px;font:700 22px B;color:rgba(255,255,255,.8)">विषुववृत्त</div>
   <div style="position:absolute;left:50%;top:70px;bottom:70px;width:6px;margin-left:-3px;border-radius:3px;background:linear-gradient(#ffd84d,#fff,#7fdcff);opacity:.5"></div>
   <img class="nsun" src="a/I1_sun.png" style="position:absolute;left:50%;width:150px;margin-left:-75px;filter:drop-shadow(0 0 30px #ffb300)"></div>`,
   draw:(t,lt,oo)=>{let v=0;for(let i=0;i<keys.length;i++){const [tt,p]=keys[i];if(t>=tt){const pv=i?keys[i-1][1]:0;v=lerp(pv,p,E.back(clamp((t-tt)/.7)))}}
     const s=oo.el.querySelector('.nsun');s.style.top=(H/2-75+v*(H/2-140))+'px';s.style.transform=`rotate(${t*40}deg)`}},o));
  keys.forEach(([tt])=>sfx(tt,'swoosh',.7));return it;}
// tilt angle widget
function ANGLE(t0,t1,x,y,cT,o={}){return A(Object.assign({t0,t1,x,y,w:480,cls:'glass dk',enter:'flip',din:.5,sfx:'whoosh',z:47,float:.3,html:`<div style="padding:18px 18px 22px">
  <svg viewBox="0 0 300 300" width="100%" style="overflow:visible"><line x1="150" y1="10" x2="150" y2="290" stroke="rgba(255,255,255,.7)" stroke-width="5" stroke-dasharray="12 10"/>
  <path class="arc" d="" fill="none" stroke="#ffd84d" stroke-width="8" stroke-linecap="round"/><g class="ax"><line x1="150" y1="0" x2="150" y2="300" stroke="#ffb300" stroke-width="10" stroke-linecap="round" filter="drop-shadow(0 0 10px #ffb300)"/>
  <circle cx="150" cy="150" r="64" fill="url(#eg)" stroke="#fff" stroke-width="4"/></g>
  <defs><radialGradient id="eg" cx=".35" cy=".35"><stop offset="0" stop-color="#7fd0ff"/><stop offset=".6" stop-color="#1e6fd9"/><stop offset="1" stop-color="#0b2a66"/></radialGradient></defs></svg>
  <div class="gold num" style="font:900 120px/1.05 B">0°</div><div style="font:800 34px B;color:#fff">कललेली पृथ्वी</div></div>`,
  draw:(t,lt,oo)=>{const p=E.out(clamp((t-cT)/1.0));const a=23.5*p;oo.el.querySelector('.ax').setAttribute('transform',`rotate(${a} 150 150)`);
    const r=110,a0=-90,a1=-90+a;const P=(d)=>[150+r*Math.cos(d*Math.PI/180),150+r*Math.sin(d*Math.PI/180)];const [x0,y0]=P(a0),[x1,y1]=P(a1);
    oo.el.querySelector('.arc').setAttribute('d',`M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`);oo.el.querySelector('.num').textContent=(Math.round(a*10)/10).toFixed(a>=23.45?1:1)+'°'}},o));}
// ---------- SATELLITE MAP ----------
const GP=(lo,la)=>[(lo-GEO.lo0)*GEO.s,(GEO.la1-la)*GEO.s];
const pt=(lo,la)=>GP(lo,la).map(v=>v.toFixed(1)).join(' ');
let MID=0;
function MAPIT(t0,t1,o){const id=MID++;const ov=o.ov||'';
  const html=`<div class="mapc" style="position:relative"><img src="a/map_in.jpg"><svg viewBox="0 0 ${GEO.W} ${GEO.H}">
  <defs><filter id="gw${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="gl${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect x="0" y="0" width="${GEO.W}" height="${GEO.H}" fill="rgba(5,10,30,.18)"/>
  <path d="${GEO.states}" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.6"/>
  <path d="${GEO.india}" fill="none" stroke="#fff" stroke-width="4" filter="url(#gl${id})"/>
  ${ov.replace(/GLOW/g,`url(#gl${id})`).replace(/BLUR/g,`url(#gw${id})`)}</svg></div>`;
  return A(Object.assign({t0,t1,x:540,y:960,w:1000,html,cls:'noshadow',enter:'zoom',din:.6,sfx:'whoosh',z:30,float:.15,draw:(t,lt,oo)=>MANIM(oo.el,t)},o));}
// overlay anim: data-a = draw|pop|fade|fill|flow|ring
function MANIM(root,t){root.querySelectorAll('[data-a]').forEach(g=>{const t0=+g.dataset.t0,t1=+(g.dataset.t1||9999),a=g.dataset.a,cx=+(g.dataset.cx||0),cy=+(g.dataset.cy||0),d=+(g.dataset.d||.6);
  const p=clamp((t-t0)/d);const out=clamp((t-t1)/.3);let op=(t<t0?0:1)*(1-out);
  if(a==='pop'){const s=t<t0?0:E.back2(p);g.setAttribute('transform',`translate(${cx},${cy}) scale(${s}) translate(${-cx},${-cy})`);op*=clamp(p*3)}
  else if(a==='draw'){const pth=g.querySelector('path');if(!g._L)g._L=pth.getTotalLength();const L=g._L;const q=E.inout(p);pth.style.strokeDasharray=L;pth.style.strokeDashoffset=L*(1-q);
    const hd=g.querySelector('.hd');if(hd){const l=Math.max(2,L*q);const A1=pth.getPointAtLength(l-2),B1=pth.getPointAtLength(l);hd.setAttribute('transform',`translate(${B1.x},${B1.y}) rotate(${Math.atan2(B1.y-A1.y,B1.x-A1.x)*180/Math.PI})`);hd.style.opacity=p>.03?1:0}
    g.querySelectorAll('.dot').forEach((c,i,arr)=>{if(p<1){c.style.opacity=0;return}const k=((t-t0-d)*(+g.dataset.sp||.45)+i/arr.length)%1;const P=pth.getPointAtLength(L*k);c.setAttribute('cx',P.x);c.setAttribute('cy',P.y);c.style.opacity=Math.sin(k*Math.PI)})}
  else if(a==='fill'){const k=E.out(p);g.style.opacity=op*k*(g.dataset.pulse?(.75+.25*Math.sin(t*6)):1)}
  else if(a==='ring'){const k=Math.max(0,(t-t0)%1.2)/1.2;g.querySelectorAll('circle').forEach(c=>c.setAttribute('r',20+k*110));op*=(1-k)}
  else if(a==='fade'){op*=E.out(p)}
  else if(a==='rise'||a==='fall'){const k=(((t-t0)*(+g.dataset.sp||.6)+(+g.dataset.ph||0))%1+1)%1;const dy=(+g.dataset.dy||150)*(a==='rise'?-k:k);g.setAttribute('transform',`translate(0,${dy})`);op*=Math.sin(k*Math.PI)*E.out(clamp((t-t0)/.4))}
  g.style.opacity=op});}
const MD=(t0,d,body,o={})=>`<g data-a="draw" data-t0="${t0}" data-d="${d}" data-t1="${o.t1||9999}" data-sp="${o.sp||.45}">${body}</g>`;
function WIND(t0,d,pathD,col,o={}){const w=o.w||26;return MD(t0,d,`<path d="${pathD}" fill="none" stroke="${col}" stroke-width="${w*2.2}" stroke-linecap="round" opacity=".35" filter="BLUR"/>
  <path d="${pathD}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" filter="GLOW"/><polygon class="hd" points="-10,-${w*1.6} ${w*2.4},0 -10,${w*1.6}" fill="${col}" filter="GLOW"/>
  ${Array.from({length:o.n||5},()=>`<circle class="dot" r="${w*.42}" fill="#fff"/>`).join('')}`,o);}
const MLBL=(x,y,txt,col,t0,fs=46,t1=9999)=>{const wd=segs(txt).length*fs*.6+fs*1.2;return `<g data-a="pop" data-t0="${t0}" data-t1="${t1}" data-cx="${x}" data-cy="${y}"><rect x="${x-wd/2}" y="${y-fs*.95}" width="${wd}" height="${fs*1.55}" rx="${fs*.77}" fill="${col}" stroke="#fff" stroke-width="5"/><text x="${x}" y="${y+fs*.22}" font-family="B" font-weight="800" font-size="${fs}" fill="#fff" text-anchor="middle">${txt}</text></g>`};
const MPIN=(x,y,t0,c='#e8191f',s=1.8)=>`<g data-a="pop" data-t0="${t0}" data-cx="${x}" data-cy="${y}"><g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="12" ry="5" fill="rgba(0,0,0,.4)"/><path d="M0 0 C-6 -14 -22 -26 -22 -42 C-22 -56 -12 -66 0 -66 C12 -66 22 -56 22 -42 C22 -26 6 -14 0 0Z" fill="${c}" stroke="#fff" stroke-width="4"/><circle cx="0" cy="-43" r="9" fill="#fff"/></g></g>
  <g data-a="ring" data-t0="${t0+.3}"><circle cx="${x}" cy="${y}" r="20" fill="none" stroke="${c}" stroke-width="8"/></g>`;
const FILL=(d,col,t0,o={})=>`<g data-a="fill" data-t0="${t0}" data-t1="${o.t1||9999}" data-d="${o.d||.4}" ${o.pulse?'data-pulse="1"':''}><path d="${d}" fill="${col}" opacity=".55" filter="BLUR"/><path d="${d}" fill="${col}" fill-opacity="${o.op||.6}" stroke="#fff" stroke-width="4"/></g>`;
// focus map on lon/lat
const FOC=(lo,la,z,Y=960,w=1000)=>{const [px,py]=GP(lo,la);const k=w/GEO.W*z;return {x:540-(px-GEO.W/2)*k,y:Y-(py-GEO.H/2)*k,s:z}};
// ---------- premium transitions (screen covered at t) ----------
function WARP(t){speedlines(t-.55,t+.45,'rgba(200,225,255,');flash(t,1,'#eaf4ff');punch(t,.14);sfx(t-.7,'riser',.8);sfx(t-.05,'whoosh',1);sfx(t,'boom',.6)}
function IRIS(t,col='#05081a'){A({t0:t-.38,t1:t+.42,x:540,y:960,w:1080,cls:'noshadow',html:`<div class="ir" style="width:1080px;height:1920px;background:${col}"></div><div class="irr" style="position:absolute;left:50%;top:50%;border-radius:50%;border:14px solid #ffd84d;box-shadow:0 0 60px #ffb300,inset 0 0 40px #ffb300"></div>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:600,
  draw:(tt,lt,oo)=>{const r=tt<t?lerp(1250,0,E.inout(clamp((tt-t+.38)/.38))):lerp(0,1250,E.inout(clamp((tt-t)/.42)));oo.el.querySelector('.ir').style.webkitMaskImage=`radial-gradient(circle at 50% 50%,transparent ${r}px,#000 ${r+2}px)`;
    const rr=oo.el.querySelector('.irr');rr.style.width=rr.style.height=(2*r)+'px';rr.style.marginLeft=rr.style.marginTop=(-r)+'px';rr.style.opacity=r>4?1:0}});sfx(t-.35,'whoosh',.9);sfx(t,'reveal',.8)}
function FLARE(t){A({t0:t-.5,t1:t+.5,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="width:2600px;height:2600px;margin:-340px 0 0 -760px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,240,1) 0%,rgba(255,210,120,.95) 18%,rgba(255,140,30,.7) 38%,rgba(255,90,0,0) 66%);mix-blend-mode:screen"></div>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:600,
  fn:(tt,lt)=>({dx:lerp(-1700,1700,E.inout(clamp(lt/1))),o:Math.sin(clamp(lt/1)*Math.PI)})});flash(t,1,'#fff3d6');punch(t,.08);sfx(t-.45,'whoosh',.9);sfx(t,'sparkle',.8)}
function CLOUDS(t){const R=rnd(Math.floor(t*100));let c='';for(let i=0;i<46;i++){const x=R()*1300-110,y=R()*2300+250,r=170+R()*260;c+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${R()<.3?'#dfe8f5':'#ffffff'}"/>`}
  A({t0:t-.6,t1:t+.6,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 2800" width="1080" style="overflow:visible;filter:blur(14px)"><rect x="-150" y="700" width="1380" height="1400" fill="#fff"/>${c}</svg>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:600,
  fn:(tt,lt)=>({dy:lerp(2500,-2700,E.inout(clamp(lt/1.2)))})});sfx(t-.5,'whoosh',1);sfx(t-.2,'wind',.8)}
function FROST(t){const R=rnd(77);let s='';for(let i=0;i<26;i++){const a0=i/26*Math.PI*2,a1=a0+Math.PI*2/26*(1.15+R()*.3);s+=`<polygon points="0,0 ${Math.cos(a0)*1500},${Math.sin(a0)*1500} ${Math.cos(a1)*1500},${Math.sin(a1)*1500}" fill="${['#ffffff','#dff4ff','#b9e6ff','#eefaff'][i%4]}"/>`}
  A({t0:t-.45,t1:t+.5,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="-540 -960 1080 1920" width="1080" height="1920" style="overflow:visible">${s}</svg>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:600,
  fn:(tt,lt)=>{const a=lt<.45?E.inout(lt/.45):1;const o=lt<.45?1:1-E.inout(clamp((lt-.45)/.5));return {s:lerp(.02,1,a)*(1+(lt>.45?(lt-.45)*.8:0)),r:lerp(-60,0,a)+(lt>.45?(lt-.45)*40:0),o}}});sfx(t-.4,'whoosh',.9);sfx(t,'sparkle',1);flash(t,.5,'#e8f7ff')}
function SLICE(t,cols=['#ff4d6d','#ffd84d','#3d8bff','#ffffff']){for(let i=0;i<5;i++){const col=cols[i%cols.length];const d=i*.05;
  A({t0:t-.5+d,t1:t+.5+d,x:540,y:-60+i*510,w:3200,cls:'noshadow',html:`<div style="height:560px;background:${col};box-shadow:0 0 50px rgba(0,0,0,.4)"></div>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:600+i,rot:-12,
   fn:(tt,lt)=>({dx:lerp(i%2?3300:-3300,i%2?-3300:3300,E.inout(clamp(lt/1)))})})}sfx(t-.4,'swoosh',1);sfx(t-.1,'whoosh',.9);sfx(t+.05,'impact',.6)}
function PAPER(t,c1='#fff3dc',c2='#ff8a00'){
  const mk=(col,seed,tex)=>{const R=rnd(seed);let top=[],bot=[];for(let x=-40;x<=1120;x+=26){top.push(`${x},${-60+R()*70}`);bot.push(`${x},${2660+R()*70}`)}
    const fib=tex?Array.from({length:60},()=>`<path d="M${R()*1080} ${R()*2600} q${(R()-.5)*60} ${R()*40} ${(R()-.5)*120} ${R()*30}" stroke="rgba(120,90,50,.18)" stroke-width="${1+R()*2}" fill="none"/>`).join(''):'';
    return `<svg viewBox="0 -100 1080 2900" width="1080" style="overflow:visible;filter:drop-shadow(0 -18px 24px rgba(0,0,0,.45)) drop-shadow(0 18px 24px rgba(0,0,0,.45))"><polygon points="${top.join(' ')} ${bot.reverse().join(' ')}" fill="${col}"/>${fib}</svg>`};
  [[0,c2,0,0],[1,c1,.08,1]].forEach(([k,col,d,tex])=>A({t0:t-.45+d,t1:t+.45+d,x:540,y:960,w:1080,html:mk(col,Math.floor(t*100)+k,tex),enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:600+k,cls:'noshadow',
      fn:(tt,lt)=>({dy:lerp(2500,-2500,E.inout(clamp(lt/.9))),r:lerp(-4,3,clamp(lt/.9))})}));
  sfx(t-.45,'paper',1);sfx(t-.35,'whoosh',.7);
}
const RAYW=[];


const CV=(t0,t1,z,fn,o={})=>A(Object.assign({t0,t1,x:540,y:960,w:1080,html:'<canvas width="1080" height="1920" style="display:block;position:relative"></canvas>',cls:'noshadow',enter:'fade',din:.4,exit:'fade',dout:.4,float:0,z,
  draw:(t,lt,oo)=>{const c=oo.cv||(oo.cv=oo.el.querySelector('canvas').getContext('2d'));c.clearRect(0,0,1080,1920);fn(c,t,lt)}},o));
const KF=(t,ks,ease='inout')=>{if(t<=ks[0][0])return ks[0][1];for(let i=1;i<ks.length;i++){if(t<=ks[i][0]){const [a,va_]=ks[i-1],[b,vb]=ks[i];return lerp(va_,vb,E[ease](clamp((t-a)/(b-a))))}}return ks[ks.length-1][1]};
// big side-view globe with sun rays from left
function SIDE(t0,t1,o){return CV(t0,t1,o.z||30,(c,t)=>{performance_t=t;
  let {A,S}=sideGeo(o.phi(t),o.beta===undefined?35:o.beta);if(o.S)S=vn(o.S);const k=o.up?o.up(t):0;if(k>0)A=vn(va(vs(A,1-k),vs([0,1,0],k)));
  const F=vn(va(vs(vn([S[0]*.6,0,1]),1-k),vs([0,0,1],k)));const fr=gFrame(A,(o.lon||80)+(o.spin?o.spin(t):0),F);
  let R=o.R,cx=o.cx,cy=o.cy;const z=o.zoom?o.zoom(t):0;
  if(z>0){R=o.R*Math.pow((o.zR||1700)/o.R,z);const P=gPoint(fr,22,80);cx=lerp(o.cx,540-R*P[0],E.out(Math.min(1,z*1.6)));cy=lerp(o.cy,880+R*P[1],E.out(Math.min(1,z*1.6)))}
  // sun at left
  if(o.sun!==false&&z<.5){const sa=clamp((t-t0)/.5)*(1-z*2);const sy=cy-R*S[1];const g=c.createRadialGradient(-40,sy,40,-40,sy,520);g.addColorStop(0,`rgba(255,240,190,${.95*sa})`);g.addColorStop(.35,`rgba(255,170,40,${.5*sa})`);g.addColorStop(1,'rgba(255,120,0,0)');c.fillStyle=g;c.fillRect(0,sy-560,600,1120);
    c.globalAlpha=sa;c.drawImage(GL_.sun,-230,sy-190,380,375);c.globalAlpha=1}
  gAxis(c,cx,cy,R,fr,'#ffc94d',1.3,false);
  drawGlobe(c,cx,cy,R,fr,S,{hot:o.hot?o.hot(t):0,cool:o.cool?o.cool(t):0,night:.16});
  if(z<.6){const la=1-z/.6;
   const L=(lat,col,ta,txt,w=6,dash,pc)=>{if(ta===undefined||t<ta)return;const a=clamp((t-ta)/.5)*la;const hl=o.hl&&o.hl(t)===lat?1:0;
     const b=gLat(c,cx,cy,R,fr,lat,col,w+hl*5,{alpha:a,glow:hl?30:10,dash});if(b&&txt){c.save();c.globalAlpha=a;c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.moveTo(b[0]+6,b[1]);c.lineTo(o.lx||830,b[1]);c.stroke();c.restore();cPill(c,o.lx||830,b[1],txt,pc||col,hl?38:32,{align:'l',alpha:a})}};
   const ln=o.lines||{};L(0,'#ffffff',ln.eq,'विषुववृत्त 0°',5,[14,10],'#455a64');L(23.44,'#ff4d6d',ln.cn,'कर्कवृत्त 23.5°',6);L(-23.44,'#29b6f6',ln.cp,'मकरवृत्त 23.5°',6);
   if(o.india&&t>o.india){const P=gPoint(fr,22,79);if(P[2]>0){const [x,y]=gProj(cx,cy,R,P);const a=clamp((t-o.india)/.4)*la;c.save();c.globalAlpha=a;c.fillStyle='#ff9933';c.strokeStyle='#fff';c.lineWidth=4;c.beginPath();c.arc(x,y,14,0,7);c.fill();c.stroke();c.restore();cPill(c,x,y-48,'भारत','#e8590c',30,{alpha:a})}}
   gAxis(c,cx,cy,R,fr,'#ffc94d',1.3,true);
   if(o.rays&&t>o.rays){gRays(c,cx,cy,R,fr,S,{p:E.out(clamp((t-o.rays)/.7)),n:9,main:o.main!==false})}
   if(o.beams&&t>o.beams){const p=E.out(clamp((t-o.beams)/.6));const m1=gBeam(c,cx,cy,R,fr,S,-.08,.08,'#ff3d00',{p});const m2=gBeam(c,cx,cy,R,fr,S,.74,.90,'#29b6f6',{p});
}
  }
  if(o.after)o.after(c,t,{cx,cy,R,fr,S});
 },{din:o.din||.4,dout:o.dout||.4,enter:o.enter||'fade'})}
// orbit view
function orbitGeo(th,o){const t=23.44*D2R,e=o.e*D2R;const X=o.Ro*Math.cos(th*D2R),Z=-o.Ro*Math.sin(th*D2R);
  const Aw=[Math.sin(t),Math.cos(t),0];const Av=[Aw[0],Aw[1]*Math.cos(e)-Aw[2]*Math.sin(e),Aw[1]*Math.sin(e)+Aw[2]*Math.cos(e)];
  let Sw=vn([o.sx-X,0,-Z]);const Sv=[Sw[0],-Sw[2]*Math.sin(e),Sw[2]*Math.cos(e)];
  return {x:o.cx+X,y:o.cy+(-Z)*Math.sin(e)*-1,z:Z,A:Av,S:Sv}}
const MONTHTH=th=>{const m=['22 डिसेंबर','जानेवारी','फेब्रुवारी','21 मार्च','एप्रिल','मे','21 जून','जुलै','ऑगस्ट','23 सप्टेंबर','ऑक्टोबर','नोव्हेंबर'];const i=Math.round((((th%360)+360)%360)/30)%12;return m[i]};
function ORBIT(t0,t1,o){return CV(t0,t1,o.z||28,(c,t)=>{performance_t=t;const ap=clamp((t-t0)/.6);
  const th=o.theta(t);const g=orbitGeo(th,o);const ry=o.Ro*Math.sin(o.e*D2R);
  // orbit ring
  c.save();c.globalAlpha=ap;c.strokeStyle='rgba(255,214,90,.9)';c.lineWidth=6;c.shadowColor='#ffb300';c.shadowBlur=20;c.beginPath();c.ellipse(o.cx,o.cy,o.Ro,ry,0,0,7);c.stroke();
  if(o.trail){const a0=o.trail[0],a1=th;c.strokeStyle='#fff3c0';c.lineWidth=12;c.beginPath();for(let i=0;i<=60;i++){const a=(a0+(a1-a0)*i/60)*D2R;const x=o.cx+o.Ro*Math.cos(a),y=o.cy-o.Ro*Math.sin(a)*Math.sin(o.e*D2R);i?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}
  c.restore();
  // month markers
  if(o.marks&&t>o.marks){[[0,'22 डिसें'],[90,'21 मार्च'],[180,'21 जून'],[270,'23 सप्टें']].forEach(([a,s],i)=>{const al=clamp((t-o.marks-i*.15)/.4)*ap;const x=o.cx+o.Ro*Math.cos(a*D2R),y=o.cy-Math.sin(a*D2R)*ry;const dx=0,dy=a===270?95:-80;cPill(c,x+dx,y+dy,s,'rgba(20,24,48,.85)',30,{alpha:al})})}
  const drawSun=()=>{const sx=o.cx+o.sx,sy=o.cy;const gg=c.createRadialGradient(sx,sy,30,sx,sy,o.sun*1.4);gg.addColorStop(0,'rgba(255,240,190,.9)');gg.addColorStop(.4,'rgba(255,160,40,.45)');gg.addColorStop(1,'rgba(255,120,0,0)');c.globalAlpha=ap;c.fillStyle=gg;c.fillRect(sx-o.sun*1.5,sy-o.sun*1.5,o.sun*3,o.sun*3);
    c.save();c.translate(sx,sy);c.rotate(t*.15);c.drawImage(GL_.sun,-o.sun/2,-o.sun/2,o.sun,o.sun*.98);c.restore();c.globalAlpha=1};
  const eR=o.eR(t);const ex=g.x,ey=o.cy+g.z*Math.sin(o.e*D2R)*-1*-1;
  const drawE=()=>{const fr=gFrame(g.A,80+t*25,[0,0,1]);gAxis(c,ex,ey,eR,fr,'#ffc94d',1.45,false);drawGlobe(c,ex,ey,eR,fr,g.S,{night:.38,alpha:ap,cool:o.cool?o.cool(t):0});gAxis(c,ex,ey,eR,fr,'#ffc94d',1.45,true);
    if(o.india&&t>o.india){const P=gPoint(fr,22,79);if(P[2]>0){const [x,y]=gProj(ex,ey,eR,P);c.fillStyle='#ff9933';c.strokeStyle='#fff';c.lineWidth=3;c.beginPath();c.arc(x,y,Math.max(6,eR*.09),0,7);c.fill();c.stroke()}}};
  if(g.z<0){drawE();drawSun()}else{drawSun();drawE()}
  if(o.after)o.after(c,t,{ex,ey,eR,th,g});
 },{din:o.din||.5})}
// mini orbit inset (season position)
function MINI(t0,t1,thf,x=175,y=470){return A({t0,t1,x,y,w:300,cls:'glass dk',html:'<canvas width="300" height="190" style="display:block;position:relative"></canvas>',enter:'left',din:.5,sfx:'swoosh',z:58,float:.2,
  draw:(t,lt,oo)=>{const c=oo.cv||(oo.cv=oo.el.querySelector('canvas').getContext('2d'));c.clearRect(0,0,300,190);const th=thf(t);
    c.strokeStyle='rgba(255,214,90,.8)';c.lineWidth=3;c.beginPath();c.ellipse(150,88,118,48,0,0,7);c.stroke();
    c.drawImage(GL_.sun,128,66,44,43);const x=150+118*Math.cos(th*D2R),y=88-48*Math.sin(th*D2R);
    c.fillStyle='#4fc3ff';c.strokeStyle='#fff';c.lineWidth=3;c.beginPath();c.arc(x,y,13,0,7);c.fill();c.stroke();
    c.strokeStyle='#ffc94d';c.lineWidth=3;c.beginPath();c.moveTo(x-9,y+20);c.lineTo(x+9,y-20);c.stroke();
    c.font='800 26px B';c.fillStyle='#fff';c.textAlign='center';c.fillText(MONTHTH(th),150,176)}})}

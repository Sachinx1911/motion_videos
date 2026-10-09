// ================= helpers =================
const IMG=(t0,t1,img,x,y,w,o={})=>A(Object.assign({t0,t1,img,x,y,w},o));
const CHIP=(t0,t1,txt,x,y,c='c-gold',o={})=>A(Object.assign({t0,t1,x,y,w:1040,cls:'chipw',html:`<span class="chip ${c}" style="${o.st||''}">${txt}</span>`,enter:'pop',din:.4,sfx:'pop',float:.35,z:40},o));
function STAMP(t0,t1,txt,x,y,o={}){shake(t0+.22,16);punch(t0+.2,.04);return A(Object.assign({t0,t1,x,y,w:1040,cls:'chipw',html:`<span class="stampx ${o.g?'g':''}" style="${o.st||''}">${txt}</span>`,enter:'stamp',din:.26,sfx:'stamp',sfxd:.2,rot:-6,float:0,z:60},o))}
const WG=(t0,t1,x,y,w,inner,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'wg',html:`${o.acc?'<div class="acc"></div>':''}<div style="padding:${o.pad||'28px 34px'};text-align:center">${inner}</div>`,enter:'up',sfx:'whoosh',z:35,float:.4},o));
function YEAR(t0,t1,list,o={}){punch(t0+.2,.05);const fs=o.fs||150;return A(Object.assign({t0,t1,x:540,y:520,w:520,cls:'glass dk yc',enter:'stamp',din:.32,sfx:'impact',sfxd:.18,html:'',float:.5,z:30,
  texts:list.map(([t,y,l])=>[t,`<div class="lab">${l||'वर्ष'}</div><div class="num gold" style="font-size:${fs}px;line-height:1.08">${y}</div>`]),shine:[t0+.35,...list.slice(1).map(l=>l[0]+.1)]},o))}
const PIN=`<svg viewBox="0 0 40 52" width="34" style="vertical-align:-6px;margin-right:10px"><path d="M20 2C10 2 3 9 3 19c0 13 17 31 17 31s17-18 17-31C37 9 30 2 20 2z" fill="#fff"/><circle cx="20" cy="19" r="7" fill="#e8590c"/></svg>`;
const SVGX=`<svg viewBox="0 0 200 200" width="100%"><g stroke="#ff1f3d" stroke-width="26" stroke-linecap="round" filter="drop-shadow(0 8px 10px rgba(0,0,0,.5))"><line x1="30" y1="30" x2="170" y2="170"/><line x1="170" y1="30" x2="30" y2="170"/></g></svg>`;
const HAND=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;
const CHECK=`<svg viewBox="0 0 100 100" width="100%"><circle cx="50" cy="50" r="46" fill="#22b14c" stroke="#fff" stroke-width="7"/><path d="M28 52 L44 67 L73 36" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ALERT=`<svg viewBox="0 0 100 100" width="100%"><circle cx="50" cy="50" r="46" fill="#ff3b3b" stroke="#fff" stroke-width="7"/><rect x="44" y="20" width="12" height="40" rx="6" fill="#fff"/><circle cx="50" cy="74" r="7" fill="#fff"/></svg>`;
const segs=s=>[...new Intl.Segmenter('mr',{granularity:'grapheme'}).segment(s)].map(x=>x.segment);

// brush-stroke wipe transition (covers screen at t+.4)
function TR(t,c1='#ff8a00',c2='#fff4e0'){
  const mk=(col,seed)=>{const R=rnd(seed);let L=[],Rr=[];for(let y=-100;y<=2900;y+=60){L.push(`${R()*120},${y}`);Rr.push(`${2400-R()*120},${y}`)}
    let streaks='';for(let i=0;i<14;i++){const y=R()*2800;streaks+=`<rect x="${-200-R()*300}" y="${y}" width="${2800+R()*400}" height="${6+R()*16}" rx="8" fill="${col}" opacity="${.35+R()*.4}"/>`}
    return `<svg viewBox="0 -100 2400 3000" width="2400" style="overflow:visible"><polygon points="${L.join(' ')} ${Rr.reverse().join(' ')}" fill="${col}"/>${streaks}</svg>`};
  for(const [k,col,d] of [[0,c1,0],[1,c2,.07]]){
    A({t0:t+d,t1:t+d+.85,x:540,y:960,w:2400,html:mk(col,Math.floor(t*100)+k),enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:500,cls:'noshadow',
      fn:(tt,lt)=>({dx:lerp(-2700,2700,E.inout(clamp(lt/.85))),r:-14})});
  }
  sfx(t,'brush',1);sfx(t+.05,'whoosh',.7);
}
// ---------- maps ----------
let MAPN=0;
function mapSVG(ov,o={}){const id=MAPN++;return `<svg viewBox="0 0 1000 1114" width="100%" style="overflow:visible;display:block">
<defs><filter id="mg${id}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10"/></filter>
<filter id="gw${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
<linearGradient id="ig${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#efe4d0"/></linearGradient></defs>
${o.noshadow?'':`<path d="${MAP.india}" fill="rgba(0,0,0,.45)" transform="translate(8,18)" filter="url(#mg${id})"/>`}
<path d="${MAP.india}" fill="url(#ig${id})" stroke="#fff" stroke-width="4"/>
<path d="${MAP.states}" fill="none" stroke="#c9bda8" stroke-width="1.6"/>
<path class="mahg" d="${MAP.mah}" fill="#ff8a00" opacity="0" filter="url(#gw${id})"/>
<path class="mah" d="${MAP.mah}" fill="#ff9933" fill-opacity="0" stroke="#d9480f" stroke-width="3.5" stroke-opacity="0"/>
<path class="karg" d="${MAP.kar}" fill="#ffc107" opacity="0" filter="url(#gw${id})"/>
<path class="kar" d="${MAP.kar}" fill="#ffc107" fill-opacity="0" stroke="#b36b00" stroke-width="3.5" stroke-opacity="0"/>
${ov||''}</svg>`}
// overlay animation: <g data-a="pop|drop|draw|fade" data-t0 data-t1 data-cx data-cy>
function animOv(root,t){root.querySelectorAll('[data-a]').forEach(g=>{const t0=+g.dataset.t0,t1=+(g.dataset.t1||9999),a=g.dataset.a,cx=+(g.dataset.cx||0),cy=+(g.dataset.cy||0);
  const p=clamp((t-t0)/(+(g.dataset.d||.5)));const out=clamp((t-t1)/.25);let op=(t<t0?0:1)*(1-out);
  if(a==='pop'){const s=t<t0?0:lerp(0,1,E.back2(p))*(1-out*.6);g.setAttribute('transform',`translate(${cx},${cy}) scale(${s}) translate(${-cx},${-cy})`)}
  else if(a==='drop'){const dy=lerp(-260,0,E.bounce(p));g.setAttribute('transform',`translate(0,${dy})`)}
  else if(a==='draw'){const pth=g.querySelector('path');const L=pth.getTotalLength();pth.style.strokeDasharray=L;pth.style.strokeDashoffset=L*(1-E.out(p));
    const hd=g.querySelector('.hd');if(hd){const q=Math.max(1,L*E.out(p));const A1=pth.getPointAtLength(q-1),B1=pth.getPointAtLength(q);hd.setAttribute('transform',`translate(${B1.x},${B1.y}) rotate(${Math.atan2(B1.y-A1.y,B1.x-A1.x)*180/Math.PI})`);hd.style.opacity=p>.05?1:0}}
  else if(a==='ring'){const k=Math.max(0,(t-t0)%1.1)/1.1;const r=20+k*90;g.querySelectorAll('circle').forEach(c=>c.setAttribute('r',r));op*=(1-k)*(t<t0?0:1)}
  else if(a==='fade'){op*=p}
  g.style.opacity=op});}
function stateLight(root,cls,t0,t1=9999,dim=0){const p=clamp((t0===null?0:1)*(0));}
function setState(root,cls,t,t0,t1=9999){const p=E.out(clamp((t-t0)/.5))*(1-clamp((t-t1)/.4));const el=root.querySelector('.'+cls),g=root.querySelector('.'+cls+'g');
  el.setAttribute('fill-opacity',p*.95);el.setAttribute('stroke-opacity',p);g.setAttribute('opacity',p*(.55+.25*Math.sin(t*5)))}
// small map card with a pin
function MAPCARD(t0,t1,x,y,w,place,label,o={}){const [px,py]=MAP[place];
  const ov=`<g data-a="ring" data-t0="${t0+.7}"><circle cx="${px}" cy="${py}" r="20" fill="none" stroke="#e8191f" stroke-width="7"/></g><g data-a="drop" data-t0="${t0+.35}" data-d=".7">${MPIN(px,py,1.6)}</g>`;
  return A(Object.assign({t0,t1,x,y,w,cls:'glass dk',html:`<div style="padding:22px 22px 14px">${mapSVG(ov,{noshadow:1})}<div style="font:800 34px/1.3 B;color:#fff;margin-top:8px;white-space:nowrap">${PIN}${label}</div></div>`,enter:'flip',din:.55,sfx:'whoosh',z:42,float:.4,
    draw:(t,lt,oo)=>{animOv(oo.el,t);if(o.state)setState(oo.el,o.state,t,t0+.3)}},o));
}
// carved inscription reveal
function CARVE(t0,t1,txt,x,y,c0,c1,glowT,o={}){const g=segs(txt);const n=g.filter(s=>s.trim()).length;let k=0;
  const html=`<div class="plaque" style="${o.pst||''}"><span class="carve" style="font-size:${o.fs||92}px">${g.map(s=>s.trim()?`<span class="gs" data-k="${k++}">${s}</span>`:'<span> </span>').join('')}</span></div>`;
  const it=A(Object.assign({t0,t1,x,y,w:o.w||900,html,enter:'zoom',din:.35,sfx:'thud',z:50,float:.2,
    draw:(t,lt,oo)=>{oo.el.querySelectorAll('.gs').forEach(s=>{const i=+s.dataset.k;const ts=c0+(c1-c0)*i/Math.max(1,n-1);const p=clamp((t-ts)/.18);s.style.opacity=p;s.style.display='inline-block';s.style.transform=`scale(${lerp(1.6,1,E.out(p))})`;s.style.filter=p<1?`blur(${(1-p)*6}px)`:''});
      oo.el.querySelector('.carve').classList.toggle('glow',t>=glowT)}},o));
  const W=(o.w||900)*.78;for(let i=0;i<n;i++){const ts=c0+(c1-c0)*i/Math.max(1,n-1);const sx=x-W/2+W*(i+.5)/n;
    PART({type:'sparks',t0:ts,t1:ts+.12,n:16,seed:Math.floor(ts*100),x:sx,y:y,speed:420,life:.9,color:'#ffe08a'});sfx(ts,'chisel',.55)}
  if(glowT<t1){flash(glowT,.45,'#ffe9a8');shake(glowT,14);punch(glowT,.05);sfx(glowT,'boom',.8);sfx(glowT+.05,'sparkle',.7);PART({type:'sparks',t0:glowT,t1:glowT+.3,n:70,seed:7,x,y,speed:800,color:'#ffd54f'})}
  return it;
}
const BOY=(t0,t1,img,x,y,w,o={})=>IMG(t0,t1,img,x,y,w,Object.assign({enter:'rise',sfx:'swoosh',z:45,float:.6},o));

const LBL=(x,y,txt,t0,col='#1d2140',fs=40,t1=9999)=>{const wd=Math.max(2,segs(txt).length)*fs*0.62+fs*0.9;return `<g data-a="pop" data-t0="${t0}" data-t1="${t1}" data-cx="${x}" data-cy="${y}"><rect x="${x-wd/2}" y="${y-fs*0.95}" width="${wd}" height="${fs*1.5}" rx="${fs*0.75}" fill="${col}" stroke="#fff" stroke-width="4"/><text x="${x}" y="${y+fs*0.2}" font-family="B" font-weight="800" font-size="${fs}" fill="#fff" text-anchor="middle">${txt}</text></g>`};
const MPIN=(x,y,s=1,c='#e8191f')=>`<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="12" ry="5" fill="rgba(0,0,0,.35)"/><path d="M0 0 C-6 -14 -22 -26 -22 -42 C-22 -56 -12 -66 0 -66 C12 -66 22 -56 22 -42 C22 -26 6 -14 0 0Z" fill="${c}" stroke="#fff" stroke-width="4"/><circle cx="0" cy="-43" r="9" fill="#fff"/></g>`;
// ---------- paper-cut transition ----------
function PAPER(t,c1='#fff3dc',c2='#ff8a00'){
  const mk=(col,seed,tex)=>{const R=rnd(seed);let top=[],bot=[];for(let x=-40;x<=1120;x+=26){top.push(`${x},${-60+R()*70}`);bot.push(`${x},${2660+R()*70}`)}
    const fib=tex?Array.from({length:60},()=>`<path d="M${R()*1080} ${R()*2600} q${(R()-.5)*60} ${R()*40} ${(R()-.5)*120} ${R()*30}" stroke="rgba(120,90,50,.18)" stroke-width="${1+R()*2}" fill="none"/>`).join(''):'';
    return `<svg viewBox="0 -100 1080 2900" width="1080" style="overflow:visible;filter:drop-shadow(0 -18px 24px rgba(0,0,0,.45)) drop-shadow(0 18px 24px rgba(0,0,0,.45))"><polygon points="${top.join(' ')} ${bot.reverse().join(' ')}" fill="${col}"/>${fib}</svg>`};
  [[0,c2,0,0],[1,c1,.08,1]].forEach(([k,col,d,tex])=>A({t0:t+d,t1:t+d+.9,x:540,y:960,w:1080,html:mk(col,Math.floor(t*100)+k,tex),enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:500+k,cls:'noshadow',
      fn:(tt,lt)=>({dy:lerp(2500,-2500,E.inout(clamp(lt/.9))),r:lerp(-4,3,clamp(lt/.9))})}));
  sfx(t,'paper',1);sfx(t+.1,'whoosh',.7);
}
// ---------- Maharashtra satellite map ----------
const MR={Ratnagiri:'रत्नागिरी',Sindhudurg:'सिंधुदुर्ग',Aurangabad:'औरंगाबाद',Jalna:'जालना',Osmanabad:'उस्मानाबाद',Latur:'लातूर',Chandrapur:'चंद्रपूर',Gadchiroli:'गडचिरोली',Akola:'अकोला',Washim:'वाशिम',Dhule:'धुळे',Nandurbar:'नंदुरबार',Parbhani:'परभणी',Hingoli:'हिंगोली',Bhandara:'भंडारा',Gondia:'गोंदिया',Thane:'ठाणे',Palghar:'पालघर',Mumbai:'मुंबई'};
const PAL=['#ff8a65','#ffb74d','#ffd54f','#aed581','#4db6ac','#4fc3f7','#7986cb','#ba68c8','#f06292','#a1887f','#90a4ae','#dce775'];
const DCOL={};Object.keys(MH.dist).forEach((n,i)=>DCOL[n]=PAL[(i*5)%PAL.length]);
const CHILD={};MH.pairs.forEach(([p,c])=>CHILD[c]=p);
let MHN=0;
function MHSVG(inner){const id=MHN++;return `<div style="position:relative;width:100%;aspect-ratio:${MH.W}/${MH.H};border-radius:34px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.6),0 0 0 4px rgba(255,255,255,.55)">
 <img src="a/map_mh.jpg" style="position:absolute;inset:0;width:100%;height:100%">
 <svg viewBox="0 0 ${MH.W} ${MH.H}" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible"><defs><filter id="gl${id}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter></defs>
 <rect class="dim" x="0" y="0" width="${MH.W}" height="${MH.H}" fill="#0a0d1a" opacity="0"/>${inner.replace(/GLID/g,'gl'+id)}</svg></div>`}
// region map (Bombay state / Nagpur / 1956 / Gujarat)
function MHREG(t0,t1,draw,ov='',o={}){
  const inner=`<path class="guj" d="${MH.guj}" fill="#26a69a" fill-opacity="0" stroke="#fff" stroke-width="3" stroke-opacity="0"/>
   <g class="rw"><path d="${MH.west}" fill="#26a69a" fill-opacity="0" stroke="#fff" stroke-width="3" stroke-opacity="0"/></g>
   <g class="rv"><path d="${MH.vid}" fill="#26a69a" fill-opacity="0" stroke="#fff" stroke-width="3" stroke-opacity="0"/></g>
   <g class="rm"><path d="${MH.mar}" fill="#26a69a" fill-opacity="0" stroke="#fff" stroke-width="3" stroke-opacity="0"/></g>
   <g class="mum"><path d="${MH.dist.Mumbai}" fill="#e53935" fill-opacity="0" stroke="#fff" stroke-width="3" stroke-opacity="0"/></g>
   <path class="glo" d="${MH.mah}" fill="none" stroke="#ffb300" stroke-width="16" opacity="0" filter="url(#GLID)"/>
   <path class="gloG" d="${MH.guj}" fill="none" stroke="#ffe082" stroke-width="16" opacity="0" filter="url(#GLID)"/>${ov}`;
  return A(Object.assign({t0,t1,x:540,y:1000,w:1080,html:MHSVG(inner),enter:'zoom',din:.5,float:0,z:20,cls:'noshadow',
    draw:(t,lt,oo)=>{const r=oo.el;const S=(sel,f,fo,so,tr)=>{const g=r.querySelector(sel);const p=g.tagName==='g'?g.querySelector('path'):g;if(f)p.setAttribute('fill',f);if(fo!=null)p.setAttribute('fill-opacity',fo);if(so!=null)p.setAttribute('stroke-opacity',so);if(tr!=null)g.setAttribute('transform',tr)};
      draw(t,S,r);animOv(r,t)}},o));
}
// district map
function MHDIST(t0,t1,splits,mumT,o={}){
  let h='';for(const [n,d] of Object.entries(MH.dist)){h+=`<path class="d d_${n}" d="${d}" fill="${DCOL[n]}" fill-opacity=".5" stroke="#fff" stroke-width="2.4"/>`}
  for(const [p,d] of Object.entries(MH.union)){h+=`<path class="u u_${p}" d="${d}" fill="${DCOL[p]}" fill-opacity=".5" stroke="#fff" stroke-width="2.4"/>`}
  for(const [p,c] of MH.pairs){const [x,y]=MH.cent[c];h+=`<g class="hl hl_${c}" opacity="0"><path d="${MH.dist[c]}" fill="#ffd54f" stroke="#fff" stroke-width="6" filter="url(#GLID)"/><path d="${MH.dist[c]}" fill="#ffca28" fill-opacity=".9" stroke="#fff" stroke-width="4"/></g>`}
  h+=`<g class="hl hl_Mumbai" opacity="0"><path d="${MH.dist.Mumbai}" fill="#ffca28" stroke="#fff" stroke-width="6" filter="url(#GLID)"/></g>`;
  h+=`<path d="${MH.mah}" fill="none" stroke="#fff" stroke-width="5"/>`;
  if(o.labels!==false){for(const [p,c] of MH.pairs){const [x,y]=MH.cent[c];h+=`<g class="lb lb_${c}" opacity="0">${LBLs(x,y,MR[c],'#1d2140',34)}</g>`}
    const [mx,my]=MH.cent.Mumbai;h+=`<g class="lb lb_Mumbai" opacity="0">${LBLs(mx-95,my+10,'मुंबई उपनगर','#1d2140',30)}</g>`}
  return A(Object.assign({t0,t1,x:540,y:1000,w:1080,html:MHSVG(h),enter:'zoom',din:.5,float:0,z:20,cls:'noshadow',
    draw:(t,lt,oo)=>{const r=oo.el;
      for(const [p,c] of MH.pairs){const T=splits[c]??1e9;const q=clamp((t-T)/.35);
        r.querySelector('.u_'+p).style.opacity=1-q;r.querySelector('.d_'+p).style.opacity=q;r.querySelector('.d_'+c).style.opacity=q;
        const hl=r.querySelector('.hl_'+c);const hq=t<T?0:Math.min(clamp((t-T)/.2),1-clamp((t-T-1.3)/.8)*.75);hl.setAttribute('opacity',hq);
        const lb=r.querySelector('.lb_'+c);if(lb){const lq=t<T?0:E.back(clamp((t-T-.1)/.35));lb.setAttribute('opacity',clamp(lq));lb.setAttribute('transform',`translate(${MH.cent[c][0]},${MH.cent[c][1]}) scale(${lq}) translate(${-MH.cent[c][0]},${-MH.cent[c][1]})`)}}
      const hm=r.querySelector('.hl_Mumbai');hm.setAttribute('opacity',t<mumT?0:Math.min(clamp((t-mumT)/.2),1-clamp((t-mumT-1.3)/.8)*.75));
      const lm=r.querySelector('.lb_Mumbai');if(lm)lm.setAttribute('opacity',t<mumT?0:clamp((t-mumT-.1)/.3));}},o));
}
const LBLs=(x,y,txt,col,fs)=>{const wd=Math.max(2,segs(txt).length)*fs*0.62+fs*0.9;return `<rect x="${x-wd/2}" y="${y-fs*0.95}" width="${wd}" height="${fs*1.5}" rx="${fs*0.75}" fill="${col}" stroke="#fff" stroke-width="3"/><text x="${x}" y="${y+fs*0.2}" font-family="B" font-weight="800" font-size="${fs}" fill="#fff" text-anchor="middle">${txt}</text>`};
// icon card: image icon + text
const ICARD=(t0,t1,x,y,w,img,html,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'wg',html:`<div style="display:flex;align-items:center;gap:22px;padding:${o.pad||'20px 26px'};text-align:left"><img src="a/${img}" style="width:${o.iw||130}px;flex:none;filter:drop-shadow(0 10px 14px rgba(0,0,0,.3))"><div style="flex:1">${html}</div></div>`,enter:o.enter||'up',din:.45,sfx:o.sfx===undefined?'whoosh':o.sfx,z:o.z||42,float:.35},o.x2||{}));
const CAL=(t0,t1,x,y,w,d,m,yy,o={})=>A(Object.assign({t0,t1,x,y,w,enter:'flipx',din:.5,sfx:'paper',z:44,float:.3,html:`<div style="position:relative"><img src="a/I02_cal.png" style="width:100%;display:block;filter:drop-shadow(0 20px 26px rgba(0,0,0,.5))">
  <div style="position:absolute;left:12%;right:16%;top:36%;bottom:12%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center"><div style="font:900 ${w*.32}px/1 B;color:#1d2140">${d}</div><div style="font:800 ${w*.11}px/1.2 B;color:#e53935">${m}</div><div style="font:800 ${w*.12}px/1.1 B;color:#5a5f7a">${yy}</div></div></div>`},o));
const NAMEC=(t0,t1,x,y,w,pre,name,col='#e65100',o={})=>A(Object.assign({t0,t1,x,y,w,cls:'wg',html:`<div class="acc" style="background:${col}"></div><div style="padding:14px 18px 14px 34px;text-align:left"><div style="font:700 28px/1.2 B;color:#5a5f7a">${pre}</div><div style="font:900 52px/1.2 B;color:#1d2140;white-space:nowrap">${name}</div></div>`,enter:'left',din:.4,sfx:'swoosh',z:45,float:.35},o));

const FOC=(z,c,Y=960)=>{const Wd=1080*z,k=Wd/MH.W;return {w:Wd,x:540-(c[0]-MH.W/2)*k,y:Y-(c[1]-MH.H/2)*k}};
const CBM=()=>[(MH.cmah[0]*1.4+MH.cguj[0])/2.4,(MH.cmah[1]*1.4+MH.cguj[1])/2.4];
function buildScenes(){
const DARK='linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.05) 25%,rgba(0,0,0,0) 60%,rgba(0,0,0,.6) 100%)';
const NAVY='radial-gradient(circle at 50% 45%,rgba(20,30,60,.35),rgba(6,10,24,.85))';
// ================= BACKGROUNDS =================
BG({img:'BG02_fort.jpg',t0:-1,t1:5.3,s0:1.35,s1:1.2,fade:.08,filter:'brightness(.35) blur(8px)'});
BG({img:'BG02_fort.jpg',t0:5.3,t1:10.9,s0:1.1,s1:1.3,x0:-60,x1:40,fade:.08});
BG({img:'BG03b_mumbai.jpg',t0:10.9,t1:20.2,s0:1.25,s1:1.1,x0:40,x1:-40,fade:.08,filter:t=>t>11.2?'brightness(.4) blur(7px) sepia(.4)':'sepia(.3)'});
BG({img:'BG05_hall.jpg',t0:20.2,t1:26.3,s0:1.08,s1:1.25,x0:-120,x1:-60,fade:.08,filter:'sepia(.35)'});
BG({img:'BG05_hall.jpg',t0:26.3,t1:29.9,s0:1.3,s1:1.35,x0:-60,x1:-60,fade:.08,filter:'sepia(.6) brightness(.35) blur(6px)'});
BG({img:'BG03_mumbai.jpg',t0:29.9,t1:41.0,s0:1.2,s1:1.1,fade:.08,filter:'brightness(.32) blur(8px) sepia(.4)'});
BG({img:'BG02b_flag.jpg',t0:41.0,t1:51.75,s0:1.1,s1:1.3,x0:120,x1:40,fade:.08,filter:t=>t>44?'brightness(.45) blur(5px)':''});
BG({img:'BG11_shahir.jpg',t0:51.75,t1:57.2,s0:1.08,s1:1.25,x0:-80,x1:40,fade:.08});
BG({img:'BG11_shahir.jpg',t0:57.2,t1:59.4,s0:1.3,s1:1.35,fade:.3,filter:'brightness(.2) blur(10px) grayscale(.5)'});
BG({img:'BG14_park.jpg',t0:59.4,t1:75.5,s0:1.35,s1:1.08,x0:0,x1:-80,fade:.08,filter:t=>t<61.2?`brightness(${lerp(.2,.5,clamp((t-59.4)/1.8))}) blur(6px)`:(t>66.4?'brightness(.6) blur(4px)':'')});
BG({img:'BG14_park.jpg',t0:75.5,t1:106.6,s0:1.4,s1:1.3,fade:.08,filter:'brightness(.25) blur(12px)'});
BG({img:'BG02_fort.jpg',t0:106.6,t1:120,s0:1.08,s1:1.28,x0:40,x1:-40,fade:.08});
for(const [a,b] of [[5.3,10.9],[51.75,57.2],[106.6,120]])TINT(a,b,DARK);
TINT(-1,5.3,NAVY);TINT(10.9,20.2,NAVY);TINT(29.9,41,NAVY);TINT(75.5,106.6,NAVY);
TINT(20.2,26.3,'linear-gradient(180deg,rgba(40,20,0,.5),rgba(0,0,0,.1) 40%,rgba(0,0,0,.6))');
PART({type:'dust',t0:-1,t1:120,n:200,seed:3,life:7,alpha:.6,color:'#ffcc80'});
HOOKS.push(t=>{const r=document.getElementById('rays');let o=0;if(t>61.2&&t<68)o=lerp(.9,.35,clamp((t-61.2)/2))*clamp((68-t)/.5);if(t>106.6)o=.35*clamp((t-106.6)/.6);r.style.opacity=o;r.style.transform=`rotate(${t*8}deg)`});
// headings
[[0.03,'1960 vs आज'],[5.3,''],[10.94,'स्वातंत्र्यानंतर'],[20.37,''],[26.48,'मागणी फेटाळली!'],[29.95,'नागपूर करार'],[36.21,'1956: केंद्राचा निर्णय'],[41.0,''],
 [44.1,'संयुक्त महाराष्ट्र समिती'],[51.86,'शाहिरांचा आवाज'],[57.3,''],[59.45,''],[75.64,'एक गंमत!'],[79.25,'26 ➜ 36 जिल्हे'],[106.68,''],[112.3,'']].forEach(([t,s])=>HEAD(t,s));
for(const t of [5.0,10.6,20.0,29.65,40.75,51.5,59.15,79.0,106.35])PAPER(t);

// ================= 1. HOOK 0 - 5.3 =================
const hookSplits={};MH.pairs.forEach(([p,c],i)=>hookSplits[c]=3.95+i*.09);
MHDIST(-0.3,5.3,hookSplits,4.85,Object.assign({labels:false,enter:'fade',din:.1,moves:[{t:0,s:1.15,dur:.01},{t:0.3,s:1.0,dur:3.5,ease:'out'}]},FOC(1.36,MH.cmah,1080)));
A({t0:-0.3,t1:5.3,x:540,y:470,w:900,cls:'wg',html:`<div style="display:flex;align-items:center;justify-content:space-around;padding:22px 20px">
  <div style="text-align:center"><div style="font:800 34px/1.2 B;color:#5a5f7a">1960</div><div style="font:900 120px/1 B;color:#1d2140">26</div><div style="font:700 30px B;color:#5a5f7a">जिल्हे</div></div>
  <svg viewBox="0 0 120 60" width="140"><path class="ar" d="M5 30 H95" stroke="#ff7a00" stroke-width="12" stroke-linecap="round" fill="none"/><polygon points="90,8 118,30 90,52" fill="#ff7a00"/></svg>
  <div style="text-align:center"><div style="font:800 34px/1.2 B;color:#5a5f7a">आज</div><div class="saffg" style="font:900 120px/1 B" id="c36">26</div><div style="font:700 30px B;color:#5a5f7a">जिल्हे</div></div></div>`,
  enter:'fade',din:.1,z:46,float:.2,shine:[4.95],draw:(t,lt,o)=>{const v=Math.round(lerp(26,36,clamp((t-3.95)/1.0)));o.el.querySelector('#c36').textContent=t<3.6?'?':v}});
sfx(3.95,'ticks',.8);sfx(4.95,'ding',.8);punch(4.95,.06);PART({type:'sparks',t0:4.95,t1:5.2,n:60,seed:4,x:760,y:470,speed:700});
BOY(1.2,5.3,'R01_think.png',900,1560,330,{enter:'up',z:47});

// ================= 2. TITLE 5.3 - 10.9 =================
A({t0:5.35,t1:10.9,x:540,y:620,w:960,cls:'wg',html:`<div style="padding:30px 26px"><div style="font:800 48px/1.3 B;color:#5a5f7a">चला, आज समजून घेऊया</div>
  <div style="font:900 104px/1.15 B;color:#1d2140">आपला <span class="saffg">महाराष्ट्र</span></div><div style="font:900 104px/1.15 B;color:#1d2140">बनला कसा?</div></div>`,enter:'zoom',din:.5,sfx:'impact',z:44,shine:[6.2,9.4]});
IMG(6.0,10.9,'I08_flag.png',900,330,230,{enter:'spin',sfx:'pop',z:45,float:.8});
BOY(5.5,9.55,'R01_think.png',540,1430,520,{z:46,exit:'fade',dout:.15});
BOY(9.55,10.9,'R04_point.png',540,1430,560,{enter:'pop',din:.3,z:46});
sfx(9.6,'pop',.7);

// ================= 3. BOMBAY STATE 10.9 - 20.2 =================
MHREG(10.95,20.2,(t,S)=>{const a=clamp((t-11.2)/.6),sp=E.inout(clamp((t-16.4)/.8));
  const teal='#26a69a',saf='#ff8f00';const mc=sp>0?saf:teal;
  S('.guj',sp>.5?'#78909c':teal,a*lerp(.6,.25,sp),a);S('.rw',mc,a*.6,a);S('.rv',mc,a*.6,a);S('.rm',mc,a*.6,a);
  S('.mum','#e53935',t>18.15?.85:0,t>18.15?1:0)},
 `<g data-a="pop" data-t0="11.75" data-t1="16.4" data-cx="${MH.cmah[0]}" data-cy="${MH.cmah[1]}">${LBLs(MH.cmah[0]+60,MH.cmah[1],'मराठी भाग','#e65100',52)}</g>
  <g data-a="pop" data-t0="12.45" data-t1="16.4" data-cx="${MH.cguj[0]}" data-cy="${MH.cguj[1]}">${LBLs(MH.cguj[0],MH.cguj[1],'गुजराती भाग','#00897b',52)}</g>
  <g data-a="pop" data-t0="16.6" data-cx="${MH.cmah[0]}" data-cy="${MH.cmah[1]}">${LBLs(MH.cmah[0]+60,MH.cmah[1],'महाराष्ट्र','#e65100',64)}</g>
  <g data-a="drop" data-t0="18.15" data-d=".6">${MPIN(MH.pins.mumbai[0],MH.pins.mumbai[1],1.6)}</g>
  <g data-a="ring" data-t0="18.5"><circle cx="${MH.pins.mumbai[0]}" cy="${MH.pins.mumbai[1]}" r="20" fill="none" stroke="#ffeb3b" stroke-width="8"/></g>
  <g data-a="pop" data-t0="18.25" data-cx="${MH.pins.mumbai[0]-120}" data-cy="${MH.pins.mumbai[1]+90}">${LBLs(MH.pins.mumbai[0]-120,MH.pins.mumbai[1]+90,'मुंबईसह!','#c62828',50)}</g>`,FOC(1.2,CBM(),1000));
A({t0:14.5,t1:16.4,x:540,y:470,w:1040,cls:'chipw',html:`<span class="stampx" style="font-size:84px;color:#00897b;border-color:#00897b">बॉम्बे स्टेट</span>`,enter:'stamp',din:.26,sfx:'stamp',sfxd:.2,rot:-4,float:0,z:60,exit:'pop',dout:.2});
shake(14.72,14);
IMG(11.3,16.4,'I05_handshake.png',880,1540,230,{enter:'pop',sfx:'pop',z:45,float:.6,exit:'pop',dout:.2});
A({t0:11.4,t1:16.4,x:400,y:1560,w:560,cls:'wg',html:`<div style="padding:16px 18px;font:800 40px/1.3 B;color:#1d2140">मराठी + गुजराती<br><span class="saffg" style="font-size:52px;font-weight:900">= एकच राज्य</span></div>`,enter:'up',sfx:'whoosh',z:44,exit:'down',dout:.25});
BOY(16.4,20.2,'R20_chest.png',870,1540,380,{z:46});
A({t0:16.6,t1:20.2,x:380,y:1560,w:600,cls:'wg',html:`<div class="acc"></div><div style="padding:18px 18px 18px 34px;text-align:left"><div style="font:700 34px/1.3 B;color:#5a5f7a">मराठी माणसाची मागणी</div><div style="font:900 52px/1.2 B" class="saffg">मुंबईसह वेगळा महाराष्ट्र!</div></div>`,enter:'left',sfx:'swoosh',z:45,float:.3});
sfx(16.45,'whoosh',.7);

// ================= 4. 1946 SAMMELAN 20.2 - 26.3 =================
CAL(20.4,26.3,250,560,330,'1946','संमेलन','बेळगाव');
A({t0:20.9,t1:26.3,x:700,y:560,w:560,cls:'wg',html:`<div style="padding:20px 18px"><img src="a/I12_book.png" style="width:150px;display:block;margin:0 auto 6px"><div style="font:900 50px/1.2 B;color:#1d2140">मराठी साहित्य संमेलन</div><div style="font:700 36px/1.3 B;color:#e65100">${PIN}बेळगाव</div></div>`,enter:'right',sfx:'swoosh',z:44,shine:[22.5]});
A({t0:23.95,t1:26.3,x:540,y:1040,w:1000,cls:'wg',html:`<div style="display:flex;align-items:center;gap:20px;padding:18px 24px"><img src="a/I06_megaphone.png" style="width:150px"><div style="text-align:left"><div style="font:800 38px/1.3 B;color:#5a5f7a">पहिल्यांदा मागणी</div><div style="font:900 62px/1.15 B" class="saffg">संयुक्त महाराष्ट्र!</div></div></div>`,enter:'zoom',din:.4,sfx:'impact',z:46,shine:[24.8]});
BOY(21.2,26.3,'R06_read.png',540,1560,400,{z:45});
punch(24.0,.05);

// ================= 5. DAR / JVP REJECTED 26.3 - 29.9 =================
[['दार आयोग',270,26.75],['JVP समिती',810,27.75]].forEach(([n,x,t])=>{
  A({t0:t,t1:29.9,x,y:760,w:470,cls:'wg',html:`<div style="padding:22px 14px"><img src="a/I13_files.png" style="width:190px;display:block;margin:0 auto"><div style="font:900 50px/1.3 B;color:#1d2140;margin-top:8px">${n}</div></div>`,enter:'flip',din:.45,sfx:'paper',z:44,float:.3,
    fn:(tt)=>({filter:tt>29.3?`grayscale(${clamp((tt-29.3)/.3)*.8})`:''})});
  IMG(29.3+(x>500?.12:0),29.9,'I03_cross.png',x,760,330,{enter:'stamp',din:.25,sfx:x>500?null:'buzz',z:48,float:0});});
shake(29.45,20);punch(29.45,.06);
STAMP(29.35,29.9,'फेटाळली!',540,1060,{st:'font-size:96px'});
BOY(28.2,29.9,'R10_shock.png',540,1560,380,{enter:'up',z:46});

// ================= 6. NAGPUR PACT 29.9 - 36.2 =================
CAL(29.95,33.1,260,600,340,'28','सप्टेंबर','1953',{exit:'left',dout:.3});
A({t0:30.2,t1:33.1,x:700,y:640,w:560,html:`<div style="position:relative;border-radius:30px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.6),0 0 0 6px rgba(255,255,255,.8)"><img src="a/P08_card.jpg" style="width:100%;display:block"></div>`,enter:'flip',din:.5,sfx:'paper',z:43,float:.3,exit:'right',dout:.3});
A({t0:32.25,t1:33.1,x:540,y:1080,w:900,cls:'wg',html:`<div style="padding:18px 22px;display:flex;align-items:center;justify-content:center;gap:20px"><img src="a/I05_handshake.png" style="width:120px"><div style="font:900 74px/1.2 B" class="saffg">नागपूर करार</div></div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.18,z:50,float:.2,exit:'pop',dout:.2});
shake(32.45,12);
MHREG(33.1,36.2,(t,S)=>{const sv=E.out(clamp((t-33.36)/.6)),sm=E.out(clamp((t-33.75)/.6));
  S('.guj','#78909c',.2,.6);S('.rw','#ff8f00',.65,1);
  S('.rv',sv>.9?'#ff8f00':'#5c6bc0',.7,1,`translate(${(1-sv)*160},${(1-sv)*-40})`);S('.rm',sm>.9?'#ff8f00':'#26a69a',.7,1,`translate(${(1-sm)*60},${(1-sm)*160})`);
  },
 `<g data-a="pop" data-t0="33.36" data-cx="${MH.cvid[0]}" data-cy="${MH.cvid[1]}">${LBLs(MH.cvid[0],MH.cvid[1],'विदर्भ','#3949ab',62)}</g>
  <g data-a="pop" data-t0="33.75" data-cx="${MH.cmar[0]}" data-cy="${MH.cmar[1]}">${LBLs(MH.cmar[0],MH.cmar[1],'मराठवाडा','#00796b',62)}</g>
  <g data-a="drop" data-t0="33.2" data-d=".6">${MPIN(MH.pins.nagpur[0],MH.pins.nagpur[1],1.4,'#3949ab')}</g>`,Object.assign({enter:'zoom',din:.4},FOC(1.5,MH.cmah,1000)));
sfx(33.4,'whoosh',.8);sfx(33.8,'whoosh',.8);sfx(34.4,'impact',.7);punch(34.4,.05);
IMG(35.0,36.2,'I04_check.png',540,560,230,{enter:'stamp',din:.25,sfx:'ding',z:50,float:0});
BOY(34.6,36.2,'R09_clap.png',880,1560,360,{z:46});

// ================= 7. 1956 MUMBAI SEPARATE 36.2 - 41.0 =================
MHREG(36.25,41.0,(t,S)=>{const sp=E.out(clamp((t-39.5)/.6));
  S('.guj','#78909c',.2,.6);S('.rw','#ff8f00',.6,1);S('.rv','#ff8f00',.6,1);S('.rm','#ff8f00',.6,1);
  S('.mum','#e53935',sp*.95,sp,`translate(${-sp*55},${-sp*10})`)},
 `<g data-a="pop" data-t0="39.55" data-cx="${MH.pins.mumbai[0]-150}" data-cy="${MH.pins.mumbai[1]+100}">${LBLs(MH.pins.mumbai[0]-150,MH.pins.mumbai[1]+100,'मुंबई वेगळी?!','#c62828',52)}</g>`,Object.assign(FOC(1.5,MH.cmah,1000),{moves:[{t:39.3,s:1.5,x:FOC(2.25,MH.pins.mumbai,1000).x/1+0,y:FOC(2.25,MH.pins.mumbai,1000).y,dur:.8}]}));
CAL(36.4,39.4,240,520,300,'1956','केंद्राचा','निर्णय',{exit:'pop',dout:.2});
IMG(39.5,41.0,'I10_split.png',860,520,260,{enter:'pop',sfx:'scratch',z:48,float:.4});
shake(39.6,18);
BOY(37.2,41.0,'R10_shock.png',870,1560,360,{z:46});

// ================= 8. LADHA 41 - 44.1 =================
A({t0:41.05,t1:44.1,x:540,y:820,w:980,cls:'glass dk',html:`<div style="padding:30px 24px"><div class="lbl" style="font:800 46px/1.3 B">आणि इथून सुरू झाला</div><div class="gold" style="font:900 100px/1.15 B">संयुक्त महाराष्ट्राचा लढा!</div></div>`,enter:'zoom',din:.45,sfx:'impact',z:44,shine:[42.2]});
BOY(41.3,44.1,'R16_flag.png',540,1490,560,{z:46});
flash(41.1,.35,'#ffb74d');sfx(41.2,'dhol',1);sfx(41.45,'dhol',.7);sfx(41.7,'dhol',1);

// ================= 9. SAMITI 44.1 - 51.75 =================
A({t0:44.15,t1:51.75,x:540,y:470,w:960,cls:'wg',html:`<div style="display:flex;align-items:center;gap:20px;padding:18px 24px"><img src="a/I14_people.png" style="width:170px"><div style="text-align:left"><div style="font:800 38px/1.3 B;color:#5a5f7a">उभी राहिली</div><div style="font:900 62px/1.15 B" class="saffg">संयुक्त महाराष्ट्र समिती</div></div></div>`,enter:'down',sfx:'impact',z:44,shine:[45.6]});
[['सेनापती','बापट',46.85,'#e65100'],['एस. एम.','जोशी',48.07,'#3949ab'],['आचार्य','अत्रे',49.11,'#00897b'],['प्रबोधनकार','ठाकरे',50.29,'#8e24aa']].forEach(([p,n,t,c],i)=>
  NAMEC(t,51.75,i%2?790:290,850+Math.floor(i/2)*250,460,p,n,c,{enter:i%2?'right':'left'}));
BOY(45.0,51.75,'R09_clap.png',540,1600,330,{z:46});

// ================= 10. SHAHIR 51.75 - 57.2 =================
IMG(51.9,57.2,'P12_daf.png',290,600,360,{enter:'spin',sfx:'dhol',z:44,float:.6,fn:(t)=>({r:Math.sin(t*9)*3})});
NAMEC(51.95,57.2,740,500,460,'शाहीर','अमर शेख','#e65100',{enter:'right'});
NAMEC(53.0,57.2,740,720,460,'शाहीर','अण्णाभाऊ साठे','#c62828',{enter:'right'});
A({t0:54.6,t1:57.2,x:540,y:1470,w:960,cls:'wg',html:`<div style="display:flex;align-items:center;gap:20px;padding:18px 24px"><img src="a/I06_megaphone.png" style="width:150px"><div style="text-align:left"><div style="font:800 38px/1.3 B;color:#5a5f7a">शाहिरीने आवाज पोहोचला</div><div style="font:900 70px/1.15 B" class="saffg">गावागावात!</div></div></div>`,enter:'up',sfx:'whoosh',z:45,shine:[56.0]});
for(let i=0;i<8;i++)sfx(52.0+i*.32,'dhol',i%4==0?.8:.45);

// ================= 11. TRIBUTE 57.2 - 59.4 =================
IMG(57.25,59.4,'P13_samai.png',540,900,620,{enter:'fade',din:.6,sfx:'bell',z:44,float:.3});
A({t0:57.6,t1:59.4,x:540,y:1450,w:900,cls:'glass dk',html:`<div style="padding:22px"><div class="gold" style="font:900 64px/1.25 B">अनेकांनी बलिदान दिलं</div><div class="lbl" style="font:700 40px/1.3 B">विनम्र अभिवादन 🙏</div></div>`.replace(' 🙏',''),enter:'fade',din:.6,z:45,float:.2});

// ================= 12. 1 MAY 1960 59.4 - 75.5 =================
sfx(59.45,'riser',1);
CAL(61.15,66.3,540,700,520,'1','मे','1960',{enter:'stamp',din:.35,sfx:null,moves:[{t:63.0,x:230,y:520,s:.55,dur:.6}],exit:'pop',dout:.25});
flash(61.25,.9,'#fff3c4');shake(61.3,26);punch(61.25,.09);sfx(61.2,'boom',1);sfx(61.3,'tutari',1);sfx(61.4,'cheer',.6);
PART({type:'petals',t0:61.25,t1:66,n:240,seed:61,y:-80,img:'mari',imgFrac:.1});
PART({type:'sparks',t0:61.25,t1:61.6,n:90,seed:62,x:540,y:700,speed:900,color:'#ffd54f'});
A({t0:63.1,t1:66.35,x:690,y:520,w:640,cls:'wg',html:`<div style="display:flex;align-items:center;gap:16px;padding:16px 20px"><img src="a/I01_pin.png" style="width:90px"><div style="text-align:left"><div style="font:900 50px/1.2 B;color:#1d2140">शिवाजी पार्क</div><div style="font:700 34px/1.2 B;color:#e65100">मुंबई</div></div></div>`,enter:'right',sfx:'swoosh',z:45,exit:'up',dout:.25});
A({t0:64.75,t1:68.4,x:540,y:960,w:720,cls:'wg',html:`<div style="display:flex;align-items:center;gap:20px;padding:18px 24px"><img src="a/I07_mic.png" style="width:120px"><div style="text-align:left"><div style="font:700 34px/1.2 B;color:#5a5f7a">उपस्थिती</div><div style="font:900 64px/1.2 B;color:#1d2140">पंडित नेहरू</div></div></div>`,enter:'left',sfx:'whoosh',z:45,exit:'left',dout:.25});
A({t0:66.4,t1:68.4,x:540,y:1290,w:1000,cls:'chipw',html:`<span class="chip c-saff" style="font-size:56px;padding:18px 40px">महाराष्ट्र राज्याची घोषणा!</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.18,z:50,float:.2,exit:'pop',dout:.2});
shake(66.6,14);
IMG(68.4,75.5,'P15_kalash.png',300,760,420,{enter:'rise',din:.6,sfx:'chime',z:44,float:.4,shine:[71.4],fn:(t)=>({filter:t>71.3?`drop-shadow(0 0 ${20+Math.sin(t*5)*10}px #ffd54f)`:''})});
NAMEC(68.5,75.5,720,600,600,'संयुक्त महाराष्ट्राचा मंगल कलश','यशवंतराव चव्हाण','#ff8f00',{enter:'right'});
PART({type:'sparks',t0:71.35,t1:71.7,n:60,seed:71,x:300,y:760,speed:600,color:'#ffd54f'});sfx(71.4,'sparkle',.8);
A({t0:74.35,t1:75.5,x:720,y:960,w:600,cls:'wg',html:`<div style="display:flex;align-items:center;gap:16px;padding:16px 20px"><img src="a/I09_throne.png" style="width:110px"><div style="text-align:left"><div style="font:700 32px/1.2 B;color:#5a5f7a">महाराष्ट्राचे</div><div style="font:900 56px/1.15 B" class="saffg">पहिले मुख्यमंत्री</div></div></div>`,enter:'pop',sfx:'ding',z:46});
BOY(68.6,75.5,'R16b_flag.png',600,1500,560,{z:46});

// ================= 13. GUJARAT TWIST 75.5 - 79.2 =================
MHREG(75.55,79.2,(t,S,r)=>{const g=clamp((t-77.3)/.5);
  S('.guj','#fbc02d',.25+g*.5,1);S('.rw','#ff8f00',.7,1);S('.rv','#ff8f00',.7,1);S('.rm','#ff8f00',.7,1);
  r.querySelector('.glo').setAttribute('opacity',.8);r.querySelector('.gloG').setAttribute('opacity',g*.9)},
 `<g data-a="pop" data-t0="75.7" data-cx="${MH.cmah[0]}" data-cy="${MH.cmah[1]}">${LBLs(MH.cmah[0]+60,MH.cmah[1],'महाराष्ट्र','#e65100',60)}</g>
  <g data-a="pop" data-t0="77.4" data-cx="${MH.cguj[0]}" data-cy="${MH.cguj[1]}">${LBLs(MH.cguj[0],MH.cguj[1],'गुजरात','#f57f17',60)}</g>`,FOC(1.2,CBM(),900));
A({t0:77.35,t1:79.2,x:540,y:390,w:900,cls:'wg',html:`<div style="padding:16px 22px"><div style="font:800 38px/1.3 B;color:#5a5f7a">1 मे 1960 ला</div><div style="font:900 62px/1.2 B;color:#1d2140">गुजरातचाही जन्म!</div></div>`,enter:'down',sfx:'pop',z:46});
BOY(75.7,79.2,'R17_wink.png',850,1560,360,{z:47});

// ================= 14. NEW DISTRICTS 79.2 - 106.6 =================
const SPL={Sindhudurg:84.11,Jalna:85.9,Latur:88.71,Gadchiroli:90.2,Washim:95.33,Nandurbar:96.45,Hingoli:99.35,Gondia:100.73,Palghar:103.59};
MHDIST(79.25,106.6,SPL,92.56,FOC(1.36,MH.cmah,980));
const cnt=t=>26+Object.values(SPL).filter(v=>t>=v).length+(t>=92.56?1:0);
A({t0:79.4,t1:106.6,x:880,y:450,w:280,html:`<div style="width:250px;height:250px;margin:0 auto;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#ffe7c2);box-shadow:0 0 0 8px rgba(255,255,255,.4),0 0 40px rgba(255,170,0,.8),0 20px 40px rgba(0,0,0,.5);display:flex;flex-direction:column;align-items:center;justify-content:center">
  <div class="saffg" style="font:900 120px/1 B" id="dc">26</div><div style="font:800 32px/1.2 B;color:#1d2140">जिल्हे</div></div>`,enter:'pop',sfx:'pop',z:48,float:.3,
  draw:(t,lt,o)=>{const v=cnt(t);const e=o.el.querySelector('#dc');if(e.textContent!=v)e.textContent=v;let s=1;for(const T of [...Object.values(SPL),92.56]){const d=t-T;if(d>0&&d<.3)s=1+Math.sin(d/.3*Math.PI)*.25}e.style.transform=`scale(${s})`}});
const YRS=[[81.97,'1981'],[86.53,'1982'],[91.05,'1990'],[93.38,'1998'],[97.3,'1999'],[101.43,'2014']];
A({t0:81.9,t1:106.6,x:300,y:450,w:420,cls:'glass dk yc',html:'',enter:'stamp',din:.3,sfx:'impact',z:47,float:.3,
  texts:YRS.map(([t,y])=>[t,`<div class="lab">वर्ष</div><div class="num gold" style="font-size:120px;line-height:1.08">${y}</div>`])});
for(const [t] of YRS.slice(1)){sfx(t,'impact',.6);punch(t+.05,.03)}
const PR=[[83.32,'रत्नागिरी','सिंधुदुर्ग',84.11],[84.85,'औरंगाबाद','जालना',85.9],[87.72,'उस्मानाबाद','लातूर',88.71],[89.31,'चंद्रपूर','गडचिरोली',90.2],[92.18,'मुंबई','मुंबई उपनगर',92.56],
 [94.69,'अकोला','वाशिम',95.33],[95.93,'धुळे','नंदुरबार',96.45],[98.6,'परभणी','हिंगोली',99.35],[99.94,'भंडारा','गोंदिया',100.73],[103.0,'ठाणे','पालघर',103.59]];
A({t0:83.2,t1:106.6,x:540,y:1490,w:960,cls:'wg',html:'',enter:'up',sfx:'whoosh',z:46,float:.2,
  texts:PR.map(([t,a,b])=>[t,`<div style="display:flex;align-items:center;justify-content:center;gap:22px;padding:22px 20px"><div style="font:800 52px/1.2 B;color:#5a5f7a">${a}</div><svg viewBox="0 0 120 60" width="110"><path d="M5 30 H95" stroke="#ff7a00" stroke-width="12" stroke-linecap="round"/><polygon points="90,8 118,30 90,52" fill="#ff7a00"/></svg><div style="display:flex;align-items:center;gap:10px"><img src="a/I11_newdist.png" style="width:74px"><span style="font:900 60px/1.2 B" class="saffg">${b}</span></div></div>`])});
for(const v of [...Object.values(SPL),92.56])sfx(v,'pop',.7);
A({t0:104.3,t1:106.6,x:540,y:1700,w:1000,cls:'chipw',html:`<span class="chip c-green" style="font-size:52px;padding:18px 40px">पालघर = 36 वा जिल्हा!</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.18,z:50,float:.2});
shake(104.5,12);PART({type:'sparks',t0:104.4,t1:104.7,n:70,seed:104,x:880,y:450,speed:700});
BOY(80.0,83.2,'R18_pointer.png',540,1550,420,{z:47,exit:'down',dout:.3});
A({t0:79.4,t1:83.2,x:540,y:1300,w:900,cls:'chipw',html:`<span class="chip c-navy" style="font-size:52px">हळूहळू 10 नवे जिल्हे!</span>`,enter:'pop',sfx:'pop',z:48,exit:'pop',dout:.2});
A({t0:79.6,t1:106.6,x:540,y:1820,w:1000,html:`<div style="font:600 24px/1.2 B;color:rgba(255,255,255,.75);text-align:center">औरंगाबाद = आता छत्रपती संभाजीनगर • उस्मानाबाद = आता धाराशिव</div>`,enter:'fade',din:.4,z:40,float:0,cls:'noshadow',fn:(t)=>({o:t>84.8&&t<91?1:0})});

// ================= 15. MAHARASHTRA DIN 106.6 - 112.3 =================
CAL(106.75,112.3,540,620,420,'1','मे','महाराष्ट्र दिन',{enter:'zoom',din:.45,sfx:'impact'});
BOY(106.8,111.1,'R20_chest.png',540,1430,500,{z:46,exit:'fade',dout:.15});
BOY(111.1,112.3,'R16_flag.png',540,1430,560,{enter:'pop',din:.3,z:46});
STAMP(111.15,112.3,'जय महाराष्ट्र!',540,1050,{st:'font-size:100px;color:#e65100;border-color:#e65100'});
flash(111.2,.6,'#ffd59a');sfx(111.2,'tutari',.9);sfx(111.3,'cheer',.6);
PART({type:'petals',t0:107,t1:117,n:260,seed:107,y:-80,img:'mari',imgFrac:.1});

// ================= 16. OUTRO 112.3 - 117.8 =================
A({t0:112.3,t1:120,x:540,y:640,w:400,html:`<div style="width:400px;height:400px;border-radius:70px;background:#fff;box-shadow:0 30px 70px rgba(0,0,0,.55),0 0 0 10px rgba(255,255,255,.35);display:flex;flex-direction:column;align-items:center;justify-content:center">
  <div style="font:900 104px/1.1 B;color:#111">स्पर्धा</div><div style="font:900 104px/1.1 B;color:#e3161b">टाइम्स</div></div>`,enter:'spin',din:.6,sfx:'whoosh',z:44,shine:[113.2,116.2]});
PART({type:'sparks',t0:112.7,t1:113.0,n:70,seed:112,x:540,y:640,speed:700});
CHIP(112.5,120,'अशाच भन्नाट माहितीसाठी',540,940,'c-navy',{st:'font-size:46px'});
A({t0:114.2,t1:120,x:540,y:1110,w:700,cls:'chipw',html:`<span class="chip c-red" style="font-size:70px;padding:22px 64px">फॉलो करा</span>`,enter:'pop',sfx:'pop',z:46,float:.2,
  fn:(t)=>{const d=t-115.5;return {s:d>0&&d<.25?1-Math.sin(d/.25*Math.PI)*.12:1+(t>115.8?Math.max(0,Math.sin((t-115.8)*5))*.04:0)}}});
A({t0:114.9,t1:120,x:720,y:1230,w:170,html:`<img src="a/I15_hand.png" style="width:100%">`,enter:'up',float:0,z:50,cls:'noshadow',fn:(t)=>{const d=t-114.9;const k=E.inout(clamp(d/.5));const c=t>115.4&&t<115.7?Math.sin((t-115.4)/.3*Math.PI)*.15:0;return {dx:lerp(160,0,k),dy:lerp(220,0,k),s:1-c}}});
sfx(115.5,'click',1);PART({type:'sparks',t0:115.5,t1:115.7,n:40,seed:115,x:560,y:1110,speed:500,color:'#ff6b6b'});
BOY(112.5,120,'R04_point.png',230,1600,400,{enter:'left',z:45});
BOY(112.8,120,'R26_namaste.png',870,1600,330,{enter:'right',z:45});
}

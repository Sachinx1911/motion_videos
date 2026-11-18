// ===================== helpers (SRS Dwell gold / navy theme) =====================
const KF=(t,ks,ease='inout')=>{if(t<=ks[0][0])return ks[0][1];for(let i=1;i<ks.length;i++){if(t<=ks[i][0]){const [a,v0]=ks[i-1],[b,v1]=ks[i];return lerp(v0,v1,E[ease](clamp((t-a)/(b-a))))}}return ks[ks.length-1][1]};
E.in3=p=>p*p*p;
const GL=(t0,t1,x,y,w,inner,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'gl'+(o.white?' w':'')+(o.dark?' dk':''),html:`<div style="padding:${o.pad||'26px 32px'};text-align:${o.align||'center'}">${inner}</div>`,enter:'up',din:.5,sfx:'whoosh',sfxv:.6,z:40,float:.25},o));
const PILL=(t0,t1,x,y,txt,c='p-gold',o={})=>A(Object.assign({t0,t1,x,y,w:1040,cls:'chipw',html:`<span class="pill ${c}" style="${o.st||''}">${txt}</span>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:45,float:.2},o));
const TXT=(t0,t1,x,y,html,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||1000,cls:'chipw',html,enter:'up',din:.45,sfx:'swoosh',sfxv:.5,z:42,float:.15},o));
const IMG=(t0,t1,x,y,w,img,o={})=>A(Object.assign({t0,t1,x,y,w,img,enter:'pop',din:.5,sfx:'whoosh',sfxv:.6,z:35,float:.4},o));
// light sweep transition (champagne)
function SWEEP(t){A({t0:t-.45,t1:t+.5,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="width:900px;height:2600px;margin:-340px 0 0 90px;background:linear-gradient(90deg,rgba(236,214,170,0),rgba(236,214,170,.55) 40%,rgba(255,255,255,.95) 50%,rgba(236,214,170,.55) 60%,rgba(236,214,170,0));filter:blur(30px);transform:skewX(-16deg)"></div>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:700,
  fn:(tt,lt)=>({dx:lerp(-1700,1700,E.inout(clamp(lt/.95))),o:Math.sin(clamp(lt/.95)*Math.PI)})});flash(t,.35,'#fff4dc');punch(t,.04);sfx(t-.4,'whoosh',.8);sfx(t,'sparkle',.45)}
// coloured diagonal bars
function BARS(t,cols=['#e8cf9f','#0d1729','#faf7f2','#b8935f']){for(let i=0;i<6;i++){const col=cols[i%cols.length];const d=i*.04;
  A({t0:t-.5+d,t1:t+.5+d,x:540,y:-80+i*420,w:3200,cls:'noshadow',html:`<div style="height:470px;background:${col};box-shadow:0 0 60px rgba(0,0,0,.45)"></div>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:700+i,rot:-14,
   fn:(tt,lt)=>({dx:lerp(i%2?3300:-3300,i%2?-3300:3300,E.inout(clamp(lt/1)))})})}sfx(t-.4,'swoosh',.9);sfx(t-.1,'whoosh',.8);punch(t,.05)}
// iris ring
function RINGT(t){A({t0:t-.4,t1:t+.45,x:540,y:960,w:1080,cls:'noshadow',html:`<div class="ir" style="width:1080px;height:1920px;background:#060b16"></div><div class="irr" style="position:absolute;left:50%;top:50%;border-radius:50%;border:16px solid #e8cf9f;box-shadow:0 0 60px #c9a66f,inset 0 0 40px #c9a66f"></div>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:700,
  draw:(tt,lt,oo)=>{const r=tt<t?lerp(1250,0,E.inout(clamp((tt-t+.4)/.4))):lerp(0,1250,E.inout(clamp((tt-t)/.45)));oo.el.querySelector('.ir').style.webkitMaskImage=`radial-gradient(circle at 50% 50%,transparent ${r}px,#000 ${r+2}px)`;
    const rr=oo.el.querySelector('.irr');rr.style.width=rr.style.height=(2*r)+'px';rr.style.marginLeft=rr.style.marginTop=(-r)+'px';rr.style.opacity=r>4?1:0}});sfx(t-.35,'whoosh',.9);sfx(t,'reveal',.6)}
// blinds: vertical slats close then open (new for this reel)
function BLINDS(t,col='#0d1729'){const n=9;for(let i=0;i<n;i++){const d=Math.abs(i-(n-1)/2)*.035;
  A({t0:t-.42,t1:t+.5,x:60+i*120,y:960,w:122,cls:'noshadow',html:`<div style="height:1920px;background:linear-gradient(90deg,${col},#1b2a45 60%,${col});border-left:2px solid rgba(232,207,159,.5)"></div>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:700,
   fn:(tt)=>{const a=tt<t?E.inout(clamp((tt-(t-.42+d))/.36)):1-E.inout(clamp((tt-(t+.05+d))/.36));return {s:1,o:1,dy:0,ry:(1-a)*90}}})}
  sfx(t-.4,'swoosh',.8);sfx(t,'thud',.5);punch(t,.03)}
// bokeh background particles (champagne + cool)
const BK=[];{const R=rnd(11);for(let i=0;i<40;i++)BK.push({x:R()*1080,y:R()*1920,r:6+R()*34,s:8+R()*26,ph:R()*9,a:.06+R()*.18,g:R()<.75})}
let BOKEH_ON=t=>1;
function drawBokeh(c,t){const k=BOKEH_ON(t);if(k<=0)return;for(const b of BK){const y=((b.y-t*b.s)%2100+2100)%2100-90,x=b.x+Math.sin(t*.3+b.ph)*30;const g=c.createRadialGradient(x,y,0,x,y,b.r);
  const col=b.g?'232,207,159':'150,180,230';g.addColorStop(0,`rgba(${col},${k*b.a*(.7+.3*Math.sin(t*1.5+b.ph))})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.arc(x,y,b.r,0,7);c.fill()}}
// icons
const IC={
 person:(c='#e8cf9f',w=90)=>`<svg viewBox="0 0 60 80" width="${w}"><circle cx="30" cy="18" r="14" fill="${c}"/><path d="M4 78c0-18 11-32 26-32s26 14 26 32z" fill="${c}"/></svg>`,
 officer:(w=150)=>`<svg viewBox="0 0 120 130" width="${w}"><circle cx="60" cy="40" r="24" fill="#e8cf9f"/><path d="M34 26h52l-6-14H40z" fill="#c9a66f"/><path d="M14 128c0-30 20-50 46-50s46 20 46 50z" fill="#e8cf9f"/><path d="M60 80l-10 14 10 30 10-30z" fill="#0d1729"/></svg>`,
 shield:(w=170)=>`<svg viewBox="0 0 120 140" width="${w}"><defs><linearGradient id="shg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2dfb6"/><stop offset="1" stop-color="#b8935f"/></linearGradient></defs><path d="M60 6l48 18v38c0 34-22 58-48 72C34 120 12 96 12 62V24z" fill="url(#shg)" stroke="#fff" stroke-width="4"/><path d="M38 70l16 16 30-34" fill="none" stroke="#0d1729" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 check:`<svg viewBox="0 0 100 100" width="100%"><circle cx="50" cy="50" r="46" fill="#1f9a52" stroke="#fff" stroke-width="7"/><path d="M28 52 L44 67 L73 36" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 cross:`<svg viewBox="0 0 100 100" width="100%"><circle cx="50" cy="50" r="46" fill="#d1301f" stroke="#fff" stroke-width="7"/><path d="M32 32 L68 68 M68 32 L32 68" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round"/></svg>`,
 hand:(w=200)=>`<svg viewBox="0 0 120 150" width="${w}"><path d="M45 12c7 0 11 5 11 12v44h4V30c0-7 5-12 11-12s11 5 11 12v40h3V44c0-6 5-11 11-11s10 5 10 11v52c0 28-18 48-46 48-20 0-32-10-40-24L4 92c-3-6-1-12 5-14 5-2 10 0 13 4l12 16V24c0-7 4-12 11-12z" fill="#f2dfb6" stroke="#0d1729" stroke-width="5"/></svg>`,
 share:(w=120)=>`<svg viewBox="0 0 100 100" width="${w}"><g fill="#e8cf9f"><circle cx="76" cy="20" r="15"/><circle cx="24" cy="50" r="15"/><circle cx="76" cy="80" r="15"/></g><path d="M64 27L36 43M36 57l28 16" stroke="#e8cf9f" stroke-width="8"/></svg>`,
 cal:(w=90)=>`<svg viewBox="0 0 100 100" width="${w}"><rect x="8" y="16" width="84" height="76" rx="12" fill="#faf7f2"/><rect x="8" y="16" width="84" height="24" rx="12" fill="#c9302c"/><rect x="8" y="30" width="84" height="10" fill="#c9302c"/><rect x="26" y="6" width="8" height="20" rx="4" fill="#0d1729"/><rect x="66" y="6" width="8" height="20" rx="4" fill="#0d1729"/></svg>`,
};

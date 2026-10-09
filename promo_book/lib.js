// ===================== helpers =====================
const KF=(t,ks,ease='inout')=>{if(t<=ks[0][0])return ks[0][1];for(let i=1;i<ks.length;i++){if(t<=ks[i][0]){const [a,v0]=ks[i-1],[b,v1]=ks[i];return lerp(v0,v1,E[ease](clamp((t-a)/(b-a))))}}return ks[ks.length-1][1]};
const GL=(t0,t1,x,y,w,inner,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'gl'+(o.white?' w':''),html:`<div style="padding:${o.pad||'26px 32px'};text-align:${o.align||'center'}">${inner}</div>`,enter:'up',din:.5,sfx:'whoosh',sfxv:.6,z:40,float:.25},o));
const PILL=(t0,t1,x,y,txt,c='p-gold',o={})=>A(Object.assign({t0,t1,x,y,w:1040,cls:'chipw',html:`<span class="pill ${c}" style="${o.st||''}">${txt}</span>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:45,float:.2},o));
const TXT=(t0,t1,x,y,html,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||1000,cls:'chipw',html,enter:'up',din:.45,sfx:'swoosh',sfxv:.5,z:42,float:.15},o));
// light sweep transition
function SWEEP(t){A({t0:t-.45,t1:t+.5,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="width:900px;height:2600px;margin:-340px 0 0 90px;background:linear-gradient(90deg,rgba(255,236,180,0),rgba(255,236,180,.55) 40%,rgba(255,255,255,.95) 50%,rgba(255,236,180,.55) 60%,rgba(255,236,180,0));filter:blur(30px);transform:skewX(-16deg)"></div>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:700,
  fn:(tt,lt)=>({dx:lerp(-1700,1700,E.inout(clamp(lt/.95))),o:Math.sin(clamp(lt/.95)*Math.PI)})});flash(t,.35,'#fff4d6');punch(t,.04);sfx(t-.4,'whoosh',.8);sfx(t,'sparkle',.45)}
// bokeh background particles
const BK=[];{const R=rnd(11);for(let i=0;i<46;i++)BK.push({x:R()*1080,y:R()*1920,r:6+R()*34,s:8+R()*26,ph:R()*9,a:.08+R()*.22,g:R()<.7})}
function drawBokeh(c,t){for(const b of BK){const y=((b.y-t*b.s)%2100+2100)%2100-90,x=b.x+Math.sin(t*.3+b.ph)*30;const g=c.createRadialGradient(x,y,0,x,y,b.r);
  const col=b.g?'255,206,90':'150,190,255';g.addColorStop(0,`rgba(${col},${b.a*(.7+.3*Math.sin(t*1.5+b.ph))})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.arc(x,y,b.r,0,7);c.fill()}}
// ---------- 3D book ----------
function BOOK(o){const Wd=o.bw||520,Hd=Math.round(Wd*1280/951),T=o.T||62;
  const face=(st,html='')=>`<div class="f" style="${st}">${html}</div>`;const edge='repeating-linear-gradient(90deg,#f6f3ec 0 2px,#d6d0c3 2px 3px)',edgeH='repeating-linear-gradient(0deg,#f6f3ec 0 2px,#d6d0c3 2px 3px)';
  const html=`<div style="width:${Wd}px;height:${Hd}px;perspective:2600px"><div class="bk" style="width:${Wd}px;height:${Hd}px">
  ${face(`width:${Wd}px;height:${Hd}px;transform:translateZ(${T/2}px);background:url(a/cover.jpg) center/cover;border-radius:3px 10px 10px 3px;overflow:hidden`,'<div style="position:absolute;inset:0;box-shadow:inset 10px 0 14px rgba(0,0,0,.28)"></div><div class="gloss" style="position:absolute;top:-10%;bottom:-10%;width:45%;left:0;background:linear-gradient(100deg,transparent,rgba(255,255,255,.6) 50%,transparent);mix-blend-mode:screen;opacity:0"></div>')}
  ${face(`width:${Wd}px;height:${Hd}px;transform:rotateY(180deg) translateZ(${T/2}px);background:linear-gradient(160deg,#1f3f8a,#0b1a3d);border-radius:10px 3px 3px 10px`,`<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:72%;background:#fff;border-radius:18px;padding:12px"><img src="a/logo.png" style="width:100%"></div>`)}
  ${face(`width:${T}px;height:${Hd}px;left:${(Wd-T)/2}px;transform:rotateY(-90deg) translateZ(${Wd/2}px);background:linear-gradient(90deg,#e9e6df,#ffffff 45%,#e4e0d8)`,`<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(90deg);white-space:nowrap;font:800 ${T*.44}px P;color:#7a5a32;display:flex;align-items:center;gap:${T*.3}px">महसूल सेवक (कोतवाल) भरती <span style="color:#e3262f">52</span><span style="color:#1d2a6b;font-size:${T*.34}px">प्रश्नपत्रिका संच</span><span style="color:#5a3f8a;font-size:${T*.26}px">विठ्ठल नागनाथ राऊतवार</span><img src="a/logo.png" style="height:${T*.62}px;transform:rotate(-90deg)"></div>`)}
  ${face(`width:${T}px;height:${Hd}px;left:${(Wd-T)/2}px;transform:rotateY(90deg) translateZ(${Wd/2-4}px);background:${edge}`)}
  ${face(`width:${Wd-6}px;height:${T}px;top:${(Hd-T)/2}px;transform:rotateX(90deg) translateZ(${Hd/2-3}px);background:${edgeH}`)}
  ${face(`width:${Wd-6}px;height:${T}px;top:${(Hd-T)/2}px;transform:rotateX(-90deg) translateZ(${Hd/2-3}px);background:${edgeH}`)}
  </div></div>`;
  // floor shadow
  A({t0:o.t0,t1:o.t1,x:o.x,y:o.y,w:Wd*1.2,cls:'noshadow',html:`<div style="width:100%;height:120px;background:radial-gradient(ellipse 50% 50% at 50% 50%,rgba(0,0,0,.55),rgba(0,0,0,0) 70%)"></div>`,enter:'fade',din:.5,float:0,z:(o.z||30)-1,
    fn:t=>{const s=o.S?o.S(t):1;return {dx:(o.X?o.X(t):o.x)-o.x,dy:(o.Y?o.Y(t):o.y)-o.y+Hd*.53*s,s:s,o:o.op?o.op(t):1}}});
  return A({t0:o.t0,t1:o.t1,x:o.x,y:o.y,w:Wd,html,cls:'noshadow',enter:o.enter||'fade',din:o.din||.3,exit:o.exit||'fade',dout:o.dout||.4,float:0,z:o.z||30,
    fn:t=>({dx:(o.X?o.X(t):o.x)-o.x,dy:(o.Y?o.Y(t):o.y)-o.y,s:o.S?o.S(t):1,o:o.op?o.op(t):1}),
    draw:(t,lt,oo)=>{const bk=oo.el.querySelector('.bk');bk.style.transform=`rotateX(${o.RX?o.RX(t):6}deg) rotateY(${o.RY(t)}deg)`;
      const gl=oo.el.querySelector('.gloss');let sp=-1;for(const st of (o.gloss||[])){const p=(t-st)/.9;if(p>=0&&p<=1)sp=p}gl.style.opacity=sp<0?0:1;gl.style.left=lerp(-50,110,sp<0?0:sp)+'%'}});}
// subject icons
const IC={
 math:`<svg viewBox="0 0 120 120" width="130"><g stroke="#ffd45c" stroke-width="9" stroke-linecap="round" fill="none"><path d="M18 30h30M33 15v30M72 30h30M20 82l26 26M46 82l-26 26M72 95h30"/><circle cx="87" cy="81" r="4" fill="#ffd45c"/><circle cx="87" cy="109" r="4" fill="#ffd45c"/></g></svg>`,
 iq:`<svg viewBox="0 0 120 120" width="130"><g stroke="#ffd45c" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M60 14c-22 0-38 16-38 36 0 14 8 22 14 30 4 5 6 10 6 16h36c0-6 2-11 6-16 6-8 14-16 14-30 0-20-16-36-38-36z"/><path d="M44 106h32M50 116h20"/><path d="M60 40v22M50 52h20" stroke="#fff"/></g></svg>`,
 mr:`<svg viewBox="0 0 120 120" width="130"><circle cx="60" cy="60" r="50" stroke="#ffd45c" stroke-width="8" fill="none"/><text x="60" y="84" text-anchor="middle" font-family="P" font-weight="800" font-size="64" fill="#fff">अ</text></svg>`,
 gk:`<svg viewBox="0 0 120 120" width="130"><g stroke="#ffd45c" stroke-width="7" fill="none"><circle cx="60" cy="60" r="48"/><ellipse cx="60" cy="60" rx="22" ry="48"/><path d="M14 46h92M14 74h92M60 12v96"/></g></svg>`,
 news:`<svg viewBox="0 0 120 120" width="120"><g stroke="#ffd45c" stroke-width="7" stroke-linejoin="round" fill="none"><rect x="14" y="20" width="80" height="84" rx="8"/><path d="M94 40h12v52a12 12 0 0 1-24 0"/><path d="M28 38h52M28 56h24M28 72h24M28 88h52" stroke="#fff"/><rect x="60" y="54" width="20" height="20" fill="#ffd45c" stroke="none"/></g></svg>`,
 star:`<svg viewBox="0 0 120 120" width="120"><path d="M60 10l14 32 34 3-26 23 8 34-30-18-30 18 8-34-26-23 34-3z" fill="#ffd45c" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></svg>`,
 check:`<svg viewBox="0 0 100 100" width="100%"><circle cx="50" cy="50" r="46" fill="#22b14c" stroke="#fff" stroke-width="7"/><path d="M28 52 L44 67 L73 36" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};


function BARS(t,cols=['#ffc93c','#0b1a3d','#ffffff','#e3262f']){for(let i=0;i<6;i++){const col=cols[i%cols.length];const d=i*.04;
  A({t0:t-.5+d,t1:t+.5+d,x:540,y:-80+i*420,w:3200,cls:'noshadow',html:`<div style="height:470px;background:${col};box-shadow:0 0 60px rgba(0,0,0,.45)"></div>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:700+i,rot:-14,
   fn:(tt,lt)=>({dx:lerp(i%2?3300:-3300,i%2?-3300:3300,E.inout(clamp(lt/1)))})})}sfx(t-.4,'swoosh',.9);sfx(t-.1,'whoosh',.8);punch(t,.05)}
function RINGT(t){A({t0:t-.4,t1:t+.45,x:540,y:960,w:1080,cls:'noshadow',html:`<div class="ir" style="width:1080px;height:1920px;background:#050a1a"></div><div class="irr" style="position:absolute;left:50%;top:50%;border-radius:50%;border:16px solid #ffc93c;box-shadow:0 0 60px #ffb300,inset 0 0 40px #ffb300"></div>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:700,
  draw:(tt,lt,oo)=>{const r=tt<t?lerp(1250,0,E.inout(clamp((tt-t+.4)/.4))):lerp(0,1250,E.inout(clamp((tt-t)/.45)));oo.el.querySelector('.ir').style.webkitMaskImage=`radial-gradient(circle at 50% 50%,transparent ${r}px,#000 ${r+2}px)`;
    const rr=oo.el.querySelector('.irr');rr.style.width=rr.style.height=(2*r)+'px';rr.style.marginLeft=rr.style.marginTop=(-r)+'px';rr.style.opacity=r>4?1:0}});sfx(t-.35,'whoosh',.9);sfx(t,'reveal',.6)}
// section zoom drift on camera
const DRIFT=[];

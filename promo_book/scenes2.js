function buildScenes(){
const END=55.6;
const SEC=[0,1.8,11.55,22.3,29.2,34.7,41.6,46.05,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.04*E.inout(p)})`});
// --- book master timeline
const vis=t=>{if(t>22.45&&t<32.25)return 0;return 1};
BOOK({t0:1.75,t1:END+1,x:540,y:880,bw:520,z:30,enter:'fade',din:.2,gloss:[3.4,9.6,20.5,36.5,47.2,50.5],
  X:t=>KF(t,[[1.8,540],[9.3,540],[9.8,300],[11.4,300],[11.9,270],[22.0,270],[22.45,540],[32.2,540],[34.6,540],[35.1,250],[41.5,250],[42.0,870],[46.0,870],[46.4,540]]),
  Y:t=>KF(t,[[1.8,880],[9.3,880],[9.8,900],[11.4,900],[11.9,840],[22.0,840],[22.45,960],[32.2,1560],[34.6,1560],[35.1,1000],[41.5,1000],[42.0,1440],[46.0,1440],[46.4,770]]),
  S:t=>{if(t>22.0&&t<22.5)return lerp(.78,3.6,E.in3(clamp((t-22.0)/.45)));return KF(t,[[1.8,.12],[3.0,1.4],[9.3,1.4],[9.8,1.05],[11.4,1.05],[11.9,.78],[22.0,.78],[32.2,.2],[32.9,.62],[34.6,.62],[35.1,.72],[41.5,.72],[42.0,.5],[46.0,.5],[46.4,.4],[47.4,1.02]],'out')},
  RY:t=>{const spin=(a,b)=>lerp(-560,-22,E.out(clamp((t-a)/b)));if(t<3.2)return spin(1.8,1.4);if(t>32.2&&t<33.6)return spin(32.25,1.2);if(t>41.6&&t<43)return spin(41.7,1.2);if(t>46.05&&t<47.7)return spin(46.15,1.4);return -22+Math.sin(t*.9)*9},
  RX:t=>6+Math.sin(t*.7)*2,op:t=>t>22.0&&t<22.5?1-clamp((t-22.3)/.15):(t>=32.2&&t<32.5?clamp((t-32.2)/.2):vis(t))});
E.in3=p=>p*p*p;
sfx(1.85,'whoosh',1);sfx(2.9,'impact',.7);punch(2.95,.06);sfx(32.25,'whoosh',.8);sfx(41.7,'whoosh',.8);sfx(46.15,'whoosh',1);sfx(47.4,'impact',.6);
// transitions
SWEEP(11.55);flash(22.42,1,'#fff6e0');sfx(22.0,'riser',.6);sfx(22.4,'boom',.6);speedlines(22.0,22.6,'rgba(255,236,180,');
BARS(29.2,['#ffc93c','#0b1a3d','#ffffff','#1d3a80']);RINGT(34.7);SWEEP(41.6);BARS(46.05,['#e3262f','#ffc93c','#0b1a3d','#ffffff']);
for(const [t,a] of [[10.5,.05],[15.9,.04],[19.9,.04],[21.7,.06],[25.6,.06],[28.5,.05],[31.35,.04],[37.7,.05],[40.94,.05],[44.3,.06],[49.14,.07],[51.66,.05]])punch(t,a);

// ================= 0. HOOK 0 - 1.8 =================
PILL(0,1.75,540,560,'महसूल सेवक भरती 2026','p-glass',{enter:'down',din:.35,st:'font-size:38px'});
A({t0:0,t1:1.75,x:540,y:900,w:1040,cls:'chipw',html:`<div style="font:900 120px/1.15 P;color:#fff;text-shadow:0 12px 40px rgba(0,0,0,.6)">कोतवाल भरतीची</div><div class="gold" style="font:900 150px/1.15 P">तयारी करताय?</div>`,enter:'zoom',din:.45,exit:'zoom',dout:.3,sfx:'impact',sfxv:.7,z:50,float:.2});
flash(0.05,.5,'#fff2cc');

// ================= 1. BOOK HERO 1.8 - 11.55 =================
PILL(1.9,4.6,540,200,'खास तुमच्यासाठी','p-gold',{enter:'down',st:'font-size:46px'});
GL(4.76,9.3,540,1580,820,`<div class="lab">लेखक</div><div style="font:800 70px/1.25 P;color:#fff">विठ्ठल राऊतवार सर</div><div class="ul" style="height:6px;border-radius:3px;background:linear-gradient(90deg,#ffd45c,#e9a312);margin:12px auto 0;width:0"></div>`,
  {sfx:'whoosh',draw:(t,lt,oo)=>{oo.el.querySelector('.ul').style.width=(E.out(clamp((t-5.2)/.6))*70)+'%'}});
A({t0:6.57,t1:9.3,x:540,y:1780,w:1040,cls:'chipw',html:`<span class="pill p-glass" style="font-size:40px">महसूल सेवक (कोतवाल) भरती</span>`,enter:'up',din:.4,sfx:'pop',sfxv:.5,z:44});
A({t0:9.46,t1:11.55,x:820,y:880,w:420,cls:'gl',html:'',enter:'right',din:.5,sfx:'whoosh',z:46,float:.2,shine:[10.7],
  count:{t0:9.5,t1:10.5,from:0,to:52,fmt:v=>`<div style="padding:26px 10px 30px"><div class="red" style="font:900 220px/1 P">${v}</div><div style="font:800 44px/1.3 P;color:#fff">प्रश्नपत्रिका संच</div></div>`}});
sfx(9.5,'ticks',.6);sfx(10.5,'ding',.7);
PILL(10.2,11.55,540,1600,'2026 ते 2018','p-red',{st:'font-size:54px'});

// ================= 2. STRUCTURE 11.55 - 22.3 =================
TXT(11.6,22.1,540,260,`<div class="lab">पुस्तकाची रचना</div><div style="font:800 64px/1.2 P;color:#fff">एकूण <span class="gold">52</span> प्रश्नपत्रिका</div>`,{enter:'down'});
A({t0:11.7,t1:22.1,x:790,y:830,w:470,cls:'noshadow',html:`<svg viewBox="0 0 560 560" width="470"><defs><linearGradient id="dg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#e9a312"/></linearGradient><linearGradient id="dg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff6b6b"/><stop offset="1" stop-color="#c3121c"/></linearGradient>
  <filter id="dgl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <circle cx="280" cy="280" r="215" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.14)" stroke-width="56"/>
  <circle class="a1" cx="280" cy="280" r="215" fill="none" stroke="url(#dg1)" stroke-width="56" transform="rotate(-90 280 280)" filter="url(#dgl)"/>
  <circle class="a2" cx="280" cy="280" r="215" fill="none" stroke="url(#dg2)" stroke-width="56" filter="url(#dgl)"/>
  <text class="cn" x="280" y="300" text-anchor="middle" font-family="P" font-weight="900" font-size="150" fill="#fff"></text><text class="cl" x="280" y="368" text-anchor="middle" font-family="P" font-weight="700" font-size="34" fill="rgba(255,255,255,.75)"></text></svg>`,
  enter:'zoom',din:.5,sfx:'whoosh',z:40,float:0,
  fn:t=>({r:(t-11.7)*4*(t<15.8?1:0)+(t>=15.8?16.4:0)-16.4*E.out(clamp((t-15.8)/.6))}),
  draw:(t,lt,oo)=>{const C=2*Math.PI*215;const f1=24/52,f2=28/52;const p1=E.inout(clamp((t-15.87)/.8)),p2=E.inout(clamp((t-19.88)/.8));
    const a1=oo.el.querySelector('.a1'),a2=oo.el.querySelector('.a2');a1.setAttribute('stroke-dasharray',`${C*f1*p1} ${C}`);
    a2.setAttribute('stroke-dasharray',`${C*f2*p2} ${C}`);a2.setAttribute('transform',`rotate(${-90+360*f1} 280 280)`);
    const cn=oo.el.querySelector('.cn'),cl=oo.el.querySelector('.cl');let n='?',l='';if(t>=21.66){n=Math.round(lerp(28,52,E.out(clamp((t-21.66)/.6))));l='प्रश्नपत्रिका'}else if(t>=19.88){n=Math.round(lerp(0,28,E.out(clamp((t-19.88)/.7))));l='सराव'}else if(t>=15.87){n=Math.round(lerp(0,24,E.out(clamp((t-15.87)/.7))));l='मूळ'}
    cn.textContent=n;cl.textContent=l}});
sfx(15.9,'swoosh',.7);sfx(19.9,'swoosh',.7);sfx(21.7,'ding',.7);flash(15.9,.2,'#ffe9a8');flash(19.9,.2,'#ffb0b0');
A({t0:12.85,t1:15.8,x:540,y:1400,w:1040,cls:'chipw',html:`<span class="pill p-glass y" style="font-size:52px">2018</span> &nbsp; <span class="pill p-glass y2" style="font-size:52px;opacity:0">2023</span>`,enter:'up',din:.4,sfx:'pop',sfxv:.6,z:44,
  draw:(t,lt,oo)=>{const e=oo.el.querySelector('.y2');const p=clamp((t-15.16)/.3);e.style.opacity=p;e.style.display='inline-block';e.style.transform=`scale(${E.back2(p)})`}});sfx(15.16,'pop',.6);
GL(15.87,22.1,290,1420,470,`<div style="display:flex;align-items:center;gap:14px;justify-content:center"><span style="width:26px;height:26px;border-radius:50%;background:#ffc93c;box-shadow:0 0 14px #ffc93c"></span><span class="gold" style="font:900 100px/1 P">24</span></div><div style="font:800 42px/1.3 P">मूळ प्रश्नपत्रिका</div><div style="margin-top:14px"><span class="pill p-glass" style="font-size:32px;padding:12px 22px 9px;margin:4px">2018</span><span class="pill p-glass" style="font-size:32px;padding:12px 22px 9px;margin:4px">2023</span></div>`,{enter:'left',pad:'26px 20px'});
GL(19.88,22.1,790,1420,470,`<div style="display:flex;align-items:center;gap:14px;justify-content:center"><span style="width:26px;height:26px;border-radius:50%;background:#e3262f;box-shadow:0 0 14px #e3262f"></span><span class="red" style="font:900 100px/1 P">28</span></div><div style="font:800 42px/1.3 P">सराव प्रश्नपत्रिका</div><div style="margin-top:14px"><span class="pill p-glass" style="font-size:32px;padding:12px 22px 9px">नवा पॅटर्न</span></div>`,{enter:'right',pad:'26px 20px'});
PILL(21.66,22.1,540,1680,'24 + 28 = 52','p-gold',{enter:'stamp',st:'font-size:56px'});

// ================= 3. QUESTIONS 22.3 - 29.2 (inside the book) =================
A({t0:22.45,t1:29.2,x:540,y:300,w:780,cls:'gl',html:'',enter:'down',din:.45,sfx:'whoosh',z:48,float:.2,shine:[25.8],
  count:{t0:22.8,t1:25.6,from:0,to:2625,fmt:v=>`<div style="padding:20px 20px 18px"><span class="gold" style="font:900 150px/1 P">${v.toLocaleString('en-IN')}+</span><div style="font:800 46px/1.3 P;color:#fff">प्रश्न</div></div>`}});
sfx(22.8,'ticks',.7);sfx(25.6,'ding',.7);
[['p6.jpg',-30,-200,1000,22.45],['p7.jpg',-10,-70,990,22.55],['p8.jpg',10,70,1000,22.65],['p5.jpg',28,200,1020,22.75]].forEach(([im,ry,dx,y,t0],i)=>{
  A({t0,t1:29.2,x:540,y:960,w:500,cls:'noshadow',html:`<img src="a/${im}" style="width:100%;border-radius:10px;box-shadow:0 30px 60px rgba(0,0,0,.55)">`,enter:'fade',din:.15,sfx:'paper',sfxv:.6,z:30+i,float:.15,
    fn:t=>{const p=E.back(clamp((t-t0)/.6));const sp=E.inout(clamp((t-26.0)/.7));return {ry:ry,dx:dx*p*(1+sp*.25),dy:(y-960)*p-sp*80,s:lerp(.2,1,p)*(1-sp*.08),r:(i-1.5)*3*p,o:1-clamp((t-26.4)/.5)*.6}}})});
A({t0:26.3,t1:29.2,x:540,y:1200,w:980,cls:'gl',html:`<div style="padding:16px;position:relative"><img src="a/zoom.jpg" style="width:100%;border-radius:18px"><div class="hl" style="position:absolute;left:16px;top:0;width:0;border:6px solid #ffc93c;border-radius:14px;box-shadow:0 0 30px rgba(255,201,60,.8)"></div></div>`,
  enter:'zoom',din:.5,sfx:'whoosh',z:55,float:.15,draw:(t,lt,oo)=>{const h=oo.el.querySelector('.hl');const w=(oo.el.querySelector('img').clientWidth||948);h.style.top=(16+w*(146/625))+'px';h.style.height=(w*(46/625))+'px';h.style.width=(E.out(clamp((t-27.5)/.5))*w*(272/625))+'px'}});
PILL(27.5,29.2,540,1690,'प्रत्येक प्रश्नाचे सविस्तर स्पष्टीकरण','p-gold',{st:'font-size:42px'});

// ================= 4. SUBJECTS 29.2 - 34.7 =================
TXT(29.3,34.7,540,280,`<div class="lab">सर्व विषय</div><div style="font:800 64px/1.2 P;color:#fff">एकाच <span class="gold">पुस्तकात</span></div>`,{enter:'down'});
[['math','अंकगणित',29.35,300,640],['iq','बुद्धिमत्ता',29.95,780,640],['mr','मराठी',30.40,300,1030],['gk','सामान्यज्ञान',31.35,780,1030]].forEach(([ic,nm,t0,x,y],i)=>{
  A({t0,t1:34.7,x,y,w:440,cls:'gl',html:`<div style="padding:34px 10px 30px;text-align:center">${IC[ic]}<div style="font:800 54px/1.4 P;margin-top:10px">${nm}</div></div>`,enter:i%2?'right':'left',din:.45,sfx:'whoosh',sfxv:.7,z:42,float:.3,
    fn:t=>{const p=E.inout(clamp((t-33.7)/.6));return {dx:(540-x)*p,dy:(1500-y)*p,s:1-p*.85,o:1-clamp((t-34.1)/.25)}}});PART({type:'sparks',t0:t0+.25,t1:t0+.4,n:24,seed:i*7+3,x,y,speed:500,color:'#ffd45c'})});
sfx(34.1,'impact',.6);PART({type:'sparks',t0:34.15,t1:34.4,n:70,seed:9,x:540,y:1500,speed:800,color:'#ffd45c'});flash(34.15,.25,'#fff2cc');

// ================= 5. UPDATES 34.7 - 41.6 =================
GL(34.79,41.6,700,700,640,`<div style="text-align:center">${IC.news}<div class="lab" style="margin-top:8px">अद्ययावत</div><div style="font:800 58px/1.25 P">चालू घडामोडी</div><div class="gold" style="font:900 60px/1.2 P">सप्टेंबर 2026<br>पर्यंत</div></div>`,{enter:'right',pad:'30px 30px',shine:[37.0]});
A({t0:37.7,t1:41.6,x:950,y:470,w:140,html:IC.check,enter:'stamp',din:.3,sfx:'ding',sfxv:.6,z:50,float:0});
GL(38.91,41.6,700,1300,640,`<div style="display:inline-block;background:linear-gradient(180deg,#ff5a5f,#d11a24);color:#fff;font:800 42px/1 P;padding:16px 30px 12px;border-radius:999px;margin-bottom:16px">विशेष पुरवणी</div>
  <div style="text-align:left;font:700 38px/1.6 P">${['महसूल प्रशासन रचना','कार्यपद्धती','महसूल सेवक (कोतवाल) संवर्ग'].map((s,i)=>`<div class="bl" data-t="${39.5+i*.45}" style="opacity:0"><span style="color:#ffc93c">◆</span> ${s}</div>`).join('')}</div>`,
  {enter:'up',pad:'30px 34px',draw:(t,lt,oo)=>oo.el.querySelectorAll('.bl').forEach(b=>{const p=clamp((t-+b.dataset.t)/.35);b.style.opacity=p;b.style.transform=`translateX(${(1-E.out(p))*40}px)`})});
[39.5,39.95,40.4].forEach(t=>sfx(t,'pop',.4));

// ================= 6. MAP 41.6 - 46.05 =================
{const names=Object.keys(MH.dist);const cen=n=>MH.cent&&MH.cent[n]?MH.cent[n]:[800,550];names.sort((a,b)=>cen(a)[0]-cen(b)[0]);
 const T0=42.26,T1=44.3;const svg=names.map((n,i)=>`<path class="d" data-t="${(T0+(T1-T0)*i/names.length).toFixed(3)}" d="${MH.dist[n]}" fill="#ffc93c" fill-opacity="0" stroke="#fff" stroke-width="2.4" stroke-opacity=".75"/>`).join('');
 A({t0:41.65,t1:46.05,x:540,y:930,w:1040,cls:'noshadow',html:`<div style="position:relative;border-radius:36px;overflow:hidden;box-shadow:0 0 0 3px rgba(255,255,255,.4),0 40px 90px rgba(0,0,0,.6)"><img src="a/map_mh.jpg" style="width:100%"><svg viewBox="0 0 ${MH.W} ${MH.H}" style="position:absolute;left:0;top:0;width:100%;height:100%"><rect width="${MH.W}" height="${MH.H}" fill="rgba(5,10,26,.35)"/>${svg}</svg></div>`,
   enter:'zoom',din:.6,sfx:'whoosh',z:28,float:.1,moves:[{t:41.65,s:1.25,dur:.01},{t:41.7,s:1,dur:1.2,ease:'out'}],draw:(t,lt,oo)=>oo.el.querySelectorAll('.d').forEach(p=>{const q=clamp((t-+p.dataset.t)/.25);p.setAttribute('fill-opacity',(q*.62).toFixed(3));p.setAttribute('stroke-opacity',(.45+q*.55).toFixed(3))})});
 for(let i=0;i<8;i++)sfx(T0+i*(T1-T0)/8,'pop',.35);
 A({t0:42.2,t1:46.05,x:540,y:330,w:560,cls:'gl',html:'',enter:'down',din:.45,sfx:'whoosh',z:48,float:.2,
   count:{t0:42.26,t1:44.3,from:0,to:36,fmt:v=>`<div style="padding:18px 20px"><span class="gold" style="font:900 120px/1 P">${v}</span><span style="font:800 52px P;color:#fff"> जिल्हे</span></div>`}});
 sfx(44.3,'ding',.7);
 PILL(43.82,46.05,420,1700,'आगामी कोतवाल भरतीसाठी उपयुक्त','p-gold',{st:'font-size:38px',w:760});}

// ================= 7. FINAL 46.05 - END =================
TXT(46.3,END+1,540,190,`<div class="gold" style="font:900 92px/1.15 P">महाराष्ट्रात सर्वत्र उपलब्ध</div>`,{enter:'zoom',din:.5,sfx:'impact',sfxv:.5,z:52});
A({t0:48.65,t1:END+1,x:880,y:470,w:290,cls:'noshadow',html:`<div style="width:290px;height:290px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3c4,#ffd45c 35%,#e9a312 75%,#b97a00);box-shadow:0 0 0 8px rgba(255,255,255,.35),0 0 60px rgba(255,201,60,.7),0 30px 50px rgba(0,0,0,.5);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#2a1a00">
  <div style="font:700 34px/1 P">किंमत फक्त</div><div style="font:900 100px/1.1 P">₹460</div></div>`,enter:'stamp',din:.35,sfx:'impact',sfxd:.18,sfxv:.7,z:52,float:.4,rot:-8,shine:[49.6]});
shake(48.85,8);PART({type:'sparks',t0:49.0,t1:49.25,n:60,seed:5,x:880,y:470,speed:700,color:'#ffd45c'});
const PH=`<svg viewBox="0 0 24 24" width="40" style="vertical-align:-6px;margin-right:10px"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#1d7a3a"/></svg>`;
GL(46.25,END+1,540,1330,960,`<div style="display:flex;align-items:center;gap:24px"><img src="a/logo.png" style="width:400px;border-radius:10px"><div style="width:3px;align-self:stretch;background:#cfd6e6"></div><div style="text-align:left;font:800 50px/1.45 P;color:#0b1a3d">${PH}9028967547<br>${PH}7888005554</div></div>`,{white:true,pad:'20px 30px',enter:'up',sfx:'whoosh'});
A({t0:46.8,t1:END+1,x:540,y:1490,w:1040,cls:'chipw',html:`<div style="font:600 34px/1.4 P;color:rgba(255,255,255,.85)">लेखन व संकलन: <b style="color:#fff;font-weight:800">विठ्ठल राऊतवार सर</b></div>`,enter:'fade',din:.5,z:44,float:0});
A({t0:50.72,t1:END+1,x:540,y:1660,w:1040,cls:'chipw',html:`<span class="pill p-red" style="font-size:54px;padding:28px 60px 22px">आजच आपली प्रत मागवा ➜</span>`,enter:'up',din:.45,sfx:'pop',sfxv:.8,z:54,float:0,
  fn:t=>({s:1+Math.max(0,Math.sin((t-51.2)*5))*.05*(t>51.2?1:0)})});
A({t0:51.3,t1:END+1,x:950,y:1770,w:120,cls:'noshadow',html:`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`,enter:'up',din:.4,z:56,float:0,fn:t=>({s:t>51.9&&t<52.15?.85:1})});
sfx(51.95,'click',.9);PART({type:'confetti',t0:52.0,t1:52.4,n:110,seed:41,x:540,y:-40,burst:1,life:3,colors:['#ffd45c','#ffffff','#e3262f','#4f7bff']});
}

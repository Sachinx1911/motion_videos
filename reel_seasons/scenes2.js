E.in=p=>p*p*p;
function buildScenes(){
const NAVY='radial-gradient(circle at 50% 45%,rgba(20,30,60,.2),rgba(4,8,22,.8))';
const DARK='linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.05) 25%,rgba(0,0,0,0) 55%,rgba(0,0,0,.65) 100%)';
const END=93.8;
const TRN={warp:8.62,iris:18.05,flare1:28.1,flare2:35.0,frost:64.22,iris2:75.3,slice1:76.7,iris3:82.95,slice2:84.5,paper:87.85};
// ================= BACKGROUNDS =================
BG({img:'B01_galaxy.jpg',t0:-1,t1:TRN.warp,s0:1.15,s1:1.6,x0:0,x1:60,fade:.05,filter:t=>`brightness(${lerp(.6,.9,clamp(t/2))})`});
BG({img:'B01_galaxy.jpg',t0:TRN.warp,t1:17.15,s0:1.4,s1:1.25,x0:-60,x1:0,fade:.05,filter:'brightness(.7)'});
BG({img:'B13_fog.jpg',t0:17.15,t1:TRN.iris,s0:1.12,s1:1.25,fade:.3,filter:'saturate(.6) brightness(.85)'});
BG({img:'B01_galaxy.jpg',t0:TRN.iris,t1:TRN.flare2,s0:1.3,s1:1.6,x0:-40,x1:60,fade:.05,filter:'brightness(.6)'});
BG({img:'B01_galaxy.jpg',t0:TRN.flare2,t1:41.3,s0:1.5,s1:1.6,fade:.05,filter:'brightness(.55) hue-rotate(-10deg)'});
BG({img:'B07_india_space.jpg',t0:41.3,t1:TRN.frost,s0:1.15,s1:1.35,fade:.4,filter:'brightness(.28) blur(12px)'});
BG({img:'B01_galaxy.jpg',t0:TRN.frost,t1:70.9,s0:1.3,s1:1.45,fade:.05,filter:'brightness(.55) hue-rotate(-25deg)'});
BG({img:'B14_himalaya.jpg',t0:70.9,t1:TRN.iris2,s0:1.25,s1:1.35,fade:.4,filter:'brightness(.3) blur(10px)'});
BG({img:'B13_fog.jpg',t0:TRN.iris2,t1:TRN.slice1,s0:1.08,s1:1.2,x0:40,x1:-20,fade:.05});
BG({img:'B15_tn_rain.jpg',t0:TRN.slice1,t1:78.2,s0:1.2,s1:1.3,fade:.05,filter:'brightness(.45) blur(6px)'});
BG({img:'B10_monsoon_space.jpg',t0:78.2,t1:TRN.iris3,s0:1.25,s1:1.3,fade:.35,filter:'brightness(.28) blur(10px)'});
BG({img:'B15_tn_rain.jpg',t0:TRN.iris3,t1:TRN.slice2,s0:1.1,s1:1.25,x0:120,x1:40,fade:.05});
BG({img:'B01_galaxy.jpg',t0:TRN.slice2,t1:TRN.paper,s0:1.35,s1:1.5,fade:.05,filter:'brightness(.6)'});
BG({img:'B01_galaxy.jpg',t0:TRN.paper,t1:END+1,s0:1.1,s1:1.3,x0:60,x1:-20,fade:.05,filter:'brightness(.8) hue-rotate(15deg)'});
TINT(-1,TRN.warp,NAVY);TINT(TRN.warp,17.15,NAVY);TINT(TRN.iris,41.3,NAVY);TINT(TRN.frost,70.9,NAVY);TINT(TRN.slice2,END+1,NAVY);
for(const [a,b] of [[TRN.iris2,TRN.slice1],[TRN.iris3,TRN.slice2]])TINT(a,b,DARK);
TINT(17.15,TRN.iris,'linear-gradient(180deg,rgba(120,180,255,.35),rgba(10,30,70,.55))');
WARP(TRN.warp);IRIS(TRN.iris);FLARE(TRN.flare1);FLARE(TRN.flare2);FROST(TRN.frost);IRIS(TRN.iris2,'#06142b');SLICE(TRN.slice1);IRIS(TRN.iris3,'#081a2e');SLICE(TRN.slice2,['#ff8a00','#3d8bff','#4dd0e1','#ffffff']);PAPER(TRN.paper);
PART({type:'stars',t0:-1,t1:17.15,n:110,seed:5});PART({type:'stars',t0:TRN.iris,t1:41.3,n:90,seed:6});PART({type:'stars',t0:TRN.frost,t1:70.9,n:90,seed:7});PART({type:'stars',t0:TRN.slice2,t1:END+1,n:120,seed:8});
PART({type:'snow',t0:17.15,t1:TRN.iris,n:150,seed:9});PART({type:'snow',t0:70.9,t1:TRN.iris2,n:110,seed:14});
PART({type:'dust',t0:TRN.iris2,t1:TRN.slice1,n:120,seed:15,life:7,alpha:.7,color:'#ffffff'});
PART({type:'embers',t0:44.7,t1:51.9,n:70,seed:10});
PART({type:'rain',t0:62.3,t1:TRN.frost,n:220,seed:12});
PART({type:'rain',t0:TRN.iris3,t1:TRN.slice2,n:280,seed:16,slant:.35});PART({type:'rain',t0:TRN.slice1,t1:78.2,n:120,seed:17});
HOOKS.push(t=>{const r=document.getElementById('rays');let o=0;for(const [a,b] of RAYW){if(t>a&&t<b+.3)o=Math.max(o,.75*clamp((t-a)/.4)*clamp((b+.3-t)/.4))}r.style.opacity=o;r.style.transform=`rotate(${t*10}deg)`});
for(const t of [63.0,63.75]){flash(t,.45,'#e8f0ff');sfx(t,'thunder',.8);shake(t,8)}flash(83.66,.45,'#e8f0ff');sfx(83.66,'thunder',.7);
sfx(62.3,'rain',1);sfx(TRN.iris3+.1,'rain',.9);

// ================= 0. HOOK 0 - 8.62 =================
A({t0:0,t1:8.5,x:540,y:640,w:1000,cls:'chipw',html:`<div class="ghd" style="font-size:78px">भारतात ऋतू</div><div class="ghd gold" style="font-size:132px;line-height:1.1">येतात कसे?</div>`,enter:'zoom',din:.5,sfx:'impact',z:44,float:.4});
[['I1_sun.png',3.27,'उन्हाळा','#ff8a00',210],['I2_rain.png',3.9,'पावसाळा','#3d8bff',540],['I3_snow.png',4.66,'हिवाळा','#4dd0e1',870]].forEach(([im,t,n,c,x])=>{A({t0:t,t1:8.5,x,y:1010,w:290,cls:'glass dk',html:`<div style="padding:22px 10px 18px"><img src="a/${im}" style="width:170px;display:block;margin:0 auto;filter:drop-shadow(0 0 24px ${c})"><div style="font:800 46px/1.3 B;color:#fff;text-shadow:0 0 18px ${c}">${n}</div></div>`,enter:'pop',din:.45,sfx:'pop',z:46,float:.6});PART({type:'sparks',t0:t+.1,t1:t+.25,n:30,seed:Math.floor(t*10),x,y:1010,speed:600,color:c})});
RAMU(0.25,8.5,'R1_space.png',300,1560,760,{enter:'left',din:.8,float:1.2,z:50});
CHIP(6.99,8.5,'MPSC च्या दृष्टीने!','c-red','',{x:540,y:1280,z:56,enter:'stamp',din:.3,sfx:'stamp',st:'font-size:58px'});punch(7.2,.05);
IMG(6.3,8.5,'I5_books.png',830,1620,400,{enter:'drop',din:.7,sfx:'thud',sfxd:.6,z:51,float:.5});

// ================= 1. MYTH: ORBIT 8.62 - 18.05 =================
const OB={cx:540,cy:860,Ro:400,e:24,sx:55,sun:250};
ORBIT(TRN.warp-.1,16.5,Object.assign({},OB,{theta:t=>KF(t,[[8.6,200],[13.2,300],[15.2,365]]),eR:()=>62,india:13.5,z:28,
  after:(c,t,g)=>{
    if(t>13.3){const a=clamp((t-13.3)/.5);const sx=OB.cx+OB.sx,sy=OB.cy;c.save();c.globalAlpha=a;c.setLineDash([16,12]);c.strokeStyle='#fff';c.lineWidth=5;c.beginPath();c.moveTo(sx+OB.sun*.45,sy);c.lineTo(g.ex-g.eR,g.ey);c.stroke();c.restore();
      if(t>15.0)cPill(c,(sx+g.ex)/2+20,g.ey-70,'सर्वात जवळ!','#e8590c',36,{alpha:clamp((t-15)/.3)});}
    if(t>9.0)cPill(c,g.ex,g.ey+g.eR+55,MONTHTH(g.th),'rgba(20,24,48,.9)',32,{alpha:clamp((t-9)/.4)});
    if(t>14.2){const a=clamp((t-14.2)/.4);const x=OB.cx-OB.Ro;cPill(c,x+10,OB.cy+60,'जुलै: सर्वात दूर','rgba(20,24,48,.9)',28,{alpha:a,align:'l'})}
  }}));
RAMU(8.7,12.2,'R01_think.png',250,1520,520,{enter:'left',z:50});
A({t0:9.75,t1:12.6,x:640,y:330,w:700,cls:'wg',html:`<div style="padding:22px 26px"><div style="font:700 36px/1.3 B;color:#5a5f7a">रामूला वाटलं...</div><div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-top:6px"><img src="a/I1b_sun_real.png" style="width:110px;filter:drop-shadow(0 0 20px #ff9800)"><div style="font:900 58px/1.15 B;color:#1d2140;text-align:left">जवळ आला<br><span class="saffg">= उन्हाळा?</span></div></div></div>`,enter:'pop',din:.5,sfx:'pop',z:52,float:.5});
A({t0:12.55,t1:13.1,x:640,y:330,w:380,html:SVGX,enter:'stamp',din:.22,sfx:'stamp',z:60,float:0});shake(12.75,22);punch(12.75,.07);flash(12.62,.35,'#ff3b3b');
RAMU(12.2,15.0,'R6_oops.png',230,1500,560,{enter:'pop',din:.35,sfx:'buzz',z:50});
STAMP(12.62,13.3,'पण नाही!',620,1450,{st:'font-size:96px'});
WG(13.3,16.4,540,330,900,`<div style="font:800 38px/1.3 B;color:#5a5f7a">पृथ्वी सूर्याच्या</div><div class="t1" style="font-size:72px">सर्वात <span class="saffg">जवळ</span> - जानेवारीत</div>`,{enter:'down',z:44,shine:[14.4]});
CAL(15.2,16.4,830,1450,300,'3','जानेवारी',{z:47});
A({t0:15.6,t1:16.4,x:540,y:1250,w:1000,cls:'chipw',html:`<span class="chip c-glass" style="font-size:36px">14.7 कोटी km (जुलैमध्ये 15.2 कोटी km)</span>`,enter:'up',din:.35,sfx:'pop',z:47});
// zoom on earth at perihelion: India tilted away -> cold
SIDE(16.1,17.45,{phi:()=>180,cx:470,cy:860,R:320,lx:820,lines:{cn:16.3},india:16.3,cool:t=>clamp((t-16.4)/.6)*.7,rays:16.2,z:29,enter:'zoom',din:.5});
A({t0:16.5,t1:17.4,x:540,y:1380,w:1000,cls:'chipw',html:`<span class="chip c-blue" style="font-size:50px">भारतावर तिरकी किरणं ➜ थंडी</span>`,enter:'up',din:.3,sfx:'pop',z:52});
SB(17.2,TRN.iris-.1,'I3_snow.png','थंडी!','#5ec8ff','#1c6fd1',{y:620});
RAMU(17.25,TRN.iris,'R2_fire.png',540,1420,980,{z:50,float:.8,fn:(t)=>({dx:Math.sin(t*55)*3})});sfx(17.3,'wind',.8);

// ================= 2. TILT 18.05 - 22.95 =================
CHIP(18.15,19.25,'मग खरं कारण काय?','c-navy','',{x:540,y:430,st:'font-size:62px',enter:'zoom'});
SIDE(18.2,23.0,{phi:()=>0,beta:15,S:[-.35,.25,.9],cx:540,cy:840,R:320,sun:false,up:t=>1-KF(t,[[19.9,0],[20.9,1]]),spin:t=>t*18,z:30,
  after:(c,t,g)=>{if(t<19.6)return;const a=clamp((t-19.6)/.4);const cx=g.cx,cy=g.cy,R=g.R;
    c.save();c.globalAlpha=a;c.setLineDash([18,12]);c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=5;c.beginPath();c.moveTo(cx,cy-R*1.45);c.lineTo(cx,cy+R*1.45);c.stroke();c.restore();
    const ang=Math.atan2(g.fr.A[0],g.fr.A[1]);if(Math.abs(ang)>.01){c.save();c.globalAlpha=a;c.strokeStyle='#ffd84d';c.lineWidth=8;c.shadowColor='#ffb300';c.shadowBlur=16;c.beginPath();c.arc(cx,cy,R*1.25,-Math.PI/2,-Math.PI/2+ang,ang<0);c.stroke();c.restore();
      const deg=Math.min(23.5,Math.abs(ang)/D2R*23.5/23.44);cPill(c,cx+R*1.3*Math.sin(ang/2)+(ang<0?-70:70),cy-R*1.3*Math.cos(ang/2)-30,deg.toFixed(1)+'°','#e8590c',46,{alpha:a})}}});
A({t0:19.31,t1:22.95,x:540,y:1250,w:1000,cls:'chipw',html:`<span class="ghd" style="font-size:92px">पृथ्वी थोडी <span class="gold">तिरकी</span>!</span>`,enter:'stamp',din:.3,sfx:'impact',sfxd:.15,z:52,float:.3});punch(20.15,.06);sfx(20.1,'swoosh',.9);
A({t0:21.0,t1:22.95,x:540,y:1385,w:1000,cls:'chipw',html:`<span class="chip c-gold" style="font-size:54px">23.5° कललेली</span>`,enter:'up',din:.35,sfx:'ding',z:52});
RAMU(19.4,22.95,'R7_globe.png',150,1620,300,{z:50,float:.6});
// ---- orbit 365
const OB2={cx:540,cy:900,Ro:420,e:26,sx:0,sun:230};
ORBIT(22.9,TRN.flare1+.2,Object.assign({},OB2,{theta:t=>KF(t,[[24.62,180],[27.58,540]],'inout'),eR:()=>85,marks:23.3,india:23.0,z:28,
  after:(c,t,g)=>{if(t>24.62){const a0=180,a1=g.th;c.save();c.strokeStyle='rgba(255,250,210,.95)';c.lineWidth=12;c.shadowColor='#fff';c.shadowBlur=16;c.beginPath();for(let i=0;i<=80;i++){const a=(a0+(a1-a0)*i/80)*D2R;const x=OB2.cx+OB2.Ro*Math.cos(a),y=OB2.cy-OB2.Ro*Math.sin(a)*Math.sin(OB2.e*D2R);i?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();c.restore()}
   cPill(c,g.ex,g.ey+g.eR+50,MONTHTH(g.th),'rgba(20,24,48,.9)',32,{alpha:clamp((t-23.2)/.4)})}}));
A({t0:24.6,t1:TRN.flare1,x:540,y:430,w:640,cls:'glass dk',html:'',enter:'down',din:.45,sfx:'whoosh',z:46,float:.3,count:{t0:24.7,t1:27.5,from:0,to:365,fmt:v=>`<div style="padding:16px 20px"><span class="gold" style="font:900 120px/1.05 B">${v}</span><span style="font:800 50px B;color:#fff"> दिवस</span></div>`}});
sfx(24.7,'ticks',.8);sfx(27.5,'ding',.9);
A({t0:26.0,t1:TRN.flare1,x:540,y:1330,w:1000,cls:'chipw',html:`<span class="chip c-glass" style="font-size:44px">अक्ष नेहमी एकाच दिशेला तिरका</span>`,enter:'up',din:.4,sfx:'pop',z:47});
RAMU(23.2,TRN.flare1,'R18_pointer.png',800,1640,470,{z:50});

// ================= 3. DIRECT RAYS: TROPICS 28.1 - 35.0 =================
const PH1=t=>KF(t,[[28.2,90],[29.75,90],[30.6,0],[31.75,0],[32.6,180],[33.3,180],[34.2,0]]);
SIDE(28.1,TRN.flare2+.2,{phi:PH1,cx:470,cy:900,R:330,lx:830,lines:{eq:28.4,cn:29.9,cp:32.0},hl:t=>t>30.3&&t<31.9?23.44:(t>32.4&&t<33.4?-23.44:null),rays:28.3,india:30.2,hot:t=>clamp((t-33.4)/.5),beams:33.6,z:30});
A({t0:28.2,t1:29.7,x:540,y:380,w:1000,cls:'chipw',html:`<span class="ghd" style="font-size:80px">सूर्याची <span class="gold">सरळ किरणं</span></span>`,enter:'down',din:.45,sfx:'swoosh',z:50});
A({t0:29.75,t1:31.7,x:540,y:380,w:1000,cls:'chipw',html:`<span class="chip c-saff" style="font-size:54px">21 जून: उत्तरेकडे ▲</span>`,enter:'pop',din:.35,sfx:'pop',z:50});
A({t0:30.4,t1:31.7,x:540,y:1500,w:980,cls:'wg',html:`<div style="padding:18px 22px"><div style="font:900 52px/1.25 B;color:#d81b60">कर्कवृत्त (23.5° उ.)</div><div style="font:700 36px/1.35 B;color:#1d2140">सूर्य डोक्यावर येणारी<br>सर्वात उत्तरेकडची रेषा</div></div>`,enter:'up',din:.4,sfx:'whoosh',z:52,shine:[30.9]});
A({t0:31.75,t1:33.3,x:540,y:380,w:1000,cls:'chipw',html:`<span class="chip c-blue" style="font-size:54px">22 डिसेंबर: दक्षिणेकडे ▼</span>`,enter:'pop',din:.35,sfx:'pop',z:50});
A({t0:32.4,t1:33.4,x:540,y:1500,w:980,cls:'wg',html:`<div style="padding:18px 22px"><div style="font:900 52px/1.25 B;color:#0277bd">मकरवृत्त (23.5° द.)</div><div style="font:700 36px/1.35 B;color:#1d2140">सर्वात दक्षिणेकडची रेषा</div></div>`,enter:'up',din:.4,sfx:'whoosh',z:52});
A({t0:33.4,t1:TRN.flare2,x:540,y:380,w:1000,cls:'chipw',html:`<span class="chip c-red" style="font-size:54px">सरळ किरणं = जास्त उष्णता</span>`,enter:'zoom',din:.35,sfx:'impact',z:50});
RAMU(33.73,TRN.flare2,'R3_sweat.png',150,1660,300,{z:50});
A({t0:33.9,t1:TRN.flare2,x:600,y:1470,w:900,cls:'glass dk',html:`<div style="padding:16px 22px;text-align:left;font:800 38px/1.5 B;color:#fff"><div><span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#ff3d00;margin-right:12px;box-shadow:0 0 14px #ff3d00"></span>सरळ किरणं: कमी जागा, जास्त उष्णता</div><div><span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#29b6f6;margin-right:12px;box-shadow:0 0 14px #29b6f6"></span>तिरकी किरणं: जास्त जागा, कमी उष्णता</div></div>`,enter:'up',din:.4,sfx:'whoosh',z:52});

// ================= 4. SUMMER 35.0 - 46.98 =================
SB(35.13,36.05,'I1_sun.png','उन्हाळा','#ffb300','#e8590c');
const PH2=t=>KF(t,[[36.14,90],[38.5,0]]);
SIDE(35.9,41.6,{phi:PH2,cx:470,cy:930,R:330,lx:830,lines:{eq:36.0,cn:36.0},hl:t=>t>40.1?23.44:null,rays:36.0,india:36.3,hot:t=>clamp((t-38.6)/.6)*.6,up:t=>KF(t,[[40.9,0],[41.3,1]]),zoom:t=>KF(t,[[40.95,0],[41.6,1]],'in'),z:30,dout:.25});
MONTHS(36.05,38.45,540,400,[['मार्च',36.14],['एप्रिल',36.35],['मे',36.56]],'#ff7a00');
CAL(38.4,40.9,860,1420,300,'21','जून',{enter:'flipx',z:52});
A({t0:40.1,t1:40.95,x:540,y:400,w:1000,cls:'chipw',html:`<span class="chip c-red" style="font-size:56px">सूर्य थेट कर्कवृत्तावर!</span>`,enter:'stamp',din:.3,sfx:'impact',z:52});
RAMU(36.2,40.9,'R3b_sweat.png',150,1660,260,{z:50});
// ---------- LIVING MAP 41.3 - 64.22 (summer + monsoon) ----------
{const ty=GEO.tropic;const T8=['Gujarat','Rajasthan','Madhya Pradesh','Chhattisgarh','Jharkhand','West Bengal','Tripura','Mizoram'];const st=[43.25,43.37,43.49,43.61,43.73,43.85,43.97,44.09];
 const CL=`clip-path="url(#ci)"`;
 let ov=`<defs><clipPath id="ci"><path d="${GEO.india}"/></clipPath><pattern id="rp" width="40" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(18)"><rect width="40" height="60" fill="rgba(70,170,255,.25)"/><line x1="10" y1="0" x2="10" y2="34" stroke="rgba(220,240,255,.9)" stroke-width="5" stroke-linecap="round"/><line x1="30" y1="28" x2="30" y2="58" stroke="rgba(220,240,255,.7)" stroke-width="4" stroke-linecap="round"/></pattern>
  <linearGradient id="sband" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd84d" stop-opacity="0"/><stop offset=".5" stop-color="#ffe680" stop-opacity=".7"/><stop offset="1" stop-color="#ffd84d" stop-opacity="0"/></linearGradient></defs>`;
 ov+=`<g data-a="fade" data-t0="41.5" data-t1="46.9" data-d=".6"><rect x="0" y="${ty-110}" width="${GEO.W}" height="220" fill="url(#sband)"/></g>`;
 for(let i=0;i<9;i++){const x=80+i*155;ov+=`<g data-a="fall" data-t0="41.6" data-t1="46.9" data-sp=".9" data-ph="${(i*.37)%1}" data-dy="260"><line x1="${x}" y1="${ty-330}" x2="${x}" y2="${ty-170}" stroke="#ffe680" stroke-width="12" stroke-linecap="round" filter="GLOW"/></g>`}
 ov+=MD(41.85,1.0,`<path d="M-40 ${ty} L${GEO.W+40} ${ty}" fill="none" stroke="#ff2d55" stroke-width="30" opacity=".35" filter="BLUR"/><path d="M-40 ${ty} L${GEO.W+40} ${ty}" fill="none" stroke="#ff4d6d" stroke-width="11" filter="GLOW"/>`,{t1:52});
 ov+=MLBL(300,ty-62,'कर्कवृत्त 23.5° उ.','#d81b60',42.1,48,52);
 ov+=T8.map((n,i)=>FILL(GEO.t8[n],'#ff7a00',st[i],{op:.6,t1:44.7})).join('');
 ov+=`<g data-a="fill" data-t0="44.72" data-t1="53.6" data-d=".7" data-pulse="1"><path d="${GEO.india}" fill="#ff3d00" fill-opacity=".42" filter="BLUR"/><path d="${GEO.india}" fill="#ff5722" fill-opacity=".30" stroke="#ffab91" stroke-width="5"/></g>`;
 [[71.5,26.5],[74.5,24],[77.5,23],[80,21],[73,28.5],[76.5,27],[79.5,25]].forEach(([lo,la],i)=>{const [x,y]=GP(lo,la);ov+=`<g data-a="rise" data-t0="${45.0+i*.07}" data-t1="53.7" data-sp=".75" data-ph="${(i*.29)%1}" data-dy="230"><path d="M${x} ${y} c-18 -30 18 -50 0 -80 s18 -50 0 -80" fill="none" stroke="#ffb74d" stroke-width="12" stroke-linecap="round" filter="GLOW"/><polygon points="${x-18},${y-150} ${x},${y-185} ${x+18},${y-150}" fill="#ffcc80"/></g>`});
 const [lx,ly]=GP(74,27.2);
 ov+=`<g data-a="fade" data-t0="52.0" data-d=".6"><path d="M${pt(69.5,26.5)} Q${pt(78,27.5)} ${pt(88,23.8)}" fill="none" stroke="#ff1744" stroke-width="70" stroke-linecap="round" opacity=".35" filter="BLUR"/><path d="M${pt(69.5,26.5)} Q${pt(78,27.5)} ${pt(88,23.8)}" fill="none" stroke="#ff8a80" stroke-width="8" stroke-dasharray="26 18"/></g>`;
 ov+=`<g data-a="pop" data-t0="51.95" data-cx="${lx}" data-cy="${ly}"><circle cx="${lx}" cy="${ly}" r="95" fill="rgba(229,57,53,.9)" stroke="#fff" stroke-width="7"/><text x="${lx}" y="${ly+48}" font-family="B" font-weight="900" font-size="140" fill="#fff" text-anchor="middle">L</text></g><g data-a="ring" data-t0="52.2"><circle cx="${lx}" cy="${ly}" r="20" fill="none" stroke="#ff5252" stroke-width="10"/></g>`;
 ov+=MLBL(lx,ly-150,'कमी दाब','#c62828',52.3,46);
 const [hx,hy]=GP(78,6.6);ov+=`<g data-a="pop" data-t0="53.1" data-cx="${hx}" data-cy="${hy}"><circle cx="${hx}" cy="${hy}" r="80" fill="rgba(25,118,210,.92)" stroke="#fff" stroke-width="7"/><text x="${hx}" y="${hy+42}" font-family="B" font-weight="900" font-size="120" fill="#fff" text-anchor="middle">H</text></g>`;
 ov+=MLBL(hx+260,hy+10,'समुद्र थंड: जास्त दाब','#1565c0',53.25,40,59);
 ov+=WIND(53.9,1.4,`M${pt(70,6)} Q${pt(70,13)} ${pt(73.3,17)} T${pt(74.3,25)}`,'#4fc3ff',{n:6,t1:61.4});
 ov+=WIND(54.2,1.4,`M${pt(66,9)} Q${pt(69,16)} ${pt(71.5,21)} T${pt(73,26)}`,'#4fc3ff',{n:6,t1:61.4});
 ov+=WIND(54.6,1.6,`M${pt(84,5.5)} Q${pt(91,13)} ${pt(90.3,22.5)} Q${pt(88,26.5)} ${pt(79,27.3)}`,'#4fc3ff',{n:7,t1:61.4});
 ov+=MLBL(...GP(67.5,13),'अरबी समुद्र','#1565c0',54.3,40,59)+MLBL(...GP(88,11),'बंगालचा उपसागर','#1565c0',54.7,40,59);
 {const [cx,cy]=GP(68,33.5);ov+=`<g data-a="pop" data-t0="57.4" data-t1="59.0" data-cx="${cx}" data-cy="${cy}"><circle cx="${cx}" cy="${cy}" r="120" fill="rgba(10,14,30,.75)" stroke="#fff" stroke-width="5"/>
   <text x="${cx}" y="${cy-78}" font-family="B" font-weight="800" font-size="40" fill="#fff" text-anchor="middle">उ</text><text x="${cx}" y="${cy+104}" font-family="B" font-weight="800" font-size="40" fill="#fff" text-anchor="middle">द</text><text x="${cx-92}" y="${cy+14}" font-family="B" font-weight="800" font-size="40" fill="#fff" text-anchor="middle">प</text><text x="${cx+92}" y="${cy+14}" font-family="B" font-weight="800" font-size="40" fill="#fff" text-anchor="middle">पू</text>
   <line x1="${cx-62}" y1="${cy+62}" x2="${cx+40}" y2="${cy-40}" stroke="#4fc3ff" stroke-width="16" stroke-linecap="round"/><polygon points="${cx+62},${cy-62} ${cx+18},${cy-48} ${cx+48},${cy-18}" fill="#4fc3ff"/><circle cx="${cx-62}" cy="${cy+62}" r="14" fill="#fff"/></g>`;}
 const [kx,ky]=GP(76.3,10.2);
 ov+=FILL(GEO.ker,'#2fbf55',60.5,{op:.8,pulse:1,t1:61.6})+MPIN(kx,ky-10,60.55)+MLBL(kx+200,ky+10,'केरळ','#0b7a2c',60.7,52,61.5);
 const FR=[[61.75,[[64.5,10.5],[75.5,12.5],[78,9.8],[85,8.5],[99.5,13]],'1 जून',[75.8,13.6]],[61.95,[[64.5,18],[73,19.8],[78,18.3],[84,19.8],[89,24],[99.5,28]],'10 जून',[74.5,20.8]],[62.15,[[64.5,22],[70,23.2],[76,27],[79,30],[99.5,31]],'30 जून',[73.2,25.6]],[62.35,[[64.5,37.5],[99.5,37.5]],'8 जुलै',[71.5,31.0]]];
 FR.forEach(([tf,line,lab,lp])=>{const poly=line.map(([a,b])=>pt(a,b)).join(' L')+` L${pt(99.5,4.5)} L${pt(64.5,4.5)} Z`;
   ov+=`<g data-a="fill" data-t0="${tf}" data-d=".35"><path d="M${poly}" fill="url(#rp)" ${CL}/><path d="M${poly}" fill="rgba(46,160,120,.18)" ${CL}/></g>`;
   if(line.length>2)ov+=MD(tf,.35,`<path d="M${line.map(([a,b])=>pt(a,b)).join(' L')}" fill="none" stroke="#e1f5fe" stroke-width="7" stroke-dasharray="22 14" ${CL}/>`);
   ov+=MLBL(...GP(...lp),lab,'#00695c',tf+.05,38)});
 MAPIT(41.3,TRN.frost,{ov,y:880,w:1000,enter:'fade',din:.35,float:0,moves:[{t:41.3,s:1.0,dur:.01},{t:59.0,x:540,y:880,s:1,dur:.01},{t:59.3,...FOC(77,12.5,1.6,880),dur:1.1,ease:'inout'},{t:61.45,x:540,y:880,s:1,dur:.6,ease:'inout'}]});
 sfx(41.85,'swoosh',.9);T8.forEach((n,i)=>sfx(st[i],'pop',.55));sfx(53.9,'wind',.9);sfx(51.95,'boom',.7);sfx(53.1,'pop',.8);sfx(60.55,'thud',.8);sfx(61.75,'whoosh',.8);
 const MR=['गुजरात','राजस्थान','मध्य प्रदेश','छत्तीसगड','झारखंड','प. बंगाल','त्रिपुरा','मिझोराम'];
 A({t0:43.2,t1:44.75,x:540,y:1460,w:1040,cls:'chipw',html:MR.map((m,i)=>`<span class="chip c-saff s8" data-t="${st[i]}" style="font-size:38px;padding:12px 24px;margin:7px">${m}</span>`).join(''),enter:'fade',din:.1,z:47,float:.2,
   draw:(t,lt,oo)=>oo.el.querySelectorAll('.s8').forEach(s=>{const p=clamp((t-+s.dataset.t)/.3);s.style.opacity=p;s.style.display='inline-block';s.style.transform=`scale(${E.back2(p)})`})});
 A({t0:43.25,t1:44.75,x:930,y:1180,w:220,cls:'glass dk',html:`<div style="padding:10px"><div class="gold" style="font:900 110px/1 B">8</div><div style="font:800 32px B;color:#fff">राज्ये</div></div>`,enter:'stamp',din:.3,sfx:'impact',z:48,float:.3});
 A({t0:41.4,t1:43.2,x:540,y:1460,w:1000,cls:'chipw',html:`<span class="chip c-glass" style="font-size:44px">21 जून: किरणं थेट कर्कवृत्तावर</span>`,enter:'up',din:.4,sfx:'pop',z:47});
 A({t0:44.75,t1:46.9,x:540,y:1450,w:1000,cls:'chipw',html:`<span class="chip c-red" style="font-size:58px">जमीन खूप तापते!</span>`,enter:'stamp',din:.3,sfx:'stamp',z:52});shake(44.95,10);
 RAMU(44.75,46.9,'R3_sweat.png',150,1690,300,{z:50});
 A({t0:48.16,t1:51.9,x:540,y:1450,w:1000,cls:'chipw',html:`<span class="chip c-saff" style="font-size:50px">जमीन तापली ➜ गरम हवा</span>`,enter:'up',din:.35,sfx:'pop',z:52});
 A({t0:49.75,t1:51.9,x:540,y:1570,w:1000,cls:'chipw',html:`<span class="chip c-gold" style="font-size:50px">हलकी होऊन वर जाते ▲</span>`,enter:'up',din:.35,sfx:'pop',z:52});
 A({t0:52.4,t1:53.8,x:540,y:1450,w:1000,cls:'chipw',html:`<span class="chip c-red" style="font-size:56px">कमी दाबाचा पट्टा तयार!</span>`,enter:'stamp',din:.3,sfx:'stamp',z:52});
 A({t0:54.5,t1:57.2,x:540,y:1450,w:1000,cls:'chipw',html:`<span class="chip c-blue" style="font-size:50px">समुद्रावरचे ओले वारे ➜ L कडे</span>`,enter:'up',din:.35,sfx:'pop',z:52});
 A({t0:57.23,t1:59.0,x:540,y:1450,w:1000,cls:'chipw',html:`<div class="ghd" style="font-size:66px">हेच <span class="gold">नैऋत्य मोसमी वारे!</span></div><div style="margin-top:10px"><span class="chip c-glass" style="font-size:38px">नैऋत्य = दक्षिण-पश्चिम दिशा</span></div>`,enter:'zoom',din:.4,sfx:'impact',z:52});
 CAL(59.56,61.4,860,1480,280,'1','जून',{z:55});
 A({t0:59.6,t1:61.4,x:380,y:1480,w:600,cls:'chipw',html:`<span class="chip c-green" style="font-size:48px">मान्सून केरळमध्ये</span>`,enter:'left',din:.4,sfx:'swoosh',z:54});
 MONTHS(61.6,TRN.frost,540,1450,[['जून',61.75],['जुलै',61.92],['ऑगस्ट',62.06],['सप्टेंबर',62.21]],'#1c6fd1');
 A({t0:62.89,t1:TRN.frost,x:540,y:1590,w:1000,cls:'chipw',html:`<span class="chip c-blue" style="font-size:60px">भरपूर पाऊस!</span>`,enter:'stamp',din:.3,sfx:'impact',z:53});
 RAMU(62.7,TRN.frost,'R4_umbrella.png',860,1700,400,{z:52,fn:(t)=>({r:Math.sin(t*9)*1.5})});
 MINI(41.5,TRN.frost,t=>KF(t,[[41.5,180],[47,185],[61.5,250],[64,268]]));
}
SB(46.98,47.95,'I2_rain.png','पावसाळा','#4fa3ff','#1c4fd1',{y:1450});

// ================= 6. WINTER 64.22 - 76.7 =================
SB(64.33,65.45,'I3_snow.png','हिवाळा','#7fdcff','#1c8bd1');
const PH3=t=>KF(t,[[65.5,90],[67.4,180]]);
SIDE(65.3,71.2,{phi:PH3,cx:470,cy:900,R:330,lx:830,lines:{eq:65.4,cn:65.4,cp:65.4},hl:t=>t>69.1?-23.44:null,rays:65.5,india:65.6,cool:t=>clamp((t-67.6)/1)*.55,up:t=>KF(t,[[70.4,0],[70.85,1]]),zoom:t=>KF(t,[[70.45,0],[71.1,1]],'in'),z:30,dout:.25});
A({t0:65.55,t1:67.7,x:540,y:380,w:1000,cls:'chipw',html:`<span class="chip c-blue" style="font-size:54px">सप्टेंबरनंतर सूर्य दक्षिणेकडे ▼</span>`,enter:'down',din:.4,sfx:'swoosh',z:52});
CAL(67.79,70.4,860,1440,290,'22','डिसेंबर',{z:52});
A({t0:69.1,t1:70.45,x:540,y:380,w:1000,cls:'chipw',html:`<span class="chip c-navy" style="font-size:54px">सूर्य थेट मकरवृत्तावर</span>`,enter:'stamp',din:.3,sfx:'impact',z:52});
A({t0:69.4,t1:70.45,x:420,y:1480,w:760,cls:'chipw',html:`<span class="chip c-blue" style="font-size:44px">भारतावर तिरकी किरणं</span>`,enter:'up',din:.35,sfx:'pop',z:52});
{let ov=`<g data-a="fill" data-t0="71.0" data-d=".7"><path d="${GEO.india}" fill="#4fc3f7" fill-opacity=".35" filter="BLUR"/><path d="${GEO.india}" fill="#b3e5fc" fill-opacity=".28" stroke="#e1f5fe" stroke-width="5"/></g>`;
 ov+=`<g data-a="fade" data-t0="71.3" data-d=".8"><path d="M${pt(73.5,35)} L${pt(77,32.8)} L${pt(80,30.6)} L${pt(84,28.6)} L${pt(88,27.9)} L${pt(92,28.2)} L${pt(95.5,28.8)}" fill="none" stroke="#ffffff" stroke-width="60" stroke-linecap="round" opacity=".75" filter="BLUR"/></g>`;
 ov+=`<g data-a="fade" data-t0="71.8" data-d=".8"><path d="M${pt(74,30)} Q${pt(80,27.8)} ${pt(88,25.5)}" fill="none" stroke="rgba(240,245,255,.8)" stroke-width="110" stroke-linecap="round" filter="BLUR"/></g>`;
 ov+=MLBL(...GP(80,29.6),'धुकं','#546e7a',72.0,38);
 const [hx,hy]=GP(76,30.5);ov+=`<g data-a="pop" data-t0="71.45" data-cx="${hx}" data-cy="${hy}"><circle cx="${hx}" cy="${hy}" r="85" fill="rgba(25,118,210,.92)" stroke="#fff" stroke-width="7"/><text x="${hx}" y="${hy+44}" font-family="B" font-weight="900" font-size="125" fill="#fff" text-anchor="middle">H</text></g>`;
 const [lx,ly]=GP(81,6.5);ov+=`<g data-a="pop" data-t0="71.75" data-cx="${lx}" data-cy="${ly}"><circle cx="${lx}" cy="${ly}" r="75" fill="rgba(229,57,53,.9)" stroke="#fff" stroke-width="7"/><text x="${lx}" y="${ly+40}" font-family="B" font-weight="900" font-size="115" fill="#fff" text-anchor="middle">L</text></g>`;
 ov+=MLBL(hx+330,hy-10,'थंड जमीन: जास्त दाब','#1565c0',71.6,38)+MLBL(lx+260,ly-20,'समुद्र: कमी दाब','#c62828',71.9,38);
 ov+=WIND(72.45,1.3,`M${pt(76,28.5)} Q${pt(72,22)} ${pt(66.5,15)}`,'#e3f6ff',{n:6});
 ov+=WIND(72.7,1.3,`M${pt(83,25)} Q${pt(81,17)} ${pt(80.5,9)}`,'#e3f6ff',{n:6});
 ov+=WIND(72.95,1.3,`M${pt(88.5,25.5)} Q${pt(89,18)} ${pt(86,10)}`,'#e3f6ff',{n:6});
 MAPIT(70.9,TRN.iris2,{ov,y:880,enter:'fade',din:.3,float:0});
 A({t0:72.2,t1:TRN.iris2,x:540,y:1450,w:1000,cls:'chipw',html:`<span class="chip c-blue" style="font-size:56px">वारे उलटे फिरतात ↺</span>`,enter:'stamp',din:.3,sfx:'stamp',z:52});
 A({t0:73.7,t1:TRN.iris2,x:540,y:1580,w:1000,cls:'chipw',html:`<span class="chip c-glass" style="font-size:46px">जमिनीकडून ➜ समुद्राकडे</span>`,enter:'up',din:.35,sfx:'pop',z:52});sfx(72.5,'wind',.9);
 MINI(71.0,TRN.iris2,t=>KF(t,[[71,355],[75,360]]));}
A({t0:75.4,t1:TRN.slice1,x:540,y:560,w:1000,cls:'chipw',html:`<span class="ghd" style="font-size:96px">हा आपला <span style="color:#7fdcff">हिवाळा!</span></span>`,enter:'zoom',din:.4,sfx:'impact',z:52});
RAMU(75.35,TRN.slice1,'R5_chai.png',540,1360,880,{z:50,enter:'pop'});

// ================= 7. TWIST: TAMIL NADU 76.7 - 84.5 =================
A({t0:76.81,t1:78.25,x:540,y:820,w:1000,cls:'chipw',html:`<div class="ghd" style="font-size:80px">आणि एक</div><div class="ghd gold" style="font-size:140px;line-height:1.15">भन्नाट गोष्ट!</div>`,enter:'stamp',din:.35,sfx:'impact',sfxd:.15,z:52});punch(77.0,.07);shake(77.0,12);
RAMU(76.85,78.25,'R17_wink.png',540,1560,560,{z:50,enter:'pop'});sfx(76.9,'sparkle',.8);
{const [tx,ty]=GP(78.7,11);
 let ov=`<defs><pattern id="rp2" width="40" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)"><rect width="40" height="60" fill="rgba(70,170,255,.35)"/><line x1="10" y1="0" x2="10" y2="34" stroke="#e1f5fe" stroke-width="5" stroke-linecap="round"/><line x1="30" y1="28" x2="30" y2="58" stroke="#e1f5fe" stroke-width="4" stroke-linecap="round"/></pattern></defs>`;
 ov+=`<g data-a="fill" data-t0="78.3" data-d=".5"><path d="${GEO.india}" fill="#b3e5fc" fill-opacity=".2"/></g>`;
 ov+=WIND(78.37,1.6,`M${pt(92.5,23.5)} Q${pt(90,14)} ${pt(80.6,11.4)}`,'#7fdcff',{w:30,n:8});
 ov+=MLBL(...GP(89.5,17.5),'बंगालचा उपसागर','#1565c0',79.45,42);
 [[90.2,18],[89,15.2],[86.6,13.2],[84,12]].forEach(([lo,la],i)=>{const [x,y]=GP(lo,la);ov+=`<g data-a="pop" data-t0="${80.86+i*.13}" data-cx="${x}" data-cy="${y}"><image href="a/I2_rain.png" x="${x-60}" y="${y-60}" width="120" height="111"/></g>`});
 ov+=MLBL(...GP(87.5,10),'ओलावा घेतात','#00838f',81.0,40);
 ov+=FILL(GEO.tn,'#2f80ff',82.09,{op:.55})+`<g data-a="fill" data-t0="82.3" data-d=".4"><path d="${GEO.tn}" fill="url(#rp2)"/></g>`+MPIN(tx,ty,82.15,'#1c6fd1')+MLBL(tx-60,ty+150,'तमिळनाडू','#0d47a1',82.3,52);
 const f=FOC(84,18.5,1.35,880);MAPIT(78.2,TRN.iris3,{ov,y:880,moves:[{t:78.2,x:f.x,y:f.y,s:1.6,dur:.01},{t:78.25,x:f.x,y:f.y,s:f.s,dur:1,ease:'out'}]});
 sfx(78.4,'wind',.9);sfx(82.15,'thud',.8);sfx(82.4,'rain',.7);
 A({t0:78.6,t1:TRN.iris3,x:540,y:1450,w:1000,cls:'chipw',html:`<span class="chip c-navy" style="font-size:56px">परतीचे वारे (ईशान्य)</span>`,enter:'up',din:.4,sfx:'pop',z:52});
 MINI(78.3,TRN.iris3,t=>KF(t,[[78.3,330],[82.9,355]]));}
A({t0:83.0,t1:TRN.slice2,x:540,y:560,w:1000,cls:'chipw',html:`<div class="ghd" style="font-size:76px">तमिळनाडूत</div><div class="ghd" style="font-size:104px;color:#7fdcff">हिवाळ्यात पाऊस!</div>`,enter:'zoom',din:.4,sfx:'impact',z:52});
A({t0:83.5,t1:TRN.slice2,x:540,y:840,w:1000,cls:'chipw',html:`<span class="chip c-glass" style="font-size:42px">ऑक्टोबर - डिसेंबर</span>`,enter:'up',din:.35,sfx:'pop',z:52});
RAMU(83.05,TRN.slice2,'R4_umbrella.png',560,1480,820,{z:50,enter:'pop',fn:(t)=>({r:Math.sin(t*9)*1.5})});

// ================= 8. SUMMARY 84.5 - 87.85 =================
const OB3={cx:540,cy:760,Ro:400,e:26,sx:0,sun:200};
ORBIT(84.5,TRN.paper+.2,Object.assign({},OB3,{theta:t=>KF(t,[[84.6,0],[87.4,360]],'inout'),eR:()=>70,marks:84.6,z:28,
  after:(c,t,g)=>{[[180,'उन्हाळा','#e8590c'],[250,'पावसाळा','#1565c0'],[0,'हिवाळा','#0288d1'],[360,'हिवाळा','#0288d1']].forEach(([a,s,col])=>{const d=Math.abs(g.th-a);const on=clamp(1-d/40);if(on>0)cPill(c,g.ex,g.ey-g.eR-50,s,col,40,{alpha:on})})}}));
A({t0:85.6,t1:TRN.paper,x:540,y:1230,w:1000,cls:'wg',html:`<div style="padding:22px 20px"><div style="font:900 70px/1.2 B;color:#1d2140">पृथ्वी <span class="saffg">तिरकी</span></div><div style="font:900 70px/1.2 B;color:#1d2140">➜ म्हणून <span style="color:#1c6fd1">ऋतू बदलतात!</span></div></div>`,enter:'zoom',din:.45,sfx:'impact',z:52,shine:[86.6,87.4]});
A({t0:84.6,t1:TRN.paper,x:540,y:400,w:1000,cls:'chipw',html:`<span class="chip c-glass" style="font-size:52px">थोडक्यात</span>`,enter:'down',din:.35,sfx:'pop',z:52});
RAMU(85.4,TRN.paper,'R7_globe.png',540,1680,300,{z:53});
PART({type:'sparks',t0:86.65,t1:86.9,n:80,seed:31,x:540,y:1230,speed:900,color:'#ffd84d'});sfx(86.65,'chime',.8);

// ================= 9. OUTRO =================
A({t0:87.9,t1:END+1,x:540,y:620,w:760,cls:'wg',html:`<div style="padding:30px 20px 26px"><div style="font:900 120px/1.05 B;color:#111">स्पर्धा</div><div style="font:900 120px/1.1 B;color:#e3161b">टाइम्स</div>
  <div style="font:700 36px/1.4 B;color:#5a5f7a;margin-top:8px">स्पर्धा परीक्षा माहिती</div></div>`,enter:'flip',din:.6,sfx:'impact',z:50,shine:[88.9,91.3]});
A({t0:90.4,t1:END+1,x:540,y:1000,w:1000,cls:'chipw',html:`<span class="chip c-red fol" style="font-size:66px;padding:22px 70px">+ फॉलो करा</span>`,enter:'pop',din:.4,sfx:'pop',z:52,
  draw:(t,lt,oo)=>{const c=oo.el.querySelector('.fol');if(t>92.0){c.textContent='✓ फॉलो केले';c.className='chip c-green fol'}}});
A({t0:91.4,t1:END+1,x:700,y:1090,w:150,cls:'noshadow',html:`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`,enter:'up',din:.4,z:55,float:0,fn:(t)=>({s:t>91.9&&t<92.15?.85:1})});
sfx(91.95,'click',1);sfx(92.05,'ding',.8);PART({type:'confetti',t0:92.0,t1:92.4,n:120,seed:41,x:540,y:-40,burst:1,life:3});
RAMU(88.1,END+1,'R26_namaste.png',540,1560,520,{z:50});
}

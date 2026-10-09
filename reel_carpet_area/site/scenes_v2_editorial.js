// SRS Dwell - Carpet / Built-up / Super built-up (editorial minimal style, Pinterest study 8 Oct 2026)
// ---------- editorial helpers ----------
// word-by-word blur reveal: words=[[text,time,cls]], next word shows ghosted
function WORDS(t0,t1,x,y,w,words,o={}){
  const html=`<div style="text-align:${o.align||'center'};${o.st||''}">`+words.map(([s,tt,c],i)=>`<span class="wd ${c||''}" data-t="${tt}">${s}</span>`).join(o.sep===undefined?' ':o.sep)+`</div>`;
  return A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html,enter:'fade',din:.01,float:.1,z:50,sfx:null,
    draw:(t,lt,oo)=>{const ws=[...oo.el.querySelectorAll('.wd')];ws.forEach((el,i)=>{const tt=+el.dataset.t;const p=clamp((t-tt)/.32);
      const ghost=(o.ghost!==false)&&i>0&&t>=+ws[i-1].dataset.t&&p<=0?.13:0;const op=Math.max(ghost,E.out(p));
      el.style.opacity=op;el.style.filter=`blur(${(1-E.out(p))*9}px)`;el.style.transform=`translateY(${(1-E.out(p))*12}px)`})}},o));
}
const DOODLE=(t0,t1,x,y,o={})=>A(Object.assign({t0,t1,x,y,w:90,cls:'noshadow',html:`<svg viewBox="0 0 90 40" width="90"><path d="M4 30 L22 10 L40 30 L58 10 L76 30" fill="none" stroke="#151515" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,enter:'fade',din:.4,float:0,z:30,sfx:null,
  fn:(t)=>({r:Math.sin(t*3+x)*8,dx:Math.sin(t*2+y)*6})},o));
const SER=(s,size,col='')=>`<span class="ser" style="font-size:${size}px;${col?'color:'+col:''}">${s}</span>`;
const sqf=v=>`${v}<span style="font:800 .38em P;letter-spacing:0"> sq.ft</span>`;

function buildScenes(){
const END=76.6;
const SEC=[0,6.5,12.85,29.55,41.3,54.25,63.6,69.05,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.03*E.inout(p)})`});

// wipe transition in light style: ink bar sweeps across
function INK(t,col='#151515'){A({t0:t-.35,t1:t+.4,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="width:1500px;height:2600px;margin:-340px 0 0 -210px;background:${col};transform:skewX(-14deg)"></div>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:700,
  fn:(tt,lt)=>({dx:lerp(-1900,1900,E.inout(clamp(lt/.75)))})});sfx(t-.3,'swoosh',.8);sfx(t,'thud',.35)}
INK(6.5);INK(12.85,'#b8935f');INK(29.55);INK(41.3,'#b8935f');INK(54.25);INK(63.6,'#b8935f');INK(69.05);
for(const [t,a] of [[0.26,.04],[3.88,.07],[5.48,.05],[9.48,.03],[10.42,.03],[11.7,.03],[18.6,.04],[25.8,.04],[27.42,.04],[36.58,.05],[40.06,.05],[50.72,.05],[53.3,.07],[58.75,.05],[66.61,.06],[75.13,.04]])punch(t,a);
// corner doodles (kept inside safe area)


// ---------- HUD (safe area) ----------
A({t0:0,t1:END+1,x:205,y:300,w:170,img:'logo_gold.png',cls:'noshadow',enter:'fade',din:.6,float:0,z:600,fn:t=>({o:t>72.0?1-clamp((t-72)/.4):1})});
A({t0:0.5,t1:72.0,x:610,y:300,w:520,cls:'noshadow',html:`<div style="text-align:left"><span style="display:inline-block;font:600 24px/1.35 P;color:#3d3a35;background:rgba(255,255,255,.72);border:1.5px solid rgba(0,0,0,.12);border-radius:14px;padding:10px 16px 8px">* उदाहरणासाठी आकडे -<br>project नुसार बदलतात</span></div>`,enter:'fade',din:.6,float:0,z:600});

// ================= HOOK 0 - 6.5 =================
BG({img:'B01_empty_flat.jpg',t0:0,t1:6.55,s0:1.14,s1:1.03,fade:.2,filter:'saturate(.85) brightness(1.02)'});
TINT(0,6.5,'linear-gradient(180deg,rgba(244,241,236,.96) 0%,rgba(244,241,236,.9) 36%,rgba(244,241,236,.15) 62%,rgba(244,241,236,.3) 100%)',.2);
A({t0:0,t1:3.85,x:540,y:640,w:860,cls:'noshadow',html:'',enter:'zoom',din:.4,sfx:'impact',sfxv:.5,z:50,float:.15,
  count:{t0:0.0,t1:0.9,from:0,to:1000,fmt:v=>`<div class="big" style="font-size:190px">${sqf(v)}</div>`}});
WORDS(0.2,6.5,540,480,860,[['flat',1.26,''],['घेतला...',1.54,'']],{st:'font:700 46px/1.2 P'});
A({t0:3.62,t1:6.5,x:540,y:640,w:860,cls:'noshadow',html:'',enter:'fade',din:.1,z:52,float:.15,
  count:{t0:3.7,t1:4.2,from:1000,to:700,fmt:v=>`<div class="big acc" style="font-size:190px">${sqf(v)}</div>`},fn:(t,lt)=>({s:1+.12*Math.sin(clamp(lt/.25)*Math.PI)})});
shake(3.9,10);sfx(3.7,'ticks',.5);
WORDS(4.9,6.5,540,860,860,[['उरलेले',4.9,'lead'],['300',5.48,'ser acc'],['गेले कुठे?',5.8,'ser']],{st:'font-size:76px;line-height:1.1'});

// ================= 3 WORDS 6.5 - 12.85 =================
WORDS(6.56,12.85,540,470,860,[['हे',6.56,''],['समजण्यासाठी',6.78,''],['3',7.6,'acc'],['शब्द',7.98,'']],{st:'font:800 54px/1.25 P'});
[['Carpet',9.48,600],['Built-up',10.42,760],['Super Built-up',11.7,920]].forEach(([s,t0,y],i)=>
  WORDS(t0-.05,12.85,540,y,880,[['·',t0,'gd'],[s,t0,'']],{st:`font-family:S;font-style:italic;font-weight:600;font-size:${[104,104,86][i]}px;line-height:1`,ghost:false}));
[9.48,10.42,11.7].forEach(t=>sfx(t,'pop',.5));
A({t0:9.3,t1:12.85,x:500,y:1250,w:380,img:'O02_model.png',cls:'noshadow',enter:'rise',din:.6,sfx:'whoosh',z:40,float:.3});

// ================= FLOOR PLAN (shared 12.85 - 54.25) =================
// plan geometry (viewBox 700x700): carpet interior 150..550, outer wall 26 thick, balcony left-bottom, common ring outside
const PL=`<svg viewBox="0 0 700 760" width="600" style="overflow:visible">
 <defs><pattern id="ht" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="16" stroke="rgba(21,21,21,.25)" stroke-width="5"/></pattern></defs>
 <rect class="cm" x="40" y="40" width="620" height="680" rx="24" fill="rgba(13,23,41,.06)" stroke="#0d1729" stroke-width="4" stroke-dasharray="18 12" opacity="0"/>
 <g class="cln" fill="none" stroke="#0d1729" stroke-width="4" stroke-dasharray="10 10">
  <path class="c0" d="M150 150 L230 230"/><path class="c1" d="M550 150 L470 230"/><path class="c2" d="M150 610 L230 530"/><path class="c3" d="M550 610 L470 530"/></g>
 <g class="ic ic0"><rect x="70" y="70" width="88" height="88" rx="16" fill="#0d1729"/><path d="M90 136 L90 120 L106 120 L106 106 L122 106 L122 92 L138 92" fill="none" stroke="#fff" stroke-width="6"/><text x="114" y="48" text-anchor="middle" font-family="P" font-weight="800" font-size="40" fill="#0d1729">जिना</text></g>
 <g class="ic ic1"><rect x="542" y="70" width="88" height="88" rx="16" fill="#0d1729"/><rect x="566" y="86" width="40" height="56" rx="4" fill="none" stroke="#fff" stroke-width="5"/><path d="M586 98 l-8 10 h16z M586 130 l-8 -10 h16z" fill="#fff"/><text x="586" y="48" text-anchor="middle" font-family="P" font-weight="800" font-size="40" fill="#0d1729">Lift</text></g>
 <g class="ic ic2"><rect x="70" y="602" width="88" height="88" rx="16" fill="#0d1729"/><rect x="96" y="622" width="36" height="52" rx="3" fill="none" stroke="#fff" stroke-width="5"/><circle cx="124" cy="650" r="4" fill="#fff"/><text x="114" y="740" text-anchor="middle" font-family="P" font-weight="800" font-size="40" fill="#0d1729">Lobby</text></g>
 <g class="ic ic3"><rect x="542" y="602" width="88" height="88" rx="16" fill="#0d1729"/><path d="M560 672 V642 L586 624 L612 642 V672 Z" fill="none" stroke="#fff" stroke-width="5"/><rect x="580" y="652" width="12" height="20" fill="#fff"/><text x="586" y="740" text-anchor="middle" font-family="P" font-weight="800" font-size="36" fill="#0d1729">Clubhouse</text></g>
 <rect class="bal" x="96" y="470" width="58" height="140" fill="rgba(184,147,95,.18)" stroke="#8a6a3c" stroke-width="4" opacity="0"/>
 <rect class="ow" x="150" y="160" width="400" height="450" fill="none" stroke="#6b6b6b" stroke-width="0"/>
 <rect class="cp" x="164" y="174" width="372" height="422" fill="rgba(184,147,95,.32)"/>
 <g class="iw" stroke="#151515" stroke-width="6"><line x1="164" y1="370" x2="420" y2="370"/><line x1="350" y1="174" x2="350" y2="370"/><line x1="420" y1="370" x2="420" y2="596"/><line x1="420" y1="480" x2="536" y2="480"/></g>
 <rect class="duct" x="476" y="174" width="60" height="60" fill="url(#ht)" stroke="#151515" stroke-width="3" opacity="0"/>
 <rect class="edge" x="164" y="174" width="372" height="422" fill="none" stroke="#151515" stroke-width="6"/>
 <g font-family="P" font-weight="700" font-size="26" fill="#151515" text-anchor="middle" class="lbl"><text x="257" y="280">बेडरूम</text><text x="290" y="490">हॉल</text><text x="478" y="430">किचन</text><text x="478" y="545">WC</text></g>
</svg>`;
A({t0:12.85,t1:54.25,x:490,y:860,w:600,cls:'noshadow',html:PL,enter:'fade',din:.3,float:0,z:40,
  fn:t=>{const z=t<29.55?0:(t<41.3?E.inout(clamp((t-29.55)/.6))*.06:.06+E.inout(clamp((t-41.3)/.6))*.04);return {s:1-z}},
  draw:(t,lt,oo)=>{const q=s=>oo.el.querySelector(s);
    const ed=q('.edge');if(!oo.L)oo.L=2*(372+422);ed.style.strokeDasharray=oo.L;ed.style.strokeDashoffset=oo.L*(1-E.inout(clamp((t-13.0)/.9)));
    q('.cp').style.opacity=clamp((t-13.6)/.5)*(t>29.55?1:1);q('.iw').style.opacity=clamp((t-13.9)/.4);q('.lbl').style.opacity=clamp((t-14.2)/.4);
    // excluded flashes (carpet scene): outer wall 21.72, duct 22.96, balcony 23.64
    const ow=q('.ow');const owW=t<29.55?(t>21.72&&t<26.28?14*(.5+.5*Math.sin(t*10)):0):28*E.out(clamp((t-32.64)/.6));ow.setAttribute('stroke-width',owW);ow.style.stroke=t<29.55?'#d6342a':'#6b6b6b';
    q('.duct').style.opacity=t<29.55?(t>22.96&&t<26.28?1:0):0;
    q('.bal').style.opacity=t<29.55?(t>23.64&&t<26.28?.9:0):clamp((t-34.56)/.4);q('.bal').style.stroke=t<29.55?'#d6342a':'#8a6a3c';
    q('.iw').style.stroke=(t>27.42&&t<29.55)?'#2a9d55':'#151515';
    q('.cm').style.opacity=clamp((t-44.9)/.5);q('.cm').style.strokeDashoffset=-t*30;
    [46.94,47.72,48.44,49.16].forEach((t0,k)=>{const g=q('.ic'+k);const p=clamp((t-t0)/.35);const pu=t>t0+.35?1+.06*Math.max(0,Math.sin((t-t0)*6)):E.back2(p);g.style.opacity=p;g.style.transformBox='fill-box';g.style.transformOrigin='center';g.style.transform=`scale(${pu})`;
      const c=q('.c'+k);c.style.opacity=clamp((t-t0-.15)/.3);c.style.strokeDashoffset=-t*40;});
    q('.cp').style.fill=t>50.72&&t<54.25?`rgba(214,52,42,${.18+.12*Math.sin(t*8)})`:'rgba(184,147,95,.32)'}});

// ================= 1. CARPET 12.85 - 29.55 =================
WORDS(12.9,29.55,540,420,880,[['1.',12.9,'gd'],['Carpet',13.38,'ser'],['Area',13.82,'ser']],{st:'font-size:96px;line-height:1',ghost:false});
WORDS(14.14,21.5,490,1260,740,[['घराच्या',14.5,''],['आत',15.0,''],['खरोखर',15.5,'acc'],['वापरता',16.02,''],['येणारी',16.3,''],['जागा',16.8,'']],{st:'font:800 50px/1.3 P'});
A({t0:17.22,t1:21.5,x:490,y:1380,w:740,cls:'chipw',html:`<span class="chip">UDCPR व्याख्या 25</span> <span class="chip dk">RERA</span>`,enter:'up',din:.4,sfx:'pop',sfxv:.5,z:50,float:0});
// excluded list
const EX=[['✕ बाहेरच्या भिंती',21.72],['✕ Duct',22.96],['✕ Balcony',23.64],['✕ Terrace',24.6]];
EX.forEach(([s,t0],i)=>A({t0,t1:29.55,x:310+(i%2)*340,y:1250+Math.floor(i/2)*80,w:320,cls:'chipw',html:`<span class="chip" style="border-color:#d6342a;color:#d6342a;font-size:32px">${s}</span>`,enter:'pop',din:.3,sfx:'pop',sfxv:.45,z:52,float:.1}));
A({t0:25.06,t1:27.4,x:490,y:1420,w:740,cls:'chipw',html:`<span style="font:800 40px P;color:#d6342a">carpet मध्ये मोजले जात नाहीत</span>`,enter:'up',din:.3,z:52,float:0});
A({t0:27.42,t1:29.55,x:490,y:1420,w:740,cls:'chipw',html:`<span class="chip" style="border-color:#2a9d55;color:#2a9d55;background:#eaf6ee">✓ आतल्या भिंती = carpet मध्येच</span>`,enter:'stamp',din:.3,sfx:'ding',sfxv:.6,z:55,float:0});

// ================= 2. BUILT-UP 29.55 - 41.3 =================
WORDS(29.62,41.3,540,420,880,[['2.',29.62,'gd'],['Built-up',30.32,'ser'],['Area',30.7,'ser']],{st:'font-size:96px;line-height:1',ghost:false});
A({t0:31.06,t1:41.3,x:490,y:1270,w:740,cls:'noshadow',html:`<div style="font:800 46px/1.5 P;text-align:center">Carpet <span class="gd">+ भिंतींची जाडी</span> <span class="acc">+ Balcony</span></div>`,enter:'up',din:.4,sfx:'swoosh',sfxv:.5,z:50,float:.1,
  draw:(t,lt,oo)=>{const sp=oo.el.querySelectorAll('span');sp[0].style.opacity=clamp((t-32.64)/.3);sp[1].style.opacity=clamp((t-34.56)/.3)}});
A({t0:36.4,t1:41.3,x:490,y:1395,w:740,cls:'noshadow',html:'',enter:'fade',din:.2,z:50,float:0,
  count:{t0:36.58,t1:37.4,from:700,to:820,fmt:v=>`<div style="text-align:center;font:900 92px/1 P">${sqf(v)} <span class="ser" style="font-size:40px;color:#6b6b6b">built-up</span></div>`}});
A({t0:39.26,t1:41.3,x:700,y:560,w:300,cls:'chipw',html:`<span class="chip dk" style="font-size:40px">+10-20%</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.6,z:55,float:0,rot:-6});

// ================= 3. SUPER BUILT-UP 41.3 - 54.25 =================
WORDS(41.36,54.25,540,400,880,[['3.',41.52,'gd'],['Super',42.16,'ser'],['Built-up',42.66,'ser']],{st:'font-size:92px;line-height:1',ghost:false});
WORDS(43.4,50.6,490,1260,740,[['घराबाहेरच्या',44.2,''],['सामायिक',44.9,'gd'],['जागांचा',45.46,''],['वाटा',45.9,'']],{st:'font:800 48px/1.3 P'});
A({t0:50.72,t1:54.25,x:490,y:1280,w:740,cls:'chipw',html:`<span class="chip dk" style="font-size:44px">= Loading</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.7,z:55,float:0});
A({t0:51.9,t1:54.25,x:490,y:1410,w:740,cls:'noshadow',html:'',enter:'fade',din:.2,z:50,float:0,
  count:{t0:52.48,t1:53.3,from:700,to:1000,fmt:v=>`<div style="text-align:center;font:900 96px/1 P"><span class="acc">700</span> <span style="color:#9a958c">→</span> ${sqf(v)}</div>`}});
flash(53.3,.25,'#fff');PART({type:'sparks',t0:53.35,t1:53.6,n:50,seed:7,x:490,y:1410,speed:600,color:'#d6342a'});

// ================= RERA 54.25 - 63.6 =================
WORDS(54.3,63.6,540,430,860,[['पण',54.3,''],['आता',54.46,''],['कायदा',54.88,'gd'],['तुमच्या',55.5,''],['बाजूने',55.84,'ser gd']],{st:'font:800 60px/1.25 P'});
A({t0:56.4,t1:63.6,x:490,y:880,w:560,img:'O05_agreement.jpg',cls:'noshadow mul',enter:'rise',din:.6,sfx:'paper',sfxv:.6,z:40,float:.3,shine:[61.0]});
A({t0:56.59,t1:63.6,x:520,y:640,w:420,cls:'chipw',html:`<span class="chip dk" style="font-size:44px">RERA</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.6,z:55,float:0});
WORDS(58.4,63.6,490,1270,740,[['भाव',58.53,''],['=',58.7,'gd'],['Carpet',58.75,'ser gd'],['area',59.27,'ser gd'],['वर',59.51,'']],{st:'font:800 58px/1.3 P'});
A({t0:60.91,t1:63.6,x:490,y:1380,w:740,cls:'chipw',html:`<span class="chip" style="border-color:#2a9d55;color:#2a9d55;background:#eaf6ee;font-size:36px">✓ करारात carpet area स्पष्ट</span>`,enter:'pop',din:.35,sfx:'ding',sfxv:.6,z:55,float:0});
TXT(60.0,63.6,490,1455,`<div style="font:500 24px/1.4 P;color:#7a756c">* RERA नोंदणीकृत projects साठी</div>`,{enter:'fade',din:.4,float:0,sfx:null,z:55});

// ================= QUESTION 63.6 - 69.05 =================
WORDS(63.67,69.05,540,560,860,[['flat',63.93,''],['घेताना',64.33,''],['एकच',64.77,'gd'],['प्रश्न',65.21,'']],{st:'font:700 52px/1.3 P'});
WORDS(65.9,69.05,520,860,860,[['Carpet',65.95,'ser'],['area',66.43,'ser'],['किती?',66.61,'acc']],{st:'font-size:120px;line-height:1.05;font-weight:800'});
PART({type:'sparks',t0:66.7,t1:66.9,n:50,seed:11,x:520,y:860,speed:700,color:'#b8935f'});
A({t0:67.33,t1:69.05,x:490,y:1180,w:740,cls:'chipw',html:`<span class="chip" style="font-size:40px">🔍 करारात तोच आकडा तपासा</span>`,enter:'up',din:.4,sfx:'swoosh',sfxv:.5,z:55,float:0});

// ================= SHARE + OUTRO 69.05 - END =================
WORDS(69.09,72.0,540,620,860,[['हा',69.09,''],['video',69.49,'ser'],['flat',69.75,''],['घेणाऱ्या',70.17,''],['मित्रांना',70.81,'gd'],['पाठवा',71.71,'acc']],{st:'font:800 64px/1.3 P'});
A({t0:69.4,t1:72.0,x:490,y:1050,w:300,cls:'noshadow',html:IC.share(220).replace(/#e8cf9f/g,'#151515'),enter:'pop',din:.4,sfx:'pop',z:50,float:.4});
TINT(72.0,END+1,'linear-gradient(180deg,#0d1729,#162644)',.3);
WORDS(72.07,END+1,540,560,860,[['अशाच',72.07,''],['real',72.57,'ser gd'],['estate',72.83,'ser gd'],['माहितीसाठी',73.09,'']],{st:'font:800 58px/1.3 P;color:#fff'});
A({t0:72.4,t1:END+1,x:540,y:900,w:560,cls:'gl',html:`<div style="padding:44px 50px 38px;background:#faf7f2"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'reveal',sfxv:.6,z:50,float:.15,shine:[73.4,75.6]});
A({t0:73.71,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span class="chip" style="background:#b8935f;border-color:#b8935f;color:#111;font-size:44px;padding:22px 40px 16px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.45,sfx:'pop',sfxv:.8,z:54,float:0,
  fn:t=>({s:(t>75.05&&t<75.25?.93:1)})});
A({t0:74.3,t1:END+1,x:760,y:1350,w:110,cls:'noshadow',html:`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`,enter:'up',din:.4,z:56,float:0,fn:t=>({s:t>75.05&&t<75.25?.85:1})});
sfx(75.13,'click',.9);PART({type:'confetti',t0:75.2,t1:75.5,n:100,seed:41,x:540,y:-40,burst:1,life:3,colors:['#b8935f','#ffffff','#f2dfb6','#d6342a']});
}
// Instagram safe-area guide (index_safe.html only)
if(window.SAFE_GUIDE){const g=document.createElement('div');g.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:9999';
 g.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:220px;background:rgba(255,0,0,.2);border-bottom:3px solid #ff4040"></div>
 <div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:rgba(255,0,0,.2);border-top:3px solid #ff4040"></div>
 <div style="position:absolute;left:100px;top:0;bottom:0;border-left:3px dashed #e0a000"></div><div style="position:absolute;right:100px;top:0;bottom:0;border-left:3px dashed #e0a000"></div>
 <div style="position:absolute;left:890px;right:35px;top:860px;bottom:420px;background:rgba(255,140,0,.3);border-left:3px solid #ff9900"></div>`;
 document.getElementById('root').appendChild(g)}

// SRS Dwell - Bedroom चा किमान आकार (Photoreal + infographic + 3D arch-viz). Times = word cues C(word, approxTime)
function WORDS(t0,t1,x,y,w,words,o={}){
  const html=`<div style="text-align:${o.align||'center'};${o.st||''}">`+words.map(([s,tt,c])=>`<span class="wd ${c||''}" data-t="${tt}">${s}</span>`).join(' ')+`</div>`;
  return A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html,enter:'fade',din:.01,float:.08,z:50,sfx:null,
    draw:(t,lt,oo)=>{oo.el.querySelectorAll('.wd').forEach(el=>{const p=E.out(clamp((t-(+el.dataset.t))/.3));el.style.opacity=p;el.style.filter=`blur(${(1-p)*8}px)`;el.style.transform=`translateY(${(1-p)*12}px)`})}},o));
}
const PANEL=(t0,t1,x,y,w,inner,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.92);border:1.5px solid rgba(0,0,0,.08);border-radius:30px;box-shadow:0 24px 60px rgba(0,0,0,.18);padding:${o.pad||'26px 30px'};text-align:center">${inner}</div>`,enter:'up',din:.45,sfx:'whoosh',sfxv:.5,z:60,float:.12},o));
const LBL=(t0,t1,x,y,txt,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||420,cls:'chipw',html:`<span style="display:inline-block;font:800 ${o.fs||34}px/1 P;padding:16px 26px 12px;border-radius:999px;background:${o.bg||'#fff'};color:${o.col||'#151515'};box-shadow:0 10px 26px rgba(0,0,0,.28);white-space:nowrap">${txt}</span>`,enter:'pop',din:.35,sfx:'pop',sfxv:.55,z:65,float:.15},o));
const STAMP=(t0,t1,x,y,txt,col='#b8935f',o={})=>A(Object.assign({t0,t1,x,y,w:o.w||760,cls:'chipw',html:`<div style="display:inline-block;border:9px solid ${col};color:${col};border-radius:22px;padding:16px 36px 10px;font:900 ${o.fs||84}px/1.1 P;letter-spacing:3px;background:rgba(255,253,249,.85);transform:rotate(${o.rot||-5}deg)">${txt}</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.1,sfxv:.9,z:70,float:0},o));
const GOLD='#b8935f';
const NAVY='#0d1729',RED='#d6342a';
const CUE=window.CUES||[];
// time of the first spoken word containing w, at/after approx time `near` (so re-recorded lines re-time automatically)
function C(w,near=0){const n=s=>s.replace(/[,.?!।]/g,'');const f=CUE.find(o=>o.s>=near-.8&&n(o.w).includes(w));if(!f){console.log('NOCUE',w,near);return near}return f.s}
// full-frame wipe-line transition to the next image (gold line sweeps right->left)
const WIPE=(t,img,dur=.6)=>A({t0:t,t1:t+dur+.04,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="position:relative;width:1080px;height:1920px"><div class="im" style="position:absolute;inset:0;background:url(a/${img}) center/cover"></div><div class="ln" style="position:absolute;top:0;bottom:0;width:10px;background:#f2dfb6;box-shadow:0 0 34px #e8cf9f,0 0 8px #fff"></div></div>`,enter:'fade',din:.01,float:0,z:3,sfx:'swoosh',sfxv:.7,
  draw:(tt,lt,oo)=>{const p=E.inout(clamp(lt/dur));const x=1080*(1-p);oo.el.querySelector('.im').style.clipPath=`inset(0 0 0 ${x}px)`;oo.el.querySelector('.ln').style.left=(x-5)+'px'}});
const NUM=(t0,t1,x,y,big,small,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||560,cls:'chipw',html:`<div style="display:inline-block;background:rgba(255,253,249,.95);border-radius:26px;padding:16px 30px 12px;box-shadow:0 18px 44px rgba(0,0,0,.22);text-align:center"><div style="font:900 ${o.fs||84}px/1 P;color:${o.col||'#151515'}">${big}</div><div style="font:700 28px/1.3 P;color:#6b6b6b">${small}</div></div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:65,float:.12},o));

function buildScenes(){
const END=91.3;
const T={hook:0,q:C('महाराश',4.2),book:C('UD',8.8),hab:C('बेड्रूम',13.5),zero:C('मंझे',20.3),kit:C('हो',23.7),leg:C('पंजे',28.7),wait:C('पंठांबा',33.2),h:C('एक',36.7),win:C('2',48.1),bath:C('तीन',58.6),split:C('भणजे',69.8),plan:C('मनुनच',72.4),cm:C('आता',78.5),out:C('अचाच',87)};
const SEC=[0,T.q,T.book,T.hab,T.zero,T.kit,T.leg,T.wait,T.h,T.win,T.bath,T.split,T.plan,T.cm,T.out,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.03*E.inout(p)})`});
const CUT=t=>{flash(t,.35,'#fffaf0');sfx(t-.15,'whoosh',.5);punch(t,.03)};
[T.q,T.book,T.hab,T.wait,T.h,T.bath,T.plan,T.cm,T.out].forEach(CUT);

// ---------- HUD ----------
A({t0:0,t1:T.out,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.92);border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.15)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:600});
A({t0:0.5,t1:T.out,x:610,y:300,w:480,cls:'noshadow',html:`<div style="text-align:left"><span style="display:inline-block;font:600 20px/1.35 P;color:#3d3a35;background:rgba(255,253,249,.9);border-radius:12px;padding:8px 14px 6px;white-space:nowrap">* UDCPR-2020 नियम 9.2 - मुंबई (MCGM) सोडून</span></div>`,enter:'fade',din:.5,float:0,z:600});

// ================= 1 HOOK : small bedroom + size pills =================
BG({img:'B01_small_bedroom.jpg',t0:0,t1:T.q+.05,s0:1.0,s1:1.12,y0:0,y1:-30,fade:.2});
TINT(0,T.q,'linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 70%,rgba(0,0,0,.25))',.2);
// tape-measure line across the room width
A({t0:.2,t1:T.q,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920"><line class="tp" x1="200" y1="1230" x2="200" y2="1230" stroke="#f2c230" stroke-width="16" stroke-linecap="round"/><g class="tk"></g></svg>`,enter:'fade',din:.1,float:0,z:40,
  draw:(t,lt,oo)=>{const p=E.inout(clamp((t-.4)/.9));oo.el.querySelector('.tp').setAttribute('x2',200+680*p)}});
LBL(C('दहा',1.2),T.q,540,640,'10 × 10 ?',{bg:'#fff',fs:58,w:420});
LBL(C('आट',2.2),T.q,540,780,'8 × 10 ?',{bg:'#fff',fs:58,w:420});
LBL(C('लहान',3.6),T.q,540,920,'की त्याहून लहान?',{bg:RED,col:'#fff',fs:46,w:520});

// ================= 2 QUESTION : tape =================
BG({img:'B11_tape.jpg',t0:T.q,t1:T.book+.05,s0:1.08,s1:1.0,fade:.2});
PANEL(T.q+.05,T.book,540,560,800,`<div style="font:800 44px/1.3 P">महाराष्ट्रात <span style="color:${GOLD}">bedroom</span> चा</div><div style="font:900 72px/1.15 P">किमान आकार किती?</div>`,{enter:'down'});
STAMP(C('धक्का',7.8),T.book,540,1080,'?',RED,{fs:220,rot:-4,w:300});
shake(C('धक्का',7.8)+.05,12);

// ================= 3 RULEBOOK =================
BG({img:'B02_book.jpg',t0:T.book,t1:T.hab+.05,s0:1.0,s1:1.1,y0:0,y1:30,fade:.25});
PANEL(T.book+.05,T.hab,520,520,740,`<div style="font:900 72px/1.1 P;color:#151515">UDCPR-2020</div><div style="font:800 52px/1.2 P;color:${GOLD}">नियम 9.2.1</div><div class="hl" style="height:10px;width:0;margin:8px auto 0;border-radius:5px;background:#f7e463;box-shadow:0 0 18px #f7e463"></div>`,{enter:'zoom',din:.4,sfx:'impact',sfxv:.5,draw:(t,lt,oo)=>{oo.el.querySelector('.hl').style.width=(E.out(clamp((t-C('9',11))/.6))*70)+'%'}});
sfx(C('9',11),'pen',.4);
PANEL(C('सपश्ट',12.7),T.hab,520,1380,600,`<div style="font:800 40px/1.2 P">स्पष्ट सांगतो 👇</div>`,{enter:'up',pad:'16px 24px'});

// ================= 4 HABITABLE : blueprint room =================
BG({img:'B03_blueprint_room.jpg',t0:T.hab,t1:T.zero+.05,s0:1.0,s1:1.1,fade:.25});
LBL(T.hab+.05,T.zero,330,640,'Bedroom',{bg:NAVY,col:'#fff'});
LBL(C('हॉल',14.4),T.zero,560,560,'Hall',{bg:GOLD,col:'#111'});
LBL(C('हैबिटेबल',16),T.zero,700,690,'Habitable Room',{bg:'#fff',w:460});
WORDS(C('मालकाचा',17.4),T.zero,520,1390,760,[['आकार',C('मालकाचा',17.4)-.1,''],['"मालकाच्या',C('मालकाचा',17.4),'gd'],['गरजेनुसार',C('गरजे',18.3),'gd'],['आणि',C('आणी',19),''],['सोयीनुसार"',C('सोई',19.3),'gd']],{st:'font:800 54px/1.3 P;color:#151515;background:rgba(255,253,249,.94);border-radius:30px;padding:24px 28px;box-shadow:0 24px 60px rgba(0,0,0,.18)',z:62});

// ================= 5 ZERO : white model =================
WIPE(T.zero-.3,'B04_white_model.jpg');
BG({img:'B04_white_model.jpg',t0:T.zero+.3,t1:T.kit+.05,s0:1.0,s1:1.0,fade:.01});
PANEL(T.zero+.05,T.kit,540,520,700,`<div style="font:800 46px/1.2 P">किमान आकार?</div>`,{enter:'down',pad:'18px 26px'});
A({t0:C('शुन्य',21.5),t1:T.kit,x:540,y:930,w:600,cls:'noshadow',html:`<div style="width:380px;height:380px;margin:0 auto;border-radius:50%;background:${NAVY};display:flex;align-items:center;justify-content:center;box-shadow:0 30px 70px rgba(0,0,0,.35),0 0 0 10px rgba(232,207,159,.6)"><span style="font:900 260px/1 P;color:#e8cf9f;text-shadow:0 0 40px rgba(232,207,159,.6)">0</span></div>`,enter:'zoom',din:.35,sfx:'impact',sfxv:.7,z:60,float:.1});
PART({type:'sparks',t0:C('शुन्य',21.5),t1:C('शुन्य',21.5)+.3,n:70,seed:3,x:540,y:930,speed:800,color:GOLD});
STAMP(C('कोंता',22.2),T.kit,540,1300,'कोणताही नियम नाही!',RED,{fs:60,w:820});

// ================= 6 KITCHEN =================
WIPE(T.kit-.3,'B05_kitchen.jpg');
BG({img:'B05_kitchen.jpg',t0:T.kit+.3,t1:T.leg+.05,s0:1.0,s1:1.08,fade:.01});
PANEL(T.kit+.05,T.leg,520,500,720,`<div style="font:800 46px/1.2 P">Kitchen साठी पण तेच</div><div style="font:900 64px/1.2 P;color:${GOLD}">नियम 9.3.1</div>`,{enter:'down',pad:'20px 26px'});
STAMP(C('आकाराचा',27.4),T.leg,540,1300,'आकाराचा नियम नाही',RED,{fs:58,w:820});

// ================= 7 LEGAL : model, one room highlighted (match cut back to model) =================
BG({img:'B04_white_model.jpg',t0:T.leg,t1:T.wait+.05,s0:1.0,s1:1.0,fade:.2});
TINT(T.leg,T.wait,'rgba(13,23,41,.25)',.2);
A({t0:T.leg+.1,t1:T.wait,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920"><rect class="r" x="214" y="512" width="262" height="256" rx="6" fill="rgba(232,207,159,.35)" stroke="${GOLD}" stroke-width="8" stroke-dasharray="1100" stroke-dashoffset="1100"/><g class="d" opacity="0" font-family="P" font-weight="900" font-size="46" fill="${NAVY}"><text x="345" y="495" text-anchor="middle">7 ft</text><text x="500" y="650" text-anchor="start">8 ft</text></g></svg>`,enter:'fade',din:.1,float:0,z:40,
  draw:(t,lt,oo)=>{oo.el.querySelector('.r').style.strokeDashoffset=1100*(1-E.inout(clamp((t-T.leg-.2)/.8)));oo.el.querySelector('.d').setAttribute('opacity',clamp((t-C('728',29.6))/.3))}});
PANEL(C('बिल्डर',29.2),T.wait,540,1180,760,`<div style="font:800 42px/1.3 P">Builder <span style="color:${GOLD}">7 × 8</span> ची bedroom देऊ शकतो</div>`,{pad:'18px 24px'});
PANEL(C('काईदेशीर',32.5),T.wait,540,1380,560,`<div style="font:900 58px/1.1 P;color:#2a9d55">कायदेशीर ✓</div>`,{enter:'pop',din:.35,sfx:'ding'});

// ================= 8 BUT 3 RULES =================
TINT(T.wait,T.h,'linear-gradient(180deg,#0d1729,#162644)',.2);
A({t0:T.wait+.05,t1:T.h,x:540,y:640,w:900,cls:'noshadow',html:`<div style="text-align:center;font:900 96px/1.1 P;color:#fff">पण थांबा!</div>`,enter:'zoom',din:.35,sfx:'impact',sfxv:.6,z:50,float:.1});
A({t0:C('तीन',35.1),t1:T.h,x:540,y:860,w:900,cls:'noshadow',html:`<div style="text-align:center;font:800 56px/1.2 P;color:#e8cf9f">3 नियम मात्र पक्के</div>`,enter:'fade',din:.3,z:50,float:.1});
[0,1,2].forEach(i=>A({t0:C('तीन',35.1)+.25+i*.22,t1:T.h,x:300+i*240,y:1150,w:200,cls:'noshadow',html:`<div style="width:180px;height:180px;border-radius:36px;background:${GOLD};display:flex;align-items:center;justify-content:center;font:900 110px/1 P;color:${NAVY};box-shadow:0 18px 40px rgba(0,0,0,.35)">${i+1}</div>`,enter:'pop',din:.4,sfx:'thud',sfxv:.5,z:50,float:.2}));

// ================= 9 HEIGHT : bedroom front =================
BG({img:'B06_bedroom_front.jpg',t0:T.h,t1:T.win+.05,s0:1.0,s1:1.0,fade:.25});
PANEL(T.h+.05,T.win,560,470,700,`<div style="font:800 46px/1.2 P"><span style="color:${GOLD}">1.</span> उंची <span style="font-size:32px;color:#6b6b6b">- Table 9-A</span></div>`,{enter:'down',pad:'16px 24px'});
// vertical height arrow on the left wall: floor y~1440 -> ceiling y~370
A({t0:C('टेबल',37.7),t1:T.win,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920"><line class="ar" x1="170" y1="1440" x2="170" y2="1440" stroke="${GOLD}" stroke-width="10"/><line x1="130" y1="1440" x2="210" y2="1440" stroke="${GOLD}" stroke-width="8"/><line class="tp" x1="130" y1="1440" x2="210" y2="1440" stroke="${GOLD}" stroke-width="8"/></svg>`,enter:'fade',din:.1,float:0,z:45,
  draw:(t,lt,oo)=>{const y=1440-1000*E.inout(clamp((t-C('टेबल',37.7))/1.2));oo.el.querySelector('.ar').setAttribute('y2',y);const tp=oo.el.querySelector('.tp');tp.setAttribute('y1',y);tp.setAttribute('y2',y)}});
NUM(C('2',40.9),T.win,560,780,'किमान 2.75 m','प्रत्येक habitable room',{w:660,fs:66,st:1});
NUM(C('4',43.6),T.win,560,1000,'कमाल 4.5 m','जास्तीत जास्त',{w:660,fs:66});
NUM(C('एसी',44.8),T.win,560,1220,'AC room 2.4 m','किमान उंची',{w:660,fs:60,col:NAVY});

// ================= 10 WINDOW : 1/10 =================
WIPE(T.win-.3,'B07_window.jpg');
BG({img:'B07_window.jpg',t0:T.win+.3,t1:T.bath+.05,s0:1.0,s1:1.08,fade:.01});
PANEL(T.win+.05,T.bath,540,470,700,`<div style="font:800 46px/1.2 P"><span style="color:${GOLD}">2.</span> खिडकी <span style="font-size:32px;color:#6b6b6b">- नियम 9.20</span></div>`,{enter:'down',pad:'16px 24px'});
PANEL(C('क्षेत्र',51.3),T.bath,540,680,760,`<div style="font:800 40px/1.3 P">खिडकी ≥ खोलीच्या जमिनीचा</div><div style="font:900 90px/1 P;color:${GOLD}">1/10</div>`,{pad:'18px 24px'});
A({t0:C('शंभर',54.3),t1:T.bath,x:540,y:1170,w:760,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.95);border-radius:30px;padding:22px 26px;box-shadow:0 24px 60px rgba(0,0,0,.2);display:flex;align-items:center;gap:22px"><div class="g" style="display:grid;grid-template-columns:repeat(10,26px);gap:4px">${Array.from({length:100},(_,i)=>`<div style="width:26px;height:26px;border-radius:4px;background:#e2ddd4" data-i="${i}"></div>`).join('')}</div><div style="text-align:left;font:800 34px/1.3 P">खोली<br><b style="font-size:46px">100 sq.ft</b><br><span class="w" style="color:${GOLD};opacity:0">खिडकी<br><b style="font-size:46px">10 sq.ft</b></span></div></div>`,enter:'pop',din:.4,sfx:'ticks',sfxv:.4,z:60,float:.08,
  draw:(t,lt,oo)=>{const t1=C('शंभर',54.3),t2=C('दहा',56.1);oo.el.querySelectorAll('.g div').forEach(d=>{const i=+d.dataset.i;const on=t>t1+i*.006;const gold=i>=90&&t>t2+(i-90)*.05;d.style.background=gold?GOLD:(on?'#cfc6b8':'#efebe4');d.style.boxShadow=gold?'0 0 10px #e8cf9f':'none'});oo.el.querySelector('.w').style.opacity=clamp((t-t2)/.3)}});
STAMP(C('कंपल',57.7),T.bath,540,1420,'Compulsory',RED,{fs:56,w:500});

// ================= 11 BATHROOM =================
BG({img:'B08_bathroom_top.jpg',t0:T.bath,t1:T.split+.05,s0:1.0,s1:1.0,fade:.25});
PANEL(T.bath+.05,T.split,540,470,800,`<div style="font:800 44px/1.25 P"><span style="color:${GOLD}">3.</span> गंमत - <span style="color:${RED}">bathroom</span> ला नियम आहे!</div>`,{enter:'down',pad:'16px 24px'});
LBL(C('नियम',61.8),T.split,540,610,'नियम 9.4',{bg:NAVY,col:'#e8cf9f',fs:40});
// dimension box over the shower area (left half)
A({t0:C('1',64.6),t1:T.split,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920"><rect class="b" x="135" y="560" width="420" height="660" rx="8" fill="rgba(232,207,159,.18)" stroke="${GOLD}" stroke-width="8" stroke-dasharray="2200" stroke-dashoffset="2200"/><rect class="w" x="575" y="560" width="300" height="300" rx="8" fill="rgba(13,23,41,.12)" stroke="${NAVY}" stroke-width="8" stroke-dasharray="1200" stroke-dashoffset="1200"/></svg>`,enter:'fade',din:.1,float:0,z:40,
  draw:(t,lt,oo)=>{oo.el.querySelector('.b').style.strokeDashoffset=2200*(1-E.inout(clamp((t-C('1',64.6))/.8)));oo.el.querySelector('.w').style.strokeDashoffset=1200*(1-E.inout(clamp((t-C('टोईलेट',66.5))/.7)))}});
NUM(C('1',64.6)+.3,T.split,345,1300,'1.0 × 1.2 m','Bathroom (किमान)',{w:420,fs:58});
NUM(C('टोईलेट',66.5)+.3,T.split,620,1080,'0.9 × 0.9 m','Toilet (किमान)',{w:400,fs:52,col:NAVY});

// ================= 12 SPLIT : bathroom ✓ / bedroom ✗ =================
TINT(T.split,T.plan,'#f4f1ec',.15);
[['B08_bathroom_top.jpg','Bathroom','✓ नियम','#2a9d55',300,C('बाथरूम',70.1),'left'],['B01_small_bedroom.jpg','Bedroom','✗ नियम नाही',RED,680,C('बेडरूम',71.4),'right']].forEach(([img,nm,tag,col,x,t0,en])=>{
  A({t0:T.split+(en==='left'?0:.15),t1:T.plan,x,y:900,w:350,cls:'noshadow',html:`<div style="width:340px;height:820px;border-radius:30px;background:url(a/${img}) center/cover;box-shadow:0 24px 60px rgba(0,0,0,.25)"></div>`,enter:en,din:.5,sfx:'whoosh',sfxv:.4,z:40,float:.1});
  LBL(t0,T.plan,x,1060,nm,{bg:'#fff',fs:38,w:330});
  LBL(t0+.2,T.plan,x,1180,tag,{bg:col,col:'#fff',fs:36,w:340,enter:'stamp',sfx:'stamp'});
});

// ================= 13 PLAN : brochure check =================
BG({img:'B09_hand_plan.jpg',t0:T.plan,t1:T.cm+.05,s0:1.0,s1:1.08,y0:0,y1:-20,fade:.25});
PANEL(C('ब्रोशर',73.8),T.cm,540,470,760,`<div style="font:800 42px/1.3 P">Brochure वरचा <span style="text-decoration:line-through;color:#9a958c">Carpet Area</span> नाही</div>`,{enter:'down',pad:'16px 24px'});
A({t0:C('प्रत्ते',75.9),t1:T.cm,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920"><polyline class="c" points="560,640 700,620 800,620" fill="none" stroke="${GOLD}" stroke-width="5" stroke-dasharray="400" stroke-dashoffset="400"/><circle cx="560" cy="640" r="12" fill="${GOLD}"/></svg>`,enter:'fade',din:.1,float:0,z:44,draw:(t,lt,oo)=>{oo.el.querySelector('.c').style.strokeDashoffset=400*(1-E.out(clamp((t-C('प्रत्ते',75.9))/.5)))}});
PANEL(C('प्रत्ते',75.9),T.cm,540,1380,800,`<div style="font:800 44px/1.3 P">✓ प्रत्येक <span style="color:${GOLD}">खोलीचा आकार</span><br>plan वर तपासा</div>`,{pad:'20px 26px'});

// ================= 14 ENGAGEMENT : comment your size =================
BG({img:'B10_premium_bedroom.jpg',t0:T.cm,t1:T.out+.05,s0:1.0,s1:1.1,fade:.25});
TINT(T.cm,T.out,'linear-gradient(180deg,rgba(255,253,249,.55),rgba(255,253,249,0) 40%,rgba(0,0,0,0) 70%,rgba(0,0,0,.3))',.2);
PANEL(T.cm+.05,T.out,540,500,760,`<div style="font:700 36px/1.2 P;color:#6b6b6b">आता तुमची पाळी!</div><div style="font:900 56px/1.2 P">तुमच्या bedroom चा <span style="color:${GOLD}">size</span> किती?</div>`,{enter:'down'});
[['10 × 12',C('12',81),360,760],['9 × 10',C('9',81.9),700,760],['8 × 10',C('9',81.9)+.25,360,900],['?',C('9',81.9)+.5,700,900]].forEach(([s,t0,x,y])=>LBL(t0,T.out,x,y,s,{bg:'#fff',fs:50,w:300}));
A({t0:C('कमेंड',82.8),t1:T.out,x:540,y:1180,w:800,cls:'chipw',html:`<div style="display:inline-flex;align-items:center;gap:18px;background:${NAVY};color:#fff;border-radius:999px;padding:20px 40px 16px;font:800 46px/1 P;box-shadow:0 18px 44px rgba(0,0,0,.35)"><svg viewBox="0 0 24 24" width="52"><path d="M4 4h16v12H8l-4 4z" fill="#e8cf9f"/></svg>Comment मध्ये लिहा 👇</div>`,enter:'up',din:.45,sfx:'pop',sfxv:.8,z:66,float:0,fn:t=>({s:(t>C('कमेंड',82.8)+.9&&t<C('कमेंड',82.8)+1.1?.94:1)})});
A({t0:C('कमेंड',82.8)+.4,t1:T.out,x:700,y:1260,w:100,cls:'noshadow',html:`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`,enter:'up',din:.4,z:67,float:0});
sfx(C('कमेंड',82.8)+.95,'click',.8);
PANEL(C('महाराश्टातली',84.4),T.out,540,1400,760,`<div style="font:800 40px/1.3 P">बघू - <span style="color:${RED}">सर्वात लहान</span> bedroom कोणाची? 😄</div>`,{pad:'16px 24px'});

// ================= 15 OUTRO =================
TINT(T.out,END+1,'linear-gradient(180deg,#0d1729,#162644)',.25);
WORDS(T.out+.05,END+1,540,560,860,[['अशाच',T.out,''],['real',C('रियल',87.6),'ser gd'],['estate',C('एस्टेट',87.9),'ser gd'],['माहितीसाठी',C('महीती',88.1),'']],{st:'font:800 58px/1.3 P;color:#fff'});
A({t0:T.out+.4,t1:END+1,x:540,y:900,w:560,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:28px;padding:44px 50px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'reveal',sfxv:.6,z:50,float:.15,shine:[T.out+1.4,T.out+3.6]});
const FT=C('फॉलो',90);
A({t0:C('पेजला',89.6)-.3,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span style="display:inline-block;background:${GOLD};color:#111;font:800 44px/1 P;padding:22px 40px 16px;border-radius:999px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.45,sfx:'pop',sfxv:.8,z:54,float:0,fn:t=>({s:(t>FT+.3&&t<FT+.5?.93:1)})});
A({t0:FT-.2,t1:END+1,x:760,y:1350,w:110,cls:'noshadow',html:`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`,enter:'up',din:.4,z:56,float:0,fn:t=>({s:t>FT+.3&&t<FT+.5?.85:1})});
sfx(FT+.35,'click',.9);PART({type:'confetti',t0:FT+.4,t1:FT+.75,n:100,seed:41,x:540,y:-40,burst:1,life:3,colors:[GOLD,'#ffffff','#f2dfb6',RED]});
}
if(window.SAFE_GUIDE){const g=document.createElement('div');g.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:9999';
 g.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:220px;background:rgba(255,0,0,.2);border-bottom:3px solid #ff4040"></div><div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:rgba(255,0,0,.2);border-top:3px solid #ff4040"></div><div style="position:absolute;left:890px;right:35px;top:860px;bottom:420px;background:rgba(255,140,0,.3)"></div>`;
 document.getElementById('root').appendChild(g)}

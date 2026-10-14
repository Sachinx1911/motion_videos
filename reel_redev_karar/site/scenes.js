// ---- shared helpers (from reel_cidco) ----
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

const CARD=(t0,t1,x,y,w,h,img,o={})=>A(Object.assign({t0,t1,x,y,w:w+10,cls:'noshadow',html:`<div style="width:${w}px;height:${h}px;border-radius:30px;background:url(a/${img}) center/cover;box-shadow:0 24px 60px rgba(0,0,0,.28);border:6px solid #faf7f2"></div>`,enter:'up',din:.5,sfx:'whoosh',sfxv:.4,z:40,float:.1},o));

// video background from a jpg frame sequence (drawn synchronously from preloaded frames)
function VBG(o){o=Object.assign({s0:1,s1:1.04,x0:0,x1:0,y0:0,y1:0,fade:.2,filter:''},o);
  o.img=o.dir+'/f_001.jpg';const el=document.createElement('canvas');el.width=1080;el.height=1920;el.className='bg';document.getElementById('bgs').appendChild(el);o.el=el;BGS.push(o);
  const fr=[];window.PRELOAD=window.PRELOAD||[];for(let i=1;i<=o.n;i++){const im=new Image();im.src=`a/${o.dir}/f_${String(i).padStart(3,'0')}.jpg`;fr.push(im);window.PRELOAD.push(im.decode().catch(()=>0))}
  const ctx=el.getContext('2d');HOOKS.push(t=>{if(t<o.t0-.2||t>o.t1+.2)return;const k=Math.min(o.n-1,Math.max(0,Math.floor((t-o.t0)/(o.t1-o.t0)*o.n)));ctx.drawImage(fr[k],0,0,1080,1920)});return o}
// animated curved arrow from (x1,y1) to (x2,y2): line draws, then head pops; small bounce at the tip
const POINT=(t0,t1,x1,y1,x2,y2,o={})=>{const col=o.col||'#fff',bend=o.bend||60;const mx=(x1+x2)/2+bend,my=(y1+y2)/2;
  const ang=Math.atan2(y2-my,x2-mx)*180/Math.PI;
  return A({t0,t1,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="overflow:visible;filter:drop-shadow(0 4px 8px rgba(0,0,0,.55))"><path class="ln" d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="1000"/><g class="hd" transform="translate(${x2},${y2}) rotate(${ang})" opacity="0"><path d="M0 0 L-34 -20 L-26 0 L-34 20 Z" fill="${col}"/></g></svg>`,enter:'fade',din:.05,float:0,z:58,sfx:'swoosh',sfxv:.4,
    draw:(t,lt,oo)=>{const p=E.inout(clamp(lt/.5));oo.el.querySelector('.ln').style.strokeDashoffset=1000*(1-p);const h=oo.el.querySelector('.hd');h.setAttribute('opacity',p>.9?1:0);const b=lt>.5?Math.sin((lt-.5)*6)*6:0;h.setAttribute('transform',`translate(${x2+Math.cos(ang*Math.PI/180)*b},${y2+Math.sin(ang*Math.PI/180)*b}) rotate(${ang})`)}})};
const SH='drop-shadow(0 34px 40px rgba(0,0,0,.35))';
const OBJ=(t0,t1,x,y,w,img,o={})=>IMG(t0,t1,x,y,w,img,Object.assign({cls:'noshadow',filter:SH},o));
const H2=(t0,t1,y,html,o={})=>PANEL(t0,t1,540,y,o.w||800,`<div style="font:700 ${o.fs||44}px/1.3 P">${html}</div>`,Object.assign({enter:'down',pad:'20px 28px'},o));
const CHK=(t0,t1,x,y,txt,ok,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||620,cls:'noshadow',html:`<div style="display:flex;align-items:center;gap:20px;background:rgba(255,253,249,.97);border-radius:26px;padding:18px 26px 14px;box-shadow:0 18px 44px rgba(0,0,0,.22);border-left:12px solid ${ok?'#1f9a52':RED}"><div style="width:74px;flex:none">${ok?IC.check:IC.cross}</div><div style="font:700 40px/1.3 P;text-align:left">${txt}</div></div>`,enter:'left',din:.45,sfx:ok?'ding':'buzz',sfxv:.6,z:62,float:.1},o));

// Redevelopment करार - 7 गोष्टी (SRS Dwell). Times = word cues C(word, approx).
const HEAD=(n,t0,t1,html)=>A({t0,t1,x:540,y:500,w:880,cls:'noshadow',html:`<div style="display:flex;align-items:center;gap:22px;background:rgba(255,253,249,.96);border-radius:30px;padding:16px 28px 14px 18px;box-shadow:0 22px 56px rgba(0,0,0,.22)"><div style="width:88px;height:88px;flex:none;border-radius:50%;background:${NAVY};color:#e8cf9f;font:700 54px/92px P;text-align:center">${n}</div><div style="font:700 44px/1.25 P;text-align:left;color:#151515">${html}</div></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:60,float:.1});
const ROW=(t0,t1,y,txt,o={})=>A(Object.assign({t0,t1,x:540,y,w:720,cls:'noshadow',html:`<div style="display:flex;align-items:center;gap:18px;background:rgba(255,253,249,.97);border-radius:24px;padding:16px 24px 12px;box-shadow:0 16px 40px rgba(0,0,0,.22);border-left:10px solid ${GOLD}"><div style="width:58px;flex:none">${IC.check}</div><div style="font:600 38px/1.3 P;text-align:left">${txt}</div></div>`,enter:'left',din:.45,sfx:'pop',sfxv:.55,z:62,float:.08},o));
const NO=(t0,t1,x,y,txt)=>A({t0,t1,x,y,w:380,cls:'chipw',html:`<span style="display:inline-block;font:700 42px/1 P;padding:18px 30px 14px;border-radius:999px;background:#fff;color:${RED};box-shadow:0 12px 30px rgba(0,0,0,.25)"><s>${txt}</s> ✗</span>`,enter:'pop',din:.35,sfx:'buzz',sfxv:.5,z:65,float:.1});
const CURSOR=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;

function buildScenes(){
const END=95.0;
const T={p0:0,prev:C('मागचे',8.4),today:C('आज',11.2),p1:C('एक',15.42),p2:C('दोन',23.74),p3:C('3',35.56),p4:C('4',42.44),p5:C('पाच',51.42),p6:C('सहा',61.3),p7:C('साथ',70.16),law:C('आणि',77.1),cm:C('तुमचा',82.3),out:C('अणि',90.4)};
const SEC=[0,T.prev,T.today,T.p1,T.p2,T.p3,T.p4,T.p5,T.p6,T.p7,T.law,T.cm,T.out,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.03*E.inout(p)})`});
const CUT=t=>{flash(t,.3,'#fffaf0');sfx(t-.12,'whoosh',.5);punch(t,.03)};
SEC.slice(1,-1).forEach(CUT);

// ---------- HUD : logo + 7-step progress ----------
A({t0:0,t1:T.out,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.92);border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.15)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:600});
const PT=[T.p1,T.p2,T.p3,T.p4,T.p5,T.p6,T.p7];
A({t0:T.p1,t1:T.law,x:650,y:300,w:460,cls:'noshadow',html:`<div style="display:flex;gap:12px;align-items:center;background:rgba(13,23,41,.85);border-radius:999px;padding:10px 16px">${PT.map((_,i)=>`<div class="d" style="width:46px;height:46px;border-radius:50%;font:700 24px/48px P;text-align:center;background:rgba(255,255,255,.15);color:#cfd6e4">${i+1}</div>`).join('')}</div>`,enter:'fade',din:.4,float:0,z:600,
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.d').forEach((d,i)=>{const on=t>=PT[i];const cur=on&&(i==6||t<PT[i+1]);d.style.background=cur?'#e8cf9f':on?'rgba(232,207,159,.45)':'rgba(255,255,255,.15)';d.style.color=cur?NAVY:on?'#fff':'#cfd6e4';d.style.transform=`scale(${cur?1.12:1})`})}});

// ================= HOOK : old society, agreement + pen, stamp =================
BG({img:'B01_old_society.jpg',t0:0,t1:T.prev+.05,s0:1.0,s1:1.1,fade:.2});
TINT(0,T.prev,'linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,0) 35%,rgba(0,0,0,.15) 70%,rgba(0,0,0,.4))',.2);
H2(.05,T.prev,520,`Redevelopment करारात<br>या <span style="color:${GOLD}">7 गोष्टी</span> नसतील, तर...`,{w:820});
OBJ(.3,T.prev,540,1010,440,'O01_agreement.png',{enter:'rise',din:.6,allowOver:1});
OBJ(C('बिल्डरचा',2.3),C('सही',5.06)+.1,720,950,260,'O02_pen.png',{enter:'right',din:.5,allowOver:1,fn:(t,lt)=>({dy:Math.sin(lt*3)*14,r:-8})});
STAMP(C('सही',5.06),T.prev,540,1020,'सही करू नका!',RED,{fs:62,w:720,allowOver:1});
shake(C('सही',5.06)+.1,10);
NO(C('घर',6.62),T.prev,330,1400,'घर');NO(C('भाड़',7.66),T.prev,750,1400,'भाडं');

// ================= PREV VIDEO : meeting hall =================
BG({img:'B02_meeting_hall.jpg',t0:T.prev,t1:T.today+.05,s0:1.0,s1:1.08,fade:.25});
LBL(T.prev+.05,T.today,540,430,'भाग 1 - मागचा video',{bg:NAVY,col:'#e8cf9f',fs:34,w:460});
H2(T.prev+.2,T.today,610,`सभेचे <span style="color:${GOLD}">नवे नियम</span> ✓`,{w:640});
ROW(C('सभेचे',9.7),T.today,800,'51% सभासद प्रत्यक्ष हजर');ROW(C('नवे',10.3),T.today,935,'किमान 3 निविदा');ROW(C('नियम',10.6),T.today,1070,'सभेचं Video recording');

// ================= TODAY : Development Agreement =================
TINT(T.today,T.p1,'linear-gradient(180deg,#0d1729,#162644)',.2);
A({t0:T.today+.05,t1:T.p1,x:540,y:560,w:900,cls:'noshadow',html:`<div style="text-align:center;font:600 44px/1.3 P;color:#cfd6e4">आज पुढचा टप्पा</div>`,enter:'fade',din:.35,z:50,float:.08});
A({t0:C('डेवलप्मेंट',12.5)-.1,t1:T.p1,x:540,y:690,w:960,cls:'noshadow',html:`<div style="text-align:center;font:700 74px/1.1 P;color:#e8cf9f">Development<br>Agreement</div>`,enter:'fade',din:.4,sfx:'impact',sfxv:.5,z:50,float:.08});
A({t0:C('बिल्डर',14.08),t1:T.p1,x:540,y:860,w:900,cls:'noshadow',html:`<div style="text-align:center;font:600 42px/1.3 P;color:#fff">= builder सोबतचा करार</div>`,enter:'up',din:.4,sfx:'swoosh',sfxv:.5,z:50,float:.08});
OBJ(T.today+.4,T.p1,540,1230,330,'O01_agreement.png',{enter:'rise',din:.6});

// ================= 1 CARPET : empty flat =================
BG({img:'B03_empty_flat.jpg',t0:T.p1,t1:T.p2+.05,s0:1.0,s1:1.06,fade:.25});
HEAD(1,T.p1+.05,T.p2,`नवीन घराचा <span style="color:${GOLD}">Carpet Area</span>`);
A({t0:C('कारपेट',16.9),t1:T.p2,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920"><polygon class="fp" points="300,1210 800,1210 1010,1700 70,1700" fill="rgba(232,207,159,.18)" stroke="#e8cf9f" stroke-width="7" stroke-dasharray="3000" stroke-dashoffset="3000" style="filter:drop-shadow(0 0 10px #e8cf9f)"/></svg>`,enter:'fade',din:.1,float:0,z:30,
  draw:(t,lt,oo)=>{oo.el.querySelector('.fp').style.strokeDashoffset=3000*(1-E.inout(clamp(lt/1.1)))}});
NO(C('अंदाजे',17.66),T.p2,330,720,'अंदाजे');NO(C('सुमारे',18.7),T.p2,750,720,'सुमारे');
NUM(C('नेमका',19.48),T.p2,540,920,'नेमके sq.ft ✓','अचूक आकडा करारात',{w:560,fs:64});
LBL(C('रेरा',21.42),T.p2,540,1100,'RERA Carpet नुसार ✓',{bg:GOLD,col:'#111',fs:40,w:480});

// ================= 2 RENT : moving boxes =================
BG({img:'B04_moving_boxes.jpg',t0:T.p2,t1:T.p3+.05,s0:1.0,s1:1.08,fade:.25});
HEAD(2,T.p2+.05,T.p3,`भाडं किंवा <span style="color:${GOLD}">पर्यायी घर</span>`);
LBL(C('बंधन',28.6),T.p3,540,680,'Builder ला बंधनकारक',{bg:NAVY,col:'#fff',fs:40,w:500});
ROW(C('दर',29.9),T.p3,820,'दर महिन्याला किती?');ROW(C('आगाउ',31.5)-.3,T.p3,955,'किती महिने आगाऊ?');ROW(C('वर्षी',32.8)-.3,T.p3,1090,'दरवर्षी किती वाढ?');
PANEL(C('करारात',34.46),T.p3,540,1270,700,`<div style="font:700 42px/1.25 P">करारात <span style="color:${GOLD}">लिहून घ्या!</span></div>`,{pad:'18px 26px'});

// ================= 3 CORPUS : coins =================
TINT(T.p3,T.p4,'radial-gradient(ellipse 80% 60% at 50% 50%,#fbf7f0,#e9e1d4)',.2);
HEAD(3,T.p3+.05,T.p4,`<span style="color:${GOLD}">Corpus Fund</span>`);
OBJ(C('कॉर्पस',36.1),T.p4,540,1060,560,'O04_coins.png',{enter:'rise',din:.6,fn:(t)=>({s:t>C('पक्क',39.6)&&t<C('पक्क',39.6)+.35?1.06:1})});
LBL(C('रक्कम',36.88),T.p4,330,1340,'रक्कम किती?',{bg:'#fff',fs:42,w:340});
LBL(C('कधी',38.1),T.p4,750,1340,'कधी मिळणार?',{bg:'#fff',fs:42,w:340});
PANEL(C('शक्यतर',40.5),T.p4,540,700,760,`<div style="font:700 42px/1.25 P">शक्य तर <span style="color:${RED}">घर सोडण्याआधीच!</span></div>`,{pad:'16px 24px'});

// ================= 4 BANK GUARANTEE : vault =================
BG({img:'B05_vault.jpg',t0:T.p4,t1:T.p5+.05,s0:1.0,s1:1.08,fade:.25});
HEAD(4,T.p4+.05,T.p5,`<span style="color:${GOLD}">बँक गॅरंटी</span>`);
LBL(C('अर्धवट',44.7)-.3,T.p5,540,690,'प्रकल्प अर्धवट सोडला तर?',{bg:RED,col:'#fff',fs:40,w:600});
PANEL(C('बैंक',45.88),T.p5,540,860,720,`<div style="display:flex;align-items:center;gap:18px;justify-content:center"><div style="width:70px">${IC.shield(70)}</div><div style="font:700 42px/1.25 P;text-align:left">बँक society ला<br><span style="color:#1f9a52">पैसे देते</span></div></div>`,{pad:'16px 24px'});
PANEL(C('नव्या',47.5),T.p5,540,1240,820,`<div style="font:600 34px/1.3 P;color:#6b6b6b">नवा नियम (30 सप्टेंबर 2026)</div><div style="font:700 40px/1.3 P">प्रकल्प किमतीच्या प्रमाणात <span style="color:${GOLD}">बँक गॅरंटी</span></div>`,{pad:'18px 26px'});

// ================= 5 TIMELINE : construction =================
BG({img:'B06_construction.jpg',t0:T.p5,t1:T.p6+.05,s0:1.0,s1:1.08,fade:.25});
HEAD(5,T.p5+.05,T.p6,`<span style="color:${GOLD}">मुदत</span> - बांधकाम किती वर्षात?`);
{const t2=C('दोन',54.3),t3=C('तीन',57.0);
A({t0:C('बांधकाम',53.8),t1:T.p6,x:540,y:830,w:880,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.96);border-radius:28px;padding:26px 34px 22px;box-shadow:0 22px 56px rgba(0,0,0,.25)"><div style="position:relative;height:30px;border-radius:15px;background:#e2ddd4;overflow:hidden"><div class="g" style="position:absolute;left:0;top:0;bottom:0;width:0;background:${GOLD}"></div><div class="r" style="position:absolute;left:66.6%;top:0;bottom:0;width:0;background:repeating-linear-gradient(45deg,${RED} 0 12px,#f08a82 12px 24px)"></div></div><div style="display:flex;justify-content:space-between;font:600 30px/1.4 P;margin-top:12px;color:#6b6b6b"><span>Plinth</span><span class="l2" style="color:#151515;font-weight:700;opacity:0">2 वर्षं ✓</span><span class="l3" style="color:${RED};font-weight:700;opacity:0">कमाल 3</span></div></div>`,enter:'up',din:.45,sfx:'swoosh',sfxv:.5,z:60,float:.06,
  draw:(t,lt,oo)=>{oo.el.querySelector('.g').style.width=(66.6*E.inout(clamp((t-t2)/.9)))+'%';oo.el.querySelector('.r').style.width=(33.4*E.inout(clamp((t-t3)/.6)))+'%';oo.el.querySelector('.l2').style.opacity=clamp((t-t2-.6)/.3);oo.el.querySelector('.l3').style.opacity=clamp((t-t3-.3)/.3)}});
sfx(t2+.8,'thud',.4);sfx(t3+.5,'thud',.4);}
OBJ(C('उशीर',58.0),T.p6,290,1240,240,'O03_calendar.png',{enter:'rise',din:.5});
LBL(C('दंड',58.86),T.p6,700,1180,'उशीर = दंड किती?',{bg:RED,col:'#fff',fs:40,w:440});
LBL(C('कलॉज',59.86),T.p6,700,1310,'Clause करारात हवाच',{bg:GOLD,col:'#111',fs:38,w:440});

// ================= 6 PARKING + AMENITIES : podium =================
BG({img:'B07_podium.jpg',t0:T.p6,t1:T.p7+.05,s0:1.0,s1:1.06,fade:.25});
HEAD(6,T.p6+.05,T.p7,`Parking आणि <span style="color:${GOLD}">सुविधा</span>`);
[['Lift',C('लिफ्ट',63.4),330,700],['Parking',C('पार्किंग',63.98),750,700],['Gym',C('जिम',64.7),330,820],['साहित्य',C('सहीत्ते',65.6),750,820]].forEach(([s,t0,x,y])=>LBL(t0,T.p7,x,y,s+' ✓',{bg:'#fff',fs:42,w:340}));
PANEL(C('यादी',67.2),T.p7,540,1010,760,`<div style="font:700 42px/1.25 P">सगळं <span style="color:${GOLD}">यादीसह</span> लिहून घ्या</div>`,{pad:'16px 24px'});
STAMP(C('तोंडी',68.6),T.p7,540,1250,'तोंडी आश्वासन ✗',RED,{fs:52,w:680});

// ================= 7 REGISTRATION : two agreements + stamp =================
TINT(T.p7,T.law,'radial-gradient(ellipse 80% 60% at 50% 50%,#fbf7f0,#e9e1d4)',.2);
HEAD(7,T.p7+.05,T.law,`<span style="color:${GOLD}">नोंदणी</span> - दोन्ही करार`);
OBJ(C('सोसाइटीचा',71.5),T.law,300,900,290,'O01_agreement.png',{enter:'left',din:.5});
OBJ(C('प्रत्येक',72.9),T.law,770,900,290,'O01_agreement.png',{enter:'right',din:.5});
LBL(C('सोसाइटीचा',71.5)+.3,T.law,300,1230,'Society चा करार',{bg:NAVY,col:'#fff',fs:34,w:380});
LBL(C('प्रत्येक',72.9)+.3,T.law,770,1230,'सभासदाचा करार',{bg:NAVY,col:'#fff',fs:34,w:360});
{const s1=C('दोन',75.3),s2=C('नोंदर्नी',76.1);
 OBJ(s1-.6,T.law,300,560,170,'O06_stamp.png',{enter:'fade',din:.2,allowOver:1,z:80,float:0,
   fn:(t)=>{const x=t<s2-.3?300:lerp(300,770,E.inout(clamp((t-(s2-.3))/.3)));const hit=(a)=>{const d=t-a;return d>-.25&&d<.12?-Math.abs(d)*0:(d>-.6&&d<=-.25?(-.6-d)*0:0)};const bob=(a)=>{const d=t-a;return d<-.25?-40:d<0?lerp(-40,120,(q=>q*q)(clamp((d+.25)/.25))):d<.25?lerp(120,-40,E.out(clamp(d/.25))):-40};return {dx:x-300,dy:(t<s2-.3?bob(s1):bob(s2))+120}}});
 STAMP(s1,T.law,300,930,'नोंदणीकृत ✓','#1f9a52',{fs:30,w:300,allowOver:1,rot:-8});
 STAMP(s2,T.law,770,930,'नोंदणीकृत ✓','#1f9a52',{fs:30,w:300,allowOver:1,rot:-8});}

// ================= LAWYER + PMC =================
BG({img:'B08_lawyer_desk.jpg',t0:T.law,t1:T.cm+.05,s0:1.0,s1:1.08,fade:.25});
H2(C('सही',77.4),T.cm,520,`सही करण्या<span style="color:${RED}">आधी</span>`,{w:620});
LBL(C('वकील',79.6),T.cm,330,720,'स्वतंत्र वकील',{bg:NAVY,col:'#fff',fs:40,w:400});
LBL(C('पीमसी',80.4),T.cm,760,720,'PMC',{bg:GOLD,col:'#111',fs:40,w:200});
PANEL(C('तपा',81.5)-.3,T.cm,540,900,700,`<div style="font:700 42px/1.25 P">करार <span style="color:#1f9a52">तपासून घ्या ✓</span></div>`,{pad:'16px 24px'});

// ================= CTA : new tower =================
BG({img:'B09_new_tower.jpg',t0:T.cm,t1:T.out+.05,s0:1.0,s1:1.08,y0:0,y1:-30,fade:.25});
TINT(T.cm,T.out,'linear-gradient(180deg,rgba(13,23,41,.35),rgba(13,23,41,0) 45%,rgba(0,0,0,0) 70%,rgba(0,0,0,.35))',.2);
H2(T.cm+.05,T.out,540,`तुमच्या society चा redevelopment<br><span style="color:${GOLD}">कोणत्या टप्प्यावर?</span>`,{w:860,fs:42});
[['1','चर्चा',C('चर्चा',85.0),740],['2','Builder निवड',C('बिल्डर',85.8),850],['3','करार',C('करार',86.7),960]].forEach(([n,s,t0,y])=>A({t0,t1:T.out,x:540,y,w:440,cls:'noshadow',html:`<div style="display:flex;align-items:center;gap:16px;background:rgba(255,253,249,.97);border-radius:999px;padding:10px 26px 8px 10px;box-shadow:0 12px 30px rgba(0,0,0,.25)"><div style="width:62px;height:62px;border-radius:50%;background:${NAVY};color:#e8cf9f;font:700 34px/64px P;text-align:center">${n}</div><div style="font:700 38px/1 P">${s}</div></div>`,enter:'left',din:.4,sfx:'pop',sfxv:.55,z:60,float:.08}));
{const tc=C('कमेंट',87.2);
A({t0:tc,t1:T.out,x:540,y:1130,w:760,cls:'chipw',html:`<div style="display:inline-flex;align-items:center;gap:16px;background:${NAVY};color:#fff;border-radius:999px;padding:18px 34px 14px;font:700 40px/1 P;box-shadow:0 18px 44px rgba(0,0,0,.35)"><svg viewBox="0 0 24 24" width="44"><path d="M4 4h16v12H8l-4 4z" fill="#e8cf9f"/></svg>Comment करा 👇</div>`,enter:'up',din:.4,sfx:'pop',sfxv:.7,z:66,float:0,fn:t=>({s:(t>tc+.7&&t<tc+.9?.94:1)})});
A({t0:tc+.3,t1:C('हा',87.8)+.4,x:690,y:1200,w:90,cls:'noshadow',html:CURSOR,enter:'up',din:.35,z:67,float:0,allowOver:1});
sfx(tc+.75,'click',.8);}
A({t0:C('शेयर',89.8)-.4,t1:T.out,x:540,y:1290,w:820,cls:'chipw',html:`<div style="display:inline-flex;align-items:center;gap:16px;background:#1f9a52;color:#fff;border-radius:999px;padding:18px 32px 14px;font:700 38px/1 P;box-shadow:0 18px 44px rgba(0,0,0,.35)"><div style="width:44px">${IC.share(44)}</div>Society group वर share करा</div>`,enter:'up',din:.4,sfx:'swoosh',sfxv:.6,z:66,float:0});

// ================= OUTRO =================
TINT(T.out,END+1,'linear-gradient(180deg,#0d1729,#162644)',.25);
WORDS(T.out+.05,END+1,540,560,860,[['अशाच',C('अशाच',90.7),''],['real',C('रियल',91.1),'ser gd'],['estate',C('एस्टेट',91.4),'ser gd'],['माहितीसाठी',C('महिती',91.6),'']],{st:'font:700 56px/1.3 P;color:#fff'});
A({t0:T.out+.4,t1:END+1,x:540,y:900,w:560,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:28px;padding:44px 50px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'whoosh',sfxv:.6,z:50,float:.15,shine:[T.out+1.2]});
const FT=C('फॉलो',93.4);
A({t0:C('पेजला',93.1)-.4,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span style="display:inline-block;background:${GOLD};color:#111;font:700 42px/1 P;padding:22px 40px 16px;border-radius:999px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.4,sfx:'pop',sfxv:.8,z:54,float:0,fn:t=>({s:(t>FT+.3&&t<FT+.5?.93:1)})});
A({t0:FT-.2,t1:END+1,x:760,y:1350,w:110,cls:'noshadow',html:CURSOR,enter:'up',din:.4,z:56,float:0,allowOver:1,fn:t=>({s:t>FT+.3&&t<FT+.5?.85:1})});
sfx(FT+.35,'click',.9);PART({type:'confetti',t0:FT+.4,t1:FT+.7,n:90,seed:41,x:540,y:-40,burst:1,life:2.5,colors:[GOLD,'#ffffff','#f2dfb6',RED]});
const NOBELL={ding:'pop',chime:'pop',bell:'thud',coin:'click',reveal:'whoosh',alert:'pop',question:'pop',sparkle:null};
for(let i=SFX.length-1;i>=0;i--){const m=NOBELL[SFX[i].type];if(m===undefined)continue;if(m===null)SFX.splice(i,1);else SFX[i].type=m}
// one sound per beat: within 0.15 s keep only the strongest (user: extra sounds)
{const PR={stamp:9,impact:8,thud:7,buzz:6,click:5,pop:4,riser:3,ticks:3,clock:3,whoosh:2,swoosh:1};SFX.sort((x,y)=>x.t-y.t);const keep=[];
 for(const e of SFX){const l=keep[keep.length-1];if(l&&e.t-l.t<.15){if((PR[e.type]||0)>(PR[l.type]||0))keep[keep.length-1]=e}else keep.push(e)}SFX.length=0;SFX.push(...keep)}
}
if(window.SAFE_GUIDE){const g=document.createElement('div');g.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:9999';
 g.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:220px;background:rgba(255,0,0,.2);border-bottom:3px solid #ff4040"></div><div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:rgba(255,0,0,.2);border-top:3px solid #ff4040"></div><div style="position:absolute;left:890px;right:35px;top:860px;bottom:420px;background:rgba(255,140,0,.3)"></div>`;
 document.getElementById('root').appendChild(g)}

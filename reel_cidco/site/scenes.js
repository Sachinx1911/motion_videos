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
function buildScenes(){
const END=75.8;
const T={hook:0,cid:C('उत्तरा',8.4),not:C('पंड',9.9),y70:C('2170',15.7),crowd:C('मुंबई',19.5),plan:C('मणुन',22.1),grid:C('जमीन',26),real:C('आता',32.8),cmp:C('तरी',38),ask:C('मुणन',43.7),loc:C('प्रापर्टी',51.9),docs:C('कागत',55.4),cm:C('आता',58.7),out:C('अशाच',71.4)};
const SEC=[0,T.cid,T.not,T.y70,T.crowd,T.plan,T.grid,T.real,T.cmp,T.ask,T.loc,T.docs,T.cm,T.out,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.03*E.inout(p)})`});
const CUT=t=>{flash(t,.35,'#fffaf0');sfx(t-.15,'whoosh',.5);punch(t,.03)};
[T.cid,T.not,T.y70,T.crowd,T.real,T.ask,T.cm,T.out].forEach(CUT);

// ---------- HUD ----------
A({t0:0,t1:T.out,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.92);border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.15)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:600});
A({t0:0.5,t1:T.out,x:610,y:300,w:480,cls:'noshadow',html:`<div style="text-align:left"><span style="display:inline-block;font:600 20px/1.35 P;color:#3d3a35;background:rgba(255,253,249,.9);border-radius:12px;padding:8px 14px 6px;white-space:nowrap">* माहितीसाठी - CIDCO चा अधिकृत video नाही</span></div>`,enter:'fade',din:.5,float:0,z:600});

// ================= 1 HOOK : aerial city, road / sector / flat =================
BG({img:'C14_aerial_flyover.jpg',t0:0,t1:T.cid+.05,s0:1.0,s1:1.0,fade:.2});
TINT(0,T.cid,'linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,0) 35%,rgba(0,0,0,0) 70%,rgba(0,0,0,.25))',.2);
LBL(C('रस्त्या',1.5),T.cid,210,1100,'रस्ता',{bg:'#fff',fs:40,w:240});
LBL(C('सेक्टर',2.9),T.cid,760,700,'Sector',{bg:NAVY,col:'#fff',fs:40,w:260});
LBL(C('जिथे',4.2),T.cid,330,860,'📍 तुमचा Flat',{bg:GOLD,col:'#111',fs:40,w:340});
POINT(C('रस्त्या',1.5)+.25,T.cid,250,1140,370,1000,{bend:-40});
POINT(C('सेक्टर',2.9)+.25,T.cid,760,745,700,900,{bend:50});
POINT(C('जिथे',4.2)+.25,T.cid,380,905,520,1020,{bend:-50,col:'#f2dfb6'});
PANEL(C('त्या',5.3),T.cid,540,560,820,`<div style="font:800 50px/1.25 P">या पूर्ण शहराचं <span style="color:${GOLD}">नियोजन</span> कोणी केलं?</div>`,{enter:'down'});

// ================= 2 CIDCO REVEAL =================
TINT(T.cid,T.not,'linear-gradient(180deg,#0d1729,#162644)',.15);
A({t0:C('सिडको',9.1)-.15,t1:T.not,x:540,y:860,w:1000,cls:'noshadow',html:`<div style="text-align:center"><div style="font:900 210px/1 P;letter-spacing:6px;color:#e8cf9f;text-shadow:0 0 50px rgba(232,207,159,.55)">CIDCO</div><div style="font:600 30px/1.4 P;color:#cfd6e4;margin-top:16px">City and Industrial Development Corporation</div></div>`,enter:'zoom',din:.4,sfx:'impact',sfxv:.7,z:50,float:.1,shine:[C('सिडको',9.1)+.3]});
PART({type:'sparks',t0:C('सिडको',9.1),t1:C('सिडको',9.1)+.3,n:80,seed:3,x:540,y:820,speed:900,color:GOLD});

// ================= 3 NOT JUST HOUSES =================
BG({img:'C02_street.jpg',t0:T.not,t1:T.y70+.05,s0:1.0,s1:1.1,fade:.2});
PANEL(T.not+.05,T.y70,540,540,800,`<div style="font:800 46px/1.3 P">CIDCO म्हणजे फक्त <span style="text-decoration:line-through;color:#9a958c">घरं बांधणारी संस्था</span> नाही!</div>`,{enter:'down'});
PANEL(C('मग',12.9),T.y70,540,1250,780,`<div style="font:800 46px/1.3 P">मग तुमच्या <span style="color:${GOLD}">property</span> शी संबंध काय? 🤔</div>`,{enter:'up'});

// ================= 4 1970 =================
BG({img:'C04_sepia_1970.jpg',t0:T.y70,t1:T.crowd+.05,s0:1.08,s1:1.0,fade:.2});
A({t0:T.y70+.05,t1:T.crowd,x:540,y:760,w:800,cls:'noshadow',html:`<div class="yr" style="text-align:center;font:900 220px/1 P;color:#faf7f2;text-shadow:0 10px 40px rgba(0,0,0,.45)">1950</div>`,enter:'zoom',din:.35,sfx:'ticks',sfxv:.5,z:50,float:.1,
  draw:(t,lt,oo)=>{oo.el.querySelector('.yr').textContent=Math.round(1950+20*E.out(clamp((t-T.y70)/.9)))}});
PANEL(C('महाराष्ट्र',17),T.crowd,540,1150,780,`<div style="font:800 44px/1.3 P">महाराष्ट्र सरकारने केली</div><div style="font:900 60px/1.2 P;color:${GOLD}">CIDCO ची स्थापना</div>`,{enter:'up',sfx:'stamp'});

// ================= 5 CROWDED MUMBAI =================
BG({img:'C05_crowded.jpg',t0:T.crowd,t1:T.plan+.05,s0:1.0,s1:1.12,fade:.2});
TINT(T.crowd,T.plan,'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(214,52,42,0),rgba(214,52,42,.28))',.2);
STAMP(C('लोकसंखेचा',20.3),T.plan,540,900,'मुंबईवर ताण!',RED,{fs:84,w:820});
shake(C('तान',21.1),10);

// ================= 6 PLANNED CITY =================
WIPE(T.plan-.3,'C01_aerial_b.jpg');
BG({img:'C01_aerial_b.jpg',t0:T.plan+.3,t1:T.grid+.05,s0:1.0,s1:1.08,fade:.01});
A({t0:T.plan+.2,t1:T.grid,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920">${[0,1,2,3,4].map(i=>`<line class="h" x1="0" x2="1080" y1="${1050+i*170}" y2="${1050+i*170}" stroke="#e8cf9f" stroke-width="3" opacity=".75" stroke-dasharray="1080" stroke-dashoffset="1080"/>`).join('')}${[0,1,2,3].map(i=>`<line class="h" y1="900" y2="1920" x1="${180+i*240}" x2="${180+i*240}" stroke="#e8cf9f" stroke-width="3" opacity=".75" stroke-dasharray="1080" stroke-dashoffset="1080"/>`).join('')}</svg>`,enter:'fade',din:.1,float:0,z:40,
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.h').forEach((l,i)=>l.style.strokeDashoffset=1080*(1-E.inout(clamp((t-T.plan-.4-i*.08)/.8))))}});
PANEL(C('नवी',22.5),T.grid,540,560,820,`<div style="font:800 44px/1.25 P">नवी मुंबई =</div><div style="font:900 62px/1.2 P;color:${GOLD}">नियोजनबद्ध शहर</div>`,{enter:'down'});

// ================= 7 PLANNING ELEMENTS : master plan -> iso sector =================
BG({img:'C03_masterplan.jpg',t0:T.grid,t1:C('पाणी',29)+.05,s0:1.0,s1:1.08,fade:.25});
BG({img:'C06_iso_sector.jpg',t0:C('पाणी',29),t1:T.real+.05,s0:1.0,s1:1.06,fade:.25});
[['जमीन',C('जमीन',26),330,650],['Sectors',C('सेक्टर्ज',26.6),730,650],['रस्ते',C('रस्ते',27.4),330,790],['निवासी भाग',C('निवासी',28.1),730,790],['पाणी',C('पाणी',29),330,930],['सुविधा',C('सुविधा',30.2),730,930]].forEach(([s,t0,x,y])=>LBL(t0,T.real,x,y,s,{bg:'#fff',fs:42,w:340}));
STAMP(C('नियोजन',31.5),T.real,540,1300,'नियोजन - CIDCO',GOLD,{fs:66,w:820});

// ================= 8 SAME LOOK, DIFFERENT RIGHTS =================
BG({img:'C07_twin_buildings.jpg',t0:T.real,t1:T.cmp+.05,s0:1.0,s1:1.06,fade:.2});
PANEL(T.real+.05,T.cmp,540,520,760,`<div style="font:800 48px/1.25 P"><span style="color:${GOLD}">खरी गोष्ट</span> ऐका!</div>`,{enter:'down',pad:'18px 26px'});
PANEL(C('अगदी',36.3),T.cmp,540,1380,760,`<div style="font:800 44px/1.3 P">दिसायला अगदी <span style="color:${GOLD}">सारख्या</span> इमारती...</div>`,{enter:'up',pad:'18px 26px'});
TINT(T.cmp,T.ask,'#f4f1ec',.15);
CARD(T.cmp,T.ask,300,780,340,560,'C10_plot_a.jpg',{enter:'left'});
CARD(T.cmp+.12,T.ask,680,780,340,560,'C10_plot_b.jpg',{enter:'right'});
A({t0:T.cmp+.4,t1:T.ask,x:490,y:780,w:120,cls:'noshadow',html:`<div style="width:110px;height:110px;border-radius:50%;background:${RED};color:#fff;font:900 76px/110px P;text-align:center;box-shadow:0 12px 30px rgba(0,0,0,.3)">≠</div>`,enter:'pop',din:.35,sfx:'pop',z:60,float:.1});
[['जमिनीचे हक्क',C('जमीनीचे',38.5),1150],['कराराच्या अटी',C('कराराचा',39.6),1270],['कागदपत्रं',C('कागत',41),1390]].forEach(([s,t0,y])=>A({t0,t1:T.ask,x:490,y,w:700,cls:'noshadow',html:`<div style="text-align:center"><div style="display:inline-flex;align-items:center;gap:18px;background:rgba(255,253,249,.96);border-radius:22px;padding:14px 26px 10px;box-shadow:0 12px 30px rgba(0,0,0,.18);font:800 44px/1.2 P"><span style="color:${NAVY}">${s}</span><span style="color:${RED};font-weight:900">≠</span></div></div>`,enter:'left',din:.4,sfx:'swoosh',sfxv:.5,z:62,float:.08}));

// ================= 9 ASK : keys =================
BG({img:'C09_hand_keys.jpg',t0:T.ask,t1:T.loc+.05,s0:1.0,s1:1.08,fade:.2});
PANEL(T.ask+.05,T.loc,540,540,780,`<div style="font:800 46px/1.25 P">Flat घेताना <span style="color:${GOLD}">एक प्रश्न</span> नक्की विचारा</div>`,{enter:'down'});
PANEL(C('या',46.4),T.loc,540,800,760,`<div style="font:900 54px/1.25 P">जमिनीचा हक्क कोणता?</div>`,{enter:'zoom',din:.35,sfx:'impact',sfxv:.4});
LBL(C('लीज',47.9),T.loc,340,1000,'Leasehold ?',{bg:NAVY,col:'#fff',fs:44,w:380});
LBL(C('फ्री',48.8),T.loc,740,1000,'Freehold ?',{bg:GOLD,col:'#111',fs:44,w:340});
PANEL(C('फ्री',48.8)+1.2,T.loc,540,1260,760,`<div style="font:800 42px/1.3 P">व्यवहारासाठी कोणत्या <span style="color:${RED}">परवानग्या</span> लागतात?</div>`,{enter:'up',pad:'18px 24px'});

// ================= 10 LOCATION + PRICE + DOCUMENTS =================
BG({img:'C13_aerial_sunset.jpg',t0:T.loc,t1:T.docs+.05,s0:1.0,s1:1.08,fade:.2});
// small red map pin drops onto the central tower, then bobs up-down; ripple ring on the roof
{const tp=C('लोकेशन',53.3)-.35;
 A({t0:tp,t1:T.docs,x:650,y:1100,w:110,cls:'noshadow',html:`<img src="a/red_pin.png" style="width:100%;filter:drop-shadow(0 10px 12px rgba(0,0,0,.4))">`,enter:'drop',din:.7,sfx:'thud',sfxd:.55,sfxv:.6,z:55,float:0,
   fn:(t,lt)=>({dy:lt>.7?-Math.abs(Math.sin((lt-.7)*3.2))*28:0})});
 A({t0:tp+.6,t1:T.docs,x:650,y:1180,w:200,cls:'noshadow',html:`<div class="rg" style="width:200px;height:64px;border-radius:50%;border:5px solid #ff3b2f;box-sizing:border-box"></div>`,enter:'fade',din:.05,float:0,z:50,
   draw:(t,lt,oo)=>{const q=(lt%1.0)/1.0;const r=oo.el.querySelector('.rg');r.style.transform=`scale(${.2+q})`;r.style.opacity=1-q}});}
LBL(C('लोकेशन',53.3)+.3,T.docs,330,1330,'📍 Location ✓',{bg:'#fff',fs:42,w:380});
LBL(C('किम्मत',54.2),T.docs,720,1330,'₹ किंमत ✓',{bg:'#fff',fs:42,w:320});
PANEL(C('फक्त',53),T.docs,540,560,780,`<div style="font:800 44px/1.3 P">फक्त location आणि किंमत बघून चालत नाही!</div>`,{enter:'down'});
BG({img:'C08_documents.jpg',t0:T.docs,t1:T.cm+.05,s0:1.0,s1:1.08,fade:.25});
PANEL(T.docs+.05,T.cm,540,560,800,`<div style="font:800 44px/1.3 P">कागदपत्रांमधल्या <span style="color:${GOLD}">अटी</span> समजणं</div><div style="font:900 58px/1.2 P;color:${RED}">तितकंच महत्त्वाचं!</div>`,{enter:'down'});

// ================= 11 ENGAGEMENT : vote next video =================
BG({img:'C12_skyline_a.jpg',t0:T.cm,t1:T.out+.05,s0:1.0,s1:1.08,fade:.25});
TINT(T.cm,T.out,'linear-gradient(180deg,rgba(13,23,41,.35),rgba(13,23,41,0) 45%,rgba(0,0,0,0) 70%,rgba(0,0,0,.3))',.2);
PANEL(C('पुडचा',59.9),T.out,540,520,800,`<div style="font:700 36px/1.2 P;color:#6b6b6b">तुम्ही ठरवा!</div><div style="font:900 56px/1.2 P">पुढचा video कशावर?</div>`,{enter:'down'});
[[1,'CIDCO ची<br><b style="color:'+GOLD+';font-size:58px">12.5%</b> योजना',C('सिडकोची',61.5),300],[2,'जमीन<br><b style="color:'+GOLD+';font-size:52px">Freehold</b> कशी होते?',C('सिडकोची',64),700]].forEach(([n,s,t0,x])=>A({t0,t1:T.out,x,y:880,w:360,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.96);border-radius:30px;padding:22px 20px 24px;box-shadow:0 24px 60px rgba(0,0,0,.25);text-align:center"><div style="width:80px;height:80px;border-radius:50%;background:${NAVY};color:#e8cf9f;font:900 50px/82px P;margin:0 auto 12px">${n}</div><div style="font:800 36px/1.3 P">${s}</div></div>`,enter:'pop',din:.45,sfx:'pop',sfxv:.6,z:60,float:.12}));
A({t0:C('कॉमेंट',66.1),t1:T.out,x:540,y:1180,w:820,cls:'chipw',html:`<div style="display:inline-flex;align-items:center;gap:18px;background:${NAVY};color:#fff;border-radius:999px;padding:20px 36px 16px;font:800 42px/1 P;box-shadow:0 18px 44px rgba(0,0,0,.35)"><svg viewBox="0 0 24 24" width="48"><path d="M4 4h16v12H8l-4 4z" fill="#e8cf9f"/></svg>Comment मध्ये 1 की 2 लिहा 👇</div>`,enter:'up',din:.45,sfx:'pop',sfxv:.8,z:66,float:0,fn:t=>({s:(t>C('कॉमेंट',66.1)+.9&&t<C('कॉमेंट',66.1)+1.1?.94:1)})});
A({t0:C('कॉमेंट',66.1)+.4,t1:T.out,x:720,y:1260,w:100,cls:'noshadow',html:`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`,enter:'up',din:.4,z:67,float:0});
sfx(C('कॉमेंट',66.1)+.95,'click',.8);
PANEL(C('जास्त',68.5),T.out,540,1400,780,`<div style="font:800 38px/1.3 P">जास्त मागणी त्या विषयावर <span style="color:${GOLD}">पुढचा video!</span></div>`,{pad:'16px 24px'});

// ================= 12 OUTRO =================
TINT(T.out,END+1,'linear-gradient(180deg,#0d1729,#162644)',.25);
WORDS(T.out+.05,END+1,540,560,860,[['अशाच',T.out,''],['real',C('रियल',71.8),'ser gd'],['estate',C('एस्टेट',72.1),'ser gd'],['माहितीसाठी',C('महीती',72.4),'']],{st:'font:800 58px/1.3 P;color:#fff'});
A({t0:T.out+.4,t1:END+1,x:540,y:900,w:560,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:28px;padding:44px 50px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'reveal',sfxv:.6,z:50,float:.15,shine:[T.out+1.2,T.out+3.4]});
const FT=C('फॉलो',74.3);
A({t0:C('पेजला',73.9)-.3,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span style="display:inline-block;background:${GOLD};color:#111;font:800 44px/1 P;padding:22px 40px 16px;border-radius:999px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.45,sfx:'pop',sfxv:.8,z:54,float:0,fn:t=>({s:(t>FT+.3&&t<FT+.5?.93:1)})});
A({t0:FT-.2,t1:END+1,x:760,y:1350,w:110,cls:'noshadow',html:`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`,enter:'up',din:.4,z:56,float:0,fn:t=>({s:t>FT+.3&&t<FT+.5?.85:1})});
sfx(FT+.35,'click',.9);PART({type:'confetti',t0:FT+.4,t1:FT+.75,n:100,seed:41,x:540,y:-40,burst:1,life:3,colors:[GOLD,'#ffffff','#f2dfb6',RED]});
}
if(window.SAFE_GUIDE){const g=document.createElement('div');g.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:9999';
 g.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:220px;background:rgba(255,0,0,.2);border-bottom:3px solid #ff4040"></div><div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:rgba(255,0,0,.2);border-top:3px solid #ff4040"></div><div style="position:absolute;left:890px;right:35px;top:860px;bottom:420px;background:rgba(255,140,0,.3)"></div>`;
 document.getElementById('root').appendChild(g)}

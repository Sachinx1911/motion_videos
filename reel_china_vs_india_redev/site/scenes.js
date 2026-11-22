const CURSOR=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;
// SRS Dwell - चीन vs आपण redevelopment (22 Nov 2026). FIRST STYLE navy+gold. Slot grid: TITLE y395 · HERO y~980 · CAPTION y1480.
// Every item lands on its spoken word (L = cue - 0.12). Cues from Whisper (cue_words.json).
function buildScenes(){
const END=59.4;window.END=END;
const L=t=>t-.12;
const SEC=[0,6.70,21.40,35.86,49.16,56.80,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.04*E.inout(p)})`});
BOKEH_ON=t=>(t<SEC[1])?0:1;
const INK='#0d1729';
const BAN=(t0,t1,y,txt,o={})=>{A({t0,t1,x:540,y,w:1000,cls:'chipw',html:`<span class="pill p-red" style="font:900 ${o.fs||52}px/1.15 P;padding:24px 44px 18px;transform:rotate(${o.rot||-3}deg);display:inline-block;white-space:normal">${txt}</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.85,z:60,float:0,allowOver:1,over:1});shake(t0+.05,10)};
const CARD=(t0,t1,y,icon,title,sub,o={})=>GL(t0,t1,o.x||540,y,o.w||900,`<div style="display:flex;align-items:center;gap:24px;text-align:left"><div style="width:96px;height:96px;flex:none;border-radius:22px;background:${o.col||'linear-gradient(180deg,#f2dfb6,#c9a66f)'};display:flex;align-items:center;justify-content:center;font-size:52px">${icon}</div><div><div style="font:800 ${o.fs||44}px/1.25 P;color:${INK}">${title}</div>${sub?`<div style="font:600 30px/1.3 P;color:#6b5a45;margin-top:4px">${sub}</div>`:''}</div></div>`,Object.assign({white:true,pad:'20px 28px',enter:'left',din:.4,float:.05},o));
function RULE(n,t0,t1,title,tt,o={}){
  A({t0,t1,x:540,y:250,w:1040,cls:'chipw',html:`<span class="pill p-gold" style="font:900 48px/1 P;padding:20px 46px 14px">${n}</span>`,enter:'down',din:.4,sfx:null,z:500,float:.1});
  if(title)TXT(tt,o.tt1||t1,540,o.y||395,`<div style="font:800 ${o.fs||60}px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">${title}</div>`,{z:500,sfx:null});
}
// CSS flags (no emoji - Windows Chrome has no flag glyphs)
const FLAG_CN=`<div style="display:inline-block;width:150px;height:100px;background:#de2910;border-radius:10px;position:relative;box-shadow:0 8px 24px rgba(0,0,0,.4);overflow:hidden"><div style="position:absolute;left:14px;top:4px;color:#ffde00;font-size:58px;line-height:1">★</div><div style="position:absolute;left:66px;top:6px;color:#ffde00;font-size:18px;line-height:1">★</div><div style="position:absolute;left:80px;top:22px;color:#ffde00;font-size:18px;line-height:1">★</div><div style="position:absolute;left:80px;top:42px;color:#ffde00;font-size:18px;line-height:1">★</div><div style="position:absolute;left:66px;top:58px;color:#ffde00;font-size:18px;line-height:1">★</div></div>`;
const FLAG_IN=`<div style="display:inline-block;width:150px;height:100px;border-radius:10px;position:relative;box-shadow:0 8px 24px rgba(0,0,0,.4);overflow:hidden;background:linear-gradient(180deg,#ff9933 0 33.3%,#fff 33.3% 66.6%,#138808 66.6%)"><div style="position:absolute;left:59px;top:34px;width:32px;height:32px;border-radius:50%;border:4px solid #000080;box-sizing:border-box"></div></div>`;
const HALF=(t0,t1,img,side,o={})=>A({t0,t1,x:side==='l'?270:810,y:960,w:540,cls:'noshadow',html:`<div style="width:540px;height:1920px;background:url(a/${img}) ${o.pos||'center'}/cover;filter:${o.filter||'brightness(.85) saturate(.95)'}"></div>`,enter:side==='l'?'left':'right',din:.5,sfx:null,float:0,z:5,allowOver:1,exit:'fade',dout:.3,fn:t=>({s:1+.05*clamp((t-t0)/(t1-t0))})});
const VS=(t0,t1)=>{A({t0,t1,x:540,y:960,w:8,cls:'noshadow',html:`<div style="width:8px;height:1920px;background:linear-gradient(180deg,#f2dfb6,#c9a66f)"></div>`,enter:'fade',din:.3,sfx:null,float:0,z:8,allowOver:1});
  A({t0,t1,x:540,y:960,w:170,cls:'chipw',html:`<span class="pill p-gold" style="font:900 64px/1 P;padding:22px 30px 16px">VS</span>`,enter:'zoom',din:.35,sfx:'impact',sfxv:.6,z:50,float:0});punch(t0,.06)};

// ---------- transitions ----------
BARS(SEC[1]);RINGT(SEC[2]);BLINDS(SEC[3]);flash(SEC[4],.5,'#ff5a4a');sfx(SEC[4]-.05,'boom',.55);shake(SEC[4]+.05,10);SWEEP(SEC[5]);

// ---------- HUD ----------
A({t0:0,t1:SEC[5],x:128,y:108,w:190,img:'logo_white.png',cls:'noshadow',enter:'fade',din:.6,float:0,z:600});
A({t0:SEC[1],t1:SEC[5],x:680,y:104,w:660,cls:'noshadow',enter:'fade',din:.5,float:0,z:600,
  html:`<div style="display:flex;gap:12px">${[1,2,3,4].map(i=>`<div class="sg" style="flex:1;height:14px;border-radius:7px;background:rgba(255,255,255,.18);overflow:hidden"><div style="height:100%;width:0;background:linear-gradient(90deg,#f2dfb6,#c9a66f);box-shadow:0 0 12px #e8cf9f"></div></div>`).join('')}</div>`,
  draw:(t,lt,oo)=>{const st=[SEC[1],SEC[2],SEC[3],SEC[4],SEC[5]];oo.el.querySelectorAll('.sg>div').forEach((d,i)=>{d.style.width=(clamp((t-st[i])/(st[i+1]-st[i]))*100)+'%'})}});
A({t0:SEC[1],t1:SEC[5],x:900,y:162,w:320,cls:'noshadow',enter:'fade',din:.5,float:0,z:600,html:`<div style="display:inline-block;font:700 20px/1 P;color:#fff;background:rgba(255,255,255,.14);border:2px solid rgba(232,207,159,.5);border-radius:999px;padding:10px 20px">चीन vs आपण</div>`});

// ================= HOOK 0 - 6.70 : split screen =================
BG({img:'B1_mumbai_society.jpg',t0:-.3,t1:SEC[1],s0:1.0,s1:1.0,fade:.1,filter:'brightness(.3) blur(10px)'});
HALF(0,SEC[1],'B1_mumbai_society.jpg','l',{pos:'40% center'});
HALF(0,SEC[1],'B2_china_old_block.jpg','r',{pos:'center',filter:'brightness(.35) saturate(.6) blur(3px)'});
HALF(L(2.82),SEC[1],'B2_china_old_block.jpg','r',{pos:'center'});
TINT(0,SEC[1],'linear-gradient(180deg,rgba(13,26,51,.75),rgba(13,26,51,.15) 35%,rgba(13,26,51,.15) 65%,rgba(13,26,51,.85))',.2);
A({t0:L(0.00),t1:SEC[1],x:270,y:300,w:200,cls:'chipw',html:FLAG_IN,enter:'down',din:.35,sfx:'pop',sfxv:.4,float:.1,z:45});
TXT(L(0.58),SEC[1],270,1500,`<div style="display:inline-block;font:800 44px/1.3 P;color:#fff;background:rgba(13,26,51,.78);padding:18px 26px 14px;border-radius:24px;backdrop-filter:blur(8px)">Builder देतो<br><span class="pill p-gold" style="font:900 48px/1 P;padding:12px 22px 8px;display:inline-block;margin-top:8px">मोफत मोठं घर</span></div>`,{w:500,enter:'up',din:.35,sfx:'whoosh',sfxv:.5});
VS(L(2.54),SEC[1]);
A({t0:L(2.82),t1:SEC[1],x:810,y:300,w:200,cls:'chipw',html:FLAG_CN,enter:'down',din:.35,sfx:'pop',sfxv:.4,float:.1,z:45});
TXT(L(3.28),SEC[1],810,1500,`<div style="display:inline-block;font:800 44px/1.3 P;color:#fff;background:rgba(13,26,51,.78);padding:18px 26px 14px;border-radius:24px;backdrop-filter:blur(8px)">लोक स्वतःचे पैसे भरून<br><span class="pill p-red" style="font:900 48px/1 P;padding:12px 22px 8px;display:inline-block;margin-top:8px">इमारत पाडतायत</span></div>`,{w:500,enter:'up',din:.35,sfx:'whoosh',sfxv:.5});
A({t0:L(6.14),t1:SEC[1],x:540,y:700,w:600,cls:'chipw',html:`<span class="pill p-gold" style="font:900 96px/1 P;padding:30px 56px 22px">असं का?</span>`,enter:'zoom',din:.3,sfx:'impact',sfxv:.65,z:62,float:0});
punch(L(6.14),.08);

// ================= 1. चीन: जमीन सरकारची (6.70-21.40) =================
BG({img:'B2_china_old_block.jpg',t0:SEC[1],t1:L(16.44),s0:1.04,s1:1.14,y0:0,y1:-40,fade:.2,filter:'brightness(.9) saturate(1.0)'});
TINT(SEC[1],L(16.44),'linear-gradient(180deg,rgba(13,26,51,.72),rgba(13,26,51,.2) 40%,rgba(13,26,51,.2) 60%,rgba(13,26,51,.8))',.2);
RULE('1 · चीन',SEC[1]+.05,SEC[2],'जमीन = सरकारची',L(8.26),{tt1:L(16.44)});
GL(L(9.06),L(12.88),540,980,760,`<div style="font:800 52px/1.35 P;color:${INK}">घर <span style="color:#1d8a4a">तुमचं ✓</span><br>जमीन <span style="color:#c92a1e">सरकारची</span></div>`,{white:true,pad:'30px 36px',enter:'pop',din:.35,float:.1});
CARD(L(10.80),L(14.40),1480,'⏳','Land-use right','जास्तीत जास्त 70 वर्षं',{w:820,fs:44});
GL(L(12.88),L(16.44),540,980,820,`<div style="font:800 46px/1.35 P;color:${INK}">Redevelopment<br><span class="pill p-red" style="font:900 52px/1 P;padding:14px 30px 10px;display:inline-block;margin-top:10px">सरकार ठरवतं</span></div>`,{white:true,pad:'28px 36px',enter:'pop',din:.35,float:.1,sfx:'whoosh',sfxv:.5});
CARD(L(14.40),L(16.44),1480,'💰','भरपाई ≥ बाजारभाव','State Council नियम · 2011',{w:860,fs:42});
// nail house
BARS(L(16.44));
BG({img:'B3_nail_house.jpg',t0:L(16.44),t1:SEC[2],s0:1.0,s1:1.12,y0:0,y1:-30,fade:.15,filter:'brightness(.95) saturate(1.05)'});
TINT(L(16.44),SEC[2],'linear-gradient(180deg,rgba(13,26,51,.72),rgba(13,26,51,.1) 40%,rgba(13,26,51,.1) 60%,rgba(13,26,51,.8))',.2);
TXT(L(16.44),SEC[2],540,395,`<div style="font:800 56px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">जो मालक अडून बसतो…</div>`,{z:500,sfx:null});
TXT(L(18.28),L(20.76),540,1480,`<div style="display:inline-block;font:800 44px/1.3 P;color:#fff;background:rgba(13,26,51,.78);padding:18px 30px 14px;border-radius:24px;backdrop-filter:blur(8px)">खड्ड्याच्या मधोमध<br>एकटं घर</div>`,{enter:'up',din:.3,sfx:'swoosh',sfxv:.4});
BAN(L(20.76),SEC[2],1000,'NAIL HOUSE',{fs:84,rot:-6});flash(L(20.76),.4,'#ff5a4a');
CARD(L(20.76),SEC[2],1480,'📌','खिळ्यासारखं अडलेलं घर','Shenzhen, चीन',{w:820,fs:40,sfx:null});

// ================= 2. Scale (21.40-35.86) =================
BG({img:'B5_new_tower.jpg',t0:SEC[2],t1:L(28.10),s0:1.15,s1:1.02,y0:40,y1:-20,fade:.2,filter:'brightness(.9) saturate(.95)'});
TINT(SEC[2],L(28.10),'linear-gradient(180deg,rgba(13,26,51,.75),rgba(13,26,51,.3) 40%,rgba(13,26,51,.3) 60%,rgba(13,26,51,.85))',.2);
RULE('2 · Scale',SEC[2]+.05,SEC[3],'आकडे बघा',L(21.40),{tt1:L(22.18)});
PILL(L(22.18),L(30.02),540,395,'2019 - 2024','p-gold',{st:'font:900 56px/1 P;padding:20px 46px 14px',z:500,float:0});
const BIGN=2.8;
GL(L(24.34),L(28.10),540,980,860,`<div><div class="n" style="font:900 120px/1 P;color:${INK}">0</div><div style="font:800 40px/1.2 P;color:#6b5a45;margin-top:10px">जुन्या सोसायट्यांचं नूतनीकरण</div><div style="font:700 30px/1.2 P;color:#8a7560;margin-top:6px">12 कोटी+ लोक</div></div>`,{white:true,pad:'34px 40px',enter:'pop',din:.35,float:.05,sfx:'impact',sfxv:.5,
  draw:(t,lt,oo)=>{const p=E.out(clamp((t-L(24.34))/1.0));oo.el.querySelector('.n').textContent=(p*BIGN).toFixed(1)+' लाख'}});
punch(L(25.40),.06);
CARD(L(27.06),L(30.02),1480,'🔧','पाडकाम नाही · Retrofit','lift · pipeline · parking',{w:860,fs:42});
SWEEP(L(28.10));
BG({img:'B4_lift.jpg',t0:L(28.10),t1:L(30.02),s0:1.08,s1:1.16,fade:.15,filter:'brightness(.9)'});
TINT(L(28.10),L(30.02),'linear-gradient(180deg,rgba(13,26,51,.75),rgba(13,26,51,.3) 40%,rgba(13,26,51,.3) 60%,rgba(13,26,51,.85))',.2);
PILL(L(28.10),L(30.02),540,980,'Lift · Pipeline','p-gold',{st:'font:900 60px/1 P;padding:22px 48px 16px',z:45,float:0,sfx:null});
BLINDS(L(30.02));
BG({img:'B5_new_tower.jpg',t0:L(30.02),t1:SEC[3],s0:1.0,s1:1.1,y0:-30,y1:20,fade:.15,filter:'brightness(.95) saturate(1.05)'});
TINT(L(30.02),SEC[3],'linear-gradient(180deg,rgba(13,26,51,.72),rgba(13,26,51,.15) 40%,rgba(13,26,51,.15) 60%,rgba(13,26,51,.8))',.2);
TXT(L(30.02),SEC[3],540,395,`<div style="font:800 56px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">नवा trend · Hangzhou</div>`,{z:500,sfx:null});
GL(L(31.10),SEC[3],540,980,760,`<div style="font:900 110px/1 P;color:${INK}">548</div><div style="font:800 40px/1.2 P;color:#6b5a45;margin-top:8px">कुटुंबं</div>`,{white:true,pad:'30px 36px',enter:'pop',din:.35,float:.05,sfx:'impact',sfxv:.5});
punch(L(31.10),.06);
CARD(L(32.64),L(35.00),1480,'💴','80%+ खर्च स्वतः भरला','जुनी पाडली, त्याच जागी नवी',{w:880,fs:40});
CARD(L(35.00),SEC[3],1480,'🏢','नवी इमारत बांधली','रहिवासी-केंद्रित redevelopment',{w:880,fs:40});

// ================= 3. आपण (35.86-49.16) =================
BG({img:'B1_mumbai_society.jpg',t0:SEC[3],t1:L(39.06),s0:1.02,s1:1.12,y0:0,y1:-40,fade:.2,filter:'brightness(.95)'});
TINT(SEC[3],L(39.06),'linear-gradient(180deg,rgba(13,26,51,.72),rgba(13,26,51,.15) 40%,rgba(13,26,51,.15) 60%,rgba(13,26,51,.8))',.2);
RULE('3 · आपण',SEC[3]+.05,SEC[4],'उलटं!',L(36.40),{tt1:L(36.64)});
TXT(L(36.64),L(39.06),540,395,`<div style="font:800 56px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">जमीन = सोसायटीची</div>`,{z:500,sfx:null});
GL(L(37.82),L(39.06),540,980,760,`<div style="font:800 52px/1.35 P;color:${INK}">निर्णय<br><span class="pill p-gold" style="font:900 56px/1 P;padding:14px 30px 10px;display:inline-block;margin-top:10px">सभासदांचा</span></div>`,{white:true,pad:'30px 36px',enter:'pop',din:.35,float:.1});
SWEEP(L(39.06));
BG({img:'B6_meeting.jpg',t0:L(39.06),t1:L(45.04),s0:1.0,s1:1.1,y0:0,y1:-30,fade:.15,filter:'brightness(.9)'});
TINT(L(39.06),L(45.04),'linear-gradient(180deg,rgba(13,26,51,.75),rgba(13,26,51,.3) 40%,rgba(13,26,51,.3) 60%,rgba(13,26,51,.85))',.2);
TXT(L(39.06),L(45.04),540,395,`<div style="font:800 56px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">नवे नियम · 2026</div>`,{z:500,sfx:null});
const ROWS=[['कोरम','2/3',39.58],['Builder निवड','51% लेखी संमती',41.34],['Registrar चा माणूस','हजर',42.78],['सभेचं','video recording',44.44]];
GL(L(39.58),L(45.04),540,1000,900,`<div style="text-align:left;font:700 38px/1.9 P;color:${INK}">${ROWS.map(r=>`<div class="rw" style="display:flex;justify-content:space-between;gap:20px;border-bottom:2px solid #e4ddd3;opacity:.22"><span style="color:#8a7560">${r[0]}</span><span class="v" style="font-weight:900;color:#b8935f;clip-path:inset(0 100% 0 0)">${r[1]}</span></div>`).join('')}</div>`,{white:true,pad:'22px 34px',enter:'pop',din:.3,float:.05,sfx:null,
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.rw').forEach((e,i)=>{const nx=i+1<ROWS.length?L(ROWS[i+1][2]):L(45.04);const d=Math.min(.45,nx-L(ROWS[i][2])-.05);const p=clamp((t-L(ROWS[i][2]))/d);e.style.opacity=.22+.78*p;e.querySelector('.v').style.clipPath=`inset(0 ${(1-p)*100}% 0 0)`})}});
ROWS.forEach(r=>sfx(L(r[2]),'pop',.45));
A({t0:L(44.44),t1:L(45.04),x:860,y:1380,w:160,img:'O4_camera.png',enter:'pop',din:.3,sfx:null,float:.2,z:50,allowOver:1});
BLINDS(L(45.04));
BG({img:'B7_construction.jpg',t0:L(45.04),t1:SEC[4],s0:1.0,s1:1.1,y0:20,y1:-30,fade:.15,filter:'brightness(.95)'});
TINT(L(45.04),SEC[4],'linear-gradient(180deg,rgba(13,26,51,.72),rgba(13,26,51,.15) 40%,rgba(13,26,51,.15) 60%,rgba(13,26,51,.8))',.2);
TXT(L(45.04),SEC[4],540,395,`<div style="font:800 56px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">Builder चा पैसा कुठून?</div>`,{z:500,sfx:null});
GL(L(45.46),SEC[4],540,960,820,`<div style="font:800 46px/1.35 P;color:${INK}">जास्तीचा <span class="pill p-gold" style="font:900 56px/1 P;padding:12px 26px 8px;display:inline-block">FSI</span><br><span style="font-size:38px;color:#6b5a45">→ जास्तीचे flat विकतो</span></div>`,{white:true,pad:'28px 36px',enter:'pop',din:.35,float:.1});
const GIVES=[['🏠','मोठं घर',47.34],['🧾','भाडं',48.14],['💰','corpus',48.64]];
GIVES.forEach((g,i)=>A({t0:L(g[2]),t1:SEC[4],x:230+i*310,y:1480,w:290,cls:'chipw',html:`<span class="pill p-gold" style="font:900 38px/1 P;padding:18px 24px 12px;display:inline-block;white-space:nowrap">${g[0]} ${g[1]}</span>`,enter:'pop',din:.3,sfx:'pop',sfxv:.5,z:45,float:.1}));

// ================= 4. फरक एका ओळीत (49.16-54.02) =================
BG({img:'B3_nail_house.jpg',t0:SEC[4],t1:L(54.02),s0:1.0,s1:1.0,fade:.1,filter:'brightness(.3) blur(10px)'});
HALF(SEC[4],L(54.02),'B3_nail_house.jpg','l',{pos:'center'});
HALF(SEC[4],L(54.02),'B6_meeting.jpg','r',{pos:'center'});
TINT(SEC[4],L(54.02),'linear-gradient(180deg,rgba(13,26,51,.8),rgba(13,26,51,.2) 35%,rgba(13,26,51,.2) 65%,rgba(13,26,51,.85))',.2);
TXT(L(49.16),L(54.02),540,330,`<div style="font:800 56px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">फरक एका ओळीत</div>`,{z:500,sfx:null,float:0});
VS(L(49.62),L(54.02));
A({t0:L(50.18),t1:L(54.02),x:270,y:560,w:200,cls:'chipw',html:FLAG_CN,enter:'down',din:.3,sfx:null,float:.1,z:45});
A({t0:L(52.08),t1:L(54.02),x:810,y:560,w:200,cls:'chipw',html:FLAG_IN,enter:'down',din:.3,sfx:null,float:.1,z:45});
const SIDE=(t,x,y,txt,c)=>A({t0:L(t),t1:L(54.02),x,y,w:400,cls:'chipw',html:`<span class="pill ${c}" style="font:900 48px/1 P;padding:18px 26px 12px;display:inline-block;white-space:nowrap">${txt}</span>`,enter:'pop',din:.3,sfx:c==='p-gold'?'pop':'stamp',sfxv:c==='p-gold'?.5:.6,z:50,float:0});
SIDE(50.70,250,1000,'वेग ✓','p-gold');
SIDE(51.44,250,1200,'आवाज ✗','p-red');
SIDE(52.58,830,1000,'आवाज ✓','p-gold');
SIDE(53.38,830,1200,'वेग ✗','p-red');

// ================= 5. CTA (54.02-56.80) =================
BG({img:'B1_mumbai_society.jpg',t0:L(54.02),t1:SEC[5],s0:1.05,s1:1.1,fade:.2,filter:'brightness(.8) saturate(.9)'});
TINT(L(54.02),SEC[5],'linear-gradient(180deg,rgba(13,26,51,.75),rgba(13,26,51,.35) 40%,rgba(13,26,51,.35) 60%,rgba(13,26,51,.85))',.2);
GL(L(54.02),SEC[5],540,560,940,`<div style="font:800 52px/1.35 P;color:${INK}">तुमच्या सोसायटीचं<br>redevelopment अडलंय का?</div>`,{white:true,pad:'30px 36px',float:0,sfx:'whoosh',sfxv:.5});
COMMENT_BOX(L(55.72),SEC[5]-.05,55.8,56.45,'हो, 3 वर्षं अडलंय',{y:1300,typeDur:.5});

// ================= OUTRO (56.80-59.4) : logo + follow =================
BG({img:'B5_new_tower.jpg',t0:SEC[5],t1:END+1,s0:1.08,s1:1.0,y0:-30,y1:0,fade:.15,filter:'brightness(.75) saturate(.9) blur(2px)'});
TINT(SEC[5],END+1,'linear-gradient(180deg,rgba(13,26,51,.8),rgba(13,26,51,.45) 40%,rgba(13,26,51,.45) 60%,rgba(13,26,51,.85))',.2);
TXT(L(56.92),END+1,540,420,`<div style="font:800 62px/1.3 P;color:#fff">अशाच माहितीसाठी</div>`,{enter:'down',din:.4,float:0,sfx:null});
A({t0:SEC[5],t1:END+1,x:540,y:900,w:820,cls:'gl w',html:`<div style="padding:44px 56px 38px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.5,sfx:null,z:50,float:0});
FOLLOW_FLIP(L(56.92),END+1,57.5,{y:1300,col:'#c9a66f'});
A({t0:57.6,t1:END+1,x:540,y:1540,w:980,cls:'chipw',enter:'fade',din:.4,float:0,z:40,html:`<div style="font:600 21px/1.5 P;color:rgba(255,255,255,.8)">* स्रोत: People's Daily Jan 2025 · China Daily Sep 2025 · Global Times Nov 2026 · Trilegal / IndiaLaw 2026 (GR 30 Sep 2026)<br>Nail house फोटो: N509FZ, Wikimedia Commons, CC BY-SA 4.0 · चीनची इमारत: Wikimedia Commons CC BY 3.0 · कायदेशीर सल्ला नाही</div>`});
}

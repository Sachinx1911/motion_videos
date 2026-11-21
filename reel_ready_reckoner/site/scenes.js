const CURSOR=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;
// SRS Dwell - Ready Reckoner rate म्हणजे काय? Navy + gold look, fast-paced crops (2-4 s per crop). Times = cue_words (cue-0.12).
function buildScenes(){
const END=99.5;window.END=END;
const L=t=>t-.12;
const S={s1:0,s2:8.26,s3:21.0,s4:37.74,s5:48.70,s6:64.14,s7:77.94,s8:89.06,s9:96.4};
BOKEH_ON=t=>(t>S.s9)?1:0;
const TOP='linear-gradient(180deg,rgba(6,11,22,.85),rgba(6,11,22,.3) 32%,rgba(6,11,22,.15) 55%,rgba(6,11,22,.85))';
// one image, several crops: segs = [[t0,t1,s0,s1,x0,x1,y0,y1],...] -> fast cuts (fade .2) between crops
const CROPS=(img,segs,filter='brightness(.8) saturate(.9)')=>{for(const [t0,t1,s0,s1,x0,x1,y0,y1] of segs)BG({img,t0,t1,s0,s1,x0:x0||0,x1:x1||0,y0:y0||0,y1:y1||0,fade:.2,filter});TINT(segs[0][0],segs[segs.length-1][1],TOP,.25)};
const HEAD=(t0,t1,txt,o={})=>PILL(t0,t1,540,o.y||420,txt,'p-gold',{st:'font:900 44px/1 P;padding:20px 44px 14px',z:500,float:0});
const LINE=(t0,t1,y,html,o={})=>GL(t0,t1,500,y,o.w||860,html,Object.assign({pad:'22px 30px',align:'left',float:.05,enter:'left',din:.4,dark:true},o));
const INR=v=>Math.round(v).toLocaleString('en-IN');
const NUM=(cls,t0,val,fmt,dur=.8)=>(t,lt,oo)=>{const n=oo.el.querySelector(cls);if(!n)return;if(t<t0){n.style.visibility='hidden';return}n.style.visibility='visible';n.textContent=fmt(val*E.out(clamp((t-t0)/dur)))};

// HUD
A({t0:0,t1:S.s9,x:128,y:300,w:170,img:'logo_white.png',cls:'noshadow',enter:'fade',din:.6,float:0,z:600});
A({t0:.3,t1:S.s9,x:600,y:300,w:640,cls:'noshadow',enter:'fade',din:.5,float:0,z:600,html:`<div style="text-align:left;font:500 21px/1.4 P;color:rgba(255,255,255,.85)">* उदाहरण · IGR e-ASR 2025-26 (2026-27 अपरिवर्तित) · built-up = carpet + 20% (साधारण)<br>अंतिम मूल्यांकन sub-registrar · कायदेशीर सल्ला नाही · दि. 18 नोव्हें 2026</div>`});

// ===== S1 HOOK (0-8.26) : 70 लाख vs 78 लाख =====
CROPS('P1_vashi_building.jpg',[[S.s1,3.3,1.0,1.08],[3.3,6.0,1.5,1.58,-160,-120,260,220],[6.0,S.s2,1.25,1.32,200,160,-160,-120]]);
HEAD(L(0.46),S.s2,'घराची किंमत?');
A({t0:L(1.12),t1:S.s2,x:500,y:900,w:560,img:'O01_price_tag.png',enter:'pop',din:.4,sfx:'pop',sfxv:.6,float:.2,z:40,
  html:`<div style="position:absolute;left:3%;width:41%;top:255px;text-align:center"><div style="font:600 24px P;color:#666">Agreement</div><div style="font:900 70px/1.05 P;color:#0d1729">₹70</div><div style="font:800 40px/1.1 P;color:#0d1729">लाख</div></div>`});
A({t0:L(3.94),t1:S.s2,x:560,y:1080,w:860,cls:'chipw',html:`<span class="stampbox" style="color:#e0392b;background:rgba(255,255,255,.9);font-size:72px;transform:rotate(-7deg);display:inline-block">सरकार: ₹78 लाख</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.85,z:60,float:0,over:1});
shake(L(3.94)+.05,10);
PILL(L(5.56),S.s2,540,1330,'Stamp duty 78 लाखावर!','p-red',{st:'font-size:40px',float:0});
punch(L(6.82),.05);

// ===== S2 RR म्हणजे काय (8.26-21) =====
CROPS('P2_navi_mumbai_aerial.jpg',[[S.s2,12.4,1.0,1.06],[12.4,16.4,1.35,1.42,0,-40,-200,-240],[16.4,S.s3,1.15,1.2,60,40,120,140]],'brightness(.85) saturate(.95)');
HEAD(L(10.12),S.s3,'Ready Reckoner rate');
GL(L(8.76),L(10.12),540,700,760,`<div style="font:800 54px/1.3 P">ही <span class="gold">सरकारी किंमत</span></div>`,{dark:true,float:0,din:.3});
GL(L(11.22),S.s3,540,700,900,`<div class="lab">महाराष्ट्र · दरवर्षी</div><div style="display:flex;align-items:center;justify-content:center;gap:26px"><img src="a/O03_calendar.png" style="width:150px;filter:drop-shadow(0 10px 20px rgba(0,0,0,.4))"><div class="gold" style="font:900 84px/1.05 P">1 एप्रिल</div></div>`,{dark:true,pad:'24px 32px',float:0});
sfx(L(12.84),'paper',.6);
// zone grid = orange marking over the aerial (only marking use of orange)
A({t0:L(13.58),t1:S.s3,x:540,y:960,w:1080,cls:'noshadow',enter:'fade',din:.4,float:0,z:30,html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="opacity:.75">${[...Array(6)].map((_,i)=>`<line x1="${90+i*180}" y1="0" x2="${90+i*180}" y2="1920" stroke="#ff8a2a" stroke-width="3" stroke-dasharray="18 14"/>`).join('')}${[...Array(8)].map((_,i)=>`<line x1="0" y1="${160+i*220}" x2="1080" y2="${160+i*220}" stroke="#ff8a2a" stroke-width="3" stroke-dasharray="18 14"/>`).join('')}</svg>`});
PILL(L(13.58),S.s3,540,1080,'प्रत्येक गाव · प्रत्येक zone','p-glass',{st:'font-size:40px',float:0});
PILL(L(16.32),S.s3,540,1210,'जमीन · flat · दुकान → वेगळे दर','p-glass',{st:'font-size:38px',float:0});
PILL(L(19.30),S.s3,540,1350,'त्याखाली registration नाही ✗','p-red',{st:'font-size:40px',float:0});punch(L(19.90),.04);

// ===== S3 हिशोब (21-37.74) =====
CROPS('P3_two_bhk_interior.jpg',[[S.s3,25.0,1.0,1.06],[25.0,29.4,1.3,1.36,-60,-80,200,220],[29.4,33.6,1.2,1.25,80,60,-80,-60],[33.6,S.s4,1.05,1.12]],'brightness(.75) saturate(.9)');
HEAD(L(21.70),S.s4,'उदाहरण · वाशी');
const ROW=(k,v,cls='')=>`<div class="r ${cls}" style="display:flex;justify-content:space-between;align-items:center;gap:20px;padding:12px 0;border-top:1px solid rgba(255,255,255,.14);display:none"><div class="lab" style="font-size:30px">${k}</div><div style="font:800 44px/1.1 P;white-space:nowrap">${v}</div></div>`;
GL(L(22.32),S.s4,540,840,900,`<div style="text-align:left">${ROW('flat दर','<span class="gold">₹1,03,000</span> / चौ.मी.')}${ROW('carpet','650 sq.ft')}${ROW('built-up ≈','72.5 चौ.मी.')}${ROW('गुणाकार','<span class="gold">₹74.7 लाख</span>')}${ROW('7 वा मजला','+5%')}${ROW('सरकारी किंमत','<span class="gold">₹78 लाख</span>','big')}</div>`,{dark:true,pad:'10px 32px',float:0,
  draw:(t,lt,oo)=>{const ts=[L(23.70),L(27.08),L(29.28),L(31.58),L(34.28),L(36.62)];oo.el.querySelectorAll('.r').forEach((e,i)=>{e.style.display=t>=ts[i]?'flex':'none'})}});
[23.70,27.08,29.28,31.58,34.28].forEach(k=>sfx(L(k),'pop',.4));
sfx(L(36.62),'impact',.6);punch(L(36.62),.06);
IMG(L(27.08),L(31.4),200,1330,260,'O04_measuring_tape.png',{sfx:null,float:.3});
IMG(L(31.58),L(34.1),200,1330,260,'O05_calculator.png',{sfx:null,float:.3});
// floor premium strip + 7-storey building
A({t0:L(34.28),t1:S.s4,x:540,y:1430,w:980,cls:'noshadow',enter:'up',din:.35,float:0,z:50,html:`<div style="display:flex;align-items:center;gap:18px"><img src="a/O08_building_7floor.png" style="width:120px;filter:drop-shadow(0 10px 20px rgba(0,0,0,.5))"><div style="flex:1;display:flex;gap:8px">${[['1-4','0%',0],['5-10','+5%',1],['11-20','+10%',0],['21-30','+15%',0],['31+','+20%',0]].map(([f,p,on])=>`<div style="flex:1;border-radius:14px;padding:12px 6px;text-align:center;background:${on?'linear-gradient(180deg,#f2dfb6,#c9a66f)':'rgba(13,23,41,.7)'};color:${on?'#1a1206':'#fff'};border:2px solid rgba(232,207,159,.4)"><div style="font:600 24px P">${f} मजले</div><div style="font:900 34px/1.1 P">${p}</div></div>`).join('')}</div></div>`});

// ===== S4 STAMP DUTY (37.74-48.70) =====
CROPS('P4_registration_office.jpg',[[S.s4,41.4,1.0,1.06],[41.4,45.0,1.35,1.42,-120,-160,160,200],[45.0,S.s5,1.12,1.18,80,60,-80,-60]],'brightness(.7) saturate(.85)');
HEAD(L(38.56),S.s5,'Stamp duty 6%');
GL(L(39.98),S.s5,540,840,920,`<div style="display:flex;justify-content:space-around;gap:20px"><div><div class="lab">70 लाखावर</div><div class="a" style="font:900 60px/1.1 P">₹4.20 लाख</div></div><div><div class="lab">78 लाखावर</div><div class="b gold" style="font:900 60px/1.1 P">₹4.68 लाख</div></div></div><div style="margin-top:18px;border-top:1px solid rgba(255,255,255,.14);padding-top:14px"><div class="lab">फरक</div><div class="c gold" style="font:900 120px/1.05 P">₹48,000</div></div>`,{dark:true,pad:'26px 30px',float:0,
  draw:(t,lt,oo)=>{NUM('.a',L(40.90),420000,v=>'₹'+(v/100000).toFixed(2)+' लाख',.7)(t,lt,oo);NUM('.b',L(43.24),468000,v=>'₹'+(v/100000).toFixed(2)+' लाख',.7)(t,lt,oo);NUM('.c',L(45.20),48000,v=>'₹'+INR(v),.9)(t,lt,oo)}});
sfx(L(40.90),'ticks',.4);sfx(L(43.24),'ticks',.4);sfx(L(45.20),'ticks',.5);sfx(L(46.12),'impact',.6);punch(L(46.12),.06);
IMG(L(42.34),S.s5,880,1300,300,'O06_rupee_bundle.png',{sfx:null,float:.3});
PILL(L(46.74),S.s5,540,1440,'5% + 1% metro cess · महिला एकट्या: 5% · registration 1%, कमाल ₹30,000','p-glass',{st:'font-size:26px;white-space:normal;line-height:1.3;max-width:900px',float:0});

// ===== S5 INCOME TAX 10% (48.70-64.14) =====
CROPS('P5_buyer_seller_table.jpg',[[S.s5,52.6,1.0,1.06],[52.6,56.5,1.3,1.36,0,0,-160,-200]],'brightness(.75) saturate(.9)');
CROPS('P6_tax_notice.jpg',[[56.5,60.4,1.0,1.06],[60.4,S.s6,1.25,1.3,-60,-80,120,160]],'brightness(.8)');
HEAD(L(50.32),S.s6,'Income tax चा नियम');
GL(L(51.50),S.s6,540,760,920,`<div class="lab">सरकारी किंमत ÷ agreement</div><div style="position:relative;height:150px;margin:6px 0 0"><div style="position:absolute;left:0;right:0;top:60px;height:26px;border-radius:13px;background:linear-gradient(90deg,#3fd47a 0 40%,#ffb020 40% 60%,#e0392b 60%)"></div><div style="position:absolute;left:40%;top:40px;width:4px;height:66px;background:#fff;margin-left:-2px"></div><div style="position:absolute;left:40%;top:0;transform:translateX(-50%);font:700 28px P;color:#fff">100%</div><div style="position:absolute;left:60%;top:110px;transform:translateX(-50%);font:700 28px P;color:#ffb020">+10%</div><img class="nd" src="a/O09_scale_needle.png" style="position:absolute;left:0;top:30px;width:300px;transform:translateX(-200px);filter:drop-shadow(0 6px 10px rgba(0,0,0,.5))"></div><div class="pct gold" style="font:900 96px/1.05 P;visibility:hidden">111%</div><div class="tx" style="font:800 38px/1.3 P;visibility:hidden">10% पेक्षा जास्त → <span class="red">फरकावर tax</span></div>`,{dark:true,pad:'24px 32px',float:0,
  draw:(t,lt,oo)=>{const p=E.inout(clamp((t-L(53.26))/1.2));const bw=oo.el.querySelector('.nd').parentElement.clientWidth;oo.el.querySelector('.nd').style.transform=`translateX(${lerp(bw*.2,bw*.62,p)-300}px)`;oo.el.querySelector('.pct').style.visibility=t>=L(54.10)?'visible':'hidden';oo.el.querySelector('.tx').style.visibility=t>=L(55.28)?'visible':'hidden'}});
sfx(L(53.26),'ticks',.45);sfx(L(55.82),'thud',.6);punch(L(55.82),.05);
PILL(L(56.78),L(62.86),540,1120,'फरक ₹8 लाख','p-gold',{st:'font-size:44px',float:0});
LINE(L(58.20),S.s6,1290,`<div style="display:flex;align-items:center;gap:22px">${IC.person('#e8cf9f',70)}<div style="font:800 40px/1.3 P">विकणारा · कलम 50C<br><span class="gold">capital gain मध्ये +₹8 लाख</span></div></div>`,{w:900,x:540});
LINE(L(60.80),S.s6,1485,`<div style="display:flex;align-items:center;gap:22px">${IC.person('#e8cf9f',70)}<div style="font:800 40px/1.3 P">घेणारा · कलम 56(2)(x)<br><span class="gold">उत्पन्न म्हणून +₹8 लाख</span></div></div>`,{w:900,x:540});
A({t0:L(62.86),t1:S.s6,x:540,y:1120,w:900,cls:'chipw',html:`<span class="stampbox" style="color:#e0392b;background:rgba(255,255,255,.9);font-size:84px;transform:rotate(-6deg);display:inline-block">दोघांना tax!</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.85,z:60,float:0,over:1});
shake(L(62.86)+.05,10);

// ===== S6 e-ASR (64.14-77.94) =====
CROPS('P7_phone_check.jpg',[[S.s6,68.4,1.0,1.06],[68.4,73.0,1.3,1.36,-100,-140,60,80],[73.0,S.s7,1.15,1.2,60,80,-40,-60]],'brightness(.7) saturate(.9)');
HEAD(L(64.78),S.s7,'Agreement आधी हे तपासा');
PILL(L(66.00),S.s7,540,560,'igrmaharashtra.gov.in → e-ASR','p-glass',{st:'font-size:40px',float:0});
A({t0:L(66.00),t1:S.s7,x:540,y:1180,w:560,img:'O07_smartphone.png',enter:'up',din:.5,sfx:null,float:0,z:40,
  html:`<div style="position:absolute;left:38px;right:38px;top:70px;bottom:70px;border-radius:40px;background:#fff;padding:30px 26px;text-align:left;color:#0d1729"><div style="font:800 30px P;color:#777">e-ASR · दर शोधा</div>${[['1','जिल्हा','ठाणे'],['2','तालुका','ठाणे'],['3','गाव','वाशी'],['4','zone','→ दर']].map(([n,k,v])=>`<div class="st" style="display:flex;align-items:center;gap:18px;margin-top:26px;opacity:.25"><div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(180deg,#f2dfb6,#c9a66f);font:900 32px/60px P;text-align:center">${n}</div><div style="font:800 36px P">${k}: <span style="color:#b8935f">${v}</span></div></div>`).join('')}<div class="rs" style="margin-top:34px;border-radius:20px;background:#0d1729;color:#fff;padding:18px;text-align:center;font:900 40px P;visibility:hidden">₹1,03,000 / चौ.मी.</div></div>`,
  draw:(t,lt,oo)=>{const ts=[L(73.28),L(74.12),L(74.78),L(75.96)];oo.el.querySelectorAll('.st').forEach((e,i)=>{e.style.opacity=t>=ts[i]?1:.25});oo.el.querySelector('.rs').style.visibility=t>=L(76.46)?'visible':'hidden'}});
[73.28,74.12,74.78,75.96].forEach(k=>sfx(L(k),'click',.6));sfx(L(76.46),'pop',.5);

// ===== S7 2026-27 + disclaimer (77.94-89.06) =====
CROPS('P2_navi_mumbai_aerial.jpg',[[S.s7,82.4,1.2,1.26,-40,-60,200,180]],'brightness(.8) saturate(.9)');
CROPS('P1_vashi_building.jpg',[[82.4,86.0,1.25,1.3,60,40,80,100],[86.0,S.s8,1.05,1.1]],'brightness(.7) saturate(.85)');
HEAD(L(77.94),S.s8,'2026-27: दर अपरिवर्तित');
GL(L(79.86),L(82.48),540,780,860,`<div style="display:flex;align-items:center;justify-content:center;gap:26px"><img src="a/O03_calendar.png" style="width:140px;filter:drop-shadow(0 10px 20px rgba(0,0,0,.4))"><div><div class="lab">गेल्या वर्षीचेच दर</div><div class="z gold" style="font:900 110px/1.05 P">+0%</div></div></div>`,{dark:true,pad:'24px 32px',float:0,
  draw:(t,lt,oo)=>{oo.el.querySelector('.z').style.visibility=t>=L(80.30)?'visible':'hidden'}});
sfx(L(80.30),'pop',.5);
GL(L(82.48),S.s8,540,800,900,`<div class="lab">* हा अंदाज आहे</div><div style="font:800 44px/1.35 P">मजला · वय · lift<br>यानुसार हिशोब बदलतो</div>`,{dark:true,float:0});
LINE(L(86.66),S.s8,1150,`<div style="font:800 42px/1.35 P">अंतिम आकडा → <span class="gold">sub-registrar office</span></div>`,{w:900,x:540});

// ===== S8 COMMENT (89.06-96.4) =====
CROPS('P8_keys_handover.jpg',[[S.s8,92.6,1.0,1.06],[92.6,S.s9,1.2,1.26,0,0,-120,-160]],'brightness(.8) saturate(.95)');
GL(L(89.06),S.s9,540,520,940,`<div style="font:800 54px/1.35 P;color:#0d1729">तुमच्या node चा<br><span style="color:#b8935f">Ready Reckoner दर किती?</span></div>`,{white:true,pad:'30px 36px',float:0});
COMMENT_BOX(L(90.96),S.s9-.05,91.2,92.10,'वाशी sec 17 · ₹1,03,000',{y:1300,typeDur:.5});
PILL(L(92.88),S.s9,540,780,'📤 घर घेणाऱ्या मित्राला पाठवा','p-gold',{st:'font-size:36px',float:0});
PILL(L(93.94),S.s9,540,1560,'पुढचा video: Index 2 म्हणजे काय?','p-glass',{st:'font-size:34px',float:0});

// ===== S9 OUTRO =====
TXT(L(96.5),END+1,540,420,`<div style="font:800 62px/1.3 P;color:#fff">अशाच <span class="gold">माहितीसाठी</span></div>`,{enter:'down',din:.4,float:0,sfx:null});
A({t0:96.5,t1:END+1,x:540,y:900,w:820,cls:'gl w',html:`<div style="padding:44px 56px 38px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.5,sfx:'whoosh',sfxv:.5,z:50,float:0});
FOLLOW_FLIP(L(97.6),END+1,98.1,{y:1380,col:'#c9a66f'});
}

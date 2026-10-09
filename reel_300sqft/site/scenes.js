// SRS Dwell - "तुमचा flat 200 sq.ft? redevelopment मध्ये 300 sq.ft" (UDCPR 7.6.1). Times = cue_words.json
function buildScenes(){
const END=82.2;
const SEC=[0,5.4,9.5,14.95,26.96,34.3,44.86,51.3,69.4,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.035*E.inout(p)})`});
BOKEH_ON=t=>(t>14.9&&t<34.3)||(t>44.8&&t<51.3)?1:0;
PART({type:'dust',t0:0,t1:END,n:60,seed:5,life:7,color:'#f2dfb6',alpha:.7});

// ---------- transitions ----------
SWEEP(5.4);BARS(9.5);BLINDS(14.95);RINGT(26.96);BARS(34.3,['#b8935f','#faf7f2','#0d1729','#e8cf9f']);SWEEP(44.86);BLINDS(51.3,'#121d33');SWEEP(69.4);
for(const [t,a] of [[0.58,.05],[3.84,.07],[6.86,.05],[8.72,.05],[10.9,.04],[16.78,.04],[22.98,.06],[25.3,.05],[30.0,.04],[33.4,.05],[36.7,.05],[38.08,.04],[43.6,.05],[46.16,.03],[47.7,.03],[56.02,.05],[59.36,.04],[61.22,.04],[67.18,.04],[80.56,.04]])punch(t,a);

// ---------- HUD ----------
A({t0:0,t1:END+1,x:205,y:300,w:170,img:'logo_white.png',cls:'noshadow',enter:'fade',din:.6,float:0,z:600,fn:t=>({o:t>77.2?1-clamp((t-77.2)/.4):1})});
A({t0:0.3,t1:77.2,x:790,y:300,w:340,cls:'chipw',html:`<span class="pill p-glass" style="font:700 26px/1 P;padding:12px 20px 9px">Redevelopment - UDCPR</span>`,enter:'fade',din:.6,float:0,z:600});
TXT(0.5,77.2,540,372,`<div style="font:500 22px/1.4 P;color:rgba(255,255,255,.55)">* UDCPR-2020 नियम 7.6.1 - मुंबई (MCGM) सोडून - अटी लागू</div>`,{enter:'fade',din:.6,float:0,sfx:null,z:600});

// ================= HOOK 0 - 5.4 =================
BG({img:'B02_small_flat.jpg',t0:0,t1:3.95,s0:1.16,s1:1.04,fade:.2,filter:'brightness(.72) saturate(.85)'});
TINT(0,5.4,'linear-gradient(180deg,rgba(6,11,22,.65),rgba(6,11,22,0) 30%,rgba(6,11,22,0) 60%,rgba(6,11,22,.8))',.2);
A({t0:0.1,t1:3.8,x:540,y:520,w:760,cls:'chipw',html:`<div style="font:800 60px/1.2 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">तुमचा flat</div>`,enter:'down',din:.4,sfx:'whoosh',z:50,float:.2});
A({t0:0.58,t1:3.8,x:540,y:700,w:760,cls:'gl dk',html:'',enter:'stamp',din:.35,sfx:'impact',sfxv:.6,z:50,float:.2,
  count:{t0:0.6,t1:1.4,from:0,to:200,fmt:v=>`<div style="padding:18px 20px;text-align:center"><span class="red" style="font:900 150px/1 P">${v}</span><span style="font:800 54px P;color:#fff"> sq.ft</span><div style="font:700 36px/1.2 P;color:rgba(255,255,255,.8)">carpet area</div></div>`}});
sfx(0.6,'ticks',.5);
A({t0:1.0,t1:3.8,x:480,y:1240,w:500,img:'O04_tape.png',enter:'right',din:.6,sfx:'scratch',sfxv:.4,z:45,float:.2,rot:-28});
// new flat wipes up
A({t0:3.6,t1:5.45,x:540,y:960,w:1080,cls:'noshadow',html:`<div class="tw" style="width:1080px;height:1920px;background:url(a/B03_new_flat.jpg) center/cover"></div><div class="ln" style="position:absolute;left:0;right:0;height:10px;background:linear-gradient(90deg,transparent,#f2dfb6,#fff,#f2dfb6,transparent);box-shadow:0 0 40px #e8cf9f"></div>`,enter:'fade',din:.01,exit:'fade',dout:.15,float:0,z:5,
  draw:(t,lt,oo)=>{const p=E.inout(clamp((t-3.62)/.6));const top=(1-p)*100;oo.el.querySelector('.tw').style.clipPath=`inset(${top}% 0 0 0)`;const ln=oo.el.querySelector('.ln');ln.style.top=(top*19.2-5)+'px';ln.style.opacity=p<1?1:0;oo.el.querySelector('.tw').style.transform=`scale(${1.1-.06*clamp((t-3.6)/1.8)})`}});
sfx(3.62,'reveal',.6);
A({t0:3.84,t1:5.4,x:500,y:1180,w:700,cls:'gl dk',html:'',enter:'zoom',din:.35,sfx:'impact',sfxv:.7,z:55,float:.2,shine:[4.5],
  count:{t0:3.86,t1:4.6,from:200,to:300,fmt:v=>`<div style="padding:22px 20px;text-align:center"><span class="gold" style="font:900 170px/1 P">${v}</span><span style="font:800 58px P;color:#fff"> sq.ft</span><div style="font:700 36px/1.2 P;color:rgba(255,255,255,.85)">होऊ शकतो!</div></div>`}});
PART({type:'sparks',t0:4.6,t1:4.8,n:60,seed:3,x:520,y:1180,speed:800,color:'#f2dfb6'});
TXT(3.9,5.4,520,1420,`<div style="font:600 30px/1 P;color:rgba(255,255,255,.75)">* अटी लागू</div>`,{enter:'fade',din:.3,float:0,sfx:null});

// ================= NOT A FAVOUR 5.4 - 9.5 =================
BG({img:'B08_rulebook_desk.jpg',t0:5.4,t1:9.55,s0:1.12,s1:1.02,fade:.3,filter:'brightness(.5)'});
A({t0:5.5,t1:9.5,x:540,y:500,w:860,cls:'chipw',html:`<div style="font:800 60px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">Builder ची <span class="gold">मेहेरबानी?</span></div>`,enter:'down',din:.4,sfx:'whoosh',z:50});
A({t0:6.86,t1:9.5,x:540,y:640,w:500,cls:'chipw',html:`<div class="stampbox" style="color:#ff4a3a;background:rgba(40,0,0,.55);font-size:76px">✕ नाही</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.1,sfxv:.9,z:60,float:0,rot:-6});
A({t0:7.42,t1:9.5,x:500,y:1060,w:400,img:'book.png',enter:'fade',din:.15,z:45,float:.25,shine:[8.2],sfx:'whoosh',
  fn:(t,lt)=>({s:lerp(.25,1,E.back(clamp(lt/.8))),ry:lerp(-75,0,E.out(clamp(lt/.8)))+Math.sin(t*.9)*6})});
A({t0:8.72,t1:9.5,x:500,y:1420,w:760,cls:'chipw',html:`<div class="stampbox" style="color:#e8cf9f;background:rgba(13,23,41,.75);font-size:50px">✓ UDCPR मधली तरतूद</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.1,sfxv:.9,z:60,float:0,rot:-3});

// ================= RULE 9.5 - 14.95 =================
BG({img:'B08_rulebook_desk.jpg',t0:9.5,t1:12.9,s0:1.25,s1:1.4,x0:-60,x1:-120,y0:40,y1:60,fade:.25,filter:'brightness(.42) blur(2px)'});
A({t0:9.56,t1:12.85,x:540,y:820,w:760,cls:'gl dk',html:`<div style="padding:34px 30px;text-align:center"><div class="lab" style="font-size:38px">UDCPR नियम</div><div class="gold" style="font:900 180px/1.05 P">7.6.1</div><div class="hl" style="height:10px;width:0;margin:6px auto 0;border-radius:5px;background:#f7e463;box-shadow:0 0 18px #f7e463"></div></div>`,enter:'zoom',din:.45,sfx:'impact',sfxd:.0,sfxv:.5,z:50,float:.2,shine:[11.4],
  draw:(t,lt,oo)=>{oo.el.querySelector('.hl').style.width=(E.out(clamp((t-11.0)/.6))*70)+'%'}});
sfx(11.0,'pen',.4);
BG({img:'B01_old_society.jpg',t0:12.86,t1:15.0,s0:1.04,s1:1.16,fade:.3,filter:'brightness(.6)'});
TINT(12.86,14.95,'linear-gradient(180deg,rgba(6,11,22,.7),rgba(6,11,22,.05) 40%,rgba(6,11,22,.2) 60%,rgba(6,11,22,.85))',.3);
TXT(12.86,14.95,500,1320,`<div style="font:800 62px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">जुन्या इमारतीचा</div><div class="gold" style="font:900 80px/1.2 P">Redevelopment</div>`,{enter:'up',din:.4});

// ================= FLOOR PLAN 14.95 - 26.96 =================
TXT(15.0,26.96,540,480,`<div class="lab" style="font-size:38px">राहत्या घराचा</div><div style="font:800 66px/1.2 P;color:#fff">Carpet area</div>`,{enter:'down',din:.4});
{const H0=560,W300=640,W200=Math.round(W300*200/300);
 A({t0:14.98,t1:26.96,x:520,y:930,w:760,cls:'noshadow',enter:'fade',din:.2,float:0,z:40,sfx:'pen',sfxv:.5,
  html:`<svg viewBox="0 0 900 760" width="760" style="overflow:visible"><defs><pattern id="hatch" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="18" stroke="rgba(232,207,159,.35)" stroke-width="6"/></pattern></defs>
   <rect class="tg" x="${450-W300/2}" y="${380-H0/2}" width="${W300}" height="${H0}" fill="none" stroke="#3fd47a" stroke-width="6" stroke-dasharray="22 14" opacity="0" rx="6"/>
   <g class="pl"><rect class="fl" y="${380-H0/2}" height="${H0}" fill="url(#hatch)" opacity="0"/>
    <rect class="ow" y="${380-H0/2}" height="${H0}" fill="none" stroke="#f2dfb6" stroke-width="16" rx="4" style="filter:drop-shadow(0 0 10px #e8cf9f)"/>
    <line class="kp" y1="${380-H0/2}" y2="${380+H0/2-170}" stroke="#f2dfb6" stroke-width="10"/>
    <rect class="wc" y="${380-H0/2}" width="150" height="150" fill="none" stroke="#f2dfb6" stroke-width="10"/>
    <text class="t1" y="${400}" text-anchor="middle" font-family="P" font-weight="800" font-size="40" fill="#fff">रूम</text>
    <text class="t2" y="${320}" text-anchor="middle" font-family="P" font-weight="800" font-size="34" fill="#fff">किचन</text>
    <text class="t3" y="${190}" text-anchor="middle" font-family="P" font-weight="800" font-size="30" fill="#fff">WC</text></g></svg>`,
  draw:(t,lt,oo)=>{
    const w=KF(t,[[14.98,W200],[22.98,W200],[24.4,W300]],'inout');const x=450-w/2;const q=oo.el.querySelector.bind(oo.el);
    for(const c of ['.fl','.ow']){q(c).setAttribute('x',x);q(c).setAttribute('width',w)}
    const ow=q('.ow');if(!oo.L)oo.L=2*(W300+H0);ow.style.strokeDasharray=oo.L;ow.style.strokeDashoffset=oo.L*(1-E.inout(clamp(lt/.9)));
    const kx=x+w*.68;q('.kp').setAttribute('x1',kx);q('.kp').setAttribute('x2',kx);q('.kp').style.opacity=clamp((t-15.6)/.3);
    q('.wc').setAttribute('x',x);q('.wc').style.opacity=clamp((t-15.7)/.3);
    q('.t1').setAttribute('x',x+w*.34);q('.t2').setAttribute('x',kx+w*.16);q('.t3').setAttribute('x',x+75);['.t1','.t2','.t3'].forEach(c=>q(c).style.opacity=clamp((t-15.9)/.3));
    q('.fl').style.opacity=clamp((t-16.06)/.4);
    q('.tg').style.opacity=clamp((t-16.78)/.3)*(t>24.4?1-clamp((t-24.4)/.3):1);q('.tg').style.strokeDashoffset=-t*30;
    q('.ow').style.stroke=t>22.98?'#3fd47a':(t>21.52&&t<22.98?'#ff7a6b':'#f2dfb6')}});
 // labels
 A({t0:16.78,t1:21.5,x:500,y:1400,w:700,cls:'gl dk',html:`<div style="padding:22px 26px;text-align:center"><span style="color:#3fd47a;font:900 64px/1 P">27.87 sq.m</span><div style="font:800 42px/1.3 P;color:#fff">≈ 300 sq.ft <span style="font-weight:600;color:rgba(255,255,255,.7);font-size:34px">(हिरवी रेषा)</span></div></div>`,enter:'up',din:.4,sfx:'swoosh',z:50,float:.15});
 A({t0:21.52,t1:22.98,x:520,y:1400,w:760,cls:'chipw',html:`<span class="pill p-red" style="font-size:42px">तुमचं घर यापेक्षा लहान?</span>`,enter:'pop',din:.3,sfx:'buzz',sfxv:.4,z:55,float:0});
 A({t0:22.98,t1:26.96,x:500,y:1400,w:700,cls:'gl dk',html:'',enter:'up',din:.35,sfx:'whoosh',z:50,float:.15,
  count:{t0:22.98,t1:24.4,from:200,to:300,fmt:v=>`<div style="padding:22px 26px;text-align:center"><div class="lab">किमान carpet area</div><span class="gold" style="font:900 120px/1 P">${v}</span><span style="font:800 50px P;color:#fff"> sq.ft</span></div>`}});
 sfx(22.98,'riser',.4);sfx(24.4,'ding',.6);
 A({t0:25.3,t1:26.96,x:720,y:650,w:400,cls:'chipw',html:`<div class="stampbox" style="color:#3fd47a;background:rgba(6,30,16,.6);font-size:56px">✓ तरतूद</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.1,sfxv:.8,z:60,float:0,rot:-8});
 PART({type:'sparks',t0:24.45,t1:24.7,n:70,seed:9,x:520,y:930,speed:800,color:'#3fd47a'});
}

// ================= DIFFERENCE FREE 26.96 - 34.3 =================
TXT(27.0,34.3,540,480,`<div style="font:800 60px/1.25 P;color:#fff">महत्त्वाचं म्हणजे</div>`,{enter:'down',din:.4});
{const base=1380,sc=3.2; // bar chart: old vs new
 A({t0:28.04,t1:34.3,x:500,y:930,w:900,cls:'noshadow',enter:'fade',din:.2,float:0,z:40,fn:()=>({s:.8}),
  html:`<div style="position:relative;width:900px;height:900px">
   <div class="b1" style="position:absolute;left:150px;bottom:180px;width:220px;height:0;border-radius:18px 18px 0 0;background:linear-gradient(180deg,#9aa6bd,#5b6780)"></div>
   <div class="b2" style="position:absolute;left:530px;bottom:180px;width:220px;height:0;border-radius:18px 18px 0 0;background:linear-gradient(180deg,#f2dfb6,#b8935f);box-shadow:0 0 40px rgba(232,207,159,.5)"></div>
   <div class="df" style="position:absolute;left:530px;bottom:${180+200*sc*.8}px;width:220px;height:0;border:5px dashed #3fd47a;border-radius:18px 18px 0 0;opacity:0"></div>
   <div style="position:absolute;left:150px;width:220px;bottom:110px;text-align:center;font:800 40px P;color:#fff">जुनं<br><span style="font-size:34px;color:rgba(255,255,255,.75)">200 sq.ft</span></div>
   <div style="position:absolute;left:530px;width:220px;bottom:110px;text-align:center;font:800 40px P;color:#f2dfb6">नवं<br><span style="font-size:34px">300 sq.ft</span></div>
   <div class="lb" style="position:absolute;left:770px;bottom:${180+200*sc*.8+20}px;font:900 54px/1 P;color:#3fd47a;opacity:0;white-space:nowrap">+100<div style="font:800 30px/1.3 P">फरक</div></div></div>`,
  draw:(t,lt,oo)=>{const q=oo.el.querySelector.bind(oo.el);const k=.8*sc;
    q('.b1').style.height=(200*k*E.out(clamp((t-28.04)/.6)))+'px';q('.b2').style.height=(200*k*E.out(clamp((t-29.0)/.6)))+'px';
    const d=E.out(clamp((t-30.0)/.5));q('.df').style.height=(100*k*d)+'px';q('.df').style.opacity=d;q('.lb').style.opacity=clamp((t-30.2)/.3)}});
 sfx(28.04,'swoosh',.5);sfx(29.0,'swoosh',.5);sfx(30.0,'pop',.6);
 PILL(30.4,34.3,500,1300,'= Additional FSI','p-glass',{st:'font-size:52px'});
 A({t0:32.74,t1:34.3,x:500,y:1430,w:760,cls:'chipw',html:`<div class="stampbox" style="color:#3fd47a;background:rgba(6,30,16,.6);font-size:54px">Premium ₹0 ✓</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.1,sfxv:.9,z:60,float:0,rot:-4});
 PART({type:'sparks',t0:33.4,t1:33.6,n:50,seed:14,x:500,y:1430,speed:700,color:'#3fd47a'});
}

// ================= CONDITIONS 34.3 - 51.3 =================
A({t0:34.32,t1:37.46,x:520,y:880,w:760,cls:'chipw',html:`<div style="font:900 110px/1 P;color:#ffb020">⚠</div><div style="font:800 46px/1.3 P;color:#fff;margin-top:20px">पण हे प्रत्येक redevelopment ला</div><div class="red" style="font:900 70px/1.2 P">आपोआप लागू नाही!</div>`,enter:'zoom',din:.4,sfx:'alert',sfxv:.6,z:50,float:.2});
shake(36.7,10);
BG({img:'B01_old_society.jpg',t0:37.46,t1:44.9,s0:1.05,s1:1.2,y0:20,y1:-30,fade:.3,filter:'brightness(.55)'});
TINT(37.46,44.86,'linear-gradient(180deg,rgba(6,11,22,.75),rgba(6,11,22,.1) 40%,rgba(6,11,22,.25) 60%,rgba(6,11,22,.9))',.3);
PILL(37.5,44.86,540,460,'अट 1','p-gold',{st:'font-size:46px'});
A({t0:37.46,t1:44.86,x:540,y:660,w:760,cls:'gl dk',html:'',enter:'up',din:.4,sfx:'whoosh',z:50,float:.2,
  count:{t0:38.08,t1:38.9,from:0,to:30,fmt:v=>`<div style="padding:24px 26px;text-align:center;display:flex;align-items:center;justify-content:center;gap:24px">${IC.cal(110)}<div style="text-align:left"><span class="gold" style="font:900 120px/1 P">${v}+</span><div style="font:800 46px/1.2 P;color:#fff">वर्षं जुनी इमारत</div></div></div>`}});
sfx(38.08,'ticks',.5);
PILL(39.94,44.86,520,900,'किंवा','p-glass',{st:'font-size:44px'});
A({t0:41.3,t1:44.86,x:500,y:1180,w:760,cls:'chipw',html:`<div class="stampbox" style="color:#ff4a3a;background:rgba(40,0,0,.6);font-size:48px;line-height:1.25">धोकादायक / मोडकळीस<br>म्हणून जाहीर</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.1,sfxv:.9,z:60,float:0,rot:-5});
shake(41.45,10);
PILL(44.9,51.3,540,460,'अट 2','p-gold',{st:'font-size:46px'});
GL(46.16,51.3,540,670,760,`<div style="display:flex;align-items:center;gap:24px;text-align:left"><div style="flex:none;width:200px;height:180px;border-radius:22px;overflow:hidden"><img src="a/B03_new_flat.jpg" style="width:100%;height:100%;object-fit:cover;filter:none"></div><div><div style="font:800 54px/1.25 P">राहतं घर</div><div style="font:900 64px/1.2 P;color:#3fd47a">✓ लागू</div></div></div>`,{enter:'left',din:.45,pad:'22px 26px'});
GL(47.7,51.3,490,980,700,`<div style="display:flex;align-items:center;gap:24px;text-align:left"><div style="flex:none;width:200px;height:180px;border-radius:22px;overflow:hidden"><img src="a/B05_shop.jpg" style="width:100%;height:100%;object-fit:cover;filter:none"></div><div><div style="font:800 42px/1.25 P">दुकान / commercial</div><div style="font:900 46px/1.25 P;color:#ffb020">वेगळ्या तरतुदी</div></div></div>`,{enter:'right',din:.45,pad:'22px 26px',dark:true});
GL(49.0,51.3,490,1290,700,`<div style="display:flex;align-items:center;gap:24px;text-align:left"><div style="flex:none;width:150px;height:150px;border-radius:18px;overflow:hidden"><img src="a/O06_agreement.jpg" style="width:100%;height:100%;object-fit:cover;filter:none"></div><div style="font:700 32px/1.45 P">+ सध्याचे सभासद परत येतात<br>+ किमान 51% सभासदांचा लेखी करार</div></div>`,{enter:'up',din:.4,pad:'20px 24px',sfx:'swoosh',sfxv:.4});

// ================= INCENTIVE 51.3 - 69.4 =================
BG({img:'B07_tower_dusk.jpg',t0:51.3,t1:69.45,s0:1.3,s1:1.0,y0:120,y1:0,fade:.3,filter:'brightness(.55)'});
TINT(51.3,69.4,'linear-gradient(180deg,rgba(6,11,22,.8),rgba(6,11,22,.15) 40%,rgba(6,11,22,.3) 60%,rgba(6,11,22,.9))',.3);
TXT(51.32,62.7,540,480,`<div class="lab" style="font-size:38px">आणि अजून एक गोष्ट</div><div style="font:800 64px/1.2 P;color:#fff">Incentive <span class="gold">FSI</span></div>`,{enter:'down',din:.4});
{const fl=10; // building blocks: base floors + incentive floors
 A({t0:54.2,t1:62.7,x:280,y:1000,w:340,cls:'noshadow',enter:'fade',din:.3,float:0,z:40,
  html:`<div style="position:relative;width:340px;height:900px">${Array.from({length:fl},(_,i)=>`<div class="f f${i}" style="position:absolute;left:40px;width:260px;height:62px;bottom:${i*70}px;border-radius:8px;background:${i<7?'linear-gradient(180deg,#9aa6bd,#5b6780)':'linear-gradient(180deg,#f2dfb6,#b8935f)'};box-shadow:${i<7?'none':'0 0 24px rgba(232,207,159,.6)'};opacity:0"></div>`).join('')}<div class="pt" style="position:absolute;left:40px;width:260px;bottom:${7*70-30}px;text-align:center;font:900 48px P;color:#f2dfb6;opacity:0">+30%</div></div>`,
  draw:(t,lt,oo)=>{for(let i=0;i<fl;i++){const t0=i<7?54.3+i*.08:56.02+(i-7)*.2;const p=clamp((t-t0)/.3);const f=oo.el.querySelector('.f'+i);f.style.opacity=p;f.style.transform=`translateY(${(1-E.out(p))*-60}px)`}
    oo.el.querySelector('.pt').style.opacity=0}});
 sfx(56.02,'thud',.5);sfx(56.22,'thud',.5);sfx(56.42,'thud',.5);
 GL(54.22,62.7,690,690,440,`<div style="font:700 36px/1.3 P;text-align:left">सध्याच्या बांधीव क्षेत्राच्या</div><div class="gold" style="font:900 120px/1.05 P;text-align:left">30%</div>`,{enter:'right',din:.4,pad:'24px 30px'});
 PILL(57.72,62.7,660,920,'किंवा','p-glass',{w:400,st:'font-size:40px'});
 GL(59.36,62.7,660,1130,400,`<div style="font:700 36px/1.3 P;text-align:left">प्रत्येक flat मागे</div><div class="gold" style="font:900 76px/1.05 P;text-align:left;white-space:nowrap">15 sq.m</div>`,{enter:'right',din:.4,pad:'24px 30px'});
 A({t0:61.22,t1:62.7,x:500,y:1420,w:760,cls:'chipw',html:`<div class="stampbox" style="color:#3fd47a;background:rgba(6,30,16,.6);font-size:52px">जे जास्त, ते ✓</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.1,sfxv:.9,z:60,float:0,rot:-4});
}
A({t0:62.8,t1:69.4,x:540,y:520,w:860,cls:'chipw',html:`<div style="font:800 60px/1.3 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">फक्त तुमचा flat नाही...</div>`,enter:'down',din:.4,sfx:'whoosh',z:50});
A({t0:62.9,t1:66.3,x:520,y:1020,w:340,cls:'gl',html:`<div style="padding:16px"><img src="a/B03_new_flat.jpg" style="width:100%;height:440px;object-fit:cover;border-radius:18px;filter:none"></div>`,enter:'pop',din:.4,z:45,float:.2,exit:'zoom',dout:.4,fn:t=>({s:1-.5*E.in3(clamp((t-65.6)/.7))})});
A({t0:66.32,t1:69.4,x:520,y:1250,w:760,cls:'chipw',html:`<div style="font:800 52px/1.3 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">संपूर्ण <span class="gold">project ची क्षमता</span></div><div style="font:700 44px/1.4 P;color:rgba(255,255,255,.85)">महत्त्वाची ठरते</div>`,enter:'zoom',din:.45,sfx:'reveal',sfxv:.5,z:50});
TINT(66.3,69.4,'radial-gradient(ellipse at 50% 40%,rgba(232,207,159,.18),rgba(0,0,0,0) 60%)',.3);

// ================= SHARE + OUTRO 69.4 - END =================
BG({img:'B02b_small_flat.jpg',t0:69.4,t1:77.3,s0:1.15,s1:1.03,fade:.3,filter:'brightness(.45) saturate(.8)'});
TXT(69.42,76.9,540,500,`<div style="font:800 58px/1.3 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">तुमच्या सोसायटीत<br><span class="gold">छोटे flats</span> आहेत?</div>`,{enter:'down',din:.4});
[['200',70.38,300],['250',71.2,540],['280',72.34,780]].forEach(([v,t0,x])=>A({t0,t1:76.9,x,y:800,w:220,cls:'chipw',html:`<div style="width:200px;height:200px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff7e6,#e8cf9f 45%,#b8935f);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#1a1206;box-shadow:0 20px 40px rgba(0,0,0,.5)"><div style="font:900 80px/1 P">${v}</div><div style="font:800 30px/1.2 P">sq.ft</div></div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:50,float:.4}));
GL(74.56,76.9,490,1200,700,`<div style="display:flex;align-items:center;gap:30px">${IC.share(120)}<div style="text-align:left"><div style="font:700 44px/1.3 P">हा video त्या सभासदांना</div><div class="gold" style="font:900 60px/1.2 P">नक्की पाठवा</div></div></div>`,{enter:'up',pad:'30px 40px',dark:true,shine:[75.6]});
BG({img:'B07_tower_dusk.jpg',t0:76.9,t1:END+1,s0:1.2,s1:1.05,fade:.3,filter:'brightness(.6)'});
TINT(76.9,END+1,'linear-gradient(180deg,rgba(6,11,22,.8),rgba(6,11,22,.15) 35%,rgba(6,11,22,.25) 60%,rgba(6,11,22,.9))',.3);
TXT(76.92,END+1,540,500,`<div style="font:800 56px/1.3 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">अशाच practical<br><span class="gold">Real Estate</span> माहितीसाठी</div>`,{enter:'down',din:.45});
A({t0:77.3,t1:END+1,x:540,y:960,w:660,cls:'gl w',html:`<div style="padding:50px 60px 44px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'reveal',sfxv:.6,z:50,float:.15,shine:[78.3,81.2]});
PART({type:'sparks',t0:77.5,t1:77.8,n:60,seed:44,x:540,y:960,speed:800,color:'#f2dfb6'});
A({t0:79.22,t1:END+1,x:500,y:1360,w:760,cls:'chipw',html:`<span class="pill p-gold" style="font-size:44px;padding:24px 44px 18px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.45,sfx:'pop',sfxv:.8,z:54,float:0,
  fn:t=>({s:(t>80.5&&t<80.7?.93:1)*(1+Math.max(0,Math.sin((t-80.8)*5))*.04*(t>80.8?1:0))})});
A({t0:79.8,t1:END+1,x:760,y:1450,w:110,cls:'noshadow',html:`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`,enter:'up',din:.4,z:56,float:0,fn:t=>({s:t>80.5&&t<80.7?.85:1})});
sfx(80.56,'click',.9);PART({type:'confetti',t0:80.6,t1:80.95,n:110,seed:41,x:540,y:-40,burst:1,life:3,colors:['#f2dfb6','#ffffff','#c9a66f','#1b2a45']});
}
// Instagram safe-area guide (only in index_safe.html) - official 1080x1920 template: top 220, bottom 420, safe 1010x1280; right buttons notch; + real phone side crop ~100 px
if(window.SAFE_GUIDE){const g=document.createElement('div');g.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:9999';
 g.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:220px;background:rgba(255,0,0,.2);border-bottom:3px solid #ff4040"></div>
 <div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:rgba(255,0,0,.2);border-top:3px solid #ff4040"></div>
 <div style="position:absolute;left:0;top:220px;bottom:420px;width:35px;background:rgba(255,0,0,.2)"></div><div style="position:absolute;right:0;top:220px;bottom:420px;width:35px;background:rgba(255,0,0,.2)"></div>
 <div style="position:absolute;left:100px;top:0;bottom:0;border-left:3px dashed #ffd400"></div><div style="position:absolute;right:100px;top:0;bottom:0;border-left:3px dashed #ffd400"></div>
 <div style="position:absolute;left:890px;right:35px;top:860px;bottom:420px;background:rgba(255,140,0,.3);border-left:3px solid #ff9900"></div>`;
 document.getElementById('root').appendChild(g)}

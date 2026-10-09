// SRS Dwell - Redevelopment चे 7 नवे नियम (GR 30.09.2026). Times = words.json
function buildScenes(){
const END=77.0;
const SEC=[0,6.75,13.6,22.75,29.3,35.25,41.6,47.45,56.15,63.55,66.65,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.035*E.inout(p)})`});
BOKEH_ON=t=>(t<6.6||(t>13.5&&t<22.75)||(t>35.2&&t<41.6)||t>54.0&&t<56.15||t>66.6)?0:1;

// ---------- transitions ----------
SWEEP(6.75);BARS(13.6);RINGT(22.75);BLINDS(29.3);SWEEP(35.25);BARS(41.6,['#b8935f','#faf7f2','#0d1729','#e8cf9f']);RINGT(47.45);BLINDS(56.15,'#121d33');
flash(63.55,.6,'#ff5a4a');sfx(63.5,'boom',.6);shake(63.6,10);SWEEP(66.65);
for(const [t,a] of [[2.9,.06],[9.88,.05],[15.35,.05],[26.4,.05],[28.43,.05],[32.09,.04],[32.61,.05],[38.37,.04],[40.32,.05],[42.92,.05],[45.81,.05],[51.02,.04],[52.3,.04],[54.38,.05],[55.67,.06],[60.02,.04],[61.85,.04],[75.6,.04]])punch(t,a);

// ---------- HUD ----------
A({t0:0,t1:66.6,x:128,y:108,w:190,img:'logo_white.png',cls:'noshadow',enter:'fade',din:.6,float:0,z:600});
A({t0:13.6,t1:66.6,x:680,y:104,w:660,cls:'noshadow',enter:'fade',din:.5,float:0,z:600,
  html:`<div style="display:flex;gap:12px">${[1,2,3,4,5,6,7].map(i=>`<div class="sg" style="flex:1;height:14px;border-radius:7px;background:rgba(255,255,255,.18);overflow:hidden"><div style="height:100%;width:0;background:linear-gradient(90deg,#f2dfb6,#c9a66f);box-shadow:0 0 12px #e8cf9f"></div></div>`).join('')}</div>`,
  draw:(t,lt,oo)=>{const st=[13.6,22.75,29.3,35.25,41.6,47.45,56.15,63.55];oo.el.querySelectorAll('.sg>div').forEach((d,i)=>{d.style.width=(clamp((t-st[i])/(st[i+1]-st[i]))*100)+'%'})}});
function RULE(n,t0,t1,title,tt,o={}){
  A({t0,t1,x:540,y:250,w:1040,cls:'chipw',html:`<span class="pill p-gold" style="font:900 48px/1 P;padding:20px 46px 14px">नियम ${n}</span>`,enter:'down',din:.4,sfx:'pop',sfxv:.7,z:500,float:.1});
  if(title)TXT(tt,o.tt1||t1,540,o.y||395,`<div style="font:800 ${o.fs||64}px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">${title}</div>`,{z:500});
}

// ================= HOOK 0 - 6.75 =================
BG({img:'B01_old_building.jpg',t0:0,t1:4.45,s0:1.16,s1:1.02,y0:-30,y1:20,fade:.2,filter:'brightness(.8) saturate(.85)'});
TINT(0,4.4,'linear-gradient(180deg,rgba(6,11,22,.75),rgba(6,11,22,0) 35%,rgba(6,11,22,0) 60%,rgba(6,11,22,.85))',.2);
TXT(0.05,2.1,540,420,`<div style="font:800 76px/1.2 P;color:#fff;text-shadow:0 10px 30px rgba(0,0,0,.8)">तुमच्या सोसायटीचा</div><div class="gold" style="font:900 104px/1.15 P">Redevelopment</div><div style="font:800 76px/1.2 P;color:#fff;text-shadow:0 10px 30px rgba(0,0,0,.8)">होणार आहे?</div>`,{enter:'zoom',din:.45,exit:'up',dout:.3,sfx:'impact',sfxv:.6});
// tower rises up over the old building
A({t0:2.1,t1:4.45,x:540,y:960,w:1080,cls:'noshadow',html:`<div class="tw" style="width:1080px;height:1920px;background:url(a/B02_tower.jpg) center/cover"></div><div class="ln" style="position:absolute;left:0;right:0;height:10px;background:linear-gradient(90deg,transparent,#f2dfb6,#fff,#f2dfb6,transparent);box-shadow:0 0 40px #e8cf9f"></div>`,enter:'fade',din:.01,exit:'fade',dout:.15,float:0,z:5,
  draw:(t,lt,oo)=>{const p=E.inout(clamp((t-2.14)/.75));const top=(1-p)*100;oo.el.querySelector('.tw').style.clipPath=`inset(${top}% 0 0 0)`;const ln=oo.el.querySelector('.ln');ln.style.top=(top*19.2-5)+'px';ln.style.opacity=p<1?1:0;
    oo.el.querySelector('.tw').style.transform=`scale(${1.12-.06*clamp((t-2.1)/2.3)})`}});
sfx(2.14,'riser',.35);sfx(2.85,'reveal',.5);
A({t0:2.9,t1:4.4,x:540,y:1180,w:900,cls:'gl dk',html:`<div style="padding:30px 20px 34px;text-align:center"><div class="gold" style="font:900 260px/1 P">7</div><div style="font:800 80px/1.2 P;color:#fff">नवे नियम</div></div>`,enter:'stamp',din:.35,sfx:'impact',sfxd:.1,sfxv:.7,z:50,float:.2,shine:[3.4],exit:'zoom',dout:.25});
PART({type:'sparks',t0:3.0,t1:3.2,n:50,seed:3,x:540,y:1180,speed:700,color:'#f2dfb6'});
// warning
BG({img:'B01_old_building.jpg',t0:4.4,t1:6.8,s0:1.25,s1:1.35,fade:.15,filter:'grayscale(.7) brightness(.45) contrast(1.1)'});
TINT(4.45,6.75,'radial-gradient(ellipse at 50% 50%,rgba(120,10,0,.25),rgba(60,0,0,.75))',.15);
TXT(4.45,6.75,540,760,`<div style="font:800 64px/1.25 P;color:#fff">नाहीतर</div><div style="font:900 96px/1.2 P;color:#fff;text-shadow:0 10px 30px rgba(0,0,0,.8)">तुमच्या घराचा</div><div style="font:900 120px/1.15 P" class="gold">निर्णय</div>`,{enter:'up',din:.4,sfx:'whoosh'});
A({t0:5.92,t1:6.75,x:540,y:1250,w:1000,cls:'chipw',html:`<div class="stampbox" style="color:#ff5a4a;font-size:92px;background:rgba(0,0,0,.35)">दुसरेच घेतील!</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.15,sfxv:.9,z:60,float:0,rot:-6});
shake(6.1,14);

// ================= GR 6.75 - 13.6 =================
GL(6.93,13.6,540,380,880,`<div class="lab">शासन निर्णय (GR)</div><div style="font:800 82px/1.25 P;color:#fff"><span style="display:inline-block;vertical-align:-14px;margin-right:16px">${IC.cal(84)}</span>30 सप्टेंबर <span class="gold">2026</span></div>`,{enter:'down',sfx:'whoosh',pad:'24px 30px',shine:[8.0]});
PILL(8.62,13.6,540,610,'सहकार विभाग, महाराष्ट्र शासन','p-glass',{st:'font-size:42px'});
IMG(6.85,13.6,540,1090,620,'O05_file.png',{enter:'drop',din:.9,sfx:'thud',sfxd:.55,sfxv:.8,float:.3,
  fn:t=>({s:1-.12*E.inout(clamp((t-10.8)/.5)),dy:-60*E.inout(clamp((t-10.8)/.5))})});
A({t0:9.88,t1:13.6,x:640,y:1010,w:520,cls:'chipw',html:`<div class="stampbox" style="color:#e8cf9f;background:rgba(13,23,41,.55);font-size:84px">नवा GR</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.12,sfxv:.9,z:50,float:0,rot:-9,
  fn:t=>({dy:-60*E.inout(clamp((t-10.8)/.5))})});
A({t0:10.87,t1:13.6,x:280,y:1600,w:440,cls:'gl dk',html:`<div style="padding:22px 10px;position:relative;text-align:center"><div style="font:900 84px/1 P;color:#fff">2019</div><div style="font:700 36px/1.4 P;color:rgba(255,255,255,.75)">जुने नियम</div><div class="st" style="position:absolute;left:8%;top:50%;height:12px;width:0;background:#ff5a4a;border-radius:6px;transform:rotate(-12deg);box-shadow:0 0 18px #ff5a4a"></div></div>`,
  enter:'left',din:.45,sfx:'whoosh',z:45,float:.2,draw:(t,lt,oo)=>{oo.el.querySelector('.st').style.width=(E.out(clamp((t-13.2)/.25))*84)+'%'},fn:t=>({o:1-.45*clamp((t-13.3)/.3)})});
sfx(13.2,'scratch',.7);
A({t0:13.25,t1:13.6,x:790,y:1600,w:440,cls:'gl',html:`<div style="padding:22px 10px;text-align:center"><div class="gold" style="font:900 84px/1 P">2026</div><div style="font:700 36px/1.4 P">नवे नियम</div></div>`,enter:'right',din:.2,sfx:'pop',z:45,float:0});
TXT(7.3,13.6,540,1830,`<div style="font:500 26px/1.4 P;color:rgba(255,255,255,.55)">स्रोत: सहकार विभाग GR दि. 30.09.2026 - महाराष्ट्र सहकारी संस्था अधिनियम, कलम 79 (अ)</div>`,{enter:'fade',din:.6,float:0,sfx:null});

// ================= RULE 1 13.6 - 22.0 : 51% physical =================
BG({img:'B03_meeting.jpg',t0:13.6,t1:22.75,s0:1.04,s1:1.16,y0:0,y1:-40,fade:.3,filter:'brightness(.42) saturate(.9)'});
TINT(13.6,22.75,'linear-gradient(180deg,rgba(6,11,22,.8),rgba(6,11,22,.15) 30%,rgba(6,11,22,.25) 70%,rgba(6,11,22,.9))',.3);
RULE(1,13.82,22.75,'सभेत किमान <span class="gold">51%</span> सभासद<br>प्रत्यक्ष हजर',14.71,{tt1:18.3});
A({t0:14.85,t1:22.75,x:540,y:1040,w:780,cls:'gl dk',enter:'zoom',din:.45,sfx:'whoosh',z:40,float:.15,
  moves:[{t:18.3,x:540,y:620,s:.6,dur:.6}],
  html:`<div style="padding:34px 30px 26px"><div style="display:grid;grid-template-columns:repeat(10,1fr);gap:16px;padding:0 10px">${Array.from({length:100},(_,i)=>`<div class="dt" style="aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.16)"></div>`).join('')}</div>
   <div style="margin-top:26px;font:800 58px/1.2 P;color:#fff"><span class="gold cn" style="font-size:96px">0</span> / 100 <span style="font-size:42px;color:rgba(255,255,255,.7)">सभासद</span></div></div>`,
  draw:(t,lt,oo)=>{const n=Math.round(51*E.out(clamp((t-15.35)/.9)));if(oo.ln!==n){oo.ln=n;oo.el.querySelectorAll('.dt').forEach((d,i)=>{d.style.background=i<n?'radial-gradient(circle at 35% 30%,#fff7e6,#e8cf9f 45%,#b8935f)':'rgba(255,255,255,.16)';d.style.boxShadow=i<n?'0 0 12px rgba(232,207,159,.7)':'none'});oo.el.querySelector('.cn').textContent=n}}});
sfx(15.35,'ticks',.6);sfx(16.3,'ding',.6);
PILL(17.1,18.3,540,1640,'प्रत्यक्ष हजर ✓','p-gold',{st:'font-size:48px'});
IMG(18.39,22.75,540,1230,780,'O06_laptop.png',{enter:'right',din:.55,float:.25});
A({t0:21.0,t1:22.75,x:540,y:925,w:600,cls:'chipw',html:`<span class="pill p-red rec" style="font-size:36px;padding:14px 28px 10px">● LIVE &nbsp;Video Call</span>`,enter:'pop',din:.35,sfx:'pop',z:52,float:0,
  draw:(t,lt,oo)=>{oo.el.querySelector('.rec').style.opacity=.75+.25*Math.sin(t*8)}});
A({t0:22.3,t1:22.75,x:900,y:1000,w:130,html:IC.check,cls:'noshadow',enter:'stamp',din:.3,sfx:'ding',sfxv:.7,z:55,float:0});
[['परदेशात',18.39,215],['आजारी',19.3,540],['दिव्यांग',20.1,865]].forEach(([s,t0,x])=>PILL(t0,22.75,x,1700,s,'p-glass',{w:330,st:'font-size:44px'}));

// ================= RULE 2 22.0 - 29.3 : committee only =================
RULE(2,22.97,29.3,'<span style="font-size:44px;color:rgba(255,255,255,.75)">Redevelopment ची प्रक्रिया</span><br>कोण सुरू करू शकतं?',23.86,{fs:66,y:420});
GL(24.5,29.3,540,860,900,`<div style="display:flex;align-items:center;gap:30px"><div style="display:flex;gap:6px">${IC.person('#e8cf9f',80)}${IC.person('#f2dfb6',96)}${IC.person('#e8cf9f',80)}</div><div style="text-align:left"><div style="font:800 52px/1.25 P">निवडून आलेली</div><div class="gold" style="font:900 62px/1.15 P">व्यवस्थापन समिती</div></div></div>`,{enter:'left',pad:'34px 40px'});
A({t0:26.4,t1:29.3,x:830,y:1010,w:440,cls:'chipw',html:`<div class="stampbox" style="color:#3fd47a;background:rgba(6,30,16,.55);font-size:54px">✓ अधिकार</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.12,sfxv:.8,z:55,float:0,rot:-8});
GL(27.65,29.3,540,1360,900,`<div style="display:flex;align-items:center;gap:30px">${IC.officer(130)}<div style="text-align:left"><div style="font:800 56px/1.25 P">प्रशासक /</div><div style="font:700 44px/1.3 P;color:rgba(255,255,255,.8)">प्राधिकृत अधिकारी</div></div></div>`,{enter:'right',pad:'34px 40px',dark:true});
A({t0:28.43,t1:29.3,x:820,y:1500,w:480,cls:'chipw',html:`<div class="stampbox" style="color:#ff5a4a;background:rgba(40,0,0,.5);font-size:54px">✕ अधिकार नाही</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.12,sfxv:.8,z:55,float:0,rot:-8});
IMG(26.0,29.3,180,1700,300,'O07_stamp.png',{enter:'up',din:.5,float:.5,z:30,sfx:null});
PART({type:'sparks',t0:26.5,t1:26.7,n:40,seed:21,x:830,y:1010,speed:500,color:'#3fd47a'});

// ================= RULE 3 29.3 - 35.25 : 3 tenders =================
RULE(3,29.42,35.25,'बिल्डर निवडायचा?',30.28,{fs:72});
[[270,32.09],[540,32.3],[810,32.5]].forEach(([x,t0],i)=>{
  IMG(t0,35.25,x,960,270,'O08_envelope.png',{enter:'right',din:.45,sfx:'paper',sfxv:.7,float:.35,rot:(i-1)*5,z:36+i,
    fn:t=>i===2?{o:(t>33.45&&t<34.6)?.22:1,filter:(t>33.45&&t<34.6)?'grayscale(1)':''}:null});
  A({t0:t0+.1,t1:35.25,x,y:700,w:110,cls:'noshadow',html:`<div style="width:110px;height:110px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff7e6,#e8cf9f 45%,#b8935f);display:flex;align-items:center;justify-content:center;font:900 64px/1 P;color:#1a1206;box-shadow:0 10px 30px rgba(0,0,0,.5)">${i+1}</div>`,enter:'pop',din:.35,sfx:'pop',sfxv:.5,z:46,float:0,
    fn:t=>i===2?{o:(t>33.45&&t<34.6)?.25:1}:null});
});
A({t0:32.61,t1:33.4,x:540,y:1400,w:1000,cls:'chipw',html:`<div class="stampbox" style="color:#e8cf9f;background:rgba(13,23,41,.6);font-size:70px">किमान 3 निविदा</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.12,sfxv:.9,z:55,float:0,rot:-4,exit:'fade',dout:.15});
PILL(33.45,35.25,540,1400,'3 पेक्षा कमी निविदा आल्या तर?','p-red',{st:'font-size:46px'});
A({t0:34.28,t1:35.25,x:540,y:1590,w:1000,cls:'chipw',html:`<span class="pill p-gold" style="font-size:50px"><span style="display:inline-block;vertical-align:-10px;margin-right:12px">${IC.cal(56)}</span>मुदतवाढ ➜</span>`,enter:'right',din:.4,sfx:'whoosh',z:50,float:0});
sfx(34.6,'ding',.5);

// ================= RULE 4 35.25 - 41.6 : registrar + video =================
BG({img:'B03_meeting.jpg',t0:35.25,t1:41.6,s0:1.2,s1:1.08,x0:-40,x1:30,fade:.3,filter:'brightness(.32) blur(5px)'});
RULE(4,35.35,41.6,'बिल्डर निवडीची सभा',36.18,{fs:70});
GL(37.34,41.6,540,780,900,`<div style="display:flex;align-items:center;gap:30px">${IC.shield(150)}<div style="text-align:left"><div style="font:800 58px/1.25 P">निबंधकाचा अधिकारी</div><div style="font:700 46px/1.3 P" class="gold">हजर असणं बंधनकारक</div></div></div>`,{enter:'down',pad:'34px 40px',shine:[38.4]});
A({t0:38.37,t1:41.6,x:930,y:660,w:110,html:IC.check,cls:'noshadow',enter:'stamp',din:.3,sfx:'ding',sfxv:.6,z:55,float:0});
IMG(39.36,41.6,320,1360,440,'O09_camera.png',{enter:'left',din:.5,float:.2});
GL(39.96,41.6,780,1290,520,`<div style="font:700 42px/1.35 P">संपूर्ण सभेचं</div><div style="font:900 60px/1.15 P" class="gold">Video Recording</div>`,{enter:'right',pad:'26px 24px'});
A({t0:40.32,t1:41.6,x:540,y:960,w:1080,cls:'noshadow',enter:'fade',din:.15,float:0,z:300,sfx:'click',sfxv:.8,
  html:`<div style="width:1080px;height:1920px;position:relative">${[[0,0,''],[1,0,'scaleX(-1)'],[0,1,'scaleY(-1)'],[1,1,'scale(-1,-1)']].map(([a,b,tr])=>`<div style="position:absolute;${a?'right':'left'}:50px;${b?'bottom':'top'}:200px;width:120px;height:120px;border-left:10px solid #fff;border-top:10px solid #fff;transform:${tr}"></div>`).join('')}
   <div style="position:absolute;left:90px;bottom:240px;font:800 48px/1 P;color:#fff;display:flex;align-items:center;gap:14px"><span class="dot" style="width:34px;height:34px;border-radius:50%;background:#ff2a1a;box-shadow:0 0 20px #ff2a1a"></span>REC <span class="tm" style="font-weight:600">00:00:00</span></div></div>`,
  draw:(t,lt,oo)=>{oo.el.querySelector('.dot').style.opacity=Math.floor(t*2.5)%2?0.2:1;const s=Math.floor(lt);oo.el.querySelector('.tm').textContent=`00:00:0${s}`}});

// ================= RULE 5 41.6 - 47.45 : secret ballot =================
RULE(5,41.7,47.45,'गुप्त मतदानाची मागणी',42.64,{fs:68,tt1:44.85});
[0,1,2,3,4].forEach(i=>A({t0:42.64+i*.08,t1:44.85,x:160+i*190,y:720,w:150,cls:'noshadow',html:`<div class="pp">${IC.person('#e8cf9f',150)}</div>`,enter:'pop',din:.35,sfx:i?null:'pop',z:40,float:.3,
  draw:(t,lt,oo)=>{const on=t>42.92;oo.el.querySelector('.pp').style.filter=on?(i===0?'drop-shadow(0 0 24px #f2dfb6) brightness(1.15)':'grayscale(1) brightness(.45)'):'none'},fn:t=>i===0&&t>42.92?{s:1+.18*E.back(clamp((t-42.92)/.4))}:null}));
A({t0:42.92,t1:44.85,x:540,y:1120,w:800,cls:'gl dk',html:`<div style="padding:26px 20px;text-align:center"><div style="font:900 200px/1 P" class="gold">1/5</div><div style="font:800 52px/1.3 P;color:#fff">सभासदांनी मागणी केली तर</div></div>`,enter:'zoom',din:.4,sfx:'impact',sfxv:.5,z:45,float:.2,shine:[43.6]});
A({t0:44.92,t1:47.45,x:540,y:700,w:280,cls:'noshadow',html:`<div style="position:relative">${IC.hand(280)}<div class="x" style="position:absolute;left:-10%;top:-5%;width:120%;height:110%;opacity:0">${IC.cross}</div></div>`,enter:'up',din:.4,sfx:'whoosh',z:40,float:.2,
  draw:(t,lt,oo)=>{const p=clamp((t-45.81)/.25);const x=oo.el.querySelector('.x');x.style.opacity=p*.92;x.style.transform=`scale(${lerp(2,1,E.out(p))})`},fn:t=>({o:1-.5*clamp((t-46.2)/.3),s:1-.25*E.inout(clamp((t-46.2)/.4)),dy:-80*E.inout(clamp((t-46.2)/.4))})});
sfx(45.81,'buzz',.5);
TXT(45.12,46.2,540,1040,`<div style="font:800 64px/1.2 P;color:#fff">हात वर करून <span class="red">नाही</span></div>`,{enter:'up',din:.35,exit:'fade',dout:.2});
IMG(46.22,47.45,540,1280,520,'O10_ballot.png',{enter:'rise',din:.5,float:.15,sfx:'whoosh'});
for(let k=0;k<4;k++){const t0=46.55+k*.18;A({t0,t1:t0+.55,x:500+k*25,y:600,w:110,cls:'noshadow',html:`<div style="width:110px;height:70px;background:#fff;border-radius:6px;box-shadow:0 8px 18px rgba(0,0,0,.35)"></div>`,enter:'fade',din:.05,exit:'fade',dout:.1,float:0,z:44,
  fn:(t,lt)=>({dy:E.in3(clamp(lt/.5))*400,r:(k-1.5)*12*(1-lt),s:1-.3*clamp(lt/.5)})});sfx(t0+.45,'paper',.35)}
PILL(46.6,47.45,540,1760,'🔒 गुप्त मतदान','p-gold',{st:'font-size:54px'});

// ================= RULE 6 47.45 - 56.15 : deadlines =================
RULE(6,47.54,56.15,'आता <span class="gold">मुदत</span> ठरलेली!',48.44,{fs:78,y:400});
BG({img:'B04_construction.jpg',t0:54.05,t1:55.4,s0:1.05,s1:1.15,fade:.35,filter:'brightness(.5)'});
BG({img:'B02_tower.jpg',t0:55.4,t1:56.4,s0:1.12,s1:1.04,fade:.35,filter:'brightness(.62)'});
A({t0:49.8,t1:56.15,x:150,y:1110,w:40,cls:'noshadow',html:`<div style="width:40px;height:1040px;position:relative"><div style="position:absolute;left:16px;top:0;width:8px;height:100%;background:rgba(255,255,255,.18);border-radius:4px"></div><div class="fl" style="position:absolute;left:16px;top:0;width:8px;height:0;background:linear-gradient(180deg,#f2dfb6,#c9a66f);border-radius:4px;box-shadow:0 0 16px #e8cf9f"></div></div>`,enter:'fade',din:.3,float:0,z:38,
  draw:(t,lt,oo)=>{const h=KF(t,[[49.91,0],[51.02,300],[52.3,600],[54.38,920],[55.0,1040]],'out');oo.el.querySelector('.fl').style.height=h+'px'}});
const NODE=(t0,y,big,small,col='gold')=>{
  A({t0,t1:56.15,x:150,y,w:70,cls:'noshadow',html:`<div style="width:70px;height:70px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff7e6,#e8cf9f 45%,#b8935f);box-shadow:0 0 0 8px rgba(232,207,159,.25),0 0 30px #e8cf9f"></div>`,enter:'pop',din:.35,sfx:'pop',sfxv:.6,z:40,float:0});
  GL(t0,56.15,600,y,790,`<div style="display:flex;align-items:center;gap:26px;justify-content:flex-start">${big?`<div class="${col}" style="font:900 82px/1 P;white-space:nowrap">${big}</div>`:''}<div style="text-align:left;font:800 46px/1.25 P">${small}</div></div>`,{enter:'right',pad:'26px 34px',float:.15});
};
NODE(49.91,640,'','बिल्डरची निवड');
NODE(51.02,940,'3 महिने','विकास<br>करार');
NODE(52.3,1240,'+3 महिने','पर्यायी घराचा<br>करार (नोंदणी)');
NODE(54.38,1560,'2 वर्ष','इमारत<br>पूर्ण');
sfx(51.02,'ding',.4);sfx(52.3,'ding',.4);sfx(54.38,'impact',.5);
A({t0:55.67,t1:56.15,x:820,y:1700,w:420,cls:'chipw',html:`<div class="stampbox" style="color:#3fd47a;background:rgba(6,30,16,.6);font-size:66px">पूर्ण ✓</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.1,sfxv:.8,z:60,float:0,rot:-8});
PART({type:'sparks',t0:55.75,t1:55.95,n:60,seed:33,x:820,y:1700,speed:700,color:'#f2dfb6'});
TXT(54.6,56.15,540,1830,`<div style="font:500 26px/1.4 P;color:rgba(255,255,255,.6)">* plinth पासून 2 वर्ष, अपवादात्मक स्थितीत +1 वर्ष</div>`,{enter:'fade',din:.4,float:0,sfx:null,z:500});

// ================= RULE 7 56.15 - 63.55 : member protection =================
RULE(7,56.24,63.55,'सभासदांचं <span class="gold">संरक्षण</span>',57.04,{fs:72});
const ROW=(t0,y,img,ih,l1,l2)=>GL(t0,63.55,540,y,960,`<div style="display:flex;align-items:center;gap:30px"><div style="width:260px;height:${ih}px;display:flex;align-items:center;justify-content:center"><img src="a/${img}" style="max-width:260px;max-height:${ih}px;filter:drop-shadow(0 18px 24px rgba(0,0,0,.45))"></div><div style="text-align:left"><div style="font:800 50px/1.25 P">${l1}</div><div class="gold" style="font:900 58px/1.2 P">${l2}</div></div></div>`,{enter:'right',pad:'24px 34px',float:.15});
ROW(57.04,690,'O11_keys.png',270,'बांधकाम चालू असेपर्यंत','पर्यायी घर / भाडं');
ROW(60.02,1100,'O12_guarantee.png',270,'बिल्डरकडून','बँक गॅरंटी');
ROW(61.85,1510,'O13_lottery.png',280,'नवीन घरांचं वाटप','लॉटरीने');
sfx(60.74,'coin',.4);sfx(62.95,'chime',.45);

// ================= ACTION 63.55 - 66.65 =================
TINT(63.55,66.65,'radial-gradient(ellipse at 50% 50%,rgba(110,8,0,.35),rgba(30,0,0,.85))',.2);
TXT(63.62,66.65,540,560,`<div style="font:800 70px/1.25 P;color:#fff">आणि हे नियम</div><div style="font:900 110px/1.15 P" class="red">मोडले तर?</div>`,{enter:'zoom',din:.4,sfx:'impact',sfxv:.5});
IMG(64.9,66.65,540,1100,520,'O07_stamp.png',{enter:'drop',din:.7,sfx:'whoosh',float:0,z:40,fn:t=>({dy:t>65.8?E.out(clamp((t-65.8)/.15))*40:0})});
A({t0:65.92,t1:66.65,x:540,y:1250,w:1000,cls:'chipw',html:`<div class="stampbox" style="color:#ff4a3a;background:rgba(40,0,0,.65);font-size:84px;line-height:1.2">समितीवर<br>थेट कारवाई!</div>`,enter:'stamp',din:.28,sfx:'stamp',sfxd:.1,sfxv:1,z:60,float:0,rot:-7});
shake(66.0,18);flash(66.0,.4,'#ff5a4a');

// ================= OUTRO 66.65 - END =================
BG({img:'B02_tower.jpg',t0:66.65,t1:END+1,s0:1.18,s1:1.0,y0:40,y1:-20,fade:.3,filter:'brightness(.75)'});
TINT(66.65,END+1,'linear-gradient(180deg,rgba(6,11,22,.8),rgba(6,11,22,.1) 35%,rgba(6,11,22,.2) 60%,rgba(6,11,22,.85))',.3);
TXT(66.77,72.2,540,420,`<div style="font:800 64px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">तुमच्या सोसायटीत</div><div class="gold" style="font:900 86px/1.2 P">Redevelopment ची</div><div style="font:800 64px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">चर्चा चालू आहे?</div>`,{enter:'down',din:.45,exit:'up',dout:.3});
GL(69.56,72.2,540,1380,860,`<div style="display:flex;align-items:center;gap:30px">${IC.share(130)}<div style="text-align:left"><div style="font:700 44px/1.3 P">हा video सोसायटीच्या</div><div class="gold" style="font:900 60px/1.2 P">group वर share करा</div></div></div>`,{enter:'up',pad:'30px 40px',dark:true,exit:'down',dout:.3,shine:[70.8]});
TXT(72.37,END+1,540,380,`<div style="font:800 58px/1.3 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">अशाच <span class="gold">Real Estate</span><br>माहितीसाठी</div>`,{enter:'down',din:.45});
A({t0:72.6,t1:END+1,x:540,y:1010,w:860,cls:'gl w',html:`<div style="padding:50px 60px 44px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'reveal',sfxv:.6,z:50,float:.15,shine:[73.6,76.2]});
PART({type:'sparks',t0:72.8,t1:73.1,n:60,seed:44,x:540,y:1010,speed:800,color:'#f2dfb6'});
A({t0:74.24,t1:END+1,x:540,y:1560,w:1040,cls:'chipw',html:`<span class="pill p-gold" style="font-size:56px;padding:28px 60px 22px">Follow करा ➜</span>`,enter:'up',din:.45,sfx:'pop',sfxv:.8,z:54,float:0,
  fn:t=>({s:(t>75.55&&t<75.75?.93:1)*(1+Math.max(0,Math.sin((t-75.8)*5))*.04*(t>75.8?1:0))})});
A({t0:74.9,t1:END+1,x:830,y:1680,w:120,cls:'noshadow',html:`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`,enter:'up',din:.4,z:56,float:0,fn:t=>({s:t>75.55&&t<75.75?.85:1})});
sfx(75.6,'click',.9);PART({type:'confetti',t0:75.65,t1:76.0,n:110,seed:41,x:540,y:-40,burst:1,life:3,colors:['#f2dfb6','#ffffff','#c9a66f','#1b2a45']});
}

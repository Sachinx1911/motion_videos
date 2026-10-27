# Sound for the 3D walkthrough sample (no voice yet): soft music bed from tools/audio.py + one SFX per beat.
import os, subprocess, numpy as np
src=open(os.path.join(os.path.dirname(__file__),'..','tools','audio.py'),encoding='utf-8').read().split('\n')
END=40.0
ns={}
exec('\n'.join(src[:137]),ns)                       # SR, S(), filters
ns['END']=END; ns['N']=N=int(END*ns['SR'])
exec('import os\n'+'\n'.join(src[144:173]),ns)      # music bed (Am F C G pad)
SR=ns['SR']; S=ns['S']; mus=ns['mus']
fx=np.zeros(N)
def put(t,name,g=1.0):
    x=S(name)*g; i=int(t*SR); fx[i:i+len(x)]+=x[:N-i]
# timeline in site3d/walk.html: plot 0-8.6, build 8.6-14.4 (floors every .38 s from 9.1), walk 14.4, lift 19.8, roof 25, orbit 30.2, back 35.6
put(0.3,'whoosh',.8); put(4.3,'swoosh')
put(8.6,'thud',.9)
for f in range(1,13): put(9.1+(f-1)*.38,'click',.55)
put(13.9,'impact',.7)
for t in (14.4,19.8,25.0,30.2): put(t,'whoosh',.7)
put(33.6,'riser',.6); put(36.4,'boom',.6)
t=np.arange(N)/SR
fade=np.clip(t/1.0,0,1)*np.clip((END-t)/2.0,0,1)
mix=0.55*mus/ (np.abs(mus).max()+1e-9)*fade + 0.6*fx
mix=np.tanh(mix*1.2)*0.85
st=np.stack([mix,mix],1).astype(np.float32); st.tofile('out/walk_mix.f32')
subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(SR),'-ac','2','-i','out/walk_mix.f32','-c:a','aac','-b:a','192k','out/walk_mix.m4a'])
os.remove('out/walk_mix.f32'); print('ok')

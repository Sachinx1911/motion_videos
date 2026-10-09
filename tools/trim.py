import numpy as np, subprocess, json
sr=44100
raw=subprocess.run(['ffmpeg','-v','error','-i','vo.mp3','-ac','1','-ar',str(sr),'-f','f32le','-'],capture_output=True).stdout
x=np.frombuffer(raw,np.float32)
win=int(0.01*sr); n=len(x)//win
rms=np.sqrt((x[:n*win].reshape(n,win)**2).mean(1)); db=20*np.log10(rms+1e-9)
sil=db<-38
# find silent runs
runs=[];i=0
while i<n:
    if sil[i]:
        j=i
        while j<n and sil[j]: j+=1
        runs.append((i,j)); i=j
    else: i+=1
keep=[];cur=0
MAXG=22 # 0.22s
for a,b in runs:
    L=b-a
    if a==0: cur=max(b-3,0); continue
    if L>MAXG:
        keep.append((cur,a+MAXG//2)); cur=b-MAXG//2
keep.append((cur,n))
segs=[x[a*win:b*win] for a,b in keep]
# crossfade 5ms
out=segs[0]
for s in segs[1:]:
    f=int(0.005*sr); r=np.linspace(0,1,f,dtype=np.float32)
    out=np.concatenate([out[:-f],out[-f:]*(1-r)+s[:f]*r,s[f:]])
out.astype(np.float32).tofile('vo_t.f32')
subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(sr),'-ac','1','-i','vo_t.f32','-c:a','pcm_s16le','vo_t.wav'])
print(len(x)/sr, len(out)/sr)

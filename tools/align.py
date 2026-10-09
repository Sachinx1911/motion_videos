import numpy as np, json, re, unicodedata
words=open('script.txt').read().split()
def wt(w):
    core=re.sub(r'[!?,.]','',w)
    # count aksharas: consonants+independent vowels not preceded by virama
    n=0
    for i,c in enumerate(core):
        cat=unicodedata.name(c,'')
        if ('LETTER' in cat) and not (i>0 and core[i-1]=='्'): n+=1
    return max(n,1)+0.3
W=np.array([wt(w) for w in words]); P=[bool(re.search(r'[!?,]$',w)) for w in words]
strong=[bool(re.search(r'[!?]$',w)) for w in words]
import numpy as np
x=np.fromfile('vo_t.f32',np.float32); w=441; n=len(x)//w
db=20*np.log10(np.sqrt((x[:n*w].reshape(n,w)**2).mean(1))+1e-9); sp=db>-40
ch=[];i=0
while i<n:
  if sp[i]:
    j=i
    while j<n:
      if sp[j]: j+=1; continue
      k=j
      while k<n and not sp[k]: k+=1
      if k-j<12 and k<n: j=k
      else: break
    ch.append((i/100,j/100)); i=j
  else: i+=1
ch=[c for c in ch if c[1]-c[0]>0.08]
D=np.array([b-a for a,b in ch]); M=len(ch); N=len(words)
rate=W.sum()/D.sum()
cum=np.concatenate([[0],np.cumsum(W)])
INF=1e18
# allow a chunk boundary inside nothing: each chunk gets >=1 word. Also allow merging: punctuation not at chunk boundary costs small.
cost=np.full((M+1,N+1),INF); bk=np.zeros((M+1,N+1),int); cost[0,0]=0
for m in range(1,M+1):
    for e in range(1,N+1):
        best=INF;bs=-1
        for s in range(max(0,e-14),e):
            if cost[m-1,s]>=INF: continue
            ew=cum[e]-cum[s]; exp=ew/rate
            c=((D[m-1]-exp)/ (0.25+0.15*exp))**2
            c+= 0 if P[e-1] else 4.0
            # skipped punctuation inside chunk
            c+= sum(1.2 for k in range(s,e-1) if strong[k])
            v=cost[m-1,s]+c
            if v<best: best=v;bs=s
        cost[m,e]=best; bk[m,e]=bs
e=N; segs=[]
for m in range(M,0,-1):
    s=bk[m,e]; segs.append((s,e)); e=s
segs=segs[::-1]
out=[]
for (s,e),(a,b) in zip(segs,ch):
    tot=cum[e]-cum[s]; t=a
    for k in range(s,e):
        d=(b-a)*W[k]/tot; out.append({'w':words[k],'s':round(t,3),'e':round(t+d,3)}); t+=d
    print(f'{a:6.2f}-{b:6.2f} ({b-a:4.2f} exp {(cum[e]-cum[s])/rate:4.2f}) '+' '.join(words[s:e]))
json.dump(out,open('words.json','w'),ensure_ascii=False)

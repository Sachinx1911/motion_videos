import json,numpy as np,cv2
NE='/tmp/claude-0/-home-claude/aa00a16c-892f-5643-9fdc-81293a1c18a0/scratchpad/ne/geojson/'
big=cv2.imread('/home/claude/geo/bm_region.jpg'); bh,bw=big.shape[:2]
ppd=bw/105.0  # lon 20..125
LO0,LO1,LA1,LA0=64.5,99.5,37.5,4.5
x0=int((LO0-20)*ppd);x1=int((LO1-20)*ppd);y0=int((60-LA1)*ppd);y1=int((60-LA0)*ppd)
crop=big[y0:y1,x0:x1]
OW=1400;k=OW/crop.shape[1];crop=cv2.resize(crop,(OW,int(crop.shape[0]*k)),interpolation=cv2.INTER_CUBIC)
# enhance
lab=cv2.cvtColor(crop,cv2.COLOR_BGR2LAB);cl=cv2.createCLAHE(2.0,(8,8));lab[...,0]=cl.apply(lab[...,0]);crop=cv2.cvtColor(lab,cv2.COLOR_LAB2BGR)
crop=cv2.convertScaleAbs(crop,alpha=1.08,beta=4)
H,W=crop.shape[:2];cv2.imwrite('site/a/map_in.jpg',crop,[cv2.IMWRITE_JPEG_QUALITY,90])
s=W/(LO1-LO0)
P=lambda lo,la:((lo-LO0)*s,(LA1-la)*s)
def rings(g):
    if g['type']=='Polygon':return [g['coordinates'][0]]
    return [p[0] for p in g['coordinates']]
def path(g,minA=0):
    out=[]
    for r in rings(g):
        pts=np.array([P(*c[:2]) for c in r])
        if minA and abs(cv2.contourArea(pts.astype(np.float32)))<minA:continue
        ap=cv2.approxPolyDP(pts.astype(np.float32).reshape(-1,1,2),0.7,True).reshape(-1,2)
        if len(ap)<3:continue
        out.append('M'+' L'.join(f'{x:.1f} {y:.1f}' for x,y in ap)+'Z')
    return ''.join(out)
ind=json.load(open(NE+'ne_10m_admin_0_countries_ind.geojson'))
gi=[f for f in ind['features'] if f['properties'].get('ADM0_A3') in('IND',) or f['properties'].get('adm0_a3')=='IND' or f['properties'].get('ISO_A3')=='IND'][0]['geometry']
st=json.load(open(NE+'ne_10m_admin_1_states_provinces.geojson'))
S={f['properties']['name']:f['geometry'] for f in st['features'] if f['properties'].get('adm0_a3')=='IND'}
print(sorted(S))
T8=['Gujarat','Rajasthan','Madhya Pradesh','Chhattisgarh','Jharkhand','West Bengal','Tripura','Mizoram']
def cen(g):
    best=max(rings(g),key=lambda r:len(r));a=np.array([P(*c[:2]) for c in best]);return [round(float(a[:,0].mean()),1),round(float(a[:,1].mean()),1)]
G={'W':W,'H':H,'s':s,'lo0':LO0,'la1':LA1,'india':path(gi,40),'states':''.join(path(S[n],5) for n in S),
   't8':{n:path(S[n],5) for n in T8},'c8':{n:cen(S[n]) for n in T8},'tropic':(LA1-23.44)*s,
   'mah':path(S['Maharashtra'],5),'ker':path(S['Kerala'],5),'tn':path(S['Tamil Nadu'],5),'cker':cen(S['Kerala']),'ctn':cen(S['Tamil Nadu']),'cmah':cen(S['Maharashtra'])}
open('site/geo.js','w').write('const GEO='+json.dumps(G)+';')
print(W,H,G['tropic'],G['c8'])

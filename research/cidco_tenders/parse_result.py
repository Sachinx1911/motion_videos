import sys,re,json
from pypdf import PdfReader
def parse(f):
    t='\n'.join(p.extract_text() or '' for p in PdfReader(f).pages)
    g=lambda rx: (re.search(rx,t) or [None,None])[1]
    d={'file':f,'auction':g(r'Auction No\.: (\S+)'),'node':g(r'Node :(\w+)'),'sector':g(r'Sector No : (\S+)'),'plot':g(r'PLOT No : (.+?) No'),
       'area':g(r'PLOT Area :([\d.]+)'),'use':g(r'USE : ([A-Z][A-Z /+]*?)\n'),'fsi':g(r'FSI : ([\d.]+)'),'base':g(r'BASE RATE \(RS\.\):([\d.]+)')}
    bids=re.findall(r'\n(\d+) (.+?) (\d+\.\d\d) (Close Bid|Auction Bid) (\d{4}-\d\d-\d\d)',t)
    d['bidders']=len(bids); base=float(d['base'] or 0)
    # drop obvious typo bids (> 20x base, e.g. total amount typed instead of per-sqm rate)
    good=[b for b in bids if base and float(b[2])<20*base]; d['anomaly']=[(b[1],float(b[2])) for b in bids if b not in good]
    d['winner']=good[0][1] if good else None; d['win_rate']=float(good[0][2]) if good else None
    d['top3']=[(b[1],float(b[2])) for b in good[:3]]
    if d['base'] and d['win_rate']: d['x_base']=round(d['win_rate']/float(d['base']),2)
    return d
if __name__=='__main__':
    for f in sys.argv[1:]: print(json.dumps(parse(f),ensure_ascii=False))

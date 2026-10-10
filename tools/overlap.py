# Find on-screen items that overlap each other (text over objects, cards over cards).
# Usage (from reel folder): python ../tools/overlap.py [step=0.1] [end]
# Ignores full-frame layers (w>=1000), HUD/transitions (z>=600) and nearly invisible items.
import asyncio, sys, os, pathlib, json
from playwright.async_api import async_playwright
JS = """(t)=>{seek(t);const out=[];
 for(const o of ITEMS){const el=o.el;if(el.style.display==='none')continue;const op=+el.style.opacity;if(op<.35)continue;
  if(o.z>=600||o.w>=1000||o.allowOver)continue;
  const r=el.getBoundingClientRect();if(r.width<4||r.height<4)continue;
  let lbl=(o.img||'')||(el.innerText||'').replace(/\\s+/g,' ').trim().slice(0,28)||('#'+ITEMS.indexOf(o));
  out.push({i:ITEMS.indexOf(o),lbl,r:[r.left,r.top,r.right,r.bottom],z:o.z,par:o.parentOf})}
 const hits=[];for(let a=0;a<out.length;a++)for(let b=a+1;b<out.length;b++){const A=out[a].r,B=out[b].r;
  const w=Math.min(A[2],B[2])-Math.max(A[0],B[0]),h=Math.min(A[3],B[3])-Math.max(A[1],B[1]);
  if(w>12&&h>12){const s=Math.min((A[2]-A[0])*(A[3]-A[1]),(B[2]-B[0])*(B[3]-B[1]));hits.push([out[a].lbl,out[b].lbl,Math.round(100*w*h/s)])}}
 return hits}"""
async def main(step=.1, end=None):
    async with async_playwright() as p:
        br = await p.chromium.launch(args=['--allow-file-access-from-files'])
        pg = await br.new_page(viewport={'width':1080,'height':1920})
        await pg.goto(pathlib.Path(os.environ.get('PAGE','site/index.html')).resolve().as_uri())
        await pg.wait_for_function('window.READY===true', timeout=60000)
        end = end or await pg.evaluate('Math.max(...SFX.map(s=>s.t))')
        seen = {}; t = 0.0
        while t <= end:
            for a,b,pc in await pg.evaluate(JS, t):
                k = (a,b)
                if pc >= 8:
                    s = seen.setdefault(k, [t,t,pc]); s[1] = t; s[2] = max(s[2], pc)
            t = round(t+step, 2)
        for (a,b),(t0,t1,pc) in sorted(seen.items(), key=lambda x:x[1][0]):
            print(f'{t0:6.1f}-{t1:6.1f}s  {pc:3d}%  [{a}]  x  [{b}]')
        await br.close()
asyncio.run(main(*[float(x) for x in sys.argv[1:]]))

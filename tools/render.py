import asyncio, sys, subprocess, json, os
from playwright.async_api import async_playwright
async def main(mode, a, b, out, fps=30, step=None):
    async with async_playwright() as p:
        br=await p.chromium.launch(args=['--allow-file-access-from-files','--disable-web-security','--force-color-profile=srgb','--font-render-hinting=none'])
        pg=await br.new_page(viewport={'width':1080,'height':1920})
        pg.on('console', lambda m: print('CONSOLE',m.text))
        pg.on('pageerror', lambda e: print('PAGEERR',e))
        await pg.goto('file://'+os.path.abspath(os.environ.get('PAGE','site/index.html')))
        await pg.wait_for_function('window.READY===true',timeout=60000)
        await pg.evaluate('seek(0.5)'); await pg.wait_for_timeout(1500); await pg.screenshot(type='jpeg')
        if mode=='sfx':
            s=await pg.evaluate('JSON.stringify(SFX)'); open(out,'w').write(s); await br.close(); return
        if mode=='shots':
            for t in [float(x) for x in a.split(',')]:
                await pg.evaluate(f'seek({t})'); await pg.screenshot(path=f'{out}/s_{t:07.2f}.jpg',type='jpeg',quality=80)
            await br.close(); return
        a=float(a); b=float(b)
        n0=round(a*fps); n1=round(b*fps)
        ff=subprocess.Popen(['ffmpeg','-v','error','-y','-f','image2pipe','-framerate',str(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p',out],stdin=subprocess.PIPE)
        import time; T=time.time()
        for n in range(n0,n1):
            await pg.evaluate(f'seek({n/fps})')
            img=await pg.screenshot(type='jpeg',quality=93)
            ff.stdin.write(img)
            if n%150==0: print(n, f'{time.time()-T:.1f}s', flush=True)
        ff.stdin.close(); ff.wait(); await br.close()
asyncio.run(main(*sys.argv[1:]))

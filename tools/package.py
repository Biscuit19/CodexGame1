"""Build reproducible delivery archives after `npm run build`."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import shutil
root = Path(__file__).resolve().parent.parent
out = root / 'release'
out.mkdir(exist_ok=True)
files = ['play.html', 'web.html', 'index.html', 'server.mjs', 'build.mjs', 'package.json',
         'package-lock.json', 'README.md', 'TESTING.md', 'DEPLOYMENT.md',
         'ASSET_CREDITS.md', 'LICENSE']
for folder in ['src', 'assets', 'tests', 'tools']:
    files += [str(p.relative_to(root)) for p in (root / folder).rglob('*') if p.is_file() and '__pycache__' not in str(p)]
archive = out / 'echo-drift.zip'
with ZipFile(archive, 'w', ZIP_DEFLATED, compresslevel=9) as z:
    for f in sorted(files):
        z.write(root / ('web.html' if f == 'play.html' else f), f)
with ZipFile(archive) as z:
    assert z.testzip() is None
    assert z.read('play.html') == (root / 'web.html').read_bytes()
    assert len([n for n in z.namelist() if n.endswith('.mp3')]) == 43
    assert len([n for n in z.namelist() if n.endswith('.svg')]) == 69
shutil.copyfile(archive, out / '余响航线-完整游戏.zip')
print(f'Validated {len(files)} files; each archive {archive.stat().st_size / 1024**2:.2f} MiB')

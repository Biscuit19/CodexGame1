import { readFile, writeFile, readdir } from 'node:fs/promises';
const base=new URL('./',import.meta.url);
const read=p=>readFile(new URL(p,base),'utf8');
let html=await read('index.html');
const css=await read('src/style.css');
const assets={};
for(const dir of ['music'])for(const file of await readdir(new URL('assets/'+dir+'/',base))){const path='assets/'+dir+'/'+file;const data=await readFile(new URL(path,base));assets[path]=`data:${file.endsWith('.svg')?'image/svg+xml':'audio/mpeg'};base64,${data.toString('base64')}`;}
let js='';
for(const path of ['src/assets.js','src/music.js','src/core.js','src/render.js','src/app.js'])js+='\n'+(await read(path)).replace(/^import .*?;\s*$/gm,'').replace(/^export /gm,'');
const manifest=`<script>globalThis.__ECHO_ASSETS__=${JSON.stringify(assets)};</script>`;
const styled=html.replace('<link rel="stylesheet" href="/src/style.css">',`<style>${css}</style>`);
const bundled=`<script type="module">\n${js.replaceAll('</script','<\\/script')}\n</script>`;
const web=styled.replace('<script type="module" src="/src/app.js"></script>',bundled);
html=styled.replace('<script type="module" src="/src/app.js"></script>',manifest+bundled);
await writeFile(new URL('play.html',base),html);
await writeFile(new URL('web.html',base),web);
console.log(`Built offline play.html (${(Buffer.byteLength(html)/1024/1024).toFixed(2)} MiB) and lazy-music web.html (${Math.round(Buffer.byteLength(web)/1024)} KiB), ${Object.keys(assets).length} licensed tracks.`);

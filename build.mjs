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
html=html.replace('<link rel="stylesheet" href="/src/style.css">',`<style>${css}</style>`).replace('<script type="module" src="/src/app.js"></script>',`${manifest}<script type="module">\n${js.replaceAll('</script','<\\/script')}\n</script>`);
await writeFile(new URL('play.html',base),html);
console.log(`Built standalone play.html (${(Buffer.byteLength(html)/1024/1024).toFixed(2)} MiB), with ${Object.keys(assets).length} embedded licensed assets.`);

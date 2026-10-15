import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
try{for(const folder of [false,true]){
 const context=await b.newContext({offline:folder,viewport:{width:1280,height:800}}),errors=[],requests=[];
 if(folder){const html=await readFile('web.html','utf8');await context.route('**/*',async route=>{const url=new URL(route.request().url());if(url.pathname==='/play.html')return route.fulfill({contentType:'text/html',body:html});if(/^\/assets\/(music\/[a-z]+\d+\.mp3|icons\/[a-zA-Z-]+\.svg)$/.test(url.pathname))return route.fulfill({contentType:url.pathname.endsWith('.svg')?'image/svg+xml':'audio/mpeg',body:await readFile('.'+url.pathname)});return route.abort();});}
 else await context.route('**/*',route=>{const url=new URL(route.request().url());requests.push(url.pathname);if(url.pathname==='/play.html')return route.continue();return route.abort();});
 const p=await context.newPage();p.on('pageerror',e=>errors.push(e.stack));await p.goto('http://127.0.0.1:4173/play.html?test=1',{timeout:90000});await context.setOffline(true);
 await p.click('[data-action="new"]');await p.locator('[data-create]').first().click();await p.click('[data-action="start"]');await p.click('[data-action="begin"]');await p.mouse.move(920,450);await p.mouse.down();await p.waitForTimeout(1100);await p.mouse.up();assert((await p.evaluate(()=>window.__ECHO__.game.shots))>2);await p.waitForFunction(()=>window.__ECHO__.soundtrack.channels.get(window.__ECHO__.soundtrack.current)?.currentTime>.1);await p.waitForFunction(()=>[...document.querySelectorAll('#hud img')].every(im=>im.complete&&im.naturalWidth>0));await p.keyboard.press('Escape');const saved=await p.evaluate(()=>window.__ECHO__.saveSlots.read().elapsed);assert(saved>0);
 // The full document is served via loopback rather than a giant DevTools route.fulfill message.
 if(!folder)await context.setOffline(false);await p.reload({timeout:90000});await context.setOffline(true);await p.click('[data-action="continue"]');assert.equal(await p.evaluate(()=>window.__ECHO__.game.elapsed),saved);assert.deepEqual(errors,[]);if(!folder)assert(requests.every(path=>path==='/play.html'||path==='/favicon.ico'));await context.close();console.log(`Offline ${folder?'folder assets':'embedded single file'} PASS: no external requests, shooting, actual music, icons, save/reload.`);
}}finally{await b.close();}

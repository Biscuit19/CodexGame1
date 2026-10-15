import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const html=await readFile('web.html','utf8');assert(Buffer.byteLength(html)<200*1024);assert(!html.includes('globalThis.__ECHO_ASSETS__='));
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try{
 const p=await b.newPage({viewport:{width:1280,height:800}}),errors=[],music=[];p.on('pageerror',e=>errors.push(e.stack));
 await p.route('**/*',async route=>{const url=new URL(route.request().url());if(url.pathname==='/CodexGame1/')return route.fulfill({contentType:'text/html',body:html});if(/^\/CodexGame1\/assets\/music\/[a-z]+\d+\.mp3$/.test(url.pathname)){music.push(url.pathname);return route.fulfill({contentType:'audio/mpeg',body:await readFile(url.pathname.replace('/CodexGame1/',''))});}return route.abort();});
 await p.goto('http://127.0.0.1:4173/CodexGame1/?test=1');await p.click('[data-action="new"]');await p.locator('[data-create]').first().click();await p.click('[data-action="start"]');await p.click('[data-action="begin"]');await p.waitForFunction(()=>{const t=window.__ECHO__.soundtrack;return t.channels.get(t.current)?.currentTime>.1;});assert(music.length<=3);await p.evaluate(()=>{const g=window.__ECHO__.game;g.sector=14;g.setupSector();g.spawnBoss();g.player.invuln=999;g.player.level=50;});await p.waitForFunction(()=>{const t=window.__ECHO__.soundtrack;return t.current.startsWith('boss')&&t.channels.get(t.current)?.currentTime>.1;});assert(music.length<=4);assert.deepEqual(errors,[]);console.log('Web release PASS: project subpath, compact HTML, on-demand normal/boss audio, no root-path requests. HTML KiB:',Math.round(Buffer.byteLength(html)/1024));
}finally{await b.close();}

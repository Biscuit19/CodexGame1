import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.stack));
try{
 await page.goto('http://127.0.0.1:4173/?test=1');await page.locator('h1').waitFor();await page.evaluate(()=>window.__ECHO__.renderer.ready);await page.screenshot({path:'test-results/title.png'});
 await page.click('[data-action="new"]');await page.click('[data-action="start"]');await page.click('[data-action="begin"]');
 await page.waitForFunction(()=>window.__ECHO__.game.time>.3);await page.waitForFunction(()=>{const m=window.__ECHO__.soundtrack;return m.current.startsWith('early')&&m.channels.get(m.current)?.currentTime>.1;});assert.equal(await page.evaluate(()=>typeof window.__ECHO__.renderer.bossRig),'function');assert((await page.locator('#objective').evaluate(e=>parseFloat(getComputedStyle(e).fontSize)))>=18);
 const initial=await page.evaluate(()=>window.__ECHO__.game.player.x);
 await page.keyboard.down('KeyD');await page.waitForTimeout(500);await page.keyboard.up('KeyD');assert((await page.evaluate(()=>window.__ECHO__.game.player.x))>initial+50);
 await page.mouse.move(1000,450);await page.mouse.down();await page.waitForTimeout(600);await page.mouse.up();assert((await page.evaluate(()=>window.__ECHO__.game.shots))>0);
 await page.keyboard.press('Shift');await page.keyboard.press('KeyQ');await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>window.__ECHO__.game.stats.dashes),1);assert.equal(await page.evaluate(()=>window.__ECHO__.game.stats.echoes),1);
 await page.keyboard.press('Escape');const t=await page.evaluate(()=>window.__ECHO__.game.time);await page.waitForTimeout(250);assert.equal(await page.evaluate(()=>window.__ECHO__.game.time),t);await page.click('[data-action="resume"]');
 await page.evaluate(()=>{const api=window.__ECHO__,g=api.game;for(let i=0;i<9;i++)g.spawnEnemy(['drifter','skitter','spitter','charger','shield','summoner','bomber','sniper','spiral'][i],{x:g.player.x+Math.cos(i*6.28/9)*210,y:g.player.y+Math.sin(i*6.28/9)*210});});
 await page.waitForTimeout(400);await page.screenshot({path:'test-results/combat.png'});
 await page.evaluate(()=>{const api=window.__ECHO__;api.game.gainXP(100);});await page.waitForSelector('[data-choice="0"]');await page.screenshot({path:'test-results/upgrade.png'});await page.keyboard.press('Digit1');
 await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>window.__ECHO__.screen),'build');await page.keyboard.press('Tab');
 await page.evaluate(()=>{const g=window.__ECHO__.game;g.chests=[{id:900,x:g.player.x,y:g.player.y,type:'relic',cost:0}];});await page.keyboard.press('KeyE');await page.waitForSelector('[data-choice="0"]');assert.equal(await page.evaluate(()=>window.__ECHO__.game.rewardKind),'chest');
 await page.reload();await page.click('[data-action="continue"]');await page.waitForSelector('[data-choice="0"]');assert.equal(await page.evaluate(()=>window.__ECHO__.game.rewardKind),'chest');await page.click('[data-choice="0"]');
 await page.evaluate(()=>{const g=window.__ECHO__.game;g.sector=2;g.setupSector();g.time=g.duration*.48;g.pendingLevels=0;g.drain();});await page.waitForFunction(()=>!!window.__ECHO__.game.boss);await page.waitForTimeout(200);await page.screenshot({path:'test-results/boss.png'});
 await page.evaluate(()=>{const api=window.__ECHO__;api.game.enemies=api.game.enemies.filter(e=>e.boss);api.game.incursions=[];for(const boss of [...api.game.bosses])api.game.hitEnemy(boss,1e12,{noProc:true});api.handleEvents();});await page.waitForSelector('[data-choice="0"]');assert.equal(await page.evaluate(()=>window.__ECHO__.game.rewardKind),'sector');await page.click('[data-choice="0"]');assert.equal(await page.evaluate(()=>window.__ECHO__.game.rewardKind),'route');await page.screenshot({path:'test-results/routes.png'});await page.click('[data-choice="0"]');assert.equal(await page.evaluate(()=>window.__ECHO__.game.sector),3);
 // Finish through the real reward/route UI, clearing queued upgrades at each boundary.
 for(let s=3;s<15;s++){
  await page.evaluate(()=>{const api=window.__ECHO__,g=api.game;if(g.mode==='choice'&&g.rewardKind==='level'){g.choose(0);api.resume();}g.pendingLevels=0;g.enemies=[];g.incursions=[];g.spawnClock=999;g.nextEvent=999;g.time=g.sector%3===2?g.duration*.48:g.duration-.01;});
  if(s%3===2){await page.waitForFunction(()=>!!window.__ECHO__.game.boss);await page.evaluate(()=>{const api=window.__ECHO__;api.game.enemies=api.game.enemies.filter(e=>e.boss);api.game.incursions=[];for(const boss of [...api.game.bosses])api.game.hitEnemy(boss,1e12,{noProc:true});api.handleEvents();});}
  if(s===14)break;
  await page.waitForSelector('[data-choice="0"]');await page.click('[data-choice="0"]');await page.waitForFunction(()=>window.__ECHO__.game.rewardKind==='route');await page.click('[data-choice="0"]');
 }
 await page.waitForFunction(()=>window.__ECHO__.screen==='win');await page.screenshot({path:'test-results/ending.png'});assert.equal(await page.evaluate(()=>localStorage.getItem('echo-drift-save-v2')),null);
 await page.click('[data-action="endless"]');await page.waitForFunction(()=>window.__ECHO__.game.endless);assert.equal(await page.evaluate(()=>window.__ECHO__.game.sector),15);await page.keyboard.press('Escape');await page.click('[data-action="home"]');await page.setViewportSize({width:900,height:640});await page.screenshot({path:'test-results/title-small.png'});assert.equal(await page.locator('[data-action="new"]').isVisible(),true);
 assert.deepEqual(errors,[]);console.log('Browser PASS: movement, firing, both skills, pause, relic selection, build, chest, save/reload, bosses, route UI, ending, responsive menu. No JS errors.');
}finally{await browser.close();}

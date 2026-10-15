import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
try{
 const p=await b.newPage({viewport:{width:1440,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.stack));
 await p.addInitScript(()=>{if(!localStorage.getItem('echo-v3-tested')){localStorage.setItem('echo-drift-settings-v1',JSON.stringify({volume:.65,musicVolume:.75,music:true}));localStorage.setItem('echo-v3-tested','yes');}});
 await p.goto('http://127.0.0.1:4173/?test=1');await p.click('[data-action="new"]');await p.locator('[data-create]').first().click();await p.click('[data-action="start"]');await p.click('[data-action="begin"]');
 await p.waitForFunction(()=>window.__ECHO__.soundtrack.channels.get(window.__ECHO__.soundtrack.current)?.currentTime>.2);
 assert.equal(await p.evaluate(()=>window.__ECHO__.settings.musicVolume),.45);
 await p.waitForTimeout(600);assert((await p.evaluate(()=>window.__ECHO__.soundtrack.channels.get(window.__ECHO__.soundtrack.current).volume))<.13);
 // Observe a real Web Audio waveform, then the independent SFX mute.
 const levels=await p.evaluate(async()=>{const a=window.__ECHO__.audio,ctx=a.ctx,an=ctx.createAnalyser();an.fftSize=2048;a.master.connect(an);const data=new Float32Array(2048);async function peak(){let peak=0;for(let i=0;i<18;i++){await new Promise(r=>setTimeout(r,8));an.getFloatTimeDomainData(data);peak=Math.max(peak,...data.map(Math.abs));}return peak;}a.lastShot=0;a.sound('shoot','needle');const on=await peak();window.__ECHO__.settings.sfxVolume=0;a.update(.1);a.lastShot=0;a.sound('shoot','needle');await new Promise(r=>setTimeout(r,100));const off=await peak();window.__ECHO__.settings.sfxVolume=1;a.update(.1);a.master.disconnect(an);return{on,off};});assert(levels.on>.02);assert(levels.off<.001);
 await p.evaluate(()=>{const a=window.__ECHO__,g=new a.Game(17);g.chests=[];g.nextEvent=999;g.spawnClock=999;g.player.level=50;g.player.invuln=999;g.time=g.duration;g.spawnEnemy('shield',{x:1400,y:800,hp:100000,speed:0});a.setGame(g);});
 await p.waitForTimeout(300);assert.equal(await p.evaluate(()=>window.__ECHO__.screen),'playing');assert((await p.locator('#objective').innerText()).includes('清场'));assert.equal(await p.evaluate(()=>window.__ECHO__.game.enemies.length),1);await p.screenshot({path:'test-results/v3-cleanup.png'});
 await p.keyboard.press('Escape');await p.reload();await p.click('[data-action="continue"]');await p.click('[data-action="resume"]');assert.equal(await p.evaluate(()=>window.__ECHO__.game.enemies.length),1);
 await p.evaluate(()=>{const a=window.__ECHO__,g=a.game;g.hitEnemy(g.enemies[0],1e9,{noProc:true});g.pendingLevels=0;});await p.waitForFunction(()=>window.__ECHO__.game.rewardKind==='sector');
 for(let k=0;k<5;k++){
  await p.evaluate(k=>{const a=window.__ECHO__,g=new a.Game(44);g.sector=k*3+2;g.setupSector();g.time=g.duration+5;g.nextEvent=999;g.player.level=50;g.player.invuln=999;g.spawnBoss();g.boss.bossKind=k;g.boss.motionCD=0;g.boss.cd=99;g.player.x=1400;g.player.y=800;a.setGame(g);},k);
  await p.waitForFunction(()=>window.__ECHO__.game.boss.motion==='windup');await p.screenshot({path:`test-results/v3-boss-${k}-windup.png`});
  await p.waitForFunction(()=>window.__ECHO__.game.boss.motion==='strike');await p.waitForTimeout(160);await p.screenshot({path:`test-results/v3-boss-${k}-strike.png`});assert.equal(await p.evaluate(()=>window.__ECHO__.game.mode),'playing');
 }
 // Actual pixels change when the isolated player rig aims in another direction.
 const poses=await p.evaluate(()=>{const a=window.__ECHO__,r=a.renderer,g=a.game,c=r.ctx,actor={...g.player,x:120,y:120,invuln:0,moving:false,walk:0};function draw(angle){c.setTransform(1,0,0,1,0,0);c.fillStyle='#123';c.fillRect(0,0,240,240);actor.angle=angle;r.player(actor,false,g);return Array.from(c.getImageData(80,70,90,100).data).reduce((s,v,i)=>(s+v*(i+1))%1000000007,0);}return[draw(0),draw(Math.PI)];});assert.notEqual(poses[0],poses[1]);
 await p.keyboard.press('Escape');await p.click('[data-action="settings"]');assert(await p.locator('#sfxVolume').isVisible());await p.screenshot({path:'test-results/v3-audio.png'});
 assert.deepEqual(errors,[]);console.log('V3 PASS: live audio waveform/mute, softer music migration, clear-only transition/reload, five physical boss attacks, aim-dependent rig pixels. Audio peaks:',levels);
}finally{await b.close();}

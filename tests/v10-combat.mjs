// Deterministic stage-28 damage throughput fixture. Invulnerability isolates kill time;
// damage survivability is verified independently in v10.test.mjs.
import {Game,dist} from '../src/core.js';
import assert from 'node:assert/strict';
for(const frame of ['tempest','lance'])for(const seed of [42,1234,71829]){
 const g=new Game(seed);g.endless=true;g.sector=27;g.setupSector();g.bossSpawned=true;for(let i=0;i<4;i++)g.spawnGuardian(5+i,i,4);g.spawnClock=999;g.nextEvent=999;g.beacons=[];g.player.level=50;g.player.invuln=999;g.player.hp=g.player.maxHp=500;g.weapon={frame,rarity:'mythic',tier:6,element:'plain',mod:'giant'};g.basicLevels={rate:15,damage:30,health:20,move:5,crit:10,regen:8,cooldown:10};g.relics={focus:3,leviathan:2,binary:1,echo:3,chain:3,pierce:3};
 const total=g.bosses.reduce((n,e)=>n+e.hp,0);let time=0,maxBullets=0;
 while(g.bosses.length&&time<120){const p=g.player,target=g.bosses.reduce((a,b)=>dist(a,p)<dist(b,p)?a:b),angle=time*.5;g.update(.05,{mx:Math.cos(angle),my:Math.sin(angle),ax:target.x-p.x,ay:target.y-p.y,shoot:true,echo:true,dash:false});g.drain();maxBullets=Math.max(maxBullets,g.bullets.filter(b=>b.enemy).length);time+=.05;}
 console.log(JSON.stringify({seed,frame,stage:28,count:4,totalHP:Math.round(total),weaponDPS:Math.round(g.weaponDPS()),seconds:Number(time.toFixed(1)),remainingBosses:g.bosses.length,maxEnemyBullets:maxBullets}));assert.equal(g.bosses.length,0,`Late build exceeded two-minute target (${seed})`);assert(maxBullets<=80);
}

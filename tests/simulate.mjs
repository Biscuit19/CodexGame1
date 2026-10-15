import {Game,weaponInfo,RELICS,dist} from '../src/core.js';
import assert from 'node:assert/strict';
const seeds=process.argv.slice(2).map(Number);if(!seeds.length)seeds.push(42,1234,71829);
const ranking=['heart','lens','orbit','spring','chain','pierce','crown','binary','triad','shell','coat','glass','focus','blast','fire','magnet','echoheart','blackhole','phoenix','tide','boots','supply','echo','frost','capacitor','dash','luck','thorns'];
function scoreWeapon(w){const i=weaponInfo(w);return i.damage*i.count*i.rate*(i.homing?1.15:1)*(i.blast?1.4:1)*(i.pierce?1.2:1)*(i.count>1?.78:1);}
for(const seed of seeds){let g=new Game(seed,process.env.DIFFICULTY||'normal'),steps=0,lastSector=-1,bossStart=0,bossTimes=[],maxEnemies=0,maxBullets=0,restoreCount=0;let anchor=null;let chestRewards=0;let endlessStarted=false;const endlessUntil=Number(process.env.ENDLESS_UNTIL||0);
 while((g.mode!=='won'||(endlessUntil&&!endlessStarted))&&g.mode!=='dead'&&steps<110000){
  if(g.mode==='won'&&endlessUntil){g.startEndless();endlessStarted=true;lastSector=-1;}
  if(endlessStarted&&g.sector>=endlessUntil)break;
  if(g.mode==='choice'){if(g.rewardKind==='route'){g.openShop();if(g.player.hp<g.player.maxHp-30)g.buy('repair');if(g.player.rescues<2)g.buy('rescue');g.buy('forge');g.buy('relic');const w=g.shop.items.find(i=>i.id==='weapon');if(scoreWeapon(w.weapon)>scoreWeapon(g.weapon)*1.12)g.buy('weapon');g.closeShop();}
   let best=0,bestScore=-Infinity;
   g.choices.forEach((c,i)=>{let score=0;if(c.type==='relic')score=100-ranking.indexOf(c.id)*2+(g.count(c.id)?-3:0);if(c.type==='weapon')score=scoreWeapon(c.weapon)>scoreWeapon(g.weapon)*1.08?105:0;if(c.type==='heal')score=g.player.hp/g.player.maxHp<.45?130:10;if(c.type==='coins')score=50;if(c.type==='basicStat')score=({damage:90,rate:88,health:g.player.maxHp<240?115:g.player.hp/g.player.maxHp<.5?105:72,move:g.basicLevels.move<3?90:40,crit:75,regen:g.basicValue('regen')<.8?105:60,cooldown:70}[c.stat]||0)-g.basicLevels[c.stat]*.8;if(c.type==='training')score=35;if(c.type==='skillUpgrade')score=55;if(c.type==='route')score={quiet:100,treasure:70,echo:90,storm:10}[c.id];if(score>bestScore){bestScore=score;best=i;}});if(g.rewardKind==='chest')chestRewards++;g.choose(best);g.drain();continue;
  }
  if(g.sector!==lastSector){if(bossStart){bossTimes.push(Number((g.elapsed-bossStart).toFixed(1)));bossStart=0;}console.log(JSON.stringify({seed,sector:g.sector+1,time:Math.round(g.elapsed),hp:Math.round(g.player.hp),rescues:g.player.rescues,level:g.player.level,kills:g.kills,weapon:g.weapon.frame}));lastSector=g.sector;anchor=null;}
  if(g.boss&&!bossStart)bossStart=g.elapsed;
  const p=g.player,enemies=g.enemies.filter(e=>e.hp>0),nearest=enemies.reduce((best,e)=>!best||dist(e,p)<dist(best,p)?e:best,null);
  let target=g.chests.find(c=>c.cost<=p.coins&&dist(c,p)<600)||g.beacons.find(b=>!b.done)||{x:1100+Math.cos(g.elapsed*.055)*580,y:800+Math.sin(g.elapsed*.055)*430};
  let dx=target.x-p.x,dy=target.y-p.y,len=Math.hypot(dx,dy),mx=len>40?dx/len:0,my=len>40?dy/len:0;
  if(target.charge!==undefined&&len<70){mx=0;my=0;}
  for(const e of enemies){const d=dist(e,p);if(d<170){const strength=(170-d)/70;mx+=(p.x-e.x)/Math.max(1,d)*strength;my+=(p.y-e.y)/Math.max(1,d)*strength;}}
  for(const b of g.bullets){if(!b.enemy)continue;const d=dist(b,p);if(d<75){mx+=(p.x-b.x)/Math.max(1,d)*.8;my+=(p.y-b.y)/Math.max(1,d)*.8;}}
  for(const h of g.hazards){if(h.type==='circle'&&dist(h,p)<h.r+60){mx+=(p.x-h.x+5)/Math.max(1,dist(h,p))*2;my+=(p.y-h.y+5)/Math.max(1,dist(h,p))*2;}}
  if(p.x<100)mx+=2;if(p.x>2100)mx-=2;if(p.y<100)my+=2;if(p.y>1500)my-=2;
  const magnitude=Math.hypot(mx,my);if(magnitude>1){mx/=magnitude;my/=magnitude;}
  const aim=(g.boss&&(!nearest||dist(nearest,p)>160)?g.boss:nearest)||{x:p.x+1,y:p.y};
  g.update(.05,{mx,my,ax:aim.x-p.x,ay:aim.y-p.y,shoot:!!nearest,dash:!!nearest&&dist(nearest,p)<85,echo:enemies.length>=3||!!g.boss,interact:g.chests.some(c=>dist(c,p)<85&&c.cost<=p.coins)});g.drain();steps++;
  maxEnemies=Math.max(maxEnemies,g.enemies.length);maxBullets=Math.max(maxBullets,g.bullets.length);
  assert(Number.isFinite(g.player.hp)&&Number.isFinite(g.player.x));assert(g.enemies.length<=100);
  if(steps%10000===0&&['playing','choice'].includes(g.mode)){g=Game.restore(g.snapshot());restoreCount++;}
 }
 if(g.mode==='won'&&bossStart)bossTimes.push(Number((g.elapsed-bossStart).toFixed(1)));
 console.log('RESULT '+JSON.stringify({seed,sector:g.sector+1,mode:g.mode,time:Math.round(g.elapsed),minutes:(g.elapsed/60).toFixed(1),bossTimes,bossFights:g.stats.bossFights,chestRewards,cratesPerStage:Number((chestRewards/(g.sector+1)).toFixed(2)),skillUpgrades:g.skillUpgrades,basicLevels:g.basicLevels,maxHp:g.player.maxHp,bossKills:g.bossKills,missedBosses:g.missedBosses,forge:g.forgeLevel,coins:g.player.coins,level:g.player.level,kills:g.kills,rescues:g.player.rescues,hits:g.stats.hitsTaken,maxEnemies,maxBullets,restoreCount,relics:g.relics}));
 if(process.env.EXPECT_ENDLESS_LOSS==='1'){assert.equal(g.mode,'dead');assert(g.sector>=25&&g.sector<=33,`Pressure ended outside expected range: ${g.sector+1}`);}else if(g.mode!=='won'&&!(endlessStarted&&g.sector>=endlessUntil))process.exitCode=1;
}

export const VERSION=5;
export const BEACON_SECONDS=3.5;
export const RANGED_TYPES=new Set(["spitter","sniper","spiral","orbiter","healer","miner","lancer","mimic","summoner"]);
export const SECTOR_TIMES=[25,30,40,35,40,45,45,50,55,50,55,60,60,60,90];
export const endlessBossCount=n=>Math.min(5,1+Math.floor(Math.max(0,n-15)/3));
export const sectorDuration=n=>n>=15?60+(endlessBossCount(n)-1)*7.5:SECTOR_TIMES[n];
export const EVENT_NAMES={rain:'星雨漂流 · 星屑与修复落入海域',surge:'狂潮共振 · 敌群与射速同时增强',gravity:'失重海流 · 移动加速，敌弹减速',caravan:'漂流商队 · 靠近商店采购新货',elite:'悬赏猎场 · 35 秒内击败黄金精英',rescue:'无人信号 · 充能临时信标获得修复',invasion:'单侧突袭 · 预警方向将涌入大群敌人',pincer:'双翼夹击 · 两侧敌群即将合围',mines:'水雷漂流 · 躲开闪烁的爆破区域',hunt:'追猎时刻 · 高速追猎者进入战场',convoy:'装甲护送 · 击败运宝卫队',twins:'共生双子 · 击败两名共生精英',relay:'干扰阵列 · 清除脉冲哨兵',rift:'裂隙守卫 · 击败守卫赢取金箱',jackpot:'沉船金库 · 黄金物资漂入海域',overdrive:'超载供能 · 射速临时提升',meteor:'陨星风暴 · 连锁红色落点预警'};
export const WORLD={w:2200,h:1600};
export const TAU=Math.PI*2;
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export class RNG{
 constructor(seed=Date.now()){this.state=(Number(seed)>>>0)||1234567;}
 next(){let t=this.state+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);this.state>>>=0;return((t^t>>>14)>>>0)/4294967296;}
 int(a,b){return Math.floor(this.next()*(b-a+1))+a;}
 pick(a){return a[this.int(0,a.length-1)];}
 shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=this.int(0,i);[a[i],a[j]]=[a[j],a[i]];}return a;}
}
export const ZONES=[
 {name:'玻璃浅滩',sub:'THE GLASS SHOALS',color:'#84e5cb',dark:'#0b252d',motif:'glass',story:'海水退去后，第一座灯塔露出了轮廓。那些游荡的碎片，曾经也是星光。',boss:'拾骨鲸 · 莫尔'},
 {name:'绯红花圃',sub:'THE CORAL GARDENS',color:'#eea5b1',dark:'#291e32',motif:'coral',story:'花朵生长在旧日的钟声里。它们记得所有名字，却忘了自己的。',boss:'花冠女王 · 蕾莎'},
 {name:'星锈船坞',sub:'THE RUSTED ORBIT',color:'#e4bf82',dark:'#242a29',motif:'wreck',story:'搁浅的飞船还在发送信号。你听见一个声音说：别让最后一盏灯熄灭。',boss:'废铁司钟 · 九号'},
 {name:'倒影雪原',sub:'THE MIRROR FIELDS',color:'#a4baff',dark:'#18253d',motif:'crystal',story:'这里的影子比人先到一步。你与昨天的自己擦肩，交换了一个未完成的愿望。',boss:'无面镜师 · 伊欧'},
 {name:'长夜灯海',sub:'THE LAST LIGHT',color:'#dfd5a1',dark:'#19232d',motif:'light',story:'五条航线汇成一束光。海并不需要被征服，它只需要有人记得归途。',boss:'失落的灯塔 · 归零'}
];
export const RARITIES={common:{name:'标准',color:'#a0cebd',mult:1},rare:{name:'稀有',color:'#9cbcff',mult:1.18},epic:{name:'史诗',color:'#cc9eff',mult:1.4},legendary:{name:'传说',color:'#f3cf8a',mult:1.75},ancient:{name:'远古',color:'#ff9d77',mult:2.15},mythic:{name:'神话',color:'#f6a9ec',mult:2.6}};
export const FRAMES=[
 {id:'needle',name:'织光针',desc:'稳定连射 · 精准而轻快',damage:18,rate:6.3,speed:810,count:1,spread:.015,life:1.1,radius:3,icon:'⟡'},
 {id:'fan',name:'潮汐折扇',desc:'五发散射 · 近距离覆盖',damage:13,rate:1.8,speed:620,count:5,spread:.15,life:.75,radius:3.5,icon:'⋔'},
 {id:'rail',name:'地平线',desc:'高速穿透 · 贯穿一列敌人',damage:62,rate:1.25,speed:1250,count:1,spread:0,life:1.2,radius:4,pierce:3,icon:'⟶'},
 {id:'orbit',name:'卫星诗篇',desc:'追踪星弹 · 自动弯向目标',damage:21,rate:4.2,speed:480,count:1,spread:.09,life:1.8,radius:5,homing:3.2,icon:'◉'},
 {id:'bloom',name:'珊瑚花火',desc:'爆裂种子 · 小范围爆炸',damage:38,rate:1.8,speed:460,count:1,spread:.03,life:1.45,radius:6,blast:75,icon:'✺'},
 {id:'twin',name:'双生电报',desc:'平行双弹 · 双倍命中机会',damage:14,rate:4.5,speed:750,count:2,spread:.06,life:1.05,radius:3,icon:'Ⅱ'},
 {id:'crescent',name:'月牙信笺',desc:'宽幅回旋 · 穿过多个目标',damage:30,rate:2.3,speed:490,count:1,spread:0,life:1.6,radius:11,pierce:4,boomerang:true,icon:'☽'},
 {id:'prism',name:'棱镜合唱',desc:'三束分光 · 扇面穿透',damage:19,rate:2.7,speed:920,count:3,spread:.11,life:1,radius:3,pierce:1,icon:'◇'},
 {id:'comet',name:'慢速彗星',desc:'重型追踪 · 大范围星爆',damage:70,rate:.85,speed:310,count:1,spread:0,life:2.4,radius:8,blast:105,homing:1.1,icon:'✦'},
 {id:'rain',name:'倒置细雨',desc:'密集弹幕 · 射速极快',damage:10,rate:10,speed:730,count:1,spread:.16,life:1,radius:2.8,icon:'⋮'}
];
FRAMES.push(
 {id:'laser',name:'曙光切割器',desc:'瞬发光束 · 穿透整条射线',damage:78,rate:2.1,speed:1500,count:1,spread:0,life:.8,radius:5,beam:850,minSector:4,icon:'ϟ'},
 {id:'helix',name:'双螺旋',desc:'双股波形 · 交错穿透弹道',damage:25,rate:4,speed:650,count:2,spread:.02,life:1.4,radius:4,weave:110,pierce:1,minSector:4,icon:'∞'},
 {id:'accelerator',name:'破浪加速炮',desc:'蓄速重弹 · 沿途加速并穿透',damage:95,rate:1.3,speed:230,count:1,spread:0,life:1.7,radius:7,accel:1.7,pierce:4,minSector:6,icon:'»'},
 {id:'mine',name:'星雷布设器',desc:'投射星雷 · 落地后感应爆破',damage:90,rate:1.6,speed:440,count:1,spread:.06,life:2.7,radius:7,mine:true,blast:125,minSector:6,icon:'✺'},
 {id:'nova',name:'日冕环流',desc:'十二向星环 · 环绕齐射并穿透',damage:23,rate:2.2,speed:550,count:12,spread:.5235987756,life:1,radius:4,pierce:2,minSector:9,icon:'☼'},
 {id:'shard',name:'裂星母弹',desc:'追踪母弹 · 命中裂出六枚碎星',damage:85,rate:1.4,speed:520,count:1,spread:0,life:1.7,radius:7,homing:2,shatter:true,minSector:9,icon:'✧'},
 {id:'lance',name:'天穹长枪',desc:'超长重光束 · 大范围贯穿',damage:180,rate:1.25,speed:1800,count:1,spread:0,life:1,radius:12,beam:1300,minSector:12,icon:'⇢'},
 {id:'tempest',name:'万象风暴',desc:'五重追踪 · 加速星爆齐射',damage:40,rate:2.7,speed:400,count:5,spread:.18,life:1.7,radius:5,homing:3,blast:65,accel:.65,minSector:12,icon:'✦'}
);
export const BOSSES=[...ZONES.map(z=>({name:z.boss,color:z.color})),
 {name:'雷翼审判者',color:'#e8a6f4'}, {name:'深渊炮舰',color:'#dfa885'}, {name:'星轨织蛛',color:'#a9c8f5'}, {name:'熔潮巨钳',color:'#f39886'}, {name:'时空牧星者',color:'#c1b5f6'}];
export const ELEMENTS=[{id:'plain',name:'原光',color:'#b1f9d6'},{id:'frost',name:'霜语',color:'#9bdaff'},{id:'fire',name:'余烬',color:'#ffb07d'},{id:'shock',name:'雷鸣',color:'#e1bbff'},{id:'void',name:'虚星',color:'#c5a3ff'}];
export const MODS=[{id:'steady',name:'归航',desc:'稳定的原型结构'},{id:'split',name:'繁星',desc:'额外弹道，单发伤害稍低'},{id:'vampire',name:'拾心',desc:'每次击败敌人有概率修复生命'},{id:'ricochet',name:'折返',desc:'弹药触及海域边缘会反射'},{id:'echo',name:'复写',desc:'分身伤害提高，回声冷却缩短'},{id:'giant',name:'巨像',desc:'弹体更大，伤害提高 20%'},{id:'lucky',name:'奇迹',desc:'提高暴击率和珍稀物资概率'}];
export function rollWeapon(rng,sector=0,forced){
 const r=rng.next();let rarity=forced||(sector>=12?(r<.18?'mythic':r<.5?'ancient':r<.92?'legendary':'epic'):sector>=9?(r<.24?'ancient':r<.82?'legendary':'epic'):sector>=6?(r<.48?'legendary':'epic'):sector>=3?(r<.12?'legendary':r<.6?'epic':'rare'):(r<.025?'legendary':r<.15?'epic':r<.5?'rare':'common'));
 if(sector>=9&&['common','rare','epic'].includes(rarity))rarity='legendary';if(sector>=9&&rarity==='legendary'&&rng.next()<.3)rarity=sector>=12&&rng.next()<.4?'mythic':'ancient';
 if(sector<9&&['ancient','mythic'].includes(rarity))rarity='legendary';if(sector<12&&rarity==='mythic')rarity='ancient';
 const pool=FRAMES.filter(f=>(f.minSector||0)<=sector),newest=pool.filter(f=>(f.minSector||0)>=Math.max(4,sector>=12?9:sector>=9?6:4));
 const frame=rng.pick(newest.length&&rng.next()<.6?newest:pool),element=rng.pick(ELEMENTS),mod=rng.pick(MODS);
 return{frame:frame.id,element:element.id,mod:mod.id,rarity,tier:Math.floor(sector/3),name:`${mod.name}·${element.name}${frame.name}`};
}
export function weaponInfo(w){const f=FRAMES.find(x=>x.id===w.frame)||FRAMES[0];const el=ELEMENTS.find(x=>x.id===w.element)||ELEMENTS[0];const mod=MODS.find(x=>x.id===w.mod)||MODS[0];return{...f,el,modifier:mod,rarityInfo:RARITIES[w.rarity],damage:f.damage*RARITIES[w.rarity].mult*(1+w.tier*.14)*(w.mod==='giant'?1.2:1)*(w.mod==='split'?.78:1),count:f.count+(w.mod==='split'?1:0),radius:f.radius*(w.mod==='giant'?1.45:1)};}
export const RELICS=[
 {id:'lens',name:'潮光透镜',icon:'◇',desc:'所有伤害 +16%',max:5,rarity:'common'},
 {id:'spring',name:'钟表发条',icon:'⟳',desc:'射速 +12%',max:5,rarity:'common'},
 {id:'shell',name:'温暖贝壳',icon:'◡',desc:'生命上限 +25，并修复 25 生命',max:5,rarity:'common'},
 {id:'boots',name:'轻羽船靴',icon:'»',desc:'移动速度 +10%',max:3,rarity:'common'},
 {id:'magnet',name:'星屑罗盘',icon:'⊕',desc:'拾取范围 +65，经验获取 +10%',max:3,rarity:'common'},
 {id:'heart',name:'缓慢心跳',icon:'♡',desc:'每秒恢复 0.22 生命',max:4,rarity:'rare'},
 {id:'glass',name:'风暴玻璃',icon:'✧',desc:'暴击率 +12%，暴击造成双倍伤害',max:4,rarity:'rare'},
 {id:'coat',name:'深海雨衣',icon:'⌂',desc:'受到的伤害降低 10%（最多 40%）',max:4,rarity:'rare'},
 {id:'dash',name:'空白邮票',icon:'↗',desc:'折光冲刺冷却缩短 18%',max:3,rarity:'rare'},
 {id:'echo',name:'旧日胶片',icon:'▣',desc:'回声持续时间 +2 秒，冷却缩短 10%',max:3,rarity:'rare'},
 {id:'thorns',name:'荆棘唱片',icon:'✳',desc:'受伤时向周围发出反击星弹',max:2,rarity:'rare'},
 {id:'frost',name:'冻结时刻',icon:'❄',desc:'弹药有 25% 概率减速敌人',max:2,rarity:'rare'},
 {id:'fire',name:'不灭火柴',icon:'♨',desc:'弹药附加灼烧，每秒造成 8 点伤害',max:3,rarity:'rare'},
 {id:'chain',name:'连心铜线',icon:'⌁',desc:'命中有 25% 概率电弧连接邻近敌人',max:3,rarity:'epic'},
 {id:'pierce',name:'透明海图',icon:'⇢',desc:'所有弹药额外穿透一个敌人',max:3,rarity:'epic'},
 {id:'blast',name:'口袋超新星',icon:'✺',desc:'敌人被击败时有 25% 概率爆炸',max:2,rarity:'epic'},
 {id:'orbit',name:'迷途小卫星',icon:'◉',desc:'增加一枚环绕卫星，自动攻击附近敌人',max:3,rarity:'epic'},
 {id:'tide',name:'月亮的欠条',icon:'☾',desc:'涨潮时伤害 +35%，退潮时恢复速度提升',max:2,rarity:'epic'},
 {id:'echoheart',name:'他日来信',icon:'✉',desc:'施放回声时恢复 15 生命',max:2,rarity:'epic'},
 {id:'luck',name:'四叶天线',icon:'♧',desc:'更容易发现史诗、传说枪械；星币 +25%',max:3,rarity:'rare'},
 {id:'capacitor',name:'海盐电容',icon:'ϟ',desc:'冲刺结束时清除附近敌弹并伤害敌人',max:2,rarity:'epic'},
 {id:'crown',name:'无王之冠',icon:'♔',desc:'所有伤害 +40%，生命上限 +30',max:1,rarity:'legendary'},
 {id:'binary',name:'另一种人生',icon:'∞',desc:'同时召唤两个回声，分身伤害提高',max:1,rarity:'legendary'},
 {id:'phoenix',name:'最后一根灯芯',icon:'♜',desc:'增加一次满血救援机会',max:2,rarity:'legendary'},
 {id:'blackhole',name:'瓶装黑夜',icon:'●',desc:'每 8 秒在最近敌人处生成引力漩涡',max:1,rarity:'legendary'},
 {id:'triad',name:'三相余响',icon:'△',desc:'每第三轮射击额外释放一圈星弹',max:1,rarity:'legendary'},
 {id:'supply',name:'远洋便当',icon:'▤',desc:'每个航段额外修复 16 生命，击败敌人更易掉落补给',max:3,rarity:'common'},
 {id:'focus',name:'守灯人的眼睛',icon:'◎',desc:'对首领和精英伤害 +30%',max:3,rarity:'rare'}
];
export const ENEMIES={
 drifter:{name:'漂流者',hp:38,speed:145,r:17,damage:10,xp:5,color:'#adc6b8'},
 skitter:{name:'剪影蟹',hp:25,speed:220,r:15,damage:8,xp:5,color:'#ecc69a'},
 spitter:{name:'墨水花',hp:52,speed:96,r:19,damage:10,xp:8,color:'#eab0c0'},
 charger:{name:'撞钟鱼',hp:75,speed:118,r:22,damage:16,xp:10,color:'#edab87'},
 shield:{name:'镜壳',hp:115,speed:100,r:24,damage:13,xp:12,color:'#9dbbd1'},
 summoner:{name:'育梦水母',hp:95,speed:82,r:23,damage:9,xp:15,color:'#bcacd8'},
 bomber:{name:'空心灯笼',hp:42,speed:172,r:17,damage:18,xp:9,color:'#e9d89b'},
 sniper:{name:'航标眼',hp:56,speed:90,r:18,damage:14,xp:11,color:'#98caca'},
 spiral:{name:'旋转星蕨',hp:80,speed:100,r:20,damage:11,xp:12,color:'#b9bbeb'},
 leaper:{name:'跃潮蛙',hp:58,speed:155,r:18,damage:17,xp:9,color:'#cbec91'},
 splitter:{name:'裂殖乌贼',hp:95,speed:112,r:22,damage:13,xp:12,color:'#f2a2c7'},
 healer:{name:'海妖医师',hp:72,speed:104,r:19,damage:9,xp:14,color:'#a1f0cd'},
 orbiter:{name:'盘旋鹦鹉螺',hp:82,speed:175,r:20,damage:13,xp:11,color:'#cab9fb'},
 miner:{name:'布雷海龙',hp:100,speed:115,r:22,damage:19,xp:13,color:'#e7c48d'},
 reaper:{name:'潜影追猎者',hp:78,speed:205,r:19,damage:18,xp:13,color:'#ad9de6'},
 lancer:{name:'穿潮枪兵',hp:90,speed:138,r:20,damage:17,xp:12,color:'#ffaaa0'},
 mimic:{name:'拾金贼',hp:125,speed:190,r:19,damage:11,xp:20,color:'#f4d987'}
};
export const ROUTES=[
 {id:'quiet',name:'寂静航道',icon:'☾',desc:'敌人稍少；下一航段开始时恢复 35 生命。',tag:'休整 · 更安全'},
 {id:'treasure',name:'漂金暗流',icon:'✧',desc:'星币与宝箱增多；更容易找到珍稀枪械。',tag:'宝藏 · 寻找惊喜'},
 {id:'storm',name:'风暴捷径',icon:'ϟ',desc:'敌人稍强；经验 +30%，完成航段获得额外升级。',tag:'挑战 · 加速成长'},
 {id:'echo',name:'回声支流',icon:'∞',desc:'回声技能恢复更快，补给信标充能更快。',tag:'回声 · 技能共鸣'}
];
const emptyInput=()=>({mx:0,my:0,ax:1,ay:0,shoot:false,dash:false,echo:false,interact:false});
export class Game{
 constructor(seed=Date.now(),difficulty='normal'){
 this.rng=new RNG(seed);this.seed=seed;this.difficulty=difficulty;this.mode='playing';this.sector=0;this.time=0;this.elapsed=0;this.duration=sectorDuration(0);this.endless=false;this.campaignCleared=false;this.resultRecorded=false;this.missedBosses=0;this.forgeLevel=0;this.shop=null;this.shopReturn='playing';this.collectionTime=0;this.settlementPending=false;this.collectedChests=[];this.stageBossKills=0;this.rewardSource='';this.beaconRewarded=false;this.eventSerial=0;this.supplyBoost=0;this.rewardRerolls=0;this.incursions=[];this.nextEvent=12;this.eventHistory=[];this.waveCount=0;this.shopVisits=0;this.kills=0;this.shots=0;this.totalDamage=0;this.id=1;this.route='quiet';this.events=[];this.pendingLevels=0;this.choices=[];this.rewardKind='';this.bossSpawned=false;this.bossKills=0;this.storySeen=false;
 this.player={x:1100,y:800,r:16,hp:140,maxHp:140,xp:0,level:1,coins:0,rescues:2,angle:0,invuln:2,dashCD:0,echoCD:0,dashTime:0,dx:0,dy:0,shotCD:0,regenClock:0};
 this.weapon={frame:'needle',element:'plain',mod:'steady',rarity:'common',tier:0,name:'归航·原光织光针'};this.relics={};this.enemies=[];this.bullets=[];this.pickups=[];this.effects=[];this.hazards=[];this.echoes=[];this.history=[];this.historyClock=0;this.beacons=[];this.chests=[];this.activeEvent=null;this.eventIndex=0;this.spawnClock=2;this.satelliteClock=0;this.blackholeClock=4;this.stats={hitsTaken:0,rareFinds:0,beacons:0,echoes:0,dashes:0};this.setupSector();
 }
 emit(type,data={}){this.events.push({type,...data});}
 drain(){const e=this.events;this.events=[];return e;}
 get zone(){return ZONES[Math.floor(this.sector/3)%5];}
 get highTide(){return Math.floor(this.time/24)%2===1;}
 get bosses(){return this.enemies.filter(e=>e.boss&&e.hp>0);}
 get boss(){return this.bosses[0];}
 get stageBossTarget(){return this.endless?endlessBossCount(this.sector):this.sector===14?2:this.sector%3===2?1:0;}
 weaponDPS(w=this.weapon){const i=weaponInfo(w);return i.damage*i.count*i.rate*this.damageMult*(1+this.count("spring")*.12);}
 get xpNeed(){return Math.floor(38+this.player.level*22+this.player.level**1.8*7);}
 count(id){return this.relics[id]||0;}
 get damageMult(){return(1+this.count('lens')*.16+this.count('crown')*.4+this.forgeLevel*.12)*(this.highTide?1+this.count('tide')*.35:1);}
 get speed(){return 235*(1+this.count('boots')*.1)*(this.activeEvent?.id==='gravity'?1.15:1);}
 get dashMax(){return Math.max(.65,3.5*Math.pow(.97,this.supplyBoost)*Math.pow(.82,this.count('dash')));}
 get clearing(){return this.time>=this.duration;}
 get echoMax(){return Math.max(2.5,14*Math.pow(.97,this.supplyBoost)*Math.pow(.9,this.count('echo'))*(this.route==='echo'?.72:1)*(this.weapon.mod==='echo'?.8:1));}
 setupSector(){
 this.time=0;this.collectionTime=0;this.settlementPending=false;this.collectedChests=[];this.stageBossKills=0;this.beaconRewarded=false;this.duration=sectorDuration(this.sector);this.incursions=[];this.nextEvent=this.rng.int(10,15);this.eventIndex=0;this.activeEvent=null;this.spawnClock=.5;this.shop=this.makeShop();this.rewardRerolls=0;this.waveCount=0;this.bossSpawned=false;this.enemies=[];this.bullets=[];this.hazards=[];this.pickups=[];this.echoes=[];this.history=[];this.chests=[];this.effects=[];this.player.x=1100;this.player.y=800;this.player.invuln=3;this.player.dashTime=0;
 const offset=this.rng.next()*TAU;this.beacons=Array.from({length:3},(_,i)=>({id:this.id++,x:1100+Math.cos(offset+i*TAU/3)*500,y:800+Math.sin(offset+i*TAU/3)*430,charge:0,done:false}));
 this.chests.push({id:this.id++,x:1100+this.rng.int(-240,240),y:800-260,type:'supply',cost:0});
 this.composition=this.rng.shuffle(['spitter','charger','shield','leaper','orbiter','splitter','healer','sniper','miner','reaper','lancer','bomber','summoner','spiral']).slice(0,3+Math.min(4,Math.floor(this.sector/3)));this.emit('sector',{sector:this.sector,story:this.zone.story});
 }
 addRelic(id){const r=RELICS.find(r=>r.id===id);if(!r||this.count(id)>=r.max)return false;this.relics[id]=this.count(id)+1;if(id==='shell'){this.player.maxHp+=25;this.heal(25);}if(id==='crown'){this.player.maxHp+=30;this.heal(30);}if(id==='phoenix')this.player.rescues=Math.min(5,this.player.rescues+1);return true;}
 heal(n){this.player.hp=Math.min(this.player.maxHp,this.player.hp+n);}
 gainXP(n){this.player.xp+=n*(1+this.count('magnet')*.1)*(this.route==='storm'?1.3:1);while(this.player.xp>=this.xpNeed){this.player.xp-=this.xpNeed;this.player.level++;this.pendingLevels++;this.heal(5);}}
 relicChoices(n=3,minimum){
 const pool=RELICS.filter(r=>this.count(r.id)<r.max&&(r.id!=='phoenix'||this.player.rescues<5));let weighted=[];for(const r of pool){let w={common:8,rare:5,epic:2,legendary:.6}[r.rarity];if(minimum==='epic')w={common:0,rare:1,epic:5,legendary:2}[r.rarity];weighted.push({r,key:-Math.log(Math.max(.00001,this.rng.next()))/Math.max(.00001,w)});}return weighted.sort((a,b)=>a.key-b.key).slice(0,n).map(x=>({type:'relic',id:x.r.id}));
 }
 offerLevel(){this.pendingLevels--;this.mode='choice';this.rewardKind='level';this.choices=this.relicChoices();if(!this.choices.length){this.choices=[{type:'heal',amount:60},{type:'coins',amount:100}];}this.emit('choice');}
 choose(i){
 if(this.mode!=='choice'||!this.choices[i])return false;const c=this.choices[i];
 if(c.type==='relic')this.addRelic(c.id);if(c.type==='weapon'){this.weapon=c.weapon;this.stats.rareFinds+=['epic','legendary','ancient','mythic'].includes(c.weapon.rarity)?1:0;}
 if(c.type==='heal')this.heal(c.amount);if(c.type==='experience')this.gainXP(c.amount);if(c.type==='rescue')this.player.rescues=Math.min(5,this.player.rescues+1);if(c.type==='forge')this.forgeLevel=Math.min(20,this.forgeLevel+1);if(c.type==='capacity'){this.player.maxHp+=c.amount;this.heal(c.amount);}if(c.type==='skill'){this.player.dashCD=0;this.player.echoCD=0;this.supplyBoost+=1;}if(c.type==='coins')this.player.coins+=c.amount;
 if(c.type==='route'){this.route=c.id;this.sector++;this.mode='playing';this.choices=[];this.rewardKind='';this.heal(18+this.count('supply')*16+(c.id==='quiet'?20:0));this.setupSector();return true;}
 if(this.rewardKind==='sector'){this.offerRoutes();return true;}
 if(this.settlementPending){this.nextCollectedChest();return true;}this.mode='playing';this.choices=[];this.emit('resume');return true;
 }
 skipChoice(){if(this.mode!=='choice'||this.rewardKind!=='chest')return;this.player.coins+=20;if(this.settlementPending){this.nextCollectedChest();return;}this.mode='playing';this.emit('resume');}
 offerRoutes(){this.mode='choice';this.rewardKind='route';this.choices=[{type:'route',id:this.rng.pick(ROUTES).id}];this.emit('choice');}
 finishSector(){
 if(this.mode!=='playing'||this.enemies.some(e=>e.hp>0)||this.incursions.length)return;
 if(!this.collectionTime){this.settlementPending=true;this.collectionTime=1.3;this.bullets=[];this.hazards=[];this.echoes=[];this.emit('collect');return;}
 return;
 }
 collectPickup(item){if(item.kind==='xp')this.gainXP(item.value);if(item.kind==='coin')this.player.coins+=Math.round(item.value*(1+this.count('luck')*.25)*(this.route==='treasure'?1.5:1));if(item.kind==='heal')this.heal(item.value);}
 completeSector(){
 for(const item of this.pickups)this.collectPickup(item);this.pickups=[];this.collectionTime=0;this.enemies=[];this.activeEvent=null;
 this.collectedChests.push(...this.chests);this.chests=[];this.nextCollectedChest();
 }
 nextCollectedChest(){
 const c=this.collectedChests.shift();if(c){this.mode='choice';this.rewardKind='chest';this.rewardSource=`清场自动拾取 · ${c.type==='relic'?'黄金物资箱':'物资箱'}奖励${this.collectedChests.length?`（还剩 ${this.collectedChests.length} 箱）`:''}`;this.choices=this.chestChoices(c.type==='relic');this.emit('choice');return;}
 this.settlementPending=false;this.completeSectorRewards();
 }
 completeSectorRewards(){
 if(this.sector===14&&!this.endless){this.campaignCleared=true;this.mode='won';this.emit('win');return;}
 this.player.coins+=60;this.heal(20);if(this.route==='storm')this.pendingLevels++;
 this.mode='choice';this.rewardKind='sector';this.rewardSource=this.stageBossKills?'击败首领 · 航段清场奖励':'航段清场奖励';this.choices=this.relicChoices(2,this.stageBossKills?'epic':undefined);this.choices.push({type:'weapon',weapon:rollWeapon(this.rng,this.sector+1,this.stageBossKills?'epic':undefined)});if(this.sector>=6)this.choices[1]={type:'weapon',weapon:rollWeapon(this.rng,this.sector+1)};this.emit('choice');
 }
 chestChoices(gold=false){const pool=[...this.relicChoices(2,gold?'epic':undefined),{type:'weapon',weapon:rollWeapon(this.rng,this.sector,gold?'legendary':this.rng.next()<.3?'epic':undefined)},{type:'experience',amount:100+this.sector*25},{type:'capacity',amount:20},...(this.forgeLevel<20?[{type:'forge'}]:[]),{type:'skill'},{type:'coins',amount:45+this.rng.int(0,80)}];if(this.player.hp<this.player.maxHp*.75)pool.push({type:'heal',amount:85});if(this.player.rescues<5)pool.push({type:'rescue'});const selected=this.rng.shuffle(pool).slice(0,3);if(this.sector>=6)selected[1]={type:'weapon',weapon:rollWeapon(this.rng,this.sector)};if(gold)selected[0]={type:'weapon',weapon:rollWeapon(this.rng,this.sector,'legendary')};return selected;}
 tryChest(){
 const c=this.chests.find(c=>dist(c,this.player)<90);if(!c){if(dist(this.player,{x:1100,y:800})<120)this.openShop();return;}
 if(this.player.coins<c.cost){this.emit('toast',{text:`需要 ${c.cost} 枚星币`});return;}
 this.player.coins-=c.cost;this.chests=this.chests.filter(x=>x!==c);this.mode='choice';this.rewardKind='chest';
 this.rewardSource=c.type==='relic'?'黄金物资箱奖励':'物资箱奖励';this.choices=this.chestChoices(c.type==='relic');this.emit('choice');
 }
 spawnEnemy(type,opts={}){
 if(this.enemies.filter(e=>e.hp>0).length>=68&&!opts.boss){if(!opts.elite)return null;const expendable=this.enemies.find(e=>!e.boss&&!e.elite&&e.hp>0);if(expendable)expendable.hp=0;else return null;}
 const def=ENEMIES[type]||ENEMIES.drifter,p=this.player,angle=this.rng.next()*TAU;
 const mult=1+this.sector*.2+this.sector**2*.05+this.sector**3*.009+Math.max(0,this.sector-14)*.5;const x=clamp(p.x+Math.cos(angle)*this.rng.int(470,660),45,WORLD.w-45),y=clamp(p.y+Math.sin(angle)*this.rng.int(390,570),45,WORLD.h-45);
 const e={id:this.id++,type,x,y,r:def.r,hp:def.hp*mult,maxHp:def.hp*mult,speed:def.speed*(1+Math.min(24,this.sector)*.014)*(this.difficulty==='relaxed'?.9:1),damage:def.damage*(1+this.sector*.025),xp:def.xp,color:def.color,age:0,cd:this.rng.next()*2+1,phase:0,slow:0,burn:0,burnDmg:0,hit:0,vx:0,vy:0,...opts};
 if(this.route==='storm'&&!opts.boss){e.hp*=1.15;e.maxHp=e.hp;}
 if(dist(e,p)<235&&!opts.x){const away=Math.atan2(WORLD.h/2-p.y,WORLD.w/2-p.x);e.x=clamp(p.x+Math.cos(away)*430,40,2160);e.y=clamp(p.y+Math.sin(away)*430,40,1560);}
 if(!opts.boss&&!opts.elite&&this.sector>0&&this.rng.next()<.12){e.affix=this.rng.pick(['haste','armored','volatile']);if(e.affix==='haste')e.speed*=1.3;if(e.affix==='armored'){e.hp*=1.6;e.maxHp=e.hp;}}
 this.enemies.push(e);return e;
 }
 spawnBoss(){
 this.bossSpawned=true;const count=this.stageBossTarget||1,lateStart=this.sector>=8?this.rng.int(0,4):0;
 for(let i=0;i<count;i++)this.spawnGuardian(this.sector>=8?(5+(lateStart+i)%5):(Math.floor(this.sector/3)+i)%5,i,count);
 this.emit('boss',{text:`首领战 · ${count} 位守卫出现`});this.emit('sound',{name:'boss'});
 }
 spawnGuardian(kind=0,index=0,total=1,special=false){
 const hp=(this.endless?430000:[9000,65000,190000,360000,660000][Math.floor(Math.min(this.sector,14)/3)])*(this.difficulty==='relaxed'?.8:1)*(1+Math.max(0,this.sector-14)*(this.endless?.055:.16))*(special?.3:1)*(this.endless?1/Math.pow(total,.65):total>1?.75:1);
 const a=-Math.PI/2+index*TAU/total,p=this.player;
 return this.spawnEnemy('shield',{boss:true,special,bossKind:kind,name:special?'裂隙守卫':BOSSES[kind].name,r:52+(kind%5)*2,hp,maxHp:hp,x:clamp(p.x+Math.cos(a)*360,90,2110),y:clamp(p.y+Math.sin(a)*300,90,1510),speed:130+Math.min(24,this.sector)*7,damage:28+Math.min(24,this.sector)*2,xp:180,cd:2+index*.6,phase:0,color:BOSSES[kind].color});
 }
 startEvent(forced){
 const ids=Object.keys(EVENT_NAMES).filter(id=>!this.eventHistory.slice(-2).includes(id));const id=forced||this.rng.pick(ids);this.eventHistory.push(id);if(this.eventHistory.length>8)this.eventHistory.shift();
 if(this.activeEvent?.targets?.some(id=>this.enemies.some(e=>e.id===id&&e.hp>0)))return;const before=new Set(this.enemies.map(e=>e.id));this.activeEvent={id,left:id==='elite'?35:22,serial:++this.eventSerial,targets:[]};
 const p=this.player;
 if(id==='rain')for(let i=0;i<18;i++)this.pickups.push({id:this.id++,x:clamp(p.x+this.rng.int(-300,300),25,2175),y:clamp(p.y+this.rng.int(-240,240),25,1575),kind:i%5===0?'heal':'xp',value:i%5===0?10:9,age:0});
 if(id==='caravan'){this.shop=this.makeShop(true);this.chests.push({id:this.id++,x:clamp(p.x+100,40,2160),y:p.y,type:'supply',cost:55});}
 if(id==='elite')this.spawnEnemy(this.rng.pick(['charger','orbiter','lancer']),{elite:true,ttl:35,hp:1800*(1+this.sector*.6+this.sector**2*.3),maxHp:1800*(1+this.sector*.6+this.sector**2*.3),r:31,speed:175,color:'#ffe190',xp:90});
 if(id==='rescue')this.beacons.push({id:this.id++,x:clamp(p.x+180,100,2100),y:clamp(p.y-120,100,1500),charge:0,done:false,temporary:true});
 if(id==='invasion'||id==='pincer'){
 const dir=this.rng.int(0,3),dirs=id==='pincer'?[dir,(dir+2)%4]:[dir];
 for(const side of dirs){const a=side*Math.PI/2;this.incursions.push({id:this.id++,x:clamp(p.x+Math.cos(a)*560,65,2135),y:clamp(p.y+Math.sin(a)*450,65,1535),wait:2.7,count:Math.round((9+Math.min(10,this.sector))*.7),eventSerial:this.activeEvent.serial,side,type:this.rng.pick(['drifter','skitter','leaper','reaper'])});}
 }
 if(id==='mines')for(let i=0;i<7;i++){const a=this.rng.next()*TAU;this.hazards.push({id:this.id++,type:'circle',x:clamp(p.x+Math.cos(a)*(130+i*32),50,2150),y:clamp(p.y+Math.sin(a)*(130+i*32),50,1550),r:60,wait:2+i*.22,life:.45,damage:23,fired:false});}
 if(id==='hunt')for(let i=0;i<8+Math.min(8,Math.floor(this.sector/2));i++)this.spawnEnemy('reaper');
 if(id==='convoy')for(let i=0;i<4;i++)this.spawnEnemy(i===0?'mimic':'shield',{specialType:i===0?'treasurer':'guardian',hp:(400+this.sector**2*55)*(i===0?2:1),maxHp:(400+this.sector**2*55)*(i===0?2:1),r:27,color:'#f0c47c'});
 if(id==='twins')for(let i=0;i<2;i++)this.spawnEnemy('reaper',{specialType:'twin',hp:700+this.sector**2*100,maxHp:700+this.sector**2*100,r:30,color:'#e99bc9',speed:195});
 if(id==='relay')for(let i=0;i<3;i++)this.spawnEnemy('spiral',{specialType:'sentinel',hp:400+this.sector**2*50,maxHp:400+this.sector**2*50,speed:45,r:26,color:'#ed8f98'});
 if(id==='rift'){const e=this.spawnGuardian(this.rng.int(0,this.sector>=8?9:4),0,1,true);e.specialType='rift';}
 if(id==='jackpot')this.chests.push({id:this.id++,x:clamp(p.x+120,50,2150),y:p.y,type:'relic',cost:0});
 if(id==='overdrive'){this.heal(30);p.dashCD=0;p.echoCD=0;}
 if(id==='meteor')for(let i=0;i<8;i++)this.hazards.push({id:this.id++,type:'circle',x:clamp(p.x+this.rng.int(-250,250),60,2140),y:clamp(p.y+this.rng.int(-200,200),60,1540),r:75,wait:1.4+i*.35,life:.3,damage:24,fired:false});
 this.activeEvent.targets=this.enemies.filter(e=>!before.has(e.id)&&e.hp>0).map(e=>e.id);this.activeEvent.combat=['elite','hunt','convoy','twins','relay','rift','invasion','pincer'].includes(id);
 this.emit('event',{text:EVENT_NAMES[id]});
 }
 makeShop(sale=false){const relic=this.relicChoices(1)[0];return{sale,rerolls:0,rescueBuys:0,items:[{id:'repair',name:'应急修复',desc:'立即恢复 65 生命',cost:40,type:'heal',amount:65},
 {id:'forge',name:'武器校准',desc:'所有武器伤害 +12%，可叠加到 20 级，费用递增',cost:Math.round(75*1.35**this.forgeLevel),type:'forge'},
 {id:'rescue',name:'救援信标',desc:'增加一次满血救援机会',cost:190,type:'rescue'},
 {id:'relic',name:'遗物寄售',cost:sale?200:280,type:'relic',relic:relic?.id,sold:!relic},
 {id:'weapon',name:'珍稀武器',cost:sale?300:420,type:'weapon',weapon:rollWeapon(this.rng,this.sector,this.sector>=6?undefined:this.rng.next()<.12?'legendary':'epic')}]};}
 openShop(){if(this.collectionTime>0)return false;if(!['playing','choice'].includes(this.mode))return false;if(this.mode==='playing'&&dist(this.player,{x:1100,y:800})>120)return false;if(this.mode==='choice'&&this.rewardKind!=='route')return false;this.shopReturn=this.mode;this.mode='shop';this.shopVisits++;this.emit('shop');return true;}
 closeShop(){if(this.mode!=='shop')return;this.mode=this.shopReturn;if(this.mode==='choice')this.emit('choice');else this.emit('resume');}
 buy(id){if(this.mode!=='shop')return false;const it=this.shop.items.find(i=>i.id===id);if(!it||it.sold||this.player.coins<it.cost)return false;
 if(it.type==='heal'&&this.player.hp>=this.player.maxHp)return false;if(it.type==='forge'&&this.forgeLevel>=20)return false;if(it.type==='rescue'&&this.player.rescues>=5)return false;
 if(it.type==='relic'&&!this.addRelic(it.relic))return false;
 this.player.coins-=it.cost;
 if(it.type==='heal'){this.heal(it.amount);it.cost+=15;}
 if(it.type==='forge'){this.forgeLevel++;it.cost=Math.round(75*1.35**this.forgeLevel);}
 if(it.type==='rescue'){this.player.rescues++;this.shop.rescueBuys++;it.cost+=100;}
 if(it.type==='weapon'){this.weapon=it.weapon;this.stats.rareFinds++;}
 if(['weapon','relic'].includes(it.type))it.sold=true;
 this.emit('sound',{name:'select'});return true;}
 rerollShop(){if(this.mode!=='shop')return false;const cost=30+this.shop.rerolls*15;if(this.player.coins<cost)return false;this.player.coins-=cost;const rerolls=this.shop.rerolls+1,old=this.shop;this.shop=this.makeShop(old.sale);this.shop.rerolls=rerolls;this.shop.rescueBuys=old.rescueBuys;for(const id of ['repair','rescue'])this.shop.items.find(i=>i.id===id).cost=old.items.find(i=>i.id===id).cost;return true;}
 rerollReward(){if(this.mode!=='choice'||this.rewardKind!=='level')return false;const cost=25+this.rewardRerolls*15;if(this.player.coins<cost)return false;this.player.coins-=cost;this.rewardRerolls++;this.choices=this.relicChoices();if(!this.choices.length)this.choices=[{type:'heal',amount:60},{type:'coins',amount:100}];this.emit('choice');return true;}
 startEndless(){if(this.mode!=='won'||!this.campaignCleared)return false;this.endless=true;this.resultRecorded=false;this.sector=15;this.mode='playing';this.player.rescues=Math.max(1,this.player.rescues);this.heal(this.player.maxHp);this.setupSector();return true;}
 updateDirector(dt){
 for(const wave of this.incursions){wave.wait-=dt;if(wave.wait<=0&&!wave.spawned){wave.spawned=true;this.waveCount++;for(let i=0;i<wave.count;i++){let x=clamp(wave.x+this.rng.int(-85,85),30,2170),y=clamp(wave.y+this.rng.int(-85,85),30,1570);if(Math.hypot(x-this.player.x,y-this.player.y)<160){const a=Math.atan2(y-this.player.y,x-this.player.x);x=clamp(this.player.x+Math.cos(a)*210,30,2170);y=clamp(this.player.y+Math.sin(a)*210,30,1570);}const e=this.spawnEnemy(wave.type,{x,y});if(e&&this.activeEvent?.serial===wave.eventSerial)this.activeEvent.targets.push(e.id);}}}
 this.incursions=this.incursions.filter(w=>!w.spawned);
 if(this.activeEvent){const ev=this.activeEvent;ev.left-=dt;if(ev.combat){const alive=ev.targets.some(id=>this.enemies.some(e=>e.id===id&&e.hp>0));const pending=this.incursions.some(w=>w.eventSerial===ev.serial);if(!alive&&!pending){this.emit('toast',{text:'事件完成 · '+EVENT_NAMES[ev.id].split(' · ')[0]});this.activeEvent=null;}}else if(ev.left<=0)this.activeEvent=null;}
 if(this.time>=this.nextEvent&&this.time<this.duration-6&&!this.boss&&!this.activeEvent?.combat){const forced=this.eventIndex===0&&this.sector===0?'invasion':undefined;this.eventIndex++;this.startEvent(forced);this.nextEvent=this.time+this.rng.int(17,27);}
 if(this.clearing)return;
 this.spawnClock-=dt;if(this.spawnClock<=0){const melee=this.composition.filter(t=>!RANGED_TYPES.has(t)),ranged=this.composition.filter(t=>RANGED_TYPES.has(t)),pool=['drifter','skitter',...melee,...melee,...melee];if(ranged.length&&this.rng.next()<(this.sector<3?.18:.25))pool.splice(0,pool.length,...ranged);if(this.sector===0&&this.time<8)pool.splice(2);let count=2+Math.min(4,Math.floor(this.sector/4))+(this.highTide?1:0)+(this.activeEvent?.id==='surge'?2:0);if(this.boss)count=Math.max(1,Math.floor(count/2));for(let i=0;i<count;i++)this.spawnEnemy(this.rng.pick(pool));this.spawnClock=(this.boss?2.6:1.22)*(this.route==='quiet'?1.12:1)*(this.difficulty==='relaxed'?1.2:1)/.7;}
 }
 dash(input){const p=this.player;if(p.dashCD>0)return false;let x=input.mx,y=input.my;let l=Math.hypot(x,y);if(l<.1){x=Math.cos(p.angle);y=Math.sin(p.angle);l=1;}p.dx=x/l;p.dy=y/l;p.dashTime=.2;p.invuln=Math.max(p.invuln,.42);p.dashCD=this.dashMax;this.stats.dashes++;this.emit('sound',{name:'dash'});return true;}
 summonEcho(){
 const p=this.player;if(p.echoCD>0)return false;p.echoCD=this.echoMax;const n=1+this.count('binary');
 const recorded=this.history.map(h=>({...h}));for(let i=0;i<n;i++)this.echoes.push({x:p.x,y:p.y,originX:p.x+(i===1?55:0),originY:p.y,life:6+this.count('echo')*2,age:0,recorded,shotCD:0,angle:p.angle});
 this.stats.echoes++;this.heal(this.count('echoheart')*15);this.emit('sound',{name:'echo'});this.emit('toast',{text:'余响上线 · 复刻移动轨迹 · 自主锁定敌人射击'});return true;
 }
 fire(x,y,angle,echo=false,scale=1){
 if(this.bullets.length>550)return;
 const w=weaponInfo(this.weapon),crit=this.rng.next()<.08+this.count('glass')*.12+(this.weapon.mod==='lucky'?.12:0);const dmg=w.damage*this.damageMult*(crit?2:1)*scale*(echo?(.55+this.count('binary')*.2+(this.weapon.mod==='echo'?.25:0)):1);
 if(w.beam){for(let i=0;i<w.count;i++){const offset=(i-(w.count-1)/2)*14,sx=x-Math.sin(angle)*offset,sy=y+Math.cos(angle)*offset,tx=sx+Math.cos(angle)*w.beam,ty=sy+Math.sin(angle)*w.beam;this.emit('beam',{x:sx,y:sy,tx,ty,color:w.el.color,width:w.radius});for(const e of [...this.enemies])if(e.hp>0&&segmentDistance(e.x,e.y,sx,sy,tx,ty)<e.r+w.radius){this.hitEnemy(e,dmg,{element:w.el.id,crit});this.emit('hit',{x:e.x,y:e.y,color:w.el.color,crit});}}if(!echo){this.shots++;this.emit('sound',{name:'shoot',frame:w.id});if(this.count('triad')&&this.shots%3===0)for(let i=0;i<8;i++){const a=i*TAU/8;this.bullets.push({id:this.id++,x,y,px:x,py:y,vx:Math.cos(a)*480,vy:Math.sin(a)*480,r:4,damage:dmg*.45,life:.9,age:0,pierce:0,hitIds:[],element:w.el.id,color:w.el.color});}}return;}
 for(let i=0;i<w.count;i++){
 let a=angle+(w.id==='nova'?i*TAU/w.count:(i-(w.count-1)/2)*w.spread)+(this.rng.next()-.5)*(w.count===1?w.spread*2:.025);
 this.bullets.push({id:this.id++,x:x+Math.cos(a)*25,y:y+Math.sin(a)*25,px:x,py:y,vx:Math.cos(a)*w.speed,vy:Math.sin(a)*w.speed,r:w.radius,damage:dmg,life:w.life,age:0,pierce:(w.pierce||0)+this.count('pierce'),hitIds:[],element:w.el.id,color:echo?'#94b4f0':w.el.color,homing:w.homing||0,blast:w.blast||0,weave:w.weave||0,accel:w.accel||0,mine:!!w.mine,shatter:!!w.shatter,baseAngle:a,boomerang:!!w.boomerang,ricochet:this.weapon.mod==='ricochet',crit,echo});
 }
 if(!echo){this.shots++;this.emit('sound',{name:'shoot',frame:w.id});if(this.count('triad')&&this.shots%3===0){for(let i=0;i<8;i++){let a=i*TAU/8;this.bullets.push({id:this.id++,x,y,px:x,py:y,vx:Math.cos(a)*480,vy:Math.sin(a)*480,r:4,damage:dmg*.45,life:.9,age:0,pierce:0,hitIds:[],element:w.el.id,color:w.el.color});}}}
 }
 enemyShot(e,angle,speed=180,damage=e.damage,r=5){if(this.bullets.filter(b=>b.enemy&&b.life>0).length>=80)return;this.bullets.push({id:this.id++,x:e.x,y:e.y,px:e.x,py:e.y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,r,damage,enemy:true,color:e.boss?'#f6be99':'#f0a9a3',life:3.8,age:0});}
 ring(e,n=10,speed=160,offset=0){for(let i=0;i<n;i++)this.enemyShot(e,i*TAU/n+offset,speed);}
 hurtPlayer(n){
 const p=this.player;if(p.invuln>0||this.mode!=='playing')return false;
 const damage=n*(1-Math.min(.4,this.count('coat')*.1))*(this.difficulty==='relaxed'?.68:1);p.hp-=damage;p.invuln=.75;this.stats.hitsTaken++;this.emit('hurt',{damage});this.emit('sound',{name:'hurt'});
 if(this.count('thorns'))for(let i=0;i<10;i++){const a=i*TAU/10;this.bullets.push({id:this.id++,x:p.x,y:p.y,px:p.x,py:p.y,vx:Math.cos(a)*430,vy:Math.sin(a)*430,r:4,damage:25*this.count('thorns')*this.damageMult,life:1,age:0,pierce:1,hitIds:[],element:'plain',color:'#ffcda8'});}
 if(p.hp<=0){if(p.rescues>0){p.rescues--;p.hp=p.maxHp;p.invuln=4;this.bullets=this.bullets.filter(b=>!b.enemy);for(const e of this.enemies){let a=Math.atan2(e.y-p.y,e.x-p.x);e.x=clamp(e.x+Math.cos(a)*150,30,2170);e.y=clamp(e.y+Math.sin(a)*150,30,1570);}this.emit('toast',{text:'紧急救援 · 生命完全恢复，短暂无敌'});this.emit('burst',{x:p.x,y:p.y,color:'#e2d396',r:150});}else{p.hp=0;this.mode='dead';this.emit('death');}}
 return true;
 }
 hitEnemy(e,damage,b={}){
 if(e.hp<=0)return;e.hp-=damage*((e.boss||e.elite)?1+this.count('focus')*.3:1);e.hit=.09;this.totalDamage+=damage;
 if(b.element==='frost'||(this.count('frost')&&this.rng.next()<.25*this.count('frost')))e.slow=2;
 if(b.element==='fire'||this.count('fire')){e.burn=2.4;e.burnDmg=8*this.count('fire')+(b.element==='fire'?12:0);}
 if(b.element==='void'&&!e.boss){e.x+=(this.player.x-e.x)*.02;e.y+=(this.player.y-e.y)*.02;}
 if(!b.noProc&&(b.element==='shock'||this.rng.next()<.25*this.count('chain'))){let targets=this.enemies.filter(t=>t.id!==e.id&&t.hp>0&&dist(t,e)<180).slice(0,1+this.count('chain'));for(const t of targets){this.emit('arc',{x:e.x,y:e.y,tx:t.x,ty:t.y});this.hitEnemy(t,damage*.4,{noProc:true});}}
 if(b.crit)this.emit('number',{x:e.x,y:e.y-20,text:Math.round(damage),color:'#f3d59b'});
 if(e.hp<=0)this.kill(e,b.noProc);
 }
 kill(e,noProc=false){
 if(e.dead)return;e.dead=true;this.kills++;this.emit('burst',{x:e.x,y:e.y,color:e.color,r:e.boss?100:22});this.emit('sound',{name:e.boss?'bosskill':'kill'});
 if(e.stolen)this.player.coins+=e.stolen+15;this.pickups.push({id:this.id++,x:e.x,y:e.y,kind:'xp',value:e.xp,age:0});
 if(this.rng.next()<.30)this.pickups.push({id:this.id++,x:e.x+8,y:e.y,kind:'coin',value:2+Math.floor(Math.min(14,this.sector)/7),age:0});
 if(this.rng.next()<.025+this.count('supply')*.008)this.pickups.push({id:this.id++,x:e.x-8,y:e.y,kind:'heal',value:7,age:0});
 if(this.weapon.mod==='vampire'&&this.rng.next()<.25)this.heal(3);
 if(!noProc&&this.count('blast')&&this.rng.next()<.25*this.count('blast'))this.explode(e.x,e.y,85,24*this.damageMult);
 if(e.elite){this.player.coins+=120+this.sector*8;this.emit('toast',{text:'悬赏完成 · 获得星币与传说宝箱'});}if(e.elite)this.chests.push({id:this.id++,x:e.x,y:e.y,type:'relic',cost:0});
 if(e.type==='splitter'){for(let i=0;i<3;i++)this.spawnEnemy('skitter',{x:e.x+Math.cos(i*TAU/3)*30,y:e.y+Math.sin(i*TAU/3)*30,hp:22,maxHp:22,r:11});}if(e.affix==='volatile')this.hazards.push({id:this.id++,type:'circle',x:e.x,y:e.y,r:65,wait:.8,life:.25,damage:15,fired:false});
 if(e.specialType){this.player.coins+=50+this.sector*5;if(['treasurer','rift','twin'].includes(e.specialType))this.chests.push({id:this.id++,x:e.x,y:e.y,type:this.rng.next()<.45?'relic':'supply',cost:0});}if(e.boss){(this.stats.bossFights??=[]).push({sector:this.sector,kind:e.bossKind,special:!!e.special,seconds:Math.round(e.age*10)/10});this.bossKills++;if(!e.special){this.stageBossKills++;this.chests.push({id:this.id++,x:e.x,y:e.y,type:'relic',cost:0});}this.gainXP(120);this.player.coins+=100;this.emit('toast',{text:'灯塔重燃 · 航线已恢复'});if(this.bossSpawned&&this.stageBossKills>=this.stageBossTarget)this.time=Math.max(this.time,this.duration);if(this.clearing&&(this.stageBossTarget===0||this.bossSpawned)&&!this.enemies.some(v=>v.hp>0)&&!this.incursions.length)this.finishSector();}
 }
 explode(x,y,r,damage){this.emit('burst',{x,y,color:'#efc19a',r});for(const e of [...this.enemies])if(e.hp>0&&Math.hypot(e.x-x,e.y-y)<r+e.r)this.hitEnemy(e,damage,{noProc:true});}
 updateEnemy(e,dt){
 if(e.hp<=0)return;e.age+=dt;if(e.ttl!==undefined){e.ttl-=dt;if(e.ttl<=0){e.hp=0;e.escaped=true;this.emit('toast',{text:'悬赏目标已遁入潮雾 · 本次未获得奖励'});return;}}e.hit=Math.max(0,e.hit-dt);e.slow=Math.max(0,e.slow-dt);if(e.burn>0){e.burn-=dt;this.hitEnemy(e,e.burnDmg*dt,{noProc:true});if(e.hp<=0)return;}
 const p=this.player;let dx=p.x-e.x,dy=p.y-e.y,d=Math.hypot(dx,dy)||1,a=Math.atan2(dy,dx),speed=e.speed*(e.slow>0?.5:1)*(this.highTide?1.06:1);e.angle=a;e.cd-=dt;
 if(e.boss){this.updateBoss(e,dt,a,d);return;}
 let move=1;
 if(e.specialType){e.specialCD=(e.specialCD??2)-dt;if(e.specialCD<=0){e.specialCD=3.5;if(e.specialType==='sentinel'){for(let i=0;i<3;i++)this.hazards.push({id:this.id++,type:'line',x:e.x,y:e.y,angle:a+(i-1)*.6,length:650,width:12,wait:1.1,life:.22,damage:21,fired:false});}if(e.specialType==='twin'){const partner=this.enemies.find(t=>t!==e&&t.specialType==='twin'&&t.hp>0);if(partner){e.hp=Math.min(e.maxHp,e.hp+e.maxHp*.025);this.emit('arc',{x:e.x,y:e.y,tx:partner.x,ty:partner.y});}else{e.speed=260;this.ring(e,5,230,e.age);}}if(e.specialType==='guardian')for(const ally of this.enemies)if(ally.specialType==='treasurer'&&dist(e,ally)<300)ally.hp=Math.min(ally.maxHp,ally.hp+ally.maxHp*.03);if(e.specialType==='treasurer')this.pickups.push({id:this.id++,x:e.x,y:e.y,kind:'coin',value:8,age:0});}}

 if(e.type==='spitter'||e.type==='sniper'||e.type==='spiral'){move=d<260?-.55:d>360?1:0;if(e.cd<=0){if(e.type==='spitter'){this.enemyShot(e,a,225);e.cd=3.4;}if(e.type==='spiral'){this.ring(e,4,145,e.age);e.cd=5;}if(e.type==='sniper'){this.hazards.push({id:this.id++,type:'line',x:e.x,y:e.y,angle:a,length:1000,width:18,wait:1.2,life:.32,damage:e.damage+3,fired:false});e.cd=4.3;}}}
 if(e.type==='summoner'){move=d<360?-.3:.6;if(e.cd<=0&&!this.clearing){for(let i=0;i<2;i++)this.spawnEnemy('skitter',{x:clamp(e.x+this.rng.int(-40,40),25,2175),y:clamp(e.y+this.rng.int(-40,40),25,1575)});e.cd=7;}}
 if(e.type==='charger'){
 if(e.phase===0&&e.cd<=0){e.phase=1;e.wind=.8;e.chargeAngle=a;this.emit('warning',{x:e.x,y:e.y,angle:a});}
 if(e.phase===1){move=0;e.wind-=dt;if(e.wind<=0){e.phase=2;e.wind=.6;}}
 if(e.phase===2){move=0;e.x+=Math.cos(e.chargeAngle)*470*dt;e.y+=Math.sin(e.chargeAngle)*470*dt;e.wind-=dt;if(e.wind<=0){e.phase=0;e.cd=3.6;}}
 }
 if(e.type==='bomber'&&d<105&&e.phase===0){e.phase=1;e.wind=1.2;}
 if(e.type==='bomber'&&e.phase===1){move=0;e.wind-=dt;if(e.wind<=0){this.hazards.push({id:this.id++,type:'circle',x:e.x,y:e.y,r:95,wait:0,life:.2,damage:e.damage,fired:false});this.hitEnemy(e,99999,{noProc:true});return;}}
 if(e.type==='leaper'){
 if(e.phase===0&&e.cd<=0){e.phase=1;e.wind=.7;e.targetX=p.x;e.targetY=p.y;this.hazards.push({id:this.id++,type:'circle',x:p.x,y:p.y,r:48,wait:.85,life:.2,damage:e.damage,fired:false});}
 if(e.phase===1){move=0;e.wind-=dt;if(e.wind<=0){e.phase=2;e.wind=.3;e.vx=(e.targetX-e.x)/.3;e.vy=(e.targetY-e.y)/.3;}}
 if(e.phase===2){move=0;e.x+=e.vx*dt;e.y+=e.vy*dt;e.wind-=dt;if(e.wind<=0){e.phase=0;e.cd=3.2;}}
 }
 if(e.type==='healer'){move=d<320?-.5:.65;if(e.cd<=0){for(const t of this.enemies)if(t!==e&&!t.boss&&t.hp>0&&dist(t,e)<230){t.hp=Math.min(t.maxHp,t.hp+22);this.emit('arc',{x:e.x,y:e.y,tx:t.x,ty:t.y});}this.enemyShot(e,a,190);e.cd=3;}}
 if(e.type==='orbiter'){const tangent=a+(e.id%2?1:-1)*1.15;dx=Math.cos(tangent)*d;dy=Math.sin(tangent)*d;if(e.cd<=0){for(let j of [-1,1])this.enemyShot(e,a+j*.12,225);e.cd=3.4;}}
 if(e.type==='miner'){move=d<210?-.8:1;if(e.cd<=0){this.hazards.push({id:this.id++,type:'circle',x:e.x,y:e.y,r:68,wait:2.1,life:2.8,damage:18,fired:false});e.cd=3.7;}}
 if(e.type==='reaper'){if(e.cd<=0){e.phase=1;e.wind=.55;e.chargeAngle=a;e.cd=3.4;}if(e.phase===1){move=0;e.wind-=dt;if(e.wind<=0){e.phase=2;e.wind=.4;}}if(e.phase===2){move=0;e.x+=Math.cos(e.chargeAngle)*440*dt;e.y+=Math.sin(e.chargeAngle)*440*dt;e.wind-=dt;if(e.wind<=0)e.phase=0;}}
 if(e.type==='lancer'){move=d<230?.15:1;if(e.cd<=0){this.hazards.push({id:this.id++,type:'line',x:e.x,y:e.y,angle:a,length:520,width:14,wait:.9,life:.2,damage:e.damage,fired:false});e.cd=2.8;}}
 if(e.type==='mimic'){move=d<260?-1:0;if(e.cd<=0){this.ring(e,4,180,e.age);e.cd=4;}if(d<60&&p.invuln<=0){const stolen=Math.min(12,p.coins);p.coins-=stolen;e.stolen=(e.stolen||0)+stolen;}}
 if(e.type==='skitter'){const wiggle=Math.sin(e.age*5+e.id)*.7;a+=wiggle;dx=Math.cos(a)*d;dy=Math.sin(a)*d;}
 if(this.clearing&&RANGED_TYPES.has(e.type)){dx=p.x-e.x;dy=p.y-e.y;d=Math.hypot(dx,dy)||1;move=d>140?1:.15;}
 e.x=clamp(e.x+dx/d*speed*move*dt,25,2175);e.y=clamp(e.y+dy/d*speed*move*dt,25,1575);
 if(d<e.r+p.r)this.hurtPlayer(e.damage);
 }
 updateBoss(e,dt,a,d){
 const p=this.player;e.phase=e.hp/e.maxHp<.45?1:0;const kind=e.bossKind;if(kind>=5){this.updateNewBoss(e,dt,a,d);return;}if(e.burstLeft>0){e.burstClock-=dt;if(e.burstClock<=0){this.ring(e,8+e.phase*2,180+this.sector*3,e.age*.5+e.burstLeft*.2);e.burstLeft--;e.burstClock=.32;this.emit('sound',{name:'boss-ring-'+kind});}}
 e.motionCD=(e.motionCD??2.8)-dt;
 if(!e.motion&&e.motionCD<=0){e.motion='windup';e.motionTime=.95;e.motionAngle=a;e.fromX=e.x;e.fromY=e.y;e.targetX=clamp(p.x,90,2110);e.targetY=clamp(p.y,90,1510);e.motionCD=Math.max(3.4,6.5-e.phase-this.sector*.12);this.emit('sound',{name:'boss-windup-'+kind});
 if(kind===1||kind===2)this.hazards.push({id:this.id++,type:'circle',x:kind===2?e.x:e.targetX,y:kind===2?e.y:e.targetY,r:kind===2?155:100,wait:kind===2?.95:1.65,life:.3,damage:e.damage,fired:false});}
 if(e.motion==='windup'){e.motionTime-=dt;if(e.motionTime<=0){e.motion='strike';e.motionTime=.7;this.emit('burst',{x:e.x,y:e.y,r:55,color:e.color});}return;}
 if(e.motion==='strike'){e.motionTime-=dt;const t=clamp(1-e.motionTime/.7,0,1);
 if(kind===1){e.x=e.fromX+(e.targetX-e.fromX)*t;e.y=e.fromY+(e.targetY-e.fromY)*t;e.lift=Math.sin(t*Math.PI)*75;}
 else if(kind!==2){const speed=kind===3?520:620;e.x=clamp(e.x+Math.cos(e.motionAngle)*speed*dt,75,2125);e.y=clamp(e.y+Math.sin(e.motionAngle)*speed*dt,75,1525);if(dist(e,p)<e.r+p.r)this.hurtPlayer(e.damage+5);}
 if(e.motionTime<=0){e.motion='recover';e.motionTime=.65;e.lift=0;this.emit('sound',{name:'boss-impact-'+kind});this.emit('burst',{x:e.x,y:e.y,r:kind===2?155:80,color:e.color});}return;}
 if(e.motion==='recover'){e.motionTime-=dt;if(e.motionTime<=0)e.motion='';return;}
 const tangent=Math.sin(e.age*.9+kind)*.65,forward=d>300?1:d<175?-.6:.15;
 e.x=clamp(e.x+(Math.cos(a)*forward-Math.sin(a)*tangent)*e.speed*dt,75,2125);e.y=clamp(e.y+(Math.sin(a)*forward+Math.cos(a)*tangent)*e.speed*dt,75,1525);
 if(d<e.r+p.r)this.hurtPlayer(e.damage);
 if(e.cd>0)return;
 e.attack=(e.attack||0)+1;const k=e.bossKind;this.emit('sound',{name:'boss-'+(k===2?'laser':k===0?(e.attack%2?'ring':'bomb'):k===1?'fan':k===4&&e.attack%3===0?'bomb':'ring')+'-'+k});if(this.sector>=6&&e.attack%2===0){e.burstLeft=this.sector>=12?2:1;e.burstClock=.32;}if(this.sector>=9&&e.attack%3===0)for(let j=-1;j<=1;j++)this.enemyShot(e,a+j*.22,290+this.sector*3);
 if(k===0){if(e.attack%2){this.ring(e,6+e.phase*2,135,e.age*.4);}else{for(let i=0;i<3;i++)this.hazards.push({id:this.id++,type:'circle',x:clamp(p.x+(i-1)*125,60,2140),y:p.y,r:78,wait:1.4,life:.35,damage:e.damage,fired:false});}e.cd=2.6-e.phase*.4;}
 if(k===1){if(e.attack%3===0&&!this.clearing)this.emit('sound',{name:'boss-summon-'+k});for(let j=0;j<3+e.phase*2;j++)this.enemyShot(e,a+(j-1-e.phase)*.2,170);if(e.attack%3===0&&!this.clearing)for(let i=0;i<2;i++)this.spawnEnemy('bomber',{x:clamp(e.x+Math.cos(i*TAU/3)*95,30,2170),y:clamp(e.y+Math.sin(i*TAU/3)*95,30,1570)});e.cd=2.2-e.phase*.4;}
 if(k===2){for(let i=0;i<3+e.phase;i++)this.hazards.push({id:this.id++,type:'line',x:e.x,y:e.y,angle:a+(i-1)*.45,length:1800,width:24,wait:1.35,life:.38,damage:e.damage,fired:false});if(e.attack%3===0){this.emit('sound',{name:'boss-ring-'+k});this.ring(e,6,135);};e.cd=3;}
 if(k===3){this.emit('sound',{name:'boss-bomb-'+k});this.ring(e,7+e.phase*2,145,e.age);this.hazards.push({id:this.id++,type:'circle',x:p.x,y:p.y,r:95,wait:1.6,life:.4,damage:e.damage,fired:false});e.cd=2.5-e.phase*.4;}
 if(k===4){if(e.attack%3===0){for(let i=0;i<4;i++)this.hazards.push({id:this.id++,type:'circle',x:clamp(p.x+Math.cos(i*TAU/4)*115,60,2140),y:clamp(p.y+Math.sin(i*TAU/4)*115,60,1540),r:75,wait:1.5,life:.4,damage:e.damage,fired:false});}else{this.emit('sound',{name:'boss-fan-'+k});this.ring(e,8+e.phase*2,140,e.age*.6);for(let j=-1;j<=1;j++)this.enemyShot(e,a+j*.15,215);}if(e.attack%5===0&&!this.clearing)this.spawnEnemy('skitter');e.cd=2.35-e.phase*.35;}
 e.cd*=Math.max(.58,1-this.sector*.025);
 }
 updateNewBoss(e,dt,a,d){
 const p=this.player,k=e.bossKind;e.phase=e.hp/e.maxHp<.45?1:0;
 if(e.motion==='windup'){e.motionTime-=dt;if(e.motionTime<=0){e.motion='strike';e.motionTime=.45;}return;}
 if(e.motion==='strike'){e.motionTime-=dt;e.x=clamp(e.x+Math.cos(e.motionAngle)*780*dt,75,2125);e.y=clamp(e.y+Math.sin(e.motionAngle)*780*dt,75,1525);if(dist(e,p)<e.r+p.r)this.hurtPlayer(e.damage*1.2);if(e.motionTime<=0){e.motion='';this.emit('sound',{name:'boss-impact-'+k});}return;}
 const orbit=(k===7?1.1:.55)*Math.sin(e.age*.8);const f=d>290?1:d<170?-.4:.2;e.x=clamp(e.x+(Math.cos(a)*f-Math.sin(a)*orbit)*e.speed*dt,75,2125);e.y=clamp(e.y+(Math.sin(a)*f+Math.cos(a)*orbit)*e.speed*dt,75,1525);if(d<e.r+p.r)this.hurtPlayer(e.damage);
 if(e.cd>0)return;e.attack=(e.attack||0)+1;const phase=e.attack%3;
 const circle=(x,y,r,wait)=>this.hazards.push({id:this.id++,type:'circle',x:clamp(x,60,2140),y:clamp(y,60,1540),r,wait,life:.35,damage:e.damage,fired:false});
 const line=(x,y,angle,width=17,wait=1)=>this.hazards.push({id:this.id++,type:'line',x,y,angle,length:1100,width,wait,life:.3,damage:e.damage,fired:false});
 if(k===5){if(phase===1){e.motion='windup';e.motionTime=.9;e.motionAngle=a;line(e.x,e.y,a,24,.9);this.emit('sound',{name:'boss-windup-'+k});}else{for(let j=-2;j<=2;j++)this.enemyShot(e,a+j*.23,300);if(phase===0)this.ring(e,10,215,e.age);this.emit('sound',{name:'boss-fan-'+k});}}
 if(k===6){if(phase!==0){for(let i=0;i<5;i++)circle(p.x+(i-2)*100,p.y+Math.sin(i)*90,65,1.1+i*.18);this.emit('sound',{name:'boss-bomb-'+k});}else{for(let i=-1;i<=1;i++)line(e.x,e.y,a+i*.3,22,1.15);this.emit('sound',{name:'boss-laser-'+k});}}
 if(k===7){if(phase===1){for(let i=0;i<6;i++){const q=i*TAU/6+e.age;line(e.x,e.y,q,14,1.2);}this.emit('sound',{name:'boss-laser-'+k});}else{for(let i=0;i<8;i++)circle(p.x+Math.cos(i*TAU/8)*170,p.y+Math.sin(i*TAU/8)*170,52,1.2);this.ring(e,8,240,e.age);this.emit('sound',{name:'boss-ring-'+k});}}
 if(k===8){if(phase===1){e.motion='windup';e.motionTime=1;e.motionAngle=a;circle(p.x,p.y,115,1.25);this.emit('sound',{name:'boss-windup-'+k});}else{for(let i=0;i<4;i++)circle(p.x+Math.cos(a)*i*95,p.y+Math.sin(a)*i*95,72,1+i*.22);for(let j=-2;j<=2;j++)this.enemyShot(e,a+j*.32,260);this.emit('sound',{name:'boss-impact-'+k});}}
 if(k===9){if(phase===1){for(let i=0;i<5;i++){const q=i*TAU/5;circle(p.x+Math.cos(q)*140,p.y+Math.sin(q)*140,70,1.6);}circle(p.x,p.y,60,1.1);this.emit('sound',{name:'boss-bomb-'+k});}else if(phase===2){for(let i=-1;i<=1;i++)line(e.x,e.y,a+i*.55,20,1.1);this.emit('sound',{name:'boss-laser-'+k});}else{this.ring(e,12,230,e.age);this.emit('sound',{name:'boss-ring-'+k});}}
 e.cd=(e.phase?1.6:2.1)*Math.max(.75,1-this.sector*.008);
 }
 updateBullets(dt){
 const p=this.player;for(const b of this.bullets){if(b.life<=0)continue;b.px=b.x;b.py=b.y;b.age+=dt;b.life-=dt;
 if(b.homing&&!b.enemy){let target=null,near=450;for(const e of this.enemies){const d=dist(e,b);if(e.hp>0&&!b.hitIds.includes(e.id)&&d<near){near=d;target=e;}}if(target){let a=Math.atan2(b.vy,b.vx),to=Math.atan2(target.y-b.y,target.x-b.x),delta=Math.atan2(Math.sin(to-a),Math.cos(to-a));a+=clamp(delta,-b.homing*dt,b.homing*dt);let s=Math.hypot(b.vx,b.vy);b.vx=Math.cos(a)*s;b.vy=Math.sin(a)*s;}}
 if(b.boomerang&&b.age>.75&&!b.turned){b.vx*=-1;b.vy*=-1;b.turned=true;b.hitIds=[];}
 if(!b.enemy){if(b.accel){const f=1+b.accel*dt;b.vx*=f;b.vy*=f;}if(b.weave){const speed=Math.hypot(b.vx,b.vy),a=b.baseAngle+Math.cos(b.age*13+b.id%2*Math.PI)*.65;b.vx=Math.cos(a)*speed;b.vy=Math.sin(a)*speed;}if(b.mine&&b.age>.45){b.vx=0;b.vy=0;if(b.life<=dt||this.enemies.some(e=>e.hp>0&&dist(e,b)<90)){this.explode(b.x,b.y,b.blast,b.damage);b.life=0;continue;}}}
 const slow=b.enemy&&this.activeEvent?.id==='gravity'?.65:1;b.x+=b.vx*dt*slow;b.y+=b.vy*dt*slow;
 if(b.x<0||b.x>WORLD.w||b.y<0||b.y>WORLD.h){if(b.ricochet){if(b.x<0||b.x>WORLD.w)b.vx*=-1;if(b.y<0||b.y>WORLD.h)b.vy*=-1;b.x=clamp(b.x,0,WORLD.w);b.y=clamp(b.y,0,WORLD.h);b.ricochet=false;}else b.life=0;}
 if(b.enemy){if(segmentDistance(p.x,p.y,b.px,b.py,b.x,b.y)<p.r+b.r){this.hurtPlayer(b.damage);b.life=0;}}
 else for(const e of this.enemies){if(e.hp<=0||b.hitIds.includes(e.id))continue;if(segmentDistance(e.x,e.y,b.px,b.py,b.x,b.y)<e.r+b.r){b.hitIds.push(e.id);this.hitEnemy(e,b.damage,b);if(b.blast)this.explode(b.x,b.y,b.blast,b.damage*.5);this.emit('hit',{x:e.x,y:e.y,color:b.color,crit:b.crit});if(b.shatter){b.shatter=false;for(let i=0;i<6;i++){const a=i*TAU/6;this.bullets.push({id:this.id++,x:e.x,y:e.y,px:e.x,py:e.y,vx:Math.cos(a)*600,vy:Math.sin(a)*600,r:3,damage:b.damage*.3,life:.6,age:0,pierce:0,hitIds:[e.id],element:b.element,color:b.color});}}if(b.pierce<=0){b.life=0;break;}b.pierce--;}}
 }
 this.bullets=this.bullets.filter(b=>b.life>0);
 }
 update(dt,input=emptyInput()){
 if(this.mode!=='playing')return;dt=clamp(dt,0,.05);if(dt===0)return;if(this.collectionTime>0){this.collectionTime-=dt;for(const item of [...this.pickups,...this.chests]){item.x+=(this.player.x-item.x)*Math.min(1,dt*8);item.y+=(this.player.y-item.y)*Math.min(1,dt*8);}if(this.collectionTime<=0)this.completeSector();return;}
 const p=this.player;p.moving=Math.hypot(input.mx,input.my)>.1;p.walk=(p.walk||0)+(p.moving?dt:0);this.elapsed+=dt;this.time+=dt;p.angle=Math.atan2(input.ay||0,input.ax||.00001);p.invuln=Math.max(0,p.invuln-dt);p.dashCD=Math.max(0,p.dashCD-dt);p.echoCD=Math.max(0,p.echoCD-dt);p.shotCD-=dt;
 this.heal((.1+this.count('heart')*.22+(!this.highTide?this.count('tide')*.3:0))*dt);
 if(input.dash)this.dash(input);if(input.echo)this.summonEcho();if(input.interact){this.tryChest();if(this.mode!=='playing')return;}
 if(p.dashTime>0){p.x+=p.dx*1050*dt;p.y+=p.dy*1050*dt;p.dashTime-=dt;if(p.dashTime<=0&&this.count('capacitor')){this.bullets=this.bullets.filter(b=>!b.enemy||dist(b,p)>170);this.explode(p.x,p.y,145,55*this.count('capacitor')*this.damageMult);}}
 else{let l=Math.hypot(input.mx,input.my);if(l>0){p.x+=input.mx/Math.max(1,l)*this.speed*dt;p.y+=input.my/Math.max(1,l)*this.speed*dt;}}
 p.x=clamp(p.x,24,WORLD.w-24);p.y=clamp(p.y,24,WORLD.h-24);
 if(input.shoot&&p.shotCD<=0){this.fire(p.x,p.y,p.angle);p.shotCD=1/(weaponInfo(this.weapon).rate*(1+this.count('spring')*.12)*(['surge','overdrive'].includes(this.activeEvent?.id)?1.35:1));}
 this.historyClock+=dt;if(this.historyClock>=.1){this.historyClock-=.1;this.history.push({x:p.x,y:p.y,angle:p.angle,shoot:!!input.shoot});if(this.history.length>40)this.history.shift();}
 for(const e of this.echoes){e.age+=dt;e.life-=dt;e.shotCD-=dt;const h=e.recorded[Math.floor(e.age*10)%Math.max(1,e.recorded.length)];if(h){const base=e.recorded[0];e.x=clamp(e.originX+h.x-base.x,20,2180);e.y=clamp(e.originY+h.y-base.y,20,1580);}
 const target=this.enemies.filter(t=>t.hp>0&&dist(t,e)<800).sort((a,b)=>dist(a,e)-dist(b,e))[0];if(target){e.angle=Math.atan2(target.y-e.y,target.x-e.x);if(e.shotCD<=0){this.fire(e.x,e.y,e.angle,true);e.shotCD=1/(weaponInfo(this.weapon).rate*(1+this.count('spring')*.12));}}}

 this.echoes=this.echoes.filter(e=>e.life>0);
 this.updateDirector(dt);
 for(const e of [...this.enemies]){this.updateEnemy(e,dt);if(this.mode!=='playing')return;}
 // Soft separation keeps swarms readable, without solid geometry that can trap players.
 for(let i=0;i<this.enemies.length;i++)for(let j=i+1;j<this.enemies.length;j++){const a=this.enemies[i],b=this.enemies[j];let dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy),min=(a.r+b.r)*.8;if(d<min&&d>.01){const push=(min-d)*dt*2;a.x-=dx/d*push;a.y-=dy/d*push;b.x+=dx/d*push;b.y+=dy/d*push;}}
 this.updateBullets(dt);if(this.mode!=='playing')return;this.enemies=this.enemies.filter(e=>e.hp>0);
 for(const h of this.hazards){h.wait-=dt;if(h.wait<=0){if(!h.fired){h.fired=true;this.emit('burst',{x:h.x,y:h.y,color:'#ff4466',r:h.r||30});}h.life-=dt;const hit=h.type==='circle'?dist(h,p)<h.r+p.r:segmentDistance(p.x,p.y,h.x,h.y,h.x+Math.cos(h.angle)*h.length,h.y+Math.sin(h.angle)*h.length)<h.width+p.r;if(hit)this.hurtPlayer(h.damage);}}
 this.hazards=this.hazards.filter(h=>h.life>0);if(this.mode!=='playing')return;
 for(const item of this.pickups){item.age+=dt;let d=dist(item,p),range=170+this.count('magnet')*65;if(d<range||item.age>24){item.x+=(p.x-item.x)/Math.max(1,d)*(310+item.age*5)*dt;item.y+=(p.y-item.y)/Math.max(1,d)*(310+item.age*5)*dt;}if(d<26){if(item.kind==='xp')this.gainXP(item.value);if(item.kind==='heal')this.heal(item.value);if(item.kind==='coin')p.coins+=Math.round(item.value*(1+this.count('luck')*.25)*(this.route==='treasure'?1.5:1));item.taken=true;}}
 this.pickups=this.pickups.filter(i=>!i.taken);if(this.pickups.length>220){let excess=this.pickups.splice(0,this.pickups.length-220);for(const i of excess){if(i.kind==='xp')this.gainXP(i.value);if(i.kind==='coin')p.coins+=i.value;}}
 for(const b of this.beacons)if(!b.done&&dist(b,p)<105){b.charge+=dt*(this.route==='echo'?1.5:1);if(b.charge>=BEACON_SECONDS){b.done=true;this.stats.beacons++;this.gainXP(35+this.sector*4);p.coins+=25;this.heal(b.temporary?40:18);if(!b.temporary){const roll=this.rng.next();this.player.coins+=this.rng.int(15,60);if(roll<.45)this.chests.push({id:this.id++,x:b.x+50,y:b.y,type:roll<.12?'relic':'supply',cost:0});if(this.beacons.filter(v=>!v.temporary).every(v=>v.done)&&!this.beaconRewarded){this.beaconRewarded=true;this.chests.push({id:this.id++,x:b.x+65,y:b.y,type:'relic',cost:0});this.player.coins+=100;this.gainXP(150+this.sector*20);if(this.rng.next()<.35&&!this.activeEvent?.combat)this.startEvent('rift');else this.chests.push({id:this.id++,x:b.x-65,y:b.y,type:'supply',cost:0});}}this.emit('beacon',{x:b.x,y:b.y});this.emit('toast',{text:'信标点亮 · 获得星币、经验与修复；点亮全部信标可获金箱、星币与随机奇遇'});this.emit('sound',{name:'beacon'});}}
 this.satelliteClock-=dt;if(this.count('orbit')&&this.satelliteClock<=0){for(let i=0;i<this.count('orbit');i++){let a=this.elapsed*1.7+i*TAU/this.count('orbit'),x=p.x+Math.cos(a)*55,y=p.y+Math.sin(a)*55;let t=this.enemies.filter(e=>dist(e,p)<500).sort((a,b)=>dist(a,p)-dist(b,p))[0];if(t){this.bullets.push({id:this.id++,x,y,px:x,py:y,vx:Math.cos(Math.atan2(t.y-y,t.x-x))*620,vy:Math.sin(Math.atan2(t.y-y,t.x-x))*620,r:4,damage:20*this.damageMult,life:1,age:0,pierce:0,hitIds:[],element:'plain',color:'#f0dca7'});}}this.satelliteClock=.65;}
 this.blackholeClock-=dt;if(this.count('blackhole')&&this.blackholeClock<=0){const t=this.enemies.find(e=>dist(e,p)<550);if(t){this.explode(t.x,t.y,200,95*this.damageMult);for(const e of this.enemies)if(!e.boss&&dist(e,t)<250){e.x+=(t.x-e.x)*.55;e.y+=(t.y-e.y)*.55;}}this.blackholeClock=8;}
 if(this.stageBossTarget>0&&!this.bossSpawned&&this.time>=this.duration*.35)this.spawnBoss();
 if(this.clearing&&(this.stageBossTarget===0||this.bossSpawned)&&!this.enemies.some(e=>e.hp>0)&&!this.incursions.length){this.finishSector();return;}
 if(this.pendingLevels>0&&this.mode==='playing')this.offerLevel();
 }
 snapshot(){const o={};for(const k of Object.keys(this))if(!['events','effects','history'].includes(k))o[k]=this[k];o.rng={state:this.rng.state};return JSON.parse(JSON.stringify({version:VERSION,...o}));}
 static restore(data){
 if(!data||![2,3,4,VERSION].includes(data.version)||!Number.isInteger(data.sector)||data.sector<0||data.sector>100000||!data.player||!Number.isFinite(data.player.hp)||!data.weapon||!FRAMES.some(f=>f.id===data.weapon.frame)||!RARITIES[data.weapon.rarity]||!['playing','choice','shop','won','dead'].includes(data.mode))throw new Error('存档格式不兼容或已损坏');
 for(const key of ['enemies','bullets','pickups','hazards','echoes','beacons','chests','choices'])if(!Array.isArray(data[key]))throw new Error('存档缺少场景数据');
 if(!data.rng||!Number.isFinite(data.rng.state)||!Number.isFinite(data.time)||!Number.isFinite(data.elapsed)||!Number.isFinite(data.player.x)||!Number.isFinite(data.player.y)||!Number.isFinite(data.player.maxHp)||data.player.maxHp<=0||!data.relics||Object.entries(data.relics).some(([id,n])=>!RELICS.some(r=>r.id===id&&Number.isInteger(n)&&n>=0&&n<=r.max)))throw new Error('存档状态无效');
 const g=new Game(data.seed,data.difficulty);for(const k of Object.keys(g))if(k in data&&!['events','effects','history','rng'].includes(k))g[k]=data[k];g.rng=new RNG(1);g.rng.state=data.rng.state>>>0;g.events=[];g.effects=[];g.history=[];if(g.collectionTime>0)g.settlementPending=true;if(data.version<4){g.duration=sectorDuration(g.sector);if(g.activeEvent){g.activeEvent.targets=g.enemies.filter(e=>e.elite).map(e=>e.id);g.activeEvent.serial=++g.eventSerial;g.activeEvent.combat=g.activeEvent.targets.length>0;for(const wave of g.incursions)wave.eventSerial=g.activeEvent.serial;}if(g.rewardKind==='route'&&g.choices.length>1)g.choices=[g.rng.pick(g.choices)];if(g.shop)for(const item of g.shop.items){if(item.id==='weapon')item.cost=Math.max(item.cost,420);if(item.id==='relic')item.cost=Math.max(item.cost,280);}if(g.bossSpawned&&g.bosses.length===1&&g.stageBossTarget>1)for(let i=1;i<g.stageBossTarget;i++)g.spawnGuardian((g.boss.bossKind+i)%5,i,g.stageBossTarget);if(g.bossSpawned&&!g.bosses.length)g.stageBossKills=g.stageBossTarget;}if(data.version<5&&g.sector>=6)for(const e of g.enemies)if(e.boss){e.hp*=.65;e.maxHp*=.65;e.damage=28+Math.min(24,g.sector)*2;}return g;
 }
}
export function segmentDistance(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;if(!l)return Math.hypot(px-ax,py-ay);const t=clamp(((px-ax)*dx+(py-ay)*dy)/l,0,1);return Math.hypot(px-(ax+t*dx),py-(ay+t*dy));}

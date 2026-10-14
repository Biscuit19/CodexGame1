export const VERSION=1;
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
export const RARITIES={common:{name:'标准',color:'#a0cebd',mult:1},rare:{name:'稀有',color:'#9cbcff',mult:1.18},epic:{name:'史诗',color:'#cc9eff',mult:1.4},legendary:{name:'传说',color:'#f3cf8a',mult:1.75}};
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
export const ELEMENTS=[{id:'plain',name:'原光',color:'#b1f9d6'},{id:'frost',name:'霜语',color:'#9bdaff'},{id:'fire',name:'余烬',color:'#ffb07d'},{id:'shock',name:'雷鸣',color:'#e1bbff'},{id:'void',name:'虚星',color:'#c5a3ff'}];
export const MODS=[{id:'steady',name:'归航',desc:'稳定的原型结构'},{id:'split',name:'繁星',desc:'额外弹道，单发伤害稍低'},{id:'vampire',name:'拾心',desc:'每次击败敌人有概率修复生命'},{id:'ricochet',name:'折返',desc:'弹药触及海域边缘会反射'},{id:'echo',name:'复写',desc:'分身伤害提高，回声冷却缩短'},{id:'giant',name:'巨像',desc:'弹体更大，伤害提高 20%'},{id:'lucky',name:'奇迹',desc:'提高暴击率和珍稀物资概率'}];
export function rollWeapon(rng,sector=0,forced){
 const r=rng.next();const rarity=forced||(r<.025?'legendary':r<.15?'epic':r<.5?'rare':'common');
 const frame=rng.pick(FRAMES),element=rng.pick(ELEMENTS),mod=rng.pick(MODS);
 return{frame:frame.id,element:element.id,mod:mod.id,rarity,tier:Math.floor(sector/3),name:`${mod.name}·${element.name}${frame.name}`};
}
export function weaponInfo(w){const f=FRAMES.find(x=>x.id===w.frame)||FRAMES[0];const el=ELEMENTS.find(x=>x.id===w.element)||ELEMENTS[0];const mod=MODS.find(x=>x.id===w.mod)||MODS[0];return{...f,el,modifier:mod,rarityInfo:RARITIES[w.rarity],damage:f.damage*RARITIES[w.rarity].mult*(1+w.tier*.14)*(w.mod==='giant'?1.2:1)*(w.mod==='split'?.78:1),count:f.count+(w.mod==='split'?1:0),radius:f.radius*(w.mod==='giant'?1.45:1)};}
export const RELICS=[
 {id:'lens',name:'潮光透镜',icon:'◇',desc:'所有伤害 +16%',max:5,rarity:'common'},
 {id:'spring',name:'钟表发条',icon:'⟳',desc:'射速 +12%',max:5,rarity:'common'},
 {id:'shell',name:'温暖贝壳',icon:'◡',desc:'生命上限 +25，并修复 25 生命',max:5,rarity:'common'},
 {id:'boots',name:'轻羽船靴',icon:'»',desc:'移动速度 +10%',max:3,rarity:'common'},
 {id:'magnet',name:'星屑罗盘',icon:'⊕',desc:'拾取范围 +65，经验获取 +10%',max:3,rarity:'common'},
 {id:'heart',name:'缓慢心跳',icon:'♡',desc:'每秒恢复 0.35 生命',max:4,rarity:'rare'},
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
 {id:'supply',name:'远洋便当',icon:'▤',desc:'每个航段额外修复 30 生命，击败敌人更易掉落补给',max:3,rarity:'common'},
 {id:'focus',name:'守灯人的眼睛',icon:'◎',desc:'对首领和精英伤害 +30%',max:3,rarity:'rare'}
];
export const ENEMIES={
 drifter:{name:'漂流者',hp:38,speed:83,r:17,damage:10,xp:5,color:'#adc6b8'},
 skitter:{name:'剪影蟹',hp:25,speed:153,r:12,damage:8,xp:5,color:'#ecc69a'},
 spitter:{name:'墨水花',hp:52,speed:53,r:19,damage:10,xp:8,color:'#eab0c0'},
 charger:{name:'撞钟鱼',hp:75,speed:66,r:22,damage:16,xp:10,color:'#edab87'},
 shield:{name:'镜壳',hp:115,speed:56,r:24,damage:13,xp:12,color:'#9dbbd1'},
 summoner:{name:'育梦水母',hp:95,speed:36,r:23,damage:9,xp:15,color:'#bcacd8'},
 bomber:{name:'空心灯笼',hp:42,speed:98,r:17,damage:18,xp:9,color:'#e9d89b'},
 sniper:{name:'航标眼',hp:56,speed:42,r:18,damage:14,xp:11,color:'#98caca'},
 spiral:{name:'旋转星蕨',hp:80,speed:45,r:20,damage:11,xp:12,color:'#b9bbeb'}
};
export const ROUTES=[
 {id:'quiet',name:'寂静航道',icon:'☾',desc:'敌人稍少；下一航段开始时恢复 35 生命。',tag:'休整 · 更安全'},
 {id:'treasure',name:'漂金暗流',icon:'✧',desc:'星币与宝箱增多；更容易找到珍稀枪械。',tag:'宝藏 · 寻找惊喜'},
 {id:'storm',name:'风暴捷径',icon:'ϟ',desc:'敌人稍强；经验 +30%，完成航段获得额外升级。',tag:'挑战 · 加速成长'},
 {id:'echo',name:'回声支流',icon:'∞',desc:'回声技能恢复更快，补给信标充能更快。',tag:'回声 · 技能共鸣'}
];
const emptyInput=()=>({mx:0,my:0,ax:1,ay:0,shoot:false,dash:false,echo:false,interact:false});
export class Game{
 constructor(seed=Date.now(),difficulty='relaxed'){
 this.rng=new RNG(seed);this.seed=seed;this.difficulty=difficulty;this.mode='playing';this.sector=0;this.time=0;this.elapsed=0;this.duration=180;this.kills=0;this.shots=0;this.totalDamage=0;this.id=1;this.route='quiet';this.events=[];this.pendingLevels=0;this.choices=[];this.rewardKind='';this.bossSpawned=false;this.bossKills=0;this.storySeen=false;
 this.player={x:1100,y:800,r:16,hp:140,maxHp:140,xp:0,level:1,coins:0,rescues:2,angle:0,invuln:2,dashCD:0,echoCD:0,dashTime:0,dx:0,dy:0,shotCD:0,regenClock:0};
 this.weapon={frame:'needle',element:'plain',mod:'steady',rarity:'common',tier:0,name:'归航·原光织光针'};this.relics={};this.enemies=[];this.bullets=[];this.pickups=[];this.effects=[];this.hazards=[];this.echoes=[];this.history=[];this.historyClock=0;this.beacons=[];this.chests=[];this.activeEvent=null;this.eventIndex=0;this.spawnClock=2;this.satelliteClock=0;this.blackholeClock=4;this.stats={hitsTaken:0,rareFinds:0,beacons:0,echoes:0,dashes:0};this.setupSector();
 }
 emit(type,data={}){this.events.push({type,...data});}
 drain(){const e=this.events;this.events=[];return e;}
 get zone(){return ZONES[Math.floor(this.sector/3)]||ZONES[4];}
 get highTide(){return Math.floor(this.time/24)%2===1;}
 get boss(){return this.enemies.find(e=>e.boss);}
 get xpNeed(){return Math.floor(38+this.player.level*22+this.player.level**1.8*7);}
 count(id){return this.relics[id]||0;}
 get damageMult(){return(1+this.count('lens')*.16+this.count('crown')*.4)*(this.highTide?1+this.count('tide')*.35:1);}
 get speed(){return 235*(1+this.count('boots')*.1)*(this.activeEvent?.id==='gravity'?1.15:1);}
 get dashMax(){return 3.5*Math.pow(.82,this.count('dash'));}
 get echoMax(){return 14*Math.pow(.9,this.count('echo'))*(this.route==='echo'?.72:1)*(this.weapon.mod==='echo'?.8:1);}
 setupSector(){
 this.time=0;this.eventIndex=0;this.activeEvent=null;this.spawnClock=2;this.bossSpawned=false;this.enemies=[];this.bullets=[];this.hazards=[];this.pickups=[];this.echoes=[];this.history=[];this.chests=[];this.effects=[];this.player.x=1100;this.player.y=800;this.player.invuln=3;this.player.dashTime=0;
 const offset=this.rng.next()*TAU;this.beacons=Array.from({length:3},(_,i)=>({id:this.id++,x:1100+Math.cos(offset+i*TAU/3)*500,y:800+Math.sin(offset+i*TAU/3)*430,charge:0,done:false}));
 this.chests.push({id:this.id++,x:1100+this.rng.int(-240,240),y:800-260,type:'supply',cost:0});
 this.emit('sector',{sector:this.sector,story:this.zone.story});
 }
 addRelic(id){const r=RELICS.find(r=>r.id===id);if(!r||this.count(id)>=r.max)return false;this.relics[id]=this.count(id)+1;if(id==='shell'){this.player.maxHp+=25;this.heal(25);}if(id==='crown'){this.player.maxHp+=30;this.heal(30);}if(id==='phoenix')this.player.rescues++;return true;}
 heal(n){this.player.hp=Math.min(this.player.maxHp,this.player.hp+n);}
 gainXP(n){this.player.xp+=n*(1+this.count('magnet')*.1)*(this.route==='storm'?1.3:1);while(this.player.xp>=this.xpNeed){this.player.xp-=this.xpNeed;this.player.level++;this.pendingLevels++;this.heal(5);}}
 relicChoices(n=3,minimum){
 const pool=RELICS.filter(r=>this.count(r.id)<r.max);let weighted=[];for(const r of pool){let w={common:8,rare:5,epic:2,legendary:.6}[r.rarity];if(minimum==='epic')w={common:0,rare:1,epic:5,legendary:2}[r.rarity];weighted.push({r,key:-Math.log(Math.max(.00001,this.rng.next()))/Math.max(.00001,w)});}return weighted.sort((a,b)=>a.key-b.key).slice(0,n).map(x=>({type:'relic',id:x.r.id}));
 }
 offerLevel(){this.pendingLevels--;this.mode='choice';this.rewardKind='level';this.choices=this.relicChoices();if(!this.choices.length){this.choices=[{type:'heal',amount:60},{type:'coins',amount:100}];}this.emit('choice');}
 choose(i){
 if(this.mode!=='choice'||!this.choices[i])return false;const c=this.choices[i];
 if(c.type==='relic')this.addRelic(c.id);if(c.type==='weapon'){this.weapon=c.weapon;this.stats.rareFinds+=['epic','legendary'].includes(c.weapon.rarity)?1:0;}
 if(c.type==='heal')this.heal(c.amount);if(c.type==='coins')this.player.coins+=c.amount;
 if(c.type==='route'){this.route=c.id;this.sector++;this.mode='playing';this.choices=[];this.rewardKind='';this.heal(25+this.count('supply')*30+(c.id==='quiet'?35:0));this.setupSector();return true;}
 if(this.rewardKind==='sector'){this.offerRoutes();return true;}
 this.mode='playing';this.choices=[];this.emit('resume');return true;
 }
 skipChoice(){if(this.mode!=='choice'||this.rewardKind!=='chest')return;this.player.coins+=20;this.mode='playing';this.emit('resume');}
 offerRoutes(){this.mode='choice';this.rewardKind='route';this.choices=this.rng.shuffle(ROUTES).slice(0,3).map(r=>({type:'route',id:r.id}));this.emit('choice');}
 finishSector(){
 if(this.mode!=='playing')return;
 this.bullets=[];this.enemies=[];this.hazards=[];this.echoes=[];this.pickups=[];
 if(this.sector>=14){this.mode='won';this.emit('win');return;}
 this.player.coins+=50;this.heal(30);if(this.route==='storm')this.pendingLevels++;
 this.mode='choice';this.rewardKind='sector';this.choices=this.relicChoices(2,this.sector%3===2?'epic':undefined);this.choices.push({type:'weapon',weapon:rollWeapon(this.rng,this.sector+1,this.sector%3===2?'epic':undefined)});this.emit('choice');
 }
 tryChest(){
 const c=this.chests.find(c=>dist(c,this.player)<90);if(!c)return;
 if(this.player.coins<c.cost){this.emit('toast',{text:`需要 ${c.cost} 枚星币`});return;}
 this.player.coins-=c.cost;this.chests=this.chests.filter(x=>x!==c);this.mode='choice';this.rewardKind='chest';
 const luck=this.count('luck')*.035+(this.route==='treasure'?.12:0);const rarity=c.type==='relic'?'legendary':this.rng.next()<luck?'epic':undefined;
 this.choices=[{type:'weapon',weapon:rollWeapon(this.rng,this.sector,rarity)},...(c.type==='relic'||this.rng.next()<.35?this.relicChoices(1,c.type==='relic'?'epic':undefined):[{type:'coins',amount:60}]),{type:'heal',amount:65}];this.emit('choice');
 }
 spawnEnemy(type,opts={}){
 if(this.enemies.length>=65&&!opts.boss)return null;
 const def=ENEMIES[type]||ENEMIES.drifter,p=this.player,angle=this.rng.next()*TAU;
 const mult=1+this.sector*.105;const x=clamp(p.x+Math.cos(angle)*this.rng.int(590,820),45,WORLD.w-45),y=clamp(p.y+Math.sin(angle)*this.rng.int(490,710),45,WORLD.h-45);
 const e={id:this.id++,type,x,y,r:def.r,hp:def.hp*mult,maxHp:def.hp*mult,speed:def.speed*(1+this.sector*.016),damage:def.damage*(1+this.sector*.025),xp:def.xp,color:def.color,age:0,cd:this.rng.next()*2+1,phase:0,slow:0,burn:0,burnDmg:0,hit:0,vx:0,vy:0,...opts};
 if(this.route==='storm'&&!opts.boss){e.hp*=1.15;e.maxHp=e.hp;}
 this.enemies.push(e);return e;
 }
 spawnBoss(){
 this.bossSpawned=true;const act=Math.floor(this.sector/3);this.enemies=this.enemies.filter(e=>e.age>0).slice(0,8);this.bullets=this.bullets.filter(b=>!b.enemy);this.hazards=[];
 const hp=[18000,38000,68000,100000,150000][act]*(this.difficulty==='normal'?1.15:1);
 const e=this.spawnEnemy('shield',{boss:true,bossKind:act,name:this.zone.boss,r:52+act*2,hp,maxHp:hp,x:1100,y:420,speed:34,damage:18+act*2,xp:150,cd:2.5,phase:0,color:this.zone.color});
 if(dist(e,this.player)<200){e.y=clamp(this.player.y-350,80,1520);if(dist(e,this.player)<200)e.x=clamp(this.player.x+350,80,2120);}
 this.emit('boss',{text:this.zone.boss});this.emit('sound',{name:'boss'});
 }
 startEvent(){
 const ids=['rain','surge','gravity','caravan','elite','rescue'];let id=this.rng.pick(ids);
 this.activeEvent={id,left:28};
 const names={rain:'星雨漂流 · 大量星屑与补给落入海域',surge:'潮汐共振 · 射速提升 35%，敌群增多',gravity:'失重海流 · 移速提升，敌弹减速',caravan:'沉船商店 · 身旁出现一只物资箱',elite:'不速之客 · 击败金色精英获得珍稀宝箱',rescue:'无人信号 · 临时信标已出现，充能获得修复'};
 if(id==='rain'){for(let i=0;i<20;i++)this.pickups.push({id:this.id++,x:clamp(this.player.x+this.rng.int(-360,360),25,2175),y:clamp(this.player.y+this.rng.int(-280,280),25,1575),kind:i%5===0?'heal':'xp',value:i%5===0?12:8,age:0});}
 if(id==='caravan')this.chests.push({id:this.id++,x:clamp(this.player.x+100,40,2160),y:this.player.y,type:'supply',cost:40});
 if(id==='elite')this.spawnEnemy('charger',{elite:true,hp:500*(1+this.sector*.13),maxHp:500*(1+this.sector*.13),r:31,color:'#f3d594',xp:55});
 if(id==='rescue')this.beacons.push({id:this.id++,x:clamp(this.player.x+180,100,2100),y:clamp(this.player.y-120,100,1500),charge:0,done:false,temporary:true});
 this.emit('event',{text:names[id]});
 }
 dash(input){const p=this.player;if(p.dashCD>0)return false;let x=input.mx,y=input.my;let l=Math.hypot(x,y);if(l<.1){x=Math.cos(p.angle);y=Math.sin(p.angle);l=1;}p.dx=x/l;p.dy=y/l;p.dashTime=.2;p.invuln=Math.max(p.invuln,.42);p.dashCD=this.dashMax;this.stats.dashes++;this.emit('sound',{name:'dash'});return true;}
 summonEcho(){
 const p=this.player;if(p.echoCD>0)return false;p.echoCD=this.echoMax;const n=1+this.count('binary');
 const recorded=this.history.map(h=>({...h}));for(let i=0;i<n;i++)this.echoes.push({x:p.x,y:p.y,originX:p.x+(i===1?55:0),originY:p.y,life:6+this.count('echo')*2,age:0,recorded,shotCD:0,angle:p.angle});
 this.stats.echoes++;this.heal(this.count('echoheart')*15);this.emit('sound',{name:'echo'});this.emit('toast',{text:'余响上线 · 复刻最近 4 秒的轨迹与射击'});return true;
 }
 fire(x,y,angle,echo=false,scale=1){
 if(this.bullets.length>550)return;
 const w=weaponInfo(this.weapon),crit=this.rng.next()<.08+this.count('glass')*.12+(this.weapon.mod==='lucky'?.12:0);const dmg=w.damage*this.damageMult*(crit?2:1)*scale*(echo?(.55+this.count('binary')*.2+(this.weapon.mod==='echo'?.25:0)):1);
 for(let i=0;i<w.count;i++){
 let a=angle+(i-(w.count-1)/2)*w.spread+(this.rng.next()-.5)*(w.count===1?w.spread*2:.025);
 this.bullets.push({id:this.id++,x:x+Math.cos(a)*25,y:y+Math.sin(a)*25,px:x,py:y,vx:Math.cos(a)*w.speed,vy:Math.sin(a)*w.speed,r:w.radius,damage:dmg,life:w.life,age:0,pierce:(w.pierce||0)+this.count('pierce'),hitIds:[],element:w.el.id,color:echo?'#94b4f0':w.el.color,homing:w.homing||0,blast:w.blast||0,boomerang:!!w.boomerang,ricochet:this.weapon.mod==='ricochet',crit,echo});
 }
 if(!echo){this.shots++;this.emit('sound',{name:'shoot',frame:w.id});if(this.count('triad')&&this.shots%3===0){for(let i=0;i<8;i++){let a=i*TAU/8;this.bullets.push({id:this.id++,x,y,px:x,py:y,vx:Math.cos(a)*480,vy:Math.sin(a)*480,r:4,damage:dmg*.45,life:.9,age:0,pierce:0,hitIds:[],element:w.el.id,color:w.el.color});}}}
 }
 enemyShot(e,angle,speed=180,damage=e.damage,r=5){if(this.bullets.length>650)return;this.bullets.push({id:this.id++,x:e.x,y:e.y,px:e.x,py:e.y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,r,damage,enemy:true,color:e.boss?'#f6be99':'#f0a9a3',life:5,age:0});}
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
 this.pickups.push({id:this.id++,x:e.x,y:e.y,kind:'xp',value:e.xp,age:0});
 if(this.rng.next()<.28)this.pickups.push({id:this.id++,x:e.x+8,y:e.y,kind:'coin',value:3+Math.floor(this.sector/3),age:0});
 if(this.rng.next()<.075+this.count('supply')*.025)this.pickups.push({id:this.id++,x:e.x-8,y:e.y,kind:'heal',value:10,age:0});
 if(this.weapon.mod==='vampire'&&this.rng.next()<.25)this.heal(3);
 if(!noProc&&this.count('blast')&&this.rng.next()<.25*this.count('blast'))this.explode(e.x,e.y,85,24*this.damageMult);
 if(e.elite)this.chests.push({id:this.id++,x:e.x,y:e.y,type:'relic',cost:0});
 if(e.boss){this.bossKills++;this.gainXP(120);this.emit('toast',{text:'灯塔重燃 · 航线已恢复'});this.finishSector();}
 }
 explode(x,y,r,damage){this.emit('burst',{x,y,color:'#efc19a',r});for(const e of [...this.enemies])if(e.hp>0&&Math.hypot(e.x-x,e.y-y)<r+e.r)this.hitEnemy(e,damage,{noProc:true});}
 updateEnemy(e,dt){
 if(e.hp<=0)return;e.age+=dt;e.hit=Math.max(0,e.hit-dt);e.slow=Math.max(0,e.slow-dt);if(e.burn>0){e.burn-=dt;this.hitEnemy(e,e.burnDmg*dt,{noProc:true});if(e.hp<=0)return;}
 const p=this.player;let dx=p.x-e.x,dy=p.y-e.y,d=Math.hypot(dx,dy)||1,a=Math.atan2(dy,dx),speed=e.speed*(e.slow>0?.5:1)*(this.highTide?.9:1);e.angle=a;e.cd-=dt;
 if(e.boss){this.updateBoss(e,dt,a,d);return;}
 let move=1;
 if(e.type==='spitter'||e.type==='sniper'||e.type==='spiral'){move=d<260?-.55:d>360?1:0;if(e.cd<=0){if(e.type==='spitter'){for(let j=-1;j<=1;j++)this.enemyShot(e,a+j*.17,185);e.cd=3;}if(e.type==='spiral'){this.ring(e,7,145,e.age);e.cd=3.8;}if(e.type==='sniper'){this.hazards.push({id:this.id++,type:'line',x:e.x,y:e.y,angle:a,length:1000,width:18,wait:1.2,life:.32,damage:e.damage+3,fired:false});e.cd=4.3;}}}
 if(e.type==='summoner'){move=d<360?-.3:.6;if(e.cd<=0){for(let i=0;i<2;i++)this.spawnEnemy('skitter',{x:clamp(e.x+this.rng.int(-40,40),25,2175),y:clamp(e.y+this.rng.int(-40,40),25,1575)});e.cd=7;}}
 if(e.type==='charger'){
 if(e.phase===0&&e.cd<=0){e.phase=1;e.wind=.8;e.chargeAngle=a;this.emit('warning',{x:e.x,y:e.y,angle:a});}
 if(e.phase===1){move=0;e.wind-=dt;if(e.wind<=0){e.phase=2;e.wind=.6;}}
 if(e.phase===2){move=0;e.x+=Math.cos(e.chargeAngle)*470*dt;e.y+=Math.sin(e.chargeAngle)*470*dt;e.wind-=dt;if(e.wind<=0){e.phase=0;e.cd=3.6;}}
 }
 if(e.type==='bomber'&&d<105&&e.phase===0){e.phase=1;e.wind=1.2;}
 if(e.type==='bomber'&&e.phase===1){move=0;e.wind-=dt;if(e.wind<=0){this.hazards.push({id:this.id++,type:'circle',x:e.x,y:e.y,r:95,wait:0,life:.2,damage:e.damage,fired:false});this.hitEnemy(e,99999,{noProc:true});return;}}
 if(e.type==='skitter'){const wiggle=Math.sin(e.age*5+e.id)*.7;a+=wiggle;dx=Math.cos(a)*d;dy=Math.sin(a)*d;}
 e.x=clamp(e.x+dx/d*speed*move*dt,25,2175);e.y=clamp(e.y+dy/d*speed*move*dt,25,1575);
 if(d<e.r+p.r)this.hurtPlayer(e.damage);
 }
 updateBoss(e,dt,a,d){
 const p=this.player;e.phase=e.hp/e.maxHp<.45?1:0;
 if(d>230){e.x+=Math.cos(a)*e.speed*dt;e.y+=Math.sin(a)*e.speed*dt;}else if(d<150){e.x-=Math.cos(a)*e.speed*dt;e.y-=Math.sin(a)*e.speed*dt;}
 if(d<e.r+p.r)this.hurtPlayer(e.damage);
 if(e.cd>0)return;
 e.attack=(e.attack||0)+1;const k=e.bossKind;
 if(k===0){if(e.attack%2){this.ring(e,12+e.phase*4,135,e.age*.4);}else{for(let i=0;i<3;i++)this.hazards.push({id:this.id++,type:'circle',x:clamp(p.x+(i-1)*125,60,2140),y:p.y,r:78,wait:1.4,life:.35,damage:22,fired:false});}e.cd=2.6-e.phase*.4;}
 if(k===1){for(let j=0;j<5+e.phase*2;j++)this.enemyShot(e,a+(j-2-e.phase)*.2,170);if(e.attack%3===0)for(let i=0;i<3;i++)this.spawnEnemy('bomber',{x:clamp(e.x+Math.cos(i*TAU/3)*95,30,2170),y:clamp(e.y+Math.sin(i*TAU/3)*95,30,1570)});e.cd=2.2-e.phase*.4;}
 if(k===2){for(let i=0;i<3+e.phase;i++)this.hazards.push({id:this.id++,type:'line',x:e.x,y:e.y,angle:a+(i-1)*.45,length:1800,width:24,wait:1.35,life:.38,damage:24,fired:false});if(e.attack%3===0)this.ring(e,12,135);e.cd=3;}
 if(k===3){this.ring(e,14+e.phase*4,145,e.age);this.hazards.push({id:this.id++,type:'circle',x:p.x,y:p.y,r:95,wait:1.6,life:.4,damage:24,fired:false});if(e.attack%3===0){e.x=clamp(2200-e.x,150,2050);e.y=clamp(1600-e.y,150,1450);this.emit('burst',{x:e.x,y:e.y,color:e.color,r:80});}e.cd=2.5-e.phase*.4;}
 if(k===4){if(e.attack%3===0){for(let i=0;i<4;i++)this.hazards.push({id:this.id++,type:'circle',x:clamp(p.x+Math.cos(i*TAU/4)*115,60,2140),y:clamp(p.y+Math.sin(i*TAU/4)*115,60,1540),r:75,wait:1.5,life:.4,damage:26,fired:false});}else{this.ring(e,16+e.phase*4,140,e.age*.6);for(let j=-1;j<=1;j++)this.enemyShot(e,a+j*.15,215);}if(e.attack%5===0)this.spawnEnemy('spitter');e.cd=2.35-e.phase*.35;}
 }
 updateBullets(dt){
 const p=this.player;for(const b of this.bullets){if(b.life<=0)continue;b.px=b.x;b.py=b.y;b.age+=dt;b.life-=dt;
 if(b.homing&&!b.enemy){let target=null,near=450;for(const e of this.enemies){const d=dist(e,b);if(e.hp>0&&!b.hitIds.includes(e.id)&&d<near){near=d;target=e;}}if(target){let a=Math.atan2(b.vy,b.vx),to=Math.atan2(target.y-b.y,target.x-b.x),delta=Math.atan2(Math.sin(to-a),Math.cos(to-a));a+=clamp(delta,-b.homing*dt,b.homing*dt);let s=Math.hypot(b.vx,b.vy);b.vx=Math.cos(a)*s;b.vy=Math.sin(a)*s;}}
 if(b.boomerang&&b.age>.75&&!b.turned){b.vx*=-1;b.vy*=-1;b.turned=true;b.hitIds=[];}
 const slow=b.enemy&&this.activeEvent?.id==='gravity'?.65:1;b.x+=b.vx*dt*slow;b.y+=b.vy*dt*slow;
 if(b.x<0||b.x>WORLD.w||b.y<0||b.y>WORLD.h){if(b.ricochet){if(b.x<0||b.x>WORLD.w)b.vx*=-1;if(b.y<0||b.y>WORLD.h)b.vy*=-1;b.x=clamp(b.x,0,WORLD.w);b.y=clamp(b.y,0,WORLD.h);b.ricochet=false;}else b.life=0;}
 if(b.enemy){if(segmentDistance(p.x,p.y,b.px,b.py,b.x,b.y)<p.r+b.r){this.hurtPlayer(b.damage);b.life=0;}}
 else for(const e of this.enemies){if(e.hp<=0||b.hitIds.includes(e.id))continue;if(segmentDistance(e.x,e.y,b.px,b.py,b.x,b.y)<e.r+b.r){b.hitIds.push(e.id);this.hitEnemy(e,b.damage,b);if(b.blast)this.explode(b.x,b.y,b.blast,b.damage*.5);this.emit('hit',{x:b.x,y:b.y,color:b.color});if(b.pierce<=0){b.life=0;break;}b.pierce--;}}
 }
 this.bullets=this.bullets.filter(b=>b.life>0);
 }
 update(dt,input=emptyInput()){
 if(this.mode!=='playing')return;dt=clamp(dt,0,.05);if(dt===0)return;
 const p=this.player;this.elapsed+=dt;this.time+=dt;p.angle=Math.atan2(input.ay||0,input.ax||.00001);p.invuln=Math.max(0,p.invuln-dt);p.dashCD=Math.max(0,p.dashCD-dt);p.echoCD=Math.max(0,p.echoCD-dt);p.shotCD-=dt;
 this.heal((.1+this.count('heart')*.35+(!this.highTide?this.count('tide')*.3:0))*dt);
 if(input.dash)this.dash(input);if(input.echo)this.summonEcho();if(input.interact){this.tryChest();if(this.mode!=='playing')return;}
 if(p.dashTime>0){p.x+=p.dx*1050*dt;p.y+=p.dy*1050*dt;p.dashTime-=dt;if(p.dashTime<=0&&this.count('capacitor')){this.bullets=this.bullets.filter(b=>!b.enemy||dist(b,p)>170);this.explode(p.x,p.y,145,55*this.count('capacitor')*this.damageMult);}}
 else{let l=Math.hypot(input.mx,input.my);if(l>0){p.x+=input.mx/Math.max(1,l)*this.speed*dt;p.y+=input.my/Math.max(1,l)*this.speed*dt;}}
 p.x=clamp(p.x,24,WORLD.w-24);p.y=clamp(p.y,24,WORLD.h-24);
 if(input.shoot&&p.shotCD<=0){this.fire(p.x,p.y,p.angle);p.shotCD=1/(weaponInfo(this.weapon).rate*(1+this.count('spring')*.12)*(this.activeEvent?.id==='surge'?1.35:1));}
 this.historyClock+=dt;if(this.historyClock>=.1){this.historyClock-=.1;this.history.push({x:p.x,y:p.y,angle:p.angle,shoot:!!input.shoot});if(this.history.length>40)this.history.shift();}
 for(const e of this.echoes){e.age+=dt;e.life-=dt;e.shotCD-=dt;const h=e.recorded[Math.floor(e.age*10)%Math.max(1,e.recorded.length)];if(h){const base=e.recorded[0];e.x=clamp(e.originX+h.x-base.x,20,2180);e.y=clamp(e.originY+h.y-base.y,20,1580);e.angle=h.angle;if(h.shoot&&e.shotCD<=0){this.fire(e.x,e.y,e.angle,true);e.shotCD=1/(weaponInfo(this.weapon).rate*(1+this.count('spring')*.12));}}else{e.angle=p.angle;if(input.shoot&&e.shotCD<=0){this.fire(e.x,e.y,e.angle,true);e.shotCD=1/weaponInfo(this.weapon).rate;}}}
 this.echoes=this.echoes.filter(e=>e.life>0);
 this.spawnClock-=dt;if(this.spawnClock<=0&&this.time<this.duration){let pool=['drifter','drifter','skitter'];if(this.time>22||this.sector>0)pool.push('spitter');if(this.time>65||this.sector>0)pool.push('charger','shield');if(this.sector>=2)pool.push('bomber','summoner');if(this.sector>=4)pool.push('sniper');if(this.sector>=6)pool.push('spiral');const count=1+Math.floor(this.sector/4)+(this.time>100?1:0)+(this.activeEvent?.id==='surge'?1:0);for(let i=0;i<count;i++)this.spawnEnemy(this.rng.pick(pool));this.spawnClock=(this.route==='quiet'?2.2:1.8)*(this.difficulty==='relaxed'?1.15:1);}
 for(const e of [...this.enemies]){this.updateEnemy(e,dt);if(this.mode!=='playing')return;}
 // Soft separation keeps swarms readable, without solid geometry that can trap players.
 for(let i=0;i<this.enemies.length;i++)for(let j=i+1;j<this.enemies.length;j++){const a=this.enemies[i],b=this.enemies[j];let dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy),min=(a.r+b.r)*.8;if(d<min&&d>.01){const push=(min-d)*dt*2;a.x-=dx/d*push;a.y-=dy/d*push;b.x+=dx/d*push;b.y+=dy/d*push;}}
 this.updateBullets(dt);if(this.mode!=='playing')return;this.enemies=this.enemies.filter(e=>e.hp>0);
 for(const h of this.hazards){h.wait-=dt;if(h.wait<=0){if(!h.fired){h.fired=true;this.emit('burst',{x:h.x,y:h.y,color:'#f3a892',r:h.r||30});}h.life-=dt;const hit=h.type==='circle'?dist(h,p)<h.r+p.r:segmentDistance(p.x,p.y,h.x,h.y,h.x+Math.cos(h.angle)*h.length,h.y+Math.sin(h.angle)*h.length)<h.width+p.r;if(hit)this.hurtPlayer(h.damage);}}
 this.hazards=this.hazards.filter(h=>h.life>0);if(this.mode!=='playing')return;
 for(const item of this.pickups){item.age+=dt;let d=dist(item,p),range=100+this.count('magnet')*65;if(d<range||item.age>24){item.x+=(p.x-item.x)/Math.max(1,d)*(310+item.age*5)*dt;item.y+=(p.y-item.y)/Math.max(1,d)*(310+item.age*5)*dt;}if(d<26){if(item.kind==='xp')this.gainXP(item.value);if(item.kind==='heal')this.heal(item.value);if(item.kind==='coin')p.coins+=Math.round(item.value*(1+this.count('luck')*.25)*(this.route==='treasure'?1.5:1));item.taken=true;}}
 this.pickups=this.pickups.filter(i=>!i.taken);if(this.pickups.length>220){let excess=this.pickups.splice(0,this.pickups.length-220);for(const i of excess){if(i.kind==='xp')this.gainXP(i.value);if(i.kind==='coin')p.coins+=i.value;}}
 for(const b of this.beacons)if(!b.done&&dist(b,p)<105){b.charge+=dt*(this.route==='echo'?1.5:1);if(b.charge>=8){b.done=true;this.stats.beacons++;this.gainXP(35+this.sector*4);p.coins+=25;this.heal(b.temporary?40:18);if(!b.temporary&&this.beacons.filter(v=>!v.temporary).every(v=>v.done))this.chests.push({id:this.id++,x:b.x+50,y:b.y,type:'supply',cost:0});this.emit('beacon',{x:b.x,y:b.y});this.emit('toast',{text:'信标点亮 · 获得星币、经验与修复；点亮全部信标可获物资箱'});this.emit('sound',{name:'beacon'});}}
 this.satelliteClock-=dt;if(this.count('orbit')&&this.satelliteClock<=0){for(let i=0;i<this.count('orbit');i++){let a=this.elapsed*1.7+i*TAU/this.count('orbit'),x=p.x+Math.cos(a)*55,y=p.y+Math.sin(a)*55;let t=this.enemies.filter(e=>dist(e,p)<500).sort((a,b)=>dist(a,p)-dist(b,p))[0];if(t){this.bullets.push({id:this.id++,x,y,px:x,py:y,vx:Math.cos(Math.atan2(t.y-y,t.x-x))*620,vy:Math.sin(Math.atan2(t.y-y,t.x-x))*620,r:4,damage:20*this.damageMult,life:1,age:0,pierce:0,hitIds:[],element:'plain',color:'#f0dca7'});}}this.satelliteClock=.65;}
 this.blackholeClock-=dt;if(this.count('blackhole')&&this.blackholeClock<=0){const t=this.enemies.find(e=>dist(e,p)<550);if(t){this.explode(t.x,t.y,200,95*this.damageMult);for(const e of this.enemies)if(!e.boss&&dist(e,t)<250){e.x+=(t.x-e.x)*.55;e.y+=(t.y-e.y)*.55;}}this.blackholeClock=8;}
 if(this.activeEvent){this.activeEvent.left-=dt;if(this.activeEvent.left<=0)this.activeEvent=null;}
 if(this.eventIndex<2&&this.time>55+this.eventIndex*60&&this.time<this.duration){this.eventIndex++;this.startEvent();}
 if(this.time>=this.duration){if(this.sector%3===2){if(!this.bossSpawned)this.spawnBoss();}else{this.finishSector();return;}}
 if(this.pendingLevels>0&&this.mode==='playing')this.offerLevel();
 }
 snapshot(){const o={};for(const k of Object.keys(this))if(!['events','effects','history'].includes(k))o[k]=this[k];o.rng={state:this.rng.state};return JSON.parse(JSON.stringify({version:VERSION,...o}));}
 static restore(data){
 if(!data||data.version!==VERSION||!Number.isInteger(data.sector)||data.sector<0||data.sector>14||!data.player||!Number.isFinite(data.player.hp)||!data.weapon||!FRAMES.some(f=>f.id===data.weapon.frame)||!RARITIES[data.weapon.rarity]||!['playing','choice'].includes(data.mode))throw new Error('存档格式不兼容或已损坏');
 for(const key of ['enemies','bullets','pickups','hazards','echoes','beacons','chests','choices'])if(!Array.isArray(data[key]))throw new Error('存档缺少场景数据');
 if(!data.rng||!Number.isFinite(data.rng.state)||!Number.isFinite(data.time)||!Number.isFinite(data.elapsed)||!Number.isFinite(data.player.x)||!Number.isFinite(data.player.y)||!Number.isFinite(data.player.maxHp)||data.player.maxHp<=0||!data.relics||Object.entries(data.relics).some(([id,n])=>!RELICS.some(r=>r.id===id&&Number.isInteger(n)&&n>=0&&n<=r.max)))throw new Error('存档状态无效');
 const g=new Game(data.seed,data.difficulty);for(const k of Object.keys(g))if(k in data&&!['events','effects','history','rng'].includes(k))g[k]=data[k];g.rng=new RNG(1);g.rng.state=data.rng.state>>>0;g.events=[];g.effects=[];g.history=[];return g;
 }
}
export function segmentDistance(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;if(!l)return Math.hypot(px-ax,py-ay);const t=clamp(((px-ax)*dx+(py-ay)*dy)/l,0,1);return Math.hypot(px-(ax+t*dx),py-(ay+t*dy));}

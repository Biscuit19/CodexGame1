import {WORLD,TAU,ZONES,weaponInfo,clamp,RNG,BEACON_SECONDS} from './core.js';
export class Renderer{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.w=0;this.h=0;this.dpr=1;this.camera={x:1100,y:800};this.scale=1;this.particles=[];this.rings=[];this.arcs=[];this.numbers=[];this.shake=0;this.flash=0;this.time=0;this.reduced=false;const rng=new RNG(1829);this.scenery=Array.from({length:150},()=>({x:rng.next()*2200,y:rng.next()*1600,r:rng.int(8,35),a:rng.next()*TAU,k:rng.int(0,5)}));this.stars=Array.from({length:110},()=>({x:rng.next(),y:rng.next(),r:rng.next()*1.7+.3,a:rng.next()*TAU}));this.tideMix=0;this.images={};this.ready=Promise.resolve(true);this.muzzle=0;this.resize();}
 resize(){this.w=innerWidth;this.h=innerHeight;this.dpr=Math.min(devicePixelRatio||1,2);this.canvas.width=this.w*this.dpr;this.canvas.height=this.h*this.dpr;this.scale=clamp(Math.min(this.w/1280,this.h/820),.58,1.18);}
 screenToWorld(x,y){return{x:(x-this.w/2)/this.scale+this.camera.x,y:(y-this.h/2)/this.scale+this.camera.y};}
 event(e){
 if(e.type==='sound'&&e.name==='shoot')this.muzzle=.085;
 if(e.type==='burst'||e.type==='hit'||e.type==='beacon'){let n=e.type==='hit'?3:e.type==='beacon'?28:Math.min(25,Math.ceil(e.r/3));for(let i=0;i<n;i++){const a=Math.random()*TAU,s=30+Math.random()*(e.r||20)*3;this.particles.push({x:e.x,y:e.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.3+Math.random()*.5,max:.8,r:1+Math.random()*2,color:e.color||'#bbf9d9'});}if(e.type!=='hit')this.rings.push({x:e.x,y:e.y,r:e.r||100,life:.6,color:e.color||'#befade'});}
 if(e.type==='hurt'){this.shake=8;this.flash=.16;}
 if(e.type==='arc')this.arcs.push({...e,life:.16});
 if(e.type==='number')this.numbers.push({...e,life:.6});
 if(this.particles.length>550)this.particles.splice(0,this.particles.length-550);
 }
 circle(x,y,r,fill,stroke,lw=1){const c=this.ctx;c.beginPath();c.arc(x,y,Math.max(.1,r),0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.lineWidth=lw;c.strokeStyle=stroke;c.stroke();}}
 line(x,y,tx,ty,color,width=1){const c=this.ctx;c.beginPath();c.moveTo(x,y);c.lineTo(tx,ty);c.strokeStyle=color;c.lineWidth=width;c.stroke();}
 poly(points,fill,stroke,lw=1){const c=this.ctx;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke();}}
 glow(x,y,r,color){const c=this.ctx,g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
 text(s,x,y,size=10,color='#9abbb4',align='center'){const c=this.ctx;c.font=`${Math.max(18/this.scale,size*1.15)}px "Segoe UI", "Microsoft YaHei", sans-serif`;c.textAlign=align;c.fillStyle=color;c.fillText(s,x,y);}
 draw(game,dt=0){
 this.time+=dt;this.muzzle=Math.max(0,this.muzzle-dt);if(game)this.tideMix+=(Number(game.highTide)-this.tideMix)*Math.min(1,dt*1.8);const c=this.ctx;c.setTransform(this.dpr,0,0,this.dpr,0,0);c.fillStyle='#08171e';c.fillRect(0,0,this.w,this.h);
 if(!game){this.home();return;}
 const lerp=1-Math.exp(-dt*8);this.camera.x+=(game.player.x-this.camera.x)*lerp;this.camera.y+=(game.player.y-this.camera.y)*lerp;
 const hw=this.w/(2*this.scale),hh=this.h/(2*this.scale);this.camera.x=clamp(this.camera.x,Math.min(hw,1100),Math.max(WORLD.w-hw,1100));this.camera.y=clamp(this.camera.y,Math.min(hh,800),Math.max(WORLD.h-hh,800));
 c.save();c.translate(this.w/2,this.h/2);if(!this.reduced&&this.shake>0)c.translate((Math.random()-.5)*this.shake,(Math.random()-.5)*this.shake);c.scale(this.scale,this.scale);c.translate(-this.camera.x,-this.camera.y);
 this.ground(game);this.shopBeacon(game);this.incoming(game);for(const b of game.beacons)this.beacon(b,game.zone.color);for(const chest of game.chests)this.chest(chest,game);
 for(const h of game.hazards)this.hazard(h);
 for(const item of game.pickups){const bob=Math.sin(this.time*3+item.id)*2;this.glow(item.x,item.y,13,item.kind==='heal'?'#9bdfb625':item.kind==='coin'?'#efca8625':'#a6ebd01c');c.save();c.translate(item.x,item.y+bob);if(item.kind==='xp')this.poly([[0,-5],[4,0],[0,5],[-4,0]],'#a7eac7','#d2ffe4');else if(item.kind==='coin'){this.circle(0,0,4,'#b19155','#efda9f');this.line(0,-2,0,2,'#fff1b2');}else{this.circle(0,0,7,'#163e35','#8ee4b6');c.fillStyle='#a3f3c7';c.fillRect(-4,-1.5,8,3);c.fillRect(-1.5,-4,3,8);}c.restore();}
 const actors=[...game.enemies.map(e=>({y:e.y,e})),...game.echoes.map(e=>({y:e.y,p:e,echo:true})),{y:game.player.y,p:game.player}].sort((a,b)=>a.y-b.y);
 for(const a of actors){if(a.e)this.enemy(a.e,game);else this.player(a.p,a.echo,game);}
 for(const b of game.bullets){if(b.enemy){this.glow(b.x,b.y,15,'#ff183950');this.circle(b.x,b.y,b.r+2,'#b51432','#ff5772',2);this.circle(b.x,b.y,Math.max(1,b.r-2),'#ffb6c4');}else{this.line(b.x-b.vx*.022,b.y-b.vy*.022,b.x,b.y,b.color,b.r*1.7);this.line(b.x-b.vx*.01,b.y-b.vy*.01,b.x,b.y,'#eaffef',Math.max(1,b.r*.5));if(b.boomerang){c.save();c.translate(b.x,b.y);c.rotate(b.age*10);c.strokeStyle=b.color;c.lineWidth=3;c.beginPath();c.arc(0,0,11,0,Math.PI*1.4);c.stroke();c.restore();}}}
 for(let i=0;i<game.count('orbit');i++){const a=game.elapsed*1.7+i*TAU/game.count('orbit'),x=game.player.x+Math.cos(a)*55,y=game.player.y+Math.sin(a)*55;this.circle(x,y,8,'#263f40','#e8d5a3');this.circle(x,y,3,'#f0db9a');}
 this.effects(dt);c.restore();this.minimap(game);this.crosshair(game);
 if(this.flash>0&&!this.reduced){c.fillStyle=`rgba(245,100,100,${this.flash*.6})`;c.fillRect(0,0,this.w,this.h);}this.flash=Math.max(0,this.flash-dt);this.shake=Math.max(0,this.shake-dt*40);
 }
 ground(g){
 const c=this.ctx,z=g.zone;c.fillStyle=z.dark;c.fillRect(0,0,WORLD.w,WORLD.h);c.fillStyle=`rgba(20,85,130,${this.tideMix*.48})`;c.fillRect(0,0,2200,1600);c.fillStyle=`rgba(112,94,56,${(1-this.tideMix)*.17})`;c.fillRect(0,0,2200,1600);
 const gr=c.createRadialGradient(1100,800,80,1100,800,1350);gr.addColorStop(0,'#264b4b38');gr.addColorStop(1,'#020b1677');c.fillStyle=gr;c.fillRect(0,0,2200,1600);
 // Cartographic lines and fine stippled bathymetry.
 c.strokeStyle=z.color+'09';c.lineWidth=1;for(let x=0;x<=2200;x+=80){c.beginPath();c.moveTo(x,0);c.lineTo(x,1600);c.stroke();}for(let y=0;y<=1600;y+=80){c.beginPath();c.moveTo(0,y);c.lineTo(2200,y);c.stroke();}
 for(let ring=0;ring<5;ring++){c.beginPath();c.ellipse(1100,800,360+ring*175,220+ring*128,-.18,0,TAU);c.strokeStyle=z.color+'0b';c.lineWidth=1;c.stroke();}
 for(const s of this.scenery){if(Math.abs(s.x-this.camera.x)>this.w/this.scale/2+60||Math.abs(s.y-this.camera.y)>this.h/this.scale/2+60)continue;c.save();c.translate(s.x,s.y);c.rotate(s.a);if(s.k<3){this.line(-s.r,0,s.r,0,z.color+'0e');this.line(-s.r*.6,6,s.r*.6,6,z.color+'09');this.circle(0,-8,1.2,z.color+'35');}else this.decoration(s,z);c.restore();}
 for(let i=0;i<14;i++){const y=(i*137+this.time*(12+this.tideMix*25))%1700-50;c.beginPath();for(let x=0;x<=2200;x+=45){const yy=y+Math.sin(x/190+this.time*.7+i)*22;if(x===0)c.moveTo(x,yy);else c.lineTo(x,yy);}c.strokeStyle=`rgba(164,223,246,${.025+this.tideMix*.085})`;c.lineWidth=1+this.tideMix*2;c.stroke();}
 if(this.tideMix<.7){c.save();c.globalAlpha=(1-this.tideMix)*.18;for(let i=0;i<8;i++){c.beginPath();c.ellipse(200+i*280,300+(i%3)*430,120,36,i*.3,0,TAU);c.fillStyle='#c9bd91';c.fill();}c.restore();}
 const tide=g.highTide?Math.sin(this.time*.6)*5+10:3;
 c.strokeStyle=z.color+'25';c.lineWidth=2;c.strokeRect(17+tide,17+tide,2166-tide*2,1566-tide*2);c.strokeStyle=z.color+'0b';c.lineWidth=20;c.strokeRect(10,10,2180,1580);
 for(let x=80;x<2200;x+=160){this.line(x,15,x,30,z.color+'55');this.line(x,1570,x,1585,z.color+'55');}for(let y=80;y<1600;y+=160){this.line(15,y,30,y,z.color+'55');this.line(2170,y,2185,y,z.color+'55');}
 this.text(z.sub,1100,92,13,z.color+'40');this.text(`SECTOR ${String(g.sector+1).padStart(2,'0')} / ${g.endless?'∞':'15'}`,1100,1515,11,z.color+'35');
 }
 decoration(s,z){const c=this.ctx,r=s.r;c.globalAlpha=.42;if(z.motif==='coral'){for(let i=-1;i<=1;i++){c.beginPath();c.moveTo(0,r*.5);c.quadraticCurveTo(i*r*.7,0,i*r,-r);c.strokeStyle='#b3829d';c.lineWidth=3;c.stroke();this.circle(i*r,-r,3,'#d798b0');}}else if(z.motif==='wreck'){this.poly([[-r,-r*.5],[r,-r*.4],[r*.7,r*.5],[-r*.7,r*.4]],'#3b4747','#82958c');for(let i=-1;i<=1;i++)this.line(i*r*.4,-r*.4,i*r*.4,r*.4,'#7c8c7d55');}else if(z.motif==='light'){this.circle(0,0,r*.5,'#4b4c39','#b1ae783d');this.glow(0,0,r,'#dad79320');this.circle(0,0,3,'#d7d598');}else{this.poly([[-r*.55,r*.4],[0,-r],[r*.5,r*.3],[0,r*.65]],z.motif==='glass'?'#314e50':'#3d4565',z.color+'40');this.line(0,-r,0,r*.6,z.color+'35');}c.globalAlpha=1;}
 beacon(b,color){const c=this.ctx;this.glow(b.x,b.y,100,b.done?'#a3f4ce13':color+'0b');c.save();c.translate(b.x,b.y);this.circle(0,0,100,null,b.done?'#9af1c912':color+'15');c.setLineDash([3,12]);this.circle(0,0,85,null,color+'30');c.setLineDash([]);this.poly([[0,-31],[24,-13],[24,16],[0,30],[-24,16],[-24,-13]],'#10242c',color+'65',1.5);this.poly([[0,-21],[14,-10],[14,10],[0,20],[-14,10],[-14,-10]],b.done?'#75bda5':'#294844',color+'a0');if(!b.done){this.circle(0,0,37,null,'#304f50',2);c.beginPath();c.arc(0,0,37,-Math.PI/2,-Math.PI/2+TAU*b.charge/BEACON_SECONDS);c.strokeStyle=color;c.lineWidth=3;c.stroke();}this.circle(0,-3,5,b.done?'#d2ffe0':color);if(b.done){c.globalAlpha=.16;this.poly([[-10,-5],[10,-5],[33,-175],[-33,-175]],color);c.globalAlpha=1;}this.text(b.done?'航标已点亮':b.charge>0?`充能 ${Math.floor(b.charge/BEACON_SECONDS*100)}%`:'靠近以点亮',0,58,10,b.done?'#709c8e':'#acc5b4');c.restore();}
 chest(ch,g){const c=this.ctx,x=ch.x,y=ch.y+Math.sin(this.time*2+ch.id)*3,color=ch.type==='relic'?'#ebce94':'#afd6c3';this.glow(x,y,36,color+'19');c.save();c.translate(x,y);this.poly([[-17,-7],[0,-16],[17,-7],[17,12],[0,21],[-17,12]],'#1c383c',color,1.5);this.poly([[-17,-7],[0,2],[17,-7],[0,-16]],'#486466',color);this.line(0,2,0,20,color);this.circle(0,-4,4,color);if(Math.hypot(g.player.x-x,g.player.y-y)<160)this.text(ch.cost?`${ch.cost} 星币 · E`:'物资箱 · E',0,-29,11,color);c.restore();}
 rounded(x,y,w,h,r,fill,stroke='#071c29',lw=2.5){const c=this.ctx;c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke();}}
 shell(x,y,w,h,color){const c=this.ctx,gr=c.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,color);gr.addColorStop(1,'#345260');this.rounded(x,y,w,h,Math.min(w,h)*.35,gr);c.fillStyle='#ffffff25';c.beginPath();c.ellipse(x+w*.38,y+h*.25,w*.22,h*.09,-.3,0,TAU);c.fill();}
 eyes(x,y,angle=0,size=1){const c=this.ctx;c.save();c.translate(x,y);c.scale(size,size);this.rounded(-13,-6,26,13,6,'#112937','#668b9855',1);for(const dx of [-6,6]){this.rounded(dx-2+Math.cos(angle)*2,-3+Math.sin(angle)*1.5,4,6,2,'#dffff0',null);}c.restore();}
 limb(x,y,tx,ty,color,width=8){const c=this.ctx;c.lineCap='round';this.line(x,y,tx,ty,'#071c29',width+4);this.line(x,y,tx,ty,color,width);}
 player(p,echo,g){const c=this.ctx,walk=Math.sin((p.walk||this.time)*13)*(p.moving?4:1),bob=Math.abs(walk)*.35,aim=p.angle||0,recoil=!echo&&this.muzzle>0?4:0;c.save();c.translate(p.x,p.y);if(echo)c.globalAlpha=.64;
 c.save();c.scale(1,.35);this.circle(0,42,23,'#00000040');c.restore();
 if(g.player.dashTime>0&&!echo){for(let i=1;i<4;i++){c.globalAlpha=.2/i;this.rounded(-g.player.dx*i*22-14,-g.player.dy*i*22-13,28,34,12,'#a6ffe2',null);}c.globalAlpha=1;}
 const color=echo?'#a3b8ff':'#88d9cb';this.limb(-9,11,-11,23+walk,'#63879c',9);this.limb(9,11,11,23-walk,'#63879c',9);
 this.rounded(-22,-6-bob,12,26,5,'#c2aa78');this.shell(-16,-8-bob,32,32,color);this.rounded(-16,-29-bob,32,29,12,'#d9e9d7');this.rounded(-13,-24-bob,26,16,6,'#173c50');this.eyes(0,-16-bob,aim,.8);
 this.rounded(-10,3-bob,20,6,3,'#edc175',null);c.save();c.rotate(aim);this.limb(6,10,20-recoil,10,color,8);this.rounded(12-recoil,2,24,12,4,'#718ea1');this.rounded(30-recoil,4,12,8,2,'#e4d6a8');this.line(18-recoil,3,31-recoil,3,weaponInfo(g.weapon).el.color,3);
 if(recoil){this.poly([[43,-1],[58,6],[43,13],[48,6]],'#fff0ab');this.line(43,6,66,6,'#ffe4a5',2);}c.restore();
 if(p.invuln>0&&!echo){this.text('✦',-24,-30,17,'#e0fff1');}if(echo)this.text('分身',0,-45,16,'#c7d6ff');c.restore();}
 enemy(e,g){if(e.hp<=0)return;const c=this.ctx;c.save();c.translate(e.x,e.y);c.save();c.scale(1,.32);this.circle(0,e.r*1.6,e.r,'#00000038');c.restore();if(e.boss){this.bossRig(e);c.restore();return;}
 const r=e.r,t=e.age*6+e.id,bob=Math.sin(t)*2,look=e.angle||0,color=e.hit>0?'#fff0cd':e.color;const type=e.type;
 c.save();c.translate(0,bob);c.rotate(Math.sin(t*.5)*.05);
 if(['spitter','orbiter','spiral','healer','summoner'].includes(type)){for(let i=0;i<4;i++){const x=(i-1.5)*r*.42;this.limb(x,r*.4,x+Math.sin(t+i)*6,r*1.1+Math.sin(t+i)*4,color,5);}}
 else{this.limb(-r*.45,r*.4,-r*.65,r*.95+Math.sin(t)*4,color,6);this.limb(r*.45,r*.4,r*.65,r*.95-Math.sin(t)*4,color,6);}
 if(['charger','reaper','lancer'].includes(type)){this.poly([[-r*.8,-r*.3],[-r*.9,-r*1.2],[-r*.2,-r*.7]],color,'#071c29',2);this.poly([[r*.8,-r*.3],[r*.9,-r*1.2],[r*.2,-r*.7]],color,'#071c29',2);}
 if(type==='leaper'||type==='skitter'){for(const side of [-1,1])this.shell(side*r*.65-r*.3,-r*.9,r*.6,r*.65,color);}
 this.shell(-r*.85,-r*.65,r*1.7,r*1.4,color);this.eyes(0,-r*.08,look,r/23);
 if(type==='shield'){this.rounded(-r*.65,r*.25,r*1.3,r*.5,5,'#7d9caf');this.line(-r*.4,r*.4,r*.4,r*.4,'#ceded7',2);}
 if(type==='healer'){this.line(-5,-r*.6,5,-r*.6,'#e1fff0',3);this.line(0,-r*.85,0,-r*.35,'#e1fff0',3);}
 if(type==='bomber'||type==='miner'){this.limb(0,-r*.6,4,-r, '#677f94',3);this.circle(4,-r-3,4,Math.sin(t*2)>0?'#ffe6a2':'#d27769');}
 if(type==='splitter'){this.line(0,-r*.6,-3,r*.45,'#183440',3);this.circle(0,-r*.6,3,'#c8f4d7');}
 if(type==='mimic'){this.rounded(-r*.7,-r*.75,r*1.4,7,3,'#d7b574');this.poly([[-5,-r*.9],[0,-r*1.25],[5,-r*.9]],'#ffe0a3');}
 if(['spitter','sniper','orbiter','lancer'].includes(type)){c.save();c.rotate(look);this.rounded(r*.35,2,r*.9,7,3,'#c7d4c9');c.restore();}
 if(type==='spiral'||type==='summoner'){const spin=this.time*2;for(let i=0;i<3;i++){const a=spin+i*TAU/3;this.poly([[Math.cos(a)*r,-r*.85+Math.sin(a)*4],[Math.cos(a)*r+3,-r*.85+Math.sin(a)*4-5],[Math.cos(a)*r+6,-r*.85+Math.sin(a)*4]],'#e7c7fa');}}
 c.restore();
 if((type==='charger'||type==='reaper')&&e.phase===1){this.line(0,0,Math.cos(e.chargeAngle)*220,Math.sin(e.chargeAngle)*220,'#ff4665c0',3);}
 if(type==='bomber'&&e.phase===1)this.circle(0,0,95,'#ff21452b','#ff4665',2);
 if(e.specialType)this.text({treasurer:'运宝者',guardian:'护卫',twin:'共生双子',sentinel:'脉冲哨兵',rift:'裂隙守卫'}[e.specialType]||'特殊敌人',0,-r-25,19,'#ff809a');
 if(e.affix)this.text({haste:'»',armored:'◆',volatile:'✦'}[e.affix],r+8,-r-6,17,{haste:'#ffd0a2',armored:'#d2e9ff',volatile:'#efbcff'}[e.affix]);
 if(e.elite){this.poly([[-14,-r-13],[-17,-r-28],[-6,-r-22],[0,-r-33],[7,-r-22],[17,-r-28],[14,-r-13]],'#f4ce83','#453b2c',2);this.text('悬赏 '+Math.ceil(e.ttl||0)+'s',0,-r-44,18,'#ffe3a4');}
 if(e.hp<e.maxHp||e.elite){this.rounded(-r-2,r+9,r*2+4,6,2,'#081923',null);this.rounded(-r,r+11,Math.max(.1,r*2*e.hp/e.maxHp),2,1,e.elite?'#ffe09c':e.color,null);}c.restore();}
 bossRig(e){const c=this.ctx,k=e.bossKind,r=e.r,t=e.age,bob=Math.sin(t*3)*3,color=e.hit>0?'#fff0c8':e.color;
 if(e.motion==='windup'){if(k!==1&&k!==2){const a=e.motionAngle;this.line(0,0,Math.cos(a)*470,Math.sin(a)*470,'#ff4665c0',5);for(let i=1;i<4;i++){c.save();c.rotate(a);this.poly([[i*110-16,-13],[i*110,0],[i*110-16,13]],'#ff5777');c.restore();}}
 this.text(['蓄力冲撞','跃击准备','震地准备','镜面突进','潮龙俯冲'][k],0,-r-35,21,'#ffe0a9');}
 if(e.motion==='strike'&&k!==1&&k!==2){for(let i=1;i<5;i++)this.line(-Math.cos(e.motionAngle)*i*24,-Math.sin(e.motionAngle)*i*24,-Math.cos(e.motionAngle)*(i*24+14),-Math.sin(e.motionAngle)*(i*24+14),e.color+'aa',Math.max(3,17-i*3));}
 c.save();c.translate(0,bob-(e.lift||0));if(e.motion==='windup')c.scale(1.07,.91);if(e.motion==='recover')c.scale(.98,1.03);
 if(k===0){for(const side of [-1,1]){c.save();c.translate(side*r*.65,10);c.rotate(side*(.45+Math.sin(t*4)*.25));this.shell(-r*.3,-r*.1,r*.65,r*.85,color);c.restore();}this.poly([[-r*.35,r*.7],[0,r*1.3],[r*.35,r*.7]],color,'#071c29',3);this.shell(-r*.78,-r*.75,r*1.56,r*1.55,color);this.eyes(0,-4,e.angle,2);this.line(-18,24,18,24,'#dcf4e8',4);}
 if(k===1){for(let i=0;i<6;i++){const a=i*TAU/6+Math.sin(t*1.5)*.2;c.save();c.rotate(a);this.shell(-12,-r*1.15+Math.sin(t*3+i)*5,24,r*.7,color);c.restore();}this.shell(-r*.65,-r*.65,r*1.3,r*1.4,'#ebc6b3');this.eyes(0,0,e.angle,1.9);this.poly([[-22,-r*.5],[-26,-r*.95],[-8,-r*.72],[0,-r*1.05],[10,-r*.72],[26,-r*.95],[22,-r*.5]],'#eccc8e','#24313a',3);}
 if(k===2){for(const side of [-1,1]){const swing=Math.sin(t*4)*7;this.limb(side*32,23,side*40,58+side*swing,color,20);this.limb(side*38,-12,side*72,15-side*swing,color,22);this.rounded(side*72-15,8-side*swing,30,25,7,'#c4baa0');}this.shell(-42,-42,84,89,color);this.rounded(-31,-28,62,27,8,'#1a3544');this.eyes(0,-15,e.angle,1.8);this.poly([[0,6],[17,23],[0,40],[-17,23]],e.phase?'#ffc089':'#a5f0d4','#25414a',3);}
 if(k===3){for(const side of [-1,1]){this.limb(side*25,-3,side*(48+Math.sin(t*3)*9),22,color,12);this.poly([[side*48,0],[side*63,24],[side*48,45],[side*33,24]],'#cbd5f2','#25364e',3);}this.poly([[0,-r],[r*.7,-r*.35],[r*.6,r*.55],[0,r],[-r*.6,r*.55],[-r*.7,-r*.35]],color,'#102537',3);this.rounded(-29,-25,58,48,16,'#edf3f6');this.eyes(0,-1,e.angle,1.8);this.line(-22,25,22,25,'#acb4e5',4);}
 if(k===4){for(let i=4;i>0;i--){const x=Math.sin(t*3-i*.8)*i*10,y=i*19;this.shell(x-25+i*2,y-17,50-i*4,38,color);this.poly([[x-26+i*2,y-7],[x-40+i*3,y+4],[x-23+i*2,y+12]],'#b8c8e0','#24384d',2);}this.shell(-43,-50,86,70,color);for(const side of [-1,1])this.poly([[side*25,-35],[side*48,-76],[side*8,-47]],'#e1c495','#263449',3);this.eyes(0,-14,e.angle,2);this.limb(-30,10,-54,26,color,12);this.limb(30,10,54,26,color,12);}
 c.restore();}
 shopBeacon(g){const c=this.ctx;c.save();c.translate(1100,800);this.circle(0,0,112,'#e4c27c08','#d8c18b35',2);this.poly([[-38,-22],[0,-42],[38,-22],[38,22],[0,42],[-38,22]],'#1b343a','#efcc8e',2);this.text('✧',0,11,35,'#ffe1a7');this.text('星币商店 · B / E',0,72,16,'#ffe1a7');c.restore();}
 incoming(g){const c=this.ctx;for(const w of g.incursions){const a=Math.atan2(g.player.y-w.y,g.player.x-w.x);c.save();c.translate(w.x,w.y);c.rotate(a);for(let i=0;i<3;i++)this.poly([[i*26-40,-30],[i*26-16,0],[i*26-40,30]],'#ffb18a66','#ffcc9d',2);c.restore();this.text('突袭 '+Math.max(0,w.wait).toFixed(1)+'s',w.x,w.y-55,18,'#ffdbab');}}
 hazard(h){const c=this.ctx,active=h.wait<=0;c.save();c.globalAlpha=active?.85:.65+Math.sin(this.time*9)*.18;
 if(h.type==='circle'){this.circle(h.x,h.y,h.r,active?'#ff244555':'#e5103025','#ff4163',3);c.save();c.translate(h.x,h.y);const pulse=1+Math.sin(this.time*8)*.1;c.scale(pulse,pulse);this.poly([[0,-23],[23,18],[-23,18]],'#c31536','#ff9bad',2.5);this.rounded(-2,-12,4,16,2,'#fff0f3',null);this.circle(0,11,2.5,'#fff0f3');c.restore();}
 else{this.line(h.x,h.y,h.x+Math.cos(h.angle)*h.length,h.y+Math.sin(h.angle)*h.length,active?'#ff3357':'#ff6883',active?h.width*2:3);if(!active){c.setLineDash([10,12]);this.line(h.x,h.y,h.x+Math.cos(h.angle)*h.length,h.y+Math.sin(h.angle)*h.length,'#ff335733',h.width*2);c.setLineDash([]);}}c.restore();}
 effects(dt){const c=this.ctx;for(const p of this.particles){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.96;p.vy*=.96;c.globalAlpha=Math.max(0,p.life/p.max);this.circle(p.x,p.y,p.r,p.color);}c.globalAlpha=1;this.particles=this.particles.filter(p=>p.life>0);
 for(const r of this.rings){r.life-=dt;c.globalAlpha=Math.max(0,r.life/.6);this.circle(r.x,r.y,r.r*(1-r.life/.65),null,r.color,1.5);}this.rings=this.rings.filter(r=>r.life>0);c.globalAlpha=1;
 for(const a of this.arcs){a.life-=dt;const mx=(a.x+a.tx)/2+Math.sin(a.life*130)*12,my=(a.y+a.ty)/2;this.line(a.x,a.y,mx,my,'#e0b9ff',2);this.line(mx,my,a.tx,a.ty,'#e0b9ff',2);}this.arcs=this.arcs.filter(a=>a.life>0);
 for(const n of this.numbers){n.life-=dt;n.y-=dt*30;c.globalAlpha=Math.max(0,n.life/.6);this.text(n.text,n.x,n.y,12,n.color);}c.globalAlpha=1;this.numbers=this.numbers.filter(n=>n.life>0);}
 minimap(g){if(this.w<740)return;const c=this.ctx,w=238,h=173,x=this.w-w-28,y=this.h-h-27;c.fillStyle='#081b22d9';c.fillRect(x,y,w,h);c.strokeStyle='#8fd4bb30';c.lineWidth=1;c.strokeRect(x,y,w,h);const sx=v=>x+v/WORLD.w*w,sy=v=>y+v/WORLD.h*h;for(const b of g.beacons)this.circle(sx(b.x),sy(b.y),b.done?2:3,b.done?'#476759':'#e1d6a4');for(const e of g.enemies)this.circle(sx(e.x),sy(e.y),e.boss?5:2.5,e.boss?'#ff647c':'#ee8794');for(const ch of g.chests)this.circle(sx(ch.x),sy(ch.y),2,'#adcef2');this.circle(sx(g.player.x),sy(g.player.y),5,'#c4ffdf');}
 crosshair(g){const p=g.player;const x=(p.x-this.camera.x)*this.scale+this.w/2+Math.cos(p.angle)*70,y=(p.y-this.camera.y)*this.scale+this.h/2+Math.sin(p.angle)*70;this.circle(x,y,4,null,'#cdfde480');this.line(x-9,y,x-6,y,'#cdfde466');this.line(x+6,y,x+9,y,'#cdfde466');}
 home(){
 const c=this.ctx,t=this.time,w=this.w,h=this.h;c.fillStyle='#0b1c24';c.fillRect(0,0,w,h);const sky=c.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#071720');sky.addColorStop(.5,'#19373c');sky.addColorStop(1,'#081c27');c.fillStyle=sky;c.fillRect(0,0,w,h);
 for(const s of this.stars){c.globalAlpha=.2+Math.sin(t*.6+s.a)*.18;this.circle(s.x*w,s.y*h*.62,s.r,'#c8e4ca');}c.globalAlpha=1;
 const cx=w*.745,cy=h*.57,scale=Math.min(w/1400,h/820);c.save();c.translate(cx,cy);c.scale(scale,scale);
 this.glow(-10,-170,370,'#a9dfb918');this.circle(105,-218,65,'#aec8aa13','#adcdae17');this.circle(105,-218,56,null,'#abcbb613');
 for(let j=0;j<16;j++){let yy=30+j*25;this.line(-650,yy,750,yy,'#a6d4be08',1);}
 for(let i=0;i<7;i++){c.beginPath();c.ellipse(0,125+i*9,160+i*36,23+i*11,-.04,0,TAU);c.strokeStyle=`rgba(147,203,185,${.12-i*.012})`;c.lineWidth=1;c.stroke();}
 // Faceted island and terraced stonework.
 this.poly([[-180,58],[-139,130],[-70,180],[14,194],[116,141],[180,62],[60,24]],'#142d37','#45615a55',2);
 this.poly([[-180,58],[-80,84],[-70,180],[-139,130]],'#223a42');this.poly([[-80,84],[20,100],[14,194],[-70,180]],'#1c343e');this.poly([[20,100],[120,78],[116,141],[14,194]],'#152e39');this.poly([[120,78],[180,62],[116,141]],'#29434a');
 this.poly([[-195,53],[-90,-10],[62,-5],[183,48],[131,93],[4,115],[-118,91]],'#557567','#8bad9088',2);
 this.poly([[-173,49],[-85,1],[58,6],[158,49],[119,78],[5,101],[-112,79]],'#3b5f56','#a8bfa233');
 for(let i=0;i<8;i++){this.poly([[-30+i*4,72-i*8],[21+i*4,78-i*8],[24+i*4,72-i*8],[-27+i*4,66-i*8]],'#83958366','#acb49822');}
 for(let i=0;i<18;i++){const a=i*2.399,rr=75+(i%3)*30;let x=Math.cos(a)*rr,y=Math.sin(a)*rr*.3+40;this.poly([[x-7,y],[x-2,y-9],[x+9,y-5],[x+12,y+3],[x,y+7]],'#62806a','#a0b29b33');}
 // Lighthouse, drawn as architectural geometry.
 this.poly([[-53,31],[-38,-153],[26,-153],[54,31],[7,55]],'#c0c5a5','#d5d4b277',2);this.poly([[-53,31],[-38,-153],[-4,-143],[7,55]],'#78968b');this.poly([[-4,-143],[26,-153],[54,31],[7,55]],'#9fae95');
 this.poly([[-44,-89],[-1,-72],[38,-88],[41,-70],[0,-53],[-46,-70]],'#536f69');this.poly([[-49,-17],[3,4],[47,-15],[50,3],[4,24],[-51,1]],'#53746c');
 this.poly([[-52,-162],[-5,-181],[44,-163],[43,-144],[-3,-125],[-51,-144]],'#576f65','#b8c7a277',1.5);
 this.poly([[-37,-219],[-4,-230],[30,-218],[31,-170],[-5,-155],[-38,-171]],'#859c78','#d2d3a7',1.5);
 this.poly([[-31,-213],[-8,-220],[-8,-169],[-31,-177]],'#d5d7a4');this.poly([[0,-221],[23,-214],[24,-179],[0,-169]],'#f3e7ac');this.glow(-4,-195,70,'#ffe7a43a');
 this.poly([[-53,-221],[-5,-258],[46,-223],[-4,-205]],'#426158','#a9bb9466',2);this.line(-5,-257,-5,-274,'#a9bc94',2);this.circle(-5,-279,4,'#e1daa7');
 c.save();c.globalAlpha=.08+Math.sin(t*.4)*.015;this.poly([[-6,-202],[700,-320],[700,-185],[-6,-182]],'#e2eac0');this.poly([[-6,-202],[-530,-270],[-530,-163],[-6,-182]],'#e2eac0');c.restore();
 this.poly([[-10,40],[-9,11],[0,3],[10,12],[12,48]],'#1a3b3b','#92ad91');this.circle(1,24,2,'#f3d695');
 // Foreground beacons, grass and a lone traveler.
 for(const [x,y]of[[-130,38],[128,47]]){this.line(x,y,x,y-40,'#789783',3);this.poly([[x-8,y-44],[x,y-49],[x+8,y-44],[x+7,y-32],[x-7,y-32]],'#aebf99','#d5dcae');this.glow(x,y-40,29,'#d8e5b327');}
 this.circle(-72,59,8,'#102d36');this.poly([[-80,48],[-72,26],[-64,47]],'#99b4a0');this.circle(-72,26,6,'#dfd9b7');this.line(-65,40,-58,42,'#cfcca2',3);
 for(let i=0;i<12;i++){const x=-170+i*31,y=65+Math.sin(i*2)*16;this.line(x,y,x-4,y-12,'#b1bd8b88');this.line(x,y,x+5,y-8,'#b1bd8b66');}
 for(let i=0;i<22;i++){const x=Math.sin(i*4.17+t*.05)*260,y=70+Math.cos(i*2.3+t*.06)*150;this.glow(x,y,8,'#dfdfa220');this.circle(x,y,1.3,'#d3d9aa88');}
 c.restore();
 this.text('35° 07′ N   /   139° 42′ E',w*.755,h*.91,10,'#87aaa075');
 }
}

import {WORLD,TAU,ZONES,weaponInfo,clamp,RNG} from './core.js';
export class Renderer{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.w=0;this.h=0;this.dpr=1;this.camera={x:1100,y:800};this.scale=1;this.particles=[];this.rings=[];this.arcs=[];this.numbers=[];this.shake=0;this.flash=0;this.time=0;this.reduced=false;const rng=new RNG(1829);this.scenery=Array.from({length:150},()=>({x:rng.next()*2200,y:rng.next()*1600,r:rng.int(8,35),a:rng.next()*TAU,k:rng.int(0,5)}));this.stars=Array.from({length:110},()=>({x:rng.next(),y:rng.next(),r:rng.next()*1.7+.3,a:rng.next()*TAU}));this.resize();}
 resize(){this.w=innerWidth;this.h=innerHeight;this.dpr=Math.min(devicePixelRatio||1,2);this.canvas.width=this.w*this.dpr;this.canvas.height=this.h*this.dpr;this.scale=clamp(Math.min(this.w/1280,this.h/820),.58,1.18);}
 screenToWorld(x,y){return{x:(x-this.w/2)/this.scale+this.camera.x,y:(y-this.h/2)/this.scale+this.camera.y};}
 event(e){
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
 text(s,x,y,size=10,color='#9abbb4',align='center'){const c=this.ctx;c.font=`${size}px "Segoe UI", "Microsoft YaHei", sans-serif`;c.textAlign=align;c.fillStyle=color;c.fillText(s,x,y);}
 draw(game,dt=0){
 this.time+=dt;const c=this.ctx;c.setTransform(this.dpr,0,0,this.dpr,0,0);c.fillStyle='#08171e';c.fillRect(0,0,this.w,this.h);
 if(!game){this.home();return;}
 const lerp=1-Math.exp(-dt*8);this.camera.x+=(game.player.x-this.camera.x)*lerp;this.camera.y+=(game.player.y-this.camera.y)*lerp;
 const hw=this.w/(2*this.scale),hh=this.h/(2*this.scale);this.camera.x=clamp(this.camera.x,Math.min(hw,1100),Math.max(WORLD.w-hw,1100));this.camera.y=clamp(this.camera.y,Math.min(hh,800),Math.max(WORLD.h-hh,800));
 c.save();c.translate(this.w/2,this.h/2);if(!this.reduced&&this.shake>0)c.translate((Math.random()-.5)*this.shake,(Math.random()-.5)*this.shake);c.scale(this.scale,this.scale);c.translate(-this.camera.x,-this.camera.y);
 this.ground(game);for(const b of game.beacons)this.beacon(b,game.zone.color);for(const chest of game.chests)this.chest(chest,game);
 for(const h of game.hazards)this.hazard(h);
 for(const item of game.pickups){const bob=Math.sin(this.time*3+item.id)*2;this.glow(item.x,item.y,13,item.kind==='heal'?'#9bdfb625':item.kind==='coin'?'#efca8625':'#a6ebd01c');c.save();c.translate(item.x,item.y+bob);if(item.kind==='xp')this.poly([[0,-5],[4,0],[0,5],[-4,0]],'#a7eac7','#d2ffe4');else if(item.kind==='coin'){this.circle(0,0,4,'#b19155','#efda9f');this.line(0,-2,0,2,'#fff1b2');}else{this.circle(0,0,7,'#163e35','#8ee4b6');c.fillStyle='#a3f3c7';c.fillRect(-4,-1.5,8,3);c.fillRect(-1.5,-4,3,8);}c.restore();}
 const actors=[...game.enemies.map(e=>({y:e.y,e})),...game.echoes.map(e=>({y:e.y,p:e,echo:true})),{y:game.player.y,p:game.player}].sort((a,b)=>a.y-b.y);
 for(const a of actors){if(a.e)this.enemy(a.e,game);else this.player(a.p,a.echo,game);}
 for(const b of game.bullets){if(b.enemy){this.glow(b.x,b.y,13,'#ec9b8340');this.circle(b.x,b.y,b.r+1,'#552d34','#edaa93',1.5);this.circle(b.x,b.y,Math.max(1,b.r-2),'#ffdfb7');}else{this.line(b.x-b.vx*.022,b.y-b.vy*.022,b.x,b.y,b.color,b.r*1.7);this.line(b.x-b.vx*.01,b.y-b.vy*.01,b.x,b.y,'#eaffef',Math.max(1,b.r*.5));if(b.boomerang){c.save();c.translate(b.x,b.y);c.rotate(b.age*10);c.strokeStyle=b.color;c.lineWidth=3;c.beginPath();c.arc(0,0,11,0,Math.PI*1.4);c.stroke();c.restore();}}}
 for(let i=0;i<game.count('orbit');i++){const a=game.elapsed*1.7+i*TAU/game.count('orbit'),x=game.player.x+Math.cos(a)*55,y=game.player.y+Math.sin(a)*55;this.circle(x,y,8,'#263f40','#e8d5a3');this.circle(x,y,3,'#f0db9a');}
 this.effects(dt);c.restore();this.minimap(game);this.crosshair(game);
 if(this.flash>0&&!this.reduced){c.fillStyle=`rgba(245,100,100,${this.flash*.6})`;c.fillRect(0,0,this.w,this.h);}this.flash=Math.max(0,this.flash-dt);this.shake=Math.max(0,this.shake-dt*40);
 }
 ground(g){
 const c=this.ctx,z=g.zone;c.fillStyle=z.dark;c.fillRect(0,0,WORLD.w,WORLD.h);
 const gr=c.createRadialGradient(1100,800,80,1100,800,1350);gr.addColorStop(0,'#264b4b38');gr.addColorStop(1,'#020b1677');c.fillStyle=gr;c.fillRect(0,0,2200,1600);
 // Cartographic lines and fine stippled bathymetry.
 c.strokeStyle=z.color+'09';c.lineWidth=1;for(let x=0;x<=2200;x+=80){c.beginPath();c.moveTo(x,0);c.lineTo(x,1600);c.stroke();}for(let y=0;y<=1600;y+=80){c.beginPath();c.moveTo(0,y);c.lineTo(2200,y);c.stroke();}
 for(let ring=0;ring<5;ring++){c.beginPath();c.ellipse(1100,800,360+ring*175,220+ring*128,-.18,0,TAU);c.strokeStyle=z.color+'0b';c.lineWidth=1;c.stroke();}
 for(const s of this.scenery){if(Math.abs(s.x-this.camera.x)>this.w/this.scale/2+60||Math.abs(s.y-this.camera.y)>this.h/this.scale/2+60)continue;c.save();c.translate(s.x,s.y);c.rotate(s.a);if(s.k<3){this.line(-s.r,0,s.r,0,z.color+'0e');this.line(-s.r*.6,6,s.r*.6,6,z.color+'09');this.circle(0,-8,1.2,z.color+'35');}else this.decoration(s,z);c.restore();}
 const tide=g.highTide?Math.sin(this.time*.6)*5+10:3;
 c.strokeStyle=z.color+'25';c.lineWidth=2;c.strokeRect(17+tide,17+tide,2166-tide*2,1566-tide*2);c.strokeStyle=z.color+'0b';c.lineWidth=20;c.strokeRect(10,10,2180,1580);
 for(let x=80;x<2200;x+=160){this.line(x,15,x,30,z.color+'55');this.line(x,1570,x,1585,z.color+'55');}for(let y=80;y<1600;y+=160){this.line(15,y,30,y,z.color+'55');this.line(2170,y,2185,y,z.color+'55');}
 this.text(z.sub,1100,92,13,z.color+'40');this.text(`SECTOR ${String(g.sector+1).padStart(2,'0')} / 15`,1100,1515,11,z.color+'35');
 }
 decoration(s,z){const c=this.ctx,r=s.r;c.globalAlpha=.42;if(z.motif==='coral'){for(let i=-1;i<=1;i++){c.beginPath();c.moveTo(0,r*.5);c.quadraticCurveTo(i*r*.7,0,i*r,-r);c.strokeStyle='#b3829d';c.lineWidth=3;c.stroke();this.circle(i*r,-r,3,'#d798b0');}}else if(z.motif==='wreck'){this.poly([[-r,-r*.5],[r,-r*.4],[r*.7,r*.5],[-r*.7,r*.4]],'#3b4747','#82958c');for(let i=-1;i<=1;i++)this.line(i*r*.4,-r*.4,i*r*.4,r*.4,'#7c8c7d55');}else if(z.motif==='light'){this.circle(0,0,r*.5,'#4b4c39','#b1ae783d');this.glow(0,0,r,'#dad79320');this.circle(0,0,3,'#d7d598');}else{this.poly([[-r*.55,r*.4],[0,-r],[r*.5,r*.3],[0,r*.65]],z.motif==='glass'?'#314e50':'#3d4565',z.color+'40');this.line(0,-r,0,r*.6,z.color+'35');}c.globalAlpha=1;}
 beacon(b,color){const c=this.ctx;this.glow(b.x,b.y,100,b.done?'#a3f4ce13':color+'0b');c.save();c.translate(b.x,b.y);this.circle(0,0,100,null,b.done?'#9af1c912':color+'15');c.setLineDash([3,12]);this.circle(0,0,85,null,color+'30');c.setLineDash([]);this.poly([[0,-31],[24,-13],[24,16],[0,30],[-24,16],[-24,-13]],'#10242c',color+'65',1.5);this.poly([[0,-21],[14,-10],[14,10],[0,20],[-14,10],[-14,-10]],b.done?'#75bda5':'#294844',color+'a0');if(!b.done){this.circle(0,0,37,null,'#304f50',2);c.beginPath();c.arc(0,0,37,-Math.PI/2,-Math.PI/2+TAU*b.charge/8);c.strokeStyle=color;c.lineWidth=3;c.stroke();}this.circle(0,-3,5,b.done?'#d2ffe0':color);if(b.done){c.globalAlpha=.16;this.poly([[-10,-5],[10,-5],[33,-175],[-33,-175]],color);c.globalAlpha=1;}this.text(b.done?'航标已点亮':b.charge>0?`充能 ${Math.floor(b.charge/8*100)}%`:'靠近以点亮',0,58,10,b.done?'#709c8e':'#acc5b4');c.restore();}
 chest(ch,g){const c=this.ctx,x=ch.x,y=ch.y+Math.sin(this.time*2+ch.id)*3,color=ch.type==='relic'?'#ebce94':'#afd6c3';this.glow(x,y,36,color+'19');c.save();c.translate(x,y);this.poly([[-17,-7],[0,-16],[17,-7],[17,12],[0,21],[-17,12]],'#1c383c',color,1.5);this.poly([[-17,-7],[0,2],[17,-7],[0,-16]],'#486466',color);this.line(0,2,0,20,color);this.circle(0,-4,4,color);if(Math.hypot(g.player.x-x,g.player.y-y)<160)this.text(ch.cost?`${ch.cost} 星币 · E`:'物资箱 · E',0,-29,11,color);c.restore();}
 player(p,echo,g){const c=this.ctx;const moving=g.player.dashTime>0;this.circle(p.x,p.y+12,20,'#00000030');c.save();c.translate(p.x,p.y);if(echo)c.globalAlpha=.55;const t=this.time;const cape=echo?'#527797':'#658f86';if(moving&&!echo){this.line(-p.dx*45,-p.dy*45,0,0,'#a7f9d244',20);this.line(-p.dx*80,-p.dy*80,0,0,'#a7f9d222',12);}
 c.save();c.rotate(p.angle-Math.PI/2);this.poly([[-12,1],[-17,-25-Math.sin(t*7)*3],[0,-18],[17,-25+Math.sin(t*7)*3],[12,1]],cape,'#9bd1b633');this.line(-7,-5,-8,-23,'#b3dfc133');this.line(6,-5,8,-23,'#b3dfc133');c.restore();
 this.circle(-7,12,6,'#162a31','#47676b');this.circle(7,12,6,'#162a31','#47676b');this.circle(0,0,16,echo?'#375971':'#d5dfc3','#183a3d',2);this.circle(0,-2,12,echo?'#56799a':'#bacbb6','#6c9f96');this.poly([[-10,-4],[9,-6],[11,5],[-7,8]],'#163840','#92d8c255');this.line(-5,1,6,-1,echo?'#b9c5ff':'#b8ffe1',3);this.circle(-12,1,3,'#e1bc77');
 c.save();c.rotate(p.angle);c.fillStyle='#1b323b';c.fillRect(7,5,18,7);c.strokeStyle='#99b9b1';c.lineWidth=1;c.strokeRect(7,5,18,7);c.fillStyle=weaponInfo(g.weapon).el.color;c.fillRect(22,5,8,4);this.circle(8,9,4,'#d5dac0');c.restore();
 if(p.invuln>0&&!echo){c.globalAlpha=.3+Math.sin(t*20)*.15;this.circle(0,0,24,null,'#c3ffe5',1.5);c.globalAlpha=1;}if(echo){this.circle(0,0,26,null,'#a3bbef44');this.text('ECHO',0,-32,8,'#bacdf3');}c.restore();}
 enemy(e,g){const c=this.ctx;if(e.hp<=0)return;const r=e.r;this.circle(e.x,e.y+r*.6,r*.9,'#00000029');c.save();c.translate(e.x,e.y);if(e.boss){this.bossSprite(e);c.restore();return;}const col=e.hit>0?'#edffe9':e.color;const fill=e.hit>0?'#a0bab0':'#283c44';c.rotate(Math.sin(e.age*2+e.id)*.07);
 if(e.type==='drifter'){for(let i=-1;i<=1;i++){c.beginPath();c.moveTo(i*8,8);c.quadraticCurveTo(i*12+Math.sin(e.age*4+i)*5,22,i*9,27);c.strokeStyle=col+'88';c.lineWidth=2;c.stroke();}this.poly([[-17,2],[-13,-12],[0,-21],[13,-12],[17,2],[8,15],[0,10],[-8,15]],fill,col,1.5);this.circle(-5,-1,2,'#d6ede4');this.circle(5,-1,2,'#d6ede4');}
 if(e.type==='skitter'){for(let i=-1;i<=1;i++){this.line(-7,i*6,-20,i*10+Math.sin(e.age*12)*3,col,2);this.line(7,i*6,20,i*10-Math.sin(e.age*12)*3,col,2);}this.poly([[0,-16],[11,-4],[8,11],[-8,11],[-11,-4]],fill,col,1.5);this.circle(0,-5,3,col);}
 if(e.type==='spitter'){for(let i=0;i<5;i++){let a=i*TAU/5+e.age*.3;c.save();c.rotate(a);this.poly([[0,-6],[-8,-22],[0,-28],[8,-22]],'#503445',col+'bb');c.restore();}this.circle(0,0,11,fill,col,2);this.circle(0,0,5,'#efc4cb');}
 if(e.type==='charger'){c.save();c.rotate(e.phase?e.chargeAngle:e.angle);this.poly([[-20,-16],[8,-18],[27,0],[8,18],[-20,16],[-12,0]],fill,col,2);this.poly([[4,-10],[22,0],[4,10]],'#744c43',col);this.circle(-3,0,5,col);c.restore();if(e.phase===1){this.line(0,0,Math.cos(e.chargeAngle)*290,Math.sin(e.chargeAngle)*290,'#f1be9677',2);this.circle(0,0,31,null,'#f2b58e88');}}
 if(e.type==='shield'){this.poly([[0,-27],[23,-13],[23,13],[0,27],[-23,13],[-23,-13]],fill,col,2);this.poly([[0,-18],[14,-9],[14,9],[0,18],[-14,9],[-14,-9]],'#40505b',col+'88');this.circle(0,0,5,col);this.line(-11,-8,8,10,col+'88');}
 if(e.type==='summoner'){for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*7,8);c.bezierCurveTo(i*9+Math.sin(e.age*3)*7,24,i*10-7,28,i*9+Math.cos(e.age*3+i)*6,38);c.strokeStyle=col+'77';c.lineWidth=2;c.stroke();}c.beginPath();c.ellipse(0,0,25,20,0,Math.PI,TAU);c.lineTo(22,9);c.quadraticCurveTo(0,18,-22,9);c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=col;c.lineWidth=1.5;c.stroke();this.circle(0,0,8,'#765d94',col);}
 if(e.type==='bomber'){this.circle(0,0,18,fill,col,1.5);this.poly([[0,-12],[8,0],[0,12],[-8,0]],'#9d785b',col);for(let i=0;i<4;i++){let a=i*TAU/4;this.line(Math.cos(a)*18,Math.sin(a)*18,Math.cos(a)*24,Math.sin(a)*24,col,2);}if(e.phase===1)this.circle(0,0,95,null,'#e9bd9455',2);}
 if(e.type==='sniper'){c.save();c.rotate(e.angle);this.poly([[-21,0],[0,-15],[24,0],[0,15]],fill,col,1.5);this.circle(4,0,7,'#50717a',col);this.circle(7,0,3,'#d1f6dd');c.restore();}
 if(e.type==='spiral'){c.save();c.rotate(e.age*.8);for(let i=0;i<5;i++){c.rotate(TAU/5);this.poly([[0,-5],[-9,-20],[4,-27],[10,-10]],fill,col);}this.circle(0,0,7,col,'#27323c',2);c.restore();}
 if(e.elite){this.circle(0,0,r+8,null,'#f3ce8588',2);this.text('✦',0,-r-12,17,'#f3d994');}
 if(e.hp<e.maxHp){c.fillStyle='#15212a';c.fillRect(-r,-r-12,r*2,3);c.fillStyle=col;c.fillRect(-r,-r-12,r*2*e.hp/e.maxHp,3);}if(e.slow>0)this.circle(0,0,r+4,null,'#a9d9ff66');if(e.burn>0)this.glow(0,0,r+12,'#f3ad7933');c.restore();}
 bossSprite(e){const c=this.ctx,r=e.r,col=e.hit>0?'#ffffff':e.color;this.glow(0,0,r*2,col+'18');c.save();c.rotate(e.age*.15);c.setLineDash([12,10]);this.circle(0,0,r+17,null,col+'60',2);c.setLineDash([]);c.restore();
 if(e.bossKind===0){for(let i=-2;i<=2;i++)this.poly([[i*18-8,10],[i*24,70+Math.sin(e.age*2+i)*10],[i*18+8,10]],'#3b6661',col+'66');this.poly([[-65,-2],[-48,-35],[-22,-54],[22,-54],[48,-35],[65,-2],[39,27],[-39,27]],'#355453',col,2);this.poly([[-25,-30],[25,-30],[37,2],[-37,2]],'#193941',col+'88');this.circle(-20,-12,6,'#b5f0d2');this.circle(20,-12,6,'#b5f0d2');for(let i=-2;i<=2;i++)this.line(i*12,9,i*11,23,col,3);}
 if(e.bossKind===1){c.save();c.rotate(e.age*.25);for(let i=0;i<8;i++){c.rotate(TAU/8);this.poly([[0,-18],[-22,-48],[0,-80],[22,-48]],'#664052',col,1.5);}c.restore();this.circle(0,0,32,'#402735',col,2);this.circle(0,0,19,'#966677',col);this.poly([[0,-13],[9,6],[-9,6]],'#f7d6bc');}
 if(e.bossKind===2){c.save();c.rotate(e.age*.17);for(let i=0;i<8;i++){c.rotate(TAU/8);c.fillStyle='#635d4e';c.fillRect(-10,-72,20,30);c.strokeStyle=col;c.strokeRect(-10,-72,20,30);}c.restore();this.circle(0,0,53,'#3b4240',col,3);this.circle(0,0,39,'#1a3035',col+'99',2);this.line(0,0,Math.cos(e.age)*29,Math.sin(e.age)*29,col,4);this.line(0,0,Math.cos(e.age*.15)*20,Math.sin(e.age*.15)*20,'#fff0c1',2);this.circle(0,0,6,'#edd291');}
 if(e.bossKind===3){for(let i=0;i<4;i++){const a=i*TAU/4+e.age*.3;this.poly([[Math.cos(a)*72,Math.sin(a)*72-13],[Math.cos(a)*72+8,Math.sin(a)*72],[Math.cos(a)*72,Math.sin(a)*72+13],[Math.cos(a)*72-8,Math.sin(a)*72]],'#566882',col);}this.poly([[0,-65],[42,-28],[34,36],[0,60],[-34,36],[-42,-28]],'#36455f',col,2);this.poly([[0,-44],[24,-20],[21,23],[0,36],[-21,23],[-24,-20]],'#1c3144',col+'66');this.line(-17,-6,17,-6,col,4);}
 if(e.bossKind===4){this.poly([[-46,56],[-29,-40],[29,-40],[46,56]],'#3c4544',col,2);this.poly([[-36,-40],[0,-76],[36,-40]],'#575747',col,2);this.poly([[-35,-22],[35,-22],[35,2],[-35,2]],'#9c9a73',col);this.glow(0,-12,60,'#f8e7a744');this.circle(0,-12,15,'#f1e3a9');this.line(-15,20,15,20,col+'99',2);this.line(-19,34,19,34,col+'99',2);for(let i=0;i<3;i++){const a=e.age*.35+i*TAU/3;this.circle(Math.cos(a)*90,Math.sin(a)*90,9,'#595c49',col,2);}}
 }
 hazard(h){const c=this.ctx;const active=h.wait<=0;c.save();c.globalAlpha=active?.7:.35+Math.sin(this.time*10)*.12;if(h.type==='circle'){this.circle(h.x,h.y,h.r,active?'#edb49366':'#e7978220','#f0bca0',2);this.line(h.x-12,h.y,h.x+12,h.y,'#f2b698',1);this.line(h.x,h.y-12,h.x,h.y+12,'#f2b698',1);}else{this.line(h.x,h.y,h.x+Math.cos(h.angle)*h.length,h.y+Math.sin(h.angle)*h.length,active?'#ffe4bb':'#f0aa8b',active?h.width*2:2);if(!active){c.setLineDash([10,12]);this.line(h.x,h.y,h.x+Math.cos(h.angle)*h.length,h.y+Math.sin(h.angle)*h.length,'#f1b69a33',h.width*2);c.setLineDash([]);}}c.restore();}
 effects(dt){const c=this.ctx;for(const p of this.particles){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.96;p.vy*=.96;c.globalAlpha=Math.max(0,p.life/p.max);this.circle(p.x,p.y,p.r,p.color);}c.globalAlpha=1;this.particles=this.particles.filter(p=>p.life>0);
 for(const r of this.rings){r.life-=dt;c.globalAlpha=Math.max(0,r.life/.6);this.circle(r.x,r.y,r.r*(1-r.life/.65),null,r.color,1.5);}this.rings=this.rings.filter(r=>r.life>0);c.globalAlpha=1;
 for(const a of this.arcs){a.life-=dt;const mx=(a.x+a.tx)/2+Math.sin(a.life*130)*12,my=(a.y+a.ty)/2;this.line(a.x,a.y,mx,my,'#e0b9ff',2);this.line(mx,my,a.tx,a.ty,'#e0b9ff',2);}this.arcs=this.arcs.filter(a=>a.life>0);
 for(const n of this.numbers){n.life-=dt;n.y-=dt*30;c.globalAlpha=Math.max(0,n.life/.6);this.text(n.text,n.x,n.y,12,n.color);}c.globalAlpha=1;this.numbers=this.numbers.filter(n=>n.life>0);}
 minimap(g){if(this.w<740)return;const c=this.ctx,w=164,h=119,x=this.w-w-28,y=this.h-h-27;c.fillStyle='#081b22d9';c.fillRect(x,y,w,h);c.strokeStyle='#8fd4bb30';c.lineWidth=1;c.strokeRect(x,y,w,h);const sx=v=>x+v/WORLD.w*w,sy=v=>y+v/WORLD.h*h;for(const b of g.beacons)this.circle(sx(b.x),sy(b.y),b.done?2:3,b.done?'#476759':'#e1d6a4');for(const e of g.enemies)this.circle(sx(e.x),sy(e.y),e.boss?4:1.5,e.boss?'#f0b296':'#9c757588');for(const ch of g.chests)this.circle(sx(ch.x),sy(ch.y),2,'#adcef2');this.circle(sx(g.player.x),sy(g.player.y),3,'#b8f8d9');}
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

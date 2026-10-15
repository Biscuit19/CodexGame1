import {assetUrl,MUSIC_TRACKS,musicPool,musicGroup} from './assets.js';
export class Soundtrack{
 constructor(){this.channels=new Map();this.current='';this.unlocked=false;this.error='';this.switches=0;this.context='';this.bags={};this.playTime=0;this.lastByGroup={};}
 unlock(){this.unlocked=true;}
 next(group,game,entering=false){if(entering&&group==='boss'){const id='boss'+((game.boss.bossKind%10)+1);if(this.current!==id)return id;}
 let bag=this.bags[group];if(!bag?.length){bag=musicPool(group).sort(()=>Math.random()-.5);if(bag[bag.length-1]===this.lastByGroup[group]&&bag.length>1)[bag[0],bag[bag.length-1]]=[bag[bag.length-1],bag[0]];this.bags[group]=bag;}const id=bag.pop();this.lastByGroup[group]=id;return id;}
 select(id){if(!id||this.current===id)return;this.current=id;this.switches++;this.playTime=0;if(!this.channels.has(id)){const a=new Audio(assetUrl('assets/music/'+id+'.mp3'));a.loop=false;a.preload='auto';a.volume=0;a.addEventListener('error',()=>{this.error='音乐加载失败';});this.channels.set(id,a);}const a=this.channels.get(id);a.currentTime=0;}
 update(dt,settings,game,active){const group=musicGroup(game),context=group+':'+(game?.sector??-1)+':'+(group==='boss'?game.boss.bossKind:group==='event'?game.activeEvent.serial:'');const enabled=this.unlocked&&settings.music&&active;
 if(context!==this.context||!this.current||this.channels.get(this.current)?.ended||this.playTime>85){const entering=context!==this.context;this.context=context;this.select(this.next(group,game,entering));}
 if(enabled)this.playTime+=dt;
 for(const [id,a] of this.channels){const target=enabled&&id===this.current?settings.volume*(settings.musicVolume??.45)*.35:0;a.volume=Math.max(0,Math.min(1,a.volume+(target-a.volume)*Math.min(1,dt*3.5)));if(enabled&&id===this.current&&a.paused&&!a.pendingPlay){a.pendingPlay=true;a.play().catch(e=>{if(e.name!=='AbortError')this.error=e.name==='NotAllowedError'?'点击页面以启用音乐':'音乐暂不可用';}).finally(()=>{a.pendingPlay=false;});}if((!enabled||id!==this.current)&&a.volume<.005&&!a.paused)a.pause();if(this.channels.size>4&&id!==this.current&&a.paused&&!a.pendingPlay){a.removeAttribute('src');a.load();this.channels.delete(id);}}
 }
 get title(){return MUSIC_TRACKS[this.current]?.title||'';}
}

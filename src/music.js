import {assetUrl,MUSIC_TRACKS,musicFor} from './assets.js';
export class Soundtrack{
 constructor(){this.channels=new Map();this.current='';this.unlocked=false;this.error='';this.switches=0;}
 unlock(){this.unlocked=true;}
 select(id){if(this.current===id)return;this.current=id;this.switches++;if(!this.channels.has(id)){const a=new Audio(assetUrl('assets/music/'+id+'.mp3'));a.loop=true;a.preload='auto';a.volume=0;a.addEventListener('error',()=>{this.error='音乐加载失败，可在设置中关闭后重试';});this.channels.set(id,a);}}
 update(dt,settings,game,active){this.select(musicFor(game));const enabled=this.unlocked&&settings.music&&active;
 for(const [id,a] of this.channels){const target=enabled&&id===this.current?settings.volume*(settings.musicVolume??.45)*.4:0;a.volume=Math.max(0,Math.min(1,a.volume+(target-a.volume)*Math.min(1,dt*3.5)));if(enabled&&id===this.current&&a.paused&&!a.pendingPlay){a.pendingPlay=true;a.play().catch(e=>{if(e.name!=='AbortError')this.error=e.name==='NotAllowedError'?'点击页面以启用音乐':'音乐暂不可用';}).finally(()=>{a.pendingPlay=false;});}if((!enabled||id!==this.current)&&a.volume<.005&&!a.paused)a.pause();}
 }
 get title(){return MUSIC_TRACKS[this.current]?.title||'';}
}

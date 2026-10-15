export class SaveSlots{
 constructor(storage){this.storage=storage;this.key='echo-drift-slots-v1';this.active=0;this.slots=[null,null,null];this.load();}
 load(){const raw=this.storage.getItem(this.key);if(raw){const d=JSON.parse(raw);if(!Array.isArray(d.slots)||d.slots.length!==3)throw new Error('存档槽数据损坏');this.slots=d.slots;this.active=Number.isInteger(d.active)&&d.active>=0&&d.active<3?d.active:0;}else{const old=this.storage.getItem('echo-drift-save-v2');if(old){this.slots[0]={data:JSON.parse(old),updated:Date.now()};this.persist();this.storage.removeItem('echo-drift-save-v2');}}}
 persist(){this.storage.setItem(this.key,JSON.stringify({active:this.active,slots:this.slots}));}
 select(i){if(!Number.isInteger(i)||i<0||i>2)throw new Error('无效存档槽');this.active=i;this.persist();}
 write(data){this.slots[this.active]={data,updated:Date.now()};this.persist();}
 read(i=this.active){return this.slots[i]?.data||null;}
}

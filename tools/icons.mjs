// Original mechanical maritime cutouts. Each silhouette describes the actual item.
import {mkdir,writeFile} from 'node:fs/promises';
import {RELICS,FRAMES} from '../src/core.js';
await mkdir('assets/icons',{recursive:true});
const ink='#0a2634',steel='url(#steel)',mint='url(#mint)',gold='url(#gold)',blue='url(#blue)',red='#f18c83';
const P=(d,f=steel,s=ink,w=4)=>`<path d="${d}" fill="${f}" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const C=(x,y,r,f=steel,s=ink,w=4)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="${s}" stroke-width="${w}"/>`;
const R=(x,y,w,h,f=steel,r=8,s=ink)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${s}" stroke-width="4"/>`;
const L=(d,color='#d9fff0',w=4)=>P(d,'none',color,w);
const G=(body,x=0,y=0,scale=1,rotate=0)=>`<g transform="translate(${x} ${y}) scale(${scale}) rotate(${rotate} 80 80)">${body}</g>`;
const star=(x=80,y=80,r=23)=>P(`M${x} ${y-r} ${x+r*.28} ${y-r*.26} ${x+r} ${y} ${x+r*.28} ${y+r*.27} ${x} ${y+r} ${x-r*.28} ${y+r*.27} ${x-r} ${y} ${x-r*.28} ${y-r*.26}Z`,gold);
const robot=()=>R(48,76,62,50,mint,15)+R(38,28,84,62,steel,23)+R(50,42,60,30,ink,12)+R(58,50,10,13,mint,4)+R(91,50,10,13,mint,4)+P('M57 124 53 145 72 145 76 125M91 125 98 145 116 140 107 119',steel)+P('M45 85 26 102 36 115 58 100M109 89 132 104 123 117 103 105',mint)+C(80,104,9,gold)+L('M69 20 90 20',gold,5);
const ice=()=>P('M44 29 106 21 128 42 120 123 57 140 32 113Z',blue)+L('M44 29 62 53 128 42M62 53 57 140M43 104 97 67M70 116 111 88','#dfffff',3);
const lighthouse=()=>P('M48 142 60 65 100 65 113 142Z',steel)+P('M56 93 105 107 102 88 59 75Z',mint)+R(51,41,58,30,mint,3)+P('M43 42 80 13 119 42Z',gold)+P('M39 145 122 145 129 151 31 151Z',steel)+L('M26 55 8 64M134 55 152 64','#fff2ac',6)+C(80,55,10,'#fff1b5')+R(72,116,16,27,ink,3);
const bottle=(content)=>P('M61 16 99 16 99 43Q128 62 125 106Q122 141 80 145Q37 141 34 106Q31 65 61 43Z',blue)+R(57,8,46,21,gold,4)+content+L('M49 67Q41 91 48 111','#e0fbff',4);
const book=()=>P('M30 30 87 18 132 38 126 135 71 147 29 127Z',steel)+P('M42 35 86 26 117 40 71 51Z','#dae8dc')+P('M71 52 125 40 120 128 71 139Z',mint)+L('M39 51 39 116',gold,5)+C(96,87,19,blue)+L('M87 87 104 87M96 78 96 96',mint,4);
const shapes={
 lens:()=>R(72,103,18,43,mint,6)+C(80,66,48,gold)+C(80,66,36,blue)+L('M59 48Q77 30 94 45','#ecffff',6)+P('M111 94 138 120 123 136 100 106',steel),
 spring:()=>C(80,80,58,steel)+C(80,80,47,ink)+L('M80 43C126 43 123 115 77 116C30 116 40 53 77 53C110 53 110 104 79 104C53 104 54 66 77 66C98 66 98 92 80 92C68 92 68 79 78 79',gold,8)+R(69,9,22,17,gold,3),
 shell:()=>P('M28 105Q7 68 37 39Q58 15 80 29Q111 13 137 51Q157 91 127 111L103 139 59 139Z',mint)+L('M80 126 39 45M80 126 63 34M80 126 87 31M80 126 112 38M80 126 135 57',steel,5)+C(80,121,15,gold),
 boots:()=>P('M47 23 99 24 95 100 132 113 136 136 37 141 22 126 37 106Z',steel)+R(40,17,65,23,mint,5)+L('M49 59 86 59M46 77 85 77M44 95 85 95',gold,5)+P('M31 59 15 50 22 92 38 107',mint)+L('M36 130 122 127',ink,5),
 magnet:()=>C(80,83,57,gold)+C(80,83,45,ink)+P('M80 34 94 83 80 132 66 83Z',mint)+P('M80 34 80 83 94 83Z',red)+C(80,83,8,steel)+R(67,9,26,17,steel,5),
 heart:()=>P('M80 137 30 91Q7 52 35 30Q61 12 80 42Q98 10 128 30Q154 54 132 91Z',red)+L('M26 78 57 78 68 54 83 107 96 73 133 73',steel,7)+C(80,24,6,gold),
 glass:()=>ice()+P('M85 39 60 86 78 85 66 120 108 69 86 71Z',gold),
 coat:()=>P('M53 48Q43 7 80 8Q116 7 107 48L131 67 148 113 125 123 113 91 119 143 41 143 47 91 34 123 12 112 28 65Z',mint)+P('M56 48Q80 19 105 48L80 66Z',ink)+L('M80 66 80 141',gold,5)+R(50,104,19,17,steel,3)+R(92,104,19,17,steel,3),
 dash:()=>P('M41 18 119 18 120 29 132 36 125 48 136 59 126 72 137 84 127 96 137 109 124 121 124 139 40 139 38 127 25 116 34 103 22 91 32 78 22 65 32 51 23 39 38 30Z',steel)+L('M52 40 108 40M52 118 108 118',mint,3)+P('M69 55 109 80 69 104 77 87 45 87 45 73 77 73Z',mint),
 echo:()=>P('M32 24 119 15 135 125 45 144Z',ink)+Array.from({length:5},(_,i)=>R(34+i*2,29+i*21,10,10,gold,1)+R(108+i*2,20+i*21,10,10,gold,1)).join('')+R(55,38,45,34,mint,3)+R(61,86,45,34,blue,3)+C(77,55,9,ink)+C(83,104,9,ink),
 thorns:()=>C(80,80,53,ink)+Array.from({length:10},(_,i)=>G(P('M74 30 80 8 88 31',mint),0,0,1,i*36)).join('')+C(80,80,35,steel)+C(80,80,17,gold)+C(80,80,5,ink),
 frost:()=>C(80,83,53,steel)+C(80,83,40,ink)+L('M80 49 80 84 100 97',gold,6)+G(ice(),65,63,.43)+R(65,9,30,19,mint,4),
 fire:()=>P('M38 67 107 53 127 73 117 141 49 150 29 132Z',steel)+P('M38 67 50 85 125 72 107 53Z',gold)+P('M73 112 100 105 104 128 77 136Z',red)+L('M91 104 112 24',gold,8)+P('M112 44Q88 28 115 5Q118 22 128 25Q140 47 112 44Z',red),
 chain:()=>Array.from({length:4},(_,i)=>G(P('M33 95Q17 72 39 58L62 43Q84 32 96 54Q110 77 88 90L63 107Q43 118 33 95Z','none',i%2?mint:gold,13),i*18-14,-i*14+14,.85)).join('')+L('M15 124 30 121M132 28 149 21',blue,5),
 pierce:()=>P('M16 41 57 27 100 40 135 23 145 122 105 140 64 127 27 143Z',blue)+L('M57 28 64 127M100 40 105 140','#d7f3ff',3)+P('M31 90 109 72 102 57 139 72 110 100 113 84 35 104Z',mint),
 blast:()=>P('M35 76 55 74 33 33 72 54 81 12 96 54 135 33 114 74 148 86 113 98 132 137 93 118 79 151 65 117 24 133 46 96 12 87Z',gold)+C(80,85,28,red)+star(80,85,17),
 orbit:()=>R(56,58,49,48,steel,13)+R(8,52,39,52,blue,3)+R(114,52,39,52,blue,3)+L('M27 54 27 102M116 78 152 78M8 78 46 78',mint,3)+P('M80 56 80 33 101 17',gold)+C(104,14,7,mint)+C(80,81,15,mint),
 tide:()=>P('M29 25 124 16 135 139 35 148Z',steel)+P('M105 40Q58 14 52 61Q54 98 98 83Q69 68 105 40Z',gold)+L('M52 108Q68 98 82 109T119 108M52 123Q68 113 82 124T119 123',mint,5),
 echoheart:()=>P('M23 42 125 29 142 126 37 142Z',steel)+P('M24 42 84 88 125 29',mint)+L('M36 138 69 91M138 125 99 85',gold,4)+G(shapes.heart(),48,45,.4),
 luck:()=>P('M73 144 77 76 86 76 90 144Z',steel)+Array.from({length:4},(_,i)=>G(P('M80 80Q35 74 40 42Q59 19 80 56Q100 18 120 42Q126 73 80 80Z',mint),0,0,1,i*90)).join('')+C(80,80,10,gold),
 capacitor:()=>R(39,33,82,102,mint,14)+R(49,44,62,77,ink,8)+R(52,15,14,20,gold,3)+R(94,15,14,20,gold,3)+P('M88 48 60 85 79 85 68 118 103 76 83 77Z',gold)+L('M49 140 49 150M111 140 111 150',steel,6),
 crown:()=>P('M23 45 56 70 80 19 105 70 139 43 121 134 42 134Z',gold)+R(43,109,78,25,steel,4)+C(80,85,17,mint)+C(22,43,7,mint)+C(80,17,7,mint)+C(139,43,7,mint),
 binary:()=>G(robot(),-6,20,.75)+G(robot(),57,1,.65)+L('M26 24 45 12 59 26M108 144 129 146 144 128',gold,5),
 phoenix:()=>R(58,103,44,39,steel,7)+L('M80 111 80 73',gold,9)+P('M79 87Q41 63 79 13Q78 41 102 52Q120 89 79 87Z',red)+P('M79 80Q64 65 83 45Q99 69 79 80Z',gold),
 blackhole:()=>bottle(C(80,96,29,ink)+L('M58 95Q88 64 103 95Q91 120 67 109Q60 94 82 86Q96 91 84 102',mint,5)),
 triad:()=>Array.from({length:3},(_,i)=>G(star(80,45,22)+L('M58 15 102 15',mint,5),0,0,1,i*120)).join('')+C(80,80,15,blue),
 supply:()=>P('M24 50 119 36 140 61 132 133 38 146 20 121Z',steel)+P('M24 50 44 74 139 61 119 36Z',mint)+R(48,78,67,44,ink,6)+P('M57 105 67 87 77 104Z','#f0ecd3')+C(92,99,10,red)+L('M25 33 122 18',gold,7),
 focus:()=>P('M13 80Q80 12 147 80Q80 148 13 80Z',steel)+C(80,80,36,mint)+C(80,80,21,ink)+C(73,71,8,'#eefff5')+L('M80 12 80 25M80 135 80 149M10 80 24 80M135 80 149 80',gold,5),
 leviathan:()=>P('M22 92Q16 37 76 31Q124 34 132 76L151 61 145 95 130 108Q79 153 32 116L10 133 14 103Z',blue)+C(54,66,5,gold)+L('M43 110 111 57',gold,7)+P('M102 56 131 38 118 70Z',gold)+L('M68 27 68 12M77 27 88 14',mint,4),
 reactor:()=>R(33,31,94,104,steel,18)+R(49,46,62,72,ink,8)+C(80,82,24,red)+star(80,82,15)+L('M20 51 34 51M20 78 34 78M20 105 34 105M127 51 141 51M127 78 141 78M127 105 141 105',gold,7),
 ballast:()=>C(80,81,54,steel)+C(80,81,37,blue)+R(62,4,36,24,gold,6)+L('M80 57 80 108M63 93 80 110 97 93',mint,8)+C(38,42,6,gold)+C(122,42,6,gold)+C(38,120,6,gold)+C(122,120,6,gold),
 siphon:()=>P('M44 20 117 20 112 74Q108 98 89 103L90 127 118 139 114 149 44 149 41 139 68 127 70 103Q45 94 44 20Z',gold)+P('M45 42Q8 26 22 66Q26 84 51 85M116 42Q151 26 140 66Q132 87 110 85','none',steel,10)+P('M55 40 107 40 102 75Q80 100 61 75Z',red),
 harpoon:()=>P('M23 143 17 133 109 35 100 19 145 10 138 54 122 46Z',steel)+P('M100 19 145 10 123 39Z',mint)+L('M26 127 37 138M40 112 51 122M54 98 65 108',gold,6),
 afterimage:()=>book()+G(P('M50 41 106 41 106 112 50 112Z',blue)+L('M68 57 88 57M68 73 88 73M68 89 88 89',mint,4),10,0,.8),
 sundial:()=>P('M47 25 113 25Q111 63 86 80Q113 99 112 133L48 133Q47 99 73 80Q46 64 47 25Z',blue)+P('M55 39 105 39 80 69ZM80 94 59 123 102 123Z',mint)+R(34,9,92,20,gold,5)+R(34,131,92,20,gold,5)+L('M42 30 42 128M119 30 119 128',steel,6),
 phoenixcore:lighthouse,
 abilityDash:()=>L('M10 46 54 46M4 76 43 76M13 107 47 107',mint,9)+G(robot(),49,6,.83,-18)+P('M55 128 83 128 75 115 114 130 75 150 82 138 55 138Z',gold),
 abilityEcho:()=>`<g opacity=".7">${G(robot(),-9,4,.78)}</g>`+G(robot(),55,22,.8)+P('M63 18 86 18 86 8 111 29 86 48 86 37 63 37Z',gold),
 beacon:lighthouse,
 coins:()=>Array.from({length:3},(_,i)=>G(C(80,90,38,gold)+C(80,90,28,'none','#8b703e',3)+star(80,90,16),i*29-28,-i*15,.85)).join(''),
 heal:()=>R(30,43,100,97,steel,15)+R(55,20,51,25,mint,5)+P('M69 65 91 65 91 83 110 83 110 105 91 105 91 124 69 124 69 105 50 105 50 83 69 83Z',red),
 experience:()=>P('M81 11 123 39 135 96 82 146 27 98 39 40Z',mint)+L('M81 11 72 74 27 98M72 74 82 146M72 74 123 39M72 74 135 96','#ecfff5',4),
 capacity:()=>shapes.heart()+R(101,104,45,39,mint,5)+L('M124 111 124 136M110 124 138 124',ink,5),
 forge:()=>P('M23 58 97 58 100 37 126 37 126 82 104 106 120 130 120 143 40 143 40 130 58 109 47 91 23 91Z',steel)+L('M37 69 111 69',mint,6)+P('M18 17 38 9 81 60 68 71Z',gold),
 skill:()=>R(31,31,98,98,steel,12)+C(80,80,27,mint)+star(80,80,20)+Array.from({length:5},(_,i)=>L(`M${44+i*18} 17v14M${44+i*18} 129v14`,gold,6)).join(''),
 rescue:()=>lighthouse()+G(shapes.heart(),90,89,.38),
 training:()=>shapes.forge(),power:()=>shapes.reactor(),hull:()=>shapes.ballast()
};
// Eighteen firing mechanisms, eighteen separately drawn silhouettes.
const handle=()=>P('M52 89 80 89 72 135 48 135 44 122Z',steel);
const weapon={
 needle:()=>handle()+R(19,56,106,40,mint,10)+R(104,62,43,24,steel,4)+C(66,73,12,gold)+R(50,39,37,15,steel,4),
 fan:()=>handle()+P('M28 67 118 26 144 64 72 99 27 92Z',mint)+Array.from({length:5},(_,i)=>L(`M72 79 ${114+i*7} ${36+i*9}`,steel,7)).join(''),
 rail:()=>handle()+R(22,59,65,39,mint,8)+P('M80 56 145 28 151 40 93 76ZM91 87 153 57 156 70 100 102Z',steel)+L('M91 75 145 49',blue,5),
 orbit:()=>handle()+R(25,57,86,42,steel,16)+C(109,64,28,blue)+C(109,64,14,mint)+L('M65 34 94 22 121 33M90 105 115 102 138 83',gold,5),
 bloom:()=>handle()+P('M22 65 111 41 142 65 136 90 70 106 26 94Z',mint)+C(118,63,25,steel)+Array.from({length:5},(_,i)=>G(P('M110 49 118 29 128 48',red),0,0,1,i*72)).join('')+C(118,63,10,gold),
 twin:()=>handle()+R(20,65,65,37,mint,7)+R(69,43,78,18,steel,5)+R(69,72,78,18,steel,5)+C(55,81,12,gold),
 crescent:()=>P('M113 14Q10 38 31 124Q70 153 125 113Q61 129 62 78Q63 44 113 14Z',mint)+P('M33 103 17 125 32 141 56 119Z',steel)+L('M72 36Q38 66 49 102',gold,4),
 prism:()=>handle()+R(18,61,62,40,steel,9)+P('M77 45 114 19 139 45 114 75Z',blue)+P('M91 76 121 58 148 77 123 100Z',mint)+P('M72 98 96 82 121 104 96 125Z',gold),
 comet:()=>handle()+P('M22 72 108 29 145 51 139 83 62 115 28 99Z',steel)+P('M73 49 111 29 145 51 139 83 101 98Z',mint)+P('M121 38 145 51 139 83 122 67Z',gold)+L('M14 68 40 53M21 115 44 118',red,6),
 rain:()=>handle()+R(14,59,65,48,mint,9)+P('M77 49 134 32 152 63 141 91 83 112Z',steel)+Array.from({length:4},(_,i)=>L(`M88 ${58+i*12} 138 ${42+i*12}`,gold,6)).join(''),
 laser:()=>handle()+R(18,59,76,44,steel,9)+P('M78 52 123 31 143 43 130 57 105 67 112 84 142 72 151 88 106 113 85 92Z',mint)+C(74,80,16,blue)+L('M110 74 151 56',blue,6),
 helix:()=>handle()+R(17,61,60,40,mint,9)+L('M71 69Q91 22 112 69T150 49',gold,12)+L('M71 90Q91 43 112 90T150 70',blue,12)+R(132,42,17,45,steel,4),
 accelerator:()=>handle()+P('M19 70 100 41 146 45 150 68 84 99 24 104Z',steel)+Array.from({length:4},(_,i)=>P(`M${57+i*21} ${57-i*5}l11 -4 10 33 -11 6Z`,i%2?mint:gold)).join('')+C(36,86,12,blue),
 mine:()=>handle()+R(17,65,80,40,mint,10)+C(106,65,33,steel)+C(106,65,20,red)+Array.from({length:6},(_,i)=>G(L('M106 23 106 34',gold,7),0,0,1,i*60)).join('')+C(106,65,8,gold),
 nova:()=>C(80,78,57,steel)+C(80,78,35,ink)+Array.from({length:12},(_,i)=>G(R(74,17,12,25,mint,3),0,0,1,i*30)).join('')+C(80,78,20,gold)+star(80,78,13),
 shard:()=>handle()+P('M17 68 90 41 134 46 150 65 129 94 68 113 22 104Z',steel)+P('M84 46 104 31 117 58 101 75Z',mint)+P('M104 78 135 65 149 82 119 101Z',blue)+P('M68 91 95 78 109 109 84 126Z',gold),
 lance:()=>handle()+R(14,68,67,35,steel,8)+P('M72 58 129 16 119 47 151 39 131 63 154 76 117 80 100 106 99 80Z',mint)+L('M78 78 136 51',blue,6)+C(48,82,16,gold),
 tempest:()=>handle()+P('M15 67 89 37 127 48 140 81 70 115 20 105Z',steel)+Array.from({length:5},(_,i)=>G(R(78,28,57,16,i%2?blue:mint,5),0,0,1,i*12)).join('')+C(50,84,18,gold)
};
const defs=`<defs><linearGradient id="steel" x2=".6" y2="1"><stop stop-color="#edf6e9"/><stop offset=".48" stop-color="#a4bfc1"/><stop offset="1" stop-color="#49677a"/></linearGradient><linearGradient id="mint" x2=".8" y2="1"><stop stop-color="#d2ffee"/><stop offset=".45" stop-color="#73ccb8"/><stop offset="1" stop-color="#347d83"/></linearGradient><linearGradient id="gold" x2=".7" y2="1"><stop stop-color="#fff1b4"/><stop offset=".55" stop-color="#d5ad68"/><stop offset="1" stop-color="#947344"/></linearGradient><linearGradient id="blue" x2=".8" y2="1"><stop stop-color="#c9f5ff"/><stop offset=".45" stop-color="#73b5da"/><stop offset="1" stop-color="#425e9a"/></linearGradient></defs>`;
async function save(id,body,label){await writeFile('assets/icons/'+id+'.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img"><title>${label}</title>${defs}<g stroke-linejoin="round">${body}</g></svg>`);}
for(const r of RELICS)await save(r.id,shapes[r.id](),r.name);
for(const id of ['abilityDash','abilityEcho','beacon','coins','heal','experience','capacity','forge','skill','rescue','training','power','hull'])await save(id,shapes[id](),({abilityDash:'机器人折光冲刺',abilityEcho:'机器人回声分身',beacon:'航标灯塔'})[id]||id);
for(const f of FRAMES)await save('weapon-'+f.id,weapon[f.id](),f.name+'：'+f.desc);
await save('weapon',weapon.needle(),'武器');
console.log('Generated 68 semantic mechanical maritime icons.');

# v4 音乐与素材署名

## 音乐来源与授权

23 首完整配乐来自开源策略游戏 **0 A.D. / Wildfire Games**。原作者署名：**Wildfire Games**，官网：https://www.wildfiregames.com/ 。原始音频采用 [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)，上游许可声明保存在 `assets/licenses/0ad-audio-LICENSE.txt`。

这是已实际用于策略与战斗场景的游戏配乐；当前没有可核实的逐曲好评数量，不把知名度或主观风格判断包装成评分。曲目以管弦、节奏和氛围为主，避开旧版轻快平台游戏曲库。

所有曲目保留完整长度，转为 80 kbps MP3，并统一到 -19 LUFS / -2 dBTP；未改编旋律。转码版本及与本游戏同步的视听呈现按 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 共享，原曲保留 3.0 许可。逐文件原地址、时长和原文件 SHA-256 在 `assets/credits.json`。

| 使用场景 | 曲目 | 来源 |
|---|---|---|
| 前期随机 | Mediterranean Waves | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Mediterranean_Waves.ogg) |
| 前期随机 | Elysian Fields | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Elysian_Fields.ogg) |
| 前期随机 | The Road Ahead | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/The_Road_Ahead.ogg) |
| 前期随机 | As Seasons Change | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/As_Seasons_Change.ogg) |
| 前期随机 | Sunrise | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Sunrise.ogg) |
| 中期随机 | Expedition | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Expedition.ogg) |
| 中期随机 | Celtic Pride | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Celtic_Pride.ogg) |
| 中期随机 | Forging a City-State | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Forging_a_City-State.ogg) |
| 中期随机 | From Every Corner | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/From_Every_Corner.ogg) |
| 中期随机 | Roman Ingenuity | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Roman_Ingenuity.ogg) |
| 后期随机 | Northern Frontier | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Northern_Frontier.ogg) |
| 后期随机 | Bandit Country | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Bandit_Country.ogg) |
| 后期随机 | Honor Bound | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Honor_Bound.ogg) |
| 后期随机 | Rise of Macedon | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Rise_of_Macedon.ogg) |
| 后期随机 | Tale of Warriors | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Tale_of_Warriors.ogg) |
| 首领专用 | Alba Longa Burns | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Alba_Longa_Burns.ogg) |
| 首领专用 | Only 300 Stood | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Only_300_Stood.ogg) |
| 首领专用 | Point of No Return | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Point_of_No_Return.ogg) |
| 首领专用 | Red Dawn | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Red_Dawn.ogg) |
| 首领专用 | The Governor | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/The_Governor.ogg) |
| 重大事件专用 | Taiko 1 | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Taiko_1.ogg) |
| 重大事件专用 | Taiko 2 | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Taiko_2.ogg) |
| 重大事件专用 | Calm Before the Storm | [原始音频](https://raw.githubusercontent.com/0ad/0ad/master/binaries/data/mods/public/audio/music/Calm_Before_the_Storm.ogg) |

普通曲库共 15 首，分为前中后期三个组。每组抽完再洗牌，避免紧邻重复；航段更换或连续播放约 85 秒时轮换。五种首领各有专用曲目，长战斗可在首领曲库内轮换。重大事件使用另外三首配乐。音乐切换淡入淡出，保留独立音量。

## 原创部分

角色、敌人、首领、技能图标和危险标志为本项目 Canvas / SVG 矢量绘制。射击与技能、首领的不同攻击音效通过 Web Audio 合成。程序代码按 MIT 提供，完整许可见 LICENSE。游戏内设置可查看署名。

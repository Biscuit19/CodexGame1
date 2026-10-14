# 素材与授权 · v3

角色、普通敌人、首领：本项目原创 Canvas 分层矢量角色。头部、身体、四肢、武器分别绘制；移动、瞄准、枪口、蓄力、跃击和冲撞动画由程序驱动。v3 已移除上一版 Game-icons 静态图标及其素材文件。

射击与技能音效：本项目通过 Web Audio 合成；射击包含低频主体、高频击发和短噪声层。

## 音乐

来自 [SuperTux](https://github.com/SuperTux/supertux/tree/master/data/music)，以下所有曲目采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)。完整转码为 96 kbps MP3，并统一到 -18 LUFS / -2 dBTP；未重新编曲。游戏中淡入淡出，默认背景音量低于射击音效。旧 Battle Theme、Night、Underwater、March of the Malevolent 已移除。

| 文件 / 曲目 | 作者 | 原曲 | 授权元数据 |
|---|---|---|---|
| garden / Tropical Breeze | Flan | [音频](https://raw.githubusercontent.com/SuperTux/supertux/master/data/music/tropical/tropicalbreeze.ogg) | [许可](https://raw.githubusercontent.com/SuperTux/supertux/master/data/music/tropical/tropicalbreeze.music) |
| snow / Glacier | SnugglyBun | [音频](https://raw.githubusercontent.com/SuperTux/supertux/master/data/music/antarctic/glacier.ogg) | [许可](https://raw.githubusercontent.com/SuperTux/supertux/master/data/music/antarctic/glacier.music) |
| shoals / Midday | SnugglyBun | [音频](https://raw.githubusercontent.com/SuperTux/supertux/master/data/music/antarctic/midday.ogg) | [许可](https://raw.githubusercontent.com/SuperTux/supertux/master/data/music/antarctic/midday.music) |
| night / Sunset | SnugglyBun | [音频](https://raw.githubusercontent.com/SuperTux/supertux/master/data/music/antarctic/sunset.ogg) | [许可](https://raw.githubusercontent.com/SuperTux/supertux/master/data/music/antarctic/sunset.music) |
| battle / Sky Level | SnugglyBun | [音频](https://raw.githubusercontent.com/SuperTux/supertux/master/data/music/antarctic/skylevel.ogg) | [许可](https://raw.githubusercontent.com/SuperTux/supertux/master/data/music/antarctic/skylevel.music) |

逐文件修改说明和原文件 SHA-256 在 `assets/credits.json`，上游许可元数据在 `assets/licenses/`。游戏同步视听呈现按 CC BY-SA 4.0 提供，代码按 MIT 提供；请保留原作者署名、许可与修改说明。

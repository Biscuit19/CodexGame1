# 在线部署

- 网站：https://biscuit19.github.io/CodexGame1/
- 版本：**深海远征 / 09（v9）**，旧页面请 Ctrl+F5 刷新。
- 托管：GitHub Pages，发布源 `gh-pages` 分支根目录。
- 游戏源码提交：`629b5ae40d75b6a71984c946fbf1ea4efe762e9d`，分支 `codex/echo-drift-delivery`。
- 发布提交：`7730e94ca9461350f0ec5f4325dd59010e535043`。
- GitHub Actions `pages-build-deployment` 状态：**Success**，已于 2026-10-15 确认该提交。
- 部署记录：https://github.com/Biscuit19/CodexGame1/actions/runs/38746529840

Pages 的 index.html 与通过测试的 web.html 逐字节一致，完整 assets 树与源码一致。在线入口约 190 KiB，包含 43 首按需加载的音乐、69 张透明 SVG、署名与许可。

v9 将七种通用成长拆为独立基本属性，采用前五次较大、后续固定较小的加算增长；技能冷却每次 2%，总上限 30%，其余没有升级次数上限。旧通用遗物、研修、校准和当前生命会迁移，已获得收益保留。构筑页与奖励/商店同步展示，另加宽激光、暴击/灼烧/爆炸小特效、实色冰块图标和更清楚的受击音效。

106 项核心与存档测试通过；真实浏览器验证属性升级、旧奖励转换、存档恢复、完整关卡流程、紧凑界面、高射速实际发射、音频波形、状态特效、压力场景及离线入口。数值模拟中通关与战败的结果如实记录于 TESTING.md。

下载包 `release/echo-drift.zip` 与 `release/余响航线-完整游戏.zip` 内容一致，约 63 MiB。**完整解压，保留 assets 文件夹，再打开包内 play.html。** 包内入口采用 web.html 内联代码和本地资源；仓库根目录另有约 85.5 MiB 的全内嵌 play.html 单文件版。ZIP 已核对全部 CRC、入口字节、43 个 MP3 和 69 个 SVG。

网站不依赖云端服务进程。三个存档槽保存在当前浏览器 localStorage，换设备/浏览器/域名不会自动同步。兼容 v2–v8 存档；基本属性迁移及无尽敌方倍率换算只执行一次。

更新流程：npm run build 及相关测试后，将 web.html 作为 gh-pages/index.html，同步完整 assets、README、ASSET_CREDITS 和 LICENSE，提交推送触发 Pages；python3 tools/package.py 更新完整包。

云环境网络策略拦截 github.io 直接请求，公开发布结果通过 GitHub Actions Success 确认；相同产物已在 /CodexGame1/ 子路径验证加载与游玩，未声称直接在公开域名完成浏览器验收。

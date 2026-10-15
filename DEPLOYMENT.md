# 在线部署

- 网站：https://biscuit19.github.io/CodexGame1/
- 版本：**深海远征 / 08（v8）**，旧页面请 Ctrl+F5 刷新。
- 托管：GitHub Pages，发布源为 `gh-pages` 分支根目录。
- 游戏源码提交：`c8214faebe323e2cc4f581c258c8d0366867dafa`，分支 `codex/echo-drift-delivery`。
- 发布提交：`4811acd9b5d763af6053b170bd5d93e8d569efcf`。
- GitHub Actions `pages-build-deployment` 状态：**Success**，已于 2026-10-15 确认该提交。
- 部署记录：https://github.com/Biscuit19/CodexGame1/actions/runs/38743666130

Pages 的 index.html 与通过测试的 web.html 逐字节一致，完整 assets Git 树与源码一致；包含 43 首音乐、68 张透明图标、署名和许可。在线入口约 183 KiB，音频按需加载。

v8 加大生命显示，商店改为四列，奖励使用紧凑宽布局；五种关卡敌潮、强化后期小怪、随机航标奖励、约每关 2–3 箱、满级遗物替换研修、四项技能强化，以及完整伤害数值与武器 HUD 图标均已集成。92 项核心/存档测试及浏览器流程、五种窗口布局、压力场景与离线验证通过，数值模拟的通关及战败结果如实记录于 TESTING.md。

完整下载包 `release/echo-drift.zip` 与 `release/余响航线-完整游戏.zip` 内容一致，约 63 MiB。**完整解压，保留 assets 文件夹，再打开包内 play.html。** 包内入口复用 web.html 内联代码，读取本地素材；仓库根目录另有约 85.49 MiB 的全内嵌 play.html 单文件版。

网站不依赖云环境的服务进程。三个存档槽保存在当前浏览器 localStorage；换浏览器、设备或域名不会自动同步。兼容 v2–v7 存档，新技能等级默认为零，保留原有构筑；旧无尽倍率按比例迁移一次。

更新流程：运行 npm run build 及相关测试，把 web.html 作为 gh-pages/index.html，同时同步完整 assets、README、ASSET_CREDITS 与 LICENSE，正常提交推送触发 Pages；运行 python3 tools/package.py 更新完整包。

云环境网络策略拦截 github.io 直接请求，因此公开站点的发布结果通过 GitHub Actions Success 确认；相同产物已在 /CodexGame1/ 子路径实际验证加载及游玩。没有声称直接在公开域名完成浏览器验收。

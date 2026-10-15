# 在线部署

- 网站：https://biscuit19.github.io/CodexGame1/
- 版本：**深海远征 / 07（v7）**，旧页面请 Ctrl+F5 刷新。
- 托管：GitHub Pages，发布源为 `gh-pages` 分支根目录。
- 游戏源码提交：`029a0d5a4069006723cbed4190f43cc686297fb6`，分支 `codex/echo-drift-delivery`。
- 发布提交：`adadfbbf3ae761fc71d5b78155292b47ef2f3d62`。
- GitHub Actions `pages-build-deployment` 状态：**Success**，已于 2026-10-15 确认该提交。
- 部署记录：https://github.com/Biscuit19/CodexGame1/actions/runs/38738759022

Pages 的 index.html 与通过测试的 web.html 逐字节一致，完整 assets Git 树与源码一致；包含 43 首音乐、68 张透明图标、署名和许可。在线入口约 168 KiB，音频按需加载。

完整下载包 `release/echo-drift.zip` 与 `release/余响航线-完整游戏.zip` 内容一致，约 63 MiB。**完整解压，保留 assets 文件夹，再打开包内 play.html。** 包内入口复用 web.html 内联代码，按需读取本地素材，避免把曲库重复塞进压缩包。仓库根目录另有约 85.47 MiB 的全内嵌 play.html 单文件版。两种离线布局均通过射击、音乐、图标及存档验证。

部署网站不依赖云环境中的服务进程。三个存档槽保存在当前浏览器 localStorage；换浏览器、设备或域名不会自动同步。兼容 v2–v6 存档，旧 15 关通关记录可继续第 16–20 关。

更新流程：运行 npm run build 及相关测试，把 web.html 作为 gh-pages/index.html，同时同步完整 assets、README、ASSET_CREDITS 与 LICENSE，正常提交推送触发 Pages。运行 python3 tools/package.py 更新离线包。

当前云环境网络策略拦截 github.io 直接请求，因此公开站点的部署结果通过 GitHub Actions Success 确认；相同产物已在 /CodexGame1/ 子路径实际验证加载与游玩。没有声称直接在公开域名完成浏览器验收。验证详情见 TESTING.md。

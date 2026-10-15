# 在线部署

- 网站：https://biscuit19.github.io/CodexGame1/
- 托管：GitHub Pages，发布源 gh-pages 分支的根目录。
- v4.1「深海交锋」发布内容：index.html（由 web.html 原样复制）、assets 目录、.nojekyll、素材署名与许可。
- 在线入口约 140 KiB，23 首音乐按需加载；离线 play.html 约 48.4 MiB，内嵌完整音乐。
- 已确认发布提交：7c4ee2a；对应游戏源码提交：07404b1。
- GitHub Actions pages-build-deployment 状态：Success；确认日期：2026-10-15。
- 部署记录：https://github.com/Biscuit19/CodexGame1/actions/runs/38702881348

源码保留在 codex/echo-drift-delivery 分支。更新后运行 npm run build 和相关测试，将 web.html 复制为 gh-pages 根目录的 index.html，同时同步 assets 目录和许可文件，正常提交并推送即可触发发布。不要将开发用的源码入口 index.html 直接复制到 Pages。play.html 用于完整离线游玩，web.html 用于在线按需加载音乐。

网站不依赖 Codex 内部的 4173 服务进程。保存和进度在浏览器 localStorage 中；域名、浏览器或设备不同，存档也不同。旧页面可使用 Ctrl+F5 强制刷新，标题版本应为「深海交锋 / 04.1」。

部署成功状态及网址已通过 GitHub Actions 页面确认。当前云端网络策略拦截 github.io 的直接请求，因此未直接对公开网址执行浏览器验收。同一发布产物已在 /CodexGame1/ 项目路径下验证音乐按需加载、正常播放和 Boss 切曲；完整离线产物、浏览器流程、压力测试和战役/无尽模拟均已通过。详见 TESTING.md。

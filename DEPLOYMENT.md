# 在线部署

- 网站：https://biscuit19.github.io/CodexGame1/
- 托管：GitHub Pages，发布源 gh-pages 分支的根目录。
- v6「深海远征」：index.html（由 web.html 原样复制）、完整 assets 目录、.nojekyll、素材署名与许可。
- 在线入口约 158 KiB，音乐按需加载；完整离线 play.html 约 48.6 MiB，内嵌 23 首音乐和 67 张透明物品图标。
- 已确认发布提交：40e6032；对应游戏源码提交：4cee54b。
- GitHub Actions pages-build-deployment 状态：Success；确认日期：2026-10-15。
- 部署记录：https://github.com/Biscuit19/CodexGame1/actions/runs/38733822718

源码保留在 codex/echo-drift-delivery 分支。更新后运行 npm run build 和相关测试，将 web.html 复制为 gh-pages 根目录的 index.html，同时同步完整 assets（含 icons、music、许可）及署名文件，正常提交并推送即可触发发布。开发用源码入口 index.html 依赖开发服务器；play.html 用于离线游玩，web.html 用于在线按需加载资源。

网站不依赖 Codex 内部的 4173 服务进程。三个存档槽保存在当前浏览器 localStorage，退出写入当前槽，旧版单存档迁入槽 1。域名、浏览器或设备不同，存档也不同。旧页面可按 Ctrl+F5 强制刷新，版本应显示「深海远征 / 06」。

已验证 Pages 分支的 HTML 和完整 assets 树与测试产物一致。部署成功状态和网址通过 GitHub Actions 页面确认。当前云端网络策略拦截 github.io 的直接请求，因此未直接对公开网址执行浏览器验收；相同发布产物已在 /CodexGame1/ 路径下验证音乐和图标加载，并通过断网离线、浏览器流程、存档、奖励队列及压力测试。详见 TESTING.md。

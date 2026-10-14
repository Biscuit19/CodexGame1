# 在线部署

- 网站：https://biscuit19.github.io/CodexGame1/
- 托管：GitHub Pages，发布源 gh-pages 分支的根目录。
- 发布内容：index.html（由源码分支的 play.html 原样复制）、.nojekyll、素材署名与许可。
- v3：灵动回声，5 首授权音乐与程序矢量角色包含于约 6.4 MiB 的单文件中。
- v3 部署：GitHub Actions pages-build-deployment，状态 Success（2026-10-14）。
- 已确认发布提交：f687f22；对应游戏源码提交：96c84eb。
- 部署记录：https://github.com/Biscuit19/CodexGame1/actions/runs/38554668447

源码保留在 codex/echo-drift-delivery 分支。源代码更新后，重新运行 npm run build 和相关测试，再将生成的 play.html 更新为 gh-pages 分支的 index.html，正常提交并推送即可触发下一次发布。不要将源码入口 index.html 直接复制到 Pages；该入口用于开发服务器，单文件 play.html 才是独立发布产物。

网站不依赖 Codex 内部的 4173 服务进程。保存和进度在浏览器 localStorage 中；域名、浏览器或设备不同，存档也不同。

v3 部署成功状态和发布地址已通过 GitHub Actions 页面确认。当前 Codex 网络策略拦截 github.io 的直接请求，因此云端尚未对公开网址执行浏览器端验收。相同的单文件产物已通过v3 浏览器、音乐、压力与离线测试。

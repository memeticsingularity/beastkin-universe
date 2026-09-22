---
name: structure-report
description: 生成项目目录结构快照。首选 Node 版 scripts/qa/structure-report.js（DSH 沙箱下同样可用）；旧 generate_structure.bat/.sh 已取代，仅在需要复现历史产物时使用。
whenToUse: 用户要求"跑一下 generate_structure / 生成目录结构快照"、需要查看或导出项目目录树、或旧 .bat 报 "not recognized" / 产出 ~0,8datetime 这类怪文件时。
---

# 结构快照生成

## 首选：Node 版（DSH 沙箱可用）

```bash
node scripts/qa/structure-report.js                 # 目录树 + 全量文件树 -> structure/
node scripts/qa/structure-report.js --no-full       # 只生成目录树
node scripts/qa/structure-report.js --depth 3       # 限制深度
node scripts/qa/structure-report.js --prefix eks-o-cm   # 自定义标题前缀（对应旧 eks 变体）
node scripts/qa/structure-report.js --root <目录> --out <目录>
node scripts/qa/structure-report.js --keep-all      # 保留历史快照（默认清理同前缀旧快照）
```

- 产出：`structure/folder_structure_<YYYYMMDD_HHmm>.md`、`structure/full_structure_<...>.md`；
  `structure/` 已被 `.gitignore` 忽略，产物**不进版本库**。
- **纯 Node**：不依赖 `wmic` / `tree` / `cmd` / CRLF，因此不存在沙箱"假成功"问题。
- 默认排除 `.git .idea .vscode .claude .dsh .dsh-tmp node_modules structure __pycache__ .venv venv dist build .next .cache .pytest_cache`，
  **快照不含历史快照自身**。
- 写完自检（非 0 字节、结尾围栏正确），失败退出码 `1`。

> 本脚本只做**快照**，不做合规校验。查作品结构是否合规用 `check-structure.js`，两者不要混。

## 旧脚本（已由 Node 版取代）

`scripts/generate_structure.bat`（Windows）/ `.sh`（bash）/ `generate_structure_eks_o_cm.bat`。
仅在前述 Node 版无法满足（如需完全复现历史产物）时使用；使用时：

1. **让开发者在自己的终端跑**（双击或 `cmd`）。DSH 默认沙箱下 `cmd.exe` 可能直接被拒，
   或被拒后**打印 `✅ Done` 却留下 0 字节垃圾文件**——后者的两个文件名是
   `folder_structure_~0,8datetime` / `full_structure_~0,8datetime`（`%datetime%` 为空时
   `set timestamp=%datetime:~0,8%_...` 被解析成字面量）。
2. 必须**验证产物**：
   ```powershell
   Get-ChildItem structure -File | Where-Object { $_.Name -ne '.gitkeep' -and ($_.Length -eq 0 -or $_.Name -match '~') }
   Get-Content structure\full_structure_<时间戳>.md -Tail 2   # 应以 ``` 收尾
   ```
   注意 full 快照末尾可能出现一行 `ECHO is off.`（空行经 `echo !line!` 的残留），属旧脚本缺陷。
3. 有 0 字节/`~` 文件即为失败：只删这两个垃圾文件，**不要**因此去改脚本。

### 旧脚本的两个陷阱

- **编辑 `.bat` 必须用 CRLF**：`.gitattributes` 的 `* text=auto eol=lf` 会把它强制成 LF，
  而 cmd 遇到 LF-only 的 `.bat` 会从行首吃字符（症状：`'edelayedexpansion'`、`'r'`）。
  用 `Set-Content`（默认 CRLF）写，不要用默认 LF 的文件工具写 `.bat`。
- **快照自我膨胀**：`tree` 把 `structure/` 自己也列进去，每版包含上一版（2026-05-07 为 105 KB，
  2026-09-22 涨到 314 KB）。Node 版已通过排除规则 + 默认清理解决。

## 附：`.dsh/skills` 在多层工作区里的发现规则（重要）

DSH 的项目 skill 根是 **`<projectRoot>/.dsh/skills`**，`projectRoot` = 从会话 cwd
**向上找到的第一个含 `.git` 的目录**；找不到就退回 cwd。发现**只扫一层**（`<name>/SKILL.md`）。

推论：若会话 cwd 是上层目录（如 `IdeaProjects`，自身没有 `.git`），则仓库的 `.dsh/skills`
位于**下一层**，**不会被发现且不报错**。已在用解法（当前仓库即采用）：

```powershell
New-Item -ItemType Junction -Path '<上层工作区根>\.dsh\skills' -Target '<仓库根>\.dsh\skills'
```

DSH 的 `watchFollowSymlinks` 默认为 `true`，junction 会被跟随，新建后无需重启。
**更干净的替代**：直接以仓库根作为会话工作目录。

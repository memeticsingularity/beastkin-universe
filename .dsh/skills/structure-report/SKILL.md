---
name: structure-report
description: 生成项目目录结构快照（scripts/generate_structure.*）。DSH 沙箱会让该脚本"假装成功"却产出 0 字节文件，本 skill 给出正确的执行方式与失败识别。
whenToUse: 需要查看/导出项目目录树、用户要求"跑一下 generate_structure"、或该脚本报 "not recognized as an internal or external command" / 产出 ~0,8datetime 这类怪文件时。
---

# 结构快照生成（DSH 执行须知）

脚本：`scripts/generate_structure.bat`（Windows）/ `scripts/generate_structure.sh`（bash）。
产出：`structure/folder_structure_<时间戳>.md`、`structure/full_structure_<时间戳>.md`。
`structure/` 被 `.gitignore` 忽略（第 19 行），产物**不进版本库**，纯属本地快照。
脚本内部会 `cd` 到仓库根，所以路径与调用点无关。

## 它只做两件事

| 步骤 | 命令 | 产物 |
|------|------|------|
| 1 | `tree /A` | 目录树 |
| 2 | `tree /F /A` | 目录 + 文件树 |

**它不做结构合规校验**。要查"作品目录是否合规"用 `check-structure.js`，两者不要混。

## 铁律：DSH 默认沙箱下必然失败

沙箱拒绝两件事，而这脚本两件都要：

1. **WMI 访问**（取时间戳 `wmic os get localdatetime`）。被拒时 `wmic` **静默返回 0 且零输出**，
   不是报错——所以脚本继续往下跑，`%datetime%` 为空。
2. **子进程派生**（`for /f ... in ('命令')` 需要在 cmd 内再起一个 cmd）。
   被拒时报 `'<命令>' is not recognized as an internal or external command`。

两者叠加的**精确症状**：

```
'wmic os get localdatetime /value' is not recognized ...        ← 或静默无输出
'tree /A 2>nul | findstr ...' is not recognized ...
File Not Found
```

同时磁盘上会留下**两个 0 字节文件**，文件名是 `folder_structure_~0,8datetime` /
`full_structure_~0,8datetime`——因为 `%datetime%` 为空时 `set timestamp=%datetime:~0,8%_...`
被解析成字面量 `~0,8datetime`。屏幕上的 `✅ Done` 是假的。

## 正确执行流程

**第 1 步：让它离开沙箱跑**

优先让开发者在自己终端执行（双击、或 `cmd` 里跑）。开发者不在场又必须有产物时，
才用一次性提权执行**这一条命令**，并用一句话说明理由：

```
cmd /c "scripts\generate_structure.bat"      # workdir = 仓库根
```

提权只用于此命令；拿到产物后立即回到默认沙箱，不要顺带跑别的。

**第 2 步：验证产物（不可跳过）**

```powershell
Get-ChildItem structure -File | Where-Object { $_.Length -eq 0 -or $_.Name -match '~' }
```

有命中 = 失败了，走下面「失败恢复」。无命中再看文件头尾是否成对：

```powershell
Get-Content structure\folder_structure_<时间戳>.md -TotalCount 5   # 应有 beastkin-universe:.
Get-Content structure\full_structure_<时间戳>.md -Tail 2           # 应以 ``` 收尾
```

**第 3 步：失败恢复**

```powershell
Remove-Item structure\*~0,8datetime -Force    # 只删这两个 0 字节垃圾，别整目录删
```

然后确认沙箱模式，再重试或直接交回开发者。**不要**为了让脚本"不报错"去改脚本——
在正常终端下它是好的。

## 两个附加陷阱

**编辑 `.bat` 必须用 CRLF 行尾。** `.gitattributes` 第 12 行 `* text=auto eol=lf` 会把 `.bat`
也强制成 LF。用 LF-only 的 `.bat` 调用，cmd 会**从行首吃掉字符**，症状是
`'edelayedexpansion'`、`'r'` 这类残缺命令名，极难排查。写 `.bat` 时显式写 CRLF
（`Set-Content` 默认 CRLF；文件工具默认 LF，不要用它写 `.bat`）。

**产物会自我膨胀。** `tree` 把 `structure/` 自己也列进去，所以每一版快照都**包含上一版**：
2026-05-07 的 full 快照是 105 KB，2026-09-22 变成 314 KB / 6649 行，其中相当一部分是
旧快照自身。看最新的那版即可；要长期比对，先清 `structure/*.md` 再重跑。

## 附：`.dsh/skills` 在多层工作区里的发现规则（重要）

DSH 的项目 skill 根是 **`<projectRoot>/.dsh/skills`**，而 `projectRoot` = 从会话 cwd
**向上找到的第一个含 `.git` 的目录**；找不到就退回 cwd。发现**只扫一层**
（`<name>/SKILL.md`），刻意不递归。

推论：若会话 cwd 是上层目录（如 `IdeaProjects`，其自身没有 `.git`），
则 `beastkin-universe/.dsh/skills` 位于**下一层**，**本目录下所有 skill 都不会被发现**，
且不会报错——skill 目录里什么都不显示。

已采用的解法：在上层工作区根建目录 junction，把两层接起来。

```powershell
New-Item -ItemType Directory -Path '<上层工作区根>\.dsh' -Force
New-Item -ItemType Junction -Path '<上层工作区根>\.dsh\skills' -Target '<仓库根>\.dsh\skills'
```

DSH 的 `watchFollowSymlinks` 默认为 `true`，junction 会被正常跟随，**新建后无需重启**，
下一个模型步骤即生效。**更干净的替代**：直接以仓库根（含 `.git` 的那层）作为会话工作目录，
此时解析自然正确，不依赖任何 junction。

## 更好的替代（建议提出，改动需开发者同意）

该脚本依赖 `wmic`、`tree`、cmd 与 CRLF，四者都脆。建议改用 Node 重写为
`scripts/qa/structure-report.js`：与 `scripts/qa/` 其余工具同一条工具链，
彻底移除上述依赖；并可顺手排除 `.git`、`.idea`、`.claude`、`.dsh-tmp`、`structure`
自身，避免自我膨胀。**未经同意不要擅自重写或删除现有脚本。**

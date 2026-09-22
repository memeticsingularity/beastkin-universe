# Beastkin Universe - Project Guide

## 项目结构
- `worlds/` — 各世界观子项目
- 各子项目自带 `AGENTS.md` 记录该项目的专属设定与写作规范

## 结构规范（强制）
**唯一结构规范**：[`docs/spec/14-work-structure.md`](docs/spec/14-work-structure.md)（v2.0，**两层**）。
- **世界观层** `worlds/<world>/`：`README.md` + `AGENTS.md`(可选) + `settings/` + `images/` + `skills/`(可选)
  + `original-archives/{chinese|english}/{chaptered-stories/{main,side,extras}|short-stories}/<编码>/` + `adaptation-works/`
- **作品层** `<作品编码>/`（= 含 `metadata.yaml` 的目录）：`README.md` + `metadata.yaml` + `chapters/`
  + `characters/` + `images/` + `.process/{plans,ai-discussion,author-chat,settings,history,archive}`
- 禁止自创 `notes/`、`plans/`、`draft/`、`ai-discuss/`、`chat/`、`en/`、`templates/`(世界层)、`character-archive/` 等变体目录
- 新建世界观：`node scripts/new-world.js --world <world> --title-zh "<中文名>"`（先加 `--dry`；骨架源＝`templates/world-template/`）
- 新建作品：`node scripts/new-work.js --world <world> --form <cm|cs|s> --code <code> --title-zh "<标题>"`（先加 `--dry`）
- 结构校验：`node scripts/qa/check-structure.js .`（作品层）· `node scripts/qa/check-structure.js --world .`（世界观层）
- 配套 skill：`.dsh/skills/work-scaffold`、`.dsh/skills/structure-guard`；
  **该用哪个 skill 见路由表 [`.dsh/skills/README.md`](.dsh/skills/README.md)**

## 脚本执行与沙箱（DSH 会话必读）
- **生成目录结构快照用 Node 版**：`node scripts/qa/structure-report.js`（纯 Node，无 `wmic`/`tree`/`cmd`
  依赖，DSH 默认沙箱下可直接运行；自动排除 `.git`/`.dsh`/`structure` 等并自检产物）。
  详见 skill `.dsh/skills/structure-report`。
- **旧脚本**（`scripts/generate_structure.bat` / `.sh` / `generate_structure_eks_o_cm.bat`）已由 Node 版取代，仅作兼容保留：
  它们依赖 **WMI / `for /f` 子进程 / `tree`**，在默认沙箱下**必然失败**，且会**假装成功**（打印 `✅ Done`）
  却只产出 0 字节垃圾文件（文件名含 `~0,8datetime`）。
- 若确需运行旧脚本：优先让开发者在本地终端执行；只有产物确有必要、开发者不在场时，
  才用一次性提权跑**那一条命令**，随后立即回到默认沙箱。
- **任何脚本产出后都必须验证**：0 字节文件、文件名含 `~` 或残缺字符 = 失败，先清理再汇报。
  不要因为脚本报错就去改脚本——正常终端下它可能本来就是好的。
- 编辑 `.bat` 必须用 **CRLF** 行尾（`.gitattributes` 的 `* text=auto eol=lf` 会把它强制成 LF，
  而 cmd 遇到 LF-only 的 `.bat` 会从行首吃字符）。
- **多项目工作区里的 skill 根**：DSH 项目 skill 根解析为「从会话 cwd 向上第一个含 `.git` 的目录」，
  且只扫一层。若会话工作目录是上层目录，本目录的 `.dsh/skills` **不会被发现且不报错**。
  解法见 skill `.dsh/skills/structure-report` 末节，或直接以本目录为会话工作目录。

## 通用规则
- commit信息严禁暴露剧情内容、角色命运或关键转折
- 所有代号/文件名保持英文，正文用中文
- **故事正文格式**：以 [`docs/spec/11-story-format.md`](docs/spec/11-story-format.md)（**v4.0**）为唯一权威源。
  新建或修改**任何**故事文件（分章 `ch-*.md` / 短篇）之前**必读**；不要凭记忆或既有文件的写法照抄——
  历史遗留里有多种不合规写法，照抄会把错误扩散。spec 目录下另有项目结构、作品编码、元数据等规范。
- **骨架 / 写法 / 规则三分**：可复制骨架在 `templates/world-template/work-template/forms/`；
  「每一块写什么」在 skill `.dsh/skills/story-craft`；提交前自检在 `.dsh/skills/story-format-guard`；
  机器校验 `node scripts/qa/check-format.js .`（末尾的 v4.0 迁移欠债只统计不阻断）。
- **模板只放骨架**：`templates/` 里不得出现具体文案示例（示例世界观/作品/角色/句子）与指令性散文，
  只用 `{占位符}`；校验器会拦截（见 [`templates/README.md`](templates/README.md) 模板铁律）。

## 子项目索引
- [Beastshield](worlds/beastshield/AGENTS.md) — 兽盾世界观项目（墨犬续写/短篇等）
- [Series 4 Fetish Sessions](worlds/beastshield/adaptation-works/short-stories/series-4-fetish-sessions/AGENTS.md) — 兽盾改编短篇系列专属规范

## 校验工具
- 提交前运行 [`scripts/qa/`](scripts/qa/) 校验脚本（用法见其 README 与 CONTRIBUTING §5.4）

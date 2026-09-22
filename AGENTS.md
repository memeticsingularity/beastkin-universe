# Beastkin Universe - Project Guide

## 项目结构
- `worlds/` — 各世界观子项目
- 各子项目自带 `AGENTS.md` 记录该项目的专属设定与写作规范

## 结构规范（强制）
**唯一结构规范**：[`docs/spec/14-work-structure.md`](docs/spec/14-work-structure.md)。
原创/改编、长篇/短篇**骨架完全一致**：`chapters/`（正文）、`characters/`、`images/`、
`.process/{plans,ai-discussion,settings,history,archive}`。
禁止自创 `notes/`、`plans/`、`draft/`、`ai-discuss/`、`chat/`、`en/` 等变体目录。
- 新建作品：`node scripts/new-work.js --world <world> --form <cm|cs|s> --code <code> --title-zh "<标题>"`（先加 `--dry`）
- 结构校验：`node scripts/qa/check-structure.js .`
- 配套 skill：`.dsh/skills/work-scaffold`、`.dsh/skills/structure-guard`

## 通用规则
- commit信息严禁暴露剧情内容、角色命运或关键转折
- 所有代号/文件名保持英文，正文用中文
- **故事正文格式**：以 [`docs/spec/11-story-format.md`](docs/spec/11-story-format.md) 为唯一权威源。
  新建或修改**任何**故事文件（分章 `ch-*.md` / 短篇）之前**必读**；不要凭记忆或既有文件的写法照抄——
  历史遗留里有多种不合规写法，照抄会把错误扩散。spec 目录下另有项目结构、作品编码、元数据等规范。

## 子项目索引
- [Beastshield](worlds/beastshield/AGENTS.md) — 兽盾世界观项目（墨犬续写/短篇等）
- [Series 4 Fetish Sessions](worlds/beastshield/adaptation-works/short-stories/series-4-fetish-sessions/AGENTS.md) — 兽盾改编短篇系列专属规范

## 校验工具
- 提交前运行 [`scripts/qa/`](scripts/qa/) 校验脚本（用法见其 README 与 CONTRIBUTING §5.4）

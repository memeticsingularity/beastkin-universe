---
name: work-scaffold
description: 在 Beastkin Universe 新建作品或新章节时，按 docs/spec/14-work-structure.md 生成标准骨架，避免出现目录变体。
whenToUse: 用户要求"新建作品/开一个新坑/加一章/建一个短篇"，或需要为作品补 .process 结构时。
---

# 新建作品 / 章节（固定流程）

**唯一结构规范**：`docs/spec/14-work-structure.md`。任何新作品必须长成那个样子，不要自创目录。

## 一、新建作品

1. 先定参数（缺一不可）：
   - `--world` 世界观目录名（如 `beastshield`）
   - `--form` `cm`（主线分章）/ `cs`（支线分章）/ `s`（短篇）
   - `--code` 作品编码，必须与目录名一致，见 `docs/spec/02-work-coding.md`
   - `--title-zh` 中文名（`--title-en` 可选）
   - `--location` 默认按编码推断：含 `-o-` → `original-archives`，否则 `adaptation-works`
2. 生成骨架（先 `--dry` 看一眼路径）：
   ```bash
   node scripts/new-work.js --world <world> --form <cm|cs|s> --code <code> --title-zh "<标题>" [--title-en "<Title>"] --dry
   node scripts/new-work.js --world <world> --form <cm|cs|s> --code <code> --title-zh "<标题>"
   ```
3. 补齐 `metadata.yaml` 的真实字段与 `README.md` 的 4D 分级 + 9 类标签
   （依据 `docs/spec/13-rating-criteria.md`）。
4. 校验：`node scripts/qa/check-structure.js <作品目录>`

## 二、新增章节

- 分章正文**只放** `<作品目录>/chapters/`（分卷时 `chapters/volume-N/`）
- 文件名 `ch-{三位数字}-<slug>.md`，序号全作品连续（第二卷接着往下编）
- H1 与结束标记按 `docs/spec/11-story-format.md`：`# Chapter N 标题` + `**Chapter N END**`
- 上一章/下一章导航要同时更新前后两章

## 三、绝不允许

- 在作品根散放正文；新建 `notes/`、`plans/`、`draft/`、`ai-discuss/`、`chat/`、`en/` 等目录
  （过程产物一律进 `.process/{plans,ai-discussion,settings,history,archive}/`）
- 把短篇正文放在作品根（**所有正文都在 `chapters/`**：短篇是 `chapters/<编码>.md`，短篇集是 `chapters/<NN>-<slug>.md`）
- 双语用 `en/` 或 `*-en.md`（英文版放 `english/`）

---
name: story-craft
description: 故事正文的填充指导——场景分幕、节奏、评述区、风格校准、各世界（EKS / 恋爱 / 短篇集）专用写法。模板只给骨架，本 skill 负责"怎么写进去"。
whenToUse: 需要新建或续写故事正文、填写「故事评述与感慨」、校准 lanse 风格、或需要 EKS/恋爱/短篇集等专用写作指导时。
---

# 故事填充指导（story-craft）

**分工**：`templates/` 给**骨架**（文件与位置）→ 本 skill 给**填充指导**（内容怎么写）→
`docs/spec/11-story-format.md` 给**格式规范**（H1、结束标记、评述区位置，强制）。

## 先看骨架

```bash
node scripts/new-work.js --world <world> --form <cm|cs|s> --code <编码> --title-zh "<标题>" --dry
```
骨架说明见 [`templates/world-template/work-template/README.md`](../../../templates/world-template/work-template/README.md)。

## 填充顺序（推荐）

1. `metadata.yaml`：编码 / 标题 / form_type / status / 标签
2. `README.md`：4D 分级（见 `docs/spec/13-rating-criteria.md`）+ 9 类标签 + 简介
3. `chapters/`：按形态复制章节骨架，从 `ch-001` 起
4. 每章写完照 `docs/spec/11-story-format.md` 核对 H1 与结束标记
5. 过程产物进 `.process/{plans,ai-discussion,author-chat,settings,history,archive}/`

## 专用指导（按需查阅）

| 场景 | 参考 |
|------|------|
| 分章故事写法 | [references/chapter-guide.md](references/chapter-guide.md) |
| 短篇写法 | [references/short-story-guide.md](references/short-story-guide.md) |
| 短篇集（多篇合集） | [references/anthology-guide.md](references/anthology-guide.md) |
| 通用故事模板（中文长文） | [references/universal-story-guide-chinese.md](references/universal-story-guide-chinese.md) |
| Universal story guide (EN) | [references/universal-story-guide-english.md](references/universal-story-guide-english.md) |
| EKS 世界观专用 | [references/eks-story-guide-chinese.md](references/eks-story-guide-chinese.md) · [english](references/eks-story-guide-english.md) |
| 恋爱向写法 | [references/love-story-guide-chinese.md](references/love-story-guide-chinese.md) |
| 风格提示词 | [references/style-prompt.md](references/style-prompt.md) |
| 写作分析模板 | [references/writing-analysis.md](references/writing-analysis.md) |
| 过程记录写法 | [references/process-note.md](references/process-note.md) |

> 以上 references 由原 `templates/*.md` 迁移而来（原文件已归档到
> `project-docs/archive/templates-legacy-2026-09/`）。世界专属写法仍以各世界
> `AGENTS.md` 与 `worlds/<world>/skills/` 为准（如兽盾的 `lanse-write`）。

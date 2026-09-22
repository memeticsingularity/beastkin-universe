---
name: story-craft
description: 故事正文的填充指导——场景分幕、节奏、评述区、风格校准、各世界（EKS / 恋爱 / 短篇集）专用写法。模板只给骨架，本 skill 负责"怎么写进去"。
whenToUse: 需要新建或续写故事正文、填写「故事评述与感慨」、校准 lanse 风格、或需要 EKS/恋爱/短篇集等专用写作指导时。
---

# 故事填充指导（story-craft）

**分工**（三层，别混）：

| 层 | 位置 | 管什么 |
|---|---|---|
| 格式骨架 | `templates/world-template/work-template/forms/` + `docs/spec/11-story-format.md`（v4.0） | 有哪些块、块的顺序、标题怎么写 |
| **填充指导** | **本 skill** | **每一块里写什么** |
| 自检清单 | `.dsh/skills/story-format-guard` | 提交前逐项核对 |

## 先看骨架

```bash
node scripts/new-work.js --world <world> --form <cm|cs|s> --code <编码> --title-zh "<标题>" --dry
```
骨架说明见 [`templates/world-template/work-template/forms/README.md`](../../../templates/world-template/work-template/forms/README.md)。

## 每一块写什么（对着骨架逐块填）

| 块 | 写什么 | 常见错误 |
|---|---|---|
| `> *{卷首语}*` | 一到两句，点出本章的**情绪底色或主题**，可带意象；不预告剧情结局 | 写成剧情提要、写成引言引用 |
| `## 第{N}幕 {幕标题}` | 一幕＝一个核心动作或情感转折；标题 2–8 字、概括本幕，不剧透结果；幕内先给场景与在场角色（物种＋毛色＋制服＋袜＋体型），再推进动作 | 幕标题写成句子／剧透；一幕塞进两个转折；登场信息一次性罗列成清单 |
| 幕内正文 | 对话＋动作＋感官交替推进；对话标签、标点、术语遵循该世界 `AGENTS.md`（兽盾：标签用「道」、省略号写「。。。」、长筒袜每章至少 1 次） | 通篇叙述无对话；战斗/处决写成流程说明书 |
| 无幕形态 | 幕标题省略，但**转场仍要清楚**（空行＋时空/视角切换的明确交代） | 无幕又无转场，读者迷路 |
| `> *{卷尾语}*` | 本章收束时的一句情绪落点／余味，位于 END **之前** | 写成下一章预告；位置写到 END 之后 |
| `### 他们最后的故事` | 本章死亡角色逐条：给 `【活体→死-…】` 标签 ＋ 2–4 句评价其**死法、反应、与生前性格的反差**；无人死亡时写明「本章无人死亡」，不要整块删掉 | 只列名字不评；死亡反应公式化复制 |
| `### 还活着的人们` | 本章存活角色逐条：给 `【活体→活-…】` 标签 ＋ 状态与走向的余味 | 把没登场的角色也写进来 |
| `### 故事感慨` | 从本章具体命运上升到普遍思考（体制、欲望、麻木、救赎），**只谈本章**，不要泛泛抒情 | 变成作者说教；重复上一章的感慨 |
| `> *{评述导语}*` | 评述区开头一句总括，衔接正文与评述 | 省略后直接进 `###` |
| 块与块之间（**空行**） | **会渲染成不同块的两行之间必须空一行**：段落之间、`---` 前后、`##`/`###` 前后、卷首语/卷尾语前后、`【…】`标签行与其评述之间 | 预览里两段并成一段、标题失效、上一行被当成 setext 标题；细则见 `.dsh/skills/story-format-guard` §空行与 `docs/spec/11-story-format.md` §6 |

评述优先级：**先具体后抽象**——先把死者与生者的名字/编号/死法交代清楚，再上升到感慨。
评述区写多长由本章信息量决定，但不许空转：每一句都要有对应的正文依据。

## 填充顺序（推荐）

1. `metadata.yaml`：编码 / 标题 / form_type / status / 标签
2. `README.md`：4D 分级（见 `docs/spec/13-rating-criteria.md`）+ 9 类标签 + 简介
3. `chapters/`：按形态复制章节骨架，从 `ch-001` 起，逐块填上表
4. 每章写完照 `.dsh/skills/story-format-guard` 核对骨架（H1、幕标题、卷尾语位置、END、评述区）
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
>
> **版本纪律**：每个 reference 文末都标了 `骨架版本：v4.0`，与 `docs/spec/11-story-format.md`
> 末尾的版本号一致。规范升版时**必须同步这些 guide 的写法并升版**——
> `node scripts/qa/check-format.js .` 会逐个比对，没迭代就直接 FAIL。

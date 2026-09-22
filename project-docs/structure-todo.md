# 结构统一 · 残余项待办 / Structure TODO

> 由全库结构统一迁移（2026-09-17 ~ 09-22）生成。机械可判定项已全部处理；下列各项**需要作者判断**，
> 故未自动改动。处理完请跑 `node scripts/qa/run-all.js` 复核。

当前状态（2026-09-22）：
- `check-links` **0 失效**
- `check-structure`（作品层）**58 作品 0 不合规**
- `check-structure --world`（世界观层）**10 世界观 8 项不合规** —— 全部是同一类「散落正文未建成作品」，见 §零
- `check-format` 16 项不合规（缺章节标题，内容待办）

---

## 零、世界观层：把"散落正文"建成作品（下一步主任务）

规范（[`docs/spec/14-work-structure.md`](../docs/spec/14-work-structure.md) §2）要求：
正文必须落在「作品目录」内，而**作品 = 含 `metadata.yaml` 的目录**，路径固定为
`original-archives/<语言层>/{chaptered-stories/{main|side|extras}|short-stories}/<作品编码>/`。

以下位置的正文仍散落在作品之外，需要**建成作品**（补 `metadata.yaml` + `README.md`，正文移入 `chapters/`）：

| 世界 | 位置 | 数量 | 需要的动作 |
|------|------|:----:|-----------|
| beastshield | `original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1..3/` | 62 章 | 英文镜像作品缺 `metadata.yaml`（正文已在目录内） |
| beastshield | `original-archives/english/short-stories/bs-o-s-1..6.md` | 6 | 每篇建成独立短篇作品目录 |
| beastshield | `adaptation-works/short-stories/bs-a-s-6-deepseek-collection/01-gray-snow/` | 1 | 嵌套作品位置不合规（应作为独立作品或并入父作品 chapters/） |
| beastshield-online | `original-archives/{chinese,english}/chaptered-stories/main/ch-001..003.md` | 6 | 建成作品 `bso-o-cm-1-first-volume`（中文+英文） |
| beastshield-paradise | `original-archives/{chinese,english}/short-stories/bsp-o-s-1..2.md` | 4 | 每篇建成独立短篇作品目录（中英各 2） |
| beastshield-paradise | `original-archives/chinese/chaptered-stories/{main/volume-1,side/*}/` | 56 | 建成主线作品 + 各支线作品（补 metadata、正文入 `chapters/`） |
| beastshield-reforged | `original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/` | 15 章 | 英文镜像作品缺 `metadata.yaml` |
| empire-kik-soldiers | `original-archives/chinese/chaptered-stories/main/`（作品根=main 本身） | 1 | 降一层为 `main/eks-o-cm-1-long-live-the-empire/`（`chapters/` 保持） |
| empire-kik-soldiers | `original-archives/chinese/chaptered-stories/extras/extra-001..003/` | 147 章 | 三个番外作品缺 `metadata.yaml` |
| paradise-kik-soldiers | `original-archives/ch-001..003-*.md` + `ch-3/` | 3 + 11 | 3 篇短篇各建作品；`ch-3/` 建为分章作品（`chapters/` 收纳 ch-3-1..8） |
| united-beasts-alliance | `original-archives/{chinese,english}/chaptered-stories/main/uba-o-cm-1-main-story-1/` | 6 章 | 作品目录已有，但正文未入 `chapters/` 且缺 `metadata.yaml` |
| worldstrider-infinity | `original-archives/chinese/chaptered-stories/main/yan-sui/{trunk,branches}/` | 若干 | 建成作品 `yan-sui`（trunk → `chapters/`，branches → `chapters/` 或 `.process/history/`） |

> **做法**：`metadata.yaml` 的 `code` 取目录名，`form_type` 按正文形态（`cm`/`cs`/`s`），
> `status` 需作者确认（可先填 `updating`）；README 的 4D 分级需作者补。
> 移动后按 §10 SOP 修链接 → `check-links` 归零 → 提交。

---

## 一、需要作者决定（内容判断）

### 1. `bs-a-cs-4-yanliang` 的章节版本目录
`chapters/` 下并存三个版本，命名不属于 `volume-{数字}`：

| 目录 | 文件数 | 说明 |
|------|-------|------|
| `chapters/v1-20ch/` | 20 | 早期 20 章版 |
| `chapters/v1-refined/` | 20 | 修订版 |
| `chapters/v2-expanded/` | 4 | 扩写版（未完成） |

**需要确认**：哪一版是「现行正文」。确定后：现行版内容提升到 `chapters/`（必要时按 `ch-NNN-` 重命名），
其余版本移入 `.process/history/`。

### 2. 尚未落笔的作品（`chapters/` 为空）
- `bs-a-s-6-deepseek-collection/01-gray-snow`（仅 README + metadata，无正文）
- `bs-a-s-2-daily-hunt`、`bs-a-s-3-massacre-cleanup`（正文仅存于 `.process/history/` 草稿）

**需要确认**：是保留为企划（metadata `status: planning` 即不再报错），还是把草稿提升为正文。

### 3. 缺标题的章节（`check-format` 16 项）
清单见 [`story-format-todo.md`](story-format-todo.md)（其中 12 项为确实无标题来源、
4 项为搬迁后新入范围）。需要作者补 `# Chapter N {中文标题}`。

---

## 二、世界级归档（不在作品结构规范范围内，保持现状）

`docs/spec/14-work-structure.md` 定义的是**单个作品**的骨架（`<作品>/.process/…`）。
下列目录位于世界观层（没有 `metadata.yaml`，不构成作品），故未迁移：

- `worlds/beastshield/original-archives/ai-discussion/{discussion,insights}/` —— 世界级 AI 讨论归档
- `worlds/beastshield-paradise/.../chaptered-stories/{main/volume-1,side/*}/draft/` —— 世界级草稿
- `worlds/empire-kik-soldiers/adaptation-works/short-stories/draft/`
- `worlds/worldstrider-infinity/original-archives/chaptered-stories/yan-sui/{ai-discuss,chat,discussions,plans,notes}/`

> 若将来希望世界观层也统一，建议新增一节规范定义 `worlds/<world>/` 的归档骨架，
> 而不是把它们塞进某个作品的 `.process/`（会错置归属）。

---

## 三、新作品必须遵守

- 结构：[`docs/spec/14-work-structure.md`](../docs/spec/14-work-structure.md)
- 正文格式：[`docs/spec/11-story-format.md`](../docs/spec/11-story-format.md)
- 脚手架：`node scripts/new-work.js --world <world> --form <cm|cs|s> --code <code> --title-zh "<标题>"`
- 配套 skill：`.dsh/skills/work-scaffold`、`.dsh/skills/structure-guard`、`.dsh/skills/story-format-guard`

---

*生成时间：2026-09-17*

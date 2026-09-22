# Beastkin Universe 作品结构规范 v1.0

> **一句话**：原创或改编、长篇或短篇，**目录骨架完全一致**，只有内容不同。
> 位置固定 → 工具能扫、AI 能找、批处理不会踩空。
>
> 本文档回答"文件放哪、叫什么"；正文排版见 [`11-story-format.md`](11-story-format.md)；
> 编码规则见 [`02-work-coding.md`](02-work-coding.md)；元数据见 [`04-metadata.md`](04-metadata.md)。
>
> 校验：`node scripts/qa/check-structure.js .`（只读，退出码 0/1）
> 新建：`node scripts/new-work.js --code <编码> --title-zh <中文名> --form <cm|cs|s>`

---

## 1. 标准作品骨架（唯一形态）

```
worlds/<world>/{original-archives|adaptation-works}/<语言层>/<作品编码>/
├── README.md                 # 作品总览（必填）
├── metadata.yaml             # 元数据（必填，见 04-metadata.md）
├── chapters/                 # 正文（**所有作品都有**，分章与短篇一致）
│   ├── ch-001-<slug>.md      # 分章：三位数序号，字典序 = 阅读序（见 §4）
│   ├── ch-002-<slug>.md
│   ├── <作品编码>.md          # 短篇（单篇）：以作品编码命名，直接在 chapters/ 下
│   └── volume-2/             # 分卷时唯一允许的卷目录名（见 §5）
│       └── ch-030-<slug>.md
├── characters/               # 本作品角色档案（有档案时必填，见 §6）
│   ├── README.md             # 索引（必填）
│   └── <等级或分类>/         # 需要时再分层
├── images/                   # 本作品图片（README.md 必填）
├── original-text/            # 作者原始 .txt 等（可选）
└── .process/                 # 一切过程产物（见 §3）
```

**判定作品类型只看 `metadata.yaml` 的 `form_type`**，不看目录名：
`cm` = 主线分章、`cs` = 支线分章、`s` = 短篇。

> **为什么短篇也放 `chapters/`**：正文位置全库唯一，工具与 AI 只需认一个路径
> （`<作品>/chapters/`），不必先判断作品类型再找文件。短篇与分章的唯一差别是
> 文件命名（`<编码>.md` vs `ch-001-*.md`）与 H1 形式（`# Story` vs `# Chapter N`）。

### 语言层

| 情形 | 路径 |
|------|------|
| 原作中文 | `original-archives/chinese/<作品编码>/` |
| 原作英文 | `original-archives/english/<作品编码>/` |
| 改编（默认中文） | `adaptation-works/<作品编码>/` |

双语作品的**唯一**做法：中文正文在作品根（分章放 `chapters/`），英文版放 `english/` 子目录
（分章为 `english/chapters/`）。**禁止** `en/`、`*-en.md`、`chinese/` 双语混杂。

---

## 2. 短篇作品的形态

短篇同样使用 `chapters/`，只是文件命名不同：

| 形态 | 正文位置 |
|------|---------|
| 短篇（单篇） | `chapters/<作品编码>.md` |
| 短篇集（一个作品含多篇独立小故事） | `chapters/<NN>-<slug>.md`，按序号排序 |
| 分章 | `chapters/ch-001-<slug>.md`（见 §4） |

短篇**不再**把正文放在作品根：作品根只允许 `README.md`、`metadata.yaml`、`chapters/`、
`characters/`、`images/`、`original-text/`、`.process/`、`english/`。

---

## 3. `.process/` 固定子目录（过程产物一律入此）

```
.process/
├── plans/          # 章节计划、全局优化方案（<YYYY-MM-DD>-<主题>.md 或 ch-NNN-plan.md）
├── ai-discussion/  # 与 **AI** 的讨论记录（<YYYY-MM-DD>-<主题>.md + INDEX.md 索引）
├── author-chat/    # 与 **作者本人** 的交流记录（作者提供的设定、意见、回复、口述剧情）
├── settings/       # 创作期设定（characters/ scenes/ systems/ levels/ 等）
├── history/        # 旧版本稿（ch-0NN-<slug>-vN.md）
└── archive/        # 已完成/废弃的计划与讨论
```

> **`ai-discussion/` 与 `author-chat/` 不可混用**：前者是与 AI 的对话，后者是与作者的对话。
> 作者口述的设定、审阅意见、剧情指示一律进 `author-chat/`。

**禁止**在作品根下另建这些目录名：`notes/`、`plan/`、`plans/`、`ai-discuss/`、`discussions/`、
`discussion/`、`deepseek/`、`chat/`、`insights/`、`draft/`、`drafts/`、`vN-scrapped/`、
`author-chat/`——它们一律并入上表对应位置（`chat/` → `.process/ai-discussion/`；
**`author-chat/` → `.process/author-chat/`**）。

---

## 4. 章节文件命名

```
ch-{三位数字}[-{英文标题简写}].md      例：ch-001-game-entry.md
```

- 三位数字，`ch-001`…`ch-010`…。**禁止** `ch-1.md`、`ch-01.md`（字典序会乱）。
- 同一章的多版本/子章节：`ch-001-2.md`（第 1 章第 2 版），仍属同一章。
- 英文版：`english/chapters/ch-001-<slug>.md`（同一命名规则）。

## 5. 分卷

仅当作品确有卷结构时使用，目录名固定 `volume-{自然数}`（如 `volume-1`、`volume-2`），
放在 `chapters/` 下。**禁止** `v1/`、`vol-1/`、`第1卷/`、`volume-1-xxx/` 等变体。
卷内章节序号**全作品连续**（第二卷从 ch-020 起继续，不重新从 1 开始）。

---

## 6. 角色档案

| 层级 | 位置 | 适用 |
|------|------|------|
| 世界观级 | `worlds/<world>/.../characters/` | 跨作品共用的角色（如兽盾公司档案库） |
| 作品级 | `<作品目录>/characters/` | 只属于该作品的角色 |

两者都必须有 `README.md` 索引；三级索引、登场原文引用等硬规则见
[`worlds/beastshield/AGENTS.md`](../../worlds/beastshield/AGENTS.md)。
角色档案**不得**散落在 `.process/` 之外的作品根或 `notes/` 中。

---

## 7. 必备文件与最小工作量

| 文件 | 分章 | 短篇 |
|------|:----:|:----:|
| `README.md`（含 4D 分级 + 9 类标签） | ✅ | ✅ |
| `metadata.yaml` | ✅ | ✅ |
| 正文（`chapters/` 或 `<编码>.md`） | ✅ | ✅ |
| `images/README.md` | 有图时 | 有图时 |
| `.process/` 子目录 | 按需建立 | 按需建立 |

---

## 8. 迁移既有作品

历史遗留的变体按 §3/§4/§5 归位。迁移必须成批进行并同步修正相对链接，
流程见 [迁移 SOP](#9-迁移-sop)：

1. `git mv` 移动目录（保留历史）
2. 批量修正引用该路径的相对链接
3. `node scripts/qa/check-links.js .` 必须为 0
4. `node scripts/qa/check-structure.js .` 确认该作品合规
5. 提交（commit 信息不暴露剧情）

## 9. 迁移 SOP

```bash
node scripts/qa/check-structure.js .                # 先看全库不合规清单
node scripts/qa/check-structure.js <作品目录>        # 单作品
```
迁移一个作品的标准动作：改名 → 改引用 → `check-links` 清零 → `check-structure` 通过 → 提交。

---

*版本 1.0 · 2026-09-17 · 配套 skill：`.dsh/skills/work-scaffold`（新建作品）、
`.dsh/skills/structure-guard`（结构守卫）*

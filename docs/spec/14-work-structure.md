# Beastkin Universe 项目结构规范 v2.0

> **一句话**：世界观层与作品层各有**唯一骨架**；原创或改编、长篇或短篇，作品骨架完全一致。
> 位置固定 → 工具能扫、AI 能找、批处理不会踩空。
>
> 本文档回答"文件放哪、叫什么"；正文排版见 [`11-story-format.md`](11-story-format.md)；
> 编码规则见 [`02-work-coding.md`](02-work-coding.md)；元数据见 [`04-metadata.md`](04-metadata.md)。
>
> **校验**
> ```bash
> node scripts/qa/check-structure.js --world .     # 世界观层
> node scripts/qa/check-structure.js .             # 作品层（默认）
> ```
> **新建**
> ```bash
> node scripts/new-world.js --world <world> --title-zh "<中文名>" [--title-en "<English>"]
> node scripts/new-work.js  --world <world> --form <cm|cs|s> --code <code> --title-zh "<中文名>"
> ```

---

## 1. 两层结构总览

```
worlds/<world>/                     ← 世界观层（§2）
└── {original-archives|adaptation-works}/...
    └── <作品编码>/                  ← 作品层（§3，骨架全库一致）
```

- **世界观层**：只放"属于整个世界"的东西——总览、设定库、世界级图片、世界级角色档案、世界级讨论归档。
- **作品层**：一个作品 = 一个含 `metadata.yaml` 的目录，其内部骨架见 §3。

**判定一个目录是不是作品，只看它有没有 `metadata.yaml`。**

---

## 2. 世界观层骨架（唯一形态）

```
worlds/<world>/
├── README.md                    # 必填：世界观总览 + 分级总览 + 作品索引
├── AGENTS.md                    # 可选：该世界专属的写作/设定规范
├── settings/                    # 世界观设定库
│   ├── 0-original-setting/      # 原始设定（权威源）
│   ├── 1-recommended-canon/     # 推荐设定（按场景裁剪）
│   ├── 2-supplemental-settings/ # 补充设定
│   └── 2-story-variants/        # 故事变体设定
├── images/                      # 世界观级图片（有图时含 README.md）
├── skills/                      # 可选：该世界专属 agent skills
├── original-archives/           # 原作（§2.2）
└── adaptation-works/            # 改编（§2.3）
```

### 2.1 顶层允许的条目（白名单）

`README.md`、`AGENTS.md`、`settings/`、`images/`、`skills/`、`original-archives/`、`adaptation-works/`、`.process/`。
**其他目录名一律不合规**（尤其禁止 `templates/`、`notes/`、`docs/` 出现在世界观层——模板属于仓库根 `templates/`）。

### 2.2 `original-archives/`（原作）

```
original-archives/
├── README.md                    # 可选：原作索引
├── chinese/                     # 语言层（至少一个语言层必须存在）
│   ├── chaptered-stories/
│   │   ├── main/<作品编码>/       # 主线分章
│   │   ├── side/<作品编码>/       # 支线分章
│   │   └── extras/<作品编码>/     # 番外（可选）
│   ├── short-stories/<作品编码>/
│   └── characters/              # 世界观级角色档案（如兽盾公司档案库）
├── english/                     # 与 chinese/ 同构（有英文版时才建）
└── ai-discussion/               # 可选：世界级 AI 讨论归档
```

**规则**

| # | 规则 |
|---|------|
| W1 | `original-archives/` 第一层**只能是**：语言层（`chinese/`、`english/`）、`ai-discussion/`、`characters/`、`images/`、`README.md` |
| W2 | **禁止语言层缺失**：正文不得直接躺在 `original-archives/` 或 `chaptered-stories/` 下，必须先有 `chinese/` 或 `english/` |
| W3 | 语言层下**只能是**：`chaptered-stories/`、`short-stories/`、`characters/`、`images/`、`README.md` |
| W4 | `chaptered-stories/` 下**只能是** `main/`、`side/`、`extras/`（分组可选，但**不得**直接放作品目录以外的散文件） |
| W5 | 作品目录必须直接位于 `chaptered-stories/{main,side,extras}/` 或 `short-stories/` 下 |

### 2.3 `adaptation-works/`（改编）

```
adaptation-works/
├── README.md                    # 可选
├── chaptered-stories/<作品编码>/  # 改编不分语言层（默认中文）
└── short-stories/<作品编码>/
```

双语改编作品的英文版放在作品内 `english/`（见 §3 语言层）。

### 2.4 世界观级资产命名（固定）

| 内容 | 固定目录名 | 禁止 |
|------|-----------|------|
| 设定库 | `settings/` | `setting/`、`docs/` |
| 图片 | `images/` | `img/`、`pics/` |
| 角色档案 | `characters/` | **`character-archive/`**、`roles/` |
| AI 讨论归档 | `ai-discussion/` | `ai-discuss/`、`chat/`、`discussions/` |
| 世界级技能 | `skills/` | `skill/` |

---

## 3. 作品层骨架（唯一形态）

```
worlds/<world>/{original-archives/<语言层>|adaptation-works}/<形式层>/[main|side|extras]/<作品编码>/
├── README.md                 # 作品总览（必填）
├── metadata.yaml             # 元数据（必填，见 04-metadata.md）
├── chapters/                 # 正文（**所有作品都有**，分章与短篇一致）
│   ├── ch-001-<slug>.md      # 分章：三位数序号，字典序 = 阅读序（见 §6）
│   ├── <作品编码>.md          # 短篇（单篇）：以作品编码命名
│   └── volume-2/             # 分卷时唯一允许的卷目录名（见 §7）
├── characters/               # 本作品角色档案（有档案时必填，见 §8）
├── images/                   # 本作品图片（README.md 必填）
├── original-text/            # 作者原始 .txt 等（可选）
├── english/                  # 双语作品的英文版（分章为 english/chapters/）
└── .process/                 # 一切过程产物（见 §5）
```

**判定作品类型只看 `metadata.yaml` 的 `form_type`**：`cm` = 主线分章、`cs` = 支线分章、`s` = 短篇。

> **为什么短篇也放 `chapters/`**：正文位置全库唯一，工具与 AI 只需认 `<作品>/chapters/`，
> 不必先判断作品类型再找文件。短篇与分章的唯一差别是文件命名与 H1 形式
> （`# Story` vs `# Chapter N`，见 [`11-story-format.md`](11-story-format.md)）。

### 语言层

| 情形 | 路径 |
|------|------|
| 原作中文 | `original-archives/chinese/{chaptered-stories/{main,side,extras}|short-stories}/<编码>/` |
| 原作英文 | `original-archives/english/...`（同构） |
| 改编（默认中文） | `adaptation-works/{chaptered-stories|short-stories}/<编码>/` |

作品内双语的**唯一**做法：中文正文在 `chapters/`，英文版放作品内 `english/`（分章为 `english/chapters/`）。
**禁止** `en/`、`*-en.md`。

---

## 4. 短篇作品的形态

| 形态 | 正文位置 |
|------|---------|
| 短篇（单篇） | `chapters/<作品编码>.md` |
| 短篇集（一个作品含多篇独立小故事） | `chapters/ch-<三位数>-<slug>.md` |
| 分章 | `chapters/ch-<三位数>-<slug>.md`（见 §6） |

短篇**不把正文放在作品根**：作品根只允许 §3 列出的固定条目。

---

## 5. `.process/` 固定子目录（过程产物一律入此）

```
.process/
├── CHANGELOG.md    # 允许：变更日志（固定文件名之一）
├── CURRENT_STATUS.md   # 允许：当前状态（固定文件名之一）
├── plans/          # 章节计划、全局优化方案（<YYYY-MM-DD>-<主题>.md 或 ch-NNN-plan.md）
├── ai-discussion/  # 与 **AI** 的讨论记录（<YYYY-MM-DD>-<主题>.md + INDEX.md 索引）
├── author-chat/    # 与 **作者本人** 的交流记录（作者提供的设定、意见、回复、口述剧情）
├── settings/       # 创作期设定（characters/ scenes/ systems/ levels/ 等）
├── history/        # 旧版本稿（ch-0NN-<slug>-vN.md）
└── archive/        # 已完成/废弃的计划与讨论
```

> **`ai-discussion/` 与 `author-chat/` 不可混用**：前者是与 AI 的对话，后者是与作者的对话。
> `.process/` 根下只允许 `CHANGELOG.md`、`CURRENT_STATUS.md` 两个文件；其余文档必须进对应子目录。

**禁止**在作品根下另建这些目录名：`notes/`、`plan/`、`plans/`、`ai-discuss/`、`discussions/`、
`discussion/`、`deepseek/`、`chat/`、`insights/`、`draft/`、`drafts/`、`vN-scrapped/`、`author-chat/`
——它们一律并入上表对应位置（`chat/` → `.process/ai-discussion/`；`author-chat/` → `.process/author-chat/`）。

---

## 6. 章节文件命名

```
ch-{三位数字}[-{英文标题简写}].md      例：ch-001-game-entry.md
```

- 三位数字，`ch-001`…`ch-010`…。**禁止** `ch-1.md`、`ch-01.md`（字典序会乱）。
- 同一章的多版本/子章节：`ch-001-2.md`（第 1 章第 2 版），仍属同一章。
- 英文版：`english/chapters/ch-001-<slug>.md`（同一命名规则）。

## 7. 分卷

仅当作品确有卷结构时使用，目录名固定 `volume-{自然数}`，放在 `chapters/` 下。
**禁止** `v1/`、`vol-1/`、`第1卷/`、`volume-1-xxx/` 等变体。
卷内章节序号**全作品连续**（第二卷从 ch-020 起继续，不重新从 1 开始）。

---

## 8. 角色档案

| 层级 | 位置 | 适用 |
|------|------|------|
| 世界观级 | `worlds/<world>/.../characters/` | 跨作品共用的角色（如兽盾公司档案库） |
| 作品级 | `<作品目录>/characters/` | 只属于该作品的角色 |

两者都必须有 `README.md` 索引；三级索引、登场原文引用等硬规则见
[`worlds/beastshield/AGENTS.md`](../../worlds/beastshield/AGENTS.md)。
角色档案**不得**散落在 `.process/` 之外的作品根或 `notes/` 中。

---

## 9. 必备文件与最小工作量

**世界观层**

| 文件 | 必填 |
|------|:----:|
| `worlds/<world>/README.md`（含分级总览 + 作品索引） | ✅ |
| 至少一个语言层（`original-archives/chinese/`）或 `adaptation-works/` | ✅ |
| `settings/`、`images/`、`skills/`、`ai-discussion/` | 按需 |

**作品层**

| 文件 | 分章 | 短篇 |
|------|:----:|:----:|
| `README.md`（含 4D 分级 + 9 类标签） | ✅ | ✅ |
| `metadata.yaml` | ✅ | ✅ |
| 正文（`chapters/`） | ✅ | ✅ |
| `images/README.md` | 有图时 | 有图时 |
| `.process/` 子目录 | 按需建立 | 按需建立 |

---

## 10. 迁移与 SOP

历史遗留的变体按 §2/§5/§6/§7 归位。迁移必须成批进行并同步修正相对链接：

1. `node scripts/qa/check-structure.js --world .` 记录世界观层基线
2. `git mv` 移动目录（保留历史），一次只动一类
3. 批量修正引用该路径的相对链接（用「整条链接」级替换，逐条断言命中数）
4. `node scripts/qa/check-links.js .` 必须为 0
5. `node scripts/qa/check-structure.js .` 与 `--world` 均通过
6. 提交（commit 信息不暴露剧情内容、角色命运或关键转折）

---

*版本 2.0 · 2026-09-22 · 新增世界观层规范（§2）与两层校验口径；
配套 skill：`.dsh/skills/work-scaffold`（新建作品）、`.dsh/skills/structure-guard`（结构守卫）*

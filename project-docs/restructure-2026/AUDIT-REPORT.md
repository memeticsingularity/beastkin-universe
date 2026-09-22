# Beastkin Universe 规范重构审计报告

> 审计日期：2026-05-07
> 审计范围：worlds/ 目录下的全部作品、设定、过程文件
> 审计目标：为规范重构提供现状基线

---

## 1. 目录命名违规（严重）

以下目录名不符合 `[世界观]-[性质]-[形式]-[序号]-[标识名]` 编码规范：

| 当前路径 | 问题 | 建议编码 |
|---------|------|---------|
| `beastshield/adaptation-works/chaptered-stories/06-moying` | 数字前缀，无世界观编码 | `bs-a-cm-?-moying` 或 `bs-a-cs-?-moying` |
| `beastshield/adaptation-works/chaptered-stories/07-daily` | 数字前缀 | `bs-a-cs-?-daily` |
| `beastshield/adaptation-works/chaptered-stories/08-sanguipendium` | 数字前缀 | `bs-a-cm-?-sanguipendium` |
| `beastshield/adaptation-works/chaptered-stories/09-first-game` | 数字前缀 | `bs-a-cm-?-first-game` |
| `beastshield/adaptation-works/chaptered-stories/07-daily/001-graduation-internship` | 三位数补零 | `bs-a-cs-?-graduation-internship` |
| `beastshield/adaptation-works/chaptered-stories/bs-a-cs-6-casual-massacre/st-01-energy-dispatch-night` | 使用了 `st-` 前缀和补零 | `bs-a-s-?-energy-dispatch-night` |
| `empire-kik-soldiers/adaptation-works/chaptered-story/side/bs-a-c-1-short-stories` | 使用了旧格式 `c`（应为 `cm` 或 `cs`） | `bs-a-cs-?-short-stories` |

---

## 2. 缺少 metadata.yaml 的作品目录

以下作品目录**未找到** `metadata.yaml` 文件（共发现 10 个存在，以下为主要缺失项）：

### Beastshield 原创区
- `original-archives/chinese/chaptered-stories/main/bs-o-cm-1-main-story-1`
- `original-archives/chinese/chaptered-stories/main/bs-o-cm-1-main-story-2`
- `original-archives/chinese/chaptered-stories/main/bs-o-cm-1-main-story-3`
- `original-archives/chinese/chaptered-stories/side/bs-o-cs-1-yan-liang`
- `original-archives/chinese/short-stories/` 下的全部短篇（直接在 short-stories 目录下为文件，无独立目录）

### Beastshield 改编区
- `adaptation-works/chaptered-stories/06-moying`
- `adaptation-works/chaptered-stories/07-daily`
- `adaptation-works/chaptered-stories/bs-a-cs-2-birthday-deaths-of-uniforms`
- `adaptation-works/chaptered-stories/bs-a-cs-3-all-clear`
- `adaptation-works/chaptered-stories/bs-a-cs-4-yanliang`
- `adaptation-works/chaptered-stories/bs-a-cs-5-beastshield-chronicles`
- `adaptation-works/chaptered-stories/bs-a-cs-6-casual-massacre`
- `adaptation-works/chaptered-stories/side/bs-a-cs-2-auction-show`
- `adaptation-works/chaptered-stories/side/bs-a-cs-s1-leishan-resurrection`
- `adaptation-works/short-stories/series-1-sentry-elimination`
- `adaptation-works/short-stories/series-2-daily-hunt`
- `adaptation-works/short-stories/series-3-massacre-cleanup`

### 其他世界观
- `beastshield-paradise/original-archives/chinese/chaptered-stories/side/bsp-o-cs-1-g-277-green-bull-azhuang`（存在 metadata）
- `worldstrider-infinity/original-archives/chaptered-stories/yan-sui`（缺失）
- `empire-kik-soldiers` 下的多数作品（部分存在）

> **统计**：约 30+ 个作品目录缺少 metadata.yaml，覆盖率不足 30%。

---

## 3. setting / settings 单复数不一致

| 单数（需改） | 复数（基准） |
|-------------|-------------|
| `empire-kik-soldiers/setting` | `beastshield/settings` |
| `paradise-kik-soldiers/setting` | `beastshield-paradise/settings` |
| `worldstrider-infinity/setting` | `united-beasts-alliance/settings` |

此外，作品级 `setting/settings` 也存在混用：
- `bs-a-cs-3-all-clear/setting`（单数）
- `bs-a-cs-5-beastshield-chronicles/setting`（单数）
- `08-sanguipendium/settings`（复数）
- `09-first-game/settings`（复数）

---

## 4. README 大小写不一致

以下文件为 `readme.md`（小写），需统一为 `README.md`：

1. `beastshield/adaptation-works/chaptered-stories/bs-a-cs-5-beastshield-chronicles/readme.md`
2. `beastshield/adaptation-works/chaptered-stories/bs-a-cs-5-beastshield-chronicles/setting/author-chat/readme.md`
3. `beastshield/adaptation-works/chaptered-stories/bs-a-cs-5-beastshield-chronicles/setting/characters/readme.md`
4. `beastshield/adaptation-works/chaptered-stories/side/bs-a-cs-3-songguo-story/images/readme.md`
5. `beastshield/original-archives/images/songguo/readme.md`

---

## 5. 版本迭代文件命名混乱

以下文件使用了非标准版本命名，需统一为 `<basename>-vM.m.md`：

| 当前文件名 | 建议新名 |
|-----------|---------|
| `README_v1.md` | `README-v1.0.md` |
| `plan_v2.md` | `plan-v2.0.md` |
| `plan_v1.md` | `plan-v1.0.md` |
| `plan_v1_1.md` | `plan-v1.1.md` |
| `plan_v1_2.md` | `plan-v1.2.md` |
| `story_v3.md` | `story-v3.0.md` |
| `README_v1.0.md` | `README-v1.0.md`（格式正确，但下划线应改连字符） |
| `README_v2.0.md` | `README-v2.0.md`（同上） |
| `plan_v1.0.md` | `plan-v1.0.md`（同上） |
| `plan_v2.0.md` | `plan-v2.0.md`（同上） |

> 注意：当前存在 `01-warehouse-story_v3.md` 等多达 24 个带版本的故事文件，集中位于 `series-2-daily-hunt/story/` 目录。

---

## 6. tmp 目录污染

以下 `tmp/` 目录已提交到 Git 中：

1. `worlds/beastshield-reforged/tmp`
2. `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-1-shorts/tmp`
3. `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-2-birthday-deaths-of-uniforms/tmp`
4. `worlds/empire-kik-soldiers/setting/tmp`

`.gitignore` 已规则 `**/tmp/*` 和 `!**/tmp/.gitkeep`，但历史提交中的 tmp 内容仍然存在。

---

## 7. 改编作品 chaptered-stories/side 目录

规范要求改编作品不区分 main/side，但以下目录真实存在：

- `beastshield/adaptation-works/chaptered-stories/side/`
  - `bs-a-cs-2-auction-show`
  - `bs-a-cs-3-songguo-story`
  - `bs-a-cs-s1-leishan-resurrection`
- `empire-kik-soldiers/adaptation-works/chaptered-story/side/`
  - `bs-a-c-1-short-stories`
  - `eks-o-cm-1-recall-protocol`
  - `eks-o-cm-2-dog-soldier-dreams`

这些作品应被**扁平化**迁移到 `chaptered-stories/` 根级。

---

## 8. 作品目录内部语言子目录（与"按作品聚合"决策冲突）

以下改编作品目录内部存在 `chinese/` / `english/` 子目录：

- `bs-a-cs-1-shorts/chinese/`、`bs-a-cs-1-shorts/english/`
- `bs-a-cs-3-all-clear/chinese/`
- `bs-a-cs-5-beastshield-chronicles/chinese/`

根据"按作品聚合"决策，中英文应在同一作品目录内通过文件名区分（`ch-1.md` 与 `en/ch-1.md`），而非分设目录。

---

## 9. 过程文件散落在作品目录中

以下非正文目录直接存在于作品目录下，需迁入 `.process/`：

| 作品目录 | 散落的过程子目录 |
|---------|----------------|
| `06-moying` | `design/`, `history/` |
| `08-sanguipendium` | `ai-discussion/`, `history/`, `tool/`, `visualization/` |
| `09-first-game` | `settings/` |
| `bs-a-cs-1-shorts` | `tmp/` |
| `bs-a-cs-2-birthday-deaths-of-uniforms` | `tmp/` |
| `bs-a-cs-3-all-clear` | `draft/`, `setting/` |
| `bs-a-cs-4-yanliang` | `ai/`, `draft/` |
| `bs-a-cs-5-beastshield-chronicles` | `setting/` |
| `bs-a-cs-6-casual-massacre` | `research/`, `st-01-energy-dispatch-night/` |
| `bs-a-cs-3-songguo-story` | `ai-discussion/`, `characters/`, `discussions/`, `images/`, `settings/` |
| `series-1-sentry-elimination` | `plan/`, `story/` |
| `series-2-daily-hunt` | `analysis/`, `discussion/`, `plan/`, `review/`, `settings/`, `story/` |
| `series-3-massacre-cleanup` | `plan/`, `story/` |
| `yan-sui` (worldstrider) | `ai-discuss/`, `chat/`, `discussions/`, `history/`, `latest/` |

---

## 10. 空世界观噪音

以下世界观几乎没有实质内容，以 `.gitkeep` 占位为主：

### beastshield-reforged
- `adaptation-works/chaptered-stories/.gitkeep`
- `original-archives/chinese/short-stories/.gitkeep`
- `original-archives/english/short-stories/.gitkeep`
- `settings/0-original-setting/.gitkeep`
- `settings/1-recommended-canon/.gitkeep`
- `settings/3-story-variants/.gitkeep`

### united-beasts-alliance
- `adaptation-works/chaptered-stories/.gitkeep`
- `adaptation-works/short-stories/.gitkeep`
- `original-archives/chinese/short-stories/.gitkeep`
- `original-archives/english/short-stories/.gitkeep`
- `settings/0-original-setting/.gitkeep`
- `settings/1-recommended-canon/.gitkeep`
- `settings/3-story-variants/.gitkeep`

---

## 11. 根目录散落脚本

以下 Python 脚本位于项目根目录，应迁入 `scripts/`：

- `update_bear_hound.py`
- `update_entries.py`

---

## 12. 语言分层缺失

以下世界观的 `original-archives` **没有** `chinese/` / `english/` 语言分层，文件直接平铺：

- `paradise-kik-soldiers/original-archives/`
- `worldstrider-infinity/original-archives/`
- `empire-kik-soldiers/original-archives/`（只有 `chinese/chaptered-stories/main/`，但 `original-archives/` 本身缺少语言层）

---

## 审计结论

| 问题类别 | 数量 | 优先级 |
|---------|------|--------|
| 目录命名违规 | 7 处 | P0 |
| 缺少 metadata.yaml | 30+ 个作品 | P0 |
| setting/settings 不一致 | 3 个世界观 + 多个作品 | P1 |
| readme 大小写 | 5 个文件 | P1 |
| 版本文件命名混乱 | 30+ 个文件 | P1 |
| tmp 目录污染 | 4 处 | P1 |
| 改编作品 side 目录 | 6 个作品需扁平化 | P1 |
| 过程文件散落 | 14 个作品目录 | P1 |
| 空世界观噪音 | 2 个世界观 | P2 |
| 语言分层缺失 | 3 个世界观 | P2 |

---

*审计完成时间：2026-05-07*
*下一步：基于本审计报告，按 Phase 2 规范文档 → Phase 4 基础设施 → Phase 5 示范性重构的顺序推进。*

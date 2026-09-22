# 项目架构演进与 AI Skills 配套建议（提案 v1.0）

> 2026-09-17 · 基于全库审计（3867 个 Markdown、1358 个章节文件、71 个 metadata.yaml、295.7 MB）与本次 538 处历史断链修复实践撰写。
> 本文件是**提案**，不是规范；落地前需逐条确认。

---

## 一、现状诊断

### 1.1 规模与增长

| 指标 | 数值 | 含义 |
|------|------|------|
| Markdown 文件 | 3867 | 文档面已超过单人可维护量级 |
| 章节文件 `ch-*.md` | 1358 | 且仍以「企划→连载」速度增长 |
| 世界观 | 10 个 | 其中 beastshield 一库占绝对大头 |
| `metadata.yaml` | 71 | **覆盖率极低**——大量早期作品没有元数据 |
| 断链（修复前） | 691 | 绝大多数在 `.process/`（草稿、迁移残留、历史记录） |

### 1.2 本次断链修复暴露的三个结构性问题

1. **正文与过程稿混居**。`.process/`、`draft/`、`history/` 里的相对链接占了断链的 ~80%。这些文件被移动/改名后，链接成批腐烂，而它们对读者**没有导航价值**——本就不该按同一标准维护。
2. **目录迁移没有「链接跟着走」的机制**。author-chat 迁到 settings/author-chat、编码目录拆散装（`bso-o-cm-1-first-volume` → 散装 ch-01~03）这类重构，当时都没有同步改引用方。
3. **校验靠人肉**。`scripts/qa/` 工具齐备但只在「想起来」时跑，没有 pre-commit / CI 兜底。

### 1.3 现有 skills 的碎片化

`worlds/beastshield/skills/` 下已有 6 个技能目录、`author/001-lanse/` 下还有 style-analysis 与 write-skills——但它们不是 DSH 原生 skill 格式，AI 协作时**不会被自动加载**，形同存档。规范（`docs/spec/`）与执行工具（`scripts/qa/`）之间也缺一层「怎么把这些用起来的操作手册」。

---

## 二、架构改进建议（按优先级）

### P0 —— 低成本、立即见效

**1. 断链分层门禁**
- `check-links.js` 区分两级：**导航文件**（README.md、章节正文顶/底部导航、索引）失效链接 = 错误（阻断提交）；**`.process/`、draft、history 内**失效链接 = 警告（不阻断，定期清理）。
- 落地：给脚本加 `--strict` 模式与路径分类；在 CONTRIBUTING §5.4 写明两档口径。

**2. pre-commit / CI 接入 QA**
- 加一个 `scripts/qa/run-all.ps1`（或 Makefile 风格入口），一次跑 check-format → check-links → check-index → check-quotes。
- 用 git `pre-commit` hook（或 GitHub Action）对 **README/索引/故事文件** 的改动自动跑 strict 档。本次 691 断链的教训就是：每批烂链接都是「当时没跑」。

**3. 目录迁移 SOP**
- 在 `docs/spec/01-project-structure.md` 补一节「移动/重命名目录的 checklist」：移动后必须 `node scripts/qa/check-links.js .` 清零才能提交。

### P1 —— 中期（1~2 个月）

**4. 元数据补全 + 机器可读总索引**
- 71/数百作品的 metadata 覆盖率不够。约定：新作品必填（已是规范），老作品按世界分批补。
- 新增 `scripts/qa/build-index.js`：扫全部 `metadata.yaml` + 目录结构，**生成**各世界观 README 的作品表（编码/分级/状态/链接列），取代手写表格——根治「README 缺条目」这一类过时（本次修了 20+ 处）。
- 生成物标注 `<!-- GENERATED -->`，手写的简介列保留在 metadata 的 `summary` 字段。

**5. `.process/` 软隔离**
- 现状：`.process/` 与正文同树，工具、断链、检索噪音全都被它放大。
- 不建议物理搬迁（git 历史代价大、相对链接全断），改做**逻辑隔离**：
  - QA 工具默认跳过 `.process/`（已有模式可复用 check-links 的 skip 逻辑）；
  - 全库检索类操作建议带 `--exclude .process` 的约定写进 AGENTS.md。

**6. 角色档案体系推广**
- beastshield 的「三级索引 + 登场原文逐字引用 + check-index/check-quotes 门禁」是目前全库最成熟的体系。其他世界（尤其 empire-kik-soldiers 主线 35+ 章）如需建档，直接复用该模式，不要再发明第三种。

### P2 —— 远期选项（需要时再启动）

**7. 单仓 vs 多仓**：当前跨世界引用（worldstrider ↔ beastshield、paradise ↔ empire）频繁，**维持单仓**是正确的；若未来某一世界（如 beastshield）独立成超大库，可用 git submodule 拆出，但那需要一次性重链全部交叉引用，代价极高，不建议主动做。

**8. 正文与图片分仓**：图片已走 Git LFS，295MB 中大头是图。可评估 `git lfs migrate` 历史改写，非紧急。

---

## 三、AI Skills 配套建议（DSH 原生）

把散落的 `skills/` 升级为 **DSH skill**（可被自动发现并加载），建议 Skill 清单：

| Skill | 触发场景 | 核心内容 | 复用来源 |
|-------|---------|---------|---------|
| `story-format-guard` | 新建/修改任何 `ch-*.md`、短篇 | 装载 spec/11 要点 + 禁止旧写法对照表 + 结束前自检清单 | 根 AGENTS.md、beastshield AGENTS.md §格式 |
| `archive-curator` | 新建/修改角色档案 | 三铁律（完整引用/过渡标注/原始格式）+ 三级索引维护 + `sync-tables --write` 流程 | beastshield AGENTS.md §档案 |
| `qa-runner` | 提交前 / 批量改动后 | 跑全部校验脚本、按退出码解读结果、区分阻断项与警告项 | scripts/qa/README.md |
| `link-doctor` | 断链修复 | 本次沉淀的方法：按目标聚类 → 搜实际文件 → 改相对路径/降级纯文本；含 check-links 的模板跳过约定 | 本次修复实践 |
| `index-maintainer` | README/索引更新 | 作品表同步流程（未来接 build-index 生成器） | 本次文档审计经验 |
| `rating-tagger` | 新作品 README | 4D 分级矩阵 + 9 类标签的判定标准与写法 | docs/spec/13-rating-criteria.md |
| `lanse-style-review` / `lanse-style-write` | 兽盾系写作/审稿 | 现有 `skills/lanse-*` 内容迁移升级 | worlds/beastshield/skills/ |
| `world-onboard` | 首次接触某世界观 | 装载该世界的 AGENTS.md + settings 权威源 + 作品索引 | 各世界 AGENTS.md |

**组织方式**（两案选一）：
- **A 案（推荐）**：单仓 `skills/` 顶级目录，按上表建 DSH skill 文件，路径与内容域一一对应；世界观专属规则仍留在各世界 AGENTS.md，skill 只做「装载与流程」。
- **B 案**：保持现状不动，只把现有 6 个技能目录逐个转成 DSH skill 格式。改动小但仍是兽盾专属，其他世界享受不到。

**配套：AGENTS.md 分层加载约定**
- 根 AGENTS.md 保持轻量入口；
- 每个世界观根已有/将有 AGENTS.md 时，用「子项目索引」显式挂接（本次已补 series-4 先例）；
- skill 文件里不写世界观剧情细节（遵守 commit/文档不泄剧情的同一原则）。

---

## 四、落地顺序建议

1. 本提案确认后：P0 三项（分层门禁、QA 入口脚本、迁移 SOP）——纯工具/文档，一周内可完成。
2. 同步启动：现有 `skills/` → DSH skill 迁移（P1/A 案），先做 `qa-runner`、`link-doctor`、`story-format-guard` 三个高频的。
3. 之后按世界轮转：metadata 补全 + build-index 生成器试点（建议先在 beastshield-paradise 这类中等规模世界试点）。
4. 每完成一项，把对应章节从本提案转为正式规范（docs/spec/ 或 AGENTS.md），本文件只留指针。

---

*提案作者：DSH 协作会话 · 2026-09-17*

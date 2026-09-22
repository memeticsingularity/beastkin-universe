# QA 工具 / Quality-assurance scripts

> 针对「原作档案 + 故事正文」一致性检查与索引维护的工具集。
> 全部为**只读检查**或**带 `--write` 的显式写入**，默认预演不改文件。

## 为什么需要它们

本仓库的档案体系是三级索引（`等级 README` → `兽种 README` → `总索引`），
每份档案还要求「登场原文」逐字引用正文。这些约束**靠肉眼守不住**——
2026-09-17 的一次全库审计中，量化结果显示：400 余份档案里有约 70 份存在删节/改字/合并，
三级索引有 13 个等级目录缺失档案表，另有 28 个章节文件格式不合规。这些全部是靠脚本查出来的。

**约定**：改完一批档案后，依次跑 `check-index` → `check-links` → `check-quotes`，
三项全绿再提交。新增故事文件后跑 `check-format`。

---

## 工具一览

| 脚本 | 作用 | 只读 |
|------|------|:----:|
| `check-links.js` | 校验 Markdown 相对链接是否可解析 | ✅ |
| `check-structure.js` | 作品目录结构是否符合 `docs/spec/14-work-structure.md` | ✅ |
| `check-index.js` | 三级索引的表行数是否等于档案文件数 | ✅ |
| `check-quotes.js` | 「登场原文」的引用是否真的来自正文（而非评述区） | ✅ |
| `check-format.js` | 故事文件是否符合 `docs/spec/11-story-format.md` | ✅ |
| `count-archives.js` | 统计各兽种/等级档案数，供校对总索引计数 | ✅ |
| `scan-punctuation.js` | 扫描汉字后的半角标点（区分引用块 / 自撰） | ✅ |
| `sync-tables.js` | 把新增但未挂进索引的档案补进等级表 / 兽种表 | 需 `--write` |
| `run-all.js` | 一键依次运行以上全部校验并汇总通过/失败 | ✅ |
| `structure-report.js` | 生成目录结构快照到 `structure/`（替代旧 `generate_structure.bat/.sh`） | 写入 `structure/` |

> `structure-report.js` 只产出**快照**，不做合规校验；要查作品结构是否合规用 `check-structure.js`。

---

## 用法

### 全库体检（推荐顺序）

```bash
node scripts/qa/check-index.js  worlds/beastshield/original-archives/chinese/characters
node scripts/qa/check-links.js  worlds/beastshield/original-archives
node scripts/qa/check-quotes.js worlds/beastshield/original-archives/chinese/characters \
                                worlds/beastshield/original-archives/chinese/chaptered-stories
node scripts/qa/check-format.js worlds/beastshield/original-archives/chinese
```

四项均以退出码表示结果（`0` = 通过，`1` = 有问题），可直接用于 CI 或提交前钩子。

### 结构快照（不含校验）

```bash
node scripts/qa/structure-report.js                 # 目录树 + 全量文件树 -> structure/
node scripts/qa/structure-report.js --no-full       # 只生成目录树
node scripts/qa/structure-report.js --depth 3       # 限制深度
node scripts/qa/structure-report.js --prefix eks-o-cm   # 自定义标题前缀（对应旧 eks 变体）
node scripts/qa/structure-report.js --keep-all      # 保留历史快照（默认清理同前缀旧快照）
```

- 纯 Node 实现：**不依赖 `wmic` / `tree` / `cmd` / CRLF**，因此 DSH 沙箱下不会"假成功"。
- 默认排除 `.git .idea .vscode .claude .dsh .dsh-tmp node_modules structure __pycache__ .venv venv dist build .next .cache .pytest_cache`，
  因此**快照不会包含历史快照自身**（旧脚本的自我膨胀问题）。
- 写完自动自检（非 0 字节 + 结尾围栏正确），失败以退出码 `1` 报告。
- `structure/` 已被 `.gitignore` 忽略，产物不进版本库。

> 旧脚本 `scripts/generate_structure.bat` / `.sh` **已由本脚本取代**（保留仅为兼容历史习惯）。
> 它们依赖 `wmic`+`tree`+`cmd`，在 DSH 沙箱下会打印 `✅ Done` 却留下 0 字节垃圾文件；
> 若仍需使用，请让开发者在本机终端执行，并检查 `structure/` 是否有 0 字节或含 `~` 的文件。

### 新增档案后同步索引

```bash
# 先预演，确认要加哪些行
node scripts/qa/sync-tables.js worlds/beastshield/original-archives/chinese/characters/beastshield-company

# 确认无误后写入
node scripts/qa/sync-tables.js worlds/beastshield/original-archives/chinese/characters/beastshield-company --write
```

`sync-tables.js` **保留既有行原样**（手写的编辑性描述不会被覆盖），只为未挂进索引的档案生成新行，
并按「主线卷次 → 短篇 → 支线」的叙事顺序插入。

想恢复旧的 `N+M⭐` 计数口径时用 `count-archives.js`；总索引领现采**单一数字口径**
（该兽种目录下的 `.md` 文件总数），因为 ⭐ 在档案标题与索引行之间标记并不总一致。

---

## 注意

### `check-format.js` 的检查范围与形态判定

- **范围**：只检查**故事正文**。`notes/`、`plans/`、`skills/`、`ai-discussion/`、`insights/`、
  `reviews/`、`history/`、`drafts/`、`settings/`、`templates/`、`english/`、`*-scrapped/` 等位置的
  辅助文档（写作计划、审阅报告、分析稿）不参与检查——它们不是正文，套用 §1/§2 的 H1 与结束标记
  反而会破坏其含义（2026-09-17 修正前有 173 个此类误报）。
- **形态判定**：`Chapter` 还是 `Story` 按**同一作品内多数文件已有的 H1 形态**判定，而不是按文件名。
  原因是存在以 `ch-*.md` 命名的短篇集（如 `bs-a-cs-1-shorts`），按文件名硬判会把合规的
  `# Story 标题` 误报为违规。文件名仅在作品内没有任何 H1 时兜底。

### `scan-punctuation.js` 的结论不要直接拿来改

本仓库的**正文本身**就使用半角冒号（如「…笑了笑道:」），共 300 余处。
因此 `>` 引用块内的半角标点大多是**忠实转录**，改成全角反而破坏原文保真。
只有**档案自撰**部分的半角标点才可能需要按「中文标点用中文」修正——
脚本会把两者分开统计。

### `check-quotes.js` 的「未定位」不是错误

引用时把正文里被硬换行拆开的段落**拼回成一段**是正常做法，
由此产生的行在源文件里匹配不到（脚本报为「未定位」）。
**只有「落在评述区之后」才是真正需要修的问题。**

### 退出码

需要门禁时用退出码判断，不要靠解析文本输出：

```bash
node scripts/qa/check-index.js "$CHARS" || echo "索引不一致，先修再提交"
```

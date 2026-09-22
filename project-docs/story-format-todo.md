# 故事格式待办 / Story Format TODO

> 由 `scripts/qa/check-format.js` 与全库归一化（2026-09-17）自动生成，供作者补齐标题。
> 两个脚本：`node scripts/qa/run-all.js` 查看当前状态。
>
> **状态（2026-09-22）**：中文正文硬性违规（H1 / 结束标记数量与位置 / 废弃写法 / `---` 紧贴正文）**已全部清零**；
> §6 空行的三类合并欠债（标签紧贴评述 / 标题后紧跟正文 / 引用块内未硬换行）也**已全部清零**；
> **英文正文已纳入扫描范围**（不再静默跳过），其 258 篇违规暂列 §英文正文迁移，单独计桶、暂不阻断；
> 下表为 v4.0 骨架的**迁移欠债**（只统计、不阻断）。

## 零之一、硬性违规清零记录（2026-09-22）

| 处理 | 文件 | 说明 |
|---|---|---|
| 派生标题（**待作者确认**） | `bso-a-cs-1-sequel` ch-001~004、`branches/ch-005-a`；`bso-o-cs-1` 原作 3 篇 | 无标题来源，按各作品「内容摘要」首项派生：游戏登录 / 下山进村 / 山寨被俘 / 虎寨生活 / 沉默的旁观者；原作 3 篇同前三个 |
| 拆分「AI 对话记录 + 正文」 | `bsp-o-cs-5-e-302-bear/ch-001.md`、`bsp-o-cs-3-e-847-tiger/ch-004-1.md` | 记录移入各自 `.process/ai-discussion/2026-09-22-*-ai-session.md`；正文按 README 标题补 H1 与结束标记 |
| 未完成稿归位 | `bs-a-cs-4-yanliang/chapters/ch-003.md` | 正文在场景中途截断 → `.process/history/ch-003-incomplete-draft.md`；README Ch.3 标「🚧 进行中」，ch-004 上一章导航改指草稿 |
| 标题/结束标记修正 | `series-4-fetish-sessions` ch-001~003、`eks-o-s-001`、`bs-a-cm-2-moying/ch-001-2.md` | 见 commit `7aa3afac` |

### 同类但当前不报错的遗留（建议一并清理）

`bsp-o-cs-3-e-847-tiger` 下另有 8 个文件以裸 `#` 开头（`ch-001`、`ch-002-1~5`、`ch-003-1`、`ch-004-2`），
正文前同样混着对话记录；它们文件内部另有合规 H1 所以校验通过。清理方式与上表第 2 行一致。

`bso-o-cs-1` 原作 3 篇仍是**散落正文**（未包成含 `metadata.yaml`/`README.md`/`chapters/` 的作品），
属结构待办，见 [`structure-todo.md`](structure-todo.md) §零。

## 零之二、v4.0 骨架迁移欠债

## 零、v4.0 骨架迁移欠债（2026-09-22 实测）

规范升级到 [`docs/spec/11-story-format.md`](../docs/spec/11-story-format.md) **v4.0** 后，
存量正文按「新写/大修一律 v4.0、旧文顺带迁移」处理（spec §9）。当前欠债由
`node scripts/qa/check-format.js .` 末尾自动统计：

| 欠债项 | 篇数 | 迁移动作 |
|---|---|---|
| 完全无分块（`##`/`###` 都没有） | 396 | 保持无幕形态即可合规；仅需补卷尾语→END→评述区顺序 |
| 无评述区（`## 故事评述与感慨`） | 505 | 按骨架补评述区与三个 `###` 子块 |
| 评述区缺固定子块 | 78 | 补齐 `他们最后的故事`/`还活着的人们`/`故事感慨` |
| v3.0 加粗分幕 `**Scene-N**` | 45 | 改为 `## 第{N}幕 {标题}` |
| 卷尾语在 END 之后 | 21 | 移到 END 之前 |
| 正文用 `###` 当幕标题 | 24 | 改为 `## 第{N}幕`（`###` 保留给评述区） |

**注意**：这些只统计、不阻断校验；硬性违规已在 §零之一 清零。

### 空行（预览合并）——已于 2026-09-22 清账

规范 §6 明确「会渲染成不同块的两行之间必须有空行」。全库扫描与修复结果：

| 问题 | 修复前 | 现状 |
|---|---|---|
| `---` 紧贴正文（上一行会被渲染成 setext 标题） | 2 篇 | **0**（硬性 FAIL，已修） |
| 评述标签 `【…→…】` 紧贴其下评述 | 13 篇 / 57 处 | **0** |
| `##` / `###` 标题后紧跟正文 | 1 篇 | **0** |
| 模板自身（会教出合并写法） | 6 处 | **0**（已纳入模板自检，复发即 FAIL） |

补空行只增删空行、不改文字：共 40 个文件、160 处。校验器新增 `§6 空行` 硬规则 +
「合并风险」统计，模板自检同时校验空行，防止回潮。

### 引用块逐行显示（行尾硬换行）——已于 2026-09-22 清账

规范 §6 补充：**引用块（`>`）内需要逐行显示、又不想拆成两个块时，除末行外每行行尾留两个半角空格**
（CommonMark 硬换行）。全库按与校验器一致的文件口径（含 `chapters/volume-N/`）扫描并修复：

| 项 | 结果 |
|---|---|
| 补硬换行（外文名＋中文简介、卷首语/卷尾语诗行、作品元信息字段） | **160 篇 / 248 处** |
| 故意**未**补：同一句话被折行（上行以 `**` 结尾、下行接着写） | 6 处 |
| 故意**未**补：引用块内表格行 `> \| … \|` | 15 处 |
| 校验器新增统计「引用块内未硬换行」 | 修复前 132 篇 → 现 **0** |

补硬换行只加行尾两个空格、不改文字（脚本逐行断言「行数与内容不变」）。
**注意**：行尾空格肉眼不可见，任何开启「保存时删除行尾空格」的编辑器都会静默抹掉——
改动这类文件后请用 `git diff` 或编辑器「显示空白字符」确认，并跑一次 `check-format.js`。

## 零之三、英文正文迁移（2026-09-22 完成）

**背景**：`check-format.js` 的 `SKIP_DIRS` 原先含 `english`，英文正文被**静默跳过**——
既不统计也不报错。2026-09-22 移出该条目，英文进入扫描范围。现受检 **1047 篇**（中文 726 / 英文 321）。

已做：

| 项 | 结果 |
|---|---|
| 英文引用块逐行显示补硬换行 | 17 篇 / 63 处（判据：整行斜体标题 `> *…*`；句末标点且下一行像新句开头；**不套用**中文「短信息行」判据） |
| 校验器 | `受检故事文件` 拆分中文/英文；英文硬性违规进独立计桶（`ENG_LEGACY`），打印但**不阻断**；`引用块内未硬换行` 对英文改用加严判据 |

**已完成**：迁移期间用的 `ENG_LEGACY` 豁免**已删除**——英文与中文现在同样按硬性项判 FAIL。
`check-format` 当前受检 **1047 篇（中文 726 / 英文 321）**、硬性不合规 **0**。

修复前 258 篇英文违规的分类（现均已清零）：

| 违规形态 | 篇数 | 处置 |
|---|---:|---|
| 无 H1 的裸正文（无 `# `、无 END、无骨架） | 132 | ✅ 已补骨架（H1 + END；导航/卷首语/评述区仍属迁移欠债） |
| H1 冒号式 `# Chapter N: Title` / `# Story: Title` | 77 | ✅ 已归一为 `# Chapter {N} {Title}` |
| H1 其他不合规（中文标题、书名号、加粗等） | 18 | ✅ 已归一（标题文字原样保留，未改写） |
| H1 遗留式 `# MS-00N:` / `# SS-00N:` | 9 | ✅ 已归一 |
| 缺结束标记 | 221 | ✅ 已补（有章号者用章号；短篇用 `**Story END**`） |
| 结束标记位于评述区之后 | 2 | ✅ 已移到评述区之前 |
| 两个结束标记挤在同一行 | 1 | ✅ 已拆 |
| §6 引用块内未硬换行 | 0 | ✅ 已清 |

> 处理英文正文时注意：`english/` 下的原著章节多为**窄宽硬折行**的英文段落与
> 卷首语/卷尾语，判断「是否该补硬换行」必须用英文判据（见上表），
> 套用中文的短信息行判据会把 `he`、`to "` 这类折行碎片误判成完整的行。

## 一之二、占位标题全库清单（2026-09-22 反推，待作者确认）

来源有两批：① 英文正文原先被 `SKIP_DIRS` 静默跳过，纳入扫描后为无 H1 的裸正文补了骨架；
② 更早的中文正文归一化（见下节 §一）也留有 slug 派生标题。两批现在一并列出。
脚本**只补 H1 与结束标记、只做 Title Case**，不改写正文一字；请作者按剧情改写标题。

> 清单为脚本**反推**：凡 H1 标题恰等于「文件名去 `ch-NNN-` 后的 slug」或为 `Untitled` 者即列入。
> 若某条其实是你原有的标题，忽略即可。

| 来源 | 条数 | 规则 |
|---|---:|---|
| 文件名 slug | 188 | `ch-NNN-<slug>.md` → `<slug>` 空格化后转 **Title Case** |
| 无可用 slug | 14 | 子版本号文件（`ch-003-2.md`）与无 slug 的 `ch-001.md` → `Untitled` |

### 取自文件名

- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-1-sanguipendium/chapters/english/ch-001-the-crimson-declaration.md` → `# Chapter 1 The Crimson Declaration`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-1-sanguipendium/chapters/english/ch-002-the-price-of-blood.md` → `# Chapter 2 The Price of Blood`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-1-sanguipendium/chapters/english/ch-006-the-enclave.md` → `# Chapter 6 The Enclave`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-1-sanguipendium/chapters/english/ch-007-the-afternoon.md` → `# Chapter 7 The Afternoon`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-1-sanguipendium/chapters/english/ch-008-the-bath.md` → `# Chapter 8 The Bath`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-1-sanguipendium/chapters/english/ch-010-before-dreams.md` → `# Chapter 10 Before Dreams`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-1-shorts/chapters/english/ch-001-birthday-cake.md` → `# Story Birthday Cake`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-7-first-game/chapters/english/ch-001-descent.md` → `# Chapter 1 Descent`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-7-first-game/chapters/english/ch-003-awakening.md` → `# Chapter 3 Awakening`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-7-first-game/chapters/english/ch-004-the-spy.md` → `# Chapter 4 The Spy`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-7-first-game/chapters/english/ch-005-the-eve-of-war.md` → `# Chapter 5 The Eve of War`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-7-first-game/chapters/english/ch-006-the-war.md` → `# Chapter 6 The War`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-7-first-game/chapters/english/ch-007-aftermath.md` → `# Chapter 7 Aftermath`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-7-first-game/chapters/english/ch-008-the-end.md` → `# Chapter 8 The End`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-8-auction-show/english/chapters/ch-011-the-collector.md` → `# Chapter 11 The Collector`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-002-escape-warehouse.md` → `# Chapter 2 Escape Warehouse`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-003-head-to-downtown.md` → `# Chapter 3 Head to Downtown`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-004-store-shopping.md` → `# Chapter 4 Store Shopping`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-005-first-costume-change.md` → `# Chapter 5 First Costume Change`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-006-break-into-enemy-camp.md` → `# Chapter 6 Break into Enemy Camp`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-007-training-subordinates.md` → `# Chapter 7 Training Subordinates`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-008-class-change-quest.md` → `# Chapter 8 Class Change Quest`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-009-challenge-headquarters.md` → `# Chapter 9 Challenge Headquarters`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-010-first-encounter-boss.md` → `# Chapter 10 First Encounter Boss`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-011-agent-bureau.md` → `# Chapter 11 Agent Bureau`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-012-night-raid-fight-camp.md` → `# Chapter 12 Night Raid Fight Camp`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-013-unlocking.md` → `# Chapter 13 Unlocking`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-001-locker-room-hunt.md` → `# Chapter 1 Locker Room Hunt`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-002-corridor-patrol.md` → `# Chapter 2 Corridor Patrol`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-003-terrace-hunt.md` → `# Chapter 3 Terrace Hunt`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-004-tiger-guard-battle.md` → `# Chapter 4 Tiger Guard Battle`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-007-bear-territory-infiltration.md` → `# Chapter 7 Bear Territory Infiltration`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-008-alchemy-room-battle.md` → `# Chapter 8 Alchemy Room Battle`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-009-corridor-cleanup.md` → `# Chapter 9 Corridor Cleanup`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-010-thirteenth-floor-infiltration.md` → `# Chapter 10 Thirteenth Floor Infiltration`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-011-hell-bull-battle.md` → `# Chapter 11 Hell Bull Battle`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-012-training-session.md` → `# Chapter 12 Training Session`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-015-return-to-python-island.md` → `# Chapter 15 Return to Python Island`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-001-promotion-test.md` → `# Chapter 1 Promotion Test`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-002-dojo-massacre.md` → `# Chapter 2 Dojo Massacre`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-003-warehouse-vengeance.md` → `# Chapter 3 Warehouse Vengeance`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-004-psychic-defense.md` → `# Chapter 4 Psychic Defense`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-005-undercover-hunt.md` → `# Chapter 5 Undercover Hunt`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-007-police-station-invasion.md` → `# Chapter 7 Police Station Invasion`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-008-dragon-god-island.md` → `# Chapter 8 Dragon God Island`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-010-old-friend-reunion.md` → `# Chapter 10 Old Friend Reunion`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-011-light-cult-infiltration.md` → `# Chapter 11 Light Cult Infiltration`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-012-desert-ambush.md` → `# Chapter 12 Desert Ambush`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-013-dragon-god-battle.md` → `# Chapter 13 Dragon God Battle`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-016-blood-king-resurrection.md` → `# Chapter 16 Blood King Resurrection`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-017-godly-music-duel.md` → `# Chapter 17 Godly Music Duel`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-018-flame-cannon-finale.md` → `# Chapter 18 Flame Cannon Finale`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-019-origin-revelation.md` → `# Chapter 19 Origin Revelation`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-020-identity-merge.md` → `# Chapter 20 Identity Merge`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-021-divine-battle.md` → `# Chapter 21 Divine Battle`
- `worlds/beastshield/original-archives/english/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-022-rampage-end.md` → `# Chapter 22 Rampage End`
- `worlds/beastshield-paradise/original-archives/english/chaptered-stories/side/bsp-o-cs-1-g-277-green-bull-azhuang/ch-001-last-watch.md` → `# Chapter 1 Last Watch`
- `worlds/beastshield-paradise/original-archives/english/chaptered-stories/side/bsp-o-cs-1-g-277-green-bull-azhuang/ch-002-stranger-in-folded-time.md` → `# Chapter 2 Stranger in Folded Time`
- `worlds/beastshield-paradise/original-archives/english/chaptered-stories/side/bsp-o-cs-1-g-277-green-bull-azhuang/ch-003-hot-water-and-soap.md` → `# Chapter 3 Hot Water and Soap`
- `worlds/beastshield-paradise/original-archives/english/chaptered-stories/side/bsp-o-cs-1-g-277-green-bull-azhuang/ch-004-morning-light-new-beginning.md` → `# Chapter 4 Morning Light New Beginning`
- `worlds/beastshield-reforged/original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/ch-001-a-bloody-beginning.md` → `# Chapter 1 A Bloody Beginning`
- `worlds/beastshield-reforged/original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/ch-002-the-iron-fist-of-discipline.md` → `# Chapter 2 The Iron Fist of Discipline`
- `worlds/beastshield-reforged/original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/ch-003-brutal-training-ground.md` → `# Chapter 3 Brutal Training Ground`
- `worlds/beastshield-reforged/original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/ch-004-uncontrolled-desire.md` → `# Chapter 4 Uncontrolled Desire`
- `worlds/beastshield-reforged/original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/ch-005-birth-of-the-hunting-spear.md` → `# Chapter 5 Birth of the Hunting Spear`
- `worlds/beastshield-reforged/original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/ch-008-indiscriminate-slaughter.md` → `# Chapter 8 Indiscriminate Slaughter`
- `worlds/beastshield-reforged/original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/ch-009-secret-of-the-beast-god.md` → `# Chapter 9 Secret of the Beast God`
- `worlds/beastshield-reforged/original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/ch-010-an-unexpected-bond.md` → `# Chapter 10 An Unexpected Bond`
- `worlds/beastshield-reforged/original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/ch-011-a-perverse-friendship.md` → `# Chapter 11 A Perverse Friendship`
- `worlds/beastshield-reforged/original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/ch-012-night-raid.md` → `# Chapter 12 Night Raid`
- `worlds/beastshield-reforged/original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/ch-013-the-barren-spine-plains.md` → `# Chapter 13 The Barren Spine Plains`
- `worlds/beastshield-reforged/original-archives/english/chaptered-stories/main/bsr-o-cm-1-main-story-1/ch-015-encounter-at-oasis-town.md` → `# Chapter 15 Encounter at Oasis Town`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-001-base-awakening.md` → `# Chapter 1 Base Awakening`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-002-first-execution.md` → `# Chapter 2 First Execution`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-003-recycle-duty.md` → `# Chapter 3 Recycle Duty`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-004-resistance-infiltrates.md` → `# Chapter 4 Resistance Infiltrates`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-005-weakness-discovered.md` → `# Chapter 5 Weakness Discovered`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-006-secret-facility.md` → `# Chapter 6 Secret Facility`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-007-promotion-to-captain.md` → `# Chapter 7 Promotion to Captain`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-008-watchtower-raid.md` → `# Chapter 8 Watchtower Raid`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-009-private-execution.md` → `# Chapter 9 Private Execution`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-010-watchtower-six-inspection.md` → `# Chapter 10 Watchtower Six Inspection`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-011-electrocution-experiment.md` → `# Chapter 11 Electrocution Experiment`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-012-emperor-secret-order.md` → `# Chapter 12 Emperor Secret Order`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-013-special-forces-infiltration.md` → `# Chapter 13 Special Forces Infiltration`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-014-slave-branding.md` → `# Chapter 14 Slave Branding`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-015-exemption-mechanism.md` → `# Chapter 15 Exemption Mechanism`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-016-infinite-execution.md` → `# Chapter 16 Infinite Execution`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-017-decoy-mission.md` → `# Chapter 17 Decoy Mission`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-1-awakening-claws/ch-018-promotion-to-green-socks.md` → `# Chapter 18 Promotion to Green Socks`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-2-bloodline-branding/ch-019-inner-circle-patrol.md` → `# Chapter 19 Inner Circle Patrol`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-2-bloodline-branding/ch-020-mining-area-crackdown.md` → `# Chapter 20 Mining Area Crackdown`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-2-bloodline-branding/ch-021-mining-proxy.md` → `# Chapter 21 Mining Proxy`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-2-bloodline-branding/ch-022-mutual-execution.md` → `# Chapter 22 Mutual Execution`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-2-bloodline-branding/ch-023-sacrifice-fireworks.md` → `# Chapter 23 Sacrifice Fireworks`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-2-bloodline-branding/ch-024-monster-experiment.md` → `# Chapter 24 Monster Experiment`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-2-bloodline-branding/ch-025-revenge-execution.md` → `# Chapter 25 Revenge Execution`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-2-bloodline-branding/ch-026-dispatch-mission.md` → `# Chapter 26 Dispatch Mission`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-2-bloodline-branding/ch-027-base-16-investigation.md` → `# Chapter 27 Base 16 Investigation`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-2-bloodline-branding/ch-028-mass-execution.md` → `# Chapter 28 Mass Execution`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-2-bloodline-branding/ch-029-emperor-personal-visit.md` → `# Chapter 29 Emperor Personal Visit`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-2-bloodline-branding/ch-030-betrayal-exposed.md` → `# Chapter 30 Betrayal Exposed`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-3-shadow-disguise/ch-031-desperate-escape.md` → `# Chapter 31 Desperate Escape`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-3-shadow-disguise/ch-032-execution-of-noah.md` → `# Chapter 32 Execution of Noah`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-3-shadow-disguise/ch-033-watchtower-two-mission.md` → `# Chapter 33 Watchtower Two Mission`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-3-shadow-disguise/ch-034-snow-leopard-execution.md` → `# Chapter 34 Snow Leopard Execution`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-3-shadow-disguise/ch-035-forest-encounter.md` → `# Chapter 35 Forest Encounter`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-3-shadow-disguise/ch-036-emperor-branding.md` → `# Chapter 36 Emperor Branding`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-3-shadow-disguise/ch-037-emperor-secret-meeting.md` → `# Chapter 37 Emperor Secret Meeting`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-3-shadow-disguise/ch-038-base-upgrade.md` → `# Chapter 38 Base Upgrade`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-3-shadow-disguise/ch-039-patrol-soldier-death.md` → `# Chapter 39 Patrol Soldier Death`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-3-shadow-disguise/ch-040-townsfolk-assembly.md` → `# Chapter 40 Townsfolk Assembly`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-3-shadow-disguise/ch-041-undercover-disguise.md` → `# Chapter 41 Undercover Disguise`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-042-cell-breakout.md` → `# Chapter 42 Cell Breakout`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-043-disguise-passage.md` → `# Chapter 43 Disguise Passage`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-044-hideout-recovery.md` → `# Chapter 44 Hideout Recovery`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-045-resistance-plan.md` → `# Chapter 45 Resistance Plan`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-046-square-ambush.md` → `# Chapter 46 Square Ambush`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-047-watchtower-retaliation.md` → `# Chapter 47 Watchtower Retaliation`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-048-upgrade-and-undercover.md` → `# Chapter 48 Upgrade and Undercover`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-049-inside-job.md` → `# Chapter 49 Inside Job`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-050-restroom-kill.md` → `# Chapter 50 Restroom Kill`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-051-gas-trap.md` → `# Chapter 51 Gas Trap`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-052-mission-accomplished.md` → `# Chapter 52 Mission Accomplished`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-053-promotion-to-blue-socks.md` → `# Chapter 53 Promotion to Blue Socks`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-054-beast-bonding.md` → `# Chapter 54 Beast Bonding`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-055-punishment-and-loyalty.md` → `# Chapter 55 Punishment and Loyalty`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-056-new-battlefield.md` → `# Chapter 56 New Battlefield`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-4-return-and-promotion/ch-057-beast-corps-formation.md` → `# Chapter 57 Beast Corps Formation`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-058-beast-control-training.md` → `# Chapter 58 Beast Control Training`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-059-first-village-contact.md` → `# Chapter 59 First Village Contact`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-060-local-soldier-breeding.md` → `# Chapter 60 Local Soldier Breeding`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-061-city-lord-interrogation.md` → `# Chapter 61 City Lord Interrogation`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-062-public-execution.md` → `# Chapter 62 Public Execution`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-063-psychic-shockwave.md` → `# Chapter 63 Psychic Shockwave`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-064-aerial-bombardment.md` → `# Chapter 64 Aerial Bombardment`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-065-city-lord-corruption.md` → `# Chapter 65 City Lord Corruption`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-066-key-recovery.md` → `# Chapter 66 Key Recovery`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-067-desire-outburst.md` → `# Chapter 67 Desire Outburst`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-068-bodyguard-arrival.md` → `# Chapter 68 Bodyguard Arrival`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-069-beastman-duel.md` → `# Chapter 69 Beastman Duel`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-070-village-chief-betrayal.md` → `# Chapter 70 Village Chief Betrayal`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-071-rebellion-suppression.md` → `# Chapter 71 Rebellion Suppression`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-072-revenge-awakening.md` → `# Chapter 72 Revenge Awakening`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-073-emperor-wrath.md` → `# Chapter 73 Emperor Wrath`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-074-secret-guardian.md` → `# Chapter 74 Secret Guardian`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-5-colonial-storm/ch-075-black-bear-death.md` → `# Chapter 75 Black Bear Death`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-076-semen-staircase.md` → `# Chapter 76 Semen Staircase`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-077-white-wolf-retrieves-key.md` → `# Chapter 77 White Wolf Retrieves Key`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-078-carbonated-spring.md` → `# Chapter 78 Carbonated Spring`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-079-black-bear-downfall.md` → `# Chapter 79 Black Bear Downfall`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-080-emperor-personal-expedition.md` → `# Chapter 80 Emperor Personal Expedition`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-081-construction-site-execution.md` → `# Chapter 81 Construction Site Execution`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-082-hero-infiltration.md` → `# Chapter 82 Hero Infiltration`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-083-semen-lock.md` → `# Chapter 83 Semen Lock`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-084-outpost-devouring.md` → `# Chapter 84 Outpost Devouring`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-085-key-resonance.md` → `# Chapter 85 Key Resonance`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-086-hive-attacked.md` → `# Chapter 86 Hive Attacked`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-087-head-on-clash.md` → `# Chapter 87 Head on Clash`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-6-key-wars-base-defense/ch-088-demon-king-awakens.md` → `# Chapter 88 Demon King Awakens`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-089-power-core-infiltration.md` → `# Chapter 89 Power Core Infiltration`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-090-second-declaration-of-war.md` → `# Chapter 90 Second Declaration of War`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-091-demonic-king-returns.md` → `# Chapter 91 Demonic King Returns`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-092-loyalty-reward.md` → `# Chapter 92 Loyalty Reward`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-093-destruction-of-two-cities.md` → `# Chapter 93 Destruction of Two Cities`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-094-hero-vs-white-sock-commander.md` → `# Chapter 94 Hero vs White Sock Commander`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-095-poisoned-revenge.md` → `# Chapter 95 Poisoned Revenge`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-096-self-destruction-test.md` → `# Chapter 96 Self Destruction Test`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-097-punishment-and-betrayal.md` → `# Chapter 97 Punishment and Betrayal`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-098-secret-base-discovery.md` → `# Chapter 98 Secret Base Discovery`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-099-humiliation-of-the-hero.md` → `# Chapter 99 Humiliation of the Hero`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-100-island-mystery.md` → `# Chapter 100 Island Mystery`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-101-rage-and-escape.md` → `# Chapter 101 Rage and Escape`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-102-dinosaur-guard-falls.md` → `# Chapter 102 Dinosaur Guard Falls`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-103-energy-recovery.md` → `# Chapter 103 Energy Recovery`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-104-underground-elevator.md` → `# Chapter 104 Underground Elevator`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-105-white-bear-ambush.md` → `# Chapter 105 White Bear Ambush`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-106-energy-extraction.md` → `# Chapter 106 Energy Extraction`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-107-punishment-of-white-wolf.md` → `# Chapter 107 Punishment of White Wolf`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-108-tiger-in-recovery.md` → `# Chapter 108 Tiger in Recovery`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-109-white-bear-devoured.md` → `# Chapter 109 White Bear Devoured`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-110-fifth-key-retrieved.md` → `# Chapter 110 Fifth Key Retrieved`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-111-demonic-king-complete.md` → `# Chapter 111 Demonic King Complete`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-112-truth-and-end.md` → `# Chapter 112 Truth and End`
- `worlds/empire-kik-soldiers/original-archives/english/chaptered-stories/main/vol-7-escalation-truth/ch-113-epilogue-eternal-empire.md` → `# Chapter 113 Epilogue Eternal Empire`
- `worlds/united-beasts-alliance/original-archives/english/chaptered-stories/main/uba-o-cm-1-main-story-1/ch-001-everyday-life-and-farewell.md` → `# Chapter 01 Everyday Life and Farewell`
- `worlds/united-beasts-alliance/original-archives/english/chaptered-stories/main/uba-o-cm-1-main-story-1/ch-002-the-devouring-of-innocence.md` → `# Chapter 02 The Devouring of Innocence`
- `worlds/united-beasts-alliance/original-archives/english/chaptered-stories/main/uba-o-cm-1-main-story-1/ch-003-trial-by-blood.md` → `# Chapter 03 Trial by Blood`

### 无可用 slug（Untitled）

- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-2-moying/chapters/english/ch-001-2.md` → `# Chapter 1 Untitled`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-2-moying/chapters/english/ch-011-1.md` → `# Chapter 11 Untitled`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-2-moying/chapters/english/ch-011-2.md` → `# Chapter 11 Untitled`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-2-moying/chapters/english/ch-011-3.md` → `# Chapter 11 Untitled`
- `worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-2-moying/chapters/english/ch-011-4.md` → `# Chapter 11 Untitled`
- `worlds/beastshield-online/original-archives/english/chaptered-stories/main/ch-001.md` → `# Chapter 1 Untitled`
- `worlds/beastshield-online/original-archives/english/chaptered-stories/main/ch-002.md` → `# Chapter 2 Untitled`
- `worlds/beastshield-online/original-archives/english/chaptered-stories/main/ch-003.md` → `# Chapter 3 Untitled`
- `worlds/beastshield-paradise/original-archives/english/chaptered-stories/side/7-e-419-bear/ch-001-2.md` → `# Chapter 1 Untitled`
- `worlds/beastshield-paradise/original-archives/english/chaptered-stories/side/bsp-o-cs-3-e-847-tiger/ch-003-2.md` → `# Chapter 3 Untitled`
- `worlds/beastshield-paradise/original-archives/english/chaptered-stories/side/bsp-o-cs-3-e-847-tiger/ch-003-3.md` → `# Chapter 3 Untitled`
- `worlds/beastshield-paradise/original-archives/english/chaptered-stories/side/bsp-o-cs-3-e-847-tiger/ch-003-4.md` → `# Chapter 3 Untitled`
- `worlds/beastshield-paradise/original-archives/english/chaptered-stories/side/bsp-o-cs-3-e-847-tiger/ch-004-1.md` → `# Chapter 4 Untitled`
- `worlds/beastshield-paradise/original-archives/english/chaptered-stories/side/bsp-o-cs-5-e-302-bear/ch-001.md` → `# Chapter 1 Untitled`

## 一、占位标题（英文，取自文件名，建议改写为中文标题）

共 155 个文件。这些文件的原 H1 缺失，归一化时用文件名 slug 作占位以保证格式合规；
标题内容需作者按剧情补写。

> 全库口径见 §一之二（2026-09-22 反推，含本节条目，且已统一为 Title Case）。

- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-2-moying/chapters/ch-02-1.md  —  当前标题：“The Amber Hunter”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-2-moying/chapters/ch-03-3.md  —  当前标题：“The Piling Heat”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-2-moying/chapters/ch-04-1.md  —  当前标题：“The Final Movement”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-2-moying/chapters/ch-05-2.md  —  当前标题：“The Inventory of Warmth”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-1-mine-camp.md  —  当前标题：“mine camp”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-10-gate-charge.md  —  当前标题：“gate charge”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-11-mountain-edge.md  —  当前标题：“mountain edge”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-12-possession-site.md  —  当前标题：“possession site”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-13-cave-search.md  —  当前标题：“cave search”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-14-mountain-encounter.md  —  当前标题：“mountain encounter”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-15-hillside-ambush.md  —  当前标题：“hillside ambush”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-16-riverside-moonlight.md  —  当前标题：“riverside moonlight”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-17-mountain-inn.md  —  当前标题：“mountain inn”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-18-checkpoint.md  —  当前标题：“checkpoint”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-19-roadside-teahouse.md  —  当前标题：“roadside teahouse”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-2-desert-outpost.md  —  当前标题：“desert outpost”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-20-qingshi-town.md  —  当前标题：“qingshi town”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-21-camp-ruins.md  —  当前标题：“camp ruins”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-22-eyewitness.md  —  当前标题：“eyewitness”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-3-wilderness-camp.md  —  当前标题：“wilderness camp”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-4-forest-hunt.md  —  当前标题：“forest hunt”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-5-swamp-trap.md  —  当前标题：“swamp trap”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-6-abandoned-temple.md  —  当前标题：“abandoned temple”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-7-riverside.md  —  当前标题：“riverside”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-8-cliff-assault.md  —  当前标题：“cliff assault”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-12-mo-quan/chapters/volume-2/ch-9-plain-pursuit.md  —  当前标题：“plain pursuit”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-13-farmhouse/chapters/volume-1/ch-1-seeds-and-fertilizer.md  —  当前标题：“seeds and fertilizer”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-18-yuwen/chapters/ch-01-list-of-names.md  —  当前标题：“list of names”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-18-yuwen/chapters/ch-02-intel-and-wardrobe.md  —  当前标题：“intel and wardrobe”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-18-yuwen/chapters/ch-03-white-uniform.md  —  当前标题：“white uniform”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-18-yuwen/chapters/ch-04-janitors-closet.md  —  当前标题：“janitors closet”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-18-yuwen/chapters/ch-05-meeting-room.md  —  当前标题：“meeting room”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-18-yuwen/chapters/ch-06-corpse-corridor.md  —  当前标题：“corpse corridor”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-18-yuwen/chapters/ch-07-holding-cell.md  —  当前标题：“holding cell”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-18-yuwen/chapters/ch-08-hq-accountability.md  —  当前标题：“hq accountability”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-18-yuwen/chapters/ch-09-rescue.md  —  当前标题：“rescue”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-18-yuwen/chapters/ch-10-operating-table.md  —  当前标题：“operating table”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-18-yuwen/chapters/ch-11-three-months-later.md  —  当前标题：“three months later”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-18-yuwen/chapters/ch-12-abandoned-plant.md  —  当前标题：“abandoned plant”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-5-beastshield-chronicles/chapters/chinese/ch-01-the-rabbits-shadow.md  —  当前标题：“the rabbits shadow”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-5-beastshield-chronicles/chapters/chinese/ch-02-ore-and-undercurrents.md  —  当前标题：“ore and undercurrents”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-5-beastshield-chronicles/chapters/chinese/ch-03-tower-of-bloodbath.md  —  当前标题：“tower of bloodbath”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-5-beastshield-chronicles/chapters/chinese/ch-04-white-shadow-venomous-fangs.md  —  当前标题：“white shadow venomous fangs”
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-5-beastshield-chronicles/chapters/chinese/ch-05-the-collar.md  —  当前标题：“the collar”
- worlds/beastshield-paradise/original-archives/chinese/chaptered-stories/side/bsp-o-cs-1-g-277-green-bull-azhuang/ch-1-last-watch.md  —  当前标题：“last watch”
- worlds/beastshield-paradise/original-archives/chinese/chaptered-stories/side/bsp-o-cs-1-g-277-green-bull-azhuang/ch-2-stranger-in-folded-time.md  —  当前标题：“stranger in folded time”
- worlds/beastshield-paradise/original-archives/chinese/chaptered-stories/side/bsp-o-cs-1-g-277-green-bull-azhuang/ch-3-hot-water-and-soap.md  —  当前标题：“hot water and soap”
- worlds/beastshield-paradise/original-archives/chinese/chaptered-stories/side/bsp-o-cs-1-g-277-green-bull-azhuang/ch-4-morning-light-new-beginning.md  —  当前标题：“morning light new beginning”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-006-secret-facility.md  —  当前标题：“secret facility”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-007-promotion-to-captain.md  —  当前标题：“promotion to captain”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-008-watchtower-raid.md  —  当前标题：“watchtower raid”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-009-private-execution.md  —  当前标题：“private execution”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-010-watchtower-six-inspection.md  —  当前标题：“watchtower six inspection”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-011-electrocution-experiment.md  —  当前标题：“electrocution experiment”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-012-emperor-secret-order.md  —  当前标题：“emperor secret order”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-013-special-forces-infiltration.md  —  当前标题：“special forces infiltration”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-014-slave-branding.md  —  当前标题：“slave branding”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-015-exemption-mechanism.md  —  当前标题：“exemption mechanism”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-016-infinite-execution.md  —  当前标题：“infinite execution”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-017-decoy-mission.md  —  当前标题：“decoy mission”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-1-awakening-claws/ch-018-promotion-to-green-socks.md  —  当前标题：“promotion to green socks”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-2-bloodline-branding/ch-019-inner-circle-patrol.md  —  当前标题：“inner circle patrol”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-2-bloodline-branding/ch-020-mining-area-crackdown.md  —  当前标题：“mining area crackdown”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-2-bloodline-branding/ch-021-mining-proxy.md  —  当前标题：“mining proxy”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-2-bloodline-branding/ch-022-mutual-execution.md  —  当前标题：“mutual execution”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-2-bloodline-branding/ch-023-sacrifice-fireworks.md  —  当前标题：“sacrifice fireworks”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-2-bloodline-branding/ch-024-monster-experiment.md  —  当前标题：“monster experiment”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-2-bloodline-branding/ch-025-revenge-execution.md  —  当前标题：“revenge execution”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-2-bloodline-branding/ch-026-dispatch-mission.md  —  当前标题：“dispatch mission”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-2-bloodline-branding/ch-027-base-16-investigation.md  —  当前标题：“base 16 investigation”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-2-bloodline-branding/ch-028-mass-execution.md  —  当前标题：“mass execution”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-2-bloodline-branding/ch-029-emperor-personal-visit.md  —  当前标题：“emperor personal visit”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-2-bloodline-branding/ch-030-betrayal-exposed.md  —  当前标题：“betrayal exposed”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-3-shadow-disguise/ch-031-desperate-escape.md  —  当前标题：“desperate escape”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-3-shadow-disguise/ch-032-execution-of-noah.md  —  当前标题：“execution of noah”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-3-shadow-disguise/ch-034-snow-leopard-execution.md  —  当前标题：“Snow Leopard Execution”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-3-shadow-disguise/ch-035-forest-encounter.md  —  当前标题：“forest encounter”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-3-shadow-disguise/ch-036-emperor-branding.md  —  当前标题：“emperor branding”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-3-shadow-disguise/ch-037-emperor-secret-meeting.md  —  当前标题：“emperor secret meeting”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-3-shadow-disguise/ch-038-base-upgrade.md  —  当前标题：“base upgrade”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-3-shadow-disguise/ch-039-patrol-soldier-death.md  —  当前标题：“patrol soldier death”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-3-shadow-disguise/ch-040-townsfolk-assembly.md  —  当前标题：“townsfolk assembly”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-3-shadow-disguise/ch-041-undercover-disguise.md  —  当前标题：“undercover disguise”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-042-cell-breakout.md  —  当前标题：“cell breakout”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-043-disguise-passage.md  —  当前标题：“disguise passage”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-044-hideout-recovery.md  —  当前标题：“hideout recovery”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-045-resistance-plan.md  —  当前标题：“resistance plan”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-046-square-ambush.md  —  当前标题：“square ambush”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-047-watchtower-retaliation.md  —  当前标题：“watchtower retaliation”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-048-upgrade-and-undercover.md  —  当前标题：“upgrade and undercover”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-049-inside-job.md  —  当前标题：“inside job”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-050-restroom-kill.md  —  当前标题：“restroom kill”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-051-gas-trap.md  —  当前标题：“gas trap”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-052-mission-accomplished.md  —  当前标题：“mission accomplished”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-053-promotion-to-blue-socks.md  —  当前标题：“promotion to blue socks”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-054-beast-bonding.md  —  当前标题：“beast bonding”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-055-punishment-and-loyalty.md  —  当前标题：“punishment and loyalty”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-056-new-battlefield.md  —  当前标题：“new battlefield”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-4-return-and-promotion/ch-057-beast-corps-formation.md  —  当前标题：“beast corps formation”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-058-beast-control-training.md  —  当前标题：“beast control training”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-059-first-village-contact.md  —  当前标题：“first village contact”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-060-local-soldier-breeding.md  —  当前标题：“local soldier breeding”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-061-city-lord-interrogation.md  —  当前标题：“city lord interrogation”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-062-public-execution.md  —  当前标题：“public execution”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-063-psychic-shockwave.md  —  当前标题：“psychic shockwave”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-064-aerial-bombardment.md  —  当前标题：“aerial bombardment”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-065-city-lord-corruption.md  —  当前标题：“city lord corruption”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-066-key-recovery.md  —  当前标题：“key recovery”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-067-desire-outburst.md  —  当前标题：“desire outburst”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-068-bodyguard-arrival.md  —  当前标题：“bodyguard arrival”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-069-beastman-duel.md  —  当前标题：“beastman duel”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-070-village-chief-betrayal.md  —  当前标题：“village chief betrayal”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-071-rebellion-suppression.md  —  当前标题：“rebellion suppression”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-072-revenge-awakening.md  —  当前标题：“revenge awakening”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-073-emperor-wrath.md  —  当前标题：“emperor wrath”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-074-secret-guardian.md  —  当前标题：“secret guardian”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-5-colonial-storm/ch-075-black-bear-death.md  —  当前标题：“black bear death”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-076-semen-staircase.md  —  当前标题：“semen staircase”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-077-white-wolf-retrieves-key.md  —  当前标题：“white wolf retrieves key”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-078-carbonated-spring.md  —  当前标题：“carbonated spring”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-079-black-bear-downfall.md  —  当前标题：“black bear downfall”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-080-emperor-personal-expedition.md  —  当前标题：“emperor personal expedition”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-081-construction-site-execution.md  —  当前标题：“construction site execution”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-082-hero-infiltration.md  —  当前标题：“hero infiltration”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-083-semen-lock.md  —  当前标题：“semen lock”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-084-outpost-devouring.md  —  当前标题：“outpost devouring”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-085-key-resonance.md  —  当前标题：“key resonance”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-086-hive-attacked.md  —  当前标题：“hive attacked”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-087-head-on-clash.md  —  当前标题：“head on clash”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-6-key-wars-base-defense/ch-088-demon-king-awakens.md  —  当前标题：“demon king awakens”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-089-power-core-infiltration.md  —  当前标题：“power core infiltration”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-090-second-declaration-of-war.md  —  当前标题：“second declaration of war”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-091-demonic-king-returns.md  —  当前标题：“demonic king returns”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-092-loyalty-reward.md  —  当前标题：“loyalty reward”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-093-destruction-of-two-cities.md  —  当前标题：“destruction of two cities”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-094-hero-vs-white-sock-commander.md  —  当前标题：“hero vs white sock commander”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-095-poisoned-revenge.md  —  当前标题：“poisoned revenge”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-096-self-destruction-test.md  —  当前标题：“self destruction test”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-097-punishment-and-betrayal.md  —  当前标题：“punishment and betrayal”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-098-secret-base-discovery.md  —  当前标题：“secret base discovery”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-099-humiliation-of-the-hero.md  —  当前标题：“humiliation of the hero”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-100-island-mystery.md  —  当前标题：“island mystery”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-101-rage-and-escape.md  —  当前标题：“rage and escape”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-102-dinosaur-guard-falls.md  —  当前标题：“dinosaur guard falls”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-103-energy-recovery.md  —  当前标题：“energy recovery”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-104-underground-elevator.md  —  当前标题：“underground elevator”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-105-white-bear-ambush.md  —  当前标题：“white bear ambush”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-106-energy-extraction.md  —  当前标题：“energy extraction”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-107-punishment-of-white-wolf.md  —  当前标题：“punishment of white wolf”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-108-tiger-in-recovery.md  —  当前标题：“tiger in recovery”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-109-white-bear-devoured.md  —  当前标题：“white bear devoured”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-110-fifth-key-retrieved.md  —  当前标题：“fifth key retrieved”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-111-demonic-king-complete.md  —  当前标题：“demonic king complete”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-112-truth-and-end.md  —  当前标题：“truth and end”
- worlds/empire-kik-soldiers/original-archives/chinese/chaptered-stories/main/vol-7-escalation-truth/ch-113-epilogue-eternal-empire.md  —  当前标题：“epilogue eternal empire”

## 二、仍缺 H1 的文件（未做任何改动，需补标题）

共 12 个文件。仓库内不存在可用标题来源（无 H1、文件名无英文 slug、无同章兄弟标题），
故未改动，等待作者提供标题后按规范补 `# Chapter N {标题}` 与 `**Chapter N END**`。

- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cm-2-moying/chapters/ch-01-2.md  —  H1 不符合 §1: ""
- worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-4-yanliang/chapters/v2-expanded/ch-03.md  —  H1 不符合 §1: ""
- worlds/beastshield-online/adaptation-works/chaptered-stories/bso-a-cs-1-sequel/chapters/branches/ch-05-a.md  —  H1 不符合 §1: "# 第五章"
- worlds/beastshield-online/adaptation-works/chaptered-stories/bso-a-cs-1-sequel/chapters/ch-01.md  —  H1 不符合 §1: "# 第一章"
- worlds/beastshield-online/adaptation-works/chaptered-stories/bso-a-cs-1-sequel/chapters/ch-02.md  —  H1 不符合 §1: "# 第二章"
- worlds/beastshield-online/adaptation-works/chaptered-stories/bso-a-cs-1-sequel/chapters/ch-03.md  —  H1 不符合 §1: "# 第三章"
- worlds/beastshield-online/adaptation-works/chaptered-stories/bso-a-cs-1-sequel/chapters/ch-04.md  —  H1 不符合 §1: "# 第四章"
- worlds/beastshield-online/original-archives/chinese/chaptered-stories/main/ch-01.md  —  H1 不符合 §1: "# 第一章"
- worlds/beastshield-online/original-archives/chinese/chaptered-stories/main/ch-02.md  —  H1 不符合 §1: "# 第二章"
- worlds/beastshield-online/original-archives/chinese/chaptered-stories/main/ch-03.md  —  H1 不符合 §1: "# 第三章"
- worlds/beastshield-paradise/original-archives/chinese/chaptered-stories/side/bsp-o-cs-3-e-847-tiger/ch-4-1.md  —  H1 不符合 §1: ""
- worlds/beastshield-paradise/original-archives/chinese/chaptered-stories/side/bsp-o-cs-5-e-302-bear/ch-1.md  —  H1 不符合 §1: "#                               "

---

*生成时间：2026-09-17*
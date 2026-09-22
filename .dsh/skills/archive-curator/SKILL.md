---
name: archive-curator
description: 新建、补全、批量维护角色档案（含三级索引与「登场原文」引用）时的规范与流程。
whenToUse: 需要为故事新增角色档案、补「登场原文」、维护索引计数，或审计档案一致性时。
---

# 角色档案维护

**权威源**：
- 目录结构 / 分类铁律 / 命名 / 模板 / 三级索引：`worlds/beastshield/original-archives/chinese/characters/beastshield-company/ARCHIVE-CONVENTIONS.md`
- 「登场原文规范」：同目录 `README.md` 第 94–100 行
- 建档规范索引与待办：`.../characters/README.md`

**位置**（见 `docs/spec/14-work-structure.md` §6）：世界观级 `.../characters/`；
作品级 `<作品目录>/characters/`。两处都必须有 `README.md` 索引，不得散落在 `notes/` 等处。

## 三条硬规则（违反即返工）

1. **完整引用**：`## 四、登场原文` 必须收录该角色在正文中的**全部**自然段，不许删节跳跃。
2. **过渡标注**：确实跳过若干自然段处，插入 `> ——（过渡描述）——`（裸行 `——x——`、`……`、普通文本都不合规）。
3. **原始格式**：保留正文的粗体、标点**与错别字**，不得「修正」；正文写错了也照录，需说明另加备注块。

## 流程

1. 按 `ARCHIVE-CONVENTIONS.md` 的分类铁律决定放置层级与文件名
2. 从正文逐段摘录「登场原文」（用 `grep`/`read` 定位，不凭记忆）
3. 挂进三级索引：等级 README → 兽种 README → 总索引
   ```bash
   node scripts/qa/sync-tables.js <beastshield-company 目录>          # 预演
   node scripts/qa/sync-tables.js <beastshield-company 目录> --write  # 写入
   ```
4. 校验（三项全绿再提交）
   ```bash
   node scripts/qa/check-index.js <characters 目录>
   node scripts/qa/check-quotes.js <characters 目录> <chaptered-stories 目录>
   node scripts/qa/check-links.js <characters 目录>
   ```

计数口径以总索引的**单一数字**为准（该兽种目录下 `.md` 文件总数），不用 `N+M⭐`。

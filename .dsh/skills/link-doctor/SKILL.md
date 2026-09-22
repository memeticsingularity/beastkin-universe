---
name: link-doctor
description: 批量修复 Markdown 相对链接失效（断链），含安全操作方法，避免字符级损坏事故。
whenToUse: check-links 报出断链、移动/重命名目录之后、或需要清理历史遗留死链时。
---

# 断链修复

## 安全方法（务必遵守）

1. **先取基线清单**
   ```bash
   node scripts/qa/check-links.js . > tmp-links.txt 2>&1
   ```
2. **逐条判定**，先看磁盘真实情况（`Test-Path` / `glob`），再决定改法：
   - 目标存在 → 改为正确相对路径
   - 目标不存在且位于导航行 → 删链接保留文字
   - 目标不存在且位于 `.process/` 草稿/历史记录 → 降级为纯文本
3. **改法**：用 `edit` 工具做「整条链接」级精确替换，或写一次性 Node 脚本并**逐条断言命中数**
   （命中 0 或数量异常就跳过并报告）。
4. **禁止** PowerShell `-replace` / `.Replace()` 做批量文本替换——本项目因此死过一次：
   替换模式退化成字符级替换，把 `](` 改成 `((`、`tutorial` 改成 `tutoxiai`，
   污染了 19 个正文文件，只能 `git checkout` 回滚重做。

## 已知的"不是错误"

- 模板占位符（`{code}`、`ch-xxx`、`{中文标题}`）——`check-links.js` 已跳过
- 相对层级算错：`../` 数量与目标层级不匹配（最常见）
- 目录迁移后引用方未同步：`notes/`→`.process/plans/`、`draft/`→`.process/history/`、
  `en/`→`english/`、旧编码目录→散装章节
- **`author-chat/` 是「与作者本人」的交流，归 `.process/author-chat/`**（不要并进
  `.process/ai-discussion/`，那是「与 AI」的讨论）

## 收尾

```bash
node scripts/qa/check-links.js .     # 必须 0
```
修复过的目录再跑一次范围校验；改动量大时先 `git diff --stat` 确认是"链接级"改动
（增删行数与链接数同量级），而不是大面积改写。

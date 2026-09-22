---
name: qa-runner
description: 提交前后运行仓库自带的一致性校验（格式/链接/索引/引用/标点/结构）并正确解读结果。
whenToUse: 完成一批文件改动后、提交前、或需要判断"仓库现在健康吗"时。
---

# 校验运行与解读

## 一键运行

```bash
node scripts/qa/run-all.js              # 全库，逐项 PASS/FAIL 汇总
node scripts/qa/run-all.js <目录>        # 限定范围
```

## 各项含义与处置

| 脚本 | 检查 | 失败怎么办 |
|------|------|-----------|
| `check-links.js` | Markdown 相对链接可解析 | 必须清零；模板/占位链接自动跳过 |
| `check-format.js` | 正文 H1 与结束标记（`docs/spec/11-story-format.md`） | 按 spec 修；标题确实缺失的在 `project-docs/story-format-todo.md` 登记 |
| `check-structure.js` | 作品目录结构（`docs/spec/14-work-structure.md`） | 按结构守卫的归位对照表处理 |
| `check-index.js` | 角色档案三级索引行数 = 档案数 | 跑 `sync-tables.js --write` |
| `check-quotes.js` | 档案「登场原文」确实来自正文 | 逐条核对；「未定位」不是错误 |
| `count-archives.js` | 档案计数口径 | 用于校对总索引计数 |
| `scan-punctuation.js` | 汉字后的半角标点 | **不要直接照改**：引用块内是忠实转录 |

## 注意

- 退出码：`0` 通过、`1` 有问题、`2` 用法/路径错误。门禁请用退出码，不要解析文本。
- `scan-punctuation` 与 `check-quotes` 的「未定位」多为正常现象，务必先读
  `scripts/qa/README.md` 再动手。
- 需要写文件的只有 `sync-tables.js --write`，其余全为只读。

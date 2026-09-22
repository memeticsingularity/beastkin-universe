# 结构统一 · 残余项待办 / Structure TODO

> 由全库结构统一迁移（2026-09-17）生成。机械可判定项已全部处理；下列各项**需要作者判断**，
> 故未自动改动。处理完请跑 `node scripts/qa/run-all.js` 复核。

当前状态：`check-links` 0 失效 · `check-structure` 58 作品中 9 项不合规 · `check-format` 770 文件中 16 项不合规

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

## 二、新作品必须遵守

- 结构：[`docs/spec/14-work-structure.md`](../docs/spec/14-work-structure.md)
- 正文格式：[`docs/spec/11-story-format.md`](../docs/spec/11-story-format.md)
- 脚手架：`node scripts/new-work.js --world <world> --form <cm|cs|s> --code <code> --title-zh "<标题>"`
- 配套 skill：`.dsh/skills/work-scaffold`、`.dsh/skills/structure-guard`、`.dsh/skills/story-format-guard`

---

*生成时间：2026-09-17*

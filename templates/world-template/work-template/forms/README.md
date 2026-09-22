# 作品形态骨架 / Story Form Skeletons

> **版本**：`forms` v4.0（对应 [`docs/spec/11-story-format.md`](../../../../docs/spec/11-story-format.md) v4.0）
> 本目录只放**格式骨架**（有哪些块、块的顺序、标题怎么写）。
> 「每一块写什么」见 skill [`.dsh/skills/story-craft`](../../../../.dsh/skills/story-craft/SKILL.md)；
> 提交前自检见 [`.dsh/skills/story-format-guard`](../../../../.dsh/skills/story-format-guard/SKILL.md)。

## 骨架清单

| 文件 | 形态 | 版本 | 说明 |
|---|---|---|---|
| `chaptered/chapters/ch-001-template.md` | 分章 · 有幕 | v4.0 | 正文按 `## 第{N}幕 {标题}` 分幕（推荐） |
| `chaptered/chapters/ch-001-template-no-acts.md` | 分章 · 无幕 | v4.0 | 正文为连续段落，不设幕标题（同样合规） |
| `short/chapters/{作品编码}.md` | 短篇 | v4.0 | 单篇短篇；短篇集用 `## 第{N}幕`，与分章同规则 |

## 顺序铁律（两种形态通用）

```
H1 → --- → 导航 → --- → 卷首语 → --- → 正文（0..N 幕）→ --- → 卷尾语 → END → --- → 导航 → --- → 评述区
```

- `###` 在正文中**只**用于评述区三个固定子块（`他们最后的故事` / `还活着的人们` / `故事感慨`）
- 结束标记恰好 1 个，且位于卷尾语之后、评述区之前
- 无幕形态只是“正文不写 `## 第N幕`”，其余块完全一致；同一作品内两种形态不要混用

## 英文作品写法

| 中文 | 英文 |
|---|---|
| `# Chapter {N} {标题}` | `# Chapter {N} {Title}` |
| `## 第{N}幕 {标题}` | `## Act {N} {Title}` |
| `## 故事评述与感慨` | `## Story Commentary and Reflections` |
| `### 他们最后的故事` | `### Their Final Stories` |
| `### 还活着的人们` | `### Those Still Alive` |
| `### 故事感慨` | `### Story Reflections` |

## 变更记录

- **v4.0**（2026-09）：分幕由加粗 `**Scene-N**` 改为 `## 第{N}幕`；明确无幕形态合法；卷尾语移到 END 之前；
  评述区三个 `###` 子块固定。旧正文迁移见 `project-docs/story-format-todo.md`。
- v3.0（2026-09）：H1 统一为 `# Chapter {N} {标题}` / `# Story {标题}`，结束标记统一。

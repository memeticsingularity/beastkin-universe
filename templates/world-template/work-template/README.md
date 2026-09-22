# 作品模板 / Work Template

**所有作品的唯一骨架**（原创/改编、长篇/短篇共用）。生成器：

```bash
node scripts/new-work.js --world <world> --form <cm|cs|s> --code <编码> --title-zh "<标题>" [--dry]
```

## 目录

| 路径 | 用途 |
|------|------|
| `common/` | 所有作品共用：README / metadata / chapters 索引 / images / `.process` 全套 |
| `forms/README.md` | 形态骨架说明与版本（**forms v4.0**，对应 spec/11 v4.0） |
| `forms/chaptered/` | 分章作品专属：`chapters/ch-001-template.md`（有幕）、`chapters/ch-001-template-no-acts.md`（无幕） |
| `forms/short/` | 短篇作品专属：`chapters/{作品编码}.md` |

> **本目录不随世界观骨架复制**：`new-world.js` 建世界观时会跳过它（它只在仓库模板里存在）。

## 三件套分工

- **`docs/spec/14-work-structure.md`**（结构）+ **`docs/spec/11-story-format.md` v4.0**（正文骨架）— **规范**（强制，校验器执行）
- **`templates/world-template/`（含本目录）** — **骨架**：有哪些文件、放在哪、叫什么、块的顺序
- **`.dsh/skills/`** — **填充指导**：每一块写什么（`story-craft`）、格式怎么守（`story-format-guard`）

## 占位符

`{作品编码}` `{中文标题}` `{English Title}` `{世界}` `{类型}` `{YYYY-MM-DD}`

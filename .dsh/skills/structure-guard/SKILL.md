---
name: structure-guard
description: 改动任何作品目录（移动、重命名、新建子目录）前后的强制检查流程，确保结构统一且不产生断链。
whenToUse: 需要移动/重命名作品目录或子目录、整理 notes/plans/ai-discuss 等历史遗留目录、或审查某个作品结构是否合规时。
---

# 结构守卫（改目录前必读）

**唯一结构规范**：`docs/spec/14-work-structure.md`

## 检查命令

```bash
node scripts/qa/check-structure.js .                  # 作品层
node scripts/qa/check-structure.js --world .          # 世界观层（W1–W5 + 命名白名单 + 散落正文）
node scripts/qa/check-links.js .                      # 移动后必须为 0 失效
```

`check-structure`（作品层）会报：缺 README/metadata、正文位置不对、禁用目录名、卷目录命名、
章节命名、`.process/` 非标准子目录。
`--world`（世界观层）会报：世界观根非白名单条目、`original-archives` 第一层不合规、
语言层缺失或内容不合规、作品目录位置不合规、作品之外的散落正文。

## 世界观层归位对照表（spec §2）

| 现状 | 归入 |
|------|------|
| `original-archives/chaptered-stories/…`（无语言层） | `original-archives/chinese/chaptered-stories/{main\|side}/…` |
| `original-archives/short-stories/…`（无语言层） | `original-archives/chinese/short-stories/…` |
| `chaptered-stories/<作品>`（未分主支线） | `chaptered-stories/main/<作品>`（主线）或 `side/<作品>`（支线） |
| `character-archive/`、`characters/`（旧名） | `chinese/characters/` |
| 世界根 `templates/`、`tmp/` | 删除（模板属于仓库根 `templates/`） |
| 语言层下的 `.xxx-notes/` 隐藏目录 | 世界级 `.process/plans/xxx-notes/` |
| 世界级散落 `ch-*.md` | **先建成作品**（补 `metadata.yaml` + `README.md` + `chapters/`），见 `project-docs/structure-todo.md` §零 |

## 归位对照表（历史遗留 → 标准位置）

| 现状 | 归入 |
|------|------|
| 作品根散放的短篇正文 `<编码>.md` | `chapters/<编码>.md` |
| 作品根散放的 `ch-*.md` | `chapters/` |
| `notes/`、`plan/`、`plans/` | `.process/plans/` |
| `ai-discuss/`、`discussions/`、`discussion/`、`deepseek/`、`chat/`、`insights/` | `.process/ai-discussion/`（**与 AI** 的讨论） |
| `author-chat/`（散落各处时） | `.process/author-chat/`（**与作者本人**的交流，勿与 AI 讨论混放） |
| `draft/`、`drafts/`、`vN-scrapped/`、`history/` | `.process/history/`（废弃稿） |
| `en/`、`*-en.md` | `english/`（分章放 `english/chapters/`） |
| `vol-1/`、`v1/`、`volume-1-xxx/` | `chapters/volume-{数字}/` |

## 移动目录的标准动作（顺序不可改）

1. 先跑 `check-structure` 记录基线
2. `git mv`（保留历史），**一次只动一类**
3. 批量修正引用该路径的相对链接（`.process/` 内的旧稿也要修，否则 check-links 会红）
4. `node scripts/qa/check-links.js .` → 必须 0
5. `node scripts/qa/check-structure.js .` → 该作品通过
6. 提交（commit 信息不得暴露剧情内容、角色命运或关键转折）

## 铁律

- **不要用 PowerShell `-replace` / `.Replace()` 做批量文本替换**——本项目为此发生过字符级损坏事故。
  改文件用 `read` + `edit` 精确替换；批处理用一次性 Node 脚本并逐条断言命中数。
- 移动/重命名后链接必须清零才能提交。

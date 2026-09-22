# 模板目录 / Templates

> **一句话**：`templates/` 只提供**骨架**——有哪些文件、放在哪、叫什么。
> "内容怎么写"归 **skills**，"规则是什么"归 **spec**。

## 三件套分工

| 层 | 位置 | 职责 | 何时改 |
|---|------|------|--------|
| **规范** | `docs/spec/`（14=结构 · 11=正文格式 · 13=分级 · 04=元数据 · 01=项目结构） | 强制规则，校验器执行 | 规则变化时 |
| **模板** | 本目录 | 骨架：目录与文件、占位符 | 骨架变化时 |
| **skill** | `.dsh/skills/` | 填充指导：`story-craft`（怎么写）· `story-format-guard`（格式自检）· `work-scaffold`（新建流程）· `structure-guard`（改结构）· `qa-runner` · `link-doctor` · `archive-curator` | 写法/流程变化时 |

## 目录

```
templates/
├── README.md                     # 本文件
├── world-template/               # 世界观骨架（唯一来源；new-world.js 复制它）
│   ├── README.md  AGENTS.md  NEW-WORLD-CHECKLIST.md
│   ├── settings/{0-original-setting,1-recommended-canon,2-story-specific-settings}/
│   ├── images/  skills/
│   ├── original-archives/{chinese,english,ai-discussion}/
│   ├── adaptation-works/
│   └── work-template/            # ★ 作品骨架（new-work.js 复制它；不随世界观复制）
│       ├── common/               #   README / metadata / chapters 索引 / images / .process 全套
│       └── forms/                #   ★ 正文骨架 v4.0（spec/11 v4.0）
│           ├── README.md         #     块顺序、英文写法、版本记录
│           ├── chaptered/chapters/ch-001-template.md          # 分章·有幕
│           ├── chaptered/chapters/ch-001-template-no-acts.md  # 分章·无幕
│           └── short/chapters/{作品编码}.md                   # 短篇
└── repo-root-README.md           # 仓库根 README 骨架（唯一非世界观模板）
```

## 生成器（模板是唯一骨架源）

```bash
node scripts/new-world.js --world <world> --title-zh "<中文名>" [--dry]
node scripts/new-work.js  --world <world> --form <cm|cs|s> --code <编码> --title-zh "<标题>" [--dry]
```

两者都**直接复制模板并替换占位符**，不在脚本里内嵌内容——改模板即改产物。

## 占位符

`{作品编码}` `{中文标题}` `{English Title}` `{世界}` `{类型}` `{YYYY-MM-DD}` `{lang}`

## 历史

- 2026-09-22：6 份重复的作品模板（`adaptation-work-template/`、`original-work-template/`）收敛为
  **一棵 `world-template/` 树**；原先写在模板里的写作指导迁入 skill
  `.dsh/skills/story-craft/references/`；旧模板与旧指南归档于
  `project-docs/archive/templates-legacy-2026-09/`（归档目录不参与链接校验）。
- 同日：设定层定为三层 `0/1/2`——`0` 故事原版设定 · `1` 整理/修复后推荐设定 · `2` 故事独有设定
  （原 `2-story-variants` 与变体层语义重复，已合并进第 2 层）。
- 同日：正文骨架升级 **v4.0**（`forms/` + `docs/spec/11-story-format.md`）——分幕改为
  `## 第{N}幕 {标题}`、明确无幕形态合法、卷尾语移到 END 之前、评述区三个 `###` 子块固定；
  存量正文迁移欠债见 `project-docs/story-format-todo.md` §零。

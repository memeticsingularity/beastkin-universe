# Template Index / 模板索引

> 最后更新：2026-06-09 · 规范版本：v3.0

---

## 使用规范 / Usage Guidelines

### 1. 如何选择模板

| 作品类型 | 使用模板路径 |
|---------|------------|
| 改编主线分章 | `templates/adaptation-work-template/chaptered-story/main/` |
| 改编支线分章 | `templates/adaptation-work-template/chaptered-story/side/` |
| 改编短篇 | `templates/adaptation-work-template/short-story/` |
| 原创主线分章 | `templates/original-work-template/chaptered-story/main/` |
| 原创支线分章 | `templates/original-work-template/chaptered-story/side/` |
| 原创短篇 | `templates/original-work-template/short-story/` |

### 2. 复制后必须修改的内容

1. **目录名**：改为实际作品编码（必须与 `metadata.yaml` 中的 `code` 完全一致）
2. **`README.md`**：替换所有 `{占位符}`
3. **`metadata.yaml`**：填写实际字段，删除不需要的注释和可选字段
4. **`ch-001-template.md`** 或 **`{编码}.md`**：替换为实际章节内容
5. **`.process/CHANGELOG.md`**：保留格式，清空示例条目
6. **`.process/CURRENT_STATUS.md`**：初始化当前任务状态

### 3. 目录结构标准

```
{作品编码}/
├── README.md                    # 作品级README（中英双语）
├── metadata.yaml                # 元数据（v3.0格式）
├── chapters/                    # 分章故事：章节目录
│   ├── ch-001-{简写}.md
│   └── ...
├── {编码}.md                    # 短篇故事：正文文件
├── .process/                    # 创作过程文件（非正文）
│   ├── CHANGELOG.md             # 变更日志（记录why）
│   ├── CURRENT_STATUS.md        # 当前状态速查（可选实践）
│   ├── ai-discussion/
│   │   ├── INDEX.md             # AI讨论索引
│   │   └── {YYYY-MM-DD}-{主题}.md
│   ├── plans/                   # 创作计划
│   ├── settings/
│   │   └── story-setting.md     # 作品专属设定
│   └── archive/                 # 旧版本归档
├── notes/                       # 笔记、草稿（可选）
└── images/                      # 配图（可选）
```

### 4. 重要规则

- **编码必须等于文件夹名**：`bs-a-cs-1-example` 的目录名必须是 `bs-a-cs-1-example/`
- **settings 用复数**：禁止单数 `setting/`
- **章节命名**：`ch-{三位数字}-{标题简写}.md`（如 `ch-001-tutorial.md`）
- **版本号格式**：`{basename}-v{主}.{次}.md`（如 `plan-v1.0.md`），禁止下划线
- **导航栏占位符**：正文使用 `{{nav-previous}} | {{nav-toc}} | {{nav-next}}`，禁止硬编码相对路径

---

## 故事模板 / Story Templates

| 文件 | 说明 |
|------|------|
| [`metadata-template.yaml`](metadata-template.yaml) | 通用元数据模板（完整字段版） |
| [`chapter.md`](chapter.md) | 分章正文模板（Scene分幕） |
| [`short-story.md`](short-story.md) | 短篇正文模板 |
| [`README.md`](README.md) | 作品级 README 模板（中英双语） |

### 改编作品 / Adaptation Works

| 路径 | 说明 |
|------|------|
| [`adaptation-work-template/chaptered-story/main/`](adaptation-work-template/chaptered-story/main/) | 改编主线分章故事完整骨架 |
| [`adaptation-work-template/chaptered-story/side/`](adaptation-work-template/chaptered-story/side/) | 改编支线分章故事完整骨架 |
| [`adaptation-work-template/short-story/`](adaptation-work-template/short-story/) | 改编短篇故事完整骨架 |

### 原创作品 / Original Works

| 路径 | 说明 |
|------|------|
| [`original-work-template/chaptered-story/main/`](original-work-template/chaptered-story/main/) | 原创主线分章故事完整骨架 |
| [`original-work-template/chaptered-story/side/`](original-work-template/chaptered-story/side/) | 原创支线分章故事完整骨架 |
| [`original-work-template/short-story/`](original-work-template/short-story/) | 原创短篇故事完整骨架 |

---

## 层级 README 模板 / Level README Templates

| 文件 | 说明 |
|------|------|
| [`root-README.md`](root-README.md) | 项目根级 README 模板 |
| [`world-README.md`](world-README.md) | 世界观级 README 模板 |
| [`story-type-README.md`](story-type-README.md) | 故事类型（chaptered/short）README 模板 |
| [`archive-README.md`](archive-README.md) | 档案根（original-archives/adaptation-works）README 模板 |
| [`language-README.md`](language-README.md) | 语言层（chinese/english）README 模板 |

---

## 写作分析模板 / Writing Analysis Templates

| 文件 | 说明 |
|------|------|
| [`writing-analysis-template.md`](writing-analysis-template.md) | 写作风格分析文档模板（Type A） |
| [`anthology-template.md`](anthology-template.md) | 摘抄集文档模板（Type B） |
| [`style-prompt-template.md`](style-prompt-template.md) | AI 标准化提示词模板（Type C） |

---

## 其他模板 / Other Templates

| 文件 | 说明 |
|------|------|
| [`process-note.md`](process-note.md) | 创作留痕/决策记录模板 |
| [`beastshield-writing-guidelines.md`](beastshield-writing-guidelines.md) | 兽盾世界观写作指南 |
| [`universal-story-template-chinese.md`](universal-story-template-chinese.md) | 通用故事模板（中文，遗留格式） |
| [`universal-story-template-english.md`](universal-story-template-english.md) | 通用故事模板（英文，遗留格式） |
| [`love-story-template-chinese.md`](love-story-template-chinese.md) | 恋爱故事模板（遗留格式） |
| [`eks-story-template-chinese.md`](eks-story-template-chinese.md) | 帝国万岁分章模板（中文，遗留格式） |
| [`eks-story-template-english.md`](eks-story-template-english.md) | 帝国万岁分章模板（英文，遗留格式） |

---

## 规范参考 / Spec References

- [项目结构规范](../docs/spec/01-project-structure.md)
- [作品编码规范](../docs/spec/02-work-coding.md)
- [中间文档规范](../docs/spec/03-intermediate-documents.md)
- [元数据规范](../docs/spec/04-metadata.md)

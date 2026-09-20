# Beastkin Universe 项目结构规范 v3.0

> 本文档定义项目物理目录树。不回答"怎么写故事"，只回答"文件放哪"。

---

## 1. 顶层目录

```
beastkin-universe/
├── .schemas/               # JSON Schema 等校验定义
├── scripts/                # 项目维护脚本（含 qa/ 一致性校验工具）
├── docs/
│   └── spec/               # 规范文档（本文档所在目录）
├── project-docs/           # 项目级文档（如 restructure-2026 重构记录）
├── author/                 # 作者风格分析与写作技能库
├── structure/              # 结构生成产物
├── templates/              # 纯净模板
├── worlds/                 # 全部世界观（各世界观可自带 AGENTS.md）
├── .gitignore
├── AGENTS.md               # 项目指令（AI 协作约定）
├── LICENSE.md
├── README.md
├── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md
```

---

## 2. 世界观目录（worlds/{world}/）

每个世界观必须遵循以下统一结构：

```
worlds/{world}/
├── README.md               # 世界观总览 + 作品索引入口
├── settings/               # 统一使用复数 settings
│   ├── 0-original-setting/
│   ├── 1-recommended-canon/
│   └── 2-story-variants/
├── original-archives/
│   ├── chinese/
│   │   ├── chaptered-stories/
│   │   │   ├── main/
│   │   │   └── side/
│   │   └── short-stories/
│   └── english/
│       ├── chaptered-stories/
│       │   ├── main/
│       │   └── side/
│       └── short-stories/
├── adaptation-works/
│   ├── chaptered-stories/  # 扁平化，不区分 main/side
│   └── short-stories/
└── assets/                 # 世界观级媒体资源（插图、角色立绘等）
    ├── characters/
    ├── illustrations/
    └── reference/
```

### 2.1 强制规则

| 规则 | 说明 |
|------|------|
| `settings/` 必须为复数 | 与 beastshield 保持一致，禁止单数 `setting/` |
| 原创档案必须语言分层 | `original-archives/` 下必须有 `chinese/` 和 `english/`，即使 english/ 暂时为空 |
| 改编作品扁平化 | `adaptation-works/chaptered-stories/` 下直接放作品目录，禁止 `main/` `side/` 子目录 |
| 空世界观标注状态 | 内容极少的世界观在 `README.md` 顶部标注 `Status: concept-only` |

---

## 3. 作品目录

### 3.1 分章故事

```
{完整作品编码}/
├── README.md
├── metadata.yaml
├── ch-2-{标题简写}.md
├── ch-3-{标题简写}.md
└── .process/               # 创作过程隔离（详见 03-intermediate-documents.md）
```

### 3.2 短篇故事

```
{完整作品编码}/
├── README.md
├── metadata.yaml
├── {完整作品编码}.md
└── .process/
```

### 3.3 双语作品

采用**按作品聚合**：一个编码一个目录。

- 默认语言（中文）文件放在作品目录**根级**
- 英文版放在作品目录内的 `en/` 子目录
- `metadata.yaml` 只有一份，位于根级

```
bs-a-cs-1-shorts/
├── README.md
├── metadata.yaml
├── ch-2-birthday-cake.md      # 中文
├── ch-3-snoring-too-loud.md
└── en/
    ├── ch-2-birthday-cake.md  # 英文
    └── ch-3-snoring-too-loud.md
```

---

## 4. 编码与目录映射

编码必须**严格等于**所在文件夹名：

```
# 正确
目录: bs-o-cm-1-first-volume/
编码: bs-o-cm-1-first-volume

# 错误
目录: 06-moying/
编码: bs-a-cm-1-moying   ← 不匹配
```

---

## 5. 晋升路径

### 5.1 改编作品 → 原创档案

条件：已完成、质量获认可、设定无冲突、贡献者授权。

迁移时：
1. 编码中的 `a` 改为 `o`
2. 从 `adaptation-works/` 移至 `original-archives/{语言}/chaptered-stories/{main|side}/`
3. 在 `.process/CHANGELOG.md` 中记录晋升事件

### 5.2 改编作品 → 独立世界观

条件：拥有完整独立设定体系、成熟叙事结构、稳定维护团队、社区影响力。

---

## 6. 空世界观管理

以下情况允许存在"几乎为空"的世界观：

- 已规划但尚未建设的概念世界观
- 已从其他世界观分离、待填充的独立世界观

要求：
- `README.md` 顶部标注 `Status: concept-only`
- 清理所有纯 `.gitkeep` 占位（空目录不需要 `.gitkeep`，Git 不追踪空目录）
- 保留 `settings/` 骨架和 `original-archives/` 语言分层骨架

---

*版本: 3.0*
*替代: docs/project-structure-guide.md*

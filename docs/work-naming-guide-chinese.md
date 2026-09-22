> **Deprecated**: 本文档已被 v3.0 规范替代。编码规则见 `docs/spec/02-work-coding.md`，中间文档规范见 `docs/spec/03-intermediate-documents.md`，项目结构见 `docs/spec/01-project-structure.md`。本文档保留 6 个月作为过渡期兼容。

# Beastkin Universe 作品命名与组织指南 2.3.0

## 1. 简介

本文档规定了 Beastkin Universe
项目中作品的命名规则和组织结构。所有贡献者创作新作品时，请遵循本指南。本指南根据最新项目结构更新，确保所有作品类型命名格式统一，采用自然数编号，并统一了所有分章故事的结构。

## 2. 核心概念定义

在深入细节前，请先理解以下核心概念：

### 2.1. 原作存档 (`original-archives`)

存放由 **世界观第一作者**（或项目核心团队）创作的官方作品。这些作品是世界观的核心叙事基础。

### 2.2. 改编作品 (`adaptation-works`)

存放由社区创作者基于官方作品进行的 **改编创作**
。这些作品可视为官方世界的衍生演绎。改编作品在完成且获得认可后，可申请 **晋升
**。

### 2.3. 晋升路径

- **路径一：晋升为官方原作**  
  优秀的改编作品可整体 **迁移** 至对应世界观的 `original-archives` 中，成为该世界观正史的一部分。
- **路径二：晋升为独立世界观**  
  特别优秀的改编作品，如果世界观设定完整且具有独立性，可申请成为 `worlds/` 下的一个全新世界观模块。

### 2.4. 统一的故事结构

所有分章故事（无论主线、支线、角色故事）都采用 **"文件夹+内部章节"** 结构：

- 每个系列（主线分卷、支线系列、角色故事）都有自己的文件夹
- 文件夹内章节文件统一命名为 `ch-三位数字-章节标题简写.md`
- 章节编号从1开始，自然递增

### 2.5. 明确的形式类型区分

为明确区分作品类型，引入三位字符的形式类型标识：

- `cm`：主线分章故事 (Chaptered Main)
- `cs`：支线分章故事 (Chaptered Side)
- `s`：短篇故事 (Short Story)

## 3. 作品编码系统

每个作品都有一个唯一的编码，用于标识和组织。编码格式如下：

```
[世界观]-[性质]-[形式类型]-[自然数序号]-[系列名]
```

### 3.1. 编码示例

```
bsp-o-cs-1-g-277-green-bull-azhuang
│     │ │  │ │   │    └─ 系列名 (kebab-case, 英文小写连字符)
│     │ │  │ │   └─ 序号 (自然数，从1开始)
│     │ │  │ └─ 形式类型 (cm/cs/s)
│     │ │  └─ 性质 (a=改编作品, o=原作, c=联动)
│     │ └─ 世界观缩写
│     └─ 章节文件命名 (在文件夹内)：ch-001-last-watch.md
```

### 3.2. 字段说明

| 字段       | 值                                                                   | 含义         | 示例                           |
|----------|---------------------------------------------------------------------|------------|------------------------------|
| **世界观**  | `bs`, `bsr`, `uba`, `bsp`                                           | 世界观缩写      | `bsp` = beastshield paradise |
| **性质**   | `a` = adaptation<br>`o` = original<br>`c` = crossover               | 创作性质       | `o` = 原作                     |
| **形式类型** | `cm` = chaptered-main<br>`cs` = chaptered-side<br>`s` = short-story | 作品形式和类型    | `cs` = 支线分章故事                |
| **序号**   | `1`, `2`, `3`, ...                                                  | 同形式下自然数序号  | `1` = 第一个作品                  |
| **系列名**  | kebab-case                                                          | 英文名(小写连字符) | `g-277-green-bull-azhuang`   |

### 3.3. 世界观缩写对应表

| 缩写    | 完整名称                   | 说明       |
|-------|------------------------|----------|
| `bs`  | Beastshield            | 兽盾世界观    |
| `bsr` | Beastshield Reforged   | 兽盾新纪元世界观 |
| `uba` | United Beasts Alliance | 万兽盟世界观   |
| `bsp` | Beastshield Paradise   | 兽盾天堂世界观  |

### 3.4. 形式类型详解

| 形式类型 | 含义                      | 存放目录                      | 示例                                    |
|------|-------------------------|---------------------------|---------------------------------------|
| `cm` | 主线分章故事 (Chaptered Main) | `chaptered-stories/main/` | `bs-o-cm-1-first-volume`              |
| `cs` | 支线分章故事 (Chaptered Side) | `chaptered-stories/side/` | `bsp-o-cs-1-g-277-green-bull-azhuang` |
| `s`  | 短篇故事 (Short Story)      | `short-stories/`          | `bs-o-s-1-farm-inn`                   |

## 4. 目录结构

### 4.1. 原创作品 (`original-archives`)

存放官方原创作家创作的作品，由项目核心团队维护。

```
worlds/世界观/original-archives/
├── chinese/                          # 中文作品
│   ├── chaptered-stories/            # 分章故事
│   │   ├── main/                     # 主线故事区域
│   │   │   └── 作品编码文件夹/       # 每个主线分卷独立文件夹 (cm类型)
│   │   │       ├── README.md
│   │   │       ├── metadata.yaml
│   │   │       ├── ch-001-章节标题.md  # 统一章节命名
│   │   │       ├── ch-002-章节标题.md
│   │   │       └── ...
│   │   └── side/                     # 支线故事区域
│   │       └── 作品编码文件夹/       # 每个支线独立文件夹 (cs类型)
│   │           ├── README.md
│   │           ├── metadata.yaml
│   │           ├── ch-001-章节标题.md
│   │           └── ...
│   └── short-stories/                # 短篇故事
│       ├── 世界观编码-o-s-1-作品名.md  # 直接放文件 (s类型)
│       ├── 世界观编码-o-s-2-作品名.md
│       └── ...
└── english/                          # 英文作品（结构同上）
    ├── chaptered-stories/
    │   ├── main/
    │   └── side/
    └── short-stories/
```

### 4.2. 改编作品 (`adaptation-works`)

存放社区改编创作的作品，由社区贡献者维护。

```
worlds/世界观/adaptation-works/
├── chaptered-stories/                # 分章故事目录
│   └── 完整作品编码/                 # 每个作品独立文件夹
│       ├── README.md
│       ├── metadata.yaml
│       ├── ch-001-章节标题.md         # 与原创格式完全一致
│       ├── ch-002-章节标题.md
│       ├── settings/
│       │   └── story-setting.md
│       └── images/
└── short-stories/                    # 短篇故事目录
    └── 完整作品编码/                 # 每个短篇独立文件夹
        ├── README.md
        ├── metadata.yaml
        ├── 完整作品编码.md          # 短篇内容文件
        ├── settings/
        │   └── story-setting.md
        └── images/
```

## 5. 文件命名规范

### 5.1. 核心原则：所有分章故事采用"文件夹+内部章节"结构

#### **所有分章故事（主线、支线、改编）**

- **文件夹命名**：`{世界观编码}-{性质}-{形式类型}-{自然数序号}-{系列名}`
- **章节文件命名**（在文件夹内）：`ch-{三位数字章节号}-{章节标题简写}.md`

#### **示例对比：**

| 类型        | 文件夹名                                  | 形式类型 | 章节文件名                      |
|-----------|---------------------------------------|------|----------------------------|
| **主线分卷1** | `bs-o-cm-1-first-volume`              | `cm` | `ch-001-prologue.md`         |
| **主线分卷2** | `bs-o-cm-2-second-volume`             | `cm` | `ch-001-new-beginnings.md`   |
| **支线角色1** | `bsp-o-cs-1-g-277-green-bull-azhuang` | `cs` | `ch-001-last-watch.md`       |
| **支线角色2** | `bsp-o-cs-2-blue-wolf-dorian`         | `cs` | `ch-001-desperate-choice.md` |
| **改编分章**  | `bs-a-cs-1-a-new-gamer`               | `cs` | `ch-001-infiltration.md`     |
| **改编主线**  | `bs-a-cm-1-main-adaptation`           | `cm` | `ch-001-introduction.md`     |

### 5.2. 短篇故事文件名格式

#### **原创短篇**

- **格式**：`{世界观编码}-o-s-{自然数序号}-{作品名}.md`
- **示例**：`bs-o-s-1-farm-inn.md`
- **位置**：`original-archives/语言/short-stories/`

#### **改编短篇**

- **格式**：`{完整作品编码}.md`
- **示例**：`bs-a-s-1-first-blood.md`
- **位置**：`adaptation-works/short-stories/{完整作品编码}/`

### 5.3. 特殊说明

1. **自然数编号**：所有序号使用自然数（1, 2, 3...），必须三位数补零，现代文件系统能正确排序 `-1-`、`-2-`、`-12-`
2. **统一章节命名**：文件夹内章节文件统一以 `ch-` 开头，保持格式一致
3. **标题简写规则**：
    - 英文小写，用连字符连接
    - 简明扼要，反映本章核心内容
    - 避免特殊字符和空格
4. **编码自包含性**：作品编码本身已包含所有关键信息（世界观、性质、形式类型、序号、系列名）
5. **双重分类保障**：既有编码标识（cm/cs），又有目录分类（main/side），确保清晰无误

## 6. 作品晋升机制

### 6.1. 从改编作品晋升为原创作品

当社区改编作品符合以下条件时，可申请晋升到 `original-archives`：

1. **完成状态**：作品已完结
2. **质量优秀**：获得社区广泛认可
3. **设定一致**：与原著世界观设定无冲突
4. **维护稳定**：有稳定的维护者
5. **授权清晰**：所有贡献者同意作品转移

### 6.2. 从改编作品晋升为独立世界观

当改编作品符合以下条件时，可申请成为独立世界观：

1. **世界观完整**：拥有完整、独立的设定体系
2. **叙事成熟**：有完整的叙事结构和角色体系
3. **社区认可**：在社区中有广泛影响力
4. **维护团队**：有稳定的维护和开发团队
5. **授权清晰**：所有贡献者同意世界观独立

### 6.3. 晋升流程

1. **申请**：作品维护者提交晋升申请
2. **审核**：核心团队审核作品质量
3. **迁移**：将作品从 `adaptation-works` 迁移到目标位置
4. **重命名**：根据需要重命名文件，符合新位置的命名规则
5. **更新**：更新所有相关链接和导航
6. **公告**：向社区公布晋升结果

## 7. 文件规范

### 7.1. 必须包含的文件

#### 分章故事目录结构（适用于所有类型）

```
完整作品编码文件夹/
├── README.md                     # 作品介绍
├── metadata.yaml                 # 元数据
├── ch-001-章节标题.md             # 第一章
├── ch-002-章节标题.md             # 第二章
├── settings/
│   └── story-setting.md         # 本故事特有设定
└── images/                      # 图片资源目录
```

#### 短篇故事目录结构（仅改编需要）

```
完整作品编码文件夹/
├── README.md
├── metadata.yaml
├── 完整作品编码.md              # 短篇内容文件
├── settings/
│   └── story-setting.md
└── images/
```

### 7.2. 元数据文件 (metadata.yaml)

```yaml
# 作品元数据
work:
  code: "bsp-o-cs-1-g-277-green-bull-azhuang"  # 作品编码（文件夹名）
  title:
    chinese: "夜哨无声——牛兽人阿壮的故事"      # 中文标题
    english: "Silent Night Watch"             # 英文标题
  format: "chaptered-story"                   # Chaptered-story / short-story
  subtype: "side"                             # main/side（基于形式类型自动确定）
  form_type: "cs"                             # 形式类型 (cm/cs/s)
  status: "updating"                          # updating / completed
  location: "original-archives"               # 存储位置
  promotion_status: "n/a"                     # 晋升状态（n/a/eligible/under_review/promoted）

# 创作信息
creation:
  author: "作者名"                            # 作者姓名
  start_date: "2025-12-15"                    # 开始日期
  last_update: "2025-12-15"                   # 最后更新日期
  based_on: "beastshield"                     # 基于哪个世界观（改编作品需要）
```

### 7.3. README.md 模板

```markdown
# [作品标题]

## 基本信息

- **编码**: `bsp-o-cs-1-g-277-green-bull-azhuang`
- **状态**: 更新中
- **位置**: original-archives (原创作品)
- **类型**: 支线分章故事 (cs)
- **作者**: 作者名
- **开始日期**: 2025-12-15

## 故事简介

这里写故事简介...

## 章节列表

- [第一章: 最后一班岗](`ch-001-last-watch.md`)
- [第二章: 时间褶皱里的陌生人](`ch-002-stranger-in-folded-time.md`)

## 设定说明

本故事使用了以下特殊设定：

- [查看详细设定](`settings/story-setting.md`)
```

## 8. 创建新作品的步骤

### 8.1. 创建原创分章故事（核心团队）

1. **确定作品信息**
    - 选择世界观（bs/bsr/uba/bsp）
    - 确定作品性质（原创用o）
    - 确定形式类型（主线用cm，支线用cs）
    - 确定序号（查看已有作品，使用下一个自然数）
    - 确定系列名（英文kebab-case）

2. **创建文件夹和文件**
    - 根据形式类型选择目录：
        - `cm`类型：`original-archives/语言/chaptered-stories/main/`
        - `cs`类型：`original-archives/语言/chaptered-stories/side/`
    - 创建文件夹：`{世界观}-o-{形式类型}-{序号}-{系列名}`
    - 在文件夹内创建章节文件：`ch-001-章节标题.md`
    - 创建辅助文件：`README.md`、`metadata.yaml`、`settings/story-setting.md`

3. **使用正确命名格式**
    - 文件夹：`{世界观}-o-{形式类型}-{自然数}-{系列名}`
    - 章节文件：`ch-{三位数字}-{章节标题简写}.md`

### 8.2. 创建原创短篇故事

1. **确定作品信息**
    - 选择世界观
    - 确定序号（查看已有短篇，使用下一个自然数）
    - 确定作品名（英文kebab-case）

2. **创建文件**
    - 在 `original-archives/语言/short-stories/` 创建文件
    - 文件名：`{世界观}-o-s-{自然数}-{作品名}.md`

### 8.3. 创建改编作品（社区贡献者）

1. **确定作品信息**
    - 选择世界观（bs/bsr/uba/bsp）
    - 确定作品性质（改编用a）
    - 确定形式类型（cm/cs/s）
    - 确定序号（查看已有改编作品，使用下一个自然数）
    - 确定作品名（英文kebab-case）

2. **创建作品目录**
    - 在对应世界观的 `adaptation-works/[对应目录]/` 下创建文件夹
    - 对于分章故事，无需区分main/side目录，直接放在 `chaptered-stories/` 下

3. **生成骨架**
    - 推荐：`node scripts/new-work.js --world <世界> --form <cm|cs|s> --code <编码> --title-zh "<标题>"`（先加 `--dry` 预览）
    - 手动：从 `templates/world-template/work-template/` 复制 `common/` + `forms/{chaptered|short}/`
    - 修改文件夹名称和内部文件内容

4. **修改文件内容**
    - 更新 `metadata.yaml` 中的所有信息
    - 更新 `README.md` 中的内容
    - 更新故事文件，使用统一命名格式
    - 更新 `settings/story-setting.md` 中的设定
    - 添加图片到 `images/` 目录

## 9. 示例

### 9.1. 原创作品示例

**主线分卷故事（第一卷）：**

- 文件夹：`bs-o-cm-1-first-volume/`
- 形式类型：`cm` (主线分章)
- 位置：`worlds/beastshield/original-archives/chinese/chaptered-stories/main/`
- 内部文件：`ch-001-prologue.md`, `ch-002-rising-action.md`...

**支线角色故事：**

- 文件夹：`bsp-o-cs-1-g-277-green-bull-azhuang/`
- 形式类型：`cs` (支线分章)
- 位置：`worlds/beastshield-paradise/original-archives/chinese/chaptered-stories/side/`
- 内部文件：`ch-001-last-watch.md`, `ch-002-stranger-in-folded-time.md`...

**短篇故事：**

- 文件：`bs-o-s-1-farm-inn.md`
- 形式类型：`s` (短篇)
- 位置：`worlds/beastshield/original-archives/chinese/short-stories/`

### 9.2. 改编作品示例

**分章故事（支线改编）：**

- 作品编码：`bs-a-cs-1-a-new-gamer`
- 文件夹：`bs-a-cs-1-a-new-gamer/`
- 形式类型：`cs` (支线分章)
- 位置：`worlds/beastshield/adaptation-works/chaptered-stories/`
- 内部文件：`ch-001-infiltration.md`, `ch-002-confrontation.md`...

**分章故事（主线改编）：**

- 作品编码：`bs-a-cm-1-main-adaptation`
- 文件夹：`bs-a-cm-1-main-adaptation/`
- 形式类型：`cm` (主线分章)
- 位置：`worlds/beastshield/adaptation-works/chaptered-stories/`

**短篇故事：**

- 作品编码：`bs-a-s-1-first-blood`
- 文件夹：`bs-a-s-1-first-blood/`
- 位置：`worlds/beastshield/adaptation-works/short-stories/`
- 内容文件：`bs-a-s-1-first-blood.md`

## 10. 命名检查清单

创建文件时请检查：

- [ ] 世界观编码正确（bs/bsr/uba/bsp）
- [ ] 作品性质正确（o/a/c）
- [ ] 形式类型正确（cm/cs/s）
- [ ] 序号正确（三位数补零）
- [ ] 系列名/作品名正确（英文kebab-case）
- [ ] 章节编号正确（三位数补零，仅分章需要）
- [ ] **章节标题/作品标题已包含**（必填）
- [ ] 连字符使用正确（特别是 `ch-`）
- [ ] 文件名全部小写
- [ ] 文件扩展名为 `.md`
- [ ] 分章故事是否采用"文件夹+内部章节"结构
- [ ] cm/cs类型作品是否放在正确的目录（main/side）

## 11. 注意事项

1. **命名一致性**：改编作品文件夹命名格式与原创作品保持完全一致
2. **标题必填**：所有分章故事必须包含章节标题简写
3. **编码唯一性**：确保作品编码唯一，不重复
4. **序号连续性**：同一形式下的序号应连续递增
5. **文件命名**：使用小写字母和连字符，避免特殊字符
6. **图片引用**：在故事文件中正确引用图片路径
7. **状态更新**：作品完成后，将 `metadata.yaml` 中的状态改为 `completed`
8. **晋升申请**：符合晋升条件的作品可随时提交晋升申请
9. **自然数优势**：利用现代文件系统的自然排序，简化编号
10. **形式类型明确性**：通过cm/cs/s明确区分作品类型，编码自包含所有信息

## 12. 模板位置

项目只保留一套世界观+作品骨架，位于 `templates/world-template/`：

- 作品共用骨架：`templates/world-template/work-template/common/`
- 分章故事形态：`templates/world-template/work-template/forms/chaptered/`
- 短篇故事形态：`templates/world-template/work-template/forms/short/`

推荐直接用生成器 `node scripts/new-work.js --world <world> --form <cm|cs|s> --code <编码> --title-zh "<标题>"`
（自动复制骨架并替换占位符）。正文怎么写由 skill `.dsh/skills/story-craft` 负责。

---

## 13. 常见问题

### Q: 为什么改用cm/cs/s形式类型标识？

A: 为了在编码中明确区分作品类型，使文件编码自包含所有关键信息。看到编码就知道是主线分章(cm)、支线分章(
cs)还是短篇(s)
，无需查看目录结构。

### Q: cm和cs类型在目录结构上还有区别吗？

A: 是的，虽然编码已包含类型信息，但目录结构仍需区分：

- `cm`类型放在 `chaptered-stories/main/`
- `cs`类型放在 `chaptered-stories/side/`
  这样双重保障，既有编码标识，又有目录分类。

### Q: 改编作品也需要区分cm/cs吗？

A: 是的，改编作品同样遵循这个规则。如果改编的是主线内容，使用`cm`；如果是支线内容，使用`cs`
。这有助于理解作品的定位和内容性质。

### Q: 如何为主线故事创建多个分卷？

A: 每个分卷都是一个独立的文件夹，按顺序编号：

- 第一卷：`bs-o-cm-1-first-volume/`
- 第二卷：`bs-o-cm-2-second-volume/`
- 第三卷：`bs-o-cm-3-final-volume/`

每个卷内都有完整的章节系列，从`ch-001`开始编号。

### Q: 章节文件必须从ch-1开始吗？

A: 是的，为了保持一致性，每个文件夹内的章节都从`ch-001`开始。即使这个系列是某个长篇的后续部分，也重新从1开始编号，因为文件夹已经表明了这是第几卷。

### Q: 如果我的改编作品很受欢迎，可以成为官方作品吗？

A: 可以。当作品完成并达到一定质量标准后，可以申请迁移到 `original-archives`
。迁移时会根据需要重命名文件，并调整到正确的目录（main或side）。

### Q: 改编作品可以成为独立世界观吗？

A: 可以。如果改编作品拥有完整独立的设定体系、成熟的叙事结构和社区影响力，可申请成为独立世界观。这需要核心团队审核。

### Q: 如何快速识别作品类型？

A: 根据文件编码的第6-7位字符：

- `cm`：主线分章故事
- `cs`：支线分章故事
- `s`：短篇故事

---

## 14. 更新记录

- **2025-12-15 v2.3.0**: 引入明确的形式类型标识
    - **主要变更**：
        1. **形式类型扩展**：将形式字段从`c/s`扩展为`cm/cs/s`，明确区分主线分章、支线分章和短篇故事
        2. **编码自包含性**：作品编码现在包含完整的类型信息，无需查看目录即可知道是主线还是支线
        3. **统一改编作品规则**：改编作品同样使用cm/cs标识，便于理解作品定位
        4. **更新所有示例**：更新所有示例以符合新规范
        5. **增强元数据**：在metadata.yaml中添加form_type字段
        6. **优化常见问题**：更新FAQ以反映新的形式类型系统

- **2025-12-15 v2.2.0**: 简化编号系统，统一故事结构
    - 三位数编号：所有序号使用三位数补零（001, 002, 003...），确保字典序排序正确
    - 统一结构：所有分章故事（主线、支线、改编）都采用"文件夹+内部章节"结构
    - 章节命名统一：文件夹内章节文件统一命名为 `ch-三位数字-章节标题简写.md`
    - 主线分卷支持：明确主线可以采用分卷结构，每卷一个文件夹
    - 增加世界观：新增 `bsp` (Beastshield Paradise) 世界观支持
    - 优化示例：更新所有示例以符合新规范
    - 添加编号：为指南每个部分添加编号，提高可读性

- **2025-12-13 v2.1.1**: 明确改编作品的晋升路径和定位
    - 新增核心概念定义部分
    - 明确改编作品的两种晋升路径：晋升为官方原作或独立世界观
    - 在元数据中添加晋升状态字段
    - 更新常见问题，增加改编作品晋升相关问题

- **2025-12-13 v2.1.0**: 根据最新项目结构更新，统一所有作品类型的命名格式
    - 章节标题必填
    - 主线支线区分明确
    - 更新所有示例
    - 添加命名检查清单

---

*最后更新日期：2025年12月15日*  
*文档版本：2.3.0*
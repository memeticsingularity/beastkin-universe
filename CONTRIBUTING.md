# Beastkin Universe 贡献指南 v3.1 / Contributing Guide for Beastkin Universe v3.1

**版本 3.1 · 最后更新：2026年9月17日 · 规范体系：[docs/spec/](docs/spec/) · 校验工具：[scripts/qa/](scripts/qa/)**

---

## 1. 欢迎 / Welcome

感谢您对 Beastkin Universe 感兴趣！本指南将帮助您了解如何为这个项目做出贡献。我们特别推荐新创作者从*
*改编作品**
开始，这是融入社区最顺畅的路径。

---

Thank you for your interest in Beastkin Universe! This guide will help you understand how to
contribute to this project.
We especially recommend new creators to start with **adaptation works**, as it's the smoothest path
to integrate into
the community.

---

## 2. 开始之前 / Before You Begin

### 2.1 熟悉项目结构 / Familiarize with Project Structure

在开始贡献之前，请先了解项目的组织结构：

```
worlds/                          # 所有世界观目录
├── beastshield/                 # 兽盾世界观
│   ├── original-archives/       # 原作存档
│   ├── adaptation-works/        # 改编作品（推荐起点）
│   └── settings/                # 设定参考库
├── beastshield-paradise/        # 兽盾乐园世界观
├── beastshield-reforged/        # 兽盾新纪元世界观
├── beastshield-online/          # 兽游世界（VR 网游）世界观
├── beastman-prototype/          # 兽人原型世界观（兽盾前身）
├── empire-kik-soldiers/         # 帝国万岁世界观
├── paradise-kik-soldiers/       # 乐园基尅兵世界观
├── random/                      # 杂项故事合集（不归属任何世界观）
├── united-beasts-alliance/      # 万兽盟世界观
└── worldstrider-infinity/       # 世界行者世界观
```

详细结构请参阅：[项目结构规范](docs/spec/01-project-structure.md)

---

Before you start contributing, please familiarize yourself with the project structure:

```
worlds/                          # All world directories
├── beastshield/                 # Beastshield world
│   ├── original-archives/       # Original works archive
│   ├── adaptation-works/        # Adaptation works (recommended start)
│   └── settings/                # Settings library
├── beastshield-paradise/        # Beastshield Paradise world
├── beastshield-reforged/        # Beastshield Reforged world
├── beastshield-online/          # Beastshield Online (VR game) world
├── beastman-prototype/          # Beastman Prototype world (predecessor of Beastshield)
├── empire-kik-soldiers/         # Empire KIK Soldiers world
├── paradise-kik-soldiers/       # Paradise KIK Soldiers world
├── random/                      # Miscellaneous stories (not tied to any world)
├── united-beasts-alliance/      # United Beasts Alliance world
└── worldstrider-infinity/       # Worldstrider Infinity world
```

For detailed structure, see: [Project Structure Spec](docs/spec/01-project-structure.md)

---

### 2.2 阅读相关指南 / Read Relevant Guides

**强烈推荐：从改编作品开始**
我们推荐所有新创作者从 `adaptation-works` 开始创作，这有助于理解世界观、获得社区反馈，并可在作品完成后申请晋升为官方作品。

请务必阅读以下指南：

- [行为准则](CODE_OF_CONDUCT.md) - 了解社区规范
- [项目结构规范](docs/spec/01-project-structure.md) - 掌握目录结构与晋升机制
- [作品编码规范](docs/spec/02-work-coding.md) - 掌握作品编码语法
- [中间文档规范](docs/spec/03-intermediate-documents.md) - 了解 README、.process/、CHANGELOG 等交付物要求
- [元数据规范](docs/spec/04-metadata.md) - 了解元数据字段与校验规则
- [故事格式规范](docs/spec/11-story-format.md) - 了解 Scene 分幕与导航栏语法
- [内容指南](docs/spec/12-content-guidelines.md) - 了解世界观一致性要求

---

**Strongly Recommended: Start with Adaptation Works**
We recommend all new creators to start with `adaptation-works`. This helps understand the world,
receive community
feedback, and allows applying for promotion to official works after completion.

Please be sure to read the following guides:

- [Code of Conduct](CODE_OF_CONDUCT.md) - Understand community standards
- [Project Structure Spec](docs/spec/01-project-structure.md) - Directory structure and promotion
  mechanism
- [Work Coding Spec](docs/spec/02-work-coding.md) - Work coding syntax
- [Intermediate Documents Spec](docs/spec/03-intermediate-documents.md) - README, .process/,
  CHANGELOG requirements
- [Metadata Spec](docs/spec/04-metadata.md) - Metadata fields and validation rules
- [Story Format Spec](docs/spec/11-story-format.md) - Scene structure and navigation bar syntax
- [Content Guidelines](docs/spec/12-content-guidelines.md) - Worldview consistency requirements

---

## 3. 贡献类型 / Types of Contributions

### 3.1 新故事创作 / Creating New Stories

#### 3.1.1 选择故事形式 / Choose Story Format

我们支持三种故事形式（v3.0 规范）：

1. **主线分章故事 (Chaptered Main, `cm`)** - 主线长篇多章节作品
2. **支线分章故事 (Chaptered Side, `cs`)** - 支线长篇多章节作品
3. **短篇故事 (Short Story, `s`)** - 短篇单文件作品

---

We support three story formats (v3.0 spec):

1. **Chaptered Main (`cm`)** - Main storyline long multi-chapter works
2. **Chaptered Side (`cs`)** - Side storyline long multi-chapter works
3. **Short Story (`s`)** - Short single-file works

---

#### 3.1.2 推荐路径：从改编作品开始 / Recommended Path: Start with Adaptation Works

**强烈推荐新创作者从改编作品开始**：

1. 使用改编作品模板（性质字段固定为 `a`）
2. 在 `adaptation-works/` 目录下创作
3. 遵循 v3.0 编码规范，使用自然数序号和 `cm`/`cs`/`s` 形式类型
4. 章节标题必填，使用 `ch-{自然数}-{章节标题简写}.md` 格式
5. 作品完成后可申请晋升为官方作品

请按照[故事格式规范](docs/spec/11-story-format.md)中的"快速开始"步骤操作。

---

**We strongly recommend new creators to start with adaptation works**:

1. Use adaptation work templates (nature field fixed as `a`)
2. Create works in the `adaptation-works/` directory
3. Follow v3.0 coding spec, using natural numbers and `cm`/`cs`/`s` form types
4. Chapter titles are mandatory, use `ch-{natural-number}-{chapter-title-abbreviation}.md` format
5. Apply for promotion to official works after completion

Please follow the "Quick Start" steps in
the [Story Format Spec](docs/spec/11-story-format.md).

---

#### 3.1.3 使用模板 / Use Templates

请使用我们提供的模板：

- 分章故事模板：`templates/adaptation-work-template/chaptered-story/`
- 短篇故事模板：`templates/adaptation-work-template/short-story/`

**重要提示**：请使用最新版本的模板，确保包含 `form_type` 字段（v3.0 规范必填字段）。

---

Please use our provided templates:

- Chaptered story template: `templates/adaptation-work-template/chaptered-story/`
- Short story template: `templates/adaptation-work-template/short-story/`

**Important**: Please use the latest version of templates, ensuring they include the `form_type`
field (v3.0 spec required
field).

---

#### 3.1.4 遵循命名规范 / Follow Naming Conventions

所有作品必须遵循 v3.0 编码规范：

```
[世界观]-[性质]-[形式]-[序号]-[标识名]
```

**改编作品示例**：

- `bs-a-cs-1-a-new-gamer`（支线分章改编，性质为`a`）
- `bs-a-cm-1-main-adaptation`（主线分章改编）
- `bs-a-s-1-first-blood`（短篇改编）

**注意**：v3.0 使用自然数序号（1, 2, 3...）而不是三位数（001, 002），形式类型为 `cm`/`cs`/`s`

详细说明请参阅：[作品编码规范](docs/spec/02-work-coding.md)

---

All works must follow v2.3.0 naming conventions:

```
[world]-[nature]-[form]-[sequence]-[identifier]
```

**Adaptation work examples**:

- `bs-a-cs-1-a-new-gamer` (side chaptered adaptation, nature is `a`)
- `bs-a-cm-1-main-adaptation` (main chaptered adaptation)
- `bs-a-s-1-first-blood` (short story adaptation)

**Note**: v3.0 uses natural number sequences (1, 2, 3...) instead of three-digit numbers (001,
002), form types are
`cm`/`cs`/`s`

For detailed explanation, see: [Work Coding Spec](docs/spec/02-work-coding.md)

---

### 3.2 设定完善 / Improving Settings

#### 3.2.1 设定层级 / Setting Levels

每个世界观都有三级设定：

1. **0-原始设定 (Original Setting)** - 原作原始设定，保持原貌
2. **1-推荐设定 (Recommended Canon)** - 维护者推荐的严谨化设定
3. **2-故事变体 (Story Variants)** - 各故事特有的设定变化

---

Each world has three levels of settings:

1. **0-Original Setting** - Original work settings, preserved as is
2. **1-Recommended Canon** - Maintainer's recommended refined settings
3. **2-Story Variants** - Story-specific setting variations

---

#### 3.2.2 贡献方式 / How to Contribute

- **补充原始设定**：在对应世界观的 `settings/0-original-setting/` 中添加内容
- **改进推荐设定**：在 `settings/1-recommended-canon/` 中提出改进建议
- **记录故事变体**：在各作品目录的 `settings/` 中记录特有设定

---

- **Supplement Original Settings**: Add content to `settings/0-original-setting/` of the
  corresponding world
- **Improve Recommended Canon**: Suggest improvements in `settings/1-recommended-canon/`
- **Record Story Variants**: Record unique settings in each work's `settings/` directory

---

### 3.3 翻译工作 / Translation Work

#### 3.3.1 翻译原则 / Translation Principles

- 保持原文风格和语气
- 专有名词保持一致性
- 在元数据中标注翻译信息

---

- Maintain the original style and tone
- Keep terminology consistent
- Mark translation information in metadata

---

#### 3.3.2 文件组织 / File Organization

翻译作品应与原文放在同一作品目录下：

```
bsp-o-cs-1-g-277-green-bull-azhuang/
├── chinese/          # 中文版
│   ├── README.md
│   ├── metadata.yaml
│   └── ch-1-last-watch.md
└── english/          # 英文版
    ├── README.md
    ├── metadata.yaml
    └── ch-1-last-watch.md
```

---

Translated works should be placed in the same work directory as the original:

```
bsp-o-cs-1-g-277-green-bull-azhuang/
├── chinese/          # Chinese version
│   ├── README.md
│   ├── metadata.yaml
│   └── ch-1-last-watch.md
└── english/          # English version
    ├── README.md
    ├── metadata.yaml
    └── ch-1-last-watch.md
```

---

### 3.4 问题报告与建议 / Issue Reporting and Suggestions

#### 3.4.1 报告问题 / Reporting Issues

在GitHub Issues中报告以下类型的问题：

- 设定矛盾或不一致
- 文档错误或缺失
- 模板问题
- 项目结构问题

---

Report the following types of issues in GitHub Issues:

- Setting contradictions or inconsistencies
- Documentation errors or omissions
- Template issues
- Project structure issues

---

#### 3.4.2 提出建议 / Making Suggestions

我们欢迎以下建议：

- 新功能或改进
- 工作流程优化
- 社区建设想法

---

We welcome the following suggestions:

- New features or improvements
- Workflow optimizations
- Community building ideas

---

## 4. 提交流程 / Submission Process

### 4.1 Fork 仓库 / Fork the Repository

1. 访问项目GitHub页面
2. 点击右上角的 "Fork" 按钮
3. 将 fork 的仓库克隆到本地

---

1. Visit the project GitHub page
2. Click the "Fork" button in the upper right corner
3. Clone your forked repository to your local machine

---

### 4.2 创建功能分支 / Create a Feature Branch

```bash
# 从主分支创建新分支
git checkout -b feature/your-feature-name
```

请使用有意义的分支名称：

- `feature/new-story-bs-a-cs-2`
- `feature/improve-beastshield-settings`
- `fix/documentation-typo`
- `translation/chinese-version`

---

```bash
# Create a new branch from main
git checkout -b feature/your-feature-name
```

Please use meaningful branch names:

- `feature/new-story-bs-a-cs-2`
- `feature/improve-beastshield-settings`
- `fix/documentation-typo`
- `translation/chinese-version`

---

### 4.3 进行修改 / Make Changes

#### 4.3.1 创作新故事 / Creating a New Story

1. 复制对应模板到正确位置
2. 修改文件夹名称和内部文件，遵循 v3.0 编码规范
3. 编写故事内容
4. 添加必要的图片和设定文件
5. **确保 `metadata.yaml` 文件包含 `form_type` 字段**

---

1. Copy the appropriate template to the correct location
2. Modify folder name and internal files, following v3.0 coding spec
3. Write story content
4. Add necessary images and setting files
5. **Ensure the `metadata.yaml` file includes the `form_type` field**

---

#### 4.3.2 提交更改 / Commit Changes

使用清晰的提交信息：

```bash
git add .
git commit -m "添加支线分章改编: bs-a-cs-2-dragon-quest"
git commit -m "修复野兽之盾设定中的地理矛盾"
git commit -m "为夜哨无声故事添加英文翻译"
```

---

Use clear commit messages:

```bash
git add .
git commit -m "Add side chaptered adaptation: bs-a-cs-2-dragon-quest"
git commit -m "Fix geographical contradictions in Beastshield settings"
git commit -m "Add English translation for Silent Night Watch story"
```

---

### 4.4 创建 Pull Request / Create a Pull Request

1. 将分支推送到你的 fork 仓库
2. 访问原始项目页面
3. 点击 "New Pull Request" 按钮
4. 选择正确的基础分支（通常是 main）和比较分支
5. 填写 Pull Request 描述

---

1. Push your branch to your forked repository
2. Visit the original project page
3. Click the "New Pull Request" button
4. Select the correct base branch (usually main) and compare branch
5. Fill in the Pull Request description

---

### 4.5 Pull Request 模板 / Pull Request Template

请按照以下模板填写 Pull Request 描述：

```markdown
## 变更类型

- [ ] 新故事创作
- [ ] 设定完善
- [ ] 翻译工作
- [ ] 问题修复
- [ ] 文档改进
- [ ] 其他

## 相关世界观

- [ ] beastshield
- [ ] beastshield-paradise
- [ ] beastshield-reforged
- [ ] beastshield-online
- [ ] beastman-prototype
- [ ] empire-kik-soldiers
- [ ] paradise-kik-soldiers
- [ ] random
- [ ] united-beasts-alliance
- [ ] worldstrider-infinity

## 变更描述

详细描述你的变更内容...

## 检查清单

- [ ] 已阅读并遵守行为准则
- [ ] 遵循 v3.0 作品编码规范（自然数序号，cm/cs/s形式类型）
- [ ] 使用正确的模板
- [ ] 元数据完整准确（包含form_type字段）
- [ ] 故事内容完整
- [ ] 图片命名符合规范

## 测试说明

如何测试或验证你的变更...

## 截图（如适用）

添加相关截图...
```

---

Please fill in the Pull Request description according to the following template:

```markdown
## Change Type

- [ ] New story creation
- [ ] Settings improvement
- [ ] Translation work
- [ ] Bug fix
- [ ] Documentation improvement
- [ ] Other

## Related World

- [ ] beastshield
- [ ] beastshield-paradise
- [ ] beastshield-reforged
- [ ] beastshield-online
- [ ] beastman-prototype
- [ ] empire-kik-soldiers
- [ ] paradise-kik-soldiers
- [ ] random
- [ ] united-beasts-alliance
- [ ] worldstrider-infinity

## Change Description

Describe your changes in detail...

## Checklist

- [ ] Read and followed the Code of Conduct
- [ ] Followed v3.0 work coding spec (natural numbers, cm/cs/s form types)
- [ ] Used correct templates
- [ ] Metadata is complete and accurate (includes form_type field)
- [ ] Story content is complete
- [ ] Image naming follows conventions

## Testing Instructions

How to test or verify your changes...

## Screenshots (if applicable)

Add relevant screenshots...
```

---

## 5. 质量要求 / Quality Requirements

### 5.1 作品质量 / Work Quality

所有提交的作品应满足以下要求：

- **内容完整**：故事有明确的开始、发展和结束
- **设定一致**：与世界观设定保持一致，如有偏离需明确说明
- **语言质量**：文字通顺，无明显语法错误
- **格式规范**：使用正确的Markdown格式

---

All submitted works should meet the following requirements:

- **Complete Content**: Stories should have clear beginning, development, and ending
- **Setting Consistency**: Consistent with world settings, any deviations should be clearly
  explained
- **Language Quality**: Fluent text, no obvious grammatical errors
- **Format Standards**: Use correct Markdown formatting

---

### 5.2 文件质量 / File Quality

- **元数据完整**：`metadata.yaml` 文件必须完整填写，包含必填的 `form_type` 字段
- **README清晰**：`README.md` 应清晰介绍作品
- **图片优化**：图片文件大小适中，命名规范
- **结构正确**：目录结构和文件放置位置正确

---

- **Complete Metadata**: The `metadata.yaml` file must be fully filled, including the required
  `form_type` field
- **Clear README**: `README.md` should clearly introduce the work
- **Optimized Images**: Image file sizes should be moderate, with standardized naming
- **Correct Structure**: Directory structure and file placement should be correct

---

### 5.3 合规性 / Compliance

- **授权明确**：确保你有权使用所有提交的内容
- **标注清晰**：改编作品需明确标注基于哪个原作
- **版权尊重**：不侵犯他人版权

---

- **Clear Authorization**: Ensure you have the right to use all submitted content
- **Clear Attribution**: Adapted works should clearly indicate which original work they are based on
- **Respect Copyright**: Do not infringe on others' copyright

---

### 5.4 校验工具 / Verification Tooling

仓库自带一组一致性校验脚本，位于 [`scripts/qa/`](scripts/qa/)。**它们不替代人工审阅，但能挡住绝大多数低级错误**，
尤其是当改动涉及批量文件（一次录入多章、批量建档）时。

提交前建议依次运行（全部为只读，退出码 `0` = 通过、`1` = 有问题）：

```bash
node scripts/qa/check-format.js <世界观目录>        # 故事文件是否符合 docs/spec/11-story-format.md
node scripts/qa/check-index.js  <characters 目录>   # 三级索引的表行数是否等于档案文件数
node scripts/qa/check-links.js  <目录>              # Markdown 相对链接是否可解析
node scripts/qa/check-quotes.js <characters 目录> <chaptered-stories 目录>   # 档案引用是否真的来自正文
node scripts/qa/count-archives.js <characters 目录> # 统计各兽种/等级档案数，供校对总索引计数
node scripts/qa/scan-punctuation.js <目录>          # 扫描汉字后的半角标点（区分引用块 / 自撰）
node scripts/qa/sync-tables.js <beastshield-company 目录> [--write]   # 把未挂进索引的档案补进等级表 / 兽种表
```

用法、参数与注意事项详见 [`scripts/qa/README.md`](scripts/qa/README.md)。

**两点务必注意：**

- `scan-punctuation.js` 的结果**不能直接拿来改**。本仓库的正文本身就使用半角冒号，
  档案引用块内的半角标点多为**忠实转录**，改成全角反而破坏原文保真。只有**档案自撰**部分才适用
  「中文标点用中文」。
- 档案的「登场原文」要求**逐字引用正文，包括正文自身的错别字与标点**。发现正文有误时，
  不要「顺手改正」引用，应保留原样并另加备注说明。

---

The repository ships a set of consistency-checking scripts under [`scripts/qa/`](scripts/qa/).
They do not replace human review, but they catch the vast majority of low-level mistakes — especially
when a change touches many files at once.

Run them before submitting (all read-only; exit code `0` = pass, `1` = problems found):

```bash
node scripts/qa/check-format.js <world dir>
node scripts/qa/check-index.js  <characters dir>
node scripts/qa/check-links.js  <dir>
node scripts/qa/check-quotes.js <characters dir> <chaptered-stories dir>
node scripts/qa/count-archives.js <characters dir>
node scripts/qa/scan-punctuation.js <dir>
node scripts/qa/sync-tables.js <beastshield-company dir> [--write]
```

See [`scripts/qa/README.md`](scripts/qa/README.md) for usage and caveats.

**Two important notes:**

- Do **not** act directly on the output of `scan-punctuation.js`. The original prose in this repository
  itself uses half-width colons, so half-width punctuation inside quoted blocks is usually a faithful
  transcription; converting it would break fidelity to the source text.
- Character archives must quote the original text **verbatim, including its own typos and punctuation**.
  If you spot an error in the source, do not silently "fix" the quotation — keep it and add a note.

---

## 6. 审核流程 / Review Process

### 6.1 自动检查 / Automatic Checks

提交 Pull Request 后，将自动运行以下检查：

- 文件结构检查
- 命名规范验证（v3.0 格式）
- 元数据完整性检查（包含 form_type 字段）

---

After submitting a Pull Request, the following checks will run automatically:

- File structure check
- Naming convention verification (v3.0 format)
- Metadata completeness check (includes form_type field)

---

### 6.2 人工审核 / Manual Review

项目维护者将进行人工审核，重点关注：

- 内容质量和原创性
- 设定一致性
- 社区规范符合性
- 整体贡献价值
- v3.0 格式符合性

---

Project maintainers will conduct manual reviews, focusing on:

- Content quality and originality
- Setting consistency
- Compliance with community standards
- Overall contribution value
- v3.0 format compliance

---

### 6.3 审核时间 / Review Time

- 简单变更：通常在1-3个工作日内审核
- 复杂作品：可能需要1-2周时间
- 重大贡献：维护者会与贡献者保持沟通

---

- Simple changes: Usually reviewed within 1-3 working days
- Complex works: May take 1-2 weeks
- Major contributions: Maintainers will communicate with contributors

---

### 6.4 反馈与修改 / Feedback and Revisions

审核过程中可能会要求修改：

1. 维护者提出修改建议
2. 贡献者进行修改
3. 重新提交审核
4. 审核通过后合并

---

Revisions may be requested during the review process:

1. Maintainers suggest revisions
2. Contributors make revisions
3. Resubmit for review
4. Merge after approval

---

## 7. 成为常驻贡献者 / Becoming a Regular Contributor

### 7.1 贡献者等级 / Contributor Levels

根据贡献程度，贡献者可分为：

1. **新手贡献者**：完成第一个被接受的贡献
2. **活跃贡献者**：完成3个以上高质量贡献
3. **核心贡献者**：被邀请加入维护者团队

---

Based on contribution level, contributors can be categorized as:

1. **New Contributor**: Completed first accepted contribution
2. **Active Contributor**: Completed 3+ high-quality contributions
3. **Core Contributor**: Invited to join the maintainer team

---

### 7.2 权限与责任 / Permissions and Responsibilities

不同等级的贡献者享有不同的权限：

- **所有贡献者**：可提交作品、报告问题、提出建议
- **活跃贡献者**：可协助审核简单Pull Request
- **核心贡献者**：可直接合并Pull Request、管理项目设置

---

Contributors at different levels have different permissions:

- **All Contributors**: Can submit works, report issues, make suggestions
- **Active Contributors**: Can assist in reviewing simple Pull Requests
- **Core Contributors**: Can directly merge Pull Requests, manage project settings

---

### 7.3 如何成长 / How to Grow

- 从简单的贡献开始，如修复错别字、完善文档
- 逐步尝试更复杂的任务，如创作短篇故事
- 积极参与社区讨论和问题解答
- 帮助新贡献者熟悉项目

---

- Start with simple contributions, such as fixing typos, improving documentation
- Gradually try more complex tasks, such as creating short stories
- Actively participate in community discussions and problem-solving
- Help new contributors familiarize themselves with the project

---

## 8. 常见问题 / Frequently Asked Questions

### 8.1 我可以创作什么类型的故事？ / What kind of stories can I create?

您可以在现有世界观框架内创作任何类型的故事，包括：

- 冒险、战斗、奇幻
- 日常、浪漫、悬疑
- 喜剧、悲剧、正剧

唯一的要求是尊重世界观的基本设定。

---

You can create any type of story within the existing world framework, including:

- Adventure, combat, fantasy
- Slice of life, romance, mystery
- Comedy, tragedy, drama

The only requirement is to respect the basic settings of the world.

---

### 8.2 如果我想修改原作设定怎么办？ / What if I want to modify original settings?

您可以通过以下方式处理设定修改：

1. 在 `settings/2-story-variants/` 中记录您的特殊设定
2. 在作品元数据中说明设定偏离
3. 通过 Issues 或讨论区提出设定改进建议

---

You can handle setting modifications in the following ways:

1. Record your special settings in `settings/2-story-variants/`
2. Explain setting deviations in work metadata
3. Propose setting improvements through Issues or discussion forums

---

### 8.3 我可以使用AI辅助创作吗？ / Can I use AI-assisted creation?

可以，但需要遵守以下原则：

- 必须进行充分的人工编辑和修改
- 确保内容的原创性和质量
- 在元数据中标注使用了AI辅助
- 您对最终内容负全部责任

---

Yes, but the following principles must be followed:

- Must be sufficiently edited and modified by humans
- Ensure content originality and quality
- Indicate AI assistance in metadata
- You are fully responsible for the final content

---

### 8.4 我的作品会被拒绝吗？可能的原因是什么？ / Will my work be rejected? What are possible reasons?

作品可能被拒绝的原因包括：

- 违反行为准则
- 严重偏离世界观设定且无合理解释
- 内容质量不符合标准
- 侵犯他人版权
- 未遵循 v3.0 编码规范或文件结构

如果作品被拒绝，维护者会提供具体原因和改进建议。

---

Reasons why work may be rejected include:

- Violation of the Code of Conduct
- Severe deviation from world settings without reasonable explanation
- Content quality does not meet standards
- Infringement of others' copyright
- Failure to follow v3.0 coding spec or file structure

If work is rejected, maintainers will provide specific reasons and improvement suggestions.

---

### 8.5 v3.0 有哪些重要变更？ / What are the important changes in v3.0?

v3.0 引入了以下重要变更：

1. **分层规范体系**：将原有臃肿的规范文档拆分为 6 份精简的 `docs/spec/` 规范
2. **作品编码规范**：明确 `[世界观]-[性质]-[形式]-[序号]-[标识名]` 五段式编码
3. **过程文件隔离**：引入 `.process/` 目录统一存放 `ai-discussion/`、`plan/`、`history/`、`design/`
4. **中间文档规范**：首次定义 README、settings、版本迭代文件的命名和内容标准
5. **双语作品组织**：默认按作品聚合，中文版放根级，英文版放 `en/` 子目录

---

v3.0 introduces the following important changes:

1. **Layered spec system**: Split bloated legacy guides into 6 focused `docs/spec/` documents
2. **Work coding spec**: Formalized 5-part code format `[world]-[nature]-[form]-[sequence]-[identifier]`
3. **Process file isolation**: Introduced `.process/` directory for `ai-discussion/`, `plan/`, `history/`, `design/`
4. **Intermediate document spec**: First-time definition of README, settings, and versioning file standards
5. **Bilingual work organization**: Aggregate by work by default; Chinese at root, English in `en/` subdirectory

---

## 9. 获取帮助 / Getting Help

### 9.1 文档资源 / Documentation Resources

- [项目结构规范](docs/spec/01-project-structure.md)
- [作品编码规范](docs/spec/02-work-coding.md)
- [中间文档规范](docs/spec/03-intermediate-documents.md)
- [元数据规范](docs/spec/04-metadata.md)
- [故事格式规范](docs/spec/11-story-format.md)
- [内容指南](docs/spec/12-content-guidelines.md)

---

- [Project Structure Spec](docs/spec/01-project-structure.md)
- [Work Coding Spec](docs/spec/02-work-coding.md)
- [Intermediate Documents Spec](docs/spec/03-intermediate-documents.md)
- [Metadata Spec](docs/spec/04-metadata.md)
- [Story Format Spec](docs/spec/11-story-format.md)
- [Content Guidelines](docs/spec/12-content-guidelines.md)

---

### 9.2 社区支持 / Community Support

- GitHub Issues：报告问题或提问
- GitHub Discussions：参与讨论
- 项目维护者：直接联系维护者团队

---

- GitHub Issues: Report issues or ask questions
- GitHub Discussions: Participate in discussions
- Project Maintainers: Contact the maintainer team directly

---

### 9.3 学习资源 / Learning Resources

- 查看现有作品示例
- 参考模板文件
- 参与社区讨论学习最佳实践

---

- View existing work examples
- Refer to template files
- Participate in community discussions to learn best practices

---

## 10. 致谢 / Acknowledgments

### 10.1 贡献者名单 / Contributor List

所有贡献者将在以下位置获得认可：

- 项目README.md文件
- 专门的贡献者页面（待创建）
- 各作品元数据中的作者字段

---

All contributors will be recognized in the following locations:

- Project README.md file
- Dedicated contributors page (to be created)
- Author field in each work's metadata

---

### 10.2 特别感谢 / Special Thanks

我们特别感谢：

- 所有世界观的原作者
- 早期贡献者和测试者
- 提供宝贵反馈的社区成员

---

We especially thank:

- Original authors of all worlds
- Early contributors and testers
- Community members who provided valuable feedback

---

## 更新记录 / Update History

> **关于版本号**：`README.md`、`CONTRIBUTING.md`、`CODE_OF_CONDUCT.md` 的版本号**各自独立演进**——
> 只在该文档自身发生变更时递增，不与其它文档互相看齐。
> （v3.0 时曾约定三者统一版本号，但实践中各文档的更新节奏不同，此后不再强行对齐。）
> 因此本指南是 v3.1，而项目 README 可能是 v3.3 或更高，两者不一致是正常的。

- **2026-09-17 v3.1**：新增校验工具章节
    - 新增 §5.4 校验工具：说明 `scripts/qa/` 下的四项提交前检查（格式 / 索引 / 链接 / 引用来源）
    - 明确两点易错事项：引用块内的半角标点是**正文原样**不可擅改；
      正文自身的错别字也须**逐字照录**，不得"顺手修正"

- **2026-05-07 v3.0**：规范体系全面重构
    - 更新版本号为 v3.0，引用新的 `docs/spec/` 分层规范体系
    - 更新所有指南引用指向 6 份新规范文档
    - 更新命名规范描述为五段式编码 `[world]-[nature]-[form]-[sequence]-[identifier]`
    - 添加 `.process/` 过程文件目录说明
    - 更新 Pull Request 模板世界观列表为全部 7 个世界
    - 更新 FAQ 为 v3.0 变更说明

- **2025-12-15 v2.3.0**：更新以适配 v2.3.0 命名规范
    - 更新版本号为 v2.3.0
    - 更新所有引用的指南版本
    - 添加 v2.3.0 新特性说明（cm/cs/s 形式类型，自然数序号）
    - 更新示例代码和提交信息格式
    - 在检查清单中添加 form_type 字段验证
    - 添加 v2.3.0 FAQ 部分
    - 更新 Pull Request 模板中的检查项

- **2025-12-13 v2.0**：全面更新，适配新命名体系和模板指南
    - 重构整体结构，明确推荐从改编作品开始的创作路径
    - 更新所有命名规范，引用作品命名指南2.1.1
    - 更新模板使用说明，引用通用故事模板指南4.3
    - 增加作品晋升机制说明
    - 优化中英文对照格式，改善可读性
    - 更新Pull Request模板，增加相关检查项

- **2025-12-13 v1.0**：初始版本发布

---

*本文档最后更新于：2026年9月17日 · 文档版本：3.1*  
*Last updated: May 7, 2026 · Document Version: 3.0*
> **Deprecated**: 本文档已被 v3.0 规范替代。请参阅 `docs/spec/04-metadata.md`。本文档保留 6 个月作为过渡期兼容。

# **Metadata Guide for Beastkin Universe Projects v2.3.0**

```
================================================================================
  Beastkin Universe 项目元数据指南 v2.3.0 / Metadata Guide for Beastkin Universe v2.3.0
================================================================================
```

## **1. 介绍 / Introduction**

### **1.1 目的 / Purpose**

This guide provides detailed instructions for correctly filling out the `metadata.yaml` file in each
work directory.
Metadata serves as the "identity card" of a work, ensuring all work information is clear,
consistent, and verifiable.

本指南详细指导如何正确填写作品文件夹中的 `metadata.yaml` 文件。元数据是作品的"身份证"
，确保所有作品信息清晰、一致、可验证。

---

### **1.2 范围 / Scope**

This guide applies to all works in the Beastkin Universe project, including original works,
adaptations, and crossover
works. It is compatible with Naming Guide v2.3.0.

本指南适用于 Beastkin Universe 项目中的所有作品，包括原创作品、改编作品和跨界联动作品。兼容命名指南
v2.3.0。

---

### **1.3 相关文档 / Related Documents**

- [Project Structure Guide](../docs/project-structure-guide.md)
- [Work Naming Guide v2.3.0](../docs/work-naming-guide-chinese.md)
- [Universal Story Template Guide](../docs/universal-story-template-guide-chinese.md)
- [Metadata Template v2.3.0](../templates/world-template/work-template/common/metadata.yaml)
- [Metadata Schema v2.3.0](../.schemas/metadata-schema.json)

---

## **2. 基础结构 / Basic Structure**

### **2.1 文件概览 / File Overview**

Each `metadata.yaml` file consists of two main sections:

每个 `metadata.yaml` 文件包含两个主要部分：

1. **`work`** - Work information / 作品信息
2. **`creation`** - Creation information / 创作信息

---

### **2.2 文件位置 / File Location**

The `metadata.yaml` file must be placed in the root of each work directory.

`metadata.yaml` 文件必须放置在每个作品目录的根目录下。

```
完整作品编码文件夹/
├── metadata.yaml      # 元数据文件
├── README.md          # 作品介绍
├── ch-001-章节标题.md   # 章节内容
└── ...
```

---

### **2.3 文件格式 / File Format**

The file must be valid YAML format and conform to the JSON schema defined in `metadata-schema.json`.

文件必须是有效的 YAML 格式，并符合 `metadata-schema.json` 中定义的 JSON 架构。

---

## **3. 作品信息部分 / Work Information Section**

### **3.1 必填字段 / Required Fields**

#### **3.1.1 `code` - 作品编码 / Work Code**

- **Type / 类型**: String / 字符串
- **Description / 说明**: Complete work code, **must exactly match the folder name** /
  作品完整编码，**必须与文件夹名完全一致
  **
- **Example / 示例**: `bsp-o-cs-1-g-277-green-bull-azhuang`
- **Format / 格式**: `[世界观]-[性质]-[形式类型]-[自然数序号]-[系列名]`
- **Validation / 验证**: Must match pattern `^(bs|bsp|bsr|uba)-([oac])-(cm|cs|s)-\d+(-[a-z0-9-]+)?$`

---

#### **3.1.2 `title` - 作品标题 / Work Title**

- **Type / 类型**: Object / 对象
- **Required Subfields / 必填子字段**:
    - `chinese` - Chinese title / 中文标题 (String / 字符串)
    - `english` - English title / 英文标题 (String / 字符串)
- **Example / 示例**:
  ```yaml
  title:
    chinese: "夜哨无声"
    english: "Silent Night Watch"
  ```

---

#### **3.1.3 `format` - 作品格式 / Work Format**

- **Type / 类型**: String / 字符串
- **Allowed Values / 允许值**: `chaptered-story` (分章故事), `short-story` (短篇故事)
- **Example / 示例**: `chaptered-story`

---

#### **3.1.4 `form_type` - 形式类型 / Form Type**

- **Type / 类型**: String / 字符串
- **Allowed Values / 允许值**:
    - `cm` - Chaptered Main (主线分章故事)
    - `cs` - Chaptered Side (支线分章故事)
    - `s` - Short Story (短篇故事)
- **Note / 注意**: This is a new field introduced in v2.3.0 / 这是 v2.3.0 引入的新字段
- **Example / 示例**: `cs`

---

#### **3.1.5 `status` - 作品状态 / Work Status**

- **Type / 类型**: String / 字符串
- **Allowed Values / 允许值**:
    - `updating` - Work is being updated / 作品正在更新中
    - `completed` - Work is completed / 作品已完成
    - `abandoned` - Work is abandoned / 作品已弃置
- **Example / 示例**: `completed`

---

#### **3.1.6 `location` - 存储位置 / Storage Location**

- **Type / 类型**: String / 字符串
- **Allowed Values / 允许值**:
    - `original-archives` - Original works / 原创作品
    - `adaptation-works` - Adaptation works / 改编作品
- **Example / 示例**: `original-archives`

---

### **3.2 条件必填字段 / Conditionally Required Fields**

#### **3.2.1 `subtype` - 作品子类型 / Work Subtype**

- **Type / 类型**: String / 字符串
- **When Required / 何时需要**: Only required for chaptered stories (`format: "chaptered-story"`) /
  仅分章故事需要
- **Allowed Values / 允许值**: `main` (主线), `side` (支线)
- **Relationship with form_type / 与form_type的关系**:
    - `form_type: "cm"` → `subtype: "main"` (自动/automatically)
    - `form_type: "cs"` → `subtype: "side"` (自动/automatically)
- **Example / 示例**: `side`

---

### **3.3 可选字段 / Optional Fields**

#### **3.3.1 `promotion_status` - 晋升状态 / Promotion Status**

- **Type / 类型**: String / 字符串
- **Allowed Values / 允许值**:
    - `not_eligible` - Not eligible for promotion / 不适合晋升
    - `eligible` - Eligible for promotion / 适合晋升
    - `under_review` - Under review for promotion / 晋升审核中
    - `promoted` - Already promoted / 已晋升
- **Default / 默认**: `not_eligible`
- **Example / 示例**: `eligible`

---

#### **3.3.2 `work_type` - 作品类型细分 / Work Type Detail**

- **Type / 类型**: String / 字符串
- **Allowed Values / 允许值**:
    - `full-original` - Completely original work / 完全原创作品
    - `direct-adaptation` - Direct adaptation / 直接改编
    - `adapted-expansion` - Adaptation with expansion / 改编扩展
    - `inspired-by` - Inspired by existing work / 灵感来源于
    - `crossover` - Crossover work / 跨界联动
- **Example / 示例**: `adapted-expansion`

---

#### **3.3.3 `tags` - 作品标签 / Work Tags**

- **Type / 类型**: Array of strings / 字符串数组
- **Description / 说明**: Tags for categorization and search / 用于分类和搜索的标签
- **Format / 格式**: kebab-case (lowercase letters, numbers, hyphens) / 小写字母、数字、连字符
- **Example / 示例**: `["redemption", "rescue", "new-beginning"]`

---

#### **3.3.4 `inspiration_sources` - 灵感来源 / Inspiration Sources**

- **Type / 类型**: Array of objects / 对象数组
- **Description / 说明**: For works with multiple inspiration sources / 用于有多个灵感来源的作品
- **Example / 示例**:
  ```yaml
  inspiration_sources:
    - type: "direct-adaptation"
      original_code: "bs-o-s-6-night-raid"
      description: "Adapted from 'Night Raid', reconstructed core plot"
    - type: "character"
      reference: "Beastshield Bull Beastkin Soldier"
      description: "Character setting references bull beastkin settings in Beastshield universe"
  ```

---

#### **3.3.5 `content_warnings` - 内容警告 / Content Warnings**

- **Type / 类型**: Array of strings / 字符串数组
- **Description / 说明**: Warnings for sensitive content / 敏感内容警告
- **Example / 示例**: `["violence", "sexual-content", "dark-themes"]`

---

#### **3.3.6 `reading_time_estimate` - 阅读时间估计 / Reading Time Estimate**

- **Type / 类型**: Object / 对象
- **Description / 说明**: Estimated reading time in minutes / 估计阅读时间（分钟）
- **Example / 示例**:
  ```yaml
  reading_time_estimate:
    minutes: 45
  ```

---

## **4. 创作信息部分 / Creation Information Section**

### **4.1 必填字段 / Required Fields**

#### **4.1.1 `author` - 作者 / Author**

- **Type / 类型**: String / 字符串
- **Description / 说明**: Author name or ID / 作者名称或ID
- **Example / 示例**: `memetic-singularity`

---

#### **4.1.2 `start_date` - 开始日期 / Start Date**

- **Type / 类型**: String / 字符串
- **Format / 格式**: `YYYY-MM-DD`
- **Example / 示例**: `2025-12-15`

---

### **4.2 推荐字段 / Recommended Fields**

#### **4.2.1 `last_update` - 最后更新日期 / Last Update Date**

- **Type / 类型**: String / 字符串
- **Format / 格式**: `YYYY-MM-DD`
- **Description / 说明**: Should be updated when work is modified / 作品修改时应更新此字段
- **Example / 示例**: `2025-12-15`

---

#### **4.2.2 `universe_based_on` - 基于的世界观 / Universe Based On**

- **Type / 类型**: String / 字符串
- **Allowed Values / 允许值**:
    - `beastshield` - Beastshield universe / 兽盾世界观
    - `beastshield-reforged` - Beastshield Reforged universe / 兽盾新纪元世界观
    - `united-beasts-alliance` - United Beasts Alliance universe / 万兽盟世界观
    - `beastshield-paradise` - Beastshield Paradise universe / 兽盾乐园世界观
    - `mixed` - Mixed or crossover universe / 混合或跨界世界观
- **Example / 示例**: `beastshield-paradise`

---

### **4.3 可选字段 / Optional Fields**

#### **4.3.1 `adaptation_info` - 改编信息 / Adaptation Information**

- **Type / 类型**: Object / 对象
- **When Required / 何时需要**: Required for adaptation works / 改编作品必填
- **Subfields / 子字段**:
    - `original_work` - Original work code / 原作品编码 (String / 字符串)
    - `original_title` - Original work title / 原作品标题 (String / 字符串)
    - `original_author` - Original author / 原作者 (String / 字符串, optional / 可选)
    - `adaptation_approach` - Adaptation approach / 改编方法 (String / 字符串)
        - Allowed values / 允许值: `faithful` (忠实), `reimagined` (重新想象), `loose` (松散改编),
          `theme-inversion` (
          主题反转)
    - `key_changes` - Summary of key changes / 关键变更总结 (String / 字符串, multi-line / 多行文本)
- **Example / 示例**:
  ```yaml
  adaptation_info:
    original_work: "bs-o-s-6-night-raid"
    original_title: "夜袭"
    adaptation_approach: "theme-inversion"
    key_changes: |
      1. Protagonist changed from tormentor to redeemer
      2. Theme changed from dark curiosity to gentle healing
      3. Ending changed from death to new life
      4. Added complete prequel and epilogue chapters
  ```

---

#### **4.3.2 `collaborators` - 合作者 / Collaborators**

- **Type / 类型**: Array of objects / 对象数组
- **Description / 说明**: For multi-author collaborative works / 用于多作者合作作品
- **Example / 示例**:
  ```yaml
  collaborators:
    - name: "Collaborator1"
      role: "co-writer"
      contribution: "Assisted with plot development"
    - name: "Collaborator2"
      role: "editor"
      contribution: "Performed text polishing and proofreading"
  ```

---

#### **4.3.3 `translator` - 翻译者 / Translator**

- **Type / 类型**: String / 字符串
- **When Required / 何时需要**: Required for translation works / 翻译作品需要
- **Example / 示例**: `translator-name`

---

#### **4.3.4 `crossover_info` - 跨界联动信息 / Crossover Information**

- **Type / 类型**: Object / 对象
- **When Required / 何时需要**: Required when `universe_based_on: "mixed"` / 当 `universe_based_on`
  为 `mixed` 时需要
- **Subfields / 子字段**:
    - `universes` - List of universes involved / 涉及的世界观列表 (Array of strings / 字符串数组)
    - `primary_universe` - Primary universe of the work / 作品的主要世界观 (String / 字符串)
- **Example / 示例**:
  ```yaml
  crossover_info:
    universes:
      - "beastshield"
      - "united-beasts-alliance"
    primary_universe: "beastshield"
  ```

---

#### **4.3.5 `license` - 许可信息 / License Information**

- **Type / 类型**: Object / 对象
- **Description / 说明**: Licensing information for the work / 作品的许可协议信息
- **Example / 示例**:
  ```yaml
  license:
    type: "CC-BY-NC-SA-4.0"
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
  ```

---

#### **4.3.6 `publication` - 发布信息 / Publication Information**

- **Type / 类型**: Object / 对象
- **Description / 说明**: Where the work is published / 作品发布的地点
- **Example / 示例**:
  ```yaml
  publication:
    platforms:
      - "GitHub Repository"
      - "AO3"
    primary_platform: "GitHub Repository"
    urls:
      - "https://github.com/beastkin-universe"
  ```

---

## **5. 特殊情况 / Special Cases**

### **5.1 改编自多个来源的作品 / Works Adapted from Multiple Sources**

For works inspired by multiple original works, use the `inspiration_sources` field.

对于灵感来源于多个原作的作品，使用 `inspiration_sources` 字段。

**Example / 示例**:

```yaml
work:
  work_type: "inspired-by"
  inspiration_sources:
    - type: "direct-adaptation"
      original_code: "bs-o-s-6-night-raid"
      description: "Adapted from 'Night Raid', reconstructed core plot"
    - type: "character"
      reference: "Beastshield Bull Beastkin Soldier"
      description: "Character setting references bull beastkin settings in Beastshield universe"
```

---

### **5.2 跨界联动作品 / Crossover Works**

For works that are crossovers between different universes.

对于不同世界观之间的跨界联动作品。

**Example / 示例**:

```yaml
work:
  code: "bs-c-cs-1-beasts-meet"
  title:
    chinese: "兽盾与万兽盟的相遇"
    english: "When Beastshield Meets UBA"
  form_type: "cs"
  work_type: "crossover"
  tags: [ "crossover", "beastshield", "uba", "encounter" ]

creation:
  universe_based_on: "mixed"
  crossover_info:
    universes:
      - "beastshield"
      - "united-beasts-alliance"
    primary_universe: "beastshield"
```

---

### **5.3 多作者合作作品 / Multi-Author Collaborative Works**

For works created by multiple authors.

对于由多位作者创作的作品。

**Example / 示例**:

```yaml
creation:
  author: "Main Author"
  collaborators:
    - name: "Collaborator1"
      role: "co-writer"
      contribution: "Assisted with plot design and character development"
    - name: "Collaborator2"
      role: "editor"
      contribution: "Performed text polishing and proofreading"
```

---

## **6. 验证与检查 / Validation and Checking**

### **6.1 格式验证 / Format Validation**

All `metadata.yaml` files must pass the following validations:

所有 `metadata.yaml` 文件必须通过以下验证：

1. **Valid YAML syntax** - No syntax errors / YAML语法正确 - 无语法错误
2. **Conforms to JSON Schema** - Meets specifications in `metadata-schema.json` / 符合JSON架构 - 符合
   `metadata-schema.json` 中的规范
3. **Complete required fields** - All required fields are filled / 必要字段完整 - 所有必填字段都已填写
4. **Code consistency** - `code` field exactly matches folder name / 编码一致 - `code` 字段与文件夹名完全一致
5. **Form type validation** - `form_type` is one of `cm`/`cs`/`s` / 形式类型验证 - `form_type` 必须是
   `cm`/`cs`/`s` 之一

---

### **6.2 常见错误 / Common Errors**

| Error / 错误                                   | Cause / 原因                                                                        | Solution / 解决方法                                                           |
|----------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| `code` mismatch / `code` 不匹配                 | Folder name doesn't match `code` field / 文件夹名与 `code` 字段不一致                       | Ensure `code` exactly matches folder name / 确保 `code` 与文件夹名完全相同           |
| Missing required fields / 缺少必填字段             | Required fields not filled / 必填字段未填写                                              | Refer to this guide to fill all required fields / 参考本指南填写所有必填字段           |
| Invalid date format / 日期格式错误                 | Date not in `YYYY-MM-DD` format / 日期不是 `YYYY-MM-DD` 格式                            | Use correct date format / 使用正确日期格式                                        |
| Invalid enum value / 无效枚举值                   | Value not in allowed list / 使用了不在允许列表中的值                                          | Refer to allowed values list in this guide / 参考本指南的允许值列表                  |
| Form type and subtype mismatch / 形式类型与子类型不匹配 | Incorrect combination of `form_type` and `subtype` / `form_type` 和 `subtype` 组合错误 | Follow automatic relationship: cm→main, cs→side / 遵循自动关系：cm→main, cs→side |
| Invalid code format / 编码格式错误                 | Code doesn't match new v2.3.0 format / 编码不符合 v2.3.0 新格式                           | Update code to use natural numbers and cm/cs/s / 更新编码使用自然数和 cm/cs/s       |

---

## **7. 最佳实践 / Best Practices**

### **7.1 文件命名一致性 / File Naming Consistency**

- Folder name = `work.code` field / 文件夹名 = `work.code` 字段
- For chaptered stories: `ch-{chapter-number}-{chapter-title}.md` / 章节文件名格式：
  `ch-{章节号}-{章节标题简写}.md`
- For short stories: `{work-code}.md` / 短篇文件名格式：`{作品编码}.md`

---

### **7.2 状态管理 / Status Management**

- Update `last_update` field when updating work / 更新作品时，同时更新 `last_update` 字段
- Change `status` to `completed` when work is finished / 作品完成后，将 `status` 改为 `completed`
- Set `promotion_status` to `eligible` for high-quality works / 高质量作品可设置为
  `promotion_status: "eligible"`

---

### **7.3 改编作品的特殊处理 / Special Handling for Adaptation Works**

- Adaptation works **must** fill `adaptation_info` / 改编作品**必须**填写 `adaptation_info`
- Explain relationship with original work in `README.md` / 在 `README.md` 中说明与原作的关系
- Respect original work, maintain consistency with core settings during adaptation /
  尊重原作，在改编时保持核心设定的一致性

---

### **7.4 标签使用建议 / Tag Usage Suggestions**

Use tags to improve work discoverability.

使用标签提高作品的可发现性。

| Category / 标签类别        | Example Tags / 示例标签                                     |
|------------------------|---------------------------------------------------------|
| Theme / 主题             | `redemption` (救赎), `dark` (黑暗), `adventure` (冒险)        |
| Emotion / 情感           | `wholesome` (治愈), `emotional` (情感), `tragic` (悲剧)       |
| Type / 类型              | `rescue` (救援), `training` (训练), `daily-life` (日常)       |
| Character / 角色         | `bull` (牛), `wolf` (狼), `tiger` (虎), `bear` (熊)         |
| Uniform / 制服           | `green-uniform` (绿制服), `black-uniform` (黑制服)            |
| Adaptation Type / 改编类型 | `adapted-from-dark` (改编自黑暗原作), `theme-inversion` (主题反转) |

---

## **8. 示例 / Examples**

### **8.1 完全原创作品 / Completely Original Work**

```yaml
work:
  code: "bsp-o-cs-2-new-original-story"
  title:
    chinese: "全新原创故事"
    english: "Brand New Original Story"
  format: "chaptered-story"
  form_type: "cs"
  subtype: "side"
  status: "updating"
  location: "original-archives"
  promotion_status: "not_eligible"
  work_type: "full-original"
  tags: [ "original", "adventure", "character-growth" ]

creation:
  author: "Author Name"
  start_date: "2025-12-16"
  last_update: "2025-12-16"
  universe_based_on: "beastshield-paradise"
```

---

### **8.2 改编扩展作品（示例：《夜哨无声》） / Adapted Expansion Work (Example: "Silent Night Watch")**

```yaml
work:
  code: "bsp-o-cs-1-g-277-green-bull-azhuang"
  title:
    chinese: "夜哨无声"
    english: "Silent Night Watch"
  format: "chaptered-story"
  form_type: "cs"
  subtype: "side"
  status: "completed"
  location: "original-archives"
  promotion_status: "eligible"
  work_type: "adapted-expansion"
  tags: [ "redemption", "rescue", "new-beginning", "adapted-from-dark" ]

creation:
  author: "memetic-singularity"
  start_date: "2025-12-15"
  last_update: "2025-12-15"
  universe_based_on: "beastshield-paradise"
  adaptation_info:
    original_work: "bs-o-s-6-night-raid"
    original_title: "夜袭"
    adaptation_approach: "theme-inversion"
    key_changes: |
      1. Protagonist changed from tormentor to redeemer
      2. Theme changed from dark curiosity to gentle healing
      3. Ending changed from death to new life
      4. Added complete prequel and epilogue chapters
```

---

### **8.3 直接改编作品 / Direct Adaptation Work**

```yaml
work:
  code: "bs-a-cs-1-faithful-adaptation"
  title:
    chinese: "忠实改编故事"
    english: "Faithful Adaptation Story"
  format: "chaptered-story"
  form_type: "cs"
  subtype: "side"
  status: "completed"
  location: "adaptation-works"
  promotion_status: "under_review"
  work_type: "direct-adaptation"

creation:
  author: "Adaptation Author"
  start_date: "2025-12-10"
  last_update: "2025-12-14"
  universe_based_on: "beastshield"
  adaptation_info:
    original_work: "bs-o-cm-1-main-story-1"
    original_title: "主线故事第一卷"
    adaptation_approach: "faithful"
    key_changes: "No significant changes, faithful adaptation of original work"
```

---

### **8.4 短篇故事 / Short Story**

```yaml
work:
  code: "bs-o-s-7-farm-inn-sequel"
  title:
    chinese: "农场旅馆续篇"
    english: "Farm Inn Sequel"
  format: "short-story"
  form_type: "s"
  status: "completed"
  location: "original-archives"
  promotion_status: "not_eligible"
  work_type: "full-original"
  tags: [ "sequel", "farm", "inn", "daily-life" ]

creation:
  author: "Author Name"
  start_date: "2025-12-20"
  last_update: "2025-12-20"
  universe_based_on: "beastshield"
```

---

## **9. 更新与维护 / Updates and Maintenance**

### **9.1 元数据更新 / Metadata Updates**

Update metadata when the following changes occur to the work:

当作品发生以下变化时，需要更新元数据：

1. **Adding new chapters** - Update `last_update` date / 添加新章节 - 更新 `last_update` 日期
2. **Work completion** - Change `status` to `completed` / 作品完结 - 将 `status` 改为 `completed`
3. **Work promotion** - Change `promotion_status` to `promoted` / 作品晋升 - 将 `promotion_status`
   改为 `promoted`
4. **Author change** - Update `author` or add `collaborators` / 作者变更 - 更新 `author` 或添加
   `collaborators`
5. **Title change** - Update `title` field / 标题变更 - 更新 `title` 字段
6. **Format change** - Update `form_type` and related fields / 格式变更 - 更新 `form_type` 及相关字段

---

### **9.2 版本控制 / Version Control**

It is recommended to explain metadata changes in Git commit messages.

建议在 Git 提交信息中说明元数据变更。

```bash
git commit -m "Update metadata: work completion status updated"
git commit -m "Fix metadata: correct spelling error in code field"
git commit -m "Update metadata: add form_type field for v2.3.0 compatibility"
```

---

### **9.3 迁移旧格式 / Migrating from Old Format**

If you have existing works with old format metadata (using `c`/`s` and three-digit numbers), update
them to v2.3.0
format:

如果您有使用旧格式（`c`/`s` 和三位数）的现有作品元数据，请更新到 v2.3.0 格式：

**Old format / 旧格式**: `bsp-o-c-001-g-277-green-bull-azhuang`
**New format / 新格式**: `bsp-o-cs-1-g-277-green-bull-azhuang`

Changes needed / 需要做的更改：

1. Replace `c` with `cm` or `cs` based on work type / 根据作品类型将 `c` 替换为 `cm` 或 `cs`
2. Use three-digit zero padding for all sequence numbers / 所有序号使用三位数补零
3. Add `form_type` field / 添加 `form_type` 字段

---

## **10. 帮助与支持 / Help and Support**

If you encounter problems:

如果遇到问题：

1. **Check examples** - Refer to existing work metadata in the project / 查看示例 - 参考项目中的现有作品元数据
2. **Use template** - Start with the metadata-template.yaml file / 使用模板 - 从
   metadata-template.yaml 文件开始
3. **Validation check** - Run validation script to see specific errors / 验证检查 - 运行验证脚本查看具体错误
4. **Consult documentation** - Refer to relevant documents in the `docs/` directory / 查阅文档 - 参考
   `docs/` 目录下的相关文档
5. **Community discussion** - Ask questions in the project discussion area / 社区讨论 - 在项目讨论区提问

---

## **11. 附录：v2.3.0 变更摘要 / Appendix: v2.3.0 Changes Summary**

| Change / 变更                                   | Old Format / 旧格式                          | New Format / 新格式                                                   | Reason / 原因                                              |
|-----------------------------------------------|-------------------------------------------|--------------------------------------------------------------------|----------------------------------------------------------|
| **Form type identifiers** / 形式类型标识            | `c` (chaptered), `s` (short)              | `cm` (chaptered-main), `cs` (chaptered-side), `s` (short)          | More precise classification / 更精确的分类                     |
| **Sequence numbers** / 序号                     | Three-digit (001, 002)                    | Natural numbers (1, 2, 3)                                          | Simpler, modern file system support / 更简单，现代文件系统支持       |
| **New required field** / 新必填字段                | None / 无                                  | `form_type` (cm/cs/s)                                              | Clearly indicate work type in metadata / 在元数据中明确标识作品类型   |
| **Automatic subtype determination** / 自动子类型确定 | Manual `subtype` setting / 手动设置 `subtype` | Automatically determined: cm→main, cs→side / 自动确定：cm→main, cs→side | Reduce errors, ensure consistency / 减少错误，确保一致性           |
| **Code pattern update** / 编码模式更新              | `^(...)-(...)-(c\|s)-\d{3}(...)?$`        | `^(...)-(...)-(cm\|cs\|s)-\d+(...)?$`                              | Support new form types and natural numbers / 支持新形式类型和自然数 |

---

*Last Updated / 最后更新: 2025-12-15*  
*Document Version / 文档版本: 2.3.0*  
*Compatible with Naming Guide / 兼容命名指南: v2.3.0*  
*Author / 作者: memetic-singularity*
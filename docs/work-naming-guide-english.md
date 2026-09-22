# Beastkin Universe Work Naming and Organization Guide 2.2.0

## 1. Introduction

This document defines the naming rules and organizational structure for all works within the
Beastkin Universe project.
All contributors creating new works must follow this guide. Updated according to the latest project
structure, this
guide ensures unified naming formats for all work types, uses natural number sequencing, and
standardizes the structure
of all chaptered stories.

## 2. Core Concept Definitions

Before diving into details, please understand the following core concepts:

### 2.1. Original Archives (`original-archives`)

Stores official works created by the **world's primary author** (or the project's core team). These
works form the core
narrative foundation of the world.

### 2.2. Adaptation Works (`adaptation-works`)

Stores **adaptation works** created by community contributors based on official works. These works
can be considered
derivations of the official world. Adaptation works can apply for **promotion** after completion and
receiving
recognition.

### 2.3. Promotion Pathways

- **Path 1: Promotion to Official Original Work**  
  Outstanding adaptation works can be fully **migrated** to the corresponding world's
  `original-archives`, becoming part
  of that world's official canon.
- **Path 2: Promotion to Independent World**  
  Particularly excellent adaptation works, if possessing complete and independent world settings,
  can apply to become a
  new world module under `worlds/`.

### 2.4. Unified Story Structure

All chaptered stories (whether main story, side stories, or character stories) adopt a **"folder +
internal chapters"**
structure:

- Each series (main story volume, side story series, character story) has its own folder
- Chapter files within folders are uniformly named `ch-three-digit-number-chapter-title.md`
- Chapter numbering starts from 1 and increments naturally

## 3. Work Coding System

Each work has a unique code for identification and organization. The code format is as follows:

```
[world]-[nature]-[format]-[natural-number-sequence]-[series-name]
```

### 3.1. Code Examples

```
bsp-o-c-1-g-277-green-bull-azhuang
│     │ │ │ │   │    └─ Series name (kebab-case, lowercase English with hyphens)
│     │ │ │ │   └─ Sequence number (natural number, starting from 1)
│     │ │ │ └─ Format (c=chaptered-story, s=short-story)
│     │ │ └─ Nature (a=adaptation, o=original, c=crossover)
│     │ └─ World abbreviation
│     └─ Chaptered story subtype (only for chaptered: main=main story, side=side story)
└─ Chapter file naming (inside folder): ch-001-last-watch.md
```

### 3.2. Field Descriptions

| Field           | Values                                                | Meaning                                    | Example                      |
|-----------------|-------------------------------------------------------|--------------------------------------------|------------------------------|
| **World**       | `bs`, `bsr`, `uba`, `bsp`                             | World abbreviation                         | `bsp` = beastshield paradise |
| **Nature**      | `a` = adaptation<br>`o` = original<br>`c` = crossover | Creation nature                            | `o` = original               |
| **Format**      | `c` = chaptered-story<br>`s` = short-story            | Work format                                | `c` = chaptered story        |
| **Sequence**    | `1`, `2`, `3`, ...                                    | Natural number sequence within same format | `1` = first work             |
| **Series Name** | kebab-case                                            | English name (lowercase with hyphens)      | `g-277-green-bull-azhuang`   |

### 3.3. World Abbreviation Reference Table

| Abbreviation | Full Name              | Description                  |
|--------------|------------------------|------------------------------|
| `bs`         | Beastshield            | Beastshield World            |
| `bsr`        | Beastshield Reforged   | Beastshield Reforged World   |
| `uba`        | United Beasts Alliance | United Beasts Alliance World |
| `bsp`        | Beastshield Paradise   | Beastshield Paradise World   |

## 4. Directory Structure

### 4.1. Original Works (`original-archives`)

Stores works created by official original authors, maintained by the project's core team.

```
worlds/world/original-archives/
├── chinese/                          # Chinese works
│   ├── chaptered-stories/            # Chaptered stories
│   │   ├── main/                     # Main story area
│   │   │   └── work-code-folder/     # Independent folder for each main story volume
│   │   │       ├── README.md
│   │   │       ├── metadata.yaml
│   │   │       ├── ch-001-chapter-title.md  # Unified chapter naming
│   │   │       ├── ch-002-chapter-title.md
│   │   │       └── ...
│   │   └── side/                     # Side story area
│   │       └── work-code-folder/     # Independent folder for each side story
│   │           ├── README.md
│   │           ├── metadata.yaml
│   │           ├── ch-001-chapter-title.md
│   │           └── ...
│   └── short-stories/                # Short stories
│       ├── world-code-o-s-1-work-name.md  # Files placed directly
│       ├── world-code-o-s-2-work-name.md
│       └── ...
└── english/                          # English works (same structure)
    ├── chaptered-stories/
    │   ├── main/
    │   └── side/
    └── short-stories/
```

### 4.2. Adaptation Works (`adaptation-works`)

Stores adaptation works created by community contributors, maintained by the community.

```
worlds/world/adaptation-works/
├── chaptered-stories/                # Chaptered stories directory
│   └── full-work-code/               # Independent folder for each work
│       ├── README.md
│       ├── metadata.yaml
│       ├── ch-001-chapter-title.md     # Identical format to original works
│       ├── ch-002-chapter-title.md
│       ├── settings/
│       │   └── story-setting.md
│       └── images/
└── short-stories/                    # Short stories directory
    └── full-work-code/               # Independent folder for each short story
        ├── README.md
        ├── metadata.yaml
        ├── full-work-code.md         # Short story content file
        ├── settings/
        │   └── story-setting.md
        └── images/
```

## 5. File Naming Standards

### 5.1. Core Principle: All Chaptered Stories Use "Folder + Internal Chapters" Structure

#### **All Chaptered Stories (Main, Side, Adaptation)**

- **Folder Naming**: `{world-code}-{nature}-c-{natural-number}-{series-name}`
- **Chapter File Naming** (inside folder):
  `ch-{natural-chapter-number}-{chapter-title-abbreviation}.md`

#### **Example Comparison:**

| Type                    | Folder Name                          | Chapter File Name          |
|-------------------------|--------------------------------------|----------------------------|
| **Main Story Volume 1** | `bs-o-c-1-first-volume`              | `ch-001-prologue.md`         |
| **Main Story Volume 2** | `bs-o-c-2-second-volume`             | `ch-001-new-beginnings.md`   |
| **Side Character 1**    | `bsp-o-c-1-g-277-green-bull-azhuang` | `ch-001-last-watch.md`       |
| **Side Character 2**    | `bsp-o-c-2-blue-wolf-dorian`         | `ch-001-desperate-choice.md` |
| **Adaptation Work**     | `bs-a-c-1-a-new-gamer`               | `ch-001-infiltration.md`     |

### 5.2. Short Story File Name Format

#### **Original Short Stories**

- **Format**: `{world-code}-o-s-{natural-number}-{work-name}.md`
- **Example**: `bs-o-s-1-farm-inn.md`
- **Location**: `original-archives/language/short-stories/`

#### **Adaptation Short Stories**

- **Format**: `{full-work-code}.md`
- **Example**: `bs-a-s-1-first-blood.md`
- **Location**: `adaptation-works/short-stories/{full-work-code}/`

### 5.3. Special Notes

1. **Natural Number Sequencing**: All sequence numbers use natural numbers (1, 2, 3...), no zero
   padding needed. Modern
   file systems correctly sort `-1-`, `-2-`, `-12-`.
2. **Unified Chapter Naming**: Chapter files within folders uniformly start with `ch-`, maintaining
   consistent format.
3. **Title Abbreviation Rules**:
    - English lowercase, connected with hyphens
    - Concise and clear, reflecting the chapter's core content
    - Avoid special characters and spaces
4. **Unified Structure for Main and Side Stories**: Both main story volumes and side stories adopt
   the same folder
   structure, facilitating management and expansion.

## 6. Work Promotion Mechanism

### 6.1. Promotion from Adaptation Work to Original Work

When a community adaptation work meets the following conditions, it can apply for promotion to
`original-archives`:

1. **Completion Status**: The work is complete.
2. **Quality Excellence**: Widely recognized by the community.
3. **Setting Consistency**: No conflicts with the original world's settings.
4. **Stable Maintenance**: Has a stable maintainer.
5. **Clear Authorization**: All contributors agree to the work transfer.

### 6.2. Promotion from Adaptation Work to Independent World

When an adaptation work meets the following conditions, it can apply to become an independent world:

1. **Complete World Building**: Possesses a complete, independent setting system.
2. **Mature Narrative**: Has a complete narrative structure and character system.
3. **Community Recognition**: Has widespread influence within the community.
4. **Maintenance Team**: Has a stable maintenance and development team.
5. **Clear Authorization**: All contributors agree to world independence.

### 6.3. Promotion Process

1. **Application**: Work maintainer submits a promotion application.
2. **Review**: Core team reviews work quality.
3. **Migration**: Migrate work from `adaptation-works` to target location.
4. **Renaming**: Rename files as needed to comply with new location's naming rules.
5. **Update**: Update all relevant links and navigation.
6. **Announcement**: Announce promotion results to the community.

## 7. File Standards

### 7.1. Required Files

#### Chaptered Story Directory Structure (Applies to All Types)

```
full-work-code-folder/
├── README.md                     # Work introduction
├── metadata.yaml                 # Metadata
├── ch-001-chapter-title.md        # Chapter 1
├── ch-002-chapter-title.md        # Chapter 2
├── settings/
│   └── story-setting.md         # Story-specific settings
└── images/                      # Image resource directory
```

#### Short Story Directory Structure (Only for Adaptations)

```
full-work-code-folder/
├── README.md
├── metadata.yaml
├── full-work-code.md            # Short story content file
├── settings/
│   └── story-setting.md
└── images/
```

### 7.2. Metadata File (metadata.yaml)

```yaml
# Work metadata
work:
  code: "bsp-o-c-1-g-277-green-bull-azhuang"  # Work code (folder name)
  title:
    chinese: "夜哨无声——牛兽人阿壮的故事"      # Chinese title
    english: "Silent Night Watch"             # English title
  format: "chaptered-story"                   # Chaptered-story / short-story
  subtype: "side"                             # main/side (only for chaptered stories)
  status: "updating"                          # updating / completed
  location: "original-archives"               # Storage location
  promotion_status: "n/a"                     # Promotion status (n/a/eligible/under_review/promoted)

# Creation information
creation:
  author: "Author Name"                        # Author name
  start_date: "2025-12-15"                    # Start date
  last_update: "2025-12-15"                   # Last update date
  based_on: "beastshield"                     # Based on which world (needed for adaptations)
```

### 7.3. README.md Template

```markdown
# [Work Title]

## Basic Information

- **Code**: `bsp-o-c-1-g-277-green-bull-azhuang`
- **Status**: Updating
- **Location**: original-archives (original work)
- **Type**: Chaptered story - side story
- **Author**: Author Name
- **Start Date**: 2025-12-15

## Story Synopsis

Write story synopsis here...

## Chapter List

- [Chapter 1: Last Watch](`ch-001-last-watch.md`)
- [Chapter 2: Stranger in Folded Time](`ch-002-stranger-in-folded-time.md`)

## Setting Notes

This story uses the following special settings:

- [View Detailed Settings](`settings/story-setting.md`)
```

## 8. Steps to Create New Work

### 8.1. Creating Original Chaptered Stories (Core Team)

1. **Determine Work Information**
    - Select world (bs/bsr/uba/bsp)
    - Determine work nature (original uses o)
    - Determine type (main story main / side story side)
    - Determine sequence number (check existing works, use next natural number)
    - Determine series name (English kebab-case)

2. **Create Folder and Files**
    - Create folder at corresponding location:
      `original-archives/language/chaptered-stories/[main or side]/`
    - Create chapter files inside folder: `ch-001-chapter-title.md`
    - Create auxiliary files: `README.md`, `metadata.yaml`, `settings/story-setting.md`

3. **Use Correct Naming Format**
    - Folder: `{world}-o-c-{natural-number}-{series-name}`
    - Chapter files: `ch-{natural-number}-{chapter-title-abbreviation}.md`

### 8.2. Creating Original Short Stories

1. **Determine Work Information**
    - Select world
    - Determine sequence number (check existing short stories, use next natural number)
    - Determine work name (English kebab-case)

2. **Create Files**
    - Create file in `original-archives/language/short-stories/`
    - File name: `{world}-o-s-{natural-number}-{work-name}.md`

### 8.3. Creating Adaptation Works (Community Contributors)

1. **Determine Work Information**
    - Select world (bs/bsr/uba/bsp)
    - Determine work nature (adaptation uses a)
    - Select format (chaptered story c / short story s)
    - Determine sequence number (check existing adaptation works, use next natural number)
    - Determine work name (English kebab-case)

2. **Create Work Directory**
    - In the corresponding world's `adaptation-works/[format]/` directory
    - Create new folder using the full work code name

3. **Generate the Skeleton**
    - Recommended: `node scripts/new-work.js --world <world> --form <cm|cs|s> --code <code> --title-zh "<Title>"` (add `--dry` to preview)
    - Manual: copy `common/` + `forms/{chaptered|short}/` from `templates/world-template/work-template/`
    - Modify folder name and internal file content

4. **Modify File Content**
    - Update all information in `metadata.yaml`
    - Update content in `README.md`
    - Update story files using unified naming format
    - Update settings in `settings/story-setting.md`
    - Add images to `images/` directory

## 9. Examples

### 9.1. Original Work Examples

**Main Story Volume 1:**

- Folder: `bs-o-c-1-first-volume/`
- Location: `worlds/beastshield/original-archives/chinese/chaptered-stories/main/`
- Internal files: `ch-001-prologue.md`, `ch-002-rising-action.md`...

**Side Character Story:**

- Folder: `bsp-o-c-1-g-277-green-bull-azhuang/`
- Location: `worlds/beastshield-paradise/original-archives/chinese/chaptered-stories/side/`
- Internal files: `ch-001-last-watch.md`, `ch-002-stranger-in-folded-time.md`...

**Short Story:**

- File: `bs-o-s-1-farm-inn.md`
- Location: `worlds/beastshield/original-archives/chinese/short-stories/`

### 9.2. Adaptation Work Examples

**Chaptered Story:**

- Work code: `bs-a-c-1-a-new-gamer`
- Folder: `bs-a-c-1-a-new-gamer/`
- Location: `worlds/beastshield/adaptation-works/chaptered-stories/`
- Internal files: `ch-001-infiltration.md`, `ch-002-confrontation.md`...

**Short Story:**

- Work code: `bs-a-s-1-first-blood`
- Folder: `bs-a-s-1-first-blood/`
- Location: `worlds/beastshield/adaptation-works/short-stories/`
- Content file: `bs-a-s-1-first-blood.md`

## 10. Naming Checklist

Check the following when creating files:

- [ ] World code correct (bs/bsr/uba/bsp)
- [ ] Work nature correct (o/a/c)
- [ ] Work format correct (c/s)
- [ ] Sequence number correct (three-digit zero-padded)
- [ ] Series name/work name correct (English kebab-case)
- [ ] Chapter number correct (three-digit zero-padded, only for chaptered)
- [ ] **Chapter title/work title included** (required)
- [ ] Hyphen usage correct (especially `ch-`)
- [ ] All file names lowercase
- [ ] File extension `.md`
- [ ] Chaptered stories use "folder + internal chapters" structure

## 11. Important Notes

1. **Naming Consistency**: Adaptation work folder naming format identical to original works
2. **Title Required**: All chaptered stories must include chapter title abbreviation
3. **Code Uniqueness**: Ensure work codes are unique, no duplicates
4. **Sequence Continuity**: Sequence numbers within same format should increment continuously
5. **File Naming**: Use lowercase letters and hyphens, avoid special characters
6. **Image References**: Correctly reference image paths in story files
7. **Status Updates**: When work is completed, change status in `metadata.yaml` to `completed`
8. **Promotion Applications**: Works meeting promotion conditions can apply anytime
9. **Natural Number Advantage**: Utilize modern file systems' natural sorting to simplify numbering

## 12. Template Locations

The project keeps a single world + work skeleton under `templates/world-template/`:

- Common work skeleton: `templates/world-template/work-template/common/`
- Chaptered form: `templates/world-template/work-template/forms/chaptered/`
- Short form: `templates/world-template/work-template/forms/short/`

Prefer the generator: `node scripts/new-work.js --world <world> --form <cm|cs|s> --code <code> --title-zh "<Title>"`.
How to write the body is covered by the skill `.dsh/skills/story-craft`.

---

## 13. Frequently Asked Questions

### Q: Why switch to natural number sequencing?

A: Modern file systems and code editors can correctly identify and sort natural numbers (1, 2, 10,
11...), eliminating
the need for zero padding. This simplifies naming, reduces cognitive load, while maintaining correct
sorting.

### Q: What's the structural difference between main stories and side stories?

A: In version 2.2.0, main stories and side stories are structurally identical: both use "folder +
internal chapters"
structure. The only difference is their storage directory:

- Main stories: `chaptered-stories/main/`
- Side stories: `chaptered-stories/side/`

### Q: How to create multiple volumes for a main story?

A: Each volume is an independent folder, numbered sequentially:

- Volume 1: `bs-o-c-1-first-volume/`
- Volume 2: `bs-o-c-2-second-volume/`
- Volume 3: `bs-o-c-3-final-volume/`

Each volume contains a complete chapter series.

### Q: Must chapter files start from ch-001?

A: Yes, for consistency, chapters within each folder start from `ch-001`. Even if this series is a
continuation of a
longer work, it re-starts numbering from 1 because the folder already indicates which volume this
is.

### Q: If my adaptation work is popular, can it become an official work?

A: Yes. When a work is completed and reaches certain quality standards, it can apply for migration
to
`original-archives`. Files will be renamed as needed during migration.

### Q: Can adaptation works become independent worlds?

A: Yes. If an adaptation work possesses a complete, independent setting system, mature narrative
structure, and
community influence, it can apply to become an independent world. This requires core team review.

### Q: How to find specific types of works?

A: Quickly identify from file names:

- World: First 2-3 characters
- Nature: 4th character (o/a/c)
- Format: 6th character (c/s)
- Sequence: Natural number starting from the 8th character

---

## 14. Update History

- **2025-12-15 v2.2.0**: Simplified numbering system, unified story structure
    - **Major Changes**:
        1. **Natural Number Sequencing**: All sequence numbers changed from three-digit to natural
           numbers (1, 2, 3...),
           three-digit zero padding required.
        2. **Unified Structure**: All chaptered stories (main, side, adaptation) use "folder +
           internal chapters"
           structure.
        3. **Unified Chapter Naming**: Chapter files within folders uniformly named
           `ch-three-digit-number-chapter-title-abbreviation.md`.
        4. **Main Story Volume Support**: Clear support for main stories using volume structure,
           each volume in its own
           folder.
        5. **Added World**: Added `bsp` (Beastshield Paradise) world support.
        6. **Optimized Examples**: Updated all examples to comply with new standards.
        7. **Added Numbering**: Added numbering to each section of the guide for better readability.

- **2025-12-13 v2.1.1**: Clarified adaptation work promotion pathways and positioning
    - Added core concept definitions section.
    - Clarified two promotion pathways for adaptation works: promotion to official original work or
      independent world.
        - Added promotion status field to metadata.
        - Updated FAQ with adaptation work promotion-related questions.

- **2025-12-13 v2.1.0**: Updated according to latest project structure, unified naming formats for
  all work types
    - Chapter titles required.
    - Clear distinction between main and side stories.
    - Updated all examples.
    - Added naming checklist.

---

*Last Updated: December 15, 2025*  
*Document Version: 2.2.0*
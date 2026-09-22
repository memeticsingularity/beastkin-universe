# 《墨犬（续写）》项目协作指南

> 本文档为 `bs-a-cs-12-mo-quan/` 项目的协作速查手册。

---

## 1. 本项目是什么

`bs-a-cs-12-mo-quan/` 是 `beastshield/` 世界观下的**改编续写项目**。原作《墨犬》（`bs-o-cs-2-mo-quan`）仅完成前两章，本项目在此基础上进行第三章及以后的续写。

**核心设定**：失忆的黑色犬科兽人身怀神秘功夫（金钟罩、烈火掌、寸止），在兽盾公司的追杀下寻找自己的身份。

**世界观基础设定（雌雄同体）**：本作世界中所有兽人均为雌雄同体，同时具备雄性下体性征（阴茎/睾丸）与雌性乳部性征（乳头/乳房）。乳头描写与下体描写同等重要，所有种族均为胸前两枚，差异体现在大小、颜色、毛发遮盖程度上。

---

## 2. 与原作的关系

| 想找的内容 | 所在位置 |
|-----------|---------|
| **原作前两章原文** | [`../../original-archives/chinese/chaptered-stories/side/bs-o-cs-2-mo-quan/`](../../../original-archives/chinese/chaptered-stories/side/bs-o-cs-2-mo-quan/) |
| **原作笔风指南** | [`../../original-archives/chinese/chaptered-stories/side/bs-o-cs-2-mo-quan/notes/style-guide.md`](notes/guides/style-guide.md) |
| **原作设定** | [`../../original-archives/chinese/chaptered-stories/side/bs-o-cs-2-mo-quan/settings/story-setting.md`](notes/setting/story-setting.md) |
| **世界观主设定** | [`../../../settings/0-original-setting/`(../../../../settings/0-original-setting/) |

**原则**：原作设定以 `original-archives/` 和 `settings/0-original-setting/` 为准，不可修改；改编侧如果发现冲突，在改编文档中标注差异即可。

---

## 3. 目录结构

```
bs-a-cs-12-mo-quan/
├── GUIDE.md                    # 本文件（协作速查）
├── README.md                   # 对外总览（项目简介、章节列表）
├── metadata.yaml               # 作品元数据
│
├── chapters/                   # 章节正文
│   ├── volume-1/               # 第一卷：主角线（Ch.1–Ch.17）
│   │   └── ch-0N.md
│   ├── volume-2/               # 第二卷：武林视角线
│   └── volume-3/               # 第三卷：交汇决战
│
├── notes/                      # 创作笔记
│   └── style-guide-reference.md # 笔风指南引用
│
└── .process/                   # 过程文件与设定档案
    └── settings/               # 设定资料总入口
        ├── characters/         # 角色档案
        ├── scenes/             # 场景/地点档案
        └── systems/            # 机制档案
```

---

## 4. 笔风规范

**必须遵循**原作的笔风指南：

- **第三人称**，紧贴黑狗的感官与心理
- **无游戏UI**，没有系统提示、精槽数字、处决状态
- **武侠功夫式战斗**：金钟罩（防御）、烈火掌（攻击）、寸止（控制）
- **情色与生死绑定**：射精=死亡，直白露骨，不避讳
- **失忆主角**：黑狗对身份与力量一无所知，常被动触发能力

详细规范请阅读：[原作笔风指南](notes/guides/style-guide.md)

---

## 5. 新章节推进工作流

```
步骤1：阅读原作结尾 → 步骤2：确定本章目标 → 步骤3：场景需求清单
→ 步骤4：角色需求清单 → 步骤5：撰写章节大纲 → 步骤6：开始正文创作
```

**步骤1：阅读原作结尾**
- 阅读 `bs-o-cs-2-mo-quan/ch-2-mountain-encounter.md` 结尾
- 记录：黑狗离开山顶、寸止功法初现、卡片与对讲机线索、虎兽人昏迷

**步骤2：确定本章目标**
- 本章要推进什么？（身份线索 / 新敌人登场 / 能力觉醒 / 世界观展开）
- 对照原作笔风指南确定节奏

**步骤3-4：场景与角色需求**
- 如需新场景，在 `.process/settings/scenes/` 建档
- 如需新角色，在 `.process/settings/characters/` 建档

**步骤5：撰写章节大纲**
- 在 `notes/` 下创建大纲文件：`YYYY-MM-DD-chapter-N-outline.md`

**步骤6：正文创作**
- 文件：`chapters/volume-1/ch-0N.md`
- 遵循原作笔风指南的所有规范

---

## 6. 文件存放规则

| 文件类型 | 存放位置 |
|---------|---------|
| 改编故事（新章节） | `chapters/volume-N/` |
| 角色设定档案 | `.process/settings/characters/` |
| 场景/地点档案 | `.process/settings/scenes/` |
| 机制档案 | `.process/settings/systems/` |
| 笔风/规范文档 | `notes/` |
| 项目级指南/说明 | `GUIDE.md` 或 `README.md` |

---

## 7. 禁止事项

- **不要把续写故事存到原作侧**（`original-archives/`）
- **不要修改原作侧的设定文件**
- **不要引入游戏化术语**（精槽、系统提示、读档等）
- **不要切换为第一人称**（必须保持第三人称"黑狗"）

---

*文档版本：1.0*
*创建日期：2026-05-11*

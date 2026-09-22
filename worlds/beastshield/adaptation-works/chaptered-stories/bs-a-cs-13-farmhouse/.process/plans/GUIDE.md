# 《兽盾农家乐（续写）》项目协作指南

> 本文档为 `bs-a-cs-13-farmhouse/` 项目的协作速查手册。

---

## 1. 本项目是什么

`bs-a-cs-13-farmhouse/` 是 `beastshield/` 世界观下的**改编扩写项目**。原作《兽盾农家乐》为短篇故事，本项目在此基础上扩写为二十六章以上的连续叙事（跨越两卷），增加了角色发展、农场经营元素、跟班关系动态，以及从黑暗复仇到温暖家庭的叙事转变。

**核心设定**：社畜牛兽人小谷继承实验农场，以兽盾员工精液为肥料种植神奇作物，在复仇与经营之间逐渐建立起黑暗产业。

---

## 2. 与原作的关系

| 想找的内容 | 所在位置 |
|-----------|---------|
| **原作短篇原文** | 原作短篇目前未在 original-archives/ 中单独归档，本项目的 `chapters/` 即为扩写后的完整内容 |
| **世界观主设定** | [`../../../settings/0-original-setting/`](../../../../../settings/0-original-setting) |

---

## 3. 目录结构

```
bs-a-cs-13-farmhouse/
├── GUIDE.md                    # 本文件（协作速查）
├── README.md                   # 对外总览（项目简介、角色表）
├── metadata.yaml               # 作品元数据
│
├── chapters/                   # 章节正文（按卷分目录）
│   ├── volume-1/               # 第一卷：挣扎着的人们（1-25章）
│   │   ├── README.md
│   │   ├── ch-1-seeds-and-fertilizer.md
│   │   ├── ch-2-wolf-guest.md
│   │   ├── ch-3-tiger-protection.md
│   │   ├── ch-4-boar-recruit.md
│   │   ├── ch-5-black-ginseng.md
│   │   ├── ch-6-relationships-and-secrets.md
│   │   ├── ch-7-death-in-the-shed.md
│   │   ├── ch-8-choices-and-consequences.md
│   │   ├── ch-9-tigers-fate.md
│   │   ├── ch-10-purple-stem.md
│   │   ├── ch-11-basement-secret.md
│   │   ├── ch-12-rescue.md
│   │   ├── ch-13-recovery.md
│   │   ├── ch-14-awakening.md
│   │   ├── ch-15-rivalry.md
│   │   ├── ch-16-harvest.md
│   │   ├── ch-17-celebration.md
│   │   ├── ch-18-investigation.md
│   │   ├── ch-19-preparation.md
│   │   ├── ch-20-night-raid.md
│   │   ├── ch-21-confrontation.md
│   │   ├── ch-22-truth.md
│   │   ├── ch-23-deal.md
│   │   ├── ch-24-rex-request.md
│   │   └── ch-25-new-member.md
│   │
│   └── volume-2/               # 第二卷：一同着的生活（连载中）
│       ├── README.md
│       └── ch-1-life-together.md
│
└── notes/                      # 创作笔记
    └── setting/
        └── story-setting.md     # 故事设定档案
```

---

## 4. 笔风规范

- **第一人称**，紧贴小谷的视角与心理活动
- **直白露骨**，不避讳情色与暴力描写
- **经营叙事与情色场景交织**，以农场发展和"肥料"获取为主线
- **黑暗幽默**，带有复仇快感和权力扩张的满足感

---

## 5. 文件存放规则

| 文件类型 | 存放位置 |
|---------|---------|
| 改编故事（章节） | `chapters/` |
| 故事设定档案 | `notes/setting/` |
| 笔风/规范文档 | `notes/` |
| 项目级指南/说明 | `GUIDE.md` 或 `README.md` |

---

## 6. 禁止事项

- **不要把续写故事存到原作侧**（`original-archives/`）
- **不要修改原作侧的设定文件**

---

*文档版本：1.0*
*创建日期：2026-05-20*

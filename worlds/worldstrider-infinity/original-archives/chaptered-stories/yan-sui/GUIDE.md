# 《从字里行间捞起你：岁与参》项目协作指南

> 本文档为 `yan-sui/` 项目的 AI 协作速查手册。读完此文件即可理解本项目的结构、快速定位文档、知道该把新文件放哪。

---

## 1. 本项目是什么

`yan-sui/` 是 worldstrider-infinity（万界巡行：无限）平台下的一个**独立创作项目**，聚焦于 **岩岁/岩参父子** 的故事线。

本项目包含两条故事线：

| 故事线 | 路径 | 说明 |
|-------|------|------|
| **救赎线（主线）** | `trunk/` | 奇点（玩家）介入，救下濒死的岩参，父子在万象庭院重逢的温情线 |
| **原作死亡线（分支）** | `branches/yan-can-canon-death/` | 基于 beastshield 原作岩参悲剧结局的改编，保留悲剧内核 |

---

## 2. 与 beastshield 原作的关系

本项目**基于** beastshield 原作世界观，但**存放在改编侧**（worldstrider-infinity）。

| 想找的内容 | 所在位置 |
|-----------|---------|
| **原作角色设定**（岩参、岩岁、壹安等） | [`beastshield/.process/settings/characters/`](../../../../beastshield/adaptation-works/chaptered-stories/bs-a-cs-5-beastshield-chronicles/.process/settings/characters/) |
| **原作者对话** | [`beastshield/.process/settings/author-chat/`](../../../../beastshield/adaptation-works/chaptered-stories/bs-a-cs-5-beastshield-chronicles/.process/author-chat) |
| **改编侧角色档案** | [`../../character-archive/`](../../character-archive/) |

**原则**：原作设定以 beastshield 侧为准，不可修改；改编侧如果发现冲突，在改编文档中标注差异即可。

---

## 3. 目录结构

```
yan-sui/
├── GUIDE.md                    # 本文件
├── README.md                   # 对外总览（含跨项目索引）
├── CURRENT_STATUS.md           # 当前进度追踪
├── STORY_ROADMAP.md            # 故事走向/大纲
├── WORLD_SETTING.md            # 融合版世界观设定
│
├── trunk/                      # 主线故事（救赎线）
│   └── (当前版本的故事章节)
│
├── branches/                   # 分支故事线
│   ├── yan-can-canon-death/    # 岩参原作死亡线改编
│   │   ├── 7-chapters-v2/      # 《无归》7章重写（Claude）
│   │   ├── claude-synth-v2/    # 《雪停之前》重写（Claude）
│   │   ├── snow-night-v2/      # 《雪夜》重写（DeepSeek）
│   │   ├── before-dawn-v2/     # 《天亮之前》重写（DeepSeek）
│   │   └── CURRENT_STATUS.md   # v2 进度追踪
│   └── valentine-special/      # 情人节特辑备选稿《暖雪情长》
│       ├── README.md           # 分岔说明与版本对照
│       └── ch-6.md             # 第六章：暖雪情长（备选版）
│
├── ai-discuss/                 # AI 辅助创作讨论记录
├── chat/                       # 角色对话/聊天模拟
├── discussions/                # 版本分析、角色弧光讨论、创作笔记
└── history/                    # 历史版本归档
    ├── v0-*                    # 原始版本（作者提供的故事）
    └── v1-*                    # 第一版改编
```

---

## 4. 当前活跃工作区

以下区域是近期高频修改的：

### 4.1 岩参原作死亡线 v2（壹安设定）
- **核心变更**：老同事从"老赵"（v1）改为"壹安"（伯恩山犬，46岁，岩参后辈，蓝制服）
- **已完成**：
  - `7-chapters-v2/` —— 《无归》7章重写
  - `claude-synth-v2/` —— 《雪停之前》重写
  - `snow-night-v2/` —— 《雪夜》重写
  - `before-dawn-v2/` —— 《天亮之前》重写
- **状态追踪**：`branches/yan-can-canon-death/7-chapters-v2/CURRENT_STATUS.md`
- **版本分析**：`discussions/version-comparison-yi-an.md`

### 4.2 救赎线（trunk/）
- **当前版本**：V2 前七章已完成（`trunk/ch-1.md` 至 `trunk/ch-7.md`）
- **ch-6 / ch-7**：情人节特辑《融雪初温》与除夕特辑《岁末围炉》（连续叙事，由作者 txt 稿落库）
- **备选分支**：`branches/valentine-special/` 存情人节特辑另一稿《暖雪情长》

---

## 5. 文件存放规则

### 5.1 命名规范

**过程文件**（讨论、笔记、分析）：`YYYY-MM-DD-描述.md`
- 例：`2026-05-08-character-arc-analysis.md`

**故事章节**：按作品内部规范，通常为 `ch-N.md` 或 `story.md`

**状态/进度文件**：`CURRENT_STATUS.md`

### 5.2 新文件该放哪

| 文件类型 | 存放位置 |
|---------|---------|
| 改编故事（新章节） | `trunk/` 或 `branches/yan-can-canon-death/` 下的对应版本目录 |
| 版本分析/对比 | `discussions/` |
| AI 创作讨论记录 | `ai-discuss/` |
| 角色对话模拟 | `chat/` |
| 废弃/历史版本 | `history/` |
| 项目级指南/说明 | `GUIDE.md` 或 `README.md`（本目录根级） |

### 5.3 禁止事项

- **不要把本项目的改编故事存到 beastshield 侧**
- **不要把本项目的讨论/分析存到 beastshield 侧**
- **不要修改 beastshield 侧的原作设定文件**
- **不要把 worldstrider-infinity 其他项目的文件混放到 `yan-sui/`**

---

## 6. 术语速查

| 术语 | 含义 |
|------|------|
| **岩岁** | 黄虎兽人，25岁，岩参之子，兽盾绿制服 |
| **岩参** | 灰白虎兽人，53岁，岩岁之父，前兽盾员工，左腿残疾 |
| **壹安** | 伯恩山犬兽人，46岁，岩参后辈，蓝制服（死亡线 v2 设定） |
| **奇点** | 玩家角色，worldstrider-infinity 中的介入者（救赎线） |
| **交流券** | 岩参手写的一沓纸，承诺"无论如何都会和岁岁好好说话" |
| **统御项圈** | 兽盾控制装置 |
| **精槽/性欲值** | 兽盾世界观中的机制 |
| **v1 / v2** | 版本号，用于区分设定变更前后的故事（如老赵版 vs 壹安版） |
| **trunk** | 主线故事（救赎线） |
| **branches** | 分支故事线（如原作死亡线） |

---

## 7. 快速验证清单

修改完文件后，确认以下索引是否仍准确：

- [ ] `README.md` 是否指向 beastshield 原作设定？
- [ ] `branches/yan-can-canon-death/` 内的 `CURRENT_STATUS.md` 是否同步更新？
- [ ] 新文件是否放在了正确的子目录（trunk/branches/discussions/ai-discuss/chat/history）？
- [ ] 如新增目录，是否已在 `README.md` 和本 `GUIDE.md` 中补充说明？

---

*文档版本：1.0*
*创建日期：2026-05-08*
*适用范围：yan-sui 项目所有 AI 协作会话*

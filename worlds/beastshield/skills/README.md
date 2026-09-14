# 兽盾写作技能库 / Beastshield Writing Skills

> 一套可复用的写作风格校准工具，帮助 AI 生成更贴近原作语感的内容。
> 每个 skill 聚焦一个具体问题：如何避免 AI 腔、如何自然地交代设定、如何设计情色场景的节奏。
> 每个 skill 独立版本管理，详见各自的 `changelog.md`。

---

## 技能列表

| 状态 | 技能 | 当前版本 | 解决的问题 |
|------|------|----------|-----------|
| ✅ 活跃 | [story-preset](story-preset/) | [v1.0](story-preset/preset.md) | **出厂闸门**：选定即代表"要 ①③ 这一类兽盾故事"，原创/改编一律卡 A(视觉世界观)+B(大狗口味) 两道闸门，支持有性/无性双版本 |
| ✅ 活跃 | [style-calibrator](style-calibrator/) | [v0.3](style-calibrator/v0.3-tone-and-rhythm-guide.md) | AI 写作语感生硬、设定交代机械 |
| ✅ 活跃 | [lanse-write](lanse-write/) | [v1.4](lanse-write/lanse-write-skill.md) | lanse 风味写作指南（①+③ 全量参考） |
| ✅ 活跃 | [lanse-review](lanse-review/) | [v1.0](lanse-review/lanse-review-guide.md) | 模拟 lanse 本人审阅视角，判断风格适配与 XP 对味度 |
| ✅ 活跃 | [adaptation-workflow](adaptation-workflow/) | [v1.0](adaptation-workflow/adaptation-workflow.md) | 改编扩写的分阶段流程与质量门 |
| 🚧 预留 | [anti-checklist-review](anti-checklist-review/) | — | 写完后逐项排查"是不是在应付检查点" |
| — | 更多待定 | — | — |

---

## 技能设计讨论

关于这些技能的来源、设计思路和迭代讨论，见 [`_discussions/`](_discussions/)。

---

## 使用方式

每个 skill 是一个独立 markdown 文件，可直接：

1. **写作前阅读** — 建立风格意识
2. **写作中参考** — 遇到具体问题（如"怎么交代制服又不生硬"）查对应章节
3. **写完后校准** — 配合自检清单逐项排查
4. **AI 提示词注入** — 将关键规则写入 AI 系统提示

---

## 目录结构

```
skills/
├── README.md                  ← 本索引文件
├── _discussions/              ← QA 讨论存档（技能设计过程）
├── style-calibrator/             ← Skill 1: Tone & Rhythm Guide
│   ├── README.md              ← Entry, links to current version
│   ├── v1-tone-and-rhythm-guide.md ← v1
│   └── changelog.md           ← Version history per skill
├── anti-checklist-review/      ← Skill 2 (reserved)
│   └── README.md
└── ...                        ← 更多技能
```

---

*创建日期：2026-07-15*

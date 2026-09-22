# 岩参原作囚禁线 —— 总目录

> 本目录存放岩参在原作正统设定中死亡线的**全部演绎版本**。  
> 所有版本共享同一原设核心：岩参被平民囚禁约两周 → 遭受犬化驯化与羞辱 → 被老同事偶然救出 → 尊严崩溃求死 → 由老战友送终 → 托孤善后。  
> 不同版本仅在叙事策略、视角、结构、收敛度上存在差异。

---

## 版本总览（v1 vs v2）

| 版本代 | 核心设定差异 | 状态 |
|--------|-------------|------|
| **v1** | 老同事为"老赵"（退休老兵，平辈战友） | 已完成，归档参考 |
| **v2** | 老同事为"壹安"（伯恩山犬，46岁，岩参后辈，蓝制服） | **当前活跃版本** |

---

## v2 子目录一览（当前活跃）

| 子目录 | 版本名 | 性质 | 视角 | 结构 | 核心特征 |
|--------|--------|------|------|------|----------|
| `7-chapters-v2/` | 《无归》v2 | 基础完整版 | 第三人称有限（岩参→壹安） | 七章分章，线性顺叙 | 覆盖解围至托孤全流程，约 3.9 万字，节奏快慢交替 |
| `claude-synth-v2/` | 《雪停之前》v2 | 合成理想版（Claude） | 第一人称（壹安） | 单篇连续叙事，严格单夜 | 融合所有版本优点，极度收敛，镜像结尾 |
| `snow-night-v2/` | 《雪夜》v2 | 独立重述（DeepSeek） | 第一人称（壹安） | 单篇连续叙事，回忆式倒叙 | 氛围与感官细节突出，情感外放 |
| `before-dawn-v2/` | 《天亮之前》v2 | 素材重编排（DeepSeek） | 第一人称（壹安） | 单篇连续叙事，一夜压缩 | 克制，增加次日托孤与时间跨度感 |
| `claude-ideal-v2/` | 《终夜》 | **终极理想版（Claude）** | 第一人称（壹安） | 单篇连续叙事，严格单夜 | 零硬规则违反，最干净留白，单夜闭环 |
| `deepseek-ideal-v2/` | 《雪停之前》ideal | **终极理想版（DeepSeek）** | 第一人称（壹安） | 单篇连续叙事 | 嗅觉寻踪开场，递烟仪式，显性托孤 |

---

## v1 子目录一览（历史归档）

| 子目录 | 版本名 | 性质 | 视角 | 说明 |
|--------|--------|------|------|------|
| `7-chapters/` | 《无归》v1 | 基础完整版 | 第三人称有限（岩参→老赵） | v1 七章版，老赵设定 |
| `snow-night/` | 《雪夜》v1 | 独立重述 | 第一人称（老赵） | DeepSeek 初版 |
| `before-dawn/` | 《天亮之前》v1 | 素材重编排 | 第一人称（老赵） | DeepSeek 第二版 |
| `claude-synth/` | 《雪停之前》v1 | 合成理想版 | 第一人称（老赵） | Claude 融合版 |

---

## 版本选择指南

### v2（壹安设定，当前推荐）

- **想阅读最完整、细节最丰富的长叙事** → `7-chapters-v2/`
- **想阅读理论上最收敛、最冷硬、留白最干净的单篇** → `claude-ideal-v2/`《终夜》
- **想体验最强烈的嗅觉沉浸与情感丰沛度** → `deepseek-ideal-v2/`《雪停之前》
- **想对比两个 AI 的终极版本差异** → 对照阅读 `claude-ideal-v2/` + `deepseek-ideal-v2/`

### v1（老赵设定，历史参考）

- **想了解原始设定与叙事基底** → `7-chapters/`
- **对比老赵版与壹安版的人物关系差异** → 对照 `7-chapters/` 与 `7-chapters-v2/`

---

## 创作文档

| 文档 | 说明 |
|------|------|
| [`../../creative-brief-full-spec-v2.md`](../../creative-brief-full-spec-v2.md) | v2 完整创作简报：世界观、角色档案、事件链、关键道具、硬规则 |
| [`../../discussions/claude-vs-deepseek-ideal-v2.md`](../../discussions/claude-vs-deepseek-ideal-v2.md) | 成文对决：Claude《终夜》vs DeepSeek《雪停之前》逐项对比分析 |
| [`../../discussions/deepseek-self-critique-ideal-v2.md`](../../discussions/deepseek-self-critique-ideal-v2.md) | DeepSeek 对《雪停之前》ideal v2 的自我评鉴与对《终夜》的交叉评鉴 |
| [`../../discussions/version-comparison-yi-an.md`](../../discussions/version-comparison-yi-an.md) | 四版本（v2）对比分析：7章 / claude-synth / snow-night / before-dawn |

---

## 与 `trunk/` 主干的关联

- `7-chapters-v2/` 的分岔起点为 **ch-4**，前置章节与 `trunk/ch-1.md` 至 `trunk/ch-3.md` 模糊兼容。
- 所有单篇版本（`claude-synth-v2/`、`snow-night-v2/`、`before-dawn-v2/`、`claude-ideal-v2/`、`deepseek-ideal-v2/`）为独立重述，不直接共享 `trunk/` 前置章节，但情节节点与原作设定保持一致。

---

*最后更新：2026-05-09*

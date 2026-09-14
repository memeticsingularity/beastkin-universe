# 兽盾故事出厂 preset（①③）

> **定位**：一个可切换的写作 preset。**选定它，就等于作者明确了"这一篇要的是 ①③ 这一类兽盾故事"**——出厂即达标，不必事后返工。
> **范围**：只对**当前对话里的那个故事**负责，不扩张到全仓库、不约束别的篇目。
> **版本**：v1.0 · 2026-09-15

---

## 〇、怎么用

1. **选定即生效**：作者启用本 preset 后，本次写作全程按 ①③ 执行，直到作者解除。
2. **双版本协议**：场景允许时，同一次产出**同时给"无性版"和"有性版"**（见 preset §2）。
3. **出厂自检**：交稿前逐条过 §3 自检表，**任一条 fail 不许交**。
4. **例外申报**：确实要脱离 ①③（纯文学切片等）时，必须显式申报（见 preset §4），否则按违约处理。

---

## 一、这个 preset 解决什么

仓库里已有 `lanse-write`（写作指南）、`adaptation-workflow`（改编工作流，含质量门）、`lanse-style-checklist`（自检清单）。本 preset 不替代它们，而是补上那个**漏洞**：

> **改编工作流的质量门只覆盖"基于原作的扩写"；原创故事（拿现实片段改的、自由命题的）不在覆盖里，于是可能以 Lv.0 / 不走登场公式 / 不带双性征的形态直接出厂。**

本 preset 是**覆盖"任何兽盾故事"（原创 + 改编）的出厂闸门**，并把两道闸门合成一份可注入的规格：

| 闸门 | 内容 | 来源 |
|:--|:--|:--|
| **A · ③ 兽盾视觉/世界观** | 物种/制服色/袜色/登场公式/体型/双性征/术语/全男/无流血/保鲜 | `style-guide.md` §12/§14/§15/§17/§21、CLAUDE.md §8 |
| **B · ① 大狗口味** | 死亡必射/精液一定五要/处决流程/死后仪式/情感调色盘/差异化/爽点收尾/断章节奏/**五感齐备＋身体四件套＋"事后层"** | `lanse-write-skill.md` §5、`templates/beastshield-writing-guidelines.md` §2、`.process/POLISH-BENCHMARK.md` |
| **C · ④ 设定溯源** | 赏金/月薪/物价/编号格式/等级配对等**硬数据必须来自设定集原文，禁止自创**；查不到标 `[待确认]` 问作者 | `settings/0-original-setting/`、`settings/1-recommended-canon/` |

> **为什么有闸门 C**：v1.0 只覆盖风格与视觉，结果 bs-a-s-7 第 5 篇自创了赏格（R级 240 / G级 180），
> 与设定集（R级 500 / G级 100）冲突。数值错了不是"写得不好"，是**把世界观写坏了**——所以单列一道闸门。

---

## 二、文件

| 文件 | 说明 |
|:--|:--|
| [`preset.md`](preset.md) | preset 本体（可直接注入提示词） |

---

## 三、关联

- 语感校准：[`../style-calibrator/`](../style-calibrator/)
- 写作指南：[`../lanse-write/lanse-write-skill.md`](../lanse-write/lanse-write-skill.md)
- 改编流程：[`../adaptation-workflow/adaptation-workflow.md`](../adaptation-workflow/adaptation-workflow.md)
- 写完自审：[`../lanse-review/lanse-review-guide.md`](../lanse-review/lanse-review-guide.md)

---

*创建：2026-09-15*

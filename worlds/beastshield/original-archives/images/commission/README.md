# 委托稿 / Commissioned Art

> 本目录存放《兽盾》原作故事的**约稿作品（commission）**——即委托画师绘制、非作者自绘的插画。
> 每张图按**所属作品**分目录存放，并已被引用到对应章节的正文原位与章末「插图索引」。

---

## 一、与既有归档的分工 / Where this fits

`original-archives/images/` 下已有几套归档，各有分工：

| 目录 | 收录内容 | 命名 |
|------|----------|------|
| [`character-arts/`](../character-arts/) | 作者自绘的**兵种制服设定图** | `<等级>-<兽种>/<日期>.jpg` |
| [`main-story/`](../main-story/) | 作者自绘的**主线配图** | `vol N/ch-N-N.jpg` |
| [`short-stories/`](../short-stories/) | 作者自绘的**短篇配图** | `cs-N-ch-N-N.jpg` |
| [`songguo/`](../songguo/) | 「松果」系列图 + 场景说明 | `<日期>-<序号>.jpg` |
| [`daily/`](../daily/) | 日常摸鱼图 | `<日期>-<序号>.jpg` |
| **`commission/`（本目录）** | **委托画师绘制的约稿作品** | `<日期>-<兽种>.png` |

**「委托稿」是来源属性，不是题材属性**，所以自成一套目录树；图同时会被对应章节引用，读者在故事里也能看到。

> ⚠️ 本批 12 张均为**已加水印版本**（画师 `lanse × memetic` 水印）。若日后取得无水印原图，命名保持一致直接覆盖即可。

---

## 二、命名与归档规范 / Convention

```
images/commission/
├── README.md                        # 本文件（总索引 + 规范）
└── <作品编码>/                      # 与 original-archives 的作品编码一致
    ├── README.md                    # 该作品的逐图说明（场景 / 详情 / 原文锚点 / 出入）
    └── <YYYYMMDD>-<兽种>.png        # 日期 = 约稿/出图日期
```

规则：

1. **目录名 = 作品编码**，直接沿用 `original-archives` 既有编码（如 `bs-o-cm-1-main-story-3`、`bs-o-cs-1-yan-liang`），不另起体系。
2. **文件名 = `<约稿日期>-<兽种英文小写>`**，如 `20260618-dog.png`。兽种词表与 `character-arts/` 保持一致：`bear / bull / dog / lion / leopard / rhino / tiger / wolf / boar`。
3. **文件名日期 = 约稿/出图日期，不是故事内的时间顺序**（与 `songguo/` 的既有约定相同）。同一作品多张图按日期自然排序。
4. **同一场景多张图**时追加序号：`<日期>-<兽种>-2.png`。
5. 每新增一张图，需同步**五处**：
   - 该作品的 `README.md`（逐图说明）
   - 本文件的总表
   - **角色档案**的 `## 配图 / Commissioned Art` 区块（含画面与原文的出入说明，见 [`ARCHIVE-CONVENTIONS.md`](../../chinese/characters/beastshield-company/ARCHIVE-CONVENTIONS.md) 第八节）
   - **三级角色索引**：总索引 README（委托图列 + 按兽种图墙 + 逐张清单）、兽种 README（等级索引列 + 图墙）、等级 README（图墙 + 🖼 标记）
   - **对应章节正文原位插入图片 + 章末「插图索引」**

### 章节里的插图写法

正文原位（与 [`songguo`](../../../adaptation-works/chaptered-stories/bs-a-cs-9-songguo-story/) 的既有惯例一致）：

```markdown
![场景简述 · 角色简述](../../../../images/commission/<作品编码>/<文件>.png)
```

章末（插在 `**Chapter N END**` 之后的导航行与 `## 故事评述与感慨` 之间）：

```markdown
## 插图索引

本章涉及以下委托稿场景：

1. **场景名** - 一句话描述（[<文件>.png](../../../../images/commission/<作品编码>/<文件>.png)）
```

---

## 三、总索引 / Master Index

12 张，2026-05-29 ~ 2026-09-16。

| # | 文件 | 日期 | 作品 | 兽种 · 等级 | 落位章节 |
|---|------|------|------|-------------|----------|
| 1 | [bs-o-cs-2-mo-quan/20260529-tiger.png](bs-o-cs-2-mo-quan/20260529-tiger.png) | 05-29 | [墨犬](../../chinese/chaptered-stories/side/bs-o-cs-2-mo-quan/README.md)（支线） | 棕虎兽人 · G级军绿 | [Ch.2 山间遭遇](../../chinese/chaptered-stories/side/bs-o-cs-2-mo-quan/ch-2-mountain-encounter.md) |
| 2 | [bs-o-s-3-blackstone-2/20260604-bull.png](bs-o-s-3-blackstone-2/20260604-bull.png) | 06-04 | [黑石2](../../chinese/short-stories/bs-o-s-3-blackstone-2/bs-o-s-3-blackstone-2.md)（短篇） | 牛兽人 · E级黑制服 | [黑石2](../../chinese/short-stories/bs-o-s-3-blackstone-2/bs-o-s-3-blackstone-2.md) 处置段 |
| 3 | [bs-o-cm-1-main-story-3/20260618-dog.png](bs-o-cm-1-main-story-3/20260618-dog.png) | 06-18 | [白之都](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-3/README.md)（主线·三卷） | 狗兽人 · G级军绿 | [Ch.8 龙神浮岛](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-8-dragon-god-island.md) |
| 4 | [bs-o-cs-1-yan-liang/20260630-dog.png](bs-o-cs-1-yan-liang/20260630-dog.png) | 06-30 | [炎魉](../../chinese/chaptered-stories/side/bs-o-cs-1-yan-liang/README.md)（支线） | 狗兽人 · E级黑制服 | [Ch.2 办公室清剿](../../chinese/chaptered-stories/side/bs-o-cs-1-yan-liang/ch-2-office-clearance.md) |
| 5 | [bs-o-cs-1-yan-liang/20260706-tiger.png](bs-o-cs-1-yan-liang/20260706-tiger.png) | 07-06 | [炎魉](../../chinese/chaptered-stories/side/bs-o-cs-1-yan-liang/README.md)（支线） | 虎兽人 · R级白制服 | [Ch.2 办公室清剿](../../chinese/chaptered-stories/side/bs-o-cs-1-yan-liang/ch-2-office-clearance.md) |
| 6 | [bs-o-cm-1-main-story-3/20260717-wolf.png](bs-o-cm-1-main-story-3/20260717-wolf.png) | 07-17 | [白之都](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-3/README.md)（主线·三卷） | 狼兽人 · 画面为蓝制服（档案记 G级） | [Ch.4 念力防御](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-4-psychic-defense.md) |
| 7 | [bs-o-cm-1-main-story-2/20260725-lion.png](bs-o-cm-1-main-story-2/20260725-lion.png) | 07-25 | [魔影](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-2/README.md)（主线·二卷） | 狮兽人 · O级蓝制服 | [Ch.4 虎卫组之战](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-4-tiger-guard-battle.md) |
| 8 | [bs-o-cm-1-main-story-3/20260801-boar.png](bs-o-cm-1-main-story-3/20260801-boar.png) | 08-01 | [白之都](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-3/README.md)（主线·三卷） | 野猪兽人 · G级军绿 | [Ch.7 警局入侵](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-3/ch-7-police-station-invasion.md) |
| 9 | [bs-o-cm-1-main-story-1/20260817-leopard.png](bs-o-cm-1-main-story-1/20260817-leopard.png) | 08-17 | [兽游世界](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-1/README.md)（主线·一卷） | 豹兽人 · G级军绿 | [Ch.9 总部突袭](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-9-challenge-headquarters.md) |
| 10 | [bs-o-cm-1-main-story-2/20260822-bull.png](bs-o-cm-1-main-story-2/20260822-bull.png) | 08-22 | [魔影](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-2/README.md)（主线·二卷） | 牛兽人 · 画面为 R级白制服 | [Ch.2 走廊巡逻](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-2/ch-2-corridor-patrol.md) |
| 11 | [bs-o-cs-1-yan-liang/20260901-rhino.png](bs-o-cs-1-yan-liang/20260901-rhino.png) | 09-01 | [炎魉](../../chinese/chaptered-stories/side/bs-o-cs-1-yan-liang/README.md)（支线） | 犀牛兽人 · R级白制服 | [Ch.3 深层对峙](../../chinese/chaptered-stories/side/bs-o-cs-1-yan-liang/ch-3-deep-confrontation.md) |
| 12 | [bs-o-cm-1-main-story-1/20260916-bear.png](bs-o-cm-1-main-story-1/20260916-bear.png) | 09-16 | [兽游世界](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-1/README.md)（主线·一卷） | 熊兽人 · E级黑制服 | [Ch.13 解锁封印](../../chinese/chaptered-stories/main/bs-o-cm-1-main-story-1/ch-13-unlocking.md) |

---

## 四、按作品查看 / By Work

| 作品 | 编码 | 张数 | 目录 |
|------|------|------|------|
| 兽游世界（主线·一卷） | `bs-o-cm-1-main-story-1` | 2 | [README](bs-o-cm-1-main-story-1/README.md) |
| 魔影（主线·二卷） | `bs-o-cm-1-main-story-2` | 2 | [README](bs-o-cm-1-main-story-2/README.md) |
| 白之都（主线·三卷） | `bs-o-cm-1-main-story-3` | 3 | [README](bs-o-cm-1-main-story-3/README.md) |
| 炎魉（支线） | `bs-o-cs-1-yan-liang` | 3 | [README](bs-o-cs-1-yan-liang/README.md) |
| 墨犬（支线） | `bs-o-cs-2-mo-quan` | 1 | [README](bs-o-cs-2-mo-quan/README.md) |
| 黑石2（短篇） | `bs-o-s-3-blackstone-2` | 1 | [README](bs-o-s-3-blackstone-2/README.md) |

---

## 五、待办 / Open Items

- ✅ **12 张全部已定位并插入章节。** 其中 `20260725-lion.png` 原文件名为「白之都 狮」，经作者确认实属**第二卷《魔影》**，已移至 `bs-o-cm-1-main-story-2/` 并落位 Ch.4 虎卫组之战。
- 本批均带画师水印；日后取得无水印版本按同名覆盖即可。
- 后续新增委托稿请遵循第二节的命名与归档规范。

---

[返回图片资源 / Return to Images](../) | [返回原作存档 / Return to Original Archives](../../README.md)

*最后更新 / Last Updated: 2026-09-16*

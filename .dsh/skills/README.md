# Skills 索引 / 该用哪个 skill

> 本目录 = 仓库级 agent skills。**DSH 只发现 `<name>/SKILL.md` 一层**；本 README 是给人（和读仓库的
> agent）看的路由表。发现规则与多层工作区的 junction 解法见 [`structure-report/SKILL.md`](structure-report/SKILL.md) 末节。

## 三分工：规范 / 骨架 / skill

| 层 | 位置 | 管什么 | 谁读 |
|---|---|---|---|
| **规范** | `docs/spec/`（14 结构 · 11 正文骨架 · 13 分级 · 04 元数据 · 02 编码） | 强制规则 | 人 + 校验器 |
| **骨架** | `templates/world-template/`（`forms/` v4.0） | 有哪些文件/块、顺序、标题怎么写 | 复制即可 |
| **skill** | 本目录 | 怎么做、做完怎么验 | 动手前加载 |

**规则冲突时以 `docs/spec/` 为准**；skill 只写流程与判断，不复制规范条文（避免漂移）。

## 路由表：任务 → skill

| 你要做的事 | 加载 | 不要用 |
|---|---|---|
| 新建世界观 / 作品 / 加一章 | [`work-scaffold`](work-scaffold/SKILL.md) | ~~story-craft~~（它不管建目录） |
| 写 / 续写正文（**每一块写什么**） | [`story-craft`](story-craft/SKILL.md) | ~~work-scaffold~~ |
| 写完正文核对骨架（H1/分幕/END/评述区） | [`story-format-guard`](story-format-guard/SKILL.md) | ~~qa-runner~~（它不解释规范） |
| 移动 / 重命名目录、整理历史遗留目录 | [`structure-guard`](structure-guard/SKILL.md) | ~~link-doctor~~（先结构、后链接） |
| 修断链（check-links 报错） | [`link-doctor`](link-doctor/SKILL.md) | ~~structure-guard~~（它不改链接文本） |
| 跑校验 / 解读校验结果 | [`qa-runner`](qa-runner/SKILL.md) | 逐条规范都在 spec 里 |
| 生成目录结构快照 | [`structure-report`](structure-report/SKILL.md) | ~~structure-guard~~（那是合规校验） |
| 建 / 补 / 批量维护角色档案 | [`archive-curator`](archive-curator/SKILL.md) | 其余 skill |

**典型串法**：`work-scaffold`（搭骨架）→ `story-craft`（填内容）→ `story-format-guard`（自检）→
`qa-runner`（跑校验）→ 提交；中途动过目录则先 `structure-guard` 再 `link-doctor`。

## 各 skill 的边界（容易混的地方）

| skill | 负责 | 明确不负责 |
|---|---|---|
| `work-scaffold` | 生成目录骨架、补齐 `metadata.yaml`/`README.md` 字段 | 正文内容；正文骨架的细节（指向 `story-format-guard`） |
| `story-craft` | 每一块写什么、节奏、风格、各世界专用写法 | 目录结构；格式合规判定 |
| `story-format-guard` | 骨架合规的逐项自检、旧写法清单 | 内容好坏；目录结构 |
| `structure-guard` | 目录归位、移动前后的流程与铁律 | 链接文本修复（交给 `link-doctor`） |
| `link-doctor` | 断链的判定与安全修复手法 | 该不该移动（交给 `structure-guard`） |
| `qa-runner` | 跑哪几个脚本、怎么读退出码与「欠债」 | 具体怎么改（各 skill / spec） |
| `structure-report` | 生成快照 | 合规校验（那是 `check-structure`） |
| `archive-curator` | 角色档案与三级索引 | 故事正文与评述区 |

## 世界级 skill（不是 DSH skill，是参考资料）

`worlds/<world>/skills/` 下是**纯文档**（没有 `SKILL.md`、不被 DSH 自动发现），按需打开。
以兽盾为例：

| 位置 | 内容 |
|---|---|
| [`worlds/beastshield/skills/README.md`](../../worlds/beastshield/skills/README.md) | 兽盾 skill 总索引 |
| `worlds/beastshield/skills/lanse-write/` | lanse 风味写作技能（含 `beastshield-writing-guidelines.md`） |
| `worlds/beastshield/skills/story-preset/` | 故事预设与口味配方 |
| `worlds/beastshield/skills/lanse-review/`、`style-calibrator/`、`anti-checklist-review/` | 审阅与风格校准 |
| 世界级硬规则 | 仍以 `worlds/<world>/AGENTS.md` 为准 |

新世界要加专属写法时：优先写进 `worlds/<world>/AGENTS.md`（必读）或 `worlds/<world>/skills/`（按需）。

## 维护约定

- 新增 skill：建 `.dsh/skills/<kebab-name>/SKILL.md`，frontmatter 必须有 `name`（kebab-case）与
  `description`（一句说清「做什么 + 什么时候用」），并**在本 README 路由表加一行**。
- 规范版本升级（如 spec/11 v3.0→v4.0）时，同步检查：`story-craft`（含 `references/`）、
  `story-format-guard`、`work-scaffold`、`qa-runner` 四处引用。
- 不要把规范条文抄进 skill；改成「见 spec §X」+ 只留可执行步骤。

#!/usr/bin/env node
// new-work.js — 按 docs/spec/14-work-structure.md 生成标准作品骨架
//
// 用法:
//   node scripts/new-work.js --world beastshield --form cm --code bs-a-cm-3-foo \
//        --title-zh "作品中文名" [--title-en "English Title"] \
//        [--location adaptation-works] [--lang chinese] [--universe beastshield] [--dry]
//
// 生成:
//   <作品目录>/{README.md, metadata.yaml, chapters/.gitkeep(分章), images/README.md,
//              .process/{plans,ai-discussion,settings,history,archive}/README.md}
//
// form: cm=主线分章 | cs=支线分章 | s=短篇（短篇不建 chapters/，正文为 <code>.md）
'use strict';
const fs = require('fs');
const path = require('path');

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) {
    const k = a.slice(2);
    const v = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
    args[k] = v;
  }
}
const DRY = !!args.dry;
const req = ['world', 'form', 'code', 'title-zh'];
for (const r of req) if (!args[r]) { console.error('缺参数 --' + r); process.exit(2); }
if (!['cm', 'cs', 's'].includes(args.form)) { console.error('--form 必须是 cm | cs | s'); process.exit(2); }

const world = args.world;
const code = args.code;
const form = args.form;
const location = args.location || (code.includes('-o-') ? 'original-archives' : 'adaptation-works');
const lang = args.lang || 'chinese';
const universe = args.universe || world;
const titleZh = args['title-zh'];
const titleEn = args['title-en'] || '';
const today = new Date().toISOString().slice(0, 10);

const base = location === 'original-archives'
  ? path.join('worlds', world, 'original-archives', lang, form === 's' ? 'short-stories' : 'chaptered-stories', code)
  : path.join('worlds', world, 'adaptation-works', form === 's' ? 'short-stories' : 'chaptered-stories', code);

const files = {};
files['README.md'] = `# ${titleZh}${titleEn ? ' / ' + titleEn : ''}

> 状态：drafting · 编码：\`${code}\` · 最后更新：${today}

---

## 一、内容分级 / Content Rating

| 维度 | 级别 | 说明 |
|:--|:--:|:--|
| 🔞 性内容 / Sexual Content | Lv.0 | |
| 💀 暴力与死亡 / Violence & Death | Lv.0 | |
| 🧠 心理黑暗度 / Psychological Darkness | Lv.0 | |
| ⚡ 特殊触发 / Specific Triggers | — | |

## 二、内容标签 / Content Tags

- **物种**：
- **核心要素**：
- **叙事风格**：
- **结局指向**：

## 三、目录 / Directory

- 正文：\`chapters/\`${form === 's' ? '（短篇：`' + code + '.md`）' : ''}
- 元数据：\`metadata.yaml\`
- 过程文档：\`.process/\`

---

*创建日期：${today}*
`;

files['metadata.yaml'] = `# Beastkin Universe Metadata v3.0
work:
  code: "${code}"
  title:
    chinese: "${titleZh}"
    english: "${titleEn}"
  format: "${form === 's' ? 'short-story' : 'chaptered-story'}"
  form_type: "${form}"
  status: "drafting"           # drafting | updating | completed | abandoned
  location: "${location}"
  subtype: ""
  promotion_status: "not_eligible"
  work_type: "${location === 'original-archives' ? 'full-original' : 'adaptation'}"
  tags: []
  content_warnings: []

creation:
  author: ""
  start_date: "${today}"
  last_update: "${today}"
  universe_based_on: "${universe}"
`;

files['images/README.md'] = `# 图片 / Images

本作品相关插图与委托稿。命名：\`${code}-<用途>-<日期>-<描述>.png\`
`;

if (form !== 's') files['chapters/.gitkeep'] = '';
if (form === 's') files['chapters/' + code + '.md'] = `# Story ${titleZh}

---

> *{故事简介}*

---

**Scene-1 {场景标题}**

（正文）

---

**Story END**

> *{故事结束语}*

---

## 故事评述与感慨
`;

const procStub = {
  'plans': '# 计划 / Plans\n\n章节计划与全局优化方案。命名：`ch-001-plan.md` 或 `YYYY-MM-DD-主题.md`。\n',
  'ai-discussion': '# AI 讨论 / AI Discussions\n\n与 AI 的讨论记录。命名：`YYYY-MM-DD-主题.md`，并在 `INDEX.md` 登记。\n\n- INDEX.md 索引（建立后在此列出）\n',
  'settings': '# 创作期设定 / Working Settings\n\n创作过程中的设定稿（characters/ scenes/ systems/ levels/ 等）。\n',
  'history': '# 历史版本 / History\n\n旧版本稿。命名：`ch-001-slug-v2.md`。\n',
  'archive': '# 归档 / Archive\n\n已完成或废弃的计划与讨论。\n',
};
for (const [k, v] of Object.entries(procStub)) files['.process/' + k + '/README.md'] = v;

for (const [rel, content] of Object.entries(files)) {
  const abs = path.join(process.cwd(), base, rel);
  if (fs.existsSync(abs)) { console.log('SKIP(已存在) ' + path.join(base, rel)); continue; }
  console.log((DRY ? '[DRY] ' : '[CREATE] ') + path.join(base, rel).replace(/\\/g, '/'));
  if (!DRY) { fs.mkdirSync(path.dirname(abs), { recursive: true }); fs.writeFileSync(abs, content, 'utf8'); }
}
console.log('\n作品目录: ' + base.replace(/\\/g, '/'));
console.log('下一步: 填 metadata.yaml 与 README 分级表 → node scripts/qa/check-structure.js ' + base.replace(/\\/g, '/'));

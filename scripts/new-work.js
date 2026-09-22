#!/usr/bin/env node
// new-work.js — 按 templates/world-template/work-template/ 生成标准作品骨架（骨架唯一来源＝模板）
//
// 用法:
//   node scripts/new-work.js --world <world> --form <cm|cs|s> --code <编码> --title-zh "<中文名>" \
//        [--title-en "<English Title>"] [--location adaptation-works|original-archives] \
//        [--lang chinese|english] [--universe <world>] [--dry]
//
// 产物路径（docs/spec/14-work-structure.md §2/§3）:
//   adaptation-works/{chaptered-stories|short-stories}/<编码>/
//   original-archives/<lang>/{chaptered-stories/{main|side}|short-stories}/<编码>/
//
// 模板分工：templates/world-template/work-template/common/ 为共用骨架，forms/{chaptered|short}/ 为形态差异。
// 填充指导见 skill `.dsh/skills/story-craft`；格式规范见 docs/spec/11-story-format.md。
//
// 退出码: 0 = 成功；1 = 目标已存在；2 = 用法错误
'use strict';
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
function opt(name, def) {
  const i = argv.indexOf('--' + name);
  if (i < 0) return def;
  const v = argv[i + 1];
  return (v && !v.startsWith('--')) ? v : true;
}
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('用法: node scripts/new-work.js --world <world> --form <cm|cs|s> --code <编码> --title-zh "<中文名>" [--title-en "<English>"] [--location ...] [--lang chinese|english] [--dry]');
  process.exit(0);
}

const ROOT = path.join(__dirname, '..');
const TPL = path.join(ROOT, 'templates', 'world-template', 'work-template');
const DRY = !!opt('dry', false);

const world = opt('world', null);
const form = opt('form', null);
const code = opt('code', null);
const titleZh = opt('title-zh', null);
const titleEn = opt('title-en', '');
const lang = opt('lang', 'chinese');
const universe = opt('universe', world);
const today = new Date().toISOString().slice(0, 10);

if (!world || !form || !code || !titleZh) {
  console.error('缺参数：--world --form --code --title-zh 均为必填');
  process.exit(2);
}
if (!['cm', 'cs', 's'].includes(String(form))) { console.error('--form 必须是 cm | cs | s'); process.exit(2); }
if (!fs.existsSync(TPL)) { console.error('模板缺失：templates/world-template/work-template/'); process.exit(2); }

const isShort = form === 's';
const location = opt('location', code.includes('-o-') ? 'original-archives' : 'adaptation-works');
const relBase = location === 'original-archives'
  ? path.join('worlds', world, 'original-archives', lang,
      isShort ? 'short-stories' : path.join('chaptered-stories', form === 'cm' ? 'main' : 'side'), code)
  : path.join('worlds', world, 'adaptation-works',
      isShort ? 'short-stories' : 'chaptered-stories', code);

const dest = path.join(ROOT, relBase);
if (fs.existsSync(dest)) { console.error('目标已存在，未改动：' + relBase.replace(/\\/g, '/')); process.exit(1); }

const PLACEHOLDERS = {
  '{作品编码}': String(code),
  '{中文标题}': String(titleZh),
  '{English Title}': titleEn ? ' / ' + titleEn : '',
  '{世界}': String(world),
  '{类型}': String(form),
  '{YYYY-MM-DD}': today,
  '{lang}': String(lang),
};

function fill(text) {
  let t = text;
  for (const [k, v] of Object.entries(PLACEHOLDERS)) t = t.split(k).join(v);
  // metadata 的类型相关字段
  t = t.replace('format: "chaptered-story"     # chaptered-story | short-story',
                `format: "${isShort ? 'short-story' : 'chaptered-story'}"`);
  t = t.replace('location: "adaptation-works"  # original-archives | adaptation-works',
                `location: "${location}"`);
  t = t.replace('work_type: "adaptation"       # full-original | adaptation',
                `work_type: "${location === 'original-archives' ? 'full-original' : 'adaptation'}"`);
  return t;
}

const TEXT_EXT = new Set(['.md', '.yaml', '.yml', '.txt', '.json']);
let files = 0;

function copyTree(srcDir, dstDir) {
  fs.mkdirSync(dstDir, { recursive: true });
  for (const e of fs.readdirSync(srcDir, { withFileTypes: true })) {
    // 短篇形态不建 ch-001 骨架；分章形态不带短篇正文骨架
    const name = e.name.split('{作品编码}').join(String(code));
    const s = path.join(srcDir, e.name), d = path.join(dstDir, name);
    if (e.isDirectory()) { copyTree(s, d); continue; }
    const ext = path.extname(e.name).toLowerCase();
    if (TEXT_EXT.has(ext)) {
      fs.mkdirSync(path.dirname(d), { recursive: true });
      fs.writeFileSync(d, fill(fs.readFileSync(s, 'utf8')));
    } else {
      fs.mkdirSync(path.dirname(d), { recursive: true });
      fs.copyFileSync(s, d);
    }
    files++;
  }
}

if (DRY) {
  (function list(src, rel) {
    for (const e of fs.readdirSync(src, { withFileTypes: true })) {
      const name = e.name.split('{作品编码}').join(String(code));
      const r = rel ? rel + '/' + name : name;
      if (e.isDirectory()) list(path.join(src, e.name), r);
      else console.log('[DRY] ' + relBase.replace(/\\/g, '/') + '/' + r);
    }
  })(path.join(TPL, 'common'), '');
  (function list(src, rel) {
    for (const e of fs.readdirSync(src, { withFileTypes: true })) {
      const name = e.name.split('{作品编码}').join(String(code));
      const r = rel ? rel + '/' + name : name;
      if (e.isDirectory()) list(path.join(src, e.name), r);
      else console.log('[DRY] ' + relBase.replace(/\\/g, '/') + '/' + r);
    }
  })(path.join(TPL, 'forms', isShort ? 'short' : 'chaptered'), '');
  process.exit(0);
}

copyTree(path.join(TPL, 'common'), dest);
copyTree(path.join(TPL, 'forms', isShort ? 'short' : 'chaptered'), dest);

console.log('✅ 已创建作品骨架：' + relBase.replace(/\\/g, '/') + '（' + files + ' 个文件）');
console.log('   编码 ' + code + ' · 类型 ' + form + ' · 标题 ' + titleZh + (titleEn ? ' / ' + titleEn : ''));
console.log('\n下一步:');
console.log('  1) 填 metadata.yaml 与 README.md 的 4D 分级 + 9 类标签（判定标准 docs/spec/13-rating-criteria.md）');
console.log('  2) 正文写法见 skill `.dsh/skills/story-craft`；格式规范 docs/spec/11-story-format.md');
console.log('  3) 校验: node scripts/qa/check-structure.js ' + relBase.replace(/\\/g, '/') + ' 与 node scripts/qa/check-format.js ' + relBase.replace(/\\/g, '/'));

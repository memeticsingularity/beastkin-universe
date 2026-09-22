#!/usr/bin/env node
// new-world.js — 按 docs/spec/14-work-structure.md §2 生成标准世界观骨架
//
// 用法:
//   node scripts/new-world.js --world <world> --title-zh "<中文名>" [--title-en "<English>"] \
//        [--code <world-code>] [--dry]
//
// 生成（复制 templates/world-template/ 并替换占位符）:
//   worlds/<world>/{README.md, AGENTS.md, settings/, images/, skills/,
//                   original-archives/{chinese/{chaptered-stories/{main,side},short-stories,characters},
//                                      english/..., ai-discussion/},
//                   adaptation-works/{chaptered-stories,short-stories}}
//
// 骨架权威源：templates/world-template/（改模板即改本脚本产物）
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
  console.log('用法: node scripts/new-world.js --world <world> --title-zh "<中文名>" [--title-en "<English>"] [--code <world-code>] [--dry]');
  process.exit(0);
}

const ROOT = path.join(__dirname, '..');
const TEMPLATE = path.join(ROOT, 'templates', 'world-template');
const DRY = !!opt('dry', false);

const world = opt('world', null);
const titleZh = opt('title-zh', null);
const titleEn = opt('title-en', '');
const worldCode = opt('code', world);
const today = new Date().toISOString().slice(0, 10);

if (!world || !titleZh) { console.error('缺参数 --world 与 --title-zh'); process.exit(2); }
if (!/^[a-z0-9][a-z0-9-]*$/.test(String(world))) { console.error('--world 必须是小写 kebab-case（如 united-beasts-alliance）'); process.exit(2); }
if (!fs.existsSync(TEMPLATE)) { console.error('模板缺失：templates/world-template/'); process.exit(2); }

const dest = path.join(ROOT, 'worlds', world);
if (fs.existsSync(dest)) { console.error('目标已存在，未改动：worlds/' + world); process.exit(1); }

const TEXT_EXT = new Set(['.md', '.yaml', '.yml', '.txt', '.json']);
let files = 0, dirs = 0;

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  dirs++;
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) { copyDir(s, d); continue; }
    const ext = path.extname(e.name).toLowerCase();
    let content = fs.readFileSync(s, TEXT_EXT.has(ext) ? 'utf8' : undefined);
    if (TEXT_EXT.has(ext)) {
      content = content
        .split('{中文名}').join(String(titleZh))
        .split('{English Name}').join(String(titleEn))
        .split('{world-code}').join(String(worldCode))
        .split('{YYYY-MM-DD}').join(today);
    }
    fs.mkdirSync(path.dirname(d), { recursive: true });
    fs.writeFileSync(d, content);
    files++;
  }
}

if (DRY) {
  // 预演：只列出将创建的文件
  (function list(src, rel) {
    for (const e of fs.readdirSync(src, { withFileTypes: true })) {
      const r = rel ? rel + '/' + e.name : e.name;
      if (e.isDirectory()) list(path.join(src, e.name), r);
      else console.log('[DRY] worlds/' + world + '/' + r);
    }
  })(TEMPLATE, '');
  console.log('\n[DRY] 目标目录: worlds/' + world);
  process.exit(0);
}

copyDir(TEMPLATE, dest);
console.log('✅ 已创建世界观骨架: worlds/' + world + '（' + files + ' 个文件）');
console.log('   标题: ' + titleZh + (titleEn ? ' / ' + titleEn : '') + ' · 编码: ' + worldCode);
console.log('\n下一步:');
console.log('  1) 填 worlds/' + world + '/README.md（定位 + 分级 + 作品索引）');
console.log('  2) 填 worlds/' + world + '/settings/0-original-setting/（权威设定源）');
console.log('  3) 建第一个作品: node scripts/new-work.js --world ' + world + ' --form <cm|cs|s> --code <code> --title-zh "<标题>"');
console.log('  4) 校验: node scripts/qa/check-structure.js --world worlds/' + world);

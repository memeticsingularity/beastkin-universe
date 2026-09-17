#!/usr/bin/env node
// count-archives.js — 统计各兽种 / 各等级的档案数量（含 ⭐ 集体档案）
//
// 用法: node scripts/qa/count-archives.js <beastshield-company 目录>
//
// 输出可直接用于校对总索引领「已建档数」列。
// 口径: 该目录下全部 .md 档案文件数（不含各级 README.md）；
//       ⭐ 集体档案 = H1 以 ⭐ 开头的档案。
'use strict';
const fs = require('fs');
const path = require('path');

const COMPANY = process.argv[2];
if (!COMPANY) {
  console.error('用法: node scripts/qa/count-archives.js <beastshield-company 目录>');
  process.exit(2);
}

const h1 = file => {
  const t = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const m = t.match(/^#\s+(.*)$/m);
  return m ? m[1].trim() : '';
};

const species = fs.readdirSync(COMPANY, { withFileTypes: true })
  .filter(e => e.isDirectory() && e.name !== 'special')
  .map(e => e.name).sort();

console.log('兽种            合计  个体  ⭐集体      g   e   o   r   w');
let grand = 0, grandStar = 0;
const stars = [];

for (const sp of species) {
  const dir = path.join(COMPANY, sp);
  const ranks = fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory()).map(e => e.name).sort();
  const cells = {};
  let total = 0, star = 0;
  for (const rk of ranks) {
    const files = fs.readdirSync(path.join(dir, rk))
      .filter(f => f.endsWith('.md') && f !== 'README.md')
      .map(f => path.join(dir, rk, f));
    const s = files.filter(f => h1(f).startsWith('⭐')).length;
    files.forEach(f => { if (h1(f).startsWith('⭐')) stars.push(sp + '/' + rk + '/' + path.basename(f) + '   ' + h1(f)); });
    cells[rk] = files.length;
    total += files.length; star += s;
  }
  grand += total; grandStar += star;
  console.log(sp.padEnd(14) + String(total).padStart(4) + String(total - star).padStart(6) +
    String(star).padStart(7) + '   ' +
    ['g', 'e', 'o', 'r', 'w'].map(r => String(cells[r] || 0).padStart(4)).join(''));
}

const special = path.join(COMPANY, 'special');
if (fs.existsSync(special)) {
  const files = fs.readdirSync(special).filter(f => f.endsWith('.md') && f !== 'README.md')
    .map(f => path.join(special, f));
  const star = files.filter(f => h1(f).startsWith('⭐')).length;
  files.forEach(f => { if (h1(f).startsWith('⭐')) stars.push('special/' + path.basename(f) + '   ' + h1(f)); });
  grand += files.length; grandStar += star;
  console.log('special'.padEnd(14) + String(files.length).padStart(4) +
    String(files.length - star).padStart(6) + String(star).padStart(7));
}

console.log('\n合计: 文件 ' + (grand) + ' = 个体 ' + (grand - grandStar) + ' + ⭐集体 ' + grandStar);
if (stars.length) {
  console.log('\n=== ⭐ 集体档案清单 ===');
  stars.forEach(s => console.log('  ' + s));
}

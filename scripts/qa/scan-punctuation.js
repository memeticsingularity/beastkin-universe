#!/usr/bin/env node
// scan-punctuation.js — 扫描「汉字后的半角标点」，并区分引用块内 / 档案自撰
//
// 用法: node scripts/qa/scan-punctuation.js <目录>
//
// ⚠️ 重要：本仓库的**正文本身**就使用半角冒号（如「…笑了笑道:」）。
//    因此引用块（`>` 行）内的半角标点多为**忠实转录**，改动反而破坏原文保真。
//    只有「档案自撰」部分的半角标点才可能需要按「中文标点用中文」修正。
//    本脚本会把两者分开统计，避免误改。
// 跳过: 围栏代码块、行内代码、以及省略号连写（。。. / ...）。
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2];
if (!ROOT) {
  console.error('用法: node scripts/qa/scan-punctuation.js <目录>');
  process.exit(2);
}

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === '.git') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.isFile() && e.name.endsWith('.md')) files.push(p);
  }
})(ROOT);

let quoteColon = 0, proseColon = 0, quoteDot = 0, proseDot = 0, comma = 0, bang = 0;
const samples = [];

for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);
  let inFence = false;
  lines.forEach((raw, i) => {
    if (/^\s*(```|~~~)/.test(raw)) { inFence = !inFence; return; }
    if (inFence) return;
    const line = raw.replace(/`[^`]*`/g, '');
    const isQuote = /^\s*>/.test(line);
    for (const m of line.matchAll(/[\u4e00-\u9fff][:]/g)) {
      if (isQuote) quoteColon++;
      else { proseColon++; if (samples.length < 30) samples.push('冒号 ' + path.relative(ROOT, f) + ':' + (i + 1) + '  ' + line.trim().slice(0, 100)); }
    }
    for (const m of line.matchAll(/[\u4e00-\u9fff]\./g)) {
      const idx = m.index + m[0].length - 1;
      if (/[.．。…]{2,}/.test(line.slice(Math.max(0, idx - 2), idx + 3))) continue;  // 省略号
      if (isQuote) quoteDot++;
      else { proseDot++; if (samples.length < 60) samples.push('句号 ' + path.relative(ROOT, f) + ':' + (i + 1) + '  ' + line.trim().slice(0, 100)); }
    }
    comma += (line.match(/[\u4e00-\u9fff],/g) || []).length;
    bang  += (line.match(/[\u4e00-\u9fff][!?]/g) || []).length;
  });
}

console.log('扫描文件: ' + files.length);
console.log('半角冒号：引用块内 ' + quoteColon + ' | 档案自撰 ' + proseColon);
console.log('半角句号：引用块内 ' + quoteDot + ' | 档案自撰 ' + proseDot);
console.log('半角逗号(汉字后) ' + comma + ' | 半角叹/问号(汉字后) ' + bang);
console.log('\n引用块内的半角标点**不要动**（那是正文原样）；');
console.log('下面只列「档案自撰」部分的实例，那才是「中文标点用中文」的适用范围：');
if (samples.length) samples.forEach(s => console.log('  ' + s));
else console.log('  （档案自撰部分无半角标点）');

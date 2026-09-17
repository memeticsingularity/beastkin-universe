#!/usr/bin/env node
// check-format.js — 校验故事文件是否符合 docs/spec/11-story-format.md
//
// 用法: node scripts/qa/check-format.js <目录> [...更多目录]
//   例: node scripts/qa/check-format.js worlds/beastshield/original-archives/chinese
//
// 规范 §1 分章: H1 = "# Chapter {自然数} {中文标题}"，结束标记 = "**Chapter {自然数} END**"
// 规范 §2 短篇: H1 = "# Story {中文标题}"，结束标记 = "**Story END**"
//
// 断言:
//   1. H1 形式正确（判定为分章还是短篇：文件名 ch-*.md → 分章，否则 → 短篇）
//   2. 结束标记恰好 1 个（文件末尾不得再有第二个）
//   3. 结束标记位于「故事评述与感慨」之前
//   4. 无已废弃写法（# MS-001: … / # 作品名 - 第N章：… / # SS-00N: … /
//      **第一章完** / **第二章完** / **终章** / **完** / 两个标记同行）
// 退出码: 0 = 全部合规；1 = 存在违规
'use strict';
const fs = require('fs');
const path = require('path');

const roots = process.argv.slice(2).filter(a => !a.startsWith('-'));
if (!roots.length) {
  console.error('用法: node scripts/qa/check-format.js <目录> [...更多目录]');
  process.exit(2);
}

const DEPRECATED = [
  [/^#\s*MS-\d+:/,                       '废弃 H1：`# MS-00N: 作品名 - 第N章：标题`'],
  [/^#\s*[^\s#][^#]*\s-\s*第[一二三四五六七八九十百]+章/, '废弃 H1：`# 作品名 - 第N章：标题`'],
  [/^#\s*SS-\d+:/,                       '废弃 H1：`# SS-00N: 标题`'],
  [/^\*\*第[一二三四五六七八九十百]+章完\*\*\s*$/, '废弃结束标记：`**第N章完**`'],
  [/^\*\*终章\*\*\s*$/,                  '废弃结束标记：`**终章**`'],
  [/^\*\*完\*\*\s*$/,                    '废弃结束标记：`**完**`'],
];

let files = 0, bad = 0;
const issues = [];

function check(file) {
  const isChapter = /^ch-.*\.md$/i.test(path.basename(file));
  const lines = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);
  files++;
  const problems = [];

  const h1 = lines.find(l => /^#\s/.test(l));
  if (isChapter) {
    if (!h1 || !/^#\s*Chapter\s+\d+\s+\S/.test(h1)) problems.push('H1 不符合 §1: ' + JSON.stringify(h1 || ''));
  } else {
    if (!h1 || !/^#\s*Story\s+\S/.test(h1)) problems.push('H1 不符合 §2: ' + JSON.stringify(h1 || ''));
  }

  const endRe = /^\*\*Chapter\s*\d+\s*END\*\*\s*$|^\*\*Story\s*END\*\*\s*$/;
  const ends = [];
  lines.forEach((l, i) => { if (endRe.test(l)) ends.push(i + 1); });
  if (ends.length !== 1) problems.push('结束标记应恰好 1 个，实为 ' + ends.length + ' 个 @ ' + ends.join(','));

  const rev = lines.findIndex(l => /^##\s*故事评述与感慨/.test(l)) + 1;
  if (ends.length && rev && ends[0] > rev) problems.push('结束标记位于评述区之后（@' + ends[0] + ' vs 评述@' + rev + '）');

  lines.forEach((l, i) => {
    for (const [re, msg] of DEPRECATED) if (re.test(l)) problems.push(msg + ' @L' + (i + 1));
    if (/\*\*Chapter\s*\d+\s*END\*\*.*\|/.test(l)) problems.push('两个标记挤在同一行 @L' + (i + 1));
  });

  if (problems.length) { bad++; issues.push('  ' + file + '\n      ' + problems.join('\n      ')); }
}

function walk(d) {
  let entries;
  try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.name === '.git' || e.name === 'ai-discuss' || e.name === '.process' || e.name === 'english') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.isFile() && e.name.endsWith('.md') && e.name !== 'README.md' &&
             /^(ch-|bs-o-s-|bs-a-s-)/.test(e.name)) check(p);
  }
}
for (const r of roots) walk(path.resolve(r));

console.log('受检故事文件: ' + files + ' | 不合规: ' + bad);
if (issues.length) { console.log('\n=== 明细 ==='); issues.forEach(i => console.log(i)); }
else console.log('全部符合 docs/spec/11-story-format.md');
process.exit(bad ? 1 : 0);

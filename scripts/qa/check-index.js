#!/usr/bin/env node
// check-index.js — 校验三级索引与档案文件数是否一致
//
// 用法: node scripts/qa/check-index.js <characters 目录>
//   例: node scripts/qa/check-index.js worlds/beastshield/original-archives/chinese/characters
//
// 检查三层：
//   1. 兽盾公司兽种 README（## 总览 或 ## 目录 表）行数 = 该兽种档案文件数
//   2. 各等级 README（| 档案 | 表）行数 = 该等级档案文件数
//   3. 阵营 README（agent-bureau / bounty-hunters / others）是否覆盖其下全部档案
// 空目录（无文件也无 README）跳过，不算失败。
// 退出码: 0 = 全部一致；1 = 存在不一致
'use strict';
const fs = require('fs');
const path = require('path');

const CHARS = process.argv[2];
if (!CHARS) {
  console.error('用法: node scripts/qa/check-index.js <characters 目录>');
  process.exit(2);
}
const COMPANY = path.join(CHARS, 'beastshield-company');

function filesUnder(dir) {
  const acc = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.isFile() && e.name.endsWith('.md') && e.name !== 'README.md') {
        acc.push(path.relative(dir, p).replace(/\\/g, '/'));
      }
    }
  })(dir);
  return acc.sort();
}

let failures = 0;
const report = [];

// ---- 第 1 层：兽种 README ----
report.push('=== 兽盾公司：兽种 README（总览表 vs 文件）===');
if (fs.existsSync(COMPANY)) {
  for (const sp of fs.readdirSync(COMPANY, { withFileTypes: true })
    .filter(e => e.isDirectory()).map(e => e.name).sort()) {
    const dir = path.join(COMPANY, sp);
    const rp = path.join(dir, 'README.md');
    if (!fs.existsSync(rp)) { report.push('  !! 缺 README: ' + sp); failures++; continue; }
    const lines = fs.readFileSync(rp, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);
    const head = lines.findIndex(l => /^##\s*(总览|目录)\s*$/.test(l));
    let rows = 0; const linked = new Set();
    if (head >= 0) {
      for (let i = head + 1; i < lines.length; i++) {
        if (/^##\s/.test(lines[i])) break;
        const m = lines[i].match(/^\|\s*\[[^\]]*\]\(([^)]+\.md)\)/);
        if (m) { rows++; linked.add(m[1].replace(/^\.\//, '')); }
      }
    }
    const files = filesUnder(dir);
    const miss = files.filter(f => !linked.has(f));
    const ok = rows === files.length && miss.length === 0;
    if (!ok) failures++;
    report.push((ok ? '  OK   ' : '  FAIL ') + sp.padEnd(10) + ' 文件 ' + String(files.length).padStart(3) +
      ' / 表行 ' + String(rows).padStart(3) + (miss.length ? '  未挂: ' + miss.join(', ') : ''));
  }

  // ---- 第 2 层：等级 README ----
  report.push('');
  report.push('=== 兽盾公司：等级 README（档案表 vs 文件）===');
  for (const sp of fs.readdirSync(COMPANY, { withFileTypes: true })
    .filter(e => e.isDirectory()).map(e => e.name).sort()) {
    const spDir = path.join(COMPANY, sp);
    for (const rk of fs.readdirSync(spDir, { withFileTypes: true })
      .filter(e => e.isDirectory()).map(e => e.name).sort()) {
      const dir = path.join(spDir, rk);
      const raw = fs.readdirSync(dir);
      if (raw.length === 0) { report.push('  --   ' + (sp + '/' + rk).padEnd(12) + ' 空目录（跳过）'); continue; }
      const rp = path.join(dir, 'README.md');
      if (!fs.existsSync(rp)) { report.push('  !! 缺 README: ' + sp + '/' + rk); failures++; continue; }
      const lines = fs.readFileSync(rp, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);
      const hdr = lines.findIndex(l => /^\|\s*档案\s*\|/.test(l));
      let rows = 0; const linked = new Set();
      if (hdr >= 0) {
        for (let i = hdr + 2; i < lines.length; i++) {
          if (!/^\|/.test(lines[i])) break;
          const m = lines[i].match(/\]\(([^)]+\.md)\)/);
          if (m) { rows++; linked.add(m[1].replace(/^\.\//, '')); }
        }
      }
      const files = raw.filter(f => f.endsWith('.md') && f !== 'README.md').sort();
      const miss = files.filter(f => !linked.has(f));
      const ok = rows === files.length && miss.length === 0;
      if (!ok) failures++;
      report.push((ok ? '  OK   ' : '  FAIL ') + (sp + '/' + rk).padEnd(12) + ' 文件 ' + String(files.length).padStart(3) +
        ' / 表行 ' + String(rows).padStart(3) + (miss.length ? '  未挂: ' + miss.join(', ') : ''));
    }
  }
}

// ---- 第 3 层：阵营 README ----
report.push('');
report.push('=== 阵营 README（已建档表 vs 文件）===');
for (const fac of ['agent-bureau', 'bounty-hunters', 'others']) {
  const dir = path.join(CHARS, fac);
  if (!fs.existsSync(dir)) continue;
  const rp = path.join(dir, 'README.md');
  const linked = new Set();
  if (fs.existsSync(rp)) {
    for (const l of fs.readFileSync(rp, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/)) {
      const m = l.match(/\]\(([^)]+\.md)\)/);
      if (m) linked.add(m[1].replace(/^\.\//, ''));
    }
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'README.md');
  const miss = files.filter(f => !linked.has(f));
  const ok = miss.length === 0;
  if (!ok) failures++;
  report.push((ok ? '  OK   ' : '  FAIL ') + fac.padEnd(16) + ' 文件 ' + String(files.length).padStart(3) +
    (miss.length ? '  未挂: ' + miss.join(', ') : ''));
}

report.push('');
report.push(failures === 0 ? '全部索引层级一致 ✔' : '不一致项: ' + failures);
console.log(report.join('\n'));
process.exit(failures ? 1 : 0);

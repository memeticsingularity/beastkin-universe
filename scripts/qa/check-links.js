#!/usr/bin/env node
// check-links.js — 检查 Markdown 相对链接是否可解析
//
// 用法: node scripts/qa/check-links.js <目录或 .md 文件> [...更多路径]
//
// 跳过: 外部 URL、纯锚点 (#foo)、围栏代码块、行内代码、含 <...> 或 … 的模板占位符
// 退出码: 0 = 全部可解析；1 = 存在失效链接
'use strict';
const fs = require('fs');
const path = require('path');

const roots = process.argv.slice(2).filter(a => !a.startsWith('-'));
if (!roots.length) {
  console.error('用法: node scripts/qa/check-links.js <目录> [...更多目录]');
  process.exit(2);
}

const LINK = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

let filesScanned = 0, parsed = 0, skipped = 0, checked = 0;
const missing = [];
const byTarget = new Map();

function walk(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.name === '.git') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) scan(p);
  }
}

function scan(file) {
  // 模板目录内的链接一律指向占位符或示例路径，不参与校验
  if (file.split(path.sep).includes('templates')) { filesScanned++; return; }
  filesScanned++;
  const lines = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);
  let inFence = false;
  lines.forEach((raw, i) => {
    if (/^\s*(```|~~~)/.test(raw)) { inFence = !inFence; return; }
    if (inFence) return;
    const line = raw.replace(/`[^`]*`/g, '');   // 去掉行内代码
    let m; LINK.lastIndex = 0;
    while ((m = LINK.exec(line)) !== null) {
      parsed++;
      let target = m[1].trim();
      if (!target) { skipped++; continue; }
      if (/^(https?:|mailto:|tel:|data:)/i.test(target)) { skipped++; continue; }
      if (target.startsWith('#')) { skipped++; continue; }
      if (/[<>]|…/.test(target)) { skipped++; continue; }   // 模板占位符
      if (/[{}]|xxx/i.test(target)) { skipped++; continue; } // 模板占位符（{code} / ch-xxx 等）
      const hash = target.indexOf('#');
      if (hash >= 0) target = target.slice(0, hash);
      if (!target) { skipped++; continue; }
      let decoded = target;
      try { decoded = decodeURIComponent(target); } catch { /* 保持原样 */ }
      const abs = path.resolve(path.dirname(file), decoded);
      checked++;
      let ok = false;
      try { ok = fs.existsSync(abs); } catch { /* 视为不存在 */ }
      if (!ok) {
        missing.push({ file, line: i + 1, target });
        byTarget.set(abs, (byTarget.get(abs) || 0) + 1);
      }
    }
  });
}

// 参数既可以是目录，也可以是单个 .md 文件。
// 路径不存在时必须显式报错——否则会「扫了 0 个文件 -> 失效 0」，
// 给出静默的假阴性，比直接报错更危险。
let badPath = 0;
for (const r of roots) {
  let st;
  try { st = fs.statSync(r); } catch {
    console.error('路径不存在: ' + r);
    badPath++;
    continue;
  }
  if (st.isDirectory()) walk(r);
  else if (r.toLowerCase().endsWith('.md')) scan(r);
  else { console.error('既不是目录也不是 .md 文件: ' + r); badPath++; }
}
if (badPath) process.exit(2);

console.log('扫描 Markdown 文件: ' + filesScanned);
console.log('解析到链接: ' + parsed + ' | 已跳过(外部/锚点/模板): ' + skipped + ' | 实际校验: ' + checked);
console.log('失效链接: ' + missing.length);
if (missing.length) {
  console.log('\n=== 失效链接明细 ===');
  for (const x of missing) console.log(x.file + ':' + x.line + '  ->  ' + x.target);
  console.log('\n=== 按目标去重 ===');
  for (const [k, v] of [...byTarget.entries()].sort((a, b) => b[1] - a[1])) console.log('  ' + v + 'x  ' + k);
}
process.exit(missing.length ? 1 : 0);

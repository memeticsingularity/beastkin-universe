#!/usr/bin/env node
// 恢复：找出「git 显示删除、且仓库中已无同名同内容文件」的文件并还原
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ROOT = process.cwd();

const out = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8', cwd: ROOT });
const deleted = out.split(/\r?\n/).filter(l => /^ ?D /.test(l)).map(l => l.slice(3).trim().replace(/^"|"$/g, ''));
console.log('git 记录删除: ' + deleted.length);

// 建立现有文件的 basename -> [paths] 索引
const index = new Map();
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else { const b = e.name; if (!index.has(b)) index.set(b, []); index.get(b).push(p); }
  }
})(ROOT);

const restore = [];
for (const rel of deleted) {
  const base = path.basename(rel);
  const cands = index.get(base) || [];
  // 判断：是否有同名文件存在（合并目标）且内容与 HEAD 版本一致
  let ok = false;
  let head = '';
  try { head = execFileSync('git', ['show', 'HEAD:' + rel], { encoding: 'utf8', cwd: ROOT, maxBuffer: 64 * 1024 * 1024 }); } catch { }
  for (const c of cands) {
    try { if (fs.readFileSync(c, 'utf8') === head) { ok = true; break; } } catch { }
  }
  if (!ok) restore.push(rel);
}
console.log('需恢复: ' + restore.length);
if (restore.length) {
  for (const r of restore) console.log('  恢复 ' + r);
  for (let i = 0; i < restore.length; i += 50) {
    const chunk = restore.slice(i, i + 50);
    execFileSync('git', ['checkout', 'HEAD', '--', ...chunk], { cwd: ROOT, stdio: 'inherit' });
  }
  console.log('已用 git checkout 恢复 ' + restore.length + ' 个文件');
}

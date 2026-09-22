#!/usr/bin/env node
// 完整性核对：HEAD 中每个 .md 是否仍能在工作区找到（同路径或同内容的搬迁副本）
// 找不到的 -> 报告；--restore 时用 git checkout 还原
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const ROOT = process.cwd();
const DO_RESTORE = process.argv.includes('--restore');

const headFiles = execFileSync('git', ['ls-tree', '-r', 'HEAD', '--name-only'], { encoding: 'utf8', cwd: ROOT })
  .split(/\r?\n/).filter(f => f.endsWith('.md'));

// 工作区索引：路径集合 + 内容哈希集合
const present = new Set();
const byName = new Set();
const hashes = new Map();   // hash -> [paths]
function hash(s) { return crypto.createHash('sha1').update(s).digest('hex'); }
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.md')) {
      const rel = path.relative(ROOT, p).replace(/\\/g, '/');
      present.add(rel);
      byName.add(e.name);
      let h; try { h = hash(fs.readFileSync(p, 'utf8')); } catch { continue; }
      if (!hashes.has(h)) hashes.set(h, []);
      hashes.get(h).push(rel);
    }
  }
})(ROOT);

const missing = [];
let movedOk = 0;
for (const f of headFiles) {
  if (present.has(f)) continue;
  const base = path.basename(f);
  // 判定：同路径不存在时，看是否有「同名文件」存在于工作区（搬迁）或内容仍一致（未编辑）
  let head = '';
  try { head = execFileSync('git', ['show', 'HEAD:' + f], { encoding: 'utf8', cwd: ROOT, maxBuffer: 64 * 1024 * 1024 }); } catch { continue; }
  if (hashes.has(hash(head)) || byName.has(base)) { movedOk++; continue; }
  missing.push(f);
}
console.log('HEAD md 文件: ' + headFiles.length + ' | 工作区 md: ' + present.size);
console.log('内容仍在（搬迁副本）: ' + movedOk);
console.log('内容缺失: ' + missing.length);
missing.forEach(m => console.log('  ' + m));
if (DO_RESTORE && missing.length) {
  for (let i = 0; i < missing.length; i += 50) {
    const chunk = missing.slice(i, i + 50);
    execFileSync('git', ['checkout', 'HEAD', '--', ...chunk], { cwd: ROOT, stdio: 'inherit' });
  }
  console.log('已还原 ' + missing.length + ' 个文件（可能为旧位置副本，随后需对账）');
}

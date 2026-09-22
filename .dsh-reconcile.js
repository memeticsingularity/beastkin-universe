#!/usr/bin/env node
// 对账：刚恢复的文件中，若同作品内已存在同名文件（= 已搬迁的新位置），删除恢复出来的旧副本
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ROOT = process.cwd();

const out = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8', cwd: ROOT });
const untrackedOrModified = out.split(/\r?\n/).filter(Boolean);

function workRootOf(p) {
  let d = path.dirname(p);
  for (let i = 0; i < 8; i++) {
    if (fs.existsSync(path.join(d, 'metadata.yaml'))) return d;
    const up = path.dirname(d); if (up === d) break; d = up;
  }
  return null;
}
const SKIP = new Set(['.git', 'node_modules']);
function findSameName(root, base, exclude) {
  const hits = [];
  (function scan(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (SKIP.has(e.name)) continue;
      const q = path.join(d, e.name);
      if (e.isDirectory()) scan(q);
      else if (e.name === base && q !== exclude) hits.push(q);
    }
  })(root);
  return hits;
}

let removed = 0, kept = 0;
// 只看「未跟踪」的恢复文件（git checkout HEAD 会把它们变成与 HEAD 一致=未修改，但原路径已被删除时表现为 ?? 或 M）
for (const line of untrackedOrModified) {
  const status = line.slice(0, 2);
  const rel = line.slice(3).trim().replace(/^"|"$/g, '');
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs) || !rel.endsWith('.md')) continue;
  const work = workRootOf(abs);
  if (!work) continue;
  const hits = findSameName(work, path.basename(abs), abs);
  if (hits.length === 1) {
    fs.rmSync(abs);
    console.log(`删除旧副本 ${rel}  （现存 ${path.relative(ROOT, hits[0]).replace(/\\/g, '/')}）`);
    removed++;
  } else kept++;
}
console.log(`\n删除旧副本 ${removed} | 保留 ${kept}`);

#!/usr/bin/env node
// 收尾修复：①合并 .process/<std>/<std> 残留嵌套 ②剩余断链按「同作品 .process 下唯一同名文件」解析
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();
const SKIP = new Set(['.git', 'templates', 'node_modules']);

function walkDirs(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (!e.isDirectory() || SKIP.has(e.name)) continue;
    const p = path.join(d, e.name); out.push(p); walkDirs(p, out);
  }
  return out;
}

// ① 合并 .process/<std>/<std>（含递归）
function mergeUp(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  let n = 0;
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), t = path.join(dst, e.name);
    if (e.isDirectory()) { n += mergeUp(s, t); continue; }
    if (fs.existsSync(t)) { fs.rmSync(s); continue; }
    fs.renameSync(s, t); n++;
  }
  try { fs.rmdirSync(src); } catch { }
  return n;
}
let merged = 0;
for (const d of walkDirs(path.join(ROOT, 'worlds'))) {
  const segs = d.split(path.sep);
  const pi = segs.lastIndexOf('.process');
  if (pi < 0 || segs.length < pi + 3) continue;
  const std = segs[pi + 1], child = segs[pi + 2];
  if (std !== child) continue;
  const parent = segs.slice(0, pi + 2).join(path.sep);
  const n = mergeUp(d, parent);
  if (n) { merged++; console.log('合并 ' + path.relative(ROOT, d) + ' -> ' + path.relative(ROOT, parent) + ' (' + n + ' 项)'); }
}
console.log('合并嵌套标准目录: ' + merged);

// ② 剩余断链：同作品 .process/ 下唯一同名解析
function workRootOf(p) {
  let d = path.dirname(p);
  for (let i = 0; i < 8; i++) {
    if (fs.existsSync(path.join(d, 'metadata.yaml'))) return d;
    const up = path.dirname(d); if (up === d) break; d = up;
  }
  return null;
}
const LINK = /\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g;
let changed = 0, fixed = 0, unresolved = 0;
for (const dir of walkDirs(ROOT)) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isFile() || !e.name.endsWith('.md')) continue;
    const p = path.join(dir, e.name);
    const work = workRootOf(p);
    const text = fs.readFileSync(p, 'utf8');
    let touched = false;
    const out = text.split(/\r?\n/).map(line => {
      if (/^\s*(```|~~~)/.test(line)) return line;
      return line.replace(LINK, (m, label, target, title) => {
        if (/^(https?:|mailto:|tel:|data:)/i.test(target) || target.startsWith('#')) return m;
        if (/[<>{}]|…|xxx/i.test(target)) return m;
        let t = target, frag = '';
        const h = t.indexOf('#');
        if (h >= 0) { frag = t.slice(h); t = t.slice(0, h); }
        if (!t) return m;
        if (fs.existsSync(path.resolve(dir, t))) return m;
        if (!work) { unresolved++; return m; }
        // 在作品的 .process 下找唯一同名文件
        const base = path.basename(t);
        const hits = [];
        (function scan(d) {
          for (const x of fs.readdirSync(d, { withFileTypes: true })) {
            if (SKIP.has(x.name)) continue;
            const q = path.join(d, x.name);
            if (x.isDirectory()) scan(q);
            else if (x.name === base) hits.push(q);
          }
        })(path.join(work, '.process'));
        if (hits.length === 1) {
          const rel = path.relative(dir, hits[0]).replace(/\\/g, '/');
          fixed++; touched = true;
          return `[${label}](${rel}${frag}${title || ''})`;
        }
        unresolved++;
        return m;
      });
    }).join('\n');
    if (touched) { fs.writeFileSync(p, out, 'utf8'); changed++; }
  }
}
console.log(`同名解析: 文件 ${changed} | 链接 ${fixed} | 仍未决 ${unresolved}`);

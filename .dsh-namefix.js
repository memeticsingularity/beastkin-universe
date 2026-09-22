#!/usr/bin/env node
// 剩余断链：按「同作品 .process 下唯一同名文件」解析（存在性验证）
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();
const SKIP = new Set(['.git', 'node_modules']);

function walkDirs(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (!e.isDirectory() || SKIP.has(e.name)) continue;
    const p = path.join(d, e.name); out.push(p); walkDirs(p, out);
  }
  return out;
}
function workRootOf(p) {
  let d = path.dirname(p);
  for (let i = 0; i < 8; i++) {
    if (fs.existsSync(path.join(d, 'metadata.yaml'))) return d;
    const up = path.dirname(d); if (up === d) break; d = up;
  }
  return null;
}

const LINK = /\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g;
let changed = 0, fixed = 0, left = 0;
const leftovers = [];

for (const dir of walkDirs(ROOT)) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isFile() || !e.name.endsWith('.md')) continue;
    const p = path.join(dir, e.name);
    const work = workRootOf(p);
    if (!work) continue;
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
        const base = path.basename(t), hits = [];
        const procRoot = path.join(work, '.process');
        if (fs.existsSync(procRoot)) (function scan(d) {
          for (const x of fs.readdirSync(d, { withFileTypes: true })) {
            if (SKIP.has(x.name)) continue;
            const q = path.join(d, x.name);
            if (x.isDirectory()) scan(q);
            else if (x.name === base) hits.push(q);
          }
        })(procRoot);
        if (hits.length === 1) {
          const rel = path.relative(dir, hits[0]).replace(/\\/g, '/');
          fixed++; touched = true;
          return '[' + label + '](' + rel + frag + (title || '') + ')';
        }
        left++;
        leftovers.push(path.relative(ROOT, p).replace(/\\/g, '/') + ' : ' + target + (hits.length > 1 ? '  (同名多个)' : ''));
        return m;
      });
    }).join('\n');
    if (touched) { fs.writeFileSync(p, out, 'utf8'); changed++; }
  }
}
console.log('同名解析: 文件 ' + changed + ' | 链接 ' + fixed + ' | 未决 ' + left);
leftovers.slice(0, 20).forEach(l => console.log('  ' + l));

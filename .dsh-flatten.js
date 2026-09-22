#!/usr/bin/env node
// 过程目录拍平 + 深度修正链接（只改写磁盘上真实存在的路径，不做任何猜测）
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();

const LEGACY = new Set(['notes', 'plan', 'plans', 'ai-discuss', 'ai-discussions', 'discussion',
  'discussions', 'deepseek', 'chat', 'author-chat', 'insights', 'draft', 'drafts',
  'history', 'archive', 'settings', 'storyline', 'visualization', 'summary', 'check', 'tech', 'qa-session',
  'deepseek', 'process']);
const STD = new Set(['plans', 'ai-discussion', 'author-chat', 'settings', 'history', 'archive']);

function walkDirs(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (!e.isDirectory() || ['.git', 'templates', 'node_modules'].includes(e.name)) continue;
    const p = path.join(d, e.name); out.push(p); walkDirs(p, out);
  }
  return out;
}
function moveInto(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  let moved = 0;
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), t = path.join(dst, e.name);
    if (fs.existsSync(t)) { continue; }
    fs.renameSync(s, t); moved++;
  }
  return moved;
}

// ---- 1) 拍平 .process/<std>/<legacy>/ ----
let flattened = 0;
for (const d of walkDirs(path.join(ROOT, 'worlds'))) {
  const segs = d.split(path.sep);
  const pi = segs.lastIndexOf('.process');
  if (pi < 0 || segs.length !== pi + 3) continue;         // 只处理 .process/<std>/<X>
  const std = segs[pi + 1], child = segs[pi + 2];
  if (!STD.has(std) || !LEGACY.has(child)) continue;
  const parent = segs.slice(0, pi + 2).join(path.sep);   // 已是绝对路径
  const n = moveInto(d, parent);
  try { fs.rmdirSync(d); } catch { }
  if (n) { flattened++; console.log('拍平 ' + path.relative(ROOT, d) + ' -> ' + path.relative(ROOT, parent) + ' (' + n + ' 项)'); }
}
console.log('拍平目录: ' + flattened);

// ---- 2) 深度修正链接（存在性验证）----
const LINK = /\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g;
function fixPass() {
  let changed = 0, fixed = 0;
  for (const d of walkDirs(ROOT)) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (!e.isFile() || !e.name.endsWith('.md')) continue;
      const p = path.join(d, e.name);
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
          if (fs.existsSync(path.resolve(d, t))) return m;
          const tries = [
            path.resolve(d, '..', t),                    // 文件下沉一层
            path.resolve(d, '..', '..', t),              // 下沉两层
            path.resolve(d, path.basename(t)),           // 子目录被拍平：去掉目录段
            path.resolve(d, '..', path.basename(t)),
            path.resolve(d, path.basename(d), t),        // 反向（原先更深）
          ];
          for (const cand of tries) {
            if (!fs.existsSync(cand)) continue;
            const rel = path.relative(d, cand).replace(/\\/g, '/');
            fixed++; touched = true;
            return `[${label}](${rel}${frag}${title || ''})`;
          }
          return m;
        });
      }).join('\n');
      if (touched) { fs.writeFileSync(p, out, 'utf8'); changed++; }
    }
  }
  return { changed, fixed };
}
for (let i = 0; i < 3; i++) {
  const r = fixPass();
  console.log(`深度修正 pass${i + 1}: 文件 ${r.changed} | 链接 ${r.fixed}`);
  if (!r.changed) break;
}

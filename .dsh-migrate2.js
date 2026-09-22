#!/usr/bin/env node
// 结构迁移器（一次性工具）：生成移动计划 → 执行 → 跟随修正全部引用链接
//
// 用法:
//   node .dsh-migrate2.js plan-numbering      # 章节三位数重命名计划
//   node .dsh-migrate2.js plan-roottext       # 作品根散放正文 -> chapters/
//   node .dsh-migrate2.js plan-legacydirs     # 遗留目录归位
//   node .dsh-migrate2.js plan-shortcollections
//   node .dsh-migrate2.js apply               # 执行 .dsh-plan.json 并修正链接
//   node .dsh-migrate2.js apply --dry
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();
const PLAN = path.join(ROOT, '.dsh-plan.json');
const MOVES = path.join(ROOT, '.dsh-moves.json');
const SKIP_NESTED = new Set(['.git', 'templates', 'node_modules']);

function walkDirs(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (!e.isDirectory() || SKIP_NESTED.has(e.name)) continue;
    const p = path.join(d, e.name);
    out.push(p); walkDirs(p, out);
  }
  return out;
}
const allDirs = () => walkDirs(ROOT);
const isWorkRoot = d => fs.existsSync(path.join(d, 'metadata.yaml'));

// ---------- 计划生成 ----------
const cmd = process.argv[2] || '';
const plan = [];

if (cmd === 'plan-numbering') {
  for (const d of allDirs()) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (!e.isFile() || !/^ch-.*\.md$/i.test(e.name)) continue;
      const m = e.name.match(/^ch-(\d+)(.*)$/i);
      if (!m) continue;
      const num = String(Number(m[1])).padStart(3, '0');
      const next = 'ch-' + num + m[2];
      if (next === e.name) continue;
      const from = path.join(d, e.name), to = path.join(d, next);
      if (fs.existsSync(to)) { console.log('跳过(目标已存在) ' + path.relative(ROOT, to)); continue; }
      plan.push({ from: path.relative(ROOT, from), to: path.relative(ROOT, to) });
    }
  }
} else if (cmd === 'plan-roottext') {
  // 只搬「真正的正文」：名为 ch-*/bs-[oa]-s-*、等于作品编码、或 H1 为 # Story/# Chapter
  for (const d of allDirs()) {
    if (!isWorkRoot(d)) continue;
    const code = (fs.readFileSync(path.join(d, 'metadata.yaml'), 'utf8').match(/^\s*code\s*:\s*"([^"]+)"/m) || [])[1] || path.basename(d);
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (!e.isFile() || !e.name.endsWith('.md')) continue;
      if (['README.md', 'AGENTS.md'].includes(e.name) || /^metadata/.test(e.name)) continue;
      const isStoryName = /^(ch-|bs-[oa]-s-)/i.test(e.name) || e.name === code + '.md';
      let h1 = '';
      try { h1 = fs.readFileSync(path.join(d, e.name), 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).find(l => /^#\s/.test(l)) || ''; } catch { }
      if (!isStoryName && !/^#\s*(Story|Chapter)\b/.test(h1)) continue;
      const from = path.join(d, e.name), to = path.join(d, 'chapters', e.name);
      if (fs.existsSync(to)) continue;
      plan.push({ from: path.relative(ROOT, from), to: path.relative(ROOT, to) });
    }
  }
} else if (cmd === 'plan-metaroot') {
  // 作品根的过程类文档 -> .process/plans/
  for (const d of allDirs()) {
    if (!isWorkRoot(d)) continue;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (!e.isFile() || !e.name.endsWith('.md')) continue;
      if (!/^(GUIDE|CHANGELOG|CURRENT_STATUS|STATUS|TODO|NOTES|plan|README-v|commission)/i.test(e.name)) continue;
      const from = path.join(d, e.name), to = path.join(d, '.process', 'plans', e.name);
      if (fs.existsSync(to)) continue;
      plan.push({ from: path.relative(ROOT, from), to: path.relative(ROOT, to) });
    }
  }
} else if (cmd === 'plan-legacydirs') {
  const MAP = {
    notes: '.process/plans', plan: '.process/plans', plans: '.process/plans',
    'ai-discuss': '.process/ai-discussion', 'ai-discussion': '.process/ai-discussion',
    discussion: '.process/ai-discussion', discussions: '.process/ai-discussion',
    deepseek: '.process/ai-discussion', chat: '.process/ai-discussion', insights: '.process/ai-discussion',
    draft: '.process/history', drafts: '.process/history', history: '.process/history',
  };
  for (const d of allDirs()) {
    const base = path.basename(d);
    if (base === '.process' || d.includes(path.sep + '.process' + path.sep)) continue;
    let target = null;
    if (MAP[base]) target = MAP[base];
    else if (/scrapped$|deprecated$|obsolete$|_old$/i.test(base)) target = '.process/history';
    else if (base === 'en') target = 'english';
    if (!target) continue;
    // 找所属作品根（向上最近的 metadata.yaml）
    let w = d, found = null;
    for (let i = 0; i < 5; i++) {
      if (isWorkRoot(w)) { found = w; break; }
      const up = path.dirname(w); if (up === w) break; w = up;
    }
    if (!found) { console.log('跳过(找不到作品根) ' + path.relative(ROOT, d)); continue; }
    const to = path.join(found, target, base === 'en' ? 'chapters' : base);
    if (fs.existsSync(to)) { console.log('跳过(目标已存在) ' + path.relative(ROOT, to)); continue; }
    plan.push({ from: path.relative(ROOT, d), to: path.relative(ROOT, to), dir: true });
  }
} else if (cmd === 'plan-shortcollections') {
  const targets = [
    'worlds/beastshield/adaptation-works/short-stories/series-1-sentry-elimination/chapters',
    'worlds/beastshield/adaptation-works/short-stories/series-1-sentry-elimination/english/chapters',
    'worlds/beastshield/adaptation-works/short-stories/series-5-original-echoes/chapters',
  ];
  for (const t of targets) {
    const abs = path.join(ROOT, t);
    if (!fs.existsSync(abs)) continue;
    for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
      if (!e.isFile() || !e.name.endsWith('.md')) continue;
      const m = e.name.match(/^(\d+)-(.*)$/);
      if (!m) continue;
      const next = 'ch-' + String(Number(m[1])).padStart(3, '0') + '-' + m[2];
      if (next === e.name) continue;
      const to = path.join(abs, next);
      if (fs.existsSync(to)) { console.log('跳过(目标已存在) ' + path.relative(ROOT, to)); continue; }
      plan.push({ from: path.relative(ROOT, path.join(abs, e.name)), to: path.relative(ROOT, to) });
    }
  }
} else if (cmd !== 'apply') {
  console.error('未知命令: ' + cmd);
  process.exit(2);
}

if (cmd.startsWith('plan-')) {
  fs.writeFileSync(PLAN, JSON.stringify(plan, null, 2), 'utf8');
  console.log('计划条目: ' + plan.length + ' → ' + path.relative(ROOT, PLAN));
  const files = plan.filter(p => !p.dir).length, dirs = plan.filter(p => p.dir).length;
  console.log('  文件 ' + files + ' | 目录 ' + dirs);
  process.exit(0);
}

// ---------- 执行 ----------
const DRY = process.argv.includes('--dry');
const items = JSON.parse(fs.readFileSync(PLAN, 'utf8'));
const moves = [];   // {fromAbs, toAbs, dir}
let ok = 0, miss = 0;
for (const it of items) {
  const fromAbs = path.resolve(ROOT, it.from), toAbs = path.resolve(ROOT, it.to);
  if (!fs.existsSync(fromAbs)) { miss++; continue; }
  if (it.dir) {
    if (DRY) { console.log('[DRY] DIR ' + it.from + ' -> ' + it.to); ok++; continue; }
    fs.mkdirSync(path.dirname(toAbs), { recursive: true });
    // 逐文件搬移，避免整目录改名时目标已部分存在
    fs.mkdirSync(toAbs, { recursive: true });
    for (const e of fs.readdirSync(fromAbs, { withFileTypes: true })) {
      const s = path.join(fromAbs, e.name), t = path.join(toAbs, e.name);
      if (fs.existsSync(t)) { console.log('保留(目标已存在) ' + path.relative(ROOT, s)); continue; }
      fs.renameSync(s, t);
    }
    try { fs.rmdirSync(fromAbs); } catch { }
    moves.push({ fromAbs, toAbs, dir: true });
    ok++;
    continue;
  }
  if (fs.existsSync(toAbs)) { console.log('跳过(目标已存在) ' + it.to); continue; }
  if (DRY) { console.log('[DRY] ' + it.from + ' -> ' + it.to); ok++; continue; }
  fs.mkdirSync(path.dirname(toAbs), { recursive: true });
  fs.renameSync(fromAbs, toAbs);
  moves.push({ fromAbs, toAbs });
  ok++;
}
console.log(`\n执行: 成功 ${ok} | 源缺失 ${miss}${DRY ? ' (dry)' : ''}`);

if (!DRY) {
  fs.writeFileSync(MOVES, JSON.stringify(moves, null, 2), 'utf8');

  // ---------- 跟随修正引用 ----------
  const fileMap = new Map(), dirMap = [];
  for (const m of moves) (m.dir ? dirMap.push([m.fromAbs, m.toAbs]) : fileMap.set(m.fromAbs, m.toAbs));

  const newTargetFor = abs => {
    if (fileMap.has(abs)) return fileMap.get(abs);
    for (const [o, n] of dirMap) {
      const rel = path.relative(o, abs);
      if (!rel.startsWith('..') && !path.isAbsolute(rel)) return path.join(n, rel);
    }
    return null;
  };

  const LINK = /\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g;
  let touched = 0, rewritten = 0, unresolved = 0;
  for (const d of allDirs()) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (!e.isFile() || !e.name.endsWith('.md')) continue;
      const p = path.join(d, e.name);
      const text = fs.readFileSync(p, 'utf8');
      let changed = false;
      const out = text.split(/\r?\n/).map(line => {
        if (/^\s*(```|~~~)/.test(line)) return line;
        return line.replace(LINK, (mm, label, target, title) => {
          if (/^(https?:|mailto:|tel:|data:)/i.test(target) || target.startsWith('#')) return mm;
          if (/[<>{}]|…|xxx/i.test(target)) return mm;
          let t = target, frag = '';
          const h = t.indexOf('#');
          if (h >= 0) { frag = t.slice(h); t = t.slice(0, h); }
          if (!t) return mm;
          const abs = path.resolve(d, t);
          if (fs.existsSync(abs)) return mm;
          let nt = newTargetFor(abs);
          if (!nt) {
            // 兜底：文件本身被移动过，尝试「同目录 + 多一层/少一层」
            const deeper = path.resolve(d, '..', t);
            const shallower = path.resolve(d, path.basename(d), t);
            if (fs.existsSync(deeper)) nt = deeper;
            else if (fs.existsSync(shallower)) nt = shallower;
          }
          if (!nt) { unresolved++; return mm; }
          const rel = path.relative(d, nt).replace(/\\/g, '/');
          rewritten++; changed = true;
          return `[${label}](${rel}${frag}${title || ''})`;
        });
      }).join('\n');
      if (changed) { fs.writeFileSync(p, out, 'utf8'); touched++; }
    }
  }
  console.log(`链接跟随: 改动文件 ${touched} | 改写链接 ${rewritten} | 未能判定 ${unresolved}`);
}

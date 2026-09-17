#!/usr/bin/env node
// sync-tables.js — 把「新增但未挂进索引的档案」补进等级表 / 兽种总览表
//
// 用法:
//   node scripts/qa/sync-tables.js <beastshield-company 目录>                    # 预演（不改文件）
//   node scripts/qa/sync-tables.js <beastshield-company 目录> --write            # 等级表 + 兽种表都写
//   node scripts/qa/sync-tables.js <beastshield-company 目录> --level --write    # 只写等级表
//   node scripts/qa/sync-tables.js <beastshield-company 目录> --species --write  # 只写兽种总览表
//
// 行为:
//   - **既有行原样保留**（手写的编辑性描述不会被覆盖）
//   - 只为「未挂进索引」的档案生成新行，按叙事顺序（卷次 → 短篇 → 支线）插入
//   - 等级表列: | 档案 | 种族 | 登场 | 状态 |
//   - 兽种表列: | 角色 | 等级 | 身份 | 登场 | 状态 |
'use strict';
const fs = require('fs');
const path = require('path');

const COMPANY = process.argv[2];
const WRITE = process.argv.includes('--write');
const onlyLevel = process.argv.includes('--level');
const onlySpecies = process.argv.includes('--species');
const doLevel = !onlySpecies;
const doSpecies = !onlyLevel;

if (!COMPANY) {
  console.error('用法: node scripts/qa/sync-tables.js <beastshield-company 目录> [--level|--species] [--write]');
  process.exit(2);
}

// 支线作品顺序（影响叙事排序）
const SIDE = ['mo-quan', 'yan-liang', 'babysitter-lei'];

const strip = s => s.replace(/\*\*/g, '').replace(/`/g, '').trim();

function field(text, name) {
  const re = new RegExp('^\\|\\s*\\*{0,2}' + name + '\\*{0,2}\\s*\\|(.*)\\|\\s*$', 'm');
  const m = text.match(re);
  return m ? m[1].trim() : '';
}
const linkText = c => { const m = c.match(/\[([^\]]*)\]\(([^)]*)\)/); return m ? strip(m[1]) : strip(c); };

function firstAppearance(t) {
  for (const k of ['首次登场', '登场', '登场故事']) {
    const c = field(t, k);
    if (c) { const s = linkText(c); if (s && s !== '—') return s; }
  }
  return '';
}
function statusOf(t) {
  const s = strip(field(t, '状态'));
  if (!s) return '待补充';
  const m = s.match(/^(已死亡|死亡|存活|全员覆灭|全员死亡|重伤|失踪|未死亡|待补充|未知)/);
  if (!m) return s.split('——')[0].trim() || '待补充';
  const p = s.slice(m[0].length).match(/^（([^）]{1,24})）/);
  return m[0] + (p ? '（' + p[1] + '）' : '');
}
function gradeOf(t) {
  const s = strip(field(t, '等级/制服'));
  if (!s) return '—';
  const m = s.match(/^(G级|E级|O级|R级|W级|部长级|头目级|特工|无)/);
  return m ? m[1] : (s.split(/[·\s]/)[0] || '—');
}
function sortKey(n) {
  let m;
  if ((m = n.match(/vol-(\d+)-ch-(\d+)/))) return [1, +m[1], +m[2], n];
  if ((m = n.match(/-ss-(\d+)-/))) return [2, +m[1], 0, n];
  for (let i = 0; i < SIDE.length; i++) {
    if ((m = n.match(new RegExp(SIDE[i] + '-ch-(\\d+)')))) return [3, i, +m[1], n];
  }
  return [4, 0, 0, n];
}
const cmp = (a, b) => {
  const x = sortKey(a), y = sortKey(b);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return x[3] < y[3] ? -1 : 1;
};

function readAll(p) { return fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''); }
function writeAll(p, t) { if (WRITE) fs.writeFileSync(p, t, 'utf8'); }

let changed = 0;

// ---------- 等级表 ----------
if (doLevel) {
  console.log('=== 等级 README（| 档案 | 表）===');
  for (const sp of fs.readdirSync(COMPANY, { withFileTypes: true })) {
    if (!sp.isDirectory()) continue;
    const spDir = path.join(COMPANY, sp.name);
    for (const rk of fs.readdirSync(spDir, { withFileTypes: true })) {
      if (!rk.isDirectory()) continue;
      const dir = path.join(spDir, rk.name);
      const rp = path.join(dir, 'README.md');
      if (!fs.existsSync(rp)) continue;
      const lines = readAll(rp).split(/\r?\n/);
      const hdr = lines.findIndex(l => /^\|\s*档案\s*\|/.test(l));
      if (hdr < 0) continue;
      let end = hdr + 2;
      while (end < lines.length && /^\|/.test(lines[end])) end++;

      const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'README.md');
      const existing = new Map();
      for (let i = hdr + 2; i < end; i++) {
        const m = lines[i].match(/\]\(([^)]+\.md)\)/);
        if (m) existing.set(m[1], lines[i]);
      }
      const missing = files.filter(f => !existing.has(f)).sort(cmp);
      if (!missing.length) continue;

      const gen = new Map();
      for (const f of missing) {
        const t = readAll(path.join(dir, f));
        const h1 = (t.match(/^#\s+(.*)$/m) || [, f.replace(/\.md$/, '')])[1].trim();
        const art = /^##\s*配图/m.test(t);
        const appearance = [firstAppearance(t), strip(field(t, '身份'))].filter(Boolean).join(' · ').replace(/\|/g, '/') || '待补充';
        gen.set(f, '| [' + (art ? '🖼 ' : '') + h1.replace(/\[/g, '【').replace(/\]/g, '】') + '](' + f + ') | ' +
          (strip(field(t, '种族')) || '—') + ' | ' + appearance + ' | ' + statusOf(t) + ' |');
      }
      const all = [...new Set([...existing.keys(), ...gen.keys()])].sort(cmp);
      const out = [...lines.slice(0, hdr + 2), ...all.map(f => existing.get(f) || gen.get(f)), ...lines.slice(end)];
      writeAll(rp, out.join('\n'));
      changed++;
      console.log('  ADD  ' + sp.name + '/' + rk.name + '  +' + missing.length + ' -> ' + missing.join(', '));
    }
  }
}

// ---------- 兽种总览表 ----------
if (doSpecies) {
  console.log('=== 兽种 README（## 总览 / ## 目录 表）===');
  for (const sp of fs.readdirSync(COMPANY, { withFileTypes: true })) {
    if (!sp.isDirectory()) continue;
    const dir = path.join(COMPANY, sp.name);
    const rp = path.join(dir, 'README.md');
    if (!fs.existsSync(rp)) continue;
    const lines = readAll(rp).split(/\r?\n/);
    const head = lines.findIndex(l => /^##\s*(总览|目录)\s*$/.test(l));
    if (head < 0) continue;
    let end = head + 1;
    while (end < lines.length && !/^##\s/.test(lines[end])) end++;

    const files = [];
    (function walk(d, base) {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p, base);
        else if (e.isFile() && e.name.endsWith('.md') && e.name !== 'README.md') {
          files.push(path.relative(base, p).replace(/\\/g, '/'));
        }
      }
    })(dir, dir);

    const existing = new Map();
    for (let i = head + 1; i < end; i++) {
      const m = lines[i].match(/\]\(([^)]+\.md)\)/);
      if (m) existing.set(m[1].replace(/^\.\//, ''), lines[i]);
    }
    const missing = files.filter(f => !existing.has(f)).sort(cmp);
    if (!missing.length) { console.log('  OK   ' + sp.name + '  (' + files.length + ' 行)'); continue; }

    const gen = new Map();
    for (const f of missing) {
      const t = readAll(path.join(dir, f));
      const h1 = (t.match(/^#\s+(.*)$/m) || [, f.replace(/\.md$/, '')])[1].trim();
      const art = /^##\s*配图/m.test(t);
      gen.set(f, '| [' + (art ? '🖼 ' : '') + h1.replace(/\[/g, '【').replace(/\]/g, '】') + '](' + f + ') | ' +
        gradeOf(t) + ' | ' + (strip(field(t, '身份')).replace(/\|/g, '/') || '—') + ' | ' +
        (firstAppearance(t) || '—') + ' | ' + statusOf(t) + ' |');
    }
    const all = [...new Set([...existing.keys(), ...gen.keys()])].sort(cmp);
    const out = [...lines.slice(0, head + 1), '', ...all.map(f => existing.get(f) || gen.get(f)), ...lines.slice(end)];
    writeAll(rp, out.join('\n'));
    changed++;
    console.log('  ADD  ' + sp.name + '  +' + missing.length + ' -> ' + missing.join(', '));
  }
}

console.log('\n受影响文件: ' + changed + (WRITE ? '  [已写入]' : '  [预演，未改动]'));
if (!WRITE && changed) console.log('加 --write 才会真正写入。');

#!/usr/bin/env node
// check-structure.js — 校验作品目录结构是否符合 docs/spec/14-work-structure.md
//
// 用法: node scripts/qa/check-structure.js <目录> [...更多目录]
//   例: node scripts/qa/check-structure.js worlds
//       node scripts/qa/check-structure.js worlds/beastshield/adaptation-works/chaptered-stories/bs-a-cs-13-farmhouse
//
// 检查项:
//   1. 必备文件 README.md / metadata.yaml
//   2. 正文位置：分章(c m/cs) 必须在 chapters/ 且有 ch-*.md；短篇(s) 必须在作品根有 <编码>.md
//   3. 禁用目录名（notes/ plan/ plans/ ai-discuss/ discussions/ deepseek/ chat/ author-chat/ insights/ draft/ *scrapped/ en/ …）
//   4. 章节命名：ch-{三位数字}[-slug].md
//   5. 分卷目录名：仅 volume-{自然数}
//   6. 正文不得散落在作品根或非 chapters/ 目录
//   7. .process/ 子目录白名单：plans/ ai-discussion/ settings/ history/ archive/
//
// 退出码: 0 = 全部合规；1 = 存在不合规
'use strict';
const fs = require('fs');
const path = require('path');

const roots = process.argv.slice(2).filter(a => !a.startsWith('-'));
if (!roots.length) {
  console.error('用法: node scripts/qa/check-structure.js <目录> [...更多目录]');
  process.exit(2);
}

const BANNED_DIRS = new Set(['notes', 'plan', 'plans', 'ai-discuss', 'ai-discussions', 'discussion',
  'discussions', 'deepseek', 'chat', 'author-chat', 'insights', 'draft', 'drafts', 'en', 'chinese-copy']);
const BANNED_DIR_RE = /(scrapped|scrap|deprecated|obsolete|_old|bak)$/i;
const PROC_SUBDIRS = new Set(['plans', 'ai-discussion', 'settings', 'history', 'archive']);
const VOLUME_RE = /^volume-\d+$/;

let works = 0, bad = 0;
const issues = [];

function listDir(d) {
  try { return fs.readdirSync(d, { withFileTypes: true }); } catch { return []; }
}

function checkWork(w, problems) {
  const rel = p => path.relative(process.cwd(), p).replace(/\\/g, '/');
  const meta = path.join(w, 'metadata.yaml');
  const readme = path.join(w, 'README.md');
  if (!fs.existsSync(readme)) problems.push('缺 README.md');
  if (!fs.existsSync(meta)) problems.push('缺 metadata.yaml');

  let formType = null, code = path.basename(w);
  if (fs.existsSync(meta)) {
    const m = fs.readFileSync(meta, 'utf8').match(/^\s*form_type\s*:\s*"?([a-z]*)"?/m);
    if (m) formType = m[1] || null;
    const c = fs.readFileSync(meta, 'utf8').match(/^\s*code\s*:\s*"([^"]+)"/m);
    if (c) code = c[1];
  }

  // 递归扫描
  const chFiles = [];       // {p, rel, where}
  const bannedFound = [];
  const badVolume = [];
  const badChapterName = [];
  const procSubs = [];
  (function scan(d, depth) {
    if (depth > 5) return;
    for (const e of listDir(d)) {
      if (e.name === '.git' || e.name === 'english' && d === w) { /* english 合法，正文不在此检查 */ }
      const p = path.join(d, e.name);
      const relD = path.relative(w, p).replace(/\\/g, '/');
      if (e.isDirectory()) {
        if (BANNED_DIRS.has(e.name) || BANNED_DIR_RE.test(e.name)) bannedFound.push(relD);
        if (/^v\d+-/.test(e.name) || /^(vol|volume)-\d+-/.test(e.name) && !VOLUME_RE.test(e.name)) badVolume.push(relD);
        if (path.dirname(relD) === '.process' || relD.startsWith('.process/')) {
          if (relD.split('/').length === 2 && !PROC_SUBDIRS.has(e.name)) procSubs.push(relD);
        }
        scan(p, depth + 1);
      } else if (e.isFile() && /^ch-.*\.md$/i.test(e.name)) {
        chFiles.push({ p, rel: relD });
        if (!/^ch-\d{3}(-\d+)?(-[a-z0-9-]+)?\.md$/i.test(e.name)) badChapterName.push(relD);
      }
    }
  })(w, 0);

  const topChapters = chFiles.filter(f => !f.rel.includes('/'));
  const inChapters = chFiles.filter(f => /^chapters\//.test(f.rel) || /(^|\/)chapters\//.test(f.rel));

  if (formType === 's') {
    if (topChapters.length) problems.push('短篇作品不应有章节文件：' + topChapters.map(f => f.rel).join(', '));
    if (!fs.existsSync(path.join(w, code + '.md'))) problems.push('短篇正文缺失（应为 ' + code + '.md）');
  } else if (formType === 'cm' || formType === 'cs') {
    if (!inChapters.length) problems.push('分章作品缺 chapters/ 下的章节文件');
  } else {
    problems.push('metadata.yaml 缺 form_type（应为 cm/cs/s）');
  }

  if (topChapters.length) problems.push('章节不得散放在作品根或非 chapters/ 目录：' + topChapters.map(f => f.rel).join(', '));
  if (bannedFound.length) problems.push('禁用目录名（应按 §3 归入 .process/ 或 english/）：' + [...new Set(bannedFound)].join(', '));
  if (badVolume.length) problems.push('卷目录命名应为 volume-{数字}：' + [...new Set(badVolume)].join(', '));
  if (badChapterName.length) problems.push('章节命名应为 ch-{三位数字}[-slug].md：' + badChapterName.slice(0, 8).join(', ') + (badChapterName.length > 8 ? ' …' : ''));
  if (procSubs.length) problems.push('.process/ 下非标准子目录：' + [...new Set(procSubs)].join(', '));
}

function findWorks(d, out) {
  for (const e of listDir(d)) {
    if (e.name === '.git') continue;
    const p = path.join(d, e.name);
    if (!e.isDirectory()) continue;
    if (fs.existsSync(path.join(p, 'metadata.yaml'))) { out.push(p); continue; }
    findWorks(p, out);
  }
  return out;
}

const found = [];
for (const r of roots) {
  const abs = path.resolve(r);
  if (!fs.existsSync(abs)) { console.error('路径不存在: ' + r); process.exit(2); }
  const st = fs.statSync(abs);
  if (st.isDirectory() && fs.existsSync(path.join(abs, 'metadata.yaml'))) found.push(abs);
  else findWorks(abs, found);
}

for (const w of found) {
  works++;
  const problems = [];
  checkWork(w, problems);
  if (problems.length) {
    bad++;
    issues.push('  ' + path.relative(process.cwd(), w).replace(/\\/g, '/') + '\n      ' + problems.join('\n      '));
  }
}

console.log('受检作品: ' + works + ' | 不合规: ' + bad);
if (issues.length) { console.log('\n=== 明细 ==='); issues.forEach(i => console.log(i)); }
else console.log('全部符合 docs/spec/14-work-structure.md');
process.exit(bad ? 1 : 0);

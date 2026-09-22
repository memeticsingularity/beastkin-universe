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
const PROC_SUBDIRS = new Set(['plans', 'ai-discussion', 'author-chat', 'settings', 'history', 'archive']);
const VOLUME_RE = /^volume-\d+$/;

let works = 0, bad = 0;
const issues = [];
const noBody = [];   // 尚无已发布正文的作品（企划/未发布），只作提示

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
        const underProc = relD === '.process' || relD.startsWith('.process/');
        const isStdProcSub = underProc && relD.split('/').length === 2 && PROC_SUBDIRS.has(e.name);
        if (!isStdProcSub && (BANNED_DIRS.has(e.name) || BANNED_DIR_RE.test(e.name))) bannedFound.push(relD);
        // 卷目录命名只在 chapters/ 下要求
        const underChapters = relD === 'chapters' || relD.startsWith('chapters/');
        if (underChapters && /^v\d+-/.test(e.name)) badVolume.push(relD);
        if (underChapters && /^(vol|volume)-\d+-/.test(e.name) && !VOLUME_RE.test(e.name)) badVolume.push(relD);
        if (underProc && relD.split('/').length === 2 && !PROC_SUBDIRS.has(e.name)) procSubs.push(relD);
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
    if (topChapters.length) problems.push('短篇正文应放进 chapters/（不得放在作品根）：' + topChapters.map(f => f.rel).join(', '));
    const shortMd = listDir(path.join(w, 'chapters')).filter(e => e.isFile() && e.name.endsWith('.md'));
    // 尚未发布正文的作品（chapters/ 为空且无正文散落）只作提示，不算结构违规
    if (!shortMd.length) noBody.push(path.relative(process.cwd(), w).replace(/\\/g, '/'));
  } else if (formType === 'cm' || formType === 'cs') {
    // 只统计「已发布正文」（chapters/ 下、非 .process/）
    let published = 0;
    (function count(d, depth) {
      if (depth > 5) return;
      for (const e of listDir(d)) {
        const q = path.join(d, e.name);
        if (e.isDirectory()) { count(q, depth + 1); continue; }
        if (/^ch-.*\.md$/i.test(e.name)) published++;
      }
    })(path.join(w, 'chapters'), 0);
    if (!published && !inChapters.length) noBody.push(path.relative(process.cwd(), w).replace(/\\/g, '/'));
    else if (!inChapters.length) problems.push('分章作品缺 chapters/ 下的章节文件');
  } else {
    problems.push('metadata.yaml 缺 form_type（应为 cm/cs/s）');
  }

  // 作品根只允许固定条目（短篇正文也不得留在根）
  const ALLOWED_ROOT = new Set(['README.md', 'metadata.yaml', 'chapters', 'characters', 'images',
    'original-text', '.process', 'english', 'AGENTS.md', '.gitkeep']);
  for (const e of listDir(w)) {
    if (e.name === '.git' || ALLOWED_ROOT.has(e.name)) continue;
    problems.push('作品根出现非标准条目（应移入 chapters/ 或 .process/ 等固定位置）：' + e.name);
  }

  if (bannedFound.length) problems.push('禁用目录名（应按 §3 归入 .process/ 或 english/）：' + [...new Set(bannedFound)].join(', '));
  if (badVolume.length) problems.push('卷目录命名应为 volume-{数字}：' + [...new Set(badVolume)].join(', '));
  if (badChapterName.length) problems.push('章节命名应为 ch-{三位数字}[-slug].md：' + badChapterName.slice(0, 8).join(', ') + (badChapterName.length > 8 ? ' …' : ''));
  if (procSubs.length) problems.push('.process/ 下非标准子目录：' + [...new Set(procSubs)].join(', '));
}

function findWorks(d, out) {
  for (const e of listDir(d)) {
    if (e.name === '.git' || e.name === 'templates' || e.name === 'node_modules') continue;
    const p = path.join(d, e.name);
    if (!e.isDirectory()) continue;
    if (fs.existsSync(path.join(p, 'metadata.yaml'))) { out.push(p); continue; }
    findWorks(p, out);
  }
  return out;
}

// ---------- 世界观层校验（--world）：见 docs/spec/14-work-structure.md §2 ----------
const WORLD_TOP_ALLOWED = new Set(['README.md', 'AGENTS.md', 'settings', 'images', 'skills',
  'original-archives', 'adaptation-works', '.process', '.git', '.gitkeep']);
const LANG_LAYER_ALLOWED = new Set(['chaptered-stories', 'short-stories', 'characters', 'images', 'README.md', '.gitkeep']);
const ARCHIVE1_ALLOWED = new Set(['chinese', 'english', 'ai-discussion', 'characters', 'images', 'README.md', '.gitkeep']);
const FORM_GROUP_ALLOWED = new Set(['main', 'side', 'extras', '.gitkeep']);
const WORLD_BANNED = new Set(['character-archive', 'character-archives', 'templates', 'docs', 'notes',
  'setting', 'img', 'image', 'pics', 'skill', 'ai-discuss', 'chat', 'discusses', 'discussions']);
const WORK_PATH_RES = [
  /^original-archives\/(chinese|english)\/chaptered-stories\/(main|side|extras)\/[^/]+$/,
  /^original-archives\/(chinese|english)\/short-stories\/[^/]+$/,
  /^adaptation-works\/(chaptered-stories|short-stories)\/[^/]+$/,
];

function relOf(p) { return path.relative(process.cwd(), p).replace(/\\/g, '/'); }

function checkWorld(w) {
  const problems = [];
  const relD = p => path.relative(w, p).replace(/\\/g, '/');

  // 1) 顶层白名单 + 世界级命名
  if (!fs.existsSync(path.join(w, 'README.md'))) problems.push('世界观根缺 README.md');
  for (const e of listDir(w)) {
    if (e.name === '.git') continue;
    if (!WORLD_TOP_ALLOWED.has(e.name)) {
      problems.push(WORLD_BANNED.has(e.name)
        ? '禁止的世界级目录名（应为规范命名，见 spec §2.4）：' + e.name
        : '世界观根出现非标准条目（spec §2.1 白名单之外）：' + e.name);
    }
  }

  // 2) original-archives 第一层白名单（W1）
  const oa = path.join(w, 'original-archives');
  if (fs.existsSync(oa)) {
    for (const e of listDir(oa)) {
      if (!ARCHIVE1_ALLOWED.has(e.name)) {
        problems.push('original-archives 第一层只允许 chinese/english/ai-discussion/characters/images/README.md，实际出现：' + e.name);
      }
    }
    // 3) 语言层内部白名单（W3）+ chaptered-stories 分组（W4）
    for (const lang of ['chinese', 'english']) {
      const lp = path.join(oa, lang);
      if (!fs.existsSync(lp)) continue;
      for (const e of listDir(lp)) {
        if (!LANG_LAYER_ALLOWED.has(e.name)) problems.push(`${lang}/ 下只允许 chaptered-stories/short-stories/characters/images/README.md，实际出现：${e.name}`);
      }
      const cs = path.join(lp, 'chaptered-stories');
      if (fs.existsSync(cs)) {
        for (const e of listDir(cs)) {
          if (e.isFile()) {
            if (!['README.md', '.gitkeep'].includes(e.name)) problems.push(`${lang}/chaptered-stories/ 下不得直接放文件：${e.name}`);
            continue;
          }
          if (!FORM_GROUP_ALLOWED.has(e.name)) {
            problems.push(`${lang}/chaptered-stories/ 下应分入 main|side|extras，直接出现目录：${e.name}`);
          }
        }
      }
      // 短篇层同理：只允许作品目录 + README.md
      const ss = path.join(lp, 'short-stories');
      if (fs.existsSync(ss)) {
        for (const e of listDir(ss)) {
          if (e.isFile() && !['README.md', '.gitkeep'].includes(e.name)) {
            problems.push(`${lang}/short-stories/ 下不得直接放文件：${e.name}`);
          }
        }
      }
    }
  }

  // 4) 每个作品目录必须落在规范路径（W2/W5）
  const worksFound = [];
  (function scan(d) {
    for (const e of listDir(d)) {
      if (!e.isDirectory() || e.name === '.git') continue;
      const p = path.join(d, e.name);
      if (fs.existsSync(path.join(p, 'metadata.yaml'))) { worksFound.push(p); continue; }
      scan(p);
    }
  })(w);
  for (const wk of worksFound) {
    const rel = relD(wk);
    if (!WORK_PATH_RES.some(re => re.test(rel))) {
      problems.push('作品目录位置不合规：' + rel + '（应为 original-archives/<lang>/{chaptered-stories/{main|side|extras}|short-stories}/<编码> 或 adaptation-works/{chaptered-stories|short-stories}/<编码>）');
    }
  }

  // 5) 世界级散落正文（W2 的另一面）：作品目录之外不应出现 ch-*.md
  //    跳过讨论/分析/过程类目录（其中的 ch-*-analysis.md 等不是正文）
  const NON_STORY_DIRS = new Set(['ai-discussion', 'ai-discuss', 'insights', 'check', 'opt', 'process',
    'qa-session', 'setting', 'settings', 'tech', '_guides', 'history', 'archive', 'notes', 'draft', 'drafts']);
  const loose = [];
  (function scan(d) {
    for (const e of listDir(d)) {
      if (e.name === '.git') continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) {
        if (e.name.startsWith('.') || NON_STORY_DIRS.has(e.name)) continue;
        if (fs.existsSync(path.join(p, 'metadata.yaml'))) continue;   // 作品内部由作品校验负责
        scan(p);
      } else if (/^ch-.*\.md$/i.test(e.name)) loose.push(relD(p));
    }
  })(w);
  if (loose.length) problems.push('作品目录之外出现章节文件（应先建成作品）：' + loose.slice(0, 6).join(', ') + (loose.length > 6 ? ` …共 ${loose.length} 个` : ''));

  return { problems, works: worksFound.length };
}

// ---------- 执行 ----------
const WORLD_MODE = process.argv.includes('--world');

if (WORLD_MODE) {
  const worldDirs = [];
  for (const r of roots) {
    const abs = path.resolve(r);
    if (!fs.existsSync(abs)) { console.error('路径不存在: ' + r); process.exit(2); }
    // 传入 worlds/ 或仓库根时，逐个世界观；传入单个世界观目录时只查它
    const looksLikeWorld = fs.existsSync(path.join(abs, 'original-archives')) ||
      fs.existsSync(path.join(abs, 'adaptation-works')) ||
      fs.existsSync(path.join(abs, 'settings'));
    if (looksLikeWorld) worldDirs.push(abs);
    else for (const e of listDir(abs)) if (e.isDirectory() && e.name !== '.git') worldDirs.push(path.join(abs, e.name));
  }

  let wBad = 0, wTotal = 0, wWorks = 0;
  const wIssues = [];
  for (const w of worldDirs) {
    if (!fs.existsSync(path.join(w, 'README.md')) && !fs.existsSync(path.join(w, 'original-archives'))) continue;
    wTotal++;
    const { problems, works: n } = checkWorld(w);
    wWorks += n;
    if (problems.length) {
      wBad++;
      wIssues.push('  ' + relOf(w) + '\n      ' + problems.join('\n      '));
    }
  }
  console.log('受检世界观: ' + wTotal + '（内含作品 ' + wWorks + '） | 不合规: ' + wBad);
  if (wIssues.length) { console.log('\n=== 明细 ==='); wIssues.forEach(i => console.log(i)); }
  else console.log('全部符合 docs/spec/14-work-structure.md §2 世界观层规则');
  process.exit(wBad ? 1 : 0);
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
if (noBody.length) {
  console.log('\n=== 提示：尚无已发布正文（企划/未发布），不计为结构违规 ===');
  noBody.forEach(x => console.log('  ' + x));
}
process.exit(bad ? 1 : 0);

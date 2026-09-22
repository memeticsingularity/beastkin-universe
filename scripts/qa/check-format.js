#!/usr/bin/env node
// check-format.js — 校验故事文件是否符合 docs/spec/11-story-format.md
//
// 用法: node scripts/qa/check-format.js <目录> [...更多目录]
//   例: node scripts/qa/check-format.js worlds/beastshield/original-archives/chinese
//
// 规范 §1 分章: H1 = "# Chapter {自然数} {中文标题}"，结束标记 = "**Chapter {自然数} END**"
// 规范 §2 短篇: H1 = "# Story {中文标题}"，结束标记 = "**Story END**"
//
// 断言:
//   1. H1 形式正确（判定为分章还是短篇：文件名 ch-*.md → 分章，否则 → 短篇）
//   2. 结束标记恰好 1 个（文件末尾不得再有第二个）
//   3. 结束标记位于「故事评述与感慨」之前
//   4. 无已废弃写法（# MS-001: … / # 作品名 - 第N章：… / # SS-00N: … /
//      **第一章完** / **第二章完** / **终章** / **完** / 两个标记同行）
// 退出码: 0 = 全部合规；1 = 存在违规
'use strict';
const fs = require('fs');
const path = require('path');

const roots = process.argv.slice(2).filter(a => !a.startsWith('-'));
if (!roots.length) {
  console.error('用法: node scripts/qa/check-format.js <目录> [...更多目录]');
  process.exit(2);
}

const DEPRECATED = [
  [/^#\s*MS-\d+:/,                       '废弃 H1：`# MS-00N: 作品名 - 第N章：标题`'],
  [/^#\s*[^\s#][^#]*\s-\s*第[一二三四五六七八九十百]+章/, '废弃 H1：`# 作品名 - 第N章：标题`'],
  [/^#\s*SS-\d+:/,                       '废弃 H1：`# SS-00N: 标题`'],
  [/^\*\*第[一二三四五六七八九十百]+章完\*\*\s*$/, '废弃结束标记：`**第N章完**`'],
  [/^\*\*终章\*\*\s*$/,                  '废弃结束标记：`**终章**`'],
  [/^\*\*完\*\*\s*$/,                    '废弃结束标记：`**完**`'],
];

let files = 0, bad = 0;
const issues = [];

function check(file, expectStory) {
  const isChapter = !expectStory;
  const lines = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);
  files++;
  const problems = [];

  const h1 = lines.find(l => /^#\s/.test(l));
  if (isChapter) {
    if (!h1 || !/^#\s*Chapter\s+\d+\s+\S/.test(h1)) problems.push('H1 不符合 §1: ' + JSON.stringify(h1 || ''));
  } else {
    if (!h1 || !/^#\s*Story\s+\S/.test(h1)) problems.push('H1 不符合 §2: ' + JSON.stringify(h1 || ''));
  }

  const endRe = /^\*\*Chapter\s*\d+\s*END\*\*\s*$|^\*\*Story\s*END\*\*\s*$/;
  const ends = [];
  lines.forEach((l, i) => { if (endRe.test(l)) ends.push(i + 1); });
  if (ends.length !== 1) problems.push('结束标记应恰好 1 个，实为 ' + ends.length + ' 个 @ ' + ends.join(','));

  const rev = lines.findIndex(l => /^##\s*故事评述与感慨/.test(l)) + 1;
  if (ends.length && rev && ends[0] > rev) problems.push('结束标记位于评述区之后（@' + ends[0] + ' vs 评述@' + rev + '）');

  lines.forEach((l, i) => {
    for (const [re, msg] of DEPRECATED) if (re.test(l)) problems.push(msg + ' @L' + (i + 1));
    if (/\*\*Chapter\s*\d+\s*END\*\*.*\|/.test(l)) problems.push('两个标记挤在同一行 @L' + (i + 1));
  });

  if (problems.length) { bad++; issues.push('  ' + file + '\n      ' + problems.join('\n      ')); }
}

// 不参与检查的目录：这些位置放的是设定、计划、审阅报告、讨论稿等辅助文档，
// 它们不是故事正文，套用 §1/§2 的 H1 与结束标记反而会破坏其含义。
const SKIP_DIRS = new Set([
  '.process', 'ai-discuss', 'ai-discussion', 'insights', 'notes', 'plans', 'plan',
  'skills', 'reviews', 'reviews-adaptation', 'reviews-v1.1', 'history', 'draft', 'drafts',
  'discussions', 'chat', 'archive', 'visualization', 'settings', 'storyline', 'deepseek',
  'qa-session', 'check', 'tech', 'summary', 'english',
]);

// 形态判定：按「同一作品内多数文件已有的 H1 形态」，而非文件名。
// 原因：存在以 ch-*.md 命名的短篇集（如 bs-a-cs-1-shorts），按文件名硬判会把
//       `# Story 标题` 误判为违规；反之亦然。文件名仅作为作品无任何 H1 时的兜底。
function workRootOf(file) {
  let d = path.dirname(file);
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(d, 'metadata.yaml'))) return d;
    const up = path.dirname(d); if (up === d) break; d = up;
  }
  return path.dirname(file);
}
const storyWorks = new Map();   // work -> true(Story) / false(Chapter)
// 递归统计整个作品子树内的 H1 形态（作品根的章节通常在 chapters/ 等子目录里，
// 只数直属文件会得到 0/0 而误判为 Chapter）
function countVotes(d) {
  let story = 0, chapter = 0;
  let entries; try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return { story, chapter }; }
  for (const e of entries) {
    if (e.name === '.git' || SKIP_DIRS.has(e.name) || /^group-[a-z]-/.test(e.name) || /scrap|deprecat|obsolete/i.test(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) { const sub = countVotes(p); story += sub.story; chapter += sub.chapter; continue; }
    if (!e.name.endsWith('.md') || e.name === 'README.md' || !/^(ch-|bs-o-s-|bs-a-s-)/.test(e.name)) continue;
    let h1 = null;
    try { h1 = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).find(l => /^#\s/.test(l)); } catch { }
    if (h1 && /^#\s*Story\b/.test(h1)) story++;
    else if (h1 && /^#\s*Chapter\b/.test(h1)) chapter++;
  }
  return { story, chapter };
}
function formOf(work) {
  if (!storyWorks.has(work)) {
    const v = countVotes(work);
    if (process.env.DEBUG_FORMAT) console.error('[votes] ' + path.relative(process.cwd(), work) + ' story=' + v.story + ' chapter=' + v.chapter + ' -> ' + (v.story > v.chapter ? 'STORY' : 'CHAPTER'));
    storyWorks.set(work, v.story > v.chapter);
  }
  return storyWorks.get(work);
}

function walk(d) {
  let entries;
  try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.name === '.git' || SKIP_DIRS.has(e.name) || /^group-[a-z]-/.test(e.name) || /scrap|deprecat|obsolete/i.test(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.isFile() && e.name.endsWith('.md') && e.name !== 'README.md' &&
             /^(ch-|bs-o-s-|bs-a-s-)/.test(e.name)) {
      const wr = workRootOf(p);
      const byName = /^bs-[oa]-s-/.test(e.name) ? true : null;
      const expectStory = formOf(wr) === true || byName === true;
      check(p, expectStory);
    }
  }
}
for (const r of roots) walk(path.resolve(r));

console.log('受检故事文件: ' + files + ' | 不合规: ' + bad);
if (issues.length) { console.log('\n=== 明细 ==='); issues.forEach(i => console.log(i)); }
else console.log('全部符合 docs/spec/11-story-format.md');
process.exit(bad ? 1 : 0);

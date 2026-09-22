#!/usr/bin/env node
// check-format.js — 校验故事文件是否符合 docs/spec/11-story-format.md（v4.0）
//
// 用法: node scripts/qa/check-format.js <目录> [...更多目录]
//   例: node scripts/qa/check-format.js worlds/beastshield/original-archives/chinese
//
// 规范 §1 分章: H1 = "# Chapter {自然数} {中文标题}"，结束标记 = "**Chapter {自然数} END**"
// 规范 §2 短篇: H1 = "# Story {中文标题}"，结束标记 = "**Story END**"
// 规范 §1/§2 顺序: H1 → 导航 → 卷首语 → 正文 → 卷尾语 → END → 导航 → 评述区
// 规范 §4 评述区: "## 故事评述与感慨" + 三个固定三级块
//   他们最后的故事 / 还活着的人们 / 故事感慨
//
// 硬性断言（FAIL）:
//   1. H1 形式正确（形态按同作品多数 H1 判定，文件名兜底）
//   2. 结束标记恰好 1 个，且位于评述区之前
//   3. 无已废弃写法（# MS-001: … / # 作品名 - 第N章：… / # SS-00N: … /
//      **第一章完** / **终章** / **完** / 两个标记同行）
//   4. 参照骨架自身合规（templates/.../forms/**/chapters/* 必须满足 §1/§2/§4）
//
// 迁移欠债（只统计，不 FAIL；见 spec §9 与 project-docs/story-format-todo.md）:
//   评述区缺失 / 三个 ### 子块不齐 / v3.0 加粗分幕 **Scene-N** / 卷尾语在 END 之后 /
//   正文用 ### 当幕标题（### 保留给评述区）
//
// 退出码: 0 = 无硬性违规；1 = 存在硬性违规
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

const REV_RE = /^##\s*(故事评述与感慨|故事评述|Story Commentary and Reflections|Story Reflections)\s*$/;
const REVIEW_BLOCKS = ['他们最后的故事', '还活着的人们', '故事感慨'];
const REVIEW_BLOCKS_EN = ['Their Final Stories', 'Those Still Alive', 'Story Reflections'];
const END_RE = /^\*\*Chapter\s*\d+\s*END\*\*\s*$|^\*\*Story\s*END\*\*\s*$/;
const TAG_RE = /^【.+】\s*$/;
const BLOCK_START_RE = /^(#{1,6}\s|>|\||-{3,}\s*$|={3,}\s*$|[-*+]\s|\d+[.)]\s|\s{2,})/;

let files = 0, bad = 0;
const issues = [];
const debt = { noReview: [], missingBlocks: [], legacyScene: [], tailAfterEnd: [], h3AsAct: [], noneAtAll: [], tagNoBlank: [], headNoBlank: [] };

// §6 空行：行与行之间该有却没有空行的位置（排除代码围栏 / HTML 注释 / 行内折行）
function blankLineIssues(lines, problems) {
  let inFence = false;
  let setext = 0, tagNoBlank = 0, headNoBlank = 0;
  for (let i = 0; i < lines.length; i++) {
    const a = lines[i], b = lines[i + 1] === undefined ? '' : lines[i + 1];
    if (/^\s*```/.test(a)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const at = a.trim(), bt = b.trim();
    if (!at || !bt) continue;
    if (/^\[\/\/\]:|^<!--/.test(at)) continue;
    // ① 上下文中 `---` / `===` 紧贴正文行 → 上一行会被当成 setext 标题
    if (/^-{3,}$|^={3,}$/.test(bt) && !BLOCK_START_RE.test(at)) {
      setext++; problems.push('§6 `---` 紧贴正文（上一行会被渲染成 setext 标题）@L' + (i + 1));
    }
    // ② 评述标签行紧贴下一行 → 标签与评述并成一段
    if (TAG_RE.test(at)) tagNoBlank++;
    // ③ ## / ### 标题后紧跟非标题内容 → 标题块与正文粘连
    if (/^#{2,6}\s/.test(at) && !/^#{1,6}\s/.test(bt)) headNoBlank++;
  }
  return { setext, tagNoBlank, headNoBlank };
}

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

  const ends = [];
  lines.forEach((l, i) => { if (END_RE.test(l)) ends.push(i + 1); });
  if (ends.length !== 1) problems.push('结束标记应恰好 1 个，实为 ' + ends.length + ' 个 @ ' + ends.join(','));

  const rev = lines.findIndex(l => REV_RE.test(l.trim())) + 1;
  if (ends.length && rev && ends[0] > rev) problems.push('结束标记位于评述区之后（@' + ends[0] + ' vs 评述@' + rev + '）');

  lines.forEach((l, i) => {
    for (const [re, msg] of DEPRECATED) if (re.test(l)) problems.push(msg + ' @L' + (i + 1));
    if (/\*\*Chapter\s*\d+\s*END\*\*.*\|/.test(l)) problems.push('两个标记挤在同一行 @L' + (i + 1));
  });

  const bl = blankLineIssues(lines, problems);
  if (bl.tagNoBlank) debt.tagNoBlank.push(file + '  (' + bl.tagNoBlank + ' 处)');
  if (bl.headNoBlank) debt.headNoBlank.push(file + '  (' + bl.headNoBlank + ' 处)');

  if (problems.length) { bad++; issues.push('  ' + file + '\n      ' + problems.join('\n      ')); }

  // ---- 迁移欠债统计（不影响退出码）----
  const trimmed = lines.map(l => l.trim());
  const hasAnyBlock = trimmed.some(l => /^#{2,3}\s/.test(l)) || trimmed.some(l => /^\*\*Scene-\d+/.test(l));
  if (!hasAnyBlock) debt.noneAtAll.push(file);
  if (!rev) debt.noReview.push(file);
  else {
    const miss = REVIEW_BLOCKS.filter(k => !trimmed.some(l => l === '### ' + k))
      .filter((k, idx) => !trimmed.some(l => l === '### ' + REVIEW_BLOCKS_EN[idx]));
    if (miss.length) debt.missingBlocks.push(file + '  缺: ' + miss.join(' / '));
    // 评述区内的额外 ###（超出三个固定子块）
    const extra = trimmed.slice(rev).filter(l => /^###\s/.test(l) && !REVIEW_BLOCKS.includes(l.slice(4).trim())
      && !REVIEW_BLOCKS_EN.includes(l.slice(4).trim()));
    if (extra.length) debt.missingBlocks.push(file + '  评述区额外 ###: ' + extra.map(x => x.slice(4).trim()).slice(0, 3).join(', '));
  }
  if (trimmed.some(l => /^\*\*Scene-\d+/.test(l))) debt.legacyScene.push(file);
  if (ends.length === 1 && trimmed.slice(0, ends[0] - 1).some(l => /^>\s*\*.*\*$/.test(l)) === false
      && trimmed.slice(ends[0]).some(l => /^>\s*\*.*\*$/.test(l))) debt.tailAfterEnd.push(file);
  const bodyEnd = rev ? rev - 1 : lines.length;
  if (trimmed.slice(0, bodyEnd).some(l => /^###\s/.test(l))) debt.h3AsAct.push(file);
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

// ---- 参照骨架自检：模板必须自身符合 v4.0，否则是「无效模板」----
const tplRoot = path.resolve('templates/world-template/work-template/forms');
let tplFiles = 0;
const tplProblems = [];
function scanTemplates(d) {
  let entries; try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { scanTemplates(p); continue; }
    if (!e.name.endsWith('.md') || e.name === 'README.md') continue;
    tplFiles++;
    const raw = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);
    const lines = raw.map(l => l.trim());
    const h1 = lines.find(l => /^#\s/.test(l)) || '';
    const isStory = /^#\s*Story\b/.test(h1);
    const probs = [];
    if (!(isStory ? /^#\s*Story\s+\S/ : /^#\s*Chapter\s+\d+\s+\S/).test(h1)) probs.push('H1: ' + JSON.stringify(h1));
    if (lines.filter(l => END_RE.test(l)).length !== 1) probs.push('结束标记不为 1 个');
    if (!lines.some(l => REV_RE.test(l))) probs.push('缺 `## 故事评述与感慨`');
    for (const k of REVIEW_BLOCKS) if (!lines.some(l => l === '### ' + k)) probs.push('缺 `### ' + k + '`');
    if (lines.some(l => /^###\s/.test(l)) && !lines.some(l => REV_RE.test(l))) probs.push('### 未用于评述区');
    // §6 空行：模板自己不得教出「预览会合并」的写法
    const tplBl = blankLineIssues(raw, []);
    if (tplBl.setext) probs.push('§6 有 `---` 紧贴正文');
    if (tplBl.tagNoBlank) probs.push('§6 有 ' + tplBl.tagNoBlank + ' 处评述标签紧贴下一行（应空一行）');
    if (tplBl.headNoBlank) probs.push('§6 有 ' + tplBl.headNoBlank + ' 处标题后紧跟内容（应空一行）');
    if (probs.length) tplProblems.push('  ' + path.relative(process.cwd(), p) + '\n      ' + probs.join('\n      '));
  }
}
if (fs.existsSync(tplRoot)) scanTemplates(tplRoot);

// ---- 写法指南自检：skill 的 references 也在教骨架，必须与规范同步 ----
//   ① 不得出现 §6 的合并写法  ② 必须声明与 spec/11 一致的「骨架版本」
const refDir = path.resolve('.dsh/skills/story-craft/references');
let refFiles = 0;
const refProblems = [];
// 从规范自身读取当前版本（*版本: 4.0*）
let specVer = '4.0';
try {
  const specTxt = fs.readFileSync(path.resolve('docs/spec/11-story-format.md'), 'utf8');
  const m = specTxt.match(/^\*版本:\s*([0-9.]+)\*/m);
  if (m) specVer = m[1];
} catch { }
if (fs.existsSync(refDir)) {
  for (const f of fs.readdirSync(refDir).filter(x => x.endsWith('.md'))) {
    const p = path.join(refDir, f);
    refFiles++;
    const raw = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
    const probs = [];
    const bl = blankLineIssues(raw.split(/\r?\n/), []);
    if (bl.setext) probs.push('§6 有 `---` 紧贴正文');
    if (bl.tagNoBlank) probs.push('§6 有 ' + bl.tagNoBlank + ' 处评述标签紧贴下一行');
    if (bl.headNoBlank) probs.push('§6 有 ' + bl.headNoBlank + ' 处标题后紧跟内容');
    if (!/骨架版本/.test(raw)) probs.push('缺「骨架版本」标记（版本迭代未同步）');
    else if (!new RegExp('骨架版本[^\\n]*v' + specVer.replace('.', '\\.')).test(raw)) probs.push('「骨架版本」与 spec/11 v' + specVer + ' 不一致');
    if (probs.length) refProblems.push('  ' + path.relative(process.cwd(), p) + '\n      ' + probs.join('\n      '));
  }
}

console.log('受检故事文件: ' + files + ' | 硬性不合规: ' + bad);
if (issues.length) { console.log('\n=== 明细（必须修）==='); issues.forEach(i => console.log(i)); }
else console.log('全部符合 docs/spec/11-story-format.md §1–§7（硬性项）');
if (tplFiles) {
  if (tplProblems.length) { bad += tplProblems.length; console.log('\n=== 参照骨架不合规（模板无效，必须修）==='); tplProblems.forEach(i => console.log(i)); }
  else console.log('参照骨架自检: ' + tplFiles + ' 个模板文件全部符合 v' + specVer + '（含 §6 空行）');
}
if (refFiles) {
  if (refProblems.length) { bad += refProblems.length; console.log('\n=== 写法指南不合规（references 必须与规范同步）==='); refProblems.forEach(i => console.log(i)); }
  else console.log('写法指南自检: ' + refFiles + ' 个 reference 与 spec/11 v' + specVer + ' 同步（含 §6 空行）');
}
const debtTotal = debt.noReview.length + debt.legacyScene.length + debt.tailAfterEnd.length + debt.h3AsAct.length
  + debt.noneAtAll.length + debt.tagNoBlank.length + debt.headNoBlank.length;
if (debtTotal) {
  console.log('\n=== v4.0 迁移欠债（不计为 FAIL，见 spec §9 / project-docs/story-format-todo.md）===');
  console.log('  无评述区: ' + debt.noReview.length + ' 篇 | 缺固定子块: ' + debt.missingBlocks.length + ' 篇 | v3.0 加粗分幕: '
    + debt.legacyScene.length + ' 篇 | 卷尾语在 END 后: ' + debt.tailAfterEnd.length + ' 篇 | 正文用 ###: '
    + debt.h3AsAct.length + ' 篇 | 完全无分块: ' + debt.noneAtAll.length + ' 篇');
  console.log('  §6 空行合并风险：标签行紧贴评述 ' + debt.tagNoBlank.length + ' 篇 | 标题后紧跟正文 '
    + debt.headNoBlank.length + ' 篇');
  debt.tagNoBlank.slice(0, 10).forEach(x => console.log('      tag: ' + x));
  debt.headNoBlank.slice(0, 10).forEach(x => console.log('      head: ' + x));
}
process.exit(bad ? 1 : 0);

#!/usr/bin/env node
// check-quotes.js — 校验角色档案「登场原文」的引用是否真的来自正文
//
// 用法: node scripts/qa/check-quotes.js <characters 目录> <chaptered-stories 目录>
//
// 「正文」= 章节文件中 `## 故事评述与感慨` 之前的区域。
// 逐字符校验只能证明「引用行在章节文件里存在」，无法排除它其实摘自评述区。
// 本脚本补上这一环：把每条 `>` 引用定位回源文件行号，断言其落在正文区内。
//
// 说明: 若某行「未定位」，通常是引用时把硬换行的段落拼回成了一段（正常现象），
//       不等于违规；只有 inCommentary > 0 才是真正的问题。
'use strict';
const fs = require('fs');
const path = require('path');

const CHARS = process.argv[2];
const STORIES = process.argv[3];
if (!CHARS || !STORIES) {
  console.error('用法: node scripts/qa/check-quotes.js <characters 目录> <chaptered-stories 目录>');
  process.exit(2);
}

// 建立故事文件索引：去空白行 -> 首个行号，以及正文区截止行
const storyIndex = new Map();
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.isFile() && e.name.endsWith('.md')) {
      const lines = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);
      let cut = lines.length + 1;
      for (let i = 0; i < lines.length; i++) {
        if (/^##\s*故事评述与感慨/.test(lines[i])) { cut = i + 1; break; }
      }
      const map = new Map();
      const norm = s => s.replace(/\s+/g, '');
      for (let i = 0; i < lines.length; i++) {
        const k = norm(lines[i]);
        if (k && !map.has(k)) map.set(k, i + 1);
      }
      storyIndex.set(path.basename(p), { map, cut });
    }
  }
})(STORIES);

let archives = 0, quotes = 0, inCommentary = 0, unmatched = 0;
const violations = [];

(function walkChars(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walkChars(p);
    else if (e.isFile() && e.name.endsWith('.md') && e.name !== 'README.md') {
      const rel = path.relative(CHARS, p).replace(/\\/g, '/');
      const lines = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);
      archives++;
      let inSection = false, currentStory = null;
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        if (/^##\s/.test(l)) inSection = /登场原文/.test(l);
        const lm = l.match(/\]\(([^)]+\.md)\)/);
        if (lm) { const b = path.basename(lm[1]); if (storyIndex.has(b)) currentStory = b; }
        if (!inSection || !/^\s*>/.test(l)) continue;
        if (/^\s*>\s*——/.test(l)) continue;          // 过渡标注
        const content = l.replace(/^\s*>\s?/, '');
        if (!content.trim()) continue;
        quotes++;
        if (!currentStory) { unmatched++; continue; }
        const st = storyIndex.get(currentStory);
        const ln = st.map.get(content.replace(/\s+/g, ''));
        if (ln === undefined) { unmatched++; continue; }
        if (ln >= st.cut) {
          inCommentary++;
          violations.push('  ' + rel + ':' + (i + 1) + '  -> ' + currentStory + ' L' + ln +
            '（评述区起始 @ L' + st.cut + '）');
        }
      }
    }
  }
})(CHARS);

console.log('扫描档案: ' + archives);
console.log('「登场原文」引用行: ' + quotes);
console.log('  落在评述区之后（违规）: ' + inCommentary);
console.log('  未能在所属章节定位（多为硬换行拼接，正常）: ' + unmatched);
if (violations.length) {
  console.log('\n=== 违规明细 ===');
  violations.forEach(v => console.log(v));
} else {
  console.log('\n正文区检查通过：没有引用落在评述区。');
}
process.exit(inCommentary ? 1 : 0);

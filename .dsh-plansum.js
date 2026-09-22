#!/usr/bin/env node
// 汇总迁移计划（读 .dsh-plan.json，输出精简统计）
'use strict';
const fs = require('fs');
const path = require('path');
const plan = JSON.parse(fs.readFileSync('.dsh-plan.json', 'utf8'));
const byTop = {}, byKind = {};
for (const p of plan) {
  const top = p.from.split('/').slice(0, 3).join('/');
  byTop[top] = (byTop[top] || 0) + 1;
  const segs = p.from.split('/');
  const kind = segs.includes('settings') ? 'settings(非正文)'
    : segs.includes('ai-discussion') || segs.includes('insights') ? 'ai-discussion/insights(非正文)'
    : segs.includes('.process') ? '.process(过程稿)'
    : segs.includes('chapters') ? 'chapters(正文)' : '其他';
  byKind[kind] = (byKind[kind] || 0) + 1;
}
console.log('计划总数: ' + plan.length);
console.log('\n按类型:');
Object.entries(byKind).sort((a, b) => b[1] - a[1]).forEach(([k, c]) => console.log('  ' + c + '  ' + k));
console.log('\n按世界/顶层:');
Object.entries(byTop).sort((a, b) => b[1] - a[1]).slice(0, 12).forEach(([k, c]) => console.log('  ' + c + '  ' + k));
console.log('\n样例:');
plan.slice(0, 6).forEach(p => console.log('  ' + p.from + '\n    -> ' + p.to));

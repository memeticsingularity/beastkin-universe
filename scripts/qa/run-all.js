#!/usr/bin/env node
// run-all.js — 一键运行全部一致性校验（只读）
//
// 用法: node scripts/qa/run-all.js [范围目录，默认全库]
//
// 依次运行 check-format / check-links / check-index / check-quotes / count-archives / scan-punctuation，
// 每项汇报通过/失败与退出码，最后给出汇总。任何一项失败汇总退出码为 1。
// 注意：check-index / check-quotes / count-archives 针对 beastshield 角色档案体系设计，
//       其他世界没有 characters 三级索引时这两项会跳过或报错，属正常。
'use strict';
const { execFileSync } = require('child_process');
const path = require('path');

const QA = path.join(__dirname);
const scope = process.argv[2] || '.';
const BS_CHARS = 'worlds/beastshield/original-archives/chinese/characters';
const BS_CHAPTERS = 'worlds/beastshield/original-archives/chinese/chaptered-stories';
const BS_COMPANY = 'worlds/beastshield/original-archives/chinese/characters/beastshield-company';

const steps = [
  { name: 'check-structure', args: [scope] },
  { name: 'check-format', args: [scope] },
  { name: 'check-links', args: [scope] },
  { name: 'check-index', args: [BS_CHARS], optional: true },
  { name: 'check-quotes', args: [BS_CHARS, BS_CHAPTERS], optional: true },
  { name: 'count-archives', args: [BS_COMPANY], optional: true },
  { name: 'scan-punctuation', args: [scope] },
];

let failed = 0;
for (const s of steps) {
  const t0 = Date.now();
  let code = 0;
  try {
    // stdio: 'inherit' —— 不要用默认管道捕获子进程输出：
    // DSH 等受限沙箱下子进程无法打开命名管道，pipe 模式会直接 EPERM（表现为退出码 2）。
    execFileSync(process.execPath, [path.join(QA, s.name + '.js'), ...s.args], { stdio: 'inherit' });
  } catch (e) {
    code = typeof e.status === 'number' ? e.status : 2;
  }
  const ms = Date.now() - t0;
  if (code === 0) {
    console.log(`[PASS] ${s.name} (${ms}ms)`);
  } else if (code === 1 && s.optional) {
    console.log(`[WARN] ${s.name} 发现问题（该项目可能不适用此检查，详见上方输出）(${ms}ms)`);
  } else {
    console.log(`[FAIL] ${s.name} 退出码 ${code} (${ms}ms)`);
    failed++;
  }
  console.log('---');
}

console.log(failed ? `汇总：${failed} 项未通过` : '汇总：全部通过');
process.exit(failed ? 1 : 0);

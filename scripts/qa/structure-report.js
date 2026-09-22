#!/usr/bin/env node
// structure-report.js — 生成项目目录结构快照（替代 scripts/generate_structure.bat / .sh）
//
// 为什么重写：旧脚本依赖 wmic（取时间戳）+ tree + cmd + CRLF 行尾，四者在 DSH 沙箱与
// 新版 Windows 下都不可靠（沙箱内会「假成功」并留下 0 字节垃圾文件）。本脚本纯 Node，
// 零子进程、零 WMI、零 shell 依赖，可直接在任意环境运行。
//
// 用法:
//   node scripts/qa/structure-report.js                     # 生成目录树 + 全量文件树
//   node scripts/qa/structure-report.js --no-full           # 只生成目录树
//   node scripts/qa/structure-report.js --depth 3           # 限制深度
//   node scripts/qa/structure-report.js --prefix eks-o-cm  # 自定义标题前缀（对应 eks 变体）
//   node scripts/qa/structure-report.js --root <目录> --out <目录>
//   node scripts/qa/structure-report.js --keep-all          # 保留历史快照（默认清理同前缀旧快照）
//
// 产出（默认写入 <root>/structure/，该目录已被 .gitignore 忽略）：
//   folder_structure_<YYYYMMDD_HHmm>.md   目录树
//   full_structure_<YYYYMMDD_HHmm>.md     目录 + 文件树（--no-full 时不生成）
//
// 与 check-structure.js 的分工：本脚本只做「快照」，不做合规校验。合规检查用 check-structure.js。
//
// 退出码: 0 = 成功且自检通过；1 = 自检失败（0 字节/缺结尾围栏）；2 = 用法错误
'use strict';
const fs = require('fs');
const path = require('path');

// ---------- 参数 ----------
const argv = process.argv.slice(2);
function opt(name, def) {
  const i = argv.indexOf('--' + name);
  if (i < 0) return def;
  const v = argv[i + 1];
  return (v && !v.startsWith('--')) ? v : true;
}
if (argv.includes('--help') || argv.includes('-h')) {
  console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 26).map(l => l.replace(/^\/\/ ?/, '')).join('\n'));
  process.exit(0);
}
const ROOT = path.resolve(opt('root', path.join(__dirname, '..', '..')));
const OUT = path.resolve(opt('out', path.join(ROOT, 'structure')));
const DEPTH = Number(opt('depth', 0)) || Infinity;
const PREFIX = String(opt('prefix', 'beastkin-universe'));
const NO_FULL = !!opt('no-full', false);
const KEEP_ALL = !!opt('keep-all', false);
const QUIET = process.argv.includes('--quiet');

if (!fs.existsSync(ROOT) || !fs.statSync(ROOT).isDirectory()) {
  console.error('根目录不存在或不是目录: ' + ROOT);
  process.exit(2);
}

// ---------- 排除规则（旧脚本会把 .git / structure 自身也列进去，导致快照自我膨胀）----------
const EXCLUDE_DIRS = new Set([
  '.git', '.idea', '.vscode', '.claude', '.dsh', '.dsh-tmp', 'node_modules',
  'structure', '__pycache__', '.venv', 'venv', 'dist', 'build', '.next', '.cache', '.pytest_cache',
]);
const EXCLUDE_FILES = new Set(['.DS_Store', 'Thumbs.db', 'desktop.ini']);

const excludedSeen = new Set();
const stats = { dirs: 0, files: 0 };

function listDir(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return []; }
  return entries
    .filter(e => {
      if (e.isDirectory()) {
        if (EXCLUDE_DIRS.has(e.name)) { excludedSeen.add(e.name); return false; }
        return true;
      }
      return !EXCLUDE_FILES.has(e.name);
    })
    .sort((a, b) => {
      // tree /A 的风格：目录与文件按名称混排（忽略大小写）
      const an = a.name.toLowerCase(), bn = b.name.toLowerCase();
      return an < bn ? -1 : an > bn ? 1 : 0;
    });
}

// ---------- 生成树文本 ----------
// glyphs 与 `tree /A` 保持一致，便于与历史快照对照
function buildTree({ withFiles, countStats = false }) {
  const lines = [PREFIX + ':.'];

  (function walk(dir, prefix, depth) {
    const entries = listDir(dir);
    entries.forEach((e, i) => {
      const last = i === entries.length - 1;
      const branch = last ? '\\---' : '+---';
      if (e.isDirectory()) {
        if (depth + 1 > DEPTH) return;
        if (countStats) stats.dirs++;
        lines.push(prefix + branch + e.name);
        walk(path.join(dir, e.name), prefix + (last ? '    ' : '|   '), depth + 1);
      } else {
        if (countStats) stats.files++;
        if (!withFiles) return;
        if (depth > DEPTH) return;
        lines.push(prefix + branch + e.name);
      }
    });
  })(ROOT, '', 0);

  return lines;
}

// ---------- 写文件 + 自检 ----------
function timestamp(d = new Date()) {
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}`;
}

const TS = timestamp();
const written = [];

function writeSnapshot(kind, title, treeLines) {
  // 沿用旧命名约定：folder_structure_<ts>.md / full_structure_<ts>.md（自定义前缀前置）
  const name = (PREFIX === 'beastkin-universe' ? '' : PREFIX + '-') + kind + '_structure_' + TS + '.md';
  const file = path.join(OUT, name);
  const body = ['# ' + title, '', '```txt', ...treeLines, '```', ''].join('\n');
  fs.writeFileSync(file, body, 'utf8');

  // 自检：非 0 字节、以围栏收尾、无 ~ 字符文件名
  const size = fs.statSync(file).size;
  const tail = fs.readFileSync(file, 'utf8').trimEnd().split('\n').pop();
  const problems = [];
  if (size === 0) problems.push('文件为 0 字节');
  if (tail !== '```') problems.push('未以 ``` 收尾（实际结尾：' + tail + '）');
  if (/~/.test(path.basename(file))) problems.push('文件名含 ~');
  written.push({ file, size, lines: treeLines.length, problems });
  return problems.length === 0;
}

// ---------- 执行 ----------
fs.mkdirSync(OUT, { recursive: true });

// 默认清理同前缀旧快照，避免「快照包含上一版快照」的自我膨胀
let cleaned = 0;
if (!KEEP_ALL) {
  const re = new RegExp('^' + (PREFIX === 'beastkin-universe' ? '' : PREFIX + '-') + '(folder|full)_structure_\\d{8}_\\d{4}\\.md$');
  for (const f of fs.readdirSync(OUT)) {
    if (re.test(f)) { fs.rmSync(path.join(OUT, f)); cleaned++; }
  }
}

const okFolder = writeSnapshot('folder', PREFIX + ' Folder Structure', buildTree({ withFiles: false, countStats: true }));
let okFull = true;
if (!NO_FULL) okFull = writeSnapshot('full', PREFIX + ' Full File Structure', buildTree({ withFiles: true }));

if (!QUIET) {
  console.log('📁 结构快照已生成');
  console.log('   根目录: ' + ROOT);
  console.log('   输出:   ' + OUT);
  if (cleaned) console.log('   清理旧快照: ' + cleaned + ' 个（--keep-all 可保留）');
  console.log('   排除目录: ' + ([...EXCLUDE_DIRS].join(', ')));
  if (excludedSeen.size) console.log('   实际跳过: ' + ([...excludedSeen].sort().join(', ')));
  console.log('   统计: ' + stats.dirs + ' 个目录 · ' + stats.files + ' 个文件（已排除上述目录）');
  for (const w of written) {
    console.log(`   ${w.problems.length ? '❌' : '✅'} ${path.relative(ROOT, w.file).replace(/\\/g, '/')}  ${w.size} 字节 · ${w.lines} 行`);
    w.problems.forEach(p => console.log('       - ' + p));
  }
}

const allOk = okFolder && okFull && written.every(w => w.problems.length === 0);
if (!allOk) { console.error('自检未通过：产物无效，请检查上面的问题行'); process.exit(1); }
if (!QUIET) console.log('✅ Done（已自检：非空、结尾围栏正确）');
process.exit(0);

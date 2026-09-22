# 新建世界观检查清单

1. `node scripts/new-world.js --world <world> --title-zh "<中文名>"`（或复制本模板）
2. 填 `README.md`：定位一句话 + 分级总览 + 作品索引
3. 填 `settings/0-original-setting/`（权威源）
4. 需要时建 `AGENTS.md`（该世界专属写作规则）
5. 建第一个作品：`node scripts/new-work.js --world <world> --form <cm|cs|s> --code <code> --title-zh "<标题>"`
6. 校验：`node scripts/qa/check-structure.js --world .` 与 `node scripts/qa/check-structure.js .`

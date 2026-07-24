# TASK-008 Project Harness v1.2.1 同步

## 文件目的

本文件記錄 `defect_generator` 對 workspace Project Harness v1.2.1 的 opt-in project-local upgrade。使用者已明確要求修正，因此 task 建立後直接實作，不另停 confirmation gate。

## 一、基本資訊

- 任務編號：`TASK-008`
- 任務名稱：Project Harness v1.2.1 同步
- 任務類型：Project workspace upgrade / core scaffold sync
- 建立日期：`2026-07-24`
- 最後更新日期：`2026-07-24`
- 任務負責人：Codex
- 優先級：Medium
- Task status：`Closed`
- Verification status：`Tests Passed`
- Review status：`Reviewed`
- Repo status：`Committed`

### 1.1 Status Rules

> Task、verification、review 與 repo 狀態分開記錄；只有人工 review 與 commit 完成後才關閉。

## 二、Domain Context

### 2.1 Domain Mapping

- Primary domain：`web`
- Active domain：`web`
- Task active capability：cross-domain project governance / Project Harness
- Does this task change project primary domain? `no`

### 2.2 Imported Assets

- Imported core assets：Project Harness copied scaffold。
- Imported domain assets：本次不變。
- Project-specific overrides：無；project-local script原先與workspace v1.2.0一致。

### 2.3 Domain-specific Inspection

- Domain-specific files to inspect：無產品檔；只檢查 project entry、baseline、tasks與harness。
- Domain-specific risks to check：不得修改`src/**`、Web assets或產品dependencies。
- Domain-specific validation：project harness兩種模式與diff scope。

### 2.4 Domain Context Checklist

- [x] 已確認project primary domain不變
- [x] 已確認本task是core scaffold upgrade
- [x] 已檢查project-local規則與baseline
- [x] 已列出scope與validation

## 三、DevOps 對應資訊

- Work Item：未建立；流程未確認。
- PR：未建立；使用者未要求。
- 建議branch名稱：`codex/task-008-project-harness-v1-2-1`
- 建議commit message：`同步 Project Harness v1.2.1`

## 四、背景說明

- 背景：TASK-007複核時，Project Harness v1.2.0將`node_modules`內第三方CRLF列為project hygiene failure。
- 問題描述：dependency-owned內容不可要求project正規化，且使已安裝dependencies的正常project無法通過harness。
- 任務來源：workspace `WTASK-project-harness-node-modules-crlf-exclusion`。
- 使用者情境：在`node_modules`存在時執行project closure gate。

## 五、任務目標

1. 將workspace Project Harness v1.2.1同步至project-local `scripts/project-check.sh`。
2. 排除`node_modules`第三方CRLF誤報。
3. 保留project-owned CRLF的FAIL契約，並恢復TASK-007可重現的project harness evidence。

## 六、本次範圍

1. 更新project-local copied harness。
2. 更新baseline、PLAN與task index。
3. 執行兩種project harness模式與scope/diff驗證。

## 七、不在本次範圍

1. 修改、移動或刪除`node_modules`。
2. 修改產品程式、tests、package manifests或lockfile。
3. 修改Web domain assets或執行Browser verification。

## 八、影響範圍

- 影響模組：project governance scaffold。
- 影響流程：project closure validation。
- 影響資料與外部系統：無。
- 相容性風險：低；只縮小dependency false-positive。

## 九、預期修改點

- Source：workspace ref `21062f8` 的 `shared/core/scaffold/project-harness/project-check.sh` v1.2.1。
- Target：project `scripts/project-check.sh`。
- Baseline：Project harness version、source state、upgrade history與validation evidence。
- 不修改：`.agents/**`、`src/**`、tests、package/lockfile。

## 十、輸入、輸出與任務附件

- 輸入：workspace WTASK、canonical harness v1.2.1與regression結果。
- 輸出：project-local harness v1.2.1與project upgrade紀錄。
- Artifact directory：N/A；不依賴附件。

## 十一、驗收標準

1. project-local `PROJECT_HARNESS_VERSION`為`1.2.1`。
2. project-local harness與workspace canonical harness逐位元組一致。
3. `node_modules`存在時，`bash scripts/project-check.sh --no-git`通過。
4. `node_modules`存在時，`bash scripts/project-check.sh`通過。
5. workspace regression證明project-owned CRLF仍會FAIL。
6. baseline與task index反映實際採用狀態。
7. 沒有`src/**`、tests、package/lockfile或Web domain asset差異。

## 十二、驗證方式

- `cmp`：canonical/project harness parity。
- `bash scripts/project-check.sh --no-git`。
- `bash scripts/project-check.sh`。
- `git diff --check`與scope scan。
- 產品build/test/browser：N/A；沒有產品變更。

## 十三、風險、限制與假設

- 已知風險：project-owned內容若錯放在`node_modules`不受CRLF gate檢查。
- 已知限制：只排除`node_modules`，未建立一般generated/vendor ignore framework。
- 假設前提：`node_modules`為dependency-owned可重建內容。
- 人工覆核需求：review workspace/project diffs。

## 十四、建議技能

- Core：`project-upgrade-baseline-update`、`code-review`。
- Domain：N/A。
- Project-specific：N/A。

## 十五、DevOps 文案草稿摘要

- Work Item／PR草稿：未建立。
- Release note：不需要；project只記錄copied scaffold upgrade。

## 十六、相關文件與參考

- `AGENTS.md`
- `docs/workspace-baseline.md`
- workspace `WTASK-project-harness-node-modules-crlf-exclusion`
- workspace canonical Project Harness v1.2.1

## 十七、任務結尾檢查

### 17.1 實際修改摘要

- 新增：本task。
- 修改：`scripts/project-check.sh`、baseline、PLAN、task index。
- 未修改：產品程式、tests、package/lockfile、Web domain assets。

### 17.2 驗收與驗證結果

- 驗收標準完成情況：7/7。
- 已執行驗證：canonical/project `cmp`、兩種project harness模式、`git diff --check`與scope scan。
- 驗證結果：parity `PASS`；`--no-git`與完整模式均為`PROJECT-CHECK: PASS version=1.2.1 format=1`；diff whitespace `PASS`；沒有產品或Web domain asset差異。
- 未驗證項目：產品runtime／Browser，與本task無關。

### 17.3 文件與DevOps同步

- baseline、PLAN、task index：已更新。
- Work Item／PR：未建立。

### 17.4 風險、後續與回補

- 剩餘風險：workspace source ref `21062f8`仍屬Unreleased maintenance fix。
- WGAP：不需要；workspace canonical已修正。
- 後續：正式workspace release後可刷新source ref。

### 17.5 Closure Decision

- Final Task status：`Closed`
- Final Verification status：`Tests Passed`
- Final Review status：`Reviewed`
- Final Repo status：`Committed`
- [x] 可關閉
- [ ] 有條件關閉，待review與commit
- [ ] 不可關閉

## 十八、執行紀錄

### 第一次處理

- 日期：`2026-07-24`
- 處理內容：完成Upgrade Need Check；decision為`project-local task`，同步v1.2.1並更新baseline。
- 結果：`Implemented` / `Tests Passed` / `Pending Review` / `Uncommitted`。

## 十九、更新紀錄

### v0.1

- 建立TASK-008並依使用者直接修正指示實作。

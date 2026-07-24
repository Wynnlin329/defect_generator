# TASK-005 Web Stage 2 Browser Verification 導入

## 文件目的

本文件定義 `defect_generator` 採用 workspace Web Stage 2 browser verification required asset set 的project-local upgrade。任務同步既有Web Stage 1 routing，加入report-only browser verification能力，並保留runtime diagnostics為optional/not imported；不修改產品程式碼、測試、dependencies或workspace shared assets。

## 一、基本資訊

- 任務編號：`TASK-005`
- 任務名稱：Web Stage 2 Browser Verification導入
- 任務類型：Project Workspace Upgrade／Web domain capability adoption
- 建立日期：`2026-07-23`
- 最後更新日期：`2026-07-23`
- 任務負責人：Codex；Unreleased source ref由使用者本輪直接執行指示授權
- 優先級：Medium
- Task status：`Closed`
- Verification status：`Tests Passed`
- Review status：`Reviewed`
- Repo status：`Committed`

### 1.1 Status Rules

> `Task status` 只描述任務本身進度，不混入build、manual verification、review或git狀態。
> `Verification status` 只描述驗證完成度。
> `Review status` 只描述使用者確認、人工review或變更要求。
> `Repo status` 只描述task文件與相關修改是否已進git / PR。

## 二、Domain Context

### 2.1 Domain Mapping

- Primary domain：`web`
- Secondary capabilities：REST API、auth、AI model configuration、Canvas/image processing、file upload/download、YAML、i18n、frontend/browser testing
- Domain selection rationale：主要交付物是browser-rendered Vue SPA，Stage 2直接補足route/state/viewport與browser-visible evidence流程。
- Active domain：`web`

### 2.2 Task Active Capability

- Project primary domain：`web`
- Task active capability：report-only browser verification adoption與Stage 1 verification routing同步
- Capability rationale：project已有Vite/Cypress但產品browser regression與實際route evidence仍未建立；Stage 2提供不綁framework的驗證矩陣與四狀態契約。
- Does this task change project primary domain? `no`
- If yes, rationale：N/A

### 2.3 Imported Assets

- Imported core assets：維持既有core base、4 skills、6 templates、task checklist、harness與Codex／Claude adapters。
- Imported domain assets：目前為Web Stage 1 minimum active set；本task新增Stage 2 required skill/template/checklist並同步5個既有Web assets。
- Project-specific overrides：保留Vue/Vite/npm commands、source layout、API/auth/Canvas/model/GPU與live-environment安全邊界。

### 2.4 Domain-specific Inspection

- Domain-specific files to inspect：
  - workspace Web README、Stage 2 WVAL與`fda3769` changelog
  - workspace/project Web base、requirement/feature skills、task/integration templates
  - workspace `web-browser-verification` skill、report template與checklist
  - project `AGENTS.md`、baseline、testing docs與task index
- Domain-specific rules to apply：verification維持report-only；annotation/screenshot不是改檔授權；每個check使用`PASS`/`FAIL`/`NOT RUN`/`UNKNOWN`；修正仍交由`web-feature-implementation`。
- Domain-specific risks to check：credential/runtime data exposure、把單一browser session誤述為E2E/cross-browser/accessibility/security、未授權diagnostics、server狀態與browser evidence混淆。
- Domain-specific validation：source parity、asset inventory、routing/read-back、project harness、workspace validator、diff scope與server availability。

### 2.5 Domain Context Checklist

- [x] 已讀取project domain mapping
- [x] 已確認active domain與task capability
- [x] 已確認不改變project primary domain
- [x] 已檢查project-local core與Web規則
- [x] 已列出domain-specific files、risks與validation

### 2.6 Web Domain Supplement

- Browser route/state/viewport matrix：本task只導入能力，不執行產品功能驗收；server availability可作環境證據但不等同browser verification。
- Browser verification evidence owner：導入後由`web-browser-verification`負責report-only evidence。
- Runtime diagnostic question / permission gate：目前無bounded diagnostic question，因此`web-runtime-diagnostics`不匯入。
- Security/accessibility boundary：不得因asset adoption宣稱產品conformance。

## 三、DevOps 對應資訊

- Work Item 類型：Technical Debt / Project Governance（若未來採用手動Azure DevOps）
- Work Item ID：`<WORK_ITEM_ID>`
- Work Item 標題：導入Defect Generator Web Stage 2 Browser Verification
- PR 類型：Project governance / verification capability
- PR 標題：`導入 Web Stage 2 browser verification assets`
- 建議branch名稱：`codex/task-005-web-browser-verification`
- 建議commit message：`導入 Web Stage 2 瀏覽器驗證資產`
- 若暫不建立Work Item草稿，原因：手動Azure DevOps流程與templates尚未確認。
- 若暫不建立PR草稿，原因：使用者要求直接實作，但尚未要求PR交付。

## 四、背景說明

- 背景：project已完成Web Stage 1 adoption；workspace正式release已更新至`v1.17.0`，目前HEAD `fda3769`另含WVAL PASS但仍位於`Unreleased`的Web Stage 2。
- 問題描述：project目前沒有標準化的actual route/state/viewport verification report，也沒有四狀態與annotation authorization boundary。
- 任務來源：2026-07-23 Project Upgrade Need Check及使用者「依序執行1跟2」指示。
- 使用者情境 / 觸發路徑：未來Web feature實作、可見回歸、截圖/annotation回饋或manual browser checks需要可重複、report-only的證據契約。

## 五、任務目標

1. 同步5個既有Web Stage 1 assets至workspace ref `fda3769`的Stage 2 routing版本。
2. 匯入Stage 2 required `web-browser-verification` skill、report template與checklist。
3. 更新project routing、baseline與testing文件，明確區分browser verification、runtime diagnostics與code-change owner。
4. 保留`web-runtime-diagnostics`為optional/not imported，並證明產品碼與workspace未被修改。

## 六、本次範圍

1. 更新`.agents/domain/web/base/DOMAIN_AGENTS.md`。
2. 更新`web-requirement-breakdown`、`web-feature-implementation`、Web task與integration templates。
3. 新增`.agents/domain/web/skills/web-browser-verification/SKILL.md`。
4. 新增`.agents/domain/web/templates/web-browser-verification-report-template.md`。
5. 新增`.agents/domain/web/checklists/web-browser-verification-checklist.md`。
6. 更新`AGENTS.md`、`README.md`、`PLAN.md`、`docs/context.md`、`docs/testing.md`、baseline、task index與本task。

## 七、不在本次範圍

1. 匯入`web-runtime-diagnostics`、bootstrap／retrofit assets、native adapters或domain harness。
2. 修改core base／core requirement snapshots；v1.17差異不影響本project active workflow。
3. 修改`src/**`、tests、package manifests、lockfile、environment或Cypress specs。
4. 執行真實login、backend、GPU、generation、download或深層browser diagnostics。
5. 將server可啟動、build或single-browser evidence宣稱為E2E、cross-browser、accessibility、安全或production完成。
6. 修改workspace shared/domain、manifest、registry、changelog、proposal或WVAL。

## 八、影響範圍

- 影響模組：project-localWeb domain assets與agent routing。
- 影響流程：requirement breakdown、feature implementation後的browser複驗、verification report與integration checklist。
- 影響資料：無產品資料；未收集runtime敏感資訊。
- 影響外部系統 / 整合點：無；local Vite server為獨立使用者要求，不視為Stage 2產品驗證。
- 影響文件：project入口、baseline、testing/context/plan/readme與tasks。
- 相容性風險：Stage 2來源尚未release；未來正式release可能需要再次parity check。
- domain-specific影響：後續Web tasks可明確記錄actual conditions與四狀態，不自動授權code changes。

## 九、預期修改點

- 優先閱讀檔案：workspace WVAL/changelog/Web assets與project current imported set。
- 預期修改模組：`.agents/domain/web/**`及active governance/testing docs。
- 預期修改層級：copied domain assets與文件；無產品code/config變更。
- 預期新增檔案：browser verification skill、report template、checklist與本task。
- 預期修改檔案：5個既有Web assets、`AGENTS.md`、README/PLAN/context/testing/baseline/task index。
- 可能連動修改檔案：無；若發現產品browser bug，另建feature/bug task。
- 明確不應優先修改：產品code、runtime config、Cypress、core/adapters、workspace。
- 修改點定位理由：Stage 2只擴張Web verification companion，不改變code-change owner或產品行為。
- 需同步檢查的測試：asset parity、project harness、workspace validator、diff/route/server checks。
- 需同步檢查的文件：上述active docs與本task。

## 十、輸入、輸出與任務附件

- 輸入：workspace`v1.17.0`、Unreleased ref`fda3769`、Stage 2 WVAL、current project baseline與Upgrade Need Check。
- 輸出：Stage 2 required project-local assets、同步routing、baseline與驗證紀錄。

### 10.1 Task Artifacts / Visual References

- Artifact directory：N/A；沒有聊天附件或visual target。
- Visual references：N/A。
- Data / fixture references：N/A。
- External references：workspace WVAL與source ref透過baseline pointer取得。
- Artifact handling checklist：
  - [x] 不依賴可提交附件
  - [x] 不需建立task assets目錄
  - [x] project artifact未放入workspace shared paths

## 十一、驗收標準

1. 5個既有Web assets與3個Stage 2 required assets逐檔對齊workspace ref`fda3769`。
2. `.agents/domain/web/`actual imported set與baseline、AGENTS完全一致。
3. `web-browser-verification`只能產出report-only evidence；code change仍由`web-feature-implementation`擁有。
4. `web-runtime-diagnostics`明確記為optional/not imported，不建立空skill或adapter。
5. task/testing docs包含route/state/viewport與`PASS`/`FAIL`/`NOT RUN`/`UNKNOWN`契約及overclaim guard。
6. project harness、workspace validation、`git diff --check`與scope review通過，或如實記錄dependency scan限制及替代驗證。
7. git diff不含產品code、tests、package files、lockfile或workspace修改。
8. 不宣稱已完成實際browser、E2E、cross-browser、diagnostics、accessibility/security或production驗證。

## 十二、驗證方式

- 單元測試：N/A；不改產品code。
- 整合測試：N/A；不連線外部系統。
- End-to-end / flow測試：不執行Cypress；local server availability不等同E2E。
- 手動驗證：source parity、inventory、routing、four-status與ownership read-back。
- 文件檢查：baseline/copy/pointer/not imported、task template compliance與stale wording scan。
- domain-specific validation：Stage 2 WVAL已PASS；本task只驗project adoption。
- 預計命令：project harness、workspace validator、`cmp`、`find`、`rg`、`git diff --check`、local HTTP availability。

## 十三、風險、限制與假設

- 已知風險：`fda3769`仍屬Unreleased，未來正式release可能變更內容或ref。
- confirmed domain-specific risks：screenshot/annotation不等同DOM/interaction evidence；runtime diagnostics需另外permission gate；single-browser不代表cross-browser或conformance。
- 已知限制：本task不執行實際產品browser matrix或diagnostics。
- 假設前提：使用者「執行第2項」表示接受採用目前WVAL PASS的Unreleased ref`fda3769`。
- 人工覆核需求：review actual import set、Unreleased residual risk與optional diagnostics決策。

## 十四、建議技能

### Core skills

- skill：`project-upgrade-baseline-update`、`code-review`
- 使用理由：管理opt-in adoption、source/target、baseline、validation與scope review。

### Domain skills

- skill：`web-requirement-breakdown`、`web-feature-implementation`、`web-browser-verification`
- 使用理由：同步task acceptance、code-change owner與report-only browser evidence routing。

### Project-specific skills

- skill：N/A
- 使用理由：不建立project-specific skill。

## 十五、DevOps 文案草稿摘要

- Work Item草稿位置：未建立；流程未確認。
- PR草稿位置：未建立；使用者未要求PR。
- 文件同步提醒：同步入口、baseline、testing與tasks；不建立release note。

## 十六、相關文件與參考

- Project entry：`README.md`、`AGENTS.md`、`PLAN.md`
- Project docs：`docs/workspace-baseline.md`、`docs/context.md`、`docs/testing.md`、`docs/tasks/README.md`
- Project core：requirement skill、task template、task compliance checklist
- Project Web：`.agents/domain/web/**`
- Workspace：Web README、Stage 2 assets、`WVAL-web-browser-verification-stage2.md`、`changelog.md`

## 十七、任務結尾檢查

### 17.1 實際修改摘要

- 實際新增檔案：本task、`web-browser-verification` skill、browser verification report template與checklist。
- 實際修改檔案：5個既有Web assets、`AGENTS.md`、`README.md`、`PLAN.md`、`docs/context.md`、`docs/testing.md`、baseline與task index。
- 實際未修改但已確認無需修改的檔案：產品`src/**`、tests、package manifests、lockfile、core snapshots、optional runtime diagnostics與workspace shared/domain。
- 與原預期不同之處：無。
- 未納入項目：optional runtime diagnostics與actual browser verification。

### 17.2 驗收與驗證結果

- 驗收標準完成情況：8/8。
- 已執行驗證：8個Web assets逐檔source parity、asset/routing read-back、兩種project harness模式、workspace validator、`git diff --check`、scope review與local HTTP availability。
- 驗證結果：8/8 source parity `PASS`；`bash scripts/project-check.sh --no-git`與`bash scripts/project-check.sh`均`PASS`；workspace validation與diff check `PASS`；local Vite HTTP回應`200`。
- 無法執行的驗證：實際browser route/state/viewport matrix、Cypress、cross-browser、runtime diagnostics、live backend/GPU與production smoke未執行，符合本task範圍。
- 未驗證風險：Stage 2來源仍為Unreleased；實際產品browser surfaces仍為`NOT RUN`。
- 替代檢查方式：N/A；未執行項目未以server、build或screenshot代替。
- domain-specific validation結果：report-only ownership、四狀態契約、annotation boundary與optional diagnostics permission gate read-back均`PASS`。

### 17.3 文件與DevOps同步

- 是否需更新README / PLAN / docs：是，已完成。
- 是否已更新task：是，已建立並回填實作與驗證結果。
- Work Item / PR草稿：未建立，流程／交付未要求。
- commit/release note：建議commit已列；project release note不需要。

### 17.4 風險、後續與回補

- 剩餘風險：Unreleased ref與實際browser surfaces未驗。
- 人工覆核需求：完成後由使用者review。
- 後續task：實際產品browser verification需依feature/bug acceptance另行執行。
- 是否發現shared/core/domain缺口：否；本task採用已驗證workspace能力。
- 是否需建立WGAP：否。
- lessons learned/change pattern：release foundation與Unreleased opt-in capability應分開記錄version/ref；local server availability不得取代browser verification evidence。

### 17.5 Closure Decision

- Final Task status：`Closed`
- Final Verification status：`Tests Passed`
- Final Review status：`Reviewed`
- Final Repo status：`Committed`
- [x] 可關閉
- [ ] 有條件關閉
- [ ] 不可關閉，需完成asset sync與validation
- 結論：實作、驗證、使用者確認與commit均已完成，任務關閉。

## 十八、執行紀錄

### 第一次處理

- 日期：`2026-07-23`
- 處理內容：完成Upgrade Need Check、v1.17 baseline更新，建立TASK-005並依使用者直接執行指示進入實作。
- 結果：`In Progress` / `Not Run` / `Pending Review` / `Uncommitted`。

### 第二次處理

- 日期：`2026-07-23`
- 處理內容：同步5個既有Web assets、匯入3個Stage 2 required assets、更新project routing/baseline/testing文件並完成source parity、harness、workspace、diff與scope review。
- 結果：`Implemented` / `Tests Passed` / `Pending Review` / `Uncommitted`。

## 十九、更新紀錄

### v0.1

- 建立Web Stage 2 browser verification adoption task。

### v0.2

- 回填Stage 2 adoption、validation、code review與conditional closure結果。

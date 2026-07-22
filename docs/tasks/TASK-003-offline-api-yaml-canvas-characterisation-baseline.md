# TASK-003 Offline API、YAML 與 Canvas Characterisation Test Baseline

## 文件目的

本文件定義 `defect_generator` 下一階段的 offline characterisation test 基線。任務先保護目前可觀察的 API response parsing、YAML mapping 與 Canvas/image 純邏輯，再為後續拆分 `DefectGeneratorPage.vue` 提供回歸證據；本 task 不把尚未確認的 backend 或產品行為改寫成正式規格。

## 一、基本資訊

- 任務編號：`TASK-003`
- 任務名稱：Offline API、YAML 與 Canvas Characterisation Test Baseline
- 任務類型：測試基線／可測試性改善
- 建立日期：`2026-07-22`
- 最後更新日期：`2026-07-22`
- 任務負責人：Codex；產品與 backend contract 由 owner 人工覆核
- 優先級：High
- Task status：`Closed`
- Verification status：`Build Passed / Tests Passed`
- Review status：`Reviewed`
- Repo status：`Committed`

### 1.1 Status Rules

> `Task status` 只描述任務本身進度，不混入 build、manual verification、review 或 git 狀態。
> `Verification status` 只描述驗證完成度。
> `Review status` 只描述使用者確認、人工 review 或變更要求。
> `Repo status` 只描述 task 文件與相關修改是否已進 git / PR。

## 二、Domain Context

### 2.1 Domain Mapping

- Primary domain：`web`
- Secondary capabilities：REST API、YAML serialization、Canvas/image processing、file/blob lifecycle、frontend testing
- Domain selection rationale：交付物是 browser UI；本 task 保護其 API binding、設定 mapping 與影像處理邊界。
- Active domain：`web`，採 core-only fallback。

### 2.2 Task Active Capability

- Project primary domain：`web`
- Task active capability：offline API contract tests、YAML fixtures/mapping tests、Canvas/image characterisation tests
- Capability rationale：這三個區域是主流程拆分前最缺乏回歸證據的高風險邊界。
- Does this task change project primary domain? `no`
- If yes, rationale：N/A

### 2.3 Imported Assets

- Imported core assets：`requirement-breakdown`、`test-case-generation`、`code-review`、`technical-documentation` 與 project-local templates/checklist。
- Imported domain assets：`not available` / `not imported`
- Project-specific overrides：保留既有 Vue/Vite/Vitest source layout；不建立空的 `.agents/domain/web/`。

### 2.4 Domain-specific Inspection

- Domain-specific files to inspect：
  - `src/api/index.js`
  - `src/stores/configData.js`
  - `src/stores/elementToBlob.js`
  - `src/views/defect_generator_page/DefectGeneratorPage.vue`
  - `src/config/__tests__/runtimeConfig.test.ts`
  - `src/stores/__tests__/auth.test.js`
  - `src/services/__tests__/HttpServiceCommunicator.test.js`
  - `vitest.config.ts`、`vite.config.ts`
- Domain-specific rules to apply：offline-first、deterministic fixtures、不得接真實 backend/GPU、先 characterise 再重構。
- Domain-specific risks to check：multipart request shape、human-readable `message` path parsing、YAML key/type drift、image/mask ordering、Canvas coordinate scaling、Object URL cleanup。
- Domain-specific validation：Vitest、type-check、production build、check-only lint/format、project harness。

### 2.5 Domain Context Checklist

- [x] 已讀取 project 的 domain mapping
- [x] 已確認本任務 active domain
- [x] 已確認 task active capability
- [x] 已確認本 task 不改變 project primary domain
- [x] 已檢查 project-local core 規則
- [x] 已確認 project-local Web domain 規則不存在，採 core-only fallback
- [x] 已列出 domain-specific files to inspect
- [x] 已列出 domain-specific risks to check
- [x] 已列出 domain-specific validation

## 三、DevOps 對應資訊

- Work Item 類型：Test / Technical Debt（若未來採用手動 Azure DevOps）
- Work Item ID：`<WORK_ITEM_ID>`
- Work Item 標題：建立 Defect Generator Offline API、YAML 與 Canvas 測試基線
- PR 類型：Test / Refactor without behavior change
- PR 標題：`建立 offline API、YAML 與 Canvas characterisation tests`
- 建議 branch 名稱：`codex/task-003-offline-characterisation-tests`
- 建議 commit message：`建立離線 API YAML 與 Canvas 測試基線`
- 若暫不建立 Work Item 草稿，原因：project 尚未確認採用手動 Azure DevOps 流程，也未導入 DevOps templates。
- 若暫不建立 PR 草稿，原因：目前只建立 Draft task，尚未確認實作與 PR 交付方式。

## 四、背景說明

- 背景：TASK-001、TASK-002 已建立 runtime config/security、dependency、type-check 與 build 基線，但產品測試仍集中在 runtime config、auth request 與 project test-data routing。
- 問題描述：模型 YAML、generator/result API parsing、Canvas/image mapping 缺乏 deterministic regression tests，直接拆分近 3,000 行的主頁面風險過高。
- 任務來源：`PLAN.md` Phase 3 與本次專案探索後的建議下一步。
- 使用者情境 / 觸發路徑：維護者準備修正主流程或拆分大型 SFC 前，需要可重現的 offline evidence。

## 五、任務目標

1. 以 mock transport 保護主要 algorithm/result API 的 request 與 response parsing。
2. 以最小 YAML fixtures 保護四組模型的 parse、mapping 與 serialize 行為。
3. 將可獨立驗證的 Canvas/image coordinate、pairing 或 lifecycle 邏輯建立為 deterministic tests。
4. 不連線真實 auth、backend 或 GPU，且不改變已觀察到的產品行為。

## 六、本次範圍

1. 盤點並測試 `src/api/index.js` 的 config、generation、upload、result preview/download 邊界。
2. 覆蓋 generator `message` output-folder parsing 的成功與 malformed response；先記錄現況，不在未確認 contract 下改成新 response schema。
3. 建立 CutPaste、Mode 1、Mode 2、Anomaly Diffusion 的小型無敏感 YAML fixtures。
4. 覆蓋 YAML missing key、wrong type 與最低限度 round-trip/mapping cases。
5. 對 Canvas/image 可純化邏輯做最小抽取並測試，例如 display-to-bitmap coordinate scaling、image/mask count/order validation、Object URL replacement cleanup。
6. 測試所需的 production extraction 僅限不改變行為的 pure helper／adapter；所有改動需有 characterisation evidence。
7. 同步更新測試文件與 task closure record。

## 七、不在本次範圍

1. 真實 OAuth、backend、GPU、model load、generation 或 download smoke。
2. 修改 backend endpoint、OAuth policy、YAML schema、generator response contract 或 result retention policy。
3. 大規模拆分或重寫 `DefectGeneratorPage.vue`。
4. 完整 Cypress product E2E、CI pipeline、coverage threshold 或新 production deployment。
5. 修正 TFIDG/TFIDF 正式命名；本 task 只建立現況證據並記錄 drift。
6. dependency security upgrade、Node/npm engine、Bootstrap Sass warning 或 prototype page 正式化。

## 八、影響範圍

- 影響模組：API client、model config/YAML、Canvas/image utilities、Vitest tests/fixtures。
- 影響流程：設定下載/更新、生成結果解析、圖片/遮罩處理與 preview URL lifecycle。
- 影響資料：僅使用 project-local synthetic fixtures；不得使用真實 token、內網 URL、客戶圖片或 production paths。
- 影響外部系統 / 整合點：無；network 必須完全 mock。
- 影響文件：`docs/testing.md`、必要時 `docs/api-contract.md`、本 task 與 `docs/tasks/README.md`。
- 相容性風險：為可測試性抽取 helper 時可能改變隱含 coercion、檔案順序或 error semantics。
- domain-specific 影響：Web browser API mock 與 jsdom/browser 差異需被明確記錄。

## 九、預期修改點

- 優先閱讀檔案：`src/api/index.js`、`src/stores/configData.js`、`src/stores/elementToBlob.js`、主頁面的 config/Canvas/generation/result functions。
- 預期修改模組：Vitest tests、fixtures，以及必要的 pure helper boundaries。
- 預期修改層級：test/fixture 為主；production code 僅做窄幅、行為不變的 extraction。
- 預期修改檔案 / 路徑：
  - `src/api/__tests__/`（新增）
  - `src/stores/__tests__/` 或新的 feature-local test directory
  - `src/test/fixtures/` 或 feature-local fixtures（實作前依現有 Vitest alias 決定）
  - 必要時新增 `src/utils/` 或 feature-local pure helper
- 可能連動修改檔案：`docs/testing.md`、`docs/api-contract.md`、`docs/tasks/README.md`、`vitest.config.ts`。
- 明確不應優先修改的區塊：大型 template/style、route/auth policy、API endpoints、正式 YAML schema、GPU flow。
- 修改點定位理由：先保護已知高風險 contract，再為主頁面分層提供安全邊界。
- 需同步檢查的測試：既有 16 tests、所有新增 Vitest suites、無意外 network request。
- 需同步檢查的文件：README/PLAN 是否需要狀態更新；API contract/testing 文件是否與實際 coverage 一致。

## 十、輸入、輸出與任務附件

- 輸入：目前 source behavior、既有 offline tests、`docs/api-contract.md`、`docs/testing.md`。
- 輸出：deterministic fixtures、offline unit/contract/characterisation tests、必要的 pure helpers、驗證紀錄。

### 10.1 Task Artifacts / Visual References

- Artifact directory：N/A；本 task 不依賴聊天附件或外部設計稿。
- Visual references：N/A。
- Data / fixture references：實作時新增的 synthetic fixtures 應放在測試可維護位置，不放入 task assets。
- External / non-committed references：backend OpenAPI/YAML schema 尚未提供；若日後取得，需另行評估且不得把敏感文件直接提交。

- Artifact handling checklist：
  - [x] 本 task 不依賴可提交聊天附件
  - [x] 必讀 context 均有 repo-relative path
  - [x] synthetic test fixtures 將保留 purpose 與 expected outcome
  - [x] project artifact 不放入 workspace shared/core 或 shared/domain

## 十一、驗收標準

1. 所有新增測試在 fresh dependency state 下離線通過，且未發送真實 HTTP request。
2. API tests 至少涵蓋 config request、四種 generator/output-folder parsing、upload pairing、result list、blob preview 與 download filename fallback 的主要成功/失敗案例。
3. YAML tests 至少涵蓋四份有效 fixture，以及 missing key、wrong type 或 unsupported structure 的明確處理結果；不得把未確認 schema 當成正式 backend contract。
4. Canvas/image tests 至少涵蓋 coordinate scaling 與一項 image/mask pairing 或 Object URL cleanup lifecycle。
5. 若為測試抽取 production helper，抽取前後的 observable inputs/outputs 必須由測試證明一致，且不改 endpoints、payload keys、model names 或 UI behavior。
6. `npm run type-check`、`npm run build`、`npm run test:unit -- --run`、check-only lint/format、`bash scripts/project-check.sh` 與 `git diff --check` 通過，或 task 明確記錄阻塞與 residual risk。
7. `docs/testing.md` 與必要的 `docs/api-contract.md` 準確反映新增 coverage 與仍未驗證的 live boundary。
8. 不提交 `node_modules`、`dist`、credential、token、真實 endpoint 或敏感圖片。

## 十二、驗證方式

- 單元測試：`npm run test:unit -- --run`
- 整合測試：Axios/module mock 的 offline request/response contract tests；禁止 real network。
- End-to-end / flow 測試：本 task 不執行真實 Cypress；如新增 mock component flow，需另記命令與範圍。
- 手動驗證：檢查 fixtures 無敏感資料；read-back API paths、headers、multipart keys、YAML keys 與 helper behavior。
- 文件檢查：`bash scripts/project-check.sh`、`git diff --check`，並人工核對 task-template compliance checklist。
- Static validation：`npm run type-check`、`npm run build`、project-local ESLint non-fix invocation、Prettier `--check`。
- domain-specific validation：jsdom/browser API mock boundary、URL create/revoke calls、Canvas dimensions/coordinate expectations。

## 十三、風險、限制與假設

- 已知風險：既有 code 混合 API orchestration 與 UI state；為測試抽取時容易不小心改變行為。
- confirmed domain-specific risks：Canvas/jsdom 能力差異、multipart assertions、YAML implicit coercion、Object URL lifecycle。
- 已知限制：沒有正式 backend OpenAPI/YAML schema，無法證明 backend compatibility；Cypress 與 live integration 不在本次範圍。
- 假設前提：既有 endpoint、payload keys 與目前 observable behavior 是 characterisation 起點，不等同已核准產品規格。
- 人工覆核需求：任何 production helper extraction、YAML validation policy、TFIDG/TFIDF interpretation、API error semantic 變更都需人工覆核。

## 十四、建議技能

### Core skills

- skill：`test-case-generation`
- 使用理由：實作前整理 normal、boundary、error 與 regression matrix。
- skill：`code-review`
- 使用理由：完成後檢查 mock fidelity、behavior drift、test gaps 與文件同步。

### Domain skills

- skill：N/A
- 使用理由：workspace Web domain assets 尚不存在；維持 core-only fallback。

### Project-specific skills

- skill：N/A
- 使用理由：尚未建立穩定、可重複的 defect-generation project skill。

## 十五、DevOps 文案草稿摘要

- Work Item 草稿位置：未建立；手動 Azure DevOps 流程與 templates 尚未確認。
- PR 草稿位置：未建立；目前處於 task confirmation gate。
- 文件同步提醒：實作後檢查 `README.md`、`PLAN.md`、`docs/testing.md`、`docs/api-contract.md`、task index 與本 task。

## 十六、相關文件與參考

### Project entry

- `README.md`
- `AGENTS.md`
- `PLAN.md`

### Project docs

- `docs/workspace-baseline.md`
- `docs/requirements.md`
- `docs/context.md`
- `docs/architecture.md`
- `docs/api-contract.md`
- `docs/testing.md`

### Project-local core assets

- `.agents/core/base/BASE_AGENTS.md`
- `.agents/core/skills/requirement-breakdown/SKILL.md`
- `.agents/core/skills/test-case-generation/SKILL.md`
- `.agents/core/skills/code-review/SKILL.md`
- `.agents/core/templates/task-template.md`
- `.agents/core/checklists/task-template-compliance-checklist.md`

### Project-local active domain assets

- `.agents/domain/web/`：`not available` / intentionally absent。

### 其他

- `src/api/index.js`
- `src/stores/configData.js`
- `src/stores/elementToBlob.js`
- `src/views/defect_generator_page/DefectGeneratorPage.vue`

## 十七、任務結尾檢查

### 17.1 實際修改摘要

- 實際新增檔案：`src/api/responseParsers.js`、`src/api/__tests__/index.test.js`、`src/stores/modelConfigMapping.js`、`src/stores/__tests__/modelConfigMapping.test.js`、`src/utils/canvasGeometry.ts`、`src/utils/objectUrl.ts`、兩份utility tests、`src/test/fixtures/model-config/`下README與四份YAML fixtures，以及本task文件。
- 實際修改檔案：`src/api/index.js`、`src/stores/configData.js`、`src/views/defect_generator_page/DefectGeneratorPage.vue`、`docs/testing.md`、`docs/api-contract.md`、`docs/tasks/README.md`、本task文件。
- 實際未修改但已確認無需修改的檔案：API endpoints、payload keys、model names、`vitest.config.ts`、dependency manifests、router/auth與`src/stores/elementToBlob.js`。
- 與原預期不同之處：Canvas/image範圍選擇座標換算與Object URL lifecycle；image/mask pairing由API multipart ordering tests保護，不另抽新的pairing production helper。
- 未納入本次處理但需記錄的項目：正式backend/OpenAPI/YAML schema、TFIDG正式命名、live backend/GPU、Cypress E2E、完整API error matrix。

### 17.2 驗收與驗證結果

- 驗收標準完成情況：8/8完成；offline coverage、窄幅helper extraction、文件、hygiene與live boundary均已read-back。
- 已執行驗證：fresh `npm ci`、targeted與full Vitest、`npm run type-check`、`npm run build`、新增檔案ESLint/Prettier/JS syntax、legacy SFC lint baseline前後比對、project harness、`git diff --check`與code-review read-back。
- 驗證結果：新增4 files / 33 tests與全套7 files / 49 tests PASS；type-check、production build、新增檔案static checks與移出dependencies後project harness PASS。
- Code review結果：無blocking finding；API/helper extraction保留原endpoint、payload與malformed `message` rejection行為，YAML mapping為既有邏輯窄幅抽取，Object URL新增可驗證cleanup。
- 無法執行的驗證：真實backend/GPU與Cypress product flow明確不在範圍。
- 未驗證風險：正式API/YAML schema、browser rendering細節、4xx/401/5xx/timeout、GPU資源與live data lifecycle仍未驗證。
- 替代檢查方式：Axios client全mock、synthetic YAML fixtures、pure coordinate/URL helpers、production build與source/diff read-back。
- domain-specific validation 結果：主要API request shape、四模型YAML mapping、Canvas scaling與Object URL lifecycle均有deterministic evidence；legacy SFC維持與`HEAD`相同20個既有lint errors，本task未擴大baseline。

### 17.3 文件與 DevOps 同步

- 是否需更新 README / PLAN / docs：是；已同步`docs/testing.md`、`docs/api-contract.md`與task index，README/PLAN的高層roadmap不需修改。
- 是否已更新 task：是，已回填implementation、validation、review與closure evidence。
- 是否已更新 Work Item 草稿：否；流程未確認。
- 是否已更新 PR 草稿：否；尚未確認實作。
- 是否需補 commit message / release note：已準備繁體中文commit；release note目前不需要。
- 未同步項目與原因：未建立Work Item/PR/release note，因使用者要求直接commit且本task不是release。

### 17.4 風險、後續與回補

- 剩餘風險：正式schema與live integration仍未知；Bootstrap Sass warnings、dependency vulnerabilities及legacy SFC lint baseline沿用既有紀錄。
- 人工覆核需求：已完成本次code review；backend owner仍需在未來取得正式contract時覆核characterisation assumptions。
- 後續 task：大型 SFC 分層、mock Cypress E2E、OAuth lifecycle 各自另建 task。
- 是否發現 shared/core/domain 缺口：本task執行期間project仍以core-only fallback工作；workspace Web Domain MVP的正式導入屬後續獨立upgrade流程，不混入本commit。
- 是否需建立 WGAP：本task不建立；project harness掃描ignored dependencies的既有觀察可留待獨立workspace gap流程。
- 是否有 lessons learned / change pattern 候選：有project-local候選——先抽pure mapping/geometry/lifecycle helper可降低大型SFC重構風險；待更多project evidence再評估是否回饋domain。

### 17.5 Closure Decision

- Final Task status：`Closed`
- Final Verification status：`Build Passed / Tests Passed`
- Final Review status：`Reviewed`
- Final Repo status：`Committed`
- [x] 可關閉
- [ ] 有條件關閉，需列出條件
- [ ] 不可關閉，需補工作
- 結論：TASK-003的offline characterisation、必要static/build驗證、文件同步與review均完成；live contract與E2E保留後續task。

## 十八、執行紀錄

### 第一次處理

- 日期：`2026-07-22`
- 處理內容：依 project inventory、PLAN、API/testing 文件與 source evidence 建立 TASK-003。
- 結果：Draft / Pending Confirmation；尚未修改產品程式或測試。

### 第二次處理

- 日期：`2026-07-22`
- 處理內容：使用者指示開始執行既定順序 1，確認直接實作 TASK-003、完成驗證並以獨立 commit 收尾。
- 結果：In Progress / Confirmed；Web domain upgrade 維持後續獨立流程，不納入本 task。

### 第三次處理

- 日期：`2026-07-22`
- 處理內容：建立API/YAML/Canvas/Object URL helpers、synthetic fixtures與33個offline tests，完成全套49個tests、type-check、production build、static checks、harness與code review，並同步產品測試/API文件。
- 結果：`Closed` / `Build Passed / Tests Passed` / `Reviewed` / `Committed`；未執行live backend/GPU或Cypress。

## 十九、更新紀錄

### v0.1

- 建立 offline API、YAML 與 Canvas characterisation test baseline 草稿。

### v0.2

- 記錄使用者確認、實作、33個新增tests與全套49個tests結果。
- 回填helper extraction、fixture、type-check/build/static/harness evidence與剩餘live boundary。
- 狀態更新為Closed / Build Passed and Tests Passed / Reviewed / Committed。

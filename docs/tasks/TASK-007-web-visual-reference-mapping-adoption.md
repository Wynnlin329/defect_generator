# TASK-007 Web Visual Reference Mapping 導入

## 文件目的

本文件定義 `defect_generator` 採用 workspace Optional、report-only `web-visual-reference-mapping` capability 的 project-local upgrade。任務同步既有 Web companion contracts，加入 mapping skill、report template 與 checklist，並保留 `web-runtime-diagnostics` 為 optional/not imported；不修改產品程式碼或 workspace shared assets。

## 一、基本資訊

- 任務編號：`TASK-007`
- 任務名稱：Web Visual Reference Mapping 導入
- 任務類型：Project Workspace Upgrade / Web optional capability adoption
- 建立日期：`2026-07-24`
- 最後更新日期：`2026-07-24`
- 任務負責人：Codex；使用者本輪「幫我升級」授權直接執行上一輪已確認的 Recommended upgrade
- 優先級：Medium
- Task status：`Closed`
- Verification status：`Tests Passed`
- Review status：`Reviewed`
- Repo status：`Committed`

### 1.1 Status Rules

> `Task status` 只描述任務本身進度，不混入驗證、review 或 git 狀態。
> `Verification status` 只描述驗證完成度。
> `Review status` 只描述使用者確認或人工 review。
> `Repo status` 只描述 task 與相關修改是否已進 git / PR。

## 二、Domain Context

### 2.1 Domain Mapping

- Primary domain：`web`
- Secondary capabilities：browser UI、visual annotations、screenshots、responsive intent、implementation handoff、browser verification
- Domain selection rationale：project 交付 browser-rendered Vue SPA，且 TASK-006 已出現 Browser comments、selector、viewport、original-unavailable 與 same-condition verification workflow。
- Active domain：`web`

### 2.2 Task Active Capability

- Project primary domain：`web`
- Task active capability：report-only visual reference mapping adoption
- Capability rationale：把 Current / Target / Annotated / Browser comments 的關係、asset disposition、implementation acceptance 與 Browser re-verification conditions標準化。
- Does this task change project primary domain? `no`
- If yes, rationale：N/A

### 2.3 Imported Assets

- Imported core assets：維持既有 core base、4 skills、6 templates、task checklist、harness及Codex/Claude adapters。
- Imported domain assets：目前為 Web base + Stage 1 active set + Stage 2 required browser verification set，共8項。
- Project-specific overrides：保留 Vue/Vite/npm scripts、Home/Defect Generator source layout、API/auth/Canvas/GPU與live-environment boundaries。

### 2.4 Domain-specific Inspection

- Domain-specific files to inspect：
  - workspace Web README、visual mapping proposal/WVAL、changelog與ref `280a1c1`
  - project/current Web base、skills、templates與checklist
  - TASK-006 annotation-driven evidence及project baseline
- Domain-specific rules to apply：
  - visual mapping維持report-only
  - `MAPPED` / `PARTIAL` / `UNMAPPED` / `UNKNOWN`不等於Browser狀態
  - original不可取得時記錄`original-unavailable`
  - code change仍由`web-feature-implementation`負責，actual browser evidence仍由`web-browser-verification`負責
- Domain-specific risks to check：
  - 不把derived screenshot冒充原始annotation
  - 不把mapping當成改檔授權或Browser PASS
  - 不追溯重寫已完成的TASK-006 evidence
  - 不匯入optional runtime diagnostics
- Domain-specific validation：11項source parity、inventory/routing read-back、project harness、workspace validator與git scope。

### 2.5 Domain Context Checklist

- [x] 已讀取project domain mapping
- [x] 已確認active domain與task capability
- [x] 已確認不改變project primary domain
- [x] 已檢查project-local core與Web規則
- [x] 已列出domain files、risks與validation

### 2.6 Web Domain Supplement

- user entry / route：未綁單一路由；未來由confirmed visual-driven task指定。
- affected page / component：無產品頁面；只調整project-local Web governance assets。
- rendering / deployment assumption：N/A；本task不改runtime。
- data and trust boundary：visual input可能含private/licensed/sensitive資料，必須記錄disposition且不得自行持久化。
- accessibility / responsive：不同viewport使用`responsive-intent`，未知條件保留`UNKNOWN`；不宣稱pixel equality或conformance。
- Browser verification evidence owner：`web-browser-verification`。
- runtime diagnostic question / permission gate：沒有bounded question，因此`web-runtime-diagnostics`不匯入。

## 三、DevOps 對應資訊

- Work Item 類型：Technical Debt / Project Governance（若未來採手動Azure DevOps）
- Work Item ID：`<WORK_ITEM_ID>`
- Work Item 標題：導入Web Visual Reference Mapping
- PR 類型：Project governance / optional Web capability
- PR 標題：`導入 Web visual reference mapping assets`
- 建議branch名稱：`codex/task-007-web-visual-reference-mapping`
- 建議commit message：`導入 Web 視覺參考映射資產`
- 若暫不建立Work Item草稿，原因：project手動Azure DevOps流程尚未確認。
- 若暫不建立PR草稿，原因：使用者未要求PR交付。

## 四、背景說明

- 背景：project已導入Stage 2 browser verification；workspace ref `280a1c1`新增Optional visual mapping三件組與active companion routing。
- 問題描述：TASK-006曾以task-local方式手動整理Browser comments、selectors、viewport與original-unavailable evidence；缺少共用mapping IDs、comparison modes、asset disposition與handoff contract。
- 任務來源：2026-07-24 read-only Upgrade Need Check及使用者「幫我升級」指示。
- 使用者情境 / 觸發路徑：未來以Current/Target/Annotated、Browser comments、screenshots或Appshots驅動的Web需求。

## 五、任務目標

1. 同步8個既有Web imported assets至workspace ref `280a1c1`的visual mapping routing版本。
2. 匯入`web-visual-reference-mapping` skill、report template與checklist。
3. 更新project routing、baseline與testing文件，明確區分mapping、implementation、browser verification與diagnostics owners。
4. 保留產品程式、core/harness/adapters與optional runtime diagnostics不變。
5. 使用TASK-006既有真實Annotation／Browser evidence完成一份report-only mapping smoke，不重新執行Browser verification。

## 六、本次範圍

1. 更新既有Web base、3 skills、3 templates與1 checklist。
2. 新增visual mapping skill、report template與checklist。
3. 更新`AGENTS.md`、`README.md`、`PLAN.md`、`docs/context.md`、`docs/testing.md`、baseline、task index與本task。
4. 執行source parity、project/workspace governance與scope驗證。
5. 由confirmed TASK workflow將mapping smoke report保存至`docs/tasks/TASK-007-assets/`。

## 七、不在本次範圍

1. 匯入`web-runtime-diagnostics`、bootstrap/retrofit assets、native adapters或domain harness。
2. 修改core assets、project harness、Codex/Claude adapters或workspace manifest。
3. 修改`src/**`、tests、package manifests、lockfile、runtime config或Cypress。
4. 追溯重寫TASK-006或宣稱其annotation original已保存。
5. 建立pixel diff、visual regression、cross-browser、exporter/uploader或automatic task-asset persistence。
6. 修改workspace shared/domain、proposal、WVAL、registry或changelog。

## 八、影響範圍

- 影響模組：project-local `.agents/domain/web/**`與agent routing。
- 影響流程：visual-driven requirement breakdown、implementation acceptance、Browser re-verification與task artifact disposition。
- 影響資料：無產品資料；mapping本身不持久化visual originals。
- 影響外部系統 / 整合點：無。
- 影響文件：project入口、baseline、context/testing/plan/readme與tasks。
- 相容性風險：來源仍是Unreleased；未來正式release可能需要再次parity check。
- domain-specific影響：未來visual tasks可使用mapping IDs與三種comparison modes，不改變code-change owner。

## 九、預期修改點

- 優先閱讀檔案：workspace visual mapping skill/template/checklist、8個active companions與project baseline。
- 預期修改模組：`.agents/domain/web/**`及active governance/testing docs。
- 預期修改層級：copied domain assets與文件；無產品code/config變更。
- 預期新增檔案：mapping skill、report template、checklist與本task。
- 預期修改檔案：8個既有Web assets、project entry/baseline/readme/plan/context/testing/task index。
- 可能連動修改檔案：`docs/tasks/TASK-007-assets/web-visual-reference-mapping-smoke-report.md`；由本次confirmed task workflow保存。
- 明確不應優先修改：產品code、task artifacts、core/adapters/harness與workspace。
- 修改點定位理由：Optional capability會被project active visual-driven workflow使用，且需與既有companions成套同步。
- 需同步檢查的測試：asset parity、project harness、workspace validator、diff/scope scan。
- 需同步檢查的文件：上述active docs與本task。

## 十、輸入、輸出與任務附件

- 輸入：workspace `v1.17.0`、Unreleased ref `280a1c1`、WVAL、project ref `fda3769`與TASK-006 workflow evidence。
- 輸出：11項project-local Web assets、同步routing、baseline、validation record與TASK-006 evidence mapping smoke report。

### 10.1 Task Artifacts / Visual References

- Artifact directory：`docs/tasks/TASK-007-assets/`；保存report-only mapping smoke，不保存或重建Annotation原圖。
- Visual references：TASK-006既有Browser comments、selectors、修改前computed-style紀錄與既有Browser verification report。
- External references：workspace WVAL與source ref透過baseline pointer取得。
- Artifact handling checklist：
  - [x] 本task不依賴可提交visual original
  - [x] confirmed TASK workflow已建立TASK-007 assets目錄並保存mapping report
  - [x] 不宣稱TASK-006 original annotation已可取得或持久化
  - [x] 未重新截圖，不宣稱存在derived screenshot
  - [x] project artifact未放入workspace shared paths

## 十一、驗收標準

1. 8個既有Web assets與3個新增mapping assets逐檔對齊workspace ref `280a1c1`。
2. `.agents/domain/web/` actual imported set與baseline、AGENTS完全一致，共11項。
3. visual mapping維持report-only，使用`MAPPED`/`PARTIAL`/`UNMAPPED`/`UNKNOWN`。
4. Browser verification仍獨立使用`PASS`/`FAIL`/`NOT RUN`/`UNKNOWN`，code change仍由feature implementation擁有。
5. `web-runtime-diagnostics`保持optional/not imported，不建立空skill或adapter。
6. project harness、workspace validation、`git diff --check`與scope review通過。
7. git diff不新增TASK-007以外的產品code、tests、package/lockfile或workspace修改。
8. 不宣稱visual originals、runtime、pixel diff、cross-browser、E2E或production已驗證。
9. TASK-006兩組Current／Annotated relationships均有stable IDs、comparison mode、asset disposition、implementation acceptance與Browser handoff；mapping status與既有Browser status保持分離。

## 十二、驗證方式

- 單元測試：N/A；不改產品code。
- 整合測試：N/A；不連線外部系統。
- End-to-end / flow測試：N/A；不改rendered UI。
- 手動驗證：source parity、inventory、routing、completed mapping smoke、mapping/browser status separation與owner read-back。
- 文件檢查：baseline/copy/not-imported、task compliance、stale wording與scope scan。
- domain-specific validation：workspace WVAL已PASS；本task驗project adoption。
- 預計命令：`cmp`、`find`、`rg`、project harness、workspace validator、`git diff --check`及`git status`。

## 十三、風險、限制與假設

- 已知風險：`280a1c1`仍屬Unreleased，正式release可能變更內容或ref。
- confirmed domain-specific risks：mapping status不可冒充Browser status；derived screenshot不可冒充original；sensitive/licensed visual需明確handling path。
- 已知限制：本task只執行TASK-006 evidence的report-only mapping smoke；不重新執行Browser、cross-project、pixel diff、cross-browser或runtime validation。
- 假設前提：使用者「幫我升級」表示接受上一輪已說明的Recommended project-local task及Unreleased ref。
- 人工覆核需求：review actual import set、Unreleased residual risk與runtime diagnostics不匯入決策。

## 十四、建議技能

### Core skills

- skill：`project-upgrade-baseline-update`、`code-review`
- 使用理由：管理opt-in adoption、copy/pointer decision、baseline、validation與scope review。

### Domain skills

- skill：`web-visual-reference-mapping`、`web-requirement-breakdown`、`web-feature-implementation`、`web-browser-verification`
- 使用理由：建立mapping→implementation→Browser verification的owner-separated routing。

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
- Project Web：`.agents/domain/web/**`
- Workspace：Web README、visual mapping assets、`WVAL-web-visual-reference-mapping.md`、`changelog.md`

## 十七、任務結尾檢查

### 17.1 實際修改摘要

- 實際新增檔案：本task、`web-visual-reference-mapping` skill、report template、checklist與`TASK-007-assets/web-visual-reference-mapping-smoke-report.md`。
- 實際修改檔案：8個既有Web assets、`AGENTS.md`、`README.md`、`PLAN.md`、`docs/context.md`、`docs/testing.md`、baseline與task index。
- 實際未修改但已確認無需修改的檔案：產品`src/**`、tests、package manifests、lockfile、runtime config、core/harness/adapters、optional runtime diagnostics與workspace shared/domain。
- 與原預期不同之處：無。
- 未納入本次處理但需記錄的項目：runtime diagnostics、Browser rerun、cross-browser、pixel diff與visual regression。

### 17.2 驗收與驗證結果

- 驗收標準完成情況：9/9。
- 已執行驗證：11項逐檔source parity、inventory/routing read-back、TASK-006 report-only mapping smoke、兩種project harness模式、workspace validator、`git diff --check`、stale wording/scope scan與project-local scope review。
- 驗證結果：11/11 source parity `PASS`；兩組relationships均為`MAPPED`；project harness、workspace validation與diff check結果見本次第三次處理紀錄；沒有`src/**`差異。
- 無法執行的驗證：Browser rerun、cross-project、pixel diff、cross-browser、E2E與production均未執行，符合本task範圍。
- 未驗證風險：source ref仍為Unreleased；正式release後需再次parity check。
- 替代檢查方式：N/A；未執行項目未以static mapping或workspace WVAL取代。
- domain-specific validation結果：mapping/report/checklist三件組完整；TASK-006 smoke有兩組`MAPPED`關係、所用asset disposition符合證據狀態，且mapping與既有Browser statuses、implementation owner及runtime diagnostic gate保持分離。

### 17.3 文件與DevOps同步

- 是否需更新README / PLAN / docs：是，已完成。
- 是否已更新task：是，已建立並回填實作、validation與review結果。
- 是否已更新Work Item草稿：否，流程未確認。
- 是否已更新PR草稿：否，未要求PR。
- 是否需補commit message / release note：已提供commit message；project release note不需要。
- 未同步項目與原因：N/A。

### 17.4 風險、後續與回補

- 剩餘風險：Unreleased ref、Annotation originals與fresh Browser／cross-project runtime surfaces未驗。
- 人工覆核需求：完成後由使用者review。
- 後續task：正式workspace release後再做parity check。
- 是否發現shared/core/domain缺口：否；採用已通過WVAL的workspace capability。
- 是否需建立WGAP：否。
- 是否有lessons learned / change pattern候選：release version與Unreleased adoption ref需分開記錄；已由baseline直接表達，不另建record。

### 17.5 Closure Decision

- Final Task status：`Closed`
- Final Verification status：`Tests Passed`
- Final Review status：`Reviewed`
- Final Repo status：`Committed`
- [x] 可關閉
- [ ] 有條件關閉
- [ ] 不可關閉，需完成asset sync與validation
- 結論：adoption與mapping smoke已實作、驗證、review並提交；mapping與Browser status保持分離。

## 十八、執行紀錄

### 第一次處理

- 日期：`2026-07-24`
- 處理內容：完成read-only Upgrade Need Check，建立TASK-007並依使用者升級指示進入實作。
- 結果：`In Progress` / `Not Run` / `Pending Review` / `Uncommitted`。

### 第二次處理

- 日期：`2026-07-24`
- 處理內容：同步8個active Web companions、匯入3個visual mapping assets、更新routing/baseline/testing文件並完成parity、harness、workspace與code review。
- 結果：`Implemented` / `Tests Passed` / `Pending Review` / `Uncommitted`。

### 第三次處理

- 日期：`2026-07-24`
- 處理內容：依已確認proposal，以TASK-006既有真實Annotation／Browser evidence建立report-only mapping smoke；完成11/11 source parity、兩種project harness、workspace validator、scope與diff檢查；未重新執行Browser、未修改產品程式、未導入runtime diagnostics。
- 結果：`Implemented` / `Tests Passed` / `Pending Review` / `Uncommitted`。

## 十九、更新紀錄

### v0.1

- 建立Web Visual Reference Mapping adoption task。

### v0.2

- 回填optional capability adoption、validation、review與conditional closure結果。

### v0.3

- 新增TASK-006 evidence mapping smoke與本次未提交validation紀錄。

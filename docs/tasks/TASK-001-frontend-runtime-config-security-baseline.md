# TASK-001：前端 Runtime Config 與 Credential 安全基線

## 文件目的

本文件定義 `defect_generator` 第一個產品改善任務：集中管理 browser 可見的 runtime configuration，移除 repository 內的開發期 endpoint 與登入預設值，並建立可離線驗證的設定 contract。

本task已由使用者確認並完成主要實作；目前等待full build/type-check baseline與controlled OAuth integration補足後關閉。

## Routing Guard

- 任務類型：單一 project 的 security/configuration 改善，使用 project-local task template。
- 不屬於 workspace shared/core/domain 維護，不建立 `WTASK`。
- Primary domain 是 `web`；workspace Web domain assets unavailable，因此使用 core-only fallback。
- 本 task 不建立或修改 workspace `shared/domains/web/`。

---

## 一、基本資訊

- 任務編號：`TASK-001`
- 任務名稱：前端 Runtime Config 與 Credential 安全基線
- 任務類型：Security / Configuration / Technical debt
- 建立日期：`2026-07-20`
- 最後更新日期：`2026-07-20`
- 任務負責人：待指派
- 優先級：`P0`
- Task status：`Implemented`
- Verification status：`Tests Passed / Build Blocked / Manual Pending`
- Review status：`Pending Review`
- Repo status：`Untracked`

### 1.1 Status Rules

> `Task status` 只描述任務本身進度，不混入 build、manual verification、review 或 git 狀態。
> `Verification status` 只描述驗證完成度。
> `Review status` 只描述使用者確認、人工 review 或變更要求。
> `Repo status` 只描述 task 文件與相關修改是否已進 git / PR。

只有驗收條件、必要驗證、人工覆核與 repo 狀態都完成後，才可把 task 標記為 `Closed`。

---

## 二、Domain Context

### 2.1 Domain Mapping

- Primary domain：`web`
- Secondary capabilities：REST API、OAuth、frontend runtime configuration、Pinia auth state、Vue/Vite environment variables、mock/testing-data routing
- Domain selection rationale：修改交付物位於 browser frontend 的設定、auth UI、Axios client 與 project service routing；backend 只是需維持相容的外部依賴。
- Active domain：`web`

### 2.2 Task Active Capability

- Project primary domain：`web`
- Task active capability：frontend runtime configuration / auth and API integration
- Capability rationale：任務集中處理前端如何取得 public runtime values，以及如何避免把 credential/default secrets 寫入 source 或 browser config。
- Does this task change project primary domain? `no`
- If yes, rationale：Not applicable。

### 2.3 Imported Assets

- Imported core assets：`.agents/core/base/BASE_AGENTS.md`、`requirement-breakdown`、`code-review`、`test-case-generation`、`technical-documentation`、task template、task compliance checklist
- Imported domain assets：`not imported`；workspace Web domain assets `not available`
- Project-specific overrides：依 `AGENTS.md` 的 Web/API/auth/security/live-integration boundary 執行。

### 2.4 Domain-specific Inspection

- Domain-specific files to inspect：
  - `vite.config.ts`
  - `env.d.ts`
  - `src/api/index.js`
  - `src/stores/auth.js`
  - `src/services/HttpServiceCommunicator.ts`
  - `src/views/NavigateBar.vue`
  - `.gitignore`
  - `package.json`
- Domain-specific rules to apply：
  - Vite client environment variables屬於 browser-visible public values，不得存放 password、access token 或 confidential client secret。
  - URL 與 boolean config 必須集中解析、驗證與正規化，不在各模組自行提供不同 fallback。
  - 不改變既有 API path、request method、payload shape 與成功流程，除非 task 中明確記錄且經人工確認。
  - 未確認 backend auth contract 前，不臆測新的 grant、refresh 或 role model。
- Domain-specific risks to check：
  - build-time values 被誤認為 secrets。
  - URL slash normalization 造成 endpoint path 改變。
  - project testing-data flag 改變後意外接到 live service。
  - 移除登入預設值後 reset/login UX 回歸。
  - OAuth client fields 與現有 backend contract 不相容。
- Domain-specific validation：
  - runtime config unit tests。
  - TypeScript type-check、Vite production build、ESLint check-only。
  - source scan 確認沒有原開發 endpoint、預設 username/password 或 non-empty client secret。
  - mock/offline login與API base URL組合檢查；不發送真實 request。

### 2.5 Domain Context Checklist

- [x] 已讀取 project 的 domain mapping
- [x] 已確認本任務 active domain
- [x] 已確認 task active capability
- [x] 已確認本 task 不改變 project primary domain
- [x] 已檢查 project-local core 規則
- [x] 已檢查 project-local active domain 規則狀態：Web domain unavailable，採 core-only fallback
- [x] 已列出 domain-specific files to inspect
- [x] 已列出 domain-specific risks to check
- [x] 已列出 domain-specific validation

---

## 三、DevOps 對應資訊

本 project 尚未採用手動 Azure DevOps Work Item／PR 文案流程，也未導入對應 templates。

- Work Item 類型：Not applicable
- Work Item ID：Not applicable
- Work Item 標題：Not applicable
- PR 類型：一般前端安全／設定改善 PR（若未來採 PR 流程）
- PR 標題：`集中前端 Runtime Config 並移除 Credential 預設值`
- 建議 branch 名稱：`codex/task-001-runtime-config-security`
- 建議 commit message：`建立前端執行環境與 API 設定安全基線`
- 若暫不建立 Work Item 草稿，原因：project 未採手動 Azure DevOps 流程，相關 templates 未導入。
- 若暫不建立 PR 草稿，原因：目前只建立 task，尚未確認實作與 PR 流程。

---

## 四、背景說明

- 背景：Retrofit inventory 發現前端的 authentication、algorithm API 與 project prototype service 分別管理自己的 base URL，且 source 含開發期登入／OAuth 預設值。
- 問題描述：設定分散且帶有 hard-coded development assumptions，fresh environment 無法安全且明確地切換服務；browser source 也不應保存 credential 或 confidential client value。
- 任務來源：`PLAN.md` Phase 2 與 `docs/requirements.md` 的 FR-001／NFR-001。
- 使用者情境 / 觸發路徑：
  1. 維護者在 local、integration 或 production-like environment 啟動 frontend。
  2. Vite 載入明確的 public runtime config。
  3. Navigation login 將使用者當次輸入交給 auth store。
  4. Auth、algorithm 與 project services 使用相同的 config contract 組合 request URL。
  5. 缺少或錯誤設定時，系統提供可診斷錯誤，而非默默連到既有開發位址。

---

## 五、任務目標

1. 建立單一、可型別化與可測試的 frontend runtime config 入口。
2. 將 auth、algorithm 與 project service base URLs 從功能模組移至明確的 Vite environment contract。
3. 移除登入 UI 的預設 username/password，以及 source 中可被誤用的 credential/client-secret 預設值。
4. 建立安全 placeholder 的 `.env.example` 與操作文件。
5. 在不接真實 backend 的前提下，以 unit/static/build evidence 證明設定行為。

---

## 六、本次範圍

1. 新增集中式 runtime config module，負責讀取、驗證與正規化 public environment values。
2. 定義並文件化下列候選 public variables；最終命名可在實作前 read-back 調整：
   - `VITE_AUTH_BASE_URL`
   - `VITE_ALGORITHM_API_BASE_URL`
   - `VITE_PROJECT_API_BASE_URL`
   - `VITE_USE_PROJECT_TEST_DATA`
   - `VITE_OAUTH_CLIENT_ID`（只有 backend contract 確認其為 public client identifier 時使用）
3. 更新 `env.d.ts`，提供對應 `ImportMetaEnv` typings。
4. 新增 `.env.example`，只含 placeholder／安全示例，不含真實內網位址、帳密、token 或 confidential client secret。
5. 更新 `src/api/index.js`、`src/stores/auth.js`、`src/services/HttpServiceCommunicator.ts` 使用集中設定。
6. 更新 `src/views/NavigateBar.vue`，移除預填與 reset 回開發期 username/password 的行為，並清理不再使用的 duplicate/commented auth code。
7. 保留既有 API endpoint paths、methods、payloads與token memory lifecycle；只調整 configuration source 與登入預設值。
8. 新增 runtime config unit tests，涵蓋 valid、missing、invalid URL、boolean parsing 與 slash normalization。
9. 同步 README、API contract、architecture、testing 文件。

---

## 七、不在本次範圍

1. 重設 OAuth grant、token refresh、role/permission、route guards 或 backend authentication architecture。
2. 在 browser bundle 放入 password、access token、API key 或 confidential client secret。
3. 修改 backend、OAuth server、GPU/model service、CORS、TLS、DNS 或 deployment infrastructure。
4. 修改 generator endpoint path、YAML schema、request/response payload 或 output directory parsing。
5. 全面重構 `DefectGeneratorPage.vue`、API error handling 或 Pinia state architecture。
6. 補齊 `js-yaml` direct dependency、Node engine、CI 或完整 offline API test baseline；這些應是後續 task。
7. 執行真實登入、模型載入、影像生成、結果下載或 production deployment。

---

## 八、影響範圍

- 影響模組：runtime config、auth store、navigation login、algorithm Axios client、project prototype service。
- 影響流程：app startup、login、config download、generator/result API calls、project testing/live routing。
- 影響資料：只涉及 public environment values 與使用者當次輸入；不得新增 credential persistence。
- 影響外部系統 / 整合點：OAuth service、algorithm service、project prototype service；本 task 不修改外部系統。
- 影響文件：`README.md`、`docs/architecture.md`、`docs/api-contract.md`、`docs/testing.md`、本 task。
- 相容性風險：缺少 environment variables 可能使 startup／request 明確失敗；必須定義 migration與錯誤訊息，避免 silent fallback。
- domain-specific 影響：Vite build-time configuration 會進入 browser bundle，所有被注入的值必須視為 public。

---

## 九、預期修改點

- 優先閱讀檔案：
  - `src/api/index.js`
  - `src/stores/auth.js`
  - `src/services/HttpServiceCommunicator.ts`
  - `src/views/NavigateBar.vue`
  - `vite.config.ts`
  - `env.d.ts`
- 預期修改模組：runtime config、API/auth/service consumers、login UI。
- 預期修改層級：configuration boundary 與薄 consumer wiring；不重構主要生成流程。
- 預期修改檔案 / 路徑：
  - 新增 `src/config/runtimeConfig.ts`
  - 新增 `src/config/__tests__/runtimeConfig.test.ts`
  - 新增 `.env.example`
  - 修改 `env.d.ts`
  - 修改 `src/api/index.js`
  - 修改 `src/stores/auth.js`
  - 修改 `src/services/HttpServiceCommunicator.ts`
  - 修改 `src/views/NavigateBar.vue`
- 可能連動修改檔案：
  - `README.md`
  - `docs/architecture.md`
  - `docs/api-contract.md`
  - `docs/testing.md`
  - `docs/requirements.md`（若確認需求或 auth assumptions 有改變）
- 明確不應優先修改的區塊：
  - `src/views/defect_generator_page/DefectGeneratorPage.vue`
  - generator payload/YAML mapping
  - backend/API implementation
  - workspace shared/core/domain assets
- 修改點定位理由：所有已觀察的 hard-coded environment／credential signals 集中在上述 config consumers，不需要擴張到主生成 SFC。
- 需同步檢查的測試：runtime config unit tests、auth store mock test（若本次可在不擴張範圍下建立）、type-check、build、lint check-only。
- 需同步檢查的文件：README、architecture、API contract、testing與task closure sections。

---

## 十、輸入、輸出與任務附件

- 輸入：現有 source config locations、project domain mapping、FR-001、NFR-001、API contract inventory。
- 輸出：集中 runtime config、safe `.env.example`、移除 hard-coded sensitive defaults、unit tests與同步文件。

### 10.1 Task Artifacts / Visual References

- Artifact directory：Not applicable；本 task 不依賴圖片、sample data、log或外部設計稿。
- Visual references：none。
- Data / fixture references：runtime config tests 只使用假的保留網域或 local placeholder，不使用真實服務資訊。
- External / non-committed references：backend OAuth/client contract 尚待 owner 確認；不得把 credential 作為附件提交。

| Reference | Reason not committed | Access / owner | How to use |
| --- | --- | --- | --- |
| OAuth client field contract | 外部系統 contract；可能涉及敏感資訊 | Backend/auth owner | 只確認欄位是否需要與是否可公開，不取得或記錄秘密值 |
| Environment endpoint values | Environment-specific operational data | Deployment owner | 實作後由部署環境提供，不寫入 repo |

- Artifact handling checklist：
  - [x] 本 task 不依賴可提交附件，因此不建立 `TASK-001-assets/`
  - [x] 外部 contract 已記錄 owner／用途，不記錄秘密值
  - [x] 沒有必讀圖片或 sample 只存在聊天附件
  - [x] Project artifact 不會放入 workspace shared/core/domain

---

## 十一、驗收標準

1. Repo 中不再存在現有 hard-coded auth、algorithm或project service開發位址；consumer全部透過單一 runtime config contract 取得 base URL。
2. Login dialog 初次開啟與 reset 後的 username/password 都為空，不再自動填入 repository 內的開發帳密。
3. Browser source、`.env.example`、tests與docs不包含真實 password、token、API key、confidential client secret或內網 endpoint。
4. `.env.example` 列出所有必要 public variables、用途、示例格式與「VITE values會進入browser bundle」警告。
5. Runtime config 對缺失值、invalid URL與invalid boolean有deterministic行為及可理解錯誤；不silent fallback至舊開發位址。
6. URL normalization不改變既有API path語意，不產生意外double slash或遺失path prefix。
7. `VITE_USE_PROJECT_TEST_DATA` 以明確boolean contract控制，不再由class constant固定；實作需證明不會因缺省值意外連線live service。
8. 若OAuth backend要求confidential client secret，task必須標記為受阻或拆出backend/BFF後續工作；不得把secret放進`VITE_*`或frontend source。
9. 既有token只保留於目前Pinia memory state；本task不得新增localStorage/sessionStorage/cookie persistence。
10. Runtime config unit tests涵蓋valid、missing、invalid URL、boolean parsing與slash normalization。
11. `npm run type-check`、`npm run build`、Vitest target tests與ESLint check-only通過；若dependencies仍不可用，必須記錄阻塞、替代static checks與未驗證風險，不得宣稱完成。
12. README、API contract、architecture與testing文件與實作一致。
13. `bash scripts/project-check.sh`與`git diff --check`通過。

---

## 十二、驗證方式

- 單元測試：
  - `npm run test:unit -- --run src/config/__tests__/runtimeConfig.test.ts`
  - 如新增auth store tests，使用mock Axios，禁止發送network request。
- 整合測試：
  - 使用fake environment values import/initialize config，確認三個consumer組合的base URL符合預期。
  - 使用mock確認login request path與authorization consumers未改變。
- End-to-end / flow測試：
  - 本task預設不執行live E2E。
  - 若已有可攔截network的offline Cypress baseline，可驗login dialog空值與config error；否則記錄為後續task。
- 手動驗證：
  - 啟動local app時使用fake/local endpoint，確認login dialog不預填。
  - 故意缺少必要environment variable，確認錯誤清楚且不連線舊位址。
- 文件檢查：
  - 搜尋舊開發endpoint與預設credential signal。
  - 搜尋`.env*`是否被正確ignore，並確認`.env.example`可追蹤。
- domain-specific validation：
  - `npm run type-check`
  - `npm run build`
  - `./node_modules/.bin/eslint .`
  - `bash scripts/project-check.sh`
  - `git diff --check`

---

## 十三、風險、限制與假設

- 已知風險：
  - 移除fallback後，未設定environment的local開發會明確失敗。
  - URL normalization或path prefix處理錯誤會影響全部API。
  - Testing-data flag預設語意若未確認，可能意外切到live service或讓prototype不可用。
  - OAuth client fields若與backend不相容，login會失敗。
- confirmed domain-specific risks：
  - Vite client variables皆可由browser取得，不能當成secret store。
  - JS/TS混用時需要維持import與type-check相容。
  - Login UX與API request contract需以offline mock保護。
- 已知限制：
  - Repo目前沒有`node_modules`與有效unit test baseline；實作時可能需先安全安裝dependencies。
  - Backend/OpenAPI/OAuth正式contract尚未導入。
  - Workspace Web domain assets unavailable。
- 假設前提：
  - 三組service base URLs是environment-specific public routing data。
  - Endpoint paths與request payload本task維持不變。
  - Project testing-data routing可由explicit public boolean控制。
- 人工覆核需求：
  - Backend/auth owner確認client ID/secret欄位需求。
  - Deployment owner確認environment variable命名與注入方式。
  - 使用者確認missing-config策略與project testing-data預設語意。

---

## 十四、建議技能

### Core skills

- skill：`requirement-breakdown`
- 使用理由：本task已用它建立scope、acceptance、risks與confirmation-stop。
- skill：`test-case-generation`
- 使用理由：實作前補足runtime config與auth mock的normal/boundary/error cases。
- skill：`code-review`
- 使用理由：檢查secret exposure、URL contract、fallback與consumer wiring。
- skill：`technical-documentation`
- 使用理由：同步README、API contract、architecture與testing說明。

### Domain skills

- skill：none。
- 使用理由：Workspace Web domain assets unavailable；依baseline採core-only fallback。

### Project-specific skills

- skill：none。
- 使用理由：本任務不需要過早建立project-specific workflow；候選`defect-generation-workflow`與本task無直接必要性。

---

## 十五、DevOps 文案草稿摘要

- Work Item 草稿位置：未建立；project未採手動Azure DevOps流程。
- PR 草稿位置：未建立；目前只建立task且尚未確認實作。
- 文件同步提醒：實作時更新README、architecture、API contract、testing與本task closure sections。

---

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
- `.agents/core/skills/technical-documentation/SKILL.md`
- `.agents/core/templates/task-template.md`
- `.agents/core/checklists/task-template-compliance-checklist.md`

### Project-local active domain assets

- None；`web` domain assets `not available` / `not imported`。

### 其他

- `src/api/index.js`
- `src/stores/auth.js`
- `src/services/HttpServiceCommunicator.ts`
- `src/views/NavigateBar.vue`
- `vite.config.ts`
- `env.d.ts`

---

## 十七、任務結尾檢查

> 本章保留給實作與closure階段回填。Task目前為Draft，不得把未執行項目標示完成。

### 17.1 實際修改摘要

- 實際新增檔案：`.env.example`、`src/config/runtimeConfig.ts`、`src/config/__tests__/runtimeConfig.test.ts`、`src/stores/__tests__/auth.test.js`、`src/services/__tests__/HttpServiceCommunicator.test.js`、本task文件。
- 實際修改檔案：`env.d.ts`、`src/api/index.js`、`src/stores/auth.js`、`src/services/HttpServiceCommunicator.ts`、`src/views/NavigateBar.vue`、`README.md`、`AGENTS.md`、`PLAN.md`、`docs/context.md`、`docs/architecture.md`、`docs/requirements.md`、`docs/api-contract.md`、`docs/testing.md`、`docs/workspace-baseline.md`。
- 實際未修改但已確認無需修改的檔案：`package.json`、`package-lock.json`、`vite.config.ts`、`scripts/project-check.sh`、`src/views/defect_generator_page/DefectGeneratorPage.vue`。
- 與原預期不同之處：新增auth request與project testing/live routing mock tests；fresh build/type-check揭露既有baseline阻塞。
- 未納入本次處理但需記錄的項目：OAuth architecture、direct dependencies、Node engine、CI、完整API tests、既有type errors與dependency vulnerabilities。

### 17.2 驗收與驗證結果

- 驗收標準完成情況：11/13完成；OAuth backend compatibility需controlled manual integration，full build/type-check被既有baseline阻塞。
- 已執行驗證：`npm ci`、16個Vitest tests、targeted TypeScript no-emit、JS syntax、targeted ESLint/Prettier、source sensitive-value scan、`bash scripts/project-check.sh`、`git diff --check`；npm驗證後移出可重建`node_modules`再做final harness。
- 驗證結果：runtime config、auth no-secret、testing/live routing、targeted compile/format/lint與project governance PASS。
- 無法通過的驗證：full `npm run type-check`有既有app/prototype errors；`npm run build-only`因缺少`sass-embedded`direct dependency而BLOCKED。
- 未驗證風險：未確認實際OAuth server是否接受optional public client ID且不需confidential secret；未執行real login/API/GPU smoke。
- 替代檢查方式：Axios與service mocks、`.invalid`fixtures、static source scan、targeted TypeScript與unit tests。
- domain-specific validation結果：Web runtime config的normal/boundary/error paths PASS；full app build與controlled integration pending。

### 17.3 文件與DevOps同步

- 是否需更新README / PLAN / docs：是；已同步README、AGENTS、PLAN、context、architecture、requirements、API contract、testing與baseline。
- 是否已更新task：是，已回填implementation與validation evidence。
- 是否已更新Work Item草稿：否；不適用。
- 是否已更新PR草稿：否；目前未確認實作。
- 是否需補commit message / release note：已提供commit message建議；release note目前不適用。
- 未同步項目與原因：未建立DevOps drafts，因project未採該流程。

### 17.4 風險、後續與回補

- 剩餘風險：full type-check/build baseline未通過；OAuth live compatibility、dependency vulnerabilities與deployment values未驗證。
- 人工覆核需求：OAuth client contract、deployment variables、controlled non-production login、existing build/type errors。
- 後續task：dependency/build/type-check baseline、offline API contract tests、auth lifecycle/route protection。
- 是否發現shared/core/domain缺口：是；project harness的CRLF scan會掃描被gitignore的`node_modules`，fresh `npm ci`後因第三方CRLF檔案FAIL，移出dependencies後PASS。
- 是否需建立WGAP：建議建立project-local WGAP候選，回饋harness應排除dependency/build/vendor directories；本task不直接修改workspace shared harness，也不在未導入feedback workflow時擴張建立正式WGAP文件。
- 是否有lessons learned / change pattern候選：有project-local候選——public Vite config需fail-fast、不得承載secret，testing/live routing需explicit boolean與offline tests；單一project證據不足以升級shared/domain。
- Learning record：目前不建立；先在後續Web project/task觀察是否重複，再評估project-local learning或Web Domain MVP evidence。

### 17.5 Closure Decision

- Final Task status：`Implemented`
- Final Verification status：`Tests Passed / Build Blocked / Manual Pending`
- Final Review status：`Pending Review`
- Final Repo status：`Untracked`
- [ ] 可關閉
- [x] 有條件關閉，需列出條件
- [ ] 不可關閉，需補工作
- 結論：功能實作與offline tests完成；需另處理fresh build/type-check baseline，並由auth owner進行controlled integration確認後，才可將task標為Closed。

---

## 十八、執行紀錄

### 第一次處理

- 日期：`2026-07-20`
- 處理內容：讀取domain mapping、project-local requirement breakdown skill、task template與compliance checklist；盤點environment/auth/API設定位置並建立TASK-001草稿。
- 結果：Draft，等待確認；task template compliance與project harness PASS，未修改`src/**`。

### 第二次處理

- 日期：`2026-07-20`
- 處理內容：使用者確認直接實作；建立typed runtime config與safe `.env.example`，遷移auth/algorithm/project consumers，移除登入預設值與client secret，新增16個offline tests並同步文件。
- 結果：Implemented；offline tests與targeted checks PASS，full build/type-check baseline阻塞及manual OAuth integration待處理；另記錄project harness掃描`node_modules`的WGAP候選。

---

## 十九、更新紀錄

### v0.1

- 建立TASK-001初版。
- 定義runtime config、credential清理、`.env.example`、offline tests與文件同步範圍。
- 保留confirmation-stop與closure回填章節。

### v0.2

- 回填TASK-001實作檔案、驗收結果、驗證證據與remaining risks。
- 狀態更新為`Implemented / Tests Passed, Build Blocked, Manual Pending / Pending Review / Untracked`。

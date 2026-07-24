# defect_generator Testing Strategy

## 1. 文件目的

本文件定義 `defect_generator` 的驗證層次、offline-first原則、建議命令、測試缺口與真實整合gate。TASK-001建立第一批runtime config/auth routing tests；TASK-003再補上API、YAML mapping、Canvas座標與Object URL lifecycle的characterisation evidence，但仍不代表完整UI或live integration coverage。

## 2. Current Test State

- `package.json` 提供 type-check、build、Vitest、Cypress、ESLint 與 Prettier scripts。
- 現有 Cypress `example.cy.ts` 是 template example，不涵蓋產品流程。
- TASK-001新增3個test files、16個tests：runtime config 12、auth request 2、project runtime routing 2。
- TASK-003新增4個test files、33個tests：offline API contract 16、YAML mapping/round-trip 11、Canvas座標3、Object URL lifecycle 3；全套目前為7 files / 49 tests。
- 已有4份synthetic YAML fixtures；仍未導入正式YAML schema、Canvas golden fixture或coverage threshold。
- 未發現 CI workflow。
- 2026-07-20以Node `v24.15.0`、npm `11.12.1`完成`npm ci`；package尚未宣告正式engine。
- 未連線真實backend/GPU。

Current confidence：public runtime config、OAuth不送client secret、testing-data隔離、主要algorithm/result request shape、既有YAML mapping、Canvas座標換算與Object URL cleanup已有automated evidence；component/UI flow、錯誤恢復、正式schema與live backend/GPU仍缺測試。

## 3. Testing Principles

1. 預設 offline-first，不需要真實 credential、內網、GPU 或 production-like data。
2. 先 characterise 現況，再重構大型 Defect Generator view。
3. API、YAML、Canvas 與 file mapping 使用 deterministic fixtures。
4. 真實 integration smoke 必須顯式 opt-in，並先確認資源與資料邊界。
5. 測試不應把 token、credential、內網 URL 或使用者圖片寫入 snapshots/logs。
6. 變更後的驗證深度應與風險相稱，並在 task/read-back 記錄實際執行結果。

## 4. Validation Layers

### Layer 0：Project governance / hygiene

```bash
bash scripts/project-check.sh
git diff --check
```

涵蓋 project entry、baseline、copied assets、thin adapters、task schema（若有 task）、tracked `.DS_Store` 與 whitespace。它不會編譯產品程式。

### Layer 1：Static frontend checks

Dependencies 安全安裝後：

```bash
npm run type-check
npm run build
./node_modules/.bin/eslint .
./node_modules/.bin/prettier --check src/
```

注意：`npm run lint` 使用 `--fix`，`npm run format` 使用 `--write`，兩者會修改檔案，不適合作為純唯讀診斷命令。

### Layer 2：Unit tests

```bash
npm run test:unit -- --run
```

Current offline tests：

- `src/config/__tests__/runtimeConfig.test.ts`
- `src/stores/__tests__/auth.test.js`
- `src/services/__tests__/HttpServiceCommunicator.test.js`
- `src/api/__tests__/index.test.js`
- `src/stores/__tests__/modelConfigMapping.test.js`
- `src/utils/__tests__/canvasGeometry.test.ts`
- `src/utils/__tests__/objectUrl.test.ts`

優先測試：

- model config defaults 與 UI-to-YAML mapping。
- range、number/string/array conversion。
- auth store success/failure/logout/expiry handling。
- API response parsing，尤其 output folder 與 filename。
- ProjectData Zod conversion。
- pure image/file helpers 與 Object URL cleanup。
- i18n catalog consistency。

### Layer 3：Component tests

使用 Vue Test Utils + Vitest/jsdom，覆蓋：

- model chooser 顯示正確 controls。
- config loading/error/empty states。
- file selection、invalid files、mask mismatch。
- generate button enable/disable/loading/error。
- result list、preview、download feedback。
- login/logout UI 與 unauthorized state。

大型 SFC 若難以直接測試，先抽出 pure mapping／composables，但不得用重構改變未被確認的行為。

### Layer 4：API contract tests

使用 Axios mock 或 mock service worker 類型的 project-local工具（需另行評估 dependency）驗證：

- request method/path/query/body/headers。
- YAML、JSON、multipart 與 blob content types。
- success、4xx、401/403、5xx、timeout、network error。
- malformed/missing response fields。
- long-running job、partial result 與 expired result assumptions。

不得讓 offline contract tests 實際呼叫 source 中的開發位址。

### Layer 5：Canvas / image characterisation

使用固定、無敏感資料的最小 fixtures：

- 不同比例與解析度圖片。
- matching/mismatching mask dimensions。
- 空白、全黑、全白與透明 mask。
- Canvas scale、pointer coordinates、device pixel ratio。
- Blob/File MIME、filename、array order。
- Object URL create/revoke lifecycle。

如 browser rendering 與 jsdom 差異過大，將純座標／mapping logic 單元化，視覺互動保留於 browser E2E。

### Layer 6：Mock/offline E2E

以 Cypress 啟動本地 Vite，攔截全部 network requests：

- login → config load → select model → upload fixture → generate → preview → download。
- 各模型至少一條 happy path。
- unauthorized、config error、generator error、empty result、download failure。
- route/nav/prototype scope smoke。

現有 template `example.cy.ts` 應在新 task 中被具產品意義的 spec 取代。

### Layer 6.4：Report-only visual reference mapping

Project已導入`web-visual-reference-mapping`、report template與checklist。當confirmed Web task由Current／Target／Annotated、Browser comments、screenshots或Appshots驅動時：

- 使用`C-*`、`T-*`、`A-*`、`R-*`與mapping IDs記錄visual inputs及anchors。
- 依證據選擇`exact-condition`、`responsive-intent`或`semantic-only`；未知條件維持`UNKNOWN`。
- 每個mapping使用`MAPPED`、`PARTIAL`、`UNMAPPED`或`UNKNOWN`，不得當成Browser `PASS`／`FAIL`。
- original不可取得時記錄`original-unavailable`；derived screenshot不得冒充original annotation。
- mapping只產出source hints、implementation acceptance及Browser re-verification conditions；不授權改檔、不寫入TASK assets。

### Layer 6.5：Report-only browser verification

Project已導入`web-browser-verification`、report template與checklist。當confirmed task需要實際rendered route、state、viewport、input或可見回歸證據時：

- 記錄requested與actual route/state/viewport/input conditions。
- 每個check使用`PASS`、`FAIL`、`NOT RUN`或`UNKNOWN`，並分開observation與inference。
- screenshot、annotation或Appshot只作context，不等同DOM、interaction、network、E2E或cross-browser證據，也不授權改檔。
- 修正仍由`web-feature-implementation`負責；修正後以相同條件重新驗證。
- `web-runtime-diagnostics`目前未導入；若一般browser evidence無法解釋bounded symptom，先建立明確diagnostic question並確認permission gate，再評估upgrade。

Local Vite server可用或build成功只代表環境可啟動，不等同產品browser verification完成。

### Layer 7：Live integration smoke

只在 `docs/api-contract.md` 的 Live Integration Gate 滿足後執行：

- 專用非 production environment。
- 安全測試 credential。
- 小型、可刪除、無敏感資料 fixtures。
- backend/GPU owner 知情且資源上限明確。
- 明確 cleanup、timeout、成功標準與停止條件。

## 5. Risk-based Regression Matrix

| 變更類型 | 最小驗證 | 加強驗證 |
| --- | --- | --- |
| 純文件／agent assets | project harness、whitespace | link/path read-back |
| UI copy/style | type-check、build、component test | mock E2E、visual review |
| Route/navigation | type-check、build、router tests | hosting fallback E2E |
| Store/config mapping | unit tests、type-check | YAML contract + component tests |
| API method | request/response contract tests | authorized integration smoke |
| Auth/security | unit + contract + manual security review | staging role/expiry tests |
| Canvas/mask | deterministic unit/characterisation | browser E2E + visual inspection |
| Generator orchestration | mock E2E、error/timeout cases | controlled GPU integration |
| Build/deployment | production build | preview/staging smoke + rollback |

## 6. Fixture Policy

- Fixtures 必須小、deterministic、無個資／機密／真實客戶資料。
- 每個 fixture 記錄目的、format、dimensions 與 expected outcome。
- YAML fixtures 應含 valid、minimum、boundary、missing-key、wrong-type、future-version variants。
- API fixtures 不使用真實 token、host 或 filesystem path。
- Blob/download tests 檢查 MIME 與 filename，不依賴實際大型 archive。

## 7. Coverage Priorities

### Priority 0：先補保護

- `js-yaml` direct dependency/fresh install behavior。
- TFIDG naming/routing。
- currentSliders／model chooser mapping。
- four-model YAML parse/serialize。
- auth state與 API authorization。
- output folder parsing。
- image/mask pairing、Canvas coordinates。

### Priority 1

- loading/error/reset/retry states。
- Object URL cleanup。
- result blob/download filename。
- ProjectData TypeScript/Zod agreement。
- i18n keys。

### Priority 2

- Prototype routes/views。
- accessibility與responsive UX。
- performance limits與large-batch behavior。

## 8. CI Baseline Proposal

尚未授權建立 CI。未來最小 pipeline 建議：

1. 固定 Node/npm version。
2. `npm ci`。
3. ESLint/Prettier check-only。
4. type-check。
5. unit/contract tests with coverage。
6. production build。
7. mock/offline Cypress in a separate job。
8. `bash scripts/project-check.sh`。

Live backend/GPU tests 不應是一般 PR 的預設 job。

## 9. Validation Record

### Retrofit generation

- Project harness：PASS；`bash scripts/project-check.sh --no-git` 與 `bash scripts/project-check.sh` 均通過（version 1.2.0 / format 1）
- Cypress：not run；current spec is template-only
- Live integration：not run by design

### TASK-001 runtime config/security baseline

- Dependency install：PASS；`npm ci`安裝620 packages，package manifest/lockfile未改動。
- Unit tests：PASS；3 files / 16 tests。
- Targeted TypeScript：PASS；`runtimeConfig.ts`與其tests可獨立no-emit compile。
- JS syntax：PASS；`src/api/index.js`與`src/stores/auth.js`。
- New/targeted formatting：PASS；runtime config、tests、service與env typings。
- Full project type-check：FAIL on pre-existing app/prototype errors；output不包含TASK-001 runtime config或新增tests。
- Production build：BLOCKED；fresh install缺少SCSS所需`sass-embedded` direct dependency。
- ESLint：runtime config/tests/service通過；`NavigateBar.vue`被既有`vue/block-lang`規則擋住，將整個JS SFC轉為TS不在本task範圍。
- Project harness / whitespace：PASS。
- Harness observation：`node_modules`存在時，harness的CRLF scan會掃到ignored third-party files並FAIL；完成npm驗證後移出可重建dependencies，final harness恢復PASS。此行為已記為workspace harness WGAP候選。
- Sensitive-value scan：PASS；產品source與`.env.example`沒有舊開發位址、預設帳密或client secret。
- Dependency audit：`npm ci`回報33個vulnerabilities（3 low、13 moderate、14 high、3 critical）；未執行`npm audit fix`或breaking upgrade。
- Dependency cleanup：驗證後未保留`node_modules`於repo；後續執行npm checks需重新`npm ci`。
- Live integration：not run by design。

### TASK-002 dependency/build/type-check baseline

- 執行環境：Node `v24.15.0` / npm `11.12.1`。
- Direct dependencies：PASS；`js-yaml@4.3.0`為runtime dependency，`sass-embedded@1.100.0`為dev dependency；source/config bare import盤點沒有其他missing direct dependency。
- Fresh dependency install：PASS；移出既有`node_modules`與`dist`後，`npm ci`依lockfile安裝636 packages，manifest與lockfile SHA-1前後一致。
- Dependency tree：`npm ls --depth=0` exit 0，direct dependencies無missing；npm 11列出Sass/Watcher的platform-specific optional packages為extraneous observation，不阻塞build。
- Full project type-check：PASS；14個既有Vue/TypeScript errors已以局部types、props、nullability與兩個legacy JS SFC精確declarations修正，未改`tsconfig`或加入blanket ignores。
- Production build：PASS；`npm run build-only`與aggregate `npm run build`均產生`dist`。
- Build warnings：Bootstrap 5.3.3 SCSS在`sass-embedded` 1.100.0下產生`if-function` deprecation warnings，另有obsolete `mixed-decls` silence warning；目前為非阻塞後續dependency upgrade風險。
- Unit tests：PASS；3 files / 16 tests。
- Targeted ESLint：PASS；TASK-002修改的TypeScript/Vue檔案無lint error。
- New declaration formatting：PASS；`src/types/legacy-vue-components.d.ts`通過Prettier check。既有SFC整檔Prettier drift不在本task擴張重寫。
- Dependency audit：安裝時回報32個vulnerabilities（3 low、12 moderate、14 high、3 critical）；未執行`npm audit fix`或breaking upgrade。
- Live integration / Cypress：not run by design；本task不觸發backend、OAuth、GPU或model flow。

### TASK-003 offline API / YAML / Canvas characterisation baseline

- 執行環境：Node `v24.15.0` / npm `11.12.1`，以既有lockfile完成`npm ci`。
- Offline unit/contract tests：PASS；新增4 files / 33 tests，全套7 files / 49 tests PASS，Axios client完全mock，沒有真實HTTP request。
- API coverage：config download/edit、四種generator request與既有`message` output-folder parsing、四種malformed response、upload image/mask ordering、result list/data、blob preview、download filename與fallback。
- YAML coverage：四份synthetic fixtures、四模型既有store mapping、CutPaste missing-key merge、Mode 2 wrong-type現況、malformed YAML error與四份round-trip；這些是frontend characterisation，不是正式backend schema。
- Canvas/Object URL coverage：display-to-bitmap normal/boundary/non-uniform scaling，以及create、replace-before-revoke與empty cleanup lifecycle。
- Full type-check / production build：PASS；build仍只有既有Bootstrap Sass deprecation warnings。
- Static checks：新增helpers/tests/fixtures的ESLint、Prettier與JS syntax PASS。大型legacy SFC目前與`HEAD`相同，均為20個既有lint errors；本task沒有新增lint finding。
- Project harness：安裝dependencies時會因掃描ignored `node_modules`內第三方CRLF而FAIL；移出可重建`node_modules`/`dist`後重跑結果記錄於TASK-003 closure。此為既有harness observation，不是產品source drift。
- Live integration / Cypress：not run by design；未觸發OAuth、backend、GPU、model load或真實資料。

## 10. Exit Criteria for Product Changes

一份產品 task 可宣告完成前，至少要：

- 驗收條件逐項 read-back。
- 執行並記錄適用的 static/unit/contract/component/E2E checks。
- 未執行項目有原因與 residual risk。
- API、架構、操作或 baseline 改變時同步文件。
- 不包含 secrets、runtime artifacts 或未授權 live data。

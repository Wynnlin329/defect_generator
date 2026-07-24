# defect_generator Project Entry

## 文件目的

本檔是 `defect_generator` 的 project-local 工作入口。共通規則以 `.agents/core/base/BASE_AGENTS.md` 為準；本檔只補充本 project 的事實、必讀順序、修改入口、風險與驗證要求。

## 一、Project 基本資訊

- Project 名稱：`defect_generator`
- Package 名稱：`aisvisionplatformfrontend`
- Project 類型：Vue single-page Web application / AI 瑕疵影像生成操作介面
- Project 目的：提供 AISVision 平台的瀏覽器操作介面，現階段主要啟用 Defect Generator，讓使用者設定生成模型、上傳圖片與遮罩、執行生成、預覽並下載結果。
- Project 狀態：active development / retrofit；部分 AISVision platform pages 仍屬 prototype。

## 二、Domain Mapping

- Primary domain：`web`
- Secondary capabilities：REST API、auth、AI model configuration、Canvas image processing、file upload/download、YAML、i18n、frontend testing
- Domain selection rationale：主要交付物與高頻修改面是 browser UI、routing、frontend state、Canvas interaction 與 API binding；backend 只作外部依賴。
- Active domain for current work：依 task 決定，預設仍為 `web`。
- Imported core assets：core base、4 個 core skills、6 個 core templates、task template compliance checklist、project harness。
- Imported domain assets：Web domain base、`web-requirement-breakdown`、`web-feature-implementation`、`web-browser-verification`、`web-visual-reference-mapping`、`web-task-template.md`、`web-integration-checklist-template.md`、browser/visual mapping report templates與checklists。
- Domain assets status：workspace Web Stage 1 foundation、Stage 2 browser verification與Optional visual reference mapping已存在；上述Stage 1 active set、Stage 2 required set與visual mapping三件組已導入`.agents/domain/web/`。
- Fallback behavior：Web tasks 使用 core + imported Web assets；未導入或尚不可用的能力維持 core-only fallback。
- Project-specific overrides：保留既有 Vue/Vite/npm scripts 與 source layout；不因 retrofit 搬移產品程式。

只有 baseline 明列且實際存在於 `.agents/domain/web/` 的資產視為已導入；不得使用 iOS assets 代替未導入的 Web 能力。

## 三、Active Core Layers

### Core Layer

- Core base：`.agents/core/base/BASE_AGENTS.md`
- Core skills：`.agents/core/skills/`
- Core templates：`.agents/core/templates/`
- Core checklists：`.agents/core/checklists/`

### Codex Native Discovery Layer

- Adapter root：`.agents/skills/`
- Canonical root：`.agents/core/skills/`
- Contract：每個 copied core skill 對應同名 thin adapter；adapter 不複製 workflow body。

### Claude Code Native Discovery Layer

- Entry：`CLAUDE.md`，以 `@AGENTS.md` relative import 載入本檔。
- Adapter root：`.claude/skills/`
- Canonical root：`.agents/core/skills/`
- Runtime verification：尚未做 fresh-session smoke，狀態為 `UNKNOWN`。

### Domain Layer

- Primary domain：`web`
- Domain base：`.agents/domain/web/base/DOMAIN_AGENTS.md`
- Domain skills：`.agents/domain/web/skills/web-requirement-breakdown/`、`.agents/domain/web/skills/web-feature-implementation/`、`.agents/domain/web/skills/web-browser-verification/`、`.agents/domain/web/skills/web-visual-reference-mapping/`
- Domain templates：`.agents/domain/web/templates/web-task-template.md`、`.agents/domain/web/templates/web-integration-checklist-template.md`、`.agents/domain/web/templates/web-browser-verification-report-template.md`、`.agents/domain/web/templates/web-visual-reference-mapping-report-template.md`
- Domain checklists：`.agents/domain/web/checklists/web-browser-verification-checklist.md`、`.agents/domain/web/checklists/web-visual-reference-mapping-checklist.md`
- 使用方式：Web task 先遵守 core workflow，再讀取 task 相符的 project-local Web companion；project-specific Web 事實仍以本檔與 `docs/` 為準。
- Not imported：Web bootstrap／retrofit assets、optional `web-runtime-diagnostics`與其他Later能力。

### Project Override Layer

- Project-specific rules：本檔的 API、auth、Canvas、model、GPU 與驗證限制。
- Project-specific skills：目前不建立；候選 `defect-generation-workflow` 待流程與 tests 穩定後再評估。
- Project-specific templates：none。

## 四、Workspace Pointer / Canonical Workspace Sources

- Workspace repo lookup order：
  1. `$WORKSPACE_REPO`
  2. `../..`（本 repo 位於 workspace `projects/` parking area）
  3. `../workspace`
  4. `../workspace_git/workspace`
  5. `docs/workspace-baseline.md` 的 Workspace repo location
  6. 使用者提供的路徑
- Workspace repo location：`/Users/aissens/Documents/workspace_git/workspace`
- Workspace version / ref：`v1.17.0` / `280a1c1`（正式release foundation + `Unreleased` Web Stage 2與Optional visual mapping）
- Prompt catalog：`docs/prompts/README.md`
- Registry：`shared/registry.md`
- Governance：`docs/governance/`
- Guides：`docs/guides/`
- Release notes：`RELEASE_NOTES/`
- Last checked：`2026-07-24`

以上只作 upstream pointer。Project 日常工作以本 repo 的 `AGENTS.md`、`.agents/`、`docs/`、`PLAN.md` 與程式碼現況為優先。

## 五、開始工作前必讀順序

1. `README.md`
2. `AGENTS.md`
3. `.agents/core/base/BASE_AGENTS.md`
4. `docs/workspace-baseline.md`
5. `PLAN.md`
6. `docs/requirements.md`
7. `docs/context.md`
8. `docs/architecture.md`
9. `docs/api-contract.md`
10. `docs/testing.md`
11. `.agents/domain/web/base/DOMAIN_AGENTS.md`（active domain = `web` 時）
12. 與任務相符的 `.agents/skills/<name>/SKILL.md`，再完整讀取其指向的 project-local canonical skill
13. 與任務相符的 `.agents/domain/web/skills/<name>/SKILL.md`（若已導入）
14. `docs/tasks/TASK-xxx.md`（若任務已有 task）
15. 直接相關的程式碼、設定與測試

若任務涉及 workspace shared/core/domain 本身，切回 workspace repo，不在本 project 直接修改上游 assets。

## 六、Project 事實

### 技術棧

- 語言：TypeScript、JavaScript、Vue SFC、SCSS/CSS
- Framework：Vue 3、Vite、Vue Router、Pinia、Vue I18n、Bootstrap
- HTTP / validation：Axios、Zod、YAML serialization
- Browser processing：Canvas、FileReader、Blob、File、Object URL
- 測試：Vitest、Vue Test Utils、Cypress；已有runtime config/auth routing offline tests，產品coverage仍不足
- 執行方式：npm scripts；public runtime config contract已建立，production values、hosting與Node version尚待確認

### 主要模組與修改入口

#### Application shell / navigation

- 路徑：`src/main.ts`、`src/App.vue`、`src/router/index.ts`、`src/views/NavigateBar.vue`
- 責任：app bootstrap、global plugins、routes、navigation、login UI。
- 常見修改：新增 route、調整 navigation、登入顯示、global plugin。
- 連動檢查：static hosting fallback、route props、auth access、i18n、E2E。

#### Defect Generator

- 路徑：`src/views/defect_generator_page/DefectGeneratorPage.vue`
- 責任：模型狀態、參數表單、圖片／遮罩、Canvas、API orchestration、結果預覽與下載。
- 常見修改：模型參數、生成流程、mask、Canvas、loading/error、結果 UI。
- 連動檢查：`src/api/index.js`、stores、YAML contract、fixtures、backend resources。
- 限制：此檔約 2,958 行；未建立 characterisation tests 前不得直接大規模重寫。

#### API / auth boundary

- 路徑：`src/api/index.js`、`src/stores/auth.js`
- 責任：OAuth token、Axios client、config/generation/result endpoints。
- 常見修改：endpoint、headers、payload、timeout、response parsing、auth state。
- 連動檢查：`docs/api-contract.md`、environment config、security、backend compatibility、mock tests。

#### Configuration / state

- 路徑：`src/stores/configData.js`、`src/stores/apiData.js`、`src/stores/WorkingPageStore.ts`
- 責任：下載與解析模型 YAML、預設設定、UI-to-API mapping、page state。
- 常見修改：新增／調整參數、default values、type conversion。
- 連動檢查：主頁面 sliders、API YAML、backend schema、unit tests。

#### Browser image processing

- 路徑：`src/stores/elementToBlob.js` 與主頁面 Canvas functions。
- 責任：image/mask 讀取、Canvas drawing、File/Blob 轉換。
- 連動檢查：image dimensions、devicePixelRatio、CORS、mask alignment、Object URL cleanup。

#### Platform prototype areas

- 路徑：`src/views/home_page/`、`src/views/project/`、`src/views/account_page/`、`src/views/system_page/`
- 責任：AISVision platform 的 project、training、verification、account、admin prototypes。
- 限制：多數使用測試／靜態資料，且目前未在主導航啟用；不得把 prototype 自動視為正式需求。

## 七、關鍵流程

1. 登入：NavigateBar → auth store → OAuth token → Pinia memory state → Authorization headers。
2. 設定：config store → 下載四份 YAML → UI state → computed payload → YAML upload。
3. 圖片：upload → FileReader → Canvas／mask → File/Blob。
4. 生成：model chooser → generator API → output folder → image list → blob preview → ZIP download。
5. Project prototype：service wrapper → testing data generator 或 local API → Zod／cards／tables。

詳細說明見 `docs/architecture.md` 與 `docs/api-contract.md`。

## 八、Project 工作原則

### Task-first

- 功能、bug、重構、流程或驗證規則調整，原則上先以 `requirement-breakdown` 建立／更新 `docs/tasks/TASK-xxx.md`。
- 建立 task 後預設停下確認；只有使用者明確說「直接實作」或等效授權才可繼續。
- 新 task 必須使用 `.agents/core/templates/task-template.md`。

### 高風險人工覆核

下列變更必須先做影響分析並標示需要人工覆核：

1. API base URL、OAuth、credential、token lifecycle、permission。
2. 模型 YAML schema、生成 endpoint、response path parsing。
3. Canvas coordinate、mask、image conversion 與批次檔案 mapping。
4. Anomaly Diffusion model load、GPU、長時間或大量生成。
5. production build、部署、TLS、CORS、secrets 與 rollback。

### 外部資源與敏感資訊

- 未確認 endpoint、credential、certificate、backend owner、GPU 與資料邊界前，不執行真實 login/generation/download smoke。
- 文件、task、log、commit message 不得記錄密碼、token、內網機密值、production log 或使用者資料。
- Environment 文件使用 placeholder；local `.env*` 不提交。

### 文件同步

若任務影響 project 事實、架構、API、操作、測試或 domain mapping，同步檢查：

- `README.md`
- `PLAN.md`
- `docs/context.md`
- `docs/architecture.md`
- `docs/requirements.md`
- `docs/api-contract.md`
- `docs/testing.md`
- `docs/workspace-baseline.md`
- `docs/tasks/*`

## 九、技能路由

- 需求拆解／task → core `requirement-breakdown` + Web `web-requirement-breakdown`
- Current／Target／Annotated、Browser comments、screenshots或Appshots關係整理 → `web-visual-reference-mapping`（report-only）
- 已確認 Web feature 實作 → `web-feature-implementation`
- 實際 route／state／viewport 複驗 → `web-browser-verification`（report-only）
- Runtime diagnostics：optional、未導入；需要bounded question與permission gate後另走upgrade。
- 程式碼 review → `code-review`
- 測試案例與回歸矩陣 → `test-case-generation`
- 技術文件、架構、交接 → `technical-documentation`
- Release readiness：目前未導入；有明確 deployment/release workflow 後走 project upgrade 評估。
- Project-specific skill：目前無。

## 十、驗證入口

Retrofit / project-local governance：

```bash
bash scripts/project-check.sh
```

首次導入或不執行 git 檢查：

```bash
bash scripts/project-check.sh --no-git
```

在 dependencies 已安全安裝後，程式修改至少依風險執行：

```bash
npm run type-check
npm run build
npm run test:unit -- --run
```

`npm run lint` 目前會帶 `--fix` 修改檔案；唯讀檢查應使用 project-local ESLint binary 的 non-fix invocation。Cypress 與真實 backend smoke 依 `docs/testing.md` 的 boundary 執行。

## 十一、DevOps 文案狀態

- 手動 Azure DevOps Work Item / PR 流程：尚未確認，未導入 templates 與 `docs/devops/`。
- 若未來採用，需另走 project task／upgrade，不把外部物件建立權限視為自動授權。

## 十二、禁止事項

1. 不跳過 task confirmation-stop。
2. 不直接修改 workspace shared/core/domain。
3. 不把 Web／backend／AI project-specific 細節寫進 copied core assets。
4. 不以 iOS assets 代替未導入或尚不可用的 Web domain 能力。
5. 不在沒有 tests 與 contract evidence 時大規模重寫主頁面。
6. 不以 prototype、註解或 hard-coded value 當成已確認產品規格。
7. 不在未授權環境執行真實登入、模型載入、生成、下載或 deployment。

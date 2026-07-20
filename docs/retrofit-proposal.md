# defect_generator Retrofit Proposal

## 文件目的

本文件依 workspace `project-retrofit` flow 盤點既有 `defect_generator` repo，說明專案用途、現行架構、核心資料流、已知風險，以及確認後建議補齊的 project-local 文件與 agent 工作骨架。

本文件是 retrofit 第一階段的唯一產物。它不代表 retrofit 已完成，也不授權本階段修改既有產品程式碼、API 契約、正式環境或 workspace shared assets。

---

## 一、專案基本資訊

### 1. 專案名稱

- Repo / workspace project name：`defect_generator`
- npm package name：`aisvisionplatformfrontend`
- 畫面產品名稱：`ASUS-AISVision Platform 1.0.0`

### 2. 專案類型

- Browser-based Web application
- AI／電腦視覺瑕疵影像生成操作介面
- AISVision 平台前端原型，包含專案管理、模型訓練、驗證、帳號與系統管理頁面雛形

### 3. 專案目前狀態

- 已有可辨識的前端產品結構與生成流程實作。
- Defect Generator 是目前主導航唯一啟用的功能。
- Home、Projects、Trainer、Verifier、Account、System 等頁面仍保留，但多數使用測試資料、靜態資料或尚未接通的操作。
- API、身份驗證、模型設定與結果下載已出現實際整合程式碼，但執行環境與後端契約尚未在本輪驗證。
- 整體較接近「開發中／原型整合中」，尚不能只依現有 README 判定為可部署產品。

### 4. Repo 狀態

- 獨立 git repo，預設分支為 `main`，盤點時與 `origin/main` 對齊且工作樹乾淨。
- git 歷史目前只有兩筆早期 commit。
- 已有 `README.md`，但內容仍是 Vue/Vite 起始模板，未說明真實產品、API、模型或架構。
- `readme.txt` 為空檔。
- 尚無 root `AGENTS.md`、`PLAN.md`、`.agents/`、`CLAUDE.md`、正式 `docs/` 結構、CI workflow 或 project harness。
- repo 內存在未追蹤的 `.DS_Store`；未發現它們被 git 追蹤。
- 盤點環境沒有 `node_modules/`，因此本階段未執行 build、typecheck、unit test 或 Cypress。

---

## Scope of Ownership

- Repository scope：整個 `defect_generator` repo。
- Target subproject / path：repo root 與 `src/` Web application。
- In scope：
  - 現況與產品用途盤點。
  - Web primary domain 判定。
  - project-local 工作規則、架構、需求、API 契約與測試文件的補齊計畫。
  - workspace core-only retrofit 導入計畫。
  - 既有程式的修改入口、高風險區與驗證入口定位。
- Out of scope：
  - 修改 `src/**` 產品行為或重構 2,958 行的主頁面。
  - 連線或操作內網 AISVision/GDAI backend。
  - 使用既有預設帳密登入。
  - 更改模型 YAML、生成參數、後端路徑或輸出資料。
  - 建立或擴張 workspace `shared/domains/web/`。
  - commit、push、部署或建立外部 DevOps 物件。
- Repo-level domains observed：
  - Web／frontend UI。
  - Backend REST API integration。
  - Auth／permission。
  - AI／computer-vision model configuration and generation workflow。
  - Browser image／mask／Canvas processing。
- Primary domain basis：主要交付物是瀏覽器 UI；高頻修改面位於 Vue view、routing、frontend state、Canvas interaction 與 API binding，而非 backend service 本身。

---

## Domain Mapping

- Primary domain：`web`
- Secondary capabilities：
  - REST API integration
  - auth / token-based authorization
  - AI model configuration
  - image upload / mask upload
  - Canvas drawing and browser-side image conversion
  - YAML serialization
  - generated-result preview and ZIP download
  - i18n
  - project/admin UI prototypes
  - frontend testing with Vitest and Cypress
- Task active capability, if known：本輪為 project documentation / retrofit governance。
- Domain selection rationale：
  - 執行入口是 Vite 啟動的 Vue SPA。
  - 使用者主要透過頁面、路由、表單、滑桿、Canvas 與 API 操作完成工作。
  - Backend API 是相依系統，不是此 repo 的主要交付物。
- Domain assets path：workspace `shared/domains/web/`
- Domain assets status：`not available`
- Imported core assets：本階段尚未導入；待 proposal 確認後依 Copied assets 清單導入。
- Imported domain assets：`not imported`
- Imported domain MVP assets：`not available`
- Unavailable domain assets：`shared/domains/web/`
- Later domain assets not imported：Web domain base、skills、templates、checklists 全部暫緩。
- Domain fallback behavior：`use core assets only`
- Excluded domains：`ios`、`backend`
- Exclusion rationale：
  - repo 沒有 iOS App 交付物。
  - backend 只以 HTTP API dependency 出現，不由本 repo 實作或部署。
- Project-specific overrides：既有 Vue/Vite/npm scripts、資料夾結構與 API 整合方式保留為 project 事實，不因 retrofit 大幅搬移。
- Project-local overrides：目前沒有既有 agent/workspace override；產品程式內的硬編碼設定不視為 workspace override。
- Workspace feedback reports：none。
- Domain upgrade history：none；本 project 是 Web domain 的第一批 evidence candidate，不代表已通過 Domain MVP readiness。

---

## 二、導入目的

### 1. 本次導入目標

1. 讓後續 agent 和維護者不必從 9,000 行以上的 Vue／JS／TS 程式重新猜測專案用途。
2. 把真實執行入口、核心流程、API 邊界、模型選項、Canvas 行為與高風險區落成 project-local 文件。
3. 建立 task-first、驗證優先、敏感設定不可直接操作的工作規則。
4. 導入必要 core skills、templates、thin adapters 與 project harness，但不假裝 Web domain assets 已存在。
5. 為後續改善 README、設定管理、測試、API contract 與大型元件拆分建立有順序的 roadmap。

### 2. 預期完成後的效果

- 進入 repo 後可從 `AGENTS.md`、`README.md`、`PLAN.md` 與 `docs/` 快速理解產品。
- Web primary domain、secondary capabilities 與 core-only fallback 有明確 baseline。
- 後續需求、bug、重構與文件工作先建立 `docs/tasks/TASK-xxx.md`，再依驗收標準實作。
- 對內網 API、登入、模型配置、圖片／遮罩、Canvas 與結果下載的變更有人工覆核與驗證邊界。
- project 可在 detached 狀態以 project-local harness 驗證工作骨架，不依賴 workspace absolute path。

---

## 三、目前專案現況盤點

### 1. 目前已有文件

- `README.md`：Vue 3 + Vite 起始模板，只列 npm 指令，沒有產品與架構說明。
- `readme.txt`：空檔。
- `package.json` / `package-lock.json`：實際依賴與 script 來源。
- 程式內註解：包含大量中文操作註解與尚未整理的 prototype／debug 註解。
- 未發現正式 API 文件、架構文件、需求文件、task、release note、部署文件或環境設定範例。

### 2. 技術棧與執行方式

- Runtime UI：Vue 3 Composition API。
- Build tool：Vite 6。
- Language：TypeScript、JavaScript、Vue SFC、SCSS/CSS 混用。
- Routing：Vue Router 4，使用 HTML5 history。
- State：Pinia。
- HTTP：Axios。
- Runtime validation：Zod，目前主要用於 project list schema。
- YAML：程式直接 import `js-yaml`，但它未列為 root direct dependency，只因其他套件的 transitive dependency 出現在 lockfile。
- UI：Bootstrap 5、自製元件、SVG loader。
- i18n：Vue I18n，包含繁中、簡中、英文、日文資產。
- Unit test：Vitest + jsdom 已設定，但沒有實際 unit test 檔。
- E2E：Cypress 已設定，現有 `example.cy.ts` 仍是模板示例。
- 常用 scripts：`dev`、`build`、`type-check`、`test:unit`、`test:e2e`、`lint`、`format`。
- `lint` 目前帶 `--fix`，不適合作為純唯讀驗證命令使用。

### 3. 主要目錄與模組

#### Application bootstrap

- 路徑：`src/main.ts`、`src/App.vue`
- 責任：載入全域樣式與 Bootstrap，建立 Vue app，註冊 Pinia、router、i18n 與全域 icon components。
- App shell：固定顯示 `NavigateBar`，其下渲染目前 route。

#### Routing

- 路徑：`src/router/index.ts`
- 責任：定義 Home、Projects、Project detail、Trainer、Verifier、Account、System、Defect Generator、Trash Can、Schedule 等頁面。
- 現況：未發現 route guard；登入狀態不會在 router 層限制頁面。

#### Defect Generator 主流程

- 路徑：`src/views/defect_generator_page/DefectGeneratorPage.vue`
- 規模：約 2,958 行，是目前最大的單檔高風險模組。
- 責任：
  - 初始化並顯示模型 YAML 設定。
  - 提供 TFIDG、CutPaste、Geometric Shapes Mode 1、Geometric Shapes Mode 2、Anomaly Diffusion 的 UI。
  - 管理輸入圖片、參考圖片、遮罩與多檔 upload。
  - 在 Canvas 上繪圖、擷取繪製區、產生 mask/file/blob。
  - 將畫面參數轉回 backend 所需 YAML 結構。
  - 觸發生成、讀取結果清單、預覽結果與下載 ZIP。
  - 顯示 loading／事件訊息。
- 旁存檔：`DefectGeneratorPage_87.vue` 看起來是較早期 Canvas prototype，未被 router 使用。

#### API boundary

- 路徑：`src/api/index.js`
- 責任：建立 Axios client，包裝登入後模型配置與圖片生成相關 API。
- 主要 API 群：
  - 下載 base model YAML。
  - 編輯各生成器 YAML。
  - CutPaste generation。
  - Shape mode 1 / mode 2 generation。
  - Anomaly Diffusion 圖片／mask 上傳、模型載入與 generation。
  - 結果目錄、結果清單、圖片 blob preview、ZIP download。
- 現況：base URL、timeout、response parsing 與部分錯誤顯示直接寫在模組內。

#### Authentication

- 路徑：`src/stores/auth.js`、`src/views/NavigateBar.vue`
- 責任：OAuth2 password-style token login、Pinia 記憶體 token state、login/logout UI。
- 現況：登入 UI 內存在硬編碼的預設帳密；API URL 與 OAuth client placeholder 也直接位於 source。Proposal 與後續文件不得複製實際帳密值。
- Session 行為：未發現 local/session storage，重新整理後登入狀態會消失。

#### Configuration and frontend state

- 路徑：`src/stores/configData.js`、`src/stores/apiData.js`、`src/stores/WorkingPageStore.ts`
- 責任：載入四份 YAML、建立預設模型設定、將 UI 參數轉換成 API payload、保存目前頁面狀態。
- 現況：`configData` 在 store 建立時立即依序呼叫遠端 API；錯誤時使用本地預設值繼續。`apiData` 與主頁面存在部分重複設定／轉換邏輯。

#### Browser image processing

- 路徑：`src/stores/elementToBlob.js` 與主頁面的 Canvas functions。
- 責任：把 HTMLImageElement／Canvas 轉成 Blob 與 File、處理遮罩、擷取繪圖結果、產生 object URL。
- 風險：尺寸縮放、devicePixelRatio、跨域 image、記憶體釋放與多檔 mapping 都會影響結果正確性。

#### Platform prototype pages

- 路徑：`src/views/home_page/`、`src/views/project/`、`src/views/account_page/`、`src/views/system_page/`
- 責任：
  - 首頁 carousel、training status、waiting tasks、announcement、recent projects。
  - project create modal 與四類 project type。
  - trainer 參數表單、verifier prototype、schedule、trash can。
  - account profile 與 system user/admin/announcement tables。
- 現況：多數仍以靜態／隨機測試資料或尚未完成的連結操作呈現；主導航已將這些入口註解，只保留 DefectGenerator。

#### Reusable UI

- 路徑：`src/components/`
- 責任：table、project card、dialog、loading、progress、dynamic SVG icon。
- 其中 `BaseTable.vue` 提供搜尋、排序、分頁、欄位顯示與 fullscreen；需注意它仍是前端記憶體資料表，不代表已接後端分頁。

#### Static assets and localization

- 路徑：`src/assets/`、`public/`
- 責任：品牌圖片、首頁圖、project type 圖、icons、全域樣式與四語系字串。
- 現況：日文 locale key 寫成 `ja-JP.`，需要另以 task 驗證實際切換行為後再修正。

### 4. 核心流程／主資料流

#### 流程 A：登入與授權

1. 使用者由 `NavigateBar` 打開登入視窗。
2. `useAuthStore.login()` 以 form-urlencoded 呼叫 OAuth token endpoint。
3. token type、access token、username 與登入狀態保存在 Pinia 記憶體。
4. Defect Generator API 呼叫逐次組合 `Authorization` header。
5. logout 清除記憶體 state。

#### 流程 B：模型設定初始化與編輯

1. `useConfigData` 建立時下載 `cutpaste.yaml`、`mode1.yaml`、`mode2.yaml`、`anomalydiffusion.yaml`。
2. `js-yaml` 將 YAML 轉成 frontend config object。
3. 主頁面把資料同步到各模型的 slider／field state。
4. 使用者調整參數後，computed payload 轉回 backend 命名與數值型別。
5. `uploadConfig()` 將 payload dump 成 YAML，送到對應 generator config endpoint。

#### 流程 C：圖片／遮罩與 Canvas

1. 使用者上傳 background／reference image，Anomaly Diffusion 可使用多檔。
2. FileReader 建立 image source，Canvas 依容器與 device pixel ratio 設定尺寸。
3. 使用者可繪製區域或上傳 mask。
4. `elementToFileAndBlob()` 產生 image/mask File 與 Blob。
5. 生成器依所選模型決定需要單圖、mask 或 image/mask lists。

#### 流程 D：生成、預覽與下載

1. `runWhichOneModel()` 依 model chooser 路由到 CutPaste、Shape mode 1/2 或 Anomaly Diffusion。
2. 呼叫生成 API，從 response message 提取 output folder name。
3. 讀取結果目錄的 image list。
4. 取得最後一張 image blob 並建立 object URL 預覽。
5. 使用者可下載整個結果資料夾的 ZIP。

#### 流程 E：平台原型 project list

1. Home / Projects 頁面呼叫不同的 service wrapper。
2. 目前 testing flag 預設開啟，延遲後產生隨機 project data。
3. Zod schema 與真實 API path 已有雛形，但實際 endpoint 尚未在本輪驗證。

### 5. 初步觀察到的行為不一致

- UI/model state 使用 `TFIDG`，部分執行分支判斷 `TFIDF`，因此該模型生成路徑看起來尚未接通。
- `currentSliders` 的 computed access 使用 ref object 而不是明確的 `.value`；需要以 typecheck/runtime test 確認。
- `ProjectData.deleteDatetime` interface 允許 `null`，Zod schema 卻只接受 string。
- 日文 locale key 多一個句點。
- `js-yaml` 被直接 import，卻沒有列為 root direct dependency。
- `vite-plugin-vue-devtools` 無條件加入 Vite plugins，是否應只在 development 啟用尚待確認。
- `src/services/HttpServiceCommunicator.ts` 與 defect-generation API 使用不同 backend base URL，且 project service 預設走 testing data。
- API error interceptor 直接 `alert(error)`；主頁面又有自己的 event message/error 流程，錯誤呈現責任重疊。

以上是盤點訊號，不在本 retrofit proposal 階段直接修正。

### 6. 目前已知高風險區塊

1. **身份驗證與敏感設定**：source 內有固定內網 HTTP URL、預設登入資料與 OAuth placeholder；不得把值複製到文件、log、task 或公開環境。
2. **API contract**：生成流程依賴 message path 字串格式、YAML schema、multipart field、folder/image path 與 auth header；任何 backend drift 都可能讓 UI 靜默失效。
3. **大型單檔主流程**：`DefectGeneratorPage.vue` 同時管理狀態、Canvas、API、配置轉換、UI 與下載，修改面高度耦合。
4. **Canvas／image correctness**：縮放、mask 對齊、blob/file 轉換與多檔組合若錯誤，可能生成與畫面預期不同的資料。
5. **Anomaly Diffusion lifecycle**：涉及多檔上傳、模型載入、長時間請求與結果資料夾，可能占用大量 backend／GPU 資源。
6. **測試覆蓋不足**：現有 unit test 為零，Cypress 仍是 template example，無法為重構提供回歸保護。
7. **依賴與建置可重現性**：缺 direct `js-yaml` dependency，未宣告 Node engine，本輪也未安裝 dependencies 驗證 lockfile。
8. **原型與正式功能混合**：未啟用頁面、測試資料、舊版元件與真實 API code 同 repo，容易讓後續任務誤判產品範圍。

### 7. 目前已知缺口

1. 缺少真實產品 README 與快速啟動前提。
2. 缺少 project `AGENTS.md`、`PLAN.md` 與 workspace baseline。
3. 缺少 context、architecture、requirements、API contract、testing 與 environment 文件。
4. 缺少 `.env.example` 與集中化 runtime config 契約。
5. 缺少 task 納管、retrofit checklist 與 project harness。
6. 缺少有效 unit／component／E2E regression tests。
7. 缺少 CI、deployment、browser support、accessibility 與 security baseline。
8. 缺少 repo-local `.gitignore`；目前 `.DS_Store` 只靠外部 ignore 行為沒有進入 status。

### 8. 初步修改點定位資訊

#### 常見修改入口

1. Defect generation UI／參數／Canvas：`src/views/defect_generator_page/DefectGeneratorPage.vue`
2. API endpoint／payload／response：`src/api/index.js`
3. Auth／token：`src/stores/auth.js`、`src/views/NavigateBar.vue`
4. Model default config／YAML mapping：`src/stores/configData.js`、`src/stores/apiData.js`
5. 路由與頁面可見性：`src/router/index.ts`、`src/views/NavigateBar.vue`
6. Project prototype data：`src/services/HttpServiceCommunicator.ts`、`TestingDataGenerator.ts`、`apiHandler.ts`
7. 共用 table/dialog/icon：`src/components/`

#### 常見連動修改點

- 模型參數異動需同步檢查：config store、主頁面 state、computed YAML payload、API endpoint、backend YAML contract 與測試。
- 登入異動需同步檢查：nav UI、auth store、Axios headers、route access、session persistence 與 security documentation。
- Canvas 異動需同步檢查：input/mask state、element-to-blob utility、畫面尺寸、生成 payload、output preview 與 E2E fixture。
- 路由異動需同步檢查：nav links、nested route props、active state、access control 與 static hosting fallback。
- Project data schema 異動需同步檢查：TypeScript interface、Zod schema、testing generator、cards、list views 與 backend response。

#### 不建議優先直接修改的區塊

1. 內網 API base URL、OAuth、token 與 credential 行為：先確認環境與安全界線。
2. 模型 YAML schema 與 generation endpoint：先取得 backend contract / sample response。
3. `DefectGeneratorPage.vue` 大規模重寫：先建立 characterisation tests 與拆分計畫。
4. Canvas coordinate／mask extraction：先準備固定 image fixtures 與 pixel-level acceptance criteria。
5. Anomaly Diffusion load/generate：未確認 GPU backend 與資源邊界前不要做真實 smoke test。

---

## 四、建議導入策略

### 1. 導入原則

- 保留既有 repo、Vue/Vite 架構、npm scripts 與 source layout。
- 第一批先補「專案事實與安全邊界」，不做產品重構。
- Web domain 尚未正式存在，嚴格採 core-only fallback。
- 文件中的環境值一律使用 placeholder，不複製帳密、token、內網細節或 production log。
- build、test 與真實 API smoke 分開驗證；沒有 backend 授權時只做 offline validation。

### 2. 建議保留不動的區塊

- `src/**` 產品程式碼。
- `public/**` 與 `src/assets/**` 產品資產。
- `package.json` / `package-lock.json`，直到另建 task 處理 dependency 與 script baseline。
- git history、remote、branch 與既有 commit。

### 3. 建議本次補齊的最小骨架（確認後）

- Root：
  - `AGENTS.md`
  - `CLAUDE.md`
  - `PLAN.md`
  - 更新 `README.md`
- Agent layer：
  - `.agents/core/base/BASE_AGENTS.md`
  - `.agents/core/skills/{requirement-breakdown,code-review,test-case-generation,technical-documentation}/`
  - `.agents/core/templates/{task,context,architecture,requirements,workspace-baseline,technical-document}-template.md`
  - `.agents/core/checklists/task-template-compliance-checklist.md`
  - `.agents/skills/<copied-skill>/SKILL.md` Codex thin adapters
  - `.claude/skills/<copied-skill>/SKILL.md` Claude thin adapters
- Project docs：
  - `docs/context.md`
  - `docs/architecture.md`
  - `docs/requirements.md`
  - `docs/api-contract.md`
  - `docs/testing.md`
  - `docs/workspace-baseline.md`
  - `docs/tasks/`
  - `docs/retrofit-checklist.md`
- Validation：
  - `scripts/project-check.sh`
- Hygiene：
  - `.gitignore` 納入 `.DS_Store`、`node_modules/`、`dist/`、coverage、local env 與 runtime output；是否移除現有未追蹤 `.DS_Store` 另由使用者確認或以安全清理 task 處理。

不建立空的 `.agents/domain/web/`。

### 3.1 DevOps 文案能力導入評估

- 目前未發現既有 Azure DevOps／GitHub PR 文件流程。
- 第一批建議暫不複製 ADO Work Item／PR templates，也不建立 `docs/devops/` 空目錄。
- 若使用者確認採手動 Azure DevOps，再於生成階段納入：
  - `docs/devops/workitems/`
  - `docs/devops/prs/`
  - `ado-workitem-template.md`
  - `pr-template.md`
  - `devops-placeholder-convention.md`

### 3.2 Workspace Baseline 導入計畫

- 預計 workspace version：`v1.16.0`
- 導入方式：`retrofit`
- Project harness version：`1.2.0`
- 預計導入 base：`BASE_AGENTS.md`
- 預計導入 skills：`requirement-breakdown`、`code-review`、`test-case-generation`、`technical-documentation`
- 預計導入 templates：task、context、architecture、requirements、workspace baseline、technical document
- 預計導入 checklist：task template compliance
- Domain assets：`web` not available / not imported
- Fallback：core assets only
- 本地覆寫：保留既有 source layout、npm scripts 與 runtime prototypes；沒有既有 agent override conflict。
- 生成階段必須建立 `docs/workspace-baseline.md`，不得延後。

### 3.3 Copy vs Pointer Asset Plan

#### Copied assets

- `shared/core/base/BASE_AGENTS.md` → `.agents/core/base/BASE_AGENTS.md`
- 必要 core skills → `.agents/core/skills/`
  - `requirement-breakdown`
  - `code-review`
  - `test-case-generation`
  - `technical-documentation`
- 每個 copied skill 對應：
  - `.agents/skills/<name>/SKILL.md`
  - `.claude/skills/<name>/SKILL.md`
- Root `CLAUDE.md`：thin entry，只 import `@AGENTS.md`
- 必要 core templates → `.agents/core/templates/`
- `task-template-compliance-checklist.md` → `.agents/core/checklists/`
- Project harness → `scripts/project-check.sh`
- Copy 理由：讓 project detached 後仍能執行需求拆解、review、測試規劃、文件維護與結構驗證。

#### Pointer-only references

| Reference source | Project baseline field | Access mode | 理由 |
| --- | --- | --- | --- |
| workspace `docs/prompts/README.md` | Prompt catalog | `reference-only` | 用於 flow routing，不複製 catalog |
| workspace `shared/registry.md` | Registry | `reference-only` | 查正式 upstream assets |
| workspace `docs/governance/` | Governance docs | `reference-only` | 需要時查 workspace policy |
| workspace `docs/guides/` | Guides | `reference-only` | 查 retrofit／routing／upgrade 指引 |
| workspace `docs/examples/` | Examples | `reference-only` | 只作 sample |
| workspace `RELEASE_NOTES/` | Release notes | `reference-only` | 查 workspace release history |
| workspace `docs/workspace-proposals/` | Proposal history | `reference-only` | 不屬 project formal asset |

#### Not imported

| Workspace asset | 不導入原因 | Follow-up |
| --- | --- | --- |
| `shared/domains/ios/**` | primary domain 不是 iOS | 不導入 |
| `shared/domains/web/**` | 尚未正式存在 | core-only fallback；以 project evidence 觀察 |
| `project-bootstrap` | repo 已存在 | 不導入 |
| release readiness / presentation skills | 目前沒有可驗證的 release／簡報 workflow | 有實際需求時再 upgrade |
| agent delegation template | 本 project 現階段規模不需預設 delegation | 多 agent workflow 成為高頻時再評估 |
| DevOps templates | 流程未確認 | 使用者確認後再納入 |
| workspace examples／proposal／intake／dry-run assets | 非 project formal assets | pointer only 或不導入 |

#### Reference source

- Workspace repo location：`/Users/aissens/Documents/workspace_git/workspace`
- Workspace version / ref：`v1.16.0`
- Project location：`projects/defect_generator`
- Access mode：`partially copied`（僅在生成階段成立；目前 proposal 階段尚未 copied）
- Last checked：`2026-07-20`

### 4. 建議暫緩的項目

1. 建立正式 Web shared domain。
2. 大規模拆分或重寫 `DefectGeneratorPage.vue`。
3. 直接修正 API、模型參數、登入與 Canvas 行為。
4. 真實登入、模型載入、生成、GPU 或結果下載 smoke test。
5. 建立 project-specific skill。
6. 啟用 CI／部署，直到 Node、env、backend、hosting 與 secrets contract 被確認。

---

## 五、建議建立／補齊的文件內容

### `README.md`

- 專案定位、主要使用者與目前成熟度。
- 模型能力與主要 route。
- Node/npm 前提、安裝、開發、build、typecheck、test 指令。
- environment placeholder 與不提交 secrets 的規則。
- offline mock 與 real backend 的差異。
- 文件索引與已知限制。

### `AGENTS.md`

- project 入口、domain mapping、必讀順序與 skill routing。
- API／auth／Canvas／model config 高風險人工覆核規則。
- task-first 與驗證要求。
- 禁止未授權真實登入、生成或使用正式資源。

### `PLAN.md`

- retrofit、security/config、test baseline、architecture decomposition、deployment readiness 的分期順序。

### `docs/context.md`

- AISVision／Defect Generator 產品背景。
- 技術棧、目前啟用範圍、外部系統與術語。
- 原型功能與正式功能的區分。

### `docs/architecture.md`

- app bootstrap、router、view、component、store、API、browser image processing 分層。
- 登入、設定、生成、預覽、下載資料流。
- 模組責任與連動修改矩陣。

### `docs/requirements.md`

- 目前從程式可證實的功能需求。
- 尚未證實的產品需求標記為待確認，不把 prototype 猜成正式規格。
- 非功能需求：安全、效能、accessibility、browser support、可測試性。

### `docs/api-contract.md`

- API base URL 只用 env placeholder。
- auth、config、generation、result endpoints 的 method、content type、params、response assumptions。
- timeout、error、blob、ZIP、folder naming 與 contract drift 風險。
- 真實 sample response / schema 待後端 owner 確認。

### `docs/testing.md`

- Offline unit/component tests、Canvas fixtures、API mock、route/auth tests。
- Real backend integration 與 GPU smoke 必須是 opt-in，且先確認 endpoint／credential／resource boundary。
- `npm run lint` 會修改檔案，唯讀驗證改用不帶 `--fix` 的明確命令。

### `docs/workspace-baseline.md`

- workspace v1.16.0、harness 1.2.0、retrofit date/method。
- Web domain unavailable、core-only fallback。
- copied／pointer-only／not imported、Codex／Claude adapter、local override 與 pointer health。

---

## 六、Project-specific Skill 評估

- [x] 目前先不建立，先補專案文件、測試與規則。
- 理由：核心 defect generation workflow 雖已可辨識，但 TFIDG、API、配置、Canvas 與正式產品邊界仍有未確認項；現在沉澱 skill 容易固化錯誤契約。
- 未來候選：`defect-generation-workflow`
  - 觸發情境：新增／調整生成模型、參數、mask 或 result handling。
  - 前置證據：至少完成 API contract、characterisation tests、兩次以上重複任務與穩定修改順序。
  - placement：先評估 project-local skill；不直接升級為 shared Web domain skill。

---

## 七、初版 `PLAN.md` 建議內容

### Phase 1：Retrofit 最小骨架

- 生成 root entry、core assets、thin adapters、project harness。
- 更新 README，建立 context／architecture／requirements／API contract／testing／baseline。
- 建立 tasks 與 retrofit checklist。
- 執行 project harness offline validation。

### Phase 2：Environment、dependency 與 security baseline

- 建立 `.env.example` 與集中 API config。
- 移除 UI 預設 credential，確認 OAuth flow 與 token lifecycle。
- 補 direct dependencies、Node engine、non-mutating lint script。
- 建立 `.gitignore` 與產物／敏感檔 exclusion。

### Phase 3：測試與 API contract baseline

- 先為 config mapping、ProjectData schema、auth state 與 element-to-blob 建 unit tests。
- 使用 Axios mock 建 config/generation/result contract tests。
- 用固定小圖片／mask fixtures 建 Canvas characterisation tests。
- 取代 Cypress template example，建立不需真實 backend 的關鍵路徑 E2E。

### Phase 4：主流程分解

- 先依 tests 拆分 defect generation composables/services/components。
- 統一 API error handling、loading state 與 object URL lifecycle。
- 去除重複 config mapping 與未使用 imports／prototype branches。
- 明確決定 AISVision platform prototype pages 的保留、恢復或移除策略。

### Phase 5：Integration／deployment readiness

- 確認 backend owner、API version、CORS、TLS、auth、timeout 與 GPU resource policy。
- 補 preview／production build、static-hosting route fallback、observability 與 rollback。
- 只在授權環境執行真實 integration smoke。

### 近期優先事項

1. 確認本 repo ownership 是「整個 AISVision frontend」或只維護 Defect Generator。
2. 完成 retrofit 生成階段與 README／architecture／baseline。
3. 建立 environment/security task。
4. 建立 offline test baseline task。
5. 再決定是否拆分 2,958 行主頁面。

---

## 八、Validation Plan

### Proposal 階段

- 確認 proposal 是本階段唯一新增的 formal artifact。
- `git diff --check`
- `git status --short`
- 人工核對 template 必要章節、Domain Mapping、copy/pointer/not-imported、baseline plan、風險與 confirmation-stop。

### 生成階段

1. `bash scripts/project-check.sh --no-git`
2. 確認 Codex／Claude adapters 與 copied skills required set 一致。
3. 確認 `docs/workspace-baseline.md` 為實際採用狀態。
4. 逐條核對 `project-retrofit-checklist.md` 並落地 `docs/retrofit-checklist.md`。
5. 在依賴可安全安裝後執行：
   - `npm ci`
   - `npm run type-check`
   - `npm run build`
   - 非 watch 模式 unit test
   - 不帶 `--fix` 的 ESLint check
6. Cypress offline/mock E2E 準備好後再執行；真實 backend E2E 不列為 retrofit 完成必要條件。

### 本階段未執行

- `npm ci`：未授權下載依賴，且 proposal 階段不應建立大量 runtime artifacts。
- build／typecheck／unit／E2E：`node_modules` 不存在。
- 真實 API／登入／生成／下載 smoke：endpoint、credential、backend、GPU 與資料邊界未確認。

---

## 九、待確認事項

1. 本 repo 的正式 ownership 是完整 AISVision Platform Frontend，還是只保留 Defect Generator？
2. Home／Projects／Trainer／Verifier／Account／System routes 是未來正式 scope、暫停功能，還是應視為舊 prototype？
3. TFIDG 的正式名稱、用途與 backend endpoint 是什麼？目前執行分支沒有一致接通。
4. 內網 API 的環境分類、backend owner、API version、TLS/CORS 與啟動方式為何？
5. 現有 source 中的預設登入資料是否純測試用，是否可在後續 security task 移除？
6. 正式支援的 Node/npm 版本、OS 與 browser matrix 為何？
7. 是否採手動 Azure DevOps Work Item／PR 文案流程？
8. 是否需要在 retrofit 生成階段建立 `.gitignore` 並清理未追蹤 `.DS_Store`？
9. 是否有 backend OpenAPI、YAML schema、sample images/masks、expected output 或既有驗收資料可引用？
10. Claude Code project-native layer是否要與 Codex layer一起導入？本 proposal 預設建議一起導入以保持 detached portability。

---

## 十、風險與限制

- 本輪說明完全依 repo 現況推導，沒有產品 owner／backend owner 的外部確認。
- 沒有執行依賴安裝、編譯或 runtime，部分觀察需在下一階段以 toolchain 證實。
- 現有 README 與程式差距很大，不能把 template 文案當成真實產品規格。
- 內網 API、credential、token、模型與 output 可能涉及敏感或昂貴資源；未確認前只能做 offline work。
- retrofit 文件補齊不等於產品安全、測試、可部署或 Web domain MVP 已完成。

---

## 十一、確認後的生成動作

若使用者確認本 proposal，下一階段依序：

1. 複製 confirmed core base／skills／templates／checklist。
2. 生成 Codex 與 Claude thin adapters及 root `CLAUDE.md`。
3. 複製 project harness。
4. 依 template 建立 `AGENTS.md`、`PLAN.md` 與 project docs。
5. 更新 README，但不改產品程式行為。
6. 建立 `docs/tasks/`，不自動建立產品實作 task；若建立 TASK-001，建立後另停下確認。
7. 建立 `docs/workspace-baseline.md`。
8. 首跑 `bash scripts/project-check.sh --no-git`。
9. 逐條核對 checklist 並落地 `docs/retrofit-checklist.md`。
10. 輸出 validation、copied／pointer-only／not-imported summary 與繁體中文 suggested commit message。

---

## 十二、建議是否進入生成階段

**建議進入，但需使用者先確認本 proposal。**

建議的生成範圍只包含 project-local 規則、文件、必要 core assets、thin adapters 與 project harness；不修改既有 Vue／JS／TS 產品程式，不連線真實 backend，不建立 Web shared domain。

### Confirmation-stop

本 proposal 產出後停止。只有收到明確的「確認 proposal，進入生成階段」或等效授權，才補齊其餘文件與骨架。

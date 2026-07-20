# defect_generator Architecture

## 1. 文件目的

本文件描述現有 `defect_generator` 的前端架構、資料流、外部邊界、技術債與演進原則。內容以 repository 靜態證據為基礎，不代表後端或部署架構已經正式確認。

## 2. Architecture Overview

`defect_generator` 是 Vue 3 + Vite SPA。Browser 負責畫面、routing、Pinia state、YAML mapping、Canvas／File／Blob 處理與 REST API orchestration；OAuth、模型服務、GPU 工作、結果儲存與下載由外部 backend 提供。

主要架構層次：

1. Application shell：bootstrap、router、navigation、i18n、global styling。
2. Feature views：Defect Generator 與 AISVision prototype views。
3. Client state：auth、model config、API data、working-page state。
4. Browser processing：Canvas、FileReader、File、Blob、Object URL。
5. API boundary：Axios clients、OAuth、config、generation 與 result endpoints。
6. External systems：auth service、algorithm service、project service、GPU/model runtime、result storage。

## 3. Runtime Flow

### 3.1 Application bootstrap

- `src/main.ts` 建立 Vue app，註冊 Pinia、router、i18n 與 UI dependencies。
- `src/App.vue` 提供 root layout。
- `src/router/index.ts` 使用 history mode，提供 Home、Projects、Project children、Account、System、Defect Generator、Trash Can 與 Schedule routes。
- Production hosting 必須支援 SPA history fallback；目前 hosting contract 未文件化。

### 3.2 Authentication

- Navigation UI 收集 credential。
- auth store 從 `src/config/runtimeConfig.ts` 取得 public auth base URL，再呼叫 token endpoint。
- access token 留在 client-side Pinia state。
- API calls 依現有 service 實作附加 bearer authorization。

登入 UI 不再預填 credential，token request不包含browser-side client secret。架構缺口仍包含OAuth grant/client contract、token refresh/expiry、route guards、logout cleanup、401 handling與storage policy。

### 3.3 Configuration flow

- config store 下載四組 algorithm YAML。
- YAML 被解析為 reactive config state。
- `DefectGeneratorPage.vue` 依 model chooser 暴露 sliders／fields。
- computed mapping 把 UI 值重組為 YAML 或 request payload。
- edit endpoint 上傳或更新後端設定。

此層目前分散於 store 與大型 view，UI label、state key、API model name 與 YAML key 可能漂移。

### 3.4 Image and mask flow

- Browser 接收本地圖片與遮罩檔。
- FileReader 建立 preview 或讀入 image data。
- Canvas 提供繪製／合成處理。
- helper 將畫面或 element 轉為 Blob/File。
- API layer 以 multipart 或既有 request format 上傳。

需維持的 invariants：原圖與 mask 尺寸／順序一致、座標轉換正確、檔名可追蹤、Object URL 可釋放、失敗時不殘留錯誤 state。

### 3.5 Generation and result flow

- 使用者選擇模型與參數。
- 前端依模型執行 config edit、image upload、model load 或 generator request。
- backend 建立 result directory／job output。
- 前端查詢結果資料，將 blob 建成 browser preview。
- review endpoint 更新結果狀態。
- download endpoint 取得 ZIP 或其他產物。

目前未看到正式 job state machine、cancel/retry contract 或 server-sent progress channel；長時間工作可能只由頁面 loading state 管理。

## 4. Component and Module Responsibilities

### Application shell

- `src/main.ts`：依賴註冊與 mount。
- `src/App.vue`：root composition。
- `src/router/index.ts`：route table 與 lazy-loaded pages。
- `src/views/NavigateBar.vue`：navigation/login；不應長期承擔完整 auth policy。

### Defect Generator feature

- `src/views/defect_generator_page/DefectGeneratorPage.vue`：主 workflow owner。
- 優點：流程集中，易從單檔追蹤目前行為。
- 風險：近 3,000 行造成 state、DOM、API 與 model-specific logic 高耦合。

### Stores

- `src/stores/auth.js`：token/auth state。
- `src/stores/configData.js`：model config/YAML。
- `src/stores/apiData.js`：API-related state。
- `src/stores/WorkingPageStore.ts`：working page state。
- Store boundaries 尚未一致區分 server state、form state 與 transient UI state。

### API boundary

- `src/config/runtimeConfig.ts` 集中驗證 auth、algorithm、project三組public base URLs、testing-data flag與optional public client ID。
- `src/api/index.js` 集中多組 HTTP methods，algorithm client從runtime config取得base URL。
- `src/services/HttpServiceCommunicator.ts` 以explicit runtime boolean選擇testing data或project API。
- UI 與 API layer 可能重複處理 alert/error；需要統一 typed result 或 error policy。
- endpoint inventory 與已知假設見 `docs/api-contract.md`。

### Browser utilities

- `src/stores/elementToBlob.js` 與 view 內 helpers 處理 Canvas、element、Blob、File。
- 命名位置顯示 utility 與 store responsibility 尚未完全分離。

### Prototype modules

- Home、Projects、Trainer、Verifier、Account、System 等 views 形成較完整 platform shell。
- 部分 project data path 預設使用 testing/static/random data。
- 在 scope 確認前，這些模組不能作為正式 production architecture 的已完成證據。

## 5. Data and State Model

目前可辨識的 state 類別：

- Auth state：access token 與 login status。
- Configuration state：四組 YAML 與 model parameters。
- Selection state：model chooser、mode、sliders、uploaded files。
- Image state：source previews、mask、Canvas、Blob/File mappings。
- Job state：loading、result directory、result list、review state。
- Prototype project state：project cards、tables、trainer/verifier data。

已知 schema drift signal：Project data 的 TypeScript interface 允許 nullable delete datetime，但 Zod schema 目前只接受 string。這需要 task 釐清資料語意，而非在 retrofit 中直接改碼。

## 6. External Dependencies

### Runtime libraries

- Vue 3、Vue Router、Pinia、Vue I18n
- Axios、Zod
- Bootstrap
- YAML parser/serializer（source 使用 `js-yaml`，但 direct dependency 尚未宣告）

### Tooling

- Vite 6、TypeScript、vue-tsc
- ESLint、Prettier
- Vitest、Vue Test Utils、jsdom
- Cypress、start-server-and-test
- Vite SVG loader、Vue DevTools plugin

Vite Vue DevTools 目前在 config 中啟用；production build 是否應排除需另行確認。

## 7. Environment Architecture

TASK-001 已建立 build-time Vite environment contract：

- `.env.example` 提供無敏感值placeholder。
- `env.d.ts` 定義public variables。
- `src/config/runtimeConfig.ts` 驗證required values、HTTP(S) URL、credential/query/fragment限制與explicit boolean。
- Consumers不再silent fallback至舊開發位址。

部署層仍應區分：

- Local mock/offline：不接真實 auth、GPU 或資料服務。
- Development integration：使用非 production endpoint 與測試帳號。
- Staging：接近 production contract，含 TLS/CORS、roles 與 representative workload。
- Production：secrets、observability、retention、capacity、rollback 完整。

所有 client-visible Vite variables 都會進入 browser bundle，不可存放 secrets。credential 只能由使用者輸入或安全的後端 flow 取得。

## 8. Failure Modes

- OAuth 失敗或 token 過期，UI state 未一致清理。
- YAML 欄位或 model name 漂移，導致 UI 顯示與 backend 行為不同。
- Canvas 尺寸／座標不一致，使 mask 套用錯位。
- 圖片、mask 或 array order 不一致，造成錯誤配對。
- generator timeout、GPU unavailable 或 partial output，UI 缺乏可恢復狀態。
- Object URLs 未 revoke，長時間使用造成 browser memory growth。
- result directory/path contract 改變，preview 或 ZIP download 失敗。
- prototype/testing branch 意外進入 production。

## 9. Architecture Risks

1. 單一大型 SFC 是目前最高維護風險，但不可在無 tests 下直接大改。
2. Runtime config已有typed boundary；API response/YAML contract仍缺少typed、versioned邊界。
3. 登入預設值與browser-side secret已移除；OAuth lifecycle與roles仍有security risk。
4. direct dependency 與實際 imports 不一致，fresh install 可靠性不足。
5. Runtime config/auth routing已有16個offline tests，但整體test pyramid仍不足。
6. prototype platform scope 與 production scope 未分離。

## 10. Target Evolution

演進順序應為：

1. [Completed by TASK-001] 集中 environment 與 auth configuration，移除敏感預設值。
2. 建立 API/YAML types、fixtures 與 offline contract tests。
3. 建立 Canvas/image characterisation tests。
4. 把 Defect Generator 拆成 model config adapters、composables、Canvas components、API orchestration 與 result components。
5. 統一 error/loading/cancel/retry 與 Object URL lifecycle。
6. 釐清 prototype platform modules 的 ownership 與 route strategy。
7. 補 CI、preview deployment、observability、security 與 rollback。

每一步都需獨立 task、驗收標準與 read-back；不得把 retrofit 文件生成當作產品程式重構授權。

## 11. Architecture Decision Rules

- 優先以 API contract／tests 保護既有行為，再做結構調整。
- model-specific mapping 應集中，不散落於 template/computed/endpoint branches。
- server state、form state、Canvas state 與 navigation state 分開管理。
- browser bundle 不含 secrets。
- 真實 backend/GPU integration 必須顯式 opt-in。
- 新增 dependencies 前先確認用途、版本、license 與 build impact。

## 12. Related Documents

- `docs/context.md`
- `docs/requirements.md`
- `docs/api-contract.md`
- `docs/testing.md`
- `PLAN.md`

# defect_generator Project Context

## 1. 文件目的

本文件提供 `defect_generator` 的專案背景、邊界、角色、核心流程、限制與待確認事項。內容來自 2026-07-20 對現有 repository 的靜態盤點；未經產品或後端 owner 確認的部分會明確標示，不把程式碼中的 prototype、註解或測試資料自動視為正式需求。

## 2. Project Summary

- Project 名稱：`defect_generator`
- Package 名稱：`aisvisionplatformfrontend`
- 類型：Vue 3 single-page Web application
- Primary domain：`web`
- 目前主要產品面：AI 瑕疵影像生成操作介面
- broader shell：AISVision Platform 的 Home、Projects、Trainer、Verifier、Account、System 等頁面骨架
- 目前成熟度：active development / prototype integration

這個專案的核心價值，是把多種瑕疵影像生成模型包裝成可由瀏覽器操作的工作流程。使用者可登入、載入模型設定、選擇生成方式、上傳原始圖片與遮罩、調整參數、送出生成工作、預覽結果並下載產物。

## 3. Problem Statement

AI 影像生成流程通常涉及 YAML 設定、模型參數、圖片／遮罩前處理、長時間後端工作與產物管理。若完全由指令列或後端 API 操作，使用者需要理解大量技術細節，也較難確認輸入、遮罩與結果是否對應。

本專案以 Web UI 將這些步驟串接起來，降低操作門檻，並提供視覺化的圖片選擇、Canvas 遮罩編輯、進度狀態、結果預覽與下載入口。

## 4. 使用者與角色

以下角色是依現有 UI 與程式碼推導，正式權限模型仍待確認：

- AI／視覺工程師：調整模型參數、產生合成瑕疵資料、檢視與下載結果。
- Dataset operator：準備圖片與遮罩、啟動批次生成、整理產出。
- Platform user：使用 Projects、Trainer、Verifier 等 AISVision 頁面；目前多數頁面仍屬 prototype。
- System administrator：可能使用 account／system 管理頁；實際授權與 backend contract 尚未確認。
- Maintainer：維護 Vue UI、API contract、model mapping、Canvas 行為與 build/test pipeline。

## 5. 核心使用情境

### 5.1 登入與 session

1. 使用者從 navigation UI 提交帳號與密碼。
2. 前端向 OAuth token endpoint 取得 access token。
3. token 目前存於 Pinia runtime state。
4. 後續 config、generation 與 result requests 帶入授權資訊。

TASK-001 已將三組 service base URL 移至集中式 public runtime config，並移除登入預設帳密與 browser-side client secret。OAuth grant、client contract、token expiry/refresh 與 route protection仍待owner確認。

### 5.2 模型設定載入

1. 前端下載 CutPaste、Geometric Shapes Mode 1、Geometric Shapes Mode 2、Anomaly Diffusion 的 YAML 設定。
2. config store 解析內容並提供 UI 預設值。
3. 使用者選擇模型與調整參數。
4. 前端重新組合 YAML 或 request payload，再送往對應 API。

TFIDG 在 UI/state 與實際 generator branch 的名稱與路徑尚有不一致風險，需由 backend contract 與 tests 共同釐清。

### 5.3 圖片與遮罩

1. 使用者上傳一或多張圖片。
2. FileReader、Canvas、Blob 與 File APIs 形成 browser-side preview／轉換流程。
3. 使用者可載入或繪製遮罩。
4. 原圖、遮罩與設定被整理為生成 API 的輸入。

此流程對圖片尺寸、座標、device pixel ratio、CORS、檔名與陣列順序敏感，應以固定 fixtures 建立 characterisation tests 後再重構。

### 5.4 生成與結果

1. 前端依模型選擇 generator endpoint。
2. 某些模型可能先執行 model load 或 image upload。
3. 後端回傳或建立 result directory。
4. 前端取得結果清單與圖片 blob，顯示 preview。
5. 使用者可 review 結果並下載 ZIP。

真實生成可能占用 GPU、長時間執行或產生大量資料；在資源、資料、timeout 與 retention policy 確認前，不執行未授權的 live smoke。

## 6. Scope Boundary

### In scope：目前可由 repo 證明

- Vue SPA shell、routes、navigation 與 i18n。
- OAuth token request 與 client-side auth state。
- Defect Generator model parameter UI。
- YAML config download、edit 與 upload orchestration。
- 圖片／遮罩選取、Canvas 處理與 File／Blob conversion。
- generation、result listing、preview、review 與 download API binding。
- Projects／Trainer／Verifier／Account／System 等 prototype views。

### Out of scope：本 repo 不負責

- 模型訓練或推論演算法實作。
- OAuth server、API server、GPU scheduler、storage 與 result retention 的後端實作。
- production infrastructure、DNS、TLS、CORS、observability 與 rollback。
- 模型品質、資料授權與資安政策的最終核准。

### 未確認範圍

- 專案正式 ownership 是完整 AISVision frontend，或只維護 Defect Generator。
- prototype pages 是否會成為正式產品能力。
- 角色／權限矩陣與 route protection。
- TFIDG 的正式名稱、設定 schema 與 generator endpoint。
- backend environments、API versioning、timeout、error schema 與 result retention。

## 7. Repository Map

- `src/main.ts`：Vue app bootstrap 與 global plugins。
- `src/App.vue`：root application layout。
- `src/router/index.ts`：全部 routes。
- `src/views/NavigateBar.vue`：navigation 與 login UI。
- `src/views/defect_generator_page/DefectGeneratorPage.vue`：主要生成流程；目前是大型單檔元件。
- `src/api/index.js`：Axios clients 與 API methods。
- `src/stores/auth.js`：token 與 auth state。
- `src/stores/configData.js`：model YAML 與 config mapping。
- `src/stores/apiData.js`：API data state。
- `src/stores/WorkingPageStore.ts`：page workflow state。
- `src/stores/elementToBlob.js`：DOM／Canvas 到 Blob 的 browser utility。
- `src/views/project/`：project、trainer、verifier、trash、schedule prototypes。
- `src/views/account_page/`、`src/views/system_page/`：account/system prototypes。
- `cypress/`：E2E scaffold；現有 spec 尚非產品流程測試。

## 8. Constraints

- `DefectGeneratorPage.vue` 約 2,958 行，UI、state、Canvas 與 API orchestration 高度耦合。
- 已有 16 個 runtime-config/auth/routing offline tests；模型、YAML、Canvas 與完整 API contract coverage 仍不足，Cypress 仍是 template example。
- `js-yaml` 被 source 直接 import，但尚未列為 root direct dependency。
- Node/npm/browser 支援版本尚未正式宣告。
- 三組 base URL 與 testing-data flag 已集中管理；正式 environment values 與 deployment injection 尚待確認。
- API response、YAML schema、Canvas mapping 與 long-running job contract 尚缺自動化保護。
- Workspace 尚無正式 Web domain assets，因此使用 core-only fallback。

## 9. Security and Data Boundary

- 不在 repo 文件、task、log 或 commit message 記錄真實密碼、token、內網位址或使用者資料。
- local `.env*` 不提交；只提交安全 placeholder 的 `.env.example`。
- Object URLs、uploaded files、generated images 與 downloaded archives 應有明確生命週期。
- 在 backend owner、endpoint、credential、TLS/CORS、GPU 與資料保存政策確認前，僅執行 offline/static/mock validation。

## 10. Success Criteria

短期成功標準：

- project-local 文件與 agent entry 能準確引導維護工作。
- environment、auth、API 與 model contract 不再依賴散落硬編碼。
- 主要 config／Canvas／generation 流程具 offline tests。
- build、type-check、lint-check 與 mock E2E 可在 CI 重現。

中期成功標準：

- Defect Generator 大型元件在 regression evidence 保護下分層。
- 錯誤、loading、cancel、timeout 與結果生命週期一致。
- prototype platform pages 有明確產品決策與 ownership。
- deployment、security、observability 與 rollback contract 完整。

## 11. Related Documents

- `README.md`
- `AGENTS.md`
- `PLAN.md`
- `docs/architecture.md`
- `docs/requirements.md`
- `docs/api-contract.md`
- `docs/testing.md`
- `docs/workspace-baseline.md`
- `docs/retrofit-proposal.md`
- `docs/retrofit-checklist.md`

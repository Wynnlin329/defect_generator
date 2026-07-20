# defect_generator

`defect_generator` 是 AISVision Platform 的 Vue 3 Web 前端。Repo 目前主要啟用 Defect Generator，讓使用者登入後選擇瑕疵影像生成模型、調整參數、上傳圖片／遮罩、執行生成、預覽並下載結果。

目前狀態是開發中／原型整合中，不應只因可啟動 Vite 就視為 production-ready。

## 主要能力

- OAuth token login 與登入狀態管理。
- 四組模型設定資產：CutPaste、Geometric Shapes Mode 1、Geometric Shapes Mode 2、Anomaly Diffusion。
- TFIDG 參數 UI；目前名稱與生成執行路徑尚未完全對齊。
- 圖片與遮罩上傳、Canvas drawing、File／Blob conversion。
- YAML model config download/edit。
- 生成結果清單、image blob preview 與 ZIP download。
- Vue Router、Pinia、Vue I18n 與 Bootstrap UI。
- AISVision Home、Project、Trainer、Verifier、Account、System prototypes；多數尚未在主導航啟用。

## 技術棧

- Vue 3 + Vite
- TypeScript / JavaScript / Vue SFC
- Vue Router、Pinia、Vue I18n
- Axios、Zod、YAML serialization
- Bootstrap、SCSS/CSS、SVG loader
- Vitest、Vue Test Utils、Cypress

詳細 project context 與架構：

- [Project context](docs/context.md)
- [Architecture](docs/architecture.md)
- [Requirements](docs/requirements.md)
- [API contract](docs/api-contract.md)
- [Testing strategy](docs/testing.md)
- [Workspace baseline](docs/workspace-baseline.md)
- [Project plan](PLAN.md)

## Project Setup

Repo 尚未在 `package.json` 宣告正式 Node engine；現有 TypeScript Node config 使用 Node 22 preset。標準化版本前，請先與維護者確認。

```bash
npm ci
```

### Runtime configuration

先從安全的 placeholder 建立本機設定：

```bash
cp .env.example .env.local
```

必填 public variables：

- `VITE_AUTH_BASE_URL`
- `VITE_ALGORITHM_API_BASE_URL`
- `VITE_PROJECT_API_BASE_URL`
- `VITE_USE_PROJECT_TEST_DATA`（只接受 `true` 或 `false`）

`VITE_OAUTH_CLIENT_ID` 是 optional public client identifier。所有 `VITE_*` 都會進入 browser bundle，不得放入 password、token、API key 或 confidential client secret。Base URL 只接受沒有 credential、query 或 fragment 的 HTTP(S) URL；缺少或格式錯誤時不會回退到舊開發位址。

### Development server

```bash
npm run dev
```

### Type-check and production build

```bash
npm run type-check
npm run build
```

### Unit tests

```bash
npm run test:unit -- --run
```

目前有 16 個 TASK-001 offline tests，覆蓋 runtime config、OAuth request 不包含 client secret，以及 testing-data routing 不觸發 live project API；模型、YAML、Canvas 與完整 API contract coverage 仍待建立。

### End-to-end tests

```bash
npm run test:e2e:dev
```

Production-preview E2E：

```bash
npm run build
npm run test:e2e
```

現有 Cypress spec 仍是 template example。建立 mock/offline E2E 前，不把上述命令視為產品回歸驗證。

### Lint and format

```bash
npm run lint
npm run format
```

注意：這兩個 scripts 都會修改檔案。需要唯讀檢查時，應在 dependencies 已安裝後使用 project-local ESLint / Prettier 的 check-only invocation。

## Backend 與安全邊界

TASK-001 已建立集中式 public runtime config，並移除 source 中的開發期 API 位址、登入預設帳密與 browser-side client secret。

- 不要把密碼、token、實際內網 URL 或 production log 寫入文件、task 或 commit。
- 不要提交 local `.env*`；只提交沒有敏感值的 `.env.example`。
- OAuth grant、token expiry/refresh、roles 與 route protection 尚待 backend/auth owner 確認。
- 未確認 endpoint、credential、backend owner、TLS/CORS、GPU 與資料邊界前，不執行真實 login、model load、generation 或 download smoke。
- API assumptions 與待確認項目見 `docs/api-contract.md`。

## Project 工作方式

開始修改前讀取 `AGENTS.md`。功能、bug、重構與驗證規則調整原則上先建立 `docs/tasks/TASK-xxx.md`，task 確認後才實作。

Project-local governance check：

```bash
bash scripts/project-check.sh
```

首次 retrofit 或只做 offline structure check：

```bash
bash scripts/project-check.sh --no-git
```

## 已知限制

- Primary domain 為 `web`，但 workspace 尚無正式 Web domain assets；本 project 使用 core-only fallback。
- `DefectGeneratorPage.vue` 約 2,958 行，狀態、Canvas、API 與 UI 高度耦合。
- API、YAML、Canvas 與 auth contract 尚缺 regression tests。
- `js-yaml` 被 source 直接使用，但目前不是 root direct dependency。
- Fresh `npm ci` 後 production build 仍缺少 Sass compiler direct dependency；全專案 type-check 也有既有 prototype/Vue 型別錯誤。
- 2026-07-20 的 `npm ci` audit 回報 33 個 dependency vulnerabilities；尚未執行自動修復或 breaking upgrade。
- Platform prototype pages 的正式產品範圍尚待確認。

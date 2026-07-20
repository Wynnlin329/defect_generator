# defect_generator Requirements

## 1. 文件目的與證據等級

本文件整理現有 repository 可觀察到的需求與後續需確認的需求。它不是已由產品 owner 簽核的完整 PRD。

證據標記：

- **Observed**：目前程式碼或設定可直接證明。
- **Inferred**：可由多個現況訊號合理推導，但仍需 owner 確認。
- **Proposed**：為改善可維護性、安全或品質所提出，尚未授權實作。
- **Unknown**：缺乏足夠證據。

## 2. Product Scope

### R-SCOPE-001 Defect Generator 主流程

- 狀態：Observed
- 系統應提供模型設定、圖片／遮罩輸入、生成、結果預覽與下載的 browser workflow。
- 驗收依據：現有 Defect Generator route、view、stores 與 API methods。

### R-SCOPE-002 AISVision platform pages

- 狀態：Observed as prototype / formal scope Unknown
- Repo 包含 Home、Projects、Trainer、Verifier、Account、System、Trash Can、Schedule 等 routes/views。
- 這些頁面的 production requirement、權限、資料來源與維護 ownership 必須由產品 owner 確認。

## 3. Functional Requirements

### FR-001 Authentication

- 狀態：Observed；完整 policy Unknown
- 使用者可透過 UI 提交登入資料並取得 OAuth access token。
- 已授權 API request 應使用 token。
- Implemented by TASK-001：登入UI不預填credential，token request不包含browser-side client secret。
- Proposed：應確認OAuth client contract，並處理token expiry、logout、401與route protection。

### FR-002 Model configuration loading

- 狀態：Observed
- 系統可下載 CutPaste、Geometric Shapes Mode 1、Geometric Shapes Mode 2、Anomaly Diffusion 的基礎 YAML 設定。
- 前端應把 config 映射為可編輯的 UI state。
- 缺少欄位、型別錯誤或不支援版本時，應顯示可理解的錯誤，不應靜默使用錯誤預設值。

### FR-003 Model selection and parameters

- 狀態：Observed；TFIDG contract Unknown
- 使用者可選擇生成模型／模式並調整對應參數。
- UI label、state key、API model name、YAML key 與 endpoint routing 必須一致。
- TFIDG／相近命名的正式 contract 需確認後才可定版。

### FR-004 Image input

- 狀態：Observed
- 使用者可選擇支援格式的來源圖片。
- 系統應提供 preview，並保留可追蹤的檔名／順序。
- 支援格式、單檔大小、批次上限與 dimension 限制目前 Unknown。

### FR-005 Mask input and editing

- 狀態：Observed
- 使用者可上傳或透過 Canvas 建立 mask。
- mask 必須與來源圖片保持正確尺寸、座標與順序。
- 空白 mask、不同尺寸、透明度與縮放行為的產品規則目前 Unknown。

### FR-006 Configuration update

- 狀態：Observed
- 使用者調整的參數可序列化為 backend 接受的 YAML／payload 並送出。
- 送出前應執行型別與範圍驗證。
- backend schema/version 未確認時，不應臆測欄位相容性。

### FR-007 Generation execution

- 狀態：Observed
- 系統依選定模型呼叫對應 generator flow。
- 某些模型可先上傳圖片或載入模型。
- UI 應反映 loading、success 與 failure。
- cancel、retry、idempotency、parallel jobs、timeout 與 progress semantics 目前 Unknown。

### FR-008 Result retrieval and preview

- 狀態：Observed
- 系統可取得 result directory／result list，並把 image blob 顯示為 preview。
- 失敗或 partial results 應可辨識。
- preview Object URL 應在不用時釋放。

### FR-009 Result review

- 狀態：Observed；business meaning Unknown
- 系統具有 review result API binding。
- review status、allowed transitions、actor、audit 與 persistence contract 需由後端／產品確認。

### FR-010 Result download

- 狀態：Observed
- 使用者可下載生成結果 archive。
- filename、archive layout、size limit、expiry 與 retry behavior 目前 Unknown。

### FR-011 Localization

- 狀態：Observed
- UI 使用 Vue I18n。
- locale key 應一致且缺少翻譯時有可接受 fallback。
- 現況有 locale key typo signal，應另建 task 驗證完整 catalog。

## 4. Non-functional Requirements

### NFR-001 Security

- 狀態：Partially implemented / required before production
- browser bundle、source、docs 與 logs 不得包含 secrets。
- Implemented by TASK-001：endpoint與non-secret runtime config透過明確Vite environment contract管理。
- Auth、CORS、TLS、roles、upload validation 與 download authorization 必須經人工覆核。

### NFR-002 Reliability

- 狀態：Proposed
- API error、timeout、network interruption 與 partial result 不應使 UI 卡在不可恢復狀態。
- 同一操作不得因重複點擊意外建立未受控工作。
- 長時間生成需要明確 progress/polling/cancel/retry contract。

### NFR-003 Performance

- 狀態：Inferred / thresholds Unknown
- 大圖片、批次圖片、Canvas 與 blob preview 不應造成不可接受的主執行緒阻塞或 memory growth。
- 圖片數量、解析度、archive 大小與目標裝置的量化上限待確認。

### NFR-004 Accessibility and UX

- 狀態：Proposed
- form controls、loading、errors、Canvas alternatives 與 keyboard interaction 應可理解且可操作。
- destructive/reset/download actions 應有清楚 feedback。

### NFR-005 Compatibility

- 狀態：Unknown
- Node/npm 與 browser support matrix 尚未定義。
- Production hosting 必須支援 Vue Router history fallback。

### NFR-006 Maintainability

- 狀態：Proposed
- Model mapping、API contract、Canvas processing 與 result lifecycle 應有 unit/contract tests。
- 大型 SFC 的拆分必須在 characterisation evidence 建立後進行。
- Direct imports 必須列為 direct dependencies。

### NFR-007 Observability

- 狀態：Unknown / Proposed
- Production errors、request correlation、job identifiers 與 backend failures 應可診斷，且不得記錄 credential/token/敏感圖片內容。

## 5. Data Requirements

- Source images：格式、尺寸、批次限制、資料分類與 retention Unknown。
- Masks：格式、尺寸對齊、空白值與 naming rules Unknown。
- YAML configs：schema、version、range、backward compatibility Unknown。
- Auth data：不得持久化或輸出超過正式 policy 所需的資訊。
- Result images/archives：ownership、expiry、review/audit、download authorization Unknown。
- Prototype project records：目前 interface/schema 已有 drift signal，正式 contract 未確認。

## 6. Integration Requirements

- OAuth token service。
- Algorithm base config download/edit service。
- CutPaste generator。
- Geometric Shapes Mode 1/2 generators。
- Anomaly Diffusion upload/load/generate flow。
- Result list/data/review/download service。
- Prototype project service。

詳細 endpoint inventory 見 `docs/api-contract.md`。Base URL、API version、TLS、CORS、error envelope 與 availability target 均需 owner 確認。

## 7. Validation Requirements

任何產品程式修改至少應依風險選擇：

- TypeScript type-check。
- Vite production build。
- ESLint non-fix check。
- Vitest unit/contract tests。
- Mock/offline Cypress E2E。
- API schema fixture validation。
- Canvas/image fixture comparison。

真實 auth／GPU／generation／download validation 必須顯式確認 endpoint、credential、資源與資料邊界後才執行。

## 8. Acceptance Baseline for Future Tasks

每份 `TASK-xxx.md` 應：

1. 指向本文件的需求 ID，或新增清楚的 task-local requirement。
2. 區分 Observed behavior 與 desired behavior。
3. 列出受影響的 API、YAML、Canvas、auth、routes 與 docs。
4. 定義可重現的驗收案例與 rollback。
5. 對 live integration 或 sensitive data 明確標示人工覆核。

## 9. Open Questions

1. 正式產品範圍是 Defect Generator only，或完整 AISVision Platform frontend？
2. TFIDG 的正式名稱、參數 schema 與 generator flow 是什麼？
3. 四組 YAML 是否有版本與 JSON/YAML schema？
4. OAuth grant、token expiry/refresh、角色與 route access policy 為何？
5. 圖片／mask 支援格式、尺寸、數量與 retention 上限為何？
6. Generation job 是否支援 progress、cancel、retry、idempotency 與 concurrency limit？
7. Result review 的商業狀態機與 audit requirement 為何？
8. 支援的 Node/npm/browser 與 production hosting environment 為何？
9. Prototype pages 是否保留，以及其 backend owner 是誰？

## 10. Related Documents

- `docs/context.md`
- `docs/architecture.md`
- `docs/api-contract.md`
- `docs/testing.md`
- `PLAN.md`

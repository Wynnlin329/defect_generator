# defect_generator API Contract Inventory

## 1. 文件目的

本文件記錄前端目前使用的 HTTP contract、request/response assumptions、驗證缺口與安全邊界。它是由 `src/api/index.js`、`src/stores/auth.js`、`src/stores/configData.js`、`src/services/HttpServiceCommunicator.ts` 與主要 view 靜態整理出的前端視角 inventory，不是後端 OpenAPI 的替代品。

為避免外洩，文件以 `<AUTH_BASE_URL>`、`<ALGORITHM_API_BASE_URL>`、`<PROJECT_API_BASE_URL>` 代替 source 內的開發位址，也不記錄任何實際 credential。

## 2. Service Boundaries

### Authentication service

- Base URL placeholder：`<AUTH_BASE_URL>`
- 現況：由 `VITE_AUTH_BASE_URL` 經 `src/config/runtimeConfig.ts` 驗證後提供。
- 用途：OAuth token。

### Algorithm / defect-generation service

- Base URL placeholder：`<ALGORITHM_API_BASE_URL>`
- 現況：由 `VITE_ALGORITHM_API_BASE_URL` 經集中runtime config提供給Axios instance。
- timeout：目前 client 設定為長 timeout；正式值與各 endpoint SLA 尚未確認。
- 用途：YAML config、image upload、model load、generation、results、review、download。

### Project prototype service

- Base URL placeholder：`<PROJECT_API_BASE_URL>`
- 現況：`VITE_PROJECT_API_BASE_URL`提供base URL，`VITE_USE_PROJECT_TEST_DATA`必須明確設為`true`或`false`；`true`時offline tests證明不呼叫project API。
- 用途：最近 project 清單。

三組service已共用public runtime config contract；environment實際值、ownership、API version與auth policy仍待確認。

### Public runtime configuration contract

| Variable | Required | Purpose | Security rule |
| --- | --- | --- | --- |
| `VITE_AUTH_BASE_URL` | yes | OAuth service base URL | HTTP(S) only；不得含credential/query/fragment |
| `VITE_ALGORITHM_API_BASE_URL` | yes | Algorithm service base URL | HTTP(S) only；不得含credential/query/fragment |
| `VITE_PROJECT_API_BASE_URL` | yes | Project prototype service base URL | HTTP(S) only；不得含credential/query/fragment |
| `VITE_USE_PROJECT_TEST_DATA` | yes | 明確選擇offline testing data或project API | 只接受`true`/`false`；缺少時不選擇live |
| `VITE_OAUTH_CLIENT_ID` | no | Optional public client identifier | 不得作為confidential secret |

所有`VITE_*`會進入browser bundle。Repo不提供`VITE_OAUTH_CLIENT_SECRET`或其他secret變數；local values放在被gitignore的`.env.local`。

## 3. Authentication Contract

### POST `/api/oauth2/token`

- Service：Authentication
- Content-Type：`application/x-www-form-urlencoded`
- Request fields（Observed）：
  - `grant_type`
  - `username`
  - `password`
  - `scope`
  - `client_id`（只有設定optional public client identifier時）
- Explicitly not sent：`client_secret`
- Response fields consumed：
  - `access_token`
  - `token_type`
- Client behavior：成功後更新 username、token type、access token 與 logged-in state；logout 清空 memory state。
- Unknown：OAuth grant 的正式選擇、client authentication、安全儲存、expiry、refresh、roles、401 handling、CSRF 與 route guard。
- Risk：開發期client/default values已移除，但backend是否接受public client/no-secret request仍需auth owner與controlled integration確認。

授權的 algorithm requests 目前組合：

```text
Authorization: <token_type> <access_token>
```

## 4. Algorithm Configuration APIs

### GET `/algorithms/configs/base/download`

- Query：`ai_model=<model-file-name>`
- Known model filenames：`cutpaste.yaml`、`mode1.yaml`、`mode2.yaml`、`anomalydiffusion.yaml`
- Response consumed：YAML text，由 `js-yaml` parse。
- Auth：目前 API helper 未顯式附 authorization；是否公開或漏帶 token 需確認。
- Failure behavior：store 記錄 fetch error；UI 的完整 recovery behavior 未確認。
- Contract gaps：content type、schema version、encoding、required keys、range、backward compatibility。

### POST `/algorithms/configs/{apiModelName}/edit`

- Path：`apiModelName`
- Content-Type：`application/x-yaml`
- Accept：`application/json`
- Auth：Bearer-style header assembled from token type/access token。
- Body：序列化 YAML string。
- Response consumed：generic JSON；前端沒有正式 response schema。
- Contract gaps：allowed model names、validation errors、persistence scope、concurrency/version behavior。

## 5. Generation APIs

### POST `/cutpasteGenerator/generator`

- Content-Type：`multipart/form-data`
- Form fields：
  - `draw_bboxes`
  - `img`
- Response assumption：`response.data.message` 是包含 output directory 的 path-like string。
- Client parsing：以 `/` split，取最後一段作 result folder。
- Risk：response message 是人類文字而非穩定 typed field；文字或分隔符改變即會失敗。

### POST `/shapeGenerator/mode1/generator`

- Content-Type：`multipart/form-data`
- Query：`draw_bboxes`
- Form fields：`img`
- Response assumption：同樣從 `message` 最後一段解析 output folder。

### POST `/shapeGenerator/mode2/generator`

- Content-Type：`multipart/form-data`
- Query：`draw_bboxes`
- Form fields：
  - `img`
  - `mask`
- Response assumption：同樣從 `message` 最後一段解析 output folder。

### POST `/upload_images`

- Content-Type：`multipart/form-data`
- Query：`groupName`
- Repeated form fields：
  - `image`
  - `mask`
- Response field consumed：`upload_id`
- Contract gaps：圖片／mask 配對方式、數量與尺寸限制、partial failure、upload expiry、group name constraints。

### POST `/diffusionGenerator/loadModel`

- Request body：none
- Response consumed：generic JSON。
- Resource concern：可能觸發 GPU/model load；不可在未確認資源邊界下 smoke test。
- Contract gaps：idempotency、warm state、progress、timeout、capacity、unload behavior。

### POST `/diffusionGenerator/generator`

- Request body：none
- Query：
  - `draw_bboxes`
  - `upload_id`
- Response assumption：從 `message` 最後一段解析 output folder。
- Contract gaps：job ID、async semantics、progress、cancel、retry、upload expiry、model readiness。

## 6. Result APIs

### GET `/get_result_dir`

- Response consumed：generic JSON。
- Expected role：取得可用結果目錄。
- Schema、排序、ownership、pagination 與 retention Unknown。

### GET `/get_result_data`

- Query：`folder_name`
- Response consumed：result metadata/list，尚無正式 frontend schema。
- Unknown：folder validation、path traversal protection、partial results、pagination、review fields。

### GET `/review_result_data`

- Query：`image_path`
- Response type：`blob`
- Expected role：取得單張結果圖片供 preview。
- 現況 method name 的「review」代表讀取圖片，而非明確狀態更新；語意需確認。
- Unknown：MIME type、404/expired behavior、authorization、cache headers。

### GET `/download_result`

- Query：`folder_path`
- Response type：`blob`
- Filename：嘗試由 `Content-Disposition` 的 quoted filename 解析，否則使用 fallback ZIP filename。
- Risk：未完整處理 RFC 5987、unquoted filename、content type、巨大檔案與 interrupted download。

## 7. Project Prototype API

### GET `get_recently_project_list/`

- Service：Project prototype service。
- 現況：testing-data flag由required runtime boolean明確控制；`true`時不呼叫live endpoint。
- Response：以 Zod project list schema parse，再轉為 `ProjectData[]`。
- Known drift signal：TypeScript interface 對 delete datetime 接受 `null`，Zod schema 目前只接受 string。
- Status：prototype contract；不能視為 production API。

## 8. Common Request/Response Policy Gaps

- API version ownership 與 compatibility policy 未確認。
- Error envelope 無 schema；interceptor 與 UI 都可能處理 error/alert。
- Request correlation/job identifiers 未制度化。
- Token expiry/refresh、401/403 policy 未制度化。
- Timeout 目前偏向單一全域值，未依 request type 分級。
- Generator response 依賴 human-readable `message` path parsing。
- YAML、JSON 與 blob responses 缺少 runtime schema/content-type validation。
- Abort/cancel、retry、idempotency、rate limit 與 concurrency contract 未確認。

## 9. Required Contract Improvements

以下項目除第一項外仍是Proposed，需另建task後實作：

1. [Completed by TASK-001] 以non-secret environment variables集中三組service base URLs，並建立validation/tests。
2. 取得或建立後端 OpenAPI／YAML schemas，納入版本控制與 mock fixtures。
3. 將 output folder 改為穩定 JSON field，不解析訊息文字。
4. 對 OAuth token、config、upload、generation 與 result responses 加 runtime validation。
5. 定義 typed error envelope、status mapping 與 UI recovery policy。
6. 定義長時間 job 的 ID、status、progress、cancel、retry 與 expiry。
7. 明確定義 image/mask pairing、file limits、MIME validation 與 retention。
8. 對 result preview/download 定義 authorization、filename、MIME、size 與 expiry。

## 10. Mock Contract Baseline

在接真實 backend 前，mock tests 應至少覆蓋：

- token success／invalid credential／expired token。
- 四份 valid YAML、missing keys、wrong type、unsupported version。
- 各 generator success、4xx validation、401、5xx、timeout、malformed message。
- upload image/mask count mismatch 與 invalid `upload_id`。
- diffusion model load success／already loaded／GPU unavailable。
- empty／partial／expired result folder。
- image blob MIME mismatch、download missing filename、network interruption。

## 11. Live Integration Gate

只有在下列資訊明確且使用者授權後，才執行 live requests：

- environment 與 exact base URL；
- 測試 credential／token 的安全取得方式；
- backend owner 與允許的測試時間；
- GPU／model load 與生成資源上限；
- 可上傳資料的分類與刪除方式；
- result retention／cleanup；
- 預期 API schema、成功標準與 rollback。

## 12. Source of Truth

- 目前前端實作：`src/api/index.js`、`src/stores/auth.js`、`src/stores/configData.js`、`src/services/HttpServiceCommunicator.ts`
- 產品需求：`docs/requirements.md`
- 測試策略：`docs/testing.md`
- 後端正式 contract：尚未導入，取得後應取代本文件中的 assumptions。

# defect_generator Plan

## 文件目的

本文件記錄 project 目前階段、近期優先事項、依賴與後續改善順序。每個實作項目仍須先建立或更新 `docs/tasks/TASK-xxx.md`，並依 `AGENTS.md` 的確認停點執行。

## Current State

- Status：retrofit generation completed / TASK-001 and TASK-002 completed
- Primary domain：`web`
- Domain assets：not available / not imported
- Fallback：core assets only
- Current product focus：Defect Generator
- Platform prototype scope：待產品 owner 確認

## Phase 1：Project 納管與文件基線

- [x] 完成 repo inventory 與 retrofit proposal。
- [x] 導入 confirmed core base、skills、templates、checklist。
- [x] 建立 Codex / Claude project-native thin adapters。
- [x] 建立 project harness。
- [x] 建立 project entry、context、architecture、requirements、API、testing、baseline 文件。
- [x] project harness 與 checklist 最終驗證；產品 runtime validation 仍待 dependencies 與 tests baseline。
- [x] 已建立並實作 `TASK-001`「前端 Runtime Config 與 Credential 安全基線」；offline tests通過，build/type-check baseline阻塞已記錄。

## Phase 2：Environment、Dependency 與 Security Baseline

- [x] 建立 `.env.example` 與集中 runtime config。
- [x] 移除 UI 預設 credential 與 browser-side client secret。
- [ ] 確認 OAuth flow、token lifecycle 與 route protection。
- [x] 已實作 `TASK-002`：補齊direct dependencies，fresh `npm ci`、完整type-check、production build與16個offline tests通過。
- [ ] Node/npm engine與non-mutating lint command維持後續獨立工作，不混入TASK-002。
- [ ] 確認 HTTP/TLS、CORS、browser 與 backend environment boundary。
- 全部工作需另建 task，且不在未授權環境執行真實登入。

## Phase 3：Offline Test 與 API Contract Baseline

- 為 config mapping、schema、auth state、image/Blob utility 建 unit tests。
- 使用 mock adapter 驗 config、generation、result API contracts。
- 建立固定 image/mask fixtures 與 Canvas characterisation tests。
- 將 Cypress template example 替換成不依賴真實 backend 的關鍵路徑 E2E。

## Phase 4：Defect Generator 主流程分解

- 在 regression evidence 足夠後，拆分 composables、API orchestration、Canvas components 與 model config adapters。
- 統一 error/loading/message 與 Object URL lifecycle。
- 去除重複 config mapping、未使用 imports 與 prototype branches。
- 釐清 TFIDG 的名稱、contract 與實際執行路徑。

## Phase 5：Platform Scope 與 Deployment Readiness

- 決定 Home、Projects、Trainer、Verifier、Account、System 的保留／恢復／移除策略。
- 確認 backend owner、OpenAPI/YAML schema、GPU resource policy 與 result retention。
- 建立 CI、preview build、static hosting fallback、observability 與 rollback。
- 需要正式 release workflow 時，再評估導入 `release-readiness-check`。

## 近期優先事項

1. 由使用者確認 repo 正式 ownership 是完整 AISVision frontend 或 Defect Generator only。
2. 建立 Phase 3 offline API/YAML/Canvas test baseline task。
3. 確認 OAuth client contract、token lifecycle 與 route protection。
4. 有測試保護後再規劃主頁面拆分。

## 待確認事項

- Product scope 與 prototype pages 的長期狀態。
- TFIDG backend contract。
- 支援的 Node/npm/browser matrix。
- Backend endpoint、TLS/CORS、OAuth 與 GPU environment boundary。
- 是否採用手動 Azure DevOps Work Item / PR 文案流程。

## 建議下一步

下一個產品task可擴充offline API/YAML/Canvas tests，或獨立處理Node/npm engine、Sass warnings與dependency vulnerabilities。

# defect_generator Retrofit Checklist

## 1. 結果摘要

- Retrofit proposal：`CONFIRMED`
- Generation status：`COMPLETE WITH DEFERRED PRODUCT TASK`
- Project governance / harness：`PASS`
- Product runtime validation：`NOT RUN`
- Claude fresh-session runtime：`UNKNOWN`
- Existing product source changes：none
- Workspace shared/domain changes：none
- Final assessment：本次確認範圍已完成；第一份產品 task、dependencies 安裝、build/test 與 live integration 均不屬本次自動生成授權。

## 2. 導入模式與邊界

- [x] 此 repo 是既有、已開發中的 project。
- [x] 使用 `project-retrofit`，未使用新專案 bootstrap。
- [x] 先完成 read-only inventory 與 `docs/retrofit-proposal.md`。
- [x] 使用者確認 proposal 後才進入生成。
- [x] Scope of Ownership 已記錄。
- [x] Target subproject / path 已記錄。
- [x] Repo-level domains observed 已記錄。
- [x] Primary domain 判定為 `web`。
- [x] Secondary capabilities、Excluded domains 與 rationale 已記錄。
- [x] 保留既有 Vue/Vite source layout，不修改 `src/**`。
- [x] 不修改 workspace `shared/**`，不建立正式 Web domain。

Evidence：`docs/retrofit-proposal.md`、`AGENTS.md`、`docs/workspace-baseline.md`。

## 3. Domain-aware Retrofit

- [x] Domain Mapping 已建立。
- [x] Web domain assets 記錄為 `not available` / `not imported`。
- [x] Fallback behavior 記錄為 `use core assets only`。
- [x] Imported domain MVP assets 記錄為 `not available`。
- [x] Later domain assets not imported 已列出。
- [x] Project-local overrides 已列出。
- [x] 未建立空的 `.agents/domain/web/`。
- [x] 未使用 iOS domain assets 代替 Web。
- [x] Active domain supplement：Not applicable；workspace 無正式 Web supplement。
- [x] Domain full scope 不存在時仍以 core-only baseline 完成 retrofit。

Decision：`.agents/domain/<domain>/{base,skills,templates}` 的一般 checklist 項目在本 project 是 `Not applicable`，原因不是遺漏，而是 confirmed proposal 明確要求 unavailable domain 不建立空目錄。

## 4. Proposal 完整性

- [x] Project 基本資訊與 repo 狀態。
- [x] 專案現況、技術棧與主要模組。
- [x] 導入目的與最小骨架。
- [x] Scope、target path、observed domains。
- [x] 高風險區與修改點定位。
- [x] 保留不動與本次暫緩項目。
- [x] Workspace baseline / copy vs pointer plan。
- [x] Domain fallback、MVP/unavailable/later classification。
- [x] DevOps Work Item/PR 文案能力評估。
- [x] Validation plan、待確認事項與 confirmation-stop。

Result：proposal 在確認前未寫入生成資產；使用者確認後才生成。

## 5. Project-local Agent Structure

- [x] `.agents/core/base/`
- [x] `.agents/core/skills/`
- [x] `.agents/core/templates/`
- [x] `.agents/core/checklists/`
- [x] `.agents/skills/` Codex thin adapters。
- [x] root `CLAUDE.md`。
- [x] `.claude/skills/` Claude thin adapters。
- [x] `scripts/project-check.sh`。
- [x] `docs/tasks/`。
- [x] Existing agent ownership conflict：none observed before generation。

## 6. Base Rules and Harness

- [x] `.agents/core/base/BASE_AGENTS.md` 是 upstream exact copy。
- [x] Base rules 可由 repo local workflow 直接讀取。
- [x] 日常使用不需回到 workspace 才能理解最低工作原則。
- [x] Project harness 從 `shared/core/scaffold/project-harness/project-check.sh` 複製。
- [x] Harness 以 `bash scripts/project-check.sh` 呼叫，不依賴 executable bit。
- [x] Baseline 記錄 Project harness version `1.2.0`。
- [x] `bash scripts/project-check.sh --no-git`：PASS。
- [x] `bash scripts/project-check.sh`：PASS。
- [x] Workspace pointer：reachable via `../..`。

Harness output summary：

```text
Claude canonical=4 adapters=4
Codex canonical=4 adapters=4
PROJECT-CHECK: PASS version=1.2.0 format=1
```

## 7. Core Skills

Copied and active：

- [x] `requirement-breakdown`
- [x] `code-review`
- [x] `test-case-generation`
- [x] `technical-documentation`

Deferred / Not imported：

- [ ] `release-readiness-check` — 尚無正式 release/deployment workflow。
- [ ] `presentation-packaging` — 與目前 project 工作流無關。
- [ ] Workspace-development skills — 一般 project 不導入。
- [ ] Project workspace feedback skill — 目前沒有可成立的 WGAP；若未來發現 shared gap 再評估。

這些 deferred 項目依 confirmed minimal asset plan 處理，不影響 requirement/review/test/documentation workflow。

## 8. Native Skill Adapters

### Codex

- [x] 4 個 copied canonical skills 都有同名 `.agents/skills/<name>/SKILL.md`。
- [x] Frontmatter name/description 與 canonical 對應。
- [x] Adapter 只指向同 repo `.agents/core/skills/`。
- [x] 未包含 workspace absolute path 或 canonical workflow body。
- [x] Project harness parity check PASS。

### Claude Code

- [x] `CLAUDE.md` 以 `@AGENTS.md` relative import 載入 project rules。
- [x] 4 個 copied canonical skills 都有同名 `.claude/skills/<name>/SKILL.md`。
- [x] Adapter 只指向 same-repo canonical。
- [x] 未依賴 plugin、hooks、settings、global config 或 workspace absolute path。
- [x] Repo-side parity check PASS。
- [ ] Fresh-session runtime smoke — `UNKNOWN`，本次未執行 Claude runtime。

## 9. Core Templates and Checklist

Copied：

- [x] `context-template.md`
- [x] `architecture-template.md`
- [x] `requirements-template.md`
- [x] `task-template.md`
- [x] `workspace-baseline-template.md`
- [x] `technical-document-template.md`
- [x] `task-template-compliance-checklist.md`

Not imported：

- [ ] `project-agents-template.md` — `AGENTS.md` 已依 template contract 生成；confirmed copy set 不保留其副本。
- [ ] ADO Work Item / PR / placeholder templates — 手動 Azure DevOps 流程尚未確認。
- [ ] `agent-delegation-template.md` — 本 project 未採用 delegation workflow。
- [ ] Workspace-development templates — 不屬一般 project retrofit。
- [ ] Web domain templates — unavailable。

## 10. Root Entry Documents

- [x] `AGENTS.md`：project purpose、domain mapping、layers、workspace pointer、必讀順序、技術棧、模組、flows、risks、skills、validation。
- [x] `CLAUDE.md`：thin project-native entry。
- [x] `PLAN.md`：current state、五個 phases、priorities、questions、next step。
- [x] `README.md`：已取代 Vue placeholder，說明用途、能力、setup、scripts、安全邊界與已知限制。
- [x] `.gitignore`：local/runtime/secrets/build/test artifacts hygiene。

## 11. Core Project Documents

- [x] `docs/context.md`：定位、角色、use cases、scope、repo map、constraints、security、success criteria。
- [x] `docs/architecture.md`：layers、runtime flows、modules、state、external systems、failure modes、evolution。
- [x] `docs/requirements.md`：Observed/Inferred/Proposed/Unknown evidence levels、functional/non-functional/data/integration requirements。
- [x] `docs/api-contract.md`：auth/config/generation/result/project prototype endpoints、payload assumptions、gaps、live gate。
- [x] `docs/testing.md`：current state、seven validation layers、risk matrix、fixtures、CI proposal、actual validation record。
- [x] `docs/workspace-baseline.md`：version/ref、copied/reference/not imported、domain decision、overrides、validation。
- [x] `docs/tasks/README.md`：task-first flow 與候選第一個 task。
- [x] `docs/retrofit-proposal.md`：保留 confirmed proposal 與原始決策證據。
- [x] `docs/retrofit-checklist.md`：本文件。
- [x] Domain-specific docs status：用 project-local API/testing docs 補充；沒有假裝導入 shared Web domain docs。

## 12. Workspace Baseline

- [x] Workspace version `v1.16.0`。
- [x] Workspace ref `9277b22`。
- [x] Retrofit date `2026-07-20`。
- [x] Import method `retrofit`。
- [x] Project type、scope、target path、observed/excluded domains。
- [x] Imported core assets。
- [x] Imported/unavailable/later domain assets。
- [x] Copy/pointer/not-imported classifications。
- [x] Codex/Claude adoption與roots。
- [x] Project-local overrides與not imported項目。
- [x] Workspace feedback/domain upgrade history。
- [x] Alignment assessment 與實際工作規則。
- [x] Missing evidence 使用 `UNKNOWN` / `NOT RUN`，沒有省略。

## 13. Task Governance

- [x] `docs/tasks/` 已建立。
- [x] Task naming與template入口已說明。
- [x] 功能、bug、重構與validation changes 的 task-first/confirmation-stop 已寫入 `AGENTS.md`。
- [ ] 第一份 `TASK-001` — Deferred；confirmed proposal 明確不替使用者選定產品 task。
- [ ] Task template compliance — Not applicable until first task exists；project harness 將在 task 建立後驗證。
- [ ] DevOps Work Item/PR drafts — Not applicable；流程未採用。

Retrofit 文件生成不等於產品需求實作授權。使用者選定下一項工作後，應先生成 `TASK-001` 並再次停下確認。

## 14. Modification-point and Risk Coverage

- [x] Application shell/navigation 首要入口已記錄。
- [x] Defect Generator、API/auth、config/state、Canvas、prototype modules 已定位。
- [x] API、YAML、Canvas、auth、GPU、deployment 高風險區已標示。
- [x] `DefectGeneratorPage.vue` 大型重構需先有 characterisation tests。
- [x] Live login/model load/generation/download 需人工覆核與顯式授權。
- [x] 不適用的 Web domain supplement 已明確說明。

## 15. Project-specific Skill Assessment

- [x] 已評估 project-specific skill。
- [x] 目前不建立，因 generation flow 與 tests 尚未穩定。
- [x] 候選：`defect-generation-workflow`。
- [x] 未把單一 project 的 API/model specifics 提前升級為 shared Web domain skill。

## 16. Hygiene and Security Checks

- [x] `git diff --check`：PASS。
- [x] 新增文字檔 trailing whitespace scan：PASS。
- [x] Product scope status：`src/**`、`package.json`、`package-lock.json`、Vite config 無變更。
- [x] Authored docs 沒有複製現存內網位址或實際登入值。
- [x] `.gitignore` 排除 `.DS_Store`、dependencies、build、coverage、local env、logs、Cypress runtime outputs。
- [x] BASE_AGENTS、4 core skills、project harness 與 upstream exact-copy parity：PASS。
- [x] 未刪除或改寫 existing product files；唯一既有檔案內容變更是以有效專案說明取代 scaffold `README.md`。

## 17. Product Validation

- [ ] `npm ci` — Not run；本次不下載 dependencies。
- [ ] `npm run type-check` — Not run；`node_modules` absent。
- [ ] `npm run build` — Not run；`node_modules` absent。
- [ ] `npm run test:unit -- --run` — Not run；無有效 unit tests 且 dependencies absent。
- [ ] Cypress — Not run；現存 spec 是 template example。
- [ ] Live auth/API/GPU smoke — Not run by design；endpoint、credential、resource、data boundaries 未確認。

Residual risk：project governance structure 已驗證，但 runtime correctness、production readiness 與 backend compatibility 仍未建立。

## 18. Final Completion Decision

### Completed within confirmed scope

- Project inventory與confirmed proposal。
- Core-only project-local agent structure。
- Codex/Claude thin adapters。
- Project harness。
- Root entry、project plan與詳細說明文件。
- Workspace baseline、hygiene與validation record。
- 兩種 project harness invocation PASS。

### Deferred by explicit scope or missing authority

- 第一份產品 task與任何 `src/**` 實作。
- Web shared domain建立。
- Dependency/package修正。
- Build/test/CI建立。
- Claude fresh-session runtime smoke。
- 真實 backend/GPU integration。
- Azure DevOps文案能力。

結論：Retrofit generation `COMPLETE`；project governance baseline `PASS`。後續產品工作仍需以 task-first 流程開始。

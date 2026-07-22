# Workspace Baseline

## 文件目的

本文件記錄 `defect_generator` 實際採用的 workspace baseline、copied assets、reference-only pointers、未導入項目、domain mapping 與 project-local overrides。它描述 2026-07-20 retrofit及2026-07-22 Web Domain Stage 1 project-local upgrade後的現況，不代表未來 workspace 更新會自動同步到本 project。

## 一、目前 Baseline

- Workspace version：`v1.16.0`
- Workspace 版本：`v1.16.0`
- Workspace repo location：`/Users/aissens/Documents/workspace_git/workspace`
- Workspace commit / ref：`bad7c60`
- 初次導入日期：`2026-07-20`
- 最近升級日期：`2026-07-22`
- 導入人員：Codex，依使用者確認的 retrofit proposal 與 TASK-004 執行
- 導入方式：`retrofit` + `project-local upgrade`
- Project 類型：Vue 3 Web SPA / AI 瑕疵影像生成前端

Workspace repo lookup order：

1. `$WORKSPACE_REPO`
2. `../..`（本 repo 位於 `workspace/projects/<project-name>/`）
3. `../workspace`
4. `../workspace_git/workspace`
5. 本文件的 Workspace repo location
6. 使用者提供的路徑

## 二、Workspace References / Pointers

### 1. Canonical workspace pointers

- Workspace repo location：`/Users/aissens/Documents/workspace_git/workspace`
- Workspace version：`v1.16.0`
- Workspace commit / ref：`bad7c60`
- Workspace source state：Web Domain Stage 1 MVP；workspace changelog `Unreleased`
- Project harness version：`1.2.0`
- Codex native adapters：`adopted`
- Codex adapter canonical root：`.agents/core/skills/`
- Codex adapter discovery root：`.agents/skills/`
- Claude project-native entry：`adopted`
- Claude entry root：`CLAUDE.md`
- Claude native adapters：`adopted`
- Claude adapter canonical root：`.agents/core/skills/`
- Claude adapter discovery root：`.claude/skills/`
- Claude runtime verification：`UNKNOWN`；未執行 fresh-session smoke
- Prompt catalog relative path：`docs/prompts/README.md`
- Registry path：`shared/registry.md`
- Governance docs path：`docs/governance/`
- Guides path：`docs/guides/`
- Release notes path：`RELEASE_NOTES/`
- Examples path：`docs/examples/`
- Access mode：`partially copied`
- Pointer health：`reachable`
- Last checked：`2026-07-22`
- Notes：上游 pointers 只供查閱；日常工作以 project-local assets 為準。

### 2. Copied assets

下表 marker 內的 status 是 project harness 可解析的實際狀態。

<!-- copied-assets:BEGIN format=1 -->
| workspace source | project-local path | 分類 | status |
| --- | --- | --- | --- |
| `shared/core/scaffold/project-harness/project-check.sh` | `scripts/project-check.sh` | core scaffold / project harness | copied |
| `shared/core/base/BASE_AGENTS.md` | `.agents/core/base/BASE_AGENTS.md` | core base | copied |
| `shared/core/skills/requirement-breakdown/SKILL.md` | `.agents/core/skills/requirement-breakdown/SKILL.md` | core skill | copied |
| `shared/core/skills/code-review/SKILL.md` | `.agents/core/skills/code-review/SKILL.md` | core skill | copied |
| `shared/core/skills/test-case-generation/SKILL.md` | `.agents/core/skills/test-case-generation/SKILL.md` | core skill | copied |
| `shared/core/skills/technical-documentation/SKILL.md` | `.agents/core/skills/technical-documentation/SKILL.md` | core skill | copied |
| `shared/core/templates/task-template.md` | `.agents/core/templates/task-template.md` | core template | copied |
| `shared/core/templates/context-template.md` | `.agents/core/templates/context-template.md` | core template | copied |
| `shared/core/templates/architecture-template.md` | `.agents/core/templates/architecture-template.md` | core template | copied |
| `shared/core/templates/requirements-template.md` | `.agents/core/templates/requirements-template.md` | core template | copied |
| `shared/core/templates/workspace-baseline-template.md` | `.agents/core/templates/workspace-baseline-template.md` | core template | copied |
| `shared/core/templates/technical-document-template.md` | `.agents/core/templates/technical-document-template.md` | core template | copied |
| `shared/core/checklists/task-template-compliance-checklist.md` | `.agents/core/checklists/task-template-compliance-checklist.md` | core checklist | copied |
| generated from `shared/core/templates/codex-project-skill-adapter-template.md` | `.agents/skills/` | Codex native discovery thin adapters | copied |
| generated from `shared/core/templates/claude-project-entry-template.md` | `CLAUDE.md` | Claude Code project entry thin adapter | copied |
| generated from `shared/core/templates/claude-project-skill-adapter-template.md` | `.claude/skills/` | Claude Code native discovery thin adapters | copied |
| `shared/domains/web/base/DOMAIN_AGENTS.md` | `.agents/domain/web/base/DOMAIN_AGENTS.md` | Web domain base | copied |
| `shared/domains/web/skills/web-requirement-breakdown/SKILL.md` | `.agents/domain/web/skills/web-requirement-breakdown/SKILL.md` | Web domain skill | copied |
| `shared/domains/web/skills/web-feature-implementation/SKILL.md` | `.agents/domain/web/skills/web-feature-implementation/SKILL.md` | Web domain skill | copied |
| `shared/domains/web/templates/web-task-template.md` | `.agents/domain/web/templates/web-task-template.md` | Web domain template | copied |
| `shared/domains/web/templates/web-integration-checklist-template.md` | `.agents/domain/web/templates/web-integration-checklist-template.md` | Web domain template | copied |
| `shared/core/skills/release-readiness-check/SKILL.md` | `.agents/core/skills/release-readiness-check/SKILL.md` | later core skill | not imported |
| `shared/core/skills/presentation-packaging/SKILL.md` | `.agents/core/skills/presentation-packaging/SKILL.md` | later core skill | not imported |
| `shared/core/templates/agent-delegation-template.md` | `.agents/core/templates/agent-delegation-template.md` | delegation workflow | not imported |
| `shared/domains/web/skills/web-project-bootstrap/SKILL.md` | `.agents/domain/web/skills/web-project-bootstrap/SKILL.md` | initial bootstrap workflow | not imported |
| `shared/domains/web/skills/web-project-retrofit/SKILL.md` | `.agents/domain/web/skills/web-project-retrofit/SKILL.md` | initial retrofit workflow | not imported |
| `shared/domains/web/templates/web-project-bootstrap-proposal-template.md` | `.agents/domain/web/templates/web-project-bootstrap-proposal-template.md` | initial bootstrap workflow | not imported |
| `shared/domains/web/templates/web-project-retrofit-proposal-template.md` | `.agents/domain/web/templates/web-project-retrofit-proposal-template.md` | initial retrofit workflow | not imported |
| `shared/domains/web/checklists/web-project-bootstrap-checklist.md` | `.agents/domain/web/checklists/web-project-bootstrap-checklist.md` | initial bootstrap workflow | not imported |
| `shared/domains/web/checklists/web-project-retrofit-checklist.md` | `.agents/domain/web/checklists/web-project-retrofit-checklist.md` | initial retrofit workflow | not imported |
<!-- copied-assets:END -->

Copied skills、templates 與 checklist 是 project-local snapshots；它們不會因 workspace 更新而自動升級。

### 3. Reference-only assets

| Source workspace asset | Purpose | Access mode | Project-local copy | Last checked | Notes |
| --- | --- | --- | --- | --- | --- |
| `docs/prompts/README.md` | prompt/flow catalog | `reference-only` | none | 2026-07-20 | pointer-only |
| `shared/registry.md` | upstream asset index | `reference-only` | none | 2026-07-20 | pointer-only |
| `docs/governance/` | governance lookup | `reference-only` | none | 2026-07-20 | pointer-only |
| `docs/guides/` | flow guidance | `reference-only` | none | 2026-07-20 | pointer-only |
| `RELEASE_NOTES/` | release history | `reference-only` | none | 2026-07-20 | pointer-only |
| `docs/examples/` | non-formal examples | `reference-only` | none | 2026-07-20 | not imported |
| `shared/domains/web/README.md` | Web Stage 1 index / boundary | `reference-only` | none | 2026-07-22 | pointer-only |

## 三、Domain Mapping

- Primary domain：`web`
- Secondary capabilities：REST API、OAuth、AI model configuration、Canvas image processing、file upload/download、YAML、i18n、frontend testing
- Domain selection rationale：主要交付物與高頻修改面是 browser UI、routing、state、Canvas interaction 與 API binding。
- Task active capability：`TASK-004` Web Domain Stage 1 project-local adoption與baseline對齊；目前為Closed、Tests Passed、Reviewed、Committed。
- Imported core assets：core base、4 skills、6 templates、1 checklist、project harness、Codex/Claude adapters。
- Imported domain assets：Web domain base、2個skills、2個templates。
- Imported domain MVP assets：`DOMAIN_AGENTS.md`、`web-requirement-breakdown`、`web-feature-implementation`、`web-task-template.md`、`web-integration-checklist-template.md`。
- Unavailable domain assets：none for Stage 1 formal set；Later capabilities尚未建立。
- Later domain assets not imported：release/readiness、performance、E2E/browser matrix、SSR/PWA、native adapters與domain harness。
- Active domain assets in project：5個Web minimum active assets。
- Domain assets path：`.agents/domain/web/`。
- Domain assets status：`available / partially imported`
- Fallback behavior：Web tasks使用core + imported Web assets；未導入／不可用能力維持core-only。
- Project-specific overrides：保留既有 Vue/Vite/npm scripts 與 source layout。
- Project-local overrides：`AGENTS.md`、`PLAN.md` 與 `docs/` 記錄 Web/API/Canvas/GPU 專案事實。
- Workspace feedback reports：none。
- Domain upgrade history：2026-07-22依TASK-004從workspace ref `bad7c60`導入Web Stage 1最小active set。

未列於copied assets的Web資產不得視為已導入，也不以iOS domain assets代替。

## 四、Domain Decision Record

- Scope of Ownership：本 retrofit 只納管 `defect_generator` repo 的 project-local agent assets、文件、harness 與 hygiene；不修改 workspace shared assets、backend 或既有 `src/**`。
- Target subproject / path：repo root；主要產品路徑為 `src/views/defect_generator_page/`。
- Repository scope：AISVision Vue frontend；目前重點為 Defect Generator。
- Target subproject / path：repo root 與 `src/views/defect_generator_page/`。
- Primary domain：`web`
- Secondary capabilities：auth、REST、AI model orchestration、Canvas、YAML、download。
- Repo-level domains observed：Web frontend、backend API client、AI workflow integration。
- Imported core assets：confirmed minimal core set。
- Imported domain assets：Web base、requirement/feature skills、task/integration templates。
- Imported domain MVP assets：5個minimum active assets。
- Domain assets unavailable：無Stage 1 active asset缺口；Later能力尚不可用。
- Later domain assets not imported：release/readiness、performance、E2E/browser matrix、SSR/PWA與native discovery相關能力。
- Fallback behavior：core + imported Web assets；其餘能力core-only。
- Excluded domains：`ios`、`backend`。
- Exclusion rationale：本 repo 不交付 iOS app 或 backend service；API/GPU 是外部依賴。
- Future domain candidates：backend；只有project ownership改變或正式domain建立後才另行評估。
- Workspace feedback reports：none。
- Domain upgrade history：TASK-004 Web Domain Stage 1 minimum active set adoption。

## 五、Core Assets 導入範圍

### Core base

- [x] `.agents/core/base/BASE_AGENTS.md`

### Core skills

- [x] `requirement-breakdown`
- [x] `code-review`
- [x] `test-case-generation`
- [x] `technical-documentation`
- [ ] `release-readiness-check` — Not imported；尚無正式 release workflow。
- [ ] `presentation-packaging` — Not imported；不屬本次需求。

### Core templates

- [x] `context-template.md`
- [x] `architecture-template.md`
- [x] `requirements-template.md`
- [x] `task-template.md`
- [x] `workspace-baseline-template.md`
- [x] `technical-document-template.md`
- [ ] ADO／PR／DevOps templates — Not imported；流程未確認。
- [ ] `agent-delegation-template.md` — Not imported；本次未採用 delegation workflow。

### Native adapters and scaffold

- [x] `.agents/skills/<name>/SKILL.md` 對應全部 copied core skills。
- [x] `.claude/skills/<name>/SKILL.md` 對應全部 copied core skills。
- [x] `CLAUDE.md` 使用 `@AGENTS.md` relative import。
- [x] adapter canonical target 都位於同 repo `.agents/core/skills/`。
- [x] `scripts/project-check.sh`，Project harness version `1.2.0`。
- [ ] Claude fresh-session runtime smoke — `UNKNOWN`；未執行。

### Core checklists

- [x] `task-template-compliance-checklist.md`
- [ ] `project-retrofit-checklist.md` 未複製為 canonical asset；使用生成後的 `docs/retrofit-checklist.md` 記錄結果。

## 六、已採用的 Project 結構

- [x] `.agents/core/base/`
- [x] `.agents/core/skills/`
- [x] `.agents/core/templates/`
- [x] `.agents/core/checklists/`
- [x] `.agents/skills/`
- [x] `.claude/skills/`
- [x] `AGENTS.md`
- [x] `CLAUDE.md`
- [x] `PLAN.md`
- [x] `docs/context.md`
- [x] `docs/architecture.md`
- [x] `docs/requirements.md`
- [x] `docs/api-contract.md`
- [x] `docs/testing.md`
- [x] `docs/tasks/`
- [x] `docs/workspace-baseline.md`
- [x] `.agents/domain/web/` — 已導入base、2個active skills與2個active templates。

## 七、Project-local Overrides

- Root `AGENTS.md` 補充 Web、API、auth、Canvas、GPU、testing 與 security 規則。
- `README.md`、`PLAN.md` 與 `docs/` 以 repository 現況取代 Vue scaffold 說明。
- Copied core canonical assets只依workspace source同步；project-specific規則不寫入copied core。
- Codex／Claude adapters 都是 thin adapters，不含 workspace absolute path 或 workflow body。

## 八、Not imported

- Web bootstrap／retrofit skills、proposal templates與checklists：initial adoption流程已完成，本次不匯入。
- Web Stage 1 Later assets：workspace尚未建立，維持not available / not imported。
- iOS domain assets：domain 不相符。
- Backend domain assets：backend 非本 repo 交付物，且 upstream 非正式 domain。
- Release/presentation skills：目前沒有對應 active workflow。
- ADO/PR/DevOps templates：外部流程未確認。
- Delegation template：本次未採用。
- Workspace prompt catalog/governance/guides/release notes/examples：保持 reference-only。

## 九、Upgrade Policy

- 新 workspace 版本不自動覆蓋 project-local copied assets。
- 升級前先比較 release notes、manifest、core asset diff 與 project impact。
- 升級採 project-local task，記錄 imported、not imported、overridden 與 validation。
- 若 workspace Web domain 後續擴張，仍先做Upgrade Need Check，不自動同步或全量匯入。

## 十、Validation Status

- Project harness：`PASS`；`bash scripts/project-check.sh --no-git` 與 `bash scripts/project-check.sh` 均通過（version `1.2.0` / format `1`）。
- Copied asset existence：`PASS`；由 project harness 驗證。
- Web copied asset source parity：`PASS`；5個Web assets與同步後core `requirement-breakdown`均與workspace ref `bad7c60`來源一致。
- Workspace validation：`PASS`；既有`.DS_Store`與backend/library suspected-link warnings不阻斷且與本次project upgrade無關。
- Codex/Claude adapter parity：`PASS`；canonical skills 4、Codex adapters 4、Claude adapters 4。
- Claude runtime verification：`UNKNOWN`。
- Product unit tests：最近於TASK-003驗證PASS；7 files / 49 tests。本次治理升級未重跑產品tests。
- Product type-check：PASS；TASK-002已修正既有app/prototype errors，未放寬compiler設定。
- Product build：PASS；fresh `npm ci`後`npm run build-only`與aggregate `npm run build`均通過。
- Live backend/GPU validation：未執行，符合安全邊界。

## 十一、目前實際工作規則與對齊評估

- 日常入口：`AGENTS.md`；Claude Code 透過 `CLAUDE.md` relative import 載入同一入口。
- 需求、bug、重構與驗證規則原則上先建立 `docs/tasks/TASK-xxx.md`，確認後才實作。
- Copied core assets 是 project-local canonical；workspace pointers 只供查閱與升級比較。
- Web task使用已導入的domain base、requirement/feature skills與task/integration templates；未導入／不可用能力維持core-only fallback。
- 目前對齊評估：Web Stage 1 minimum active set已對齊workspace ref `bad7c60`；project governance structure與source parity `PASS`；Claude runtime `UNKNOWN`；既有offline unit/type-check/production build baseline `PASS`；真實integration、deployment與production readiness `NOT ESTABLISHED`。

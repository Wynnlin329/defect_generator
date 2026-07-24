# Workspace Baseline

## 文件目的

本文件記錄 `defect_generator` 實際採用的 workspace baseline、copied assets、reference-only pointers、未導入項目、domain mapping 與 project-local overrides。它描述2026-07-20 retrofit及TASK-004、TASK-005、TASK-007、TASK-008 project-local upgrades後的現況，不代表未來workspace更新會自動同步到本project。

## 一、目前 Baseline

- Workspace version：`v1.17.0`
- Workspace 版本：`v1.17.0`
- Workspace repo location：`/Users/aissens/Documents/workspace_git/workspace`
- Workspace commit / ref：`21062f8`
- 初次導入日期：`2026-07-20`
- 最近升級日期：`2026-07-24`
- 最近baseline更新日期：`2026-07-24`
- 導入人員：Codex，依使用者確認的retrofit proposal與TASK-004、TASK-005、TASK-007、TASK-008執行
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
- Workspace version：`v1.17.0`
- Workspace commit / ref：`21062f8`
- Workspace source state：正式release `v1.17.0` foundation + workspace changelog `Unreleased` Web Stage 2、Optional visual reference mapping與Project Harness v1.2.1 maintenance fix
- Project harness version：`1.2.1`
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
- Last checked：`2026-07-24`
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
| `shared/domains/web/skills/web-browser-verification/SKILL.md` | `.agents/domain/web/skills/web-browser-verification/SKILL.md` | Web Stage 2 required skill | copied |
| `shared/domains/web/templates/web-browser-verification-report-template.md` | `.agents/domain/web/templates/web-browser-verification-report-template.md` | Web Stage 2 required template | copied |
| `shared/domains/web/checklists/web-browser-verification-checklist.md` | `.agents/domain/web/checklists/web-browser-verification-checklist.md` | Web Stage 2 required checklist | copied |
| `shared/domains/web/skills/web-visual-reference-mapping/SKILL.md` | `.agents/domain/web/skills/web-visual-reference-mapping/SKILL.md` | Web optional visual mapping skill | copied |
| `shared/domains/web/templates/web-visual-reference-mapping-report-template.md` | `.agents/domain/web/templates/web-visual-reference-mapping-report-template.md` | Web optional visual mapping template | copied |
| `shared/domains/web/checklists/web-visual-reference-mapping-checklist.md` | `.agents/domain/web/checklists/web-visual-reference-mapping-checklist.md` | Web optional visual mapping checklist | copied |
| `shared/domains/web/skills/web-runtime-diagnostics/SKILL.md` | `.agents/domain/web/skills/web-runtime-diagnostics/SKILL.md` | Web Stage 2 optional diagnostics | not imported |
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
| `shared/domains/web/README.md` | Web Stage 1 / Stage 2 / Optional visual mapping boundary | `reference-only` | none | 2026-07-24 | pointer-only |

## 三、Domain Mapping

- Primary domain：`web`
- Secondary capabilities：REST API、OAuth、AI model configuration、Canvas image processing、file upload/download、YAML、i18n、frontend testing
- Domain selection rationale：主要交付物與高頻修改面是 browser UI、routing、state、Canvas interaction 與 API binding。
- Task active capability：`TASK-007` Web visual reference mapping smoke + `TASK-008` Project Harness v1.2.1 sync；兩者均為Closed、Tests Passed、Reviewed、Committed。
- Imported core assets：core base、4 skills、6 templates、1 checklist、project harness、Codex/Claude adapters。
- Imported domain assets：Web domain base、4個skills、4個templates、2個checklists。
- Imported domain MVP assets：Stage 1 minimum active set + Stage 2 required set + Optional visual reference mapping三件組。
- Available but not imported：optional `web-runtime-diagnostics`。
- Unavailable domain assets：none for the approved active set。
- Later domain assets not imported：release/readiness、performance、E2E/visual regression/browser matrix、SSR/PWA、native adapters與domain harness。
- Active domain assets in project：11個Web assets。
- Domain assets path：`.agents/domain/web/`。
- Domain assets status：`available / partially imported`
- Fallback behavior：Web tasks使用core + imported Web assets；未導入／不可用能力維持core-only。
- Project-specific overrides：保留既有 Vue/Vite/npm scripts 與 source layout。
- Project-local overrides：`AGENTS.md`、`PLAN.md` 與 `docs/` 記錄 Web/API/Canvas/GPU 專案事實。
- Workspace feedback reports：none。
- Domain upgrade history：2026-07-22 TASK-004導入Web Stage 1最小active set；2026-07-23 TASK-005從ref `fda3769`導入Stage 2 required browser verification set；2026-07-24 TASK-007從ref `280a1c1`導入Optional visual reference mapping並同步active companions。
- Core upgrade history：2026-07-24 TASK-008從workspace ref `21062f8`同步Project Harness v1.2.1，CRLF hygiene scan排除dependency-owned `node_modules/`，project-owned CRLF仍維持FAIL。

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
- Imported domain assets：Web base、requirement/feature/browser-verification/visual-mapping skills、task/integration/browser-report/mapping-report templates與兩個checklists。
- Imported domain MVP assets：Stage 1 minimum active set + Stage 2 required set + Optional visual mapping set，共11個assets。
- Domain assets unavailable：approved active set無缺口；runtime diagnostics available但未匯入。
- Later domain assets not imported：release/readiness、performance、E2E/visual regression/browser matrix、SSR/PWA與native discovery相關能力。
- Fallback behavior：core + imported Web assets；其餘能力core-only。
- Excluded domains：`ios`、`backend`。
- Exclusion rationale：本 repo 不交付 iOS app 或 backend service；API/GPU 是外部依賴。
- Future domain candidates：none；Backend已是formal domain但非本repo交付範圍。
- Workspace feedback reports：none。
- Domain upgrade history：TASK-004 Stage 1 adoption；TASK-005 Stage 2 required browser verification adoption；TASK-007 Optional visual reference mapping adoption。

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
- [x] `scripts/project-check.sh`，Project harness version `1.2.1`。
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
- [x] `.agents/domain/web/` — 已導入base、4個active skills、4個active templates與2個active checklists。

## 七、Project-local Overrides

- Root `AGENTS.md` 補充 Web、API、auth、Canvas、GPU、testing 與 security 規則。
- `README.md`、`PLAN.md` 與 `docs/` 以 repository 現況取代 Vue scaffold 說明。
- Copied core canonical assets只依workspace source同步；project-specific規則不寫入copied core。
- Codex／Claude adapters 都是 thin adapters，不含 workspace absolute path 或 workflow body。

## 八、Not imported

- Web bootstrap／retrofit skills、proposal templates與checklists：initial adoption流程已完成，本次不匯入。
- Optional `web-runtime-diagnostics`：workspace available / project not imported；目前沒有bounded diagnostic question或permission need。
- Web Later assets：release/readiness、performance、E2E/visual regression/browser matrix、SSR/PWA、native adapters與domain harness尚未建立或未導入。
- v1.17.0 core base新增的Domain Opportunity Check只屬bootstrap／retrofit；本project已完成初次導入，因此保留既有snapshot。
- v1.17.0 core `requirement-breakdown`新增Backend routing；本project不交付Backend，因此保留既有snapshot。
- iOS domain assets：domain 不相符。
- Backend domain assets：workspace已正式提供，但backend不是本repo交付物，因此不匯入。
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

- Project harness：`PASS`；`node_modules`維持原位時，`bash scripts/project-check.sh --no-git`與`bash scripts/project-check.sh`均通過（version `1.2.1` / format `1`）。Dependency-owned CRLF被排除，project-owned CRLF仍由workspace regression證明會FAIL。
- Copied asset existence：`PASS`；由 project harness 驗證。
- Web copied asset source parity：`PASS`；11個imported assets均與workspace ref `280a1c1`逐檔一致。
- Retained core snapshot review：`PASS`；v1.17.0 core base與requirement差異只影響初次bootstrap／retrofit及Backend routing，本project active workflow不需同步。
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
- Web task使用已導入的domain base、requirement/feature skills與task/integration templates；visual input關係由`web-visual-reference-mapping`整理，實際browser複驗由`web-browser-verification`產出report-only evidence；runtime diagnostics未導入。
- 目前對齊評估：正式baseline為`v1.17.0`，Web asset adoption ref為`280a1c1`，Project Harness v1.2.1 source ref為`21062f8`；project governance與11個Web assets source parity `PASS`；TASK-006既有證據已完成project-local report-only mapping smoke，兩組關係為`MAPPED`；兩種project harness模式在`node_modules`存在時`PASS`；Claude runtime `UNKNOWN`；既有offline unit/type-check/production build baseline `PASS`；fresh Browser、cross-project、integration、deployment與production readiness不因本次治理升級自動成立。

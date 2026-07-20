# Workspace Baseline

## 文件目的

本文件記錄 `defect_generator` 實際採用的 workspace baseline、copied assets、reference-only pointers、未導入項目、domain mapping 與 project-local overrides。它描述 2026-07-20 retrofit 後的現況，不代表未來 workspace 更新會自動同步到本 project。

## 一、目前 Baseline

- Workspace version：`v1.16.0`
- Workspace 版本：`v1.16.0`
- Workspace repo location：`/Users/aissens/Documents/workspace_git/workspace`
- Workspace commit / ref：`9277b22`
- 導入日期：`2026-07-20`
- 導入人員：Codex，依使用者確認的 retrofit proposal 生成
- 導入方式：`retrofit`
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
- Workspace commit / ref：`9277b22`
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
- Last checked：`2026-07-20`
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
| `shared/core/skills/release-readiness-check/SKILL.md` | `.agents/core/skills/release-readiness-check/SKILL.md` | later core skill | not imported |
| `shared/core/skills/presentation-packaging/SKILL.md` | `.agents/core/skills/presentation-packaging/SKILL.md` | later core skill | not imported |
| `shared/core/templates/agent-delegation-template.md` | `.agents/core/templates/agent-delegation-template.md` | delegation workflow | not imported |
| `shared/domains/web/` | `.agents/domain/web/` | Web domain assets | not imported |
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

## 三、Domain Mapping

- Primary domain：`web`
- Secondary capabilities：REST API、OAuth、AI model configuration、Canvas image processing、file upload/download、YAML、i18n、frontend testing
- Domain selection rationale：主要交付物與高頻修改面是 browser UI、routing、state、Canvas interaction 與 API binding。
- Task active capability：`TASK-001` frontend runtime configuration / auth and API integration；目前為Implemented、build/manual verification pending。
- Imported core assets：core base、4 skills、6 templates、1 checklist、project harness、Codex/Claude adapters。
- Imported domain assets：`not imported`
- Imported domain MVP assets：`not available`
- Unavailable domain assets：workspace `shared/domains/web/`
- Later domain assets not imported：Web base、skills、templates、checklists。
- Active domain assets in project：none。
- Domain assets path：`.agents/domain/web/` intentionally absent。
- Domain assets status：`not available`
- Fallback behavior：`use core assets only`
- Project-specific overrides：保留既有 Vue/Vite/npm scripts 與 source layout。
- Project-local overrides：`AGENTS.md`、`PLAN.md` 與 `docs/` 記錄 Web/API/Canvas/GPU 專案事實。
- Workspace feedback reports：none。
- Domain upgrade history：none。

不建立空的 `.agents/domain/web/`，也不導入 iOS domain assets 假裝具備 Web 規則。

## 四、Domain Decision Record

- Scope of Ownership：本 retrofit 只納管 `defect_generator` repo 的 project-local agent assets、文件、harness 與 hygiene；不修改 workspace shared assets、backend 或既有 `src/**`。
- Target subproject / path：repo root；主要產品路徑為 `src/views/defect_generator_page/`。
- Repository scope：AISVision Vue frontend；目前重點為 Defect Generator。
- Target subproject / path：repo root 與 `src/views/defect_generator_page/`。
- Primary domain：`web`
- Secondary capabilities：auth、REST、AI model orchestration、Canvas、YAML、download。
- Repo-level domains observed：Web frontend、backend API client、AI workflow integration。
- Imported core assets：confirmed minimal core set。
- Imported domain assets：none。
- Imported domain MVP assets：none。
- Domain assets unavailable：Web domain。
- Later domain assets not imported：全部 Web shared assets。
- Fallback behavior：core-only。
- Excluded domains：`ios`、`backend`。
- Exclusion rationale：本 repo 不交付 iOS app 或 backend service；API/GPU 是外部依賴。
- Future domain candidates：Web；須由多 project evidence 與 workspace governance 決定，不由本 retrofit 建立。
- Workspace feedback reports：none。
- Domain upgrade history：none。

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
- [ ] `.agents/domain/web/` — intentionally absent because domain assets are unavailable。

## 七、Project-local Overrides

- Root `AGENTS.md` 補充 Web、API、auth、Canvas、GPU、testing 與 security 規則。
- `README.md`、`PLAN.md` 與 `docs/` 以 repository 現況取代 Vue scaffold 說明。
- 不修改 copied core canonical assets 的內容。
- Codex／Claude adapters 都是 thin adapters，不含 workspace absolute path 或 workflow body。

## 八、Not imported

- Web domain assets：upstream 尚不存在。
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
- 若 workspace 未來建立正式 Web domain，先做 domain upgrade proposal，不直接建立或搬入 `.agents/domain/web/`。

## 十、Validation Status

- Project harness：`PASS`；`bash scripts/project-check.sh --no-git` 與 `bash scripts/project-check.sh` 均通過（version `1.2.0` / format `1`）。
- Copied asset existence：`PASS`；由 project harness 驗證。
- Codex/Claude adapter parity：`PASS`；canonical skills 4、Codex adapters 4、Claude adapters 4。
- Claude runtime verification：`UNKNOWN`。
- Product unit tests：PASS；TASK-001 offline tests 3 files / 16 tests。
- Product type-check：FAIL on既有app/prototype errors；TASK-001 targeted TypeScript PASS。
- Product build：BLOCKED；fresh install缺少`sass-embedded` direct dependency。
- Live backend/GPU validation：未執行，符合安全邊界。

## 十一、目前實際工作規則與對齊評估

- 日常入口：`AGENTS.md`；Claude Code 透過 `CLAUDE.md` relative import 載入同一入口。
- 需求、bug、重構與驗證規則原則上先建立 `docs/tasks/TASK-xxx.md`，確認後才實作。
- Copied core assets 是 project-local canonical；workspace pointers 只供查閱與升級比較。
- Web domain assets unavailable 時維持 core-only fallback，不建立空 domain 目錄。
- 目前對齊評估：project governance structure `PASS`；Claude runtime `UNKNOWN`；產品 build/test `NOT RUN`；production readiness `NOT ESTABLISHED`。

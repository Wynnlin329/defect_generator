# Workspace Baseline

## 文件目的

本文件用來記錄 project 與來源 workspace 版本之間的對應關係，讓後續維護者可以清楚知道：

- project 是基於哪個 workspace 版本導入
- project 是在什麼時間、用什麼方式導入 workspace
- 導入了哪些 core assets
- 導入了哪些 domain assets
- 哪些項目尚未導入
- 哪些規則、templates 或 skills 有 project 本地覆寫
- 後續是否有升級 baseline

本文件描述的是 project 目前實際採用的 baseline 狀態，不是理想狀態。

---

## 一、目前 Baseline

- Workspace 版本：`vX.Y.Z`
- Workspace repo lookup order：
  1. `$WORKSPACE_REPO`
  2. parent of workspace-managed project parking area `../..`（when project is under `workspace/projects/<project-name>/`）
  3. sibling directory `../workspace`
  4. sibling directory `../workspace_git/workspace`
  5. `Workspace repo location` field below
  6. user-provided workspace repo path
- Workspace repo location：
- 導入日期：`YYYY-MM-DD`
- 導入人員：
- 導入方式：
- Project 類型：

導入方式請填寫其一：

- `bootstrap`
- `retrofit`
- `manual adoption`
- `partial adoption`

---

## 二、Workspace References / Pointers

本章記錄 project 指向 workspace canonical assets 的 reference。除非本 baseline 在 copied assets 區塊明確標記，以下 upstream paths 預設只作 reference-only，不代表已複製或導入 project-local `.agents/`。

### 1. Canonical workspace pointers

- Workspace repo lookup order：
  1. `$WORKSPACE_REPO`
  2. parent of workspace-managed project parking area `../..`（when project is under `workspace/projects/<project-name>/`）
  3. sibling directory `../workspace`
  4. sibling directory `../workspace_git/workspace`
  5. `Workspace repo location`
  6. user-provided workspace repo path
- Workspace repo location：
- Workspace version：
- Workspace commit / ref：
- Project harness version：`1.2.0`
- Codex native adapters：`adopted` / `not adopted` / `partial`
- Codex adapter canonical root：`.agents/core/skills/`
- Codex adapter discovery root：`.agents/skills/`
- Claude project-native entry：`adopted` / `not adopted` / `partial`
- Claude entry root：`CLAUDE.md`
- Claude native adapters：`adopted` / `not adopted` / `partial`
- Claude adapter canonical root：`.agents/core/skills/`
- Claude adapter discovery root：`.claude/skills/`
- Claude runtime verification：`PASS` / `WARNING` / `FAIL` / `UNKNOWN`
- Prompt catalog relative path：`docs/prompts/README.md`
- Prompt catalog resolved candidates：
  - `$WORKSPACE_REPO/docs/prompts/README.md`
  - `../../docs/prompts/README.md`
  - `../workspace/docs/prompts/README.md`
  - `../workspace_git/workspace/docs/prompts/README.md`
- Registry path：`shared/registry.md`
- Governance docs path：`docs/governance/`
- Guides path：`docs/guides/`
- Release notes path：`RELEASE_NOTES/`
- Examples path：`docs/examples/`
- Access mode：`reference-only`
- Pointer health：`reachable` / `unavailable` / `unknown`
- Fallback reporting：若 catalog 或對應 prompt 無法讀取，需記錄已嘗試 lookup candidates 與降級依據
- Last checked：`YYYY-MM-DD`
- Notes：

Access mode 請填寫其一：

- `copied`
- `reference-only`
- `partially copied`

> `docs/examples/`、`docs/workspace-proposals/`、dry-run / intake artifacts、workspace release notes 與 governance docs 預設是 reference-only，不應列入 imported core assets、imported domain assets 或 project-local active assets。
> 若未來 workspace canonical Prompt Catalog / Flow Launcher 正式建立，project baseline 只記錄其 path / version / ref；不預設複製完整 catalog 到 project。

### 2. Copied assets

`project-check.sh` 只解析下列 marker 之間的 table。project 實例的 `status` 欄必須填 raw strict enum：copied / overridden / not imported / pointer-only，不加 backticks；模板佔位使用 `<status>`，生成 project baseline 時必須改成最終狀態值。

<!-- copied-assets:BEGIN format=1 -->
| workspace source | project-local path | 分類 | status |
| --- | --- | --- | --- |
| `shared/core/scaffold/project-harness/project-check.sh` | `scripts/project-check.sh` | core scaffold / project harness | copied |
| `shared/core/base/BASE_AGENTS.md` | `.agents/core/base/BASE_AGENTS.md` | core base | <status> |
| `shared/core/templates/task-template.md` | `.agents/core/templates/task-template.md` | core template | <status> |
| `shared/core/templates/agent-delegation-template.md` | `.agents/core/templates/agent-delegation-template.md` | core template / active workflow | <status> |
| generated from `shared/core/templates/codex-project-skill-adapter-template.md` | `.agents/skills/` | Codex native discovery thin adapters | <status> |
| generated from `shared/core/templates/claude-project-entry-template.md` | `CLAUDE.md` | Claude Code project entry thin adapter | <status> |
| generated from `shared/core/templates/claude-project-skill-adapter-template.md` | `.claude/skills/` | Claude Code native discovery thin adapters | <status> |
<!-- copied-assets:END -->

Status 選擇指引：

- `copied`：project 日常 active workflow 會實際使用，且已複製到 project-local path。
- `overridden`：project 日常 active workflow 會使用，但 project-local 副本已刻意覆寫；必須在 Project-local overrides 記錄原因。
- `not imported`：project 不採用該 workflow 或目前不需要該 asset。
- `pointer-only`：只保留 workspace reference，不建立 project-local 副本。
- 若 project 採用 agent dispatch / delegation workflow，`shared/core/templates/agent-delegation-template.md` 是 active workflow core template，預設 copy 到 `.agents/core/templates/agent-delegation-template.md`；不採用時填 `not imported`。
- 若 project 採用 Codex native discovery，為每個 `.agents/core/skills/<name>/SKILL.md` 生成同名 `.agents/skills/<name>/SKILL.md`；adapter 只指向同 repo canonical，不連回 workspace repo。
- 若 project 採用 Claude Code project-native support，生成 root `CLAUDE.md`（只 import `@AGENTS.md`）並為每個 copied core skill 生成同名 `.claude/skills/<name>/SKILL.md`；不得要求 workspace plugin、hooks、settings 或 global config。

### 3. Reference-only assets

| Source workspace asset | Purpose | Access mode | Project-local copy | Last checked | Notes |
| --- | --- | --- | --- | --- | --- |
| `shared/registry.md` | upstream asset index | `reference-only` | none |  |  |
| `docs/governance/` | workspace governance lookup | `reference-only` | none |  |  |
| `docs/guides/` | workspace flow guidance lookup | `reference-only` | none |  |  |
| `RELEASE_NOTES/` | upstream release history lookup | `reference-only` | none |  |  |
| `docs/examples/` | non-formal examples lookup only | `reference-only` | none |  | not imported |
|  |  |  |  |  |  |

---

## 三、Domain Mapping

- Primary domain:
- Secondary capabilities:
- Domain selection rationale:
- Task active capability, if known:
- Imported core assets:
- Imported domain assets:
- Imported domain MVP assets:
- Unavailable domain assets:
- Later domain assets not imported:
- Active domain assets in project:
- Domain assets path:
- Domain assets status:
- Fallback behavior:
- Project-specific overrides:
- Project-local overrides:
- Workspace feedback reports:
- Domain upgrade history:

> 請避免只用程式語言判斷 domain，應以主要交付物、未來高頻任務、主要風險區與後續文件定位需求為準。
> 若 primary domain 已判定但 `shared/domains/<domain>/` 尚未存在，請將 domain assets status 標記為 `not available`，Imported domain assets 標記為 `not imported`，並記錄 fallback behavior 為 `use core assets only`。
> 若 domain 只導入 MVP assets，請明確記錄 imported domain MVP assets、unavailable domain assets 與 later domain assets not imported；不要求 domain full scope 存在。

---

## 四、Domain Decision Record

- Repository scope:
- Target subproject / path:
- Primary domain:
- Secondary capabilities:
- Repo-level domains observed:
- Imported core assets:
- Imported domain assets:
- Imported domain MVP assets:
- Domain assets unavailable:
- Later domain assets not imported:
- Fallback behavior:
- Excluded domains:
- Exclusion rationale:
- Future domain candidates:
- Workspace feedback reports:
- Domain upgrade history:

> 本章記錄實際導入時為什麼選擇此 primary domain、哪些 repo-level domains 被觀察到但未導入，以及 domain assets 不存在時的 fallback。

---

## 五、Core Assets 導入範圍

### 1. Core base

- [ ] `.agents/core/base/BASE_AGENTS.md`

### 2. Core skills

- [ ] `requirement-breakdown`
- [ ] `code-review`
- [ ] `test-case-generation`
- [ ] `release-readiness-check`
- [ ] `technical-documentation`
- [ ] `presentation-packaging`
- [ ] 其他：

### 2.1 Codex native skill adapters

- [ ] `.agents/skills/<name>/SKILL.md` 已依 copied core skills 同名生成
- [ ] adapter canonical target 全部位於同 repo `.agents/core/skills/<name>/SKILL.md`
- [ ] adapter 未包含 workspace absolute path 或 canonical workflow body

### 2.2 Claude Code native entry / skill adapters

- [ ] root `CLAUDE.md` 已依 `claude-project-entry-template.md` 生成，且只用 `@AGENTS.md` relative import 導向 project rules
- [ ] `.claude/skills/<name>/SKILL.md` 已依 copied core skills 同名生成
- [ ] adapter canonical target 全部位於同 repo `.agents/core/skills/<name>/SKILL.md`
- [ ] entry / adapters 未包含 workspace absolute path、plugin / hooks / settings 依賴或 canonical workflow body
- [ ] Claude runtime verification 與 repo-side project check 分開記錄；未執行 fresh-session smoke 時為 `UNKNOWN`

### 3. Core templates

- [ ] `project-agents-template.md`
- [ ] `context-template.md`
- [ ] `architecture-template.md`
- [ ] `requirements-template.md`
- [ ] `task-template.md`
- [ ] `workspace-baseline-template.md`
- [ ] `ado-workitem-template.md`
- [ ] `pr-template.md`
- [ ] `devops-placeholder-convention.md`
- [ ] `agent-delegation-template.md`（若 project 採用 agent dispatch / delegation workflow，預設導入為 copied asset；未採用則列為 not imported）
- [ ] 其他：

### 4. Core scaffold

- [ ] `scripts/project-check.sh`（來源：`shared/core/scaffold/project-harness/project-check.sh`；Project harness version：`1.2.0`）

### 5. Core checklists

- [ ] `project-bootstrap-checklist.md`
- [ ] `project-retrofit-checklist.md`
- [ ] 其他：

---

## 六、Domain Assets 導入範圍

### Domain 1

- Domain name：
- Domain base：
- Domain skills：
- Domain templates：
- Domain docs created：
- Imported domain MVP assets：
- Unavailable domain assets：
- Later domain assets not imported：
- Domain assets status：
- Fallback behavior：
- Not imported：
- Project-local overrides：
- Workspace feedback reports：
- Domain upgrade history：
- Notes：

### Domain 2

- Domain name：
- Domain base：
- Domain skills：
- Domain templates：
- Domain docs created：
- Imported domain MVP assets：
- Unavailable domain assets：
- Later domain assets not imported：
- Not imported：
- Project-local overrides：
- Workspace feedback reports：
- Domain upgrade history：
- Notes：

---

## 七、已採用的 Project 結構

### 必要路徑

- [ ] `.agents/core/base/`
- [ ] `.agents/core/skills/`
- [ ] `.agents/core/templates/`
- [ ] `.agents/skills/`（Codex native discovery thin adapters；採用時）
- [ ] `.claude/skills/`（Claude Code native discovery thin adapters；採用時）
- [ ] `.agents/domain/<domain>/base/`
- [ ] `.agents/domain/<domain>/skills/`
- [ ] `.agents/domain/<domain>/templates/`
- [ ] `AGENTS.md`
- [ ] `CLAUDE.md`（Claude Code project-native support 採用時）
- [ ] `PLAN.md`
- [ ] `docs/context.md`
- [ ] `docs/architecture.md`
- [ ] `docs/requirements.md`
- [ ] `docs/tasks/`
- [ ] `docs/workspace-baseline.md`

### Optional / domain-specific paths

- [ ] active domain docs：
- [ ] active domain checklists：
- [ ] active domain specs：
- [ ] 其他：

---

## 八、本地覆寫情況

### 1. 規則覆寫

- 無
-

### 2. Template 覆寫

- 無
-

### 3. Skill 覆寫

- 無
-

### 4. Domain 覆寫

- 無
-

---

## 九、尚未導入項目

- 無
-

---

## 十、目前實際工作規則

至少建議說明：

1. 新需求是否原則上先建立或更新 task
2. task 建立後是否預設先停下確認
3. 新文件是否優先依 `.agents/core/templates/` 建立
4. domain-specific 文件是否依 `.agents/domain/<domain>/templates/` 建立
5. 既有文件是否僅作為歷史脈絡參考
6. 高風險變更是否需要額外人工覆核

---

## 十一、升級歷史

### 升級紀錄 1

- 日期：
- 從：
- 升級到：
- 範圍：
- Workspace reference / pointer changes：
- Domain upgrade history：
- 對應 workspace feedback reports：
- 備註：

---

## 十二、目前對齊評估

### 狀態

請填寫其一：

- `aligned`
- `mostly aligned`
- `partially aligned`
- `legacy / not aligned`

### 備註

-

---

## 十三、維護說明

當上游 workspace 發布新版本時，至少應檢查：

1. 新版是否有破壞性規則變更
2. project 是否需要同步更新 `.agents/core/templates/`
3. project 是否需要同步更新 `.agents/domain/<domain>/`
4. task / template / baseline 規則是否仍一致
5. 是否需要補新的 project 或 domain 文件
6. 是否需要更新本檔的升級歷史與目前對齊評估
7. Workspace References / Pointers 是否仍可存取，且 copied assets / reference-only assets 是否仍分類正確

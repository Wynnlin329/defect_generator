# Task Template

## 文件目的

本文件用於描述單次任務的背景、範圍、目標、驗收方式、風險與限制，作為本次任務執行的直接依據。

本模板只提供通用 task 欄位；core task template 不應寫死任何特定 domain 的欄位，domain-specific 欄位應由 active domain template 補充。

建議落地位置：

- project root 的 `docs/tasks/TASK-xxx.md`
- project-local `.agents/core/templates/task-template.md` 副本

## Routing Guard

使用本模板前，先確認任務類型：

- 若任務是單一 project 的功能、bug fix、文件、release、DevOps 文案或一般需求拆解，使用本模板。
- 若任務是維護 workspace repo 本身，例如 shared core、domain、skill、template、checklist、governance 或 changelog flow，改用 `workspace-task-template.md`。
- 若任務是新增或調整 `shared/domains/<domain>/`，還應搭配 `domain-integration-proposal-template.md`。
- 若目前人在 workspace root，但任務目標是單一 project 的產品或 project-local `.agents/`，應先切到目標 project root，再依該 project 的 `AGENTS.md` 與本模板工作。
- 不得用本模板記錄 workspace repo 的正式 shared/core/domain 變更；那類變更必須使用 `workspace-task-template.md`，並由 `workspace-development` flow 管理。

> Template 優先原則：建立新的 `docs/tasks/TASK-xxx.md` 時，應以本模板為主要結構來源。既有 task 可作為內容參考，但不可取代 template 欄位。

> 建立時機原則：本文件原則上應在實作前建立或更新，作為本次任務的直接依據，而不是事後報告。

> 確認停點原則：建立或大幅更新本 task 後，預設應先停下來讓使用者確認；只有使用者明確要求「直接實作」時，才可略過此停點。

> Compliance 檢查原則：建立、更新或 closure review 本 task 時，可使用 `.agents/core/checklists/task-template-compliance-checklist.md` 進行人工合規檢查。該 checklist 不是 parser、linter 或自動化 harness。

---

## 一、基本資訊

- 任務編號：
- 任務名稱：
- 任務類型：
- 建立日期：
- 最後更新日期：
- 任務負責人：
- 優先級：
- Task status：
- Verification status：
- Review status：
- Repo status：

### 1.1 Status Rules

> `Task status` 只描述任務本身進度，不混入 build、manual verification、review 或 git 狀態。
> `Verification status` 只描述驗證完成度。
> `Review status` 只描述使用者確認、人工 review 或變更要求。
> `Repo status` 只描述 task 文件與相關修改是否已進 git / PR。

允許值建議：

- Task status：`Draft` / `Ready` / `In Progress` / `Implemented` / `Closed` / `Blocked` / `Cancelled`
- Verification status：`Not Run` / `Build Passed` / `Tests Passed` / `Manual Pending` / `Manual Passed` / `Blocked` / `N/A`
- Review status：`Not Requested` / `Pending Confirmation` / `Pending Review` / `Reviewed` / `Changes Requested` / `N/A`
- Repo status：`Untracked` / `Uncommitted` / `Committed` / `PR Opened` / `Merged` / `N/A`

常見組合：

- 需求草稿尚未確認：
  - Task status：`Draft`
  - Verification status：`Not Run`
  - Review status：`Pending Confirmation`
  - Repo status：依實際狀態填 `Untracked` / `Uncommitted` / `Committed`
- 已實作且 build 通過，但尚待實機或人工驗證：
  - Task status：`Implemented`
  - Verification status：`Build Passed / Manual Pending`
  - Review status：`Pending Review`
- 只有驗收條件、必要驗證與 review 條件都處理完，才可標記：
  - Task status：`Closed`

---

## 二、Domain Context

### 2.1 Domain Mapping

- Primary domain：
- Secondary capabilities：
- Domain selection rationale：
- Active domain：

### 2.2 Task Active Capability

- Project primary domain：
- Task active capability：
- Capability rationale：
- Does this task change project primary domain? yes/no
- If yes, rationale：

> 單次 task 偏 API / storage / cache，不代表 project primary domain 要改成 backend。iOS App 的 API / cache task 應保持 project primary domain = `ios`，task active capability 可為 API integration / DTO mapping / local cache。frontend / admin UI 的 API dependency 不代表 primary domain = `backend`。

### 2.3 Imported Assets

- Imported core assets：
- Imported domain assets：
- Project-specific overrides：

### 2.4 Domain-specific Inspection

- Domain-specific files to inspect：
  -
- Domain-specific rules to apply：
  -
- Domain-specific risks to check：
  -
- Domain-specific validation：
  -

### 2.5 Domain Context Checklist

- [ ] 已讀取 project 的 domain mapping
- [ ] 已確認本任務 active domain
- [ ] 已確認 task active capability
- [ ] 已確認本 task 是否改變 project primary domain
- [ ] 已檢查 project-local core 規則
- [ ] 已檢查 project-local active domain 規則
- [ ] 已列出 domain-specific files to inspect
- [ ] 已列出 domain-specific risks to check
- [ ] 已列出 domain-specific validation

---

## 三、DevOps 對應資訊

若本任務後續會由使用者手動建立 Azure DevOps Work Item / Pull Request，請補充以下資訊。

> 若本任務採手動 Azure DevOps 流程，建立或更新本 task 時，必須同步依 project 已導入的 core DevOps template 建立 `docs/devops/workitems/*.md`。

> 若本任務預期會產生 PR，必須同步依 project 已導入的 core PR template 建立 `docs/devops/prs/*.md`。

> 預設 template 來源為 `.agents/core/templates/ado-workitem-template.md` 與 `.agents/core/templates/pr-template.md`。若 project 有覆寫版本，應以 project-local override 為準。

- Work Item 類型：
- Work Item ID：`<WORK_ITEM_ID>`
- Work Item 標題：
- PR 類型：
- PR 標題：`<PR_TITLE>`
- 建議 branch 名稱：`<BRANCH_NAME>`
- 建議 commit message：
- 若暫不建立 Work Item 草稿，原因：
- 若暫不建立 PR 草稿，原因：

---

## 四、背景說明

- 背景：
- 問題描述：
- 任務來源：
- 使用者情境 / 觸發路徑：

---

## 五、任務目標

1.
2.
3.

---

## 六、本次範圍

1.
2.
3.

---

## 七、不在本次範圍

1.
2.
3.

---

## 八、影響範圍

- 影響模組：
- 影響流程：
- 影響資料：
- 影響外部系統 / 整合點：
- 影響文件：
- 相容性風險：
- domain-specific 影響：

---

## 九、預期修改點

> 若目前資訊不足，應明確標示為「待確認」，而不是直接假設。

- 優先閱讀檔案：
- 預期修改模組：
- 預期修改層級：
- 預期修改檔案 / 路徑：
- 可能連動修改檔案：
- 明確不應優先修改的區塊：
- 修改點定位理由：
- 需同步檢查的測試：
- 需同步檢查的文件：

---

## 十、輸入、輸出與任務附件

- 輸入：
- 輸出：

### 10.1 Task Artifacts / Visual References

> 若任務依賴圖片、截圖、標註圖、目標畫面、sample data、log、影片、設計稿或其他附件，應把附件落地在 project-local repo 可追蹤的位置，或記錄可穩定取得的 repo-relative / external reference。不要只依賴聊天附件。
>
> 當 task 明確依賴可提交附件，且 agent 可取得原始檔或本機路徑時，必須建立或使用 `docs/tasks/TASK-xxx-assets/`，將附件落地並在本章引用。只有大型檔案、授權素材、敏感 / 私有資料、外部系統文件或 agent 無法取得原始檔時可例外；例外時必須記錄不可 commit / 不可取得原因與後續補件方式。

建議位置：

- `docs/tasks/TASK-xxx-assets/`

- Artifact directory：
- Visual references：

| File | Purpose | Source / Date | How to use |
| --- | --- | --- | --- |
|  |  |  |  |

- Data / fixture references：

| File | Purpose | Source / Date | How to use |
| --- | --- | --- | --- |
|  |  |  |  |

- External / non-committed references：

| Reference | Reason not committed | Access / owner | How to use |
| --- | --- | --- | --- |
|  |  |  |  |

- Artifact handling checklist：
  - [ ] 若 task 明確依賴可提交附件，且 agent 可取得原始檔或本機路徑，已建立或使用 `docs/tasks/TASK-xxx-assets/`
  - [ ] 若 task 依賴附件，已記錄 repo-relative path 或穩定 external reference
  - [ ] 每個 artifact 已說明用途、來源 / 日期與使用方式
  - [ ] 必讀圖片、截圖、標註圖或目標畫面沒有只存在聊天附件
  - [ ] 不適合 commit 的大型、授權、敏感、私有、外部系統 artifact，或 agent 無法取得原始檔的附件，已改用 external reference / 補件記錄並說明原因
  - [ ] project artifact 未放入 workspace shared/core 或 shared/domain asset path

---

## 十一、驗收標準

1.
2.
3.

---

## 十二、驗證方式

若本次任務涉及程式碼修改，至少應列出一次對應層級的 build / typecheck 驗證方式與結果。若無法執行，應明確記錄阻塞原因、未驗證風險與替代驗證方式。

- 單元測試：
- 整合測試：
- End-to-end / flow 測試：
- 手動驗證：
- 文件檢查：
- domain-specific validation：

---

## 十三、風險、限制與假設

- 已知風險：
- confirmed domain-specific risks：
- 已知限制：
- 假設前提：
- 人工覆核需求：

---

## 十四、建議技能

### Core skills

- skill：
- 使用理由：

### Domain skills

- skill：
- 使用理由：

### Project-specific skills

- skill：
- 使用理由：

---

## 十五、DevOps 文案草稿摘要

> 完整草稿應落地到 `docs/devops/workitems/*.md` 或 `docs/devops/prs/*.md`。本章只保留摘要、連結與未建立原因。

- Work Item 草稿位置：
- PR 草稿位置：
- 文件同步提醒：

---

## 十六、相關文件與參考

### Project entry

- `README.md`
- `AGENTS.md`
- `PLAN.md`

### Project docs

- `docs/workspace-baseline.md`
- `docs/requirements.md`
- `docs/context.md`
- `docs/architecture.md`

### Project-local core assets

- `.agents/core/base/BASE_AGENTS.md`
- `.agents/core/skills/`
- `.agents/core/templates/`

### Project-local active domain assets

- `.agents/domain/<domain>/base/DOMAIN_AGENTS.md`
- `.agents/domain/<domain>/skills/`
- `.agents/domain/<domain>/templates/`

### 其他

-

---

## 十七、任務結尾檢查

> 任務完成前，應回填本章。若本任務只是需求拆解、文件整理或事後回補，仍應標示適用 / 不適用與原因。

### 17.1 實際修改摘要

- 實際新增檔案：
- 實際修改檔案：
- 實際未修改但已確認無需修改的檔案：
- 與原預期不同之處：
- 未納入本次處理但需記錄的項目：

### 17.2 驗收與驗證結果

- 驗收標準完成情況：
- 已執行驗證：
- 驗證結果：
- 無法執行的驗證：
- 未驗證風險：
- 替代檢查方式：
- domain-specific validation 結果：

### 17.3 文件與 DevOps 同步

- 是否需更新 README / PLAN / docs：
- 是否已更新 task：
- 是否已更新 Work Item 草稿：
- 是否已更新 PR 草稿：
- 是否需補 commit message / release note：
- 未同步項目與原因：

### 17.4 風險、後續與回補

- 剩餘風險：
- 人工覆核需求：
- 後續 task：
- 是否發現 shared/core/domain 缺口：
- 是否需建立 WGAP：
- 是否有 lessons learned / change pattern 候選：
- 若有，建議依 `.agents/core/templates/project-learning-record-template.md` 建立：
  - `docs/lessons/LEARN-xxx.md`
  - `docs/change-patterns/PATTERN-xxx.md`
- 若候選內容可能屬於 shared/core/domain 缺口，應建立或建議建立 WGAP，不直接修改 workspace。

### 17.5 Closure Decision

> Closure Decision 更新時，必須同步更新第一章的 `Task status`、`Verification status`、`Review status` 與 `Repo status`。

- Final Task status：
- Final Verification status：
- Final Review status：
- Final Repo status：
- [ ] 可關閉
- [ ] 有條件關閉，需列出條件
- [ ] 不可關閉，需補工作
- 結論：

---

## 十八、執行紀錄

### 第一次處理

- 日期：
- 處理內容：
- 結果：

---

## 十九、更新紀錄

### v0.1

- 初版建立

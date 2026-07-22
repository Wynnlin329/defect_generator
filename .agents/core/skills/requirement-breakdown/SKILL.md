---
name: requirement-breakdown
description: 用於將模糊需求拆解為功能清單、子任務、驗收標準、待確認事項、風險假設，並依 project domain mapping 讀取 active domain 補充規則。
---

# Requirement Breakdown Skill

## 文件目的

本技能用於將模糊、口語化或尚未結構化的需求，整理成可執行的開發輸入，供後續分析、設計、實作與測試使用。

本技能是 platform/core 層的 requirement breakdown workflow，適用於跨 project 共用情境，不負責處理特定 project 的業務細節，也不內建特定 domain 的修改定位細節。

若 project 已導入 domain mapping，需求拆解時必須讀取 active domain，並依 domain skill 補充 domain-specific 修改點、風險與驗證建議。

若 primary domain 或 active domain = `ios`，應讀取：

- `workspace/shared/domains/ios/base/DOMAIN_AGENTS.md`
- `workspace/shared/domains/ios/skills/ios-requirement-breakdown/SKILL.md`

若 primary domain 或 active domain = `web`，應讀取：

- `workspace/shared/domains/web/base/DOMAIN_AGENTS.md`
- `workspace/shared/domains/web/skills/web-requirement-breakdown/SKILL.md`

---

## 一、適用時機

當出現以下情況時，應優先考慮使用本技能：

1. 使用者提出新需求，但描述仍偏口語或不夠明確
2. 任務範圍看似清楚，但尚未拆成可執行項目
3. 需要先整理驗收標準，才能進入設計或開發
4. 需要先盤點不確定事項與假設
5. project 剛接手，需要先理解某個需求區塊
6. 需要先判斷某個任務大致會影響哪些 module / flow / data path
7. 需要為 `docs/tasks/TASK-xxx.md` 產出初版內容

---

## 二、輸入內容

本技能的輸入可包含以下任一或多項：

- 使用者 prompt
- `README.md`
- `AGENTS.md`
- `docs/workspace-baseline.md`
- `docs/requirements.md`
- `docs/context.md`
- `docs/architecture.md`
- `docs/tasks/TASK-xxx.md`
- `.agents/core/templates/task-template.md`
- `.agents/core/templates/project-learning-record-template.md`
- `.agents/core/checklists/task-template-compliance-checklist.md`
- 會議紀錄
- issue 描述
- 既有規格文件
- project 背景文件
- active domain 對應文件

執行需求拆解前，必須讀取 project 已導入的 domain mapping。建議來源包含：

- `docs/workspace-baseline.md`
- `AGENTS.md`
- `.agents/domain/`

若 project 尚未記錄 primary domain 與 secondary capabilities，應先標示為文件缺口，不得只依程式語言或檔案副檔名推定 domain。

---

## 三、Active Domain Hook

若 project 已記錄 primary domain 或本次任務可判斷 active domain，應讀取對應 domain 文件與 domain skill。

通用讀取順序建議：

1. `docs/workspace-baseline.md`
2. `AGENTS.md`
3. `.agents/domain/<domain>/base/DOMAIN_AGENTS.md`
4. `.agents/domain/<domain>/skills/<domain-specific-skill>/SKILL.md`（若存在）
5. domain-specific project 文件

若 primary domain / active domain = `ios`，應讀取 `ios-requirement-breakdown`，由該 skill 補充 iOS 專屬修改點定位、文件與風險。

若 primary domain / active domain = `web`，應讀取 `web-requirement-breakdown`，由該 skill 補充 UI states、route / data boundary、security、accessibility、responsive 與 Web validation acceptance。

一般 project task 仍應使用 project-local core assets 與 active domain assets：

- `.agents/core/base/BASE_AGENTS.md`
- `.agents/core/templates/`
- `.agents/domain/<domain>/`（若存在）

若任務中發現 core/domain template、skill、checklist 或 baseline 規則不足，應建立 workspace gap report，而不是在 project 目錄下直接修改 workspace shared。

建議使用：

- `project-workspace-feedback`
- `docs/workspace-feedback/WGAP-xxx.md`

若缺口只是 project-specific，先保留 project-local workaround，並在 task 或 WGAP 中標示不應升級為 shared。

---

## 四、輸出內容

執行本技能後，應至少輸出：

1. 需求摘要
2. 功能清單
3. 子任務拆解
4. 驗收標準
5. 待確認事項
6. 假設與前提
7. 風險與依賴
8. 已讀取或缺失的 domain mapping
9. active domain 與 domain-specific 補充
10. 修改點定位建議（若上下文足夠）
11. 任務文件建議落點（若適用）
12. DevOps 文案建議（若適用）
13. 文件同步提醒（若適用）
14. 任務結尾檢查與 learning record 銜接提醒（若適用）

### 修改點定位建議

若 project 上下文足夠，應盡量指出：

- 優先閱讀的模組 / 檔案
- 預期修改點
- 可能連動修改點
- 明確不建議優先修改的區塊
- 可能需同步更新的文件與測試
- active domain 的風險與驗證建議

domain-specific 的定位細節應由 domain skill 補充。

### DevOps 文案建議

若此需求後續預期會由使用者手動建立 Azure DevOps Work Item 或 Pull Request，則輸出中應視情況一併提供：

- 建議的 Work Item 類型與標題
- 建議的 Work Item 描述草稿
- 建議的 PR 標題
- 建議的 PR 描述草稿
- 建議的 commit message
- 需由使用者手動補入的 placeholder 欄位
- 文件同步提醒

若需求已足夠形成 `docs/tasks/TASK-xxx.md`，且本次任務採手動 Azure DevOps 流程，則不得只在 task 文件中保留 DevOps 摘要。建立或更新 task 時，應同步建立：

- `docs/devops/workitems/*.md`
- `docs/devops/prs/*.md`（若本任務預期會產生 PR）

若暫不建立 PR 草稿，必須在 task 或輸出摘要中說明原因。

---

## 五、執行原則

### 1. 先整理需求，不急著設計解法

本技能的主要目的不是直接產出技術方案，而是先把需求整理清楚。

### 2. 不把推測寫成已確認事實

若使用者未明確說明，應使用「可能」、「待確認」、「目前假設」等字樣。

### 3. 優先拆成可執行項目

拆解結果應盡量能直接被後續設計、開發、測試與文件更新使用。

### 3.1 若需求已足夠形成單次任務，應優先落成 task 文件

若需求已足夠形成單次任務，應優先將拆解結果落成 `docs/tasks/TASK-xxx.md`，並在實作前完成最小必要內容。

若需求其實是在維護 workspace repo 本身，例如 shared core、domain、skill、template、checklist、governance 或 changelog flow，不應建立 project task；應改走 `workspace-development`，並使用 `workspace-task-template.md`。

若目前工作目錄是 workspace root，但需求目標是單一 project 的產品、文件、DevOps 文案、release 或 project-local `.agents/`，應先切到 project root，再使用 project-local `AGENTS.md`、`.agents/core/templates/task-template.md` 與 active domain assets。

反之，若需求目標是 workspace repo 的 shared/core/domain/template/checklist/governance 變更，不得落成 `docs/tasks/TASK-xxx.md`；應落成 `docs/workspace-tasks/WTASK-xxx.md`，並交由 `workspace-development` flow 管理。

對功能需求、bug 修正、流程調整、驗證規則調整等任務，不建議先修改程式碼再補 task。

除非屬於以下例外情況，否則應以「先 task、後實作」為預設流程：

- 緊急 hotfix
- 使用者明確要求先快速修改
- 既有歷史變更回補文件
- 純文件整理任務

若屬例外而需事後補 task，應在 task 文件中明確標示為「事後回補」。

建立或更新 task 時，應保留 `task-template.md` 的任務結尾檢查章節，讓後續實作角色可回填：

- 實際修改點
- 驗收與驗證結果
- 文件 / DevOps 同步狀態
- 剩餘風險與人工覆核
- WGAP 判斷
- lessons learned / change pattern 候選

建立或更新 task 狀態時，應使用 `Task status`、`Verification status`、`Review status`、`Repo status` 四個欄位分別描述任務進度、驗證完成度、人工 review 與 git / PR 狀態，不得回退成單一 `狀態` 欄位或把 build、manual verification、review、repo 狀態混入 `Task status`。更新 Closure Decision 時，必須同步更新第一章的四個 status 欄位。

若任務完成後產生 lessons learned 或 change pattern 候選，應使用 project-local `project-learning-record-template.md` 建立記錄，建議位置：

- `docs/lessons/LEARN-xxx.md`
- `docs/change-patterns/PATTERN-xxx.md`

若 learning candidate 其實代表 shared/core/domain 缺口，應建立或建議建立 WGAP，不直接修改 workspace shared assets。

若 project 已導入 `task-template-compliance-checklist.md`，建立或大幅更新 task 後，應使用該 checklist 做人工 template compliance 檢查。此檢查只確認 project task 結構與欄位完整性，不是 parser、linter 或自動化 harness。

### 3.1.1 task 與 Work Item 的對應原則

若 project 採使用者手動建立 Azure DevOps Work Item 的流程，則 `docs/tasks/TASK-xxx.md` 與實際手動建立的 Work Item 原則上應採 1:1 對應。

本技能在建立或更新 task 文件時，應同步建立或明確處理：

- 對應的 Work Item 文字稿：`docs/devops/workitems/*.md`
- 對應的 PR 文字稿草稿：若本任務預期會產生 PR，建立 `docs/devops/prs/*.md`
- commit message 建議
- 文件同步提醒

不得只在 task 文件內保留 DevOps 摘要。若暫不建立 PR 文字稿，必須明確說明原因。

agent 不負責真的建立 Work Item / PR，只負責產出可直接貼上的文字內容。

若 task artifacts 包含 UI / flow 的 before、after、target 或 review 圖，且本任務預期會產生 PR，PR 文字稿應在 screenshots / review evidence 區塊引用 task artifact 的 repo-relative path；不要讓 PR reviewer 只能回頭查聊天附件。

### 3.1.2 task artifacts 與 visual references

若使用者提供圖片、截圖、標註圖、目標畫面、sample data、log、影片、設計稿或其他附件，且這些附件是後續 task 執行必讀 context，建立或更新 task 時應同步處理 artifact reference。

必要規則：

- 當 task 明確依賴可提交附件，且 agent 可取得原始檔或本機路徑時，必須建立或使用 project-local `docs/tasks/TASK-xxx-assets/`，將附件落地並在 task 中引用。
- 在 `docs/tasks/TASK-xxx.md` 的「輸入、輸出與任務附件」章節記錄 repo-relative path、用途、來源 / 日期與使用方式。
- 若附件不適合 commit，例如大型檔案、授權素材、敏感資料、私有截圖、外部設計稿或外部系統文件，改記錄穩定 external reference、取得條件、owner 與不可 commit 原因。
- 不要讓 task 必讀圖片、截圖、標註圖、目標畫面或 sample data 只存在聊天附件。
- 不得把單一 project 的 task artifacts 放入 workspace `shared/core`、`shared/domains` 或其他 workspace formal asset path。

若目前環境無法直接取得聊天附件原始檔，應在 task 中明確標示缺少的 artifact 與需要使用者補交的位置，而不是假設附件內容。

### 3.2 建立 task 後的預設處理方式

當需求已足夠形成單次任務，且已建立或更新 `docs/tasks/TASK-xxx.md` 後，預設應詢問使用者是否要先確認 task。

- 若使用者選擇確認，則先停止於 task 階段。
- 若使用者選擇不確認，則可依 task 直接進入實作。
- 若使用者在需求一開始已明確表示直接執行，則可在建立 task 後不額外停下。

若任務屬於高風險、跨多模組、需求仍有待確認，或修改後可能明顯改變既有行為，應更傾向先停下等待使用者確認。

### 3.3 新 task 文件應以 template 為主，不以既有 task 為主

當 project 內已存在 `docs/tasks/TASK-xxx.md` 時，建立新的 task 文件仍應優先依 `.agents/core/templates/task-template.md` 生成；若 active domain 有補充 task template，應同步依 `.agents/domain/<domain>/templates/` 補充 domain-specific sections。

既有 task 文件僅可作為以下用途的參考：

- project 語境
- 用語風格
- 歷史決策脈絡
- 已確認的模組命名或流程名稱

既有 task 文件不可取代 template 的欄位結構。

若既有 task 與 template 不一致，應以 template 為主，再視需要補入 project 特有內容。

### 3.4 Work Item / PR 文案也應以 template 為主

若 project 內已存在：

- `.agents/core/templates/ado-workitem-template.md`
- `.agents/core/templates/pr-template.md`
- `.agents/core/templates/devops-placeholder-convention.md`

則在產出 Work Item / PR 文案時，應優先依上述模板與 placeholder 規則生成。

既有 Work Item 或 PR 歷史文案可作為語氣、術語與 project 慣例參考，但不可取代 template 的欄位結構。

若既有歷史文案與 template 不一致，應以 template 為主。

### 4. 優先對應到實際模組或文件

若已知 project 模組結構，應嘗試指出：

- 可能影響模組
- 可能需更新文件
- 可能需補測試位置

若已導入 active domain，應由 domain skill 補充 domain-specific 定位資訊。

### 5. 範圍不明時，要主動標示不在範圍

應盡量協助界定這次任務不做什麼，避免後續範圍失控。

### 6. 修改點定位應先粗後細

若資訊有限，可先從 module / flow 層級指出可能落點；若資訊充足，再進一步細化到檔案 / 路徑 / 類別層級。

### 7. 不因單一需求直接推導大規模重構

若需求本身只要求局部調整，不應直接把拆解結果擴大成架構重做，除非上下文明確顯示這是必要前提。

---

## 六、若需產出 task 文件，應補充的內容

若本技能的輸出將直接用於建立或更新 `docs/tasks/TASK-xxx.md`，應盡量補出：

- active domain
- domain-specific files to inspect
- domain-specific risks
- domain-specific validation checklist
- 優先閱讀檔案
- 預期修改模組
- 預期修改層級
- 預期修改檔案 / 路徑
- 可能連動修改檔案
- 不應優先修改的高風險區
- 需同步檢查的測試
- 需同步檢查的文件

若 project 採使用者手動建立 Azure DevOps Work Item / PR 的流程，則 task 文件對應輸出並應盡量補出：

- 建議 Work Item 類型
- 建議 Work Item 標題
- 建議 PR 類型
- 建議 PR 標題
- 建議 commit message
- placeholder 欄位
- 需同步更新的文件清單
- Work Item 詳細文案位置：`docs/devops/workitems/*.md`
- PR 詳細文案位置或暫不建立原因：`docs/devops/prs/*.md`
- 任務結尾檢查章節保留狀態
- task-template-compliance-checklist 檢查結果或不適用原因
- learning record 建議位置或不建立原因

---

## 七、完成條件

符合以下條件可視為完成：

- 已將需求整理成可執行項目
- 已列出驗收標準
- 已明確標示待確認事項
- 已列出主要風險與假設
- 已讀取 project domain mapping，或已明確標示 domain mapping 缺口
- 已依 active domain 讀取 domain skill，或已明確標示 domain skill 缺口
- 若發現 shared/core/domain 缺口，已建立或建議建立 WGAP
- 若建立 / 更新 task，已保留任務結尾檢查章節
- 若 project 已導入 task template compliance checklist，已完成檢查或說明不適用原因
- 若有 lessons learned / change pattern 候選，已建議 project-local learning record 或說明不建立原因
- 後續角色可直接使用輸出進行下一步工作

若上下文足夠，並建議再加上：

- 已指出主要 module / flow
- 已指出可能修改的責任層
- 已指出高風險連動區
- 已指出建議同步檢查的測試與文件

---

## 八、不適用情境

以下情況不適合只使用本技能處理：

1. 已有非常明確的技術設計，只差程式實作
2. 已進入純 code review 或純測試階段
3. 任務目標是上線前檢查
4. 任務核心是建立新 project 骨架

上述情況應改用其他技能。

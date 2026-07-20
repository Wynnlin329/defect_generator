---
name: technical-documentation
description: 用於根據需求、架構、程式碼、測試與任務內容，整理並產出技術說明文件、設計文件、維運文件、交接文件或版本摘要。
---

# Technical Documentation Skill

## 文件目的
本技能用於將專案知識、任務成果、系統變更或技術細節，整理成可閱讀、可交付、可維護的技術文件。

本技能適用於跨專案共用情境，主要負責「如何整理與產出技術文件」，不負責承載某個專案本身的背景事實。
專案背景、模組資訊、架構限制與技術細節，應以該專案自己的文件與程式碼為準。

本技能主責為**文件整理**；若任務核心是整理正式簡報頁面結構、頁面重點、可視化建議與講述方式，應優先使用 `presentation-packaging`。

當任務需要產生 HTML deck、infographic、prototype、visual guide 或高視覺化展示素材時，
可以委派 huashu-design skill 處理視覺設計與輸出。

---

## 一、適用時機

當出現以下情況時，應優先考慮使用本技能：

1. 新功能完成後，需要補齊技術文件
2. 架構、資料流、API 或模組設計有變更，需要整理說明
3. 專案準備交接，需要整理交接文件
4. 需要產出給工程團隊、維運人員或管理者閱讀的技術摘要
5. 需要把零散資訊整理成結構化文件
6. 版本釋出前，需要補充 release summary 或變更說明
7. 需要整理可由使用者手動貼上的 Work Item、PR、release 或文件同步說明文字稿

---

## 二、輸入內容

本技能輸入可包含以下任一或多項：

- `README.md`
- `AGENTS.md`
- `PLAN.md`
- `docs/requirements.md`
- `docs/context.md`
- `docs/architecture.md`
- `docs/conventions.md`
- `docs/tasks/TASK-xxx.md`
- 相關程式碼
- 相關測試內容
- 變更摘要
- issue / bug 描述
- log / 執行紀錄
- 使用者補充說明
- `.agents/core/templates/devops-placeholder-convention.md`
- `.agents/core/templates/ado-workitem-template.md`
- `.agents/core/templates/pr-template.md`

若輸入內容不足，應先指出：

- 資訊缺口
- 待確認事項
- 暫時假設前提


不得將推測直接寫成最終正式結論。

---

## 三、主要可產出文件類型

本技能可依任務需求，輸出以下一種或多種文件型態：

### 1. design-doc
用於整理系統設計、模組邊界、技術選型、資料流與設計取捨。

### 2. technical-spec
用於整理功能規格、模組規格、API 行為、資料格式與邏輯規則。

### 3. runbook
用於整理啟動方式、操作步驟、排查方式、常見問題與回復建議。

### 4. handover-note
用於整理專案現況、已完成事項、未完成事項、風險、後續建議與接手入口。

### 5. release-summary
用於整理本次版本做了什麼、改動範圍、風險、驗證結果與上線注意事項。

### 6. devops-doc
用於整理可由使用者手動貼上的 Work Item、Pull Request、release 補充文案、文件同步說明或其他 DevOps 相關文字稿。

此類文件的目的不是直接操作外部系統，而是提供：

- 可直接貼上的 Work Item 文案
- 可直接貼上的 PR 文案
- release 相關摘要
- 文件同步提醒
- placeholder 一致的待補欄位

> 若任務後續需要做簡報，可在文件末段補充「可轉成簡報的主題切分與重點摘要」；但若任務本身是整理正式簡報大綱，應改用 `presentation-packaging`。

---

## 四、輸出內容要求

不論輸出哪一種文件型態，都應盡量包含以下觀念：

### 1. 先描述事實
優先整理已知事實，例如：

- 目前系統如何運作
- 本次做了哪些修改
- 涉及哪些模組
- 已知限制是什麼

### 2. 再描述推論或建議
若有推論或建議，應清楚區分：

- 已確認內容
- 推測內容
- 建議內容

### 3. 需標示待確認事項
若資訊不足，應列出待確認事項，而不是省略。

### 4. 需標示風險與限制
若有相容性風險、架構風險、維護風險或外部依賴風險，都應明確列出。

### 5. 文件內容應可被後續維護
輸出應盡量結構化，避免寫成過度口語且難以維護的內容。

---

## 五、執行原則

### 1. 優先讀專案既有文件
開始整理文件前，應優先閱讀：

1. `README.md`
2. `AGENTS.md`
3. `PLAN.md`
4. `docs/requirements.md`
5. `docs/context.md`
6. `docs/architecture.md`
7. 相關 task 文件
8. 相關程式碼與測試

### 2. 文件型態要與目的對齊
不同需求應產出不同型態的文件，不要一律套同一種格式。

例如：

- 設計說明 → `design-doc`
- 交接 → `handover-note`
- 上線前版本摘要 → `release-summary`

### 3. 不重複已有內容
若既有文件已有明確內容，應以整理、補強、更新為主，不要無意義重寫。

### 4. 保持可讀性
應盡量做到：

- 結構清楚
- 標題分明
- 重點可掃讀
- 避免過度冗長

### 5. 優先提供可行版本
若資訊不完整，先產出可用初版，並列出待補資訊。

### 6. 若任務涉及手動 DevOps 流程，應優先依模板整理文案
若任務後續會由使用者手動建立 Azure DevOps Work Item、branch、Pull Request 或 release 說明，則本技能在整理文件時，應優先確認專案內是否已有：

1. `.agents/core/templates/devops-placeholder-convention.md`
2. `.agents/core/templates/ado-workitem-template.md`
3. `.agents/core/templates/pr-template.md`

若上述模板存在，應優先依專案內模板整理文案；若不存在，則應先明確指出缺漏，再以 shared 層對應模板或最小必要格式補足。

不得在同一專案內混用多套 placeholder 規則或隨意改變文案結構。

### 7. 文件整理時應同步判斷是否需要更新其他文件
若本次技術文件整理與任務成果、架構調整、流程變更、外部整合或上線說明有關，應同步判斷是否需要提醒更新：

- README.md
- docs/requirements.md
- docs/context.md
- docs/architecture.md
- active domain docs（若已導入且適用）
- docs/tasks/*
- Wiki
- inline docs
- CHANGELOG.md

若屬手動 DevOps 流程，也應視情況補：

- Work Item 文案
- PR 文案
- release summary
- 文件同步提醒清單

### 8. 文件任務 closure hook

若本次文件整理與 task closure、release summary、DevOps 文案、架構決策或 project knowledge 沉澱有關，完成前應條件式判斷是否需要：

- 回填相關 task 的任務結尾檢查、驗證結果、風險、人工覆核與後續 task。
- 若產生可重用經驗或 change pattern 候選，使用 project-local `project-learning-record-template.md` 建立或建議建立：
  - `docs/lessons/LEARN-xxx.md`
  - `docs/change-patterns/PATTERN-xxx.md`
- 若候選內容代表 shared/core/domain 缺口，建立或建議 WGAP，不直接修改 workspace shared assets。
- 若文件整理揭露長期有效的 workspace-level governance、validation、boundary 或 shared asset placement 決策，評估是否需要 ADR；單一 project-local decision 不應升級為 ADR。
- 判斷是否需更新 README、PLAN、`docs/workspace-baseline.md`、changelog、release note、Work Item 或 PR 文案。
- 避免把 secrets、credential、production log、完整對話紀錄或其他敏感資訊寫入正式文件、task、learning record 或 DevOps 文案。

---

## 六、與簡報整理的邊界

### 本技能適合：
- 整理技術內容
- 補齊結構化文件
- 產出可被後續維護與交付的正式文件

### 本技能不主責：
- 正式簡報頁面規劃
- 每頁重點排序
- 可視化建議
- 講述重點設計

上述情境應優先使用 `presentation-packaging`。

---

## 七、建議輸出格式

### A. 若輸出為 design-doc
建議至少包含：
1. 目的
2. 背景
3. 系統或模組範圍
4. 設計概覽
5. 模組關係
6. 資料流
7. 風險與取捨
8. 待確認事項

### B. 若輸出為 technical-spec
建議至少包含：
1. 功能摘要
2. 輸入 / 輸出
3. 規則說明
4. 邊界情況
5. 相依模組
6. 驗證方式
7. 風險與限制

### C. 若輸出為 runbook
建議至少包含：
1. 用途
2. 啟動方式
3. 操作步驟
4. 檢查點
5. 常見問題
6. 回復建議

### D. 若輸出為 handover-note
建議至少包含：
1. 專案現況
2. 已完成事項
3. 未完成事項
4. 風險與限制
5. 接手入口
6. 後續建議

### E. 若輸出為 release-summary
建議至少包含：
1. 版本摘要
2. 主要改動
3. 影響範圍
4. 驗證情況
5. 風險與注意事項

### F. 若輸出為 devops-doc
建議至少包含：
1. 文案用途
2. 對應 task / Work Item / PR
3. 可直接貼上的主要文字稿
4. placeholder 欄位
5. 文件同步提醒
6. 風險與注意事項

---

## 八、不適用情境

以下情況不應優先使用本技能：

1. 任務其實是需求拆解，應改用 `requirement-breakdown`
2. 任務其實是程式碼審查，應改用 `code-review`
3. 任務核心是整理正式簡報頁面與表達方式，應改用 `presentation-packaging`
4. 任務只是單純補一小段 task 記錄，不一定需要啟用完整技術文件流程

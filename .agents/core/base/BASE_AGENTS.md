# BASE_AGENTS.md

## 文件目的

本文件定義 workspace 內所有 project 共用的 platform/core 工作原則、執行順序、交付格式、風險控管方式，以及 bootstrap / retrofit 的基礎規則。

本文件僅作為共用基礎規範使用，不描述任何特定 domain 或單一 project 的業務背景、模組、技術細節或實作限制。

特定 domain 的補充規則應放在：

- `shared/domains/<domain>/base/DOMAIN_AGENTS.md`

單一 project 的具體規則與事實應放在：

- project 根目錄 `AGENTS.md`
- project 內 `.agents/`
- project 內 `docs/`

---

## 一、適用範圍

本文件適用於以下情境：

1. 在 workspace 下建立新 project
2. 將既有 project 納入 workspace 工作結構
3. 在 project 中執行需求分析、設計、開發、測試與文件更新
4. 使用共用 skills 執行可重複 workflow
5. 對 project 進行結構化任務拆解、風險控管與驗證
6. 維護 workspace 與 project 之間的 baseline 對應關係
7. 開發、維護、重構 workspace 本身的 shared core、domain、skills、templates、checklists 與治理文件

---

## 二、Domain-Aware Workflow 原則

### 1. 必須判斷 domain

bootstrap 或 retrofit 時，必須先依 `shared/core/domain-selection-guide.md` 判斷 project 的 domain mapping。

domain mapping 至少應包含：

- primary domain
- primary domain 判斷理由
- secondary capabilities
- imported core assets
- imported domain assets
- project-specific overrides

判斷 domain 時，不得只依程式語言或檔案副檔名；應以主要交付物、未來高頻任務、主要風險區與後續文件定位需求為準。

### 2. 必須寫入 project 文件

domain mapping 應至少寫入：

- `docs/workspace-baseline.md`
- `AGENTS.md`

視任務性質，也應同步寫入或引用於：

- `docs/context.md`
- `docs/architecture.md`
- `docs/tasks/TASK-xxx.md`
- bootstrap / retrofit proposal

### 3. 任務應讀取 active domain

進入單次任務前，應先確認 project 已導入的 primary domain 與 active domain。

若 project 已導入 domain 規則，應優先讀取：

- `.agents/domain/<domain>/base/DOMAIN_AGENTS.md`
- 與該 domain 對應的 skills
- 與該 domain 對應的 templates
- project 內與該 domain 相關的文件

若 project 尚未記錄 domain mapping，應將其列為文件缺口，不得只用技術棧推定。

### 4. Core 不放 domain 細節

本文件只定義跨 domain 共用原則。任何 domain 專屬的理解順序、常見修改面、風險區、文件用途、驗證重點或 task 定位規則，應放在對應 domain 文件。

若不確定某段規則應屬於 core 或 domain，先放入「待確認」區塊，不應直接混入 core。

---

## 三、共用工作原則

### 1. 先理解，再執行

開始任何任務前，應先理解需求、project 上下文、限制與目標，不應在資訊不足時直接大規模修改程式或文件。

至少應先確認：

- project 目的與目前狀態
- 本次任務來源與目標
- 相關文件與現有實作
- active domain 與 domain-specific 規則
- 已知限制、風險與待確認事項

### 2. 先規劃，再實作

若任務符合以下任一情況，應先提出計畫、方案或拆解結果，再進入實作：

- 任務範圍較大
- 涉及多個模組
- 需求不明確
- 可能影響既有相容性
- 涉及架構、資料模型、外部介面或跨系統流程調整
- 涉及 active domain 標示的高風險區

### 3. 不將推測視為已確認事實

若需求或 project 背景不完整，應明確列出：

- 待確認事項
- 假設前提
- 風險與不確定性

不得將推測內容直接寫成正式規格或最終結論。

### 4. 任何修改都需可驗證

所有程式、文件、設定或架構修改，都應附上對應的驗證方式，至少包含下列其中一項：

- 單元測試
- 整合測試
- 手動驗證步驟
- 文件一致性檢查
- 邏輯與流程核對
- domain-specific 驗證方式

凡程式碼修改，至少需做一次對應層級的 build / typecheck 驗證。
若因環境、權限、依賴、平台限制或其他客觀條件無法執行，必須明確說明阻塞原因、未驗證風險與替代驗證方式。

### 5. 文件與實作應同步

若任務影響需求、資料流、架構、API、使用方式、工作規則或 domain mapping，應同步檢查是否需要更新：

- `README.md`
- `PLAN.md`
- `AGENTS.md`
- `docs/requirements.md`
- `docs/context.md`
- `docs/architecture.md`
- `docs/tasks/*`
- `docs/workspace-baseline.md`
- active domain 相關文件
- 其他 project 相關文件

### 5.1 任務文件原則上應在實作前建立

對功能需求、bug 修正、流程調整、驗證規則調整等任務，原則上應先建立或更新 `docs/tasks/TASK-xxx.md`。

task 文件應作為本次任務的執行依據，用來先界定：

- 任務目標
- 本次範圍
- 不在本次範圍
- 預期修改點
- 驗收標準
- 風險與限制
- active domain 與 domain-specific 檢查項

不得將 task 文件預設當成事後報告使用。

### 5.2 建立 task 後，必須先停下確認

對功能需求、bug 修正、流程調整、驗證規則調整等任務，當 `docs/tasks/TASK-xxx.md` 已建立或更新後，預設不得直接進入實作，必須先明確詢問使用者是否要先確認 task。

此處的「先停下確認」屬於流程關卡，而不是建議語氣。
若尚未取得使用者對 task 的確認或放行，不得直接修改程式碼、文件或其他實作內容。

建立 task 後，後續處理規則如下：

- 若使用者選擇確認，則應停在 task 階段，待確認後再進入實作。
- 若使用者明確表示「不用確認 task、直接實作」、「直接照 task 做」、「不用停，直接改」等，才可略過 task 確認並進入實作。
- 若使用者沒有明確表示可略過 task 確認，即使使用者原始需求是命令句、簡短句或帶有執行語氣，也仍應先停下詢問。

以下情況不得視為已授權略過 task 確認：

- 只說需求內容
- 只說「幫我改這個」、「直接處理」
- 一般性的命令語氣或簡短執行指令
- 尚未明確提到「不用確認 task」或等效意思的句子

建立 task 後，建議固定使用以下句型回覆：

「我已建立/更新 `docs/tasks/TASK-xxx.md`，要先確認 task 內容，再進入實作；若你要我直接做，也可以明確回覆『直接實作』。」

### 5.3 手動 DevOps 文案原則

本 workspace 可支援 Azure DevOps Work Item、Branch、Pull Request 相關規範，但預設情境為由使用者手動建立實際物件，agent 主要負責產出可直接貼上的文字稿，而非直接操作外部系統。

若任務涉及開發、bug 修正、流程調整、文件更新或其他需納入 DevOps 流程的事項，除 `docs/tasks/TASK-xxx.md` 外，並應視情況同步產出：

- Work Item 中文文字稿
- PR 中文文字稿
- 必要時的 commit message 建議
- 必要時的文件同步提醒

若已判定本次任務採手動 Azure DevOps 流程，且已建立或更新 `docs/tasks/TASK-xxx.md`，則不得只在 task 文件內保留 DevOps 摘要。應同步依模板落地：

- Work Item 中文文字稿：`docs/devops/workitems/*.md`
- PR 中文文字稿：若本任務預期會產生 PR，應建立 `docs/devops/prs/*.md`

DevOps 文字稿語言規則：

- Work Item / PR 標題、branch、commit message、scope、code identifier、UI label、placeholder 可使用英文。
- Summary、Background、Scope、Out of Scope、Affected Area、Acceptance Criteria、Risks、Verification Notes 等說明性內文預設使用繁體中文。
- 若保留英文技術詞或畫面原文，應嵌入中文句子中說明，不應讓整段說明性內文變成英文。

若暫不建立 PR 文字稿，必須在 task 或輸出摘要中明確說明原因。

### 6. 高風險事項必須標記人工覆核

若任務涉及以下情況，必須在輸出中明確標示「需要人工覆核」：

- 架構重大變更
- 資料模型破壞性修改
- 外部介面不相容調整
- 權限、資安、驗證邏輯改動
- 正式環境部署與回復策略
- 可能造成既有使用者流程中斷的修改
- active domain 標示的高風險區

### 7. 任務完成後應判斷是否需要補技術文件或簡報素材

若任務涉及以下情況，應評估是否同步使用共用技能補齊技術文件或簡報內容：

- 新功能完成
- 架構或資料流調整
- API、協定或資料格式變更
- 模組責任調整
- 上線前版本整理
- project 交接
- 對內或對外技術說明需求

建議對應技能如下：

- 技術文件整理 → `technical-documentation`
- 簡報內容整理 → `presentation-packaging`

### 8. 產出技術文件或簡報時應優先套用共用模板

若任務需要產出技術文件、交接文件、版本摘要或簡報大綱，應優先參考 shared 層模板：

- 技術文件 → `workspace/shared/core/templates/technical-document-template.md`
- 簡報大綱 → `workspace/shared/core/templates/slide-outline-template.md`

若 project 層已有更適合的模板，則以 project 層模板為優先。

### 9. Workspace Development Flow 入口

當任務目標是開發、維護、重構 workspace 本身，或新增 / 調整 shared core、domain、skill、template、checklist、governance 文件時，應先使用：

- `shared/core/skills/workspace-development/SKILL.md`

此 flow 只作為 workspace 開發工作的總入口，用於判斷範圍、角色流程、停點、必要輸出與驗證原則。細分 workflow 應等需求成熟後再另行建立，不應直接塞入本 base 規則。

此 flow 不適用於單一 project 的產品功能、bug fix 或 release；該類工作仍應依 project `AGENTS.md`、project-local `.agents/`、active domain 規則與 `docs/tasks/*` 執行。

---

## 四、共用執行順序

除非 project 層 `AGENTS.md` 或 active domain 有更具體規定，預設執行順序如下：

1. 理解需求
2. 讀取 project 規則、baseline 與 domain mapping
3. 理解 project 現況與 active domain 規則
4. 任務拆解
5. 方案與風險整理
6. 實作或文件更新
7. 驗證
8. 補充或修正文件
9. 輸出結果摘要

---

## 五、共用交付格式

每次任務輸出至少應包含以下內容：

1. 任務摘要
2. 修改內容
3. 影響範圍
4. 驗證方式
5. 風險與限制
6. 是否需要人工覆核

若任務已能合理定位修改點，應盡量額外補充：

- 優先閱讀檔案
- 預期修改模組
- 預期修改檔案 / 路徑
- 可能連動修改點
- 不建議優先修改的區塊
- active domain 與 domain-specific 風險

若任務涉及手動 DevOps 流程，應補充：

- 建議的 Work Item 標題與描述
- 建議的 PR 標題與描述
- 建議的 commit message
- 需由使用者手動補入的 placeholder 欄位
- 文件同步提醒

---

## 六、共用任務分類

以下為跨 project 常見任務類型：

### 1. 需求類

- 需求拆解
- 功能清單整理
- 驗收標準整理
- 待確認事項整理

### 2. 分析類

- 現況盤點
- 模組責任分析
- 資料流分析
- 影響範圍分析
- 風險分析

### 3. 實作類

- 程式碼新增
- 程式碼修改
- 錯誤修正
- 測試補齊
- 文件更新

### 4. 品質類

- Code Review
- 測試案例設計
- 回歸測試建議
- 上線前檢查

### 5. 文件與交付類

- 技術文件整理
- 設計說明整理
- 維運文件整理
- 交接文件整理
- 版本摘要整理
- 簡報大綱整理
- 投影片內容整理

---

## 七、共用技能路由原則

若任務屬於下列類型，應優先考慮使用對應共用技能：

- 需求拆解 → `requirement-breakdown`
- 程式碼審查 → `code-review`
- 測試案例生成 → `test-case-generation`
- 上線前檢查 → `release-readiness-check`
- 新 project 初始化 → `project-bootstrap`
- 既有 project 導入 → `project-retrofit`
- workspace shared assets 更新後的 project upgrade / baseline closure → `project-upgrade-baseline-update`
- 技術文件整理 → `technical-documentation`
- 簡報大綱與投影片內容整理 → `presentation-packaging`

若任務屬於 active domain 的專屬工作，應再讀取 domain 對應 skill。

若 project 層 `AGENTS.md`、project-specific skill 或 domain skill 有更精確規則，以更具體的規則為優先，但不得違反本文件的最低流程關卡。

### Shared skill 存在性確認規則

當任務依賴 shared skill 時，不可僅以模糊關鍵字搜尋結果判定 skill 不存在。

判定 shared skill 是否存在前，至少必須依序執行：

1. 直接檢查標準路徑 `workspace/shared/core/skills/<skill-name>/SKILL.md`
2. 若標準路徑不存在，再檢查是否有大小寫、命名或目錄層級差異
3. 只有在明確確認上述路徑不存在或不可讀時，才能回報該 skill 缺失

若任務依賴 domain skill，也應依 active domain 檢查：

- `workspace/shared/domains/<domain>/skills/<skill-name>/SKILL.md`

---

## 八、新 project bootstrap 高階規則

當使用者要求建立新 project 時，應將此任務視為 bootstrap 任務。

### 1. 先判定，再進入 bootstrap 流程

一旦任務屬於新 project 建立、初始化、骨架生成、project template 套用或初始文件建立，應先判定為 bootstrap 任務，再套用本章規則，不得直接視為一般檔案建立任務。

### 2. 先讀 skill，後提案

在進入任何 bootstrap 提案、目錄建立、文件生成或程式骨架生成前，必須先讀取：

- `workspace/shared/core/skills/project-bootstrap/SKILL.md`
- `workspace/shared/core/domain-selection-guide.md`

未讀取前，不得直接建立完整 project、不得直接生成骨架、不得直接開始 project 內正式開發。

### 3. 先做 Domain Mapping

bootstrap proposal 必須包含 Domain Mapping，並說明：

- primary domain
- 判斷理由
- secondary capabilities
- 預計導入的 core assets
- 預計導入的 domain assets
- 暫不導入的 domain / capability 與原因

### 4. 先提案，後生成

在未取得使用者確認前，不直接建立完整 project。

bootstrap 提案至少應包含：

- project 名稱
- project 類型
- Domain Mapping
- 目的與範圍
- 預計目錄結構
- 預計建立的文件
- 預計複製的 base、skills、templates 與 domain assets
- 已知假設、待確認事項與風險

### 5. 建立後 project 應自足

新 project 建立完成後，應具備最基本的自足性，不能依賴 `workspace/shared/` 才能理解 project 規則。

因此，必要的 base 規則、共用 skills、共用 templates、domain 規則與 domain assets 應複製進 project 內。

### 6. 必須同步建立 workspace baseline

當透過 `project-bootstrap` 建立新 project 時，必須同步建立：

- `docs/workspace-baseline.md`

此文件不得省略，也不得留待後續再補。生成時應優先依 `workspace-baseline-template.md` 建立，並至少填入：

- 目前 `workspace` 版本
- 導入日期
- 導入方式：`bootstrap`
- project 類型
- Domain Mapping
- 已導入的 base / skills / templates 範圍
- 已導入的 domain assets 範圍
- 已採用的 project 結構
- 目前實際工作規則
- 目前對齊評估

### 7. 正式開發應切換至 project 根目錄

新 project 建立完成後，後續正式分析、設計、開發、測試與文件更新，應在新 project 根目錄中進行，而不是長期停留在 workspace 根目錄。

### 8. 完成檢查以 checklist 為準

bootstrap 是否已完成最小骨架、必要複製與必要生成，應以 `project-bootstrap-checklist.md` 為準。

在未逐條核對 checklist 前，不得直接宣稱 bootstrap 完成。

---

## 九、既有 project retrofit 高階規則

當使用者提供的是已存在、已開發中或維護中的 project / repo，應將此任務視為 retrofit 任務。

### 1. 先盤點，後補齊

在未理解現況前，不應直接大規模修改既有目錄、文件或規則。

### 2. 先讀 skill，後提案

在進入 retrofit proposal、文件生成或 `.agents/` 補齊前，必須先讀取：

- `workspace/shared/core/skills/project-retrofit/SKILL.md`
- `workspace/shared/core/domain-selection-guide.md`

### 3. 先做 Domain Mapping

retrofit proposal 必須包含 Domain Mapping，並說明：

- primary domain
- 判斷理由
- secondary capabilities
- project 目前是否已有 domain 對應文件
- 建議導入的 core assets
- 建議導入的 domain assets
- 暫不導入的 domain / capability 與原因

### 4. 先提案，後補齊

在未取得使用者確認前，先提出 retrofit proposal，不直接宣稱導入已完成。

### 5. retrofit 目的在於導入，不是重建

既有 project 導入的目的，是補齊 project 內必要的規則副本、shared skills 副本、domain assets、入口文件與核心文件，而不是把既有 project 當成全新 project 重做一次。

### 6. 優先補 project 事實與入口文件

既有 project retrofit 時，應優先補齊：

- `.agents/core/base/BASE_AGENTS.md`
- `.agents/core/skills/...`
- `.agents/core/templates/...`
- `.agents/domain/<domain>/base/DOMAIN_AGENTS.md`（若已判定 primary domain）
- `.agents/domain/<domain>/skills/...`
- `.agents/domain/<domain>/templates/...`
- `AGENTS.md`
- `PLAN.md`
- `docs/context.md`
- `docs/architecture.md`
- `docs/tasks/`
- `docs/workspace-baseline.md`

若 project 缺少需求總覽，再視情況補 `docs/requirements.md`。

### 7. project-specific skills 應延後評估

對既有 project，不應在主流程、主資料流與高頻任務尚未清楚前，就大量建立 project-specific skills。

### 8. 必須同步建立或更新 workspace baseline

當透過 `project-retrofit` 將既有 project 納入 workspace 工作結構時，必須同步建立或更新：

- `docs/workspace-baseline.md`

此文件至少應填入：

- 目前 `workspace` 版本
- 導入日期
- 導入方式：`retrofit`
- project 類型
- Domain Mapping
- 已導入的 base / skills / templates 範圍
- 已導入的 domain assets 範圍
- 已採用的 project 結構
- 本地覆寫情況
- 尚未導入項目
- 目前實際工作規則
- 目前對齊評估

若 retrofit 當下仍有部分資訊尚未完全確認，也應先依已知現況填入，並標示待補，而不是整份省略不建。

### 9. 完成檢查以 checklist 為準

既有 project 是否已完成最小骨架、必要複製、必要生成與任務納管入口，應以 `project-retrofit-checklist.md` 為準。

在未逐條核對 checklist 前，不得直接宣稱 retrofit 已完成；最多只能宣稱：

- 已完成 proposal
- 已完成生成
- 已完成初版骨架

### 10. checklist 應落地為 project 文件

若 shared 已提供 `project-retrofit-checklist.md`，生成階段完成後，應將核對結果落地為 project 內文件，建議位置：

- `docs/retrofit-checklist.md`

### 11. workspace 更新後的 project upgrade / baseline closure

當 workspace shared assets、WINTAKE、domain MVP、scope expansion proposal、release note 或 validation 指出既有 project 可能受影響時，不應由 workspace 端直接修改 project。

應切回 project root，使用：

- `workspace/shared/core/skills/project-upgrade-baseline-update/SKILL.md`
- `workspace/shared/core/templates/project-upgrade-plan-template.md`
- `workspace/shared/core/checklists/project-upgrade-baseline-update-checklist.md`

先做 Upgrade Need Check，再決定：

- no upgrade
- baseline update only
- project-local task
- project retrofit
- defer

不得假設每個 workspace update 都必須導入 project；也不得自動覆蓋 project-local overrides。

---

## 十、文件補齊與修改點定位原則

若任務涉及建立、補齊或更新 project 文件，不應只停留在一般背景描述；應盡量補出可支持後續精準定位修改點的資訊。

### 1. project 層文件應支持定位

補 `AGENTS.md`、`docs/context.md`、`docs/architecture.md`、`docs/tasks/*` 時，應盡量整理出：

- 主要模組責任
- 關鍵流程或主資料流
- 常見修改入口
- 高風險不可亂動區塊
- 常見連動模組、文件與測試
- active domain 對應的定位資訊

### 2. task 層應比 project 層更接近修改點

若已進入單次任務處理，task 文件應比 project 總覽文件更明確指出：

- 優先閱讀檔案
- 預期修改模組
- 預期修改檔案 / 路徑
- 可能連動修改點
- 不建議優先修改的區塊
- domain-specific 風險與驗證

### 3. 資訊不足時應明確標示待確認

若目前無法合理定位修改點，應明確列出待確認事項、假設前提與風險，而不是把推測寫成已確認事實。

---

## 十一、workspace 與 project 的分工原則

### workspace 層

workspace 的主要用途是：

- 管理多個 project
- 放 platform/core 共用模板
- 放 platform/core 共用規則
- 放 platform/core 共用 skills
- 放 domain 共用補充規則、skills 與 templates
- 執行 bootstrap / retrofit 流程

### project 層

各 project 根目錄的主要用途是：

- 承載 project 自己的 `AGENTS.md`
- 承載 project 自己的 `.agents/` 副本
- 承載 project 自己的 docs
- 承載 project 自己的 plan
- 承載 project 自己的 skills
- 承載 project 自己的 workspace baseline 對應紀錄
- 進行正式需求分析、開發、測試與維護

---

## 十二、與 project 層 AGENTS.md 的關係

本文件為共用基底規則。
若 project 根目錄中的 `AGENTS.md` 有更具體的 project 規則，應以 project 層內容為優先。

project 層 `AGENTS.md` 應補充的內容通常包含：

- project 目的
- Domain Mapping
- 技術棧
- 主要模組
- 外部依賴
- 不可違反限制
- project-specific 技能路由
- project 完成定義
- 常見修改入口
- 高風險不可亂動區塊

project 層規則可以補充 core，但不得取消 core 的最低流程關卡，例如 task 先確認、驗證、人工覆核與 domain mapping。

---

## 十三、禁止事項

1. 不可在未理解需求時直接大規模修改核心程式或文件。
2. 不可略過驗證步驟直接宣稱完成。
3. 不可將未確認資訊寫成正式結論。
4. 不可忽略高風險修改的人工覆核提醒。
5. 不可在 workspace 根目錄長期混合處理多個 project 的正式開發任務。
6. 不可將 project-specific 事實寫入本共用文件，造成跨 project 混淆。
7. 不可將 domain-specific 細節寫入本 core 文件，造成跨 domain 混淆。
8. 不可在未盤點現況前，將既有 project 直接當成新 project 重建。

---

## 十四、DevOps 規範來源與 project 內副本原則

若 workspace 已提供 Azure DevOps、Git 協作、文件化作業等共用規範原文，建議統一放在 `shared/reference/devops/`，並將其視為 shared 層的母版 reference / policy 文件，而非直接取代 skill 或 template。

其內容應拆分落地至：

- `BASE_AGENTS.md`：共用原則
- `shared/core/skills/...`：流程與使用時機
- `shared/core/templates/...`：實際輸出格式

若 project 已完成 bootstrap 或 retrofit，且 project 內已存在相關副本，後續正式工作時應優先依以下順序判斷：

1. project 內 `.agents/core/templates/...` 或 `.agents/domain/<domain>/templates/...`
2. project 根目錄 `AGENTS.md`
3. project 內 `.agents/core/...` 與 `.agents/domain/...`
4. workspace/shared 對應母版或 reference 文件

不得預設正式工作時一定回頭依賴 `workspace/shared/` 才能產生 Work Item / PR 文案。

---

## 十五、建議維護方式

本文件建議在以下情況下更新：

- platform/core 共用開發流程有明顯調整
- 共用交付格式有變更
- 共用驗證規則有補充
- domain-aware workflow 有調整
- 新增或淘汰 core skills
- workspace 模式的使用方式有修改

若僅為某個 domain 的特殊需求，應更新對應 domain 文件。
若僅為某個 project 的特殊需求，應更新該 project 自己的 `AGENTS.md` 或 `.agents/`，而不是修改本文件。

### project 正式維護應使用 project 內模板副本

當 project 已完成 bootstrap 或 retrofit，且後續正式工作在 project 根目錄中進行時，凡會持續在 project 內生成或更新的文件模板，應以 project 內 `.agents/core/templates/` 或 `.agents/domain/<domain>/templates/` 副本為主要依據。

不得預設後續工作一定會回到 `workspace/shared/core/templates/` 取用母版。

### project 內文件建立時，模板優先於既有實例

當 project 已存在 `.agents/core/templates/` 或 `.agents/domain/<domain>/templates/` 副本時，新增或重建 project 文件應優先依對應 template 生成。

不得僅因 project 內已存在同類文件，就直接沿用其格式作為主要依據。

若既有文件與模板不一致，應以模板為主；既有文件僅作為補充 project 事實、歷史內容或既有決策脈絡的參考來源。

---

## 十六、待確認

以下內容是否應進一步拆成獨立 core reference，後續可再評估：

- Azure DevOps / Git 協作的完整 reference 是否獨立放入 `shared/reference/devops/`
- checklist 是否全數移出 templates，統一歸到 `shared/core/checklists/`
- domain-aware workflow 是否需要獨立 checklist，供 bootstrap / retrofit 共用

# TASK-006 Home 註解樣式調整

## 文件目的

本文件定義首頁兩項browser annotation-driven樣式調整：將`Announcement`標題水平置中並改為紅色，以及將無最近專案狀態中的「新增專案」按鈕背景改為紅色。使用者已明確要求建立TASK並直接實作，因此建立後不另停confirmation gate。

## 一、基本資訊

- 任務編號：`TASK-006`
- 任務名稱：Home註解樣式調整
- 任務類型：Web UI style change / annotation-driven implementation
- 建立日期：`2026-07-23`
- 最後更新日期：`2026-07-23`
- 任務負責人：Codex
- 優先級：Low
- Task status：`Implemented`
- Verification status：`Manual Passed`
- Review status：`Pending Review`
- Repo status：`Uncommitted`

### 1.1 Status Rules

> `Task status`只描述任務進度；`Verification status`只描述驗證；`Review status`只描述人工review；`Repo status`只描述git / PR狀態。

## 二、Domain Context

### 2.1 Domain Mapping

- Primary domain：`web`
- Secondary capabilities：Vue UI、Bootstrap styling、i18n、browser verification
- Domain selection rationale：交付物是browser-rendered首頁樣式。
- Active domain：`web`

### 2.2 Task Active Capability

- Project primary domain：`web`
- Task active capability：annotation-driven UI styling與same-condition browser re-verification
- Capability rationale：需求直接指向首頁兩個可見元素，需最小樣式修改與實際rendered evidence。
- Does this task change project primary domain? `no`
- If yes, rationale：N/A

### 2.3 Imported Assets

- Imported core assets：`requirement-breakdown`、task template與task compliance checklist。
- Imported domain assets：Web base、`web-requirement-breakdown`、`web-feature-implementation`、`web-browser-verification`、integration/report templates與browser checklist。
- Project-specific overrides：保留Vue 3、Bootstrap、HomePage既有layout、empty state與modal行為。

### 2.4 Domain-specific Inspection

- Domain-specific files to inspect：`src/views/home_page/HomePage.vue`、global Bootstrap import、router、testing strategy與browser annotations。
- Domain-specific rules to apply：只修改已授權元素；annotation作context；code change由`web-feature-implementation`執行；驗證由`web-browser-verification`report-only執行。
- Domain-specific risks to check：不要影響有最近專案狀態的另一顆按鈕；維持button語意、keyboard/focus與modal click handler；不把單一viewport宣稱為完整responsive或accessibility驗證。
- Domain-specific validation：type-check、production build、unit regression、same-route/browser computed-style read-back、project harness與diff scope。

### 2.5 Domain Context Checklist

- [x] 已讀取project domain mapping
- [x] 已確認active domain與task capability
- [x] 已確認不改變project primary domain
- [x] 已檢查project-local core與Web規則
- [x] 已列出domain files、risks與validation

### 2.6 Web Domain Supplement

- user entry / route：`http://127.0.0.1:5173/`，route `/`
- affected page / component：`src/views/home_page/HomePage.vue`
- rendering assumption：local Vite SPA，Bootstrap styles已由`src/main.ts`載入。
- affected UI state：首頁empty recently-project state；Announcement list目前可為空。
- state / API boundary：不修改project list取得、modal state、API、auth、storage或runtime config。
- accessibility / responsive：保留原生`h5`與`button`語意、label、click/focus behavior；本task只承諾1124×1245實際viewport，其他viewport列為未驗證風險。
- requested verification matrix：`/`、empty recently-project state、1124×1245、mouse/keyboard-visible DOM。
- runtime diagnostic question / permission gate：不需要；computed style與可見畫面足以驗證。

## 三、DevOps 對應資訊

- Work Item 類型：Task（若未來採手動Azure DevOps）
- Work Item ID：`<WORK_ITEM_ID>`
- Work Item 標題：調整首頁Announcement與新增專案按鈕樣式
- PR 類型：UI style change
- PR 標題：`調整首頁註解指定樣式`
- 建議branch名稱：`codex/task-006-home-annotation-style`
- 建議commit message：`調整首頁 Announcement 與新增專案按鈕樣式`
- 若暫不建立Work Item草稿，原因：project手動Azure DevOps流程尚未確認。
- 若暫不建立PR草稿，原因：使用者未要求PR交付。

## 四、背景說明

- 背景：使用者在local首頁以browser comments標註兩個可見元素。
- 問題描述：`Announcement`標題目前靠左且為深色；empty-state「新增專案」按鈕為Bootstrap primary藍色。
- 任務來源：Browser Comment 1、Browser Comment 2及使用者「建立TASK並直接實作」指示。
- 使用者情境 / 觸發路徑：開啟首頁且recent project list為空時檢視Announcement card與新增專案empty state。

## 五、任務目標

1. 將`#div-announcement h5`文字水平置中並改為Bootstrap紅色。
2. 將`#div-no-recently-project`中的「新增專案」按鈕改為Bootstrap紅色背景。
3. 保留元素語意、文案、click handler與其他首頁按鈕既有樣式。

## 六、本次範圍

1. 修改`HomePage.vue`中兩個被標註元素的Bootstrap utility/variant classes。
2. 建立task、integration checklist與browser verification report。
3. 執行static、build、tests、browser與project governance驗證。

## 七、不在本次範圍

1. 改動有recent projects時顯示的header新增專案按鈕。
2. 改動Announcement內容、API、列表資料、modal行為、i18n或layout grid。
3. 建立design token、全域theme、視覺回歸框架或runtime diagnostics。
4. 真實backend、login、GPU、generation或deployment驗證。

## 八、影響範圍

- 影響模組：Home page template styling。
- 影響流程：首頁視覺呈現；新增專案按鈕仍觸發既有modal handler。
- 影響資料：無。
- 影響外部系統 / 整合點：無。
- 影響文件：task index、PLAN、本task、integration與browser report。
- 相容性風險：低；Bootstrap `text-center`、`text-danger`與`btn-danger`須保持目前版本語意。
- domain-specific影響：只有指定empty state的可見樣式。

## 九、預期修改點

- 優先閱讀檔案：`src/views/home_page/HomePage.vue`。
- 預期修改模組：Home template。
- 預期修改層級：兩個class attribute的最小修改。
- 預期修改檔案 / 路徑：`src/views/home_page/HomePage.vue`。
- 可能連動修改檔案：task index、PLAN與task evidence documents。
- 明確不應優先修改的區塊：global Bootstrap/Sass、router、service、modal、i18n、API與其他prototype pages。
- 修改點定位理由：browser selectors直接對應該SFC中的唯一元素。
- 需同步檢查的測試：全套offline unit regression；不新增依賴。
- 需同步檢查的文件：本task、integration checklist、browser verification report、task index、PLAN。

## 十、輸入、輸出與任務附件

- 輸入：兩則user-authored browser comments、selectors、marker screenshots與2026-07-23修改前computed-style read-back。
- 輸出：兩個最小class修改與same-condition browser verification report。

### 10.1 Task Artifacts / Visual References

- Artifact directory：`docs/tasks/TASK-006-assets/`；保存integration checklist與browser verification report。Browser marker screenshots由in-app Browser提供，agent沒有可提交的原始本機路徑。
- Visual references：Browser Comment 1與2；實作所需文字、selector、route與viewport已完整轉錄於本task，不依賴圖片才能執行。

| Reference | Reason not committed | Access / owner | How to use |
| --- | --- | --- | --- |
| Browser Comment 1：`#div-announcement` | 原始marker screenshot無本機路徑 | 本次Codex task / user | 驗證其`h5`置中、紅色 |
| Browser Comment 2：`#div-no-recently-project ... button` | 原始marker screenshot無本機路徑 | 本次Codex task / user | 驗證empty-state按鈕紅色背景 |

- 修改前evidence：1124×1245；heading `text-align: start`、`rgb(33, 37, 41)`；button `btn-primary`、背景/邊框`rgb(13, 110, 253)`。
- Artifact handling checklist：
  - [x] 已記錄不可取得原始附件的原因
  - [x] 已轉錄穩定selector、文字、route、viewport與expected outcome
  - [x] 不需要圖片即可執行與驗證
  - [x] project artifact未放入workspace shared paths

## 十一、驗收標準

1. 首頁`Announcement`仍為level-5 heading，computed `text-align`為`center`且文字顏色為Bootstrap danger紅色。
2. empty recently-project state的「新增專案」仍為button，computed background與border為Bootstrap danger紅色。
3. 該按鈕仍保留原文案、`type="button"`與`showProjectCreateModal` click handler。
4. 有recent projects時顯示的header新增專案按鈕仍維持`btn-primary`。
5. type-check、build、offline unit tests、project harness與diff check通過。
6. 在`/`、1124×1245、empty state以browser重新驗證兩項需求並逐項記錄`PASS`/`FAIL`/`NOT RUN`/`UNKNOWN`。
7. 不宣稱已完成cross-browser、全viewport、accessibility conformance、E2E、live integration或production驗證。

## 十二、驗證方式

- 單元測試：`npm run test:unit -- --run`。
- 整合測試：N/A；無API/state contract變更。
- End-to-end / flow測試：不執行Cypress；其現有spec仍為template。
- 手動驗證：in-app Browser在相同URL、empty state與1124×1245 viewport讀取heading/button computed styles、語意與classes。
- 文件檢查：task compliance、integration/report read-back與`git diff --check`。
- domain-specific validation：`npm run type-check`、`npm run build`、non-fix ESLint affected file、project harness與browser matrix。

## 十三、風險、限制與假設

- 已知風險：紅色選用Bootstrap danger token，而非未定義的客製色碼。
- confirmed domain-specific risks：顏色不是唯一狀態訊息；本task沒有改變狀態語意，僅依使用者指定調整視覺。
- 已知限制：只驗證目前local Chromium-like in-app Browser與1124×1245 viewport。
- 假設前提：「紅色」接受目前Bootstrap `danger` token；「置中」指水平文字置中。
- 人工覆核需求：使用者確認紅色色階與視覺結果。

## 十四、建議技能

### Core skills

- skill：`requirement-breakdown`、`code-review`
- 使用理由：建立task、控制範圍並做交付前review。

### Domain skills

- skill：`web-requirement-breakdown`、`web-feature-implementation`、`web-browser-verification`
- 使用理由：完成annotation-driven UI change與same-condition report-only複驗。

### Project-specific skills

- skill：N/A
- 使用理由：沒有project-specific skill。

## 十五、DevOps 文案草稿摘要

- Work Item草稿位置：未建立；手動流程未確認。
- PR草稿位置：未建立；使用者未要求PR。
- 文件同步提醒：更新task index、PLAN與task evidence；不需改README/architecture/API/testing strategy。

## 十六、相關文件與參考

- Project entry：`AGENTS.md`、`PLAN.md`
- Project docs：`docs/requirements.md`、`docs/architecture.md`、`docs/testing.md`
- Project-local core：task template、task compliance checklist、requirement/code-review skills
- Project-local Web：Web base、requirement/feature/browser-verification skills及integration/report/checklist assets
- 直接程式：`src/views/home_page/HomePage.vue`

## 十七、任務結尾檢查

### 17.1 實際修改摘要

- 實際新增檔案：本task、`docs/tasks/TASK-006-assets/web-integration-checklist.md`與`docs/tasks/TASK-006-assets/browser-verification-report.md`。
- 實際修改檔案：`src/views/home_page/HomePage.vue`、`PLAN.md`與`docs/tasks/README.md`。
- 實際未修改但已確認無需修改的檔案：global styles、router、services、modal、i18n、tests、package manifests/lockfile、runtime config與workspace shared/domain。
- 與原預期不同之處：目前無。
- 未納入本次處理但需記錄的項目：cross-browser與全viewport visual regression。

### 17.2 驗收與驗證結果

- 驗收標準完成情況：7/7。
- 已執行驗證：affected ESLint、full type-check、production build、49 offline tests、same-condition browser DOM/computed-style/screenshot read-back、static isolation read-back、project harness、`git diff --check`與project-local code review。
- 驗證結果：ESLint/type-check/build/tests/harness/diff均`PASS`；browser在1124×1245下驗得heading `text-align: center`與紅色`rgb(220, 53, 69)`，empty-state button背景/邊框同為`rgb(220, 53, 69)`且仍為enabled native button。
- 無法執行的驗證：populated project runtime state、cross-browser、其他viewport、assistive technology、Cypress與production均`NOT RUN`，符合本task限制。
- 未驗證風險：紅色色階仍待使用者視覺偏好確認；其他browser/viewport可能有渲染差異。
- 替代檢查方式：populated-state header button以template static read-back確認仍為`btn-primary`；不把此結果擴大為runtime flow驗證。
- domain-specific validation結果：兩則annotation均`PASS`；heading/button語意、文案、type與handler保持；browser diagnostics不需要；code review無blocking finding並建議進入user visual review。

### 17.3 文件與DevOps同步

- 是否需更新README / PLAN / docs：更新PLAN、task index與task evidence；其餘不需要。
- 是否已更新task：是，已回填實作與驗證結果。
- 是否已更新Work Item草稿：否，流程未確認。
- 是否已更新PR草稿：否，未要求PR。
- 是否需補commit message / release note：已提供commit message；不需release note。
- 未同步項目與原因：N/A。

### 17.4 風險、後續與回補

- 剩餘風險：Unreleased TASK-005 governance變更仍與本task同處working tree但未混入產品修改；TASK-006本身只剩user visual review與未執行的跨browser/viewport範圍。
- 人工覆核需求：視覺結果待使用者review。
- 後續task：目前無。
- 是否發現shared/core/domain缺口：否。
- 是否需建立WGAP：否。
- 是否有lessons learned / change pattern候選：否；單一project局部樣式需求。

### 17.5 Closure Decision

- Final Task status：`Implemented`
- Final Verification status：`Manual Passed`
- Final Review status：`Pending Review`
- Final Repo status：`Uncommitted`
- [ ] 可關閉
- [x] 有條件關閉，需列出條件
- [ ] 不可關閉，需完成實作與驗證
- 結論：實作與自動/瀏覽器驗證完成；待使用者視覺review與後續commit後可關閉。

## 十八、執行紀錄

### 第一次處理

- 日期：`2026-07-23`
- 處理內容：轉錄兩則browser comments、建立可驗收task並記錄before browser evidence。
- 結果：`In Progress` / `Not Run` / `Pending Review` / `Uncommitted`。

### 第二次處理

- 日期：`2026-07-23`
- 處理內容：以兩個Bootstrap class變更完成實作，執行type-check/build/tests/ESLint/harness並在相同local route、state與viewport完成browser re-verification。
- 結果：`Implemented` / `Manual Passed` / `Pending Review` / `Uncommitted`。

## 十九、更新紀錄

### v0.1

- 建立annotation-driven Home style task。

### v0.2

- 回填最小實作、validation、browser evidence與conditional closure。

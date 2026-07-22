# TASK-004 Web Domain Stage 1 MVP 導入與 Baseline 更新

## 文件目的

本文件定義 `defect_generator` 採用 workspace Web Domain Stage 1 MVP 的 project-local upgrade。任務只導入最小 active asset set、同步 Web routing 與現行文件；不修改產品程式碼、workspace shared assets 或 Web Domain scope。

## 一、基本資訊

- 任務編號：`TASK-004`
- 任務名稱：Web Domain Stage 1 MVP 導入與 Baseline 更新
- 任務類型：Project Workspace Upgrade／治理資產與文件同步
- 建立日期：`2026-07-22`
- 最後更新日期：`2026-07-22`
- 任務負責人：Codex；workspace source ref 與 imported set 由使用者確認
- 優先級：Medium
- Task status：`Closed`
- Verification status：`Tests Passed`
- Review status：`Reviewed`
- Repo status：`Committed`

### 1.1 Status Rules

> `Task status` 只描述任務本身進度，不混入 build、manual verification、review 或 git 狀態。
> `Verification status` 只描述驗證完成度。
> `Review status` 只描述使用者確認、人工 review 或變更要求。
> `Repo status` 只描述 task 文件與相關修改是否已進 git / PR。

## 二、Domain Context

### 2.1 Domain Mapping

- Primary domain：`web`
- Secondary capabilities：REST API、auth、AI model configuration、Canvas image processing、file upload/download、YAML、i18n、frontend testing
- Domain selection rationale：主要交付物與高頻修改面是 browser UI、routing、frontend state、Canvas interaction 與 API binding；backend 仍是外部依賴。
- Active domain：`web`

### 2.2 Task Active Capability

- Project primary domain：`web`
- Task active capability：Web domain governance adoption、requirement/implementation routing、baseline與文件對齊
- Capability rationale：workspace已正式建立Web Stage 1資產，而project仍記錄Web domain unavailable並只使用core-only fallback。
- Does this task change project primary domain? `no`
- If yes, rationale：N/A

### 2.3 Imported Assets

- Imported core assets：目前為core base、4個core skills、6個core templates、task checklist、project harness與Codex／Claude thin adapters。
- Imported domain assets：目前為`not imported`；本task確認後預計導入5個Web active assets。
- Project-specific overrides：保留既有Vue/Vite/npm scripts、source layout、API/auth/Canvas/model/GPU安全邊界與驗證限制。

### 2.4 Domain-specific Inspection

- Domain-specific files to inspect：
  - workspace `shared/domains/web/README.md`
  - workspace `shared/domains/web/base/DOMAIN_AGENTS.md`
  - workspace `shared/domains/web/skills/web-requirement-breakdown/SKILL.md`
  - workspace `shared/domains/web/skills/web-feature-implementation/SKILL.md`
  - workspace `shared/domains/web/templates/web-task-template.md`
  - workspace `shared/domains/web/templates/web-integration-checklist-template.md`
  - project `AGENTS.md`、`docs/workspace-baseline.md`與現有`.agents/` routing
- Domain-specific rules to apply：Web assets只補browser delivery、trust、accessibility與validation，不取代core task-first、confirmation-stop或project-specific規則。
- Domain-specific risks to check：public config／secret boundary、client authorization overclaim、route與API boundary、keyboard/focus、responsive、browser validation與production readiness overclaim。
- Domain-specific validation：source／target逐檔一致性、Web routing read-back、project harness、workspace pointer、文件狀態與git diff檢查。

### 2.5 Domain Context Checklist

- [x] 已讀取 project 的 domain mapping
- [x] 已確認本任務 active domain
- [x] 已確認 task active capability
- [x] 已確認本 task 不改變 project primary domain
- [x] 已檢查 project-local core 規則
- [x] 已確認 project-local Web domain assets 尚未導入
- [x] 已列出 domain-specific files to inspect
- [x] 已列出 domain-specific risks to check
- [x] 已列出 domain-specific validation

## 三、DevOps 對應資訊

- Work Item 類型：Technical Debt / Project Governance（若未來採用手動Azure DevOps）
- Work Item ID：`<WORK_ITEM_ID>`
- Work Item 標題：導入 Defect Generator Web Domain Stage 1 MVP
- PR 類型：Project governance / documentation
- PR 標題：`導入 Web Domain Stage 1 MVP 與更新 project baseline`
- 建議 branch 名稱：`codex/task-004-web-domain-stage1-adoption`
- 建議 commit message：`導入 Web Domain Stage 1 MVP 專案資產`
- 若暫不建立 Work Item 草稿，原因：project尚未確認採用手動Azure DevOps流程，也未導入DevOps templates。
- 若暫不建立 PR 草稿，原因：使用者已確認直接實作，但尚未要求PR交付。

## 四、背景說明

- 背景：project於2026-07-20以workspace `v1.16.0`／ref `9277b22`完成core-only retrofit；workspace其後於local `develop` ref `bad7c60`正式建立Web Domain Stage 1 MVP，但版本仍為`v1.16.0`且變更位於`Unreleased`。
- 問題描述：project `AGENTS.md`、baseline、README、PLAN與context仍宣告Web domain不存在；project-local core `requirement-breakdown`也缺少workspace新增的Web companion routing。
- 任務來源：2026-07-22在project root完成的read-only Project Workspace Upgrade Check；結論為`Recommended`／`project-local task`。
- 使用者情境 / 觸發路徑：後續Web requirement、feature與integration工作需要使用正式且framework-neutral的domain規則，同時保留Defect Generator特有邊界。

## 五、任務目標

1. 以最小active set導入適合`defect_generator`的Web Stage 1 project-local assets。
2. 同步copied core `requirement-breakdown`的Web companion routing，不改變既有thin adapter架構。
3. 更新project入口、baseline與active docs，使workspace ref、domain availability、actual imported set與fallback敘述一致。
4. 證明導入完整、workspace/project邊界未被破壞，且產品行為未被修改。

## 六、本次範圍

1. 從workspace ref `bad7c60`複製Web domain base、requirement skill、feature skill、task template與integration checklist template。
2. 從同一workspace ref同步core `requirement-breakdown` skill。
3. 更新`AGENTS.md`的Domain Mapping、Domain Layer、必讀順序、skill routing與禁止事項文字。
4. 更新`docs/workspace-baseline.md`的workspace ref、last checked、copied asset matrix、actual imported set、Later/not imported、fallback、domain upgrade history與alignment assessment。
5. 更新`README.md`、`PLAN.md`、`docs/context.md`中已失真的Web unavailable/core-only敘述。
6. 更新本task與`docs/tasks/README.md`的狀態及驗證紀錄。

## 七、不在本次範圍

1. 修改workspace `shared/core/**`、`shared/domains/web/**`、registry、manifest、changelog或validation report。
2. 匯入Web bootstrap／retrofit skills、proposal templates或checklists；project已完成初次retrofit，本次不重跑retrofit。
3. 建立Web domain Codex／Claude native adapters、plugin、hook或domain專屬harness；Stage 1未提供這些資產。
4. 匯入release/readiness、performance、E2E/browser matrix、SSR/PWA等Later資產。
5. 修改`src/**`、tests、package manifests、lockfile、runtime config、API、auth、Canvas、YAML、AI model或GPU流程。
6. 回寫TASK-001～003、`docs/retrofit-proposal.md`或`docs/retrofit-checklist.md`的歷史事實。
7. 建立或修改WGAP／WINTAKE；本次已有正式workspace assets，不是新shared gap。

## 八、影響範圍

- 影響模組：project-local `.agents/core`、`.agents/domain/web`與agent routing。
- 影響流程：需求拆解、Web feature implementation、task supplement、integration checklist與project upgrade validation。
- 影響資料：無產品資料變更。
- 影響外部系統 / 整合點：無；不連線backend、OAuth、GPU或deployment環境。
- 影響文件：`AGENTS.md`、`README.md`、`PLAN.md`、`docs/context.md`、`docs/workspace-baseline.md`、task index與本task。
- 相容性風險：錯誤路由可能忽略project-specific override，或把domain adoption誤宣稱為browser／production驗證完成。
- domain-specific 影響：後續Web tasks會增加security、accessibility、responsive與browser validation acceptance，但不改產品現況。

## 九、預期修改點

- 優先閱讀檔案：project入口/baseline、workspace Web README/base/skills/templates、manifest/registry/changelog與Web Stage 1 validation report。
- 預期修改模組：project-local governance assets與active documentation。
- 預期修改層級：文件與copied agent assets；不觸及產品程式碼。
- 預期新增檔案 / 路徑：
  - `.agents/domain/web/base/DOMAIN_AGENTS.md`
  - `.agents/domain/web/skills/web-requirement-breakdown/SKILL.md`
  - `.agents/domain/web/skills/web-feature-implementation/SKILL.md`
  - `.agents/domain/web/templates/web-task-template.md`
  - `.agents/domain/web/templates/web-integration-checklist-template.md`
- 預期修改檔案 / 路徑：
  - `.agents/core/skills/requirement-breakdown/SKILL.md`
  - `AGENTS.md`
  - `README.md`
  - `PLAN.md`
  - `docs/context.md`
  - `docs/workspace-baseline.md`
  - `docs/tasks/README.md`
  - `docs/tasks/TASK-004-web-domain-stage1-adoption.md`
- 可能連動修改檔案：若實作時發現其他active doc宣告Web unavailable，須先回填本task並保持範圍為治理文件。
- 明確不應優先修改的區塊：`src/**`、tests、package files、`.agents/skills/**`、`.claude/**`、`CLAUDE.md`、`scripts/project-check.sh`與歷史records。
- 修改點定位理由：Upgrade Check已確認只有core `requirement-breakdown`落後；其他copied core assets、thin adapters與harness均對齊。
- 需同步檢查的測試：project harness與workspace validator；不要求npm build/test。
- 需同步檢查的文件：上述5份active project docs、task index與本task。

## 十、輸入、輸出與任務附件

- 輸入：workspace `v1.16.0`／ref `bad7c60`的manifest、registry、Web Stage 1 assets/proposal/validation，以及project baseline與Upgrade Check結果。
- 輸出：5個project-local Web assets、同步後的core requirement skill、對齊的active docs、驗證與closure紀錄。

### 10.1 Task Artifacts / Visual References

- Artifact directory：N/A；本task不依賴圖片、sample data或聊天附件。
- Visual references：N/A。
- Data / fixture references：N/A。
- External / non-committed references：workspace source透過project baseline的repo path與ref取得，不複製proposal或validation report。
- Artifact handling checklist：
  - [x] 本task不依賴可提交附件
  - [x] 必讀context均有repo-relative或baseline記錄的workspace reference
  - [x] 不需建立`TASK-004-assets/`
  - [x] project artifact不放入workspace shared/core或shared/domain

## 十一、驗收標準

1. `.agents/domain/web/`只包含本task列出的1個base、2個skills與2個templates，且逐檔與workspace ref `bad7c60`來源一致。
2. `.agents/core/skills/requirement-breakdown/SKILL.md`與同ref workspace source一致，並包含Web companion routing。
3. `AGENTS.md`能路由到project-local Web assets，且保留task-first、confirmation-stop和project-specific規則。
4. baseline維持workspace version `v1.16.0`，明確記錄ref `bad7c60`、`Unreleased`、last checked、5個imported assets、其他not imported與Later項目。
5. active docs不再宣告workspace Web domain不存在；歷史TASK與retrofit records保持不變。
6. 不新增domain native adapters、plugin、hook或harness；現有4組core Codex／Claude adapters仍通過project harness。
7. project harness、workspace validation與`git diff --check`通過；既有非阻斷warnings如實記錄。
8. git diff不包含產品程式、tests、package files、lockfile或workspace shared/domain修改。
9. closure不得宣稱browser、accessibility、security、production或backend integration已驗證。

## 十二、驗證方式

- 單元測試：N/A；不修改產品程式。
- 整合測試：N/A；不執行外部整合。
- End-to-end / flow 測試：N/A；不執行Cypress或live browser flow。
- 手動驗證：逐檔read-back source／target、imported分類、AGENTS routing與project override。
- 文件檢查：active docs不再含失真的Web unavailable宣告；歷史records不改寫。
- domain-specific validation：Web checks只成為後續task規則，不宣稱產品conformance。
- 預計命令：

```bash
bash scripts/project-check.sh --no-git
bash scripts/project-check.sh
bash ../../scripts/validate-workspace.sh
git diff --check
git status --short --branch
find .agents/domain/web -type f | sort
rg -n "web-requirement-breakdown|web-feature-implementation|\.agents/domain/web" AGENTS.md docs/workspace-baseline.md
```

## 十三、風險、限制與假設

- 已知風險：Web Stage 1目前位於local `develop` ref `bad7c60`與`Unreleased`，尚未形成新version/tag；若project只允許已發布ref，實作應暫緩。
- confirmed domain-specific risks：native discovery不存在，routing必須經`AGENTS.md`；domain規則不得覆蓋Defect Generator的API、Canvas、AI、GPU與安全限制。
- 已知限制：不提供Later Web能力，也不證明產品符合accessibility/security/production要求。
- 假設前提：確認本task即表示接受以workspace current local ref `bad7c60`作為copy source；若要求等待remote/tag，需先更新task決策。
- 人工覆核需求：確認Unreleased ref、最小5資產集合、未導入bootstrap/retrofit assets與不建立domain native adapters。

## 十四、建議技能

### Core skills

- skill：`project-upgrade-baseline-update`（workspace pointer）
- 使用理由：管理copy/pointer/not imported、baseline、adapter與confirmation-stop。
- skill：`code-review`
- 使用理由：實作後檢查routing、project override、文件一致性與scope。

### Domain skills

- skill：`web-requirement-breakdown`、`web-feature-implementation`
- 使用理由：本task交付物；導入完成前只作workspace source，不視為project-local active skill。

### Project-specific skills

- skill：N/A
- 使用理由：本task不建立project-specific skill。

## 十五、DevOps 文案草稿摘要

- Work Item 草稿位置：未建立；手動Azure DevOps流程與templates尚未確認。
- PR 草稿位置：未建立；目前停在task confirmation gate。
- 文件同步提醒：實作後同步active project docs、task index與本task。

## 十六、相關文件與參考

### Project entry

- `README.md`
- `AGENTS.md`
- `PLAN.md`

### Project docs

- `docs/workspace-baseline.md`
- `docs/context.md`
- `docs/requirements.md`
- `docs/architecture.md`
- `docs/testing.md`
- `docs/tasks/README.md`

### Project-local core assets

- `.agents/core/base/BASE_AGENTS.md`
- `.agents/core/skills/requirement-breakdown/SKILL.md`
- `.agents/core/templates/task-template.md`
- `.agents/core/checklists/task-template-compliance-checklist.md`

### Project-local active domain assets

- `.agents/domain/web/`：目前`not imported`；本task確認後才建立最小active set。

### Workspace reference sources

- `shared/workspace-manifest.json`
- `shared/registry.md`
- `shared/domains/web/README.md`
- `shared/domains/web/base/DOMAIN_AGENTS.md`
- `shared/domains/web/skills/web-requirement-breakdown/SKILL.md`
- `shared/domains/web/skills/web-feature-implementation/SKILL.md`
- `shared/domains/web/templates/web-task-template.md`
- `shared/domains/web/templates/web-integration-checklist-template.md`
- `shared/core/skills/requirement-breakdown/SKILL.md`
- `docs/workspace-proposals/web-domain-mvp-proposal.md`
- `docs/workspace-validation/WVAL-web-domain-mvp-stage1.md`
- `changelog.md`

## 十七、任務結尾檢查

### 17.1 實際修改摘要

- 實際新增檔案：本task，以及`.agents/domain/web/`下1個base、2個skills與2個templates。
- 實際修改檔案：`.agents/core/skills/requirement-breakdown/SKILL.md`、`AGENTS.md`、`README.md`、`PLAN.md`、`docs/context.md`、`docs/workspace-baseline.md`、`docs/tasks/README.md`與本task。
- 實際未修改但已確認無需修改的檔案：`.agents/skills/**`、`.claude/**`、`CLAUDE.md`、`scripts/project-check.sh`、產品程式／tests／package files，以及TASK-001～003與retrofit records。
- 與原預期不同之處：目前無。
- 未納入本次處理但需記錄的項目：正式release/tag、remote同步與Later assets由workspace另行處理。

### 17.2 驗收與驗證結果

- 驗收標準完成情況：9/9；imported set、routing、baseline、文件、scope與overclaim boundary均已read-back。
- 已執行驗證：5個Web assets與core requirement skill逐檔`cmp`、`find` inventory、兩種project harness、workspace validator、stale wording scan、`git diff --check`、git scope review與code review。
- 驗證結果：source parity PASS；project harness `1.2.0` / format `1` PASS；workspace validation PASS；diff check PASS；code review無blocking finding。
- 無法執行的驗證：未執行npm tests/build、Cypress、browser、backend、OAuth或GPU；本task未改產品程式或設定，這些驗證不適用。
- 未驗證風險：Web Stage 1 source仍是workspace local `develop`的Unreleased ref；Claude fresh-session runtime仍為`UNKNOWN`。
- 替代檢查方式：copied asset byte parity、project harness、workspace pointer與文件/routing read-back。
- domain-specific validation 結果：Web domain routing與最小active set完整；未宣稱產品accessibility/security/browser/production conformance。

### 17.3 文件與 DevOps 同步

- 是否需更新 README / PLAN / docs：是；已同步`README.md`、`PLAN.md`、`docs/context.md`與`docs/workspace-baseline.md`。
- 是否已更新 task：是，已回填implementation、validation與review結果。
- 是否已更新 Work Item 草稿：否；流程未確認。
- 是否已更新 PR 草稿：否；使用者未要求PR交付。
- 是否需補 commit message / release note：已列建議commit message；project release note不需要。
- 未同步項目與原因：Work Item、PR與release note均非本次要求。

### 17.4 風險、後續與回補

- 剩餘風險：Unreleased source ref、AGENTS-only domain discovery與產品conformance尚未驗證。
- 人工覆核需求：使用者已要求commit；本次scope、validation與code review已完成。
- 後續 task：目前無；Later Web capabilities有實際需求時再評估。
- 是否發現 shared/core/domain 缺口：否；本task處理的是已正式存在但project尚未導入的asset set。
- 是否需建立 WGAP：否；沒有新shared缺口或跨project evidence需求。
- 是否有 lessons learned / change pattern 候選：目前無；本次屬既有workspace upgrade flow的預期用法。
- 若有，建議依`.agents/core/templates/project-learning-record-template.md`建立：N/A。

### 17.5 Closure Decision

- Final Task status：`Closed`
- Final Verification status：`Tests Passed`
- Final Review status：`Reviewed`
- Final Repo status：`Committed`
- [x] 可關閉
- [ ] 有條件關閉，需列出條件
- [ ] 不可關閉，需補工作
- 結論：TASK-004 implementation、驗證、code review與使用者commit指示均已完成，可關閉。

## 十八、執行紀錄

### 第一次處理

- 日期：`2026-07-22`
- 處理內容：依read-only Project Workspace Upgrade Check建立Web Domain Stage 1 MVP adoption task。
- 結果：`Draft` / `Not Run` / `Pending Confirmation` / `Uncommitted`；未匯入assets、未修改baseline、未commit。

### 第二次處理

- 日期：`2026-07-22`
- 處理內容：使用者確認直接實作；導入5個Web active assets、同步core requirement routing、更新active docs/baseline，執行source parity、harness、workspace validation、diff與code review。
- 結果：`Implemented` / `Tests Passed` / `Pending Review` / `Uncommitted`；無blocking finding，未修改產品碼或workspace shared/domain。

### 第三次處理

- 日期：`2026-07-22`
- 處理內容：使用者要求commit；完成final scope、sensitive file、staged whitespace與validation檢查後，以單一commit收尾。
- 結果：`Closed` / `Tests Passed` / `Reviewed` / `Committed`。

## 十九、更新紀錄

### v0.1

- 建立Web Domain Stage 1 MVP導入、baseline同步、驗證與回復範圍草稿。

### v0.2

- 記錄使用者確認、最小active set導入、文件與baseline同步、完整驗證及code review結果。

### v0.3

- 記錄使用者commit指示與task closure狀態。

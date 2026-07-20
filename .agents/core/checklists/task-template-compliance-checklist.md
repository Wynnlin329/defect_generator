# Task Template Compliance Checklist

## 文件目的

本 checklist 用於人工檢查 project-local `docs/tasks/TASK-xxx.md` 是否符合 core `task-template.md` 的最低結構與工作流要求。

它是人工 checklist，不是 parser、linter、CLI 或自動化 harness。若需要可執行檢查，應在後續 workspace check harness 階段另行設計。

---

## 一、適用範圍

- [ ] project-local `docs/tasks/TASK-xxx.md`
- [ ] task 建立或大幅更新後的 confirmation review
- [ ] task 實作完成前的 closure review
- [ ] 歷史 task 回補時的最小結構檢查

---

## 二、不適用範圍

- [ ] workspace maintenance task；應使用 `workspace-task-template.md`
- [ ] skill integration proposal
- [ ] domain integration proposal
- [ ] WINTAKE / WGAP / Domain MVP / domain scope expansion review
- [ ] automated parser / linter / CLI validation
- [ ] 強制回填所有歷史 task

---

## 三、Routing Check

- [ ] 任務是單一 project 的功能、bug fix、文件、release、DevOps 文案或一般需求拆解
- [ ] 已使用 project-local `.agents/core/templates/task-template.md`
- [ ] 未誤用 `workspace-task-template.md`
- [ ] 若是 workspace repo 本身維護任務，已改走 workspace development flow
- [ ] 若涉及 domain-specific 補充，已保留 core task template 主體，再套用 active domain template

---

## 四、Template Structure Check

- [ ] 基本資訊章節存在
- [ ] 基本資訊章節已分列 `Task status`、`Verification status`、`Review status`、`Repo status`
- [ ] `1.1 Status Rules` 存在，且未把 task 進度、驗證、review、repo / PR 狀態混在同一欄
- [ ] Domain Context 章節存在
- [ ] DevOps 對應資訊章節存在，或已標示不適用
- [ ] 背景說明存在
- [ ] 任務目標存在
- [ ] 本次範圍存在
- [ ] 不在本次範圍存在
- [ ] 影響範圍存在
- [ ] 預期修改點存在
- [ ] 輸入、輸出與任務附件存在
- [ ] 驗收標準存在
- [ ] 驗證方式存在
- [ ] 風險、限制與假設存在
- [ ] 建議技能存在
- [ ] DevOps 文案草稿摘要存在，或已標示不適用
- [ ] 相關文件與參考存在
- [ ] 任務結尾檢查存在
- [ ] 執行紀錄存在
- [ ] 更新紀錄存在
- [ ] 沒有以既有 task 文件取代 template 欄位

---

## 五、Domain Context Check

- [ ] 已記錄 project primary domain
- [ ] 已記錄 task active capability
- [ ] 已記錄 active domain
- [ ] 已說明本 task 是否改變 project primary domain
- [ ] 已列出 domain-specific files to inspect
- [ ] 已列出 domain-specific risks to check
- [ ] 已列出 domain-specific validation
- [ ] 未把 domain-specific 欄位寫成 core required field

---

## 六、Task Artifact / Visual Reference Check

- [ ] 若 task 明確依賴可提交附件，且 agent 可取得原始檔或本機路徑，已建立或使用 `docs/tasks/TASK-xxx-assets/`
- [ ] 若 task 依賴附件但未落地到 `docs/tasks/TASK-xxx-assets/`，已記錄大型、授權、敏感、私有、外部系統或不可取得等例外原因
- [ ] 若 task 不依賴附件，已標示不適用或留空且不影響執行
- [ ] 每個 artifact 已記錄 repo-relative path 或 external reference
- [ ] 每個 artifact 已說明用途、來源 / 日期與使用方式
- [ ] 必讀圖片、截圖、標註圖、目標畫面、sample data、log 或設計參考沒有只存在聊天附件
- [ ] 不適合 commit 的大型、授權、敏感或私有 artifact 已記錄不可 commit 原因與取得方式
- [ ] project-local artifact 未被放入 workspace shared/core 或 shared/domain asset path

---

## 七、DevOps Check

- [ ] 若 project 採手動 Work Item 流程，已處理 `docs/devops/workitems/*.md`
- [ ] 若本任務預期產生 PR，已處理 `docs/devops/prs/*.md`
- [ ] 若暫不建立 Work Item 草稿，已說明原因
- [ ] 若暫不建立 PR 草稿，已說明原因
- [ ] commit message 建議已列出或已標示不適用

---

## 八、Acceptance / Validation Check

- [ ] 驗收標準具體可檢查
- [ ] 驗證方式包含對應層級的 build / typecheck / test / manual validation
- [ ] `Task status` 只描述任務本身進度，未混入 build、manual verification、review 或 git 狀態
- [ ] `Verification status` 只描述驗證完成度，未混入 task progress、review 或 repo / PR 狀態
- [ ] `Review status` 只描述使用者確認、人工 review 或變更要求
- [ ] `Repo status` 只描述 task 文件與相關修改是否已進 git / PR
- [ ] 若無法執行驗證，已記錄阻塞原因
- [ ] 已記錄未驗證風險
- [ ] 已記錄替代檢查方式
- [ ] domain-specific validation 已處理或已標示不適用

---

## 九、Closure Check

- [ ] 實際新增檔案已回填
- [ ] 實際修改檔案已回填
- [ ] 未修改但已確認無需修改的檔案已回填
- [ ] 驗收標準完成情況已回填
- [ ] 已執行驗證與結果已回填
- [ ] 文件 / DevOps 同步狀態已回填
- [ ] 剩餘風險已回填
- [ ] 人工覆核需求已回填
- [ ] 後續 task 已回填或標示無
- [ ] Closure Decision 已選擇並說明結論
- [ ] Closure Decision 已回填 Final Task status / Final Verification status / Final Review status / Final Repo status
- [ ] Closure Decision 更新時，第一章的 `Task status`、`Verification status`、`Review status`、`Repo status` 已同步更新

---

## 十、Learning Record / WGAP Check

- [ ] 已判斷是否有 lessons learned / change pattern 候選
- [ ] 若有 project-local learning，已建立或建議建立 `docs/lessons/LEARN-xxx.md`
- [ ] 若有 change pattern 候選，已建立或建議建立 `docs/change-patterns/PATTERN-xxx.md`
- [ ] 若候選內容可能屬於 shared/core/domain 缺口，已建立或建議建立 WGAP
- [ ] 若不建立 learning record 或 WGAP，已說明原因
- [ ] 未直接修改 workspace shared assets 來處理單一 project learning

---

## 十一、Non-compliance Handling

若 task 不符合 checklist，應選擇至少一項處理方式：

- [ ] 修正 task 文件
- [ ] 標示不適用與理由
- [ ] 建立 follow-up task
- [ ] 建立或建議 WGAP
- [ ] 暫緩 closure

不得在缺少必要欄位、驗證結果或 closure decision 時直接宣稱 task 已完成。

---

## 十二、Conclusion

- [ ] PASS
- [ ] CONDITIONAL PASS
- [ ] FAIL
- 結論：
- 條件或後續：

---

## 十三、更新紀錄

### v0.1

- 初版建立

# Skill: web-feature-implementation

## 用途

在已確認的 Web task 範圍內定位、實作與驗證 feature，同時保留既有 stack、架構與公開 contract。

## 前置條件

- task 已建立且依 core 規則確認，或使用者已明確授權直接實作
- active domain = `web`
- 主修改範圍、驗收標準與不在範圍已可辨識

## 執行步驟

1. 讀取 task、Web domain base、相關 architecture / requirement，以及依 `web-integration-checklist-template.md` 建立的 integration checklist。
2. 依 repo evidence 定位 route、page / component、state、API、style / asset、config 與 test 入口。
3. 先確認既有 loading、empty、error、validation、permission 與 responsive behavior，避免破壞隱含 contract。
4. 以達成 task 的最小 coherent change 實作；不得順手遷移 framework、重寫 routing / state 或更換 build tool。
5. 檢查 browser security boundary：untrusted input、DOM output、URL、public config、auth / storage、cross-origin request 與敏感 logging。
6. 檢查 accessibility：semantic structure、keyboard、focus、name / role / state、status / error feedback 與支援 viewport。
7. 依 project 已宣告能力執行 affected checks、type-check / lint、tests、production-equivalent build、browser / manual checks 與 project harness。
8. 將未執行項目、失敗 baseline、environment limitation 與 residual risk 明確記錄，不放大驗證結論。
9. 更新 task、必要文件與 integration checklist；若發現可跨 project 的 shared 缺口，另記 WGAP，不直接修改 workspace。

## 完成條件

- 變更未超出已確認 task
- acceptance criteria 有對應 evidence
- security / accessibility / responsive checks 已執行或明確標示 UNKNOWN
- build success 未被誤述為完整 browser 或 production integration 驗證
- project 文件與 task 狀態已同步

## 停止條件

- 實作需要改變未確認的公開 API、auth、routing、storage 或 deployment contract
- 需要真實 endpoint、credential、device 或 production environment 才能驗證
- 發現既有變更與本 task 衝突，且無法安全保留

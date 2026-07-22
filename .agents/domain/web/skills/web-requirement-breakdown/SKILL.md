# Skill: web-requirement-breakdown

## 用途

作為 core `requirement-breakdown` 的 Web domain companion，把 Web 需求補充為可實作、可驗證且不預設 framework 的 task。

## 執行步驟

1. 先讀 project `AGENTS.md`、core requirement skill、Web `DOMAIN_AGENTS.md` 與 `web-task-template.md`。
2. 找出使用者入口、route / page / component、主要 action 與完成結果。
3. 列出適用的 UI states：initial、loading、empty、success、validation error、request error、permission denied、disabled、retry。
4. 說明 state / API / storage / auth boundary，以及哪些驗證必須由 server 或外部系統完成。
5. 加入 responsive、keyboard、focus、name / role / state 與動態訊息的 acceptance criteria。
6. 標示 browser、viewport、rendering / deployment assumption；不確定時使用 UNKNOWN 或待確認事項。
7. 依 repo evidence 列出主修改點、連動點、測試入口與 project-declared validation commands。
8. 將不在本次範圍、security / privacy risks、人工覆核及無法自動驗證項目寫入 task。
9. 依 core 規則在 task 建立後停下等待確認；使用者已明確要求直接實作時才可繼續。

## 最小輸出

- core task 欄位
- Web domain supplement
- UI state / route / data boundary
- security、accessibility、responsive 與 deployment acceptance
- validation plan 與 residual risks

## 禁止事項

- 用 framework 慣例取代 repo evidence
- 把 client-side UI guard 當成 authorization acceptance
- 只寫 happy path 或只以 build success 作為完成條件
- 未驗證便宣稱 browser、accessibility 或 production 相容

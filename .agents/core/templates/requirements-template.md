# Requirements Template

## 文件目的

本文件用於描述 project 或大型功能的正式需求，作為後續分析、設計、開發、測試與驗收的依據。

本模板只描述「要做什麼」與「為什麼要做」，不過早限定實作方式；domain-specific 情境、畫面、流程或整合細節應連到對應 domain 文件。

---

## 一、基本資訊

- Project / 功能名稱：
- 文件版本：
- 文件狀態：
- 建立日期：
- 最後更新日期：
- 負責人：
- 文件類型：
- 需求可信度：

---

## 二、Domain Mapping

- Primary domain:
- Secondary capabilities:
- Domain selection rationale:
- Active domain for this requirement:
- Imported core assets:
- Imported domain assets:
- Project-specific overrides:

---

## 三、背景說明

### 1. 背景

### 2. 問題描述

### 3. 需求來源

### 4. 已知事實來源

- 使用者口述需求：
- 現有 repo / 程式碼盤點：
- 既有文件：
- 會議紀錄 / 討論紀錄：
- domain-specific 文件：

---

## 四、目標與範圍

### 1. 需求目標

1.
2.
3.

### 2. 成功標準

1.
2.
3.

### 3. 本次範圍

1.
2.
3.

### 4. 不在本次範圍

1.
2.
3.

---

## 五、使用者、角色與情境

### 1. 主要使用者 / 依賴者

- 角色：
- 需求：
- 影響：

### 2. 使用情境

- 情境：
- 觸發：
- 預期結果：
- 例外情況：
- domain-specific 補充文件：

---

## 六、功能需求

### 功能需求 1

- 功能名稱：
- 功能說明：
- 輸入：
- 輸出：
- 前置條件：
- 例外情況：
- domain-specific notes：

### 功能需求 2

- 功能名稱：
- 功能說明：
- 輸入：
- 輸出：
- 前置條件：
- 例外情況：
- domain-specific notes：

---

## 七、非功能需求

- 效能：
- 穩定性：
- 安全性：
- 相容性：
- 可維護性：
- 可觀測性：
- 其他：

---

## 八、外部依賴

- 外部系統：
- 串接方式：
- 限制：
- 風險：
- domain-specific integration 文件：

---

## 九、限制與假設

### 1. 已知限制

1.
2.
3.

### 2. 假設前提

1.
2.
3.

---

## 十、驗收標準

請用明確可檢查的方式描述。

1.
2.
3.

---

## 十一、風險與待確認事項

### 1. 已知風險

1.
2.
3.

### 2. Domain-specific risks

- 來源文件：
- 摘要：

### 3. 待確認事項

1.
2.
3.

---

## 十二、可能影響範圍與修改方向

> 本章不要求精準到最終實作檔案，但應指出後續最可能影響哪些模組或流程，供 task 拆解與實作前定位使用。

- 可能影響模組：
- 可能影響資料流 / 控制流：
- 可能影響外部整合：
- 可能影響文件：
- 後續任務拆解時建議優先確認：
- active domain 補充文件：

---

## 十三、後續任務拆解建議

### 1. 建議優先拆成哪幾類 task

1.
2.
3.

### 2. 建議先建立 task 再實作的項目

1.
2.
3.

### 3. 建議同步檢查的文件 / 測試 / 整合點

- `docs/context.md`
- `docs/architecture.md`
- `docs/tasks/*`
- active domain 文件：
- 測試：
- 整合點：

---

## 十四、相關文件

- `README.md`
- `PLAN.md`
- `docs/context.md`
- `docs/architecture.md`
- `docs/workspace-baseline.md`
- `docs/tasks/*`
- active domain 文件：
- 其他：

---

## 十五、更新紀錄

### v0.1

- 初版建立

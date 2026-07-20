# Architecture Template

## 文件目的

本文件用於描述 project 的整體架構、模組分層、主要流程、資料流、整合點、風險點與擴充方向，作為設計、開發、測試與維護的共同參考。

本模板只保留跨 domain 通用欄位；screen、navigation、storage、platform lifecycle 等 domain 專屬欄位應放在對應 domain templates 中。

---

## 一、基本資訊

- Project 名稱：
- 文件版本：
- 建立日期：
- 最後更新日期：
- 維護人：

---

## 二、Domain Mapping

- Primary domain:
- Secondary capabilities:
- Domain selection rationale:
- Active domain for architecture:
- Imported core assets:
- Imported domain assets:
- Project-specific overrides:

---

## 三、系統概覽

### 1. Project 摘要

### 2. 架構目標

例如：

- 易維護
- 易擴充
- 易定位修改點
- 易測試
- 易整合
- 降低跨模組副作用

### 3. 系統邊界

- 本 project 負責：
- 本 project 不負責：
- 上游系統：
- 下游系統：

---

## 四、執行入口與生命週期

> 請描述通用的執行入口與生命週期；domain-specific lifecycle 請連到 domain 文件。

- 主要入口：
- 初始化流程：
- 啟動後第一個流程：
- 關閉 / 回收流程：
- 高風險入口：
- Domain-specific lifecycle 文件：

---

## 五、架構分層

### Layer 1

- 名稱：
- 主要責任：
- 主要元件：
- 常見修改情境：
- 常見檔案 / 路徑：
- 修改此層時需同步檢查：
- 高風險注意事項：

### Layer 2

- 名稱：
- 主要責任：
- 主要元件：
- 常見修改情境：
- 常見檔案 / 路徑：
- 修改此層時需同步檢查：
- 高風險注意事項：

### Layer 3

- 名稱：
- 主要責任：
- 主要元件：
- 常見修改情境：
- 常見檔案 / 路徑：
- 修改此層時需同步檢查：
- 高風險注意事項：

---

## 六、模組關係

### Module A

- 作用：
- 依賴哪些模組：
- 被哪些模組使用：
- 常見修改情境：
- 修改此模組時需同步檢查：
- 相關測試位置：

### Module B

- 作用：
- 依賴哪些模組：
- 被哪些模組使用：
- 常見修改情境：
- 修改此模組時需同步檢查：
- 相關測試位置：

---

## 七、主要流程

### Flow 1

- 入口：
- 觸發方式：
- 主要步驟：
- 涉及模組：
- 狀態或資料變化：
- 輸出：
- 相關測試位置：
- 高風險檢查點：
- Domain-specific flow 文件：

### Flow 2

- 入口：
- 觸發方式：
- 主要步驟：
- 涉及模組：
- 狀態或資料變化：
- 輸出：
- 相關測試位置：
- 高風險檢查點：
- Domain-specific flow 文件：

---

## 八、主要資料流

### Data Flow 1

- 資料來源：
- 觸發方式：
- 入口位置：
- 中間處理：
- 資料存取位置：
- 輸出：
- 涉及模組：
- 相關測試位置：
- 高風險檢查點：

### Data Flow 2

- 資料來源：
- 觸發方式：
- 入口位置：
- 中間處理：
- 資料存取位置：
- 輸出：
- 涉及模組：
- 相關測試位置：
- 高風險檢查點：

---

## 九、外部整合點

### Integration 1

- 名稱：
- 用途：
- 初始化位置：
- 呼叫位置：
- 依賴模組：
- 失敗處理：
- 高風險注意事項：

### Integration 2

- 名稱：
- 用途：
- 初始化位置：
- 呼叫位置：
- 依賴模組：
- 失敗處理：
- 高風險注意事項：

---

## 十、測試結構

- Unit tests：
- Integration tests：
- End-to-end / flow tests：
- Manual verification：
- 測試缺口：

---

## 十一、常見修改入口

- 修改類型：
- 通常先看：
- 常見連動：
- 不建議直接修改：
- 相關 domain 文件：

---

## 十二、觀測與除錯

- log：
- metrics：
- tracing / crash：
- debug entry points：
- 常見排查流程：

---

## 十三、風險與限制

### 1. 架構風險

1.
2.
3.

### 2. 不可違反限制

1.
2.
3.

### 3. Domain-specific risks

- 來源文件：
- 摘要：

---

## 十四、相關文件

- `README.md`
- `AGENTS.md`
- `PLAN.md`
- `docs/workspace-baseline.md`
- `docs/requirements.md`
- `docs/context.md`
- `docs/tasks/*`
- active domain architecture / flow / risk 文件：
- 其他：

---

## 十五、更新紀錄

### v0.1

- 初版建立

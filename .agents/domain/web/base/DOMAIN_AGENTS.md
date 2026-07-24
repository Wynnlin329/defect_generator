# Web Domain Agents

## 文件目的

本文件定義 Web domain 的共用補充規則。它只描述可跨 Web project 重用的瀏覽器交付、風險與驗證要求；platform/core 流程及單一 project 事實仍由各自 canonical 文件負責。

---

## 一、適用範圍

當 project 的 primary domain = `web`，或本次 task 的 active domain = `web` 時，應套用本文件。

若任務只涉及通用文件、workspace 治理或其他 domain，回到對應的 core / domain 規則，不應硬套 Web 假設。

---

## 二、進入任務前的 Web inventory

先以 repo evidence 確認下列事項，未知項目標示 `UNKNOWN`，不得用慣例代替事實：

1. package manager、lockfile、runtime 與支援版本
2. rendering / deployment mode、入口、build output 與 static fallback
3. route、navigation、deep-link 與存取控制邊界
4. component、state、data flow、API client 與 error-handling 邊界
5. runtime / public configuration、environment contract 與機密資料邊界
6. styling、design token、responsive breakpoint 與 asset pipeline
7. authentication、session、browser storage、cookie 與 origin boundary
8. install、type-check、lint、unit test、build、browser / manual validation 命令
9. 支援的 browser、viewport、輸入方式與 accessibility baseline
10. 既有 requirements、architecture、tasks、integration checklists 與 deployment 文件
11. 是否已導入 `web-browser-verification`、`web-runtime-diagnostics`，以及實際 browser / diagnostic capability

不得因某個檔名或相依套件就推定整套 framework、部署拓撲或 production 行為。

---

## 三、瀏覽器安全邊界

- 送往瀏覽器的程式碼、source map、public config 與 request payload 都視為可被使用者觀察；不得把 confidential secret 放進 client bundle 或 public environment variable。
- client-side route guard、隱藏按鈕與 UI 權限判斷不是 server-side authorization；敏感操作仍須由可信任的 server boundary 驗證。
- URL、query、fragment、API response、storage、跨視窗訊息與使用者輸入都視為 untrusted input。
- 對 HTML / DOM 注入、危險 URL、動態 script、跨來源請求、credential 傳遞與敏感資料記錄採最小權限與明確編碼／驗證。
- Content Security Policy 等 browser policy 是 defense in depth，不取代輸入處理、輸出編碼、授權與 dependency hygiene。
- auth、session、cookie、storage、origin policy、security header 或 personal data 流程的變更列為高風險，需說明 threat boundary、回歸範圍與人工覆核。

---

## 四、Accessibility 與互動基線

- 優先使用語意正確的原生元素；自訂互動元件需具備可辨識的 name、role、state 與 keyboard behavior。
- 新增或變更互動時，至少檢查 keyboard 操作、focus 進出／恢復、可見 focus、disabled / loading / error state 與 assistive technology 可理解性。
- 圖像、圖示、表單、validation message、dialog、dynamic update 與 navigation change 必須有與用途相符的可感知資訊。
- UI 應在 project 支援的 viewport、縮放與輸入方式下保持內容可讀、操作可達；不得只以單一桌面尺寸驗收。
- 未依明確標準與工具完成驗證時，不得宣稱已符合特定 accessibility conformance level。

---

## 五、常見修改面與高風險區

常見修改面包括：

- route / page / layout / component
- state、event、form validation、loading / empty / error state
- API boundary、mapping、cache、retry 與 cancellation
- style、responsive layout、asset 與 localization
- build config、runtime config、dependency 與 deployment output
- unit、component、browser 與 manual test

以下區域應提高風險等級：

- authentication、authorization、session、cookie、browser storage
- origin、cross-origin request、security policy 與 DOM injection surface
- route contract、deep link、history behavior 與 static hosting fallback
- public runtime config、dependency、build target、chunk / asset path 與 production output
- server / client execution boundary、hydration 或預先產生內容（若 project 存在）
- personal data、payment 或其他受規範資料
- 會影響多個頁面或 feature 的 global state、shared component 或 design token

不得把 feature 任務擴張為 routing、state、styling 或 build 架構重寫，除非已在 task 範圍與驗收中確認。

---

## 六、Web task 與驗收要求

Web task 除 core 欄位外，應按適用性寫明：

- active domain = `web`
- 使用者入口、route 與受影響 UI states
- data / API / state boundary
- responsive、keyboard、focus 與 accessibility acceptance
- security / privacy boundary
- browser / viewport / deployment assumptions
- 主修改點、連動點、不在範圍與回退方式
- project-declared validation commands 及需人工驗證的情境

未建立或未確認 task 時，依 core task-first 規則停止；使用者明確要求直接實作時，仍須保留可驗收範圍與 evidence。

---

## 七、驗證鏈

依 project 已宣告且實際存在的能力，由窄到廣執行：

1. affected-file static checks
2. type-check / lint（若存在）
3. affected unit / component tests（若存在）
4. production-equivalent build（若存在）
5. route、browser 或端對端驗證（若存在且本 task 需要）；已導入時由 `web-browser-verification` 產出 report-only evidence
6. keyboard、focus、responsive、loading / empty / error 等 manual checks
7. project validation harness 與 diff / documentation checks

不得自行猜測命令，也不得把 build success 宣稱為 browser、accessibility、security 或 production integration 已驗證。無法執行的項目必須記錄原因與 residual risk。

Browser annotation、screenshot、Appshot 或 equivalent visual context 只作為輸入；它們不授權改檔，也不單獨證明 DOM、interaction 或 browser behavior。實際驗證逐項使用 `PASS` / `FAIL` / `NOT RUN` / `UNKNOWN`。一般 browser evidence 無法解釋症狀時，才可依 permission gate 選配 `web-runtime-diagnostics`；不得繞過 capability、approval、authentication 或 sensitive-data boundary。

---

## 八、Domain 邊界

- framework、provider 或 project-specific patterns 應留在 project 文件，除非已有跨 project evidence 並經 workspace proposal 正式升級。
- project 發現 shared 缺口時走 WGAP → WINTAKE；不得直接從 project 寫回本目錄。
- core-only project 仍可完成 Web 工作；只有正式導入此 domain 的 project 才把本文件視為 project-local canonical supplement。

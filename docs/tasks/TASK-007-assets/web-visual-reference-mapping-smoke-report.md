# Web Visual Reference Mapping Smoke Report — TASK-007

## Scope

- task / request：`TASK-007` Web Visual Reference Mapping adoption smoke，使用`TASK-006`既有真實證據
- active domain：`web`
- mapping intent：把首頁兩則Browser comments與修改前Current anchors建立可追溯關係，產出implementation acceptance與Browser re-verification handoff
- authorization：report-only；本report不授權或執行產品程式修改
- capability used：project-local `web-visual-reference-mapping`
- unavailable capability：Annotation原始圖片下載／本機路徑；Target獨立圖片；tab ID；zoom；cross-browser、pixel diff與visual regression
- evidence timing：全部Browser與Annotation內容來自既有`TASK-006`紀錄；本次未重新開啟Browser或重跑Browser verification

## Visual Input Registry

| Input ID | Role | Source type | Source / tab identity | URL / state | Viewport or dimensions | Zoom | Input mode | Availability | Asset disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `C-001` | Current | Existing Browser evidence record | `TASK-006` before-change Announcement evidence；tab ID `UNKNOWN` | `http://127.0.0.1:5173/`；initial／empty | 1124×1245 | `UNKNOWN` | rendered DOM / pointer-visible page | partial；只有task文字與computed-style紀錄 | `external-reference` |
| `C-002` | Current | Existing Browser evidence record | `TASK-006` before-change empty-state button evidence；tab ID `UNKNOWN` | `http://127.0.0.1:5173/`；empty recently-project state | 1124×1245 | `UNKNOWN` | rendered DOM / pointer-visible page | partial；只有task文字與computed-style紀錄 | `external-reference` |
| `A-001` | Annotated | Browser comment / marker screenshot | Browser Comment 1；top frame；tab ID `UNKNOWN` | `http://127.0.0.1:5173/`；Announcement card | 1124×1245 | `UNKNOWN` | user annotation | partial；comment、selector與marker語意可用，原始圖片路徑不可用 | `original-unavailable` |
| `A-002` | Annotated | Browser comment / marker screenshot | Browser Comment 2；top frame；tab ID `UNKNOWN` | `http://127.0.0.1:5173/`；empty recently-project state | 1124×1245 | `UNKNOWN` | user annotation | partial；comment、selector與marker語意可用，原始圖片路徑不可用 | `original-unavailable` |
| `R-001` | Reference | Existing Browser verification report | `docs/tasks/TASK-006-assets/browser-verification-report.md` | `/`；initial／empty | 1124×1245 | `UNKNOWN` | prior DOM / computed-style read-back | available as committed text evidence | `external-reference` |

## Anchor Registry

| Anchor ID | Input ID | Visible label / region | Semantic role | Relative position / relationship | Selector / node path | Evidence class | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `C-ANNOUNCEMENT` | `C-001` | `Announcement` | Announcement card level-5 heading | Heading inside announcement card | `#div-announcement h5` | observed in existing TASK evidence | high |
| `C-NEW-PROJECT` | `C-002` | `新增專案` | Empty-state action button | Button inside no-recent-project centered state | `#div-no-recently-project ... button` | observed in existing TASK evidence | high |
| `A-ANNOUNCEMENT` | `A-001` | `Announcement` marker | User-requested heading style | Marker targets the Announcement card / heading relationship | `div#div-announcement`；task narrows target to its `h5` | user annotation | high |
| `A-NEW-PROJECT` | `A-002` | `新增專案` marker | User-requested empty-state button style | Marker targets the empty-state New Project button | `div#div-no-recently-project ... button.btn.btn-primary` | user annotation | high |

## Source Identity

- user-assigned Current：沒有獨立的「Current」標籤；本report只把TASK-006明列的修改前Browser evidence註冊為retrospective Current。
- user-assigned Target：沒有獨立Target圖片；Target intent只來自兩則使用者Annotation文字。
- tab / window evidence：兩則comment都記錄相同URL與top frame；沒有可持久化tab ID。
- same-source or different-source conclusion：可確認為相同route／frame脈絡；不可推測是否為同一個tab instance。
- ambiguous identity：tab identity、timestamp、zoom與原始marker image path均為`UNKNOWN`。
- resolution needed：本smoke不需要補件；若未來要求pixel geometry、marker overlay重現或跨surface比對，需取得原始Annotation。

## Comparison Contract

- comparison mode：`exact-condition`
- comparable conditions：既有紀錄中的route、empty state、1124×1245 viewport、visible labels與selectors一致，可直接映射annotation anchors。
- different conditions：沒有獨立Target render可比較。
- UNKNOWN conditions：zoom、tab identity、timestamp、device pixel ratio與原始圖片尺寸。
- pixel-perfect claim permitted：no
- reason：Annotation只指定語意與樣式方向，沒有可持久化Target原圖或幾何／色碼規格。

## Mapping Matrix

| Mapping ID | Current anchor | Target / Annotated anchor | Status | Observed Current | Observed Target / annotation | Inferred delta | Confidence / unresolved |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `MAP-001` | `C-ANNOUNCEMENT` | `A-ANNOUNCEMENT` | `MAPPED` | `Announcement` heading靠左、深色；既有紀錄為`text-align: start`、`rgb(33, 37, 41)` | 使用者要求「將Announcement置中，然後改成紅色」 | 水平置中並改為project既有Bootstrap danger紅色；保留heading語意 | relationship high；Annotation未指定精確紅色色碼 |
| `MAP-002` | `C-NEW-PROJECT` | `A-NEW-PROJECT` | `MAPPED` | empty-state按鈕為primary藍色；既有紀錄為`rgb(13, 110, 253)` | 使用者要求「新增專案背景改成紅色」 | 只將empty-state按鈕背景／邊框改為Bootstrap danger紅色；保留文案與handler | relationship high；hover／active與精確色碼未由Annotation指定 |

> `MAPPED`只代表Current與Annotated anchors的關係有直接證據，不等於Browser `PASS`。

## Responsive Intent

- hierarchy / order：不改變Announcement card、Recently Projects區域或empty-state結構。
- wrapping / stacking：沒有Annotation要求；維持現況。
- visibility：兩個目標元素仍需在既有empty state可見。
- readability：文字與button label需維持可讀；本smoke不作contrast conformance結論。
- control usability：按鈕仍需保留native button語意、`type="button"`與既有click handler。
- breakpoint or layout inference：無；只有1124×1245既有條件。
- UNKNOWN：其他viewport、cross-browser、keyboard focus styling與assistive technology結果。

## Source Hints

| Mapping ID | Selector / component / file hint | Evidence | Root cause confirmed? | Modification authorized? |
| --- | --- | --- | --- | --- |
| `MAP-001` | `#div-announcement h5`；`src/views/home_page/HomePage.vue` | TASK-006 selector、task記錄與既有Browser report | no；只確認修改入口 | no；本report為report-only |
| `MAP-002` | `#div-no-recently-project ... button`；`src/views/home_page/HomePage.vue` | TASK-006 selector、task記錄與既有Browser report | no；只確認修改入口 | no；本report為report-only |

## Implementation Acceptance

- [x] confirmed visual delta is stated without assuming unavailable geometry
- [x] Current behavior to preserve is stated
- [x] Target intent is stated
- [x] responsive behavior is stated where dimensions differ；本例沒有不同尺寸，其他viewport保持`UNKNOWN`
- [x] unresolved design decisions remain explicit

Acceptance criteria:

1. `Announcement`維持level-5 heading與原文案，在既有empty-state條件下水平置中並呈現紅色。
2. empty recently-project state的「新增專案」維持native button、原文案、`type="button"`與既有click handler，背景／邊框呈現紅色。
3. populated-state的另一顆新增專案按鈕不在Annotation範圍，維持既有primary樣式。
4. 不從Annotation推定精確色碼、其他viewport、cross-browser、accessibility conformance或pixel equality。

## Browser Re-verification Conditions

| Check | Actual / required URL | State | Viewport | Zoom | Input mode | Expected outcome | Verification status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Announcement alignment / color | `http://127.0.0.1:5173/` | initial／empty | 1124×1245 | `UNKNOWN` | rendered DOM / pointer-visible page | centered、Bootstrap danger red、heading語意保留 | `NOT RUN`（本次mapping smoke） |
| Empty-state button color / semantics | `http://127.0.0.1:5173/` | empty recently-project state | 1124×1245 | `UNKNOWN` | rendered DOM / pointer-visible page | danger red、enabled native button、文案與handler保留 | `NOT RUN`（本次mapping smoke） |

TASK-006既有Browser report在上述條件記錄`PASS`；那是2026-07-23的既有證據，本次沒有重新執行或提升其證據範圍。

## Asset Disposition and TASK Handoff

| Input ID | Disposition | Original path / reference available? | Commit suitability | TASK action | Limitation |
| --- | --- | --- | --- | --- | --- |
| `C-001` | `external-reference` | yes；TASK-006文字紀錄 | yes | reference | 不是原始Browser screenshot |
| `C-002` | `external-reference` | yes；TASK-006文字紀錄 | yes | reference | 不是原始Browser screenshot |
| `A-001` | `original-unavailable` | no | no | request original only if future geometry／overlay proof is required | marker原圖與overlay不可重建 |
| `A-002` | `original-unavailable` | no | no | request original only if future geometry／overlay proof is required | marker原圖與overlay不可重建 |
| `R-001` | `external-reference` | yes；committed TASK-006 report | yes | reference | 只證明既有單一local Browser條件 |

- TASK asset owner：confirmed `TASK-007` workflow；本report落在`docs/tasks/TASK-007-assets/`。
- original unavailable reason：in-app Browser marker screenshots沒有可提交的原始本機路徑、attachment ID或download reference。
- derived screenshot disclosure：本次沒有重新截圖，因此沒有`derived-screenshot`可宣稱或提交。
- sensitive / licensed handling：沒有新增或保存產品／使用者圖片；只引用既有project-local文字證據。

## Handoffs

- task intake：`TASK-006`需求與實作已完成；`TASK-007`只保存本次adoption smoke report。
- `web-feature-implementation`：不需要；本次沒有產品修改授權或未完成delta。
- `web-browser-verification`：本次未重跑；若未來需刷新證據，使用本report列出的相同route／state／viewport條件另行執行。
- `web-runtime-diagnostics`：不需要且project未導入；沒有一般Browser evidence無法回答的bounded diagnostic question。

## Checklist Completion

- [x] Web scope、report-only authorization與owner boundaries明確。
- [x] visual inputs、anchors、source identity、UNKNOWN metadata與stable IDs完整。
- [x] 兩組關係各自只有一個mapping status，且observed／annotation／inference分離。
- [x] mapping status未當成Browser status；既有Browser PASS與本次`NOT RUN`分開。
- [x] Annotation originals標記`original-unavailable`，未建立或冒充derived screenshot。
- [x] implementation acceptance、Browser re-verification conditions與handoffs完整。
- [x] pixel diff、visual regression、E2E、cross-browser與runtime diagnostics均未宣稱。

## Unknowns and Residual Risk

- UNKNOWN：原始marker images、tab instance、zoom、timestamp、其他viewport與browser。
- evidence needed：只有在未來要求marker overlay重現、pixel geometry、cross-browser或新鮮Browser結果時才需補件／重跑。
- residual risk：Bootstrap danger token是TASK-006採用並驗證過的實作選擇，不是Annotation提供的精確色彩規格。
- final report-only conclusion：`MAP-001`與`MAP-002`均為`MAPPED`；report template與checklist可在真實project evidence上完整運作。這是project-local mapping adoption smoke，不新增Browser PASS、不修改產品程式，也不證明cross-project／cross-browser通用性。

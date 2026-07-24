# Web Integration Checklist — TASK-006 Home annotation style update

## Scope

- task：`TASK-006`
- routes / pages / components：`/`、`HomePage.vue`
- APIs / external systems：none changed
- browser / viewport / deployment assumptions：local Vite，1124×1245 viewport
- requested / actual route, state, viewport and input conditions：`/`、empty recently-project state、1124×1245、mouse/keyboard-visible DOM
- annotation / screenshot / Appshot IDs（context only）：Browser Comment 1、Browser Comment 2

## UI and State

- [x] Announcement heading centered and red
- [x] empty-state New Project button uses red background/border
- [x] heading/button semantics and button click handler preserved
- [x] populated-state New Project button remains primary（static template read-back）
- [x] current viewport checked; other viewports recorded as `NOT RUN`

## Security and Privacy

- [x] no browser config, auth, storage, URL, API, DOM-input or sensitive logging change
- [x] no confidential data added
- [x] no authorization claim or boundary changed

## Accessibility

- [x] native heading and button semantics preserved
- [ ] keyboard operation and visible focus：`NOT RUN`; no interaction behavior changed
- [x] no dynamic focus or status/error flow added
- [x] no accessibility conformance claim made

## Build and Runtime

- [x] no dependency or lockfile change
- [x] runtime config and route paths unchanged
- [x] production-equivalent build completed
- [x] deployment/static fallback unaffected by scoped class changes

## Evidence

- static / type / lint：`PASS`; type-check、affected ESLint與diff check
- unit / component tests：`PASS`; 7 files / 49 tests
- build：`PASS`; only existing Bootstrap/Sass deprecation warnings
- browser / manual checks：`PASS`; same route/state/1124×1245 DOM、computed styles與visual screenshot
- browser verification report and matrix：`docs/tasks/TASK-006-assets/browser-verification-report.md`
- runtime diagnostic observation / inference：not needed
- project harness：`PASS`; with installed dependencies temporarily moved outside project scan and restored afterward
- UNKNOWN / residual risks：cross-browser and other viewports not run
- reviewer：Codex automated review + user visual review pending

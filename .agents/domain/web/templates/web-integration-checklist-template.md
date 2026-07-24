# Web Integration Checklist — <feature>

## Scope

- task:
- routes / pages / components:
- APIs / external systems:
- browser / viewport / deployment assumptions:
- requested / actual route, state, viewport and input conditions:
- annotation / screenshot / Appshot IDs（context only）:
- visual mapping report / mapping IDs:
- visual asset disposition:

## UI and State

- [ ] initial, loading, empty, success and error states checked
- [ ] validation, disabled, permission and retry behavior checked where applicable
- [ ] navigation, deep link, refresh and back / forward behavior checked where applicable
- [ ] responsive layout and supported input modes checked

## Security and Privacy

- [ ] browser-visible code and config contain no confidential secret
- [ ] authorization remains enforced by the trusted server boundary
- [ ] untrusted input, URL and API data are handled safely at DOM output
- [ ] cookie, storage, origin and sensitive logging changes were reviewed
- [ ] security policy is treated as defense in depth, not the sole control

## Accessibility

- [ ] semantic elements or equivalent name / role / state are present
- [ ] keyboard operation and visible focus were checked
- [ ] focus entry and restoration were checked for dynamic UI
- [ ] status, validation and error feedback are perceivable
- [ ] no unverified conformance claim is made

## Build and Runtime

- [ ] direct dependency and lockfile changes are intentional
- [ ] public runtime config and route / asset paths are preserved or documented
- [ ] production-equivalent build completed, or limitation recorded
- [ ] deployment / static fallback behavior checked where affected

## Evidence

- static / type / lint:
- unit / component tests:
- build:
- browser / manual checks:
- browser verification report and PASS / FAIL / NOT RUN / UNKNOWN matrix:
- visual mapping matrix and MAPPED / PARTIAL / UNMAPPED / UNKNOWN results（not Browser status）:
- original / external / derived visual reference handling:
- runtime diagnostic observation / inference（若適用）:
- project harness:
- UNKNOWN / residual risks:
- reviewer:

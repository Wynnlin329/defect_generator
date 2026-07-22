# Web Integration Checklist — <feature>

## Scope

- task:
- routes / pages / components:
- APIs / external systems:
- browser / viewport / deployment assumptions:

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
- project harness:
- UNKNOWN / residual risks:
- reviewer:

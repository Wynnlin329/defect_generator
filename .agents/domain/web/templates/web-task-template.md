# Web Domain Supplement — TASK-XXX

## Domain

- active domain: `web`
- user entry / route:
- affected page / component:
- rendering / deployment assumption:

## User-visible Behavior

- primary action:
- success result:
- initial / loading state:
- empty state:
- validation / request error:
- permission / disabled state:
- retry / recovery:

## Data and Trust Boundaries

- state owner:
- API / data source:
- auth / authorization owner:
- browser storage / cookie use:
- untrusted input / DOM output:
- public runtime config:
- personal or sensitive data:

## Accessibility and Responsive Acceptance

- semantic name / role / state:
- keyboard interaction:
- focus entry / movement / restoration:
- status and error announcement:
- viewport / zoom / input modes:

## Change Surface

- primary files / modules:
- coupled files / modules:
- routes / public contracts affected:
- explicitly out of scope:
- rollback / fallback:

## Web Validation Plan

- affected static checks:
- type-check / lint:
- unit / component tests:
- production-equivalent build:
- browser / route checks:
- requested and actual route / state / viewport matrix:
- browser verification evidence owner:
- bounded runtime diagnostic question / permission gate:
- keyboard / focus / responsive manual checks:
- unavailable checks and residual risk:

## Web-specific Acceptance Criteria

- [ ] all applicable UI states are defined and verified
- [ ] client UI is not treated as server authorization
- [ ] confidential values do not enter browser-visible output
- [ ] keyboard, focus and responsive behavior meet the stated acceptance
- [ ] validation conclusions match the evidence actually collected

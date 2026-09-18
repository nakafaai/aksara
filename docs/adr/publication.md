# ADR 0004: Publication plan stays a linear orchestrator

- Status: Accepted
- Date: 2026-09-18

## Context

`preparePublicationPlan` sequences renderer validation, item, projection,
route, and snapshot verification, artifact compilation, signing, runtime
preparation, and stage assembly for one release, branching once for Git versus
rollback provenance. The phase modules behind it (`verification.ts`,
`lifecycle.ts`, `recovery.ts`, `discard.ts`, `runtime.ts`) are small adapters
over the genuine `PublicationTarget` seam, which has both the HTTP
implementation and test fakes: two adapters means a real seam.

A 2026-09-18 architecture review proposed thinning the plan into deep stage,
verify, and activate modules on the grounds that the plan concentrates depth
while the phase modules are shallow.

## Decision

Keep the linear orchestrator. The proposal is declined:

- The sequence in one place is the protocol's locality. ADR-0002 settles
  visibility and ownership in the activation mutation with strict phase
  discipline; scattering that order across modules would force every reader
  to reassemble the protocol instead of reading it top to bottom.
- The phase modules are thin adapters at a real seam, which the shared design
  vocabulary explicitly permits. Depth already lives where it belongs: the
  verification module owns polling, retries, SLOs, and receipts behind its
  own interface and test suite.
- Ordering is proven, not hoped. `plan.test.ts` exercises the full sequence
  through cache-invalidation behaviors that require the correct order, and
  each phase module carries its own focused suite, so an ordering regression
  fails at the composition seam.

Future reviews must not re-propose splitting the orchestrator without new
evidence of actual ordering pain, such as a phase-ordering defect that the
current suites fail to catch.

## Consequences

- `preparePublicationPlan` remains the single readable sequence for release
  preparation; new preparation steps join the sequence with their own
  step-level documentation comment.
- Phase-level changes stay in their owning modules behind the existing
  `PublicationTarget` and verification interfaces.

## Rejected

- Split the orchestrator into deep stage, verify, and activate modules.
  Rejected for the three findings above: it scatters protocol locality,
  duplicates already-real seams, and solves unobserved pain.

# ADR 0003: Production CLI preparation stays one decision per module

- Status: Accepted
- Date: 2026-09-18

## Context

The production CLI prepares a Git release through `prepareProductionGit`,
which threads base, bundle, renderer, runtime, catalog, snapshot, and
transition state. The try-out runtime decisions live in three small modules
(`production/base.ts`, `production/bundle.ts`, `production/runtime.ts`,
`production/transition.ts`), each with dedicated behavior tests, composed
through a harness-backed suite in `production/preparation.test.ts` that covers
genesis, snapshot selection, producer pairs, and key rotation end to end.

A 2026-09-18 architecture review proposed collapsing the try-out runtime
modules into `preparation.ts` on the grounds that their interfaces are nearly
as large as their implementations.

## Decision

Keep one decision per module. The collapse is declined:

- Inlining the three modules into `preparation.ts` pushes it past the 300 LOC
  module budget and merges three focused test files into one, trading small
  crisp interfaces for a god module plus a mega test file.
- The alleged duplication with the publisher does not exist. The publisher
  consumes the refresh decision (`snapshot/release.ts` branches on
  `runtime.kind`); only the CLI computes it from base, bundle, renderer, and
  scope. There is no second implementation to leverage.
- The alleged untested composition is tested. `preparation.test.ts` proves
  null-vs-mismatch-vs-refresh interactions through the production harness,
  so ordering bugs surface at the composition seam, not past it.

Future reviews must not re-propose this collapse without overturning one of
the three findings above with new evidence.

## Consequences

- `prepareProductionGit` keeps delegating try-out runtime decisions to the
  three modules; new try-out decisions follow the same shape with their own
  behavior tests.
- The shared `BaseTryoutRuntimeBundleMismatchError` stays owned by
  `production/bundle.ts` as the cluster's failure vocabulary.

## Rejected

- Inline `bundle.ts`, `runtime.ts`, and `transition.ts` into
  `preparation.ts`. Rejected for the three findings above.
- Merge the three modules into one `tryout.ts` file. Rejected: same
  interfaces, fewer files, no new depth — relocation without leverage.

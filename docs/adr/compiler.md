# ADR 0006: Schema classes carry a brand

- Status: Accepted
- Date: 2026-10-16

## Context

`@effect/tsgo` 0.52 added `schemaClassMissingBrand` (diagnostic TS377141), whose
default severity is `suggestion`. It warns when Schema classes, errors, or Opaque
classes omit the brand type argument. The rule's message asks for
`{ readonly brand: unique symbol }` as the second type argument, because without
a brand TypeScript may accept a structurally compatible value where that class
instance type is expected.

## Decision

Every Schema class carries that brand, so a value with the same shape cannot
pass for an instance of one of them. Aksara's Schema classes, error classes,
tagged classes, and Opaque classes take the brand, `ProvenanceVerificationError`
in `scripts/provenance/schema.ts` included. That file is shared with nakafa.com
and stays byte-identical to nakafa.com's copy, so its brand landed in nakafa.com
first (nakafa.com#2290) and this copy followed it.

`packages/typescript-config/base.json` sets `schemaClassMissingBrand` to `error`,
as nakafa.com does since that change. nakafa.com's own rule record,
`docs/adr/0021-rules.md`, says the same.

## Consequences

- A new Schema class takes the brand, or the typecheck fails with TS377141.
  `Data.TaggedError` is not a Schema class and keeps its form.
- Change `ProvenanceVerificationError` in nakafa.com first: `bun run native`
  compares it byte for byte with nakafa.com's file.
- `bun run native` also compares the Effect cohort pins of both repositories, so the
  nakafa.com cohort moves before Aksara's cohort does. The one exception is an Effect
  release that removes an API the published contracts call, as Effect 4.1 removed
  `effect/Crypto`: no consumer can run that release until a contracts build on it is
  published, so the contracts lead. The pin in `scripts/check/native.ts` then names the
  nakafa.com commit that moves its cohort pins, and nakafa.com adopts the new
  contracts release in that change.
- `bun run native` also requires both repositories to give `schemaClassMissingBrand`
  the same severity, so a change to the rule moves in both.

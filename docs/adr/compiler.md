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

The target is that every Schema error class carries that brand, so a value with
the same shape cannot pass for an instance of one of them. Aksara's Schema
classes, error classes, tagged classes, and Opaque classes take the brand, except
one: `ProvenanceVerificationError` in `scripts/provenance/schema.ts`. That file is
shared with nakafa.com and must stay byte-identical to nakafa.com's copy, so the
brand for that class starts in nakafa.com and this copy follows it.

`packages/typescript-config/base.json` keeps `schemaClassMissingBrand` at `off`
until the change that brands the last Schema error class. That change sets the
rule to `error` in both repositories. nakafa.com keeps the rule off for the same
reason, as its own rule record, `docs/adr/0021-rules.md`, says.

## Consequences

- Do not brand `ProvenanceVerificationError` in this copy alone: `bun run native`
  compares it byte for byte with nakafa.com's file.
- `bun run native` also compares the Effect cohort pins of both repositories, so the
  nakafa.com cohort moves before Aksara's cohort does.
- `bun run native` also requires both repositories to give `schemaClassMissingBrand`
  the same severity, so the rule moves to `error` in both or in neither.

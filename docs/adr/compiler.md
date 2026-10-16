# ADR 0006: Schema classes carry a brand

- Status: Accepted
- Date: 2026-10-16

## Context

`@effect/tsgo` 0.52 added `schemaClassMissingBrand` (diagnostic TS377141), whose
default severity is `suggestion`. It reports a Schema class, error class, tagged
class, or Opaque class declared without a brand. The rule's message asks for
`{ readonly brand: unique symbol }` as the second type argument, because without
a brand TypeScript may accept a structurally compatible value where that class
instance type is expected.

## Decision

`packages/typescript-config/base.json` sets `schemaClassMissingBrand` to
`error`. Aksara's Schema classes, error classes, tagged classes, and Opaque
classes take that brand, so a value with the same shape cannot pass for an
instance of one of them. One class is the exception: `ProvenanceVerificationError`
in `scripts/provenance/schema.ts`. That file is shared with nakafa.com and must
stay byte-identical to nakafa.com's copy. nakafa.com does not enable the rule
yet, because its `@effect/tsgo` pin is 0.51.1, so the brand for that class
starts in nakafa.com and this copy follows it.

## Consequences

- `pnpm typecheck:root` fails on that one class until nakafa.com brands its copy
  and this copy takes the same text. Do not brand this copy alone: `pnpm native`
  compares it byte for byte with nakafa.com's file.
- `pnpm native` also compares the Effect cohort pins of both repositories, so the
  nakafa.com cohort moves before Aksara's cohort does.

# Verification

## Focused document preview

Compile and open one real document through the Aksara CLI and Nakafa renderer:

```sh
pnpm dev -- --document packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx
```

Set `NAKAFA_APP_DIR` when the sibling Nakafa checkout is not at the configured
default. The preview must use the real Nakafa renderer. Do not create a second
preview renderer for content review.

## Required checks

Run focused scope tests first, then the repository gates appropriate to the
change:

```sh
pnpm format
pnpm locales
pnpm boundaries
pnpm typecheck
pnpm test
pnpm build
pnpm verify:consumer
```

Before a release candidate, also run:

```sh
pnpm lint
pnpm deprecations
pnpm security:audit
pnpm check
```

`pnpm check` requires exact renderer credentials and validates the complete
current corpus. It must not read Humanizer output or an editorial review
catalog. Source, provenance, renderer, locale, and publication failures remain
typed blockers, never fallback conditions.

## Final review

- Confirm app locale and delivery language are intentionally different only for
  assessed-language policy.
- Inspect learner-facing component props as well as prose. Any mathematical
  token in a React-node-capable title, description, caption, or label must use
  `<InlineMath />`; reject plain strings such as `y-axis`, `x = 2`, `(3, 4)`,
  or `5 m` when they carry mathematical meaning.
- Compare English, Indonesian, and German siblings for the same formulas,
  conditions, units, significant steps, and conclusions. Natural phrasing may
  differ, but mathematical meaning and instructional support may not.
- Confirm the document compiles and renders without console or network errors.
- Confirm localized route identity has no collision.
- Confirm every new authored translation completed both Humanizer passes.
- Confirm no U+2014 character exists outside a pinned immutable allowlist.
- Confirm no temporary input, preview process, cache, or task-owned artifact is
  left behind.

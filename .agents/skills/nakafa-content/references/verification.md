# Verification

## Focused document preview

Compile and open one real document through the Aksara CLI and Nakafa renderer:

```sh
pnpm dev -- --document packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx
```

Set `NAKAFA_APP_DIR` when the sibling Nakafa checkout is not at the configured
default. The preview must use the real Nakafa renderer. Do not create a second
preview renderer for content review.

## Editorial evidence

Prepare a temporary JSON list of schema-valid review records outside the corpus,
then atomically encode the canonical content-addressed review catalog:

```sh
pnpm editorial:write -- /absolute/path/to/review-records.json
```

The command replaces only `packages/corpus/editorial/review/` after strict
decoding and bounded encoding. Delete the temporary input after verifying that
the canonical catalog and parts contain the intended exact target and source
hashes.

Do not fabricate review records for incomplete content. Publication must remain
closed until the real six-scope review inventory is complete.

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

`pnpm check` requires the exact renderer credentials and the complete canonical
editorial review catalog. A missing or stale record is a release blocker, not a
reason to add a fallback.

## Final review

- Confirm the exact source and target hashes after all prose edits.
- Confirm app locale and delivery language are intentionally different only for
  assessed-language policy.
- Confirm the document compiles and renders without console or network errors.
- Confirm localized route identity has no collision.
- Confirm every new authored translation completed both Humanizer passes.
- Confirm no U+2014 character exists outside a pinned immutable allowlist.
- Confirm no temporary input, preview process, cache, or task-owned artifact is
  left behind.

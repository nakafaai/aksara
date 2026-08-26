# Publication scope

Every content release signs an explicit canonical scope. There is no implicit
whole-catalog release.

The production scope has two independent selectors:

- `families`: whole body families: `article`, `material`, `page`, or `question`
- `snapshots`: structured families such as `program`

A whole-family selection is compact even when the family contains thousands of
documents. Production no longer accepts `content:` selectors because the
exact-content ownership model was retired. Exact content entries remain in the
signed contract only so retained historical releases can still be verified.

Local release commands repeat `--scope`:

```sh
pnpm release -- \
  --release-id release-2026-07-24 \
  --recovery-id recovery-2026-07-24 \
  --scope family:material \
  --scope snapshot:program
```

The production workflow accepts the same selectors as a JSON string array:

```json
["family:material", "snapshot:program"]
```

The workflow validates the array and safely expands it into repeated CLI
arguments inside the exact reviewed checkout. Selector order must already be
canonical; duplicates, unknown values, empty scopes, and implicit full releases
fail before preparation.

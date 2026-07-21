# Phase 0 evidence baseline

These are single-run observations supplied by the Nakafa readiness audit. They
are not 30-sample percentiles and must not be presented as p50 or p95 results.
The compiler-size p95 values below describe files within one corpus pass; they
are not repeated-run latency percentiles.

## Measurement context

- Recorded: `2026-07-21T02:55:06Z`
- Nakafa SHA: `25506da68a5dd97bc55f99b6f7304384c4744206`
- Machine: Apple M3 Pro, arm64, 19,327,352,832 bytes memory
- OS: macOS 26.5 (`25F71`)

## Repository and corpus

- Nakafa `.git`: 1,044,888 KiB, including 956.32 MiB packed objects.
- `packages/contents`: 121,712 KiB.
- Content tree: 5,486 files, including 4,140 MDX files.

These measurements are trigger context, not proof that one Git repository will
remain healthy at 100,000 or 1,000,000 rich documents.

The durable shell log retained these inventory commands:

```sh
du -sk .git packages/contents
git count-objects -vH
find packages/contents -type f | wc -l
find packages/contents -type f -name '*.mdx' | wc -l
```

## Build and development

- Cold `www` build: 154.81 seconds.
- Cold build maximum RSS: 3,920,216,064 bytes.
- `.next` after cold build: 933,736 KiB.
- Current development save-to-visible: right-censored above 120 seconds because
  the compiled marker never became visible during the observation window.
- `.next` after development: 4,514,504 KiB.
- `.next/dev` subset: 3,580,768 KiB.

The retained build and size commands were:

```sh
/usr/bin/time -l pnpm --filter www build
du -sk apps/www/.next
du -sk apps/www/.next/dev
```

The generated `apps/www/.next` directory was moved out of the measurement path
before the cold build. The exact move command was not captured in the durable
command log, so it is intentionally not reconstructed here. Matching `.env*`
files are required to reproduce the build, but their contents must never be
printed or committed.

The save-to-visible probe inserted a unique source marker and waited for that
marker in the served page. Its exact marker command was not captured in the
durable command log. The only defensible result is the right-censored `>120s`
observation above, not a latency percentile.

## Content synchronization

- Full sync wall time: 485.21 seconds.
- Full sync content phase: 5 minutes 26.5 seconds.
- Full sync maximum RSS: 1,017,806,848 bytes.
- Unchanged incremental sync: 2.60 seconds.
- Unchanged incremental sync maximum RSS: 694,779,904 bytes.

The retained sync timing commands were:

```sh
/usr/bin/time -l pnpm --filter @repo/backend sync
/usr/bin/time -l pnpm --filter @repo/backend sync:incremental
```

These commands require the existing Nakafa environment files and Convex
deployment selection. Reproduction must verify env-file presence without
printing secret values.

## Production response

- Warm production article TTFB observations: approximately 0.313 to 0.332
  seconds.

The probe used a `curl` loop with `time_starttransfer`. The exact article URL
and literal loop were not captured in the durable command log, so neither is
reconstructed here.

## Function-body feasibility

The same Phase 0 spike compiled the entire current MDX corpus without executing
the emitted code:

- Raw pass: 4,140 of 4,140 compiled, 0 compiler failures, 22,875,604 emitted
  bytes, mean 5,525.508 bytes, corpus p95 19,549 bytes, maximum 51,765 bytes.
- Import-policy eligible set: 3,894 files, 18,217,189 emitted bytes, mean
  4,678.271 bytes, corpus p95 16,099 bytes, maximum 51,237 bytes.
- Fail-closed rejected set: 246 files: 232 `getColor` runtime imports, 6
  `createCircleArcLine`, 2 `createCircleChordPoints`, and 6 dead imports.

The function-concept `en` and `id` slice produced byte-identical native and
runtime Next.js HTML: 37,168 bytes with SHA-256 prefix `fd51a87f`. Its React
Flight response retained the `FunctionMachine` client-module reference. This is
a feasibility GO for the bounded slice, not production completion.

An isolated production Turbopack fixture has since passed official-run browser
interaction and R3F fidelity with physical route-domain registries. The result
and the rejected shared-registry topologies are recorded in
[`renderer-isolation.md`](renderer-isolation.md). Full Nakafa application and
hosted-production fidelity remain pending gates. Aksara must keep every
rejected file explicit; it must not evaluate `getColor` or add a compatibility
workaround.

## Phase 0 use

Re-run the same commands on the same machine and exact Nakafa SHA before claiming
an improvement. Aksara's vertical slice must separately report cold build,
development readiness, save-to-visible latency, memory, output size, sync or
publication cost, and warm production response.

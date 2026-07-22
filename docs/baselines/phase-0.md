# Phase 0 evidence baseline

These are single-run observations supplied by the Nakafa readiness audit. They
are not 30-sample percentiles and must not be presented as p50 or p95 results.
The compiler-size p95 values below describe files within one corpus pass; they
are not repeated-run latency percentiles.

## Measurement context

- Refreshed: `2026-07-22T01:29:11Z`
- Nakafa SHA: `25506da68a5dd97bc55f99b6f7304384c4744206`
- Machine: Apple M3 Pro, arm64, 19,327,352,832 bytes memory
- OS: macOS 26.5 (`25F71`)
- Node: `24.18.0`
- pnpm: `10.34.1`
- Turbo: `2.10.4`
- Next.js: `16.2.10`
- Native TypeScript compiler: `7.0.2`

## Repository and corpus

- Nakafa `.git`: 1,044,888 KiB, including 956.32 MiB packed objects.
- Tracked `packages/contents` source: 5,245 files and 36,813,077 bytes,
  including 4,140 MDX files.
- The post-build `packages/contents` working tree was 121,712 KiB and 5,486
  files because it also contained ignored generated output. That value is a
  build-output observation, not the authored corpus size.

These measurements are trigger context, not proof that one Git repository will
remain healthy at 100,000 or 1,000,000 rich documents.

The durable shell log retained these inventory commands:

```sh
du -sk .git packages/contents
git count-objects -vH
git ls-files packages/contents | wc -l
git ls-files packages/contents | xargs stat -f '%z' | awk '{ total += $1 } END { print total }'
git ls-files 'packages/contents/**/*.mdx' | wc -l
```

## Build and development

The refreshed baseline used a detached worktree, byte- and permission-equal
environment files, no remote cache, and a forced root build:

```sh
/usr/bin/time -l -o <metrics> env TURBO_FORCE=true pnpm build
```

- All 5 build tasks passed with 0 cached tasks.
- Turbo task time: 157.893 seconds.
- Total wall time: 174.41 seconds.
- Maximum RSS: 6,220,005,376 bytes, or 5.793 GiB.
- WWW emitted 1,304 static pages.
- Production output contained no `.next/dev` directory.
- `apps/www/.next`: 933,736 KiB, or 911.85 MiB.
- All application production output: 1,016,096 KiB, or 992.28 MiB.

These values are one observation of the complete root build. The earlier
154.81-second and 3,920,216,064-byte measurements covered only `www`, so they
are retained as historical context but are not the acceptance comparison for
the complete Aksara cutover.

- Current development save-to-visible: right-censored above 120 seconds because
  the compiled marker never became visible during the observation window.
- `.next` after development: 4,514,504 KiB.
- `.next/dev` subset: 3,580,768 KiB.

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

The refreshed local production server reported ready in 88 milliseconds. The
first valid Function Concept request returned 200 with 0.690603-second TTFB and
1.782177-second total time. Its immediate second request had 0.335404-second
TTFB and 1.510853-second total time. Both transferred 312,787 bytes.

These are single local observations, not p50 or p95. The earlier warm
production article observations of approximately 0.313 to 0.332 seconds remain
historical context, not a directly comparable route benchmark.

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

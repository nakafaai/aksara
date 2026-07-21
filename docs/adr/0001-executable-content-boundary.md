# ADR 0001: Signed trusted MDX function bodies

- Status: Accepted
- Date: 2026-07-21
- Nakafa baseline SHA: `25506da68a5dd97bc55f99b6f7304384c4744206`

## Context

Nakafa MDX is executable content, not plain text. It contains React components,
math, and rich educational interactions. The final system must keep Nakafa's
actual statically imported renderer implementations while removing the entire
authored corpus from the Next.js compiler graph.

The official `@mdx-js/mdx` package exposes `compile` with
`outputFormat: "function-body"` and `run` for executing that precompiled form.
MDX also states that MDX is a programming language. Therefore this design is
valid only for reviewed and trusted source; it is not a sandbox for user input.

Aksara is intentionally public-source as of 2026-07-21, matching the existing
public Nakafa corpus. Trust comes from review, immutable hashes,
domain-separated Ed25519 signatures for artifacts and releases, authorization,
and delivery policy—not from repository secrecy. Protected content must
therefore never use Git visibility as its entitlement boundary.

References:

- [MDX compile and run APIs](https://mdxjs.com/packages/mdx/)
- [MDX security guidance](https://mdxjs.com/docs/getting-started/#security)
- [Next.js MDX guidance](https://nextjs.org/docs/app/guides/mdx)

## Decision

Aksara compiles reviewed, source-controlled MDX ahead of time with
`outputFormat: "function-body"`. It hashes and signs each compiled payload,
then signs a constant-size canonical release manifest with a distinct signature
domain. One configured Ed25519 key signs both object types without making their
signatures interchangeable.

The release envelope authenticates its base release, Aksara commit SHA, ordered
item count and domain-separated SHA-256 digest, expected projection counts and
digest, release ID, and renderer contract version. Upserts and deletes are
stored as separately strict-decoded items carrying release identity and index;
their canonical stream digest covers kind, path, artifact selection, content
head, and order without embedding the full delta in the signed envelope. A
server-only verifier resolves the public key through the shared trusted-key
seam and verifies the complete envelope before staging. Publication adapters
accept the signed envelope and explicitly bounded item/artifact batches, never
a bare manifest or an unbounded release array. Verification must attest the
staged item count and digest plus independently recomputed projection counts
and digest before atomic activation.

The publisher asks a trusted source-control service to load ordered authored
sources from the exact `aksaraSha` authenticated by the release. It recompiles
those sources with the exact compiler and renderer manifest, and requires every
resulting canonical artifact hash to match its authenticated release item before
it signs anything or performs publication IO. Caller-provided source beside an
unrelated SHA and caller-provided compiled code are not publication inputs.

Publication targets expose distinct typed failures: transient transport errors
may be retried idempotently, while immutable-identity conflicts and stale-base
activation failures are non-retryable until the release is reconciled.

The foundation source-control seam still models the complete authored source
set as an in-memory array, and the publisher receives the complete release item
array before it creates bounded target batches. The real Git adapter is not yet
implemented. This is an explicit bounded-v1 design for the current corpus, not
evidence that a 100,000- or 1,000,000-item release fits in publisher memory. A
paginated or streaming source seam is required before either synthetic scale
gate may pass.

Nakafa may execute an artifact only in a server-only Node runtime through the
official `@mdx-js/mdx/run` API and only after all of these checks pass:

1. The artifact belongs to the active immutable release.
2. Its content hash matches the signed payload.
3. Its signature is valid.
4. Its renderer contract matches Nakafa's pure global contract manifest.
5. Every required component and component version is available.
6. Its statically analyzable renderer boundary implements every required rich
   component without leaking unrelated client capabilities into the route.

No client or browser receives an executable artifact. Raw authored MDX is never
compiled in a production request.

The compiler parses executable syntax through MDX's ESTree output. It rejects
dynamic imports, `require`, `eval`, direct `Function`, `process`, `globalThis`,
network globals, unknown free globals, direct prototype-chain escape properties,
and `dangerouslySetInnerHTML`. The artifact compiler rejects every body import
and export. Legacy component imports must be removed by the separately audited
migration normalizer before compilation; alias shape is never treated as proof
that an import source is safe. These checks are defense in depth against common
mistakes and obvious escape syntax. JavaScript has equivalent expressions that
static checks cannot prove safe, so this policy never changes the requirement
that every MDX author and reviewer is a trusted production code author.

Every authored document must contain exactly one standalone
`export const metadata` declaration. The compiler decodes its literal arrays
and plain objects directly from MDX's ESTree, never by regex, evaluation, or
module execution. Dynamic values, computed properties, spreads, mixed exports,
duplicate declarations, and excess contract fields fail with typed errors. The
metadata declaration is removed before body compilation, then stored inside the
canonical compiled payload. Metadata, `rawMdx`, and `sourceHash` are therefore
all covered by the artifact hash and signature.

Per-artifact `requiredComponents` is complete for capitalized custom component
dependencies discovered through MDX's missing-reference AST. Intrinsic Markdown
tags such as `h2`, `p`, and `table` are mandatory global semantics covered by
`rendererContractVersion`; an incompatible intrinsic change requires a global
contract bump rather than tag enumeration in every artifact.

### Renderer bundle-isolation topology

Next.js 16.2.10 and Turbopack measurements rejected a single global
implementation registry. Direct imports, `next/dynamic`, `React.lazy`, shared
server registries with literal dynamic imports, and the same registry behind
`connection()` all caused a plain content route to preload unrelated client
implementations from the shared route module graph.

A standalone production proof then gave each physical route entrypoint its own
static implementation registry while keeping official `@mdx-js/mdx/run` and
the same request-time Partial Prerendering boundary. The plain route loaded no
rich implementation, the Function route loaded only FunctionMachine, and the
Atom route loaded only AtomShellLab plus R3F. Client interaction, hydration, and
WebGL passed.

This evidence establishes two separate concepts:

- one global, implementation-free component contract manifest for compiler and
  release compatibility;
- a finite set of physical route-domain implementation registries, each
  statically importing only that domain's capability union.

The candidate is route/capability sharding, not a per-document import map. URL
ownership and route selection remain in Next.js. A shared page implementation
may receive the route-owned registry, but it must not import every rich
implementation.

This is a measured deviation from the originally selected single static global
implementation registry, explicitly approved by the repository owner on
2026-07-21. The current Nakafa candidate still downloads a legacy Three.js
chunk on a plain material route through the old filesystem MDX graph, so the
later published-artifact runtime must still prove final body isolation.

Evidence is recorded in
[`docs/baselines/renderer-isolation.md`](../baselines/renderer-isolation.md).
The full AST import inventory and current eleven-shard boundary are recorded in
[`docs/baselines/rich-import-inventory.md`](../baselines/rich-import-inventory.md).
The relevant framework constraints are documented in the Next.js
[lazy-loading guide](https://nextjs.org/docs/app/guides/lazy-loading) and
[`connection()` reference](https://nextjs.org/docs/app/api-reference/functions/connection).

V1 enforces UTF-8 ceilings at compilation and signing: 128 KiB raw MDX, 256 KiB
compiled code, 128 KiB plain text, 448 KiB canonical payload, 480 KiB signed
artifact wire value, and a 512 KiB Aksara application ceiling for the eventual
stored artifact document. The application cap deliberately leaves headroom
below Convex's documented 1 MiB document limit; the backend must still enforce
its row size with the official Convex size calculation before insertion.

Reference: [Convex production limits](https://docs.convex.dev/production/state/limits).

## Accepted

- Trusted, reviewed, source-controlled executable MDX.
- Ahead-of-time `function-body` compilation.
- Signed immutable payloads stored inline with Convex release data.
- Domain-separated signed release envelopes verified before publication IO.
- One trusted public-key resolution seam shared by artifact and release checks.
- Official server-only `@mdx-js/mdx/run` in Nakafa's Node runtime.
- A pure global renderer contract manifest.
- Finite static route-domain implementation registries selected by physical
  Next.js route ownership, never by individual document.
- Fail-closed hash, signature, release, and renderer-contract checks.

## Rejected

- Raw MDX compilation during a production request.
- Bundled or remotely imported ESM artifacts.
- RSC Flight payloads as the persistence format.
- Persisted rendered HTML.
- A custom JSON/AST renderer.
- A duplicate preview renderer.
- A manual import map or registration entry for every document.
- Arbitrary or untrusted content uploads.

## High-risk proof gate

Official `run` is an explicitly high-risk vertical-slice gate, not a generic
execution facility. The slice must prove server-only isolation, React Server
Component and client-component fidelity, static registry fidelity, signatures,
hashes, runtime compatibility, payload size, cache behavior, and failure modes.

If RSC/client fidelity or the target platform runtime fails, body migration
stops. The implementation must not silently pivot to static ESM, HTML, or a
custom renderer without a new explicit user decision and ADR.

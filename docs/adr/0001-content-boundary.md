# ADR 0001: Signed trusted MDX

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

The contracts package owns the reviewed public-key registry and a distinct
active signing-key identity. The production CLI derives an SPKI public key from
its validated PKCS8 private key, then requires the configured key ID to be the
active identity and the derived SPKI to exactly match its registry entry before
creating any publication target or making a network request. The same resolver
retains older verification keys without authorizing them to sign new releases.

Rotation follows expand-retain-contract order: add and deploy the new public
key, change the active signing identity and Environment signer together, retain
every old key while a live or rollback-eligible artifact references it, and
remove an old key only after that retention proof passes. Unknown, duplicate,
inactive, and mismatched keys fail closed.

The release envelope authenticates its base release, source origin, ordered item
count and domain-separated SHA-256 digest, expected projection count and digest,
release ID, and renderer contract version. A Git release origin carries the
exact Aksara commit SHA; a forward rollback origin carries the exact active
release being reversed. Upserts and deletes are stored as separately
strict-decoded items carrying release identity and index;
their canonical stream digest covers operation, path, artifact selection,
content head, and order without embedding the full delta in the signed envelope. A
server-only verifier resolves the public key through the shared trusted-key
seam and verifies the complete envelope before staging. Publication adapters
accept the signed envelope and explicitly bounded item/artifact batches, never
a bare manifest or an unbounded release array. Verification must attest the
staged item count and digest plus independently recomputed projection counts
and digest before atomic activation.

For a Git release, the publisher asks a trusted source-control service to load
ordered authored sources from the exact commit SHA authenticated by the
manifest origin. It recompiles those sources with the exact compiler and
renderer manifest, and requires every resulting canonical artifact hash to
match its authenticated release item before it signs anything or performs
publication IO. For a forward rollback, it instead re-verifies the exact prior
signed artifact envelopes returned by the active release. Caller-provided
source beside an unrelated SHA and caller-provided compiled code are not
publication inputs.

Publication targets expose distinct typed failures: transient transport errors
may be retried idempotently, while immutable-identity conflicts and stale-base
activation failures are non-retryable until the release is reconciled.

The release-item and exact-source seams are replayable Effect Streams. Release
digests, compilation, signing, and bounded target batches do not require a
complete in-memory item or source collection. The exact-Git adapter resolves a
reviewed full commit SHA and reads each signed corpus path with `git cat-file`;
it neither reads the mutable working tree nor reconstructs source metadata.
This streaming contract alone is not evidence that a 100,000- or
1,000,000-item release meets the operational or cost gates.
Every Git command disables replacement refs, `cat-file -s` rejects an oversized
blob before its body is read, retained output is bounded, and UTF-8 decoding is
fatal. The adapter also requires the body byte count to equal Git's preflight
size, so truncated or substituted source cannot silently enter compilation.

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
dynamic imports, `import.meta`, `require`, `eval`, direct `Function`, `process`, `globalThis`,
network globals, unknown free globals, dynamic computed properties, direct
prototype-chain escape properties, prototype-reflection entry points, and
`dangerouslySetInnerHTML`. Other static string and finite literal numeric
property access remains available. The artifact compiler rejects every body
import and export. Existing
component imports must be removed by the separately audited migration normalizer
before compilation; alias shape is never treated as proof that an import source
is safe. These checks are defense in depth against common mistakes and obvious
escape syntax. JavaScript has equivalent expressions that static checks cannot
prove safe, so this policy never changes the requirement that every MDX author
and reviewer is a trusted production code author.

Every authored document must contain exactly one standalone
`export const metadata` declaration. The compiler decodes its literal arrays
and plain objects directly from MDX's ESTree, never by regex, evaluation, or
module execution. Dynamic values, computed properties, spreads, mixed exports,
and duplicate declarations fail with typed errors. The
metadata declaration is removed before body compilation. Until authoritative
family schemas migrate from Nakafa, the foundation validates only that static
object boundary and does not duplicate or publish generic metadata. `rawMdx`
and `sourceHash` remain covered by the artifact hash and signature.

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
2026-07-21. The current Nakafa candidate still downloads an unnecessary Three.js
chunk on a plain material route through the old filesystem MDX graph, so the
later published-artifact runtime must still prove final body isolation.

Evidence is recorded in
[`docs/baselines/renderer-isolation.md`](../baselines/renderer-isolation.md).
The full AST import inventory and measured eleven-shard candidate are recorded in
[`docs/baselines/import-inventory.md`](../baselines/import-inventory.md).
The relevant framework constraints are documented in the Next.js
[lazy-loading guide](https://nextjs.org/docs/app/guides/lazy-loading) and
[`connection()` reference](https://nextjs.org/docs/app/api-reference/functions/connection).

V1 enforces UTF-8 ceilings at compilation and signing: 128 KiB raw MDX, 256 KiB
compiled code, 128 KiB plain text, 448 KiB canonical payload, and 480 KiB signed
artifact wire value. The additive Convex staging candidate also enforces a
512 KiB complete stored-row ceiling with Convex's official size calculation
and a 4 MiB complete mutation-envelope ceiling. It remains internal-only until
the published contracts package replaces its temporary validators and the
authenticated signature-verifying ingress is implemented.

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

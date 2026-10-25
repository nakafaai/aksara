# ADR 0001: Signed trusted MDX

- Status: Accepted
- Date: 2026-07-21
- Amended: 2026-10-24 by decision 37, which replaces runtime evaluation with a
  signed content tree (see "Content tree" below)
- Amended: 2026-10-25, zero-legacy: key rotation is one step, and a renderer
  change ships with the content that uses it.
- Nakafa baseline SHA: `25506da68a5dd97bc55f99b6f7304384c4744206`

## Context

Nakafa MDX is executable content, not plain text. It contains React components,
math, and rich educational interactions. The final system must keep Nakafa's
actual statically imported renderer implementations while removing the entire
authored corpus from the web application's compiler graph.

The official `@mdx-js/mdx` package exposes `compile` with
`outputFormat: "function-body"` and `run` for executing that precompiled form.
MDX also states that MDX is a programming language. Therefore this design is
valid only for reviewed and trusted source; it is not a sandbox for user input.

Aksara is intentionally public-source as of 2026-07-21, matching the existing
public Nakafa corpus. Trust comes from review, immutable hashes,
domain-separated Ed25519 signatures for artifacts and releases, authorization,
and delivery policy, not from repository secrecy. Protected content must
therefore never use Git visibility as its entitlement boundary.

References:

- [MDX compile and run APIs](https://mdxjs.com/packages/mdx/)
- [MDX security guidance](https://mdxjs.com/docs/getting-started/#security)

## Decision

Aksara compiles reviewed, source-controlled MDX ahead of time with
`outputFormat: "function-body"`, evaluates that body once in Node, and signs
the resulting content tree. It hashes and signs each payload, then signs a
constant-size canonical release manifest with a distinct signature domain. One configured Ed25519 key signs both object types without making their
signatures interchangeable.

The contracts package owns the reviewed public-key registry and a distinct
active signing-key identity. The production CLI derives an SPKI public key from
its validated PKCS8 private key, then requires the configured key ID to be the
active identity and the derived SPKI to exactly match its registry entry before
creating any publication target or making a network request.

Rotation is one step: the new public key, the active signing identity, and the
Environment signer change together, the retired key leaves the registry in the
same change, and a complete current-format republish replaces every artifact it
signed. A brief break during deploy is accepted. Unknown, duplicate, inactive,
and mismatched keys fail closed.

The release envelope authenticates its base release, source origin, ordered item
count and domain-separated SHA-256 digest, expected projection count and digest,
release ID, and renderer manifest hash. A Git release origin carries the
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
source beside an unrelated SHA and caller-provided compiled code or content
trees are not publication inputs.

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
Every Git command disables replacement refs. Sequential batches contain at most
128 signed source paths. A metadata-only `cat-file --batch-check` verifies each
blob's identity, type, and authored byte limit before `cat-file --batch` reads
the verified object IDs. Retained output is bounded by those exact sizes, and
UTF-8 decoding is fatal while preserving the BOM and original line endings.
Body headers must match the preflight object IDs and sizes, and body framing
must contain exactly the requested bytes. Compilation still verifies each
source against its signed artifact hash before any target staging.

Nakafa may render an artifact only after all of these checks pass:

1. The artifact belongs to the active public release or the exact release
   selected by a protected snapshot.
2. Its content hash matches the signed payload.
3. Its signature is valid.
4. Public and protected content first match the exact renderer manifest frozen
   into their signed release. When the deployed renderer hash differs, the
   selected artifact's domain and component requirements must remain compatible
   with the deployed renderer.
5. Every required component name is available in the selected domain.
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
import and export. Authored source therefore keeps none, and alias shape is never
treated as proof that an import source is safe. These checks are defense in depth
against common mistakes and obvious escape syntax. JavaScript has equivalent
expressions that static checks cannot prove safe, so this policy never changes
the requirement that every MDX author and reviewer is a trusted production code
author.

Every authored document must contain exactly one standalone
`export const metadata` declaration. The compiler decodes its literal arrays
and plain objects directly from MDX's ESTree, never by regex, evaluation, or
module execution. Dynamic values, computed properties, spreads, mixed exports,
and duplicate declarations fail with typed errors. The
metadata declaration is removed before body compilation. Each real content
family decodes that static object through its authoritative family schema and
projects only its real domain fields; Aksara does not introduce one speculative
universal metadata contract. `rawMdx` and `sourceHash` remain covered by the
artifact hash and signature.

The generic public `page` family uses the same trusted MDX, artifact, release,
route, and rollback protocol as other body families. One stable page key owns
its signed identity while source-root and locale-owned public-path choices
remain explicit registry fields. This allows a source folder or public route to
change without rewriting the permanent content identity. Page projections use
the `public-page` kind and the route-owned `site` renderer domain. Legal pages
are authored through this family, not through a legal-only protocol or a local
Nakafa filesystem fallback.

Per-artifact `requiredComponents` is complete for capitalized custom component
dependencies discovered through MDX's missing-reference AST. Intrinsic Markdown
tags such as `h2`, `p`, and `table` belong to the base renderer names. The
manifest contains one current component set, with no component versions or
separate authoring and supported registries. Its authenticated hash binds name
ownership and published domains. Renderer behavior is verified in Nakafa, and a
matching renderer change ships in the same change as the content that uses it. A
breaking contract change retires the predecessor encoding in the same change and
requires a complete current-format republish, rather than permanent alternate
implementations.

### Renderer bundle-isolation topology

Measurements on the former Next.js 16.2.10 app with Turbopack (2026-07-21,
before the move to TanStack Start) rejected a single global implementation
registry. Direct imports, `next/dynamic`, `React.lazy`, shared server registries
with literal dynamic imports, and the same registry behind `connection()` all
caused a plain content route to preload unrelated client implementations from
the shared route module graph.

A standalone production proof then gave each physical route entrypoint its own
static implementation registry while keeping official `@mdx-js/mdx/run` and
the same request-time Partial Prerendering boundary. The plain route loaded no
rich implementation, the Function route loaded only FunctionMachine, and the
Atom route loaded only AtomShellLab plus R3F. Client interaction, hydration, and
WebGL passed.

This evidence establishes two separate concepts:

- one global, implementation-free component contract manifest for compiler and
  release checks;
- a finite set of physical route-domain implementation registries, each
  statically importing only that domain's capability union.

The candidate is route/capability sharding, not a per-document import map. URL
ownership and route selection remain in the TanStack Start router. A shared page
implementation may receive the route-owned registry, but it must not import
every rich implementation.

This is a measured deviation from the originally selected single static global
implementation registry, explicitly approved by the repository owner on
2026-07-21. At that baseline, the Nakafa candidate still downloaded an
unnecessary Three.js chunk on a plain material route through the old filesystem
MDX graph. The later published-artifact runtime therefore had to prove final
body isolation before material activation.

Evidence is recorded in
[`docs/baselines/renderer.md`](../baselines/renderer.md).
The full AST import inventory and measured eleven-shard candidate are recorded in
[`docs/baselines/inventory.md`](../baselines/inventory.md).

The current contract enforces UTF-8 ceilings at compilation and signing: 128 KiB raw MDX, 384 KiB
content tree, 128 KiB plain text, 448 KiB canonical payload, and 480 KiB signed
artifact wire value. The Nakafa Convex adapter must also enforce a 512 KiB
complete stored-row ceiling with Convex's official size calculation and a
4 MiB complete mutation-envelope ceiling. Production publication requires
Nakafa to consume the exact attested contracts release archive, and the
authenticated signature-verifying ingress ships in that same change. The content
workflow rebuilds that archive without production credentials and verifies exact
immutable GitHub release bytes, digest, source tag, ancestry, release integrity,
asset integrity, and build attestation before any production operation can
begin.

Reference: [Convex production limits](https://docs.convex.dev/production/state/limits).

## Content tree

Decision 37 (2026-10-24) replaces runtime evaluation of compiled code. The
publisher evaluates each `function-body` once in Node with a tree-building JSX
runtime, after the authored source policy has passed. The `content-tree`
payload is the fragment that results: each element names an intrinsic HTML tag
from a closed list, a capitalized renderer component, or the fragment, and holds
JSON props and ordered children. A prop is JSON data or a nested element, and a
plain JSON object may not use the reserved element key.

Publish-time policy rejects, naming the document and the prop: a function,
symbol, bigint, class instance, sparse or `undefined` list value, or object with
a symbol key; a non-finite number; the reserved key; an unknown tag; and a child
that is neither text nor an element. An `undefined` prop is omitted, as React
omits it. The signed bytes write `-0` as `0`, so a tree holds no negative zero.

Nakafa renders the tree with its React component map and evaluates no code, so
the Cloudflare Workers runtime needs neither `eval` nor `new Function`. The tree
is data for that one renderer; the rejection of a custom JSON or AST renderer
below still holds.

Equivalence is checked at two levels. The compiler tests compare every
data-computing corpus document with a React element model of the compiled body.
A scratch proof over the whole corpus compared SHA-256 hashes of server-rendered
HTML: 8,576 of 8,585 documents matched byte for byte before six answers dropped
their infinite NumberLine bounds. Those six now omit the bounds, which Nakafa
draws to the axis edge and must accept before release, so they need a visual
comparison instead of a byte comparison. The three trigonometric function graph
lessons still exceed the 384 KiB ceiling.

## Accepted

- Trusted, reviewed, source-controlled executable MDX.
- Ahead-of-time `function-body` compilation.
- Signed immutable payloads stored inline with Convex release data.
- Domain-separated signed release envelopes verified before publication IO.
- One trusted public-key resolution seam shared by artifact and release checks.
- One publish-time evaluation per document, signed as a content tree that
  Nakafa renders with its React component map.
- A pure global renderer contract manifest.
- Finite static route-domain implementation registries selected by physical
  TanStack Start route ownership, never by individual document.
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

Official `run` was an explicitly high-risk vertical-slice gate, not a generic
execution facility. Decision 37 removed runtime evaluation, so this gate now
covers only the publish-time evaluation inside Aksara's Node compiler. The slice must prove server-only isolation, React Server
Component and client-component fidelity, static registry fidelity, signatures,
hashes, runtime compatibility, payload size, cache behavior, and failure modes.

If RSC/client fidelity or the target platform runtime fails, body migration
stops. The implementation must not silently pivot to static ESM, HTML, or a
custom renderer without a new explicit user decision and ADR.

Re-run the same commands on the same machine and exact Nakafa SHA before
claiming an improvement. Aksara's vertical slice must separately report cold
build, development readiness, save-to-visible latency, memory, output size, sync
or publication cost, and warm production response.

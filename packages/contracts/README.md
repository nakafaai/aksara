# @nakafa/aksara-contracts

This package defines exact runtime contracts for the Aksara compiler and
publisher. Nakafa runtime consumes the exact published contract: a proven npm
package, its immutable release archive, and compatible renderer support.

This package contains schemas, branded identifiers, canonical wire encodings,
and Web Crypto signature verification. It contains no corpus, renderer
implementation, signing key, deployment credential, or browser-side MDX
runtime.

Consumers install the exact `@nakafa/aksara-contracts` version from npm and
commit its pnpm lockfile integrity. npm provenance and the matching immutable
GitHub Release bind those package bytes to the reviewed Aksara source. Content
requiring a newer contract may be activated only after a compatible Nakafa
renderer is live.

Node-only writer and incremental digest exports remain isolated behind package
conditions. Default-runtime exports used by Convex are audited to reject
reachable Node built-ins. Verification accepts only reviewed, signed Aksara
artifacts and releases. It does not make MDX safe for arbitrary uploads; MDX
remains trusted executable source.

## Consumer boundaries

Current consumers use unversioned semantic Interfaces:

- `graph/family` classifies either a complete graph identity or one exact
  asset ID into its application locale and content family.
- `tryout/catalog` owns minimal catalog node schemas, while `tryout/identity`
  builds their pure lookup identities before complete signed rows are loaded.
- `projection/material` owns the application-locale material namespace and
  validates every signed route and projection against it. Lesson metadata may
  carry an optional `searchTitle` for the HTML title, while `title` stays the
  short navigation name.
- `question/response` owns the frozen response formats: `single-choice`,
  `multiple-choice`, `category`, `short-answer`, and `rubric`.
- `question/answer` owns deterministic short-answer and final-answer keys: an
  exact canonical decimal with an optional tolerance and an explicit fraction
  flag, or accepted text with explicit normalization rules. Every runtime
  grades a typed answer only through `matchesAnswerKey`, reads a typed number
  only through `readNumberAnswer`, the one number grammar, and decides that a
  typed answer is blank only through `isBlankAnswer`, so whitespace and
  invisible format characters alone never count as an answer.
- `question/rubric` owns the locale-neutral `QuestionRubricScaleSchema`
  (ordered criteria and levels with points and optional final-answer keys)
  and the Aksara rubric, which labels every criterion and level in every
  active app locale. Each judged criterion maps onto one Effect
  `Decision.rate` decision, and its total is derived, never stored.
- `question/points` owns a question's worth. Raw, penalized, and IRT scoring
  read it only through `questionPoints`.
- `tryout/spec` owns the `irt`, `penalized`, and `raw` scoring strategies, the
  per-section marks of a penalized exam, and the `institution`, `subject`, and
  `year` track kinds.
- `projection/page` owns stable public page identities, localized paths, and
  signed metadata for human, agent, and sitemap delivery.
- `math/base` owns the unversioned base schemas that mathematical visuals
  share, such as finite plane and space points, ordered axis ranges, appearance
  roles, and label placements, plus the geometry tolerance and exact point
  predicates.
- `math/visual` owns the unversioned, renderer-neutral plane and space scene
  contract, including exact straight geometry, rich-label anchors, and the
  axis-aligned cuboid dimension mapping.

## Publication dates

Article, material, public page, and question metadata carry one required
`datePublished` and one optional `dateModified`, both as exact `DateOnly`
values.

Decode external metadata and signed payloads with `onExcessProperty: "error"`.
Effect schemas own the shape and invariants; the decoder owns excess-property
policy. This rejects obsolete fields instead of silently discarding them.

- `datePublished` is the first verified public availability of that specific
  locale page.
- `dateModified` is the public activation date of a later signed release that
  contains a meaningful content change.
- When present, `dateModified` must be strictly later than `datePublished`.

Neither value may be derived from a build clock, import time, Convex
`_creationTime`, an unsigned source commit, or an unactivated candidate. The
signed release and activation history remain the audit evidence for both
values. These rules keep visible dates and structured data aligned with
[Google publication date guidance](https://developers.google.com/search/docs/appearance/publication-dates)
and
[Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article).

Runtime verification authenticates the independently signed release and
artifact values against the exact renderer manifest frozen into that release.
Execution verification also proves the selected artifact against the complete
live renderer when the deployed manifest hash differs. Non-rendering evidence
verification authenticates the same frozen release and artifact without
claiming that its consumer can execute the artifact. This directional
execution check lets an additive live renderer serve an older release only when
it still publishes the selected domain and contains every required component
name. Every current manifest contains the complete canonical domain set. The same
contract validates stored and deployed manifests. A renderer-changing release
remains bound to the exact deployed manifest. A scoped content-only release may
retain the active frozen manifest only when activation proves the live renderer still publishes every frozen
domain and contains every frozen component name. The renderer is not a
third signed value. Current production trusts authenticated
Convex state for route/head membership, delivery class, and the active pointer;
a release result digest is not a per-row inclusion proof. This boundary is
recorded explicitly in
[ADR 0002](https://github.com/nakafaai/aksara/blob/main/docs/adr/release.md).

The package source is publicly readable for supply-chain review. All use and
redistribution remain subject to the included Nakafa Source Available License
1.0. The package grants no rights to the Nakafa corpus, branding, or
educational material.

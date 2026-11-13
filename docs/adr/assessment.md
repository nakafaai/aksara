# ADR 0005: Assessment contract

- Status: Accepted
- Date: 2026-10-13
- Widened: 2026-10-16, version 0.50.0 (see Widenings in 0.50.0)
- Completed: 2026-10-26, version 2.0.0 (see The switch in 2.0.0)
- Amended: 2026-10-25, zero-legacy: the old `question/` and `tryout/` modules are
  deleted by the change that switches their readers, and the steps below land as
  one change.

## Context

The owner approved the assessment platform of the School blueprint on 13 October
2026: one engine for try-outs and School exams that lets a learner answer the
way the real exam does. The contract of today cannot carry it.
`question/response.ts` knows five response kinds (`category`, `multiple-choice`,
`rubric`, `short-answer`, `single-choice`). `question/points.ts` values a
question by whole points, one unless authored. A try-out groups items by a
`stimulusKey` and has no entity for the shared reading. A question body is
authored MDX that ADR 0001 compiles into a signed executable artifact, which
only Nakafa's renderer can run. Nothing in the contracts describes an exam
profile: its sections, tools, accommodations, or report.

## Decision

Aksara adds a new contract in `packages/contracts/src/assessment/`. Every part is
an Effect Schema and every type is `typeof X.Type`. The change that switches the
readers to it deletes the old `question/` and `tryout/` modules.

### Documents

The Assessment Document is a ProseMirror JSON tree, so Tiptap can edit the same
document later. Its nodes are `doc`, `paragraph`, `heading` (levels 1 to 3),
`bulletList`, `orderedList`, `listItem`, `table`, `tableRow`, `tableHeader`,
`tableCell`, `blockquote`, `codeBlock`, `mathBlock`, `figure`, `image`,
`interaction`, `text`, `mathInline`, `hardBreak`, and `inlineInteraction`. Its
marks are `bold`, `italic`, `underline`, `code`, `subscript`, `superscript`, and
`link` (an absolute HTTPS address, or a site path such as a lesson route, which
the renderer resolves on the host that shows the document, so a School host
keeps its learners).

- One document has one encoding. An attribute that a node declares is always
  present and is `null` when unset, marks appear once each in a fixed order, text
  is never empty, and neighboring text nodes with the same marks are merged, as
  ProseMirror writes them.
- LaTeX is stored once, in `mathInline`, `mathBlock`, and the figure props.
  MathML is derived at render time (KaTeX 0.19 with `output: "htmlAndMathml"`)
  and is never stored.
- A `figure` names one of three components (`Chart`, `MathVisual`, `Mermaid`),
  carries typed props for it, a required text alternative, and a caption that is
  rich text or `null`. Every mathematical figure is a `MathVisual` scene (D36):
  the `MathVisualSchema` of `math/visual`, whose rich labels must match the label
  anchors of the scene. Contracts 7.0.0 retired `NumberLine`, `LineEquation` and
  `UnitCircle` as figures, after aksara#612 redrew the one question that drew a
  `LineEquation` (SNBT quantitative knowledge set 4, question 15) as a plane
  scene. No School exam holds one of them.
- A sixth figure, `Chart`: categories along one axis and series of values drawn
  as bars or lines, with an optional value range and a bar placement, `apart` or
  `touching`, on a chart with bars. The question bank drew eleven bar, line, and
  composed charts and a histogram with components of their own, which held their
  data in code. ADR 0031 of Nakafa allows only contract figures in a release, and
  none of the five could hold a chart, so the data moved into the figure. The 28
  per-set graphs were `LineEquation` cards already and became `LineEquation`
  figures with the exact points their code computed; the one number line became a
  `NumberLine`, and the illustration of three boxes a `MathVisual`.
- An optional `fontSize` on a line label, as Nakafa's line labels take it: one
  item sizes the two angle labels of its figure.
- A link to a site path besides an absolute HTTPS address: three explanations
  link to the lesson they rely on, and a School host must keep its learners.
- A number line ray is authored without its `start` or its `end`, as the
  renderer draws one, and the compiler writes `-infinity` or `infinity`, which
  JSON cannot hold as numbers.
- The `language` of an explanation. The corpus explains every item in every app
  locale, while the item is asked in the language of its section, so one version
  has an explanation in each locale.
- `contentDomain` in place of `competency` on the blueprint: the name of the
  dimension in the official TKA framework, which the corpus already records.
- `assessment/answer`: the grammar and matcher of typed answers, which lived in
  `question/answer`, under names without the old prefix and with the same encoded
  shapes, so a stored school key decodes unchanged.
- The hashes of a profile and a paper, under their own domains.
- `assessment/catalog`: the navigation of the public try-outs, country, exam,
  track, set, and section in each app locale. A set names its paper by identifier
  and hash, and a section's key is a section of the paper's profile. Counts,
  times, marks, scoring, renderer domains, and source paths left the catalog,
  because the profile and the paper own them.
- `assessment/snapshot`: the structured family `assessment`, which replaces
  `tryout`. Its rows are the catalog, the profiles, the papers, the families,
  the item versions, the stimulus versions, the keys, and the explanations, each
  hashed over its canonical JSON and streamed by kind and identity. A snapshot
  verifies its digest, its counts, its identity, and its closure: the catalog
  reaches papers it holds, a paper fits its profile and places versions it holds,
  and every version has its family, its reading, its key, and an explanation in
  each active app locale.

### What it deletes

`question/`, `tryout/`, `projection/question`, the content family `question` with
its heads and rollback state, the question preview, the signed try-out runtime
bundle with its transport and its signing, and the protected runtime that served
frozen question bodies of a retained snapshot. An item version is named by its
hash, so Nakafa keeps each version while an attempt names it; no separate bundle
proves which bodies an attempt saw.

The 2.0.0 manifest cannot be read by a 1.x reader, nor a 1.x manifest by 2.0.0,
so Nakafa deletes its stored release state in the deploy that reads 2.0.0 and
Aksara then publishes a genesis release, as the release record describes.

### Authoring

Authors keep MDX for prompts, readings, and explanations, and an `item.ts` for
the interaction. The source of an item is `ItemSource` in the corpus: its
blueprint, the key of its set's reading, and its interaction in each language it
is asked in, a `choice` of options that are correct or not, a `matrix` of
statements in columns, or a `numericEntry` with its exact decimal value and an
optional unit. Publication derives every identifier, the key, the
prompt with its interaction placed after the stem, and the hashes. A reading is
its own file in the set, `<reading>/stimulus.<language>.mdx`, used by key; the
migration moved each of the 159 readings out of the 887 prompts that copied it.
The assessment vocabulary of MDX is Markdown, `InlineMath`, `BlockMath`, and the
six figures, without metadata; headings of an explanation start at `#`.

### Profiles of the try-outs

Each track carries one profile. SNBT scores by IRT on a scale of 0 to 1000 and
reports its sections and their standard error; each TKA subject scores raw and
reports its total. Every Nakafa try-out moves freely within a section, offers
mark for review and no calculator, scores each interaction all or nothing, lets
a sampled math verdict score, and has no break and no accommodation catalog. The
write allowance is 5 seconds, a few seconds within one presence lease as Nakafa
ADR 0013 bounds it, and the grace period is 75 seconds, one presence lease of
Nakafa: 2.5 heartbeats of 30 seconds (`PRESENCE_INTERVAL`).

## Rejected

- Storing MathML beside LaTeX. It is derived from LaTeX at render time, and a
  stored copy could disagree with its source.
- Keeping a key inside an interaction, an option, or a prompt. A prompt reaches
  learners before the key may.
- Copying a shared reading into the prompt of each item. The copies drift, and
  an edit would have to find all of them.
- `Schema.Unknown` or free JSON for figure props. A figure that no schema
  describes cannot be checked, edited, or exported.
- An equivalence policy on the math entry. Whether a sample may score is a rule
  of the exam, not of the item: the same item scores a sample in a try-out and
  sends it to the teacher in a school exam.
- An explanation inside the item version. A paper bundle would carry it before
  release, and a correction to an explanation would make a new version with a new
  hash.
- A size limit on the document alone. Convex limits a whole stored document, so
  a document that fits can still sit in a record that does not.

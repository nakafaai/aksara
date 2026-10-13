# ADR 0005: Assessment contract

- Status: Accepted
- Date: 2026-10-13

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

Aksara adds a new contract in `packages/contracts/src/assessment/`, next to the
old one. Every part is an Effect Schema and every type is `typeof X.Type`. The
old `question/` and `tryout/` modules and every reader of them do not change in
this decision.

### Documents

The Assessment Document is a ProseMirror JSON tree, so Tiptap can edit the same
document later. Its nodes are `doc`, `paragraph`, `heading` (levels 1 to 3),
`bulletList`, `orderedList`, `listItem`, `table`, `tableRow`, `tableHeader`,
`tableCell`, `blockquote`, `codeBlock`, `mathBlock`, `figure`, `image`,
`interaction`, `text`, `mathInline`, `hardBreak`, and `inlineInteraction`. Its
marks are `bold`, `italic`, `underline`, `code`, `subscript`, `superscript`, and
`link` (an absolute HTTPS address).

- One document has one encoding. An attribute that a node declares is always
  present and is `null` when unset, marks appear once each in a fixed order, text
  is never empty, and neighboring text nodes with the same marks are merged, as
  ProseMirror writes them.
- LaTeX is stored once, in `mathInline`, `mathBlock`, and the figure props.
  MathML is derived at render time (KaTeX 0.19 with `output: "htmlAndMathml"`)
  and is never stored.
- A `figure` names one of five components (`MathVisual`, `NumberLine`,
  `LineEquation`, `Mermaid`, `UnitCircle`), carries typed props for it, a
  required text alternative, and a caption that is rich text or `null`. The props
  are the ones the question bank uses, read from the MDX files under
  `packages/corpus/question-bank` and checked against the component props in
  Nakafa's `packages/design-system` and against the rest of the corpus. A
  `MathVisual` scene is the `MathVisualSchema` that already exists in
  `math/visual`, and its rich labels must match the label anchors of the scene.
  The circle shapes that lessons draw with `LineEquation` are left out, because
  no item uses one.
- An `image` carries an asset identifier, a required text alternative, and its
  pixel width and height, so a page can reserve the space before the file loads.
- An `interaction` block or an `inlineInteraction` node names an interaction of
  the same item version by identifier. The interaction itself is not in the
  document. Only the prompt of an item may place interactions; an explanation, an
  option label, and a stimulus use the same document without places.

### Interactions

There are twelve kinds, aligned with QTI 3.0.1: `choice`, `matrix`, `match`,
`order`, `inlineChoice`, `textEntry`, `numericEntry`, `mathEntry`, `hotspot`,
`gapMatch`, `graphPoint`, and `extendedText`. Upload and audio are planned and
are not part of this decision.

- Every interaction has an identifier and a label for screen readers, and none
  holds an answer key.
- `mathEntry` has an equivalence policy that is data. `proof` accepts only a
  deterministic proof: canonical simplification followed by `isSame`, or
  `isEqual` returning true. `proofOrSample` also accepts `isIdenticallyEqual`
  returning true, which is a sample at up to 50 points and not a proof, and which
  the grader records as sampled (Compute Engine 0.152.0 semantics).
- A field may sit inside a line of text only when its kind allows it: an inline
  choice, a text entry, a numeric entry, or a math entry. A gap match sits in the
  text once for each of its gaps. Every other kind sits as a block of its own.

### Scoring

Scoring is data. Each interaction has a rule: `allOrNothing`, `perPart` (points
for each correct part, an optional penalty for each wrong part, and a floor), or
`rubric` (criteria with ordered levels and points). The outcome of an
interaction is a score category from 0 to k, where k is the most points its rule
can award, so a partial score can enter an IRT model through GPCM later. The
exam profile sets a default rule for every interaction kind, and an item may
override it for one interaction. A rubric is never a default, so an extended text
always carries its own. An exam scores its outcomes with one strategy: `irt`,
`raw`, `penalized` (whole marks for a correct, a wrong, and a blank answer), or
`composite` (a formula written out in every language).

### Keys

The answer key of an item version is its own schema and its own artifact, and it
names the hash of the item version it answers. Only an entitled reader receives
it. A prompt, an interaction, a paper, and a stimulus carry no key. The accepted
texts of `textEntry`, and the decimal value and the tolerance of `numericEntry`,
are the ones of `question/answer`, so there is one grammar for them.

### Items, stimuli, and versions

- An item family has a language-neutral identifier, its blueprint facts
  (competency, topic, cognitive level), and an optional stimulus. An item
  version is one family in one delivery language: prompt, interactions, scoring
  overrides, explanation, the stimulus version it was written against, and a
  `hash`.
- A version is immutable once published: a change is a new version. Its `hash`
  is SHA-256 over the canonical JSON of every other field (keys in code-unit
  order), under the domain `nakafa.aksara.assessment-item`. A stimulus version
  uses `nakafa.aksara.assessment-stimulus`. Equal content has one hash whatever
  order its keys were built in.
- Every version of a family has the same interaction structure, checked by the
  `ItemSchema` refinement. The old contract already required translations to keep
  their format, structure, and key. If the structure could differ, one answer key,
  one scoring rule, and one calibrated difficulty could not serve every language
  of an item. Labels, text alternatives, and units are the words of a language;
  identifiers, counts, bounds, flags, and scoring rules are structure.
- A stimulus is a shared reading or figure with a namespaced identifier
  (`<namespace>/passage-1`), so `passage-1` in two sets are two stimuli. It has a
  version for each delivery language. Items and papers use it by identifier and
  hash and never copy its document.

### Profiles, papers, and tools

- An exam profile is signed data that a country profile carries. It holds the
  official names in every locale, the sections (names, item count, seconds,
  navigation `free` or `linear`, allowed interaction kinds, tools), the total
  time, the breaks, one default rule for each allowed kind, the scoring strategy
  and its scale, the accommodation catalog in three tiers (tools for all, support
  that someone assigns, accommodations recorded with evidence and frozen when an
  attempt starts), and the form of the report. Try-outs and School exams use the
  same profile. A scale belongs to `irt` and `composite` only, a standard error to
  `irt` only, and the total time is the sum of the section times.
- A paper is a frozen manuscript: the profile it follows by identifier and hash,
  sections with ordered places, each place an item version by family and hash,
  and the stimulus versions it uses by identifier and hash. The signed paper
  bundle carries no key.
- The tool registry has twelve identifiers: three calculators (`basic`,
  `scientific`, `graphing`; no calculator is the absence of all three), a formula
  sheet, an option eliminator, a highlighter, mark for review, notes, a line
  reader, zoom, hide timer, and text to speech. A section enables tools by these
  identifiers, with at most one calculator.

### Modules

| Module | Owns |
| --- | --- |
| `document`, `inline`, `figure` | the Assessment Document, its inline nodes, the five figures and the image |
| `interaction`, `choice`, `entry`, `graphic` | the twelve interactions |
| `scoring` | rules, strategies, scales, and the score ceiling of a rule |
| `key` | the answer key of an item version |
| `item`, `stimulus`, `hash` | families, versions, shared readings, and their hashes |
| `profile`, `paper`, `tools` | exam profiles, frozen papers, and the tool registry |
| `identity`, `scalar`, `part`, `fit`, `structure` | identifiers, shared scalars, and the checks that the other modules share |

Every module has its own `./assessment/<module>` export except `scalar`,
`part`, `fit`, and `structure`, which stay internal, as `question/label` does.

## QTI mapping

QTI 3.0.1 is the vocabulary of the interactions and the target of a later
export. It is not the stored format: the stored format is the typed JSON that the
Nakafa renderer and Tiptap share. The research behind this table (13 October
2026) read the information model, the implementation guide, the response
processing templates, and the official examples. It could not open the ASI XSD,
so every attribute name below needs an XSD check before any QTI XML is written.

| Contract | QTI 3.0.1 |
| --- | --- |
| `choice` | `qti-choice-interaction` (`min-choices`, `max-choices`, `shuffle`) with `qti-simple-choice` |
| `matrix` | `qti-match-interaction`: the statements are the first set, the columns the second |
| `match` | `qti-match-interaction` with `qti-simple-match-set` and `match-max` on each `qti-simple-associable-choice` |
| `order` | `qti-order-interaction` |
| `inlineChoice` | `qti-inline-choice-interaction` |
| `textEntry` | `qti-text-entry-interaction` (`expected-length`) |
| `numericEntry` | `qti-text-entry-interaction` with a float response |
| `mathEntry` | `qti-portable-custom-interaction`, because QTI has no interaction for a typed expression |
| `hotspot` | `qti-hotspot-interaction` with `qti-hotspot-choice` (`shape`, `coords`) |
| `gapMatch` | `qti-gap-match-interaction` with `qti-gap-text` (`match-max`) and `qti-gap` |
| `graphPoint` | `qti-select-point-interaction` for points, `qti-portable-custom-interaction` for lines |
| `extendedText` | `qti-extended-text-interaction` (`expected-lines`); QTI leaves its scoring to a person |
| `allOrNothing` | the `match_correct` response processing template |
| `perPart` | the `map_response` template with a `qti-mapping` (`qti-map-entry`, `default-value`, `lower-bound`) |
| `rubric` | `qti-rubric-block` with `use="scoring"` and a float `SCORE` that a person sets |
| score ceiling k | the float outcomes `SCORE` and `MAXSCORE` |
| stimulus | `qti-assessment-stimulus` and `qti-assessment-stimulus-ref` |

`max-choices="0"` is not used: its meaning is not confirmed by the sources read,
so `maxChoices` is always a positive count.

Sources:

- [QTI 3.0.1 Information Model](https://www.imsglobal.org/sites/default/files/spec/qti/v3/info/imsqti_asi_v3p0p1_infomodel_v1p0.html)
- [QTI 3.0 Best Practices and Implementation Guide](https://www.imsglobal.org/spec/qti/v3p0/impl)
- [`match_correct` template](https://purl.imsglobal.org/spec/qti/v3p0/rptemplates/match_correct.xml)
  and [`map_response` template](https://purl.imsglobal.org/spec/qti/v3p0/rptemplates/map_response.xml)
- [1EdTech QTI examples](https://github.com/1EdTech/qti-examples)

## Bounds

| Bound | Value | Source |
| --- | --- | --- |
| Nesting of a document | 16 levels, `doc` being level 1 and a text node a level | Convex limits, row "Nesting depth": 16 |
| Encoded document | 1 MiB (1,048,576 bytes) of UTF-8 JSON text | Convex limits, row "Size": 1 MiB |
| Local identifier and kebab key | 128 characters | `tryout/key.ts`, the limit that try-out keys already use |
| Family, profile, paper, stimulus, and asset identifier | 512 characters | `CONTENT_KEY_MAX_LENGTH` in `ids.ts` |

The Convex numbers are from https://docs.convex.dev/production/state/limits,
read on 13 October 2026. Convex counts the nesting of objects and arrays, and a
node is an object that holds an array, so a document of 16 levels is about 32
Convex levels deep. A document is therefore stored as encoded JSON text, not as
a Convex object. The 1 MiB limit covers the whole stored document, so a store
that adds fields around the text keeps a lower ceiling of its own.

## What the later work does

Each step below is a separate change. They land in one release train, because a
breaking signed contract change needs a complete current-format republish and no
compatibility layer.

1. The compiler turns authored source into documents, interactions, scoring,
   keys, and hashed item and stimulus versions. Authors keep writing MDX; the
   compiler makes the document.
2. The corpus migration rewrites today's question bank and try-out sets as item
   families, versions, stimuli, profiles, and papers.
3. The publisher signs and stages those records and delivers each key only to an
   entitled reader.
4. Nakafa's consumer renders the document, plays the interactions, grades with
   the keys, and reads profiles and papers.
5. The release that switches the readers deletes `question/` and `tryout/` and
   the shapes that only they use, and takes the contracts package to its next
   major version. Until then both generations live in the package, and no
   reader of the old one changes.

## Consequences

- The package grows by sixteen subpath exports and one minor version, 0.49.0.
  It changes no existing export.
- `assessment/key` imports the text key, the decimal, and the tolerance from
  `question/answer`. That module keeps those primitives, or moves them, when the
  old shapes are deleted.
- The two hash functions and the canonical encoding sit beside the schemas, so
  the compiler that writes a hash and the consumer that checks it share one
  encoding.
- This contract leaves out upload and audio interactions, adaptive sections, and
  a check that a key fits the item version it names (the publisher owns it). The
  accommodation vocabulary is the one in the blueprint's table of accommodations:
  assigned support is text to speech, high contrast, and a separate room;
  recorded accommodations are extra time, an extra break, a reader, a scribe, and
  an alternate format. Adding a name is a change to this contract.

## Rejected

- Storing MathML beside LaTeX. It is derived from LaTeX at render time, and a
  stored copy could disagree with its source.
- Keeping a key inside an interaction, an option, or a prompt. A prompt reaches
  learners before the key may.
- Copying a shared reading into the prompt of each item. The copies drift, and
  an edit would have to find all of them.
- `Schema.Unknown` or free JSON for figure props. A figure that no schema
  describes cannot be checked, edited, or exported.

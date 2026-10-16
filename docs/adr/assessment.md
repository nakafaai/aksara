# ADR 0005: Assessment contract

- Status: Accepted
- Date: 2026-10-13
- Widened: 2026-10-16, version 0.50.0 (see Widenings in 0.50.0)

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
  no item uses one. A `LineEquation` series may have a line width of zero, which
  draws its points alone, as the answer to TKA compulsory mathematics set 3,
  question 8, does. Its camera sits away from the point it looks at, counting the
  defaults of the renderer for a pose that is left out: the card puts the camera
  at (10, 6, 10), and the scene looks at the origin.
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
- `mathEntry` holds no equivalence policy. The expression to match is in the
  key. A proof is the same canonical form under `isSame`, or `isEqual` returning
  true for expressions without free variables (both are methods of Cortex
  Compute Engine). Any other true about expressions with free variables is a
  sample and not a proof, and it is recorded as sampled. What a sample does is a
  rule of the exam, not of the item: the exam profile says it in `sampledMath`
  (see Profiles, papers, and tools). The engine, and the test that pins its
  behavior on `(x+1)^2` against `x^2+2x+1`, belong to Nakafa, not to this
  package: Nakafa ADR 0031 decides them in section 3 and gives answer evaluation
  to its `response` module in section 9. This package has no engine and tests
  none.
- A field may sit inside a line of text only when its kind allows it: an inline
  choice, a text entry, a numeric entry, or a math entry. A gap match sits in the
  text once for each of its gaps. Every other kind sits as a block of its own.

### Scoring

Scoring is data. Each interaction has a rule: `allOrNothing`, `perPart` (points
for each correct part, an optional penalty for each wrong part, and a floor),
`wrongParts` (points by the number of wrong parts, in bands), or `rubric`
(criteria with ordered levels and points). The outcome of an interaction is a
score category from 0 to k, where k is the most points its rule can award, so a
partial score can enter an IRT model through GPCM later. The floor of a per-part
rule is therefore at most k. A field has one part, worth the points of its rule,
so an item version and an exam profile check the floor of a rule for a field
themselves, and a field takes a wrong-parts table of one band for no wrong part.
The key counts the parts of every other kind, so the check of those belongs to
the key-fit check below. The exam profile sets a default rule for every
interaction kind, and an item may override it for one interaction. A default is
`allOrNothing`, `perPart`, or `wrongParts`, never a rubric, so an extended text
always carries its own. An exam scores its outcomes with one strategy: `irt`,
`raw`, `penalized` (whole marks for a correct, a wrong, and a blank answer), or
`composite` (a formula written out in every language).

### Keys

The answer key of an item version is its own schema and its own artifact, and it
names the hash of the item version it answers. Only an entitled reader receives
it. A prompt, an interaction, a paper, and a stimulus carry no key. The accepted
texts of `textEntry`, and the decimal value and the tolerance of `numericEntry`,
are the ones of `question/answer`, so there is one grammar for them.

### Explanations

The explanation of an item version is its own schema and its own artifact too,
and, like the key, it names the hash of the item version it explains. An item
version holds no explanation, so its hash covers the prompt, the interactions,
the scoring, and the stimulus reference only, with its family and delivery
language. A paper bundle carries prompts and stimuli only, never a key and never
an explanation, so an explanation reaches a learner after release, under the
release policy that Nakafa applies, from its own record. A version without an
explanation has no record, and the document of an explanation places no
interaction.

### Items, stimuli, and versions

- An item family has a language-neutral identifier, its blueprint facts
  (competency, topic, cognitive level), and an optional stimulus. An item
  version is one family in one content language (a canonical BCP 47 tag, see
  Widenings in 0.50.0): prompt, interactions, scoring overrides, the joint rule
  when its answers depend on each other, the stimulus version it was written
  against, and a `hash`. Its answer key and its explanation are records of their
  own.
- A joint rule scores several answers together, such as an answer and its
  reason. It lists levels in order of points, each naming the interactions that
  must all be correct and the points that they earn. The item scores the points
  of the first level whose interactions are all correct, and 0 when none is. A
  later level may not name every interaction of an earlier level, because each
  answer that earns it also earns the earlier level, which comes first, so the
  later level could never score. A level names a set, so the order of its listing
  is not part of the task: the structure check of a family compares the sets, and
  the hash keeps the exact listing. A joint item names at least two of its
  interactions and sets no scoring override, so one rule scores it. An extended
  text cannot join, because it needs a rubric override and a joint item has none.
  Its ceiling is the points of its first level (`jointCeiling`), not the sum of
  its interactions.
- A version is immutable once published: a change is a new version. Its `hash`
  is SHA-256 over the canonical JSON of every other field (keys in code-unit
  order), under the domain `nakafa.aksara.assessment-item`. A stimulus version
  uses `nakafa.aksara.assessment-stimulus`. Equal content has one hash whatever
  order its keys were built in. A value that is not JSON (a member that is
  `undefined`, a date, a number that is not finite) has no canonical text and
  fails with a schema error, because writing it as something else would give two
  values one hash.
- Every version of a family has the same interaction structure, checked by the
  `ItemSchema` refinement. The old contract already required translations to keep
  their format, structure, and key. If the structure could differ, one answer key,
  one scoring rule, and one calibrated difficulty could not serve every language
  of an item. Labels, text alternatives, and units are the words of a language;
  identifiers, counts, bounds, flags, and scoring rules are structure. The
  interactions of a joint level are a set, so their order is not structure.
- A stimulus is a shared reading or figure with a namespaced identifier
  (`<namespace>/passage-1`), so `passage-1` in two sets are two stimuli. It has a
  version for each content language. Items and papers use it by identifier and
  hash and never copy its document. The contract cannot detect a copy of a
  reading inside a prompt, because an item version holds only the identifier and
  the hash of its reading.

### Profiles, papers, and tools

- An exam profile is signed data that a country profile carries. It holds the
  official names in every locale, the sections (names, item count, seconds,
  navigation `free` or `linear`, allowed interaction kinds, tools), the total
  time, the breaks, one default rule for each allowed kind, the scoring strategy
  and its scale, the accommodation catalog in three tiers (tools for all, support
  that someone assigns, accommodations recorded with evidence and frozen when an
  attempt starts), the form of the report, the write allowance and the grace
  period, and what a sampled math verdict does. Try-outs and School exams use
  the same profile. A scale belongs to `irt` and `composite` only, a standard
  error to `irt` only, and the total time is the sum of the section times.
- The profile owns the two numbers that Nakafa's attempt gate reads at a
  deadline (Nakafa ADR 0013). `writeAllowanceSeconds` is how long after a
  deadline a write that was already in flight still counts as on time.
  `graceSeconds`, the reconciliation grace period, is how long after a deadline
  an attempt that is reconciling keeps the queued records that arrive, before it
  is submitted without the rest. Each is a whole number of seconds above zero,
  and each applies at every section deadline and at the deadline of the
  attempt. The contract bounds them to that and no further: Nakafa checks the
  write allowance against its presence lease when it loads the profile, so the
  lease is not restated here.
- The profile decides sampled math, not the interaction. `sampledMath` is
  `score` or `review`. Under `score`, a sampled verdict scores the answer, as in
  practice and consumer try-outs. Under `review`, it goes to the teacher, as in a
  school exam, so there a sample never grades a student on its own. The same
  item therefore needs no change to sit in a try-out and in a school exam.
- A paper is a frozen manuscript: the profile it follows by identifier and hash,
  sections with ordered places, each place an item version by family and hash,
  and the stimulus versions it uses by identifier and hash. A paper is frozen and
  named by its content hash. A paper bundle carries prompts and stimuli only,
  never a key and never an explanation. The schema of a paper cannot see the
  item versions its places name, so `verifyPaperStimuli` checks that the
  stimulus versions a paper lists are exactly the ones those item versions use,
  each once. Whoever freezes a paper runs it first, because the hash fixes the
  content.
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
| `scoring` | rules, strategies, scales, the score ceiling of a rule, and the points of a wrong-parts table |
| `key`, `explanation` | the answer key and the explanation of an item version, each a record of its own |
| `item`, `stimulus`, `hash` | families, versions, shared readings, and their hashes |
| `joint` | the joint rule of an item version: its levels, its ceiling, and the checks that it fits the version |
| `profile`, `paper`, `tools` | exam profiles, frozen papers, and the tool registry |
| `identity`, `scalar`, `part`, `fit`, `structure`, `record` | identifiers, shared scalars, and the checks that the other modules share, such as the size limit of a record |

Every module has its own `./assessment/<module>` export except `scalar`,
`part`, `fit`, `structure`, and `record`, which stay internal, as
`question/label` does.

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
| `wrongParts` | no standard template holds a table over the wrong parts: general response processing (Best Practices and Implementation Guide, section 3.4.2) |
| `joint` | a composite item, which section 3.4.2 scores by general response processing, not by a standard template |
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
| Nesting of a document | 16 levels, `doc` being level 1 and a text node a level | Convex limits, section "Documents", row "Nesting depth": 16 |
| Encoded record | 1 MiB (1,048,576 bytes) of UTF-8 JSON text | Convex limits, section "Documents", row "Size": 1 MiB |
| Local identifier and kebab key | 128 characters | `tryout/key.ts`, the limit that try-out keys already use |
| Family, profile, paper, stimulus, and asset identifier | 512 characters | `CONTENT_KEY_MAX_LENGTH` in `ids.ts` |

The Convex numbers are from https://docs.convex.dev/production/state/limits,
read on 13 October 2026. Convex counts the nesting of objects and arrays, and a
node is an object that holds an array, so a document of 16 levels is about 32
Convex levels deep. A document is therefore stored as encoded JSON text, not as
a Convex object.

The 1 MiB limit is a limit on one stored document of Convex, which is one row. It
belongs to each record that Nakafa stores as one row: an item version, a
stimulus version, an answer key, and an explanation. A document is only a part
of such a row, so it has no size limit of its own, and a version whose prompt and
options each fit can still pass the limit together. Each of those four schemas
carries the one check of `assessment/record`, which measures the whole record,
its hash included, as the UTF-8 bytes of its encoded JSON text. The page does
not say how Convex counts the size of a document, so this is the measure of the
contract and not of Convex: a store that adds fields around the record, or keeps
a document in another form, has a lower or a different ceiling of its own. The
aggregates `ItemSchema` and `StimulusSchema` hold versions that are rows of their
own, so they carry no limit.

The schema checks the depth on the input, before it reads any node, with a walk
that stops at the limit. Reading nodes uses the stack once or more for each
level, so a document that is deep enough would overflow it, and that is a defect,
not a failure of the schema. A record is measured after its documents are read,
when their depth is known to be small.

## What the later work does

Each step below is a separate change. They land in one release train, because a
breaking signed contract change needs a complete current-format republish and no
compatibility layer.

1. The compiler turns authored source into documents, interactions, scoring,
   keys, explanations, and hashed item and stimulus versions. Authors keep
   writing MDX; the compiler makes the document.
2. The corpus migration rewrites today's question bank and try-out sets as item
   families, versions, stimuli, profiles, and papers.
3. The publisher signs and stages those records and delivers each key only to an
   entitled reader and each explanation only after release. Before it freezes a
   paper it checks the stimulus versions the paper lists with
   `verifyPaperStimuli`, and it checks each key against its item version.
4. Nakafa's consumer renders the document, plays the interactions, grades with
   the keys, and reads profiles and papers.
5. The release that switches the readers deletes `question/` and `tryout/` and
   the shapes that only they use, and takes the contracts package to its next
   major version. Until then both generations live in the package, and no
   reader of the old one changes.

## Consequences

- The package grows by seventeen subpath exports in 0.49.0, and by one more,
  `./assessment/joint`, and one minor version, 0.50.0. Version 0.50.0 changes no
  existing export and no value that 0.49.0 accepts.
- `assessment/key` imports the text key, the decimal, and the tolerance from
  `question/answer`. That module keeps those primitives, or moves them, when the
  old shapes are deleted.
- The two hash functions and the canonical encoding sit beside the schemas, so
  the compiler that writes a hash and the consumer that checks it share one
  encoding.
- This contract leaves out upload and audio interactions, adaptive sections, and
  a check that a key fits the item version it names. The publisher owns that
  check, and it includes the floor of a per-part rule and the bands of a
  wrong-parts table against the parts that the key counts. The accommodation
  vocabulary is the one in the
  blueprint's table of accommodations: assigned support is text to speech, high
  contrast, and a separate room; recorded accommodations are extra time, an extra
  break, a reader, a scribe, and an alternate format. Adding a name is a change
  to this contract.

## Widenings in 0.50.0

Three widenings let a pilot school write its own exams (blueprint K23 and K24).
Each adds a member or a field, and none changes a value that 0.49.0 accepts, so
every 0.49.0 value decodes unchanged.

### Content language

`ContentLanguageSchema` in `locale` is a string that `Intl.getCanonicalLocales`
returns unchanged, branded as a content language. It accepts `ar`, `id`, `de-CH`,
`zh-Hant-TW`, and `sr-Latn`. It refuses `AR` and `iw`, which name the canonical
tags `ar` and `he`, and it refuses `en_US`, the empty string, and `x`, which Intl
rejects. An item version and a stimulus version take it. The try-out contract
keeps `DeliveryLanguageSchema`, which still holds the three app locales.

The direction of a text is not stored: the renderer follows the script of each
text. Every reader of the language was traced. `hasFamilyVersions` keeps one
version per language of an item, `hasOwnVersions` keeps one version per language
of a stimulus, and a paper holds no language. No check compares the language of a
stimulus reference with the language of its item, because a reference holds only
an identifier and a hash. No publication path of Aksara decodes assessment items
at this version, so none refuses a language outside the app locales yet. The
path that first decodes them must refuse one there, with its own test.

### Wrong parts

A `wrongParts` rule holds bands `{ wrong, points }`, ascending in `wrong` and
descending in `points`. An answer keeps the points of the first band whose
`wrong` is at least its number of wrong parts, and 0 when no band holds it. The
parts are the ones that the per-part rule counts, as the key defines them. The
AKM rule of a complex multiple choice with more than five statements and more
than two options is `[{ wrong: 0, points: 2 }, { wrong: 2, points: 1 }]`, which
gives 2, 1, 1, and 0 for 0 to 3 wrong parts.
`pointsForWrongParts` reads the table alone: grading an answer stays with
Nakafa's engine.

The AKM rule is the secondary source that the research names: the
komunitasbelajar.id post by Mulyana, 2020
(https://www.komunitasbelajar.id/2020/09/buku-desain-pengembangan-soal-asesmen.html),
read as a fetched summary. The post gives the rule for more than five statements
with more than two options: 2 points when all are correct, 1 point for one or two
wrong, and 0 for more. It states the rule as conditional. The PDF that it links
could not be read, so no primary source confirms the rule. The QTI mapping is in
the table above.

### Joint rule

The joint rule scores a two-tier item, an answer and then its reason, with
`[{ correct: [answer, reason], points: 2 }, { correct: [answer], points: 1 }]`.

The contract follows the first variant: 2 points when both tiers are correct, 1
point when only the first is correct, and 0 otherwise. Its source is a
BRIN-hosted paper dated 2022 by its file name. The research found it only in a
search result that it did not open, and its notes do not record the link, so the
link that a search returned is a lead to check, not a confirmed source:
https://karya.brin.go.id/23916/1/2541-2612_7_2_2022-2.pdf. A second variant,
which credits an item only when both tiers are right, comes from an Unnes 2021
article that the research did not open and whose link its notes do not record.
A UPI 2019 note calls the format rare, and the official format lists that the
research read (TKA, AKM, AKMI, and SNBT) do not name it. These sources are
leads, not verified sources, so the rule must be confirmed against a primary
source before a school exam uses it.

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

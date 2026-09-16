# Checker limits and gate scope

## Evidence and checker limits

- Use [EYD V](https://ejaan.kemendikdasmen.go.id/eyd/) for Indonesian spelling,
  word formation, capitalization, and punctuation. EYD does not classify a
  sentence as natural or AI-generated.
- The global Humanizer pattern catalog is based on
  [Wikipedia's Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).
  Its false-positive guidance is part of the method: one pattern is never proof
  of authorship, and polished or technical prose is not suspicious by itself.
- The German review follows the same contextual limit documented by
  [humanizer-de](https://github.com/marmbiz/humanizer-de). Raw linter output is
  a list of candidates. Exclude code, formulas, metadata syntax, quotations,
  and legitimate technical terms before editing prose. Learner-visible
  descriptions and labels still receive the authored-voice review.
- The learner-clarity rules in this skill are project-specific editorial
  requirements. They turn each explanation into testable questions: who or
  what changes, under which condition, compared with what, why it matters, and
  which concrete result follows. These requirements evaluate meaning, not the
  writer's identity.
- Corpus examples and explicit learner feedback establish project-specific
  regression cases such as bare `tanpa terlihat`, abstract visibility claims,
  and unmeasured speed superlatives. EYD and the Humanizer catalogs inform the
  surrounding language review, but this skill does not attribute those exact
  Nakafa rules to an external source that does not state them.
- The representation rules are supported by the evidence listed in
  [evidence basis](evidence-basis.md), including the What Works
  Clearinghouse guide, Mayer's multimedia principles, and signaling meta-analyses. Those sources
  support purposeful structure and relevant signals. They do not justify a
  visual quota or automatic sentence shortening.
- Displayed-math composition is a project-specific regression class recorded
  from a user report on a shipped lesson plus an audit of every authored math
  value. Three shapes block: a word welded to a neighbouring symbol because the
  renderer never emits the authored space, a displayed chain that opens with a
  bare term, and a conjunction that joins two equations inside one chain row.
  The gate decides the first shape from the source, because an authored space
  next to an operand cannot survive math mode; rendering the values through the
  installed KaTeX build confirmed that behaviour while these rules were
  written. A word directly after a closing parenthesis or bracket welds with no
  authored space at all, so that placement also blocks. Relation and operator
  neighbours, `\,`-style spacing commands, a text group whose own leading or
  trailing space already renders, an ordinal suffix welded to a closed value,
  and a conjunction that names an alternative inside a single equation stay
  valid.

The deterministic lesson voice gate is a quality regression linter, not an AI
authorship detector. Admit a new rule only when all of these conditions hold:

1. A real corpus sentence or user report demonstrates a distinct ambiguity,
   standard-language error, unsupported label, or artificial prose pattern.
2. A corpus-wide search checks likely wording variants in English, Indonesian,
   and German before the pattern is designed.
3. The expression preserves valid scientific comparisons, safety claims,
   code, formulas, quotations, metadata syntax, and non-prose fields. Check
   learner-visible descriptions and labels at their rendered-text boundary.
4. A positive test catches the failure and a negative test preserves a nearby
   valid construction that names its quantity, mechanism, or prevented error.
   Add a boundary test for the nearest legitimate use of the same word when a
   rule touches overloaded terms such as `kelas`, `class`, `school`, or
   `Klasse`. For terminology rules, prove that canonical English programming
   terms are not rejected merely because they are English.
5. Every match is reviewed in its complete paragraph and against both locale
   siblings before any rewrite.

## Deterministic gate scope

The gate runs on lessons (`packages/corpus/material/lesson`) and articles
(`packages/corpus/articles`). Both scopes must reach zero findings, and the
production suites assert that. The same command accepts `--root` for any other
authored tree, including a single lesson directory.

The question bank is deliberately outside the gate. Its files are named
`answer.id.mdx` and `question.en.mdx`, so file discovery reads the trailing
locale segment and the tree is now reachable, but the rule set does not fit it:
a measured run over all 9650 question-bank MDX files reports 25,254 findings,
dominated by
rules that do not apply to assessed items. Metadata titles such as
`Pembahasan Soal 4` contain digits, so the heading-symbol rule fires on nearly
every item; the per-document highlight floor and `locale-representation-parity`
assume a lesson with locale siblings, while an assessed prompt exists in one
language only. Gating the question bank needs its own rule profile, and that is
a separate change with its own evidence run.

A **review candidate** is a finding the gate emits at the `review` tier, so only
`--strict-review` fails it while the repository suite still rejects it. A
**manual review item** is a class with no rule at all, so no checker output can
report it and the closing read owns it alone. Read the two terms exactly: only
the first appears in checker output.

Several blocking rules encode one proven regression rather than a general
class. Each stays narrow on purpose, and each names the report or corpus
sentence that established it:

The rule modules and `scripts/voice/policy.ts` own the rule ids and their tier
in code. This reference names only the rules whose boundary a reviewer must
know, so it is not the full id list.

- `compressed-renewable-timescale-contrast` blocks the exact
  human-timescale-versus-fossil-fuels contrast reported for the renewable
  energy lessons. A direct explanation and a factual negation both stay valid.
- `chemical-formula-personification` blocks a formula that `carries` a mass.
  State the mass ratio instead.
- `known-decorative-science-heading` blocks the literal decorative headings
  recorded from the science corpus, such as `An Atom Identity Card`.
- `abrupt-scenario-imperative` blocks the land-area scenario that turned a
  teacher's explanation into an unexplained task.
- `unsupported-evaluative-preface` blocks `this is the most common example`
  where no factual basis for the ranking exists.
- `vague-benefit-risk-reference` blocks a summarized risk reference that names
  neither the risk nor the affected group.
- `indonesian-water-ratio-gateway` and `indonesian-stiff-serampangan` block the
  recorded mechanical phrasings `gerbang rasio air` and `serampangan`.
- `anti-model-intensifier` blocks the recorded `not this simple`,
  `nicht so einfach`, and `tidak sesederhana` aside from the exponential growth
  example. That is the only instance of the sub-shape in the corpus, and the
  shape is separable because its object is a judgment about difficulty rather
  than a concept, quantity, condition, or misconception.
- `abstract-concept-asks-question` and
  `abstract-concept-question-personification` both block a concept that asks a
  question. The first matches the generic subject list, the second the recorded
  domain subjects. Both are blocking, so one defect class no longer splits
  across two tiers.
- `unbalanced-emphasis` blocks an authored `**` marker whose partner is missing
  or sits in another paragraph. MDX resolves an emphasis pair inside one
  paragraph, so such a marker reaches the learner as literal `**`. A pair inside
  one paragraph stays valid even when it wraps an inline component, and inline
  or fenced code keeps `**` as programming syntax.
- `heading-order` blocks a body that opens above `##` or a heading whose level
  skips one. The corpus nests answer-key headings to `####` and `#####` under a
  `###` heading, which stays valid because no level is skipped, so the gate
  enforces order rather than a maximum depth.
- `highlight-ceiling` blocks a second `<Highlight>` inside one heading span, so
  the explicit marker keeps naming the one decisive rule, condition, or term of
  that span, and `lesson-without-highlight` owns the floor of one per authored
  locale document. The measured maximum is one highlight per heading span across
  the corpus, while one top-level `##` section carries three because its `###`
  subsections each mark their own phrase. The rule does not cap `**` density or
  total marked surface: both markers render the same treatment, so an author can
  mark several phrases in one span with `**`, and that spacing judgement stays
  editorial.
- `internal-link-generic-label`, `internal-link-only-block`, and
  `internal-link-navigation-heading` block a label that names no destination
  concept, a paragraph or list item whose visible content is only links, and a
  heading whose whole label only announces navigation. The gate holds no numeric
  internal-link ceiling: the measured maximum is four woven links inside one
  section of the transformation lessons, each naming a distinct sibling concept,
  so the density judgement stays the editorial read in the final review.
- `duplicated-list-ordinal` blocks a numbered item that opens with
  `1. Pertama,`, `First,`, `Zuerst,`, or `Zunächst:` because the number already
  orders the step. The same defect with a verb after the ordinal, such as
  `4. First simplify the angles.` or `1. Zuerst wird ...`, needs a per-language
  verb lexicon, because `1. First term a`, `1. Pertama kali`, and
  `1. Erste Ableitung ...` modify a following noun and stay valid. The corpus
  carries none of the verb form, so the manual read owns it until that lexicon
  exists and the pattern can widen.

- `bare-look-pointer` blocks a whole paragraph that only tells the learner to
  look at the next block. The reported regression is `Perhatikan matriks
  berikut:` in front of a displayed matrix, with `Consider the following
  matrix:` and `Betrachte die folgende Matrix:` as its siblings. A task
  instruction that names the learner action, such as `Bandingkan kedua vektor
  itu dan tentukan sudut di antara keduanya:`, and a pointer that names the
  instrument, such as `Prüfe jeden Reaktionstyp mit der folgenden Tabelle.`,
  stay valid.
- `counted-pointer-caption` blocks the reported caption that counts the block
  below it and teaches nothing: `Dua rumus berikut menghitung luas juring:` in
  front of two formulas. A tail that names the deciding condition, such as
  `Dua rumus berikut menghitung luas juring bila satuan sudutnya berbeda:`, and
  a pointer noun outside the display-artifact set, such as `Tiga istilah berikut
  menjelaskan struktur matriks:`, stay valid. The German and English pre-noun
  frames stay a manual read item, because `Die folgenden zwei Versuche prüfen
  das Gesetz der konstanten Zusammensetzung` has the same shape as a legitimate
  preview. The [final review](review.md#final-language-review) owns them.
- `blockquote-editorial-label` blocks an authored callout whose body opens with
  a label such as `Quick check:`, `Kurzer Check:`, or `Cek cepat:`. A blockquote
  body receives the address rules and this rule, so callout prose is checked,
  while a real quotation with protected bytes stays valid.
- `duplicate-adjacent-word` blocks one word repeated next to itself.
  `evidence-carrying-metaphor` blocks a recorded clue, evidence, or observation
  that `carries` a conclusion. `decorative-picture-to-calculation` blocks a
  recorded picture that `turns into` a calculation.
  `unqualified-energy-density-claim` and `unqualified-fuel-storage-claim` block
  the recorded density and fuel-storage claims. The Indonesian pattern of the
  density rule is not written yet, so an Indonesian sentence of that class stays
  a manual read item.

Widen one of these only after the corpus-wide search and the positive,
negative, and boundary tests described above.

The address rules are authored-voice rules, not raw pronoun bans. Indonesian
`Anda` and `saya` are blocked only in learner-visible authored prose. German
formal address is blocked in direct-address syntax such as a formal imperative
or a capitalized formal pronoun in a local frame that requires a human actor.
This includes standalone `Sie können ...` plus a learner action, an explicit
learner label such as `Hinweis: Sie können ...`, `Ihnen steht ... zur
Verfügung`, and learner-owned `Ihr ...` copy when no prose antecedent exists.
Learner-visible metadata descriptions, direct string props,
expression props, rendered fragments, Markdown link labels, and image alt text
are part of this authored voice. Link destinations and source string delimiters
remain syntax. Real single-line and balanced multiline quotations, code, math,
non-prose technical fields, assessed text, and immutable source bytes stay protected.
Keep anaphoric `Sie`, `Ihnen`, and `Ihr` when a named feminine, plural, or human
subject in the same paragraph supports that reading. The deterministic rule
does not infer every ambiguous cross-sentence referent. Review those cases in
context instead of widening the rule to a raw pronoun ban. An unmatched opening
quotation mark never protects the rest of the document.

Objective source constraints and proven regressions may block the default
gate. A broader wording pattern remains a review candidate until corpus
evidence and negative tests show that automatic rejection is safe. Strict
review may fail on
all candidates during an editorial audit, but a match still requires the full
paragraph, subject terminology, and locale siblings before any edit. The
[verification](verification.md#lesson-voice-gate) reference owns how each tier
fails, including the review candidate in the repository suite.

Teacher-led narrative quality remains a contextual review. A deterministic
checker may flag a proven empty transition, ambiguous reference, or rhetorical
template. It must not require one universal lesson arc, count story stages, or
reject a lesson because it starts with a definition, example, diagram, or
calculation. Those rules would reward a new template and create false positives.

The heading-echo check, the mirrored-negation pair, body-level demonstratives,
the Indonesian `-nya` clitic on a noun or a verb, and same-document duplicate
sentences are the largest manual review items. No blocking rule reports them,
because a zero-false-positive shape would need a verb lexicon, so
[the final language review](review.md#final-language-review) owns them. Three
review-tier rules cover a narrow slice of the same classes, and a
`--strict-review` run names them: `vague-demonstrative-conclusion`,
`indonesian-unnamed-follow-up-reference`, and
`indonesian-ambiguous-calculation-reference`. `repeated-conclusion-opener` and
`repeated-explanatory-opener` report the third and later repeated opener at that
same tier.

Do not add a global word ban from one awkward sentence, optimize prose for a
detector score, translate terminology merely to make a lint pass, or treat a
clean gate as evidence that the corpus is human.

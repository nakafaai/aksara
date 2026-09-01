---
name: nakafa-content
description: Author and review Nakafa educational content in Aksara. Use for articles, materials, questions, answers, response items, program metadata, Quran shell copy, routes, and translations.
---

# Nakafa Content in Aksara

Aksara is Nakafa's authored-content source. Use this skill for every content
addition, revision, review, or translation in this repository.

## First steps

- Read the repository `AGENTS.md` and the nearest source schema, registry, and
  tests for the scope being changed.
- Read the complete global Humanizer skill before revising authored prose or
  translating it. Humanizer review is mandatory for every authored translation.
- For Indonesian prose, also read the global `bahasa-indonesia` skill and its
  `references/core.md` and `references/naturalness.md` files. Use natural
  Indonesian connective prose and repo-natural technical terms.
- For German prose, also read the complete global `humanizer-de` skill and its
  routed references. Use its deterministic linter as a source of review
  candidates, then judge every candidate in the full MDX and teaching context.
  Run that prose linter only on learner-facing text, not on an entire raw MDX
  file. JavaScript metadata, JSX attributes, code, and math can otherwise look
  like punctuation, register, or vocabulary problems that are not visible to
  the learner.
- If either locale skill is missing, use the global skill installer to install
  `https://www.skills.sh/ajipurn/bahasa-indonesia-skill/bahasa-indonesia` and
  `https://github.com/marmbiz/humanizer-de` in the user's Codex environment.
  Never copy either skill into this repository, and do not continue locale
  editing until the required skill is available.
- Inspect the exact neighboring corpus entries and recent Git history. Do not
  infer a file layout, locale rule, or metadata contract from an old Nakafa copy.
- Classify the target as authored prose, assessed-language content, or an
  immutable official or quoted source before editing bytes.
- Verify facts through primary evidence and preserve source attribution.

## Source ownership

- Articles live under `packages/corpus/articles/`.
- Lesson materials live under `packages/corpus/material/`.
- Questions, answers, and response items live under
  `packages/corpus/question-bank/`.
- Learning programs and localized route metadata live in the corresponding
  registries under `packages/corpus/`.
- Pinned Quran source bytes and policy live under
  `packages/corpus/quran/source/`. Never Humanizer-rewrite immutable source
  bytes.

## Reference map

| Work | Read |
| --- | --- |
| Any authored revision or translation | `references/editorial-workflow.md`, `references/writing-quality.md` |
| Lesson or article MDX | `references/mdx-quality.md` |
| Question or response items | `references/question-bank.md` |
| Worked answer explanation | `references/question-bank.md`, `references/worked-solutions.md`, `references/mdx-quality.md` |
| Preview and release checks | `references/verification.md` |

## Always enforce

- `appLocale` and `deliveryLanguage` are different concepts. Localize shell and
  explanations through `appLocale`. Preserve the language being assessed in
  prompts and response items through `deliveryLanguage`.
- Localized authored prose must preserve the reconciled, reviewed meaning of
  every canonical source sibling. Never translate from an unreviewed or
  disputed source.
- Locale siblings are one teaching document expressed in different languages.
  Preserve the same sequence and count of concepts, sections, examples,
  exercises, worked solutions, checks, tables, diagrams, math, code, and custom
  MDX components. Do not condense, expand, reorder, or replace a teaching unit
  in only one locale.
- Match the representation that carries each teaching step. If one sibling uses
  a three-step list, a comparison table, a displayed derivation, or a diagram,
  every sibling must carry the same steps, rows, derivation, or visual evidence
  in the same place. Natural sentence boundaries and grammar-driven inline-math
  wrappers may differ. Structural parity must never force word-for-word syntax.
- If any canonical source sibling is inaccurate, incomplete, artificial, or
  pedagogically weak, reconcile the shared teaching document first. Apply the
  correction to every affected existing sibling before translating the
  corrected document into every locale in the authorized scope.
- Use natural teacher voice for the target locale. A translation must read as a
  lesson written for that student, while preserving meaning and evidence.
- Give the lesson a teacher-led narrative. Start from a fact, situation,
  representation, or prerequisite the learner can identify. Move through the
  question or problem, explain the new idea, work through an example, and let
  the learner compare or check the result before the next idea. Use only the
  stages that the topic needs. This is a reasoning flow, not a fixed lesson
  template.
- Teacher-led storytelling never means invented anecdotes, artificial suspense,
  personified concepts, decorative metaphors, rhetorical questions, or chatty
  filler. The lesson feels spoken because each sentence responds to the idea
  before it and prepares the next one. Every transition must carry subject
  meaning.
- Prefer the shortest familiar word that keeps the subject meaning exact. Keep
  a necessary subject term, define it in one plain sentence on first use, and
  never replace an everyday word with a formal synonym merely to sound
  academic.
- English is not a defect by itself. Keep a canonical English technical term
  when learners will see it in syntax, APIs, documentation, error messages, or
  community discussion. Terms such as `standard library`, `namespace`,
  `built-in`, `mutable`, `immutable`, `indexing`, `slicing`, `method`, and
  `loop` may be clearer than a forced Indonesian translation. Explain an
  unfamiliar term in natural Indonesian on first use, then use it consistently.
- Never translate a technical term merely to satisfy a checker. Judge the term
  in its complete sentence, lesson, and subject community. A deterministic rule
  may reject a specific ambiguous construction, but it must not blacklist a
  language, a glossary, or a broad class of technical vocabulary.
- Make every claim complete enough for a student to test. Name the actor or
  quantity, the change or action, and the consequence. A qualitative claim such
  as `tinggi`, `efisien`, `fleksibel`, `mudah disimpan`, or `andal` must state
  what is being measured, under which condition, and what comparison or result
  gives the word meaning. `Kerapatan energinya dapat tinggi` fails because the
  learner cannot tell how high, compared with what, or why it matters. Add the
  supported detail or remove the claim.
- Translate technical operations into the physical action a learner can
  picture. Do not leave calques such as `pembangkit menjadwalkan keluarannya`
  unexplained. State whether the plant runs continuously, raises or lowers
  power as demand changes, or starts for several hours during peak demand.
- Keep references local and unmistakable. Words such as `ini`, `itu`,
  `tersebut`, `manfaat`, `kelebihan`, `risiko`, `dampak`, `this`, `those`, and
  their German equivalents must have one clear antecedent. After a list of
  claims, repeat the exact noun when a student could reasonably ask which
  benefit, risk, source, or process the sentence means.
- Apply the same check to the Indonesian suffix `-nya`. A phrase such as
  `lanjutkan perhitungannya` fails when the student could ask which calculation
  must continue. Name the operation directly, such as `lanjutkan konversi
  satuan` or `substitusikan nilai ke rumus`. Do not blacklist every word ending
  in `-nya`; many have a clear local referent. Read the complete paragraph.
- Do not introduce an imperative unless the lesson actually assigns that action.
  Name what the student must do and what response the task expects. `Laporkan
  luas tutup botol` fails when the lesson is only about to display a worked
  result and gives no reporting task or audience. Use a declarative transition,
  such as `Kita dapat menuliskan hasil pengukuran ... dalam bentuk berikut`.
  Apply the same check to `Report ... with its uncertainty` and `Gib ... mit
  ihrer Unsicherheit ... an` in the locale siblings when those sentences are
  explanatory transitions rather than actual student tasks.
  The same rule applies to `Tuliskan jalur konversinya` when the sentence has
  not named whose conversion path to write. Name the technology and expected
  endpoints, or use a declarative transition before the general formula.
  Keep factual uses such as `NOAA melaporkan ...` when the source and claim are
  explicit.
- Treat a displayed equation as the end of a visual block. The paragraph after
  `BlockMath` or `MathContainer` must begin as a complete sentence, not as a
  lowercase continuation such as `dengan`, `sehingga`, `where`, `so that`,
  `wobei`, or `damit`. Introduce the formula before the block, then state its
  condition, meaning, or consequence in a new sentence after the block.
- Use sensory words only for something a learner can actually observe. A bare
  phrase such as `tanpa terlihat` must name what the program does not report,
  what the interface does not display, or which observer cannot see the
  change. For an abstract pattern, relationship, or difference, state the
  values or behavior that the learner should compare.
- Do not compress several reasons into a comma-separated list when each reason
  needs its own condition or explanation. Keep only source-backed reasons, then
  connect each one to the fact it explains.
- State the teaching point directly. Do not use stock invitations such as
  `mari kita`, `let's`, `schauen wir uns`, or `sehen wir uns` as empty
  signposting. Start with the observation, instruction, or calculation.
- State what a rule or definition does directly. Repeated frames such as
  `memungkinkan kita`, `allows us to`, `we need to remember that`, `hilft uns`,
  and `ermöglicht es uns` turn the learner into filler. Write the operation or
  fact itself, for example `Gunakan identitas ini untuk mengganti basis` or
  `Antiturunan yang dipakai adalah ...`.
- Name the exact learning job of an example, model, table, or diagram. State
  what the learner can compare, trace, calculate, or infer. Do not claim that a
  representation merely makes an idea `lebih nyata`, `more concrete`,
  `anschaulicher`, or otherwise easier to feel without naming the relationship
  it demonstrates.
- Do not call a method, order, notation, or model `lebih aman`, `lebih rapi`,
  `easier`, `safer`, `übersichtlicher`, or `sicherer` without naming the exact
  error it prevents or the exact operation it changes. Replace `mulai dari
  nomor atom membuat langkah lebih aman` with the concrete consequence, such
  as `mulai dari nomor atom agar jumlah elektron atom netral tidak salah`.
- Avoid elevated labels such as `serampangan` when the student needs a concrete
  warning. Name the mistake or omitted check directly, for example `periksa
  fungsi yang tersedia sebelum menulis ulang rumus agar langkah yang sudah
  diuji tidak terlewat`.
- In Indonesian learner instructions, replace generic commands such as
  `tafsirkan`, `interpretasikan`, and labels such as `Interpretasi Hasil` with
  the concrete action the student must take. Say `jelaskan arti solusi pada
  masalah awal`, `baca tanda diskriminan`, or `hubungkan resultan dengan gerak`.
  Keep an established technical term such as Python `interpreter` when that is
  the concept being taught.
- Do not call a method the `fastest`, `quickest`, `cara tercepat`, or
  `schnellste` method without a stated comparison and a relevant measure such
  as elapsed time or operation count. If speed is not the teaching point, name
  the mathematical operation directly.
- Avoid stock labels and transitions such as `kuncinya`, `the key word is`,
  `Das Schlüsselwort lautet`, `pintu masuk`, `opens the door`, and abstract
  claims that one topic is the `foundation` of another. State the rule first,
  then name the next calculation or concept directly.
- Do not invent a physical or decorative metaphor to correct notation, a rule,
  or a condition. Sentences such as `Syarat bukan hiasan setelah rumus`,
  `capitalization is not decoration`, or their German equivalents force the
  learner to decode the metaphor first. State the positive rule and its effect
  directly.
- Do not say that a mathematical value `captures` or `menangkap` a change, or
  that it `bildet einen Übergang ab`, when the sentence can name the actual
  comparison. State which variable changes and show the corresponding values
  in the table or formula.
- Do not use the rhetorical forms `X, bukan Y`, `X, not Y`, or `X, nicht Y`,
  including `not only`, `not just`, `bukan hanya`, `tidak hanya`,
  `bukan sekadar`, and `nicht nur`, in authored explanations. Rewrite the
  complete thought as direct positive teaching. Do not evade this rule by
  swapping in `rather than`, `instead of`, `dan bukan`, `daripada`, `und nicht`,
  `statt`, or `stattdessen`, or by moving the same clipped negation into a new
  sentence. Those substitutions only move the problem. Preserve negation when
  it is part of the fact, mathematical condition, assessed text, quotation, or
  correction a learner genuinely needs. Ordinary comparisons remain valid,
  such as `5 lebih besar daripada 3`; judge the sentence by its meaning.
- A clean keyword scan is only the start of review. Read every changed
  paragraph as a complete explanation and reject any rewrite that preserves the
  same artificial contrast, unexplained term, or stiff sentence structure under
  different words.
- Use the student-question test on every revised paragraph. A learner should be
  able to answer `apa yang berubah`, `dibandingkan dengan apa`, `kenapa`, and
  `contohnya apa` from the text whenever those questions are relevant. If the
  paragraph cannot answer them, rewrite the teaching sequence instead of
  polishing the same sentences.
- Run the lesson voice gate for lesson-corpus work. It detects a narrow set of
  known wording failures and standard-language errors; it does not identify
  authorship and it does not replace full paragraph review.
- The default gate blocks only objective constraints and wording regressions
  already proven by a corpus example. Broader style patterns are review items,
  not automatic rewrite orders. Use `--strict-review` while auditing authored
  content so every review item is inspected in context, but never change valid
  prose merely to make strict review return zero.
- Treat every new lesson voice rule as a tested editorial invariant. Search all
  three locales for variants, keep the expression narrow, add one failing and
  one valid regression example, then inspect every corpus match in context.
  Never add a global word ban from one sentence or edit prose to improve an AI
  detector score. Read `references/writing-quality.md` for the evidence basis
  and admission criteria.
- Write every heading as one short phrase using ordinary words. A page title or
  lesson heading may contain only letters, numbers, and spaces. Never put
  punctuation, a formula, a code token, an operator, an emoji, a decorative
  number, or any other symbol in a heading. Put exact notation, aliases, and
  questions in the first sentence below it.
  Do not satisfy this rule by deleting a required Indonesian hyphen. Use a
  natural alternative, such as `rerata` instead of `rata rata` and `radius`
  instead of `jari jari`.
- Never use a visible semicolon in learner-facing content. This rule covers
  paragraphs, lists, tables, metadata descriptions, and learner-facing
  component titles, descriptions, captions, and labels in every locale. Use a
  comma only when both clauses still form one clear sentence. Otherwise, use a
  period and name the subject again when a pronoun could be ambiguous. Preserve
  semicolons required by source syntax, code examples, HTML entities, and
  LaTeX spacing commands such as `\;`. A semicolon used as a visible separator
  inside rendered mathematics is still forbidden. An encoded semicolon entity
  is also forbidden when it renders as learner-facing punctuation. The
  deterministic check must parse MDX structure so source syntax and spacing
  commands never become false positives.
- Nakafa renders an external Markdown link as a compact source chip. Put the
  explanation, claim, lesson term, and page topic in ordinary sentence text.
  Use only the source, institution, journal, report, or publication name as the
  external link label, for example `[EIA]`, `[Nature Microbiology]`, or
  `[OpenStax Biology 2e]`. Never use `tautan ini`, `this source link`, a teaching
  term, a complete claim, or a navigation sentence as the label. Generic labels
  such as `[Dokumentasi resmi NumPy]` and `[GBIF documentation]` also fail.
  Keep `resmi` or `documentation` in the prose and label the chips `[NumPy]` or
  `[GBIF]`. Internal links beginning with `/` render as ordinary underlined
  links and may use a clear descriptive destination label.
- Judge every link in its sentence and verify the destination. Do not shorten a
  legitimate official publication name only to satisfy a character limit, and
  do not derive a mandatory label from the hostname. The checker blocks only
  narrow failure patterns proven in the corpus. A clean result does not replace
  a contextual audit of every external link.
- Do not translate assessed passages, assessed response options, quotations, code,
  mathematical notation, or immutable official source bytes.
- Lessons must work from a direct visit. Define required terms, abbreviations,
  symbols, and prerequisites on first use.
- Every section must teach a real idea. Avoid thin headings, copied lesson
  skeletons, generic summaries, and decorative visuals.
- Match assessment difficulty to the source-owned blueprint and current
  official framework. For newly authored try-out sets, benchmark the reasoning
  burden against official examples and any authorized reference corpus. Build
  difficulty from linked decisions, constraints, interpretation, and plausible
  distractors. Larger numbers do not make a routine one-formula exercise more
  difficult. Preserve a deliberate cognitive-level distribution, while ensuring
  an item classified as reasoning cannot be solved by direct substitution alone.
- Audit every new question, answer, and distractor before publication. Solve the
  item independently, verify that exactly the intended responses are correct,
  compare sibling sets for substantive uniqueness, and flag any template whose
  only variation is changed numbers or names.
- Give every lesson and article a deliberate presentation plan. Use prose,
  lists, tables, quotations, diagrams, math, or a renderer-owned component
  according to the learning job each representation does. Break up a wall of
  text when another representation makes a comparison, sequence, hierarchy,
  relationship, or worked model materially easier to understand.
- Humanization is not permission to flatten a rich lesson into prose. Compare
  the representation inventory before and after revision. Preserve every list,
  table, quotation, diagram, math block, and custom component that still does a
  teaching job. Remove or replace one only after the same instructional work is
  carried elsewhere in every locale sibling.
- Do not satisfy a component quota. A decorative table, quotation, diagram, or
  interaction adds cognitive load without adding instruction. Every visual
  must be explained in nearby prose and must remain understandable through its
  accessible text.
- Keep all locale siblings equivalent in facts, instructional sequence,
  examples, visual evidence, and learner support. Use
  natural language for each locale instead of forcing sentence-level symmetry.
- Render every learner-facing mathematical expression through Aksara's math
  components, including expressions inside component titles, descriptions, and
  other props that accept React nodes. Do not leave variables, formulas,
  coordinates, quantities, units, or axis symbols as plain text merely because
  they appear inside a prop.
- Treat named matrix factorizations and algorithms as mathematical notation in
  learner prose. Render labels such as `QR`, `LU`, `SVD`, `PLU`, and `PCA` with upright
  letters, for example `<InlineMath math="\mathrm{QR}" />`. A page title or
  heading remains plain text because headings cannot contain JSX or symbols;
  introduce the rendered notation in the first sentence below it. Do not
  rewrite code, URLs, immutable quotations, or schema-owned strings that cannot
  render React content. For a component prop, verify that it accepts a React
  node before replacing a string.
- Treat graph and 3D labels as semantic React content by default. Plain prose is
  already valid content; compose prose and `<InlineMath />` in one fragment when
  a label includes notation. Never flatten mathematical meaning into a string or
  invent a separate plain-versus-rich authoring mode.
- Preserve geometric primitives exactly. In `MathVisual`, author exact straight
  geometry as `segment`, `polyline`, or `polygon` objects and reserve `spline`
  objects for intentionally smooth curves. Author a balok as one declarative
  `cuboid` with a center and positive `length`, `width`, and `height`, rather
  than repeating corner coordinates. Verify the required vertex and edge
  counts in the rendered scene.
- Treat every question response label as one rich Markdown string. Plain text is
  already valid Markdown; combine prose, emphasis, inline math such as `$x=4$`,
  and display math such as `$$x=4$$` in the same source string when the learning
  content needs them. Never introduce text-versus-math unions, fragment arrays,
  renderer-specific AST nodes, or a second response-label renderer.
- Treat a lesson and a worked answer explanation as different teaching forms.
  A lesson develops a concept across a sequence. An answer must completely
  resolve one attempted problem for a learner who may not know which step
  failed.
- Do not optimize answer explanations for fewer lines. Preserve every
  meaningful subgoal, condition, substitution, case, transformation, unit, and
  check needed to reproduce the reasoning. Group connected calculations when
  that improves readability, but do not delete instructional steps.
- Do not use U+2014 in authored content, metadata, documentation, or code.
- Do not add compatibility routes, fallback content, manual MDX import maps,
  duplicate preview renderers, JSON renderers, or a second corpus.
- Compile through Aksara and preview through Nakafa's real renderer before
  considering the authored revision complete.

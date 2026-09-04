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
| Locale wording and cross-locale review | `references/locale-sources.md` |
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
- Keep learner address close and consistent. In German authored learner prose,
  address the learner with `du` and use informal imperatives. Never switch to
  formal `Sie`, `Ihnen`, or possessive `Ihr` address. Do not mistake a
  sentence-initial or post-colon `Sie` that refers to a previously named
  feminine or plural subject for learner address.
- In Indonesian authored learner prose, the singular teacher and learner pair
  is `aku` and `kamu`. Never address the learner as `Anda` or refer to the
  teacher voice as `saya`. Use `kita` only when teacher and learner genuinely
  perform or inspect the same step together. Do not replace every clear subject
  with a pronoun merely to make the lesson sound conversational.
- Give the lesson a teacher-led narrative. Start from a fact, situation,
  representation, or prerequisite the learner can identify. Move through the
  question or problem, explain the new idea, work through an example, and let
  the learner compare or check the result before the next idea. Use only the
  stages that the topic needs. This is a reasoning flow, not a fixed lesson
  template.
- Use a five-year-old clarity test without turning the lesson into baby talk.
  Name the object, action, input, and result so the learner never has to guess
  what a pronoun, passive verb, or shortened phrase refers to. Keep every
  necessary technical term, then explain it immediately with familiar words
  and a concrete example.
- Teacher-led storytelling never means invented anecdotes, artificial suspense,
  personified concepts, decorative metaphors, rhetorical questions, or chatty
  filler. The lesson feels spoken because each sentence responds to the idea
  before it and prepares the next one. Every transition must carry subject
  meaning.
- Never invent a classroom, school, course, or other physical learning setting
  around the learner. State the exact assumption or limitation of a model,
  such as rounded values or ignored air resistance. Do not write `model
  pembelajaran`, `classroom model`, `Unterrichtsmodell`, `in this course`, or a
  similar setting label merely to mark an example as simplified. A real school
  dataset, historical classroom anecdote, statistical class interval,
  taxonomic class, and programming `class` remain valid when that meaning is
  actually part of the subject.
- Do not label an exercise, example, case, model, or scenario as `fiktif`,
  `fictional`, `hypothetical`, or `fiktiv` merely to announce that the author
  constructed it. Start with the quantities and question instead. When the
  distinction protects factual accuracy, state the exact limitation once, for
  example that a simplified formula is not an epidemiological forecast, then
  continue with the calculation without repeating the label.
- Do not invoke a curriculum, syllabus, textbook tradition, or school level to
  justify terminology in learner prose. Explain the concept and its alternative
  names directly. Mention a curriculum only when the curriculum itself is the
  subject being analyzed or cited as evidence for a curriculum-specific claim.
- State what a concept measures, returns, requires, or changes. Do not write
  that a limit, law, property, function, or scientific field `asks` a question.
  Keep an actual learner question when it advances the explanation, and answer
  it in the surrounding paragraph.
- Before an example, name the operation and the object being worked on. Replace
  `untuk lebih memahami konsep ini, lihat beberapa contoh` with a concrete cue
  such as `dua contoh berikut mengalikan setiap entri dengan skalar yang sama`.
  Delete unsupported labels such as `pertanyaan menarik` or `contoh paling
  umum` when no evidence or comparison supports them.
- Prefer the shortest familiar word that keeps the subject meaning exact. Keep
  a necessary subject term, define it in one plain sentence on first use, and
  never replace an everyday word with a formal synonym merely to sound
  academic.
- Define a necessary technical label through its concrete action before using
  the label as shorthand. For example, first explain that researchers modify a
  virus so it can carry selected genetic material into target cells, then name
  that modified virus a `viral vector`, `vektor virus`, or `viraler Vektor` in
  the relevant locale. Never assume a familiar everyday meaning of `vector`
  explains its biology meaning.
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
- Do not let a translated technical noun replace the action that students need
  to understand. In Indonesian, a word such as `derau` is incomplete unless the
  lesson first explains the concrete source, such as random error in measured
  data. In a regularization lesson, replace `arahnya disusutkan agar tidak
  memperbesar derau` with the actual filter behavior. State whether the filter
  factor approaches zero or one, which solution component becomes smaller, and
  which measurement error would otherwise cause a large change.
- Translate a subject term only when the translated word is natural in the
  sentence. `Masukan` is valid when a function lesson defines input and output,
  but `mengembalikan masukan x` is a mechanical translation of `return the
  input`. Write the result directly, such as `membawa kita kembali ke nilai
  awal x`. In a simple optimization example, name the concrete condition,
  such as fixed perimeter or total wire length, instead of repeatedly telling
  the learner to `terjemahkan kendala`.
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
- Do not translate `propagation rule` mechanically as `aturan rambatan` in an
  Indonesian measurement lesson. State the operation directly, such as
  calculating the uncertainty of a product from the uncertainty of each
  measured input. Preserve literal uses such as `cepat rambat cahaya`.
- Keep references local and unmistakable. Words such as `ini`, `itu`,
  `tersebut`, `manfaat`, `kelebihan`, `risiko`, `dampak`, `this`, `those`, and
  their German equivalents must have one clear antecedent. After a list of
  claims, repeat the exact noun when a student could reasonably ask which
  benefit, risk, source, or process the sentence means.
- A passive verb must still name the subject and the relevant context. Do not
  write `hasil kali nol ikut dibahas`, `kasus ini dipertimbangkan`, or a locale
  sibling that leaves the learner asking what is being done, by whom, or where.
  State the mathematical or scientific condition directly, such as `aturan
  tetap berlaku ketika P atau Q adalah polinomial nol`. Keep a passive sentence
  when its subject and context are explicit, such as `topik keselamatan dibahas
  pada bagian berikutnya`.
- Do not use `dibahas sebagai` or `dibahas dalam konteks` as a shortcut for the
  actual relationship. Write `virus yang merusak jaringan menyebabkan penyakit`
  or `virus yang mengubah populasi mikroba memengaruhi ekosistem`. The learner
  needs the biological action and result, not a note about how an author groups
  the topic.
- Do not end an Indonesian sentence with a bare category such as `sebagai
  rentang` when the learner still has to guess what varies. Name the measured
  quantity, for example `bobot atom standar dilaporkan dalam bentuk rentang
  nilai`. Keep valid uses such as `rentang suhu` and `rentang 20 sampai 30
  derajat`.
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
- A familiar situation used to introduce an idea remains part of the teacher's
  explanation. Do not end the setup and suddenly order the learner to calculate
  something. Connect the setup to the method, for example `Untuk memperkirakan
  luasnya, kita membagi tanah itu menjadi beberapa persegi panjang`. Keep a
  direct command only in an exercise that clearly asks for a response.
- Do not translate the English mathematical term `family` mechanically as
  `keluarga` in Indonesian prose. Write the exact set being discussed, such as
  `semua antiturunan yang berbeda pada konstantanya`, `beberapa fungsi yang
  memenuhi syarat`, or `semua sudut koterminal`. Literal human families and
  established terms in another locale remain valid in their own context.
- Describe the actual host-cell process in virus lessons. Replace phrases such
  as `genom mengambil alih kerja sel` or `mengarahkan mesin sel` with the named
  actions, such as copying the viral genome, making capsid proteins, and
  assembling virions. Do not turn this regression into a ban on every standard
  scientific use of `cell machinery`.
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
  one valid regression example plus the nearest false-positive boundary, then
  inspect every corpus match in context.
  Never add a global word ban from one sentence or edit prose to improve an AI
  detector score. Read `references/writing-quality.md` for the evidence basis
  and admission criteria.
- The informal-address guard checks authored learner voice, including
  learner-facing metadata descriptions, direct and expression-based component
  copy, rendered fragments, and Markdown link labels. Link destinations remain
  protected. The quotes that delimit a metadata string are source syntax, not
  quoted speech. The guard must still ignore real single-line or balanced
  multiline quotations, code, math, technical configuration, assessed text,
  and immutable source bytes. An unmatched opening mark never protects the
  remaining document. German `Sie`, `Ihnen`, and possessive `Ihr` are blocked
  only in unambiguous direct-address frames. Standalone copy boundaries and
  explicit learner labels such as `Hinweis:` are checked, while a preceding
  same-paragraph noun can support anaphoric `Sie`, `Ihnen`, or `Ihr`. A broad
  pronoun scan would misclassify ordinary German prose.
- Write Indonesian learner copy with `aku` and `kamu`, never `saya`, `Anda`,
  or `kalian`. Use `kita` only when the teacher and learner genuinely perform
  the action together. Write German learner copy with `du`, never formal
  learner-address `Sie`, `Ihnen`, or possessive `Ihr`. Preserve German forms
  that clearly refer back to a noun, quoted speech, assessed text, and immutable
  source bytes.
- Write every heading as one short phrase using ordinary words. A page title or
  lesson heading may contain only letters and ordinary spaces. Never put a
  digit, punctuation mark, formula, code token, operator, emoji, or any other
  symbol in a heading. Put exact notation, aliases, and questions in the first
  sentence below it. The only exception is a hyphen required by standard word
  formation, such as `rata-rata` or `jari-jari` in Indonesian. Do not replace a
  familiar word with a stiffer synonym merely to satisfy the checker, and never
  delete the required hyphen to produce `rata rata` or `jari jari`.
- Never add a learner-facing citation-only section. Do not use headings such as
  `Source`, `Sources`, `Reference`, `References`, `Sumber`, `Referensi`,
  `Quelle`, or `Quellen`, or localized bibliography variants, for a list whose
  only job is to enumerate evidence. Keep complete provenance in the source,
  readiness, and publisher contracts. An exact eligible source may still be
  linked where it supports a concrete claim or provides official documentation,
  data, a standard, or first-party evidence.
- Removing a citation-only section never authorizes discarding valid
  provenance. Inventory every external URL before the rewrite, then classify
  it. Prefer claim-matched primary, official, or first-party evidence. A primary
  research paper or official institutional history may remain when it is the
  evidence the claim needs. A competitor learning platform, scholarly review,
  or secondary explainer may inform the authoring process and may remain in
  non-published provenance when it is genuinely claim-matched. It never
  qualifies as a learner-visible resource. Do not retain any URL merely because
  it existed.
  Replace weak evidence when the claim needs stronger support, or remove it
  with the reviewed reason recorded in the change. Remove an incorrect or dead
  URL only after verifying the mismatch and recording its replacement or the
  reason no citation remains.
- A substantive concept heading that contains one of these words remains valid,
  such as `Energy Sources`, when the section teaches that concept rather than
  listing citations.
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
- Keep Nakafa lessons self-contained. Prefer Nakafa-owned prose, visuals, data,
  diagrams, and interactive components. Competitor learning platforms,
  standalone link dumps, bibliography entries, optional further reading, and
  links that outsource an explanation Nakafa should teach must fail. An evidence
  link may support a claim, but it never supplies the lesson's explanation,
  visual, example, or interaction.
- Authoring inputs and learner-visible resources are different contracts. A
  writer may consult relevant external explanations, including competitors,
  while researching. Never expose those URLs as links, embeds, images, or
  learner navigation. Verify their factual claims against stronger evidence
  when primary, official, or first-party evidence exists.
- A learner-visible external link is allowed for exact official documentation,
  a standard, primary data or research, or first-party evidence for an
  explicitly attributed claim. Put a descriptive linked source name or phrase
  beside the exact claim it supports. Preserve the natural teaching sentence.
  Never flatten or rewrite a good explanation merely to fit a citation, and
  never send the learner away for an explanation, visual, or exercise Nakafa
  should provide.
- Nakafa renders an eligible external Markdown link with the same ordinary text
  link treatment as an internal link. The only interaction difference is that
  the external destination opens in a new tab. Never turn an external evidence
  link into a source-preview chip, badge, card, embed, or separate visual style.
- Do not maintain a growing allowlist of lesson paths, domains, or exact URLs.
  Source legitimacy is an editorial judgment that requires reading the claim and
  the source in context. Record every learner-visible source in the owning
  material's evidence metadata and review all locale siblings together. The
  deterministic link checker enforces only objective structure: learner-visible
  external links use HTTPS Markdown, while external images, embeds, arbitrary
  JSX destinations, and dynamic URL escape hatches fail. It must not pretend to
  decide whether a source is official from its hostname. Internal links
  beginning with `/` remain ordinary Nakafa navigation and may use a clear
  descriptive label.
- Start every blockquote with its actual teaching message. Never prefix it with
  an editorial label such as `Quick check:`, `Cek cepat:`, `Kurzer Check:`,
  `Kurze Kontrolle:`, or `Kurz geprüft:`. Remove the label and keep the useful
  sentence, instruction, warning, or distinction that follows it.
- Keep checker scripts grouped by one concern per directory. Every TypeScript
  filename under `scripts/` must have one lowercase word, with `.test.ts` as
  the only test suffix. Do not repeat the directory concern in the filename.
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
- When an external explainer or interactive resource is removed, inspect the
  renderer manifest and the lesson's existing representation inventory before
  creating anything. Reuse a Nakafa-owned graph, diagram, lab, or Three.js
  component when it already teaches the relationship. Add a new owned visual
  only for a verified representation gap and give it one specific teaching
  job. Do not force a depth axis or 3D scene onto a planar idea merely to meet a
  visual quota.
- Do not satisfy a component quota. A decorative table, quotation, diagram, or
  interaction adds cognitive load without adding instruction. Every visual
  must be explained in nearby prose and must remain understandable through its
  accessible text.
- Keep all locale siblings equivalent in facts, instructional sequence,
  examples, visual evidence, and learner support. Use
  natural language for each locale instead of forcing sentence-level symmetry.
- Never translate a reviewed sentence word by word from a locale sibling.
  Preserve the meaning and teaching job, then write the sentence again with the
  normal syntax, connective words, technical vocabulary, and register of the
  target language. A phrase that is natural in English can be vague, stiff, or
  misleading in Indonesian or German. Review each localized sentence as an
  original sentence in that language and use
  `references/locale-sources.md` for the source hierarchy.
- Render every learner-facing mathematical expression through Aksara's math
  components, including expressions inside component titles, descriptions, and
  other props that accept React nodes. Do not leave variables, formulas,
  coordinates, quantities, units, or axis symbols as plain text merely because
  they appear inside a prop.
- Write every LaTeX command with its leading backslash inside a `math` prop.
  For example, use `\ldots`, `\cdots`, `\vdots`, or `\ddots`, never the bare
  words `ldots`, `cdots`, `vdots`, or `ddots`. The deterministic checker must
  inspect only rendered `math` props for this rule and leave prose, code, and
  comments alone.
- Treat named matrix factorizations and algorithms as mathematical notation in
  learner prose. Render labels such as `QR`, `LU`, `SVD`, `PLU`, and `PCA` with upright
  letters, for example `<InlineMath math="\mathrm{QR}" />`. A page title or
  heading remains plain text because headings cannot contain JSX or symbols;
  introduce the rendered notation in the first sentence below it. Do not
  rewrite code, code comments, URLs, immutable quotations, or schema-owned
  strings that cannot render React content. For a component prop, verify that
  it accepts a React node before replacing a string.
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

# Voice and scope

- **Priority #1 is genuine understanding in a warm 1-to-1 teacher voice.**
  Never sacrifice clarity, warmth, or natural phrasing to satisfy a brittle
  word ban. Speak to one reader in `id`, `en`, `ms`, and `de` the way a great
  teacher sits next to one student: personal, direct, and exact, giving
  plain-language intuition before symbols and keeping every reasoning step,
  condition, and check intact.
- Nakafa never writes formally, in any locale or on any surface. Lessons,
  worked answers, articles, metadata descriptions, labels, and program, route,
  page, and Quran shell copy all speak to one reader the way a good teacher
  talks to one learner: personal, warm, direct, and exact. The only exception
  is an assessed question: its prompt keeps the exam's source-owned language
  and must not be rewritten into Nakafa's voice. Its worked answer is Nakafa's
  voice again. Articles (`packages/corpus/articles/`) stay copywriter-owned
  evidence-led prose and are excluded from pedagogical lesson rewrites.
- Write like a teacher guiding one learner, not like a formal textbook,
  government letter, marketing page, or internal content note.
- Casual is not cringe. No slang overload, forced jokes, invented anecdotes,
  exclamation runs, or emoji decoration, and never trade a fact, term, number,
  or hedge for a friendlier sound. A sentence is casual when a respected teacher
  would say it out loud to one learner without changing a word.
- An article keeps every argument, source, citation, data point, and measured
  uncertainty, and says them in plain, warm, evidence-led prose. When it speaks
  to the reader, it uses the same informal address as a lesson. It drops stiff
  academic framing such as `dengan demikian dapat disimpulkan bahwa`,
  `oleh yang demikian dapat dirumuskan bahawa`, `es ist festzuhalten, dass`, or
  `it is worth noting that`, and keeps each
  hedge exactly as strong as its evidence. Warm never means loose: a claim keeps
  its citation and a number keeps its unit and uncertainty.
- German author voice uses `du`, the matching verb forms, and informal
  imperatives on every surface. Never use formal `Sie`, `Ihnen`, or `Ihr`
  address, and never mix it with `du`. A capitalized `Sie` can also refer back
  to a feminine or plural noun at the beginning of a sentence or after a colon,
  so classify its grammatical role before editing it.
- Indonesian author voice uses `aku` for a singular teacher or author and
  `kamu` for the learner or reader. Never use `saya`, `Anda`, or `kalian` for
  that pair. Ask with the plain imperative (`Coba hitung ...`, `Isi ...`),
  never with `Silakan`, `Mohon`, or `Dimohon`. Prefer `itu`, `ini`, or the
  named noun over a stiff `tersebut` wherever a teacher would say it that way.
  Inclusive `kita` remains natural when teacher and learner really calculate,
  compare, or inspect something together. If only the learner acts, use `kamu`
  or a clear imperative. If only the explanation acts, name the subject rather
  than inventing a shared `kita`.
- Malaysian Malay author voice addresses the learner as `kamu` and keeps
  inclusive `kita` for steps teacher and learner really share. Never use
  `anda`, `awak`, `kau`, `engkau`, `kalian` or `korang` for the learner, or
  `aku` for the author. Ask with the plain imperative (`Cuba kira ...`,
  `Semak ...`), never with `Sila`, `Mohon` or `hendaklah`. Write standard
  Malaysian Malay, never Indonesian: the Malaysian Malay section of
  [locale sources](locales.md#malaysian-malay) owns the register, the words
  that differ, and the Malay humanizer pass.
- English has no formal pronoun, so its formality lives in register. Write
  plain, warm English addressed to `you`: active verbs, short sentences, and
  contractions such as `it's`, `you'll`, and `don't` wherever a teacher would
  say them. Avoid stiff textbook phrasing such as `one must`, `the reader
  should`, `it should be noted that`, `kindly`, or `shall` outside a quotation.
- Apply a five-year-old clarity test to every explanation. The sentence should
  name the object, action, input, and result clearly enough that a new learner
  does not have to recover missing context. This is a clarity test, not
  permission to use baby talk, remove technical terms, or weaken the facts.
- Build a spoken teaching flow from the learner's current foothold to the new
  idea. A useful sequence can establish a familiar fact or representation,
  identify the problem, explain the concept, work an example, and check the
  result. Keep only the stages the topic needs, and vary the sequence when the
  subject calls for a different route.
- Treat storytelling as continuity of reasoning. Do not invent a classroom
  anecdote, fake dialogue, suspense, emotional reaction, personification, or
  metaphor to make the lesson sound human. Each transition should name the
  mathematical, scientific, or technical connection that leads to the next
  sentence.
- Do not place the current learner in a classroom, school, course, or other
  physical setting that the content cannot know. State the actual
  simplification, such as rounded values or ignored air resistance, instead of
  calling it a `model pembelajaran`, `classroom model`, or `Unterrichtsmodell`.
  Keep real settings when they are the subject of a word problem, data set,
  historical account, statistical class interval, taxonomic rank, or
  programming construct.
- Remove labels such as `latihan fiktif`, `model fiktif`, `fictional exercise`,
  `hypothetical model`, and `fiktive Aufgabe` when they merely classify an
  authored example. Introduce the quantities, assumptions, and question
  directly. If a real-world safety or
  evidence boundary matters, name that boundary once in concrete language
  instead of repeatedly calling the example fictional.
- Keep internal curriculum commentary out of learner prose. A phrase such as
  `used in some curricula` does not explain a mathematical term. State the
  definition and any alternative names directly. Retain a curriculum reference
  only when curriculum design or a curriculum-specific requirement is the
  actual subject of the passage.
- Match the route, subject, education level, and target locale.
- Keep locale siblings aligned by meaning, order, examples, math, and
  representation. Do not align them by word choice or clause shape. Rewrite
  each sentence as if it had been composed in the target language, then check
  it without looking at the source. If a learner needs the source language to
  recover the meaning, the localized sentence is incomplete.
- Replace editorial classifications such as `dibahas sebagai` and `dibahas
  dalam konteks` with the subject relationship itself. For example, say that a
  virus damages tissue, changes microbial populations, or carries genetic
  material to selected cells. Do not make the learner reconstruct the science
  from a note about how the topic is discussed.
- Prefer short paragraphs with clear transitions.
- Prefer concise completeness over brevity. A shorter explanation is worse when
  it forces the learner to invent a missing premise or reasoning step.
- Use concrete examples only when they immediately clarify the concept.

## A conversation, not a textbook

Lessons should read like a good teacher sitting next to one learner: warm,
direct, and precise. Stiff textbook prose and generated-sounding prose both
push the learner away.

- Address the learner directly and keep the learner as the actor when the
  learner does something: `Coba geser titik P ke kanan dan perhatikan jarak ke
  titik O.` rather than `Titik P dapat digeser ke kanan.`
- Answer the question a learner would ask next, in the next sentence. When a
  rule has a condition, say why the condition matters with a case where it
  fails.
- State facts directly. Drop stiff textbook connectors and frames across all
  four locales (`stiff-formal-prose` blocks them on changed lessons):
  - Indonesian: replace `tersebut`, `merupakan`, `yakni`, `adapun`, `dengan
    demikian`, `oleh karena itu`, `sehubungan dengan itu`, `berdasarkan hal
    tersebut`, `perlu diketahui bahwa`, and `dapat disimpulkan bahwa` with
    plain, direct phrasing (`itu`, `adalah`, `yaitu`, `jadi`, or a direct verb).
  - Malaysian Malay: replace `tersebut`, `merupakan`, `yakni`, `adapun`, `oleh
    yang demikian`, `oleh kerana itu`, `sehubungan dengan itu`, `berdasarkan
    perkara tersebut`, `dapat dirumuskan bahawa`, and `perlu diingat bahawa`
    with direct teacher phrasing (`itu`, `ialah`, `jadi`, or a direct verb).
  - English: replace `it should be noted that`, `it is worth noting that`,
    `one must`, `the reader should`, `aforementioned`, `hereby`, and `thus it
    can be concluded that` with direct active sentences addressed to `you`.
  - German: replace `es ist festzuhalten, dass`, `hierbei handelt es sich um`,
    `man beachte, dass`, `im Rahmen dessen`, `diesbezüglich`, and `somit lässt
    sich festhalten` with direct `du` phrasing.
- Never open a complex idea with unexplained jargon or a raw formula dump. Say
  what happens in plain, concrete language first so a beginner understands what
  the symbols measure before seeing the notation.
- Never reference a number, symbol, or example that has not been introduced in
  the preceding text (zero phantom references), and never end a paragraph with
  a colon followed by another plain paragraph (`dangling-colon`).
- Treat these generated-sounding shapes as review signals, judged in context:
  sweeping openers about everyday life or importance; closers that summarize
  what was just said; inflated significance such as `memainkan peran penting`,
  `memainkan peranan penting`,
  `plays a crucial role`, or `spielt eine wichtige Rolle`; lists of three vague
  benefits; repeated `tidak hanya ... tetapi juga` or `not only ... but also`
  contrasts; and stacked hedges. Keep a sentence when it carries a concrete,
  checkable fact in this lesson. This is not a word ban; the test is whether a
  teacher would say it to a learner.
- Keep technical terms. Define each at first use in plain words, then use it
  consistently.

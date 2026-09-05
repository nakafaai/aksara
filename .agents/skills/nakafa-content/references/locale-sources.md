# Locale writing sources

Use these sources to review spelling, grammar, register, and common artificial
writing patterns. They do not authorize word-for-word translation and they do
not replace the full lesson context.

## Source hierarchy

1. Preserve the verified subject meaning, evidence, math, code, and teaching
   sequence.
2. Follow the official orthography of the target language.
3. Use the target language's normal sentence structure and familiar technical
   vocabulary.
4. Treat humanizer and AI-writing pattern lists as review prompts, not proof
   that a sentence is wrong or machine-written.
5. Read the finished locale by itself. The sentence must make sense without a
   sibling translation.

## Indonesian

- [EYD V](https://ejaan.kemendikdasmen.go.id/) is the official source for
  Indonesian spelling, word formation, pronouns, and punctuation.
- The Bahasa Indonesia skill also routes three narrow studies that show why
  register and context must be checked instead of inferred from one word. They
  cover [pragmatic particles in Indonesian regional languages](https://ojs.badanbahasa.kemendikdasmen.go.id/jurnal/index.php/jurnal_ranah/article/view/1411),
  [dialect accommodation and social identity](https://doi.org/10.32734/ijlsm.v4i2.24493),
  and [imperative politeness in Surabaya Javanese](https://journal.ugm.ac.id/jurnal-humaniora/article/view/829).
  These studies are not general standards for Indonesian lesson prose.
- Apply the complete global `bahasa-indonesia` skill, including `core.md` and
  `naturalness.md`. Use correct everyday Indonesian. Do not force an unfamiliar
  translation when the established English programming term is clearer.

## English

- [Digital.gov plain language guidance](https://digital.gov/guides/plain-language)
  explains audience-first public writing and testing for understanding.
- [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
  is the source used by the global Humanizer skill. It is descriptive, not a
  language standard. Use its patterns to find passages for contextual review.
- Apply the complete global Humanizer skill. Prefer direct verbs, named actors,
  explicit referents, and ordinary technical English.

## German

- The [official German spelling rules](https://www.rechtschreibrat.com/regeln-und-woerterverzeichnis/)
  are maintained by the Rat für deutsche Rechtschreibung.
- [Anzeichen für KI-generierte Inhalte](https://de.wikipedia.org/wiki/Wikipedia:Anzeichen_f%C3%BCr_KI-generierte_Inhalte)
  supplies pattern candidates used by `humanizer-de`.
- The [upstream humanizer-de project](https://github.com/marmbiz/humanizer-de)
  documents its evidence, pattern categories, register profiles, and
  false-positive boundaries.
- Read the canonical global `humanizer-de/SKILL.md` completely and follow its
  routed references. The nested `skills/humanizer-de/SKILL.md` is a plugin
  router to that same workflow, not a second review. Keep the selected register
  consistent and judge every linter candidate in the full lesson context.

## Cross-locale acceptance check

- Facts, definitions, examples, equations, lists, tables, diagrams, exercises,
  and learner support appear in the same teaching order.
- Each locale uses its own natural wording. Matching sentence length, clause
  order, pronouns, metaphors, or idioms is not required.
- Technical terms follow the convention learners will encounter in that
  language and subject.
- No locale contains a vague noun, pronoun, suffix, or shortened phrase whose
  meaning can be recovered only from a sibling locale.
- A clean deterministic check is not proof of natural language. Complete the
  independent read-aloud review for every locale.

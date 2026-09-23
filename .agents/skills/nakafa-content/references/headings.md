# Headings

- Lesson and article bodies use only `##` and `###`, including lesson exercises
  and their worked solutions. `heading-order` rejects a different opening level,
  skipped levels, and every heading deeper than `###`. In lesson exercises,
  it also rejects further headings after the H3 solution boundary until the
  next H2 teaching section.
- Preserve the teaching hierarchy: a lesson exercise section stays at `##`, and
  its worked solutions stay at `###` beneath it. Never promote the solutions to
  `##` merely to remove deeper headings. Inside the solutions, connect subgoals
  through complete prose, with selective emphasis, derivations, tables, or
  diagrams when they help. Remove deeper headings by rewriting their transitions
  in context, never by flattening the outline or replacing them with bold titles.
  Numbered question identifiers such as `**Soal 1**.` belong at the start of
  the answer prose so the learner can match questions and answers. Follow the
  [worked-solution mapping](worked-solutions.md#mapping-exercises-to-answers).
- A standalone question-bank answer renders beneath an app-owned `###` heading.
  Its sections start at `####` and may use `#####` for real nested analysis.
  This exception belongs only to question-bank answers, never lesson solutions.
- Leave one blank line after headings.
- Page titles and body headings use one short phrase containing letters and
  ordinary spaces. Put formulas, code tokens, aliases, digits, operators,
  punctuation, emojis, and full questions in the first sentence below instead.
  A hyphen required by standard word formation remains valid, such as `rata-rata`
  or `jari-jari`. Never delete that hyphen, choose a stiffer synonym, or strip
  punctuation from a sentence to leave an ungrammatical word pile. This rule
  does not govern React-node component titles or descriptions, which render
  mathematical identifiers according to the math rules below.
- A heading must teach a concept. Citation-only sections such as `Source`,
  `References`, `Sumber`, `Referensi`, `Quelle`, `Quellen`, and localized
  bibliography variants are forbidden. A substantive `Energy Sources` section
  remains valid. Preserve its evidence according to the link policy below.

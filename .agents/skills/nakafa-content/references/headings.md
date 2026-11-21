# Headings

- Lesson and article bodies use only `##` and `###`, including lesson exercises
  and their worked solutions. `heading-order` rejects a different opening level,
  skipped levels, and every heading deeper than `###`. In lesson exercises,
  it also rejects further headings after the H3 solution boundary until the
  next H2 teaching section.
- Never open a lone H3 under any H2 (`lone-subsection`), including worked
  solutions. Practice and worked answers integrate into the teaching sections
  they test or use 2 to 4 topic-specific H3 subsections under an H2 (never a
  lone `### Pembahasan`, `### Kunci Jawaban`, `### Solutions`, `### Worked
  Solutions`, `### Penyelesaian`, `### Jalan Kerja`, or `### Lösungen`).
  Inside worked answers, connect subgoals through complete prose, with
  selective emphasis, derivations, tables, or diagrams when they help.
  Numbered question identifiers such as `**Soal 1**.` belong at the start of
  the answer prose so the learner can match questions and answers. Follow the
  [worked-solution mapping](solutions.md#mapping-exercises-to-answers).
- A standalone question-bank answer renders beneath an app-owned `###` heading.
  Its sections start at `#` and may use `##` for real nested analysis, because the explanation is a document of its own.
  This exception belongs only to question-bank answers, never lesson solutions.
- Leave one blank line after headings.
- Page titles and body headings use one short phrase containing letters and
  ordinary spaces. Put formulas, code tokens, aliases, digits, operators,
  punctuation, emojis, and full questions in the first sentence below instead.
  A hyphen required by standard word formation remains valid: the Indonesian
  reduplication in `rata-rata` or `jari-jari`, and the German or English
  compound that joins one letter to a word, such as `y-Achse` or `x-axis`.
  Never delete that hyphen, choose a stiffer synonym, or strip punctuation from
  a sentence to leave an ungrammatical word pile. Rephrase any other hyphenated
  compound with letters and spaces. This rule does not govern React-node
  component titles or descriptions, which render mathematical identifiers
  according to the math rules below.
- A heading must teach a concept. Citation-only sections such as `Source`,
  `References`, `Sumber`, `Referensi`, `Quelle`, `Quellen`, and localized
  bibliography variants are forbidden. A substantive `Energy Sources` section
  remains valid. Preserve its evidence according to the link policy below.
- A heading names the specific job of its section in one short phrase: about
  30 characters for an H2 and 24 for an H3, the distinguishing word first, so
  the outline panel does not cut it off (`heading-width`, review).
- Never repeat the page title in a heading; the page already shows it as the
  H1. `heading-title` blocks an exact repeat and asks for a review when a
  heading contains a title of three or more words.
- Every heading is unique within its locale, across all lessons and articles
  (`heading-unique`). Two headings of one page never render the same anchor
  (`heading-anchor` in the voice gate, `AuthoredHeadingAnchorError` in the
  compiler), and a heading never repeats another page's title
  (`heading-names-lesson`): teach how the topic relates to that page and link
  to it. Titles are unique per locale too (`title-unique`). The only exemption
  is an article's standard scientific section names, `Abstrak`, `Pendahuluan`,
  and `Pernyataan Masalah` and their equivalents in each locale (decision D13
  of 20 November 2026); every other article heading stays unique.
- Scaffold labels never stand alone. `Latihan`, `Pembahasan`, `Contoh`,
  `Uji Pemahaman`, `Kunci Jawaban`, `Kesalahan yang Sering Terjadi`, a section
  about the visual, and their English, German, and Malay equivalents name no
  topic (`generic-heading`). Uniqueness is never reached by renaming: a heading
  that needs a new name usually belongs to a section that needs a new job, so
  restructure the page as [structure](structure.md#lesson-shape) describes.
- No source requires headings to be unique across a whole site; search engines
  read a page's title as its identity. Heading uniqueness is a Nakafa rule for
  outlines that never repeat themselves from lesson to lesson.

# Structure

- Never call a rendered visual an image. Nakafa publishes no images: every
  visual is a graph, curve, diagram, scene, or interactive component. Name what
  is rendered, such as `grafik`, `kurva`, `diagram`, `Graph`, `Kurve`, or the
  exact colored object the section plots. Replace `gambar`, `figure`,
  `illustration`, `picture`, `Bild`, and `Abbildung` when they point at a
  rendered visual. This is not a word ban: keep the mathematical `Abbildung`
  for a mapping, keep the Indonesian coin side `Gambar`, and keep the
  imperative `gambar` that asks the learner to draw an arrow or a line.
- Give every heading a specific teaching job.
- Never point at the document's own structure. The heading already tells the
  learner which part is being read, so a sentence about `subbagian`,
  `bagian di bawah ini`, `pembahasan berikut`, `this section`,
  `the next section`, `the sections below`, `subsection`, `in diesem Abschnitt`,
  `die Abschnitte unten`, `in the following order.`,
  `in der folgenden Reihenfolge`, or `im Folgenden` teaches nothing. Name the
  operation or criterion instead. This targets the structural use only:
  `bagian`, `Abschnitt`, and `section` remain valid for a real part of a path,
  an atom, a quoted document, or a legal provision, and the lowercase
  `im folgenden Beispiel` stays valid for a named example.
  The gate matches the nominalized `Im Folgenden` and `im Folgenden` in either
  capitalization and leaves only the lowercase adjective of
  `im folgenden Beispiel` alone. The two German frames differ by what they point
  at: `in der folgenden Reihenfolge` names the order of the path ahead, so it
  always blocks, while `in dieser Reihenfolge` blocks only when the same
  sentence names a procedure, through `vor`, `gehen`, `gehst`, `Schritt`, or
  `Schritte`, because an operand order such as
  `A und B können in dieser Reihenfolge nur multipliziert werden` states a real
  condition. The English and Indonesian frames need the sentence to end there,
  so `in the following order.` and `dengan urutan berikut.` block while a
  mid-sentence `in the following order` stays outside the pattern.
- Write every heading in plain language that a student understands before
  reading the section. Never put a technical term, abbreviation, algorithm
  name, or notation in a heading the lesson has not yet defined, and never use
  a bare category label such as `Properties`, `Applications`, `Eigenschaften`,
  `Sifat`, or `Penerapan` without naming the exact property or application.
- Leave no ambiguous sentence. Name the object instead of relying on `it`,
  `this`, `these`, `dieser`, `sie`, `ini`, `itu`, or a `-nya` when more than one
  noun could fit. State what changes, compared with what, under which
  condition, and with which result. The highest-risk shape is a demonstrative,
  possessive, `-nya`, or English `it/that/they` that follows a multi-item list,
  a table, or two candidate nouns. The deterministic gate blocks a heading whose
  demonstrative (`ini`, `itu`, `tersebut`, `this`, `that`, `diese`) has no stated
  referent. A heading that carries the `-nya` clitic stays a manual review item:
  the lesson and article audit found 47 Indonesian headings containing a word
  ending in `-nya`, and almost every one bound to a noun the heading already
  named. That evidence does not establish the meaning of a question or answer.
  Body prose stays a mandatory manual review item, because no rule can separate
  a bare pronoun from a possessive determiner without reading the whole
  sentence. The review tier reports three narrow body shapes, so a
  `--strict-review` run names them: `vague-demonstrative-conclusion`,
  `indonesian-unnamed-follow-up-reference`, and
  `indonesian-ambiguous-calculation-reference`.
- Follow [headings](headings.md) for titles, notation, required
  hyphens, and citation-only sections. Apply the [link policy](links.md)
  before removing or relocating evidence; a cleaner outline cannot justify
  discarding valid provenance.
- If a section has nested subsections, introduce their shared purpose with a
  substantive bridge paragraph first.
- Give every heading a body that teaches. A section needs a complete
  explanation of what the learner should notice, or one representation that
  carries the teaching. A heading with no body, a heading whose body is only a
  component, and a heading whose body is only a short list are blocking
  defects. So is a heading whose whole body stays under twenty-five prose words
  with no table, blockquote, code block, or component. Words
  inside list items count as prose, so a worked-solution list can stand alone
  while a bare bullet list cannot. A heading that opens nested subsections keeps
  the bridge paragraph the previous bullet requires.
- Avoid reusable headings such as `Overview`, `Key Takeaway`, or `Step One` when
  the actual concept can name the section.
- Do not copy the same section sequence across different nearby lesson routes.
  This rule does not apply to locale siblings. Every localized version of one
  lesson must preserve the same ordered teaching sequence and components.
- If the text asks students to solve something, include the answer, explanation,
  or an immediate self-check.
- Use hyphen bullets and avoid deeply nested lists.
- Keep table cells compact and move extended explanation into prose.

## Review each teaching section

The twenty-five-word check catches a tiny body, not a complete explanation.
Passing it does not establish depth. Read each heading and its full body with
its locale siblings. Check the prerequisite, the reasoning, a concrete example
where the concept needs one, and the conclusion the learner can verify.

Run the `--pedagogy-review` inventory described in [verification](verification.md).
It reports unmarked bodies, prose without a supporting block, list-only bodies,
nested lists, and paragraphs of at least one hundred words. These are review
signals, not defects or quotas. The inventory includes every section, including
ones with no signal, because a diagram or a long paragraph may still teach
nothing. Component names identify candidates for a visual review; their presence
does not prove useful geometry, interaction, or explanation.

For each candidate, enrich the explanation, reorganize related reasoning, or
retain it with a specific teaching reason. Prefer a table for a comparison, a
worked derivation for a calculation, a diagram for a relationship, and an
interactive model when changing a parameter or viewpoint answers a learner's
question. Do not force an h3 or 3D scene into a short complete explanation.
A list with developed reasoning can remain a list. A bare list of claims needs
explanation, not a generic introduction that repeats the heading.

A whole-corpus audit must account for every requested document and locale.
A machine scan, a representative sample, or zero findings is not a manual
read-through. Keep audit evidence outside publication contracts and record actual
coverage, source hashes, decisions, mathematical checks, and rendered checks.

## Lesson shape

The [lesson standard](lesson.md) lists every element a complete lesson
contains. Its structural parts are enforced here:

- The opening section answers the lesson's main question before it builds
  context.
- The outline is the lesson's map, shown beside the page in a panel 256 pixels
  wide. About ten entries show without scrolling on a 1366 by 768 laptop
  (measured on nakafa.com, 20 November 2026), so a learner reads the whole map
  at once. Give the page 4 to 8 H2 sections and at most 12 outline entries, H2
  and H3 together; most pages need 6 to 10. `outline-budget` blocks a 13th
  entry and asks for a review above 10, and `section-count` blocks a 9th H2 and
  asks for a review below 4. When the outline does not fit, first merge
  subsections that share one teaching job, then write a procedure as an
  ordered list or a table, and split the page only when it answers two main
  questions. `flat-outline` still blocks fewer than three H2 sections and
  `heading-order` keeps every heading at H2 or H3.
- Give an H2 no subsections or 2 to 4. `lone-subsection` blocks ANY H2 with
  exactly one H3, with **no exemption for solution headings** (`### Kunci
  Jawaban`, `### Pembahasan`, `### Solutions`, `### Worked Solutions`,
  `### Penyelesaian`, `### Jalan Kerja`, `### Lösungen` are all blocked). One
  subsection splits one teaching job across two headings: merge it into its
  section, give the section two real subtopics, or integrate practice and
  worked answers directly into the section they test. `section-fanout` asks for
  a review at four and blocks a fifth.
- Do not leave a lesson flat. With 4 or more H2 sections (`FLAT_SECTIONS = 4`),
  group the sections that develop one idea under a shared H2 with 2 to 4
  teaching subsections (`flat-sections`). Depth follows the topic structure;
  never add an H3 merely to satisfy the rule, and never stuff unrelated
  subtopics under one H2.
- Anchor every visual and formula into a continuous narrative (Rule 16):
  - Introduce every visual (`visual-missing-intro`) and every displayed formula
    (`formula-without-intro`) with plain-language prose that states the
    question or intuition first.
  - Follow every visual with a concrete takeaway paragraph that tells the
    learner what to notice and connects it back to the concept
    (`visual-missing-takeaway`).
  - Never stack two visuals back-to-back with zero bridging prose
    (`back-to-back-visuals`).
  - Never leave a paragraph ending with a colon followed by another plain
    paragraph (`dangling-colon`).
  - Never use axis-scaling workaround hacks (`unit-scaling-hack`).
- A procedure is not an outline. Steps such as drawing a boundary, choosing a
  side, and shading the overlap become numbered steps or the H3 subsections of
  one method section, never a run of imperative headings, one for every step.
- An interactive visual belongs inside the section whose idea it models. Never
  give a visual its own section such as `Visualisasi Interaktif ...`, and never
  add a section that explains how to read a visual: its description, footer, and
  the prose right before and after it do that.
- The outline comes from the topic's own teaching job and its hardest ideas,
  never from a template. Mistakes, examples, and practice appear only where they
  teach something specific to this topic, in the form that fits it: a
  misconception inside the section it belongs to, a worked contrast beside the
  rule it tests, an interactive check after the idea it checks. They are never
  a fixed tail of `Common Mistakes`, `Practice`, and `Solutions` that every
  lesson carries. `shared-skeleton` blocks a changed page that ends with the
  same scaffold sections as another page of its locale, whatever their words,
  so renaming those headings never passes it.
- Never reach these rules by renaming. A change that only relabels the headings
  of a page that failed them keeps the repeated structure and text, and
  `heading-only-change` flags it for review. Restructure and rewrite instead.
- Keep paragraphs concise and readable on small phones without cutting depth:
  target <= 60 words; paragraphs above 60 words trigger a `wall-of-text` review
  signal and paragraphs above 85 words block (`wall-of-text`) on both lessons
  and try-out worked answers. A dense paragraph usually hides a derivation,
  comparison, or process that a `<BlockMath />`, table, blockquote, diagram, or
  interactive visual would show better.
- Include at least one core blockquote (`> ...`) in every lesson and try-out
  worked answer holding a decisive concept, intuition, or warning, stated
  directly without any prefix label or colon (`missing-blockquote`,
  `blockquote-editorial-label`).
- Do not nest lists in lessons. Turn a nested list into a sequence of short
  paragraphs, a table, or separate steps with their own explanation.
- Wherever a mistake or a practice problem teaches something specific, give it
  real teaching content: the mistake, why it fails, and how to check; the
  problem and its complete answer.

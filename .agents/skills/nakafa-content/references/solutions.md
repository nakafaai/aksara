# Worked answer explanations

An answer explanation is a complete worked example shown after a learner
attempts one problem. It is not a short lesson and not an answer key with extra
words.

## Pedagogical contract

Default to novice-safe guidance. The learner may have selected the wrong answer
and may not know which step failed.

Each explanation must let the learner answer four questions:

1. What information matters?
2. Why does this method apply?
3. How does each meaningful step follow from the previous one?
4. How do we know the final result answers the original question?

Do not optimize for fewer lines. Optimize for a complete reasoning path with
low visual and verbal noise.

## Mandatory four-heading structure for try-out answers

Every try-out worked explanation (`answer.<locale>.mdx`) uses a clean, predictable
four-heading structure with **zero colons (`:`) or punctuation symbols** in any
heading. On `nakafa.com`, the question number sits at `<h2>`, so MDX `#` (H1)
renders directly below it as `<h3>`.

| Locale | 1. Given      | 2. Asked       | 3. Solution      | 4. Answer   | Multi-part prefix |
| ------ | ------------- | -------------- | ---------------- | ----------- | ----------------- |
| `id`   | `# Diketahui` | `# Ditanyakan` | `# Penyelesaian` | `# Jawaban` | `# Bagian a`      |
| `en`   | `# Given`     | `# Asked`      | `# Solution`     | `# Answer`  | `# Part a`        |
| `ms`   | `# Diberi`    | `# Ditanya`    | `# Penyelesaian` | `# Jawapan` | `# Bahagian a`    |
| `de`   | `# Gegeben`   | `# Gesucht`    | `# Lösung`       | `# Antwort` | `# Teil a`        |

- **Single-question try-out items:** Use the four standard `#` headings in exact
  order. Optional `##` sub-headings are permitted **only** inside `# Penyelesaian`
  (`# Solution` / `# Lösung`) when a multi-stage calculation genuinely benefits
  from named sub-steps. Do not add `###` headings in a single-question answer.
- **Multi-part try-out items (`kind: "parts"`):** Open each part with `# Bagian a`
  (`# Part a`, `# Bahagian a`, `# Teil a`) in part order, with **no colon (`:`)
  and no extra title**. Place the four standard headings as `##` inside each part
  (`## Diketahui`, `## Ditanyakan`, `## Penyelesaian`, `## Jawaban`). Optional
  `###` sub-headings are permitted **only** inside `## Penyelesaian` when
  sub-steps are genuinely needed.
- **Required core blockquote (`>= 1`):** Every try-out explanation must contain
  at least one blockquote (`> ...`) stating the key concept, intuition, or
  warning the learner should retain. Go straight to the point with **no prefix
  label and no colon** (never `Ingat bahwa:`, `Catatan:`, `Tips:`, `Key concept:`,
  `Note:`, `Merke:`, `Nota:`).
- **Clean math and mobile readability:** Keep `<InlineMath />` strictly for
  single variables, numbers, short symbols, units, coordinates, or brief
  conditions (`x \neq 0`). Move equations, inequalities, complex fractions,
  multi-term expressions, and every algebraic transformation step into
  `<BlockMath />`. Keep each prose paragraph crisp for phone screens (target
  <= 60 words, hard cap 85 words) without cutting reasoning depth.
- **Natural highlighter emphasis:** Highlight key concepts, deciding conditions,
  and turning points inside `# Diketahui` and `# Penyelesaian` (wrapping
  `<InlineMath />` inside `**...**` or `<Highlight>` is fully supported). Do not
  force unnatural highlights into short one-line `# Ditanyakan` or `# Jawaban`
  sections.

## Required shape

### Given (`Diketahui` / `Given` / `Diberi` / `Gegeben`)

Identify the decisive givens, constraints, and units. Do not paste the entire
question unless that is necessary for the explanation to stand alone.

### Asked (`Ditanyakan` / `Asked` / `Ditanya` / `Gesucht`)

State clearly what quantity, proof, or conclusion the question asks for.

### Solution (`Penyelesaian` / `Solution` / `Penyelesaian` / `Lösung`)

Give plain-language intuition before symbols, name the method or theorem and why
it applies, then show every logically meaningful step so a student can reproduce
the path without inventing a missing transformation.

Always retain:

- method changes and subgoals;
- substitutions and the values being substituted;
- theorem conditions and geometric relationships;
- probability cases, rejected cases, and sample-space assumptions;
- domain restrictions, sign changes, boundary conditions, and units;
- non-obvious arithmetic or algebra;
- the reason a visual fact is valid;
- verification of the result (substituting back, checking units, rejecting
  extraneous roots, or checking probability bounds);
- misconception-based dissection of tempting distractors.

Routine arithmetic may share one connected derivation. Grouping steps does not
mean deleting them.

### Answer (`Jawaban` / `Answer` / `Jawapan` / `Antwort`)

State the final result in the terms and units of the question. Do not reference
an option letter alone.

## Lesson versus answer explanation

| Lesson                                                                    | Answer explanation                                                                       |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Builds a concept across sections, examples, misconceptions, and practice. | Resolves one attempted problem completely.                                               |
| May motivate, compare several methods, and generalize.                    | Uses the most instructionally useful method for this item.                               |
| Can sequence full examples, faded examples, and independent practice.     | Must not fade essential steps because it is the learner's only post-attempt explanation. |
| May revisit prerequisite theory in depth.                                 | Gives only the prerequisite reminder needed to understand this solution.                 |

## Heading hierarchy

In a lesson, the exercise section owns an H2 and its worked solutions stay
at H3 beneath it. Do not add headings inside those solutions or promote them
to a sibling H2 to satisfy the depth limit. Introduce a new problem or subgoal
with a complete sentence that identifies the relevant givens or operation.
Retain the derivations, checks, tables, and diagrams that support the reasoning.
Use emphasis for a decisive phrase inside that prose, not a substitute heading.
Standalone question-bank answers follow the mandatory four-heading contract above
and in [headings](headings.md): `#` for single-question answers (optional `##`
under `# Penyelesaian`), and `# Bagian a` (`# Part a`, `# Bahagian a`, `# Teil a`)
with `##` for the four standard sections and optional `###` under
`## Penyelesaian` for multi-part items.

## Mapping exercises to answers

Read the questions and answers together from the learner's point of view. A
learner must be able to locate the answer to each numbered question without
inferring it from a topic name or counting paragraphs.

- Begin each separate answer with its exact question number, such as
  `**Soal 1**.`, `**Problem 1**.`, or `**Aufgabe 1**.`, followed by a sentence
  identifying the relevant givens or method. These are question identifiers
  inside prose, not extra headings. A numbered answer list is equally valid
  when each complete explanation stays inside its corresponding item.
- Preserve existing clear mappings. Do not impose one visual template on a
  table, a short answer list, and a long derivation. A shared answer table must
  identify question numbers in its row or column labels.
- Distinguish question numbers from calculation steps. Several answers may
  each begin with `**Langkah 1**`, but that label cannot identify which question
  is being solved. Mark the whole identifier and leave punctuation outside.
- When question groups restart at one, include the group in every answer
  identifier, such as `**Soal identifikasi 1**`. A later check of the same
  result must name the original question rather than appear to be a new item.
- Keep subparts and connected problems together while naming their targets.
  Retain every derivation, domain restriction, check, table, and visual. Never
  delete reasoning or move solutions beside the exercise to simplify numbering.

The `exercise-answer-reference` gate catches missing visible references in
explicitly labeled lesson exercises with unique numbered prompts. It recognizes
prose labels, answer lists, and numbered table rows or columns. Restarted groups,
subparts, and whether a calculation actually answers its labeled question remain
part of the complete contextual review.

## Step granularity

Use prose between conceptual moves. Use one connected mathematical display for
one continuous derivation.

Good:

```mdx
Solve the first equation for <InlineMath math="x" />:

<BlockMath math="\begin{aligned}
4x-16 &= 24 \\
4x &= 40 \\
x &= 10
\end{aligned}" />

Substitute <InlineMath math="x=10" /> into the second equation:

<BlockMath math="\begin{aligned}
2(10)+y-16 &= 12 \\
y+4 &= 12 \\
y &= 8
\end{aligned}" />
```

This preserves the complete path while showing that solving and substituting
are different subgoals.

Avoid:

- one display component per arithmetic line;
- unexplained jumps from the original expression to the result;
- generic headings for every small action;
- repeating one conclusion in prose, a display, an emphasized phrase, and
  another final sentence;
- narrating arithmetic with filler such as `next` or `finally` when the
  derivation already shows the transition.

## Visual-first explanations

An explanation teaches with visuals, not with plain text alone (owner
decision of 15 November 2026). A learner who chose a wrong answer usually
misread a relationship, and a figure shows that relationship faster than a
paragraph does.

- Show each step a learner could misread as a figure, a graph, a model, or a
  simulation: a geometric relationship, the reading of a graph, a case split, a
  force or field, a particle model, a process with stages, a comparison of data.
  Plain text alone is the exception.
- A visual carries a reasoning step. The prose says what to look at and how it
  enters the solution, and the next step uses it. Never add a visual as
  decoration, as a picture of the result with no reasoning, or as a repeat of a
  formula already shown.
- Use any figure of the Visual Catalog. Choose a lab or a three-dimensional
  scene when moving, rotating, or choosing a case makes the reasoning visible;
  a `MathVisual` or a chart when a static or parametric drawing is enough,
  and a new custom component when none fits (see [visuals](visuals.md)); `Mermaid` for a process or a dependency. Group
  a formula with the figure it draws in a `ContentStack`.
- Start from the question's figure when the question has one, so the learner
  recognizes it, then add what the solution needs. An explanation may show
  answer state: the answer drawn in the `answer` appearance, a regression line,
  a lab's takeaway or result note.
- Every try-out section declares what its explanations show
  (`explanation` in its track source): `figure` for mathematics and science,
  where every answer holds at least one catalog figure, and `evidence` for
  reading and language, where a compact table or a highlighted quotation also
  serves. `bun run explanations` fails any answer a change adds or edits that
  shows less than its section asks, and counts the untouched answers still to
  lift. The gate runs in the policies part of every pull request.
- A case analysis may use a compact table, and a route, dependency, or
  multi-stage process a diagram. Every representation earns its place by
  making the reasoning easier to reconstruct.

All localized explanations must preserve the same meaningful
subgoals, conditions, evidence, representations, checks, and conclusion. They
may differ in sentence structure so each reads naturally in its own language.

## Difficulty calibration

- A direct calculation may need one reason, one complete derivation, and one
  conclusion.
- A multi-step item needs explicit subgoals and the reasoning that connects
  them.
- A visual item must show its decisive relationships in a figure, state them
  in accessible text, and explain how they enter the solution.
- A combinatorics or probability item must define the sample space, justify
  favorable cases, and account for impossible cases.
- A data or modeling item must interpret the numerical result in context.
- A proof or conceptual item must justify claims, not merely list symbols.

## Human teacher voice

Use calm, direct language. Explain what matters at the moment it matters. A
teacher voice is not simulated dialogue, praise, or excessive use of `we`. It
is a sequence of explanations that anticipates likely confusion.

## Choices, statements, and distractors

A learner who chose a wrong option needs to see why it is wrong.

- For a single-choice item, show why the correct option holds, then name the
  misconception behind each tempting distractor in one sentence each, such as
  a sign error, a swapped ratio, or a condition ignored. Skip an option only
  when it has no plausible reasoning path.
- For multiple-choice and category items, judge every option or statement
  separately with its own reason. A learner must be able to find why each one
  is true or false.
- Never conclude with an option letter alone; state the result in the terms of
  the question (see "Conclude" above).

## Reading, data, and evidence items

- Quote or precisely paraphrase the sentence, paragraph, row, or value that
  decides the answer, and name where it is. The learner must not need to reread
  the passage to follow the reasoning.
- For inference items, show the step from the evidence to the conclusion and
  why the distractors overreach, contradict, or ignore the evidence.

## Assessed-language exams

When the exam language differs from the explanation language, as with German
Studienkolleg exams explained in Indonesian or English, quote each German exam
term at first use and explain it in the explanation language, for example
_Definitionsbereich_ (domain). Mathematics, symbols, and results stay identical
across every locale.

## Evidence basis

These rules follow the practical conclusions of the following sources:

- The U.S. Institute of Education Sciences recommends solved problems that
  expose solution steps and asks learners to explain what each step does and
  why it works: https://ies.ed.gov/ncee/rel/algebra-middle-and-high-school/intro
- The What Works Clearinghouse recommends explaining the process and reasoning
  for each step in worked examples; the [evidence basis](research.md)
  records that source.
- The NSW cognitive-load practice guide recommends fully worked examples for
  new skills, then gradual fading across later practice as expertise grows:
  https://education.nsw.gov.au/content/dam/main-education/about-us/educational-data/cese/2017-cognitive-load-theory-practice-guide.pdf
- Self-explanation training improved grade 9 mathematics problem solving, with
  the largest difference on far-transfer items:
  https://doi.org/10.1016/S0959-4752(01)00027-5
- Subgoal labels helped learners organize solution steps and solve novel
  problems across four experiments:
  https://doi.org/10.1037/0096-3445.127.4.355

The evidence supports complete worked reasoning, meaningful grouping, and
gradual fading across practice. It does not support deleting instructional
steps merely to make an answer shorter.

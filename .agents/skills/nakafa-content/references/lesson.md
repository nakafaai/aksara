# Lesson standard

Every lesson meets this standard in every locale before publication. This file
lists what a complete lesson contains and how an existing lesson is rewritten;
the linked references own the detailed rules. A lesson that passes the gate but
misses an element below is not finished.

## What a complete lesson contains

1. **The answer comes first.** The opening section answers the lesson's main
   question within its first hundred words: what the concept is, the key rule
   or formula with its conditions, and what the interactive visual lets the
   learner see. A learner who arrives from a search result finds the answer
   without scrolling. [Search](search.md) owns the metadata side.
2. **A teacher talks to one learner.** Short sentences, direct address, named
   objects and actions, and the next likely question answered in the next
   sentence. [Voice](voice.md) owns the register for each locale.
3. **Custom scenes model the concept.** Learners skim long text, so 3D
   scenes and animations carry Nakafa's lessons. Every lesson folder in every
   subject holds at least three distinct custom scenes across its sections, and
   aims for five: Visual Catalog figures drawn in three.js or p5, or animated
   labs. `MathVisual`, the charts, Mermaid diagrams, tables, and videos come on
   top and never count toward the three. Every main idea a learner can see
   gets its own interactive visual, usually one in each teaching section, and
   the lesson never has fewer than it had before a revision.
   Changing a parameter, stepping through a process, rotating a structure, or
   running an experiment answers a question the lesson asks. Every plotted
   point is computed from its formula. [Visuals](visuals.md) owns the choice,
   the component families, the computation, and the verification.
4. **At least two worked examples, inside the sections they apply.** Every
   transformation is written in a math block and each example ends with a
   check. In biology, chemistry, and programming lessons a worked example may
   be an analyzed case: data, a reaction, or code traced step by step with the
   result explained. An example sits beside the rule it uses, named for what it
   works out, never in a generic `Contoh` section.
5. **Mistakes where they happen.** A misconception that this topic invites is
   named inside the section it belongs to, as a contrasted pair or a short
   check: the error, why it fails, and how the learner catches it. A lesson
   never carries a fixed `Common Mistakes` section because every lesson does.
6. **Practice that fits the topic.** When the topic needs practice, give two to
   four problems of rising difficulty, or an interactive check, where the
   learner can retrieve what was just taught, each answered with complete
   reasoning under the [worked solutions](solutions.md) rules. The form and
   place come from the topic, never from a template tail.
7. **A clear shape that is this topic's own.** 4 to 8 H2 sections and at most
   12 outline entries, each with a real teaching job, under the
   [structure](structure.md#lesson-shape) rules. No section whose body is only a
   list, no nested lists, and paragraphs of about seventy words at most. No
   outline, paragraph, opening, transition, or example scenario is reused from
   another lesson in any locale.
8. **Emphasis like a student's highlighter.** Each section marks the few terms,
   conditions, and results a learner would copy into notes.
   [Emphasis](emphasis.md) owns the marker rules.
9. **Woven internal links.** The lesson links its prerequisite and its natural
   next concept wherever the corpus teaches them, inside sentences that use the
   relation. [Links](links.md) owns the policy.
10. **Search metadata.** Each locale carries its own `title` and
    `description` written for that language's learners. [Search](search.md)
    owns the rules.

Length follows the concept. Count the words a learner reads (paragraphs,
lists, tables, and headings, without display math, code, and component props):
most pages land between 500 and 1,100 such words, and above 1,400
(`lesson-length`, review) a page usually answers two questions. The length
comes from examples, checks, and representations. Restatement, filler, and
invented context never count toward it.

## Rewriting an existing lesson

1. Read the complete lesson in every locale. List every factual claim,
   formula, example, exercise, component, table, and link.
2. Verify each claim against primary or official evidence
   ([accuracy and evidence](evidence.md)). Recompute every formula, example,
   exercise, and plotted value independently with a computer algebra system
   such as SymPy or with exact arithmetic, and record the result.
3. Inventory every interactive visual the lesson has today, with its teaching
   job. Keep every one, fixing any that is wrong, and add a visual for each
   main idea that has none. Reuse an existing Nakafa component when its
   configuration teaches this lesson's question and differs from its
   neighbors; otherwise specify an instance of a component family under
   [visuals](visuals.md). A rewrite never ends with fewer interactive visuals
   than it started with.
4. Rewrite the Indonesian lesson to this standard through the
   [editorial workflow](editorial.md), then recreate English and
   German from the corrected meaning under [locale sources](locales.md).
5. Run the gate on the lesson directory with `--strict-review` and read the
   `--pedagogy-review` inventory ([verification](verification.md)). Every
   finding reaches zero, and every signal is either fixed or retained with a
   stated teaching reason. Run the
   [points gate](verification.md#points-gate) on the same directory: it fails
   a typed coordinate list, a long decimal coordinate, any file with fewer
   interactive visuals than before, and a changed lesson with fewer than three
   distinct custom scenes.
6. Compile the lesson and preview it through Nakafa's renderer at 390 and 1440
   pixels in light and dark themes. Rotate every 3D scene and play every
   animation.
7. Keep the verification record (claims, sources, recomputations, rendered
   checks) outside the publication source.

## Patterns that fail this standard

- A heading whose body is a short list of claims with no explanation, or only
  another heading.
- A long paragraph describing what a table, diagram, or interactive visual
  would show faster.
- A formula stated without its conditions, its symbols, or a worked use.
- A lesson with fewer than three distinct custom scenes, or a `MathVisual`,
  chart, Mermaid diagram, or table added to reach the count.
- A visual that only draws a static line or shape when the lesson's question is
  about how a parameter, step, or structure changes the result.
- A revision that removes or merges interactive visuals, so the lesson ends
  with fewer than it had.
- A coordinate list typed into the source instead of computed from its
  formula, or a smooth function drawn with visible corners.
- An example that stops at the answer without checking it.
- Exercises without answers, or answers without reasoning.
- The template outline: a thesis section, topic sections, then `Common
  Mistakes`, `Practice`, and `Solutions` at the end, or the same outline with
  its headings renamed.

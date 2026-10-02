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
3. **At least one interactive visual models the concept.** Changing a
   parameter, stepping through a process, rotating a structure, or running an
   experiment answers a question the lesson asks. [Visuals](visuals.md) owns
   the choice, the component families, and the verification.
4. **At least two worked examples.** Every transformation is written in a
   math block and each example ends with a check. In biology, chemistry, and
   programming lessons a worked example may be an analyzed case: data, a
   reaction, or code traced step by step with the result explained.
5. **Common mistakes.** A compact table or a contrasted pair names the typical
   error, why it fails, and how the learner can catch it.
6. **Practice with answers.** Two to four problems of rising difficulty, each
   answered in the same lesson with complete reasoning under the
   [worked solutions](solutions.md) rules.
7. **A clear shape.** Usually five to nine H2 sections, each with a real
   teaching job. No section whose body is only a list, no nested lists, and
   paragraphs of about seventy words at most. [Structure](structure.md) owns the
   section rules.
8. **Emphasis like a student's highlighter.** Each section marks the few terms,
   conditions, and results a learner would copy into notes.
   [Emphasis](emphasis.md) owns the marker rules.
9. **Woven internal links.** The lesson links its prerequisite and its natural
   next concept wherever the corpus teaches them, inside sentences that use the
   relation. [Links](links.md) owns the policy.
10. **Search metadata.** Each locale carries its own `title` and
    `description` written for that language's learners. [Search](search.md)
    owns the rules.

Length follows the concept. A typical Indonesian school lesson lands between
nine hundred and sixteen hundred words, and the length comes from examples,
checks, and representations. Restatement, filler, and invented context never
count toward it.

## Rewriting an existing lesson

1. Read the complete lesson in every locale. List every factual claim,
   formula, example, exercise, component, table, and link.
2. Verify each claim against primary or official evidence
   ([accuracy and evidence](evidence.md)). Recompute every formula, example,
   exercise, and plotted value independently with a computer algebra system
   such as SymPy or with exact arithmetic, and record the result.
3. Decide the interactive visual. Reuse an existing Nakafa component when its
   configuration teaches this lesson's question and differs from its
   neighbors; otherwise specify an instance of a component family under
   [visuals](visuals.md).
4. Rewrite the Indonesian lesson to this standard through the
   [editorial workflow](editorial.md), then recreate English and
   German from the corrected meaning under [locale sources](locales.md).
5. Run the gate on the lesson directory with `--strict-review` and read the
   `--pedagogy-review` inventory ([verification](verification.md)). Every
   finding reaches zero, and every signal is either fixed or retained with a
   stated teaching reason.
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
- A visual that only draws a static line or shape when the lesson's question is
  about how a parameter, step, or structure changes the result.
- An example that stops at the answer without checking it.
- Exercises without answers, or answers without reasoning.

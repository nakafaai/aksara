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

## Required shape

### Orient the learner

Briefly identify the target and the decisive givens. Do not paste the entire
question unless that is necessary for the explanation to stand alone.

### Choose the method

Name the method, theorem, representation, or case structure and explain why it
fits. A routine one-operation item may need only one short sentence. Geometry,
probability, modeling, and multi-stage algebra usually need more context.

### Work the solution

Show every logically meaningful step. A student must be able to reproduce the
path without inventing a missing transformation.

Always retain:

- method changes and subgoals;
- substitutions and the values being substituted;
- theorem conditions and geometric relationships;
- probability cases, rejected cases, and sample-space assumptions;
- domain restrictions, sign changes, boundary conditions, and units;
- non-obvious arithmetic or algebra;
- the reason a visual fact is valid.

Routine arithmetic may share one connected derivation. Grouping steps does not
mean deleting them.

### Check or interpret

Verify the result when a check is informative. Examples include substituting a
solution back, checking that a probability lies between zero and one,
confirming a unit, rejecting an extraneous root, or connecting a numerical
value to the quantity asked for.

### Conclude

State the result in the terms and units of the question. Do not reference an
option letter.

## Lesson versus answer explanation

| Lesson | Answer explanation |
| --- | --- |
| Builds a concept across sections, examples, misconceptions, and practice. | Resolves one attempted problem completely. |
| May motivate, compare several methods, and generalize. | Uses the most instructionally useful method for this item. |
| Can sequence full examples, faded examples, and independent practice. | Must not fade essential steps because it is the learner's only post-attempt explanation. |
| May revisit prerequisite theory in depth. | Gives only the prerequisite reminder needed to understand this solution. |

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
- repeating one conclusion in prose, a display, bold text, and another final
  sentence;
- narrating arithmetic with filler such as `next` or `finally` when the
  derivation already shows the transition.

## Visual structure in worked answers

The answer form follows the problem. Use a diagram, graph, table, number line,
or other renderer-owned component when the learner must inspect that
representation to understand the reasoning. Explain the decisive relationship
in accessible prose and show how it enters the solution.

Do not add a visual merely because the corresponding lesson uses one. A direct
calculation usually needs a clear orientation, one complete derivation, an
interpretation or check, and a conclusion. A case analysis may benefit from a
compact table. A route, dependency, or multi-stage process may benefit from a
diagram. The representation earns its place by making the reasoning easier to
reconstruct.

English, Indonesian, and German explanations must preserve the same meaningful
subgoals, conditions, evidence, representations, checks, and conclusion. They
may differ in sentence structure so each reads naturally in its own language.

## Difficulty calibration

- A direct calculation may need one reason, one complete derivation, and one
  conclusion.
- A multi-step item needs explicit subgoals and the reasoning that connects
  them.
- A visual item must state decisive diagram relationships in accessible text
  and explain how they enter the solution.
- A combinatorics or probability item must define the sample space, justify
  favorable cases, and account for impossible cases.
- A data or modeling item must interpret the numerical result in context.
- A proof or conceptual item must justify claims, not merely list symbols.

## Human teacher voice

Use calm, direct language. Explain what matters at the moment it matters. A
teacher voice is not simulated dialogue, praise, or excessive use of `we`. It
is a sequence of explanations that anticipates likely confusion.

## Evidence basis

These rules follow the practical conclusions of the following sources:

- The U.S. Institute of Education Sciences recommends solved problems that
  expose solution steps and asks learners to explain what each step does and
  why it works: https://ies.ed.gov/ncee/rel/algebra-middle-and-high-school/intro
- The What Works Clearinghouse recommends explaining the process and reasoning
  for each step in worked examples:
  https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/MPS_PG_043012.pdf
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

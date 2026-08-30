# Question bank

## Directory contract

Question directories live below:

```text
packages/corpus/question-bank/tryout/{country}/{exam}/{section}/{set}/{question}/
```

The exact required file set is derived by the contracts and corpus reader. Do
not copy a list of locale suffixes into this skill, and do not add a local
override file or language mapping.

An ordinary section owns one localized prompt, one localized worked answer,
and localized choices for every app locale in its authorized authoring scope.
Every authored locale file must pass the same inventory, ownership, preview,
and editorial checks, whether or not that locale is included in a publication.
The presence of an authored source file alone never changes publication state.

A language-assessment section owns one prompt and one choice set in the
assessed delivery language. It owns one worked answer explanation for every app
locale in its authorized authoring scope. Never duplicate an assessed prompt or
its choices merely because the application locale changes.

## Prompt rules

- Keep the wording unambiguous and preserve assessed source meaning.
- Define abbreviations, symbols, and uncommon terms when the item depends on
  them.
- Do not mention answer-option letters unless the source format itself requires
  them.
- Keep quoted and assessed passages byte-preserved when policy requires it.
- Use math components consistently with lesson MDX.

## Answer rules

- Read `worked-solutions.md` before writing or revising any answer explanation.
- Treat the answer as a novice-safe worked example shown after the learner has
  attempted the problem. It is not a shortened lesson and not an answer key
  with extra words.
- Explain why the method applies, show how each meaningful step follows, and
  connect the result back to what the question asks.
- Preserve every method change, substitution, theorem condition, probability
  case, domain restriction, non-obvious transformation, unit, and useful
  check. Group continuous algebra into one aligned display without deleting
  steps.
- Start explanation sections at `####`.
- Use descriptive headings only for real subgoals, not for every arithmetic
  action.
- Restate the context needed to understand the answer.
- State the final answer by its content, not by an option letter.
- Keep notation consistent with the prompt.
- Do not remove reasoning merely to reduce line count. Remove only duplicated
  conclusions, generic headings, filler transitions, and presentation noise.

## Response items

- Author exactly one `item.ts` beside the question and answer MDX files. Import
  only the `QuestionItem` type from
  `@nakafa/aksara-contracts/question/item`, assign one literal `item` constant,
  and export it as default. The corpus reader deliberately rejects executable
  values, helper imports, spreads, computed keys, duplicate keys, and additional
  statements.
- Put responses under their exact artifact locale. Include every locale derived
  from the stable section language policy and no others.
- Use the stable response kinds `single-choice`, `multiple-choice`, and
  `category`. Array position is the authoring order. Publication derives stable
  option, statement, and category keys once, so authors must not duplicate those
  runtime identities.
- A response label is a non-empty ordered array of semantic fragments. Use
  `{ kind: "text", text: "..." }` for prose and
  `{ kind: "math", display: "inline", math: "..." }` or
  `{ kind: "math", display: "block", math: "..." }` for LaTeX. Never place
  `$...$` or `$$...$$` delimiters inside a text fragment, and never flatten
  mathematics into a label string. Escape LaTeX backslashes in TypeScript math
  strings.
- A `single-choice` response has at least two options and exactly one correct
  option. A `multiple-choice` response has at least two correct options and at
  least one distractor. A `category` response has at least two categories and
  one or more statements whose one-based `correctCategoryOrder` refers to an
  existing category.
- Locale siblings may translate their labels, but they must preserve the same
  response kind, array structure, and answer key. An assessed-language section
  owns one response in that assessed language instead of duplicating it for the
  application locale.
- When an official blueprint applies, record `cognitiveLevel`, `contentDomain`,
  and `topic` on the item. Use one `stimulusKey` for a contiguous grouped
  stimulus and preserve it across every localized placement.

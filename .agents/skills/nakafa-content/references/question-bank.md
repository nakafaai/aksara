# Question bank

## Directory contract

Question directories live below:

```text
packages/corpus/question-bank/tryout/{country}/{exam}/{section}/{set}/{question}/
```

An ordinary section owns prompt, answer, and choice artifacts derived from the
contracts and locale lifecycle. Inspect those owners before authoring. Do not
hardcode a locale list or infer filenames from a neighboring section.

An app locale explicitly authorized for candidate authoring may additionally
own its schema-derived prompt, answer, and choice artifacts. Candidate files
must pass the candidate inventory, ownership, preview, and editorial gates.
Authoring candidate files does not activate or publish that locale. Activation
requires the complete release to be locale-closed.

An assessed-language section owns one prompt and one choice set in its
`deliveryLanguage`. It keeps one answer explanation for every active or
explicitly authorized candidate app locale. Never duplicate assessed prompts or
choices by app locale.

The exact file set is derived by the contracts and corpus reader. Do not add a
local override file or language mapping.

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

## Choices

- Import `QuestionChoices` from
  `@nakafa/aksara-contracts/projection/question`.
- Include exactly the artifact locales derived for the stable section identity.
- Keep exactly one correct choice unless the assessment format explicitly owns
  another rule.
- Use `$$...$$` for math labels and escape LaTeX backslashes in TypeScript
  strings.
- Preserve assessed-language choices across app locales.

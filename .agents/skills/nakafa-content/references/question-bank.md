# Question bank

## Current directory contract

Question directories live below:

```text
packages/corpus/question-bank/tryout/{country}/{exam}/{section}/{set}/{question}/
```

A current ordinary section owns:

```text
question.en.mdx
question.id.mdx
answer.en.mdx
answer.id.mdx
choices.ts
```

German activation adds `question.de.mdx`, `answer.de.mdx`, and German choices for
ordinary sections only after the active locale closes across the entire release.

An English-language section owns one `question.en.mdx` prompt and English
choices. An Indonesian-language section owns one `question.id.mdx` prompt and
Indonesian choices. Both keep one answer explanation for every active app
locale. Never duplicate assessed prompts or choices by app locale.

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

- Explain the reasoning, not only the final result.
- Start explanation sections at `####`.
- Use descriptive concept headings, not numbered steps.
- Restate the context needed to understand the answer.
- State the final answer by its content, not by an option letter.
- Keep notation consistent with the prompt.

## Choices

- Import `QuestionChoices` from
  `@nakafa/aksara-contracts/projection/question`.
- Include exactly the artifact locales derived for the stable section identity.
- Keep exactly one correct choice unless the assessment format explicitly owns
  another rule.
- Use `$$...$$` for math labels and escape LaTeX backslashes in TypeScript
  strings.
- Preserve assessed-language choices across app locales.

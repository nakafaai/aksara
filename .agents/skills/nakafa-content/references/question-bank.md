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
and one localized response item for every app locale in its authorized
authoring scope.
Every authored locale file must pass the same inventory, ownership, preview,
and editorial checks, whether or not that locale is included in a publication.
The presence of an authored source file alone never changes publication state.

A language-assessment section owns one prompt and one response item in the
assessed delivery language. It owns one worked answer explanation for every app
locale in its authorized authoring scope. Never duplicate an assessed prompt or
its response options merely because the application locale changes.

## Prompt rules

- Keep the wording unambiguous and preserve assessed source meaning.
- Define abbreviations, symbols, and uncommon terms when the item depends on
  them.
- Do not mention answer-option letters unless the source format itself requires
  them.
- Keep quoted and assessed passages byte-preserved when policy requires it.
- Use math components consistently with [MDX quality](mdx-quality.md).
- Every question must contain the information needed to answer it. Never depend
  on an unstated intermediate value from a preceding question.
- Every question and locale sibling with the same `stimulusKey` must present
  the exact same stimulus. Question-specific instructions may differ, but may
  not shorten, enrich, or otherwise change the shared evidence.

## Answer rules

Read [worked solutions](worked-solutions.md) before editing any explanation.
It owns the complete novice-safe reasoning contract, including method choice,
subgoals, substitutions, conditions, cases, transformations, units, checks,
and a conclusion stated by content rather than an option letter. Keep notation
consistent with the prompt. Use the [MDX heading rules](mdx-quality.md#headings):
answer sections start at `####` and name real subgoals. Never delete reasoning
to reduce line count.

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
- A response label is one non-empty rich Markdown string rendered by Nakafa's
  canonical `MarkdownContent` surface. Plain prose needs no wrapper. Use
  no-space `$$...$$` for inline math, such as `The result is $$x=4$$.`, and a
  fenced `math` block for display math. Do not author single-dollar math or
  assume a same-line double-dollar span is a display. Escape LaTeX backslashes
  and newlines in TypeScript strings.
- Markdown emphasis, lists, tables, and other supported syntax use that same
  string. Never add a plain-versus-rich mode, text-versus-math union, fragment
  array, renderer-specific AST, or second response-label renderer. MDX
  components belong in the prompt or answer, not in these labels.
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

## Assessment review

- Match the source-owned blueprint and current official framework. Benchmark
  new try-out sets against official examples and any authorized reference
  corpus. Preserve a deliberate cognitive-level distribution.
- Build difficulty from linked decisions, constraints, interpretation, and
  plausible distractors. Use a small number of meaningful dependent steps.
  Application or reasoning must require more than direct formula recall; a
  reasoning item cannot reduce to substitution. Larger numbers, obscure
  wording, oversized arithmetic, or gratuitous data do not establish a harder
  cognitive task.
- A graph, chart, or 3D model must support a real inference. Trace the complete
  path from stimulus to answer; visual polish does not establish reasoning.
- Independently solve every new question, verify each distractor, and confirm
  that exactly the intended responses are correct before publication. Compare
  sibling sets for substantive uniqueness. Flag a template whose only variation
  is changed numbers or names.
- Across each active set, section, locale, and option-count cohort, balance
  correct positions so frequencies differ by at most one. Keep their question
  order unpredictable and preserve distractor meaning across locales. Never
  move only the `isCorrect` marker to manufacture balance.

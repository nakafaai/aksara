# Emphasis

`**phrase**` and `<Highlight>phrase</Highlight>` mark the same thing: the phrase
a learner should hold on to. Both render the shared warning surface at the
medium weight from one `cva` variant map, so the choice between them is about
which syntax reads best at that point in the source, not about a different
result for the learner. `**` produces a `<strong>` element and `<Highlight>` a
`<mark>`.

- Mark the phrase, not the sentence. Emphasis stays inside one sentence and
  never wraps a whole sentence, a heading, or mathematics.
- Keep emphasis sparse. A section that marks everything marks nothing, so mark
  the few phrases a learner would write down.
- Do not nest one marker inside the other.
- Let each locale choose its own phrase instead of translating a sibling's
  marked words. A locale that marks nothing has left that step unmarked for its
  readers, so every authored locale document carries at least one `<Highlight>`
  (`lesson-without-highlight`).
- `<Highlight>` is the explicit marker for the section's single decisive rule,
  condition, or term, so a section carries at most one (`highlight-ceiling`).
  Reach for `**` for every other emphasised phrase.
- Keep every authored `**` pair inside one paragraph. MDX resolves an emphasis
  pair within one paragraph, so a marker whose partner is missing, or whose
  partner sits in another paragraph, renders as literal `**` in front of the
  learner. A pair may still wrap an inline component, such as an
  `<InlineMath />`, when both markers stay in the same paragraph. Inline code
  and fenced code keep `**` as programming syntax and stay outside this rule.
  `unbalanced-emphasis` blocks the defect.

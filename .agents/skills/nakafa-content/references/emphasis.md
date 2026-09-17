# Emphasis

`**phrase**` and `<Highlight>phrase</Highlight>` mark the same thing: the phrase
a learner should hold on to. Both render as `<strong>` from one `cva` variant
map, so the choice between them is about which syntax reads best at that point
in the source, not about a different result for the learner. `variant` selects
the surface: `warning` is the default because a marked phrase still has to be
learned, and `success` marks a phrase whose condition the learner has already
met, such as a satisfied requirement or a completed step. A bare `<Highlight>`
uses the warning surface.

- Mark the phrase, not the sentence. Emphasis stays inside one sentence and
  never wraps a whole sentence, a heading, or mathematics.
- Keep emphasis sparse. A section that marks everything marks nothing, so mark
  the few phrases a learner would write down.
- Do not nest one marker inside the other. Both markers render the same
  surface, so nesting adds nothing for the learner. The gate traverses the
  authored tree and reports it (`highlight-nesting`). A marker that wraps a
  whole sentence, a heading, or mathematics stays with the [final
  review](review.md#final-language-review), because no rule reports that shape.
- Let each locale choose its own phrase instead of translating a sibling's
  marked words. A locale that marks nothing has left that step unmarked for its
  readers, so every authored locale document carries at least one `<Highlight>`
  (`lesson-without-highlight`). The opening section a learner reads first marks
  at least one phrase with either marker (`lesson-opening-highlight`).
- `<Highlight>` is the explicit marker for a heading span's decisive rule,
  condition, or key term, so one heading span carries at most two
  (`highlight-ceiling`): the decisive phrase and one key term. A `##` section
  whose `###` subsections each mark their own phrases therefore carries more in
  total. Reach for `**` for every other emphasised phrase.
- Keep the marked phrase self-contained. It names its own object, condition, or
  quantity, so a learner never has to leave the paragraph to resolve it. A bare
  `berikut` that points at the block below, or an `ini`, `itu`, or `tersebut`
  whose noun never appears nearby, fails this read. An anaphor that resolves in
  the same paragraph, such as `persamaan ini` right after the sentence that
  names the normal equation, stays valid. The gate blocks a full-paragraph
  pointer lead-in (`bare-look-pointer`) only, so this read owns the phrase.
- Keep every authored `**` pair inside one paragraph. MDX resolves an emphasis
  pair within one paragraph, so a marker whose partner is missing, or whose
  partner sits in another paragraph, renders as literal `**` in front of the
  learner. A pair may still wrap an inline component, such as an
  `<InlineMath />`, when both markers stay in the same paragraph. Inline code
  and fenced code keep `**` as programming syntax and stay outside this rule.
  `unbalanced-emphasis` blocks the defect.

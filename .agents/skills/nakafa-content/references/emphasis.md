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
  never wraps a whole sentence, a heading, or mathematics. Name the one term,
  condition, or quantity a learner would write down: a few load-bearing words
  beat a highlighted sentence. A mark that spans a whole sentence is a smell;
  narrow it to the decisive clause, and split a genuine pair such as two
  contrasted invariants into two marks. A tight enumeration whose every word
  carries criterion content may stay whole.
- Keep emphasis sparse. A section that marks everything marks nothing, so mark
  the few phrases a learner would write down.
- Do not nest one marker inside the other. Both markers render the same
  surface, so nesting adds nothing for the learner. The gate traverses the
  authored tree and reports it (`highlight-nesting`). The `sentence-punctuation-emphasis` rule catches a marked phrase of four
  or more words ending in a sentence mark. It preserves assessed prompts,
  quotations, code, and short abbreviations. Whole sentences without that
  punctuation, headings, and mathematics still need the [final
  review](review.md#final-language-review).
- Let each locale choose its own phrase instead of translating a sibling's
  marked words. Every lesson locale carries at least one marked phrase using
  either syntax (`lesson-without-highlight`), and its opening section marks at
  least one phrase (`lesson-opening-highlight`). Worked answers mark decisive
  conditions without copying a sibling's phrase. Article emphasis is optional
  and follows the scientific argument rather than a document-wide quota.
- In lessons and worked answers, mark an important phrase inside every heading body, not only the opening.
  Choose the deciding term, condition, operation, or interpretation in that
  section. A marked title, diagram label, or earlier section does not signal
  the current explanation. A short bridge also names the important relationship it introduces. The
  `section-body-highlight` rule checks each lesson and worked-answer heading body independently, down
  to nested answer sections. Exact quotations, code, and pure notation remain
  untouched. Choose the phrase in context instead of highlighting the first
  sentence mechanically.
- Use the same judgment for both syntaxes. Do not enforce a component-only
  quota or switch to `**` to evade a limit. A comparison table can mark several
  distinct criteria, while a short paragraph may need only one phrase. Check
  whether the marked words alone still identify the concept and its condition.
- Leave the sentence-ending period, comma, colon, or question mark outside the
  marked phrase. Preserve punctuation that belongs to an assessed quotation or
  the term itself. Mark a complete step label, such as `**Langkah 1**`, rather
  than `**Langkah** 1`. The number identifies the step and belongs with its noun.
- In a worked answer, mark the deciding condition, operation, or interpretation.
  Keep the complete substitution and calculation visible in math blocks. Do
  not mark the entire conclusion or every answer option merely to distinguish
  it from the explanation. Quoted assessed wording stays exact.
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

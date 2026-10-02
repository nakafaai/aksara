# Building try-out sets

Aksara is the original and canonical source of every try-out item. Outside
material, such as documents, PDFs, notes, earlier drafts, and item ideas, is
inspiration only. Every published item is written to the Nakafa standard and
verified.

## Original items

- Source material is inspiration, Nakafa's own earlier material included. It
  may set an item's topic, skill, format, and difficulty, while each published
  prompt, passage, option, figure, and explanation is written for Nakafa with
  its own context, numbers, and wording. A third-party passage or data source
  may instead be used under the terms in
  [passages and rights](#passages-and-rights).
- Treat every key and explanation in source material as a claim to verify,
  never as a fact.
- Record the origin of each source and pin the exact version consulted in the
  verification record outside the publication source: a hash of the bytes when
  you hold the file, or the storage service's version identifiers (such as a
  file ID with its size and modification time) when you read it through that
  service. Never invent or hand-compute a hash. Cite the record in the pull
  request. Folder and file names are product evidence only.
  Official names, formats, and blueprints come from official sources
  ([question bank](question-bank.md)).

## Reading source documents

- Text extracted from a PDF or an image can silently corrupt mathematics,
  fractions, exponents, subscripts, and diagram labels, and watermarks or
  running headers can interleave with it. Read the rendered page beside any
  extracted text, and never trust extracted notation without checking it.
- Keep throwaway extraction output outside the repository.

## Writing the Aksara items

- Write each prompt in the section's assessed language, in the register of the
  real exam.
- Each item gets its `item.ts` with the response kind the official format
  requires, and answers in every app locale that follow
  [worked solutions](worked-solutions.md).
- Diagrams, graphs, tables, and charts become Nakafa components or Markdown
  tables whose data the item states exactly. Nakafa publishes no images.
- New sets continue the numbering after the highest existing set of the same
  track. Published set numbers never change.

## Official format first

A try-out is valuable because it behaves like the real exam. Before a new exam,
track, or subject is published, its readiness record cites official evidence
for question counts, time limits, response kinds, scoring, and permitted aids.
When source material deviates from the official format, the set follows the
official format and the record states the deviation and its resolution. For an
institution's own entrance test, the evidence is that institution's published
test description and the rules that govern it.

## Uniqueness and difficulty

- No item may repeat another item in the bank or the source item that inspired
  it, including items that differ only in numbers, names, or option order.
  Compare every new item with the complete bank and its source material before
  authoring it, not only with its own set.
- Each set follows its readiness blueprint for cognitive levels, content
  domains, topics, and response kinds. Difficulty comes from linked decisions,
  constraints, and plausible distractors, never from obscure wording or
  oversized arithmetic ([question bank](question-bank.md#assessment-review)).

## Passages and rights

Every reading passage and data source is original, in the public domain, or
used under terms that permit publication, and it is attributed exactly under
the [link policy](links.md). Replace a passage whose rights are unclear with an
original passage of the same difficulty and skill focus.

## Release gate

A set is published only after every item passes the release gate in
[verification](verification.md#release-gate), and the set passes an end-to-end
attempt whose score matches a hand calculation.

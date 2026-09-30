# Importing try-out sets

Nakafa's own try-out PDFs, produced with the Nakafa Tryout Master template, are
the main source for new sets. They are raw material: every imported item is
re-verified, its explanation is raised to the Nakafa standard, and its visuals
become Nakafa components. Nothing is copied into Aksara unchecked.

## Sources and provenance

- The owner's Google Drive folder `Nakafa` holds the PDFs under `TryOut`:
  `SNBT/Tahun 2027` (sets 1 to 50, seven subtest PDFs each), `TKA/Per Pelajaran`
  (one folder per subject), and one folder per Studienkolleg under
  `Aufnahmeprüfung` and `Festellungsprüfung`. LaTeX sources exist only for a few
  sets; use them when present.
- Record the Drive file ID, the SHA-256 of the exact PDF bytes, and the PDF page
  of each question in the set's verification record outside the publication
  source, and cite the Drive file in the pull request.
- Drive folder and file names are product evidence only. Official names,
  formats, and blueprints come from official sources ([question bank](question-bank.md)).

## Extraction

- The PDFs carry a diagonal watermark that corrupts plain text extraction.
  Extract text with PyMuPDF while dropping rotated lines, and read the rendered
  page image alongside it. Never trust extracted mathematics, fractions,
  exponents, or diagram labels without checking the page image.
- Take the key from the key page and the explanation from the explanation
  pages. Both are starting points to verify, not facts.
- Keep throwaway extraction output outside the repository.

## Writing the Aksara items

- The prompt stays in the section's assessed language. Change it only to fix a
  verified error or ambiguity, and record every such change with its reason.
- Each item gets its `item.ts` with the response kind the source format
  requires, and answers in every app locale that follow
  [worked solutions](worked-solutions.md).
- Diagrams, graphs, tables, and charts become Nakafa components or Markdown
  tables that reproduce the source data exactly. Nakafa publishes no images.
- New sets continue the numbering after the highest existing set of the same
  track. Published set numbers never change.

## Official format first

A try-out is valuable because it behaves like the real exam. Before a new exam,
track, or subject is published, its readiness record cites official evidence
for question counts, time limits, response kinds, scoring, and permitted aids.
When a PDF deviates from the official format, adapt the set to the official
format and record the deviation and its resolution. For German Studienkollegs,
the evidence is each institution's own entrance-test page and the state rules
for the Feststellungsprüfung.

## Uniqueness and difficulty

- No item may repeat another item anywhere in the bank, including items that
  differ only in numbers, names, or option order. Compare every new item with
  the complete bank before authoring it, not only with its own set.
- Each set follows its readiness blueprint for cognitive levels, content
  domains, topics, and response kinds. Difficulty comes from linked decisions,
  constraints, and plausible distractors, never from obscure wording or
  oversized arithmetic ([question bank](question-bank.md#assessment-review)).

## Passages and rights

Check the origin of every reading passage and data source in a PDF. Attribute
it exactly under the [link policy](links.md), or replace it with an original
passage of the same difficulty and skill focus when its rights are unclear.

## Release gate

An imported set is published only after every item passes the release gate in
[verification](verification.md#release-gate), and the set passes an end-to-end
attempt whose score matches a hand calculation.

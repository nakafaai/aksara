# Search and answer engines

Nakafa lessons are written to teach, and a lesson that teaches the concept
completely is also the best answer to what learners search. Search metadata
never changes the pedagogy; it makes the finished lesson findable and states
honestly what the learner will get.

## Evidence first

Prioritize and plan rewrites with the site's search performance data, such as
Google Search Console: queries, impressions, clicks, average position, and
page indexing status. Lessons with many impressions at positions four to twenty
and lessons reported as "Crawled, currently not indexed" come first. Record the
queries a rewrite targets in the verification record outside the publication
source, never in the lesson.

## Title and description

- The `title` names the concept with the words that locale's learners type,
  such as `Rotasi Fungsi`. It is the lesson heading and the page title a search
  result shows, so it contains no brand name and never promises content the
  lesson does not contain.
- The `description` states in one or two sentences what the learner can do
  after reading, between about 120 and 155 characters.
- Write `metadata.description` as natural, direct prose using **only commas
  (`,`) and periods (`.`)** as punctuation (word-internal hyphens such as
  `rata-rata` or `x-axis` and word-internal apostrophes such as `don't` remain
  valid). Colons (`:`), semicolons (`;`), parentheses `()`, brackets `[]`,
  exclamation or question marks, slashes (`/`), quotes, and standalone dashes
  are forbidden (`metadata-description-punctuation`).
- Never start or tag `metadata.description` with a curriculum, syllabus, grade,
  or chapter prefix such as `Form 4 Biology Chapter 7`, `Nota Biologi Tingkatan
  4 Bab 2`, `Bab 3`, `Chapter 5`, `Kelas 11`, `Klasse 10`, `KSSM`, or `IGCSE`
  (`metadata-description-prefix`). Lessons are curriculum-neutral and mapped
  across multiple curricula, so descriptions explain the concept directly.
- Each locale writes for its own language's searches. Do not translate an
  Indonesian keyword phrase into German or English; research what German and
  English learners call the concept.

## People-First SEO and AEO (Google Search Central)

Nakafa follows Google Search Central's People-First and E-E-A-T principles:
content exists to build genuine student mastery, and clear pedagogy is what
search and answer engines trust.

- **Core answer in the first 100 words:** The opening section answers the
  lesson's main question directly within its first 100 words (what the concept
  is, the key rule or formula with its conditions, and what the interactive
  visual lets the learner observe). Answer engines and featured snippets can
  quote such a passage directly.
- **Complete sub-question coverage (Query Fan-Out):** Anticipate and answer the
  real follow-up questions learners ask next (conditions where a formula holds
  or breaks, step-by-step worked examples, common mistakes, and verification
  checks) inside the sections where they naturally belong.
- **Full mobile and desktop parity:** Never hide core explanations, formulas,
  or takeaways behind desktop-only interactions. Keep paragraphs scannable on
  phones (target <= 60 words, hard cap 85) and move full equations into
  `<BlockMath />` so mobile and desktop learners receive identical depth.
- **Zero clickbait, filler, or keyword stuffing:** Never write sensational
  promises, introductory fluff, hidden text, keyword lists, or artificial
  keyword repetition. A heading names the concept plainly in the words that
  locale's learners search (`Rotasi Titik Seperempat Putaran`), with the full
  question and digits in the first sentence below, as [headings](headings.md)
  requires.

## Links and duplication

- Internal links follow the [link policy](links.md). A lesson links its
  prerequisite and its natural next concept where the corpus teaches them.
- Two lessons must not answer the same question with the same explanation.
  When neighbors overlap, each teaches the shared idea only as far as its own
  question needs, stays self-contained, and links to the neighbor where the
  prose genuinely uses that relation.
- Never add hidden text, keyword lists, or repeated phrases for search.
- Titles and descriptions are unique per locale across lessons and articles.
  Search engines treat the title as the page's identity; repeated section
  headings cause no ranking penalty, but repeated titles and two pages
  answering one question do. `title-unique` and `heading-names-lesson` enforce
  the title side.

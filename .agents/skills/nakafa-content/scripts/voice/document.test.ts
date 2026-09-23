import { assert, it } from "@effect/vitest";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { findDocumentIssues } from "#nakafa-content/voice/document";
import { isBlockingLessonVoiceIssue } from "#nakafa-content/voice/policy";
import { documentProfile } from "#nakafa-content/voice/profile";

const METADATA = 'export const metadata = { title: "Pembahasan Soal 4" };\n\n';

it("blocks unwrapped math stacks in every authored document profile", () => {
  const source = `${METADATA}<BlockMath math="x+2=5" />\n\n<BlockMath math="x=3" />\n\n<MathContainer>\nA condition belongs outside the formula cards.\n</MathContainer>`;
  for (const file of [
    "question.en.mdx",
    "answer.en.mdx",
    "/corpus/articles/topic/en.mdx",
    "en.mdx",
  ]) {
    const issues = findDocumentIssues(
      file,
      "en",
      source,
      parseLessonMdx(source)
    );
    const stack = issues.filter(
      ({ rule }) =>
        rule === "unwrapped-math-stack" || rule === "math-stack-content"
    );
    assert.equal(stack.length, 2, file);
    assert.ok(stack.every(isBlockingLessonVoiceIssue));
  }
});

it("checks forbidden control bytes without rewriting assessed language", () => {
  const source = `${METADATA}Anda menghitung\u000B luas; sebutkan hasilnya.`;
  assert.deepEqual(
    findDocumentIssues("question.id.mdx", "id", source, parseLessonMdx(source)),
    [
      {
        column: 16,
        excerpt: "Anda menghitung\u000B luas; sebutkan hasilnya.",
        line: 3,
        rule: "forbidden-control-character",
      },
    ]
  );
});

it("preserves assessed language while checking broken question math and emphasis", () => {
  const source = `${METADATA}Saya membaca bagian berikutnya; Anda menyebut gagasan utama.\n\n**Teks tanpa penutup\n\n<InlineMath math="2 \\text{kg}" />`;
  const rules = findDocumentIssues(
    "question.id.mdx",
    "id",
    source,
    parseLessonMdx(source)
  ).map(({ rule }) => rule);
  assert.deepEqual(rules, ["unbalanced-emphasis", "glued-text-math"]);
});

it("checks authored answer voice without treating passage analysis as lesson narration", () => {
  const valid = `${METADATA}#### Membandingkan gagasan\n\n**Gagasan utama** paragraf menjelaskan tujuan percobaan. Bagian berikutnya menyebut hasil pengukuran.`;
  assert.deepEqual(
    findDocumentIssues("answer.id.mdx", "id", valid, parseLessonMdx(valid)),
    []
  );
  const invalid = `${METADATA}#### Menghitung massa\n\nAnda mengkonversi satuan.\n\n## Judul yang keluar dari pembahasan`;
  assert.deepEqual(
    findDocumentIssues(
      "answer.id.mdx",
      "id",
      invalid,
      parseLessonMdx(invalid)
    ).map(({ rule }) => rule),
    [
      "indonesian-formal-learner-address",
      "indonesian-nonstandard-affix",
      "section-body-highlight",
      "heading-order",
    ]
  );
  const german = `${METADATA}#### Masse berechnen\n\nZiehen Sie die fehlerhaften Einheiten ab.`;
  assert.deepEqual(
    findDocumentIssues(
      "answer.de.mdx",
      "de",
      german,
      parseLessonMdx(german)
    ).map(({ rule }) => rule),
    ["german-formal-address", "section-body-highlight"]
  );
});

it("retains lesson opening requirements and contract-owned body roles", () => {
  const lesson =
    "export const metadata = {};\n\nA paragraph names the sample space and explains the experiment.";
  assert.deepEqual(
    findDocumentIssues("en.mdx", "en", lesson, parseLessonMdx(lesson)).map(
      ({ rule }) => rule
    ),
    ["lesson-opening-highlight"]
  );
  assert.equal(documentProfile("/corpus/question.en.mdx"), "question");
  assert.equal(documentProfile("/corpus/answer.de.mdx"), "answer");
  assert.equal(documentProfile("/corpus/en.mdx"), "lesson");
  assert.equal(documentProfile("/corpus/notes.en.mdx"), "lesson");
  assert.equal(documentProfile("/corpus/articles/topic/en.mdx"), "article");
});

it("keeps article evidence and journal style outside lesson pedagogy", () => {
  const source = `${METADATA}## Method\n\nThe study reports **the measured effect**.\n\n| Evidence | Finding |\n| --- | --- |\n| Source | Stable result |\n\nStudies show that the measured effect remains stable.`;
  assert.deepEqual(
    findDocumentIssues(
      "/corpus/articles/topic/article/en.mdx",
      "en",
      source,
      parseLessonMdx(source)
    ).map(({ rule }) => rule),
    []
  );
});

it("allows scientific sections, citations, formal address and unmarked prose", () => {
  const sources = [
    [
      "en",
      `${METADATA}## Introduction\n\nStudies show a four percent increase (Lee et al., 2025).\n\n## Methods 2025\n\nThe observations use a fixed measurement interval.\n\n## References\n\nLee et al. (2025).`,
    ],
    [
      "id",
      `${METADATA}## Pendahuluan\n\nSaya menggunakan hasil penelitian yang menunjukkan kenaikan empat persen (Lee et al., 2025).\n\n## Daftar Pustaka\n\nLee et al. (2025).`,
    ],
    [
      "de",
      `${METADATA}## Einführung\n\nSie finden die Messmethode in Lee et al. (2025). Die Studie zeigt einen Anstieg von vier Prozent.\n\n## Literaturverzeichnis\n\nLee et al. (2025).`,
    ],
  ] as const;
  for (const [locale, source] of sources) {
    assert.deepEqual(
      findDocumentIssues(
        `/corpus/articles/topic/${locale}.mdx`,
        locale,
        source,
        parseLessonMdx(source)
      ),
      []
    );
  }
});

it("preserves scientific interpretation and established theorem names", () => {
  const source = `${METADATA}## Interpretasi Hasil\n\nTeorema fundamental kalkulus menghubungkan turunan dan integral.`;
  assert.deepEqual(
    findDocumentIssues(
      "/corpus/articles/topic/id.mdx",
      "id",
      source,
      parseLessonMdx(source)
    ),
    []
  );
});

it("does not join teacher narration to modal verbs in an assessed quotation", () => {
  const source = `${METADATA}Hal yang membuat Uwet **penasaran** adalah “Mengapa siput bisa berjalan di atas duri?”`;
  assert.deepEqual(
    findDocumentIssues("answer.id.mdx", "id", source, parseLessonMdx(source)),
    []
  );
});

it("does not invent adjacent duplicate words by removing an inline formula", () => {
  const source = `${METADATA}**Susun** <InlineMath math="A" /> sebelum <InlineMath math="B" /> sebelum <InlineMath math="C" />.\n\nPeriksa periksa urutan.`;
  assert.deepEqual(
    findDocumentIssues(
      "answer.id.mdx",
      "id",
      source,
      parseLessonMdx(source)
    ).map(({ line, rule }) => ({ line, rule })),
    [{ line: 5, rule: "duplicate-adjacent-word" }]
  );
});

import { assert, it } from "@effect/vitest";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  findDocumentIssues,
  questionBodyKind,
} from "#nakafa-content/voice/document";

const METADATA = 'export const metadata = { title: "Pembahasan Soal 4" };\n\n';

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
  const valid = `${METADATA}#### Membandingkan gagasan\n\nGagasan utama paragraf menjelaskan tujuan percobaan. Bagian berikutnya menyebut hasil pengukuran.`;
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
    ["german-formal-address"]
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
  assert.equal(questionBodyKind("/corpus/question.en.mdx"), "question");
  assert.equal(questionBodyKind("/corpus/answer.de.mdx"), "answer");
  assert.equal(questionBodyKind("/corpus/en.mdx"), undefined);
  assert.equal(questionBodyKind("/corpus/notes.en.mdx"), undefined);
});

it("does not join teacher narration to modal verbs in an assessed quotation", () => {
  const source = `${METADATA}Hal yang membuat Uwet penasaran adalah “Mengapa siput bisa berjalan di atas duri?”`;
  assert.deepEqual(
    findDocumentIssues("answer.id.mdx", "id", source, parseLessonMdx(source)),
    []
  );
});

it("does not invent adjacent duplicate words by removing an inline formula", () => {
  const source = `${METADATA}Susun <InlineMath math="A" /> sebelum <InlineMath math="B" /> sebelum <InlineMath math="C" />.\n\nPeriksa periksa urutan.`;
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

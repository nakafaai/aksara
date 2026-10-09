import { expect, layer } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  MutableHashMap,
  MutableList,
  Path,
  Schema,
} from "effect";
import { scanQuestionSimilarity } from "#corpus/question-bank/similarity";
import {
  absoluteQuestionTestSourceRoot,
  corpusRoot,
  discoverSyntheticQuestionSources,
  generalQuestionSourceFiles,
  itemForQuestion,
  makeQuestionSourceLayer,
  questionEntries,
  questionTestSourceRoot,
  realQuestionCorpusLayer,
} from "#corpus/test/question";

const track = "indonesia/snbt/general-reasoning";
const passage =
  "Kota Lestari memilih ketua kelas setiap tahun. Tahun ini tiga calon maju, dan setiap siswa memberi satu suara. Panitia menghitung suara di depan kelas dan mencatat hasilnya di papan tulis agar semua siswa bisa memeriksanya.";
const otherPassage =
  "Hutan bakau di pesisir utara menahan ombak dan menjadi tempat ikan kecil bertelur. Warga desa menanam bibit baru setiap musim hujan, lalu mencatat berapa banyak bibit yang tumbuh setelah tiga bulan di buku desa.";
const categoryItemSource = `import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: { categories: ["Benar", "Salah"], kind: "category", statements: [{ correctCategoryOrder: 1, label: "Hutan bakau menahan ombak" }] },
  },
};

export default item;`;

const shortAnswerItemSource = `import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: { key: { acceptsFractions: false, kind: "number", value: "4" }, kind: "short-answer" },
  },
};

export default item;`;
const rubricItemSource = `import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      criteria: [
        {
          label: { de: "Lösungsweg", en: "Working", id: "Langkah kerja" },
          levels: [
            { label: { de: "fehlt", en: "missing", id: "tidak ada" }, points: 0 },
            { label: { de: "vollständig", en: "complete", id: "lengkap" }, points: 2 },
          ],
        },
      ],
      kind: "rubric",
    },
  },
};

export default item;`;

const QuestionSchema = Schema.Struct({
  item: Schema.optionalKey(Schema.String),
  prompt: Schema.String,
  root: Schema.String,
});
/** One synthetic question with its prompt and optional item source. */
type Question = typeof QuestionSchema.Type;

/** Names one synthetic question by its set and number. */
function root(set: number, question: number) {
  return `${track}/set-${set}/question-${question}`;
}

/** Returns the repository path of one synthetic set or question. */
function source(path: string) {
  return `${questionTestSourceRoot}/${path}`;
}

/** Discovers synthetic questions, then scans them against each other. */
function scan(questions: readonly Question[], target: string, threshold = 0.5) {
  return Effect.gen(function* () {
    const path = yield* Path.Path;
    const repositoryRoot = yield* corpusRoot;
    const questionRoot = yield* absoluteQuestionTestSourceRoot;
    const entries = MutableList.make<string>();
    const items = MutableHashMap.empty<string, string>();
    const files = MutableHashMap.empty<string, string>();
    for (const question of questions) {
      MutableList.appendAll(
        entries,
        questionEntries(question.root, generalQuestionSourceFiles)
      );
      const itemSources = yield* itemForQuestion(question.root, question.item);
      for (const [itemPath, item] of itemSources) {
        MutableHashMap.set(items, itemPath, item);
      }
      MutableHashMap.set(
        files,
        path.resolve(questionRoot, question.root, "question.id.mdx"),
        `export const metadata = {\n  title: "Soal",\n};\n\n${question.prompt}\n`
      );
    }
    return yield* discoverSyntheticQuestionSources(
      MutableList.toArray(entries),
      items
    ).pipe(
      Effect.flatMap((sources) =>
        scanQuestionSimilarity(
          repositoryRoot,
          sources,
          source(target),
          threshold
        )
      ),
      Effect.provide([makeQuestionSourceLayer([], files), Path.layer])
    );
  }).pipe(Effect.provide(Path.layer));
}

layer(realQuestionCorpusLayer)("question similarity", (it) => {
  it.effect("flags an item in another set that changes only numbers", () =>
    Effect.gen(function* () {
      const questions = [
        {
          prompt:
            "Sebuah toko menjual 12 buku tulis seharga 3500 rupiah per buku. Berapa total harga yang dibayar pembeli untuk semua buku itu?",
          root: root(1, 1),
        },
        {
          prompt:
            "Sebuah toko menjual 15 buku tulis seharga 4200 rupiah per buku. Berapa total harga yang dibayar pembeli untuk semua buku itu?",
          root: root(2, 1),
        },
        {
          prompt:
            "Sebuah toko menjual 20 buku tulis seharga 5000 rupiah per buku. Berapa total harga yang dibayar pembeli untuk semua buku itu?",
          root: root(3, 1),
        },
      ];
      const report = yield* scan(questions, `${track}/set-2`);
      const bank = yield* scan(questions, track);
      const outside = yield* scan(questions, `${track}/set-9`);

      expect(report.items).toMatchObject([
        {
          first: source(root(1, 1)),
          masked: 1,
          score: 1,
          second: source(root(2, 1)),
        },
        { first: source(root(2, 1)), second: source(root(3, 1)) },
      ]);
      expect(
        Arr.map(bank.items, ({ first, second }) => [first, second])
      ).toEqual([
        [source(root(1, 1)), source(root(2, 1))],
        [source(root(1, 1)), source(root(3, 1))],
        [source(root(2, 1)), source(root(3, 1))],
      ]);
      expect(outside).toEqual({ items: [], passages: [] });
    })
  );

  it.effect("compares siblings by their own wording, not their passage", () =>
    Effect.gen(function* () {
      const report = yield* scan(
        [
          {
            prompt: `${passage}\n\nBerapa banyak suara yang didapatkan calon pertama dalam pemilihan ketua kelas itu?`,
            root: root(1, 1),
          },
          {
            prompt: `${passage}\n\nBerapa banyak suara yang didapatkan calon kedua dalam pemilihan ketua kelas itu?`,
            root: root(1, 2),
          },
          { prompt: `${passage}\n\nMengapa?`, root: root(1, 3) },
        ],
        track
      );

      expect(report.passages).toEqual([]);
      expect(report.items).toHaveLength(1);
      expect(report.items[0]).toMatchObject({
        first: source(root(1, 1)),
        second: source(root(1, 2)),
      });
      expect(report.items[0]?.score).toBeCloseTo(0.6);
    })
  );

  it.effect("ignores a shared question stem over different passages", () =>
    Effect.gen(function* () {
      const report = yield* scan(
        [
          {
            prompt: `${passage}\n\nApa gagasan utama bacaan itu?`,
            root: root(1, 1),
          },
          {
            prompt: `${passage}\n\nSiapa yang menghitung suara?`,
            root: root(1, 2),
          },
          {
            prompt: `${otherPassage}\n\nApa gagasan utama bacaan itu?`,
            root: root(2, 1),
          },
          {
            item: categoryItemSource,
            prompt: `${otherPassage}\n\nTentukan benar atau salah setiap pernyataan.`,
            root: root(2, 2),
          },
        ],
        `${track}/set-2`
      );

      expect(report).toEqual({ items: [], passages: [] });
    })
  );

  it.effect("flags a passage reused by another set", () =>
    Effect.gen(function* () {
      const report = yield* scan(
        [
          {
            prompt: `${passage}\n\nSiapa yang menghitung suara?`,
            root: root(1, 1),
          },
          { prompt: `${passage}\n\nBerapa calon yang maju?`, root: root(1, 2) },
          { prompt: `${passage}\n\nDi mana hasil dicatat?`, root: root(2, 1) },
          {
            prompt: `${passage}\n\nKapan pemilihan diadakan?`,
            root: root(2, 2),
          },
          { prompt: `${otherPassage}\n\nApa fungsi bakau?`, root: root(2, 3) },
          {
            prompt: `${otherPassage}\n\nKapan bibit ditanam?`,
            root: root(2, 4),
          },
        ],
        `${track}/set-2`
      );

      expect(report.passages).toMatchObject([
        {
          first: `${source(`${track}/set-1`)} (question-1, question-2)`,
          score: 1,
          second: `${source(`${track}/set-2`)} (question-1, question-2)`,
        },
      ]);
    })
  );

  it.effect("compares typed and rubric answers by their prompt alone", () =>
    Effect.gen(function* () {
      const prompt =
        "Tentukan nilai x jika 2x + 3 = 11, lalu jelaskan setiap langkahnya.";
      const report = yield* scan(
        [
          { item: shortAnswerItemSource, prompt, root: root(1, 1) },
          { item: rubricItemSource, prompt, root: root(2, 1) },
        ],
        `${track}/set-2`
      );

      expect(report.items).toMatchObject([
        { first: source(root(1, 1)), score: 1, second: source(root(2, 1)) },
      ]);
    })
  );
});

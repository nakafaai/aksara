import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Schema } from "effect";
import { type ItemSource, ItemSourceSchema } from "#corpus/question-bank/item";
import {
  QUESTION_BANK_ROOT,
  SetPathSchema,
  setSourcePath,
} from "#corpus/question-bank/path";
import { scanQuestionSimilarity } from "#corpus/question-bank/similarity";
import { readQuestionSets } from "#corpus/question-bank/source";
import {
  CHECKOUT,
  checkoutLayer,
  questionFiles,
  stimulusFiles,
  TEST_ITEM,
} from "#corpus/test/bank";

const section = "test-country/test-exam/test-section";
const passage =
  "Kota Lestari memilih ketua kelas setiap tahun. Tahun ini tiga calon maju, dan setiap siswa memberi satu suara. Panitia menghitung suara di depan kelas dan mencatat hasilnya di papan tulis agar semua siswa bisa memeriksanya.";
const otherPassage =
  "Hutan bakau di pesisir utara menahan ombak dan menjadi tempat ikan kecil bertelur. Warga desa menanam bibit baru setiap musim hujan, lalu mencatat berapa banyak bibit yang tumbuh setelah tiga bulan di buku desa.";
const matrix: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [{ column: 1, label: "Hutan bakau menahan ombak" }],
    },
  },
};

const QuestionSchema = Schema.Struct({
  item: Schema.optionalKey(ItemSourceSchema),
  prompt: Schema.String,
  reading: Schema.optionalKey(Schema.String),
});
/** One question of a test set: its prompt, its reading, and its item. */
type Question = typeof QuestionSchema.Type;

/** The path of one numbered test set. */
function set(number: number) {
  return SetPathSchema.make(`${section}/set-${number}`);
}

/** The repository path of one question of one test set. */
function root(setNumber: number, question: number) {
  return setSourcePath(set(setNumber), `question-${question}`);
}

/** Scans the given test sets, each a list of questions, against a folder below the bank root. */
function scan(
  sets: readonly (readonly Question[])[],
  target: string,
  threshold = 0.5
) {
  const files = Arr.flatMap(sets, (questions, index) => {
    const path = set(index + 1);
    const readings = Arr.dedupe(
      Arr.flatMap(questions, ({ reading }) =>
        reading === undefined ? [] : [reading]
      )
    );
    return [
      ...Arr.flatMap(questions, ({ item = TEST_ITEM, prompt, reading }, n) =>
        questionFiles(
          n + 1,
          reading === undefined
            ? item
            : { ...item, stimulus: `passage-${readings.indexOf(reading) + 1}` },
          prompt,
          path
        )
      ),
      ...Arr.flatMap(readings, (text, n) =>
        stimulusFiles(`passage-${n + 1}`, text, ["id"], path)
      ),
    ];
  });
  return Effect.gen(function* () {
    const read = yield* readQuestionSets(
      CHECKOUT,
      Arr.map(sets, (_questions, index) => set(index + 1))
    );
    return yield* scanQuestionSimilarity(
      CHECKOUT,
      read,
      `${QUESTION_BANK_ROOT}/${target}`,
      threshold
    );
  }).pipe(Effect.provide(checkoutLayer(files)));
}

describe("scanQuestionSimilarity", () => {
  it.effect("flags an item in another set that changes only numbers", () =>
    Effect.gen(function* () {
      const sets = Arr.map(
        [
          [12, 3500],
          [15, 4200],
          [20, 5000],
        ],
        ([count, price]) => [
          {
            prompt: `Sebuah toko menjual ${count} buku tulis seharga ${price} rupiah per buku. Berapa total harga yang dibayar pembeli untuk semua buku itu?`,
          },
        ]
      );
      const report = yield* scan(sets, set(2));
      const bank = yield* scan(sets, section);
      const outside = yield* scan(sets, set(9));

      expect(report.items).toMatchObject([
        { first: root(1, 1), masked: 1, score: 1, second: root(2, 1) },
        { first: root(2, 1), second: root(3, 1) },
      ]);
      expect(
        Arr.map(bank.items, ({ first, second }) => [first, second])
      ).toEqual([
        [root(1, 1), root(2, 1)],
        [root(1, 1), root(3, 1)],
        [root(2, 1), root(3, 1)],
      ]);
      expect(outside).toEqual({ items: [], passages: [] });
    })
  );

  it.effect("compares siblings by their own wording, not their reading", () =>
    Effect.gen(function* () {
      const report = yield* scan(
        [
          [
            {
              prompt:
                "Berapa banyak suara yang didapatkan calon pertama dalam pemilihan ketua kelas itu?",
              reading: passage,
            },
            {
              prompt:
                "Berapa banyak suara yang didapatkan calon kedua dalam pemilihan ketua kelas itu?",
              reading: passage,
            },
            { prompt: "Mengapa?", reading: passage },
          ],
        ],
        section
      );

      expect(report.passages).toEqual([]);
      expect(report.items).toHaveLength(1);
      expect(report.items[0]).toMatchObject({
        first: root(1, 1),
        second: root(1, 2),
      });
      expect(report.items[0]?.score).toBeCloseTo(0.6);
    })
  );

  it.effect("ignores a shared question stem over different readings", () =>
    Effect.gen(function* () {
      const report = yield* scan(
        [
          [
            { prompt: "Apa gagasan utama bacaan itu?", reading: passage },
            { prompt: "Siapa yang menghitung suara?", reading: passage },
          ],
          [
            { prompt: "Apa gagasan utama bacaan itu?", reading: otherPassage },
            {
              item: matrix,
              prompt: "Tentukan benar atau salah setiap pernyataan.",
              reading: otherPassage,
            },
          ],
        ],
        set(2)
      );

      expect(report).toEqual({ items: [], passages: [] });
    })
  );

  it.effect("flags a reading reused by another set", () =>
    Effect.gen(function* () {
      const report = yield* scan(
        [
          [
            { prompt: "Siapa yang menghitung suara?", reading: passage },
            { prompt: "Berapa calon yang maju?", reading: passage },
          ],
          [
            { prompt: "Di mana hasil dicatat?", reading: passage },
            { prompt: "Kapan pemilihan diadakan?", reading: passage },
            { prompt: "Apa fungsi bakau?", reading: otherPassage },
            { prompt: "Kapan bibit ditanam?", reading: otherPassage },
          ],
        ],
        set(2)
      );

      expect(report.passages).toMatchObject([
        {
          first: `${setSourcePath(set(1))} (question-1, question-2)`,
          score: 1,
          second: `${setSourcePath(set(2))} (question-1, question-2)`,
        },
      ]);
    })
  );
});

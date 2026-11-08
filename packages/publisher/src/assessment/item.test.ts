import { assert, describe, it } from "@effect/vitest";
import { verifyItemVersion } from "@nakafa/aksara-contracts/assessment/hash";
import {
  ItemFamilyIdSchema,
  StimulusIdSchema,
} from "@nakafa/aksara-contracts/assessment/identity";
import {
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ItemSourceSchema } from "@nakafa/aksara-corpus/question-bank/item";
import { SetPathSchema } from "@nakafa/aksara-corpus/question-bank/path";
import { Array as Arr, Effect, Layer, Option, Path, Schema } from "effect";
import { assembleItem } from "#publisher/assessment/item";
import { testFileLayer } from "#test/files";

const SET = "test-country/test-exam/test-section/test-set";
const FAMILY = ItemFamilyIdSchema.make(`${SET}/question-1`);
const ROOT = `packages/corpus/question-bank/tryout/${SET}/question-1`;

/** The virtual checkout of one question: its prompt and an explanation in every locale. */
function files(prompt: string) {
  return Layer.merge(
    testFileLayer([
      [`/checkout/${ROOT}/question.id.mdx`, prompt],
      [`/checkout/${ROOT}/answer.en.mdx`, "Because."],
      [`/checkout/${ROOT}/answer.id.mdx`, "Karena."],
      [`/checkout/${ROOT}/answer.de.mdx`, "Weil."],
    ]),
    Path.layer
  );
}

/** One authored question of the virtual checkout. */
function question(item: unknown) {
  return {
    item: Schema.decodeUnknownSync(ItemSourceSchema)(item),
    number: 1,
    set: SetPathSchema.make(SET),
    sourceRoot: CorpusSourcePathSchema.make(ROOT),
  };
}

describe("assembleItem", () => {
  it.effect(
    "assembles a choice into its family, version, key, and explanations",
    () =>
      Effect.gen(function* () {
        const assembled = yield* assembleItem({
          checkoutRoot: "/checkout",
          familyId: FAMILY,
          question: question({
            blueprint: {
              cognitiveLevel: "application",
              contentDomain: "algebra",
              topic: "functions",
            },
            versions: {
              id: {
                kind: "choice",
                options: [
                  { correct: false, label: "Satu" },
                  { correct: true, label: "Dua $$2$$" },
                ],
              },
            },
          }),
          reading: Option.none(),
        }).pipe(Effect.provide(files("Pilih satu.")));
        const [version] = assembled.versions;
        if (version === undefined) {
          return assert.fail("Expected one version.");
        }
        yield* verifyItemVersion(version);

        assert.deepStrictEqual(assembled.family, {
          blueprint: {
            cognitiveLevel: "application",
            contentDomain: "algebra",
            topic: "functions",
          },
          id: FAMILY,
        });
        assert.deepStrictEqual(version.prompt, {
          content: [
            {
              content: [{ text: "Pilih satu.", type: "text" }],
              type: "paragraph",
            },
            { attrs: { interaction: "choice" }, type: "interaction" },
          ],
          type: "doc",
        });
        assert.deepStrictEqual(version.interactions[0], {
          id: "choice",
          kind: "choice",
          label: "Jawaban",
          maxChoices: 1,
          minChoices: 0,
          options: [
            {
              id: "option-1",
              label: {
                content: [
                  {
                    content: [{ text: "Satu", type: "text" }],
                    type: "paragraph",
                  },
                ],
                type: "doc",
              },
            },
            {
              id: "option-2",
              label: {
                content: [
                  {
                    content: [
                      { text: "Dua ", type: "text" },
                      { attrs: { latex: "2" }, type: "mathInline" },
                    ],
                    type: "paragraph",
                  },
                ],
                type: "doc",
              },
            },
          ],
          shuffle: false,
        });
        assert.deepStrictEqual(assembled.keys, [
          {
            answers: [
              { correct: ["option-2"], interaction: "choice", kind: "choice" },
            ],
            version: version.hash,
          },
        ]);
        assert.deepStrictEqual(
          Arr.map(assembled.explanations, ({ language, version: hash }) => [
            language,
            hash,
          ]),
          [
            ["en", version.hash],
            ["id", version.hash],
            ["de", version.hash],
          ]
        );
      })
  );

  it.effect(
    "lets a choice of several answers pick any number, and keys a matrix by column",
    () =>
      Effect.gen(function* () {
        const reading = {
          hash: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
          id: StimulusIdSchema.make(`${SET}/passage-1`),
        };
        const several = yield* assembleItem({
          checkoutRoot: "/checkout",
          familyId: FAMILY,
          question: question({
            stimulus: "passage-1",
            versions: {
              id: {
                kind: "choice",
                options: [
                  { correct: true, label: "A" },
                  { correct: true, label: "B" },
                  { correct: false, label: "C" },
                ],
              },
            },
          }),
          reading: Option.some({ id: reading.id, versions: { id: reading } }),
        }).pipe(Effect.provide(files("Pilih semua.")));
        const matrix = yield* assembleItem({
          checkoutRoot: "/checkout",
          familyId: FAMILY,
          question: question({
            versions: {
              id: {
                columns: ["Benar", "Salah"],
                kind: "matrix",
                statements: [
                  { column: 2, label: "Satu" },
                  { column: 1, label: "Dua" },
                ],
              },
            },
          }),
          reading: Option.none(),
        }).pipe(Effect.provide(files("Tentukan.")));

        assert.strictEqual(several.family.stimulus, reading.id);
        assert.deepStrictEqual(several.versions[0]?.stimulus, reading);
        assert.strictEqual(
          several.versions[0]?.interactions[0]?.kind === "choice" &&
            several.versions[0].interactions[0].maxChoices,
          3
        );
        assert.deepStrictEqual(matrix.keys[0]?.answers, [
          {
            answers: [
              { column: "column-2", statement: "statement-1" },
              { column: "column-1", statement: "statement-2" },
            ],
            interaction: "matrix",
            kind: "matrix",
          },
        ]);
      })
  );

  it.effect("names the file that a question is missing", () =>
    Effect.gen(function* () {
      const error = yield* assembleItem({
        checkoutRoot: "/checkout",
        familyId: FAMILY,
        question: question({
          versions: {
            en: {
              kind: "choice",
              options: [
                { correct: true, label: "A" },
                { correct: false, label: "B" },
              ],
            },
          },
        }),
        reading: Option.none(),
      }).pipe(Effect.provide(files("Pilih.")), Effect.flip);

      assert.strictEqual(error._tag, "AssessmentReadError");
    })
  );

  it.effect("refuses a prompt that its version contract refuses", () =>
    Effect.gen(function* () {
      const error = yield* assembleItem({
        checkoutRoot: "/checkout",
        familyId: FAMILY,
        question: question({
          versions: {
            id: {
              kind: "choice",
              options: [
                { correct: true, label: "A" },
                { correct: false, label: "B" },
              ],
            },
          },
        }),
        reading: Option.none(),
      }).pipe(Effect.provide(files(`${"> ".repeat(14)}deep`)), Effect.flip);

      assert.strictEqual(error._tag, "AssessmentSourceError");
    })
  );
});

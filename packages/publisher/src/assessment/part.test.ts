import { assert, describe, expect, it } from "@effect/vitest";
import { verifyItemVersion } from "@nakafa/aksara-contracts/assessment/hash";
import { ItemFamilyIdSchema } from "@nakafa/aksara-contracts/assessment/identity";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ItemSourceSchema } from "@nakafa/aksara-corpus/question-bank/item";
import { PartsSourceSchema } from "@nakafa/aksara-corpus/question-bank/part";
import { SetPathSchema } from "@nakafa/aksara-corpus/question-bank/path";
import {
  Array as Arr,
  Effect,
  Layer,
  Option,
  Path,
  Schema,
  String as Str,
} from "effect";
import { assembleItem } from "#publisher/assessment/item";
import { assembleParts } from "#publisher/assessment/part";
import { testFileLayer } from "#test/files";

const SET = "test-country/test-exam/test-section/test-set";
const ROOT = `packages/corpus/question-bank/tryout/${SET}/question-1`;

/** An Aufgabe with a part of every kind, as an FSP Mathematik paper asks it. */
const aufgabe = {
  kind: "parts",
  parts: [
    { expression: "3x^2-4x", kind: "mathEntry", label: "a", points: 2 },
    { kind: "numericEntry", label: "b", points: 1, unit: "cm", value: "1.5" },
    { accepted: ["fällt"], kind: "textEntry", label: "c", points: 1 },
    {
      kind: "extendedText",
      label: "d",
      points: 3,
      rubric: [
        { label: "Vorzeichen", met: "Zeigt, dass f'(x) < 0 gilt.", points: 2 },
        { label: "Schluss", met: "Folgert die Monotonie.", points: 1 },
      ],
    },
  ],
};

/** The prompt of the Aufgabe, which places each part once. */
const PROMPT = Arr.join(
  [
    "**a)** Bestimme die Ableitung.",
    '<Field part="a" />',
    '**b)** Die Strecke ist <Field part="b" /> lang, und f <Field part="c" /> dort.',
    "**d)** Begründe.",
    '<Field part="d" />',
  ],
  "\n\n"
);

/** The parts of the Aufgabe as its source decodes them. */
function parts(task: unknown) {
  return Schema.decodeUnknownSync(PartsSourceSchema)(task).parts;
}

/** Assembles the Aufgabe from a virtual checkout with the given German prompt. */
function assembleAufgabe(prompt: string) {
  return assembleItem({
    checkoutRoot: "/checkout",
    familyId: ItemFamilyIdSchema.make(`${SET}/question-1`),
    question: {
      explanations: ["de"],
      item: Schema.decodeUnknownSync(ItemSourceSchema)({
        versions: { de: aufgabe },
      }),
      number: 1,
      set: SetPathSchema.make(SET),
      sourceRoot: CorpusSourcePathSchema.make(ROOT),
    },
    reading: Option.none(),
  }).pipe(
    Effect.provide(
      Layer.merge(
        testFileLayer([
          [`/checkout/${ROOT}/question.de.mdx`, prompt],
          [`/checkout/${ROOT}/answer.de.mdx`, "Weil."],
        ]),
        Path.layer
      )
    )
  );
}

describe("assembleParts", () => {
  it("gives each part an interaction, a key, a rule of its points, and a field", () => {
    const assembled = assembleParts(parts(aufgabe), "de");

    expect(assembled.fields).toEqual([
      { inline: true, interaction: "part-a", part: "a" },
      { inline: true, interaction: "part-b", part: "b" },
      { inline: true, interaction: "part-c", part: "c" },
      { inline: false, interaction: "part-d", part: "d" },
    ]);
    expect(assembled.interactions).toEqual([
      { id: "part-a", kind: "mathEntry", label: "Antwort a" },
      {
        acceptsFractions: true,
        id: "part-b",
        kind: "numericEntry",
        label: "Antwort b",
        unit: "cm",
      },
      { id: "part-c", kind: "textEntry", label: "Antwort c" },
      { id: "part-d", kind: "extendedText", label: "Antwort d" },
    ]);
    expect(assembled.keys).toEqual([
      { expression: "3x^2-4x", interaction: "part-a", kind: "mathEntry" },
      { interaction: "part-b", kind: "numericEntry", value: "1.5" },
      {
        accepted: {
          acceptedAnswers: ["fällt"],
          collapseWhitespace: true,
          ignoreCase: false,
          kind: "text",
        },
        interaction: "part-c",
        kind: "textEntry",
      },
      {
        criteria: Arr.map(
          ["Zeigt, dass f'(x) < 0 gilt.", "Folgert die Monotonie."],
          (met, index) => ({
            criterion: `criterion-${index + 1}`,
            levels: [
              {
                descriptor:
                  "Die Arbeit zeigt nicht, was das Kriterium verlangt.",
                level: "missed",
              },
              { descriptor: met, level: "met" },
            ],
          })
        ),
        interaction: "part-d",
        kind: "extendedText",
      },
    ]);
    expect(assembled.scoring).toEqual([
      ...Arr.map(["a", "b", "c"], (label, index) => ({
        interaction: `part-${label}`,
        rule: { floor: 0, kind: "perPart", pointsPerPart: index === 0 ? 2 : 1 },
      })),
      {
        interaction: "part-d",
        rule: {
          criteria: Arr.map(
            [
              ["Vorzeichen", 2],
              ["Schluss", 1],
            ] as const,
            ([label, points], index) => ({
              id: `criterion-${index + 1}`,
              label,
              levels: [
                { id: "missed", label: "Nicht erfüllt", points: 0 },
                { id: "met", label: "Erfüllt", points },
              ],
            })
          ),
          kind: "rubric",
        },
      },
    ]);
  });

  it("speaks the item's language, and takes no fraction for a whole number", () => {
    const count = parts({
      kind: "parts",
      parts: [{ kind: "numericEntry", label: "1", points: 1, value: "48" }],
    });
    const essay = parts({ kind: "parts", parts: [aufgabe.parts[3]] });

    expect(assembleParts(count, "en").interactions).toEqual([
      {
        acceptsFractions: false,
        id: "part-1",
        kind: "numericEntry",
        label: "Answer 1",
      },
    ]);
    expect(assembleParts(essay, "en").keys).toMatchObject([
      {
        criteria: [
          {
            levels: [
              {
                descriptor:
                  "The work does not show what the criterion asks for.",
              },
              { descriptor: "Zeigt, dass f'(x) < 0 gilt." },
            ],
          },
          {},
        ],
      },
    ]);
    expect(assembleParts(essay, "id").scoring).toMatchObject([
      {
        rule: {
          criteria: [
            { levels: [{ label: "Belum terpenuhi" }, { label: "Terpenuhi" }] },
            {},
          ],
        },
      },
    ]);
  });

  it.effect(
    "assembles an Aufgabe into one version whose fields stand where its prompt places them",
    () =>
      Effect.gen(function* () {
        const assembled = yield* assembleAufgabe(PROMPT);
        const [version] = assembled.versions;
        if (version === undefined) {
          return assert.fail("Expected one version.");
        }
        yield* verifyItemVersion(version);

        assert.deepStrictEqual(version.prompt.content, [
          {
            content: [
              { marks: [{ type: "bold" }], text: "a)", type: "text" },
              { text: " Bestimme die Ableitung.", type: "text" },
            ],
            type: "paragraph",
          },
          { attrs: { interaction: "part-a" }, type: "interaction" },
          {
            content: [
              { marks: [{ type: "bold" }], text: "b)", type: "text" },
              { text: " Die Strecke ist ", type: "text" },
              {
                attrs: { gap: null, interaction: "part-b" },
                type: "inlineInteraction",
              },
              { text: " lang, und f ", type: "text" },
              {
                attrs: { gap: null, interaction: "part-c" },
                type: "inlineInteraction",
              },
              { text: " dort.", type: "text" },
            ],
            type: "paragraph",
          },
          {
            content: [
              { marks: [{ type: "bold" }], text: "d)", type: "text" },
              { text: " Begründe.", type: "text" },
            ],
            type: "paragraph",
          },
          { attrs: { interaction: "part-d" }, type: "interaction" },
        ]);
        assert.deepStrictEqual(
          Arr.map(version.scoring, ({ interaction }) => interaction),
          ["part-a", "part-b", "part-c", "part-d"]
        );
        assert.strictEqual(assembled.keys[0]?.answers.length, 4);
      })
  );

  it.effect("refuses a prompt that leaves a part out", () =>
    Effect.gen(function* () {
      const error = yield* assembleAufgabe(
        Str.replace('<Field part="d" />', "")(PROMPT)
      ).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "AssessmentSourceError",
        element: 'Field part="d"',
        reason: "placement",
      });
    })
  );
});

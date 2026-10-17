import { assert, describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Exit, HashSet, Schema } from "effect";
import { DateOnlySchema } from "#contracts/date";
import { QuestionKeySchema } from "#contracts/question/identity";
import { withNextDigestFailure } from "#contracts/test/digest";
import { rubric as rubricResponse } from "#contracts/test/rubric";
import { responseText } from "#contracts/test/tryout";
import { JsonTextSchema } from "#contracts/text/json";
import {
  canonicalizeTryoutContent,
  hashTryoutContent,
  TryoutContentInputSchema,
} from "#contracts/tryout/hash/content";

const source = Schema.decodeSync(TryoutContentInputSchema)({
  answerArtifactLocale: "de",
  answerBody: "\nAnswer\n\n\nDetail\n",
  appLocale: "de",
  datePublished: DateOnlySchema.make("2025-03-04"),
  deliveryLanguage: "en",
  languagePolicy: { kind: "fixed", language: "en" },
  questionArtifactLocale: "en",
  questionBody: "\nQuestion\n",
  response: {
    kind: "single-choice",
    options: [
      {
        isCorrect: true,
        label: "Choice 1",
        optionKey: "option-1",
        order: 1,
      },
      {
        isCorrect: false,
        label: "Choice 2",
        optionKey: "option-2",
        order: 2,
      },
    ],
  },
  sourcePath: QuestionKeySchema.make(
    "question-bank/tryout/indonesia/snbt/general-knowledge-and-understanding/set-2/question-1"
  ),
  sourceRevision: "2026-07-05",
});

describe("try-out content hash", () => {
  it.effect("matches the durable question-pair canonical bytes", () =>
    Effect.gen(function* () {
      expect(canonicalizeTryoutContent(source)).toBe(
        '{"answerArtifactLocale":"de","answerBody":"Answer\\n\\nDetail","appLocale":"de","datePublished":1741046400000,"deliveryLanguage":"en","languagePolicy":{"kind":"fixed","language":"en"},"questionArtifactLocale":"en","questionBody":"Question","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"Choice 1","optionKey":"option-1","order":1},{"isCorrect":false,"label":"Choice 2","optionKey":"option-2","order":2}]},"sourcePath":"question-bank/tryout/indonesia/snbt/general-knowledge-and-understanding/set-2/question-1","sourceRevision":"2026-07-05"}'
      );
      expect(yield* hashTryoutContent(source)).toBe(
        "523fc7dbc93bb4a26cf33f4afcf01b64797fbfb8149462fd8313b1fb4633647a"
      );
    })
  );

  it.effect("binds complete blueprint, modification, and stimulus facts", () =>
    Effect.gen(function* () {
      const documented = yield* Schema.decodeEffect(TryoutContentInputSchema)({
        ...source,
        blueprint: {
          cognitiveLevel: "reasoning",
          contentDomain: "algebra",
          topic: "functions",
        },
        dateModified: DateOnlySchema.make("2025-03-05"),
        stimulusKey: "shared-table",
      });

      expect(
        yield* Schema.decodeEffect(JsonTextSchema)(
          canonicalizeTryoutContent(documented)
        )
      ).toMatchObject({
        blueprint: documented.blueprint,
        dateModified: Date.UTC(2025, 2, 5),
        stimulusKey: "shared-table",
      });
      expect(yield* hashTryoutContent(documented)).not.toBe(
        yield* hashTryoutContent(source)
      );
    })
  );

  it.effect.each([
    { field: "answerBody", value: "changed answer" },
    { field: "datePublished", value: DateOnlySchema.make("2025-03-05") },
    { field: "answerArtifactLocale", value: "id" },
    { field: "appLocale", value: "id" },
    { field: "deliveryLanguage", value: "id" },
    { field: "questionBody", value: "changed question" },
    { field: "questionArtifactLocale", value: "id" },
    {
      field: "sourcePath",
      value: QuestionKeySchema.make(
        "question-bank/tryout/indonesia/snbt/general-knowledge-and-understanding/set-2/question-2"
      ),
    },
    { field: "sourceRevision", value: "2026-07-06" },
  ])("changes when $field changes", ({ field, value }) =>
    Effect.gen(function* () {
      expect(yield* hashTryoutContent({ ...source, [field]: value })).not.toBe(
        yield* hashTryoutContent(source)
      );
    })
  );

  it.effect("changes when response label, order, or correctness changes", () =>
    Effect.gen(function* () {
      assert(source.response.kind === "single-choice");
      const variants = [
        {
          ...source.response,
          options: Arr.map(source.response.options, (option, index) =>
            index === 0 ? { ...option, label: responseText("Changed") } : option
          ),
        },
        {
          ...source.response,
          options: Arr.map(source.response.options, (option) => ({
            ...option,
            order: option.order === 1 ? 2 : 1,
          })),
        },
        {
          ...source.response,
          options: Arr.map(source.response.options, (option) => ({
            ...option,
            isCorrect: !option.isCorrect,
          })),
        },
      ];
      const base = yield* hashTryoutContent(source);
      const hashes = yield* Effect.forEach(variants, (response) =>
        hashTryoutContent({ ...source, response })
      );
      expect(Arr.every(hashes, (hash) => hash !== base)).toBe(true);
    })
  );

  it.effect(
    "binds short-answer and rubric responses into the question identity",
    () =>
      Effect.gen(function* () {
        const shortAnswer = yield* Schema.decodeEffect(
          TryoutContentInputSchema
        )({
          ...source,
          response: {
            key: { acceptsFractions: false, kind: "number", value: "12" },
            kind: "short-answer",
          },
        });
        const rubric = yield* Schema.decodeEffect(TryoutContentInputSchema)({
          ...source,
          response: rubricResponse,
        });

        expect(canonicalizeTryoutContent(shortAnswer)).toContain(
          '"response":{"key":{"acceptsFractions":false,"kind":"number","value":"12"},"kind":"short-answer"}'
        );
        expect(canonicalizeTryoutContent(rubric)).toContain(
          '"label":{"de":"Result (de)","en":"Result (en)","id":"Result (id)"}'
        );
        const hashes = yield* Effect.forEach(
          [source, shortAnswer, rubric],
          hashTryoutContent
        );
        expect(HashSet.size(HashSet.fromIterable(hashes))).toBe(3);
      })
  );

  it.effect("maps a failed digest into the content hash error", () =>
    Effect.gen(function* () {
      const error = yield* withNextDigestFailure(
        hashTryoutContent(source).pipe(Effect.flip)
      );

      expect(error).toMatchObject({ _tag: "TryoutContentHashError" });
    })
  );

  it("rejects modification dates that are not later than publication", () => {
    const result = Schema.decodeExit(TryoutContentInputSchema)({
      ...source,
      dateModified: source.datePublished,
    });
    expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
      "Expected dateModified to be later than datePublished."
    );
  });

  it.effect(
    "pins the canonical bytes and hash of a documented question pair",
    () =>
      Effect.gen(function* () {
        const documented = yield* Schema.decodeEffect(TryoutContentInputSchema)(
          {
            ...source,
            blueprint: {
              cognitiveLevel: "reasoning",
              contentDomain: "algebra",
              topic: "functions",
            },
            dateModified: "2025-03-05",
            stimulusKey: "shared-table",
          }
        );

        expect(canonicalizeTryoutContent(documented)).toBe(
          '{"answerArtifactLocale":"de","answerBody":"Answer\\n\\nDetail","appLocale":"de","blueprint":{"cognitiveLevel":"reasoning","contentDomain":"algebra","topic":"functions"},"dateModified":1741132800000,"datePublished":1741046400000,"deliveryLanguage":"en","languagePolicy":{"kind":"fixed","language":"en"},"questionArtifactLocale":"en","questionBody":"Question","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"Choice 1","optionKey":"option-1","order":1},{"isCorrect":false,"label":"Choice 2","optionKey":"option-2","order":2}]},"sourcePath":"question-bank/tryout/indonesia/snbt/general-knowledge-and-understanding/set-2/question-1","sourceRevision":"2026-07-05","stimulusKey":"shared-table"}'
        );
        expect(yield* hashTryoutContent(documented)).toBe(
          "6d06c9022bed215fdefe2ea24586cc79cebaf14aaa2584253dc7251ae6822c03"
        );
      })
  );

  it.effect(
    "pins the canonical bytes and hash of localized non-ASCII bodies",
    () =>
      Effect.gen(function* () {
        const localized = yield* Schema.decodeEffect(TryoutContentInputSchema)({
          ...source,
          answerBody: "\nJawaban é\n\n\nRincian é\n",
          questionBody: "\nPertanyaan é\n",
        });

        expect(canonicalizeTryoutContent(localized)).toBe(
          '{"answerArtifactLocale":"de","answerBody":"Jawaban é\\n\\nRincian é","appLocale":"de","datePublished":1741046400000,"deliveryLanguage":"en","languagePolicy":{"kind":"fixed","language":"en"},"questionArtifactLocale":"en","questionBody":"Pertanyaan é","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"Choice 1","optionKey":"option-1","order":1},{"isCorrect":false,"label":"Choice 2","optionKey":"option-2","order":2}]},"sourcePath":"question-bank/tryout/indonesia/snbt/general-knowledge-and-understanding/set-2/question-1","sourceRevision":"2026-07-05"}'
        );
        expect(yield* hashTryoutContent(localized)).toBe(
          "c6e9e26075432b14ed6f4841ac0264067c5edfc77348934aeb055d82678ed572"
        );
      })
  );

  it("rejects app, answer, delivery, and question locale drift", () => {
    const result = Schema.decodeExit(TryoutContentInputSchema)({
      ...source,
      answerArtifactLocale: "id",
    });
    expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
      "Expected answer locale to match app locale and question locale to match delivery language."
    );
  });
});

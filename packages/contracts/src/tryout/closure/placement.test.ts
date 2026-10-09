import { assert, describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Schema, Stream } from "effect";

import { ACTIVE_APP_LOCALES, DeliveryLanguageSchema } from "#contracts/locale";
import { makeTryoutTestRows, responseText } from "#contracts/test/tryout";
import { verifyTryoutLocaleClosure } from "#contracts/tryout/closure/locale";
import {
  canonicalizeAssessedLanguagePlacementFacts,
  canonicalizeLocaleNeutralPlacementFacts,
} from "#contracts/tryout/closure/placement";
import { makeTryoutPlacementRecord } from "#contracts/tryout/hash/placement";
import {
  type TryoutPlacementRecord,
  TryoutPlacementSchema,
} from "#contracts/tryout/placement";

const activeAppLocales = ACTIVE_APP_LOCALES;
const { catalog, placements } = makeTryoutTestRows();

/** Rebuilds one valid placement record after a test-owned field change. */
const updatePlacement = Effect.fn("AksaraContracts.test.updateTryoutPlacement")(
  function* (
    record: TryoutPlacementRecord,
    fields: Readonly<Partial<TryoutPlacementRecord["row"]>>
  ) {
    const row = yield* Schema.decodeEffect(TryoutPlacementSchema)({
      ...record.row,
      ...fields,
    });
    return makeTryoutPlacementRecord(row);
  }
);

/** Returns the Indonesian fixture and its stable array index. */
const indonesianPlacement = Effect.fn(
  "AksaraContracts.test.indonesianTryoutPlacement"
)(function* () {
  const index = yield* Effect.fromOption(
    Arr.findFirstIndex(placements, ({ row }) => row.appLocale === "id")
  );
  const placement = yield* Effect.fromNullishOr(placements[index]);
  return { index, placement };
});

/** Replaces one placement and returns its locale-closure failure. */
const rejectReplacement = Effect.fn(
  "AksaraContracts.test.rejectTryoutPlacementReplacement"
)(function* (index: number, replacement: TryoutPlacementRecord) {
  const changed = [...placements];
  changed[index] = replacement;
  return yield* verifyTryoutLocaleClosure({
    activeAppLocales,
    catalog: Stream.fromIterable(catalog),
    placements: Stream.fromIterable(changed),
  }).pipe(Effect.flip);
});

describe("try-out locale closure placement facts", () => {
  it.effect("accepts localized labels with one stable response structure", () =>
    Effect.gen(function* () {
      const { index, placement } = yield* indonesianPlacement();
      assert(placement.row.response.kind === "single-choice");
      const replacement = yield* updatePlacement(placement, {
        response: {
          kind: "single-choice",
          options: Arr.map(placement.row.response.options, (option) => ({
            ...option,
            label: responseText(
              option.isCorrect ? "Jawaban benar" : "Pengecoh"
            ),
          })),
        },
      });
      const changed = [...placements];
      changed[index] = replacement;

      expect(
        yield* verifyTryoutLocaleClosure({
          activeAppLocales,
          catalog: Stream.fromIterable(catalog),
          placements: Stream.fromIterable(changed),
        })
      ).toBeUndefined();
    })
  );

  it.effect("rejects language-policy drift across app locales", () =>
    Effect.gen(function* () {
      const { index, placement } = yield* indonesianPlacement();
      const replacement = yield* updatePlacement(placement, {
        languagePolicy: {
          kind: "fixed",
          language: DeliveryLanguageSchema.make("id"),
        },
      });

      expect((yield* rejectReplacement(index, replacement)).code).toBe(
        "fact-mismatch"
      );
    })
  );

  it.effect("rejects blueprint drift across app locales", () =>
    Effect.gen(function* () {
      const { index, placement } = yield* indonesianPlacement();
      const replacement = yield* updatePlacement(placement, {
        blueprint: {
          cognitiveLevel: "reasoning",
          contentDomain: "algebra",
          topic: "functions",
        },
      });

      expect((yield* rejectReplacement(index, replacement)).code).toBe(
        "fact-mismatch"
      );
    })
  );

  it.effect("rejects stimulus drift across app locales", () =>
    Effect.gen(function* () {
      const { index, placement } = yield* indonesianPlacement();
      const replacement = yield* updatePlacement(placement, {
        stimulusKey: "shared-stimulus",
      });

      expect((yield* rejectReplacement(index, replacement)).code).toBe(
        "fact-mismatch"
      );
    })
  );

  it.effect("rejects answer-key drift across app locales", () =>
    Effect.gen(function* () {
      const { index, placement } = yield* indonesianPlacement();
      assert(placement.row.response.kind === "single-choice");
      const replacement = yield* updatePlacement(placement, {
        response: {
          kind: "single-choice",
          options: Arr.map(placement.row.response.options, (option) => ({
            ...option,
            isCorrect: !option.isCorrect,
          })),
        },
      });

      expect((yield* rejectReplacement(index, replacement)).code).toBe(
        "fact-mismatch"
      );
    })
  );

  it.effect("rejects point drift across app locales", () =>
    Effect.gen(function* () {
      const { index, placement } = yield* indonesianPlacement();
      const replacement = yield* updatePlacement(placement, { points: 2 });

      expect((yield* rejectReplacement(index, replacement)).code).toBe(
        "fact-mismatch"
      );
    })
  );
});

describe("try-out closure placement golden facts", () => {
  it.effect(
    "pins the locale-neutral facts of a row without optional facts",
    () =>
      Effect.gen(function* () {
        const english = yield* Effect.fromOption(
          Arr.findFirst(placements, ({ row }) => row.appLocale === "en")
        );

        expect(canonicalizeLocaleNeutralPlacementFacts(english.row)).toBe(
          '{"answerContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/answer","languagePolicy":{"kind":"app-locale"},"questionContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question","questionSourcePath":"packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1","rendererDomain":"snbt-quant","response":{"kind":"single-choice","options":[{"isCorrect":true,"optionKey":"option-1","order":1},{"isCorrect":false,"optionKey":"option-2","order":2}]},"scope":"server","sourceRevision":"2026-08-12"}'
        );
      })
  );

  it.effect(
    "pins the locale-neutral facts of a row with blueprint, points, and stimulus",
    () =>
      Effect.gen(function* () {
        const english = yield* Effect.fromOption(
          Arr.findFirst(placements, ({ row }) => row.appLocale === "en")
        );
        const documented = yield* Schema.decodeEffect(TryoutPlacementSchema)({
          ...english.row,
          blueprint: {
            cognitiveLevel: "reasoning",
            contentDomain: "algebra",
            topic: "functions",
          },
          points: 2,
          stimulusKey: "shared-table",
        });

        expect(canonicalizeLocaleNeutralPlacementFacts(documented)).toBe(
          '{"answerContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/answer","blueprint":{"cognitiveLevel":"reasoning","contentDomain":"algebra","topic":"functions"},"languagePolicy":{"kind":"app-locale"},"points":2,"questionContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question","questionSourcePath":"packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1","rendererDomain":"snbt-quant","response":{"kind":"single-choice","options":[{"isCorrect":true,"optionKey":"option-1","order":1},{"isCorrect":false,"optionKey":"option-2","order":2}]},"scope":"server","sourceRevision":"2026-08-12","stimulusKey":"shared-table"}'
        );
      })
  );

  it.effect(
    "pins the assessed-language facts with a non-ASCII option label",
    () =>
      Effect.gen(function* () {
        const indonesian = yield* Effect.fromOption(
          Arr.findFirst(placements, ({ row }) => row.appLocale === "id")
        );
        const localized = yield* Schema.decodeEffect(TryoutPlacementSchema)({
          ...indonesian.row,
          response: {
            kind: "single-choice",
            options: [
              {
                isCorrect: true,
                label: "Jawaban é",
                optionKey: "option-1",
                order: 1,
              },
              {
                isCorrect: false,
                label: "Pengecoh",
                optionKey: "option-2",
                order: 2,
              },
            ],
          },
        });

        expect(canonicalizeAssessedLanguagePlacementFacts(localized)).toBe(
          '{"deliveryLanguage":"id","questionArtifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","questionArtifactLocale":"id","questionContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"Jawaban é","optionKey":"option-1","order":1},{"isCorrect":false,"label":"Pengecoh","optionKey":"option-2","order":2}]}}'
        );
      })
  );
});

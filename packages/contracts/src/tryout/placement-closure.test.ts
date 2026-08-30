import { assert, describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";

import { ACTIVE_APP_LOCALES, DeliveryLanguageSchema } from "#contracts/locale";
import { makeTryoutTestRows, responseText } from "#contracts/test/tryout";
import { verifyTryoutLocaleClosure } from "#contracts/tryout/locale-closure";
import {
  type TryoutPlacementRecord,
  TryoutPlacementSchema,
} from "#contracts/tryout/placement";
import { makeTryoutPlacementRecord } from "#contracts/tryout/placement-hash";

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
  const index = placements.findIndex(({ row }) => row.appLocale === "id");
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
          options: placement.row.response.options.map((option) => ({
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
          options: placement.row.response.options.map((option) => ({
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
});

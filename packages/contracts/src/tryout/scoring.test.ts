import { describe, expect, it } from "@effect/vitest";
import { Effect, Stream } from "effect";

import { ACTIVE_APP_LOCALES } from "#contracts/locale";
import { rubric } from "#contracts/test/rubric";
import { makeTryoutTestRows } from "#contracts/test/tryout";
import type { TryoutCatalogRecord } from "#contracts/tryout/catalog";
import { verifyTryoutLocaleClosure } from "#contracts/tryout/closure/locale";
import { makeTryoutCatalogRecord } from "#contracts/tryout/hash/catalog";
import { makeTryoutPlacementRecord } from "#contracts/tryout/hash/placement";
import type { TryoutPlacementRecord } from "#contracts/tryout/placement";
import type { TryoutMarks, TryoutScoring } from "#contracts/tryout/spec";

const rows = makeTryoutTestRows();
const marks: TryoutMarks = { blank: 0, correct: 4, wrong: -1 };
const SECTION_IDENTITY =
  "en\0section\0indonesia\0snbt\x002027\0set-1\0quantitative-knowledge";

/** Rebuilds catalog rows with one exam and set strategy and section marks. */
function scoredCatalog(input: {
  readonly exam: TryoutScoring;
  readonly marks?: TryoutMarks;
  readonly set: TryoutScoring;
}) {
  return rows.catalog.map(({ row }) => {
    if (row.kind === "exam") {
      return makeTryoutCatalogRecord({ ...row, scoringStrategy: input.exam });
    }
    if (row.kind === "set") {
      return makeTryoutCatalogRecord({ ...row, scoringStrategy: input.set });
    }
    if (row.kind === "section" && input.marks !== undefined) {
      return makeTryoutCatalogRecord({ ...row, marks: input.marks });
    }
    return makeTryoutCatalogRecord(row);
  });
}

/** Rebuilds every localized placement with one rubric response. */
function rubricPlacements() {
  return rows.placements.map(({ row }) =>
    makeTryoutPlacementRecord({ ...row, response: rubric })
  );
}

/** Verifies one snapshot pass over replaced catalog or placement rows. */
function verify(input: {
  readonly catalog?: readonly TryoutCatalogRecord[];
  readonly placements?: readonly TryoutPlacementRecord[];
}) {
  return verifyTryoutLocaleClosure({
    activeAppLocales: ACTIVE_APP_LOCALES,
    catalog: Stream.fromIterable(input.catalog ?? rows.catalog),
    placements: Stream.fromIterable(input.placements ?? rows.placements),
  });
}

describe("try-out scoring coherence", () => {
  it.effect("accepts each strategy with the questions it can score", () =>
    Effect.gen(function* () {
      expect(yield* verify({})).toBeUndefined();
      expect(
        yield* verify({
          catalog: scoredCatalog({
            exam: "penalized",
            marks,
            set: "penalized",
          }),
        })
      ).toBeUndefined();
      expect(
        yield* verify({
          catalog: scoredCatalog({ exam: "raw", set: "raw" }),
          placements: rubricPlacements(),
        })
      ).toBeUndefined();
    })
  );

  it.effect("rejects a set that scores differently from its exam", () =>
    Effect.gen(function* () {
      const error = yield* verify({
        catalog: scoredCatalog({ exam: "irt", set: "raw" }),
      }).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "TryoutScoringError",
        code: "strategy",
        identity: "en\0set\0indonesia\0snbt\x002027\0set-1\0",
      });
    })
  );

  it.effect("rejects missing and unexpected section marks", () =>
    Effect.gen(function* () {
      const errors = yield* Effect.all([
        verify({
          catalog: scoredCatalog({ exam: "penalized", set: "penalized" }),
        }).pipe(Effect.flip),
        verify({
          catalog: scoredCatalog({ exam: "irt", marks, set: "irt" }),
        }).pipe(Effect.flip),
      ]);

      for (const error of errors) {
        expect(error).toMatchObject({
          _tag: "TryoutScoringError",
          code: "marks",
          identity: SECTION_IDENTITY,
        });
      }
    })
  );

  it.effect("rejects rubric placements outside raw sets", () =>
    Effect.gen(function* () {
      const errors = yield* Effect.all([
        verify({ placements: rubricPlacements() }).pipe(Effect.flip),
        verify({
          catalog: scoredCatalog({
            exam: "penalized",
            marks,
            set: "penalized",
          }),
          placements: rubricPlacements(),
        }).pipe(Effect.flip),
      ]);

      for (const error of errors) {
        expect(error).toMatchObject({
          _tag: "TryoutScoringError",
          code: "rubric",
          identity:
            "indonesia\0snbt\x002027\0set-1\0quantitative-knowledge\x001\0question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question\0en",
        });
      }
    })
  );
});

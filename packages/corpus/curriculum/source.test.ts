import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  CurriculumCatalogError,
  decodeCurriculumCatalog,
  validateCurriculumCatalog,
} from "#corpus/curriculum/source";

describe("curriculum source catalog", () => {
  it.effect(
    "loads the four real curriculum trees in stable program order",
    () =>
      Effect.gen(function* () {
        const curricula = yield* decodeCurriculumCatalog();

        expect(curricula.map(({ programKey }) => programKey)).toEqual([
          "cambridge-international",
          "merdeka",
          "singapore-moe",
          "united-states",
        ]);
      })
  );

  it.effect("canonicalizes reversed real source order", () =>
    Effect.gen(function* () {
      const curricula = yield* decodeCurriculumCatalog();
      const canonical = yield* validateCurriculumCatalog(
        [...curricula].reverse()
      );

      expect(canonical).toEqual(curricula);
    })
  );

  it.effect("rejects duplicate program ownership", () =>
    Effect.gen(function* () {
      const [curriculum] = yield* decodeCurriculumCatalog();
      expect(curriculum).toBeDefined();
      if (!curriculum) {
        return;
      }
      const error = yield* validateCurriculumCatalog([
        curriculum,
        curriculum,
      ]).pipe(Effect.flip);

      expect(error).toBeInstanceOf(CurriculumCatalogError);
      expect(error).toMatchObject({ programKey: curriculum.programKey });
    })
  );
});

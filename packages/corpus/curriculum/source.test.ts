import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import {
  CurriculumCatalogError,
  decodeCurriculumCatalog,
  validateCurriculumCatalog,
} from "#corpus/curriculum/source";

describe("curriculum source catalog", () => {
  it("loads the four real curriculum trees in stable program order", async () => {
    const curricula = await Effect.runPromise(decodeCurriculumCatalog());

    expect(curricula.map(({ programKey }) => programKey)).toEqual([
      "cambridge-international",
      "merdeka",
      "singapore-moe",
      "united-states",
    ]);
  });

  it("canonicalizes reversed real source order", async () => {
    const curricula = await Effect.runPromise(decodeCurriculumCatalog());
    const canonical = await Effect.runPromise(
      validateCurriculumCatalog([...curricula].reverse())
    );

    expect(canonical).toEqual(curricula);
  });

  it("rejects duplicate program ownership", async () => {
    const [curriculum] = await Effect.runPromise(decodeCurriculumCatalog());
    expect(curriculum).toBeDefined();
    if (!curriculum) {
      return;
    }
    const error = await Effect.runPromise(
      validateCurriculumCatalog([curriculum, curriculum]).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(CurriculumCatalogError);
    expect(error).toMatchObject({ programKey: curriculum.programKey });
  });
});

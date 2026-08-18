import { LearningProgramSchema } from "@nakafa/aksara-contracts/program/spec";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { projectCurriculumRoutes } from "#corpus/curriculum/route";
import { CurriculumRouteError } from "#corpus/curriculum/route-source";
import { decodeCurriculumCatalog } from "#corpus/curriculum/source";
import { decodeMaterialSources } from "#corpus/material/source";
import { decodeProgramCatalog } from "#corpus/program/catalog";

describe("curriculum route projection", () => {
  it("projects the exact real localized route inventory", async () => {
    const [curricula, materials, programs] = await Effect.runPromise(
      Effect.all([
        decodeCurriculumCatalog(),
        decodeMaterialSources(),
        decodeProgramCatalog(),
      ])
    );
    const routes = await Effect.runPromise(
      projectCurriculumRoutes({ curricula, materials, programs })
    );
    const roots = routes.filter(({ parentPath }) => parentPath === undefined);
    const materialRoutes = routes.filter(
      ({ materialKey }) => materialKey !== undefined
    );

    expect(routes).toHaveLength(390);
    expect(roots).toHaveLength(8);
    expect(materialRoutes).toHaveLength(192);
    expect(routes.filter(({ sitemap }) => sitemap)).toHaveLength(52);
    expect(new Set(routes.map(({ sourcePath }) => sourcePath))).toEqual(
      new Set([
        "packages/corpus/curriculum/cambridge-international",
        "packages/corpus/curriculum/merdeka",
        "packages/corpus/curriculum/singapore-moe",
        "packages/corpus/curriculum/united-states",
      ])
    );
    expect(
      routes.find(
        ({ appLocale, programKey, publicPath }) =>
          appLocale === "en" &&
          programKey === "merdeka" &&
          publicPath.endsWith(
            "/mathematics/linear-equation-inequality/linear-equation-inequality"
          )
      )
    ).toMatchObject({
      canonicalPath: "subjects/mathematics/linear-equation-inequality",
      materialContextNodeKey: "class-10-mathematics-linear-equation-inequality",
      materialContextParentPath: "curriculum/merdeka/class-10/mathematics",
      materialContextPublicPath:
        "curriculum/merdeka/class-10/mathematics/linear-equation-inequality",
      materialKey: "lesson.mathematics.linear-equation-inequality",
    });
  });

  it("rejects a curriculum without a matching program", async () => {
    const [curricula, materials, programs] = await Effect.runPromise(
      Effect.all([
        decodeCurriculumCatalog(),
        decodeMaterialSources(),
        decodeProgramCatalog(),
      ])
    );
    const error = await Effect.runPromise(
      projectCurriculumRoutes({
        curricula,
        materials,
        programs: programs.filter(
          ({ key }) => key !== curricula[0]?.programKey
        ),
      }).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(CurriculumRouteError);
    expect(error).toMatchObject({ code: "program" });
  });

  it("rejects a curriculum-tree program without its source tree", async () => {
    const [curricula, materials, programs] = await Effect.runPromise(
      Effect.all([
        decodeCurriculumCatalog(),
        decodeMaterialSources(),
        decodeProgramCatalog(),
      ])
    );
    const error = await Effect.runPromise(
      projectCurriculumRoutes({
        curricula: curricula.slice(1),
        materials,
        programs,
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ code: "curriculum" });
  });

  it("rejects a curriculum program without one active translation", async () => {
    const [curricula, materials, programs] = await Effect.runPromise(
      Effect.all([
        decodeCurriculumCatalog(),
        decodeMaterialSources(),
        decodeProgramCatalog(),
      ])
    );
    const programKey = curricula[0]?.programKey;
    const changed = programs.map((program) =>
      program.key === programKey
        ? Schema.decodeUnknownSync(LearningProgramSchema)({
            ...program,
            translations: program.translations.filter(
              ({ appLocale }) => appLocale !== "id"
            ),
          })
        : program
    );
    const error = await Effect.runPromise(
      projectCurriculumRoutes({ curricula, materials, programs: changed }).pipe(
        Effect.flip
      )
    );

    expect(error).toMatchObject({ code: "translation", value: "id" });
  });
});

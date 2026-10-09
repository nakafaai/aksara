import { describe, expect, it } from "@effect/vitest";
import { LearningProgramSchema } from "@nakafa/aksara-contracts/program/spec";
import { Array as Arr, Effect, HashSet, Option, Schema } from "effect";
import { CurriculumRouteError } from "#corpus/curriculum/ownership";
import { projectCurriculumRoutes } from "#corpus/curriculum/route";
import { decodeCurriculumCatalog } from "#corpus/curriculum/source";
import { decodeMaterialSources } from "#corpus/material/source";
import { decodeProgramCatalog } from "#corpus/program/catalog";

/** Loads the complete source inputs shared by curriculum route tests. */
const loadRouteInputs = Effect.fn(
  "AksaraCorpus.test.loadCurriculumRouteInputs"
)(function* () {
  const [curricula, materials, programs] = yield* Effect.all([
    decodeCurriculumCatalog(),
    decodeMaterialSources(),
    decodeProgramCatalog(),
  ]);
  return { curricula, materials, programs } as const;
});

describe("curriculum route projection", () => {
  it.effect("projects the exact real localized route inventory", () =>
    Effect.gen(function* () {
      const inputs = yield* loadRouteInputs();
      const routes = yield* projectCurriculumRoutes(inputs);
      const roots = Arr.filter(
        routes,
        ({ parentPath }) => parentPath === undefined
      );
      const materialRoutes = Arr.filter(
        routes,
        ({ materialKey }) => materialKey !== undefined
      );

      expect(routes).toHaveLength(585);
      expect(roots).toHaveLength(12);
      expect(materialRoutes).toHaveLength(288);
      for (const locale of ["de", "en", "id"] as const) {
        expect(
          Arr.filter(routes, ({ appLocale }) => appLocale === locale)
        ).toHaveLength(195);
      }
      expect(Arr.filter(routes, ({ sitemap }) => sitemap)).toHaveLength(78);
      expect(
        HashSet.fromIterable(Arr.map(routes, ({ sourcePath }) => sourcePath))
      ).toEqual(
        HashSet.fromIterable<string>([
          "packages/corpus/curriculum/cambridge-international",
          "packages/corpus/curriculum/merdeka",
          "packages/corpus/curriculum/singapore-moe",
          "packages/corpus/curriculum/united-states",
        ])
      );
      expect(
        Option.getOrUndefined(
          Arr.findFirst(
            routes,
            ({ appLocale, programKey, publicPath }) =>
              appLocale === "en" &&
              programKey === "merdeka" &&
              publicPath.endsWith(
                "/mathematics/linear-equation-inequality/linear-equation-inequality"
              )
          )
        )
      ).toMatchObject({
        canonicalPath: "subjects/mathematics/linear-equation-inequality",
        materialContextNodeKey:
          "class-10-mathematics-linear-equation-inequality",
        materialContextParentPath: "curriculum/merdeka/class-10/mathematics",
        materialContextPublicPath:
          "curriculum/merdeka/class-10/mathematics/linear-equation-inequality",
        materialKey: "lesson.mathematics.linear-equation-inequality",
      });
    })
  );

  it.effect("rejects a curriculum without a matching program", () =>
    Effect.gen(function* () {
      const { curricula, materials, programs } = yield* loadRouteInputs();
      const error = yield* projectCurriculumRoutes({
        curricula,
        materials,
        programs: Arr.filter(
          programs,
          ({ key }) => key !== curricula[0]?.programKey
        ),
      }).pipe(Effect.flip);

      expect(error).toBeInstanceOf(CurriculumRouteError);
      expect(error).toMatchObject({ code: "program" });
    })
  );

  it.effect("rejects a curriculum-tree program without its source tree", () =>
    Effect.gen(function* () {
      const { curricula, materials, programs } = yield* loadRouteInputs();
      const error = yield* projectCurriculumRoutes({
        curricula: curricula.slice(1),
        materials,
        programs,
      }).pipe(Effect.flip);

      expect(error).toMatchObject({ code: "curriculum" });
    })
  );

  it.effect("rejects a curriculum program without one active translation", () =>
    Effect.gen(function* () {
      const { curricula, materials, programs } = yield* loadRouteInputs();
      const programKey = curricula[0]?.programKey;
      const changed = Arr.map(programs, (program) =>
        program.key === programKey
          ? Schema.decodeUnknownSync(LearningProgramSchema)({
              ...program,
              translations: Arr.filter(
                program.translations,
                ({ appLocale }) => appLocale !== "id"
              ),
            })
          : program
      );
      const error = yield* projectCurriculumRoutes({
        curricula,
        materials,
        programs: changed,
      }).pipe(Effect.flip);

      expect(error).toMatchObject({ code: "translation", value: "id" });
    })
  );
});

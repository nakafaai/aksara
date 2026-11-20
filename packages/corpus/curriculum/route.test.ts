import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { LearningProgramSchema } from "@nakafa/aksara-contracts/program/spec";
import { Array as Arr, Effect, HashSet, Option, Schema } from "effect";
import { CurriculumRouteError } from "#corpus/curriculum/ownership";
import { projectCurriculumRoutes } from "#corpus/curriculum/route";
import { decodeCurriculumCatalog } from "#corpus/curriculum/source";
import { decodeMaterialSources } from "#corpus/material/source";
import { decodeProgramCatalog } from "#corpus/program/catalog";
import { CHECKOUT_ROOT } from "#corpus/test/root";

/** Loads the complete source inputs shared by curriculum route tests. */
const loadRouteInputs = Effect.fn(
  "AksaraCorpus.test.loadCurriculumRouteInputs"
)(function* () {
  const [curricula, materials, programs] = yield* Effect.all([
    decodeCurriculumCatalog(),
    decodeMaterialSources({ checkoutRoot: CHECKOUT_ROOT }),
    decodeProgramCatalog(),
  ]);
  return { curricula, materials, programs } as const;
});

layer(NodeServices.layer)("curriculum route projection", (it) => {
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

      const sitemapRoutes = Arr.filter(routes, ({ sitemap }) => sitemap);
      const locales = ["de", "en", "id", "ms"] as const;
      expect(roots).toHaveLength(28);
      for (const locale of locales) {
        for (const share of [routes, materialRoutes, sitemapRoutes]) {
          expect(
            Arr.filter(share, ({ appLocale }) => appLocale === locale)
          ).toHaveLength(share.length / locales.length);
        }
      }
      expect(
        HashSet.fromIterable(Arr.map(routes, ({ sourcePath }) => sourcePath))
      ).toEqual(
        HashSet.fromIterable<string>([
          "packages/corpus/curriculum/cambridge-international",
          "packages/corpus/curriculum/gymnasiale-oberstufe",
          "packages/corpus/curriculum/kssm",
          "packages/corpus/curriculum/merdeka",
          "packages/corpus/curriculum/singapore-moe",
          "packages/corpus/curriculum/studienkolleg",
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
        curricula: Arr.drop(curricula, 1),
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

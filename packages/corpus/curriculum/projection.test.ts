import { describe, expect, it } from "@effect/vitest";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";

import { CurriculumProjectionError } from "#corpus/curriculum/material";
import { projectCurriculumNodes } from "#corpus/curriculum/projection";
import {
  type CurriculumMaterialInput,
  CurriculumSourceSchema,
} from "#corpus/curriculum/schema";
import { decodeCurriculumCatalog } from "#corpus/curriculum/source";
import {
  decodeMaterialDomains,
  MaterialDomainMissingError,
} from "#corpus/material/domain";
import type { LessonMaterialSource } from "#corpus/material/schema";
import { decodeMaterialSources } from "#corpus/material/source";
import { earthScienceMaterialSource } from "#corpus/test/material";

/** Projects one present material display fixture through its source locale. */
function materialDisplay(
  material: LessonMaterialSource,
  locale: AppLocaleCode
) {
  return Effect.gen(function* () {
    const routeSlug = yield* Effect.fromNullishOr(material.routeSlugs[locale]);
    const copy = yield* Effect.fromNullishOr(material.translations[locale]);
    return { routeSlug, title: copy.title };
  });
}

/** Decodes one real-identity curriculum leaf for failure-path verification. */
function merdekaLeaf(
  input: Pick<CurriculumMaterialInput, "displayOverride" | "materialKeys">
) {
  return Schema.decodeEffect(CurriculumSourceSchema)({
    programKey: "merdeka",
    tree: [
      {
        ...(input.displayOverride === undefined
          ? {}
          : { displayOverride: input.displayOverride }),
        key: "class-10-mathematics-linear-equation-inequality",
        level: "lesson",
        materialKeys: input.materialKeys,
        order: 10,
      },
    ],
  });
}

const matrixKey = "lesson.mathematics.matrix";
const missingKey = "lesson.mathematics.not-in-catalog";
const polynomialKey = "lesson.mathematics.polynomial";
const invalidOwnershipCases = [
  ["material", { materialKeys: [missingKey] }],
  ["multi-material", { materialKeys: [matrixKey, polynomialKey] }],
  ["material", { materialKeys: [matrixKey, missingKey] }],
] as const;

describe("curriculum node projection", () => {
  it.effect(
    "flattens all four real trees and validates every material reference",
    () =>
      Effect.gen(function* () {
        const [curricula, materials] = yield* Effect.all([
          decodeCurriculumCatalog(),
          decodeMaterialSources(),
        ]);
        const nodes = yield* projectCurriculumNodes(curricula, materials);
        const materialNodes = nodes.filter(
          ({ materialKeys }) => materialKeys.length > 0
        );

        expect(nodes).toHaveLength(191);
        expect(materialNodes).toHaveLength(96);
        expect(
          nodes.every(
            ({ displayGroup, materialCard, translations }) =>
              translations.de !== undefined &&
              (displayGroup === undefined || displayGroup.de !== undefined) &&
              (materialCard === undefined || materialCard.de !== undefined)
          )
        ).toBe(true);
        expect(
          new Set(materialNodes.flatMap(({ materialKeys }) => materialKeys))
        ).toHaveProperty("size", 34);
        expect(nodes.at(0)).toMatchObject({
          curriculumKey: "cambridge-international",
          key: "early-years",
          parentKey: undefined,
        });
      })
  );

  it.effect.each(invalidOwnershipCases)(
    "rejects invalid %s ownership",
    ([code, input]) =>
      Effect.gen(function* () {
        const [curriculum, materials] = yield* Effect.all([
          merdekaLeaf(input),
          decodeMaterialSources(),
        ]);
        const error = yield* projectCurriculumNodes(
          [curriculum],
          materials
        ).pipe(Effect.flip);
        expect(error).toBeInstanceOf(CurriculumProjectionError);
        expect(error).toMatchObject({ code });
      })
  );

  it.effect(
    "rejects a single-material override that duplicates source copy",
    () =>
      Effect.gen(function* () {
        const materials = yield* decodeMaterialSources();
        const material = yield* Effect.fromNullishOr(
          materials.find(({ key }) => key === matrixKey)
        );
        const [english, indonesian] = yield* Effect.all([
          materialDisplay(material, "en"),
          materialDisplay(material, "id"),
        ]);
        const curriculum = yield* merdekaLeaf({
          displayOverride: { en: english, id: indonesian },
          materialKeys: [material.key],
        });
        const error = yield* projectCurriculumNodes(
          [curriculum],
          materials
        ).pipe(Effect.flip);
        expect(error).toMatchObject({ code: "display" });
      })
  );

  it.effect(
    "rejects a locale route without matching material display copy",
    () =>
      Effect.gen(function* () {
        const materials = yield* decodeMaterialSources();
        const material = yield* Effect.fromNullishOr(
          materials.find(({ key }) => key === matrixKey)
        );
        const [english, indonesian] = yield* Effect.all([
          Effect.fromNullishOr(material.translations.en),
          Effect.fromNullishOr(material.translations.id),
        ]);
        const mismatched = {
          ...material,
          translations: { en: english, id: indonesian },
        };
        const curriculum = yield* merdekaLeaf({
          materialKeys: [material.key],
        });
        const error = yield* projectCurriculumNodes(
          [curriculum],
          [mismatched]
        ).pipe(Effect.flip);
        expect(error).toMatchObject({ code: "display", value: material.key });
      })
  );

  it.effect("uses explicit source copy for a multi-material leaf", () =>
    Effect.gen(function* () {
      const materials = yield* decodeMaterialSources();
      const [matrix, polynomial] = yield* Effect.all([
        Effect.fromNullishOr(materials.find(({ key }) => key === matrixKey)),
        Effect.fromNullishOr(
          materials.find(({ key }) => key === polynomialKey)
        ),
      ]);
      const [english, indonesian] = yield* Effect.all([
        materialDisplay(matrix, "en"),
        materialDisplay(matrix, "id"),
      ]);
      const displayOverride = { en: english, id: indonesian };
      const curriculum = yield* merdekaLeaf({
        displayOverride,
        materialKeys: [matrix.key, polynomial.key],
      });
      const [node] = yield* projectCurriculumNodes([curriculum], materials);
      expect(node?.translations).toEqual(displayOverride);
    })
  );

  it.effect(
    "projects a generic material domain from one reviewed descriptor",
    () =>
      Effect.gen(function* () {
        const material = earthScienceMaterialSource();
        const curriculum = yield* merdekaLeaf({
          materialKeys: [material.key],
        });
        const domains = yield* decodeMaterialDomains([
          {
            key: "earth-science",
            rendererDomain: "physics",
            routeSlugs: { en: "earth-science", id: "ilmu-bumi" },
          },
        ]);
        const [node] = yield* projectCurriculumNodes(
          [curriculum],
          [material],
          domains
        );
        expect(node?.materialDomain).toBe("earth-science");
      })
  );

  it.effect("rejects a curriculum material with no domain descriptor", () =>
    Effect.gen(function* () {
      const material = earthScienceMaterialSource();
      const curriculum = yield* merdekaLeaf({
        materialKeys: [material.key],
      });
      const error = yield* projectCurriculumNodes(
        [curriculum],
        [material],
        []
      ).pipe(Effect.flip);

      expect(error).toBeInstanceOf(MaterialDomainMissingError);
      expect(error).toMatchObject({
        key: "earth-science",
        owner: "lesson.earth-science.geology",
      });
    })
  );

  it.effect(
    "rejects material ownership that conflicts with its curriculum domain",
    () =>
      Effect.gen(function* () {
        const material = earthScienceMaterialSource();
        const materials = yield* decodeMaterialSources();
        const mathematics = yield* Effect.fromNullishOr(
          materials.find(({ key }) => key === matrixKey)
        );
        const mixedCurriculum = yield* merdekaLeaf({
          materialKeys: [material.key, mathematics.key],
        });
        const curriculum = yield* Schema.decodeEffect(CurriculumSourceSchema)({
          programKey: "merdeka",
          tree: [
            {
              children: [
                {
                  key: "class-10-earth-science-geology",
                  level: "lesson",
                  materialKeys: [material.key],
                  order: 1,
                },
              ],
              key: "class-10-mathematics",
              level: "subject",
              materialDomain: "mathematics",
              order: 1,
              translations: {
                en: { routeSlug: "mathematics", title: "Mathematics" },
                id: { routeSlug: "matematika", title: "Matematika" },
              },
            },
          ],
        });
        const domains = yield* decodeMaterialDomains([
          {
            key: "earth-science",
            rendererDomain: "physics",
            routeSlugs: { en: "earth-science", id: "ilmu-bumi" },
          },
          {
            key: "mathematics",
            rendererDomain: "mathematics",
            routeSlugs: { en: "mathematics", id: "matematika" },
          },
        ]);
        const [mixedError, inheritedError] = yield* Effect.all([
          projectCurriculumNodes(
            [mixedCurriculum],
            [material, mathematics],
            domains
          ).pipe(Effect.flip),
          projectCurriculumNodes([curriculum], [material], domains).pipe(
            Effect.flip
          ),
        ]);

        expect(mixedError).toMatchObject({
          _tag: "CurriculumProjectionError",
          code: "domain",
          value: "earth-science:mathematics",
        });
        expect(inheritedError).toMatchObject({
          _tag: "CurriculumProjectionError",
          code: "domain",
          value: "mathematics:earth-science",
        });
      })
  );
});

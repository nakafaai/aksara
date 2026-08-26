import { describe, expect, it } from "@effect/vitest";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";

import { CurriculumProjectionError } from "#corpus/curriculum/material";
import { projectCurriculumNodes } from "#corpus/curriculum/projection";
import { CurriculumSourceSchema } from "#corpus/curriculum/schema";
import { decodeCurriculumCatalog } from "#corpus/curriculum/source";
import {
  decodeMaterialDomains,
  MaterialDomainMissingError,
} from "#corpus/material/domain";
import type { LessonMaterialSource } from "#corpus/material/schema";
import { decodeMaterialSources } from "#corpus/material/source";
import { earthScienceMaterialSource } from "#corpus/test/material";

/** Returns required decoded source copy or fails the test setup explicitly. */
function requireCopy<Value>(value: Value | undefined, label: string): Value {
  if (value === undefined) {
    throw new Error(`Expected ${label}.`);
  }
  return value;
}

/** Projects one present material display fixture through its source locale. */
function materialDisplay(
  material: LessonMaterialSource,
  locale: AppLocaleCode
) {
  const routeSlug = requireCopy(material.routeSlugs[locale], "route slug");
  const copy = requireCopy(material.translations[locale], "material copy");
  return { routeSlug, title: copy.title };
}

/** Decodes one real-identity curriculum leaf for failure-path verification. */
function merdekaLeaf(input: {
  readonly displayOverride?: unknown;
  readonly materialKeys: readonly string[];
}) {
  return Schema.decodeUnknownSync(CurriculumSourceSchema)({
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

describe("curriculum node projection", () => {
  it("flattens all four real trees and validates every material reference", async () => {
    const [curricula, materials] = await Effect.runPromise(
      Effect.all([decodeCurriculumCatalog(), decodeMaterialSources()])
    );
    const nodes = await Effect.runPromise(
      projectCurriculumNodes(curricula, materials)
    );
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
  });

  it.each([
    [
      "material",
      merdekaLeaf({
        materialKeys: ["lesson.mathematics.not-in-catalog"],
      }),
    ],
    [
      "multi-material",
      merdekaLeaf({
        materialKeys: [
          "lesson.mathematics.matrix",
          "lesson.mathematics.polynomial",
        ],
      }),
    ],
    [
      "material",
      merdekaLeaf({
        materialKeys: [
          "lesson.mathematics.matrix",
          "lesson.mathematics.not-in-catalog",
        ],
      }),
    ],
  ])("rejects invalid %s ownership", async (code, curriculum) => {
    const materials = await Effect.runPromise(decodeMaterialSources());
    const error = await Effect.runPromise(
      projectCurriculumNodes([curriculum], materials).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(CurriculumProjectionError);
    expect(error).toMatchObject({ code });
  });

  it("rejects a single-material override that duplicates source copy", async () => {
    const materials = await Effect.runPromise(decodeMaterialSources());
    const material = materials.find(
      ({ key }) => key === "lesson.mathematics.matrix"
    );

    if (material === undefined) {
      throw new Error("Expected the matrix material source.");
    }
    const curriculum = merdekaLeaf({
      displayOverride: {
        en: materialDisplay(material, "en"),
        id: materialDisplay(material, "id"),
      },
      materialKeys: [material.key],
    });
    const error = await Effect.runPromise(
      projectCurriculumNodes([curriculum], materials).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ code: "display" });
  });

  it("rejects a locale route without matching material display copy", async () => {
    const materials = await Effect.runPromise(decodeMaterialSources());
    const material = materials.find(
      ({ key }) => key === "lesson.mathematics.matrix"
    );
    if (material === undefined) {
      throw new Error("Expected the matrix material source.");
    }
    const mismatched = {
      ...material,
      translations: {
        en: requireCopy(material.translations.en, "English material copy"),
        id: requireCopy(material.translations.id, "Indonesian material copy"),
      },
    };
    const curriculum = merdekaLeaf({ materialKeys: [material.key] });
    const error = await Effect.runPromise(
      projectCurriculumNodes([curriculum], [mismatched]).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ code: "display", value: material.key });
  });

  it("uses explicit source copy for a multi-material leaf", async () => {
    const materials = await Effect.runPromise(decodeMaterialSources());
    const matrix = materials.find(
      ({ key }) => key === "lesson.mathematics.matrix"
    );
    const polynomial = materials.find(
      ({ key }) => key === "lesson.mathematics.polynomial"
    );

    if (!(matrix && polynomial)) {
      throw new Error("Expected matrix and polynomial material sources.");
    }
    const displayOverride = {
      en: materialDisplay(matrix, "en"),
      id: materialDisplay(matrix, "id"),
    };
    const curriculum = merdekaLeaf({
      displayOverride,
      materialKeys: [matrix.key, polynomial.key],
    });
    const [node] = await Effect.runPromise(
      projectCurriculumNodes([curriculum], materials)
    );

    expect(node?.translations).toEqual(displayOverride);
  });

  it("projects a generic material domain from one reviewed descriptor", async () => {
    const material = earthScienceMaterialSource();
    const curriculum = merdekaLeaf({ materialKeys: [material.key] });
    const domains = await Effect.runPromise(
      decodeMaterialDomains([
        {
          key: "earth-science",
          rendererDomain: "physics",
          routeSlugs: { en: "earth-science", id: "ilmu-bumi" },
        },
      ])
    );
    const [node] = await Effect.runPromise(
      projectCurriculumNodes([curriculum], [material], domains)
    );

    expect(node?.materialDomain).toBe("earth-science");
  });

  it("rejects a curriculum material with no domain descriptor", async () => {
    const material = earthScienceMaterialSource();
    const curriculum = merdekaLeaf({ materialKeys: [material.key] });
    const error = await Effect.runPromise(
      projectCurriculumNodes([curriculum], [material], []).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(MaterialDomainMissingError);
    expect(error).toMatchObject({
      key: "earth-science",
      owner: "lesson.earth-science.geology",
    });
  });

  it("rejects material ownership that conflicts with its curriculum domain", async () => {
    const material = earthScienceMaterialSource();
    const materials = await Effect.runPromise(decodeMaterialSources());
    const mathematics = materials.find(
      ({ key }) => key === "lesson.mathematics.matrix"
    );
    expect(mathematics).toBeDefined();
    if (!mathematics) {
      return;
    }
    const mixedCurriculum = merdekaLeaf({
      materialKeys: [material.key, mathematics.key],
    });
    const curriculum = Schema.decodeSync(CurriculumSourceSchema)({
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
    const domains = await Effect.runPromise(
      decodeMaterialDomains([
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
      ])
    );
    const [mixedError, inheritedError] = await Effect.runPromise(
      Effect.all([
        projectCurriculumNodes(
          [mixedCurriculum],
          [material, mathematics],
          domains
        ).pipe(Effect.flip),
        projectCurriculumNodes([curriculum], [material], domains).pipe(
          Effect.flip
        ),
      ])
    );

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
  });
});

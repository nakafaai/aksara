import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  CurriculumProjectionError,
  projectCurriculumNodes,
} from "#corpus/curriculum/projection";
import { CurriculumSourceSchema } from "#corpus/curriculum/schema";
import { decodeCurriculumCatalog } from "#corpus/curriculum/source";
import { decodeMaterialSources } from "#corpus/material/source";

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

    expect(material).toBeDefined();
    if (!material) {
      return;
    }
    const curriculum = merdekaLeaf({
      displayOverride: {
        en: {
          routeSlug: material.routeSlugs.en,
          title: material.translations.en.title,
        },
        id: {
          routeSlug: material.routeSlugs.id,
          title: material.translations.id.title,
        },
      },
      materialKeys: [material.key],
    });
    const error = await Effect.runPromise(
      projectCurriculumNodes([curriculum], materials).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ code: "display" });
  });

  it("uses explicit source copy for a multi-material leaf", async () => {
    const materials = await Effect.runPromise(decodeMaterialSources());
    const matrix = materials.find(
      ({ key }) => key === "lesson.mathematics.matrix"
    );
    const polynomial = materials.find(
      ({ key }) => key === "lesson.mathematics.polynomial"
    );

    expect(matrix).toBeDefined();
    expect(polynomial).toBeDefined();
    if (!(matrix && polynomial)) {
      return;
    }
    const displayOverride = {
      en: {
        routeSlug: matrix.routeSlugs.en,
        title: matrix.translations.en.title,
      },
      id: {
        routeSlug: matrix.routeSlugs.id,
        title: matrix.translations.id.title,
      },
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
});

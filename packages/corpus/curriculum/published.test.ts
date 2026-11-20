import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Array as Arr, Effect, HashSet, Schema } from "effect";

import { projectCurriculumNodes } from "#corpus/curriculum/projection";
import { CurriculumSourceSchema } from "#corpus/curriculum/schema";
import { decodeCurriculumCatalog } from "#corpus/curriculum/source";
import { decodeMaterialSources } from "#corpus/material/source";
import { citedOutcomes } from "#corpus/test/curriculum";
import { findMaterial } from "#corpus/test/material";
import { CHECKOUT_ROOT } from "#corpus/test/root";

const matrixKey = "lesson.mathematics.matrix";

layer(NodeServices.layer)("published curriculum tree", (it) => {
  it.effect(
    "publishes no class, subject, or unit without a lesson below it",
    () =>
      Effect.gen(function* () {
        const materials = yield* decodeMaterialSources({
          checkoutRoot: CHECKOUT_ROOT,
        });
        const material = yield* findMaterial(materials, matrixKey);
        /** One structure node of the fixture tree with an English and an Indonesian title. */
        const structure = (
          key: string,
          level: "class" | "subject" | "unit",
          children: readonly unknown[]
        ) => ({
          children,
          key,
          level,
          order: 1,
          translations: {
            en: { routeSlug: key, title: key },
            id: { routeSlug: key, title: key },
          },
        });
        const curriculum = yield* Schema.decodeUnknownEffect(
          CurriculumSourceSchema
        )({
          programKey: "merdeka",
          tree: [
            structure("class-1", "class", []),
            structure("class-10", "class", [
              {
                ...structure("class-10-mathematics", "subject", [
                  structure("class-10-mathematics-planned", "unit", []),
                  structure("class-10-mathematics-matrix", "unit", [
                    {
                      key: "class-10-mathematics-matrix-lesson",
                      level: "lesson",
                      materialKeys: [material.key],
                      order: 1,
                      outcomes: citedOutcomes,
                    },
                  ]),
                ]),
                materialDomain: "mathematics",
              },
            ]),
          ],
        });
        const nodes = yield* projectCurriculumNodes([curriculum], materials);

        expect(Arr.map(nodes, (node) => node.key)).toStrictEqual([
          "class-10",
          "class-10-mathematics",
          "class-10-mathematics-matrix",
          "class-10-mathematics-matrix-lesson",
        ]);
      })
  );

  it.effect("leaves no node of the real trees without a lesson below it", () =>
    Effect.gen(function* () {
      const [curricula, materials] = yield* Effect.all([
        decodeCurriculumCatalog(),
        decodeMaterialSources({ checkoutRoot: CHECKOUT_ROOT }),
      ]);
      const nodes = yield* projectCurriculumNodes(curricula, materials);
      const lessonNodes = Arr.filter(
        nodes,
        ({ materialKeys }) => materialKeys.length > 0
      );
      const filled = HashSet.fromIterable(
        Arr.flatMap(lessonNodes, ({ curriculumKey, path }) =>
          Arr.map(path, ({ key }) => `${curriculumKey}:${key}`)
        )
      );

      expect(
        Arr.filter(
          nodes,
          ({ curriculumKey, key }) =>
            !HashSet.has(filled, `${curriculumKey}:${key}`)
        )
      ).toStrictEqual([]);
    })
  );
});

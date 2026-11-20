import { describe, expect, it } from "@effect/vitest";
import { Effect, HashMap } from "effect";

import { resolveCurriculumMaterial } from "#corpus/curriculum/material";
import {
  classNode,
  defineCurriculum,
  materialNode,
} from "#corpus/curriculum/schema";
import { decodeMaterialDomains } from "#corpus/material/domain";
import { citedOutcomes } from "#corpus/test/curriculum";
import { lessonMaterialSource } from "#corpus/test/material";

describe("curriculum material", () => {
  it.effect(
    "derives complete German display copy from one localized material",
    () =>
      Effect.gen(function* () {
        const material = lessonMaterialSource();
        const node = materialNode({
          key: "localized-material",
          level: "lesson",
          materialKeys: [material.key],
          order: 1,
          outcomes: citedOutcomes,
        });
        const curriculum = yield* defineCurriculum({
          programKey: "merdeka",
          tree: [
            classNode({
              children: [node],
              key: "class-11",
              levelBand: "upper-secondary",
              order: 1,
              translations: {
                en: { routeSlug: "class-11", title: "Class 11" },
                id: { routeSlug: "kelas-11", title: "Kelas 11" },
              },
            }),
          ],
        });
        const [decodedClass] = curriculum.tree;
        const [decodedNode] =
          decodedClass !== undefined && "children" in decodedClass
            ? (decodedClass.children ?? [])
            : [];
        expect(decodedNode).toBeDefined();
        if (decodedNode === undefined || !("materialKeys" in decodedNode)) {
          return;
        }
        const domains = yield* decodeMaterialDomains();
        const projected = yield* resolveCurriculumMaterial(
          curriculum,
          decodedNode,
          HashMap.make([material.key, material]),
          domains,
          undefined
        );

        expect(projected.translations.de).toEqual({
          routeSlug: "funktionskomposition-und-umkehrfunktion",
          title: "Funktionskomposition und Umkehrfunktion",
        });
      })
  );
});

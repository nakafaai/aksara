import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { resolveCurriculumMaterial } from "#corpus/curriculum/material";
import { defineCurriculum, materialNode } from "#corpus/curriculum/schema";
import { decodeMaterialDomains } from "#corpus/material/domain";
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
        });
        const curriculum = yield* defineCurriculum({
          programKey: "merdeka",
          tree: [node],
        });
        const [decodedNode] = curriculum.tree;
        expect(decodedNode).toBeDefined();
        if (decodedNode === undefined || !("materialKeys" in decodedNode)) {
          return;
        }
        const domains = yield* decodeMaterialDomains();
        const projected = yield* resolveCurriculumMaterial(
          curriculum,
          decodedNode,
          new Map([[material.key, material]]),
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

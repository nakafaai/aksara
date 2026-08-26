import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { resolveCurriculumMaterial } from "#corpus/curriculum/material";
import { defineCurriculum, materialNode } from "#corpus/curriculum/schema";
import { decodeMaterialDomains } from "#corpus/material/domain";
import { lessonMaterialSource } from "#corpus/test/material";

describe("curriculum material", () => {
  it("derives complete German display copy from one localized material", async () => {
    const material = lessonMaterialSource();
    const node = materialNode({
      key: "localized-material",
      level: "lesson",
      materialKeys: [material.key],
      order: 1,
    });
    const curriculum = await Effect.runPromise(
      defineCurriculum({ programKey: "merdeka", tree: [node] })
    );
    const [decodedNode] = curriculum.tree;
    if (decodedNode === undefined || !("materialKeys" in decodedNode)) {
      throw new Error("Expected one decoded curriculum material node.");
    }
    const domains = await Effect.runPromise(decodeMaterialDomains());
    const projected = await Effect.runPromise(
      resolveCurriculumMaterial(
        curriculum,
        decodedNode,
        new Map([[material.key, material]]),
        domains,
        undefined
      )
    );

    expect(projected.translations.de).toEqual({
      routeSlug: "funktionskomposition-und-umkehrfunktion",
      title: "Funktionskomposition und Umkehrfunktion",
    });
  });
});

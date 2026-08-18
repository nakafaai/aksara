import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { resolveCurriculumMaterial } from "#corpus/curriculum/material";
import { defineCurriculum, materialNode } from "#corpus/curriculum/schema";
import { addLocalizedSource } from "#corpus/locale/source";
import { decodeMaterialDomains } from "#corpus/material/domain";
import { PublicRouteSegmentSchema } from "#corpus/route/schema";
import {
  germanMaterialCatalog,
  lessonMaterialSource,
} from "#corpus/test/material";

describe("curriculum material", () => {
  it("derives complete overlay display copy from one localized material", async () => {
    const source = lessonMaterialSource();
    const [locale] = germanMaterialCatalog().sources;
    const german = AppLocaleSchema.make("de");
    const material = {
      ...source,
      routeSlugs: addLocalizedSource(
        source.routeSlugs,
        german,
        PublicRouteSegmentSchema.make(locale.routeSlug)
      ),
      translations: addLocalizedSource(
        source.translations,
        german,
        locale.translation
      ),
    };
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
      routeSlug: locale.routeSlug,
      title: locale.translation.title,
    });
  });
});

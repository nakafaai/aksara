import { describe, expect, it } from "@effect/vitest";
import { ActiveAppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { MaterialDomainSchema } from "@nakafa/aksara-contracts/material/domain";
import { Effect } from "effect";

import {
  decodeMaterialDomains,
  MaterialDomainCatalogError,
  MaterialDomainConflictError,
  MaterialDomainMissingError,
  materialDomainRoute,
  requireMaterialDomain,
} from "#corpus/material/domain";

const genericDomain = {
  key: "earth-science",
  rendererDomain: "physics",
  routeSlugs: { en: "earth-science", id: "ilmu-bumi" },
};

/** Returns one descriptor failure for native Effect test composition. */
function rejectDomains(input: unknown) {
  return decodeMaterialDomains(input).pipe(Effect.flip);
}

describe("material domain registry", () => {
  it.effect(
    "owns the exact current corpus inventory outside the public contract",
    () =>
      Effect.gen(function* () {
        const descriptors = yield* decodeMaterialDomains();

        expect(descriptors.map(({ key }) => key)).toEqual([
          "ai-ds",
          "biology",
          "chemistry",
          "mathematics",
          "physics",
        ]);
        expect(
          descriptors.map(({ key, navigationIconKey }) => ({
            key,
            navigationIconKey,
          }))
        ).toEqual([
          { key: "ai-ds", navigationIconKey: undefined },
          { key: "biology", navigationIconKey: "science" },
          { key: "chemistry", navigationIconKey: "science" },
          { key: "mathematics", navigationIconKey: "mathematics" },
          { key: "physics", navigationIconKey: "science" },
        ]);
        expect(
          descriptors.map(({ key, routeSlugs }) => [key, routeSlugs.de])
        ).toEqual([
          ["ai-ds", "ki-und-data-science"],
          ["biology", "biologie"],
          ["chemistry", "chemie"],
          ["mathematics", "mathematik"],
          ["physics", "physik"],
        ]);
      })
  );

  it.effect("accepts a generic domain through one descriptor", () =>
    Effect.gen(function* () {
      const descriptors = yield* decodeMaterialDomains([genericDomain]);
      const [domain] = descriptors;
      expect(domain).toBeDefined();
      if (!domain) {
        return;
      }
      const descriptor = yield* requireMaterialDomain(
        descriptors,
        domain.key,
        "test-source"
      );

      expect(descriptor.rendererDomain).toBe("physics");
      expect(
        materialDomainRoute(descriptor, ActiveAppLocaleSchema.make("id"))
      ).toBe("ilmu-bumi");
    })
  );

  it.effect("rejects malformed descriptor input", () =>
    Effect.gen(function* () {
      const error = yield* rejectDomains([
        { ...genericDomain, rendererDomain: "unknown-renderer" },
      ]);

      expect(error).toBeInstanceOf(MaterialDomainCatalogError);
    })
  );

  it.effect("rejects duplicate domain keys", () =>
    Effect.gen(function* () {
      const error = yield* rejectDomains([
        genericDomain,
        { ...genericDomain, rendererDomain: "mathematics" },
      ]);

      expect(error).toBeInstanceOf(MaterialDomainConflictError);
      expect(error).toMatchObject({ code: "key", key: "earth-science" });
    })
  );

  it.effect("rejects duplicate localized domain routes", () =>
    Effect.gen(function* () {
      const error = yield* rejectDomains([
        genericDomain,
        {
          key: "geology",
          rendererDomain: "physics",
          routeSlugs: { en: "earth-science", id: "geologi" },
        },
      ]);

      expect(error).toBeInstanceOf(MaterialDomainConflictError);
      expect(error).toMatchObject({
        code: "route",
        key: "geology",
        value: "en:earth-science:earth-science",
      });
    })
  );

  it.effect("preserves an unknown source owner as a typed failure", () =>
    Effect.gen(function* () {
      const descriptors = yield* decodeMaterialDomains([]);
      const error = yield* requireMaterialDomain(
        descriptors,
        MaterialDomainSchema.make(genericDomain.key),
        "lesson.earth-science.geology"
      ).pipe(Effect.flip);

      expect(error).toBeInstanceOf(MaterialDomainMissingError);
      expect(error).toMatchObject({
        key: "earth-science",
        owner: "lesson.earth-science.geology",
      });
    })
  );
});

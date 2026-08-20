import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import { decodeMaterialDomains } from "#corpus/material/domain";
import { decodeMaterialLocaleCatalog } from "#corpus/material/locale";
import {
  composeCompleteMaterialLocaleCatalog,
  composeMaterialLocaleCatalog,
  MaterialLocaleCatalogOwnershipError,
  validateMaterialLocaleCatalog,
} from "#corpus/material/locale-catalog";
import {
  germanMaterialCatalog,
  lessonMaterialSource,
} from "#corpus/test/material";

/** Resolves the one real descriptor used by the representative material. */
async function mathematicsDomain() {
  const descriptors = await Effect.runPromise(decodeMaterialDomains());
  const descriptor = descriptors.find(({ key }) => key === "mathematics");
  if (descriptor === undefined) {
    throw new Error("Expected the mathematics material domain.");
  }
  return descriptor;
}

describe("material locale catalog ownership", () => {
  it("validates and composes one complete locale inventory", async () => {
    const descriptor = await mathematicsDomain();
    const source = lessonMaterialSource();
    const catalog = await Effect.runPromise(
      decodeMaterialLocaleCatalog([descriptor], germanMaterialCatalog())
    );

    await expect(
      Effect.runPromise(
        validateMaterialLocaleCatalog({
          catalog,
          descriptors: [descriptor],
          sources: [source],
        })
      )
    ).resolves.toEqual(catalog);
    await expect(
      Effect.runPromise(
        composeCompleteMaterialLocaleCatalog({
          appLocale: "de",
          catalog,
          descriptors: [descriptor],
          sources: [source],
        })
      )
    ).resolves.toMatchObject({
      domains: [{ routeSlugs: { de: "mathematik" } }],
      sources: [
        {
          translations: {
            de: { title: "Funktionskomposition und Umkehrfunktion" },
          },
        },
      ],
    });
    await expect(
      Effect.runPromise(
        composeMaterialLocaleCatalog({
          appLocales: [AppLocaleSchema.make("en")],
          catalog,
          descriptors: [descriptor],
          sources: [source],
        })
      )
    ).resolves.toEqual({ domains: [descriptor], sources: [source] });
  });

  it("rejects every duplicate, orphan, and missing owner", async () => {
    const descriptor = await mathematicsDomain();
    const source = lessonMaterialSource();
    const catalog = await Effect.runPromise(
      decodeMaterialLocaleCatalog([descriptor], germanMaterialCatalog())
    );
    const failures = await Effect.runPromise(
      Effect.all([
        validateMaterialLocaleCatalog({
          catalog: {
            ...catalog,
            domains: [...catalog.domains, ...catalog.domains],
          },
          descriptors: [descriptor],
          sources: [source],
        }).pipe(Effect.flip),
        validateMaterialLocaleCatalog({
          catalog: {
            ...catalog,
            sources: [...catalog.sources, ...catalog.sources],
          },
          descriptors: [descriptor],
          sources: [source],
        }).pipe(Effect.flip),
        validateMaterialLocaleCatalog({
          catalog,
          descriptors: [],
          sources: [source],
        }).pipe(Effect.flip),
        validateMaterialLocaleCatalog({
          catalog,
          descriptors: [descriptor],
          sources: [],
        }).pipe(Effect.flip),
        composeCompleteMaterialLocaleCatalog({
          appLocale: "de",
          catalog: { ...catalog, domains: [] },
          descriptors: [descriptor],
          sources: [source],
        }).pipe(Effect.flip),
        composeCompleteMaterialLocaleCatalog({
          appLocale: "de",
          catalog: { ...catalog, sources: [] },
          descriptors: [descriptor],
          sources: [source],
        }).pipe(Effect.flip),
      ])
    );

    expect(failures).toEqual([
      expect.objectContaining({ reason: "duplicate", scope: "domain" }),
      expect.objectContaining({ reason: "duplicate", scope: "material" }),
      expect.objectContaining({ reason: "orphan", scope: "domain" }),
      expect.objectContaining({ reason: "orphan", scope: "material" }),
      expect.objectContaining({ reason: "missing", scope: "domain" }),
      expect.objectContaining({ reason: "missing", scope: "material" }),
    ]);
    expect(
      failures.every(
        (error) => error instanceof MaterialLocaleCatalogOwnershipError
      )
    ).toBe(true);
  });
});

import { MaterialDomainSchema } from "@nakafa/aksara-contracts/material/domain";
import { MaterialKeySchema } from "@nakafa/aksara-contracts/projection/material";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { decodeMaterialDomains } from "#corpus/material/domain";
import {
  composeMaterialLocaleDomain,
  composeMaterialLocaleSource,
  decodeMaterialLocaleCatalog,
  requireMaterialLocaleBinding,
} from "#corpus/material/locale";
import {
  germanMaterialCatalog,
  lessonMaterialSource,
} from "#corpus/test/material";

/** Resolves the representative material domain from the real descriptor catalog. */
async function mathematicsDomain() {
  const descriptors = await Effect.runPromise(decodeMaterialDomains());
  const descriptor = descriptors.find(({ key }) => key === "mathematics");
  if (descriptor === undefined) {
    throw new Error("Expected the mathematics material domain.");
  }
  return descriptor;
}

describe("candidate material metadata", () => {
  it("composes exact German domain, material, and section ownership", async () => {
    const descriptor = await mathematicsDomain();
    const source = lessonMaterialSource();
    const catalog = await Effect.runPromise(
      decodeMaterialLocaleCatalog([descriptor], germanMaterialCatalog())
    );
    const binding = await Effect.runPromise(
      requireMaterialLocaleBinding(descriptor, source, catalog, "de")
    );

    expect(binding).toMatchObject({
      descriptor: {
        overlayAppLocale: "de",
        routeSlugs: { de: "mathematik" },
      },
      source: {
        overlayAppLocale: "de",
        routeSlugs: { de: "funktionskomposition-und-umkehrfunktion" },
        sections: [{ routeSlugs: { de: "funktionsbegriff" } }],
        translations: {
          de: { title: "Funktionskomposition und Umkehrfunktion" },
        },
      },
    });
  });

  it("derives German domain routes from the reviewed glossary", async () => {
    const descriptor = await mathematicsDomain();
    const catalog = await Effect.runPromise(
      decodeMaterialLocaleCatalog([descriptor])
    );

    expect(catalog.domains).toEqual([
      { appLocale: "de", key: "mathematics", routeSlug: "mathematik" },
    ]);
    expect(catalog.sources).toHaveLength(36);
    expect(catalog.sources).toContainEqual(
      expect.objectContaining({
        appLocale: "de",
        materialKey: "lesson.mathematics.function-composition-inverse-function",
      })
    );

    const [unknown] = await Effect.runPromise(
      decodeMaterialDomains([
        {
          key: "earth-science",
          rendererDomain: "physics",
          routeSlugs: { en: "earth-science", id: "ilmu-bumi" },
        },
      ])
    );
    if (unknown === undefined) {
      throw new Error("Expected one synthetic material domain.");
    }
    const error = await Effect.runPromise(
      decodeMaterialLocaleCatalog([unknown]).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ domain: "earth-science", scope: "domain" });
  });

  it("maps malformed metadata and exact owner gaps to typed failures", async () => {
    const descriptor = await mathematicsDomain();
    const source = lessonMaterialSource();
    const catalog = await Effect.runPromise(
      decodeMaterialLocaleCatalog([descriptor], germanMaterialCatalog())
    );
    const malformed = await Effect.runPromise(
      decodeMaterialLocaleCatalog([descriptor], null).pipe(Effect.flip)
    );
    const missingDomain = await Effect.runPromise(
      requireMaterialLocaleBinding(
        descriptor,
        source,
        { domains: [], sources: catalog.sources },
        "de"
      ).pipe(Effect.flip)
    );
    const missingMaterial = await Effect.runPromise(
      requireMaterialLocaleBinding(
        descriptor,
        source,
        { domains: catalog.domains, sources: [] },
        "de"
      ).pipe(Effect.flip)
    );

    expect(malformed._tag).toBe("MaterialLocaleCatalogError");
    expect(missingDomain).toMatchObject({ scope: "domain" });
    expect(missingMaterial).toMatchObject({ scope: "material" });
  });

  it("rejects foreign domain, material, and incomplete section overlays", async () => {
    const descriptor = await mathematicsDomain();
    const source = lessonMaterialSource();
    const catalog = await Effect.runPromise(
      decodeMaterialLocaleCatalog([descriptor], germanMaterialCatalog())
    );
    const [domainOverlay] = catalog.domains;
    const [materialOverlay] = catalog.sources;
    const [sectionOverlay] = materialOverlay?.sections ?? [];
    if (
      domainOverlay === undefined ||
      materialOverlay === undefined ||
      sectionOverlay === undefined
    ) {
      throw new Error("Expected one decoded German material overlay.");
    }
    const domain = await Effect.runPromise(
      composeMaterialLocaleDomain(descriptor, {
        ...domainOverlay,
        key: MaterialDomainSchema.make("physics"),
      }).pipe(Effect.flip)
    );
    const material = await Effect.runPromise(
      composeMaterialLocaleSource(source, {
        ...materialOverlay,
        materialKey: MaterialKeySchema.make(
          "lesson.mathematics.foreign-material"
        ),
      }).pipe(Effect.flip)
    );
    const missingSection = await Effect.runPromise(
      composeMaterialLocaleSource(source, {
        ...materialOverlay,
        sections: [],
      }).pipe(Effect.flip)
    );
    const duplicateSection = await Effect.runPromise(
      composeMaterialLocaleSource(source, {
        ...materialOverlay,
        sections: [sectionOverlay, sectionOverlay],
      }).pipe(Effect.flip)
    );

    expect(domain).toMatchObject({ domain: "physics", scope: "domain" });
    expect(material).toMatchObject({ scope: "material" });
    expect([missingSection, duplicateSection]).toEqual([
      expect.objectContaining({ scope: "section" }),
      expect.objectContaining({ scope: "section" }),
    ]);
  });
});

import {
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { decodePageRegistry, validatePageRoutes } from "#corpus/pages/registry";
import { germanPageSource, pageSource } from "#corpus/test/page";

const embeddedAppLocales = ActiveAppLocaleListSchema.make([
  AppLocaleSchema.make("en"),
  AppLocaleSchema.make("id"),
]);

/** Returns one typed registry failure at the Vitest runner boundary. */
function rejectRegistry(input: unknown, localeInput?: unknown) {
  return Effect.runPromise(
    decodePageRegistry(input, localeInput, embeddedAppLocales).pipe(Effect.flip)
  );
}

describe("public page registry", () => {
  it("projects every active locale from the stable source identities", async () => {
    const entries = await Effect.runPromise(decodePageRegistry());

    expect(entries).toHaveLength(12);
    expect(
      Object.fromEntries(
        ["en", "id", "de"].map((appLocale) => [
          appLocale,
          entries.filter((entry) => entry.route.appLocale === appLocale).length,
        ])
      )
    ).toEqual({ de: 4, en: 4, id: 4 });
    const englishImprint = entries.find(
      ({ route }) => route.appLocale === "en" && route.pageKey === "imprint"
    );
    expect(englishImprint).toMatchObject({
      delivery: "public",
      rendererDomain: "site",
      route: {
        contentKey: "pages/imprint",
        pageKey: "imprint",
        publicPath: "legal-notice",
      },
      sourcePath: "packages/corpus/pages/imprint/en.mdx",
      sourceRoot: "pages/imprint",
    });
  });

  it("projects permanent German overlays through the activation seam", async () => {
    const entries = await Effect.runPromise(
      decodePageRegistry(
        [pageSource()],
        [germanPageSource()],
        ActiveAppLocaleListSchema.make([AppLocaleSchema.make("de")])
      )
    );

    expect(entries).toEqual([
      expect.objectContaining({
        route: expect.objectContaining({
          appLocale: "de",
          publicPath: "privacy-policy",
        }),
        sourcePath: "packages/corpus/pages/privacy-policy/de.mdx",
      }),
    ]);
  });

  it("rejects duplicate page keys and locale route collisions", async () => {
    const duplicate = await rejectRegistry([pageSource(), pageSource()]);
    const collision = await rejectRegistry([
      pageSource(),
      pageSource({
        pageKey: "security-policy",
        sourceRoot: "pages/security-policy",
      }),
    ]);

    expect(duplicate).toMatchObject({
      _tag: "PageKeyDuplicateError",
      pageKey: "privacy-policy",
    });
    expect(collision).toMatchObject({
      _tag: "PageRouteCollisionError",
      appLocale: "en",
      conflictingContentKey: "pages/privacy-policy",
      contentKey: "pages/security-policy",
      publicPath: "privacy-policy",
    });
  });

  it("maps malformed catalogs and invalid projected paths to typed failures", async () => {
    const malformed = await rejectRegistry(null);
    const oversizedPageKey = "a".repeat(507);
    const invalid = pageSource({
      pageKey: oversizedPageKey,
      publicPaths: { en: "privacy-policy", id: "privacy-policy" },
      sourceRoot: `pages/${oversizedPageKey}`,
    });
    const invalidPath = await rejectRegistry([invalid]);

    expect(malformed._tag).toBe("PageCatalogError");
    expect(invalidPath._tag).toBe("PageRegistryError");
  });

  it("accepts repeated identical route ownership and an empty catalog", async () => {
    const [entry] = await Effect.runPromise(
      decodePageRegistry([pageSource()], undefined, embeddedAppLocales)
    );
    if (entry === undefined) {
      throw new Error("Expected one active page entry.");
    }

    await expect(
      Effect.runPromise(validatePageRoutes([entry, entry]))
    ).resolves.toEqual([entry, entry]);
    await expect(
      Effect.runPromise(decodePageRegistry([], undefined, embeddedAppLocales))
    ).resolves.toEqual([]);
  });
});

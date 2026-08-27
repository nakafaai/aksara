import { describe, expect, it } from "@effect/vitest";
import {
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect } from "effect";
import { decodePageRegistry, validatePageRoutes } from "#corpus/pages/registry";
import { pageSource } from "#corpus/test/page";

const englishIndonesianLocales = ActiveAppLocaleListSchema.make([
  AppLocaleSchema.make("en"),
  AppLocaleSchema.make("id"),
]);

/** Returns one typed registry failure through the native Effect test runtime. */
function rejectRegistry(input: unknown) {
  return decodePageRegistry(input, englishIndonesianLocales).pipe(Effect.flip);
}

describe("public page registry", () => {
  it.effect(
    "projects every active locale from the stable source identities",
    () =>
      Effect.gen(function* () {
        const entries = yield* decodePageRegistry();

        expect(entries).toHaveLength(12);
        expect(
          Object.fromEntries(
            ["en", "id", "de"].map((appLocale) => [
              appLocale,
              entries.filter((entry) => entry.route.appLocale === appLocale)
                .length,
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
      })
  );

  it.effect("projects every locale through the same source-owned map", () =>
    Effect.gen(function* () {
      const entries = yield* decodePageRegistry(
        [pageSource()],
        ActiveAppLocaleListSchema.make([AppLocaleSchema.make("de")])
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
    })
  );

  it.effect(
    "rejects duplicate page keys, source roots, and locale routes",
    () =>
      Effect.gen(function* () {
        const duplicate = yield* rejectRegistry([pageSource(), pageSource()]);
        const duplicateRoot = yield* rejectRegistry([
          pageSource(),
          pageSource({
            pageKey: "security-policy",
          }),
        ]);
        const collision = yield* rejectRegistry([
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
        expect(duplicateRoot).toMatchObject({
          _tag: "PageRootDuplicateError",
          sourceRoot: "pages/privacy-policy",
        });
        expect(collision).toMatchObject({
          _tag: "PageRouteCollisionError",
          appLocale: "en",
          conflictingContentKey: "pages/privacy-policy",
          contentKey: "pages/security-policy",
          publicPath: "privacy-policy",
        });
      })
  );

  it.effect(
    "maps malformed catalogs and invalid projected paths to typed failures",
    () =>
      Effect.gen(function* () {
        const malformed = yield* rejectRegistry(null);
        const oversizedPageKey = "a".repeat(507);
        const invalid = pageSource({
          pageKey: oversizedPageKey,
          sourceRoot: `pages/${oversizedPageKey}`,
        });
        const invalidPath = yield* rejectRegistry([invalid]);

        expect(malformed._tag).toBe("PageCatalogError");
        expect(invalidPath._tag).toBe("PageRegistryError");
      })
  );

  it.effect(
    "accepts repeated identical route ownership and an empty catalog",
    () =>
      Effect.gen(function* () {
        const [entry] = yield* decodePageRegistry(
          [pageSource()],
          englishIndonesianLocales
        );
        if (entry === undefined) {
          return yield* Effect.die("Expected one active page entry.");
        }

        expect(yield* validatePageRoutes([entry, entry])).toEqual([
          entry,
          entry,
        ]);
        expect(yield* decodePageRegistry([], englishIndonesianLocales)).toEqual(
          []
        );
      })
  );
});

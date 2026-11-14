import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import {
  ActiveAppLocaleListSchema,
  ActiveAppLocaleSchema,
  APP_LOCALE_CODES,
} from "@nakafa/aksara-contracts/locale";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Option,
  Order,
  Path,
  Record as Rec,
} from "effect";
import { decodePageRegistry, validatePageRoutes } from "#corpus/pages/registry";
import { pageSource } from "#corpus/test/page";

const englishIndonesianLocales = ActiveAppLocaleListSchema.make([
  ActiveAppLocaleSchema.make("en"),
  ActiveAppLocaleSchema.make("id"),
]);

/** Returns one typed registry failure through the native Effect test runtime. */
function rejectRegistry(input: unknown) {
  return decodePageRegistry(input, englishIndonesianLocales).pipe(Effect.flip);
}

describe("public page registry", () => {
  it.effect(
    "projects every active and carried locale from the stable source identities",
    () =>
      Effect.gen(function* () {
        const entries = yield* decodePageRegistry();

        expect(entries).toHaveLength(24);
        expect(
          Rec.fromEntries(
            Arr.map(["en", "id", "de", "ms"], (appLocale) => [
              appLocale,
              Arr.filter(
                entries,
                (entry) => entry.route.appLocale === appLocale
              ).length,
            ])
          )
        ).toEqual({ de: 6, en: 6, id: 6, ms: 6 });
        const englishImprint = Option.getOrUndefined(
          Arr.findFirst(
            entries,
            ({ route }) =>
              route.appLocale === "en" && route.pageKey === "imprint"
          )
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
        ActiveAppLocaleListSchema.make([ActiveAppLocaleSchema.make("de")])
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
    "publishes a declared locale that is not served yet once a page names its path",
    () =>
      Effect.gen(function* () {
        const source = pageSource();
        const entries = yield* decodePageRegistry(
          [
            {
              ...source,
              publicPaths: { ...source.publicPaths, ms: "dasar-privasi" },
            },
          ],
          ActiveAppLocaleListSchema.make([ActiveAppLocaleSchema.make("de")])
        );

        expect(
          Arr.map(entries, ({ route, sourcePath }) => [
            route.appLocale,
            route.publicPath,
            sourcePath,
          ])
        ).toEqual([
          [
            "de",
            "privacy-policy",
            "packages/corpus/pages/privacy-policy/de.mdx",
          ],
          [
            "ms",
            "dasar-privasi",
            "packages/corpus/pages/privacy-policy/ms.mdx",
          ],
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

  it.effect("projects exactly the locale bodies checked in", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = path.resolve(import.meta.dirname, "..", "..", "..");
      const files = yield* fileSystem.glob("packages/corpus/pages/**/*.mdx", {
        root,
      });
      const entries = yield* decodePageRegistry();

      expect(
        Arr.sort(
          Arr.map(entries, ({ sourcePath }) => sourcePath),
          Order.String
        )
      ).toEqual(
        Arr.sort(
          Arr.filter(files, (file) =>
            Arr.some(APP_LOCALE_CODES, (code) => file.endsWith(`/${code}.mdx`))
          ),
          Order.String
        )
      );
    }).pipe(Effect.provide(NodeServices.layer))
  );
});

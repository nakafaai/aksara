import { expect, layer } from "@effect/vitest";
import {
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect, FileSystem, Path, PlatformError } from "effect";
import { decodePageRegistry } from "#corpus/pages/registry";
import { decodePageSources, readPageDocument } from "#corpus/pages/source";
import { pageSource } from "#corpus/test/page";

const englishIndonesianLocales = ActiveAppLocaleListSchema.make([
  AppLocaleSchema.make("en"),
  AppLocaleSchema.make("id"),
]);

/** Resolves the corpus root through the platform-neutral path service. */
const resolveCorpusRoot = Effect.map(Path.Path, (path) =>
  path.resolve(import.meta.dirname, "..", "..", "..")
);

/** Decodes the valid page fixture used by document-read assertions. */
const makePageEntry = Effect.fn("CorpusTest.makePageEntry")(function* () {
  const [entry] = yield* decodePageRegistry(
    [pageSource()],
    englishIndonesianLocales
  );
  if (entry === undefined) {
    return yield* Effect.die("Expected one active public page entry.");
  }
  return entry;
});

/** Provides one deterministic reviewed page body through Effect Platform. */
function fileLayer(source: string | undefined) {
  return FileSystem.layerNoop({
    readFileString: (path) => {
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(
        PlatformError.systemError({
          _tag: "NotFound",
          method: "readFileString",
          module: "FileSystem",
          pathOrDescriptor: path,
        })
      );
    },
  });
}

layer(Path.layer)("public page source", (it) => {
  it.effect(
    "composes every reviewed page family and decodes injected catalogs",
    () =>
      Effect.gen(function* () {
        const defaults = yield* decodePageSources();
        const injected = yield* decodePageSources([pageSource()]);

        expect(defaults.map(({ pageKey }) => pageKey)).toEqual([
          "imprint",
          "privacy-policy",
          "security-policy",
          "terms-of-service",
        ]);
        expect(injected).toEqual([pageSource()]);
      })
  );

  it.effect("maps one invalid injected catalog to a typed failure", () =>
    Effect.gen(function* () {
      const error = yield* decodePageSources(null).pipe(Effect.flip);

      expect(error._tag).toBe("PageCatalogError");
    })
  );

  it.effect("reads one registry-owned body byte-exactly", () =>
    Effect.gen(function* () {
      const corpusRoot = yield* resolveCorpusRoot;
      const entry = yield* makePageEntry();
      const document = yield* readPageDocument(corpusRoot, entry).pipe(
        Effect.provide(fileLayer("# Privacy Policy\n"))
      );

      expect(document).toMatchObject({
        rawMdx: "# Privacy Policy\n",
        route: entry.route,
        sourcePath: entry.sourcePath,
      });
      expect(document).not.toHaveProperty("sourceRoot");
    })
  );

  it.effect("maps one missing reviewed body to a typed read failure", () =>
    Effect.gen(function* () {
      const corpusRoot = yield* resolveCorpusRoot;
      const entry = yield* makePageEntry();
      const error = yield* readPageDocument(corpusRoot, entry).pipe(
        Effect.provide(fileLayer(undefined)),
        Effect.flip
      );

      expect(error).toMatchObject({
        _tag: "PageReadError",
        sourcePath: entry.sourcePath,
      });
    })
  );
});

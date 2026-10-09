import { expect, layer } from "@effect/vitest";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import {
  Array as Arr,
  Effect,
  HashMap,
  MutableHashMap,
  Option,
  Path,
} from "effect";
import {
  inspectMaterialDocument,
  loadMaterialDocument,
  makeMaterialProjection,
} from "#publisher/material/document";
import { testFileLayer } from "#test/files";
import {
  englishPath,
  MaterialTestFixtures,
  materialTestLayer,
} from "#test/material/spec";

/** Requires the reviewed English material registry fixture. */
const requireEnglishEntry = Effect.fn(
  "MaterialDocumentTest.requireEnglishEntry"
)(function* () {
  const entries = yield* decodeMaterialRegistry();
  return yield* Effect.fromOption(
    Arr.findFirst(entries, ({ sourcePath }) => sourcePath === englishPath)
  );
});

layer(materialTestLayer)("material document", (it) => {
  it.effect(
    "maps a missing registry-owned source to its typed checkout error",
    () =>
      Effect.gen(function* () {
        const fixture = yield* MaterialTestFixtures;
        const entry = yield* requireEnglishEntry();
        const error = yield* loadMaterialDocument(
          fixture.checkoutRoot,
          entry
        ).pipe(Effect.provide([testFileLayer([]), Path.layer]), Effect.flip);

        expect(error).toMatchObject({
          _tag: "MaterialSourceError",
          checkoutRoot: fixture.checkoutRoot,
        });
      })
  );

  it.effect(
    "rejects missing or obsolete metadata with the exact source path",
    () =>
      Effect.gen(function* () {
        const fixture = yield* MaterialTestFixtures;
        const entry = yield* requireEnglishEntry();
        const errors = yield* Effect.gen(function* () {
          const source = yield* loadMaterialDocument(
            fixture.checkoutRoot,
            entry
          );
          return yield* Effect.forEach(
            [
              {},
              {
                authors: [],
                date: "2026-01-01",
                datePublished: "2026-01-01",
                title: "Rejected legacy date",
              },
            ],
            (metadata) =>
              makeMaterialProjection(source, metadata).pipe(Effect.flip)
          );
        }).pipe(Effect.provide([testFileLayer(fixture.sources), Path.layer]));

        for (const error of errors) {
          expect(error).toMatchObject({
            _tag: "MaterialMetadataError",
            sourcePath: entry.sourcePath,
          });
        }
      })
  );

  it.effect(
    "rejects non-chronological material dates through the typed metadata error",
    () =>
      Effect.gen(function* () {
        const fixture = yield* MaterialTestFixtures;
        const entry = yield* requireEnglishEntry();
        const error = yield* Effect.gen(function* () {
          const source = yield* loadMaterialDocument(
            fixture.checkoutRoot,
            entry
          );
          return yield* makeMaterialProjection(source, {
            authors: [{ name: "Nabil Akbarazzima Fatih" }],
            dateModified: "2025-04-27",
            datePublished: "2025-04-27",
            title: "Invalid material dates",
          }).pipe(Effect.flip);
        }).pipe(Effect.provide([testFileLayer(fixture.sources), Path.layer]));

        expect(error).toMatchObject({
          _tag: "MaterialMetadataError",
          sourcePath: entry.sourcePath,
        });
      })
  );

  it.effect(
    "carries an authored search title from lesson metadata into the projection",
    () =>
      Effect.gen(function* () {
        const fixture = yield* MaterialTestFixtures;
        const entry = yield* requireEnglishEntry();
        const absolutePath = yield* Effect.fromNullishOr(
          Option.getOrUndefined(HashMap.get(fixture.absolutePaths, englishPath))
        );
        const authored = yield* Effect.fromNullishOr(
          Option.getOrUndefined(
            MutableHashMap.get(
              MutableHashMap.fromIterable(fixture.sources),
              absolutePath
            )
          )
        );
        /** Adds one search title line to the authored lesson metadata. */
        const withSearchTitle = (title: string) =>
          MutableHashMap.set(
            MutableHashMap.fromIterable(fixture.sources),
            absolutePath,
            authored.replace(
              '  title: "Function Concept",',
              `  title: "Function Concept",\n  searchTitle: "${title}",`
            )
          );
        const searchTitle =
          "Function Concept: Definition, Notation, and Examples";
        const [plain, searchable] = yield* Effect.forEach(
          [fixture.sources, withSearchTitle(searchTitle)],
          (files) =>
            inspectMaterialDocument(
              fixture.checkoutRoot,
              fixture.rendererManifest,
              entry
            ).pipe(Effect.provide([testFileLayer(files), Path.layer]))
        );
        const overlong = yield* inspectMaterialDocument(
          fixture.checkoutRoot,
          fixture.rendererManifest,
          entry
        ).pipe(
          Effect.provide([
            testFileLayer(
              withSearchTitle(Arr.join(Arr.replicate("Function", 8), " "))
            ),
            Path.layer,
          ]),
          Effect.flip
        );

        expect(plain?.projection.metadata).not.toHaveProperty("searchTitle");
        expect(searchable?.projection.metadata).toMatchObject({
          searchTitle,
          title: "Function Concept",
        });
        expect(searchable?.projectionHash).not.toBe(plain?.projectionHash);
        expect(overlong).toMatchObject({
          _tag: "MaterialMetadataError",
          sourcePath: entry.sourcePath,
        });
      })
  );
});

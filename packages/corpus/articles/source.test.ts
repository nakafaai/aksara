import { resolve } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Effect, FileSystem, Path, PlatformError } from "effect";

import { decodeArticleRegistry } from "#corpus/articles/registry";
import {
  decodeArticleSources,
  readArticleDocument,
} from "#corpus/articles/source";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");

/** Loads checked-in article fixtures through the Node Effect services. */
const loadArticleFixtures = Effect.fn("AksaraCorpus.test.loadArticleFixtures")(
  function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const entries = yield* decodeArticleRegistry();
    const sources = yield* Effect.forEach(entries, (entry) =>
      Effect.gen(function* () {
        const absolutePath = resolve(corpusRoot, entry.sourcePath);
        const source = yield* fileSystem.readFileString(absolutePath);
        return [absolutePath, source] as const;
      })
    );

    return { entries, sourceByPath: new Map(sources) } as const;
  }
);

/** Provides deterministic file reads for every reviewed article body. */
function fileLayer(sources: ReadonlyMap<string, string>) {
  return FileSystem.layerNoop({
    readFileString: (path) => {
      const source = sources.get(path);
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

/** Reads every article through the production Effect Platform seam. */
function readSources(
  entries: Effect.Success<ReturnType<typeof decodeArticleRegistry>>,
  sources: ReadonlyMap<string, string>
) {
  return Effect.forEach(entries, (entry) =>
    readArticleDocument(corpusRoot, entry)
  ).pipe(Effect.provide([fileLayer(sources), Path.layer]));
}

layer(NodeServices.layer)("article source", (it) => {
  it.effect("composes seven reviewed article pairs with real references", () =>
    Effect.gen(function* () {
      const sources = yield* decodeArticleSources();

      expect(sources).toHaveLength(7);
      expect(new Set(sources.map(({ slug }) => slug)).size).toBe(7);
      expect(new Set(sources.map(({ sourceRoot }) => sourceRoot)).size).toBe(7);
      expect(sources.every(({ references }) => references.length > 0)).toBe(
        true
      );
    })
  );

  it.effect("maps an invalid injected catalog to one typed failure", () =>
    Effect.gen(function* () {
      const error = yield* decodeArticleSources(null).pipe(Effect.flip);

      expect(error._tag).toBe("ArticleCatalogError");
    })
  );

  it.effect("reads all twenty-one locale bodies byte-exactly", () =>
    Effect.gen(function* () {
      const { entries, sourceByPath } = yield* loadArticleFixtures();
      const documents = yield* readSources(entries, sourceByPath);

      expect(documents).toHaveLength(21);
      expect(documents.map(({ sourcePath }) => sourcePath)).toEqual(
        entries.map(({ sourcePath }) => sourcePath)
      );
      expect(
        documents.every(
          ({ rawMdx, sourcePath }) =>
            rawMdx === sourceByPath.get(resolve(corpusRoot, sourcePath))
        )
      ).toBe(true);
      expect(documents.every(({ references }) => references.length > 0)).toBe(
        true
      );
    })
  );

  it.effect("maps one missing reviewed body to a typed read failure", () =>
    Effect.gen(function* () {
      const { entries } = yield* loadArticleFixtures();
      const [entry] = entries;
      expect(entry).toBeDefined();
      if (entry === undefined) {
        return;
      }

      const error = yield* readArticleDocument(corpusRoot, entry).pipe(
        Effect.provide([fileLayer(new Map()), Path.layer]),
        Effect.flip
      );

      expect(error).toMatchObject({
        _tag: "ArticleReadError",
        sourcePath: entry.sourcePath,
      });
    })
  );
});

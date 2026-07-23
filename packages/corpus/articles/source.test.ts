import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { decodeArticleRegistry } from "#corpus/articles/registry";
import {
  decodeArticleSources,
  readArticleDocument,
} from "#corpus/articles/source";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");
const entries = await Effect.runPromise(decodeArticleRegistry());
const sourceByPath = new Map<string, string>();

for (const entry of entries) {
  const absolutePath = resolve(corpusRoot, entry.sourcePath);
  sourceByPath.set(absolutePath, readFileSync(absolutePath, "utf8"));
}

/** Provides deterministic file reads for every reviewed article body. */
function fileLayer(sources: ReadonlyMap<string, string>) {
  return FileSystem.layerNoop({
    readFileString: (path) => {
      const source = sources.get(path);
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(
        new PlatformError.SystemError({
          method: "readFileString",
          module: "FileSystem",
          pathOrDescriptor: path,
          reason: "NotFound",
        })
      );
    },
  });
}

/** Reads every article through the production Effect Platform seam. */
function readSources(sources: ReadonlyMap<string, string>) {
  return Effect.runPromise(
    Effect.forEach(entries, (entry) =>
      readArticleDocument(corpusRoot, entry)
    ).pipe(Effect.provide(fileLayer(sources)), Effect.provide(Path.layer))
  );
}

describe("article source", () => {
  it("composes seven reviewed article pairs with real references", async () => {
    const sources = await Effect.runPromise(decodeArticleSources());

    expect(sources).toHaveLength(7);
    expect(new Set(sources.map(({ slug }) => slug)).size).toBe(7);
    expect(new Set(sources.map(({ sourceRoot }) => sourceRoot)).size).toBe(7);
    expect(sources.every(({ references }) => references.length > 0)).toBe(true);
  });

  it("maps an invalid injected catalog to one typed failure", async () => {
    const error = await Effect.runPromise(
      decodeArticleSources(null).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ArticleCatalogError");
  });

  it("reads all fourteen locale bodies byte-exactly", async () => {
    const documents = await readSources(sourceByPath);

    expect(documents).toHaveLength(14);
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
  });

  it("maps one missing reviewed body to a typed read failure", async () => {
    const [entry] = entries;
    expect(entry).toBeDefined();
    if (entry === undefined) {
      return;
    }

    const error = await Effect.runPromise(
      readArticleDocument(corpusRoot, entry).pipe(
        Effect.provide(fileLayer(new Map())),
        Effect.provide(Path.layer),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "ArticleReadError",
      sourcePath: entry.sourcePath,
    });
  });
});

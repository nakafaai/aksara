import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { decodeMaterialRegistry } from "#corpus/material/registry";
import {
  decodeMaterialSources,
  readMaterialDocument,
} from "#corpus/material/source";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");
const entries = await Effect.runPromise(decodeMaterialRegistry());
const sourceByPath = new Map<string, string>();

for (const entry of entries) {
  const absolutePath = resolve(corpusRoot, entry.sourcePath);
  sourceByPath.set(absolutePath, readFileSync(absolutePath, "utf8"));
}

/** Provides deterministic file reads for every checked-in material body. */
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

/** Reads the complete material registry only at the Vitest runner boundary. */
function readSources(sources: ReadonlyMap<string, string>) {
  return Effect.runPromise(
    Effect.forEach(entries, (entry) =>
      readMaterialDocument(corpusRoot, entry)
    ).pipe(Effect.provide(fileLayer(sources)), Effect.provide(Path.layer))
  );
}

describe("material source", () => {
  it("composes every real lesson source without hiding section bodies", async () => {
    const sources = await Effect.runPromise(decodeMaterialSources());

    expect(sources).toHaveLength(36);
    expect(
      sources.reduce((count, source) => count + source.sections.length, 0)
    ).toBe(383);
    expect(new Set(sources.map(({ key }) => key)).size).toBe(36);
    expect(new Set(sources.map(({ assetRoot }) => assetRoot)).size).toBe(36);
  });

  it("maps an invalid injected catalog to one typed failure", async () => {
    const error = await Effect.runPromise(
      decodeMaterialSources(null).pipe(Effect.flip)
    );

    expect(error._tag).toBe("MaterialCatalogError");
  });

  it("reads every locale body byte-exactly from its signed source path", async () => {
    const documents = await readSources(sourceByPath);

    expect(documents).toHaveLength(766);
    expect(documents.map(({ sourcePath }) => sourcePath)).toEqual(
      entries.map(({ sourcePath }) => sourcePath)
    );
    expect(
      documents.every(
        ({ rawMdx, sourcePath }) =>
          rawMdx === sourceByPath.get(resolve(corpusRoot, sourcePath))
      )
    ).toBe(true);
    expect(documents.every(({ rawMdx }) => rawMdx.length > 0)).toBe(true);
  });

  it("maps one missing reviewed source file to a typed failure", async () => {
    const [entry] = entries;
    if (entry === undefined) {
      throw new Error("Expected the real material registry to be non-empty.");
    }

    const error = await Effect.runPromise(
      readMaterialDocument(corpusRoot, entry).pipe(
        Effect.provide(fileLayer(new Map())),
        Effect.provide(Path.layer),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "MaterialReadError",
      sourcePath: entry.sourcePath,
    });
  });
});

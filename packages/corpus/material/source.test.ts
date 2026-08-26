import { resolve } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Effect, FileSystem, Path, PlatformError } from "effect";

import { decodeMaterialRegistry } from "#corpus/material/registry";
import {
  decodeMaterialSources,
  readMaterialDocument,
} from "#corpus/material/source";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");

/** Loads checked-in material fixtures through the Node Effect services. */
const loadMaterialFixtures = Effect.fn(
  "AksaraCorpus.test.loadMaterialFixtures"
)(function* () {
  const fileSystem = yield* FileSystem.FileSystem;
  const entries = yield* decodeMaterialRegistry();
  const sources = yield* Effect.forEach(entries, (entry) =>
    Effect.gen(function* () {
      const absolutePath = resolve(corpusRoot, entry.sourcePath);
      const source = yield* fileSystem.readFileString(absolutePath);
      return [absolutePath, source] as const;
    })
  );

  return { entries, sourceByPath: new Map(sources) } as const;
});

/** Provides deterministic file reads for every checked-in material body. */
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

/** Reads every material through the production Effect Platform seam. */
function readSources(
  entries: Effect.Success<ReturnType<typeof decodeMaterialRegistry>>,
  sources: ReadonlyMap<string, string>
) {
  return Effect.forEach(entries, (entry) =>
    readMaterialDocument(corpusRoot, entry)
  ).pipe(Effect.provide([fileLayer(sources), Path.layer]));
}

layer(NodeServices.layer)("material source", (it) => {
  it.effect(
    "composes every real lesson source without hiding section bodies",
    () =>
      Effect.gen(function* () {
        const sources = yield* decodeMaterialSources();

        expect(sources).toHaveLength(36);
        expect(
          sources.reduce((count, source) => count + source.sections.length, 0)
        ).toBe(383);
        expect(new Set(sources.map(({ key }) => key)).size).toBe(36);
        expect(new Set(sources.map(({ assetRoot }) => assetRoot)).size).toBe(
          36
        );
      })
  );

  it.effect("maps an invalid injected catalog to one typed failure", () =>
    Effect.gen(function* () {
      const error = yield* decodeMaterialSources(null).pipe(Effect.flip);

      expect(error._tag).toBe("MaterialCatalogError");
    })
  );

  it.effect(
    "reads every locale body byte-exactly from its signed source path",
    () =>
      Effect.gen(function* () {
        const { entries, sourceByPath } = yield* loadMaterialFixtures();
        const documents = yield* readSources(entries, sourceByPath);

        expect(documents).toHaveLength(1149);
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
      })
  );

  it.effect("maps one missing reviewed source file to a typed failure", () =>
    Effect.gen(function* () {
      const { entries } = yield* loadMaterialFixtures();
      const [entry] = entries;
      expect(entry).toBeDefined();
      if (entry === undefined) {
        return;
      }

      const error = yield* readMaterialDocument(corpusRoot, entry).pipe(
        Effect.provide([fileLayer(new Map()), Path.layer]),
        Effect.flip
      );

      expect(error).toMatchObject({
        _tag: "MaterialReadError",
        sourcePath: entry.sourcePath,
      });
    })
  );
});

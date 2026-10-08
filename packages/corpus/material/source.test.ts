import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  Effect,
  FileSystem,
  HashMap,
  HashSet,
  Option,
  Path,
  PlatformError,
} from "effect";

import { decodeMaterialRegistry } from "#corpus/material/registry";
import {
  decodeMaterialSources,
  readMaterialDocument,
} from "#corpus/material/source";

/** Resolves the corpus root through the platform-neutral path service. */
const resolveCorpusRoot = Effect.map(Path.Path, (path) =>
  path.resolve(import.meta.dirname, "..", "..", "..")
);

/** Loads checked-in material fixtures through the Node Effect services. */
const loadMaterialFixtures = Effect.fn(
  "AksaraCorpus.test.loadMaterialFixtures"
)(function* () {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const corpusRoot = yield* resolveCorpusRoot;
  const entries = yield* decodeMaterialRegistry();
  const sources = yield* Effect.forEach(entries, (entry) =>
    Effect.gen(function* () {
      const absolutePath = path.resolve(corpusRoot, entry.sourcePath);
      const source = yield* fileSystem.readFileString(absolutePath);
      return [absolutePath, source] as const;
    })
  );

  return { entries, sourceByPath: HashMap.fromIterable(sources) } as const;
});

/** Provides deterministic file reads for every checked-in material body. */
function fileLayer(sources: HashMap.HashMap<string, string>) {
  return FileSystem.layerNoop({
    readFileString: (path) => {
      const source = Option.getOrUndefined(HashMap.get(sources, path));
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
  sources: HashMap.HashMap<string, string>
) {
  return Effect.gen(function* () {
    const corpusRoot = yield* resolveCorpusRoot;
    return yield* Effect.forEach(entries, (entry) =>
      readMaterialDocument(corpusRoot, entry)
    );
  }).pipe(Effect.provide([fileLayer(sources), Path.layer]));
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
        expect(
          HashSet.size(HashSet.fromIterable(sources.map(({ key }) => key)))
        ).toBe(36);
        expect(
          HashSet.size(
            HashSet.fromIterable(sources.map(({ assetRoot }) => assetRoot))
          )
        ).toBe(36);

        const sectionsWithEvidence = sources.flatMap(({ sections }) =>
          sections.filter(({ evidenceUrls }) => evidenceUrls !== undefined)
        );
        const catalogEvidenceUrls = sectionsWithEvidence.flatMap(
          ({ evidenceUrls }) => evidenceUrls ?? []
        );
        expect(sectionsWithEvidence.length).toBeGreaterThan(0);
        expect(catalogEvidenceUrls.length).toBeGreaterThanOrEqual(
          sectionsWithEvidence.length
        );
        expect(
          sectionsWithEvidence.every(
            ({ evidenceUrls }) =>
              evidenceUrls !== undefined &&
              HashSet.size(HashSet.fromIterable(evidenceUrls)) ===
                evidenceUrls.length
          )
        ).toBe(true);

        const entries = yield* decodeMaterialRegistry();
        expect(entries.some((entry) => "evidenceUrls" in entry)).toBe(false);
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
        const path = yield* Path.Path;
        const corpusRoot = yield* resolveCorpusRoot;
        const { entries, sourceByPath } = yield* loadMaterialFixtures();
        const documents = yield* readSources(entries, sourceByPath);

        expect(documents).toHaveLength(1149);
        expect(documents.map(({ sourcePath }) => sourcePath)).toEqual(
          entries.map(({ sourcePath }) => sourcePath)
        );
        expect(
          documents.every(
            ({ rawMdx, sourcePath }) =>
              rawMdx ===
              Option.getOrUndefined(
                HashMap.get(sourceByPath, path.resolve(corpusRoot, sourcePath))
              )
          )
        ).toBe(true);
        expect(documents.every(({ rawMdx }) => rawMdx.length > 0)).toBe(true);
      })
  );

  it.effect("maps one missing reviewed source file to a typed failure", () =>
    Effect.gen(function* () {
      const corpusRoot = yield* resolveCorpusRoot;
      const { entries } = yield* loadMaterialFixtures();
      const [entry] = entries;
      expect(entry).toBeDefined();
      if (entry === undefined) {
        return;
      }

      const error = yield* readMaterialDocument(corpusRoot, entry).pipe(
        Effect.provide([
          fileLayer(HashMap.empty<string, string>()),
          Path.layer,
        ]),
        Effect.flip
      );

      expect(error).toMatchObject({
        _tag: "MaterialReadError",
        sourcePath: entry.sourcePath,
      });
    })
  );
});

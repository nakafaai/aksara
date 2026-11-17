import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  Array as Arr,
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
import { CHECKOUT_ROOT } from "#corpus/test/root";

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
  const entries = yield* decodeMaterialRegistry({
    checkoutRoot: CHECKOUT_ROOT,
  });
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
        const sources = yield* decodeMaterialSources({
          checkoutRoot: CHECKOUT_ROOT,
        });

        expect(Arr.every(sources, ({ sections }) => sections.length > 0)).toBe(
          true
        );
        expect(
          HashSet.size(HashSet.fromIterable(Arr.map(sources, ({ key }) => key)))
        ).toBe(sources.length);
        expect(
          HashSet.size(
            HashSet.fromIterable(Arr.map(sources, ({ assetRoot }) => assetRoot))
          )
        ).toBe(sources.length);

        const sectionsWithEvidence = Arr.flatMap(sources, ({ sections }) =>
          Arr.filter(sections, ({ evidenceUrls }) => evidenceUrls !== undefined)
        );
        const catalogEvidenceUrls = Arr.flatMap(
          sectionsWithEvidence,
          ({ evidenceUrls }) => evidenceUrls ?? []
        );
        expect(sectionsWithEvidence.length).toBeGreaterThan(0);
        expect(catalogEvidenceUrls.length).toBeGreaterThanOrEqual(
          sectionsWithEvidence.length
        );
        expect(
          Arr.every(
            sectionsWithEvidence,
            ({ evidenceUrls }) =>
              evidenceUrls !== undefined &&
              HashSet.size(HashSet.fromIterable(evidenceUrls)) ===
                evidenceUrls.length
          )
        ).toBe(true);

        const entries = yield* decodeMaterialRegistry({
          checkoutRoot: CHECKOUT_ROOT,
        });
        expect(Arr.some(entries, (entry) => "evidenceUrls" in entry)).toBe(
          false
        );
      })
  );

  it.effect("maps an invalid injected catalog to one typed failure", () =>
    Effect.gen(function* () {
      const error = yield* decodeMaterialSources({ sources: null }).pipe(
        Effect.flip
      );

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

        expect(Arr.map(documents, ({ sourcePath }) => sourcePath)).toEqual(
          Arr.map(entries, ({ sourcePath }) => sourcePath)
        );
        expect(
          Arr.every(
            documents,
            ({ rawMdx, sourcePath }) =>
              rawMdx ===
              Option.getOrUndefined(
                HashMap.get(sourceByPath, path.resolve(corpusRoot, sourcePath))
              )
          )
        ).toBe(true);
        expect(Arr.every(documents, ({ rawMdx }) => rawMdx.length > 0)).toBe(
          true
        );
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

/** The lesson file of one real lesson, as the fixtures copy and change it. */
const REAL_LESSON = "packages/corpus/material/lesson/biology/cell-organisation";

/**
 * Builds a checkout in a scoped temporary folder whose only lesson is the real
 * cell organisation lesson, with its file text changed by `edit` and placed in
 * the lesson folder `folder`, or no lesson file where `edit` returns undefined.
 */
const fixtureCheckout = Effect.fn("AksaraCorpus.test.fixtureCheckout")(
  function* (folder: string, edit: (text: string) => string | undefined) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-lessons-",
    });
    const text = yield* fileSystem.readFileString(
      path.join(CHECKOUT_ROOT, REAL_LESSON, "lesson.json")
    );
    const lesson = path.join(root, "packages/corpus/material/lesson", folder);
    yield* fileSystem.makeDirectory(lesson, { recursive: true });
    const edited = edit(text);
    if (edited !== undefined) {
      yield* fileSystem.writeFileString(
        path.join(lesson, "lesson.json"),
        edited
      );
    }
    return root;
  }
);

layer(NodeServices.layer)("lesson folder discovery", (it) => {
  it.effect("discovers a lesson from its own folder", () =>
    Effect.gen(function* () {
      const root = yield* fixtureCheckout(
        "biology/cell-organisation",
        (text) => text
      );

      const sources = yield* decodeMaterialSources({ checkoutRoot: root });

      expect(Arr.map(sources, ({ key }) => key)).toEqual([
        "lesson.biology.cell-organisation",
      ]);
    }).pipe(Effect.scoped)
  );

  it.effect.each([
    {
      edit: () => undefined,
      folder: "biology/cell-organisation",
      reason: "missing",
    },
    { edit: () => "{", folder: "biology/cell-organisation", reason: "invalid" },
    {
      edit: (text: string) =>
        text.replace('"kind": "lesson"', '"kind": "lesson", "extra": 1'),
      folder: "biology/cell-organisation",
      reason: "invalid",
    },
    {
      edit: (text: string) => text,
      folder: "biology/cell-structure",
      reason: "misplaced",
    },
  ])(
    "refuses a lesson folder whose file is $reason",
    ({ edit, folder, reason }) =>
      Effect.gen(function* () {
        const root = yield* fixtureCheckout(folder, edit);

        const error = yield* decodeMaterialSources({ checkoutRoot: root }).pipe(
          Effect.flip
        );

        expect(error).toMatchObject({
          _tag: "MaterialFolderError",
          folder: `packages/corpus/material/lesson/${folder}`,
          reason,
        });
      }).pipe(Effect.scoped)
  );

  it.effect("refuses a checkout without a lesson root", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped();

      const error = yield* decodeMaterialSources({ checkoutRoot: root }).pipe(
        Effect.flip
      );

      expect(error).toMatchObject({
        _tag: "MaterialFolderError",
        folder: "packages/corpus/material/lesson",
        reason: "unreadable",
      });
    }).pipe(Effect.scoped)
  );
});

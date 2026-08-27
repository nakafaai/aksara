import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  type ActiveAppLocaleList,
  ActiveAppLocaleListSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  Context,
  Effect,
  FileSystem,
  Layer,
  Path,
  PlatformError,
  Schema,
} from "effect";

import { loadPinnedQuranSources } from "#corpus/quran/source/load";
import { QURAN_SOURCE_POLICY } from "#corpus/quran/source/policy";

interface QuranSourceFixtureValue {
  readonly repositoryRoot: string;
  /** Resolves one repository-owned Quran source path. */
  readonly resolveSource: (relativePath: string) => string;
  readonly sourceBytes: ReadonlyMap<string, Uint8Array>;
}

class QuranSourceFixture extends Context.Service<
  QuranSourceFixture,
  QuranSourceFixtureValue
>()("AksaraCorpus.test.QuranSourceFixture") {}

const pinnedSourcePaths = [
  QURAN_SOURCE_POLICY.data.arabic.path,
  QURAN_SOURCE_POLICY.data.metadata.path,
  ...Object.values(QURAN_SOURCE_POLICY.data.translations).map(
    ({ path }) => path
  ),
  QURAN_SOURCE_POLICY.evidence.germanPublication.path,
  ...Object.values(QURAN_SOURCE_POLICY.terms).map(({ path }) => path),
  ...Array.from(
    { length: 114 },
    (_, index) => `${QURAN_SOURCE_POLICY.tafsir.directory}/${index + 1}.json`
  ),
] as const;
const germanOnly = Schema.decodeEffect(ActiveAppLocaleListSchema)(["de"]);

/** Loads every source fixture through Effect's filesystem and path services. */
const loadSourceFixture = Effect.fn("AksaraCorpus.test.loadQuranSourceFixture")(
  function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const repositoryRoot = path.resolve(import.meta.dirname, "../../../..");
    const sourceRoot = path.resolve(
      repositoryRoot,
      "packages/corpus/quran/sources"
    );
    const entries = yield* Effect.forEach(
      pinnedSourcePaths,
      (relativePath) =>
        Effect.map(
          fileSystem.readFile(path.resolve(sourceRoot, relativePath)),
          (bytes) => [path.resolve(sourceRoot, relativePath), bytes] as const
        ),
      { concurrency: "unbounded" }
    );

    return {
      repositoryRoot,
      resolveSource: (relativePath: string) =>
        path.resolve(sourceRoot, relativePath),
      sourceBytes: new Map(entries),
    } satisfies QuranSourceFixtureValue;
  }
);

const fixtureLayer = Layer.effect(QuranSourceFixture)(loadSourceFixture()).pipe(
  Layer.provideMerge(NodeServices.layer)
);

/** Provides deterministic byte reads for every pinned Quran source. */
function fileLayer(sources: ReadonlyMap<string, Uint8Array>) {
  return FileSystem.layerNoop({
    readFile: (path) => {
      const bytes = sources.get(path);
      if (bytes !== undefined) {
        return Effect.succeed(bytes);
      }
      return Effect.fail(
        PlatformError.systemError({
          _tag: "NotFound",
          method: "readFile",
          module: "FileSystem",
          pathOrDescriptor: path,
        })
      );
    },
  });
}

/** Loads pinned sources through one deterministic Effect file adapter. */
const load = Effect.fn("AksaraCorpus.test.loadPinnedQuranSources")(function* (
  sources: ReadonlyMap<string, Uint8Array>,
  appLocales?: ActiveAppLocaleList
) {
  const { repositoryRoot } = yield* QuranSourceFixture;
  const program =
    appLocales === undefined
      ? loadPinnedQuranSources(repositoryRoot)
      : loadPinnedQuranSources(repositoryRoot, appLocales);
  return yield* program.pipe(Effect.provide([fileLayer(sources), Path.layer]));
});

/** Returns one typed pinned-source rejection inside the Effect runtime. */
const reject = Effect.fn("AksaraCorpus.test.rejectPinnedQuranSources")(
  function* (
    sources: ReadonlyMap<string, Uint8Array>,
    appLocales?: ActiveAppLocaleList
  ) {
    return yield* load(sources, appLocales).pipe(Effect.flip);
  }
);

/** Asserts exact typed file failures without repeating structural boilerplate. */
function expectFileErrors(
  actual: readonly Effect.Error<ReturnType<typeof load>>[],
  details: readonly string[]
) {
  expect(actual).toMatchObject(
    details.map((detail) => ({ _tag: "QuranSourceFileError", detail }))
  );
}

/** Replaces one exact source path without mutating the shared fixture. */
function replace(
  fixture: QuranSourceFixtureValue,
  relativePath: string,
  bytes: Uint8Array
) {
  const sources = new Map(fixture.sourceBytes);
  sources.set(fixture.resolveSource(relativePath), bytes);
  return sources;
}

/** Mutates one byte while preserving the source byte count and UTF-8. */
const drift = Effect.fn("AksaraCorpus.test.driftPinnedQuranSource")(function* (
  fixture: QuranSourceFixtureValue,
  relativePath: string
) {
  const bytes = yield* Effect.fromNullishOr(
    fixture.sourceBytes.get(fixture.resolveSource(relativePath))
  ).pipe(Effect.orDie);
  const changed = Uint8Array.from(bytes);
  changed[0] = changed[0] === 65 ? 66 : 65;
  return replace(fixture, relativePath, changed);
});

layer(fixtureLayer)("Quran source loading", (it) => {
  it.effect(
    "derives the complete signed summary from authenticated source bytes",
    () =>
      Effect.gen(function* () {
        const fixture = yield* QuranSourceFixture;
        const loaded = yield* load(fixture.sourceBytes);

        expect(loaded.summary).toEqual({
          byteCount: 13_030_246,
          digest:
            "sha256:4834b7d8ca7e55e622c3e27a37c4b210af0ab58f066162603b1d76beb0dd91b8",
          fileCount: 119,
        });
        expect(loaded.sources.tafsir).toHaveLength(114);
        expect(loaded.sources.translations.de).toContain(
          "Im Namen Allahs, des Allerbarmers, des Barmherzigen."
        );
      })
  );

  it.effect(
    "rejects locale subsets that cannot describe the physical source bundle",
    () =>
      Effect.gen(function* () {
        const fixture = yield* QuranSourceFixture;
        const appLocales = yield* germanOnly;
        const error = yield* reject(fixture.sourceBytes, appLocales);

        expect(error).toMatchObject({
          _tag: "QuranSourceLocaleError",
          appLocales: ["de"],
        });
      })
  );

  it.effect("rejects missing data, legal, and Tafsir source files", () =>
    Effect.gen(function* () {
      const fixture = yield* QuranSourceFixture;
      const missingData = new Map(fixture.sourceBytes);
      missingData.delete(fixture.resolveSource("tanzil/text.txt"));
      const missingTerms = new Map(fixture.sourceBytes);
      missingTerms.delete(fixture.resolveSource("tanzil/terms.html"));
      const missingTafsir = new Map(fixture.sourceBytes);
      missingTafsir.delete(fixture.resolveSource("quranenc/tafsir/114.json"));

      const errors = yield* Effect.all(
        [reject(missingData), reject(missingTerms), reject(missingTafsir)],
        { concurrency: "unbounded" }
      );

      expectFileErrors(errors, [
        "Could not read pinned source tanzil-text.txt.",
        "Could not read pinned source tanzil-terms.html.",
        "Could not read QuranEnc Tafsir source 114.json.",
      ]);
    })
  );

  it.effect(
    "rejects both changed byte counts and changed same-length data",
    () =>
      Effect.gen(function* () {
        const fixture = yield* QuranSourceFixture;
        const english = yield* Effect.fromNullishOr(
          fixture.sourceBytes.get(fixture.resolveSource("quranenc/en.xml"))
        ).pipe(Effect.orDie);

        const errors = yield* Effect.all(
          [
            reject(replace(fixture, "quranenc/en.xml", english.slice(1))),
            reject(yield* drift(fixture, "quranenc/en.xml")),
          ],
          { concurrency: "unbounded" }
        );

        expectFileErrors(errors, [
          "Pinned source drifted: quranenc-en.xml.",
          "Pinned source drifted: quranenc-en.xml.",
        ]);
      })
  );

  it.effect("authenticates verbatim publication and legal evidence", () =>
    Effect.gen(function* () {
      const fixture = yield* QuranSourceFixture;
      const errors = yield* Effect.all(
        [
          reject(yield* drift(fixture, "german/publication.json")),
          reject(yield* drift(fixture, "quranenc/terms.html")),
          reject(yield* drift(fixture, "tanzil/terms.html")),
        ],
        { concurrency: "unbounded" }
      );

      expectFileErrors(errors, [
        "Pinned source drifted: islamhouse-german-bubenheim.json.",
        "Pinned source drifted: quranenc-terms.html.",
        "Pinned source drifted: tanzil-terms.html.",
      ]);
    })
  );

  it.effect("rejects invalid UTF-8 before parsing official text", () =>
    Effect.gen(function* () {
      const fixture = yield* QuranSourceFixture;
      const error = yield* reject(
        replace(fixture, "quranenc/id.xml", Uint8Array.from([255]))
      );

      expect(error).toMatchObject({
        _tag: "QuranSourceFileError",
        detail: "Pinned source is not valid UTF-8: quranenc-id.xml.",
      });
    })
  );

  it.effect(
    "rejects changed Tafsir byte counts and same-length bundle content",
    () =>
      Effect.gen(function* () {
        const fixture = yield* QuranSourceFixture;
        const first = yield* Effect.fromNullishOr(
          fixture.sourceBytes.get(
            fixture.resolveSource("quranenc/tafsir/1.json")
          )
        ).pipe(Effect.orDie);

        const errors = yield* Effect.all(
          [
            reject(replace(fixture, "quranenc/tafsir/1.json", first.slice(1))),
            reject(yield* drift(fixture, "quranenc/tafsir/1.json")),
          ],
          { concurrency: "unbounded" }
        );

        expectFileErrors(errors, [
          "Pinned QuranEnc Tafsir bundle drifted.",
          "Pinned QuranEnc Tafsir bundle drifted.",
        ]);
      })
  );
});

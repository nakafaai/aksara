import { expect, layer } from "@effect/vitest";
import {
  type ActiveAppLocaleList,
  ActiveAppLocaleListSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  Array as Arr,
  Effect,
  FileSystem,
  HashMap,
  Option,
  Path,
  PlatformError,
  Schema,
} from "effect";

import { loadPinnedQuranSources } from "#corpus/quran/source/load";
import {
  fixtureLayer,
  QuranSourceFixture,
  type QuranSourceFixtureValue,
} from "#corpus/test/quran/pinned";

const germanOnly = Schema.decodeEffect(ActiveAppLocaleListSchema)(["de"]);

/** Provides deterministic byte reads for every pinned Quran source. */
function fileLayer(sources: HashMap.HashMap<string, Uint8Array>) {
  return FileSystem.layerNoop({
    readFile: (path) => {
      const bytes = Option.getOrUndefined(HashMap.get(sources, path));
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
  sources: HashMap.HashMap<string, Uint8Array>,
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
    sources: HashMap.HashMap<string, Uint8Array>,
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
    Arr.map(details, (detail) => ({ _tag: "QuranSourceFileError", detail }))
  );
}

/** Replaces one exact source path without mutating the shared fixture. */
function replace(
  fixture: QuranSourceFixtureValue,
  relativePath: string,
  bytes: Uint8Array
) {
  const key = fixture.resolveSource(relativePath);
  return HashMap.set(fixture.sourceBytes, key, bytes);
}

/** Reads one pinned source copy from the fixture by its repository-relative path. */
function sourceAt(fixture: QuranSourceFixtureValue, relativePath: string) {
  const key = fixture.resolveSource(relativePath);
  return Option.getOrUndefined(HashMap.get(fixture.sourceBytes, key));
}

/** Mutates one byte while preserving the source byte count and UTF-8. */
const drift = Effect.fn("AksaraCorpus.test.driftPinnedQuranSource")(function* (
  fixture: QuranSourceFixtureValue,
  relativePath: string
) {
  const bytes = yield* Effect.fromNullishOr(
    sourceAt(fixture, relativePath)
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
          byteCount: 20_600_641,
          digest:
            "sha256:de42a454eba6c2e88e2e17d4db03827df33751c1212f6b36542a9be6ac83a9c1",
          fileCount: 121,
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
      const missingData = HashMap.remove(
        fixture.sourceBytes,
        fixture.resolveSource("tanzil/text.txt")
      );
      const missingTerms = HashMap.remove(
        fixture.sourceBytes,
        fixture.resolveSource("tanzil/terms.html")
      );
      const missingTafsir = HashMap.remove(
        fixture.sourceBytes,
        fixture.resolveSource("quranenc/tafsir/114.json")
      );

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
          sourceAt(fixture, "quranenc/en.xml")
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
          reject(yield* drift(fixture, "german/faq.html")),
          reject(yield* drift(fixture, "kemenag/publication.html")),
          reject(yield* drift(fixture, "kemenag/rights.html")),
          reject(yield* drift(fixture, "quranenc/terms.html")),
          reject(yield* drift(fixture, "tanzil/terms.html")),
        ],
        { concurrency: "unbounded" }
      );

      expectFileErrors(errors, [
        "Pinned source drifted: islamhouse-german-bubenheim.json.",
        "Pinned source drifted: islamhouse-faq.html.",
        "Pinned source drifted: kemenag-publication.html.",
        "Pinned source drifted: kemenag-rights.html.",
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
          sourceAt(fixture, "quranenc/tafsir/1.json")
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

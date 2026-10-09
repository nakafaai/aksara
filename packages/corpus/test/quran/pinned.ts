import { NodeServices } from "@effect/platform-node";
import {
  Array as Arr,
  Context,
  Effect,
  FileSystem,
  HashMap,
  Layer,
  Path,
  Record,
} from "effect";

import { QURAN_SOURCE_POLICY } from "#corpus/quran/source/policy";

/** Every pinned official source copy, keyed by its exact resolved path. */
export interface QuranSourceFixtureValue {
  readonly repositoryRoot: string;
  /** Resolves one repository-owned Quran source path. */
  readonly resolveSource: (relativePath: string) => string;
  readonly sourceBytes: HashMap.HashMap<string, Uint8Array>;
}

export class QuranSourceFixture extends Context.Service<
  QuranSourceFixture,
  QuranSourceFixtureValue
>()("AksaraCorpus.test.QuranSourceFixture") {}

const pinnedSourcePaths = [
  QURAN_SOURCE_POLICY.data.arabic.path,
  QURAN_SOURCE_POLICY.data.metadata.path,
  ...Arr.map(Record.values(QURAN_SOURCE_POLICY.data.names), ({ path }) => path),
  ...Arr.map(
    Record.values(QURAN_SOURCE_POLICY.data.translations),
    ({ path }) => path
  ),
  ...Arr.map(Record.values(QURAN_SOURCE_POLICY.evidence), ({ path }) => path),
  ...Arr.map(Record.values(QURAN_SOURCE_POLICY.terms), ({ path }) => path),
  ...Array.from(
    { length: 114 },
    (_, index) => `${QURAN_SOURCE_POLICY.tafsir.directory}/${index + 1}.json`
  ),
] as const;

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
      sourceBytes: HashMap.fromIterable(entries),
    } satisfies QuranSourceFixtureValue;
  }
);

/** Supplies the pinned Quran source fixture to one suite of tests. */
export const fixtureLayer = Layer.effect(QuranSourceFixture)(
  loadSourceFixture()
).pipe(Layer.provideMerge(NodeServices.layer));

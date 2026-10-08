import { NodeServices } from "@effect/platform-node";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Context, Effect, Layer, Path, Stream } from "effect";

import { streamQuranRegistry } from "#corpus/quran/registry";
import { loadPinnedQuranSources } from "#corpus/quran/source/load";
import { parseQuranSources } from "#corpus/quran/source/parse";

/** The exact pinned official Quran values that source-dependent tests share. */
class QuranTestSources extends Context.Service<
  QuranTestSources,
  { readonly sources: Effect.Success<ReturnType<typeof parseQuranSources>> }
>()("AksaraCorpus.test.QuranTestSources") {}

/** Loads the pinned official Quran values from the repository root. */
const loadQuranTestSources = Effect.gen(function* () {
  const path = yield* Path.Path;
  const repositoryRoot = path.resolve(import.meta.dirname, "../../../..");
  const { sources } = yield* loadPinnedQuranSources(
    repositoryRoot,
    ACTIVE_APP_LOCALES
  );
  return { sources: yield* parseQuranSources(sources) };
});

/** Loads the pinned official Quran values once for the tests that share them, with the Node services they read. */
export const quranTestSourcesLayer = Layer.effect(
  QuranTestSources,
  loadQuranTestSources
).pipe(Layer.provideMerge(NodeServices.layer));

/** Exact pinned official Quran values shared by source-dependent tests. */
export const testQuranSources = QuranTestSources.pipe(
  Effect.map(({ sources }) => sources)
);

/** Replays the strict test registry from authenticated official source values. */
export const testQuranRegistry = testQuranSources.pipe(
  Effect.map((sources) => streamQuranRegistry(Stream.fromIterable(sources)))
);

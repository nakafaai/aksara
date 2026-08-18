import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
} from "@nakafa/aksara-contracts/locale";
import type { QuranSourceArtifact } from "@nakafa/aksara-contracts/quran/source";
import { Chunk, Effect, Stream } from "effect";

import type { QuranRegistrySource } from "#corpus/quran/projection";
import { streamQuranRegistry } from "#corpus/quran/registry";
import { loadPinnedQuranSources } from "#corpus/quran/source/load";
import { parseQuranSources } from "#corpus/quran/source/parse";

/** Complete verified source used to prepare one immutable Quran snapshot. */
export interface VerifiedQuranSource {
  readonly source: QuranRegistrySource;
  readonly summary: QuranSourceArtifact;
}

/** Loads exact official bytes and validates their complete semantic registry. */
export const loadVerifiedQuranSource = Effect.fn(
  "AksaraCorpus.loadVerifiedQuranSource"
)(function* (
  checkoutRoot: string,
  activeAppLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
) {
  const loaded = yield* loadPinnedQuranSources(checkoutRoot, activeAppLocales);
  const parsed = yield* parseQuranSources(loaded.sources);
  const surahs = Chunk.toReadonlyArray(
    yield* streamQuranRegistry(Stream.fromIterable(parsed)).pipe(
      Stream.runCollect
    )
  );
  return {
    source: () => streamQuranRegistry(Stream.fromIterable(surahs)),
    summary: loaded.summary,
  } satisfies VerifiedQuranSource;
});

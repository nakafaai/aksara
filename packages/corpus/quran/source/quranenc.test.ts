import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Path } from "effect";

import { loadPinnedQuranSources } from "#corpus/quran/source/load";
import { parseQuranMetadata } from "#corpus/quran/source/metadata";
import { parseResponseTranslation } from "#corpus/quran/source/quranenc";

const TRANSLATION_PATTERN = /"translation":"(?:\\.|[^"])*"/u;

/** Loads the pinned Malay QuranEnc responses and the surah metadata they follow. */
const loadMalay = Effect.gen(function* () {
  const path = yield* Path.Path;
  const { sources } = yield* loadPinnedQuranSources(
    path.resolve(import.meta.dirname, "../../../..")
  );
  const metadata = yield* parseQuranMetadata(sources.metadata);
  const responses = yield* Effect.fromNullishOr(
    sources.responseTranslations.ms
  ).pipe(Effect.orDie);
  return { responses, surahs: metadata.surahs };
}).pipe(Effect.provide(NodeServices.layer));

describe("QuranEnc responses", () => {
  it.effect("reads the pinned Malay translation verse by verse", () =>
    Effect.gen(function* () {
      const { responses, surahs } = yield* loadMalay;
      const rows = yield* parseResponseTranslation(responses, surahs);

      expect(rows).toHaveLength(6236);
    })
  );

  it.effect("rejects a Malay translation whose note marker has no note", () =>
    Effect.gen(function* () {
      const { responses, surahs } = yield* loadMalay;
      const unresolved = Arr.map(responses, (response, index) =>
        index === 0
          ? response.replace(
              TRANSLATION_PATTERN,
              '"translation":"Dengan nama Allah[9]"'
            )
          : response
      );
      const error = yield* parseResponseTranslation(unresolved, surahs).pipe(
        Effect.flip
      );

      expect(error.detail).toBe(
        "Invalid QuranEnc translation notes at verse 1."
      );
    })
  );
});

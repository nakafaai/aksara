import { expect, layer } from "@effect/vitest";
import { Array as Arr, Deferred, Effect, Fiber } from "effect";
import { HttpClient } from "effect/http";
import { TestClock } from "effect/testing";
import { downloadGermanQuranSource } from "#corpus/quran/source/download";
import {
  GERMAN_QURAN_EDITION_URL,
  GERMAN_QURAN_PUBLICATION_URL,
  GERMAN_QURAN_SOURCE_URL,
  GERMAN_QURAN_TERMS_URL,
  type PinnedQuranFile,
  QURAN_SOURCE_POLICY,
} from "#corpus/quran/source/policy";
import {
  QuranSyncFixture,
  quranSyncFixtureLayer,
  replaceQuranSyncSource,
  sourceClient,
} from "#corpus/test/quran/sync";

/** Downloads one pinned artifact through one HTTP adapter and keeps its typed result. */
const downloadResult = (
  source: PinnedQuranFile,
  url: string,
  http: ReturnType<typeof sourceClient>
) =>
  downloadGermanQuranSource(source, url).pipe(
    Effect.provideService(HttpClient.HttpClient, http),
    Effect.result
  );

layer(quranSyncFixtureLayer)("German Quran source download", (it) => {
  it.effect("rejects changed bytes for every pinned artifact", () =>
    Effect.gen(function* () {
      const fixture = yield* QuranSyncFixture;
      const edition = Uint8Array.from(fixture.edition);
      const translation = Uint8Array.from(fixture.translation);
      edition[0] = edition[0] === 0 ? 1 : 0;
      translation[0] = translation[0] === 0 ? 1 : 0;
      const { terms } = fixture;
      const cases: readonly (readonly [PinnedQuranFile, string, Uint8Array])[] =
        [
          [
            QURAN_SOURCE_POLICY.data.names.de,
            GERMAN_QURAN_EDITION_URL,
            edition,
          ],
          [
            QURAN_SOURCE_POLICY.evidence.germanPublication,
            GERMAN_QURAN_PUBLICATION_URL,
            fixture.publication.subarray(1),
          ],
          [
            QURAN_SOURCE_POLICY.terms.islamhouse,
            GERMAN_QURAN_TERMS_URL,
            terms.subarray(1),
          ],
          [
            QURAN_SOURCE_POLICY.data.translations.de,
            GERMAN_QURAN_SOURCE_URL,
            translation,
          ],
        ];
      const results = yield* Effect.forEach(
        cases,
        ([source, url, bytes]) =>
          downloadResult(
            source,
            url,
            sourceClient(
              replaceQuranSyncSource(fixture.sources, url, bytes),
              {}
            )
          ),
        { concurrency: "unbounded" }
      );

      expect(results).toMatchObject(
        Arr.map(cases, ([source]) => ({
          _tag: "Failure",
          failure: { phase: "integrity", source: source.name },
        }))
      );
    })
  );

  it.effect("classifies HTTP and bounded-body failures as downloads", () =>
    Effect.gen(function* () {
      const { sources, translation } = yield* QuranSyncFixture;
      const oversized = new Uint8Array(translation.byteLength + 1);
      const [response, body] = yield* Effect.all(
        [
          downloadResult(
            QURAN_SOURCE_POLICY.data.translations.de,
            GERMAN_QURAN_SOURCE_URL,
            sourceClient(sources, { status: 503 })
          ),
          downloadResult(
            QURAN_SOURCE_POLICY.data.translations.de,
            GERMAN_QURAN_SOURCE_URL,
            sourceClient(
              replaceQuranSyncSource(
                sources,
                GERMAN_QURAN_SOURCE_URL,
                oversized
              ),
              {}
            )
          ),
        ],
        { concurrency: "unbounded" }
      );

      expect([response, body]).toMatchObject([
        { _tag: "Failure", failure: { phase: "download" } },
        { _tag: "Failure", failure: { phase: "download" } },
      ]);
    })
  );

  it.effect("bounds a stalled official source download", () =>
    Effect.gen(function* () {
      const { sources } = yield* QuranSyncFixture;
      const stallStarted = yield* Deferred.make<void>();
      const fiber = yield* downloadResult(
        QURAN_SOURCE_POLICY.data.translations.de,
        GERMAN_QURAN_SOURCE_URL,
        sourceClient(sources, {
          stalledUrl: GERMAN_QURAN_SOURCE_URL,
          stallStarted,
        })
      ).pipe(Effect.forkChild);
      yield* Deferred.await(stallStarted);
      yield* TestClock.adjust("61 seconds");
      const result = yield* Fiber.join(fiber);

      expect(result).toMatchObject({
        _tag: "Failure",
        failure: {
          cause: "Official source download exceeded 60 seconds.",
          phase: "download",
          source: "quranenc-de.xml",
        },
      });
    })
  );
});

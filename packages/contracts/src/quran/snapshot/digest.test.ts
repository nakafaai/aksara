import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Schema, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
} from "#contracts/locale";
import { digestQuranRows } from "#contracts/quran/snapshot/digest";
import {
  QuranChunkRowSchema,
  type QuranSnapshotRow,
} from "#contracts/quran/snapshot/row";
import { bindQuranRow } from "#contracts/quran/snapshot/row/hash";
import { QuranAttributionRowSchema } from "#contracts/quran/source";
import { QuranSurahRowSchema } from "#contracts/quran/spec";
import { makeQuranTestRecords } from "#contracts/test/quran";

const activeAppLocales = ACTIVE_APP_LOCALES;
const enDeLocales = Schema.decodeSync(ActiveAppLocaleListSchema)(["en", "de"]);

/** Returns one typed current Quran digest failure. */
function reject(rows: readonly QuranSnapshotRow[], locales = activeAppLocales) {
  return digestQuranRows({
    activeAppLocales: locales,
    rows: Stream.fromIterable(rows),
  }).pipe(Effect.flip);
}

/** Returns the first current fixture row of one payload kind. */
function fixtureRow(
  records: readonly QuranSnapshotRow[],
  kind: QuranSnapshotRow["payload"]["kind"]
) {
  return Effect.fromOption(
    Arr.findFirst(records, (record) => record.payload.kind === kind)
  );
}

describe("Quran aggregate digest golden vectors", () => {
  it.effect(
    "pins the complete aggregate digests of the synthetic Quran test records",
    () =>
      Effect.gen(function* () {
        const records = yield* makeQuranTestRecords();
        const summary = yield* digestQuranRows({
          activeAppLocales,
          rows: Stream.fromIterable(records),
        });

        expect(summary).toEqual({
          attributionCount: 1,
          chunkCount: 1085,
          projectionCount: 1656,
          projectionDigest:
            "sha256:3a021aa207cc4db5570defa60b37eb16bd57ab843bcbfb80f549846b948236db",
          runtimeCount: 1200,
          runtimeDigest:
            "sha256:1f1eb6504ed9a910ca799f6f69c05181e4b9a446d455ca0716010c61b1133723",
          searchCount: 456,
          searchDigest:
            "sha256:d9e15b23c040cbd1cb5124e9ae09fcf648654da64f2c3140ec6e99e99935c888",
        });
      })
  );

  it.effect("keeps every aggregate digest under another stream chunking", () =>
    Effect.gen(function* () {
      const records = yield* makeQuranTestRecords();
      const chunked = yield* digestQuranRows({
        activeAppLocales,
        rows: Stream.fromIterable(records).pipe(Stream.rechunk(5)),
      });

      expect(chunked).toMatchObject({
        projectionDigest:
          "sha256:3a021aa207cc4db5570defa60b37eb16bd57ab843bcbfb80f549846b948236db",
        runtimeDigest:
          "sha256:1f1eb6504ed9a910ca799f6f69c05181e4b9a446d455ca0716010c61b1133723",
        searchDigest:
          "sha256:d9e15b23c040cbd1cb5124e9ae09fcf648654da64f2c3140ec6e99e99935c888",
      });
    })
  );
});

describe("Quran aggregate digest", () => {
  it.effect("rejects a release that activates German without German rows", () =>
    Effect.gen(function* () {
      const records = yield* makeQuranTestRecords();
      const error = yield* reject(records, enDeLocales);

      expect(error).toMatchObject({
        _tag: "QuranRowOrderError",
        expected:
          "quran-attribution:en,de:tanzil-text:tanzil-metadata:bubenheim-names:quranenc-english:quranenc-german:mokhtasar-english:mokhtasar-german",
      });
    })
  );

  it.effect("accepts no Tafsir when Indonesian is inactive", () =>
    Effect.gen(function* () {
      const records = yield* makeQuranTestRecords();
      const attribution = yield* fixtureRow(records, "quran-attribution");
      const surah = yield* fixtureRow(records, "quran-surah");
      const chunk = yield* fixtureRow(records, "quran-chunk");
      const attributionPayload = yield* Schema.decodeUnknownEffect(
        QuranAttributionRowSchema
      )(attribution.payload);
      const surahPayload = yield* Schema.decodeUnknownEffect(
        QuranSurahRowSchema
      )(surah.payload);
      const chunkPayload = yield* Schema.decodeUnknownEffect(
        QuranChunkRowSchema
      )(chunk.payload);
      const germanAttribution = yield* Schema.decodeUnknownEffect(
        QuranAttributionRowSchema
      )({
        ...attributionPayload,
        activeAppLocales: enDeLocales,
        sources: Arr.map(
          Arr.filter(attributionPayload.sources, (candidate) =>
            Arr.contains(
              [
                "tanzil-text",
                "tanzil-metadata",
                "bubenheim-names",
                "quranenc-english",
                "quranenc-german",
                "mokhtasar-english",
                "mokhtasar-german",
              ],
              candidate.id
            )
          ),
          (candidate) => ({
            ...candidate,
            copy: Arr.filter(candidate.copy, ({ appLocale }) =>
              Arr.contains(["en", "de"], appLocale)
            ),
          })
        ),
        tafsirAccess: Arr.filter(
          attributionPayload.tafsirAccess,
          ({ appLocale }) => Arr.contains(["en", "de"], appLocale)
        ),
      });
      const germanVerses = yield* Effect.forEach(chunkPayload.verses, (verse) =>
        Effect.gen(function* () {
          const english = yield* Effect.fromOption(
            Arr.findFirst(
              verse.translations,
              (translation) => translation.appLocale === "en"
            )
          );
          return {
            ...verse,
            tafsir: [],
            translations: [english, { ...english, appLocale: "de" }],
          };
        })
      );
      const germanChunk = yield* Schema.decodeUnknownEffect(
        QuranChunkRowSchema
      )({
        ...chunk.payload,
        verses: germanVerses,
      });
      const partial = yield* Effect.all([
        bindQuranRow(attribution.snapshotId, germanAttribution),
        bindQuranRow(surah.snapshotId, surahPayload),
        bindQuranRow(chunk.snapshotId, germanChunk),
      ]);
      const error = yield* reject(partial, enDeLocales);

      expect(error).toMatchObject({
        _tag: "QuranRowOrderError",
        expected: "end",
      });
    })
  );

  it.effect("rejects tampered, unordered, and incomplete current rows", () =>
    Effect.gen(function* () {
      const records = yield* makeQuranTestRecords();
      const first = yield* Effect.fromNullishOr(records[0]);
      const second = yield* Effect.fromNullishOr(records[1]);
      const tampered = {
        ...first,
        rowHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
      };
      const [integrityError, orderError, incompleteError] = yield* Effect.all([
        reject([tampered]),
        reject([second, first]),
        reject([first]),
      ]);

      expect(integrityError).toMatchObject({ _tag: "QuranRowIntegrityError" });
      expect(orderError).toMatchObject({ _tag: "QuranRowOrderError" });
      expect(incompleteError).toMatchObject({
        _tag: "QuranRowOrderError",
        expected: "end",
      });
    })
  );
});

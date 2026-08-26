import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema, Stream } from "effect";
import { vi } from "vitest";

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

const failures = vi.hoisted(
  (): { construct: boolean; stage: "digest" | "update" | null } => ({
    construct: false,
    stage: null,
  })
);
const QURAN_DIGEST_DOMAIN_PATTERN =
  /^nakafa\.aksara\.quran-(?:projection|runtime|search)\n/u;

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic failures into current Quran aggregate digests. */
    createHash(algorithm: string) {
      if (failures.construct) {
        throw new TypeError(
          "injected current Quran digest construction failure"
        );
      }
      const hash = crypto.createHash(algorithm);
      let aggregate = false;
      return new Proxy(hash, {
        /** Preserves native binding while intercepting selected operations. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (QURAN_DIGEST_DOMAIN_PATTERN.test(String(data))) {
                aggregate = true;
              } else if (aggregate && failures.stage === "update") {
                throw new TypeError(
                  "injected current Quran digest update failure"
                );
              }
              target.update(data);
              return receiver;
            };
          }
          if (
            property === "digest" &&
            aggregate &&
            failures.stage === "digest"
          ) {
            return () => {
              throw new TypeError(
                "injected current Quran digest finalization failure"
              );
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

const activeAppLocales = ACTIVE_APP_LOCALES;

/** Returns one typed current Quran digest failure. */
function reject(rows: readonly QuranSnapshotRow[], locales = activeAppLocales) {
  return digestQuranRows({
    activeAppLocales: locales,
    rows: Stream.fromIterable(rows),
  }).pipe(Effect.flip);
}

describe("Quran aggregate digest", () => {
  it.effect("rejects a release that activates German without German rows", () =>
    Effect.gen(function* () {
      const records = yield* makeQuranTestRecords();
      const germanLocales = yield* Schema.decodeEffect(
        ActiveAppLocaleListSchema
      )(["en", "de"]);
      const error = yield* reject(records, germanLocales);

      expect(error).toMatchObject({
        _tag: "QuranRowOrderError",
        expected:
          "quran-attribution:en,de:tanzil-text:tanzil-metadata:quranenc-english:quranenc-german:mokhtasar-english:mokhtasar-german",
      });
    })
  );

  it.effect("accepts no Tafsir when Indonesian is inactive", () =>
    Effect.gen(function* () {
      const records = yield* makeQuranTestRecords();
      const germanLocales = yield* Schema.decodeEffect(
        ActiveAppLocaleListSchema
      )(["en", "de"]);
      const attribution = yield* Effect.fromNullishOr(
        records.find((record) => record.payload.kind === "quran-attribution")
      );
      const surah = yield* Effect.fromNullishOr(
        records.find((record) => record.payload.kind === "quran-surah")
      );
      const chunk = yield* Effect.fromNullishOr(
        records.find((record) => record.payload.kind === "quran-chunk")
      );
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
        activeAppLocales: germanLocales,
        sources: attributionPayload.sources
          .filter((candidate) =>
            [
              "tanzil-text",
              "tanzil-metadata",
              "quranenc-english",
              "quranenc-german",
              "mokhtasar-english",
              "mokhtasar-german",
            ].includes(candidate.id)
          )
          .map((candidate) => ({
            ...candidate,
            copy: candidate.copy.filter(({ appLocale }) =>
              ["en", "de"].includes(appLocale)
            ),
          })),
        tafsirAccess: attributionPayload.tafsirAccess.filter(({ appLocale }) =>
          ["en", "de"].includes(appLocale)
        ),
      });
      const germanVerses = yield* Effect.forEach(chunkPayload.verses, (verse) =>
        Effect.gen(function* () {
          const english = yield* Effect.fromNullishOr(
            verse.translations.find(
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
      const error = yield* reject(partial, germanLocales);

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

  it.effect("maps digest construction, update, and finalization failures", () =>
    Effect.gen(function* () {
      const records = yield* makeQuranTestRecords();
      yield* Effect.addFinalizer(() =>
        Effect.sync(() => {
          failures.construct = false;
          failures.stage = null;
        })
      );
      yield* Effect.sync(() => {
        failures.construct = true;
      });
      const constructError = yield* reject([]);
      yield* Effect.sync(() => {
        failures.construct = false;
        failures.stage = "update";
      });
      const updateError = yield* reject(records.slice(0, 1));
      yield* Effect.sync(() => {
        failures.stage = "digest";
      });
      const digestError = yield* reject(records);

      expect(constructError).toMatchObject({
        _tag: "QuranRowHashError",
        scope: "row",
      });
      expect(updateError).toMatchObject({
        _tag: "QuranRowHashError",
        scope: "row",
      });
      expect(digestError).toMatchObject({
        _tag: "QuranRowHashError",
        scope: "row",
      });
    })
  );
});

import type { BinaryLike } from "node:crypto";
import { beforeAll, describe, expect, it } from "@nakafa/testing/effect";
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
import { bindQuranRow } from "#contracts/quran/snapshot/row-hash";
import { QuranAttributionRowSchema } from "#contracts/quran/source";
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
let records: readonly QuranSnapshotRow[];

beforeAll(async () => {
  records = await Effect.runPromise(makeQuranTestRecords());
}, 30_000);

/** Returns one typed current Quran digest failure. */
function reject(rows: readonly QuranSnapshotRow[], locales = activeAppLocales) {
  return Effect.runPromise(
    digestQuranRows({
      activeAppLocales: locales,
      rows: Stream.fromIterable(rows),
    }).pipe(Effect.flip)
  );
}

describe("Quran aggregate digest", () => {
  it("rejects a release that activates German without German rows", async () => {
    const germanLocales = Schema.decodeSync(ActiveAppLocaleListSchema)([
      "en",
      "de",
    ]);
    const error = await reject(records, germanLocales);

    expect(error).toMatchObject({
      _tag: "QuranRowOrderError",
      expected:
        "quran-attribution:en,de:tanzil-text:tanzil-metadata:quranenc-english:quranenc-german",
    });
  });

  it("accepts no Tafsir when Indonesian is inactive", async () => {
    const germanLocales = Schema.decodeSync(ActiveAppLocaleListSchema)([
      "en",
      "de",
    ]);
    const attribution = records.find(
      (record) => record.payload.kind === "quran-attribution"
    );
    const surah = records.find(
      (record) => record.payload.kind === "quran-surah"
    );
    const chunk = records.find(
      (record) => record.payload.kind === "quran-chunk"
    );
    if (
      !(
        attribution?.payload.kind === "quran-attribution" &&
        surah?.payload.kind === "quran-surah" &&
        chunk?.payload.kind === "quran-chunk"
      )
    ) {
      throw new Error("Expected current Quran digest fixtures.");
    }
    const source = attribution.payload.sources.find(
      (candidate) => candidate.id === "quranenc-indonesian"
    );
    if (source === undefined) {
      throw new Error("Expected an adaptable QuranEnc source fixture.");
    }
    const germanAttribution = Schema.decodeUnknownSync(
      QuranAttributionRowSchema
    )({
      ...attribution.payload,
      activeAppLocales: germanLocales,
      sources: [
        ...attribution.payload.sources
          .filter((candidate) =>
            ["tanzil-text", "tanzil-metadata", "quranenc-english"].includes(
              candidate.id
            )
          )
          .map((candidate) => ({
            ...candidate,
            copy: [
              candidate.copy[0],
              { ...candidate.copy[0], appLocale: "de" },
            ],
          })),
        {
          ...source,
          copy: [source.copy[0], { ...source.copy[0], appLocale: "de" }],
          id: "quranenc-german",
        },
      ],
    });
    const germanChunk = Schema.decodeUnknownSync(QuranChunkRowSchema)({
      ...chunk.payload,
      verses: chunk.payload.verses.map((verse) => {
        const english = verse.translations.find(
          (translation) => translation.appLocale === "en"
        );
        if (english === undefined) {
          throw new Error("Expected an English Quran translation fixture.");
        }
        return {
          ...verse,
          tafsir: [],
          translations: [english, { ...english, appLocale: "de" }],
        };
      }),
    });
    const partial = await Effect.runPromise(
      Effect.all([
        bindQuranRow(attribution.snapshotId, germanAttribution),
        bindQuranRow(surah.snapshotId, surah.payload),
        bindQuranRow(chunk.snapshotId, germanChunk),
      ])
    );
    const error = await reject(partial, germanLocales);

    expect(error).toMatchObject({
      _tag: "QuranRowOrderError",
      expected: "end",
    });
  });

  it("rejects tampered, unordered, and incomplete current rows", async () => {
    const [first, second] = records;
    if (!(first && second)) {
      throw new Error("Expected current Quran digest rows.");
    }
    const tampered = {
      ...first,
      rowHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    };
    const [integrityError, orderError, incompleteError] = await Promise.all([
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
  });

  it("maps digest construction, update, and finalization failures", async () => {
    failures.construct = true;
    const constructError = await reject([]);
    failures.construct = false;
    failures.stage = "update";
    const updateError = await reject(records.slice(0, 1));
    failures.stage = "digest";
    const digestError = await reject(records);
    failures.stage = null;

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
  });
});

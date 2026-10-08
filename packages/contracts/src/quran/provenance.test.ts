import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Record as Rec, Schema } from "effect";
import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
} from "#contracts/locale";
import {
  canonicalizeQuranProvenance,
  hashQuranProvenance,
  makeQuranProvenanceManifest,
  QuranProvenanceManifestSchema,
  QuranProvenanceRecordSchema,
  quranProvenanceScopes,
  quranSourceForProvenanceScope,
} from "#contracts/quran/provenance";
import { reverseObjectKeys } from "#contracts/test/order";
import {
  goldenArabicRecord,
  goldenRecords,
  record,
  records,
} from "#contracts/test/provenance";

const englishOnlyLocales = Schema.decodeSync(ActiveAppLocaleListSchema)(["en"]);

describe("Quran provenance golden identities", () => {
  it("pins the canonical bytes of an official provenance record", () => {
    expect(canonicalizeQuranProvenance(goldenArabicRecord)).toBe(
      '{"attribution":{"artifact":{"byteCount":1234,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":2},"copy":[{"appLocale":"en","notice":"Reviewed notice é","title":"Arabic text"}],"id":"tanzil-text","kind":"embedded","publisher":"Technical publisher for tanzil-text.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/tanzil-text","terms":{"artifact":{"byteCount":99,"digest":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","fileCount":1},"url":"https://example.test/terms-text"},"updateUrl":"https://example.test/update-text","version":"1.0"},"evidence":"Bukti é","scope":"arabic-text","status":"approved"}'
    );
  });

  it.effect(
    "pins the ordered digest and approved manifest of one English scope set",
    () =>
      Effect.gen(function* () {
        expect(
          yield* hashQuranProvenance({
            activeAppLocales: englishOnlyLocales,
            records: goldenRecords,
          })
        ).toBe(
          "sha256:63a6117489f4facf23b7870355cb5d128e446d960475331e83b3b97c8de91b38"
        );
        expect(
          yield* makeQuranProvenanceManifest({
            activeAppLocales: englishOnlyLocales,
            records: goldenRecords,
          })
        ).toMatchObject({
          digest:
            "sha256:63a6117489f4facf23b7870355cb5d128e446d960475331e83b3b97c8de91b38",
          status: "approved",
        });
      })
  );

  it("pins the exact provenance scope order for one and every active locale", () => {
    expect(quranProvenanceScopes(englishOnlyLocales)).toEqual([
      "arabic-text",
      "en-surah-name",
      "en-translation",
      "en-tafsir-access",
      "metadata",
    ]);
    expect(quranProvenanceScopes(ACTIVE_APP_LOCALES)).toEqual([
      "arabic-text",
      "en-surah-name",
      "en-translation",
      "en-tafsir-access",
      "id-surah-name",
      "id-translation",
      "id-tafsir",
      "de-surah-name",
      "de-translation",
      "de-tafsir-access",
      "metadata",
    ]);
  });

  it("pins the official source that proves each active provenance scope", () => {
    expect(
      quranProvenanceScopes(ACTIVE_APP_LOCALES).map((scope) => [
        scope,
        quranSourceForProvenanceScope(scope),
      ])
    ).toEqual([
      ["arabic-text", "tanzil-text"],
      ["en-surah-name", "tanzil-metadata"],
      ["en-translation", "quranenc-english"],
      ["en-tafsir-access", "mokhtasar-english"],
      ["id-surah-name", "kemenag-names"],
      ["id-translation", "quranenc-indonesian"],
      ["id-tafsir", "quranenc-tafsir"],
      ["de-surah-name", "bubenheim-names"],
      ["de-translation", "quranenc-german"],
      ["de-tafsir-access", "mokhtasar-german"],
      ["metadata", "tanzil-metadata"],
    ]);
  });
});

const failures = vi.hoisted(() => ({ hash: false }));

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects one deterministic provenance hashing failure. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Intercepts hash updates only while explicit failure state is active. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (failures.hash) {
                throw new TypeError("injected provenance hash failure");
              }
              target.update(data);
              return receiver;
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

describe("Quran provenance", () => {
  it.effect("canonicalizes, hashes, and derives the gate status", () =>
    Effect.gen(function* () {
      const approved = records("approved");
      const blocked = approved.map((source, index) =>
        index === 1 ? { ...source, status: "blocked" as const } : source
      );
      const approvedManifest = yield* makeQuranProvenanceManifest({
        activeAppLocales: ACTIVE_APP_LOCALES,
        records: approved,
      });
      const blockedManifest = yield* makeQuranProvenanceManifest({
        activeAppLocales: ACTIVE_APP_LOCALES,
        records: blocked,
      });
      const approvedRecord = yield* Effect.fromNullishOr(approved[0]);
      const canonical = canonicalizeQuranProvenance(approvedRecord);
      const decoded = yield* Schema.decodeEffect(
        Schema.fromJsonString(QuranProvenanceRecordSchema)
      )(canonical);

      expect(decoded).toEqual(approvedRecord);
      expect(approvedManifest.status).toBe("approved");
      expect(blockedManifest.status).toBe("blocked");
      expect(blockedManifest.digest).not.toBe(approvedManifest.digest);
    })
  );

  it.effect("keeps identity independent of object insertion order", () =>
    Effect.gen(function* () {
      const canonical = record("metadata", "approved");
      const reordered = reverseObjectKeys(canonical);
      const [canonicalHash, reorderedHash] = yield* Effect.all([
        hashQuranProvenance({
          activeAppLocales: ACTIVE_APP_LOCALES,
          records: [canonical],
        }),
        hashQuranProvenance({
          activeAppLocales: ACTIVE_APP_LOCALES,
          records: [reordered],
        }),
      ]);

      expect(Rec.keys(reordered)[0]).toBe("status");
      expect(canonicalizeQuranProvenance(reordered)).toBe(
        canonicalizeQuranProvenance(canonical)
      );
      expect(reorderedHash).toBe(canonicalHash);
    })
  );

  it.effect("requires exact ordered coverage for every active locale", () =>
    Effect.gen(function* () {
      const canonical = records("approved");
      const firstRecord = yield* Effect.fromNullishOr(canonical[0]);
      const manifest = yield* makeQuranProvenanceManifest({
        activeAppLocales: ACTIVE_APP_LOCALES,
        records: canonical,
      });
      const errors = yield* Effect.forEach(
        [
          canonical.slice(1),
          [...canonical].reverse(),
          [firstRecord, ...canonical],
        ],
        (candidate) =>
          makeQuranProvenanceManifest({
            activeAppLocales: ACTIVE_APP_LOCALES,
            records: candidate,
          }).pipe(Effect.flip),
        { concurrency: "unbounded" }
      );
      const incoherentStatus = Schema.decodeExit(QuranProvenanceManifestSchema)(
        {
          ...manifest,
          status: "blocked",
        }
      );
      const wrongSource = Schema.decodeUnknownExit(QuranProvenanceRecordSchema)(
        {
          ...firstRecord,
          attribution: {
            ...firstRecord.attribution,
            id: "tanzil-metadata",
          },
        }
      );
      const missingCoverage = Schema.decodeUnknownExit(
        QuranProvenanceManifestSchema
      )({ ...manifest, records: canonical.slice(1) });
      const missingCopy = Schema.decodeUnknownExit(
        QuranProvenanceManifestSchema
      )({
        ...manifest,
        records: canonical.map((candidate, index) =>
          index === 0
            ? {
                ...candidate,
                attribution: {
                  ...candidate.attribution,
                  copy: candidate.attribution.copy.slice(0, -1),
                },
              }
            : candidate
        ),
      });

      expect(manifest.records.map(({ scope }) => scope)).toEqual(
        quranProvenanceScopes(ACTIVE_APP_LOCALES)
      );
      expect(manifest.records).toContainEqual(
        expect.objectContaining({ scope: "de-translation" })
      );
      expect(manifest.records).toContainEqual(
        expect.objectContaining({ scope: "de-tafsir-access" })
      );
      expect(errors.map(({ _tag }) => _tag)).toEqual([
        "QuranProvenanceCoverageError",
        "QuranProvenanceCoverageError",
        "QuranProvenanceCoverageError",
      ]);
      expect(Exit.isFailure(incoherentStatus)).toBe(true);
      expect(
        Exit.isFailure(wrongSource) ? String(wrongSource.cause) : ""
      ).toContain("Expected each Quran scope to bind its official source.");
      expect(
        Exit.isFailure(missingCoverage) ? String(missingCoverage.cause) : ""
      ).toContain(
        "Expected exact active-locale Quran provenance scope coverage."
      );
      expect(Exit.isFailure(missingCopy)).toBe(true);
      expect(
        Exit.isFailure(incoherentStatus) ? String(incoherentStatus.cause) : ""
      ).toContain(
        "Expected Quran provenance status to match its complete evidence."
      );
    })
  );

  it.effect("maps Node hashing failures to the typed provenance error", () =>
    Effect.gen(function* () {
      yield* Effect.addFinalizer(() =>
        Effect.sync(() => {
          failures.hash = false;
        })
      );
      yield* Effect.sync(() => {
        failures.hash = true;
      });
      const error = yield* hashQuranProvenance({
        activeAppLocales: ACTIVE_APP_LOCALES,
        records: records("approved"),
      }).pipe(Effect.flip);

      expect(error._tag).toBe("QuranProvenanceHashError");
    })
  );
});

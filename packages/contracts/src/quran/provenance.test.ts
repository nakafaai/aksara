import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Exit, Schema } from "effect";
import { vi } from "vitest";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
} from "#contracts/locale";
import {
  canonicalizeQuranProvenance,
  hashQuranProvenance,
  makeQuranProvenanceManifest,
  QuranProvenanceManifestSchema,
  QuranProvenanceRecordSchema,
  type QuranProvenanceScope,
  quranProvenanceScopes,
} from "#contracts/quran/provenance";
import type { QuranSourceId } from "#contracts/quran/source";
import { reverseObjectKeys } from "#contracts/test/order";

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

/** Resolves the official source required by one reviewed provenance field. */
function sourceForScope(scope: QuranProvenanceScope): QuranSourceId {
  if (scope === "arabic-text") {
    return "tanzil-text";
  }
  if (scope === "metadata") {
    return "tanzil-metadata";
  }
  if (scope === "en-translation") {
    return "quranenc-english";
  }
  if (scope === "id-translation") {
    return "quranenc-indonesian";
  }
  if (scope === "de-translation") {
    return "quranenc-german";
  }
  if (scope === "en-tafsir-access") {
    return "mokhtasar-english";
  }
  if (scope === "de-tafsir-access") {
    return "mokhtasar-german";
  }
  return "quranenc-tafsir";
}

/** Builds one exact technical provenance record. */
function record(
  scope: QuranProvenanceScope,
  status: "approved" | "blocked",
  activeAppLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
) {
  const source = sourceForScope(scope);
  const common = {
    copy: activeAppLocales.map((appLocale) => ({
      appLocale,
      notice: `Reviewed ${appLocale} notice ${source}.`,
      title: `Reviewed ${appLocale} title ${source}.`,
    })),
    publisher: `Reviewed publisher ${source}.`,
    retrievedAt: "2026-07-24T17:57:50Z",
    sourceUrl: `https://example.com/source/${source}`,
    updateUrl: `https://example.com/update/${source}`,
    version: "test-source-version",
  };
  const attribution =
    source === "mokhtasar-english" || source === "mokhtasar-german"
      ? {
          ...common,
          id: source,
          kind: "external",
          terms: {
            access: "link-only",
            url: `https://example.com/terms/${source}`,
          },
        }
      : {
          artifact: {
            byteCount: 1,
            digest: `sha256:${"a".repeat(64)}`,
            fileCount: 1,
          },
          ...common,
          id: source,
          kind: "embedded",
          terms: {
            artifact: {
              byteCount: 1,
              digest: `sha256:${"b".repeat(64)}`,
              fileCount: 1,
            },
            url: `https://example.com/terms/${source}`,
          },
        };
  return Schema.decodeUnknownSync(QuranProvenanceRecordSchema)({
    attribution,
    evidence: "Reviewed source statement.",
    scope,
    status,
  });
}

/** Builds complete provenance for one exact active application locale set. */
function records(
  status: "approved" | "blocked",
  activeAppLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
) {
  return quranProvenanceScopes(activeAppLocales).map((scope) =>
    record(scope, status, activeAppLocales)
  );
}

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

      expect(Object.keys(reordered)[0]).toBe("status");
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
      const errors = yield* Effect.all(
        [
          canonical.slice(1),
          [...canonical].reverse(),
          [firstRecord, ...canonical],
        ].map((candidate) =>
          makeQuranProvenanceManifest({
            activeAppLocales: ACTIVE_APP_LOCALES,
            records: candidate,
          }).pipe(Effect.flip)
        ),
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

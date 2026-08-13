import type { BinaryLike } from "node:crypto";

import { Effect, Either, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
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
  return "quranenc-tafsir";
}

/** Builds one exact technical provenance record. */
function record(
  scope: QuranProvenanceScope,
  status: "approved" | "blocked",
  activeAppLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
) {
  const source = sourceForScope(scope);
  return Schema.decodeUnknownSync(QuranProvenanceRecordSchema)({
    attribution: {
      artifact: {
        byteCount: 1,
        digest: `sha256:${"a".repeat(64)}`,
        fileCount: 1,
      },
      copy: activeAppLocales.map((appLocale) => ({
        appLocale,
        notice: `Reviewed ${appLocale} notice ${source}.`,
        title: `Reviewed ${appLocale} title ${source}.`,
      })),
      id: source,
      publisher: `Reviewed publisher ${source}.`,
      retrievedAt: "2026-07-24T17:57:50Z",
      sourceUrl: `https://example.com/source/${source}`,
      terms: {
        artifact: {
          byteCount: 1,
          digest: `sha256:${"b".repeat(64)}`,
          fileCount: 1,
        },
        url: `https://example.com/terms/${source}`,
      },
      updateUrl: `https://example.com/update/${source}`,
      version: "test-source-version",
    },
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
  it("canonicalizes, hashes, and derives the gate status", async () => {
    const approved = records("approved");
    const blocked = approved.map((source, index) =>
      index === 1 ? { ...source, status: "blocked" as const } : source
    );
    const approvedManifest = await Effect.runPromise(
      makeQuranProvenanceManifest({
        activeAppLocales: ACTIVE_APP_LOCALES,
        records: approved,
      })
    );
    const blockedManifest = await Effect.runPromise(
      makeQuranProvenanceManifest({
        activeAppLocales: ACTIVE_APP_LOCALES,
        records: blocked,
      })
    );
    const [approvedRecord] = approved;

    expect(approvedRecord).toBeDefined();
    if (approvedRecord === undefined) {
      return;
    }
    expect(canonicalizeQuranProvenance(approvedRecord)).toBe(
      JSON.stringify(approvedRecord)
    );
    expect(approvedManifest.status).toBe("approved");
    expect(blockedManifest.status).toBe("blocked");
    expect(blockedManifest.digest).not.toBe(approvedManifest.digest);
  });

  it("keeps identity independent of object insertion order", async () => {
    const canonical = record("metadata", "approved");
    const reordered = reverseObjectKeys(canonical);
    const [canonicalHash, reorderedHash] = await Effect.runPromise(
      Effect.all([
        hashQuranProvenance({
          activeAppLocales: ACTIVE_APP_LOCALES,
          records: [canonical],
        }),
        hashQuranProvenance({
          activeAppLocales: ACTIVE_APP_LOCALES,
          records: [reordered],
        }),
      ])
    );

    expect(Object.keys(reordered)[0]).toBe("status");
    expect(canonicalizeQuranProvenance(reordered)).toBe(
      canonicalizeQuranProvenance(canonical)
    );
    expect(reorderedHash).toBe(canonicalHash);
  });

  it("requires exact ordered coverage for every active locale", async () => {
    const germanLocales = ActiveAppLocaleListSchema.make([
      AppLocaleSchema.make("en"),
      AppLocaleSchema.make("id"),
      AppLocaleSchema.make("de"),
    ]);
    const canonical = records("approved", germanLocales);
    const [firstRecord] = canonical;
    expect(firstRecord).toBeDefined();
    if (firstRecord === undefined) {
      return;
    }
    const manifest = await Effect.runPromise(
      makeQuranProvenanceManifest({
        activeAppLocales: germanLocales,
        records: canonical,
      })
    );
    const errors = await Promise.all(
      [
        canonical.slice(1),
        [...canonical].reverse(),
        [firstRecord, ...canonical],
      ].map((candidate) =>
        Effect.runPromise(
          makeQuranProvenanceManifest({
            activeAppLocales: germanLocales,
            records: candidate,
          }).pipe(Effect.flip)
        )
      )
    );
    const incoherentStatus = Schema.decodeUnknownEither(
      QuranProvenanceManifestSchema
    )({ ...manifest, status: "blocked" });
    const wrongSource = Schema.decodeUnknownEither(QuranProvenanceRecordSchema)(
      {
        ...firstRecord,
        attribution: {
          ...firstRecord.attribution,
          id: "tanzil-metadata",
        },
      }
    );
    const missingCoverage = Schema.decodeUnknownEither(
      QuranProvenanceManifestSchema
    )({ ...manifest, records: canonical.slice(1) });
    const missingCopy = Schema.decodeUnknownEither(
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
      quranProvenanceScopes(germanLocales)
    );
    expect(manifest.records).toContainEqual(
      expect.objectContaining({ scope: "de-translation" })
    );
    expect(errors.map(({ _tag }) => _tag)).toEqual([
      "QuranProvenanceCoverageError",
      "QuranProvenanceCoverageError",
      "QuranProvenanceCoverageError",
    ]);
    expect(Either.isLeft(incoherentStatus)).toBe(true);
    expect(
      Either.isLeft(wrongSource) ? String(wrongSource.left) : ""
    ).toContain("Expected each Quran scope to bind its official source.");
    expect(
      Either.isLeft(missingCoverage) ? String(missingCoverage.left) : ""
    ).toContain(
      "Expected exact active-locale Quran provenance scope coverage."
    );
    expect(Either.isLeft(missingCopy)).toBe(true);
    expect(
      Either.isLeft(incoherentStatus) ? String(incoherentStatus.left) : ""
    ).toContain(
      "Expected Quran provenance status to match its complete evidence."
    );
  });

  it("maps Node hashing failures to the typed provenance error", async () => {
    failures.hash = true;
    const error = await Effect.runPromise(
      hashQuranProvenance({
        activeAppLocales: ACTIVE_APP_LOCALES,
        records: records("approved"),
      }).pipe(Effect.flip)
    );
    failures.hash = false;

    expect(error._tag).toBe("QuranProvenanceHashError");
  });
});

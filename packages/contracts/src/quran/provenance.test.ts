import type { BinaryLike } from "node:crypto";

import { Effect, Either, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";

import {
  canonicalizeQuranProvenance,
  hashQuranProvenance,
  makeQuranProvenanceManifest,
  QuranProvenanceManifestSchema,
  QuranProvenanceRecordSchema,
  QuranProvenanceScopeSchema,
} from "#contracts/quran/provenance";
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

/** Builds one exact technical provenance record. */
function record(
  scope: typeof QuranProvenanceScopeSchema.Type,
  status: "approved" | "blocked",
  source = "primary"
) {
  return Schema.decodeUnknownSync(QuranProvenanceRecordSchema)({
    evidence: "Reviewed source statement.",
    provider: `Reviewed provider ${source}`,
    retrievedOn: "2026-07-24",
    scope,
    sourceUrl: `https://example.com/${source}`,
    status,
  });
}

/** Builds complete exact-scope provenance with one selected source status. */
function records(status: "approved" | "blocked") {
  return QuranProvenanceScopeSchema.literals.map((scope) =>
    record(scope, status)
  );
}

describe("Quran provenance", () => {
  it("canonicalizes, hashes, and derives approved or blocked status", async () => {
    const approved = records("approved");
    const blocked = records("approved").map((source, index) =>
      index === 1 ? { ...source, status: "blocked" as const } : source
    );
    const approvedManifest = await Effect.runPromise(
      makeQuranProvenanceManifest(approved)
    );
    const blockedManifest = await Effect.runPromise(
      makeQuranProvenanceManifest(blocked)
    );
    const [first] = approved;
    if (first === undefined) {
      throw new Error("Expected complete Quran provenance records.");
    }

    expect(canonicalizeQuranProvenance(first)).toBe(JSON.stringify(first));
    expect(approvedManifest.status).toBe("approved");
    expect(blockedManifest.status).toBe("blocked");
    expect(blockedManifest.digest).not.toBe(approvedManifest.digest);
  });

  it("keeps provenance identity independent of object insertion order", async () => {
    const canonical = record("metadata", "approved");
    const reordered = reverseObjectKeys(canonical);
    const [canonicalHash, reorderedHash] = await Effect.runPromise(
      Effect.all([
        hashQuranProvenance([canonical]),
        hashQuranProvenance([reordered]),
      ])
    );

    expect(Object.keys(reordered)[0]).toBe("status");
    expect(canonicalizeQuranProvenance(reordered)).toBe(
      canonicalizeQuranProvenance(canonical)
    );
    expect(reorderedHash).toBe(canonicalHash);
  });

  it("supports composite scopes and rejects missing or duplicate sources", async () => {
    const canonical = records("approved");
    const reversed = [...canonical].reverse();
    const [first] = canonical;
    if (first === undefined) {
      throw new Error("Expected complete Quran provenance records.");
    }
    const duplicate = [first, ...canonical];
    const composite = [
      ...canonical,
      record("metadata", "blocked", "secondary"),
    ];
    const sameProvider = [
      ...canonical,
      {
        ...record("metadata", "approved", "secondary"),
        provider: "Reviewed provider primary",
      },
      {
        ...record("metadata", "approved", "alpha"),
        provider: "Reviewed provider primary",
      },
    ];
    const mixedProviders = [
      ...canonical,
      {
        ...record("metadata", "approved", "zulu"),
        provider: "Zulu provider",
      },
      {
        ...record("metadata", "approved", "alpha"),
        provider: "Alpha provider",
      },
    ];
    const canonicalManifest = await Effect.runPromise(
      makeQuranProvenanceManifest(canonical)
    );
    const reversedManifest = await Effect.runPromise(
      makeQuranProvenanceManifest(reversed)
    );
    const compositeManifest = await Effect.runPromise(
      makeQuranProvenanceManifest(composite)
    );
    const sameProviderManifest = await Effect.runPromise(
      makeQuranProvenanceManifest(sameProvider)
    );
    const mixedProviderManifest = await Effect.runPromise(
      makeQuranProvenanceManifest(mixedProviders)
    );
    const errors = await Promise.all([
      Effect.runPromise(
        makeQuranProvenanceManifest(canonical.slice(1)).pipe(Effect.flip)
      ),
      Effect.runPromise(
        makeQuranProvenanceManifest(duplicate).pipe(Effect.flip)
      ),
    ]);
    const missingCoverage = Schema.decodeUnknownEither(
      QuranProvenanceManifestSchema
    )({
      ...canonicalManifest,
      records: canonical.slice(1),
    });
    const incoherentStatus = Schema.decodeUnknownEither(
      QuranProvenanceManifestSchema
    )({
      ...canonicalManifest,
      status: "blocked",
    });
    const outOfOrder = Schema.decodeUnknownEither(
      QuranProvenanceManifestSchema
    )({
      ...canonicalManifest,
      records: [...canonicalManifest.records].reverse(),
    });
    if (
      Either.isRight(missingCoverage) ||
      Either.isRight(incoherentStatus) ||
      Either.isRight(outOfOrder)
    ) {
      throw new Error("Expected exact Quran provenance schema failures.");
    }

    expect(reversedManifest).toEqual(canonicalManifest);
    expect(compositeManifest.records).toHaveLength(8);
    expect(compositeManifest.status).toBe("blocked");
    expect(
      sameProviderManifest.records
        .filter(
          ({ provider, scope }) =>
            provider === "Reviewed provider primary" && scope === "metadata"
        )
        .map(({ sourceUrl }) => sourceUrl)
    ).toEqual([
      "https://example.com/alpha",
      "https://example.com/primary",
      "https://example.com/secondary",
    ]);
    expect(
      mixedProviderManifest.records
        .filter(({ scope }) => scope === "metadata")
        .map(({ provider }) => provider)
    ).toEqual(["Alpha provider", "Reviewed provider primary", "Zulu provider"]);
    expect(errors.map(({ _tag }) => _tag)).toEqual([
      "QuranProvenanceCoverageError",
      "QuranProvenanceCoverageError",
    ]);
    expect(String(missingCoverage.left)).toContain(
      "Expected complete Quran provenance scopes"
    );
    expect(String(incoherentStatus.left)).toContain(
      "Expected Quran provenance status to match"
    );
    expect(String(outOfOrder.left)).toContain(
      "Expected complete Quran provenance scopes"
    );
  });

  it("maps Node hashing failures to the typed provenance error", async () => {
    failures.hash = true;
    const error = await Effect.runPromise(
      hashQuranProvenance(records("approved")).pipe(Effect.flip)
    );
    failures.hash = false;

    expect(error._tag).toBe("QuranProvenanceHashError");
  });
});

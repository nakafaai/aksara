import type { BinaryLike } from "node:crypto";

import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";

import {
  canonicalizeQuranProvenance,
  hashQuranProvenance,
  makeQuranProvenanceManifest,
  QuranProvenanceRecordSchema,
} from "#contracts/quran/provenance";

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
function record(status: "approved" | "blocked") {
  return Schema.decodeUnknownSync(QuranProvenanceRecordSchema)({
    evidence: "Reviewed source statement.",
    provider: "Reviewed provider",
    retrievedOn: "2026-07-24",
    scope: "metadata",
    sourceUrl: "https://example.com/source",
    status,
  });
}

describe("Quran provenance", () => {
  it("canonicalizes, hashes, and derives approved or blocked status", async () => {
    const approved = record("approved");
    const blocked = record("blocked");
    const approvedManifest = await Effect.runPromise(
      makeQuranProvenanceManifest([approved])
    );
    const blockedManifest = await Effect.runPromise(
      makeQuranProvenanceManifest([approved, blocked])
    );

    expect(canonicalizeQuranProvenance(approved)).toBe(
      JSON.stringify(approved)
    );
    expect(approvedManifest.status).toBe("approved");
    expect(blockedManifest.status).toBe("blocked");
    expect(blockedManifest.digest).not.toBe(approvedManifest.digest);
  });

  it("maps Node hashing failures to the typed provenance error", async () => {
    failures.hash = true;
    const error = await Effect.runPromise(
      hashQuranProvenance([record("approved")]).pipe(Effect.flip)
    );
    failures.hash = false;

    expect(error._tag).toBe("QuranProvenanceHashError");
  });
});

// @vitest-environment node
import type { BinaryLike } from "node:crypto";

import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";

import {
  decodeStoredRelease,
  decodeStoredTryoutRow,
  decodeStoredTryoutSnapshot,
  StoredReleaseDecodeError,
  StoredReleaseHashMismatchError,
  StoredTryoutRowDecodeError,
  StoredTryoutRowHashMismatchError,
  StoredTryoutSnapshotDecodeError,
  StoredTryoutSnapshotHashMismatchError,
} from "#contracts/history/decode";
import {
  ContentVerificationKeyResolver,
  SignatureInvalidError,
} from "#contracts/signature/spec";
import {
  retainedKeyResolver,
  retainedRelease,
  retainedTryoutCatalogRow,
  retainedTryoutPlacementRow,
  retainedTryoutPlacementWithHashRow,
  retainedTryoutSnapshot,
} from "#contracts/test/history";

const hashFailures = vi.hoisted(() => ({ active: false }));

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Creates a real hash whose update call supports deterministic failure. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Intercepts update while preserving every other real hash method. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (hashFailures.active) {
                throw new TypeError("injected retained-content hash failure");
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

/** Decodes one retained release with its frozen verification key. */
function readRelease(input: unknown) {
  return Effect.runPromise(
    decodeStoredRelease(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, retainedKeyResolver)
    )
  );
}

describe("stored history decoding", () => {
  it("authenticates one frozen release without exposing an old writer", async () => {
    await expect(readRelease(retainedRelease)).resolves.toEqual(
      retainedRelease
    );
  });

  it("rejects unknown, hash-mismatched, and unauthenticated release bytes", async () => {
    const failures = await Promise.all([
      Effect.runPromise(
        decodeStoredRelease({ ...retainedRelease, unexpected: true }).pipe(
          Effect.provideService(
            ContentVerificationKeyResolver,
            retainedKeyResolver
          ),
          Effect.flip
        )
      ),
      Effect.runPromise(
        decodeStoredRelease({
          ...retainedRelease,
          manifestHash:
            "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        }).pipe(
          Effect.provideService(
            ContentVerificationKeyResolver,
            retainedKeyResolver
          ),
          Effect.flip
        )
      ),
      Effect.runPromise(
        decodeStoredRelease({
          ...retainedRelease,
          signature: `Z${retainedRelease.signature.slice(1)}`,
        }).pipe(
          Effect.provideService(
            ContentVerificationKeyResolver,
            retainedKeyResolver
          ),
          Effect.flip
        )
      ),
    ]);

    expect(failures[0]).toBeInstanceOf(StoredReleaseDecodeError);
    expect(failures[1]).toBeInstanceOf(StoredReleaseHashMismatchError);
    expect(failures[2]).toBeInstanceOf(SignatureInvalidError);
    expect(failures[0].message).toContain("immutable history contract");
    expect(failures[1].message).toContain("retained-release");
  });

  it("maps retained release, snapshot, and row hashing failures", async () => {
    hashFailures.active = true;
    const [releaseError, snapshotError, rowError] = await Promise.all([
      Effect.runPromise(
        decodeStoredRelease(retainedRelease).pipe(
          Effect.provideService(
            ContentVerificationKeyResolver,
            retainedKeyResolver
          ),
          Effect.flip
        )
      ),
      Effect.runPromise(
        decodeStoredTryoutSnapshot(retainedTryoutSnapshot).pipe(Effect.flip)
      ),
      Effect.runPromise(
        decodeStoredTryoutRow(retainedTryoutCatalogRow).pipe(Effect.flip)
      ),
    ]);
    hashFailures.active = false;

    expect(releaseError.message).toBe(
      "Stored release bytes could not be hashed."
    );
    expect(snapshotError.message).toBe(
      "Stored tryout-snapshot bytes could not be hashed."
    );
    expect(rowError.message).toBe(
      "Stored tryout-row bytes could not be hashed."
    );
  });

  it("authenticates frozen try-out facts and rejects altered old bytes", async () => {
    await expect(
      Effect.runPromise(decodeStoredTryoutSnapshot(retainedTryoutSnapshot))
    ).resolves.toEqual(retainedTryoutSnapshot);

    const [decodeError, hashError] = await Promise.all([
      Effect.runPromise(
        decodeStoredTryoutSnapshot({
          ...retainedTryoutSnapshot,
          unexpected: true,
        }).pipe(Effect.flip)
      ),
      Effect.runPromise(
        decodeStoredTryoutSnapshot({
          ...retainedTryoutSnapshot,
          snapshotId:
            "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        }).pipe(Effect.flip)
      ),
    ]);

    expect(decodeError).toBeInstanceOf(StoredTryoutSnapshotDecodeError);
    expect(hashError).toBeInstanceOf(StoredTryoutSnapshotHashMismatchError);
    expect(decodeError.message).toContain("immutable history contract");
    expect(hashError.message).toContain("content-addressed identity");
  });

  it("authenticates retained catalog and both placement row shapes", async () => {
    const rows = await Promise.all(
      [
        retainedTryoutCatalogRow,
        retainedTryoutPlacementRow,
        retainedTryoutPlacementWithHashRow,
      ].map((row) => Effect.runPromise(decodeStoredTryoutRow(row)))
    );

    expect(rows).toEqual([
      retainedTryoutCatalogRow,
      retainedTryoutPlacementRow,
      retainedTryoutPlacementWithHashRow,
    ]);
  });

  it("rejects unknown and hash-mismatched retained row bytes", async () => {
    const [decodeError, hashError] = await Promise.all([
      Effect.runPromise(
        decodeStoredTryoutRow({
          ...retainedTryoutCatalogRow,
          unexpected: true,
        }).pipe(Effect.flip)
      ),
      Effect.runPromise(
        decodeStoredTryoutRow({
          ...retainedTryoutPlacementRow,
          record: {
            ...retainedTryoutPlacementRow.record,
            row: {
              ...retainedTryoutPlacementRow.record.row,
              title: "Changed retained title",
            },
          },
        }).pipe(Effect.flip)
      ),
    ]);

    expect(decodeError).toBeInstanceOf(StoredTryoutRowDecodeError);
    expect(hashError).toBeInstanceOf(StoredTryoutRowHashMismatchError);
    expect(decodeError.message).toContain("immutable history contract");
    expect(hashError).toMatchObject({ rowKind: "placement" });
    expect(hashError.message).toContain("content-addressed identity");
  });

  it.each([
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-01",
    "question-bank/tryout/indonesia/snbt/question-99/general-reasoning/set-1/question-1",
  ])(
    "rejects question roots outside the exact retained grammar: %s",
    async (root) => {
      const source = retainedTryoutPlacementRow.record.row;
      const error = await Effect.runPromise(
        decodeStoredTryoutRow({
          ...retainedTryoutPlacementRow,
          record: {
            ...retainedTryoutPlacementRow.record,
            row: {
              ...source,
              answerContentKey: `${root}/answer`,
              questionContentKey: `${root}/question`,
              questionSourcePath: `packages/corpus/${root}`,
            },
          },
        }).pipe(Effect.flip)
      );

      expect(error).toBeInstanceOf(StoredTryoutRowDecodeError);
    }
  );
});

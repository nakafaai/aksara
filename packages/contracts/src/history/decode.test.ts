// @vitest-environment node

import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { vi } from "vitest";

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

/** Decodes one retained release with its frozen verification key. */
function readRelease(input: unknown) {
  return decodeStoredRelease(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, retainedKeyResolver)
  );
}

/** Returns one expected retained release decoding failure. */
function rejectRelease(input: unknown) {
  return readRelease(input).pipe(Effect.flip);
}

describe("stored history decoding", () => {
  it.effect(
    "authenticates one frozen release without exposing an old writer",
    () =>
      Effect.gen(function* () {
        expect(yield* readRelease(retainedRelease)).toEqual(retainedRelease);
      })
  );

  it.effect(
    "rejects unknown, hash-mismatched, and unauthenticated release bytes",
    () =>
      Effect.gen(function* () {
        const failures = yield* Effect.all([
          rejectRelease({ ...retainedRelease, unexpected: true }),
          rejectRelease({
            ...retainedRelease,
            manifestHash:
              "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          }),
          rejectRelease({
            ...retainedRelease,
            signature: `Z${retainedRelease.signature.slice(1)}`,
          }),
        ]);

        expect(failures[0]).toBeInstanceOf(StoredReleaseDecodeError);
        expect(failures[1]).toBeInstanceOf(StoredReleaseHashMismatchError);
        expect(failures[2]).toBeInstanceOf(SignatureInvalidError);
        expect(failures[0].message).toContain("immutable history contract");
        expect(failures[1].message).toContain("retained-release");
      })
  );

  it.effect("maps retained release, snapshot, and row hashing failures", () =>
    Effect.gen(function* () {
      yield* Effect.acquireRelease(
        Effect.sync(() =>
          vi
            .spyOn(crypto.subtle, "digest")
            .mockRejectedValue(new TypeError("injected retained hash failure"))
        ),
        (mock) => Effect.sync(() => mock.mockRestore())
      );
      const [releaseError, snapshotError, rowError] = yield* Effect.all([
        rejectRelease(retainedRelease),
        decodeStoredTryoutSnapshot(retainedTryoutSnapshot).pipe(Effect.flip),
        decodeStoredTryoutRow(retainedTryoutCatalogRow).pipe(Effect.flip),
      ]);

      expect(releaseError.message).toBe(
        "Stored release bytes could not be hashed."
      );
      expect(snapshotError.message).toBe(
        "Stored tryout-snapshot bytes could not be hashed."
      );
      expect(rowError.message).toBe(
        "Stored tryout-row bytes could not be hashed."
      );
    })
  );

  it.effect(
    "authenticates frozen try-out facts and rejects altered old bytes",
    () =>
      Effect.gen(function* () {
        expect(
          yield* decodeStoredTryoutSnapshot(retainedTryoutSnapshot)
        ).toEqual(retainedTryoutSnapshot);

        const [decodeError, hashError] = yield* Effect.all([
          decodeStoredTryoutSnapshot({
            ...retainedTryoutSnapshot,
            unexpected: true,
          }).pipe(Effect.flip),
          decodeStoredTryoutSnapshot({
            ...retainedTryoutSnapshot,
            snapshotId:
              "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          }).pipe(Effect.flip),
        ]);

        expect(decodeError).toBeInstanceOf(StoredTryoutSnapshotDecodeError);
        expect(hashError).toBeInstanceOf(StoredTryoutSnapshotHashMismatchError);
        expect(decodeError.message).toContain("immutable history contract");
        expect(hashError.message).toContain("content-addressed identity");
      })
  );

  it.effect(
    "authenticates retained catalog and both placement row shapes",
    () =>
      Effect.gen(function* () {
        const rows = yield* Effect.all([
          decodeStoredTryoutRow(retainedTryoutCatalogRow),
          decodeStoredTryoutRow(retainedTryoutPlacementRow),
          decodeStoredTryoutRow(retainedTryoutPlacementWithHashRow),
        ]);

        expect(rows).toEqual([
          retainedTryoutCatalogRow,
          retainedTryoutPlacementRow,
          retainedTryoutPlacementWithHashRow,
        ]);
      })
  );

  it.effect("rejects unknown and hash-mismatched retained row bytes", () =>
    Effect.gen(function* () {
      const [decodeError, hashError] = yield* Effect.all([
        decodeStoredTryoutRow({
          ...retainedTryoutCatalogRow,
          unexpected: true,
        }).pipe(Effect.flip),
        decodeStoredTryoutRow({
          ...retainedTryoutPlacementRow,
          record: {
            ...retainedTryoutPlacementRow.record,
            row: {
              ...retainedTryoutPlacementRow.record.row,
              title: "Changed retained title",
            },
          },
        }).pipe(Effect.flip),
      ]);

      expect(decodeError).toBeInstanceOf(StoredTryoutRowDecodeError);
      expect(hashError).toBeInstanceOf(StoredTryoutRowHashMismatchError);
      expect(decodeError.message).toContain("immutable history contract");
      expect(hashError).toMatchObject({ rowKind: "placement" });
      expect(hashError.message).toContain("content-addressed identity");
    })
  );

  it.effect.each([
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-01",
    "question-bank/tryout/indonesia/snbt/question-99/general-reasoning/set-1/question-1",
  ])("rejects question roots outside the exact retained grammar: %s", (root) =>
    Effect.gen(function* () {
      const source = retainedTryoutPlacementRow.record.row;
      const error = yield* decodeStoredTryoutRow({
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
      }).pipe(Effect.flip);

      expect(error).toBeInstanceOf(StoredTryoutRowDecodeError);
    })
  );
});

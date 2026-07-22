import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ContentReleaseStatusRequestSchema,
  ContentReleaseStatusSchema,
  ReleaseCleanupReceiptSchema,
  ReleaseCleanupRequestSchema,
} from "#contracts/release/lifecycle";

const releaseId = "release-lifecycle";
const manifestHash = `sha256:${"b".repeat(64)}`;
const receipt = {
  activatedHeads: 1,
  deletedHeads: 0,
  projectionDigest: `sha256:${"a".repeat(64)}`,
  releaseId,
  stagedArtifacts: 1,
  stagedItems: 1,
  stagedProjections: 1,
};

describe("release lifecycle", () => {
  it("decodes resumable phases and requires a completed receipt", () => {
    for (const phase of [
      "missing",
      "staging",
      "verifying",
      "verified",
      "active",
      "finalizing",
      "aborted",
    ]) {
      expect(
        Either.isRight(
          Schema.decodeUnknownEither(ContentReleaseStatusSchema)({
            manifestHash,
            phase,
            releaseId,
          })
        )
      ).toBe(true);
    }
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(ContentReleaseStatusSchema)({
          manifestHash,
          phase: "completed",
          releaseId,
        })
      )
    ).toBe(true);
    expect(
      Either.isRight(
        Schema.decodeUnknownEither(ContentReleaseStatusSchema)({
          manifestHash,
          phase: "completed",
          receipt,
          releaseId,
        })
      )
    ).toBe(true);
    const mismatchedReceipt = Schema.decodeUnknownEither(
      ContentReleaseStatusSchema
    )({
      manifestHash,
      phase: "completed",
      receipt: { ...receipt, releaseId: "release-other" },
      releaseId,
    });
    expect(Either.isLeft(mismatchedReceipt)).toBe(true);
    if (Either.isLeft(mismatchedReceipt)) {
      expect(String(mismatchedReceipt.left)).toContain(
        "Expected the completed receipt to match the release status identity."
      );
    }
  });

  it("requires both immutable identity fields for status lookup", () => {
    expect(
      Either.isRight(
        Schema.decodeUnknownEither(ContentReleaseStatusRequestSchema)({
          manifestHash,
          releaseId,
        })
      )
    ).toBe(true);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(ContentReleaseStatusRequestSchema)({
          releaseId,
        })
      )
    ).toBe(true);
  });

  it("bounds cleanup work and requires explicit pagination evidence", () => {
    expect(
      Either.isRight(
        Schema.decodeUnknownEither(ReleaseCleanupRequestSchema)({
          cursor: null,
          limit: 100,
          releaseId,
        })
      )
    ).toBe(true);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(ReleaseCleanupRequestSchema)({
          cursor: null,
          limit: 101,
          releaseId,
        })
      )
    ).toBe(true);
    expect(
      Either.isRight(
        Schema.decodeUnknownEither(ReleaseCleanupReceiptSchema)({
          complete: false,
          cursor: null,
          deletedArtifacts: 4,
          deletedItems: 8,
          limit: 100,
          nextCursor: "next-page",
          releaseId,
        })
      )
    ).toBe(true);
    expect(
      Either.isRight(
        Schema.decodeUnknownEither(ReleaseCleanupReceiptSchema)({
          complete: true,
          cursor: "current-page",
          deletedArtifacts: 1,
          deletedItems: 2,
          limit: 100,
          nextCursor: null,
          releaseId,
        })
      )
    ).toBe(true);
    const invalidCursor = Schema.decodeUnknownEither(
      ReleaseCleanupReceiptSchema
    )({
      complete: true,
      cursor: "current-page",
      deletedArtifacts: 1,
      deletedItems: 2,
      limit: 100,
      nextCursor: "unexpected-page",
      releaseId,
    });
    expect(Either.isLeft(invalidCursor)).toBe(true);
    if (Either.isLeft(invalidCursor)) {
      expect(String(invalidCursor.left)).toContain(
        "Expected a new cursor only when another cleanup page remains."
      );
    }
    for (const invalidReceipt of [
      {
        complete: false,
        cursor: "current-page",
        deletedArtifacts: 1,
        deletedItems: 2,
        limit: 100,
        nextCursor: null,
        releaseId,
      },
      {
        complete: false,
        cursor: "current-page",
        deletedArtifacts: 1,
        deletedItems: 2,
        limit: 100,
        nextCursor: "current-page",
        releaseId,
      },
    ]) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(ReleaseCleanupReceiptSchema)(
            invalidReceipt
          )
        )
      ).toBe(true);
    }
  });
});

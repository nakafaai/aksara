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
          deletedArtifacts: 4,
          deletedItems: 8,
          nextCursor: "next-page",
          releaseId,
        })
      )
    ).toBe(true);
    expect(
      Either.isRight(
        Schema.decodeUnknownEither(ReleaseCleanupReceiptSchema)({
          complete: true,
          deletedArtifacts: 1,
          deletedItems: 2,
          nextCursor: null,
          releaseId,
        })
      )
    ).toBe(true);
    const invalidCursor = Schema.decodeUnknownEither(
      ReleaseCleanupReceiptSchema
    )({
      complete: true,
      deletedArtifacts: 1,
      deletedItems: 2,
      nextCursor: "unexpected-page",
      releaseId,
    });
    expect(Either.isLeft(invalidCursor)).toBe(true);
    if (Either.isLeft(invalidCursor)) {
      expect(String(invalidCursor.left)).toContain(
        "Expected a cursor only when another cleanup page remains."
      );
    }
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(ReleaseCleanupReceiptSchema)({
          complete: false,
          deletedArtifacts: 1,
          deletedItems: 2,
          nextCursor: null,
          releaseId,
        })
      )
    ).toBe(true);
  });
});

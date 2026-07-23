import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  PUBLICATION_FAILURE_STATUSES,
  PublicationFailureCodeSchema,
  PublicationFailureSchema,
  PublicationFailureStatusSchema,
  PublicationStaleBaseSchema,
  publicationFailureStatus,
} from "#contracts/transport/failure";

const releaseId = "test-transport";
const snapshotId = `sha256:${"a".repeat(64)}`;

/** Strictly checks one transport failure without allowing extra properties. */
function accepts(input: unknown) {
  return Either.isRight(
    Schema.decodeUnknownEither(PublicationFailureSchema)(input, {
      onExcessProperty: "error",
    })
  );
}

describe("publication failures", () => {
  it("decodes every stable failure kind without implementation messages", () => {
    expect(
      accepts({
        code: "CONTENT_RELEASE_UNAUTHORIZED",
        kind: "unauthorized",
      })
    ).toBe(true);
    expect(
      accepts({
        code: "CONTENT_RELEASE_STATE",
        kind: "rejected",
        operation: "current",
        releaseId: null,
      })
    ).toBe(true);
    expect(
      accepts({
        code: "CONTENT_RELEASE_INTEGRITY",
        kind: "rejected",
        operation: "headPage",
        releaseId,
      })
    ).toBe(true);
    expect(
      accepts({
        batchIndex: 2,
        code: "CONTENT_RELEASE_CONFLICT",
        family: "tryout",
        kind: "conflict",
        operation: "stageSnapshotBatch",
        releaseId,
        snapshotId,
      })
    ).toBe(true);
    expect(
      accepts({
        code: "CONTENT_RELEASE_CONFLICT",
        family: "tryout",
        kind: "conflict",
        operation: "stageSnapshot",
        releaseId,
        snapshotId,
      })
    ).toBe(true);
    expect(
      accepts({
        code: "CONTENT_RELEASE_INTEGRITY",
        kind: "rejected",
        operation: "stageSnapshot",
        releaseId,
      })
    ).toBe(true);
    expect(
      accepts({
        activeReleaseId: "test-active",
        code: "CONTENT_RELEASE_STALE_BASE",
        expectedBaseReleaseId: null,
        kind: "stale-base",
        operation: "stageRelease",
        releaseId,
      })
    ).toBe(true);
  });

  it("supports decode failures without pretending an identity was valid", () => {
    for (const code of [
      "CONTENT_RELEASE_INVALID_REQUEST",
      "CONTENT_RELEASE_SIZE",
      "CONTENT_RELEASE_UNSUPPORTED",
    ]) {
      expect(
        accepts({
          code,
          kind: "rejected",
          operation: null,
          releaseId: null,
        })
      ).toBe(true);
    }
  });

  it("owns one exhaustive failure-code to HTTP-status contract", () => {
    expect(PUBLICATION_FAILURE_STATUSES).toEqual({
      CONTENT_RELEASE_CONFLICT: 409,
      CONTENT_RELEASE_INTEGRITY: 422,
      CONTENT_RELEASE_INVALID_REQUEST: 400,
      CONTENT_RELEASE_LIMIT: 413,
      CONTENT_RELEASE_MISSING: 404,
      CONTENT_RELEASE_ROUTE: 422,
      CONTENT_RELEASE_SIZE: 413,
      CONTENT_RELEASE_STALE_BASE: 409,
      CONTENT_RELEASE_STATE: 422,
      CONTENT_RELEASE_UNAUTHORIZED: 401,
      CONTENT_RELEASE_UNSUPPORTED: 415,
    });
    const codes = Schema.decodeUnknownSync(
      Schema.Array(PublicationFailureCodeSchema)
    )(Object.keys(PUBLICATION_FAILURE_STATUSES));
    for (const code of codes) {
      expect(
        Schema.decodeUnknownSync(PublicationFailureStatusSchema)(
          publicationFailureStatus(code)
        )
      ).toBe(PUBLICATION_FAILURE_STATUSES[code]);
    }
  });

  it("requires exact identities for authenticated domain rejections", () => {
    for (const failure of [
      {
        code: "CONTENT_RELEASE_INVALID_REQUEST",
        kind: "rejected",
        operation: "verify",
        releaseId,
      },
      {
        code: "CONTENT_RELEASE_INTEGRITY",
        kind: "rejected",
        operation: null,
        releaseId: null,
      },
      {
        code: "CONTENT_RELEASE_STATE",
        kind: "rejected",
        operation: "current",
        releaseId,
      },
      {
        code: "CONTENT_RELEASE_INVALID_REQUEST",
        kind: "rejected",
        operation: null,
        releaseId,
      },
    ]) {
      expect(accepts(failure)).toBe(false);
    }
  });

  it("binds conflict batch indexes to batch staging operations", () => {
    for (const failure of [
      {
        batchIndex: 0,
        code: "CONTENT_RELEASE_CONFLICT",
        kind: "conflict",
        operation: "stageSnapshot",
        releaseId,
      },
      {
        code: "CONTENT_RELEASE_CONFLICT",
        kind: "conflict",
        operation: "stageSnapshotBatch",
        releaseId,
      },
      {
        code: "CONTENT_RELEASE_CONFLICT",
        kind: "conflict",
        operation: "headPage",
        releaseId,
      },
    ]) {
      expect(accepts(failure)).toBe(false);
    }
  });

  it("rejects unstable codes, stale-base stages, and leaked messages", () => {
    for (const failure of [
      {
        code: "CONTENT_RELEASE_UNKNOWN",
        kind: "rejected",
        operation: null,
        releaseId: null,
      },
      {
        activeReleaseId: null,
        code: "CONTENT_RELEASE_STALE_BASE",
        expectedBaseReleaseId: null,
        kind: "stale-base",
        operation: "cleanup",
        releaseId,
      },
      {
        activeReleaseId: null,
        code: "CONTENT_RELEASE_STALE_BASE",
        expectedBaseReleaseId: null,
        kind: "stale-base",
        operation: "stageRelease",
        releaseId,
      },
      {
        activeReleaseId: releaseId,
        code: "CONTENT_RELEASE_STALE_BASE",
        expectedBaseReleaseId: null,
        kind: "stale-base",
        operation: "activate",
        releaseId,
      },
      {
        code: "CONTENT_RELEASE_UNAUTHORIZED",
        kind: "unauthorized",
        message: "secret detail",
      },
    ]) {
      expect(accepts(failure)).toBe(false);
    }
    const invalidStaleBase = Schema.decodeUnknownEither(
      PublicationStaleBaseSchema
    )({
      activeReleaseId: releaseId,
      code: "CONTENT_RELEASE_STALE_BASE",
      expectedBaseReleaseId: null,
      kind: "stale-base",
      operation: "activate",
      releaseId,
    });
    expect(Either.isLeft(invalidStaleBase)).toBe(true);
    if (Either.isLeft(invalidStaleBase)) {
      expect(String(invalidStaleBase.left)).toContain(
        "Expected the active release to differ from the requested base and candidate."
      );
    }
  });
});

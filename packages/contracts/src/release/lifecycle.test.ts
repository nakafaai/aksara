import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ContentReleaseStatusRequestSchema,
  ContentReleaseStatusSchema,
  MAX_CLEANUP_PAGE_COUNT,
  ReleaseAbortReceiptSchema,
  ReleaseAbortRequestSchema,
  ReleaseAcceptRequestSchema,
  ReleaseCleanupReceiptSchema,
  ReleaseCleanupRequestSchema,
  RollbackContentReleaseBundleSchema,
} from "#contracts/release/lifecycle";
import { release, rendererManifest } from "#contracts/test/request";

const releaseId = "release-lifecycle";
const manifestHash = `sha256:${"b".repeat(64)}`;
const statusReceipt = {
  activatedHeads: 1,
  deletedHeads: 0,
  manifestHash,
  projectionDigest: `sha256:${"a".repeat(64)}`,
  releaseId,
  resultCount: 1,
  resultDigest: `sha256:${"c".repeat(64)}`,
  routeDigest: `sha256:${"d".repeat(64)}`,
  stagedArtifacts: 1,
  stagedItems: 1,
  stagedProjections: 1,
  stagedRoutes: 0,
};

/** Asserts one accepted value against a context-free wire schema. */
function expectAccepted(schema: Schema.Schema.AnyNoContext, input: unknown) {
  expect(Either.isRight(Schema.decodeUnknownEither(schema)(input))).toBe(true);
}

/** Asserts one rejected wire value and its stable diagnostic when supplied. */
function expectRejected(
  schema: Schema.Schema.AnyNoContext,
  input: unknown,
  message?: string
) {
  const result = Schema.decodeUnknownEither(schema)(input);
  expect(Either.isLeft(result)).toBe(true);
  if (message && Either.isLeft(result)) {
    expect(String(result.left)).toContain(message);
  }
}

describe("release lifecycle", () => {
  it("rejects non-rollback renderer bundles at recovery boundaries", () => {
    expectRejected(
      RollbackContentReleaseBundleSchema,
      { release, rendererManifest },
      "Expected a renderer-bound rollback release."
    );
  });
  it("exposes the bounded server-owned cleanup page size", () => {
    expect(MAX_CLEANUP_PAGE_COUNT).toBe(100);
  });
  it("decodes resumable phases and requires a completed receipt", () => {
    for (const phase of [
      "missing",
      "staging",
      "verifying",
      "verified",
      "aborting",
      "aborted",
    ]) {
      expectAccepted(ContentReleaseStatusSchema, {
        manifestHash,
        phase,
        releaseId,
      });
    }
    for (const phase of ["active", "finalizing"]) {
      expectRejected(ContentReleaseStatusSchema, {
        manifestHash,
        phase,
        releaseId,
      });
    }
    expectRejected(ContentReleaseStatusSchema, {
      manifestHash,
      phase: "completed",
      releaseId,
    });
    expectAccepted(ContentReleaseStatusSchema, {
      manifestHash,
      phase: "completed",
      receipt: statusReceipt,
      releaseId,
    });
    expectRejected(
      ContentReleaseStatusSchema,
      {
        manifestHash,
        phase: "completed",
        receipt: { ...statusReceipt, releaseId: "release-other" },
        releaseId,
      },
      "Expected the completed receipt to match the release status identity."
    );
    expectRejected(
      ContentReleaseStatusSchema,
      {
        manifestHash,
        phase: "completed",
        receipt: {
          ...statusReceipt,
          manifestHash: `sha256:${"f".repeat(64)}`,
        },
        releaseId,
      },
      "Expected the completed receipt to match the release status identity."
    );
  });
  it("keeps abort progress server-owned, cumulative, and coherent", () => {
    expectAccepted(ReleaseAcceptRequestSchema, {
      recoveryId: "release-recovery",
      releaseId,
    });
    expectRejected(
      ReleaseAcceptRequestSchema,
      { recoveryId: releaseId, releaseId },
      "Expected distinct active and recovery release identities."
    );
    expect(
      Schema.decodeUnknownSync(ReleaseAbortRequestSchema)({ releaseId })
    ).toEqual({ releaseId });
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(ReleaseAbortRequestSchema)(
          { afterIndex: -1, releaseId },
          { onExcessProperty: "error" }
        )
      )
    ).toBe(true);
    for (const receipt of [
      { complete: false, processedItems: 2, releaseId, totalItems: 3 },
      { complete: true, processedItems: 3, releaseId, totalItems: 3 },
    ]) {
      expectAccepted(ReleaseAbortReceiptSchema, receipt);
    }
    const invalidReceipts = [
      { complete: false, processedItems: 3, releaseId, totalItems: 3 },
      { complete: true, processedItems: 2, releaseId, totalItems: 3 },
      { complete: false, processedItems: 4, releaseId, totalItems: 3 },
    ];
    for (const receipt of invalidReceipts) {
      expectRejected(ReleaseAbortReceiptSchema, receipt);
    }
    expectRejected(
      ReleaseAbortReceiptSchema,
      invalidReceipts[0],
      "Expected abort progress to match its durable release item total."
    );
  });
  it("requires both immutable identity fields for status lookup", () => {
    expectAccepted(ContentReleaseStatusRequestSchema, {
      manifestHash,
      releaseId,
    });
    expectRejected(ContentReleaseStatusRequestSchema, { releaseId });
  });
  it("keeps cleanup cursors private and returns cumulative evidence", () => {
    expectAccepted(ReleaseCleanupRequestSchema, { releaseId });
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(ReleaseCleanupRequestSchema)(
          {
            cursor: "private-backend-state",
            releaseId,
          },
          { onExcessProperty: "error" }
        )
      )
    ).toBe(true);
    expectAccepted(ReleaseCleanupReceiptSchema, {
      complete: false,
      deletedArtifacts: 4,
      releaseId,
    });
    expectAccepted(ReleaseCleanupReceiptSchema, {
      complete: false,
      deletedArtifacts: 4,
      releaseId,
      retryAt: 1_800_000_000_000,
    });
    expectAccepted(ReleaseCleanupReceiptSchema, {
      complete: true,
      deletedArtifacts: 1,
      releaseId,
    });
    expectRejected(
      ReleaseCleanupReceiptSchema,
      {
        complete: true,
        deletedArtifacts: 1,
        releaseId,
        retryAt: 1_800_000_000_000,
      },
      "Expected completed cleanup evidence without a retry timestamp."
    );
    for (const invalidReceipt of [
      {
        complete: false,
        deletedArtifacts: -1,
        releaseId,
      },
      {
        complete: false,
        deletedArtifacts: 1.5,
        releaseId,
      },
      {
        complete: false,
        deletedArtifacts: 1,
        releaseId,
        retryAt: -1,
      },
    ]) {
      expectRejected(ReleaseCleanupReceiptSchema, invalidReceipt);
    }
  });
});

import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  CompletedContentReleaseSchema,
  ContentReleaseCurrentSchema,
  ContentReleaseStatusRequestSchema,
  ContentReleaseStatusSchema,
  MAX_CLEANUP_PAGE_COUNT,
  ReleaseAbortReceiptSchema,
  ReleaseAbortRequestSchema,
  ReleaseCleanupReceiptSchema,
  ReleaseCleanupRequestSchema,
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
  stagedArtifacts: 1,
  stagedItems: 1,
  stagedProjections: 1,
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
  it("decodes authoritative active and pending release state", () => {
    const completedReceipt = {
      activatedHeads: release.manifest.upsertCount,
      deletedHeads: release.manifest.deleteCount,
      manifestHash: release.manifestHash,
      projectionDigest: release.manifest.projectionDigest,
      releaseId: release.manifest.releaseId,
      resultCount: release.manifest.resultCount,
      resultDigest: release.manifest.resultDigest,
      stagedArtifacts: release.manifest.upsertCount,
      stagedItems: release.manifest.itemCount,
      stagedProjections: release.manifest.projectionCount,
    };
    const completed = { receipt: completedReceipt, release, rendererManifest };
    expect(
      Schema.decodeUnknownSync(ContentReleaseCurrentSchema)({
        activeManifestHash: release.manifestHash,
        activeReleaseId: release.manifest.releaseId,
        completed,
        pending: null,
      })
    ).toEqual({
      activeManifestHash: release.manifestHash,
      activeReleaseId: release.manifest.releaseId,
      completed,
      pending: null,
    });
    const staging = {
      activeManifestHash: null,
      activeReleaseId: null,
      completed: null,
      pending: { phase: "staging", release, rendererManifest },
    };
    expect(
      Schema.decodeUnknownSync(ContentReleaseCurrentSchema)(staging)
    ).toEqual(staging);
    expectRejected(
      ContentReleaseCurrentSchema,
      { ...staging, activeReleaseId: release.manifest.releaseId },
      "Expected active and pending publication identities to be coherent."
    );
    const active = {
      activeManifestHash: release.manifestHash,
      activeReleaseId: release.manifest.releaseId,
      completed: null,
      pending: { phase: "active", release, rendererManifest },
    };
    expect(
      Schema.decodeUnknownSync(ContentReleaseCurrentSchema)(active)
    ).toEqual(active);
    expectRejected(ContentReleaseCurrentSchema, {
      ...active,
      activeReleaseId: null,
    });
    for (const invalid of [
      { releaseId: "release-other" },
      { activatedHeads: 0, deletedHeads: 2, stagedArtifacts: 0 },
      { deletedHeads: 0, stagedItems: 1 },
      { stagedProjections: 2 },
      { manifestHash: `sha256:${"f".repeat(64)}` },
      { projectionDigest: `sha256:${"f".repeat(64)}` },
      { resultCount: release.manifest.resultCount + 1 },
      { resultDigest: `sha256:${"f".repeat(64)}` },
    ]) {
      expectRejected(
        CompletedContentReleaseSchema,
        { ...completed, receipt: { ...completedReceipt, ...invalid } },
        "Expected the completed receipt to match its signed release manifest."
      );
    }
    expectRejected(ContentReleaseCurrentSchema, {
      activeManifestHash: null,
      activeReleaseId: null,
      completed,
      pending: null,
    });
    expectRejected(ContentReleaseCurrentSchema, {
      activeManifestHash: null,
      activeReleaseId: null,
      completed,
      pending: { phase: "staging", release, rendererManifest },
    });
    expectRejected(ContentReleaseCurrentSchema, {
      activeManifestHash: release.manifestHash,
      activeReleaseId: "release-other",
      completed,
      pending: null,
    });
    const finalizing = {
      activeManifestHash: release.manifestHash,
      activeReleaseId: release.manifest.releaseId,
      completed: null,
      pending: { phase: "finalizing", release, rendererManifest },
    };
    expect(
      Schema.decodeUnknownSync(ContentReleaseCurrentSchema)(finalizing)
    ).toEqual(finalizing);
    expect(MAX_CLEANUP_PAGE_COUNT).toBe(100);
  });
  it("decodes resumable phases and requires a completed receipt", () => {
    for (const phase of [
      "missing",
      "staging",
      "verifying",
      "verified",
      "active",
      "aborting",
      "finalizing",
      "aborted",
    ]) {
      expectAccepted(ContentReleaseStatusSchema, {
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
  });
  it("keeps abort progress server-owned, cumulative, and coherent", () => {
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
      deletedItems: 8,
      releaseId,
    });
    expectAccepted(ReleaseCleanupReceiptSchema, {
      complete: false,
      deletedArtifacts: 4,
      deletedItems: 8,
      releaseId,
      retryAt: 1_800_000_000_000,
    });
    expectAccepted(ReleaseCleanupReceiptSchema, {
      complete: true,
      deletedArtifacts: 1,
      deletedItems: 2,
      releaseId,
    });
    expectRejected(
      ReleaseCleanupReceiptSchema,
      {
        complete: true,
        deletedArtifacts: 1,
        deletedItems: 2,
        releaseId,
        retryAt: 1_800_000_000_000,
      },
      "Expected completed cleanup evidence without a retry timestamp."
    );
    for (const invalidReceipt of [
      {
        complete: false,
        deletedArtifacts: -1,
        deletedItems: 2,
        releaseId,
      },
      {
        complete: false,
        deletedArtifacts: 1,
        deletedItems: 2.5,
        releaseId,
      },
      {
        complete: false,
        deletedArtifacts: 1,
        deletedItems: 2,
        releaseId,
        retryAt: -1,
      },
    ]) {
      expectRejected(ReleaseCleanupReceiptSchema, invalidReceipt);
    }
  });
});

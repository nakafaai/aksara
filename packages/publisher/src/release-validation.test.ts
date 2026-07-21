import { Sha256HashSchema } from "@nakafaai/aksara-contracts/ids";
import {
  ContentReleaseManifestSchema,
  PublicationReceiptSchema,
  ReleaseVerificationEvidenceSchema,
} from "@nakafaai/aksara-contracts/release";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer/manifest";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  validatePublicationReceipt,
  validateReleaseRendererManifest,
  validateUpsertSourceCount,
  validateVerificationEvidence,
} from "#publisher/release-validation.js";

const expectedCounts = {
  artifacts: 2,
  graphRows: 3,
  heads: 2,
  llmsDocuments: 2,
  routes: 2,
  searchRows: 2,
  sitemapEntries: 2,
};
const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  aksaraSha: "a".repeat(40),
  baseReleaseId: null,
  expectedCounts,
  expectedDigest: `sha256:${"b".repeat(64)}`,
  itemCount: 0,
  itemsDigest: `sha256:${"c".repeat(64)}`,
  releaseId: "test-release-counts",
  rendererContractVersion: "1.0.0",
  rendererManifestHash: `sha256:${"d".repeat(64)}`,
});
const evidence = Schema.decodeUnknownSync(ReleaseVerificationEvidenceSchema)({
  baseReleaseId: manifest.baseReleaseId,
  deleteHeads: 0,
  itemCount: 0,
  itemsDigest: manifest.itemsDigest,
  projectionDigest: manifest.expectedDigest,
  recomputedProjectionCounts: expectedCounts,
  releaseId: manifest.releaseId,
  rendererContractVersion: manifest.rendererContractVersion,
  rendererManifestHash: manifest.rendererManifestHash,
  stagedArtifacts: 0,
  upsertHeads: 0,
});
const summary = { deleteCount: 0, items: [], upsertCount: 0 };
const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    authoringComponents: [{ name: "BlockMath", version: 1 }],
    supportedComponents: [{ name: "BlockMath", version: 1 }],
  })
);

describe("release validation", () => {
  it("accepts projection counts recomputed by the target", async () => {
    await expect(
      Effect.runPromise(
        validateVerificationEvidence(manifest, summary, evidence)
      )
    ).resolves.toBeUndefined();
  });

  it("rejects a recomputed count that differs from the signed manifest", async () => {
    const error = await Effect.runPromise(
      validateVerificationEvidence(manifest, summary, {
        ...evidence,
        recomputedProjectionCounts: {
          ...evidence.recomputedProjectionCounts,
          routes: evidence.recomputedProjectionCounts.routes + 1,
        },
      }).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ReleaseVerificationMismatchError");
  });

  it("rejects a missing authored source before compilation", async () => {
    const error = await Effect.runPromise(
      validateUpsertSourceCount({ ...summary, upsertCount: 1 }, 0).pipe(
        Effect.flip
      )
    );

    expect(error._tag).toBe("ReleaseArtifactMismatchError");
  });

  it("rejects a release prepared for another renderer manifest", async () => {
    const error = await Effect.runPromise(
      validateReleaseRendererManifest(manifest, rendererManifest).pipe(
        Effect.flip
      )
    );

    expect(error._tag).toBe("ReleaseRendererManifestMismatchError");
    expect(error).toHaveProperty("actualHash", rendererManifest.hash);
  });

  it("rejects an activation receipt with a different projection digest", async () => {
    const receipt = PublicationReceiptSchema.make({
      activatedHeads: 0,
      deletedHeads: 0,
      projectionDigest: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
      releaseId: manifest.releaseId,
      stagedArtifacts: 0,
      stagedItems: 0,
    });
    const error = await Effect.runPromise(
      validatePublicationReceipt(manifest, summary, receipt).pipe(Effect.flip)
    );

    expect(error._tag).toBe("PublicationReceiptMismatchError");
  });
});

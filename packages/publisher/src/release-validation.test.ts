import {
  ContentReleaseManifestSchema,
  ReleaseVerificationEvidenceSchema,
} from "@nakafaai/aksara-contracts/release";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { validateVerificationEvidence } from "./release-validation.js";

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
  releaseId: "release-counts",
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

describe("validateVerificationEvidence", () => {
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
});

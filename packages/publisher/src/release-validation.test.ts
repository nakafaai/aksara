import { CompiledContentPayloadSchema } from "@nakafa/aksara-contracts/content";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import {
  ContentReleaseItemSchema,
  ContentReleaseManifestSchema,
  PublicationReceiptSchema,
  ReleaseVerificationEvidenceSchema,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { rendererDomains } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  validateCompiledPayloadForItem,
  validatePublicationReceipt,
  validateReleaseRendererManifest,
  validateVerificationEvidence,
} from "#publisher/release-validation";

const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  baseManifestHash: null,
  baseReleaseId: null,
  baseResultCount: 0,
  baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
  deleteCount: 0,
  itemCount: 0,
  itemsDigest: `sha256:${"c".repeat(64)}`,
  origin: { kind: "git", sha: "a".repeat(40) },
  projectionCount: 2,
  projectionDigest: `sha256:${"b".repeat(64)}`,
  releaseId: "test-release-counts",
  rendererContractVersion: "1.0.0",
  rendererManifestHash: `sha256:${"d".repeat(64)}`,
  resultCount: 0,
  resultDigest: EMPTY_RESULT_CATALOG_DIGEST,
  rollbackCount: 0,
  rollbackDigest: `sha256:${"a".repeat(64)}`,
  routeCount: 0,
  routeDigest: `sha256:${"b".repeat(64)}`,
  upsertCount: 0,
});
const release = Schema.decodeUnknownSync(SignedContentReleaseSchema)({
  keyId: "test-release-key",
  manifest,
  manifestHash: `sha256:${"e".repeat(64)}`,
  signature: `${"A".repeat(85)}A`,
});
const evidence = Schema.decodeUnknownSync(ReleaseVerificationEvidenceSchema)({
  baseManifestHash: manifest.baseManifestHash,
  baseReleaseId: manifest.baseReleaseId,
  baseResultCount: manifest.baseResultCount,
  baseResultDigest: manifest.baseResultDigest,
  deleteHeads: 0,
  itemCount: 0,
  itemsDigest: manifest.itemsDigest,
  manifestHash: release.manifestHash,
  projectionCount: manifest.projectionCount,
  projectionDigest: manifest.projectionDigest,
  releaseId: manifest.releaseId,
  rendererContractVersion: manifest.rendererContractVersion,
  rendererManifestHash: manifest.rendererManifestHash,
  resultCount: manifest.resultCount,
  resultDigest: manifest.resultDigest,
  rollbackCount: manifest.rollbackCount,
  rollbackDigest: manifest.rollbackDigest,
  routeCount: manifest.routeCount,
  routeDigest: manifest.routeDigest,
  stagedArtifacts: 0,
  stagedRoutes: manifest.routeCount,
  upsertHeads: 0,
});
const summary = { deleteCount: 0, upsertCount: 0 };
const projectionSummary = { count: manifest.projectionCount };
const routeSummary = { count: manifest.routeCount };
const artifactHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const item = Schema.decodeUnknownSync(ContentReleaseItemSchema)({
  change: {
    artifactHash,
    contentKey: "test:content",
    delivery: "public",
    family: "material",
    locale: "en",
    operation: "upsert",
    rendererDomain: "mathematics",
    sourcePath: "packages/corpus/test/content/en.mdx",
  },
  index: 0,
  releaseId: manifest.releaseId,
});
const payload = Schema.decodeUnknownSync(CompiledContentPayloadSchema)({
  byteLength: 1,
  compiledCode: "x",
  compilerConfigHash: `sha256:${"e".repeat(64)}`,
  compilerVersion: "0.1.0",
  contentKey: "test:content",
  format: "mdx-function-body-v1",
  locale: "en",
  mdxCompilerVersion: "3.1.1",
  plainText: "x",
  rawMdx: "x",
  rendererDomain: "mathematics",
  requiredComponents: [],
  sourceHash: `sha256:${"f".repeat(64)}`,
});
const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: rendererDomains({
      chemistry: [{ name: "AtomShellLab", version: 1 }],
      mathematics: [{ name: "FunctionMachine", version: 1 }],
    }),
  })
);

describe("release validation", () => {
  it("requires the compiled payload to use the signed renderer domain", async () => {
    await expect(
      Effect.runPromise(
        validateCompiledPayloadForItem(item, artifactHash, payload)
      )
    ).resolves.toBeUndefined();
    const error = await Effect.runPromise(
      validateCompiledPayloadForItem(item, artifactHash, {
        ...payload,
        rendererDomain: "chemistry",
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe("ReleaseArtifactMismatchError");
  });

  it("accepts the exact projection count recomputed by the target", async () => {
    await expect(
      Effect.runPromise(
        validateVerificationEvidence(
          release,
          summary,
          projectionSummary,
          routeSummary,
          evidence
        )
      )
    ).resolves.toBeUndefined();
  });

  it("rejects a projection count that differs from the signed manifest", async () => {
    const error = await Effect.runPromise(
      validateVerificationEvidence(
        release,
        summary,
        projectionSummary,
        routeSummary,
        {
          ...evidence,
          projectionCount: evidence.projectionCount + 1,
        }
      ).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ReleaseVerificationMismatchError");
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
      manifestHash: release.manifestHash,
      projectionDigest: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
      releaseId: manifest.releaseId,
      resultCount: manifest.resultCount,
      resultDigest: manifest.resultDigest,
      routeDigest: manifest.routeDigest,
      stagedArtifacts: 0,
      stagedItems: 0,
      stagedProjections: manifest.projectionCount,
      stagedRoutes: manifest.routeCount,
    });
    const error = await Effect.runPromise(
      validatePublicationReceipt(
        release,
        summary,
        projectionSummary,
        routeSummary,
        receipt
      ).pipe(Effect.flip)
    );

    expect(error._tag).toBe("PublicationReceiptMismatchError");
  });

  it("rejects receipt counts from another replayed stream", async () => {
    const receipt = PublicationReceiptSchema.make({
      activatedHeads: 0,
      deletedHeads: 0,
      manifestHash: release.manifestHash,
      projectionDigest: manifest.projectionDigest,
      releaseId: manifest.releaseId,
      resultCount: manifest.resultCount,
      resultDigest: manifest.resultDigest,
      routeDigest: manifest.routeDigest,
      stagedArtifacts: 0,
      stagedItems: 0,
      stagedProjections: manifest.projectionCount - 1,
      stagedRoutes: manifest.routeCount,
    });
    const error = await Effect.runPromise(
      validatePublicationReceipt(
        release,
        summary,
        projectionSummary,
        routeSummary,
        receipt
      ).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "PublicationReceiptMismatchError",
      message:
        "Publication receipt does not match the replayed release streams.",
    });
  });
});

import { CompiledContentPayloadSchema } from "@nakafaai/aksara-contracts/content";
import { Sha256HashSchema } from "@nakafaai/aksara-contracts/ids";
import {
  ContentReleaseItemSchema,
  ContentReleaseManifestSchema,
  PublicationReceiptSchema,
  ReleaseVerificationEvidenceSchema,
} from "@nakafaai/aksara-contracts/release";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer/manifest";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  validateCompiledPayloadForItem,
  validatePublicationReceipt,
  validateReleaseRendererManifest,
  validateVerificationEvidence,
} from "#publisher/release-validation";

const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  baseReleaseId: null,
  itemCount: 0,
  itemsDigest: `sha256:${"c".repeat(64)}`,
  origin: { kind: "git", sha: "a".repeat(40) },
  projectionCount: 2,
  projectionDigest: `sha256:${"b".repeat(64)}`,
  releaseId: "test-release-counts",
  rendererContractVersion: "2.0.0",
  rendererManifestHash: `sha256:${"d".repeat(64)}`,
});
const evidence = Schema.decodeUnknownSync(ReleaseVerificationEvidenceSchema)({
  baseReleaseId: manifest.baseReleaseId,
  deleteHeads: 0,
  itemCount: 0,
  itemsDigest: manifest.itemsDigest,
  projectionCount: manifest.projectionCount,
  projectionDigest: manifest.projectionDigest,
  releaseId: manifest.releaseId,
  rendererContractVersion: manifest.rendererContractVersion,
  rendererManifestHash: manifest.rendererManifestHash,
  stagedArtifacts: 0,
  upsertHeads: 0,
});
const summary = { deleteCount: 0, upsertCount: 0 };
const projectionSummary = { count: manifest.projectionCount };
const artifactHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const item = Schema.decodeUnknownSync(ContentReleaseItemSchema)({
  change: {
    artifactHash,
    contentKey: "test:content",
    delivery: "public",
    locale: "en",
    operation: "upsert",
    rendererDomain: "material-mathematics",
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
  rendererDomain: "material-mathematics",
  requiredComponents: [],
  sourceHash: `sha256:${"f".repeat(64)}`,
});
const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: [
      {
        authoringComponents: [{ name: "AtomShellLab", version: 1 }],
        name: "material-chemistry",
        supportedComponents: [{ name: "AtomShellLab", version: 1 }],
      },
      {
        authoringComponents: [{ name: "FunctionMachine", version: 1 }],
        name: "material-mathematics",
        supportedComponents: [{ name: "FunctionMachine", version: 1 }],
      },
    ],
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
        rendererDomain: "material-chemistry",
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe("ReleaseArtifactMismatchError");
  });

  it("accepts the exact projection count recomputed by the target", async () => {
    await expect(
      Effect.runPromise(
        validateVerificationEvidence(
          manifest,
          summary,
          projectionSummary,
          evidence
        )
      )
    ).resolves.toBeUndefined();
  });

  it("rejects a projection count that differs from the signed manifest", async () => {
    const error = await Effect.runPromise(
      validateVerificationEvidence(manifest, summary, projectionSummary, {
        ...evidence,
        projectionCount: evidence.projectionCount + 1,
      }).pipe(Effect.flip)
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
      projectionDigest: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
      releaseId: manifest.releaseId,
      stagedArtifacts: 0,
      stagedItems: 0,
      stagedProjections: manifest.projectionCount,
    });
    const error = await Effect.runPromise(
      validatePublicationReceipt(
        manifest,
        summary,
        projectionSummary,
        receipt
      ).pipe(Effect.flip)
    );

    expect(error._tag).toBe("PublicationReceiptMismatchError");
  });
});

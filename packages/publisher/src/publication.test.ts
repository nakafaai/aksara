import { generateKeyPairSync } from "node:crypto";
import { compileContent } from "@nakafaai/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafaai/aksara-contracts/artifact-verification-node";
import { CompileDocumentSourceSchema } from "@nakafaai/aksara-contracts/content";
import {
  ContentKeySchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafaai/aksara-contracts/ids";
import {
  type ContentChange,
  type ContentReleaseManifest,
  ContentReleaseManifestSchema,
  indexContentChanges,
} from "@nakafaai/aksara-contracts/release";
import { hashContentReleaseItems } from "@nakafaai/aksara-contracts/release-items-node";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer-node";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "@nakafaai/aksara-contracts/signature-verification";
import { Effect, Redacted, Schema } from "effect";
import { describe, expect, it } from "vitest";
import type { ArtifactBatch, ReleaseItemBatch } from "./batching.js";
import {
  PublicationSigningKey,
  PublicationSource,
  PublicationSourceError,
  PublicationTarget,
  publishContentRelease,
} from "./publication.js";
import {
  PublicationStaleBaseError,
  PublicationTargetConflictError,
} from "./target-errors.js";

const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    authoringComponents: [{ name: "BlockMath", version: 1 }],
    supportedComponents: [{ name: "BlockMath", version: 1 }],
  })
);
const source = CompileDocumentSourceSchema.make({
  contentKey: ContentKeySchema.make("fixture:function"),
  locale: "en",
  rawMdx:
    'export const metadata = { authors: [{ name: "Nakafa" }], date: "2026-07-21", title: "Function" }\n\n## Function\n\n<BlockMath math="x" />',
});
const payload = await Effect.runPromise(
  compileContent({ ...source, rendererManifest })
);
const keys = generateKeyPairSync("ed25519");
const signingKey = PublicationSigningKey.of({
  keyId: "content-2026-01",
  privateKeyPem: Redacted.make(
    keys.privateKey.export({ format: "pem", type: "pkcs8" }).toString()
  ),
});
const resolver = ContentVerificationKeyResolver.of({
  resolve: (requestedKeyId) => {
    if (requestedKeyId === "content-2026-01") {
      return Effect.succeed(
        keys.publicKey.export({ format: "pem", type: "spki" }).toString()
      );
    }
    return Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId }));
  },
});
function makeRelease(
  releaseIdSource: string,
  changes: readonly ContentChange[]
) {
  const releaseId = ReleaseIdSchema.make(releaseIdSource);
  const items = indexContentChanges(releaseId, changes);
  const upserts = items.filter((item) => item.change.operation === "upsert");
  const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
    aksaraSha: "a".repeat(40),
    baseReleaseId: null,
    expectedCounts: {
      artifacts: upserts.length,
      graphRows: 0,
      heads: upserts.length,
      llmsDocuments: upserts.length,
      routes: upserts.length,
      searchRows: upserts.length,
      sitemapEntries: upserts.length,
    },
    expectedDigest: `sha256:${"c".repeat(64)}`,
    itemCount: items.length,
    itemsDigest: hashContentReleaseItems(items),
    releaseId,
    rendererContractVersion: "1.0.0",
    rendererManifestHash: rendererManifest.hash,
  });
  return { items, manifest };
}

function storeExact<T>(
  batches: Map<number, T>,
  batchIndex: number,
  value: T,
  stage: "items" | "artifacts"
) {
  const existing = batches.get(batchIndex);
  if (existing && JSON.stringify(existing) !== JSON.stringify(value)) {
    return Effect.fail(
      new PublicationTargetConflictError({
        message: "A batch identity was reused with different content.",
        stage,
      })
    );
  }
  return Effect.sync(() => {
    batches.set(batchIndex, value);
  });
}

function makeTarget(
  release: ReturnType<typeof makeRelease>,
  activeReleaseId: typeof ReleaseIdSchema.Type | null = null,
  corruptEvidence = false
) {
  const itemBatches = new Map<number, ReleaseItemBatch>();
  const artifactBatches = new Map<number, ArtifactBatch>();
  let stagedRelease = "";
  let active = activeReleaseId;
  let activationTransitions = 0;
  const stagedItems = () =>
    [...itemBatches.entries()]
      .sort(([left], [right]) => left - right)
      .flatMap(([, batch]) => batch.items);
  const stagedArtifacts = () =>
    [...artifactBatches.values()].flatMap((batch) => batch.artifacts);
  const target = PublicationTarget.of({
    activate: () => {
      if (active === release.manifest.releaseId) {
        return Effect.succeed(receipt());
      }
      if (active !== release.manifest.baseReleaseId) {
        return Effect.fail(
          new PublicationStaleBaseError({
            activeReleaseId: active,
            expectedBaseReleaseId: release.manifest.baseReleaseId,
            releaseId: release.manifest.releaseId,
          })
        );
      }
      return Effect.sync(() => {
        active = release.manifest.releaseId;
        activationTransitions += 1;
        return receipt();
      });
    },
    stageArtifactBatch: (batch) =>
      storeExact(artifactBatches, batch.batchIndex, batch, "artifacts"),
    stageItemBatch: (batch) =>
      storeExact(itemBatches, batch.batchIndex, batch, "items"),
    stageRelease: (value) => {
      const encoded = JSON.stringify(value);
      if (stagedRelease && stagedRelease !== encoded) {
        return Effect.fail(
          new PublicationTargetConflictError({
            message: "Release identity conflict.",
            stage: "release",
          })
        );
      }
      return Effect.sync(() => {
        stagedRelease = encoded;
      });
    },
    verify: () => {
      const items = stagedItems();
      const upsertHeads = items.filter(
        (item) => item.change.operation === "upsert"
      ).length;
      return Effect.succeed({
        baseReleaseId: release.manifest.baseReleaseId,
        deleteHeads: items.length - upsertHeads,
        itemCount: items.length,
        itemsDigest: corruptEvidence
          ? Sha256HashSchema.make(`sha256:${"f".repeat(64)}`)
          : hashContentReleaseItems(items),
        projectionDigest: release.manifest.expectedDigest,
        recomputedProjectionCounts: release.manifest.expectedCounts,
        releaseId: release.manifest.releaseId,
        rendererContractVersion: release.manifest.rendererContractVersion,
        rendererManifestHash: release.manifest.rendererManifestHash,
        stagedArtifacts: stagedArtifacts().length,
        upsertHeads,
      });
    },
  });
  function receipt() {
    const items = stagedItems();
    const activatedHeads = items.filter(
      (item) => item.change.operation === "upsert"
    ).length;
    return {
      activatedHeads,
      deletedHeads: items.length - activatedHeads,
      projectionDigest: release.manifest.expectedDigest,
      releaseId: release.manifest.releaseId,
      stagedArtifacts: stagedArtifacts().length,
      stagedItems: items.length,
    };
  }
  return {
    get activationTransitions() {
      return activationTransitions;
    },
    artifactBatches,
    itemBatches,
    target,
  };
}

function publish(
  release: {
    readonly items: readonly unknown[];
    readonly manifest: ContentReleaseManifest;
  },
  target: typeof PublicationTarget.Service,
  sources = [source]
) {
  const publicationSource = PublicationSource.of({
    loadExactRevision: ({ aksaraSha, items }) => {
      if (
        aksaraSha !== release.manifest.aksaraSha ||
        items.length !== sources.length
      ) {
        return Effect.fail(
          new PublicationSourceError({
            aksaraSha,
            cause: null,
            message: "The exact fixture revision is unavailable.",
          })
        );
      }
      return Effect.succeed(sources);
    },
  });
  return publishContentRelease({
    items: release.items,
    manifest: release.manifest,
    rendererManifest,
  }).pipe(
    Effect.provideService(PublicationSigningKey, signingKey),
    Effect.provideService(PublicationSource, publicationSource),
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.provideService(PublicationTarget, target)
  );
}

const upsert = {
  artifactHash: hashCompiledContentPayload(payload),
  contentKey: payload.contentKey,
  kind: "material",
  locale: payload.locale,
  operation: "upsert",
} satisfies ContentChange;

describe("publishContentRelease", () => {
  it("stages and activates exact retries idempotently", async () => {
    const release = makeRelease("release-idempotent", [upsert]);
    const state = makeTarget(release);

    const first = await Effect.runPromise(publish(release, state.target));
    const second = await Effect.runPromise(publish(release, state.target));

    expect(second).toEqual(first);
    expect(state.itemBatches.size).toBe(1);
    expect(state.artifactBatches.size).toBe(1);
    expect(state.activationTransitions).toBe(1);
  });

  it("never activates mismatched pre-activation evidence", async () => {
    const release = makeRelease("release-evidence", [upsert]);
    const state = makeTarget(release, null, true);
    const error = await Effect.runPromise(
      publish(release, state.target).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ReleaseVerificationMismatchError");
    expect(state.activationTransitions).toBe(0);
  });

  it("preserves stale-base rejection at atomic activation", async () => {
    const release = makeRelease("release-stale", [upsert]);
    const state = makeTarget(release, ReleaseIdSchema.make("another-release"));
    const error = await Effect.runPromise(
      publish(release, state.target).pipe(Effect.flip)
    );

    expect(error._tag).toBe("PublicationStaleBaseError");
    expect(error).toHaveProperty("activeReleaseId", "another-release");
    expect(state.activationTransitions).toBe(0);
  });
});

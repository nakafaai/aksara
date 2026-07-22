import { SignedContentArtifactSchema } from "@nakafa/aksara-contracts/content";
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import {
  ContentReleaseItemSchema,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import {
  type PublicationRequest,
  PublicationRequestSchema,
} from "@nakafa/aksara-contracts/transport/request";
import {
  PublicationResponseSchema,
  type PublicationSuccess,
  PublicationSuccessSchema,
} from "@nakafa/aksara-contracts/transport/response";
import { Match, Schema } from "effect";

const releaseId = "test-http-release";
const artifactHash = `sha256:${"a".repeat(64)}`;
const manifestHash = `sha256:${"b".repeat(64)}`;
const projectionDigest = `sha256:${"c".repeat(64)}`;
const rendererManifestHash = `sha256:${"d".repeat(64)}`;
const signature = `${"A".repeat(85)}A`;

export const transportRelease = Schema.decodeUnknownSync(
  SignedContentReleaseSchema
)({
  keyId: "test-http-key",
  manifest: {
    baseReleaseId: null,
    itemCount: 2,
    itemsDigest: artifactHash,
    origin: { kind: "git", sha: "a".repeat(40) },
    projectionCount: 1,
    projectionDigest,
    releaseId,
    rendererContractVersion: "2.0.0",
    rendererManifestHash,
  },
  manifestHash,
  signature,
});

const item = Schema.decodeUnknownSync(ContentReleaseItemSchema)({
  change: {
    artifactHash,
    contentKey: "test:http",
    delivery: "public",
    locale: "en",
    operation: "upsert",
    publicPath: "subjects/test/http",
    rendererDomain: "material-mathematics",
    sourcePath: "packages/corpus/test/http/en.mdx",
  },
  index: 0,
  releaseId,
});
const deletedItem = Schema.decodeUnknownSync(ContentReleaseItemSchema)({
  change: {
    contentKey: "test:deleted",
    locale: "id",
    operation: "delete",
  },
  index: 1,
  releaseId,
});

const projection = Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
  contentKey: "test:http",
  kind: "subject-lesson",
  locale: "en",
  materialKey: "test.http",
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: "subjects/test",
  publicPath: "subjects/test/http",
  sectionKey: "test-http",
  sitemap: true,
});

const artifact = Schema.decodeUnknownSync(SignedContentArtifactSchema)({
  artifactHash,
  keyId: "test-http-key",
  payload: {
    byteLength: 1,
    compiledCode: "x",
    compilerConfigHash: artifactHash,
    compilerVersion: "0.1.0",
    contentKey: "test:http",
    format: "mdx-function-body-v1",
    locale: "en",
    mdxCompilerVersion: "3.1.1",
    plainText: "Test protocol",
    rawMdx: "x",
    rendererDomain: "material-mathematics",
    requiredComponents: [],
    sourceHash: artifactHash,
  },
  signature,
});

export const transportRequests = Schema.decodeUnknownSync(
  Schema.Array(PublicationRequestSchema)
)([
  { operation: "stageRelease", release: transportRelease },
  {
    batchIndex: 0,
    items: [item, deletedItem],
    operation: "stageItemBatch",
    releaseId,
  },
  {
    batchIndex: 0,
    operation: "stageProjectionBatch",
    projections: [projection],
    releaseId,
  },
  {
    artifacts: [artifact],
    batchIndex: 0,
    operation: "stageArtifactBatch",
    releaseId,
  },
  { manifestHash, operation: "status", releaseId },
  { operation: "verify", release: transportRelease },
  { operation: "activate", release: transportRelease },
  { afterIndex: -1, operation: "finalize", release: transportRelease },
  {
    afterIndex: -1,
    limit: 8,
    operation: "rollbackPage",
    rollbackOf: releaseId,
  },
  { cursor: null, limit: 100, operation: "cleanup", releaseId },
]);

const publicationReceipt = {
  activatedHeads: 1,
  deletedHeads: 1,
  projectionDigest,
  releaseId: transportRelease.manifest.releaseId,
  stagedArtifacts: 1,
  stagedItems: 2,
  stagedProjections: 1,
};

/** Decodes a deliberately modified response into the public wire contract. */
export function transportResponse(input: unknown) {
  return Schema.decodeUnknownSync(PublicationResponseSchema)(input);
}

/** Builds exact success evidence for one transport protocol request. */
export function transportSuccess(
  request: PublicationRequest,
  pendingFinalize = false
): PublicationSuccess {
  const success = Match.value(request).pipe(
    Match.discriminatorsExhaustive("operation")({
      activate: (value) => ({
        ok: true,
        operation: value.operation,
        value: publicationReceipt,
      }),
      cleanup: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          complete: true,
          cursor: value.cursor,
          deletedArtifacts: 0,
          deletedItems: 0,
          nextCursor: null,
          releaseId: value.releaseId,
        },
      }),
      finalize: (value) => {
        const nextIndex = value.release.manifest.itemCount - 1;
        if (pendingFinalize) {
          return {
            ok: true,
            operation: value.operation,
            releaseId: value.release.manifest.releaseId,
            value: { done: false, nextIndex: 0, processed: 1 },
          };
        }
        return {
          ok: true,
          operation: value.operation,
          releaseId: value.release.manifest.releaseId,
          value: {
            done: true,
            nextIndex,
            processed: nextIndex - value.afterIndex,
            receipt: publicationReceipt,
          },
        };
      },
      rollbackPage: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          done: true,
          nextIndex: -1,
          records: [],
          rollbackOf: value.rollbackOf,
          total: 0,
        },
      }),
      stageArtifactBatch: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          batchIndex: value.batchIndex,
          created: value.artifacts.length,
          releaseId: value.releaseId,
          unchanged: 0,
        },
      }),
      stageItemBatch: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          batchIndex: value.batchIndex,
          created: value.items.length,
          releaseId: value.releaseId,
          unchanged: 0,
        },
      }),
      stageProjectionBatch: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          batchIndex: value.batchIndex,
          created: value.projections.length,
          releaseId: value.releaseId,
          unchanged: 0,
        },
      }),
      stageRelease: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          manifestHash: value.release.manifestHash,
          phase: "staging",
          releaseId: value.release.manifest.releaseId,
        },
      }),
      status: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          manifestHash: value.manifestHash,
          phase: "staging",
          releaseId: value.releaseId,
        },
      }),
      verify: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          baseReleaseId: value.release.manifest.baseReleaseId,
          deleteHeads: 1,
          itemCount: value.release.manifest.itemCount,
          itemsDigest: value.release.manifest.itemsDigest,
          manifestHash: value.release.manifestHash,
          projectionCount: 1,
          projectionDigest,
          releaseId: value.release.manifest.releaseId,
          rendererContractVersion: "2.0.0",
          rendererManifestHash,
          stagedArtifacts: 1,
          upsertHeads: 1,
        },
      }),
    })
  );
  return Schema.decodeUnknownSync(PublicationSuccessSchema)(success);
}

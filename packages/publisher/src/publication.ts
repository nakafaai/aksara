import { verifySignedContentArtifact } from "@nakafaai/aksara-contracts/artifact/verify";
import type {
  CompileDocumentSource,
  CompiledContentPayload,
} from "@nakafaai/aksara-contracts/content";
import {
  GitCommitShaSchema,
  type ReleaseId,
} from "@nakafaai/aksara-contracts/ids";
import type {
  ContentReleaseItem,
  ContentReleaseManifest,
  PublicationReceipt,
  ReleaseVerificationEvidence,
  SignedContentRelease,
} from "@nakafaai/aksara-contracts/release";
import { verifyContentReleaseItems } from "@nakafaai/aksara-contracts/release/items";
import { verifySignedContentRelease } from "@nakafaai/aksara-contracts/release/verify";
import type { RendererManifestEnvelope } from "@nakafaai/aksara-contracts/renderer/contract";
import { validateRendererManifestHash } from "@nakafaai/aksara-contracts/renderer/manifest";
import { Context, Effect, Redacted, Schema } from "effect";
import {
  type ArtifactBatch,
  MAX_ARTIFACTS_PER_BATCH,
  makeArtifactBatch,
  makeReleaseItemBatch,
  partitionArtifactBatches,
  partitionReleaseItemBatches,
  type ReleaseItemBatch,
} from "#publisher/batching.js";
import {
  ReleaseArtifactMismatchError,
  validateArtifactForItem,
  validatePublicationReceipt,
  validateReleaseRendererManifest,
  validateVerificationEvidence,
} from "#publisher/release-validation.js";
import {
  makeEd25519PublicationSigner,
  type PublicationSigner,
} from "#publisher/signing.js";
import { compileReleaseSources } from "#publisher/source-compilation.js";
import type { PublicationTargetFailure } from "#publisher/target-errors.js";

/** The exact reviewed Aksara revision could not provide release sources. */
export class PublicationSourceError extends Schema.TaggedError<PublicationSourceError>()(
  "PublicationSourceError",
  {
    aksaraSha: GitCommitShaSchema,
    cause: Schema.Unknown,
    message: Schema.NonEmptyTrimmedString,
  }
) {}

/** Complete release input authenticated before source loading and activation. */
export interface PublishContentReleaseInput {
  readonly items: readonly unknown[];
  readonly manifest: ContentReleaseManifest;
  readonly rendererManifest: RendererManifestEnvelope;
}

/** Signing configuration injected only into the safe publication operation. */
export class PublicationSigningKey extends Context.Tag(
  "AksaraPublicationSigningKey"
)<
  PublicationSigningKey,
  {
    readonly keyId: string;
    readonly privateKeyPem: Redacted.Redacted<string>;
  }
>() {}

/**
 * Trusted source-control seam that loads ordered upserts from one exact,
 * reviewed Aksara commit rather than accepting source beside a claimed SHA.
 */
export class PublicationSource extends Context.Tag("AksaraPublicationSource")<
  PublicationSource,
  {
    readonly loadExactRevision: (input: {
      readonly aksaraSha: typeof GitCommitShaSchema.Type;
      readonly items: readonly ContentReleaseItem[];
    }) => Effect.Effect<
      readonly CompileDocumentSource[],
      PublicationSourceError
    >;
  }
>() {}

/**
 * Infrastructure seam for invisible staging followed by atomic activation.
 * Every stage method must accept exact retries idempotently and reject a
 * conflicting value at the same release or batch identity.
 */
export class PublicationTarget extends Context.Tag("AksaraPublicationTarget")<
  PublicationTarget,
  {
    readonly activate: (
      release: SignedContentRelease
    ) => Effect.Effect<PublicationReceipt, PublicationTargetFailure>;
    readonly stageArtifactBatch: (
      batch: ArtifactBatch
    ) => Effect.Effect<void, PublicationTargetFailure>;
    readonly stageItemBatch: (
      batch: ReleaseItemBatch
    ) => Effect.Effect<void, PublicationTargetFailure>;
    readonly stageRelease: (
      release: SignedContentRelease
    ) => Effect.Effect<void, PublicationTargetFailure>;
    readonly verify: (
      release: SignedContentRelease
    ) => Effect.Effect<ReleaseVerificationEvidence, PublicationTargetFailure>;
  }
>() {}

function upsertItems(items: readonly ContentReleaseItem[]) {
  return items.filter((item) => item.change.operation === "upsert");
}

const stageItemBatches = Effect.fn("AksaraPublisher.stageItemBatches")(
  function* (
    target: typeof PublicationTarget.Service,
    releaseId: ReleaseId,
    items: readonly ContentReleaseItem[]
  ) {
    const batches = yield* partitionReleaseItemBatches(items);
    for (const [batchIndex, values] of batches.entries()) {
      const batch = yield* makeReleaseItemBatch({
        batchIndex,
        items: values,
        releaseId,
      });
      yield* target.stageItemBatch(batch);
    }
  }
);

const stageArtifactBatches = Effect.fn("AksaraPublisher.stageArtifactBatches")(
  function* (input: {
    readonly items: readonly ContentReleaseItem[];
    readonly manifest: ContentReleaseManifest;
    readonly payloads: readonly CompiledContentPayload[];
    readonly rendererManifest: RendererManifestEnvelope;
    readonly signer: PublicationSigner;
    readonly target: typeof PublicationTarget.Service;
  }) {
    const items = upsertItems(input.items);
    let targetBatchIndex = 0;
    for (
      let offset = 0;
      offset < input.payloads.length;
      offset += MAX_ARTIFACTS_PER_BATCH
    ) {
      const payloads = input.payloads.slice(
        offset,
        offset + MAX_ARTIFACTS_PER_BATCH
      );
      const artifacts = yield* Effect.forEach(
        payloads,
        (payload, batchOffset) =>
          Effect.gen(function* () {
            const item = items[offset + batchOffset];
            if (!item) {
              return yield* new ReleaseArtifactMismatchError({
                message: "A content payload has no authenticated upsert item.",
              });
            }
            const signed = yield* input.signer.signArtifact(payload);
            const verified = yield* verifySignedContentArtifact({
              artifact: signed,
              rendererContractVersion: input.manifest.rendererContractVersion,
              rendererManifest: input.rendererManifest,
            });
            yield* validateArtifactForItem(item, verified);
            return verified;
          })
      );
      const batches = yield* partitionArtifactBatches(artifacts);
      for (const values of batches) {
        const batch = yield* makeArtifactBatch({
          artifacts: values,
          batchIndex: targetBatchIndex,
          releaseId: input.manifest.releaseId,
        });
        yield* input.target.stageArtifactBatch(batch);
        targetBatchIndex += 1;
      }
    }
  }
);

/** Authenticates and stages bounded batches before one atomic activation. */
export const publishContentRelease = Effect.fn(
  "AksaraPublisher.publishContentRelease"
)(function* (input: PublishContentReleaseInput) {
  const signingKey = yield* PublicationSigningKey;
  const source = yield* PublicationSource;
  const target = yield* PublicationTarget;
  const rendererManifest = yield* validateRendererManifestHash(
    input.rendererManifest
  );
  const summary = yield* verifyContentReleaseItems({
    items: input.items,
    manifest: input.manifest,
  });
  yield* validateReleaseRendererManifest(input.manifest, rendererManifest);
  const sources = yield* source.loadExactRevision({
    aksaraSha: input.manifest.aksaraSha,
    items: upsertItems(summary.items),
  });
  const payloads = yield* compileReleaseSources({
    rendererManifest,
    sources,
    summary,
  });
  const signer = yield* makeEd25519PublicationSigner({
    keyId: signingKey.keyId,
    privateKeyPem: Redacted.value(signingKey.privateKeyPem),
  });

  const signedRelease = yield* signer.signRelease(input.manifest);
  const release = yield* verifySignedContentRelease(signedRelease);
  yield* target.stageRelease(release);
  yield* stageItemBatches(target, input.manifest.releaseId, summary.items);
  yield* stageArtifactBatches({
    items: summary.items,
    manifest: input.manifest,
    payloads,
    rendererManifest,
    signer,
    target,
  });

  const verification = yield* target.verify(release);
  yield* validateVerificationEvidence(input.manifest, summary, verification);
  const receipt = yield* target.activate(release);
  return yield* validatePublicationReceipt(input.manifest, summary, receipt);
});

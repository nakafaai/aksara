import type { GitCommitSha } from "@nakafaai/aksara-contracts/ids";
import {
  decodeContentProjections,
  verifyContentProjections,
} from "@nakafaai/aksara-contracts/projection/verify";
import type { ContentReleaseItem } from "@nakafaai/aksara-contracts/release";
import {
  decodeContentReleaseItems,
  verifyContentReleaseItems,
} from "@nakafaai/aksara-contracts/release/items";
import { verifySignedContentRelease } from "@nakafaai/aksara-contracts/release/verify";
import { validateRendererManifestHash } from "@nakafaai/aksara-contracts/renderer/manifest";
import { Effect, Redacted, Stream } from "effect";
import {
  makeArtifactBatches,
  makeReleaseItemBatches,
} from "#publisher/batching";
import type {
  PreparedContentRelease,
  PreparedGitRelease,
  PreparedRollbackRelease,
} from "#publisher/preparation/spec";
import { makeProjectionBatches } from "#publisher/projection-batch";
import {
  makeGitArtifacts,
  makeRollbackArtifacts,
} from "#publisher/publication/artifacts";
import { completePublicationLifecycle } from "#publisher/publication/lifecycle";
import {
  PublicationModeMismatchError,
  PublicationSigningKey,
  PublicationSource,
  PublicationTarget,
  type PublishContentRelease,
} from "#publisher/publication/spec";
import { validateReleaseRendererManifest } from "#publisher/release-validation";
import { makeEd25519PublicationSigner } from "#publisher/signing";
import { compileReleaseSources } from "#publisher/source-compilation";

/** Selects authenticated upserts while preserving canonical stream order. */
function upsertItems<E, R>(items: Stream.Stream<ContentReleaseItem, E, R>) {
  return items.pipe(
    Stream.filter((item) => item.change.operation === "upsert")
  );
}

/** Creates the typed failure for a prepared and signed mode mismatch. */
function modeMismatch<E, R>(input: PreparedContentRelease<E, R>) {
  return new PublicationModeMismatchError({
    manifestMode: input.manifest.origin.kind,
    preparedMode: input.kind,
    releaseId: input.manifest.releaseId,
  });
}

type ValidatedPublication<E, R> =
  | {
      readonly aksaraSha: GitCommitSha;
      readonly input: PreparedGitRelease<E, R>;
      readonly kind: "git";
    }
  | {
      readonly input: PreparedRollbackRelease<E, R>;
      readonly kind: "rollback";
    };

/** Binds the prepared discriminant to its signed manifest provenance. */
function validatePublicationMode<E, R>(
  input: PreparedContentRelease<E, R>
): Effect.Effect<ValidatedPublication<E, R>, PublicationModeMismatchError> {
  if (input.kind === "git") {
    if (input.manifest.origin.kind !== "git") {
      return Effect.fail(modeMismatch(input));
    }
    return Effect.succeed<ValidatedPublication<E, R>>({
      aksaraSha: input.manifest.origin.sha,
      input,
      kind: "git",
    });
  }
  if (input.manifest.origin.kind !== "rollback") {
    return Effect.fail(modeMismatch(input));
  }
  return Effect.succeed<ValidatedPublication<E, R>>({
    input,
    kind: "rollback",
  });
}

/** Authenticates, stages, verifies, activates, and finalizes one release. */
export const publishContentRelease: PublishContentRelease = Effect.fn(
  "AksaraPublisher.publishContentRelease"
)(function* <E, R>(input: PreparedContentRelease<E, R>) {
  const rendererManifest = yield* validateRendererManifestHash(
    input.rendererManifest
  );
  /** Replays strict item decoding with fresh ordering and route state. */
  const decodedItems = () =>
    decodeContentReleaseItems({
      items: input.items(),
      manifest: input.manifest,
    });
  /** Replays strict projection decoding with fresh ordering and route state. */
  const decodedProjections = () =>
    decodeContentProjections(input.projections());
  const summary = yield* verifyContentReleaseItems({
    items: input.items(),
    manifest: input.manifest,
  });
  const projectionSummary = yield* verifyContentProjections({
    manifest: input.manifest,
    projections: input.projections(),
  });
  yield* validateReleaseRendererManifest(input.manifest, rendererManifest);
  const publication = yield* validatePublicationMode(input);
  if (publication.kind === "rollback") {
    yield* makeRollbackArtifacts({
      artifacts: publication.input.artifacts(),
      items: upsertItems(decodedItems()),
      manifest: input.manifest,
      rendererManifest,
    }).pipe(Stream.runDrain);
  } else {
    const source = yield* PublicationSource;
    const items = upsertItems(decodedItems());
    yield* compileReleaseSources({
      items,
      rendererManifest,
      sources: source.loadExactRevision({
        aksaraSha: publication.aksaraSha,
        items,
      }),
    }).pipe(Stream.runDrain);
  }

  const signingKey = yield* PublicationSigningKey;
  const target = yield* PublicationTarget;
  const signer = yield* makeEd25519PublicationSigner({
    keyId: signingKey.keyId,
    privateKeyPem: Redacted.value(signingKey.privateKeyPem),
  });
  const signedRelease = yield* signer.signRelease(input.manifest);
  const release = yield* verifySignedContentRelease(signedRelease);
  const stage = Effect.gen(function* () {
    yield* makeReleaseItemBatches(
      input.manifest.releaseId,
      decodedItems()
    ).pipe(Stream.runForEach(target.stageItemBatch));
    yield* makeProjectionBatches(
      input.manifest.releaseId,
      decodedProjections()
    ).pipe(Stream.runForEach(target.stageProjectionBatch));
    if (publication.kind === "rollback") {
      const artifacts = makeRollbackArtifacts({
        artifacts: publication.input.artifacts(),
        items: upsertItems(decodedItems()),
        manifest: input.manifest,
        rendererManifest,
      });
      yield* makeArtifactBatches(input.manifest.releaseId, artifacts).pipe(
        Stream.runForEach(target.stageArtifactBatch)
      );
      return;
    }
    const source = yield* PublicationSource;
    const items = upsertItems(decodedItems());
    const artifacts = makeGitArtifacts({
      items,
      manifest: input.manifest,
      rendererManifest,
      signer,
      sources: source.loadExactRevision({
        aksaraSha: publication.aksaraSha,
        items,
      }),
    });
    yield* makeArtifactBatches(input.manifest.releaseId, artifacts).pipe(
      Stream.runForEach(target.stageArtifactBatch)
    );
  });
  return yield* completePublicationLifecycle({
    projectionSummary,
    release,
    stage,
    summary,
    target,
  });
});

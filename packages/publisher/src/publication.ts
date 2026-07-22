import {
  decodeContentProjections,
  verifyContentProjections,
} from "@nakafa/aksara-contracts/projection/verify";
import type { ContentReleaseItem } from "@nakafa/aksara-contracts/release";
import {
  decodeContentReleaseItems,
  verifyContentReleaseItems,
} from "@nakafa/aksara-contracts/release/items";
import { verifySignedContentRelease } from "@nakafa/aksara-contracts/release/verify";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
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
  type PublishGitRelease,
  type PublishRollbackRelease,
} from "#publisher/publication/spec";
import { validateReleaseRendererManifest } from "#publisher/release-validation";
import { createReplaySpool, type ReplaySpool } from "#publisher/replay/spool";
import { makeEd25519PublicationSigner } from "#publisher/signing";
import {
  type CompiledReleaseSource,
  CompiledReleaseSourceSchema,
  compileReleaseSources,
} from "#publisher/source-compilation";

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

type PublicationInvocation<E, R> =
  | {
      readonly input: PreparedGitRelease<E, R>;
      readonly kind: "git";
      readonly source: typeof PublicationSource.Service;
    }
  | {
      readonly input: PreparedRollbackRelease<E, R>;
      readonly kind: "rollback";
    };

type PublicationArtifactPlan<E, R> =
  | {
      readonly compiled: ReplaySpool<CompiledReleaseSource>;
      readonly kind: "git";
    }
  | {
      readonly input: PreparedRollbackRelease<E, R>;
      readonly kind: "rollback";
    };

/** Requires one Git-prepared release to carry exact Git provenance. */
function validateGitMode<E, R>(input: PreparedGitRelease<E, R>) {
  if (input.manifest.origin.kind !== "git") {
    return Effect.fail(modeMismatch(input));
  }
  return Effect.succeed(input.manifest.origin.sha);
}

/** Requires one rollback-prepared release to carry rollback provenance. */
function validateRollbackMode<E, R>(input: PreparedRollbackRelease<E, R>) {
  if (input.manifest.origin.kind !== "rollback") {
    return Effect.fail(modeMismatch(input));
  }
  return Effect.void;
}

/** Runs one publication while retaining scoped exact-Git replay files. */
const publishReleaseScoped = Effect.fn("AksaraPublisher.publishReleaseScoped")(
  function* <E, R>(invocation: PublicationInvocation<E, R>) {
    const { input } = invocation;
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
    let artifactPlan: PublicationArtifactPlan<E, R>;
    if (invocation.kind === "rollback") {
      yield* validateRollbackMode(invocation.input);
      yield* makeRollbackArtifacts({
        artifacts: invocation.input.artifacts(),
        items: upsertItems(decodedItems()),
        manifest: input.manifest,
        rendererManifest,
      }).pipe(Stream.runDrain);
      artifactPlan = { input: invocation.input, kind: "rollback" };
    } else {
      const aksaraSha = yield* validateGitMode(invocation.input);
      const items = upsertItems(decodedItems());
      const compiled = yield* createReplaySpool({
        prefix: "aksara-exact-git-",
        schema: CompiledReleaseSourceSchema,
        stream: compileReleaseSources({
          items,
          rendererManifest,
          sources: invocation.source.loadExactRevision({
            aksaraSha,
            items,
          }),
        }),
      });
      artifactPlan = { compiled, kind: "git" };
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
      if (artifactPlan.kind === "rollback") {
        const artifacts = makeRollbackArtifacts({
          artifacts: artifactPlan.input.artifacts(),
          items: upsertItems(decodedItems()),
          manifest: input.manifest,
          rendererManifest,
        });
        yield* makeArtifactBatches(input.manifest.releaseId, artifacts).pipe(
          Stream.runForEach(target.stageArtifactBatch)
        );
        return;
      }
      const artifacts = makeGitArtifacts({
        compiled: artifactPlan.compiled.replay(),
        manifest: input.manifest,
        rendererManifest,
        signer,
      });
      yield* makeArtifactBatches(input.manifest.releaseId, artifacts).pipe(
        Stream.runForEach(target.stageArtifactBatch)
      );
    });
    return yield* completePublicationLifecycle({
      projectionSummary,
      release,
      rendererManifest,
      stage,
      summary,
      target,
    });
  }
);

/** Publishes one exact-Git release after acquiring its reviewed source seam. */
export const publishGitRelease: PublishGitRelease = Effect.fn(
  "AksaraPublisher.publishGitRelease"
)(function* (input) {
  const source = yield* PublicationSource;
  return yield* Effect.scoped(
    publishReleaseScoped({ input, kind: "git", source })
  );
});

/** Publishes one forward rollback without acquiring an irrelevant Git source. */
export const publishRollbackRelease: PublishRollbackRelease = Effect.fn(
  "AksaraPublisher.publishRollbackRelease"
)((input) => Effect.scoped(publishReleaseScoped({ input, kind: "rollback" })));

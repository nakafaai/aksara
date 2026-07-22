import { verifySignedContentArtifact } from "@nakafa/aksara-contracts/artifact/verify";
import type { SignedContentArtifact } from "@nakafa/aksara-contracts/content";
import type {
  ContentReleaseItem,
  ContentReleaseManifest,
} from "@nakafa/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Stream } from "effect";
import {
  ReleaseArtifactMismatchError,
  validateArtifactForItem,
} from "#publisher/release-validation";
import type { PublicationSigner } from "#publisher/signing";
import {
  type CompiledReleaseSource,
  compileReleaseSources,
} from "#publisher/source-compilation";

type ArtifactVerificationError = Effect.Effect.Error<
  ReturnType<typeof verifySignedContentArtifact>
>;

type ArtifactVerificationContext = Effect.Effect.Context<
  ReturnType<typeof verifySignedContentArtifact>
>;

type ArtifactSigningError = Effect.Effect.Error<
  ReturnType<PublicationSigner["signArtifact"]>
>;

type CompiledSourceStream<E, R, E2, R2> = ReturnType<
  typeof compileReleaseSources<E, R, E2, R2>
>;

type RollbackArtifactPair =
  | { readonly artifact: SignedContentArtifact; readonly kind: "extra" }
  | { readonly item: ContentReleaseItem; readonly kind: "missing" }
  | {
      readonly artifact: SignedContentArtifact;
      readonly item: ContentReleaseItem;
      readonly kind: "both";
    };

/** Signs and verifies one reproducible exact-Git payload before staging. */
function signGitArtifact(
  signer: PublicationSigner,
  rendererManifest: RendererManifestEnvelope,
  manifest: ContentReleaseManifest,
  input: CompiledReleaseSource
) {
  return Effect.gen(function* () {
    const signed = yield* signer.signArtifact(input.payload);
    const artifact = yield* verifySignedContentArtifact({
      artifact: signed,
      rendererContractVersion: manifest.rendererContractVersion,
      rendererManifest,
    });
    yield* validateArtifactForItem(input.item, artifact);
    return artifact;
  });
}

/** Recompiles, signs, and verifies exact-Git sources incrementally. */
export function makeGitArtifacts<E, R, E2, R2>(input: {
  readonly items: Stream.Stream<ContentReleaseItem, E, R>;
  readonly manifest: ContentReleaseManifest;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly signer: PublicationSigner;
  readonly sources: Stream.Stream<unknown, E2, R2>;
}): Stream.Stream<
  SignedContentArtifact,
  | ArtifactSigningError
  | ArtifactVerificationError
  | ReleaseArtifactMismatchError
  | Stream.Stream.Error<CompiledSourceStream<E, R, E2, R2>>,
  | ArtifactVerificationContext
  | Stream.Stream.Context<CompiledSourceStream<E, R, E2, R2>>
> {
  return compileReleaseSources({
    items: input.items,
    rendererManifest: input.rendererManifest,
    sources: input.sources,
  }).pipe(
    Stream.mapEffect((compiled) =>
      signGitArtifact(
        input.signer,
        input.rendererManifest,
        input.manifest,
        compiled
      )
    )
  );
}

/** Authenticates one old envelope paired to its forward-release upsert. */
function verifyRollbackPair(
  pair: RollbackArtifactPair,
  rendererManifest: RendererManifestEnvelope,
  manifest: ContentReleaseManifest
) {
  if (pair.kind === "missing") {
    return Effect.fail(
      new ReleaseArtifactMismatchError({
        message: `Rollback item ${pair.item.index} has no signed artifact.`,
      })
    );
  }
  if (pair.kind === "extra") {
    return Effect.fail(
      new ReleaseArtifactMismatchError({
        message: "A rollback artifact has no authenticated upsert item.",
      })
    );
  }
  return verifySignedContentArtifact({
    artifact: pair.artifact,
    rendererContractVersion: manifest.rendererContractVersion,
    rendererManifest,
  }).pipe(
    Effect.tap((artifact) => validateArtifactForItem(pair.item, artifact))
  );
}

/** Re-verifies unchanged old envelopes against items and current renderer. */
export function makeRollbackArtifacts<E, R, E2, R2>(input: {
  readonly artifacts: Stream.Stream<SignedContentArtifact, E, R>;
  readonly items: Stream.Stream<ContentReleaseItem, E2, R2>;
  readonly manifest: ContentReleaseManifest;
  readonly rendererManifest: RendererManifestEnvelope;
}): Stream.Stream<
  SignedContentArtifact,
  E | E2 | ArtifactVerificationError | ReleaseArtifactMismatchError,
  R | R2 | ArtifactVerificationContext
> {
  return input.items.pipe(
    Stream.zipAllWith({
      onBoth: (item, artifact): RollbackArtifactPair => ({
        artifact,
        item,
        kind: "both",
      }),
      onOther: (artifact): RollbackArtifactPair => ({
        artifact,
        kind: "extra",
      }),
      onSelf: (item): RollbackArtifactPair => ({ item, kind: "missing" }),
      other: input.artifacts,
    }),
    Stream.mapEffect((pair) =>
      verifyRollbackPair(pair, input.rendererManifest, input.manifest)
    )
  );
}

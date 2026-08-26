import type { verifySignedContentArtifact } from "@nakafa/aksara-contracts/artifact/verify";
import type { verifyContentProjections } from "@nakafa/aksara-contracts/projection/verify";
import type { verifyContentReleaseItems } from "@nakafa/aksara-contracts/release/items";
import type { verifyContentRoutes } from "@nakafa/aksara-contracts/release/route/verify";
import type { verifyContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/verify";
import type { verifySignedContentRelease } from "@nakafa/aksara-contracts/release/verify";
import type { validateLiveRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import type { verifySignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/verify";
import type { Effect } from "effect";
import type { prepareRollback } from "#publisher/rollback";
import type { PublicationSigner } from "#publisher/signing/service";

/** Failure inferred from canonical release-item verification. */
export type ReleaseItemVerificationError<E, R> = Effect.Error<
  ReturnType<typeof verifyContentReleaseItems<E, R>>
>;

/** Failure inferred from canonical projection verification. */
export type ProjectionVerificationError<E, R> = Effect.Error<
  ReturnType<typeof verifyContentProjections<E, R>>
>;

/** Failure inferred from canonical route verification. */
export type RouteVerificationError<E, R> = Effect.Error<
  ReturnType<typeof verifyContentRoutes<E, R>>
>;

/** Failure inferred from structured snapshot verification. */
export type SnapshotVerificationError<E, R> = Effect.Error<
  ReturnType<typeof verifyContentSnapshots<E, R, E, R>>
>;

/** Failure inferred from renderer-manifest hash validation. */
export type RendererManifestValidationError = Effect.Error<
  ReturnType<typeof validateLiveRendererManifestHash>
>;

/** Failure inferred from signed artifact verification. */
export type ArtifactVerificationError = Effect.Error<
  ReturnType<typeof verifySignedContentArtifact>
>;

/** Failure inferred from signed release verification. */
export type SignedReleaseVerificationError = Effect.Error<
  ReturnType<typeof verifySignedContentRelease>
>;

/** Failure inferred from permanent runtime-bundle verification. */
export type TryoutRuntimeBundleVerificationError = Effect.Error<
  ReturnType<typeof verifySignedTryoutRuntimeBundle>
>;

/** Failure inferred from publication artifact signing. */
export type ArtifactSigningError = Effect.Error<
  ReturnType<PublicationSigner["signArtifact"]>
>;

/** Failure inferred from permanent runtime-bundle signing. */
export type TryoutRuntimeBundleSigningError = Effect.Error<
  ReturnType<PublicationSigner["signTryoutRuntimeBundle"]>
>;

/** Failure inferred from authenticated rollback preparation. */
export type RecoveryPreparationError = Effect.Error<
  ReturnType<typeof prepareRollback>
>;

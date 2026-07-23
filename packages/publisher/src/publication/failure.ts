import type { verifySignedContentArtifact } from "@nakafa/aksara-contracts/artifact/verify";
import type { verifyContentProjections } from "@nakafa/aksara-contracts/projection/verify";
import type { verifyContentReleaseItems } from "@nakafa/aksara-contracts/release/items";
import type { verifyContentRoutes } from "@nakafa/aksara-contracts/release/routes";
import type { verifyContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot-verify";
import type { verifySignedContentRelease } from "@nakafa/aksara-contracts/release/verify";
import type { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import type { Effect } from "effect";
import type { prepareRollback } from "#publisher/rollback";
import type { PublicationSigner } from "#publisher/signing";

/** Failure inferred from canonical release-item verification. */
export type ReleaseItemVerificationError<E, R> = Effect.Effect.Error<
  ReturnType<typeof verifyContentReleaseItems<E, R>>
>;

/** Failure inferred from canonical projection verification. */
export type ProjectionVerificationError<E, R> = Effect.Effect.Error<
  ReturnType<typeof verifyContentProjections<E, R>>
>;

/** Failure inferred from canonical route verification. */
export type RouteVerificationError<E, R> = Effect.Effect.Error<
  ReturnType<typeof verifyContentRoutes<E, R>>
>;

/** Failure inferred from structured snapshot verification. */
export type SnapshotVerificationError<E, R> = Effect.Effect.Error<
  ReturnType<typeof verifyContentSnapshots<E, R, E, R>>
>;

/** Failure inferred from renderer-manifest hash validation. */
export type RendererManifestValidationError = Effect.Effect.Error<
  ReturnType<typeof validateRendererManifestHash>
>;

/** Failure inferred from signed artifact verification. */
export type ArtifactVerificationError = Effect.Effect.Error<
  ReturnType<typeof verifySignedContentArtifact>
>;

/** Failure inferred from signed release verification. */
export type SignedReleaseVerificationError = Effect.Effect.Error<
  ReturnType<typeof verifySignedContentRelease>
>;

/** Failure inferred from publication artifact signing. */
export type ArtifactSigningError = Effect.Effect.Error<
  ReturnType<PublicationSigner["signArtifact"]>
>;

/** Failure inferred from authenticated rollback preparation. */
export type RecoveryPreparationError = Effect.Effect.Error<
  ReturnType<typeof prepareRollback>
>;

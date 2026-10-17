import { Effect, Schema } from "effect";

import { hashText } from "#contracts/hash/text";
import { ReleaseIdSchema } from "#contracts/ids";
import { canonicalizeContentReleaseManifest } from "#contracts/release/signing";
import type { ContentReleaseManifest } from "#contracts/release/spec";

/** SHA-256 computation failed before release authenticity was established. */
export class ReleaseHashComputationError extends Schema.TaggedError<
  ReleaseHashComputationError,
  { readonly brand: unique symbol }
>()("ReleaseHashComputationError", { releaseId: ReleaseIdSchema }) {}

/** Computes the immutable identity of one canonical release manifest. */
export const hashContentReleaseManifest = Effect.fn(
  "AksaraContracts.hashContentReleaseManifest"
)((manifest: ContentReleaseManifest) =>
  hashText(canonicalizeContentReleaseManifest(manifest)).pipe(
    Effect.mapError(
      () => new ReleaseHashComputationError({ releaseId: manifest.releaseId })
    )
  )
);

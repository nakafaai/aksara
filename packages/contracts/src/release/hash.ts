import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { canonicalizeContentReleaseManifest } from "#contracts/release/signing";
import type { ContentReleaseManifest } from "#contracts/release/spec";

/** SHA-256 computation failed before release authenticity was established. */
export class ReleaseHashComputationError extends Schema.TaggedError<ReleaseHashComputationError>()(
  "ReleaseHashComputationError",
  { releaseId: ReleaseIdSchema }
) {}

/** Computes the immutable identity of one canonical release manifest. */
export const hashContentReleaseManifest = Effect.fn(
  "AksaraContracts.hashContentReleaseManifest"
)((manifest: ContentReleaseManifest) =>
  Effect.try({
    catch: () =>
      new ReleaseHashComputationError({ releaseId: manifest.releaseId }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(canonicalizeContentReleaseManifest(manifest))
          .digest("hex")}`
      ),
  })
);

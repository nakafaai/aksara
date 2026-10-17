import { Effect, Schema } from "effect";
import { hashText } from "#contracts/hash/text";
import {
  type ContentProjection,
  canonicalizeContentProjection,
} from "#contracts/projection/spec";

/** The projection identity could not be computed for one content key. */
export class ContentProjectionHashError extends Schema.TaggedError<ContentProjectionHashError>()(
  "ContentProjectionHashError",
  { contentKey: Schema.String }
) {}

/** Hashes one canonical projection for authoritative content-head diffing. */
export const hashContentProjection = Effect.fn(
  "AksaraContracts.hashContentProjection"
)((projection: ContentProjection) =>
  hashText(canonicalizeContentProjection(projection)).pipe(
    Effect.mapError(
      () =>
        new ContentProjectionHashError({ contentKey: projection.contentKey })
    )
  )
);

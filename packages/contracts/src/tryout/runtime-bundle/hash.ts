import { Effect, Schema } from "effect";

import { hashText } from "#contracts/hash/text";
import { ReleaseIdSchema } from "#contracts/ids";
import { canonicalizeTryoutRuntimeBundlePayload } from "#contracts/tryout/runtime-bundle/canonical";
import type { TryoutRuntimeBundlePayload } from "#contracts/tryout/runtime-bundle/spec";

/** SHA-256 computation failed before bundle authenticity was established. */
export class TryoutRuntimeBundleHashComputationError extends Schema.TaggedError<TryoutRuntimeBundleHashComputationError>()(
  "TryoutRuntimeBundleHashComputationError",
  { sourceReleaseId: ReleaseIdSchema }
) {}

/** Computes the immutable identity of one canonical runtime bundle payload. */
export const hashTryoutRuntimeBundlePayload = Effect.fn(
  "AksaraContracts.hashTryoutRuntimeBundlePayload"
)((payload: TryoutRuntimeBundlePayload) =>
  hashText(canonicalizeTryoutRuntimeBundlePayload(payload)).pipe(
    Effect.mapError(
      () =>
        new TryoutRuntimeBundleHashComputationError({
          sourceReleaseId: payload.sourceReleaseId,
        })
    )
  )
);

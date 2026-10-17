import { Effect } from "effect";
import {
  ArtifactSourceHashComputationError,
  ArtifactSourceHashMismatchError,
} from "#contracts/artifact/spec";
import type { CompiledContentPayload } from "#contracts/content";
import { hashText } from "#contracts/hash/text";

/** Computes the authenticated hash of the complete authored MDX source. */
function hashAuthoredSource(payload: CompiledContentPayload) {
  return hashText(payload.rawMdx).pipe(
    Effect.mapError(
      () =>
        new ArtifactSourceHashComputationError({
          contentKey: payload.contentKey,
        })
    )
  );
}

/** Verifies that sourceHash identifies the complete authenticated raw MDX. */
export const verifyCompiledContentSourceHash = Effect.fn(
  "AksaraContracts.verifyCompiledContentSourceHash"
)((payload: CompiledContentPayload) =>
  hashAuthoredSource(payload).pipe(
    Effect.flatMap((actualHash) => {
      if (actualHash === payload.sourceHash) {
        return Effect.void;
      }
      return Effect.fail(
        new ArtifactSourceHashMismatchError({
          actualHash,
          contentKey: payload.contentKey,
          expectedHash: payload.sourceHash,
        })
      );
    })
  )
);

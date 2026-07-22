import { createHash } from "node:crypto";
import { Effect } from "effect";
import {
  ArtifactSourceHashComputationError,
  ArtifactSourceHashMismatchError,
} from "#contracts/artifact/spec";
import type { CompiledContentPayload } from "#contracts/content";
import { Sha256HashSchema } from "#contracts/ids";

/** Computes the authenticated hash of the complete authored MDX source. */
function hashAuthoredSource(payload: CompiledContentPayload) {
  return Effect.try({
    catch: () =>
      new ArtifactSourceHashComputationError({
        contentKey: payload.contentKey,
      }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256").update(payload.rawMdx).digest("hex")}`
      ),
  });
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

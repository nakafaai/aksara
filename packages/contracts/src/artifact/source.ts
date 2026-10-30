import { Effect } from "effect";
import { ArtifactSourceHashMismatchError } from "#contracts/artifact/spec";
import type { CompiledContentPayload } from "#contracts/content";
import { hashText } from "#contracts/hash/text";

/** Verifies that sourceHash identifies the complete authenticated raw MDX. */
export const verifyCompiledContentSourceHash = Effect.fn(
  "AksaraContracts.verifyCompiledContentSourceHash"
)((payload: CompiledContentPayload) =>
  hashText(payload.rawMdx).pipe(
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

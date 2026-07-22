import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import type {
  ReleaseCleanupReceipt,
  ReleaseCleanupRequest,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  cleanupContentRelease,
  ReleaseCleanupContractError,
} from "#publisher/cleanup";
import { PublicationTarget } from "#publisher/publication/spec";

const releaseId = ReleaseIdSchema.make("release-cleanup");
const receipt: ReleaseCleanupReceipt = {
  complete: false,
  deletedArtifacts: 2,
  deletedItems: 3,
  nextCursor: "next-page",
  releaseId,
};

/** Builds a publication target whose only exercised capability is cleanup. */
function makeTarget(
  cleanup: (
    request: ReleaseCleanupRequest
  ) => Effect.Effect<ReleaseCleanupReceipt>
) {
  return PublicationTarget.of({
    activate: () => Effect.die("unused activate"),
    cleanup,
    finalize: () => Effect.die("unused finalize"),
    rollbackPage: () => Effect.die("unused rollback page"),
    stageArtifactBatch: () => Effect.die("unused artifact staging"),
    stageItemBatch: () => Effect.die("unused item staging"),
    stageProjectionBatch: () => Effect.die("unused projection staging"),
    stageRelease: () => Effect.die("unused release staging"),
    status: () => Effect.die("unused status"),
    verify: () => Effect.die("unused verification"),
  });
}

/** Executes cleanup with the supplied infrastructure response. */
function runCleanup(input: unknown, cleanupReceipt: ReleaseCleanupReceipt) {
  return cleanupContentRelease(input).pipe(
    Effect.provideService(
      PublicationTarget,
      makeTarget(() => Effect.succeed(cleanupReceipt))
    )
  );
}

describe("cleanupContentRelease", () => {
  it("decodes and forwards one bounded cleanup page", async () => {
    const cleanup = vi.fn(() => Effect.succeed(receipt));
    const result = await Effect.runPromise(
      cleanupContentRelease({ cursor: null, limit: 100, releaseId }).pipe(
        Effect.provideService(PublicationTarget, makeTarget(cleanup))
      )
    );
    expect(result).toEqual(receipt);
    expect(cleanup).toHaveBeenCalledWith({
      cursor: null,
      limit: 100,
      releaseId,
    });
  });

  it("rejects malformed input before target cleanup", async () => {
    const cleanup = vi.fn(() => Effect.succeed(receipt));
    const error = await Effect.runPromise(
      cleanupContentRelease({ cursor: null, limit: 0, releaseId }).pipe(
        Effect.provideService(PublicationTarget, makeTarget(cleanup)),
        Effect.flip
      )
    );
    expect(error).toEqual(
      new ReleaseCleanupContractError({ contract: "request" })
    );
    expect(cleanup).not.toHaveBeenCalled();
  });

  it("rejects cleanup evidence for another release", async () => {
    const error = await Effect.runPromise(
      runCleanup(
        { cursor: null, limit: 100, releaseId },
        { ...receipt, releaseId: ReleaseIdSchema.make("release-other") }
      ).pipe(Effect.flip)
    );
    expect(error).toEqual(
      new ReleaseCleanupContractError({ contract: "receipt" })
    );
  });
});

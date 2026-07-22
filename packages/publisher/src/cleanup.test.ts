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
  cursor: null,
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

  it("rejects cleanup evidence for another request or above its limit", async () => {
    const invalid = [
      { ...receipt, releaseId: ReleaseIdSchema.make("release-other") },
      { ...receipt, cursor: "another-page" },
      { ...receipt, deletedArtifacts: 101 },
      { ...receipt, deletedItems: 101 },
    ];
    const errors = await Effect.runPromise(
      Effect.forEach(invalid, (candidate) =>
        runCleanup({ cursor: null, limit: 100, releaseId }, candidate).pipe(
          Effect.flip
        )
      )
    );
    expect(errors).toEqual(
      invalid.map(
        () => new ReleaseCleanupContractError({ contract: "receipt" })
      )
    );
  });
});

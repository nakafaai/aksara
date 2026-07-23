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
  ReleaseCleanupDeferredError,
  ReleaseCleanupIncompleteError,
} from "#publisher/cleanup";
import { PublicationTarget } from "#publisher/publication/spec";
import { makePublicationTarget } from "#test/target";

const releaseId = ReleaseIdSchema.make("release-cleanup");
const progress: ReleaseCleanupReceipt = {
  complete: false,
  deletedArtifacts: 0,
  releaseId,
};
const complete: ReleaseCleanupReceipt = {
  complete: true,
  deletedArtifacts: 1,
  releaseId,
};

/** Builds a publication target whose only exercised capability is cleanup. */
function makeTarget(
  cleanup: (
    request: ReleaseCleanupRequest
  ) => Effect.Effect<ReleaseCleanupReceipt>
) {
  return makePublicationTarget({ cleanup });
}

/** Returns cumulative receipts in order and defects if the caller overreads. */
function receiptSequence(receipts: readonly ReleaseCleanupReceipt[]) {
  let index = 0;
  return vi.fn(() => {
    const receipt = receipts[index];
    index += 1;
    return receipt
      ? Effect.succeed(receipt)
      : Effect.die("Cleanup requested an unexpected extra receipt.");
  });
}

/** Executes cleanup with one isolated target implementation. */
function runCleanup(
  input: unknown,
  cleanup: ReturnType<typeof receiptSequence>
) {
  return cleanupContentRelease(input).pipe(
    Effect.provideService(PublicationTarget, makeTarget(cleanup))
  );
}

describe("cleanupContentRelease", () => {
  it("loops over cumulative progress until cleanup completes", async () => {
    const cleanup = receiptSequence([progress, complete]);
    const result = await Effect.runPromise(runCleanup({ releaseId }, cleanup));

    expect(result).toEqual(complete);
    expect(cleanup).toHaveBeenCalledTimes(2);
    expect(cleanup).toHaveBeenCalledWith({ releaseId });
  });

  it("returns resumable evidence after one bounded call budget", async () => {
    const cleanup = receiptSequence(
      Array.from({ length: 100 }, () => progress)
    );
    const error = await Effect.runPromise(
      runCleanup({ releaseId }, cleanup).pipe(Effect.flip)
    );

    expect(error).toEqual(
      new ReleaseCleanupIncompleteError({
        attempts: 100,
        deletedArtifacts: 0,
        releaseId,
      })
    );
    expect(cleanup).toHaveBeenCalledTimes(100);
  });

  it("returns a typed defer without waiting or requesting another page", async () => {
    const retryAt = 1_800_000_000_000;
    const cleanup = receiptSequence([{ ...progress, retryAt }]);
    const error = await Effect.runPromise(
      runCleanup({ releaseId }, cleanup).pipe(Effect.flip)
    );

    expect(error).toEqual(
      new ReleaseCleanupDeferredError({ releaseId, retryAt })
    );
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("rejects malformed input before target cleanup", async () => {
    const cleanup = receiptSequence([complete]);
    const error = await Effect.runPromise(
      runCleanup({ cursor: null, releaseId }, cleanup).pipe(Effect.flip)
    );

    expect(error).toEqual(
      new ReleaseCleanupContractError({ contract: "request" })
    );
    expect(cleanup).not.toHaveBeenCalled();
  });

  it("rejects foreign identities and decreasing cumulative counts", async () => {
    const cases = [
      receiptSequence([
        { ...complete, releaseId: ReleaseIdSchema.make("release-other") },
      ]),
      receiptSequence([
        { ...progress, deletedArtifacts: 2 },
        { ...complete, deletedArtifacts: 1 },
      ]),
    ];
    const errors = await Effect.runPromise(
      Effect.forEach(cases, (cleanup) =>
        runCleanup({ releaseId }, cleanup).pipe(Effect.flip)
      )
    );

    expect(errors).toEqual(
      cases.map(() => new ReleaseCleanupContractError({ contract: "receipt" }))
    );
  });
});

import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import type {
  ReleaseAbortReceipt,
  ReleaseAbortRequest,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  abortContentRelease,
  ReleaseAbortContractError,
  ReleaseAbortIncompleteError,
} from "#publisher/abort";
import { PublicationTarget } from "#publisher/publication/spec";

const releaseId = ReleaseIdSchema.make("release-abort");
const progress: ReleaseAbortReceipt = {
  complete: false,
  processedItems: 2,
  releaseId,
  totalItems: 3,
};
const complete: ReleaseAbortReceipt = {
  complete: true,
  processedItems: 3,
  releaseId,
  totalItems: 3,
};

/** Builds a target whose only exercised capability advances abort state. */
function makeTarget(
  abort: (request: ReleaseAbortRequest) => Effect.Effect<ReleaseAbortReceipt>
) {
  /** Makes every target operation outside abort fail immediately. */
  const unused = () => Effect.die("Unused publication target operation.");
  return PublicationTarget.of({
    abort,
    activate: unused,
    cleanup: unused,
    current: unused,
    finalize: unused,
    headPage: unused,
    rollbackPage: unused,
    stageArtifactBatch: unused,
    stageItemBatch: unused,
    stageProjectionBatch: unused,
    stageRelease: unused,
    status: unused,
    verify: unused,
  });
}

/** Returns cumulative abort receipts and defects on an unexpected overread. */
function receiptSequence(receipts: readonly ReleaseAbortReceipt[]) {
  let index = 0;
  return vi.fn(() => {
    const receipt = receipts[index];
    index += 1;
    return receipt
      ? Effect.succeed(receipt)
      : Effect.die("Abort requested an unexpected extra receipt.");
  });
}

/** Executes abort with one isolated target implementation. */
function runAbort(input: unknown, abort: ReturnType<typeof receiptSequence>) {
  return abortContentRelease(input).pipe(
    Effect.provideService(PublicationTarget, makeTarget(abort))
  );
}

describe("abortContentRelease", () => {
  it("advances cumulative server progress until completion", async () => {
    const abort = receiptSequence([progress, complete]);
    await expect(
      Effect.runPromise(runAbort({ releaseId }, abort))
    ).resolves.toEqual(complete);
    expect(abort).toHaveBeenCalledTimes(2);
    expect(abort).toHaveBeenCalledWith({ releaseId });
  });

  it("returns resumable evidence after one bounded call budget", async () => {
    const abort = receiptSequence(Array.from({ length: 100 }, () => progress));
    const error = await Effect.runPromise(
      runAbort({ releaseId }, abort).pipe(Effect.flip)
    );
    expect(error).toEqual(
      new ReleaseAbortIncompleteError({
        attempts: 100,
        processedItems: 2,
        releaseId,
        totalItems: 3,
      })
    );
  });

  it("rejects malformed input before target abort", async () => {
    const abort = receiptSequence([complete]);
    const error = await Effect.runPromise(
      runAbort({ afterIndex: -1, releaseId }, abort).pipe(Effect.flip)
    );
    expect(error).toEqual(
      new ReleaseAbortContractError({ contract: "request" })
    );
    expect(abort).not.toHaveBeenCalled();
  });

  it("rejects foreign identity, changed totals, and decreasing progress", async () => {
    const cases = [
      receiptSequence([
        { ...complete, releaseId: ReleaseIdSchema.make("release-other") },
      ]),
      receiptSequence([progress, { ...progress, totalItems: 4 }]),
      receiptSequence([progress, { ...progress, processedItems: 1 }]),
    ];
    const errors = await Effect.runPromise(
      Effect.forEach(cases, (abort) =>
        runAbort({ releaseId }, abort).pipe(Effect.flip)
      )
    );
    expect(errors).toEqual(
      cases.map(() => new ReleaseAbortContractError({ contract: "receipt" }))
    );
  });
});

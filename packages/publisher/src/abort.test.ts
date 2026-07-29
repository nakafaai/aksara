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
} from "#publisher/abort";
import { PublicationTarget } from "#publisher/publication/spec";
import { makePublicationTarget } from "#test/target";

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
  return makePublicationTarget({ abort });
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

  it("completes a retained inverse beyond one hundred pages", async () => {
    const retainedRows = 2292;
    const pageSize = 8;
    const pageCount = Math.ceil(retainedRows / pageSize);
    const abort = receiptSequence(
      Array.from({ length: pageCount }, (_, index) => {
        const processedItems = Math.min((index + 1) * pageSize, retainedRows);
        return {
          ...progress,
          complete: processedItems === retainedRows,
          processedItems,
          totalItems: retainedRows,
        };
      })
    );
    await expect(
      Effect.runPromise(runAbort({ releaseId }, abort))
    ).resolves.toEqual({
      ...complete,
      processedItems: retainedRows,
      totalItems: retainedRows,
    });
    expect(abort).toHaveBeenCalledTimes(pageCount);
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

  it("rejects foreign, stalled, decreasing, and changed-total evidence", async () => {
    const cases = [
      receiptSequence([
        { ...complete, releaseId: ReleaseIdSchema.make("release-other") },
      ]),
      receiptSequence([progress, progress]),
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

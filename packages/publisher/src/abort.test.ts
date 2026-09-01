import { describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import type {
  ReleaseAbortReceipt,
  ReleaseAbortRequest,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect } from "effect";
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
  return vi.fn(() =>
    Effect.suspend(() => {
      const receipt = receipts[index];
      index += 1;
      return receipt
        ? Effect.succeed(receipt)
        : Effect.die("Abort requested an unexpected extra receipt.");
    })
  );
}

/** Executes abort with one isolated target implementation. */
const runAbort = Effect.fn("AbortContentReleaseTest.run")(
  (input: unknown, abort: ReturnType<typeof receiptSequence>) =>
    abortContentRelease(input).pipe(
      Effect.provideService(PublicationTarget, makeTarget(abort))
    )
);

describe("abortContentRelease", () => {
  it.effect("advances cumulative server progress until completion", () =>
    Effect.gen(function* () {
      const abort = receiptSequence([progress, complete]);
      const result = yield* runAbort({ releaseId }, abort);

      expect(result).toEqual(complete);
      expect(abort).toHaveBeenCalledTimes(2);
      expect(abort).toHaveBeenCalledWith({ releaseId });
    })
  );

  it.effect("completes a synthetic inverse beyond the former call limit", () =>
    Effect.gen(function* () {
      const testPageCount = 101;
      const testPageSize = 8;
      const testTotalItems = testPageCount * testPageSize;
      const abort = receiptSequence(
        Array.from({ length: testPageCount }, (_, index) => {
          const processedItems = (index + 1) * testPageSize;
          return {
            ...progress,
            complete: processedItems === testTotalItems,
            processedItems,
            totalItems: testTotalItems,
          };
        })
      );
      const result = yield* runAbort({ releaseId }, abort);

      expect(result).toEqual({
        ...complete,
        processedItems: testTotalItems,
        totalItems: testTotalItems,
      });
      expect(abort).toHaveBeenCalledTimes(testPageCount);
    })
  );

  it.effect("rejects malformed input before target abort", () =>
    Effect.gen(function* () {
      const abort = receiptSequence([complete]);
      const error = yield* runAbort({ afterIndex: -1, releaseId }, abort).pipe(
        Effect.flip
      );
      expect(error).toEqual(
        new ReleaseAbortContractError({ contract: "request" })
      );
      expect(abort).not.toHaveBeenCalled();
    })
  );

  it.effect(
    "rejects foreign, stalled, decreasing, and changed-total evidence",
    () =>
      Effect.gen(function* () {
        const cases = [
          receiptSequence([
            { ...complete, releaseId: ReleaseIdSchema.make("release-other") },
          ]),
          receiptSequence([progress, progress]),
          receiptSequence([progress, { ...progress, totalItems: 4 }]),
          receiptSequence([progress, { ...progress, processedItems: 1 }]),
        ];
        const errors = yield* Effect.forEach(cases, (abort) =>
          runAbort({ releaseId }, abort).pipe(Effect.flip)
        );
        expect(errors).toEqual(
          cases.map(
            () => new ReleaseAbortContractError({ contract: "receipt" })
          )
        );
      })
  );
});

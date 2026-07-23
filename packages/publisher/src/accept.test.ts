import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  acceptContentRelease,
  ReleaseAcceptContractError,
  ReleaseAcceptIncompleteError,
} from "#publisher/accept";
import { PublicationTarget } from "#publisher/publication/spec";
import { makePublicationTarget } from "#test/target";

const input = {
  recoveryId: ReleaseIdSchema.make("test-accept-recovery"),
  releaseId: ReleaseIdSchema.make("test-accept-active"),
};
const receipt = {
  complete: true,
  processedItems: 2,
  releaseId: input.recoveryId,
  totalItems: 2,
};

/** Returns cumulative acceptance receipts and defects on an extra request. */
function receiptSequence(receipts: readonly (typeof receipt)[]) {
  let index = 0;
  return vi.fn(() => {
    const value = receipts[index];
    index += 1;
    return value
      ? Effect.succeed(value)
      : Effect.die("Acceptance requested an unexpected extra receipt.");
  });
}

/** Executes acceptance with one isolated target implementation. */
function runAccept(
  inputValue: unknown,
  accept: ReturnType<typeof receiptSequence>
) {
  return acceptContentRelease(inputValue).pipe(
    Effect.provideService(PublicationTarget, makePublicationTarget({ accept }))
  );
}

describe("acceptContentRelease", () => {
  it("advances every retained-recovery page before reporting success", async () => {
    const progress = { ...receipt, complete: false, processedItems: 1 };
    const accept = receiptSequence([progress, receipt]);
    await expect(Effect.runPromise(runAccept(input, accept))).resolves.toEqual(
      receipt
    );
    expect(accept).toHaveBeenCalledTimes(2);
    expect(accept).toHaveBeenCalledWith(input);
  });

  it("returns typed resumable evidence after the bounded call budget", async () => {
    const receipts = Array.from({ length: 100 }, (_, index) => ({
      ...receipt,
      complete: false,
      processedItems: index + 1,
      totalItems: 101,
    }));
    const error = await Effect.runPromise(
      runAccept(input, receiptSequence(receipts)).pipe(Effect.flip)
    );
    expect(error).toEqual(
      new ReleaseAcceptIncompleteError({
        attempts: 100,
        processedItems: 100,
        releaseId: input.recoveryId,
        totalItems: 101,
      })
    );
  });

  it("rejects malformed input before target acceptance", async () => {
    const accept = receiptSequence([receipt]);
    const error = await Effect.runPromise(
      runAccept({ ...input, releaseId: input.recoveryId }, accept).pipe(
        Effect.flip
      )
    );
    expect(error).toEqual(
      new ReleaseAcceptContractError({ contract: "request" })
    );
    expect(accept).not.toHaveBeenCalled();
  });

  it("rejects foreign, stalled, decreasing, and changed-total evidence", async () => {
    const progress = { ...receipt, complete: false, processedItems: 1 };
    const cases = [
      receiptSequence([
        { ...receipt, releaseId: ReleaseIdSchema.make("test-other") },
      ]),
      receiptSequence([progress, progress]),
      receiptSequence([progress, { ...progress, processedItems: 0 }]),
      receiptSequence([progress, { ...receipt, totalItems: 3 }]),
    ];
    const errors = await Effect.runPromise(
      Effect.forEach(cases, (accept) =>
        runAccept(input, accept).pipe(Effect.flip)
      )
    );
    expect(errors).toEqual(
      cases.map(() => new ReleaseAcceptContractError({ contract: "receipt" }))
    );
  });
});

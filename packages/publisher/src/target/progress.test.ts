import { FinalizeReleaseRequestSchema } from "@nakafa/aksara-contracts/transport/request";
import { FinalizeReleaseSuccessSchema } from "@nakafa/aksara-contracts/transport/response";
import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { hasBoundFinalizeProgress } from "#publisher/target/progress";
import {
  transportRelease,
  transportResponse,
  transportSuccess,
} from "#test/transport";

const request = FinalizeReleaseRequestSchema.make({
  afterIndex: -1,
  operation: "finalize",
  release: transportRelease,
});
const pending = Schema.decodeUnknownSync(FinalizeReleaseSuccessSchema)(
  transportSuccess(request, true)
);
const complete = Schema.decodeUnknownSync(FinalizeReleaseSuccessSchema)(
  transportSuccess(request)
);

/** Decodes structurally valid progress for semantic protocol validation. */
function progress(input: unknown) {
  return Schema.decodeUnknownSync(FinalizeReleaseSuccessSchema)(
    transportResponse(input)
  );
}

describe("finalization progress", () => {
  it("accepts forward progress, retry catch-up, and exact completion", () => {
    expect(hasBoundFinalizeProgress(request, pending)).toBe(true);
    expect(
      hasBoundFinalizeProgress(
        request,
        progress({
          ...pending,
          value: { ...pending.value, processed: 0 },
        })
      )
    ).toBe(true);
    expect(hasBoundFinalizeProgress(request, complete)).toBe(true);
  });

  it("accepts zero-item completion only at the empty final index", () => {
    const emptyRequest = FinalizeReleaseRequestSchema.make({
      ...request,
      release: {
        ...request.release,
        manifest: {
          ...request.release.manifest,
          deleteCount: 0,
          itemCount: 0,
          rollbackCount: 0,
          upsertCount: 0,
        },
      },
    });
    const emptyResponse = progress({
      ...complete,
      value: { ...complete.value, nextIndex: -1, processed: 0 },
    });
    expect(hasBoundFinalizeProgress(emptyRequest, emptyResponse)).toBe(true);
  });

  it("rejects stale, out-of-range, mismatched, and premature evidence", () => {
    const invalid = [
      progress({
        ...pending,
        value: { done: false, nextIndex: -1, processed: 0 },
      }),
      progress({
        ...pending,
        value: { done: false, nextIndex: 2, processed: 3 },
      }),
      progress({
        ...pending,
        value: { done: false, nextIndex: 0, processed: 2 },
      }),
      progress({
        ...complete,
        value: { ...complete.value, nextIndex: 0, processed: 1 },
      }),
    ];
    expect(
      invalid.map((response) => hasBoundFinalizeProgress(request, response))
    ).toEqual([false, false, false, false]);
    expect(
      hasBoundFinalizeProgress({ ...request, afterIndex: 2 }, complete)
    ).toBe(false);
  });
});

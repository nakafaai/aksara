import { describe, expect, it } from "@nakafa/testing/effect";
import { Exit, Schema } from "effect";

import { releaseId, tryoutRuntimeBundle } from "#contracts/test/request";
import {
  StageTryoutRuntimeBundleInputSchema,
  StageTryoutRuntimeBundleReceiptSchema,
  StageTryoutRuntimeBundleRequestSchema,
} from "#contracts/transport/runtime-bundle";

describe("try-out runtime bundle staging contract", () => {
  it("binds direct and wire staging inputs to the source release", () => {
    const input = { bundle: tryoutRuntimeBundle, releaseId };
    expect(
      Schema.decodeSync(StageTryoutRuntimeBundleInputSchema)(input)
    ).toEqual(input);
    expect(
      Schema.decodeSync(StageTryoutRuntimeBundleRequestSchema)({
        ...input,
        operation: "stageTryoutRuntimeBundle",
      })
    ).toMatchObject(input);
    expect(
      Exit.isFailure(
        Schema.decodeExit(StageTryoutRuntimeBundleRequestSchema)({
          ...input,
          operation: "stageTryoutRuntimeBundle",
          releaseId: "different-release",
        })
      )
    ).toBe(true);
  });

  it("accepts exactly one idempotent storage outcome", () => {
    const receipt = {
      bundleHash: tryoutRuntimeBundle.bundleHash,
      created: 1,
      releaseId,
      snapshotId: tryoutRuntimeBundle.payload.snapshot.snapshotId,
      unchanged: 0,
    } as const;
    expect(
      Schema.decodeSync(StageTryoutRuntimeBundleReceiptSchema)(receipt)
    ).toEqual(receipt);
    expect(
      Exit.isFailure(
        Schema.decodeExit(StageTryoutRuntimeBundleReceiptSchema)({
          ...receipt,
          created: 0,
        })
      )
    ).toBe(true);
  });
});

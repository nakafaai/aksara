// @vitest-environment node

import { expect, it } from "@effect/vitest";
import { Schema } from "effect";
import { TryoutRuntimeAdoptionReceiptSchema } from "#contracts/migration/tryout/history/adoption/spec";
import { adoptionSource } from "#contracts/test/migration";

it("requires complete attempt and bundle outcomes", () => {
  const receipt = {
    adopted: 1,
    alreadyAdopted: 0,
    attemptCount: 1,
    bundleCreated: 1,
    bundleHash: `sha256:${"a".repeat(64)}`,
    bundleUnchanged: 0,
    snapshotId: adoptionSource.snapshot.snapshotId,
    sourceReleaseId: adoptionSource.release.manifest.releaseId,
  };

  const isReceipt = Schema.is(TryoutRuntimeAdoptionReceiptSchema);

  expect(isReceipt(receipt)).toBe(true);
  expect(isReceipt({ ...receipt, adopted: 0 })).toBe(false);
  expect(
    isReceipt({
      ...receipt,
      bundleUnchanged: 1,
    })
  ).toBe(false);
});

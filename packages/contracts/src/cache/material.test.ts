import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  MATERIAL_CACHE_TAGS,
  MaterialCacheReceiptSchema,
  MaterialCacheRequestSchema,
} from "#contracts/cache/material";

const decodeRequest = Schema.decodeUnknown(MaterialCacheRequestSchema);
const decodeReceipt = Schema.decodeUnknown(MaterialCacheReceiptSchema);

/** Returns whether one unknown value satisfies an exact cache contract. */
function accepts(
  decode: (input: unknown) => Effect.Effect<unknown, unknown>,
  input: unknown
) {
  return Effect.runPromise(Effect.isSuccess(decode(input)));
}

describe("content cache contracts", () => {
  it("accepts the exact release-bound request and receipt", async () => {
    const request = {
      releaseId: "test-cache-release",
      tags: MATERIAL_CACHE_TAGS,
    };

    await expect(accepts(decodeRequest, request)).resolves.toBe(true);
    await expect(
      accepts(decodeReceipt, { ...request, revalidated: true })
    ).resolves.toBe(true);
  });

  it.each([
    { releaseId: "INVALID", tags: MATERIAL_CACHE_TAGS },
    { releaseId: "test-cache-release", tags: ["content-runtime"] },
    {
      releaseId: "test-cache-release",
      tags: [...MATERIAL_CACHE_TAGS].reverse(),
    },
    {
      releaseId: "test-cache-release",
      tags: [...MATERIAL_CACHE_TAGS, "content-artifact:unknown"],
    },
  ])("rejects a noncanonical request", async (request) => {
    await expect(accepts(decodeRequest, request)).resolves.toBe(false);
  });

  it.each([
    {
      releaseId: "test-cache-release",
      revalidated: false,
      tags: MATERIAL_CACHE_TAGS,
    },
    {
      releaseId: "test-cache-release",
      revalidated: true,
      tags: ["content-family:material", "content-runtime"],
    },
  ])("rejects a noncanonical receipt", async (receipt) => {
    await expect(accepts(decodeReceipt, receipt)).resolves.toBe(false);
  });
});

import { Buffer } from "node:buffer";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Exit, Schema } from "effect";
import {
  decodePublicContentRuntimeRequest,
  decodePublicContentRuntimeResponse,
  MAX_PUBLIC_RUNTIME_REQUEST_BYTES,
  MAX_PUBLIC_RUNTIME_RESPONSE_BYTES,
  PublicContentRuntimeRequestSchema,
  PublicContentRuntimeResponseSchema,
} from "#contracts/runtime/spec";
import { accepts } from "#contracts/test/runtime/fixture";
import {
  articleFound,
  artifact,
  found,
  request,
} from "#contracts/test/runtime/public";

describe("content runtime contract", () => {
  it("decodes the exact bounded route request", async () => {
    expect(MAX_PUBLIC_RUNTIME_REQUEST_BYTES).toBe(4096);
    expect(MAX_PUBLIC_RUNTIME_RESPONSE_BYTES).toBe(1024 * 1024);
    expect(accepts(PublicContentRuntimeRequestSchema, request)).toBe(true);
    await expect(
      Effect.runPromise(decodePublicContentRuntimeRequest(request))
    ).resolves.toEqual(request);

    for (const invalid of [
      { ...request, delivery: "private" },
      { ...request, appLocale: "fr" },
      { ...request, publicPath: "/subjects/test/transport" },
      { ...request, extra: true },
    ]) {
      expect(accepts(PublicContentRuntimeRequestSchema, invalid)).toBe(false);
    }
  });

  it("accepts found, missing, and sanitized failure responses", async () => {
    expect(Buffer.byteLength(JSON.stringify(found), "utf8")).toBeLessThan(
      MAX_PUBLIC_RUNTIME_RESPONSE_BYTES
    );
    for (const response of [
      found,
      articleFound,
      { kind: "missing" },
      { code: "CONTENT_RUNTIME_UNAUTHORIZED", kind: "failure" },
      { code: "CONTENT_RUNTIME_INVALID", kind: "failure" },
      { code: "CONTENT_RUNTIME_INTERNAL", kind: "failure" },
    ]) {
      expect(accepts(PublicContentRuntimeResponseSchema, response)).toBe(true);
    }
    await expect(
      Effect.runPromise(decodePublicContentRuntimeResponse(found))
    ).resolves.toEqual(found);
    await expect(
      Effect.runPromise(decodePublicContentRuntimeResponse(articleFound))
    ).resolves.toEqual(articleFound);
  });

  it("rejects mismatched identities and uncontracted response fields", () => {
    const mismatch = Schema.decodeExit(PublicContentRuntimeResponseSchema)({
      ...found,
      projection: { ...found.projection, contentKey: "test:other" },
    });
    expect(Exit.isFailure(mismatch)).toBe(true);
    if (Exit.isFailure(mismatch)) {
      expect(String(mismatch.cause)).toContain(
        "Expected the runtime artifact and projection to share one identity."
      );
    }
    expect(
      accepts(PublicContentRuntimeResponseSchema, {
        ...found,
        artifact: {
          ...artifact,
          payload: { ...artifact.payload, artifactLocale: "id" },
        },
      })
    ).toBe(false);
    expect(
      accepts(PublicContentRuntimeResponseSchema, {
        kind: "missing",
        reason: "x",
      })
    ).toBe(false);
  });
});

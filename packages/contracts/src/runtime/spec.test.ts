import { Buffer } from "node:buffer";
import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ContentRuntimeRequestSchema,
  ContentRuntimeResponseSchema,
  decodeContentRuntimeRequest,
  decodeContentRuntimeResponse,
  MAX_RUNTIME_REQUEST_BYTES,
  MAX_RUNTIME_RESPONSE_BYTES,
} from "#contracts/runtime/spec";
import { accepts, artifact, found, request } from "#contracts/test/runtime";

describe("content runtime contract", () => {
  it("decodes the exact bounded route request", async () => {
    expect(MAX_RUNTIME_REQUEST_BYTES).toBe(4096);
    expect(MAX_RUNTIME_RESPONSE_BYTES).toBe(1024 * 1024);
    expect(accepts(ContentRuntimeRequestSchema, request)).toBe(true);
    await expect(
      Effect.runPromise(decodeContentRuntimeRequest(request))
    ).resolves.toEqual(request);

    for (const invalid of [
      { ...request, delivery: "private" },
      { ...request, locale: "de" },
      { ...request, publicPath: "/subjects/test/transport" },
      { ...request, extra: true },
    ]) {
      expect(accepts(ContentRuntimeRequestSchema, invalid)).toBe(false);
    }
  });

  it("accepts found, missing, and sanitized failure responses", async () => {
    expect(Buffer.byteLength(JSON.stringify(found), "utf8")).toBeLessThan(
      MAX_RUNTIME_RESPONSE_BYTES
    );
    for (const response of [
      found,
      { kind: "missing" },
      { code: "CONTENT_RUNTIME_UNAUTHORIZED", kind: "failure" },
      { code: "CONTENT_RUNTIME_FORBIDDEN", kind: "failure" },
      { code: "CONTENT_RUNTIME_INVALID", kind: "failure" },
      { code: "CONTENT_RUNTIME_INTERNAL", kind: "failure" },
    ]) {
      expect(accepts(ContentRuntimeResponseSchema, response)).toBe(true);
    }
    await expect(
      Effect.runPromise(decodeContentRuntimeResponse(found))
    ).resolves.toEqual(found);
  });

  it("rejects mismatched identities and uncontracted response fields", () => {
    const mismatch = Schema.decodeUnknownEither(ContentRuntimeResponseSchema)({
      ...found,
      projection: { ...found.projection, contentKey: "test:other" },
    });
    expect(Either.isLeft(mismatch)).toBe(true);
    if (Either.isLeft(mismatch)) {
      expect(String(mismatch.left)).toContain(
        "Expected the runtime artifact and projection to share one identity."
      );
    }
    expect(
      accepts(ContentRuntimeResponseSchema, {
        ...found,
        artifact: {
          ...artifact,
          payload: { ...artifact.payload, locale: "id" },
        },
      })
    ).toBe(false);
    expect(
      accepts(ContentRuntimeResponseSchema, { kind: "missing", reason: "x" })
    ).toBe(false);
  });
});

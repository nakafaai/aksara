import { Buffer } from "node:buffer";
import { it as effectIt } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";
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
  effectIt.effect("decodes the exact bounded route request", () =>
    Effect.gen(function* () {
      expect(MAX_PUBLIC_RUNTIME_REQUEST_BYTES).toBe(4096);
      expect(MAX_PUBLIC_RUNTIME_RESPONSE_BYTES).toBe(1024 * 1024);
      expect(accepts(PublicContentRuntimeRequestSchema, request)).toBe(true);
      expect(yield* decodePublicContentRuntimeRequest(request)).toEqual(
        request
      );

      for (const invalid of [
        { ...request, delivery: "private" },
        { ...request, appLocale: "fr" },
        { ...request, publicPath: "/subjects/test/transport" },
        { ...request, extra: true },
      ]) {
        expect(accepts(PublicContentRuntimeRequestSchema, invalid)).toBe(false);
      }
    })
  );

  effectIt.effect(
    "accepts found, missing, and sanitized failure responses",
    () =>
      Effect.gen(function* () {
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
          expect(accepts(PublicContentRuntimeResponseSchema, response)).toBe(
            true
          );
        }
        expect(yield* decodePublicContentRuntimeResponse(found)).toEqual(found);
        expect(yield* decodePublicContentRuntimeResponse(articleFound)).toEqual(
          articleFound
        );
      })
  );

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

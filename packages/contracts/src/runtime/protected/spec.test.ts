import { Buffer } from "node:buffer";
import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  decodeProtectedContentRuntimeRequest,
  decodeProtectedContentRuntimeResponse,
  MAX_PROTECTED_RUNTIME_REQUEST_BYTES,
  MAX_PROTECTED_RUNTIME_RESPONSE_BYTES,
  MAX_PROTECTED_RUNTIME_SELECTORS,
  ProtectedContentRuntimeRequestSchema,
  ProtectedContentRuntimeResponseSchema,
} from "#contracts/runtime/protected/spec";
import { accepts } from "#contracts/test/runtime/fixture";
import {
  protectedAnswerRequest,
  protectedFound,
  protectedRequest,
  protectedSelector,
} from "#contracts/test/runtime/protected";

describe("protected content runtime contract", () => {
  it("decodes one bounded batch of exact body selectors", async () => {
    expect(MAX_PROTECTED_RUNTIME_SELECTORS).toBe(64);
    expect(MAX_PROTECTED_RUNTIME_REQUEST_BYTES).toBe(64 * 1024);
    expect(MAX_PROTECTED_RUNTIME_RESPONSE_BYTES).toBe(4 * 1024 * 1024);
    expect(
      accepts(ProtectedContentRuntimeRequestSchema, protectedRequest)
    ).toBe(true);
    expect(
      accepts(ProtectedContentRuntimeRequestSchema, protectedAnswerRequest)
    ).toBe(true);
    await expect(
      Effect.runPromise(decodeProtectedContentRuntimeRequest(protectedRequest))
    ).resolves.toEqual(protectedRequest);
  });

  it("rejects mismatched, empty, duplicate, and oversized selectors", () => {
    const mismatchedDelivery = Schema.decodeUnknownEither(
      ProtectedContentRuntimeRequestSchema
    )(
      {
        ...protectedRequest,
        selectors: [{ ...protectedSelector, delivery: "entitled" }],
      },
      { onExcessProperty: "error" }
    );
    expect(Either.isLeft(mismatchedDelivery)).toBe(true);
    if (Either.isLeft(mismatchedDelivery)) {
      expect(String(mismatchedDelivery.left)).toContain(
        "Expected authenticated prompts and entitled answer bodies."
      );
    }

    for (const invalid of [
      { ...protectedRequest, selectors: [] },
      {
        ...protectedRequest,
        selectors: [protectedSelector, protectedSelector],
      },
      {
        ...protectedRequest,
        selectors: Array.from(
          { length: MAX_PROTECTED_RUNTIME_SELECTORS + 1 },
          (_, index) => ({
            ...protectedSelector,
            artifactHash: `sha256:${index.toString(16).padStart(64, "0")}`,
          })
        ),
      },
      { ...protectedRequest, snapshotReleaseId: "" },
      { ...protectedRequest, snapshotId: "snapshot-1" },
      {
        ...protectedRequest,
        selectors: [{ ...protectedSelector, artifactHash: "artifact-1" }],
      },
      {
        ...protectedRequest,
        selectors: [{ ...protectedSelector, contentKey: "question" }],
      },
      {
        ...protectedRequest,
        selectors: [
          {
            ...protectedSelector,
            contentKey: "material/lesson/test/question",
          },
        ],
      },
    ]) {
      expect(accepts(ProtectedContentRuntimeRequestSchema, invalid)).toBe(
        false
      );
    }
  });

  it("accepts exact found, missing, and sanitized failure responses", async () => {
    expect(
      Buffer.byteLength(JSON.stringify(protectedFound), "utf8")
    ).toBeLessThan(MAX_PROTECTED_RUNTIME_RESPONSE_BYTES);
    for (const response of [
      protectedFound,
      { kind: "missing" },
      { code: "CONTENT_RUNTIME_UNAUTHORIZED", kind: "failure" },
      { code: "CONTENT_RUNTIME_INVALID", kind: "failure" },
      { code: "CONTENT_RUNTIME_INTERNAL", kind: "failure" },
    ]) {
      expect(accepts(ProtectedContentRuntimeResponseSchema, response)).toBe(
        true
      );
    }
    await expect(
      Effect.runPromise(decodeProtectedContentRuntimeResponse(protectedFound))
    ).resolves.toEqual(protectedFound);

    const duplicateArtifacts = Schema.decodeUnknownEither(
      ProtectedContentRuntimeResponseSchema
    )({
      ...protectedFound,
      items: [protectedFound.items[0], protectedFound.items[0]],
    });
    expect(Either.isLeft(duplicateArtifacts)).toBe(true);
    if (Either.isLeft(duplicateArtifacts)) {
      expect(String(duplicateArtifacts.left)).toContain(
        "Expected unique protected runtime artifacts."
      );
    }
  });
});

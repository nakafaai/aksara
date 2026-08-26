import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";
import {
  MAX_PROTECTED_RUNTIME_REQUEST_BYTES,
  MAX_PROTECTED_RUNTIME_RESPONSE_BYTES,
  MAX_PROTECTED_RUNTIME_SELECTORS,
  protectedRuntimeResponseBytes,
} from "#contracts/runtime/protected/limits";
import {
  decodeProtectedContentRuntimeRequest,
  decodeProtectedContentRuntimeResponse,
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
  it.effect("decodes one bounded batch of exact body selectors", () =>
    Effect.gen(function* () {
      expect(MAX_PROTECTED_RUNTIME_SELECTORS).toBe(64);
      expect(MAX_PROTECTED_RUNTIME_REQUEST_BYTES).toBe(64 * 1024);
      expect(MAX_PROTECTED_RUNTIME_RESPONSE_BYTES).toBe(4 * 1024 * 1024);
      expect(
        accepts(ProtectedContentRuntimeRequestSchema, protectedRequest)
      ).toBe(true);
      expect(
        accepts(ProtectedContentRuntimeRequestSchema, protectedAnswerRequest)
      ).toBe(true);
      expect(
        yield* decodeProtectedContentRuntimeRequest(protectedRequest)
      ).toEqual(protectedRequest);
    })
  );

  it("rejects mismatched, empty, duplicate, and oversized selectors", () => {
    const mismatchedDelivery = Schema.decodeExit(
      ProtectedContentRuntimeRequestSchema
    )(
      {
        ...protectedRequest,
        selectors: [{ ...protectedSelector, delivery: "entitled" }],
      },
      { onExcessProperty: "error" }
    );
    expect(Exit.isFailure(mismatchedDelivery)).toBe(true);
    if (Exit.isFailure(mismatchedDelivery)) {
      expect(String(mismatchedDelivery.cause)).toContain(
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
      { ...protectedRequest, bundleHash: "" },
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

  it.effect(
    "accepts exact found, missing, and sanitized failure responses",
    () =>
      Effect.gen(function* () {
        expect(protectedRuntimeResponseBytes(protectedFound)).toBeLessThan(
          MAX_PROTECTED_RUNTIME_RESPONSE_BYTES
        );
        for (const response of [
          protectedFound,
          { kind: "missing" },
          { code: "CONTENT_RUNTIME_UNAUTHORIZED", kind: "failure" },
          { code: "CONTENT_RUNTIME_INVALID", kind: "failure" },
          { code: "CONTENT_RUNTIME_INTERNAL", kind: "failure" },
          { code: "CONTENT_RUNTIME_RESPONSE_TOO_LARGE", kind: "failure" },
        ]) {
          expect(accepts(ProtectedContentRuntimeResponseSchema, response)).toBe(
            true
          );
        }
        expect(
          yield* decodeProtectedContentRuntimeResponse(protectedFound)
        ).toEqual(protectedFound);

        const duplicateArtifacts = Schema.decodeExit(
          ProtectedContentRuntimeResponseSchema
        )({
          ...protectedFound,
          items: [protectedFound.items[0], protectedFound.items[0]],
        });
        expect(Exit.isFailure(duplicateArtifacts)).toBe(true);
        if (Exit.isFailure(duplicateArtifacts)) {
          expect(String(duplicateArtifacts.cause)).toContain(
            "Expected unique protected runtime artifacts."
          );
        }
      })
  );

  it("rejects a found response above its exact JSON byte ceiling", () => {
    const oversized = {
      ...protectedFound,
      items: [
        {
          ...protectedFound.items[0],
          artifact: {
            ...protectedFound.items[0].artifact,
            payload: {
              ...protectedFound.items[0].artifact.payload,
              byteLength: MAX_PROTECTED_RUNTIME_RESPONSE_BYTES,
              compiledCode: "x".repeat(MAX_PROTECTED_RUNTIME_RESPONSE_BYTES),
            },
          },
        },
      ],
    };
    expect(protectedRuntimeResponseBytes(oversized)).toBeGreaterThan(
      MAX_PROTECTED_RUNTIME_RESPONSE_BYTES
    );
    expect(accepts(ProtectedContentRuntimeResponseSchema, oversized)).toBe(
      false
    );
  });
});

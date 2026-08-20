import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  StoredAttemptIdSchema,
  StoredProtectedRuntimeFoundSchema,
  StoredProtectedRuntimeRequestSchema,
  StoredProtectedRuntimeResponseSchema,
  StoredProtectedRuntimeSelectorSchema,
} from "#contracts/history/protected";
import {
  historicalFound,
  historicalItem,
  historicalRequest,
  historicalSelector,
} from "#contracts/test/history-runtime";
import { protectedArtifact } from "#contracts/test/runtime/protected";

/** Strictly checks whether one unknown retained wire value is accepted. */
function accepts(schema: Schema.ConstraintDecoder<unknown>, input: unknown) {
  return Exit.isSuccess(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}

/** Returns the owned parse message for one rejected retained wire value. */
function rejection(schema: Schema.ConstraintDecoder<unknown>, input: unknown) {
  const result = Schema.decodeUnknownExit(schema)(input, {
    onExcessProperty: "error",
  });
  return Exit.isFailure(result) ? String(result.cause) : "";
}

describe("retained protected runtime contract", () => {
  it("accepts exact request, found, missing, and failure values", () => {
    expect(
      accepts(StoredProtectedRuntimeRequestSchema, historicalRequest)
    ).toBe(true);
    expect(accepts(StoredProtectedRuntimeFoundSchema, historicalFound)).toBe(
      true
    );
    expect(
      accepts(StoredProtectedRuntimeResponseSchema, {
        appLocale: historicalRequest.appLocale,
        attemptId: historicalRequest.attemptId,
        kind: "missing",
      })
    ).toBe(true);
    expect(
      accepts(StoredProtectedRuntimeResponseSchema, {
        appLocale: historicalRequest.appLocale,
        attemptId: historicalRequest.attemptId,
        code: "CONTENT_RUNTIME_INTERNAL",
        kind: "failure",
      })
    ).toBe(true);
  });

  it("requires one bounded opaque attempt identity", () => {
    expect(accepts(StoredAttemptIdSchema, "retained-attempt")).toBe(true);
    expect(accepts(StoredAttemptIdSchema, "  retained-attempt  ")).toBe(false);
    expect(accepts(StoredAttemptIdSchema, "x".repeat(257))).toBe(false);
  });

  it.each([
    {
      ...historicalSelector,
      contentKey: "question",
    },
    {
      ...historicalSelector,
      contentKey:
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-01/question",
    },
    {
      ...historicalSelector,
      contentKey:
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/answer",
    },
    {
      ...historicalSelector,
      contentKey: "material/invalid/question",
    },
  ])("rejects a selector outside the exact old body grammar", (selector) => {
    expect(accepts(StoredProtectedRuntimeSelectorSchema, selector)).toBe(false);
    expect(rejection(StoredProtectedRuntimeSelectorSchema, selector)).toContain(
      "exact retained question or answer body"
    );
  });

  it("accepts the exact old entitled answer selector", () => {
    expect(
      accepts(StoredProtectedRuntimeSelectorSchema, {
        ...historicalSelector,
        contentKey: `${historicalSelector.contentKey.slice(0, -"question".length)}answer`,
        delivery: "entitled",
      })
    ).toBe(true);
  });

  it("rejects duplicate selectors and response artifacts", () => {
    const request = {
      ...historicalRequest,
      selectors: [historicalSelector, historicalSelector],
    };
    const response = {
      ...historicalFound,
      items: [historicalItem, historicalItem],
    };

    expect(accepts(StoredProtectedRuntimeRequestSchema, request)).toBe(false);
    expect(accepts(StoredProtectedRuntimeFoundSchema, response)).toBe(false);
    expect(rejection(StoredProtectedRuntimeRequestSchema, request)).toContain(
      "unique retained artifact selectors"
    );
    expect(rejection(StoredProtectedRuntimeFoundSchema, response)).toContain(
      "unique retained response artifacts"
    );
  });

  it("rejects current artifacts and oversized historical responses", () => {
    expect(
      accepts(StoredProtectedRuntimeFoundSchema, {
        ...historicalFound,
        items: [{ ...historicalItem, artifact: protectedArtifact }],
      })
    ).toBe(false);
    const oversized = {
      ...historicalFound,
      items: [
        {
          ...historicalItem,
          artifact: {
            ...historicalItem.artifact,
            payload: {
              ...historicalItem.artifact.payload,
              compiledCode: "x".repeat(4 * 1024 * 1024),
            },
          },
        },
      ],
    };

    expect(accepts(StoredProtectedRuntimeFoundSchema, oversized)).toBe(false);
    expect(rejection(StoredProtectedRuntimeFoundSchema, oversized)).toContain(
      "below the wire ceiling"
    );
  });

  it("rejects excess request and response properties", () => {
    expect(
      accepts(StoredProtectedRuntimeRequestSchema, {
        ...historicalRequest,
        unexpected: true,
      })
    ).toBe(false);
    expect(
      accepts(StoredProtectedRuntimeResponseSchema, {
        appLocale: historicalRequest.appLocale,
        attemptId: historicalRequest.attemptId,
        kind: "missing",
        unexpected: true,
      })
    ).toBe(false);
  });
});

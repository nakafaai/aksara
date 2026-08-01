import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { releaseId, requests } from "#contracts/test/request";
import {
  StageGroupInputSchema,
  StageGroupRequestSchema,
  StageGroupSuccessSchema,
} from "#contracts/transport/group";
import { MAX_STAGE_GROUP_COUNT } from "#contracts/transport/limits";

const itemRequest = requests.find(
  (request) => request.operation === "stageItemBatch"
);
const projectionRequest = requests.find(
  (request) => request.operation === "stageProjectionBatch"
);

describe("StageGroupRequestSchema", () => {
  it("accepts bounded transactions owned by one release", () => {
    expect(itemRequest?.operation).toBe("stageItemBatch");
    if (itemRequest?.operation !== "stageItemBatch") {
      return;
    }
    const decoded = Schema.decodeUnknownEither(StageGroupRequestSchema)({
      operation: "stageGroup",
      releaseId,
      requests: [itemRequest],
    });

    expect(Either.isRight(decoded)).toBe(true);
  });

  it("rejects mixed release ownership and excessive request counts", () => {
    expect(itemRequest?.operation).toBe("stageItemBatch");
    expect(projectionRequest?.operation).toBe("stageProjectionBatch");
    if (
      itemRequest?.operation !== "stageItemBatch" ||
      projectionRequest?.operation !== "stageProjectionBatch"
    ) {
      return;
    }
    const foreign = {
      ...projectionRequest,
      releaseId: "foreign-release",
    };
    const mixed = Schema.decodeUnknownEither(StageGroupRequestSchema)({
      operation: "stageGroup",
      releaseId,
      requests: [foreign],
    });
    const mixedInput = Schema.decodeUnknownEither(StageGroupInputSchema)({
      releaseId,
      requests: [foreign],
    });
    const oversized = Schema.decodeUnknownEither(StageGroupRequestSchema)({
      operation: "stageGroup",
      releaseId,
      requests: Array.from(
        { length: MAX_STAGE_GROUP_COUNT + 1 },
        () => itemRequest
      ),
    });

    expect(Either.isLeft(mixed)).toBe(true);
    expect(Either.isLeft(mixedInput)).toBe(true);
    if (Either.isLeft(mixed)) {
      expect(String(mixed.left)).toContain(
        "Expected every staged request to share one release identity."
      );
    }
    if (Either.isLeft(mixedInput)) {
      expect(String(mixedInput.left)).toContain(
        "Expected every staged request to share one release identity."
      );
    }
    expect(Either.isLeft(oversized)).toBe(true);
  });
});

describe("StageGroupSuccessSchema", () => {
  it("requires positive completion evidence", () => {
    const valid = Schema.decodeUnknownEither(StageGroupSuccessSchema)({
      ok: true,
      operation: "stageGroup",
      value: { releaseId, requestCount: 1 },
    });
    const empty = Schema.decodeUnknownEither(StageGroupSuccessSchema)({
      ok: true,
      operation: "stageGroup",
      value: { releaseId, requestCount: 0 },
    });
    const oversized = Schema.decodeUnknownEither(StageGroupSuccessSchema)({
      ok: true,
      operation: "stageGroup",
      value: { releaseId, requestCount: MAX_STAGE_GROUP_COUNT + 1 },
    });

    expect(Either.isRight(valid)).toBe(true);
    expect(Either.isLeft(empty)).toBe(true);
    expect(Either.isLeft(oversized)).toBe(true);
  });
});

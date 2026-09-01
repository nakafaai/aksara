import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
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
    const decoded = Schema.decodeUnknownExit(StageGroupRequestSchema)({
      operation: "stageGroup",
      releaseId,
      requests: [itemRequest],
    });

    expect(Exit.isSuccess(decoded)).toBe(true);
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
    const mixed = Schema.decodeUnknownExit(StageGroupRequestSchema)({
      operation: "stageGroup",
      releaseId,
      requests: [foreign],
    });
    const mixedInput = Schema.decodeUnknownExit(StageGroupInputSchema)({
      releaseId,
      requests: [foreign],
    });
    const oversized = Schema.decodeUnknownExit(StageGroupRequestSchema)({
      operation: "stageGroup",
      releaseId,
      requests: Array.from(
        { length: MAX_STAGE_GROUP_COUNT + 1 },
        () => itemRequest
      ),
    });

    expect(Exit.isFailure(mixed)).toBe(true);
    expect(Exit.isFailure(mixedInput)).toBe(true);
    if (Exit.isFailure(mixed)) {
      expect(String(mixed.cause)).toContain(
        "Expected every staged request to share one release identity."
      );
    }
    if (Exit.isFailure(mixedInput)) {
      expect(String(mixedInput.cause)).toContain(
        "Expected every staged request to share one release identity."
      );
    }
    expect(Exit.isFailure(oversized)).toBe(true);
  });
});

describe("StageGroupSuccessSchema", () => {
  it("requires positive completion evidence", () => {
    const valid = Schema.decodeExit(StageGroupSuccessSchema)({
      ok: true,
      operation: "stageGroup",
      value: { releaseId, requestCount: 1 },
    });
    const empty = Schema.decodeExit(StageGroupSuccessSchema)({
      ok: true,
      operation: "stageGroup",
      value: { releaseId, requestCount: 0 },
    });
    const oversized = Schema.decodeExit(StageGroupSuccessSchema)({
      ok: true,
      operation: "stageGroup",
      value: { releaseId, requestCount: MAX_STAGE_GROUP_COUNT + 1 },
    });

    expect(Exit.isSuccess(valid)).toBe(true);
    expect(Exit.isFailure(empty)).toBe(true);
    expect(Exit.isFailure(oversized)).toBe(true);
  });
});

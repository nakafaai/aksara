import { Buffer } from "node:buffer";
import { describe, expect, it } from "@effect/vitest";
import { StageOperationSchema } from "@nakafa/aksara-contracts/transport/group";
import {
  MAX_STAGE_GROUP_BYTES,
  MAX_STAGE_GROUP_COUNT,
} from "@nakafa/aksara-contracts/transport/limits";
import { Effect, Schema, Stream } from "effect";
import { makeStageGroups } from "#publisher/stage/group";
import { transportRequests } from "#test/transport/spec";

describe("makeStageGroups", () => {
  it.effect(
    "preserves order while reducing safe requests into bounded groups",
    () =>
      Effect.gen(function* () {
        const template = yield* Effect.fromNullishOr(
          transportRequests.find(
            (request) => request.operation === "stageItemBatch"
          )
        );
        const requests = Array.from(
          { length: MAX_STAGE_GROUP_COUNT + 1 },
          (_, batchIndex) => ({ ...template, batchIndex })
        );

        const groups = yield* makeStageGroups(
          template.releaseId,
          Stream.fromIterable(requests)
        ).pipe(
          Stream.runCollect,
          Effect.map((chunk) => [...chunk])
        );

        expect(groups).toHaveLength(2);
        expect(groups.flatMap((group) => group.requests)).toEqual(requests);
        expect(
          groups.every(
            (group) =>
              group.requests.length <= MAX_STAGE_GROUP_COUNT &&
              Buffer.byteLength(
                JSON.stringify({ ...group, operation: "stageGroup" }),
                "utf8"
              ) <= MAX_STAGE_GROUP_BYTES
          )
        ).toBe(true);
      })
  );

  it.effect(
    "starts a new group before the complete body exceeds its byte ceiling",
    () =>
      Effect.gen(function* () {
        const template = yield* Effect.fromNullishOr(
          transportRequests.find(
            (request) => request.operation === "stageProjectionBatch"
          )
        );
        const projection = yield* Effect.fromNullishOr(template.projections[0]);
        const title = "x".repeat(Math.floor(MAX_STAGE_GROUP_BYTES / 2));
        const requests = yield* Schema.decodeUnknownEffect(
          Schema.NonEmptyArray(StageOperationSchema)
        )(
          [0, 1].map((batchIndex) => ({
            ...template,
            batchIndex,
            projections: [
              {
                ...projection,
                metadata: { ...projection.metadata, title },
              },
            ],
          }))
        );

        const groups = yield* makeStageGroups(
          template.releaseId,
          Stream.fromIterable(requests)
        ).pipe(
          Stream.runCollect,
          Effect.map((chunk) => [...chunk])
        );

        expect(groups).toHaveLength(2);
        expect(groups.flatMap((group) => group.requests)).toEqual(requests);
      })
  );
});

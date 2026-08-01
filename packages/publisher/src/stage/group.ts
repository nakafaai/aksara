import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import type {
  StageGroupInput,
  StageOperation,
} from "@nakafa/aksara-contracts/transport/group";
import {
  MAX_STAGE_GROUP_BYTES,
  MAX_STAGE_GROUP_COUNT,
} from "@nakafa/aksara-contracts/transport/limits";
import type { Stream } from "effect";
import { streamBatches } from "#publisher/batch/core";

/** Serializes the exact grouped request body used by the HTTP target. */
export function canonicalizeStageGroup(group: StageGroupInput) {
  return JSON.stringify({ ...group, operation: "stageGroup" });
}

/** Packs existing transaction-safe batches into bounded HTTP exchanges. */
export function makeStageGroups<E, R>(
  releaseId: ReleaseId,
  requests: Stream.Stream<StageOperation, E, R>
) {
  return streamBatches({
    build: (values, _groupIndex, groupReleaseId) => ({
      releaseId: groupReleaseId,
      requests: values,
    }),
    count: (group) => group.requests.length,
    kind: "stage-group",
    maxBytes: MAX_STAGE_GROUP_BYTES,
    maxCount: MAX_STAGE_GROUP_COUNT,
    releaseId,
    serialize: canonicalizeStageGroup,
    values: requests,
  });
}

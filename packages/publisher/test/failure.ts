import { transportRequests } from "#test/transport";

/** Builds authenticated target failures from exact decoded request fixtures. */
export function publicationFailures() {
  const current = transportRequests.find(
    (request) => request.operation === "current"
  );
  const head = transportRequests.find(
    (request) => request.operation === "headPage"
  );
  const release = transportRequests.find(
    (request) => request.operation === "stageRelease"
  );
  const item = transportRequests.find(
    (request) => request.operation === "stageItemBatch"
  );
  const projection = transportRequests.find(
    (request) => request.operation === "stageProjectionBatch"
  );
  const artifact = transportRequests.find(
    (request) => request.operation === "stageArtifactBatch"
  );
  const snapshot = transportRequests.find(
    (request) => request.operation === "stageSnapshot"
  );
  const snapshotBatch = transportRequests.find(
    (request) => request.operation === "stageSnapshotBatch"
  );
  const activate = transportRequests.find(
    (request) => request.operation === "activate"
  );
  const statusRequest = transportRequests.find(
    (request) => request.operation === "status"
  );
  const verify = transportRequests.find(
    (request) => request.operation === "verify"
  );
  const rollback = transportRequests.find(
    (request) => request.operation === "rollbackPage"
  );
  const cleanup = transportRequests.find(
    (request) => request.operation === "cleanup"
  );
  if (
    current?.operation !== "current" ||
    head?.operation !== "headPage" ||
    release?.operation !== "stageRelease" ||
    item?.operation !== "stageItemBatch" ||
    projection?.operation !== "stageProjectionBatch" ||
    artifact?.operation !== "stageArtifactBatch" ||
    snapshot?.operation !== "stageSnapshot" ||
    snapshotBatch?.operation !== "stageSnapshotBatch" ||
    activate?.operation !== "activate" ||
    statusRequest?.operation !== "status" ||
    verify?.operation !== "verify" ||
    rollback?.operation !== "rollbackPage" ||
    cleanup?.operation !== "cleanup"
  ) {
    throw new Error("Expected every publication request fixture.");
  }
  return [
    {
      request: current,
      statuses: [422],
      tag: "PublicationTargetRejectedError",
      wire: {
        code: "CONTENT_RELEASE_STATE",
        kind: "rejected",
        operation: "current",
        releaseId: null,
      },
    },
    {
      request: current,
      statuses: [400],
      tag: "PublicationTargetRejectedError",
      wire: {
        code: "CONTENT_RELEASE_INVALID_REQUEST",
        kind: "rejected",
        operation: null,
        releaseId: null,
      },
    },
    ...(
      [
        { code: "CONTENT_RELEASE_SIZE", status: 413 },
        { code: "CONTENT_RELEASE_UNSUPPORTED", status: 415 },
      ] as const
    ).map(({ code, status }) => ({
      request: release,
      statuses: [status],
      tag: "PublicationTargetRejectedError",
      wire: {
        code,
        kind: "rejected",
        operation: null,
        releaseId: null,
      },
    })),
    {
      request: head,
      statuses: [422],
      tag: "PublicationTargetRejectedError",
      wire: {
        code: "CONTENT_RELEASE_STATE",
        kind: "rejected",
        operation: "headPage",
        releaseId: head.activeReleaseId,
      },
    },
    {
      request: release,
      statuses: [401],
      tag: "PublicationTargetUnauthorizedError",
      wire: { code: "CONTENT_RELEASE_UNAUTHORIZED", kind: "unauthorized" },
    },
    {
      request: activate,
      statuses: [422],
      tag: "PublicationTargetRejectedError",
      wire: {
        code: "CONTENT_RELEASE_STATE",
        kind: "rejected",
        operation: "activate",
        releaseId: activate.release.manifest.releaseId,
      },
    },
    ...[
      { releaseId: release.release.manifest.releaseId, request: release },
      { releaseId: statusRequest.releaseId, request: statusRequest },
      { releaseId: verify.release.manifest.releaseId, request: verify },
      { releaseId: activate.release.manifest.releaseId, request: activate },
      { releaseId: rollback.rollbackOf, request: rollback },
      { releaseId: cleanup.releaseId, request: cleanup },
    ].map(({ releaseId: conflictReleaseId, request }) => ({
      request,
      statuses: [409],
      tag: "PublicationTargetConflictError",
      wire: {
        code: "CONTENT_RELEASE_CONFLICT",
        kind: "conflict",
        operation: request.operation,
        releaseId: conflictReleaseId,
      },
    })),
    {
      request: snapshot,
      statuses: [409],
      tag: "PublicationTargetConflictError",
      wire: {
        code: "CONTENT_RELEASE_CONFLICT",
        family: snapshot.snapshot.family,
        kind: "conflict",
        operation: snapshot.operation,
        releaseId: snapshot.releaseId,
        snapshotId: snapshot.snapshot.manifest.snapshotId,
      },
    },
    ...[item, projection, artifact].map((request) => ({
      request,
      statuses: [409],
      tag: "PublicationTargetConflictError",
      wire: {
        batchIndex: request.batchIndex,
        code: "CONTENT_RELEASE_CONFLICT",
        kind: "conflict",
        operation: request.operation,
        releaseId: request.releaseId,
      },
    })),
    {
      request: snapshotBatch,
      statuses: [409],
      tag: "PublicationTargetConflictError",
      wire: {
        batchIndex: snapshotBatch.batchIndex,
        code: "CONTENT_RELEASE_CONFLICT",
        family: snapshotBatch.family,
        kind: "conflict",
        operation: snapshotBatch.operation,
        releaseId: snapshotBatch.releaseId,
        snapshotId: snapshotBatch.snapshotId,
      },
    },
    {
      request: activate,
      statuses: [409],
      tag: "PublicationStaleBaseError",
      wire: {
        activeReleaseId: "test-foreign-release",
        code: "CONTENT_RELEASE_STALE_BASE",
        expectedBaseReleaseId: activate.release.manifest.baseReleaseId,
        kind: "stale-base",
        operation: "activate",
        releaseId: activate.release.manifest.releaseId,
      },
    },
  ];
}

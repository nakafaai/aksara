import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  interpretPublicationResponse,
  publicationReleaseId,
  targetStage,
} from "#publisher/target/protocol";
import { foreignTransportSuccess } from "#test/foreign";
import {
  transportRelease,
  transportRequests,
  transportResponse,
  transportSuccess,
} from "#test/transport";

/** Interprets one status and body pair through the typed wire protocol. */
function interpret(
  request: PublicationRequest,
  body: ReturnType<typeof transportResponse>,
  status: number
) {
  return interpretPublicationResponse(request, { body, status });
}

/** Runs one expected failure and returns its typed error tag. */
function failureTag(
  request: PublicationRequest,
  body: ReturnType<typeof transportResponse>,
  status: number
) {
  return interpret(request, body, status).pipe(
    Effect.flip,
    Effect.map((error) => error._tag)
  );
}

describe("publication target protocol", () => {
  it("binds every successful operation to its exact request", async () => {
    const successes = await Effect.runPromise(
      Effect.forEach(transportRequests, (request) => {
        const body = transportSuccess(request);
        return interpret(request, body, 200).pipe(
          Effect.map((result) => ({ body, request, result }))
        );
      })
    );
    for (const { body, request, result } of successes) {
      expect(result).toEqual(body);
      expect(publicationReleaseId(request)).toBe(
        transportRelease.manifest.releaseId
      );
    }
    expect(
      transportRequests.map(({ operation }) => targetStage(operation))
    ).toEqual([
      "release",
      "items",
      "projections",
      "artifacts",
      "status",
      "verify",
      "activate",
      "finalize",
      "rollback",
      "cleanup",
    ]);
  });

  it("rejects success evidence for another request identity", async () => {
    const tags = await Effect.runPromise(
      Effect.forEach(transportRequests, (request) =>
        failureTag(request, foreignTransportSuccess(request), 200)
      )
    );
    expect(tags).toEqual(
      transportRequests.map(() => "PublicationTargetProtocolError")
    );
  });

  it("rejects operation, batch index, count, and HTTP contradictions", async () => {
    const item = transportRequests.find(
      (request) => request.operation === "stageItemBatch"
    );
    const status = transportRequests.find(
      (request) => request.operation === "status"
    );
    if (
      item?.operation !== "stageItemBatch" ||
      status?.operation !== "status"
    ) {
      return;
    }
    const success = transportSuccess(item);
    const contradictions = [
      { body: transportSuccess(status), status: 200 },
      {
        body: transportResponse({
          ...success,
          value: { ...success.value, batchIndex: 1 },
        }),
        status: 200,
      },
      {
        body: transportResponse({
          ...success,
          value: { ...success.value, created: 0 },
        }),
        status: 200,
      },
      { body: success, status: 201 },
    ];
    const tags = await Effect.runPromise(
      Effect.forEach(contradictions, (result) =>
        failureTag(item, result.body, result.status)
      )
    );
    expect(tags).toEqual(
      contradictions.map(() => "PublicationTargetProtocolError")
    );
  });

  it("maps every authenticated failure without message parsing", async () => {
    const [release, item, projection, artifact, , , activate] =
      transportRequests;
    if (
      release?.operation !== "stageRelease" ||
      item?.operation !== "stageItemBatch" ||
      projection?.operation !== "stageProjectionBatch" ||
      artifact?.operation !== "stageArtifactBatch" ||
      activate?.operation !== "activate"
    ) {
      return;
    }
    const cases = [
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
      {
        request: release,
        statuses: [409],
        tag: "PublicationTargetConflictError",
        wire: {
          code: "CONTENT_RELEASE_CONFLICT",
          kind: "conflict",
          operation: release.operation,
          releaseId: publicationReleaseId(release),
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
          releaseId: publicationReleaseId(request),
        },
      })),
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
    const tags = await Effect.runPromise(
      Effect.forEach(cases, (testCase) =>
        Effect.forEach(testCase.statuses, (statusCode) =>
          failureTag(
            testCase.request,
            transportResponse({ failure: testCase.wire, ok: false }),
            statusCode
          )
        )
      )
    );
    expect(tags.flat()).toEqual(
      cases.flatMap(({ statuses, tag }) => statuses.map(() => tag))
    );
  });

  it("treats transient and contradictory failures as transport errors", async () => {
    const request = transportRequests.find(
      (candidate) => candidate.operation === "stageRelease"
    );
    if (request?.operation !== "stageRelease") {
      return;
    }
    const success = transportSuccess(request);
    const transientTags = await Effect.runPromise(
      Effect.forEach([408, 429, 500, 599], (status) =>
        failureTag(request, success, status)
      )
    );
    expect(transientTags).toEqual(
      [408, 429, 500, 599].map(() => "PublicationTargetTransportError")
    );
    const invalidStatus = await Effect.runPromise(
      failureTag(request, success, 600)
    );
    expect(invalidStatus).toBe("PublicationTargetProtocolError");
    const failures = [
      {
        status: 403,
        wire: { code: "CONTENT_RELEASE_UNAUTHORIZED", kind: "unauthorized" },
      },
      {
        status: 400,
        wire: {
          code: "CONTENT_RELEASE_CONFLICT",
          kind: "conflict",
          operation: "stageRelease",
          releaseId: request.release.manifest.releaseId,
        },
      },
      {
        status: 409,
        wire: {
          code: "CONTENT_RELEASE_CONFLICT",
          kind: "conflict",
          operation: "stageRelease",
          releaseId: "test-foreign-release",
        },
      },
      {
        status: 409,
        wire: {
          activeReleaseId: null,
          code: "CONTENT_RELEASE_STALE_BASE",
          expectedBaseReleaseId: "test-foreign-release",
          kind: "stale-base",
          operation: "stageRelease",
          releaseId: request.release.manifest.releaseId,
        },
      },
      {
        status: 422,
        wire: {
          code: "CONTENT_RELEASE_INTEGRITY",
          kind: "rejected",
          operation: "verify",
          releaseId: request.release.manifest.releaseId,
        },
      },
    ];
    const tags = await Effect.runPromise(
      Effect.forEach(failures, ({ status, wire }) =>
        failureTag(
          request,
          transportResponse({ failure: wire, ok: false }),
          status
        )
      )
    );
    expect(tags).toEqual(failures.map(() => "PublicationTargetProtocolError"));
  });
});

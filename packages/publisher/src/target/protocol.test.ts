import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import type { PublicationResponse } from "@nakafa/aksara-contracts/transport/response";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  interpretPublicationResponse,
  publicationReleaseId,
  targetStage,
} from "#publisher/target/protocol";
import { publicationFailures } from "#test/failure";
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
  body: PublicationResponse,
  status: number
) {
  return interpret(request, body, status).pipe(
    Effect.flip,
    Effect.map((error) => error._tag)
  );
}

describe("publication target protocol", () => {
  it("maps every operation to its target stage and release identity", () => {
    expect(transportRequests.map(publicationReleaseId)).toEqual(
      transportRequests.map(({ operation }) =>
        operation === "current" ? null : transportRelease.manifest.releaseId
      )
    );
    expect(
      transportRequests.map(({ operation }) => targetStage(operation))
    ).toEqual([
      "current",
      "abort",
      "heads",
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

  it("rejects operation and HTTP contradictions", async () => {
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
    const cases = publicationFailures();
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
      {
        status: 413,
        wire: {
          code: "CONTENT_RELEASE_SIZE",
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
    const contradictoryBases = [null, request.release.manifest.releaseId].map(
      (activeReleaseId) =>
        ({
          failure: {
            activeReleaseId,
            code: "CONTENT_RELEASE_STALE_BASE",
            expectedBaseReleaseId: null,
            kind: "stale-base",
            operation: "stageRelease",
            releaseId: request.release.manifest.releaseId,
          },
          ok: false,
        }) satisfies PublicationResponse
    );
    const baseTags = await Effect.runPromise(
      Effect.forEach(contradictoryBases, (body) =>
        failureTag(request, body, 409)
      )
    );
    expect(baseTags).toEqual(
      contradictoryBases.map(() => "PublicationTargetProtocolError")
    );
  });
});

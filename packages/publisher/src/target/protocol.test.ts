import { describe, expect, it } from "@effect/vitest";
import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import type { PublicationResponse } from "@nakafa/aksara-contracts/transport/response";
import { Array as Arr, Effect } from "effect";
import {
  interpretPublicationResponse,
  publicationReleaseId,
  targetStage,
} from "#publisher/target/protocol";
import { publicationFailures } from "#test/failure";
import {
  transportRecovery,
  transportRelease,
  transportRequests,
  transportResponse,
} from "#test/transport/spec";
import { transportSuccess } from "#test/transport/success";

/** Runs one expected failure and returns its typed error tag. */
const failureTag = Effect.fn("PublicationProtocolTest.failureTag")(
  (request: PublicationRequest, body: PublicationResponse, status: number) =>
    interpretPublicationResponse(request, { body, status }).pipe(
      Effect.flip,
      Effect.map((error) => error._tag)
    )
);

describe("publication target protocol", () => {
  it("maps every operation to its target stage and release identity", () => {
    expect(Arr.map(transportRequests, publicationReleaseId)).toEqual(
      Arr.map(transportRequests, (request) => {
        if (request.operation === "current") {
          return null;
        }
        if (
          request.operation === "accept" ||
          request.operation === "recovery"
        ) {
          return request.recoveryId;
        }
        if (
          request.operation === "stageRecovery" ||
          request.operation === "activateRecovery"
        ) {
          return transportRecovery.manifest.releaseId;
        }
        return transportRelease.manifest.releaseId;
      })
    );
    expect(
      Arr.map(transportRequests, ({ operation }) => targetStage(operation))
    ).toEqual([
      "current",
      "accept",
      "abort",
      "recovery",
      "heads",
      "release",
      "recovery",
      "bundles",
      "snapshots",
      "snapshots",
      "routes",
      "items",
      "projections",
      "artifacts",
      "staging",
      "status",
      "verify",
      "activate",
      "recovery",
      "rollback",
      "rollback",
      "cleanup",
    ]);
  });

  it.effect("rejects operation and HTTP contradictions", () =>
    Effect.gen(function* () {
      const item = yield* Effect.fromOption(
        Arr.findFirst(
          transportRequests,
          (request) => request.operation === "stageItemBatch"
        )
      );
      const status = yield* Effect.fromOption(
        Arr.findFirst(
          transportRequests,
          (request) => request.operation === "status"
        )
      );
      const success = transportSuccess(item);
      const contradictions = [
        { body: transportSuccess(status), status: 200 },
        { body: success, status: 201 },
      ];
      const tags = yield* Effect.forEach(contradictions, (result) =>
        failureTag(item, result.body, result.status)
      );
      expect(tags).toEqual(
        Arr.map(contradictions, () => "PublicationTargetProtocolError")
      );
    })
  );

  it.effect("maps every authenticated failure without message parsing", () =>
    Effect.gen(function* () {
      const cases = publicationFailures();
      const tags = yield* Effect.forEach(cases, (testCase) =>
        Effect.forEach(testCase.statuses, (statusCode) =>
          failureTag(
            testCase.request,
            transportResponse({ failure: testCase.wire, ok: false }),
            statusCode
          )
        )
      );
      expect(Arr.flatten(tags)).toEqual(
        Arr.flatMap(cases, ({ statuses, tag }) => Arr.map(statuses, () => tag))
      );
    })
  );

  it.effect(
    "treats transient and contradictory failures as transport errors",
    () =>
      Effect.gen(function* () {
        const request = yield* Effect.fromOption(
          Arr.findFirst(
            transportRequests,
            (candidate) => candidate.operation === "stageRelease"
          )
        );
        const success = transportSuccess(request);
        const transientTags = yield* Effect.forEach(
          [408, 429, 500, 599],
          (status) => failureTag(request, success, status)
        );
        expect(transientTags).toEqual(
          Arr.map([408, 429, 500, 599], () => "PublicationTargetTransportError")
        );
        const invalidStatus = yield* failureTag(request, success, 600);
        expect(invalidStatus).toBe("PublicationTargetProtocolError");
        const failures = [
          {
            status: 403,
            wire: {
              code: "CONTENT_RELEASE_UNAUTHORIZED",
              kind: "unauthorized",
            },
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
        const tags = yield* Effect.forEach(failures, ({ status, wire }) =>
          failureTag(
            request,
            transportResponse({ failure: wire, ok: false }),
            status
          )
        );
        expect(tags).toEqual(
          Arr.map(failures, () => "PublicationTargetProtocolError")
        );
        const contradictoryBases = Arr.map(
          [null, request.release.manifest.releaseId],
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
        const baseTags = yield* Effect.forEach(contradictoryBases, (body) =>
          failureTag(request, body, 409)
        );
        expect(baseTags).toEqual(
          Arr.map(contradictoryBases, () => "PublicationTargetProtocolError")
        );
      })
  );
});

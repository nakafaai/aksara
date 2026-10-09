import { assert, describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { PublicationRequestSchema } from "@nakafa/aksara-contracts/transport/request";
import { PublicationSuccessSchema } from "@nakafa/aksara-contracts/transport/response";
import { Array as Arr, Option, Schema } from "effect";

import { hasBoundPublicationSuccess } from "#publisher/target/evidence/response";
import { foreignTransportSuccess } from "#test/foreign";
import { completedRecovery } from "#test/recovery";
import { transportRequests } from "#test/transport/spec";
import { transportSuccess } from "#test/transport/success";

type TransportRequest = (typeof transportRequests)[number];

/** Returns the one fixture request of an operation, typed as that operation; a missing fixture fails the test. */
function requestOf<Operation extends TransportRequest["operation"]>(
  operation: Operation
) {
  return Option.getOrThrow(
    Arr.findFirst(
      transportRequests,
      (
        candidate
      ): candidate is Extract<
        TransportRequest,
        { readonly operation: Operation }
      > => candidate.operation === operation
    )
  );
}

describe("publication success evidence", () => {
  it("binds every successful operation to its exact request", () => {
    expect(
      Arr.map(transportRequests, (request) =>
        hasBoundPublicationSuccess(request, transportSuccess(request))
      )
    ).toEqual(Arr.map(transportRequests, () => true));
  });

  it("rejects every success carrying a foreign operation identity", () => {
    expect(
      Arr.map(transportRequests, (request) =>
        hasBoundPublicationSuccess(request, foreignTransportSuccess(request))
      )
    ).toEqual(
      Arr.map(transportRequests, ({ operation }) => operation === "current")
    );
  });
  it("binds completed recovery evidence to the protected active relation", () => {
    const request = requestOf("recovery");
    expect(
      hasBoundPublicationSuccess(request, completedRecovery(request))
    ).toBe(true);
    expect(
      hasBoundPublicationSuccess(
        request,
        completedRecovery(request, ReleaseIdSchema.make("test-other-active"))
      )
    ).toBe(false);
  });
  it("binds head pages to the requested cursor and row ceiling", () => {
    const request = requestOf("headPage");
    const success = transportSuccess(request);
    assert(success.operation === "headPage");
    const [head] = success.value.heads;
    assert(head !== undefined);
    const wrongCursor = Schema.decodeSync(PublicationSuccessSchema)({
      ...success,
      value: { ...success.value, cursor: "another-page" },
    });
    const twoHeads = Schema.decodeUnknownSync(PublicationSuccessSchema)({
      ...success,
      value: {
        ...success.value,
        heads: [
          head,
          {
            ...head,
            contentKey: "test:http-z",
            sourcePath: "packages/corpus/test/http-z/en.mdx",
          },
        ],
      },
    });
    const limited = Schema.decodeSync(PublicationRequestSchema)({
      ...request,
      limit: 1,
    });
    expect(hasBoundPublicationSuccess(request, wrongCursor)).toBe(false);
    expect(hasBoundPublicationSuccess(limited, twoHeads)).toBe(false);
  });
  it("rejects verification evidence from another signed manifest", () => {
    const request = requestOf("verify");
    const success = transportSuccess(request);
    assert(success.operation === "verify");
    assert(success.value.phase === "verified");
    const foreignHash = `sha256:${"f".repeat(64)}`;
    const evidenceCases = [
      { ...success.value.evidence, manifestHash: foreignHash },
      {
        ...success.value.evidence,
        baseActiveAppLocales: success.value.evidence.activeAppLocales,
        baseManifestHash: foreignHash,
        baseReleaseId: "test-foreign-base",
      },
      {
        ...success.value.evidence,
        deleteHeads: 0,
        itemCount: 1,
        rollbackCount: 1,
      },
      {
        ...success.value.evidence,
        deleteHeads: 0,
        stagedArtifacts: 2,
        upsertHeads: 2,
      },
      { ...success.value.evidence, itemsDigest: foreignHash },
      { ...success.value.evidence, projectionCount: 2 },
      { ...success.value.evidence, projectionDigest: foreignHash },
      { ...success.value.evidence, rendererManifestHash: foreignHash },
    ];
    expect(
      Arr.map(evidenceCases, (value) =>
        hasBoundPublicationSuccess(
          request,
          Schema.decodeSync(PublicationSuccessSchema)({
            ...success,
            value: { evidence: value, phase: "verified" },
          })
        )
      )
    ).toEqual(Arr.map(evidenceCases, () => false));
  });
  it("binds pending verification to the requested release identity", () => {
    const request = requestOf("verify");
    const pending = Schema.decodeSync(PublicationSuccessSchema)({
      ok: true,
      operation: "verify",
      value: {
        manifestHash: request.release.manifestHash,
        phase: "verifying",
        releaseId: request.release.manifest.releaseId,
      },
    });
    const foreign = Schema.decodeUnknownSync(PublicationSuccessSchema)({
      ...pending,
      value: {
        ...pending.value,
        releaseId: ReleaseIdSchema.make("test-foreign-release"),
      },
    });
    const foreignHash = Schema.decodeUnknownSync(PublicationSuccessSchema)({
      ...pending,
      value: {
        ...pending.value,
        manifestHash: `sha256:${"f".repeat(64)}`,
      },
    });
    expect(hasBoundPublicationSuccess(request, pending)).toBe(true);
    expect(hasBoundPublicationSuccess(request, foreign)).toBe(false);
    expect(hasBoundPublicationSuccess(request, foreignHash)).toBe(false);
  });
  it("rejects activation receipts that contradict their signed manifest", () => {
    const request = requestOf("activate");
    const success = transportSuccess(request);
    assert(success.operation === "activate");
    const foreignHash = `sha256:${"f".repeat(64)}`;
    const receiptCases = [
      { ...success.value, projectionDigest: foreignHash },
      {
        ...success.value,
        deletedHeads: success.value.deletedHeads + 1,
        stagedItems: success.value.stagedItems + 1,
      },
      { ...success.value, stagedProjections: 2 },
    ];
    expect(
      Arr.map(receiptCases, (value) =>
        hasBoundPublicationSuccess(
          request,
          Schema.decodeSync(PublicationSuccessSchema)({
            ...success,
            value,
          })
        )
      )
    ).toEqual(Arr.map(receiptCases, () => false));
  });

  it("binds rollback pages to their requested cursor and limit", () => {
    const request = requestOf("rollbackPage");
    const records = Arr.map([0, 1], (index) => {
      const state = {
        change: {
          artifactLocale: "en" as const,
          contentKey: `test:deleted-${index}`,
          family: "material" as const,
          operation: "delete" as const,
        },
      };
      return {
        current: state,
        index,
        prior: state,
      };
    });
    const response = Schema.decodeSync(PublicationSuccessSchema)({
      ok: true,
      operation: "rollbackPage",
      value: {
        done: true,
        nextIndex: 1,
        records,
        rollbackOf: request.rollbackOf,
        rollbackOfManifestHash: request.rollbackOfManifestHash,
        total: 2,
      },
    });
    const wrongCursor = Schema.decodeSync(PublicationRequestSchema)({
      ...request,
      afterIndex: 0,
    });
    const tooSmall = Schema.decodeSync(PublicationRequestSchema)({
      ...request,
      limit: 1,
    });
    expect(
      Arr.map([wrongCursor, tooSmall], (candidate) =>
        hasBoundPublicationSuccess(candidate, response)
      )
    ).toEqual([false, false]);
  });

  it("binds cumulative cleanup evidence to its requested release", () => {
    const request = requestOf("cleanup");
    const success = transportSuccess(request);
    assert(success.operation === "cleanup");
    const progressed = Schema.decodeSync(PublicationSuccessSchema)({
      ...success,
      value: { ...success.value, complete: false, retryAt: 1_800_000_000_000 },
    });
    expect(hasBoundPublicationSuccess(request, success)).toBe(true);
    expect(hasBoundPublicationSuccess(request, progressed)).toBe(true);
  });
  it("rejects batch receipts with another index or row count", () => {
    const request = requestOf("stageItemBatch");
    const success = transportSuccess(request);
    assert(success.operation === "stageItemBatch");
    const responses = [
      Schema.decodeSync(PublicationSuccessSchema)({
        ...success,
        value: { ...success.value, batchIndex: 1 },
      }),
      Schema.decodeSync(PublicationSuccessSchema)({
        ...success,
        value: { ...success.value, created: 0 },
      }),
    ];
    expect(
      Arr.map(responses, (response) =>
        hasBoundPublicationSuccess(request, response)
      )
    ).toEqual([false, false]);
  });
});

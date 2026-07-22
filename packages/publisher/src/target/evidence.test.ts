import { PublicationRequestSchema } from "@nakafa/aksara-contracts/transport/request";
import { PublicationSuccessSchema } from "@nakafa/aksara-contracts/transport/response";
import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { hasBoundPublicationSuccess } from "#publisher/target/evidence";
import { foreignTransportSuccess } from "#test/foreign";
import { transportRequests, transportSuccess } from "#test/transport";

describe("publication success evidence", () => {
  it("binds every successful operation to its exact request", () => {
    expect(
      transportRequests.map((request) =>
        hasBoundPublicationSuccess(request, transportSuccess(request))
      )
    ).toEqual(transportRequests.map(() => true));
  });

  it("rejects every success carrying a foreign operation identity", () => {
    expect(
      transportRequests.map((request) =>
        hasBoundPublicationSuccess(request, foreignTransportSuccess(request))
      )
    ).toEqual(
      transportRequests.map(({ operation }) => operation === "current")
    );
  });

  it("binds head pages to the requested cursor and row ceiling", () => {
    const request = transportRequests.find(
      (candidate) => candidate.operation === "headPage"
    );
    if (request?.operation !== "headPage") {
      return;
    }
    const success = transportSuccess(request);
    if (success.operation !== "headPage") {
      return;
    }
    const [head] = success.value.heads;
    if (head === undefined) {
      return;
    }
    const wrongCursor = Schema.decodeUnknownSync(PublicationSuccessSchema)({
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
    const limited = Schema.decodeUnknownSync(PublicationRequestSchema)({
      ...request,
      limit: 1,
    });
    expect(hasBoundPublicationSuccess(request, wrongCursor)).toBe(false);
    expect(hasBoundPublicationSuccess(limited, twoHeads)).toBe(false);
  });

  it("rejects verification evidence from another signed manifest", () => {
    const request = transportRequests.find(
      (candidate) => candidate.operation === "verify"
    );
    if (request?.operation !== "verify") {
      return;
    }
    const success = transportSuccess(request);
    if (success.operation !== "verify") {
      return;
    }
    const foreignHash = `sha256:${"f".repeat(64)}`;
    const evidenceCases = [
      { ...success.value, manifestHash: foreignHash },
      { ...success.value, baseReleaseId: "test-foreign-base" },
      { ...success.value, deleteHeads: 0, itemCount: 1 },
      { ...success.value, itemsDigest: foreignHash },
      { ...success.value, projectionCount: 2 },
      { ...success.value, projectionDigest: foreignHash },
      { ...success.value, rendererManifestHash: foreignHash },
    ];
    expect(
      evidenceCases.map((value) =>
        hasBoundPublicationSuccess(
          request,
          Schema.decodeUnknownSync(PublicationSuccessSchema)({
            ...success,
            value,
          })
        )
      )
    ).toEqual(evidenceCases.map(() => false));
  });

  it("rejects activation receipts that contradict their signed manifest", () => {
    const request = transportRequests.find(
      (candidate) => candidate.operation === "activate"
    );
    if (request?.operation !== "activate") {
      return;
    }
    const success = transportSuccess(request);
    if (success.operation !== "activate") {
      return;
    }
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
      receiptCases.map((value) =>
        hasBoundPublicationSuccess(
          request,
          Schema.decodeUnknownSync(PublicationSuccessSchema)({
            ...success,
            value,
          })
        )
      )
    ).toEqual(receiptCases.map(() => false));
  });

  it("rejects completed finalization receipts from another manifest", () => {
    const request = transportRequests.find(
      (candidate) => candidate.operation === "finalize"
    );
    if (request?.operation !== "finalize") {
      return;
    }
    const success = transportSuccess(request);
    if (success.operation !== "finalize" || !success.value.done) {
      return;
    }
    const response = Schema.decodeUnknownSync(PublicationSuccessSchema)({
      ...success,
      value: {
        ...success.value,
        receipt: {
          ...success.value.receipt,
          projectionDigest: `sha256:${"f".repeat(64)}`,
        },
      },
    });
    expect(hasBoundPublicationSuccess(request, response)).toBe(false);
  });

  it("binds rollback pages to their requested cursor and limit", () => {
    const request = transportRequests.find(
      (candidate) => candidate.operation === "rollbackPage"
    );
    if (request?.operation !== "rollbackPage") {
      return;
    }
    const records = [0, 1].map((index) => ({
      change: {
        contentKey: `test:deleted-${index}`,
        locale: "en",
        operation: "delete",
      },
      index,
    }));
    const response = Schema.decodeUnknownSync(PublicationSuccessSchema)({
      ok: true,
      operation: "rollbackPage",
      value: {
        done: true,
        nextIndex: 1,
        records,
        rollbackOf: request.rollbackOf,
        total: 2,
      },
    });
    const wrongCursor = Schema.decodeUnknownSync(PublicationRequestSchema)({
      ...request,
      afterIndex: 0,
    });
    const tooSmall = Schema.decodeUnknownSync(PublicationRequestSchema)({
      ...request,
      limit: 1,
    });
    expect(
      [wrongCursor, tooSmall].map((candidate) =>
        hasBoundPublicationSuccess(candidate, response)
      )
    ).toEqual([false, false]);
  });

  it("binds cumulative cleanup evidence to its requested release", () => {
    const request = transportRequests.find(
      (candidate) => candidate.operation === "cleanup"
    );
    if (request?.operation !== "cleanup") {
      return;
    }
    const success = transportSuccess(request);
    if (success.operation !== "cleanup") {
      return;
    }
    const progressed = Schema.decodeUnknownSync(PublicationSuccessSchema)({
      ...success,
      value: { ...success.value, complete: false, deletedItems: 2 },
    });
    expect(hasBoundPublicationSuccess(request, success)).toBe(true);
    expect(hasBoundPublicationSuccess(request, progressed)).toBe(true);
  });

  it("rejects batch receipts with another index or row count", () => {
    const request = transportRequests.find(
      (candidate) => candidate.operation === "stageItemBatch"
    );
    if (request?.operation !== "stageItemBatch") {
      return;
    }
    const success = transportSuccess(request);
    if (success.operation !== "stageItemBatch") {
      return;
    }
    const responses = [
      Schema.decodeUnknownSync(PublicationSuccessSchema)({
        ...success,
        value: { ...success.value, batchIndex: 1 },
      }),
      Schema.decodeUnknownSync(PublicationSuccessSchema)({
        ...success,
        value: { ...success.value, created: 0 },
      }),
    ];
    expect(
      responses.map((response) => hasBoundPublicationSuccess(request, response))
    ).toEqual([false, false]);
  });
});

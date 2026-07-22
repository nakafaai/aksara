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
    ).toEqual(transportRequests.map(() => false));
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

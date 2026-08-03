import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import {
  PublicationTargetRejectedError,
  PublicationTargetTransportError,
} from "@nakafa/aksara-publisher/target/errors";
import { describe, expect, it } from "vitest";
import { mapProductionError } from "#cli/failure";

describe("production failure boundary", () => {
  it("keeps only a safe typed failure identity", () => {
    expect(
      mapProductionError("publish")(
        new PublicationTargetTransportError({
          detail: { reason: "transient-status", status: 503 },
          stage: "verify",
        })
      )
    ).toMatchObject({
      _tag: "ProductionError",
      failure: "PublicationTargetTransportError",
      stage: "publish",
      targetStage: "verify",
      transport: { reason: "transient-status", status: 503 },
    });
  });

  it("does not trust transport-shaped plain records", () => {
    const failure = mapProductionError("publish")({
      _tag: "PublicationTargetTransportError",
      detail: { reason: "network", secret: "must-not-escape" },
      stage: "verify",
    });
    expect(failure).toEqual(
      expect.objectContaining({
        failure: "PublicationTargetTransportError",
        stage: "publish",
      })
    );
    expect(failure).not.toHaveProperty("transport");
  });

  it("keeps stable authenticated rejection evidence", () => {
    expect(
      mapProductionError("publish")(
        new PublicationTargetRejectedError({
          rejection: {
            code: "CONTENT_RELEASE_UNSUPPORTED",
            kind: "rejected",
            operation: "stageRelease",
            releaseId: ReleaseIdSchema.make("release-2026"),
          },
        })
      )
    ).toMatchObject({
      failure: "PublicationTargetRejectedError",
      rejectionCode: "CONTENT_RELEASE_UNSUPPORTED",
      stage: "publish",
      targetOperation: "stageRelease",
    });
  });

  it("keeps a predecode code without inventing an operation", () => {
    const failure = mapProductionError("target")({
      _tag: "PublicationTargetRejectedError",
      rejection: {
        code: "CONTENT_RELEASE_UNSUPPORTED",
        kind: "rejected",
        operation: null,
        releaseId: null,
      },
    });
    expect(failure).toMatchObject({
      rejectionCode: "CONTENT_RELEASE_UNSUPPORTED",
      stage: "target",
    });
    expect(failure).not.toHaveProperty("targetOperation");
  });

  it("drops malformed rejection evidence", () => {
    const failure = mapProductionError("publish")({
      _tag: "PublicationTargetRejectedError",
      rejection: { code: "secret=value", operation: "stageRelease" },
    });
    expect(failure).not.toHaveProperty("rejectionCode");
    expect(failure).not.toHaveProperty("targetOperation");
  });

  it.each([
    null,
    "plain failure",
    { _tag: "contains-secret=value" },
    { _tag: 42 },
  ])("redacts an unsafe failure shape %#", (failure) => {
    expect(mapProductionError("prepare")(failure)).toMatchObject({
      failure: "UnknownFailure",
      stage: "prepare",
    });
  });

  it.each(["cache", "preflight"] as const)(
    "preserves safe activation phase %s",
    (phase) => {
      expect(
        mapProductionError("publish")({
          _tag: "PublicationActivationError",
          phase,
          secret: "must-not-escape",
        })
      ).toEqual(
        expect.objectContaining({
          failure: "PublicationActivationError",
          phase,
          stage: "publish",
        })
      );
    }
  );

  it("drops an invalid activation phase", () => {
    expect(
      mapProductionError("publish")({
        _tag: "PublicationActivationError",
        phase: "secret=value",
      })
    ).not.toHaveProperty("phase");
  });
});

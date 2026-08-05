import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import {
  PublicationTargetRejectedError,
  PublicationTargetTransportError,
} from "@nakafa/aksara-publisher/target/errors";
import { describe, expect, it } from "vitest";
import { makeNakafaAppError } from "#cli/app-error";
import { ProductionEnvironmentError } from "#cli/environment/error";
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

  it("keeps safe Nakafa app evidence", () => {
    expect(
      mapProductionError("renderer")(makeNakafaAppError("status", false, 401))
    ).toMatchObject({
      appReason: "status",
      appStatus: 401,
      failure: "NakafaAppError",
      stage: "renderer",
    });
    const networkFailure = mapProductionError("renderer")(
      makeNakafaAppError("network", true)
    );
    expect(networkFailure).toMatchObject({
      appReason: "network",
      failure: "NakafaAppError",
      stage: "renderer",
    });
    expect(networkFailure).not.toHaveProperty("appStatus");
  });

  it("does not trust Nakafa-app-shaped plain records", () => {
    const failure = mapProductionError("renderer")({
      _tag: "NakafaAppError",
      reason: "status",
      status: 401,
    });
    expect(failure).not.toHaveProperty("appReason");
    expect(failure).not.toHaveProperty("appStatus");
  });

  it("keeps the safe production environment variable", () => {
    expect(
      mapProductionError("environment")(
        new ProductionEnvironmentError({
          variable: "AKSARA_PUBLICATION_ENDPOINT",
        })
      )
    ).toMatchObject({
      environmentVariable: "AKSARA_PUBLICATION_ENDPOINT",
      failure: "ProductionEnvironmentError",
      stage: "environment",
    });
  });

  it("does not trust environment-shaped plain records", () => {
    const failure = mapProductionError("environment")({
      _tag: "ProductionEnvironmentError",
      variable: "AKSARA_PUBLICATION_TOKEN",
    });
    expect(failure).not.toHaveProperty("environmentVariable");
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

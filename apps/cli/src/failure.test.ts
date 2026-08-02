import { PublicationTargetTransportError } from "@nakafa/aksara-publisher/target/errors";
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

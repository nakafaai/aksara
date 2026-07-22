import { describe, expect, it } from "vitest";
import { mapProductionError } from "#cli/failure";

describe("production failure boundary", () => {
  it("keeps only a safe typed failure identity", () => {
    expect(
      mapProductionError("publish")({
        _tag: "PublicationTargetTransportError",
        secret: "must-not-escape",
      })
    ).toMatchObject({
      _tag: "ProductionError",
      failure: "PublicationTargetTransportError",
      stage: "publish",
    });
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
});

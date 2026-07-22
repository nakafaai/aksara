import { describe, expect, it } from "vitest";
import { makeNakafaAppError } from "#cli/app-error";

describe("Nakafa app error", () => {
  it("creates sanitized failures with and without an HTTP status", () => {
    expect(makeNakafaAppError("network", true)).toMatchObject({
      reason: "network",
      retryable: true,
    });
    expect(makeNakafaAppError("status", false, 401)).toMatchObject({
      reason: "status",
      retryable: false,
      status: 401,
    });
  });
});

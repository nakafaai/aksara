import { describe, expect, it } from "@effect/vitest";
import { isAddressInfo } from "#cli/address";

describe("Node listener address", () => {
  it("accepts one complete address-info value", () => {
    expect(
      isAddressInfo({ address: "127.0.0.1", family: "IPv4", port: 30_001 })
    ).toBe(true);
  });

  it.each([
    null,
    [],
    {},
    { address: 127, family: "IPv4", port: 30_001 },
    { address: "127.0.0.1", family: 4, port: 30_001 },
    { address: "127.0.0.1", family: "IPv4", port: "30001" },
  ])("rejects malformed address info %#", (value) => {
    expect(isAddressInfo(value)).toBe(false);
  });
});

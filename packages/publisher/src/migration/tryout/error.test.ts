import { describe, expect, it } from "vitest";

import { migrationFail } from "#publisher/migration/tryout/error";

describe("try-out history migration failure", () => {
  it("retains only its public-safe invariant reason", () => {
    expect(migrationFail("provenance")).toMatchObject({
      _tag: "TryoutHistoryMigrationError",
      reason: "provenance",
    });
  });
});

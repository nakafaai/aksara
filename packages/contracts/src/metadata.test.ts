import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  AuthoredContentDateSchema,
  AuthoredContentMetadataSchema,
} from "./metadata.js";

describe("authored metadata", () => {
  it("accepts canonical real dates including leap day", () => {
    expect(
      Schema.decodeUnknownSync(AuthoredContentDateSchema)("2024-02-29")
    ).toBe("2024-02-29");
  });

  it.each([
    "2023-02-29",
    "2025-02-30",
    "2025-13-01",
    "25-01-01",
  ])("rejects the invalid date %s", (date) => {
    expect(
      Schema.decodeUnknownEither(AuthoredContentDateSchema)(date)._tag
    ).toBe("Left");
  });

  it("decodes the exact authored metadata shape", () => {
    const metadata = Schema.decodeUnknownSync(AuthoredContentMetadataSchema)(
      {
        authors: [{ name: "Nakafa" }],
        date: "2026-07-21",
        title: "Linear functions",
      },
      { onExcessProperty: "error" }
    );

    expect(metadata.title).toBe("Linear functions");
  });
});

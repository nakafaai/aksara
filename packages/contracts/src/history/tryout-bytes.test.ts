import { describe, expect, it } from "vitest";

import {
  canonicalizeHistoricalTryoutCatalog,
  canonicalizeHistoricalTryoutPlacement,
} from "#contracts/history/tryout-bytes";
import {
  historicalCatalogRows,
  historicalInternalSection,
  historicalInternalSet,
  historicalPlacement,
} from "#contracts/test/history-row";

describe("historical try-out canonical bytes", () => {
  it("reconstructs every retained catalog discriminator", () => {
    const rows = [
      ...historicalCatalogRows,
      historicalInternalSet,
      historicalInternalSection,
    ];
    const canonical = rows.map((row) =>
      JSON.parse(canonicalizeHistoricalTryoutCatalog(row))
    );

    expect(canonical.map(({ kind }) => kind)).toEqual([
      "country",
      "exam",
      "track",
      "set",
      "section",
      "set",
      "section",
    ]);
    expect(canonical[0]).toMatchObject({
      countryCode: "ID",
      description: "Retained description",
    });
    expect(canonical[5]).toMatchObject({ internalEntrySectionKey: "entry" });
    expect(canonical[6]).not.toHaveProperty("publicPath");
  });

  it("preserves exact placement field order and optional hash omission", () => {
    const canonical =
      canonicalizeHistoricalTryoutPlacement(historicalPlacement);

    expect(JSON.parse(canonical)).toMatchObject({
      choices: historicalPlacement.choices,
      questionContentKey: historicalPlacement.questionContentKey,
    });
    expect(canonical).not.toContain("contentHash");
  });
});

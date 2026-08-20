import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { makeTryoutTestRows } from "#contracts/test/tryout";
import {
  TryoutCatalogNodeIdentitySchema,
  type TryoutCatalogRow,
  TryoutCatalogRowSchema,
} from "#contracts/tryout/catalog";

const rows: readonly TryoutCatalogRow[] = makeTryoutTestRows().catalog.map(
  ({ row }) => row
);

/** Formats one expected current catalog schema failure. */
function formatFailure(input: unknown) {
  const result = Schema.decodeUnknownExit(TryoutCatalogRowSchema)(input);
  if (Exit.isSuccess(result)) {
    throw new Error("Expected current try-out catalog decoding to fail.");
  }
  return String(result.cause);
}

describe("try-out catalog contract", () => {
  it("decodes every current localized hierarchy kind", () => {
    const kinds = rows.map(
      (row) => Schema.decodeSync(TryoutCatalogRowSchema)(row).kind
    );

    expect(new Set(kinds)).toEqual(
      new Set(["country", "exam", "track", "set", "section"])
    );
  });

  it("requires exact keys for each pre-read catalog identity", () => {
    const valid = Schema.decodeExit(TryoutCatalogNodeIdentitySchema)({
      appLocale: "de",
      countryKey: "indonesia",
      examKey: "snbt",
      kind: "exam",
    });
    const missing = Schema.decodeUnknownExit(TryoutCatalogNodeIdentitySchema)({
      appLocale: "de",
      countryKey: "indonesia",
      kind: "exam",
    });
    const excess = Schema.decodeUnknownExit(TryoutCatalogNodeIdentitySchema)(
      {
        appLocale: "de",
        countryKey: "indonesia",
        examKey: "snbt",
        kind: "exam",
        trackKey: "2027",
      },
      { onExcessProperty: "error" }
    );

    expect(Exit.isSuccess(valid)).toBe(true);
    expect(Exit.isFailure(missing)).toBe(true);
    expect(Exit.isFailure(excess)).toBe(true);
  });

  it("reports track, set, and section inventory violations", () => {
    const track = rows.find((row) => row.kind === "track");
    const set = rows.find((row) => row.kind === "set");
    const section = rows.find((row) => row.kind === "section");
    if (
      !(
        track?.kind === "track" &&
        set?.kind === "set" &&
        section?.kind === "section"
      )
    ) {
      throw new Error("Expected complete current try-out catalog fixtures.");
    }

    expect(
      formatFailure({
        ...track,
        sectionCount: 1,
        visibleSectionCount: 2,
      })
    ).toContain("Visible track sections cannot exceed all sections.");
    expect(
      formatFailure({
        ...set,
        internalEntrySectionKey: undefined,
        sectionCount: 2,
        visibleSectionCount: 1,
      })
    ).toContain("Set section counts do not match their visibility.");
    expect(
      formatFailure({
        ...set,
        internalEntrySectionKey: section.sectionKey,
        sectionCount: 2,
        visibleSectionCount: 0,
      })
    ).toContain("Set section counts do not match their visibility.");
    expect(
      formatFailure({
        ...section,
        publicPath: undefined,
        visibility: "visible",
      })
    ).toContain("Section visibility does not match its public path.");
    expect(
      formatFailure({
        ...section,
        publicPath: "try-out/invalid-internal-section",
        visibility: "internal-entry",
      })
    ).toContain("Section visibility does not match its public path.");
  });
});

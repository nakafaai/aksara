import { Either, ParseResult, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { makeTryoutV2TestRows } from "#contracts/test/tryout-v2";
import {
  type TryoutCatalogV2Row,
  TryoutCatalogV2RowSchema,
} from "#contracts/tryout/catalog-v2";

const rows: readonly TryoutCatalogV2Row[] = makeTryoutV2TestRows().catalog.map(
  ({ row }) => row
);

/** Formats one expected current catalog schema failure. */
function formatFailure(input: unknown) {
  const result = Schema.decodeUnknownEither(TryoutCatalogV2RowSchema)(input);
  if (Either.isRight(result)) {
    throw new Error("Expected current try-out catalog decoding to fail.");
  }
  return ParseResult.TreeFormatter.formatErrorSync(result.left);
}

describe("try-out catalog v2 contract", () => {
  it("decodes every current localized hierarchy kind", () => {
    const kinds = rows.map(
      (row) => Schema.decodeUnknownSync(TryoutCatalogV2RowSchema)(row).kind
    );

    expect(new Set(kinds)).toEqual(
      new Set(["country", "exam", "track", "set", "section"])
    );
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

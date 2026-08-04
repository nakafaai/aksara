import { Either, ParseResult, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { Sha256HashSchema } from "#contracts/ids";
import { TryoutSnapshotInputSchema } from "#contracts/tryout/snapshot/spec";

const snapshot = {
  catalogDigest: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
  format: "tryout-v1",
  locales: ["en", "id"],
  placementCount: 1,
  placementDigest: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  routeCount: 1,
} as const;

/** Formats one expected strict schema failure for message assertions. */
function formatFailure(result: Either.Either<unknown, ParseResult.ParseError>) {
  if (Either.isRight(result)) {
    throw new Error("Expected schema decoding to fail.");
  }
  return ParseResult.TreeFormatter.formatErrorSync(result.left);
}

describe("try-out snapshot", () => {
  it("derives the exact locale order from the content contract", () => {
    expect(
      Schema.decodeUnknownSync(TryoutSnapshotInputSchema)(snapshot).locales
    ).toEqual(["en", "id"]);
    for (const locales of [["en"], ["id", "en"]] as const) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(TryoutSnapshotInputSchema)({
            ...snapshot,
            locales,
          })
        )
      ).toBe(true);
    }
    expect(
      formatFailure(
        Schema.decodeUnknownEither(TryoutSnapshotInputSchema)({
          ...snapshot,
          locales: ["id", "en"],
        })
      )
    ).toContain("Locales must match the content contract.");
  });
});

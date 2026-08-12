import { Either, ParseResult, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { Sha256HashSchema } from "#contracts/ids";
import {
  TryoutSnapshotInputSchema,
  TryoutSnapshotV2InputSchema,
  TryoutSnapshotWireSchema,
} from "#contracts/tryout/snapshot/spec";

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
    ).toContain("Historical app locales must be exactly en and id.");
  });

  it("decodes current active locale and editorial review identity", () => {
    const current = {
      activeAppLocales: ["en", "id", "de"],
      catalogDigest: snapshot.catalogDigest,
      counts: snapshot.counts,
      editorialReviewDigest: Sha256HashSchema.make(`sha256:${"c".repeat(64)}`),
      format: "tryout-v2",
      placementCount: snapshot.placementCount,
      placementDigest: snapshot.placementDigest,
      routeCount: snapshot.routeCount,
    } as const;
    expect(
      Schema.decodeUnknownSync(TryoutSnapshotV2InputSchema)(current)
        .activeAppLocales
    ).toEqual(["en", "id", "de"]);
    expect(
      Schema.decodeUnknownSync(TryoutSnapshotWireSchema)({
        ...current,
        snapshotId: Sha256HashSchema.make(`sha256:${"d".repeat(64)}`),
      }).format
    ).toBe("tryout-v2");
  });
});

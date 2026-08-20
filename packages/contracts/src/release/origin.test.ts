import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  canonicalizeReleaseOrigin,
  ReleaseOriginSchema,
} from "#contracts/release/origin";

describe("release origin", () => {
  it("preserves exact Git provenance in canonical field order", () => {
    const origin = Schema.decodeSync(ReleaseOriginSchema)({
      kind: "git",
      sha: "a".repeat(40),
    });

    expect(canonicalizeReleaseOrigin(origin)).toEqual({
      kind: "git",
      sha: "a".repeat(40),
    });
  });

  it("preserves the exact rollback source without inventing a Git SHA", () => {
    const origin = Schema.decodeSync(ReleaseOriginSchema)({
      kind: "rollback",
      releaseId: "release-active",
    });

    expect(canonicalizeReleaseOrigin(origin)).toEqual({
      kind: "rollback",
      releaseId: "release-active",
    });
  });

  it("rejects invalid Git and rollback identities", () => {
    const decode = Schema.decodeUnknownExit(ReleaseOriginSchema, {
      onExcessProperty: "error",
    });

    expect(Exit.isFailure(decode({ kind: "git", sha: "short" }))).toBe(true);
    expect(
      Exit.isFailure(decode({ kind: "rollback", releaseId: "INVALID" }))
    ).toBe(true);
    expect(
      Exit.isFailure(
        decode({
          kind: "git",
          releaseId: "release-active",
          sha: "a".repeat(40),
        })
      )
    ).toBe(true);
  });
});

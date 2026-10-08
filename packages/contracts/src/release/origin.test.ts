import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
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

  it("pins the canonical JSON of an exact Git origin", () => {
    const origin = Schema.decodeSync(ReleaseOriginSchema)({
      kind: "git",
      sha: "0123456789abcdef0123456789abcdef01234567",
    });

    expect(JSON.stringify(canonicalizeReleaseOrigin(origin))).toBe(
      '{"kind":"git","sha":"0123456789abcdef0123456789abcdef01234567"}'
    );
  });

  it("pins the canonical JSON of a rollback origin", () => {
    const origin = Schema.decodeSync(ReleaseOriginSchema)({
      kind: "rollback",
      releaseId: "release-active",
    });

    expect(JSON.stringify(canonicalizeReleaseOrigin(origin))).toBe(
      '{"kind":"rollback","releaseId":"release-active"}'
    );
  });
});

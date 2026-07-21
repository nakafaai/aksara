import { Buffer } from "node:buffer";
import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ContentKeySchema,
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "./ids.js";

describe("ids", () => {
  it("decodes canonical hashes and rejects malformed values", () => {
    const sha = `sha256:${"a".repeat(64)}`;
    const signature = `${"a".repeat(85)}g`;

    expect(
      Either.isRight(Schema.decodeUnknownEither(Sha256HashSchema)(sha))
    ).toBe(true);
    expect(
      Either.isRight(
        Schema.decodeUnknownEither(Ed25519SignatureSchema)(signature)
      )
    ).toBe(true);
    expect(
      Either.isLeft(Schema.decodeUnknownEither(Sha256HashSchema)("sha256:no"))
    ).toBe(true);
  });

  it("rejects non-canonical Ed25519 base64url pad bits", () => {
    const canonical = "A".repeat(86);
    const nonCanonical = `${"A".repeat(85)}B`;

    expect(Buffer.from(canonical, "base64url")).toHaveLength(64);
    expect(Buffer.from(nonCanonical, "base64url")).toEqual(
      Buffer.from(canonical, "base64url")
    );
    for (const finalCharacter of ["A", "Q", "g", "w"]) {
      expect(
        Either.isRight(
          Schema.decodeUnknownEither(Ed25519SignatureSchema)(
            `${"A".repeat(85)}${finalCharacter}`
          )
        )
      ).toBe(true);
    }
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(Ed25519SignatureSchema)(nonCanonical)
      )
    ).toBe(true);
  });

  it("requires full lowercase Git commit SHAs", () => {
    expect(
      Either.isRight(
        Schema.decodeUnknownEither(GitCommitShaSchema)("c".repeat(40))
      )
    ).toBe(true);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(GitCommitShaSchema)("C".repeat(40))
      )
    ).toBe(true);
  });

  it("rejects unsafe or non-canonical wire identifiers", () => {
    for (const value of ["line\nbreak", "nul\0byte", "Uppercase"]) {
      expect(
        Either.isLeft(Schema.decodeUnknownEither(ContentKeySchema)(value))
      ).toBe(true);
    }
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(ReleaseIdSchema)("release\nnext")
      )
    ).toBe(true);
  });

  it("accepts canonical public paths and rejects unsafe variants", () => {
    expect(
      Either.isRight(
        Schema.decodeUnknownEither(PublicPathSchema)("/en/article/functions")
      )
    ).toBe(true);
    for (const value of [
      "relative/path",
      "/en//article",
      "/en/../secret",
      "/en/article?draft=1",
      "/en/article#answer",
      "/en\\article",
      "/en/line\nbreak",
      "/en/%2E%2E/secret",
      "/en/%2Fsecret",
      "/en/Uppercase",
      "/en/dotted.path",
    ]) {
      expect(
        Either.isLeft(Schema.decodeUnknownEither(PublicPathSchema)(value))
      ).toBe(true);
    }
  });
});

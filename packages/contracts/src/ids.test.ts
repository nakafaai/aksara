import { Buffer } from "node:buffer";
import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";

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
        Schema.decodeUnknownEither(PublicPathSchema)("subjects/test/route")
      )
    ).toBe(true);
    for (const value of [
      "/subjects/test/route",
      "subjects//article",
      "subjects/../secret",
      "subjects/article?draft=1",
      "subjects/article#answer",
      "subjects\\article",
      "subjects/line\nbreak",
      "subjects/%2E%2E/secret",
      "subjects/%2Fsecret",
      "subjects/Uppercase",
      "subjects/dotted.path",
    ]) {
      expect(
        Either.isLeft(Schema.decodeUnknownEither(PublicPathSchema)(value))
      ).toBe(true);
    }
  });

  it("accepts only safe reviewed paths below the corpus workspace", () => {
    expect(
      Either.isRight(
        Schema.decodeUnknownEither(CorpusSourcePathSchema)(
          "packages/corpus/material/lesson/mathematics/function-composition/inverse-function/function-concept/en.mdx"
        )
      )
    ).toBe(true);
    for (const value of [
      "/packages/corpus/test.mdx",
      "packages/contents/test.mdx",
      "packages/corpus/../secret.mdx",
      "packages/corpus/test\\secret.mdx",
      "packages/corpus/Test.mdx",
      "packages/corpus/test\0secret.mdx",
    ]) {
      expect(
        Either.isLeft(Schema.decodeUnknownEither(CorpusSourcePathSchema)(value))
      ).toBe(true);
    }
  });

  it("reports actionable diagnostics for each refined identifier", () => {
    expect(() =>
      Schema.decodeUnknownSync(PublicPathSchema)("/subjects/test")
    ).toThrow("Expected a canonical slashless public path.");
    expect(() => Schema.decodeUnknownSync(GitCommitShaSchema)("short")).toThrow(
      "Expected a 40-character lowercase Git commit SHA."
    );
    expect(() => Schema.decodeUnknownSync(Sha256HashSchema)("invalid")).toThrow(
      "Expected sha256 followed by 64 lowercase hexadecimal characters."
    );
    expect(() => Schema.decodeUnknownSync(SigningKeyIdSchema)("UPPER")).toThrow(
      "Expected a lowercase wire-safe signing key identifier up to 64 characters."
    );
    expect(() =>
      Schema.decodeUnknownSync(Ed25519SignatureSchema)("invalid")
    ).toThrow(
      "Expected a canonical unpadded base64url 64-byte Ed25519 signature."
    );
    expect(() =>
      Schema.decodeUnknownSync(CorpusSourcePathSchema)("../secret.mdx")
    ).toThrow("Expected a safe relative source path below packages/corpus.");
  });
});

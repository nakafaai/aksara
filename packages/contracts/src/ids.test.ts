import { Buffer } from "node:buffer";
import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  CONTENT_KEY_MAX_LENGTH,
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

    expect(Exit.isSuccess(Schema.decodeExit(Sha256HashSchema)(sha))).toBe(true);
    expect(
      Exit.isSuccess(Schema.decodeExit(Ed25519SignatureSchema)(signature))
    ).toBe(true);
    expect(
      Exit.isFailure(Schema.decodeExit(Sha256HashSchema)("sha256:no"))
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
        Exit.isSuccess(
          Schema.decodeExit(Ed25519SignatureSchema)(
            `${"A".repeat(85)}${finalCharacter}`
          )
        )
      ).toBe(true);
    }
    expect(
      Exit.isFailure(Schema.decodeExit(Ed25519SignatureSchema)(nonCanonical))
    ).toBe(true);
  });

  it("requires full lowercase Git commit SHAs", () => {
    expect(
      Exit.isSuccess(Schema.decodeExit(GitCommitShaSchema)("c".repeat(40)))
    ).toBe(true);
    expect(
      Exit.isFailure(Schema.decodeExit(GitCommitShaSchema)("C".repeat(40)))
    ).toBe(true);
  });

  it("rejects unsafe or non-canonical wire identifiers", () => {
    for (const value of [
      "line\nbreak",
      "nul\0byte",
      "Uppercase",
      "a".repeat(CONTENT_KEY_MAX_LENGTH + 1),
    ]) {
      expect(Exit.isFailure(Schema.decodeExit(ContentKeySchema)(value))).toBe(
        true
      );
    }
    expect(
      Exit.isFailure(Schema.decodeExit(ReleaseIdSchema)("release\nnext"))
    ).toBe(true);
  });

  it("accepts canonical public paths and rejects unsafe variants", () => {
    expect(
      Exit.isSuccess(Schema.decodeExit(PublicPathSchema)("subjects/test/route"))
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
      expect(Exit.isFailure(Schema.decodeExit(PublicPathSchema)(value))).toBe(
        true
      );
    }
  });

  it("accepts only safe reviewed paths below the corpus workspace", () => {
    expect(
      Exit.isSuccess(
        Schema.decodeExit(CorpusSourcePathSchema)(
          "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx"
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
        Exit.isFailure(Schema.decodeExit(CorpusSourcePathSchema)(value))
      ).toBe(true);
    }
  });

  it("reports actionable diagnostics for each refined identifier", () => {
    expect(() => Schema.decodeSync(PublicPathSchema)("/subjects/test")).toThrow(
      "Expected a canonical slashless public path."
    );
    expect(() => Schema.decodeSync(GitCommitShaSchema)("short")).toThrow(
      "Expected a 40-character lowercase Git commit SHA."
    );
    expect(() => Schema.decodeSync(Sha256HashSchema)("invalid")).toThrow(
      "Expected sha256 followed by 64 lowercase hexadecimal characters."
    );
    expect(() => Schema.decodeSync(SigningKeyIdSchema)("UPPER")).toThrow(
      "Expected a lowercase wire-safe signing key identifier up to 64 characters."
    );
    expect(() => Schema.decodeSync(Ed25519SignatureSchema)("invalid")).toThrow(
      "Expected a canonical unpadded base64url 64-byte Ed25519 signature."
    );
    expect(() =>
      Schema.decodeSync(CorpusSourcePathSchema)("../secret.mdx")
    ).toThrow("Expected a safe relative source path below packages/corpus.");
  });
});

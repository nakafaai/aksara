import { assert, describe, expect, it } from "@effect/vitest";
import { hashUtf8 } from "#compiler/hash";

describe("hashUtf8", () => {
  it("returns the canonical SHA-256 identifier for UTF-8 text", () => {
    assert.strictEqual(
      hashUtf8("aksara"),
      "sha256:10d512e0d0ea808078e6e773ca22d06dda9c8255f557674eba033830a07a8732"
    );
  });

  it("pins the digest of non-ASCII multi-line UTF-8 text", () => {
    expect(
      hashUtf8("Pelajaran é ✓ 数学\n\n- satu\n- dua")
    ).toMatchInlineSnapshot(
      `"sha256:4f6d1d56c579dfce19f0c186e79bd9dd9ed504ccf9ec1b6048b936489a396583"`
    );
  });
});

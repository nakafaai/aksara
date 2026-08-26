import { assert, describe, it } from "@nakafa/testing/effect";
import { hashUtf8 } from "#compiler/hash";

describe("hashUtf8", () => {
  it("returns the canonical SHA-256 identifier for UTF-8 text", () => {
    assert.strictEqual(
      hashUtf8("aksara"),
      "sha256:10d512e0d0ea808078e6e773ca22d06dda9c8255f557674eba033830a07a8732"
    );
  });
});

// @vitest-environment node
import { createHash } from "node:crypto";

import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";

import { hashText } from "#contracts/hash/text";

describe("UTF-8 text hashing", () => {
  it("matches the independent Node SHA-256 implementation", async () => {
    const value = "Aksara Web Crypto hash";
    const expected = `sha256:${createHash("sha256").update(value).digest("hex")}`;

    await expect(Effect.runPromise(hashText(value))).resolves.toBe(expected);
  });

  it("maps Web Crypto failures into the typed error channel", async () => {
    const digest = vi
      .spyOn(crypto.subtle, "digest")
      .mockRejectedValueOnce(new TypeError("injected digest failure"));

    const error = await Effect.runPromise(
      hashText("failure").pipe(Effect.flip)
    );
    digest.mockRestore();

    expect(error._tag).toBe("TextHashError");
  });
});

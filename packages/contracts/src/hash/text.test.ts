// @vitest-environment node
import { createHash } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { hashText } from "#contracts/hash/text";

describe("UTF-8 text hashing", () => {
  it.effect("matches the independent Node SHA-256 implementation", () =>
    Effect.gen(function* () {
      const value = "Aksara Web Crypto hash";
      const expected = `sha256:${createHash("sha256").update(value).digest("hex")}`;

      expect(yield* hashText(value)).toBe(expected);
    })
  );

  it.effect("pins SHA-256 digests of exact UTF-8 text", () =>
    Effect.gen(function* () {
      expect(yield* hashText("")).toBe(
        "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
      );
      expect(yield* hashText("Aksara Web Crypto hash")).toBe(
        "sha256:df94be7c8547260bb1c281c2099e774bfa44bb58d8bd0f5fedfbf0e27063467e"
      );
      expect(yield* hashText("Pecahan Ñandú café 😀")).toBe(
        "sha256:6dd9e8ed6a6239806bb4601a37cc81921ff3958f5d44c16f4a6a46f42cbf4947"
      );
    })
  );

  it.effect("maps Web Crypto failures into the typed error channel", () =>
    Effect.gen(function* () {
      yield* Effect.acquireRelease(
        Effect.sync(() =>
          vi
            .spyOn(crypto.subtle, "digest")
            .mockRejectedValueOnce(new TypeError("injected digest failure"))
        ),
        (mock) => Effect.sync(() => mock.mockRestore())
      );

      const error = yield* hashText("failure").pipe(Effect.flip);

      expect(error._tag).toBe("TextHashError");
    })
  );
});

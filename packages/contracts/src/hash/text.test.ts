// @vitest-environment node
import { createHash } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { vi } from "vitest";

import { hashText } from "#contracts/hash/text";

describe("UTF-8 text hashing", () => {
  it.effect("matches the independent Node SHA-256 implementation", () =>
    Effect.gen(function* () {
      const value = "Aksara Web Crypto hash";
      const expected = `sha256:${createHash("sha256").update(value).digest("hex")}`;

      expect(yield* hashText(value)).toBe(expected);
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

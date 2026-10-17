import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { hashTryoutCanonical } from "#contracts/tryout/canonical";

describe("try-out canonical digest golden vectors", () => {
  it.effect(
    "pins the domain-separated digest of a canonical text with non-ASCII content",
    () =>
      Effect.gen(function* () {
        expect(
          yield* hashTryoutCanonical(
            "nakafa.aksara.tryout-catalog",
            '{"order":1,"title":"Matematika é"}'
          )
        ).toBe(
          "sha256:ea63659e7b50671a5fcb57af5617cfe37767d2086d98f073a0db1f9a4ab7326e"
        );
      })
  );

  it.effect("maps a failed digest into the canonical hash error", () =>
    Effect.gen(function* () {
      yield* Effect.acquireRelease(
        Effect.sync(() =>
          vi
            .spyOn(globalThis.crypto.subtle, "digest")
            .mockRejectedValueOnce(
              new TypeError("Test-only canonical digest failure.")
            )
        ),
        (mock) => Effect.sync(() => mock.mockRestore())
      );

      const error = yield* hashTryoutCanonical(
        "nakafa.aksara.tryout-test",
        "text"
      ).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "TryoutCanonicalHashError",
        domain: "nakafa.aksara.tryout-test",
      });
    })
  );

  it.effect(
    "pins the digest of an empty canonical text under another domain",
    () =>
      Effect.gen(function* () {
        expect(
          yield* hashTryoutCanonical("nakafa.aksara.tryout-placements", "")
        ).toBe(
          "sha256:19fc8b6596c4e1870e17c644b76047b3e9899fba1f94c53939102055c7d91d32"
        );
      })
  );
});

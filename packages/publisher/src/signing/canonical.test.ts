// @vitest-environment node

import { Buffer } from "node:buffer";
import { generateKeyPairSync, verify } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { signCanonicalInput } from "#publisher/signing/canonical";

// Record again: create a key, sign the same message, and replace the public key and signature literals below.
const TEST_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAu3a+EghrjGCOm5i1Glu6tpAxk2Dre1E2EXjih9y/cRw=
-----END PUBLIC KEY-----
`;
// Record again: create a key, sign the same message, and replace the public key and signature literals below.
const TEST_SIGNATURE =
  "wMdCfPfJtyflzCkDa0zuLSpoXAqkhf8aKgqmuAdmX3-rT68Lt3vgs4GHRZbrEF4R-ssBZ7Fnit9HR-HW5JhyBA";

describe("canonical Ed25519 signing", () => {
  it.effect("pins the signature of a non-ASCII domain-separated message", () =>
    Effect.gen(function* () {
      const message = 'aksara:artifact\n{"title":"Pelajaran é ✓ 数学"}';
      const { privateKey, publicKey } = yield* Effect.sync(() =>
        generateKeyPairSync("ed25519")
      );
      const signature = yield* signCanonicalInput(
        privateKey,
        message,
        "artifact"
      );
      expect(
        verify(
          null,
          Buffer.from(message, "utf8"),
          publicKey,
          Buffer.from(signature, "base64url")
        )
      ).toBe(true);
      expect(
        verify(
          null,
          Buffer.from(message, "utf8"),
          TEST_PUBLIC_KEY_PEM,
          Buffer.from(TEST_SIGNATURE, "base64url")
        )
      ).toBe(true);
      expect(
        verify(
          null,
          Buffer.from(message.replace("aksara", "bksara"), "utf8"),
          TEST_PUBLIC_KEY_PEM,
          Buffer.from(TEST_SIGNATURE, "base64url")
        )
      ).toBe(false);
    })
  );

  it.effect("fails with the requested stage when the key cannot sign", () =>
    Effect.gen(function* () {
      const { publicKey } = yield* Effect.sync(() =>
        generateKeyPairSync("ed25519")
      );
      const error = yield* signCanonicalInput(
        publicKey,
        "aksara:release",
        "release"
      ).pipe(Effect.flip);
      expect(error).toMatchObject({
        message: "Ed25519 release signing failed.",
        stage: "release",
      });
    })
  );
});

// @vitest-environment node

import { describe, expect, it } from "@effect/vitest";
import { generateEd25519KeyPem } from "@nakafa/aksara-contracts/signature/key";
import { Effect } from "effect";
import { signCanonicalInput } from "#publisher/signing/canonical";
import { verifyWithPublicKeyPem } from "#test/signing";

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
      const keyPair = yield* generateEd25519KeyPem();
      const signature = yield* signCanonicalInput(
        keyPair.privateKeyPem,
        message,
        "artifact"
      );
      expect(
        yield* verifyWithPublicKeyPem(keyPair.publicKeyPem, message, signature)
      ).toBe(true);
      expect(
        yield* verifyWithPublicKeyPem(
          TEST_PUBLIC_KEY_PEM,
          message,
          TEST_SIGNATURE
        )
      ).toBe(true);
      expect(
        yield* verifyWithPublicKeyPem(
          TEST_PUBLIC_KEY_PEM,
          message.replace("aksara", "bksara"),
          TEST_SIGNATURE
        )
      ).toBe(false);
    })
  );

  it.effect("fails with the requested stage when the key cannot sign", () =>
    Effect.gen(function* () {
      const keyPair = yield* generateEd25519KeyPem();
      const error = yield* signCanonicalInput(
        keyPair.publicKeyPem,
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

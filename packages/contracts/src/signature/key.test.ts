import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { Base64, Base64Url } from "effect/encoding";

import {
  Ed25519KeyError,
  ed25519PublicKeyBytes,
  ed25519PublicKeyPem,
  importEd25519PrivateKey,
  signEd25519,
} from "#contracts/signature/key";

/** A fixed test seed, the bytes 1 to 32. It is a fixture, not a key used anywhere. */
const SEED = Uint8Array.from({ length: 32 }, (_, index) => index + 1);
const PKCS8_ED25519_PREFIX = Uint8Array.of(
  0x30,
  0x2e,
  0x02,
  0x01,
  0x00,
  0x30,
  0x05,
  0x06,
  0x03,
  0x2b,
  0x65,
  0x70,
  0x04,
  0x22,
  0x04,
  0x20
);
const MESSAGE = new TextEncoder().encode("nakafa.aksara.test\nfixed message\n");
const SEED_PUBLIC_KEY_PEM =
  "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAebVWLo/mVPlAeLES6KmLp5AfhTrmlb7X4OORC60ElmQ=\n-----END PUBLIC KEY-----\n";
const SEED_SIGNATURE =
  "VLnwshVuHB-tD-ODyLDWUmE_Y1VoN9zQbrQvbEg2215aRtECNL3lNR3xJ2IOsV5kavi6lwgGM8zSOzzpKRwdDQ";

/** Builds the PKCS#8 PEM of the fixed seed at run time, so no key body is stored in a file. */
function seedPrivateKeyPem() {
  const der = new Uint8Array(PKCS8_ED25519_PREFIX.byteLength + SEED.byteLength);
  der.set(PKCS8_ED25519_PREFIX);
  der.set(SEED, PKCS8_ED25519_PREFIX.byteLength);
  return `-----BEGIN PRIVATE KEY-----\n${Base64.encode(der)}\n-----END PRIVATE KEY-----\n`;
}

/** Wraps DER bytes as a PKCS#8 PEM private key, for a key of another algorithm. */
function privateKeyPemOf(der: Uint8Array) {
  return `-----BEGIN PRIVATE KEY-----\n${Base64.encode(der)}\n-----END PRIVATE KEY-----\n`;
}

/** Verifies with Web Crypto alone, from the SPKI PEM that the derivation returned. */
function verifiesWithPublicKeyPem(
  publicKeyPem: string,
  signature: Uint8Array,
  message: Uint8Array
) {
  const body = publicKeyPem.split("\n").slice(1, -2).join("");
  const spki = Uint8Array.from(atob(body), (character) =>
    character.charCodeAt(0)
  );
  return Effect.promise(() =>
    crypto.subtle.importKey("spki", spki, { name: "Ed25519" }, false, [
      "verify",
    ])
  ).pipe(
    Effect.flatMap((publicKey) =>
      Effect.promise(() =>
        crypto.subtle.verify("Ed25519", publicKey, signature, message)
      )
    )
  );
}

describe("Ed25519 keys from PEM", () => {
  it.effect(
    "derives the SPKI public key that Node writes for the same seed",
    () =>
      Effect.gen(function* () {
        expect(yield* ed25519PublicKeyPem(seedPrivateKeyPem())).toBe(
          SEED_PUBLIC_KEY_PEM
        );
      })
  );

  it.effect("signs the exact bytes that Node signs for the same seed", () =>
    Effect.gen(function* () {
      const key = yield* importEd25519PrivateKey(seedPrivateKeyPem());
      const signature = yield* signEd25519(key, MESSAGE);

      expect(Base64Url.encode(signature)).toBe(SEED_SIGNATURE);
      expect(
        yield* verifiesWithPublicKeyPem(SEED_PUBLIC_KEY_PEM, signature, MESSAGE)
      ).toBe(true);
    })
  );

  it.effect("rejects text that is not an unencrypted PKCS#8 PEM", () =>
    Effect.gen(function* () {
      const error = yield* importEd25519PrivateKey("not a key").pipe(
        Effect.flip
      );

      expect(error).toBeInstanceOf(Ed25519KeyError);
      expect(error.stage).toBe("import");
    })
  );

  it.effect("rejects a PEM body that is not base64", () =>
    Effect.gen(function* () {
      const error = yield* importEd25519PrivateKey(
        "-----BEGIN PRIVATE KEY-----\n!!!\n-----END PRIVATE KEY-----\n"
      ).pipe(Effect.flip);

      expect(error.stage).toBe("import");
    })
  );

  it.effect("rejects a PKCS#8 key of another algorithm", () =>
    Effect.gen(function* () {
      const pair = yield* Effect.promise(() =>
        crypto.subtle.generateKey(
          { name: "ECDSA", namedCurve: "P-256" },
          true,
          ["sign", "verify"]
        )
      );
      const der = yield* Effect.promise(() =>
        crypto.subtle.exportKey("pkcs8", pair.privateKey)
      );
      const error = yield* importEd25519PrivateKey(
        privateKeyPemOf(new Uint8Array(der))
      ).pipe(Effect.flip);

      expect(error.stage).toBe("import");
    })
  );

  it.effect("fails the derivation when Web Crypto refuses the export", () =>
    Effect.gen(function* () {
      yield* Effect.acquireRelease(
        Effect.sync(() =>
          vi
            .spyOn(crypto.subtle, "exportKey")
            .mockRejectedValueOnce(new TypeError("injected export failure"))
        ),
        (mock) => Effect.sync(() => mock.mockRestore())
      );

      const error = yield* ed25519PublicKeyPem(seedPrivateKeyPem()).pipe(
        Effect.flip
      );

      expect(error.stage).toBe("derive");
    })
  );

  it.effect("reads the 32 public-key bytes from a JSON Web Key", () =>
    Effect.gen(function* () {
      const x = Base64Url.encode(SEED);
      const bytes = yield* ed25519PublicKeyBytes(x);

      expect(Base64Url.encode(bytes)).toBe(x);
    })
  );

  it.effect("rejects a JSON Web Key without a usable public key", () =>
    Effect.gen(function* () {
      const missing = yield* ed25519PublicKeyBytes(undefined).pipe(Effect.flip);
      const notBase64Url = yield* ed25519PublicKeyBytes("!!!").pipe(
        Effect.flip
      );
      const wrongLength = yield* ed25519PublicKeyBytes(
        Base64Url.encode(new Uint8Array(31))
      ).pipe(Effect.flip);

      expect(missing.stage).toBe("derive");
      expect(notBase64Url.stage).toBe("derive");
      expect(wrongLength.stage).toBe("derive");
    })
  );

  it.effect("maps a rejected Web Crypto signature into the sign stage", () =>
    Effect.gen(function* () {
      const key = yield* importEd25519PrivateKey(seedPrivateKeyPem());
      yield* Effect.acquireRelease(
        Effect.sync(() =>
          vi
            .spyOn(crypto.subtle, "sign")
            .mockRejectedValueOnce(new TypeError("injected signing failure"))
        ),
        (mock) => Effect.sync(() => mock.mockRestore())
      );

      const error = yield* signEd25519(key, MESSAGE).pipe(Effect.flip);

      expect(error.stage).toBe("sign");
    })
  );
});

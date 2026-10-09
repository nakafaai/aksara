import { createHash, createPublicKey, type KeyObject } from "node:crypto";
import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Effect, HashSet, Redacted } from "effect";
import {
  makePreviewCredentials,
  type PreviewCredentials,
} from "#cli/credentials";

const cryptoControl = vi.hoisted(() => ({
  generatedPublicKey: undefined as KeyObject | undefined,
  mode: "normal" as "generate-failure" | "normal" | "rsa",
}));
type CryptoMode = typeof cryptoControl.mode;
const LOCAL_KEY_ID_PATTERN = /^local-[a-f0-9]{24}$/u;
/** Resolves to true only when the two types are identical. */
type Equals<A, B> =
  (<X>() => X extends A ? 1 : 2) extends <X>() => X extends B ? 1 : 2
    ? true
    : false;
/** Resolves to true only when the property is declared read-only. */
type IsReadonly<T, K extends keyof T> = Equals<
  Pick<T, K>,
  Readonly<Pick<T, K>>
>;

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects generation and wrong-key failures at the real crypto boundary. */
    generateKeyPairSync(algorithm: string) {
      if (cryptoControl.mode === "generate-failure") {
        throw new TypeError("Test-only key generation failure.");
      }
      if (cryptoControl.mode === "rsa") {
        return crypto.generateKeyPairSync("rsa", { modulusLength: 1024 });
      }
      if (algorithm !== "ed25519") {
        throw new TypeError("Test requested an unexpected key algorithm.");
      }
      const keyPair = crypto.generateKeyPairSync("ed25519");
      cryptoControl.generatedPublicKey = keyPair.publicKey;
      return keyPair;
    },
  };
});

/** Scopes one crypto fault mode and restores the preceding mode on every exit. */
const setCryptoMode = Effect.fn("test.credentials.setCryptoMode")(
  (mode: CryptoMode) =>
    Effect.acquireRelease(
      Effect.sync(() => {
        const previous = cryptoControl.mode;
        cryptoControl.mode = mode;
        return previous;
      }),
      (previous) =>
        Effect.sync(() => {
          cryptoControl.mode = previous;
        })
    )
);

describe("preview credentials", () => {
  it("keeps the key identity and the renderer token read-only", () => {
    expectTypeOf<
      IsReadonly<PreviewCredentials, "keyId">
    >().toEqualTypeOf<true>();
    expectTypeOf<
      IsReadonly<PreviewCredentials["renderer"], "token">
    >().toEqualTypeOf<true>();
  });

  it.effect(
    "creates unique identities and independent preview credentials",
    () =>
      Effect.gen(function* () {
        const [first, second] = yield* Effect.all(
          [makePreviewCredentials(), makePreviewCredentials()],
          { concurrency: "unbounded" }
        );

        expect(first.keyId).toMatch(LOCAL_KEY_ID_PATTERN);
        expect(first.keyId).not.toBe(second.keyId);
        const firstSecrets = [
          Redacted.value(first.contentRuntimeToken),
          Redacted.value(first.internalContentToken),
          Redacted.value(first.providerToken),
          Redacted.value(first.renderer.secret),
          Redacted.value(first.renderer.token),
        ];
        const secondSecrets = [
          Redacted.value(second.contentRuntimeToken),
          Redacted.value(second.internalContentToken),
          Redacted.value(second.providerToken),
          Redacted.value(second.renderer.secret),
          Redacted.value(second.renderer.token),
        ];
        expect(firstSecrets).toHaveLength(
          HashSet.size(HashSet.fromIterable(firstSecrets))
        );
        expect([...firstSecrets, ...secondSecrets]).toHaveLength(
          HashSet.size(
            HashSet.fromIterable([...firstSecrets, ...secondSecrets])
          )
        );
        expect(firstSecrets.every((value) => value.length === 43)).toBe(true);
        expect(createPublicKey(first.publicKeyPem).asymmetricKeyType).toBe(
          "ed25519"
        );
        expect(first.publicKeyPem).not.toContain("PRIVATE KEY");
      })
  );

  it.effect("derives the key identity from the generated public key", () =>
    Effect.gen(function* () {
      const credentials = yield* makePreviewCredentials();
      const { generatedPublicKey } = cryptoControl;

      expect(credentials.publicKeyPem).toBe(
        generatedPublicKey?.export({ format: "pem", type: "spki" }).toString()
      );
      // The documented derivation: "local-" plus the first 24 hex digits of the SHA-256 of the SPKI PEM text.
      expect(credentials.keyId).toBe(
        `local-${createHash("sha256").update(credentials.publicKeyPem).digest("hex").slice(0, 24)}`
      );
    })
  );

  it.effect.each([
    ["generate-failure", "generate"],
    ["rsa", "signer"],
  ] as const)("maps %s to a typed credential stage", ([mode, stage]) =>
    Effect.gen(function* () {
      yield* setCryptoMode(mode);
      const error = yield* makePreviewCredentials().pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "PreviewCredentialError",
        stage,
      });
    })
  );
});

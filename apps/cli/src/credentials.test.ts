import { createPublicKey } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Redacted } from "effect";
import { makePreviewCredentials } from "#cli/credentials";

const cryptoControl = vi.hoisted(() => ({
  mode: "normal" as "generate-failure" | "normal" | "rsa",
}));
type CryptoMode = typeof cryptoControl.mode;
const LOCAL_KEY_ID_PATTERN = /^local-[a-f0-9]{24}$/u;

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
      return crypto.generateKeyPairSync("ed25519");
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
        expect(firstSecrets).toHaveLength(new Set(firstSecrets).size);
        expect([...firstSecrets, ...secondSecrets]).toHaveLength(
          new Set([...firstSecrets, ...secondSecrets]).size
        );
        expect(firstSecrets.every((value) => value.length === 43)).toBe(true);
        expect(createPublicKey(first.publicKeyPem).asymmetricKeyType).toBe(
          "ed25519"
        );
        expect(first.publicKeyPem).not.toContain("PRIVATE KEY");
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

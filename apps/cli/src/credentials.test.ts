import { createPublicKey } from "node:crypto";
import { Effect, Redacted } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import { makePreviewCredentials } from "#cli/credentials";

const cryptoControl = vi.hoisted(() => ({
  mode: "normal" as "generate-failure" | "normal" | "rsa",
}));
const LOCAL_KEY_ID_PATTERN = /^local-[a-f0-9]{24}$/u;

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects generation and wrong-key failures at the real crypto boundary. */
    generateKeyPairSync(algorithm: string) {
      if (cryptoControl.mode === "generate-failure") {
        throw new Error("Test-only key generation failure.");
      }
      if (cryptoControl.mode === "rsa") {
        return crypto.generateKeyPairSync("rsa", { modulusLength: 1024 });
      }
      if (algorithm !== "ed25519") {
        throw new Error("Test requested an unexpected key algorithm.");
      }
      return crypto.generateKeyPairSync("ed25519");
    },
  };
});

afterEach(() => {
  cryptoControl.mode = "normal";
});

describe("preview credentials", () => {
  it("creates unique ephemeral Ed25519 identities and bearer tokens", async () => {
    const [first, second] = await Promise.all([
      Effect.runPromise(makePreviewCredentials()),
      Effect.runPromise(makePreviewCredentials()),
    ]);

    expect(first.keyId).toMatch(LOCAL_KEY_ID_PATTERN);
    expect(first.keyId).not.toBe(second.keyId);
    expect(Redacted.value(first.token)).toHaveLength(43);
    expect(Redacted.value(first.token)).not.toBe(Redacted.value(second.token));
    expect(createPublicKey(first.publicKeyPem).asymmetricKeyType).toBe(
      "ed25519"
    );
    expect(first.publicKeyPem).not.toContain("PRIVATE KEY");
  });

  it.each([
    ["generate-failure", "generate"],
    ["rsa", "signer"],
  ] as const)("maps %s to a typed credential stage", async (mode, stage) => {
    cryptoControl.mode = mode;
    const error = await Effect.runPromise(
      makePreviewCredentials().pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "PreviewCredentialError",
      stage,
    });
  });
});

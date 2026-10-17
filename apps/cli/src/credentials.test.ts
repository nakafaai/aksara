import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { hashText } from "@nakafa/aksara-contracts/hash/text";
import { Array as Arr, Effect, HashSet, Redacted } from "effect";
import { Base64, Hex } from "effect/encoding";
import {
  makePreviewCredentials,
  type PreviewCredentials,
} from "#cli/credentials";

const LOCAL_KEY_ID_PATTERN = /^local-[a-f0-9]{24}$/u;
/** Ed25519 SubjectPublicKeyInfo DER prefix, which precedes the 32 key bytes. */
const ED25519_SPKI_PREFIX = "302a300506032b6570032100";
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

/** Scopes one rejected importKey call, which the first key import of credential creation makes. */
const failFirstImport = Effect.acquireRelease(
  Effect.sync(() =>
    vi
      .spyOn(globalThis.crypto.subtle, "importKey")
      .mockRejectedValueOnce(new TypeError("Test-only key generation failure."))
  ),
  () => Effect.sync(() => vi.restoreAllMocks())
);

/** Scopes one importKey fault so the second key import of credential creation fails. */
const failSignerImport = Effect.acquireRelease(
  Effect.sync(() => {
    let imports = 0;
    const realImportKey = globalThis.crypto.subtle.importKey.bind(
      globalThis.crypto.subtle
    );
    return vi
      .spyOn(globalThis.crypto.subtle, "importKey")
      .mockImplementation((...parameters) => {
        imports += 1;
        if (imports === 2) {
          return Promise.reject(
            new TypeError("Test-only signer import failure.")
          );
        }
        return realImportKey(...parameters);
      });
  }),
  () => Effect.sync(() => vi.restoreAllMocks())
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
        expect(Arr.every(firstSecrets, (value) => value.length === 43)).toBe(
          true
        );
        const spki = yield* Effect.fromResult(
          Base64.decode(first.publicKeyPem.replace(/-----[^-]+-----|\s/gu, ""))
        );
        expect(Hex.encode(spki.slice(0, 12))).toBe(ED25519_SPKI_PREFIX);
        expect(first.publicKeyPem).not.toContain("PRIVATE KEY");
      })
  );

  it.effect("maps a rejected public key digest to the generate stage", () =>
    Effect.gen(function* () {
      yield* Effect.acquireRelease(
        Effect.sync(() =>
          vi
            .spyOn(globalThis.crypto.subtle, "digest")
            .mockRejectedValueOnce(
              new TypeError("Test-only public key digest failure.")
            )
        ),
        () => Effect.sync(() => vi.restoreAllMocks())
      );
      const error = yield* makePreviewCredentials().pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "PreviewCredentialError",
        stage: "generate",
      });
    })
  );

  it.effect("derives the key identity from the generated public key", () =>
    Effect.gen(function* () {
      const credentials = yield* makePreviewCredentials();
      const digest = yield* hashText(credentials.publicKeyPem);

      // The documented derivation: "local-" plus the first 24 hex digits of the SHA-256 of the SPKI PEM text.
      expect(credentials.keyId).toBe(
        `local-${digest.slice("sha256:".length, "sha256:".length + 24)}`
      );
    })
  );

  it.effect("maps a rejected key import to the generate stage", () =>
    Effect.gen(function* () {
      yield* failFirstImport;
      const error = yield* makePreviewCredentials().pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "PreviewCredentialError",
        stage: "generate",
      });
    })
  );

  it.effect("maps a rejected signer import to the signer stage", () =>
    Effect.gen(function* () {
      yield* failSignerImport;
      const error = yield* makePreviewCredentials().pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "PreviewCredentialError",
        stage: "signer",
      });
    })
  );
});

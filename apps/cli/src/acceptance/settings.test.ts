import { createPublicKey, generateKeyPairSync } from "node:crypto";
import { NodeServices } from "@effect/platform-node";
import { describe, expect, it, layer } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { ConfigProvider, Effect, FileSystem, Path, Redacted } from "effect";
import {
  AcceptanceEnvironmentError,
  decodeAcceptanceEndpoint,
  readAcceptanceRenderer,
  readAcceptanceSettings,
} from "#cli/acceptance/settings";
import { RENDERER_MANIFEST } from "#test/real";

const endpoint = "http://127.0.0.1:3210/internal/content/releases";

/** Creates test-owned files and a private config provider for acceptance reads. */
const makeFixture = Effect.fn("AcceptanceSettingsTest.makeFixture")(
  function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const directory = yield* fs.makeTempDirectoryScoped({
      prefix: "aksara-acceptance-settings-test-",
    });
    const privateKeyPem = yield* Effect.sync(() =>
      generateKeyPairSync("ed25519")
        .privateKey.export({ format: "pem", type: "pkcs8" })
        .toString()
    );
    const privateKeyPath = path.join(directory, "signer.pem");
    const rendererPath = path.join(directory, "renderer.json");
    yield* fs.writeFileString(privateKeyPath, privateKeyPem);
    yield* fs.writeFileString(rendererPath, JSON.stringify(RENDERER_MANIFEST));
    return {
      fs,
      privateKeyPath,
      privateKeyPem,
      rendererPath,
      values: {
        AKSARA_ACCEPTANCE_ENDPOINT: endpoint,
        AKSARA_ACCEPTANCE_PRIVATE_KEY: privateKeyPath,
        AKSARA_ACCEPTANCE_RENDERER: rendererPath,
        AKSARA_ACCEPTANCE_REVISION: "a".repeat(40),
        AKSARA_ACCEPTANCE_SOURCE: directory,
        AKSARA_AGENT_SIGNING_KEY_ID: "test-acceptance-key",
        AKSARA_PUBLICATION_TOKEN: "test-acceptance-token",
      },
    };
  }
);

/** Reads settings through an isolated provider without inheriting process secrets. */
const readSettings = Effect.fn("AcceptanceSettingsTest.readSettings")(
  (values: Effect.Success<ReturnType<typeof makeFixture>>["values"]) =>
    readAcceptanceSettings().pipe(
      Effect.provideService(
        ConfigProvider.ConfigProvider,
        ConfigProvider.fromUnknown(values)
      )
    )
);

describe("acceptance ingress endpoint", () => {
  it.effect(
    "accepts the exact loopback publication route and explicit port",
    () =>
      Effect.gen(function* () {
        expect((yield* decodeAcceptanceEndpoint(endpoint)).href).toBe(endpoint);
      })
  );
  it.effect.each([
    "invalid-url",
    "https://127.0.0.1:3210/internal/content/releases",
    "http://example.test:3210/internal/content/releases",
    "http://localhost:3210/internal/content/releases",
    "http://127.0.0.1/internal/content/releases",
    "http://127.0.0.1:3210/internal/content/releases/",
    "http://user@127.0.0.1:3210/internal/content/releases",
    "http://:password@127.0.0.1:3210/internal/content/releases",
    `${endpoint}?redirect=remote`,
    `${endpoint}#fragment`,
  ])("rejects unsafe or ambiguous ingress %s", (value) =>
    Effect.gen(function* () {
      const error = yield* decodeAcceptanceEndpoint(value).pipe(Effect.flip);
      expect(error).toBeInstanceOf(AcceptanceEnvironmentError);
      expect(error).toMatchObject({ reason: "endpoint" });
    })
  );
});

layer(NodeServices.layer)("acceptance environment", (test) => {
  test.effect(
    "derives exact release identities and retains signer and token redaction",
    () =>
      Effect.gen(function* () {
        const fixture = yield* makeFixture();
        const settings = yield* readSettings(fixture.values);
        expect(settings).toMatchObject({
          checkoutRoot: fixture.values.AKSARA_ACCEPTANCE_SOURCE,
          recoveryId: "acceptance-inverse-aaaaaaaaaaaa",
          releaseId: "acceptance-aaaaaaaaaaaa",
          rendererPath: fixture.rendererPath,
          revision: fixture.values.AKSARA_ACCEPTANCE_REVISION,
        });
        expect(settings.endpoint.href).toBe(endpoint);
        expect(settings.key).toEqual({
          keyId: "test-acceptance-key",
          publicKeyPem: createPublicKey(fixture.privateKeyPem)
            .export({ format: "pem", type: "spki" })
            .toString(),
        });
        expect(Redacted.value(settings.privateKeyPem)).toBe(
          fixture.privateKeyPem
        );
        expect(Redacted.value(settings.token)).toBe("test-acceptance-token");
        expect(JSON.stringify(settings)).not.toContain("PRIVATE KEY");
        expect(JSON.stringify(settings)).not.toContain("test-acceptance-token");
        expect(yield* readAcceptanceRenderer(settings.rendererPath)).toEqual(
          RENDERER_MANIFEST
        );
      })
  );

  test.effect.each(["malformed-key", "invalid-key-id"])(
    "rejects %s through the signer contract",
    (failure) =>
      Effect.gen(function* () {
        const fixture = yield* makeFixture();
        if (failure === "malformed-key") {
          yield* fixture.fs.writeFileString(
            fixture.privateKeyPath,
            "test-not-a-private-key"
          );
        }
        const values = {
          ...fixture.values,
          ...(failure === "invalid-key-id"
            ? { AKSARA_AGENT_SIGNING_KEY_ID: "INVALID KEY" }
            : {}),
        };
        const error = yield* readSettings(values).pipe(Effect.flip);
        expect(error).toBeInstanceOf(AcceptanceEnvironmentError);
        expect(error).toMatchObject({ reason: "signer" });
      })
  );

  test.effect.each([
    "missing",
    "invalid-json",
    "invalid-contract",
    "changed-hash",
  ])("rejects %s renderer evidence", (failure) =>
    Effect.gen(function* () {
      const fixture = yield* makeFixture();
      if (failure === "missing") {
        yield* fixture.fs.remove(fixture.rendererPath);
      } else {
        const text =
          failure === "invalid-json"
            ? "{"
            : JSON.stringify(
                failure === "invalid-contract"
                  ? {}
                  : {
                      ...RENDERER_MANIFEST,
                      hash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
                    }
              );
        yield* fixture.fs.writeFileString(fixture.rendererPath, text);
      }
      const error = yield* readAcceptanceRenderer(fixture.rendererPath).pipe(
        Effect.flip
      );
      expect(error).toBeInstanceOf(AcceptanceEnvironmentError);
      expect(error).toMatchObject({ reason: "renderer" });
    })
  );
});

import { createPublicKey, generateKeyPairSync } from "node:crypto";
import { Cause, ConfigError, ConfigProvider, Effect, Redacted } from "effect";
import { describe, expect, it } from "vitest";
import {
  decodePreviewEnvironment,
  readPreviewEnvironment,
  readProductionEnvironment,
  readPublicationEnvironment,
  readRecoveryEnvironment,
} from "#cli/env";

const privateKeyPem = generateKeyPairSync("ed25519")
  .privateKey.export({
    format: "pem",
    type: "pkcs8",
  })
  .toString();
const productionValues = new Map([
  ["AKSARA_PUBLICATION_ENDPOINT", "https://content.example.test/api/publish"],
  ["AKSARA_PUBLICATION_TOKEN", "publication-token"],
  [
    "AKSARA_RENDERER_ENDPOINT",
    "https://www.example.test/api/internal/content/renderer",
  ],
  ["AKSARA_RENDERER_TOKEN", "renderer-token"],
  ["AKSARA_SIGNING_KEY_ID", "production-2026"],
  ["AKSARA_SIGNING_PRIVATE_KEY", privateKeyPem],
]);
const publicationValues = new Map(
  [...productionValues].filter(([variable]) =>
    variable.startsWith("AKSARA_PUBLICATION_")
  )
);

/** Runs one Config-backed program through an isolated test provider. */
function provideConfig<A, E>(
  program: Effect.Effect<A, E>,
  values: ReadonlyMap<string, string>
) {
  return Effect.runPromise(
    program.pipe(
      Effect.withConfigProvider(ConfigProvider.fromMap(new Map(values)))
    )
  );
}

/** Returns one sanitized production configuration failure. */
function rejectProduction(values: ReadonlyMap<string, string>) {
  return provideConfig(
    Effect.gen(function* () {
      const recovery = yield* readRecoveryEnvironment();
      return yield* readProductionEnvironment(recovery);
    }).pipe(Effect.flip),
    values
  );
}

/** Returns one sanitized publication configuration failure. */
function rejectPublication(values: ReadonlyMap<string, string>) {
  return provideConfig(readPublicationEnvironment().pipe(Effect.flip), values);
}

describe("preview environment", () => {
  it("decodes absent and explicit Nakafa checkout paths", async () => {
    await expect(
      Effect.runPromise(decodePreviewEnvironment({}))
    ).resolves.toEqual({});
    await expect(
      Effect.runPromise(
        decodePreviewEnvironment({ NAKAFA_APP_DIR: "/code/nakafa.com" })
      )
    ).resolves.toEqual({ nakafaAppDir: "/code/nakafa.com" });
  });

  it.each(["", "   "])("rejects invalid override %j", async (value) => {
    const error = await Effect.runPromise(
      decodePreviewEnvironment({ NAKAFA_APP_DIR: value }).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PreviewEnvironmentError",
      variable: "NAKAFA_APP_DIR",
    });
  });

  it("reads absent and approved overrides through Effect Config", async () => {
    await expect(
      provideConfig(readPreviewEnvironment(), new Map())
    ).resolves.toEqual({});
    await expect(
      provideConfig(
        readPreviewEnvironment(),
        new Map([["NAKAFA_APP_DIR", "/code/explicit-nakafa"]])
      )
    ).resolves.toEqual({ nakafaAppDir: "/code/explicit-nakafa" });
  });

  it("sanitizes configuration-provider failures", async () => {
    const empty = ConfigProvider.fromMap(new Map());
    const unavailable = ConfigProvider.make({
      flattened: empty.flattened,
      load: () =>
        Effect.fail(
          ConfigError.SourceUnavailable(
            [],
            "Test-only unavailable provider.",
            Cause.empty
          )
        ),
    });
    const error = await Effect.runPromise(
      readPreviewEnvironment().pipe(
        Effect.withConfigProvider(unavailable),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "PreviewEnvironmentError",
      variable: "NAKAFA_APP_DIR",
    });
  });
});

describe("production environment", () => {
  it("loads only the endpoint and token shared by lifecycle commands", async () => {
    const environment = await provideConfig(
      readPublicationEnvironment(),
      publicationValues
    );

    expect(environment.publicationEndpoint.href).toBe(
      "https://content.example.test/api/publish"
    );
    expect(Redacted.value(environment.publicationToken)).toBe(
      "publication-token"
    );
    expect(environment).not.toHaveProperty("rendererEndpoint");
    expect(environment).not.toHaveProperty("privateKeyPem");
    expect(JSON.stringify(environment)).not.toContain("publication-token");
  });

  it.each([
    ["AKSARA_PUBLICATION_ENDPOINT", undefined],
    ["AKSARA_PUBLICATION_ENDPOINT", "http://content.example.test/publish"],
    ["AKSARA_PUBLICATION_TOKEN", "contains whitespace"],
  ] as const)(
    "rejects unsafe publication %s configuration",
    async (variable, value) => {
      const values = new Map(publicationValues);
      if (value === undefined) {
        values.delete(variable);
      } else {
        values.set(variable, value);
      }
      await expect(rejectPublication(values)).resolves.toMatchObject({
        _tag: "ProductionEnvironmentError",
        variable,
      });
    }
  );

  it("loads HTTPS endpoints and keeps every credential redacted", async () => {
    const environment = await provideConfig(
      Effect.gen(function* () {
        const recovery = yield* readRecoveryEnvironment();
        return yield* readProductionEnvironment(recovery);
      }),
      productionValues
    );

    expect(environment.publicationEndpoint.href).toBe(
      "https://content.example.test/api/publish"
    );
    expect(environment.rendererEndpoint.href).toBe(
      "https://www.example.test/api/internal/content/renderer"
    );
    expect(environment.keyId).toBe("production-2026");
    expect(Redacted.value(environment.publicationToken)).toBe(
      "publication-token"
    );
    expect(Redacted.value(environment.rendererToken)).toBe("renderer-token");
    expect(Redacted.value(environment.privateKeyPem)).toBe(privateKeyPem);
    expect(environment.derivedPublicKeyPem).toBe(
      createPublicKey(privateKeyPem)
        .export({ format: "pem", type: "spki" })
        .toString()
    );
    expect(JSON.stringify(environment)).not.toContain("publication-token");
    expect(JSON.stringify(environment)).not.toContain("PRIVATE KEY");
  });

  it.each([
    ["AKSARA_PUBLICATION_ENDPOINT", undefined],
    ["AKSARA_PUBLICATION_ENDPOINT", "http://content.example.test/publish"],
    [
      "AKSARA_PUBLICATION_ENDPOINT",
      "https://user@content.example.test/publish",
    ],
    [
      "AKSARA_PUBLICATION_ENDPOINT",
      "https://content.example.test/publish?secret=value",
    ],
    ["AKSARA_RENDERER_ENDPOINT", "https://www.example.test/renderer#fragment"],
    ["AKSARA_PUBLICATION_TOKEN", "contains whitespace"],
    ["AKSARA_RENDERER_TOKEN", ""],
    ["AKSARA_SIGNING_KEY_ID", "INVALID"],
    ["AKSARA_SIGNING_PRIVATE_KEY", "not-a-pem"],
    [
      "AKSARA_SIGNING_PRIVATE_KEY",
      generateKeyPairSync("rsa", { modulusLength: 1024 })
        .privateKey.export({ format: "pem", type: "pkcs8" })
        .toString(),
    ],
    [
      "AKSARA_SIGNING_PRIVATE_KEY",
      "-----BEGIN PRIVATE KEY-----\ninvalid\n-----END PRIVATE KEY-----",
    ],
  ] as const)("rejects unsafe %s configuration", async (variable, value) => {
    const values = new Map(productionValues);
    if (value === undefined) {
      values.delete(variable);
    } else {
      values.set(variable, value);
    }
    await expect(rejectProduction(values)).resolves.toMatchObject({
      _tag: "ProductionEnvironmentError",
      variable,
    });
  });
});

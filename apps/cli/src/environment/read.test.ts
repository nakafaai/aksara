import { createPublicKey, generateKeyPairSync } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { ConfigProvider, Effect, Redacted } from "effect";
import {
  decodePreviewEnvironment,
  readPreviewEnvironment,
  readProductionEnvironment,
  readPublicationEnvironment,
  readRecoveryEnvironment,
} from "#cli/environment/read";

/** Builds isolated valid production and publication configuration values. */
function makeEnvironmentFixture() {
  return Effect.sync(() => {
    const privateKeyPem = generateKeyPairSync("ed25519")
      .privateKey.export({
        format: "pem",
        type: "pkcs8",
      })
      .toString();
    const productionValues = new Map([
      [
        "AKSARA_PUBLICATION_ENDPOINT",
        "https://content.example.test/api/publish",
      ],
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

    return { privateKeyPem, productionValues, publicationValues };
  });
}

/** Provides one Config-backed program with an isolated test provider. */
function provideConfig<A, E>(
  program: Effect.Effect<A, E>,
  values: ReadonlyMap<string, string>
) {
  return program.pipe(
    Effect.provideService(
      ConfigProvider.ConfigProvider,
      ConfigProvider.fromUnknown(Object.fromEntries(values), {
        preserveEmptyStrings: true,
      })
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
  it.effect("decodes absent and explicit Nakafa checkout paths", () =>
    Effect.gen(function* () {
      expect(yield* decodePreviewEnvironment({})).toEqual({});
      expect(
        yield* decodePreviewEnvironment({
          NAKAFA_APP_DIR: "/code/nakafa.com",
        })
      ).toEqual({ nakafaAppDir: "/code/nakafa.com" });
    })
  );

  it.effect.each(["", "   "])("rejects invalid override %j", (value) =>
    Effect.gen(function* () {
      const error = yield* decodePreviewEnvironment({
        NAKAFA_APP_DIR: value,
      }).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "PreviewEnvironmentError",
        variable: "NAKAFA_APP_DIR",
      });
    })
  );

  it.effect("reads absent and approved overrides through Effect Config", () =>
    Effect.gen(function* () {
      expect(yield* provideConfig(readPreviewEnvironment(), new Map())).toEqual(
        {}
      );
      expect(
        yield* provideConfig(
          readPreviewEnvironment(),
          new Map([["NAKAFA_APP_DIR", "/code/explicit-nakafa"]])
        )
      ).toEqual({ nakafaAppDir: "/code/explicit-nakafa" });
    })
  );

  it.effect("sanitizes configuration-provider failures", () =>
    Effect.gen(function* () {
      const unavailable = ConfigProvider.make(() =>
        Effect.fail(
          new ConfigProvider.SourceError({
            message: "Test-only unavailable provider.",
          })
        )
      );
      const error = yield* readPreviewEnvironment().pipe(
        Effect.provideService(ConfigProvider.ConfigProvider, unavailable),
        Effect.flip
      );

      expect(error).toMatchObject({
        _tag: "PreviewEnvironmentError",
        variable: "NAKAFA_APP_DIR",
      });
    })
  );
});

describe("production environment", () => {
  it.effect(
    "loads only the endpoint and token shared by lifecycle commands",
    () =>
      Effect.gen(function* () {
        const { publicationValues } = yield* makeEnvironmentFixture();
        const environment = yield* provideConfig(
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
      })
  );

  it.effect.each([
    ["AKSARA_PUBLICATION_ENDPOINT", undefined],
    ["AKSARA_PUBLICATION_ENDPOINT", "http://content.example.test/publish"],
    ["AKSARA_PUBLICATION_TOKEN", "contains whitespace"],
  ] as const)(
    "rejects unsafe publication %s configuration",
    ([variable, value]) =>
      Effect.gen(function* () {
        const { publicationValues } = yield* makeEnvironmentFixture();
        const values = new Map(publicationValues);
        if (value === undefined) {
          values.delete(variable);
        } else {
          values.set(variable, value);
        }

        expect(yield* rejectPublication(values)).toMatchObject({
          _tag: "ProductionEnvironmentError",
          variable,
        });
      })
  );

  it.effect("loads HTTPS endpoints and keeps every credential redacted", () =>
    Effect.gen(function* () {
      const { privateKeyPem, productionValues } =
        yield* makeEnvironmentFixture();
      const environment = yield* provideConfig(
        Effect.gen(function* () {
          const recovery = yield* readRecoveryEnvironment();
          return yield* readProductionEnvironment(recovery);
        }),
        productionValues
      );
      const derivedPublicKeyPem = yield* Effect.sync(() =>
        createPublicKey(privateKeyPem)
          .export({ format: "pem", type: "spki" })
          .toString()
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
      expect(environment.derivedPublicKeyPem).toBe(derivedPublicKeyPem);
      expect(JSON.stringify(environment)).not.toContain("publication-token");
      expect(JSON.stringify(environment)).not.toContain("PRIVATE KEY");
    })
  );

  it.effect.each([
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
      "-----BEGIN PRIVATE KEY-----\ninvalid\n-----END PRIVATE KEY-----",
    ],
  ] as const)("rejects unsafe %s configuration", ([variable, value]) =>
    Effect.gen(function* () {
      const { productionValues } = yield* makeEnvironmentFixture();
      const values = new Map(productionValues);
      if (value === undefined) {
        values.delete(variable);
      } else {
        values.set(variable, value);
      }

      expect(yield* rejectProduction(values)).toMatchObject({
        _tag: "ProductionEnvironmentError",
        variable,
      });
    })
  );

  it.effect("rejects a non-Ed25519 signing key", () =>
    Effect.gen(function* () {
      const { productionValues } = yield* makeEnvironmentFixture();
      const rsaPrivateKeyPem = yield* Effect.sync(() =>
        generateKeyPairSync("rsa", { modulusLength: 1024 })
          .privateKey.export({ format: "pem", type: "pkcs8" })
          .toString()
      );
      const values = new Map(productionValues);
      values.set("AKSARA_SIGNING_PRIVATE_KEY", rsaPrivateKeyPem);

      expect(yield* rejectProduction(values)).toMatchObject({
        _tag: "ProductionEnvironmentError",
        variable: "AKSARA_SIGNING_PRIVATE_KEY",
      });
    })
  );
});

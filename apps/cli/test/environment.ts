import { generateKeyPairSync } from "node:crypto";
import { ConfigProvider, Effect, MutableHashMap, Record as Rec } from "effect";
import {
  readProductionEnvironment,
  readPublicationEnvironment,
  readRecoveryEnvironment,
} from "#cli/environment/read";

/** Builds isolated valid production and publication configuration values. */
export const makeEnvironmentFixture = Effect.sync(() => {
  const privateKeyPem = generateKeyPairSync("ed25519")
    .privateKey.export({
      format: "pem",
      type: "pkcs8",
    })
    .toString();
  const productionValues = MutableHashMap.fromIterable([
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
  const publicationValues = MutableHashMap.fromIterable(
    [...productionValues].filter(([variable]) =>
      variable.startsWith("AKSARA_PUBLICATION_")
    )
  );
  return { privateKeyPem, productionValues, publicationValues };
});

/** Provides one Config-backed program with an isolated test provider. */
export function provideConfig<A, E>(
  program: Effect.Effect<A, E>,
  values: MutableHashMap.MutableHashMap<string, string>
) {
  return program.pipe(
    Effect.provideService(
      ConfigProvider.ConfigProvider,
      ConfigProvider.fromUnknown(Rec.fromEntries(values), {
        preserveEmptyStrings: true,
      })
    )
  );
}

/** Returns one sanitized production configuration failure. */
export function rejectProduction(
  values: MutableHashMap.MutableHashMap<string, string>
) {
  return provideConfig(
    Effect.gen(function* () {
      const recovery = yield* readRecoveryEnvironment();
      return yield* readProductionEnvironment(recovery);
    }).pipe(Effect.flip),
    values
  );
}

/** Returns one sanitized publication configuration failure. */
export function rejectPublication(
  values: MutableHashMap.MutableHashMap<string, string>
) {
  return provideConfig(
    readPublicationEnvironment("production").pipe(Effect.flip),
    values
  );
}

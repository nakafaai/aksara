import { describe, expect, it } from "@effect/vitest";
import { Duration, Effect, Redacted, Result } from "effect";
import {
  type HttpPublicationTargetConfig,
  validateHttpConfig,
} from "#publisher/target/config";

/** Builds one explicit production-style configuration with safe defaults. */
function config(
  overrides: Partial<HttpPublicationTargetConfig> = {}
): HttpPublicationTargetConfig {
  return {
    allowInsecureLoopback: false,
    endpoint: new URL("https://publish.test.invalid/content"),
    timeout: "1 second",
    token: Redacted.make("test-token"),
    ...overrides,
  };
}

/** Runs runtime configuration validation at the Vitest boundary. */
const validate = Effect.fn("PublicationTargetConfigTest.validate")(
  (input: HttpPublicationTargetConfig) =>
    validateHttpConfig(input).pipe(Effect.result)
);

describe("HTTP publication configuration", () => {
  it.effect("snapshots secure production and explicit loopback endpoints", () =>
    Effect.gen(function* () {
      const source = new URL("https://publish.test.invalid/content");
      const secure = yield* validate(config({ endpoint: source }));
      source.pathname = "/mutated";
      expect(Result.isSuccess(secure)).toBe(true);
      if (Result.isSuccess(secure)) {
        expect(secure.success.endpoint.pathname).toBe("/content");
        expect(Duration.toMillis(secure.success.timeout)).toBe(1000);
      }
      const loopbacks = yield* Effect.forEach(
        ["127.0.0.1", "localhost", "[::1]"],
        (hostname) =>
          validate(
            config({
              allowInsecureLoopback: true,
              endpoint: new URL(`http://${hostname}/content`),
            })
          )
      );
      expect(loopbacks.every(Result.isSuccess)).toBe(true);
    })
  );

  it.effect(
    "rejects insecure, credentialed, fragmented, or contradictory URLs",
    () =>
      Effect.gen(function* () {
        const invalid = [
          config({
            allowInsecureLoopback: true,
            endpoint: new URL("http://publish.test.invalid/content"),
          }),
          config({ endpoint: new URL("http://127.0.0.1/content") }),
          config({
            allowInsecureLoopback: true,
            endpoint: new URL("https://publish.test.invalid/content"),
          }),
          config({
            endpoint: new URL("https://user:pass@publish.test/content"),
          }),
          config({ endpoint: new URL("https://publish.test/content#secret") }),
        ];
        const results = yield* Effect.forEach(invalid, validate);
        expect(results).toHaveLength(invalid.length);
        for (const result of results) {
          expect(result).toMatchObject({
            _tag: "Failure",
            failure: { reason: "endpoint" },
          });
        }
      })
  );

  it.effect("rejects empty, whitespace, and already-wiped bearer values", () =>
    Effect.gen(function* () {
      const wiped = Redacted.make("temporary-test-token");
      expect(yield* Effect.sync(() => Redacted.wipeUnsafe(wiped))).toBe(true);
      const results = yield* Effect.forEach(
        [Redacted.make(""), Redacted.make("has space"), wiped],
        (token) => validate(config({ token }))
      );
      for (const result of results) {
        expect(result).toMatchObject({
          _tag: "Failure",
          failure: { reason: "token" },
        });
      }
    })
  );

  it.effect("rejects malformed, zero, and infinite timeouts", () =>
    Effect.gen(function* () {
      const results = yield* Effect.forEach(
        ["invalid", 0, Number.POSITIVE_INFINITY],
        (timeout) => validate(config({ timeout }))
      );
      for (const result of results) {
        expect(result).toMatchObject({
          _tag: "Failure",
          failure: { reason: "timeout" },
        });
      }
    })
  );
});

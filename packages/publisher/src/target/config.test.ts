import { Effect, Either, Redacted } from "effect";
import { describe, expect, it } from "vitest";
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
function validate(input: HttpPublicationTargetConfig) {
  return Effect.runPromise(validateHttpConfig(input).pipe(Effect.either));
}

describe("HTTP publication configuration", () => {
  it("snapshots secure production and explicit loopback endpoints", async () => {
    const source = new URL("https://publish.test.invalid/content");
    const secure = await validate(config({ endpoint: source }));
    source.pathname = "/mutated";
    expect(Either.isRight(secure)).toBe(true);
    if (Either.isRight(secure)) {
      expect(secure.right.endpoint.pathname).toBe("/content");
      expect(secure.right.timeout.toString()).toBe("Duration(1s)");
    }
    const loopbacks = await Promise.all(
      ["127.0.0.1", "localhost", "[::1]"].map((hostname) =>
        validate(
          config({
            allowInsecureLoopback: true,
            endpoint: new URL(`http://${hostname}/content`),
          })
        )
      )
    );
    expect(loopbacks.every(Either.isRight)).toBe(true);
  });

  it("rejects insecure, credentialed, fragmented, or contradictory URLs", async () => {
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
      config({ endpoint: new URL("https://user:pass@publish.test/content") }),
      config({ endpoint: new URL("https://publish.test/content#secret") }),
    ];
    const results = await Promise.all(invalid.map(validate));
    expect(results).toHaveLength(invalid.length);
    for (const result of results) {
      expect(result).toMatchObject({
        _tag: "Left",
        left: { reason: "endpoint" },
      });
    }
  });

  it("rejects empty, whitespace, and already-wiped bearer values", async () => {
    const wiped = Redacted.make("temporary-test-token");
    expect(Redacted.unsafeWipe(wiped)).toBe(true);
    const results = await Promise.all(
      [Redacted.make(""), Redacted.make("has space"), wiped].map((token) =>
        validate(config({ token }))
      )
    );
    for (const result of results) {
      expect(result).toMatchObject({
        _tag: "Left",
        left: { reason: "token" },
      });
    }
  });

  it("rejects malformed, zero, and infinite timeouts", async () => {
    const results = await Promise.all(
      ["invalid", 0, Number.POSITIVE_INFINITY].map((timeout) =>
        validate(config({ timeout }))
      )
    );
    for (const result of results) {
      expect(result).toMatchObject({
        _tag: "Left",
        left: { reason: "timeout" },
      });
    }
  });
});

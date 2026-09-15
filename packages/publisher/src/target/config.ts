import { Duration, Effect, Option, Redacted, Schema } from "effect";
import { PublicationTargetConfigurationError } from "#publisher/target/errors";

/**
 * Runtime configuration for one authenticated publication ingress.
 *
 * `activationTimeout` bounds the two exchanges whose ingress waits on a
 * server-side read-model build. Staging and read exchanges stay on `timeout`,
 * which is sized for one bounded request. When omitted, activation inherits
 * the request bound.
 */
export interface HttpPublicationTargetConfig {
  readonly activationTimeout?: unknown;
  readonly allowInsecureLoopback: boolean;
  readonly endpoint: URL;
  readonly timeout: unknown;
  readonly token: Redacted.Redacted<string>;
}

/** Security-checked immutable values captured by one target instance. */
export interface ValidatedHttpConfig {
  readonly activationTimeout: Duration.Duration;
  readonly endpoint: URL;
  readonly timeout: Duration.Duration;
  readonly token: Redacted.Redacted<string>;
}

const LOOPBACK_HOSTS = new Set(["127.0.0.1", "[::1]", "localhost"]);
const TOKEN_WHITESPACE = /\s/u;
const PublicationTimeoutSchema = Schema.Union([
  Schema.Duration,
  Schema.DurationFromMillis,
  Schema.DurationFromString,
]);

/** Creates a permanent configuration failure without retaining secret input. */
function configurationError(
  reason: PublicationTargetConfigurationError["reason"]
) {
  return new PublicationTargetConfigurationError({ reason });
}

/** Decodes one finite positive exchange bound, or none when it is unusable. */
function decodeTimeout(value: unknown) {
  const decoded = Schema.decodeUnknownOption(PublicationTimeoutSchema)(value);
  if (Option.isNone(decoded)) {
    return Option.none<Duration.Duration>();
  }
  return Duration.isFinite(decoded.value) &&
    Duration.toMillis(decoded.value) > 0
    ? Option.some(decoded.value)
    : Option.none<Duration.Duration>();
}

/** Validates and snapshots endpoint, timeout, and bearer configuration. */
export const validateHttpConfig = Effect.fn(
  "AksaraPublisher.validateHttpConfig"
)(function* (config: HttpPublicationTargetConfig) {
  const endpoint = new URL(config.endpoint.href);
  const secure =
    endpoint.protocol === "https:" && !config.allowInsecureLoopback;
  const loopback =
    endpoint.protocol === "http:" &&
    config.allowInsecureLoopback &&
    LOOPBACK_HOSTS.has(endpoint.hostname);
  if (
    !(secure || loopback) ||
    endpoint.username.length > 0 ||
    endpoint.password.length > 0 ||
    endpoint.hash.length > 0
  ) {
    return yield* configurationError("endpoint");
  }
  const token = yield* Effect.try({
    catch: () => configurationError("token"),
    try: () => Redacted.value(config.token),
  });
  if (token.length === 0 || TOKEN_WHITESPACE.test(token)) {
    return yield* configurationError("token");
  }
  const timeout = decodeTimeout(config.timeout);
  if (Option.isNone(timeout)) {
    return yield* configurationError("timeout");
  }
  const activationTimeout =
    config.activationTimeout === undefined
      ? timeout
      : decodeTimeout(config.activationTimeout);
  if (Option.isNone(activationTimeout)) {
    return yield* configurationError("timeout");
  }
  return {
    activationTimeout: activationTimeout.value,
    endpoint,
    timeout: timeout.value,
    token: Redacted.make(token),
  };
});

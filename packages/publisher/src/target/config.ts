import { Duration, Effect, Option, Redacted } from "effect";
import { PublicationTargetConfigurationError } from "#publisher/target/errors";

/** Runtime configuration for one authenticated publication ingress. */
export interface HttpPublicationTargetConfig {
  readonly allowInsecureLoopback: boolean;
  readonly endpoint: URL;
  readonly timeout: unknown;
  readonly token: Redacted.Redacted<string>;
}

/** Security-checked immutable values captured by one target instance. */
export interface ValidatedHttpConfig {
  readonly endpoint: URL;
  readonly timeout: Duration.Duration;
  readonly token: Redacted.Redacted<string>;
}

const LOOPBACK_HOSTS = new Set(["127.0.0.1", "[::1]", "localhost"]);
const TOKEN_WHITESPACE = /\s/u;

/** Creates a permanent configuration failure without retaining secret input. */
function configurationError(
  reason: PublicationTargetConfigurationError["reason"]
) {
  return new PublicationTargetConfigurationError({ reason });
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
  const decodedTimeout = Duration.decodeUnknown(config.timeout);
  if (Option.isNone(decodedTimeout)) {
    return yield* configurationError("timeout");
  }
  const timeout = decodedTimeout.value;
  if (!Duration.isFinite(timeout) || Duration.toMillis(timeout) <= 0) {
    return yield* configurationError("timeout");
  }
  return { endpoint, timeout, token: Redacted.make(token) };
});

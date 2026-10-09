import { Duration, Effect, HashSet, Option, Redacted, Schema } from "effect";
import { PublicationTargetConfigurationError } from "#publisher/target/errors";

const HttpPublicationTargetConfigSchema = Schema.Struct({
  activationTimeout: Schema.Unknown,
  allowInsecureLoopback: Schema.Boolean,
  endpoint: Schema.URL,
  timeout: Schema.Unknown,
  token: Schema.Redacted(Schema.String),
});

/**
 * Runtime configuration for one authenticated publication ingress.
 *
 * `activationTimeout` bounds the two exchanges whose ingress waits on a
 * server-side read-model build. Staging and read exchanges stay on `timeout`,
 * which is sized for one bounded request. Both bounds are required so no target
 * can silently size an activation wait as one bounded request.
 */
export type HttpPublicationTargetConfig =
  typeof HttpPublicationTargetConfigSchema.Type;

const ValidatedHttpConfigSchema = Schema.Struct({
  activationTimeout: Schema.Duration,
  endpoint: Schema.URL,
  timeout: Schema.Duration,
  token: Schema.Redacted(Schema.String),
});

/** Security-checked immutable values captured by one target instance. */
export type ValidatedHttpConfig = typeof ValidatedHttpConfigSchema.Type;

const LOOPBACK_HOSTS = HashSet.make("127.0.0.1", "[::1]", "localhost");
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
    HashSet.has(LOOPBACK_HOSTS, endpoint.hostname);
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
  const activationTimeout = decodeTimeout(config.activationTimeout);
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

import { Config, Effect, Option } from "effect";
import { consumerFailure } from "#scripts/consumer/tools";

/** Reads one variable that every consumer command needs from the Effect configuration. */
const requiredVariable = (name: string) =>
  Config.String(name).pipe(
    Effect.mapError(
      consumerFailure(
        "argument",
        `Consumer command environment requires ${name}`
      )
    )
  );

/**
 * Builds the environment of every consumer command from named configuration
 * only: the search path and home directory, the package store when one is
 * configured, and the two npm configuration files that the verifier empties.
 */
export const consumerEnvironment = Effect.fn(
  "AksaraContracts.consumerEnvironment"
)(function* (globalConfig: string, userConfig: string) {
  const home = yield* requiredVariable("HOME");
  const path = yield* requiredVariable("PATH");
  const pnpmHome = yield* Config.option(Config.String("PNPM_HOME")).pipe(
    Effect.mapError(
      consumerFailure(
        "argument",
        "Consumer command environment cannot read PNPM_HOME"
      )
    )
  );
  return {
    HOME: home,
    NPM_CONFIG_GLOBALCONFIG: globalConfig,
    NPM_CONFIG_USERCONFIG: userConfig,
    PATH: path,
    ...(Option.isSome(pnpmHome) ? { PNPM_HOME: pnpmHome.value } : {}),
  };
});

import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Array as Arr, ConfigProvider, Effect, Order, Schema } from "effect";
import { readConsumerCommand } from "#scripts/consumer/command";
import { consumerEnvironment } from "#scripts/consumer/environment";
import { ConsumerVerificationError } from "#scripts/consumer/tools";

/** Supplies the parent's variables through the configuration that the verifier reads. */
const configuration = (variables: Record<string, string>) =>
  ConfigProvider.layer(ConfigProvider.fromEnvRecord(variables));

/** Prints the sorted names of the variables that a child process receives. */
const NAMES_SCRIPT =
  "process.stdin.resume(); process.stdin.on('end', () => process.stdout.write(JSON.stringify(Object.keys(process.env).sort())));";

const NameListSchema = Schema.fromJsonString(Schema.Array(Schema.String));

/** Lists the sorted names of the variables that one consumer command's child process receives. */
const childEnvironmentNames = (environment: NodeJS.ProcessEnv) =>
  readConsumerCommand({
    args: ["-e", NAMES_SCRIPT],
    environment,
    executable: process.execPath,
    input: "",
    platform: process.platform,
    stage: "Environment probe",
  }).pipe(Effect.flatMap(Schema.decodeEffect(NameListSchema)));

layer(NodeServices.layer)("consumer command environment", (effectIt) => {
  effectIt.effect("reads only the variables that the environment names", () =>
    Effect.gen(function* () {
      const environment = yield* consumerEnvironment(
        "/empty/global",
        "/empty/user"
      ).pipe(
        Effect.provide(
          configuration({
            HOME: "/home/test",
            NODE_AUTH_TOKEN: "credential",
            NPM_TOKEN: "credential",
            npm_config_registry: "private",
            PATH: "/usr/bin",
            PNPM_CONFIG_STORE_DIR: "private",
            PNPM_HOME: "/home/test/store",
          })
        )
      );

      expect(environment).toEqual({
        HOME: "/home/test",
        NPM_CONFIG_GLOBALCONFIG: "/empty/global",
        NPM_CONFIG_USERCONFIG: "/empty/user",
        PATH: "/usr/bin",
        PNPM_HOME: "/home/test/store",
      });
    })
  );

  effectIt.effect("omits the package store when none is configured", () =>
    Effect.gen(function* () {
      const environment = yield* consumerEnvironment(
        "/empty/global",
        "/empty/user"
      ).pipe(
        Effect.provide(configuration({ HOME: "/home/test", PATH: "/usr/bin" }))
      );

      expect(environment).not.toHaveProperty("PNPM_HOME");
    })
  );

  effectIt.effect("names the variable that a consumer command requires", () =>
    Effect.gen(function* () {
      const error = yield* consumerEnvironment(
        "/empty/global",
        "/empty/user"
      ).pipe(
        Effect.provide(configuration({ HOME: "/home/test" })),
        Effect.flip
      );

      expect(error).toBeInstanceOf(ConsumerVerificationError);
      expect(error).toMatchObject({ reason: "argument" });
      expect(error.detail).toContain("PATH");
    })
  );

  effectIt.effect("gives a consumer command only the variables it names", () =>
    Effect.gen(function* () {
      const environment = yield* consumerEnvironment(
        "/empty/global",
        "/empty/user"
      ).pipe(
        Effect.provide(
          configuration({
            HOME: "/home/test",
            NPM_TOKEN: "must-not-reach-a-command",
            PATH: "/usr/bin:/bin",
            PNPM_HOME: "/home/test/store",
          })
        )
      );
      // A child process can add names of its own, such as the Core Foundation
      // text encoding on macOS, so a child started with no variables gives the
      // baseline that every command has before the verifier passes anything.
      const baseline = yield* childEnvironmentNames({});
      const names = yield* childEnvironmentNames(environment);

      expect(names).toEqual(
        Arr.sort(
          [
            ...baseline,
            "HOME",
            "NPM_CONFIG_GLOBALCONFIG",
            "NPM_CONFIG_USERCONFIG",
            "PATH",
            "PNPM_HOME",
          ],
          Order.String
        )
      );
    })
  );
});

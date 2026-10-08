import { Effect, Schema } from "effect";
import type { CommandOutput, PnpmRunner } from "#scripts/dependencies/command";
import { DEPENDENCY_HOLDS } from "#scripts/dependencies/policy";

const RegistryVersionText = Schema.fromJsonString(Schema.String);

/** Creates one exact command observation. */
export function output(exitCode = 0, stdout = "", stderr = ""): CommandOutput {
  return { exitCode, stderr, stdout };
}

/** Builds deterministic pnpm output for one policy test. */
export function makeRunner(input?: {
  readonly outdated?: CommandOutput;
  readonly registry?: Readonly<Record<string, CommandOutput>>;
  readonly update?: CommandOutput;
}): PnpmRunner {
  return (_root, args) => {
    if (args[0] === "update") {
      return Effect.succeed(input?.update ?? output());
    }
    if (args[0] === "outdated") {
      return Effect.succeed(input?.outdated ?? output(1, "{}"));
    }
    const registry = args[1] ?? "missing";
    const configured = input?.registry?.[registry];
    const reviewed = DEPENDENCY_HOLDS.find(
      (hold) => hold.registry === registry
    )?.reviewedLatest;
    return Effect.succeed(
      configured ??
        output(0, Schema.encodeSync(RegistryVersionText)(reviewed ?? "missing"))
    );
  };
}

import { Effect } from "effect";

import type { PnpmRunner } from "#scripts/dependency-command";
import { DEPENDENCY_HOLDS } from "#scripts/dependency-policy";

interface CommandResult {
  readonly exitCode: number;
  readonly stderr: string;
  readonly stdout: string;
}

/** Creates one exact command observation. */
export function output(exitCode = 0, stdout = "", stderr = ""): CommandResult {
  return { exitCode, stderr, stdout };
}

/** Builds deterministic pnpm output for one policy test. */
export function makeRunner(input?: {
  readonly outdated?: CommandResult;
  readonly registry?: Readonly<Record<string, CommandResult>>;
  readonly update?: CommandResult;
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
      configured ?? output(0, JSON.stringify(reviewed ?? "missing"))
    );
  };
}

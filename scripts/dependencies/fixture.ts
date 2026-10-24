import { Array as Arr, Effect, Option, Record as Rec, Schema } from "effect";
import type { BunRunner, CommandOutput } from "#scripts/dependencies/command";
import { DEPENDENCY_HOLDS } from "#scripts/dependencies/policy";

const RegistryVersionText = Schema.fromJsonString(Schema.String);

/** Creates one exact command observation. */
export function output(exitCode = 0, stdout = "", stderr = ""): CommandOutput {
  return { exitCode, stderr, stdout };
}

/** The Bun answer for every reviewed hold, which names its reviewed upstream version. */
const REVIEWED_ANSWERS = Rec.fromEntries(
  DEPENDENCY_HOLDS.map(
    (hold) =>
      [
        hold.registry,
        output(0, Schema.encodeSync(RegistryVersionText)(hold.reviewedLatest)),
      ] as const
  )
);

/** Builds deterministic Bun output for one policy test, answering each registry spec. */
export function makeRunner(
  registry: Readonly<Record<string, CommandOutput>> = {},
  update: CommandOutput = output()
): BunRunner {
  const answers = { ...REVIEWED_ANSWERS, ...registry };
  return (_root, args) => {
    if (args[0] === "update") {
      return Effect.succeed(update);
    }
    const spec = Option.getOrThrow(Arr.get(args, 1));
    return Effect.succeed(Option.getOrThrow(Rec.get(answers, spec)));
  };
}

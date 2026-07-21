import { compileContent } from "@nakafaai/aksara-compiler/compile";
import { loadRichFixture } from "@nakafaai/aksara-corpus/fixture";
import { Effect, Schema } from "effect";

/** The CLI was run under a Node major outside Aksara's pinned runtime. */
export class UnsupportedNodeVersionError extends Schema.TaggedError<UnsupportedNodeVersionError>()(
  "UnsupportedNodeVersionError",
  {
    actualVersion: Schema.NonEmptyTrimmedString,
    expectedMajor: Schema.Number.pipe(Schema.int(), Schema.positive()),
  }
) {}

/** The CLI received a command outside its deliberately small v1 surface. */
export class UnknownCliCommandError extends Schema.TaggedError<UnknownCliCommandError>()(
  "UnknownCliCommandError",
  { command: Schema.String }
) {}

function nodeMajor(version: string) {
  return Number.parseInt(version.split(".")[0] ?? "", 10);
}

/** Runs a side-effect-free CLI command and returns its line-oriented output. */
export const runCli = Effect.fn("AksaraCli.run")(
  (args: readonly string[], nodeVersion: string) => {
    const command = args[0] ?? "check";
    if (command !== "check") {
      return Effect.fail(new UnknownCliCommandError({ command }));
    }
    if (nodeMajor(nodeVersion) !== 24) {
      return Effect.fail(
        new UnsupportedNodeVersionError({
          actualVersion: nodeVersion,
          expectedMajor: 24,
        })
      );
    }

    return loadRichFixture().pipe(
      Effect.flatMap((requests) => Effect.forEach(requests, compileContent)),
      Effect.map((payloads) => {
        const locales = payloads.map(({ locale }) => locale).join(",");
        return `aksara check ok: ${payloads.length} documents; format=mdx-function-body-v1; locales=${locales}`;
      })
    );
  }
);

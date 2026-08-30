import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Effect, FileSystem, Path, Schedule } from "effect";
import { TestClock } from "effect/testing";
import { packageIdentity } from "#scripts/release-identity";

/** Imports the CLI with exact arguments and always restores the process state. */
const runReleaseCommand = Effect.fn(
  "ContractReleaseCommandTest.runReleaseCommand"
)((args: readonly string[]) =>
  Effect.acquireUseRelease(
    Effect.sync(() => {
      const original = process.argv;
      process.argv = [process.execPath, "release-command.ts", ...args];
      return original;
    }),
    () => Effect.promise(() => import("#scripts/release-command")),
    (original) =>
      Effect.sync(() => {
        process.argv = original;
      })
  )
);

layer(NodeServices.layer)("contract release command", (it) => {
  it.effect("executes the release identity CLI boundary", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-release-command-",
      });
      const releases = path.join(root, "releases.txt");
      const output = path.join(root, "output.txt");
      yield* fileSystem.writeFileString(
        releases,
        "contracts-v0.1.0\tnakafa-aksara-contracts-0.1.0.tgz\n"
      );
      yield* runReleaseCommand([
        "describe",
        "--package",
        "package.json",
        "--releases",
        releases,
        "--output",
        output,
      ]);
      const identity = yield* fileSystem
        .readFileString("package.json", "utf8")
        .pipe(Effect.flatMap(packageIdentity));
      const expectedOutput = `asset_name=${identity.assetName}`;
      const contents = yield* fileSystem.readFileString(output, "utf8").pipe(
        Effect.catchIf(
          (error) => error.reason._tag === "NotFound",
          () => Effect.succeed("")
        ),
        Effect.repeat({
          schedule: Schedule.spaced("10 millis"),
          while: (text) => !text.includes(expectedOutput),
        }),
        Effect.timeout("2 seconds"),
        TestClock.withLive
      );

      expect(contents).toContain(expectedOutput);
    })
  );
});

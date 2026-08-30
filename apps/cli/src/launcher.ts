import { layer as childProcessLayer } from "@effect/platform-node/NodeChildProcessSpawner";
import { layer as fileSystemLayer } from "@effect/platform-node/NodeFileSystem";
import { layer as pathLayer } from "@effect/platform-node/NodePath";
import { runMain } from "@effect/platform-node/NodeRuntime";
import {
  Console,
  Effect,
  FileSystem,
  Layer,
  Option,
  Path,
  Schema,
} from "effect";
import { ChildProcess } from "effect/unstable/process";
import {
  type InfoArgumentsError,
  parseInfoArguments,
  printCliInfo,
} from "#cli/about";
import { findAksaraRoot, PreviewCheckoutError } from "#cli/checkout";
import { type CliPackageError, readPackageVersion } from "#cli/package";

/** The installed launcher could not execute the checkout-owned CLI source. */
export class CliLaunchError extends Schema.TaggedError<CliLaunchError>()(
  "CliLaunchError",
  {
    cause: Schema.Unknown,
    path: Schema.String,
    reason: Schema.Literals(["checkout", "missing", "process"]),
  }
) {}

/** Resolves the exact checkout-owned command without bundling operational code. */
export const makeLaunchCommand = Effect.fn("AksaraCli.makeLaunchCommand")(
  function* (input: {
    readonly args: readonly string[];
    readonly cwd: string;
    readonly executable: string;
  }) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = yield* findAksaraRoot(input.cwd);
    const main = path.join(root, "apps", "cli", "src", "main.ts");
    if (!(yield* fileSystem.exists(main))) {
      return yield* new CliLaunchError({
        cause: undefined,
        path: main,
        reason: "missing",
      });
    }
    return ChildProcess.make(
      input.executable,
      ["--conditions=aksara-source", main, ...input.args],
      {
        cwd: input.cwd,
        stderr: "inherit",
        stdin: "inherit",
        stdout: "inherit",
      }
    );
  }
);

/** Runs the exact source in the active Aksara checkout and returns its status. */
export const runLauncher = Effect.fn("AksaraCli.runLauncher")(
  (input: {
    readonly args: readonly string[];
    readonly cwd: string;
    readonly executable: string;
  }) =>
    makeLaunchCommand(input).pipe(
      Effect.flatMap((command) =>
        Effect.scoped(command.pipe(Effect.flatMap((handle) => handle.exitCode)))
      ),
      Effect.mapError((cause) =>
        cause instanceof CliLaunchError
          ? cause
          : new CliLaunchError({
              cause,
              path: input.cwd,
              reason:
                cause instanceof PreviewCheckoutError ? "checkout" : "process",
            })
      ),
      Effect.map(Number)
    )
);

/** Converts one typed launch failure into safe actionable CLI output. */
const launcherMessage = (error: CliLaunchError) => {
  if (error.reason === "checkout") {
    return "Run this command inside a complete Aksara checkout.";
  }
  if (error.reason === "missing") {
    return `Aksara CLI source is missing at ${error.path}. Reinstall or restore the checkout.`;
  }
  return `Aksara CLI could not start from ${error.path}. Verify the checkout and Node 24 installation.`;
};

/** Prints one typed outer-boundary failure without exposing its cause. */
const reportLauncherError = (
  error: CliLaunchError | CliPackageError | InfoArgumentsError
) => {
  if (error._tag === "CliLaunchError") {
    return Console.error(launcherMessage(error));
  }
  if (error._tag === "CliPackageError") {
    return Console.error(
      "The installed Aksara CLI package metadata is unavailable or invalid. Reinstall @nakafa/aksara-cli."
    );
  }
  return Console.error(
    "The --help and --version options do not accept additional arguments."
  );
};

/** Records the delegated checkout process status at the Node boundary. */
export const makeLauncherProgram = Effect.fn("AksaraCli.makeLauncherProgram")(
  (input: {
    readonly args: readonly string[];
    readonly cwd: string;
    readonly executable: string;
    readonly packageUrl: URL;
  }) =>
    Effect.gen(function* () {
      const info = yield* parseInfoArguments(input.args);
      if (Option.isSome(info)) {
        const version = yield* readPackageVersion(input.packageUrl);
        yield* printCliInfo(info.value, version);
        return 0;
      }
      return yield* runLauncher(input);
    }).pipe(
      Effect.catchTags({
        CliLaunchError: (error) =>
          reportLauncherError(error).pipe(Effect.as(1)),
        CliPackageError: (error) =>
          reportLauncherError(error).pipe(Effect.as(1)),
        InfoArgumentsError: (error) =>
          reportLauncherError(error).pipe(Effect.as(1)),
      }),
      Effect.tap((exitCode) =>
        Effect.sync(() => {
          process.exitCode = exitCode;
        })
      )
    )
);

const launcherLayer = Layer.provideMerge(
  childProcessLayer,
  Layer.mergeAll(fileSystemLayer, pathLayer)
);

runMain(
  makeLauncherProgram({
    args: process.argv.slice(2),
    cwd: process.cwd(),
    executable: process.execPath,
    packageUrl: new URL("../package.json", import.meta.url),
  }).pipe(Effect.provide(launcherLayer)),
  { disableErrorReporting: true }
);

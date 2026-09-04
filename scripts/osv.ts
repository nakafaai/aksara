import { createHash } from "node:crypto";
import { resolve } from "node:path";

import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, FileSystem, Schema } from "effect";
import {
  ChildProcess,
  type ChildProcessSpawner,
} from "effect/unstable/process";

const OSV_VERSION = "2.5.1";

/** One checksum-pinned official OSV Scanner release asset. */
export interface OsvRelease {
  readonly asset: string;
  readonly checksum: string;
}

interface CommandOptions {
  readonly cwd: string;
}

/** Injectable process boundary used by the audit program. */
export type CommandRunner = (
  executable: string,
  args: readonly string[],
  options: CommandOptions
) => Effect.Effect<
  number,
  OsvAuditError,
  ChildProcessSpawner.ChildProcessSpawner | FileSystem.FileSystem
>;

/** The dependency audit could not establish a trustworthy result. */
export class OsvAuditError extends Schema.TaggedError<OsvAuditError>()(
  "OsvAuditError",
  { detail: Schema.String }
) {}

/** Resolves the exact official scanner asset for one supported platform. */
export function resolveOsvRelease(
  platform: NodeJS.Platform,
  architecture: string
) {
  if (platform === "darwin" && architecture === "arm64") {
    return Effect.succeed({
      asset: "osv-scanner_darwin_arm64",
      checksum:
        "75c44d6332f892a1e56286f4105a98ed751ae28d215ca0a8b65cc00d84103054",
    } satisfies OsvRelease);
  }
  if (platform === "darwin" && architecture === "x64") {
    return Effect.succeed({
      asset: "osv-scanner_darwin_amd64",
      checksum:
        "9f89beb6c3d784893cb1cae0a3d56c529bfe91075418c2f9440c45b79654198b",
    } satisfies OsvRelease);
  }
  if (platform === "linux" && architecture === "arm64") {
    return Effect.succeed({
      asset: "osv-scanner_linux_arm64",
      checksum:
        "3d0f5aa5a6baa8eb32bcef247388e149ef6030a6634ccae6fa0d62681fb27a6d",
    } satisfies OsvRelease);
  }
  if (platform === "linux" && architecture === "x64") {
    return Effect.succeed({
      asset: "osv-scanner_linux_amd64",
      checksum:
        "f9f25499a2c8cc367b3af45df2ea7eeca7fbccceab9c35079968f4b3652194be",
    } satisfies OsvRelease);
  }
  return Effect.fail(
    new OsvAuditError({
      detail: `OSV Scanner does not publish a binary for ${platform}/${architecture}.`,
    })
  );
}

/** Runs one audit subprocess while preserving its terminal output. */
export const runCommand: CommandRunner = Effect.fn("OsvAudit.runCommand")(
  (executable, args, options) =>
    Effect.scoped(
      Effect.gen(function* () {
        const command = yield* ChildProcess.make(executable, args, {
          cwd: options.cwd,
          stderr: "inherit",
          stdout: "inherit",
        });
        return yield* command.exitCode;
      })
    ).pipe(
      Effect.mapError((error) => new OsvAuditError({ detail: error.message }))
    )
);

/** Creates a stable typed failure for one rejected audit step. */
function commandFailure(detail: string) {
  return new OsvAuditError({ detail });
}

/** Downloads, authenticates, and executes one pinned OSV Scanner binary. */
const runOsvAudit = Effect.fn("OsvAudit.run")(function* (
  root: string,
  release: OsvRelease,
  runner: CommandRunner
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const directory = yield* fileSystem
    .makeTempDirectoryScoped({ prefix: "aksara-osv-" })
    .pipe(
      Effect.mapError((error) =>
        commandFailure(
          `Unable to create the scanner directory: ${error.message}`
        )
      )
    );
  const binary = resolve(directory, release.asset);
  const download = yield* runner(
    "curl",
    [
      "--connect-timeout",
      "10",
      "--fail",
      "--location",
      "--max-time",
      "120",
      "--output",
      binary,
      "--proto",
      "=https",
      "--retry",
      "3",
      "--retry-all-errors",
      "--show-error",
      "--silent",
      "--tlsv1.2",
      `https://github.com/google/osv-scanner/releases/download/v${OSV_VERSION}/${release.asset}`,
    ],
    { cwd: root }
  );
  if (download !== 0) {
    return yield* commandFailure("Unable to download OSV Scanner.");
  }

  const source = yield* fileSystem
    .readFile(binary)
    .pipe(
      Effect.mapError((error) =>
        commandFailure(`Unable to read OSV Scanner: ${error.message}`)
      )
    );
  const checksum = createHash("sha256").update(source).digest("hex");
  if (checksum !== release.checksum) {
    return yield* commandFailure("OSV Scanner checksum verification failed.");
  }
  yield* fileSystem
    .chmod(binary, 0o700)
    .pipe(
      Effect.mapError((error) =>
        commandFailure(`Unable to authorize OSV Scanner: ${error.message}`)
      )
    );

  const scan = yield* runner(
    binary,
    ["scan", "source", `--lockfile=${resolve(root, "pnpm-lock.yaml")}`],
    { cwd: root }
  );
  if (scan !== 0) {
    return yield* commandFailure("OSV Scanner found an issue or failed.");
  }
});

/** Builds the repository audit from explicit platform and process seams. */
export const makeOsvAuditProgram = Effect.fn("OsvAudit.main")(function* (
  root: string,
  release: Effect.Effect<OsvRelease, OsvAuditError>,
  runner: CommandRunner
) {
  yield* Effect.scoped(runOsvAudit(root, yield* release, runner));
});

type AuditProgram = Effect.Effect<void, OsvAuditError>;
type AuditStarter = (program: AuditProgram) => void;

/** Starts the audit only at the direct Node entry boundary. */
export function startOsvAudit(
  isMain: boolean,
  program: AuditProgram,
  start: AuditStarter
) {
  if (isMain) {
    start(program);
  }
}

startOsvAudit(
  import.meta.main,
  makeOsvAuditProgram(
    resolve(import.meta.dirname, ".."),
    resolveOsvRelease(process.platform, process.arch),
    runCommand
  ).pipe(Effect.provide(NodeServices.layer)),
  NodeRuntime.runMain
);

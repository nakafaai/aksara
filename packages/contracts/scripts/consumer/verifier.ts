import { parseArgs } from "node:util";
import {
  Array as Arr,
  Console,
  Effect,
  FileSystem,
  Path,
  Record as Rec,
  Schema,
} from "effect";
import {
  readConsumerCommand,
  runConsumerCommand,
} from "#scripts/consumer/command";
import { stageConsumerPackage } from "#scripts/consumer/package";
import {
  ConsumerPackageInputSchema,
  consumerError,
  consumerFailure,
  createConsumerManifest,
  createConsumerSource,
  createConsumerTsconfig,
  createInstallRunner,
} from "#scripts/consumer/tools";
import { encodeJsonText } from "#scripts/text/json";
import {
  type InstallInspection,
  verifyInstalledPackage,
} from "#scripts/verify/install";

const ConsumerVerificationInputSchema = Schema.Struct({
  ...ConsumerPackageInputSchema.fields,
  args: Schema.Array(Schema.String),
  executable: Schema.String,
});

/** Inputs supplied by the Node CLI boundary. */
type ConsumerVerificationInput = typeof ConsumerVerificationInputSchema.Type;

/** The one JSON document that the install runner writes to standard output. */
const InstallInspectionOutputSchema = Schema.fromJsonString(
  Schema.Struct({
    resolved: Schema.Record(Schema.String, Schema.URLFromString),
  })
);

/** Converts one exact export subpath into its public package specifier. */
export function publicSpecifier(packageName: string, subpath: string): string {
  return subpath === "." ? packageName : `${packageName}/${subpath.slice(2)}`;
}

/** Preserves the verified archive only when the caller requests an output path. */
export const preserveTarball = Effect.fn(
  "AksaraContracts.preserveConsumerTarball"
)(function* (output: string | undefined, tarballPath: string) {
  if (output === undefined) {
    return;
  }
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const outputPath = path.resolve(output);
  yield* fileSystem
    .makeDirectory(path.dirname(outputPath), { recursive: true })
    .pipe(
      Effect.mapError(
        consumerFailure("filesystem", "Output directory creation failed")
      )
    );
  yield* fileSystem
    .copyFile(tarballPath, outputPath)
    .pipe(
      Effect.mapError(
        consumerFailure("filesystem", "Tarball preservation failed")
      )
    );
  yield* Console.log(`Preserved the verified tarball at ${outputPath}.`);
});

/** Parses the single optional archive output argument. */
const parseConsumerArguments = Effect.fn(
  "AksaraContracts.parseConsumerArguments"
)(function* (args: readonly string[]) {
  const parsed = yield* Effect.try({
    catch: (cause) =>
      consumerError(
        "argument",
        `Consumer verification arguments are malformed: ${String(cause)}`,
        cause
      ),
    try: () =>
      parseArgs({
        args: [...args],
        options: { output: { type: "string" } },
        strict: true,
      }),
  });
  return parsed.values.output;
});

/** Runs the install runner inside the isolated consumer, and decodes the URLs that it resolved. */
const inspectInstalledPackage = Effect.fn(
  "AksaraContracts.inspectInstalledPackage"
)(function* (command: {
  readonly consumerDirectory: string;
  readonly environment: NodeJS.ProcessEnv;
  readonly executable: string;
  readonly inspection: InstallInspection;
  readonly platform: NodeJS.Platform;
  readonly runner: string;
}) {
  const output = yield* readConsumerCommand({
    args: [command.runner],
    cwd: command.consumerDirectory,
    environment: command.environment,
    executable: command.executable,
    input: encodeJsonText(command.inspection),
    platform: command.platform,
    stage: "Installed package verification",
  });
  const answer = yield* Schema.decodeEffect(InstallInspectionOutputSchema)(
    output
  ).pipe(
    Effect.mapError(
      consumerFailure(
        "process",
        "Installed package verification returned malformed output"
      )
    )
  );
  return answer.resolved;
});

/** Builds and verifies one exact release archive in an isolated pnpm consumer. */
export const verifyConsumer = Effect.fn("AksaraContracts.verifyConsumer")(
  function* (input: ConsumerVerificationInput) {
    const output = yield* parseConsumerArguments(input.args);
    const staged = yield* stageConsumerPackage(input);
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    /** Writes one verifier-owned file through the platform service. */
    const write = (file: string, contents: string, detail: string) =>
      fileSystem
        .writeFileString(file, contents)
        .pipe(Effect.mapError(consumerFailure("filesystem", detail)));
    /** Runs one consumer command with the exact scoped environment. */
    const run = (
      executable: string,
      args: readonly string[],
      stage: string,
      cwd: string
    ) =>
      runConsumerCommand(
        executable,
        args,
        staged.childEnvironment,
        input.platform,
        stage,
        cwd
      );
    yield* write(
      path.join(staged.consumerDirectory, "package.json"),
      createConsumerManifest({
        effectVersion: staged.effectVersion,
        packageManager: staged.packageManager,
        packageName: staged.packageName,
        tarballPath: staged.tarballPath,
      }),
      "Consumer manifest staging failed"
    );
    yield* run(
      staged.pnpm,
      ["install", "--ignore-scripts", "--no-frozen-lockfile", "--prod"],
      "Consumer dependency installation",
      staged.consumerDirectory
    );
    const specifiers = Arr.map(
      Rec.keys(staged.packedManifest.exports),
      (subpath) => publicSpecifier(staged.packageName, subpath)
    );
    yield* Effect.all([
      write(
        path.join(staged.consumerDirectory, "consumer.ts"),
        createConsumerSource(staged.packageName, specifiers),
        "Consumer source staging failed"
      ),
      write(
        path.join(staged.consumerDirectory, "tsconfig.json"),
        createConsumerTsconfig(),
        "Consumer compiler staging failed"
      ),
    ]);
    yield* run(
      path.resolve(staged.workspaceRoot, "node_modules/.bin/tsc"),
      ["--project", "."],
      "Consumer type verification",
      staged.consumerDirectory
    );
    const installedRunner = path.join(staged.verifierDirectory, "run.ts");
    yield* write(
      installedRunner,
      createInstallRunner(),
      "Install runner staging failed"
    );
    yield* verifyInstalledPackage({
      consumerRoot: staged.consumerDirectory,
      inspect: (inspection) =>
        inspectInstalledPackage({
          consumerDirectory: staged.consumerDirectory,
          environment: staged.childEnvironment,
          executable: input.executable,
          inspection,
          platform: input.platform,
          runner: installedRunner,
        }),
      packageName: staged.packageName,
      write: (message) =>
        Effect.sync(() => {
          process.stdout.write(message);
        }),
    });
    yield* preserveTarball(output, staged.tarballPath);
    yield* Console.log(
      `Verified ${staged.packageName} as an isolated pnpm release consumer.`
    );
  }
);

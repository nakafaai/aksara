import { parseArgs } from "node:util";
import { Console, Effect, FileSystem, Path } from "effect";
import {
  type ConsumerPackageInput,
  consumerError,
  consumerFailure,
  createConsumerManifest,
  createConsumerSource,
  createConsumerTsconfig,
  createInstallRunner,
  runConsumerCommand,
} from "#scripts/consumer";
import { stageConsumerPackage } from "#scripts/consumer-package";

/** Inputs supplied by the Node CLI boundary. */
export interface ConsumerVerificationInput extends ConsumerPackageInput {
  readonly args: readonly string[];
  readonly executable: string;
}

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
    /** Copies one verifier-owned file through the platform service. */
    const copy = (source: string, target: string, detail: string) =>
      fileSystem
        .copyFile(source, target)
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
      ["install", "--ignore-scripts", "--frozen-lockfile=false", "--prod"],
      "Consumer dependency installation",
      staged.consumerDirectory
    );
    const specifiers = Object.keys(staged.packedManifest.exports).map(
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
    yield* Effect.all([
      copy(
        path.join(staged.scriptDirectory, "manifest.ts"),
        path.join(staged.verifierDirectory, "manifest.ts"),
        "Verifier manifest staging failed"
      ),
      copy(
        path.join(staged.scriptDirectory, "verify-install.ts"),
        path.join(staged.verifierDirectory, "verify-install.ts"),
        "Install verifier staging failed"
      ),
      write(
        installedRunner,
        createInstallRunner(),
        "Install runner staging failed"
      ),
    ]);
    yield* run(
      input.executable,
      [installedRunner, staged.packageName],
      "Installed package verification",
      staged.consumerDirectory
    );
    yield* preserveTarball(output, staged.tarballPath);
    yield* Console.log(
      `Verified ${staged.packageName} as an isolated pnpm release consumer.`
    );
  }
);

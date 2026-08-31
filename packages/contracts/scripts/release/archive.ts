import { Effect, FileSystem, Stream } from "effect";
import { ChildProcess } from "effect/unstable/process";
import {
  type ContractIdentity,
  type ContractReleaseError,
  packageIdentity,
  releaseError,
} from "#scripts/release/identity";

const MULTILINE_PATTERN = /[\r\n]/u;

/** Maps one platform failure to its stable contract release operation. */
function platformError(stage: string) {
  return () =>
    releaseError("platform", `Contract release ${stage} operation failed`);
}

/** Executes one external command and captures its complete UTF-8 output. */
function commandText(
  executable: string,
  args: readonly string[],
  stage: string
) {
  return Effect.gen(function* () {
    const process = yield* ChildProcess.make(executable, args, {
      stderr: "inherit",
    });
    const output = yield* process.stdout.pipe(
      Stream.decodeText(),
      Stream.runFold(
        () => "",
        (text, chunk) => text + chunk
      )
    );
    const exitCode = yield* process.exitCode;
    if (exitCode !== 0) {
      return yield* releaseError(
        "platform",
        `Contract release ${stage} command exited unsuccessfully`
      );
    }
    return output;
  }).pipe(Effect.mapError(platformError(stage)), Effect.scoped);
}

/** Reads one file through the Effect Platform filesystem seam. */
const readFile = Effect.fn("AksaraContracts.readReleaseFile")(function* (
  path: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  return yield* fileSystem
    .readFile(path)
    .pipe(Effect.mapError(platformError("file read")));
});

/** Extracts and validates the package identity embedded in one release archive. */
export const verifyArchive = Effect.fn("AksaraContracts.verifyArchive")(
  function* (archivePath: string, expected: ContractIdentity, tar = "tar") {
    const manifest = yield* commandText(
      tar,
      ["-xOf", archivePath, "package/package.json"],
      "archive extraction"
    );
    const actual = yield* packageIdentity(manifest);
    if (actual.version !== expected.version) {
      return yield* releaseError(
        "archive",
        "The archive version differs from its release identity"
      );
    }
    return yield* readFile(archivePath);
  }
);

/** Appends validated scalar values to one GitHub Actions output file. */
export const writeOutputs = Effect.fn("AksaraContracts.writeReleaseOutputs")(
  function* (
    path: string,
    values: Readonly<Record<string, string | number | boolean>>
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const lines: string[] = [];
    for (const [key, value] of Object.entries(values)) {
      const text = String(value);
      if (MULTILINE_PATTERN.test(text)) {
        return yield* releaseError(
          "argument",
          `Output ${key} must be one line`
        );
      }
      lines.push(`${key}=${text}`);
    }
    yield* fileSystem
      .writeFileString(path, `${lines.join("\n")}\n`, { flag: "a" })
      .pipe(Effect.mapError(platformError("output write")));
  }
);

/** Complete error channel for archive IO operations. */
export type ReleaseArchiveError = ContractReleaseError;

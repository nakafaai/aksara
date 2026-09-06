import { createHash } from "node:crypto";
import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
  GitCommitShaSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  GIT_ENVIRONMENT,
  GIT_EXECUTABLE,
  makeExactGitInput,
} from "@nakafa/aksara-utilities/git/exact";
import {
  ExactProcess,
  type ExactProcessError,
  type ExactProcessInput,
} from "@nakafa/aksara-utilities/process/exact";
import { Effect, FileSystem, Path, Schema } from "effect";
import { GitBlob, makeGitBlobLive } from "#publisher/git/blob";

export const TEST_COMMIT_SHA = GitCommitShaSchema.make("b".repeat(40));
export const TEST_SOURCE_PATH = CorpusSourcePathSchema.make(
  "packages/corpus/test-protocol/source/en.mdx"
);
export const TEST_RAW_MDX =
  'export const testProtocol = "byte-identical-✓";\r\n';
export const TEST_RAW_BYTES = new TextEncoder().encode(TEST_RAW_MDX);
export const TEST_REPOSITORY_ROOT = "/test-only/aksara";

interface TestGitOverrides {
  readonly batch?: string | Uint8Array;
  readonly batchFailure?: ExactProcessError;
  readonly blobs?: ReadonlyMap<CorpusSourcePath, Uint8Array>;
  readonly exitCode?: number;
  readonly failure?: ExactProcessError;
  readonly metadata?: string | Uint8Array;
  readonly metadataFailure?: ExactProcessError;
  readonly revision?: string;
  readonly stderr?: string | Uint8Array;
}

/** Converts test protocol output into exact process bytes. */
function outputBytes(value: string | Uint8Array | undefined) {
  return typeof value === "string"
    ? new TextEncoder().encode(value)
    : (value ?? new Uint8Array());
}

/** Derives the real Git object identity of test-only bytes. */
export function testBlobId(bytes: Uint8Array) {
  return createHash("sha1")
    .update(`blob ${bytes.byteLength}\0`)
    .update(bytes)
    .digest("hex");
}

/** Concatenates exact protocol bytes without text normalization. */
export function joinGitFrames(frames: readonly Uint8Array[]) {
  const result = new Uint8Array(
    frames.reduce((size, frame) => size + frame.byteLength, 0)
  );
  let offset = 0;
  for (const frame of frames) {
    result.set(frame, offset);
    offset += frame.byteLength;
  }
  return result;
}

/** Encodes metadata and optional exact body bytes for one test-only blob. */
export function gitFrame(bytes: Uint8Array, body: boolean) {
  const header = outputBytes(`${testBlobId(bytes)} blob ${bytes.byteLength}\n`);
  return body ? joinGitFrames([header, bytes, Uint8Array.of(0x0a)]) : header;
}

/** Resolves requested coordinates and emits their ordered protocol frames. */
const batchOutput = Effect.fn("GitBlobTest.batchOutput")(function* (
  blobs: ReadonlyMap<CorpusSourcePath, Uint8Array>,
  stdin: Uint8Array | undefined,
  body: boolean
) {
  const coordinates = new TextDecoder().decode(stdin).trimEnd().split("\n");
  const frames = yield* Effect.forEach(coordinates, (coordinate) => {
    const found = [...blobs].find(([sourcePath, bytes]) =>
      body
        ? testBlobId(bytes) === coordinate
        : `${TEST_COMMIT_SHA}:${sourcePath}` === coordinate
    );
    return found === undefined
      ? Effect.die(`Unexpected test-only Git coordinate: ${coordinate}`)
      : Effect.succeed(gitFrame(found[1], body));
  });
  return joinGitFrames(frames);
});

/** Responds to metadata and body commands using real object identities. */
export function makeGitProcess(
  overrides: TestGitOverrides = {},
  commands: ExactProcessInput[] = []
) {
  const blobs =
    overrides.blobs ?? new Map([[TEST_SOURCE_PATH, TEST_RAW_BYTES]]);
  const stderr = outputBytes(overrides.stderr);
  const exitCode = overrides.exitCode ?? 0;
  return ExactProcess.of({
    /** Returns independently overridable output for each safe Git operation. */
    run: (input) =>
      Effect.gen(function* () {
        commands.push(input);
        const [, , , operation, mode] = input.args;
        if (overrides.failure) {
          return yield* overrides.failure;
        }
        const failure =
          mode === "--batch-check"
            ? overrides.metadataFailure
            : overrides.batchFailure;
        if (operation === "cat-file" && failure) {
          return yield* failure;
        }
        let stdout: string | Uint8Array;
        if (operation === "rev-parse") {
          stdout = overrides.revision ?? `${TEST_COMMIT_SHA}\n`;
        } else {
          const body = mode === "--batch";
          const overridden = body ? overrides.batch : overrides.metadata;
          stdout = overridden ?? (yield* batchOutput(blobs, input.stdin, body));
        }
        return {
          exitCode,
          stderr,
          stdout: outputBytes(stdout),
        };
      }),
  });
}

/** Reads one bounded path set through the real Git service and an injected process. */
export function readTestBlobs(
  exactProcess: typeof ExactProcess.Service,
  sourcePaths: readonly CorpusSourcePath[]
) {
  return GitBlob.pipe(
    Effect.flatMap((gitBlob) =>
      gitBlob.read({ revision: TEST_COMMIT_SHA, sourcePaths })
    ),
    Effect.provide(makeGitBlobLive(TEST_REPOSITORY_ROOT)),
    Effect.provideService(ExactProcess, exactProcess)
  );
}

/** Reads the fixed branded test source through the bounded batch interface. */
export function readTestBlob(exactProcess: typeof ExactProcess.Service) {
  return readTestBlobs(exactProcess, [TEST_SOURCE_PATH]).pipe(
    Effect.flatMap((blobs) =>
      Effect.fromNullishOr(blobs.get(TEST_SOURCE_PATH)).pipe(Effect.orDie)
    )
  );
}

/** Runs an exact local Git fixture command and rejects an unsuccessful setup. */
const runTestGit = Effect.fn("GitBlobTest.runGit")(function* (
  root: string,
  args: readonly string[],
  stdin?: Uint8Array
) {
  const process = yield* ExactProcess;
  const result = yield* process.run(
    makeExactGitInput({
      args,
      root,
      stderrLimit: 4096,
      stdoutLimit: 4096,
      ...(stdin === undefined ? {} : { stdin }),
    })
  );
  if (result.exitCode !== 0) {
    return yield* Effect.die(new TextDecoder().decode(result.stderr));
  }
  return new TextDecoder().decode(result.stdout).trim();
});

/** Creates a scoped real Git repository with dirty and replaced source decoys. */
export const makeTestGitRepository = Effect.fn("GitBlobTest.makeRepository")(
  function* (rawMdx: string) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const process = yield* ExactProcess;
    const root = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-git-blob-",
    });
    const initialized = yield* process.run({
      args: ["init", "--quiet", root],
      environment: GIT_ENVIRONMENT,
      executable: GIT_EXECUTABLE,
      root,
      stderrLimit: 4096,
      stdoutLimit: 4096,
    });
    if (initialized.exitCode !== 0) {
      return yield* Effect.die("Test-only Git initialization failed.");
    }
    const sourcePath = TEST_SOURCE_PATH;
    const absolutePath = path.join(root, sourcePath);
    yield* fileSystem.makeDirectory(path.dirname(absolutePath), {
      recursive: true,
    });
    yield* fileSystem.writeFileString(absolutePath, rawMdx);
    yield* runTestGit(root, ["add", sourcePath]);
    yield* runTestGit(root, [
      "-c",
      "user.name=Aksara Test",
      "-c",
      "user.email=aksara@example.invalid",
      "commit",
      "--quiet",
      "-m",
      "test: immutable source",
    ]);
    const revision = yield* runTestGit(root, ["rev-parse", "HEAD"]).pipe(
      Effect.flatMap(Schema.decodeEffect(GitCommitShaSchema))
    );
    const replacement = yield* runTestGit(
      root,
      ["hash-object", "-w", "--stdin"],
      new TextEncoder().encode("Test-only replacement decoy.\n")
    );
    yield* runTestGit(root, [
      "replace",
      testBlobId(new TextEncoder().encode(rawMdx)),
      replacement,
    ]);
    yield* fileSystem.writeFileString(
      absolutePath,
      "Test-only dirty worktree decoy.\n"
    );
    return { revision, root, sourcePath };
  }
);

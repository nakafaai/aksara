import {
  CorpusSourcePathSchema,
  GitCommitShaSchema,
} from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import {
  ExactProcess,
  type ExactProcessError,
  type ExactProcessInput,
} from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";

import {
  GitBlob,
  type GitBlobError,
  type GitBlobInput,
  makeGitBlobLive,
} from "#publisher/git/blob";

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
  readonly blob?: string | Uint8Array;
  readonly blobSize?: number;
  readonly exitCode?: number;
  readonly failure?: ExactProcessError;
  readonly revision?: string;
  readonly stderr?: string | Uint8Array;
}

/** Converts one test output value into exact process bytes. */
function outputBytes(value: string | Uint8Array | undefined) {
  if (typeof value === "string") {
    return new TextEncoder().encode(value);
  }
  return value ?? new Uint8Array();
}

/** Encodes one exact Git batch protocol response. */
function batchOutput(overrides: TestGitOverrides) {
  if (overrides.batch !== undefined) {
    return outputBytes(overrides.batch);
  }
  const blob = outputBytes(overrides.blob ?? TEST_RAW_BYTES);
  const size = overrides.blobSize ?? blob.byteLength;
  const header = new TextEncoder().encode(`${"d".repeat(40)} blob ${size}\n`);
  const output = new Uint8Array(header.byteLength + blob.byteLength + 1);
  output.set(header);
  output.set(blob, header.byteLength);
  output[output.byteLength - 1] = 0x0a;
  return output;
}

/** Responds to every exact-Git command with independently overridable data. */
export function makeGitProcess(
  overrides: TestGitOverrides,
  commands?: ExactProcessInput[]
) {
  return ExactProcess.of({
    run: (input) =>
      Effect.gen(function* () {
        commands?.push(input);
        const [, , , operation] = input.args;
        if (overrides.failure) {
          return yield* overrides.failure;
        }
        if (operation !== "rev-parse" && overrides.batchFailure) {
          return yield* overrides.batchFailure;
        }
        let stdout: string | Uint8Array = batchOutput(overrides);
        if (operation === "rev-parse") {
          stdout = overrides.revision ?? `${TEST_COMMIT_SHA}\n`;
        }
        return {
          exitCode: overrides.exitCode ?? 0,
          stderr: outputBytes(overrides.stderr),
          stdout: outputBytes(stdout),
        };
      }),
  });
}

/** Reads the fixed branded test coordinate through one exact process service. */
export function readTestBlob(
  exactProcess: typeof ExactProcess.Service,
  maxBytes = MAX_RAW_MDX_BYTES,
  mode: "bytes" | "text" = "text"
) {
  return GitBlob.pipe(
    Effect.flatMap(
      (gitBlob): Effect.Effect<string | Uint8Array, GitBlobError> => {
        const input = {
          maxBytes,
          revision: TEST_COMMIT_SHA,
          sourcePath: TEST_SOURCE_PATH,
        };
        return mode === "bytes"
          ? gitBlob.readBytes(input)
          : gitBlob.read(input);
      }
    ),
    Effect.provide(makeGitBlobLive(TEST_REPOSITORY_ROOT)),
    Effect.provideService(ExactProcess, exactProcess)
  );
}

/** Reads one explicit batch through the live exact-Git implementation. */
export function readTestBlobs(
  exactProcess: typeof ExactProcess.Service,
  inputs: readonly GitBlobInput[]
) {
  return GitBlob.pipe(
    Effect.flatMap((gitBlob) => gitBlob.readManyBytes(inputs)),
    Effect.provide(makeGitBlobLive(TEST_REPOSITORY_ROOT)),
    Effect.provideService(ExactProcess, exactProcess)
  );
}

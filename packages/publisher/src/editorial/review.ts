import { createHash } from "node:crypto";

import type {
  EditorialReviewManifest,
  EditorialReviewRecord,
} from "@nakafa/aksara-contracts/editorial/review";
import { verifyEditorialReviewManifest } from "@nakafa/aksara-contracts/editorial/review";
import type {
  CorpusSourcePath,
  GitCommitSha,
  Sha256Hash,
} from "@nakafa/aksara-contracts/ids";
import {
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";

import { GitBlob } from "#publisher/git/blob";

/** One reviewed file is assigned contradictory hashes. */
export class EditorialReviewFileConflictError extends Schema.TaggedError<EditorialReviewFileConflictError>()(
  "EditorialReviewFileConflictError",
  {
    firstHash: Sha256HashSchema,
    path: CorpusSourcePathSchema,
    secondHash: Sha256HashSchema,
  }
) {}

/** One exact Git blob differs from its editorial review record. */
export class EditorialReviewFileHashError extends Schema.TaggedError<EditorialReviewFileHashError>()(
  "EditorialReviewFileHashError",
  {
    actualHash: Sha256HashSchema,
    expectedHash: Sha256HashSchema,
    path: CorpusSourcePathSchema,
  }
) {}

interface ReviewFileExpectation {
  readonly hash: Sha256Hash;
  readonly path: CorpusSourcePath;
}

/** Registers one expected file identity without hiding hash conflicts. */
function registerExpectation(
  files: Map<CorpusSourcePath, Sha256Hash>,
  expectation: ReviewFileExpectation
) {
  const existing = files.get(expectation.path);
  if (existing === undefined || existing === expectation.hash) {
    files.set(expectation.path, expectation.hash);
    return Effect.void;
  }
  return Effect.fail(
    new EditorialReviewFileConflictError({
      firstHash: existing,
      path: expectation.path,
      secondHash: expectation.hash,
    })
  );
}

/** Derives every unique exact file identity covered by review records. */
const collectReviewFiles = Effect.fn("AksaraPublisher.collectReviewFiles")(
  function* (records: readonly EditorialReviewRecord[]) {
    const files = new Map<CorpusSourcePath, Sha256Hash>();
    for (const record of records) {
      yield* registerExpectation(files, {
        hash: record.targetHash,
        path: record.targetPath,
      });
      for (const source of record.sources) {
        yield* registerExpectation(files, {
          hash: source.sourceHash,
          path: source.sourcePath,
        });
      }
    }
    return [...files].map(([path, hash]) => ({ hash, path }));
  }
);

/** Computes the exact SHA-256 identity of one UTF-8 Git blob. */
function hashReviewFile(content: string) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256").update(content).digest("hex")}`
  );
}

/** Verifies one review-owned file against its exact immutable Git blob. */
const verifyReviewFile = Effect.fn("AksaraPublisher.verifyReviewFile")(
  function* (
    gitBlob: typeof GitBlob.Service,
    revision: GitCommitSha,
    expectation: ReviewFileExpectation
  ) {
    const content = yield* gitBlob.read({
      revision,
      sourcePath: expectation.path,
    });
    const actualHash = hashReviewFile(content);
    if (actualHash !== expectation.hash) {
      return yield* new EditorialReviewFileHashError({
        actualHash,
        expectedHash: expectation.hash,
        path: expectation.path,
      });
    }
  }
);

/** Authenticates review records and every source or target blob they bind. */
export const verifyEditorialReviewSources = Effect.fn(
  "AksaraPublisher.verifyEditorialReviewSources"
)(function* (input: {
  readonly manifest: unknown;
  readonly revision: GitCommitSha;
}) {
  const manifest = yield* verifyEditorialReviewManifest(input.manifest);
  const files = yield* collectReviewFiles(manifest.records);
  const gitBlob = yield* GitBlob;
  yield* Effect.forEach(
    files,
    (expectation) => verifyReviewFile(gitBlob, input.revision, expectation),
    { concurrency: 8, discard: true }
  );
  return manifest satisfies EditorialReviewManifest;
});

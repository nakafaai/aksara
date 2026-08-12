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
import {
  MAX_RAW_MDX_BYTES,
  MAX_REVIEWED_OFFICIAL_SOURCE_BYTES,
} from "@nakafa/aksara-contracts/limits";
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

/** One reviewed file is assigned contradictory bounded read policies. */
export class EditorialReviewFileLimitConflictError extends Schema.TaggedError<EditorialReviewFileLimitConflictError>()(
  "EditorialReviewFileLimitConflictError",
  {
    firstMaxBytes: Schema.Int,
    path: CorpusSourcePathSchema,
    secondMaxBytes: Schema.Int,
  }
) {}

interface ReviewFileExpectation {
  readonly hash: Sha256Hash;
  readonly maxBytes: number;
  readonly path: CorpusSourcePath;
}

/** Registers one expected file identity without hiding hash conflicts. */
function registerExpectation(
  files: Map<CorpusSourcePath, ReviewFileExpectation>,
  expectation: ReviewFileExpectation
) {
  const existing = files.get(expectation.path);
  if (existing === undefined) {
    files.set(expectation.path, expectation);
    return Effect.void;
  }
  if (existing.hash === expectation.hash) {
    if (existing.maxBytes === expectation.maxBytes) {
      return Effect.void;
    }
    return Effect.fail(
      new EditorialReviewFileLimitConflictError({
        firstMaxBytes: existing.maxBytes,
        path: expectation.path,
        secondMaxBytes: expectation.maxBytes,
      })
    );
  }
  return Effect.fail(
    new EditorialReviewFileConflictError({
      firstHash: existing.hash,
      path: expectation.path,
      secondHash: expectation.hash,
    })
  );
}

/** Derives every unique exact file identity covered by review records. */
const collectReviewFiles = Effect.fn("AksaraPublisher.collectReviewFiles")(
  function* (records: readonly EditorialReviewRecord[]) {
    const files = new Map<CorpusSourcePath, ReviewFileExpectation>();
    for (const record of records) {
      const maxBytes =
        record.reviewMode === "immutable-official-source"
          ? MAX_REVIEWED_OFFICIAL_SOURCE_BYTES
          : MAX_RAW_MDX_BYTES;
      yield* registerExpectation(files, {
        hash: record.targetHash,
        maxBytes,
        path: record.targetPath,
      });
      for (const source of record.sources) {
        yield* registerExpectation(files, {
          hash: source.sourceHash,
          maxBytes,
          path: source.sourcePath,
        });
      }
    }
    return [...files.values()];
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
      maxBytes: expectation.maxBytes,
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
)(function* (input: { readonly manifest: unknown }) {
  const manifest = yield* verifyEditorialReviewManifest(input.manifest);
  const files = yield* collectReviewFiles(manifest.records);
  const gitBlob = yield* GitBlob;
  yield* Effect.forEach(
    files,
    (expectation) => verifyReviewFile(gitBlob, manifest.revision, expectation),
    { concurrency: 8, discard: true }
  );
  return manifest satisfies EditorialReviewManifest;
});

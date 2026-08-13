import { createHash } from "node:crypto";

import type { EditorialReviewRecord } from "@nakafa/aksara-contracts/editorial/review";
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

import {
  assembleEditorialReviewManifest,
  decodeEditorialJson,
  EditorialReviewCatalogSchema,
  MAX_EDITORIAL_REVIEW_CATALOG_BYTES,
  MAX_EDITORIAL_REVIEW_PART_BYTES,
} from "#publisher/editorial/catalog";
import { GitBlob, makeGitBlobLive } from "#publisher/git/blob";

const EDITORIAL_REVIEW_MANIFEST_PATH = CorpusSourcePathSchema.make(
  "packages/corpus/editorial/review/catalog.json"
);

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

/** Exact-Git review evidence could not be loaded or authenticated. */
export class EditorialReviewLoadError extends Schema.TaggedError<EditorialReviewLoadError>()(
  "EditorialReviewLoadError",
  { cause: Schema.Unknown }
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
    if (expectation.maxBytes > existing.maxBytes) {
      files.set(expectation.path, expectation);
    }
    return Effect.void;
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

/** Computes the exact SHA-256 identity of one Git blob. */
function hashReviewFile(content: Uint8Array) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256").update(content).digest("hex")}`
  );
}

/** Verifies one review-owned file against its exact immutable Git blob. */
const verifyReviewFile = Effect.fn("AksaraPublisher.verifyReviewFile")(
  function* (expectation: ReviewFileExpectation, content: Uint8Array) {
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
  const contents = yield* gitBlob.readManyBytes(
    files.map(({ maxBytes, path }) => ({
      maxBytes,
      revision: input.revision,
      sourcePath: path,
    }))
  );
  for (const expectation of files) {
    const content = contents.get(expectation.path);
    if (content === undefined) {
      return yield* new EditorialReviewLoadError({ cause: expectation });
    }
    yield* verifyReviewFile(expectation, content);
  }
  return manifest;
});

/** Loads and verifies the canonical review manifest from one exact revision. */
export const loadEditorialReviewManifest = Effect.fn(
  "AksaraPublisher.loadEditorialReviewManifest"
)(function* (input: {
  readonly repositoryRoot: string;
  readonly revision: GitCommitSha;
}) {
  const program = Effect.gen(function* () {
    const gitBlob = yield* GitBlob;
    const catalogBytes = yield* gitBlob.readBytes({
      maxBytes: MAX_EDITORIAL_REVIEW_CATALOG_BYTES,
      revision: input.revision,
      sourcePath: EDITORIAL_REVIEW_MANIFEST_PATH,
    });
    const catalog = yield* decodeEditorialJson(
      EditorialReviewCatalogSchema,
      catalogBytes,
      EDITORIAL_REVIEW_MANIFEST_PATH
    );
    const parts = yield* gitBlob.readManyBytes(
      catalog.parts.map(({ sourcePath }) => ({
        maxBytes: MAX_EDITORIAL_REVIEW_PART_BYTES,
        revision: input.revision,
        sourcePath,
      }))
    );
    const manifest = yield* assembleEditorialReviewManifest(catalog, parts);
    return yield* verifyEditorialReviewSources({
      manifest,
      revision: input.revision,
    });
  });
  return yield* program.pipe(
    Effect.provide(makeGitBlobLive(input.repositoryRoot)),
    Effect.mapError((cause) => new EditorialReviewLoadError({ cause }))
  );
});

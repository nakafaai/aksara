import { Effect, FileSystem, Path, Result, Schema } from "effect";

import { downloadGermanQuranSource } from "#corpus/quran/source/download";
import { GermanQuranSourceSyncError } from "#corpus/quran/source/error";
import {
  GERMAN_QURAN_EDITION_URL,
  GERMAN_QURAN_PUBLICATION_URL,
  GERMAN_QURAN_SOURCE_URL,
  GERMAN_QURAN_TERMS_URL,
  type PinnedQuranFile,
  QURAN_SOURCE_POLICY,
} from "#corpus/quran/source/policy";

const GermanSourceReplacementSchema = Schema.Struct({
  backup: Schema.String,
  staging: Schema.String,
  target: Schema.String,
});
type GermanSourceReplacement = typeof GermanSourceReplacementSchema.Type;

/** Replaces the complete source bundle and restores its prior tree on failure. */
const replaceGermanSourceBundle = Effect.fn(
  "AksaraCorpus.replaceGermanQuranSourceBundle"
)(function* (input: GermanSourceReplacement) {
  const fileSystem = yield* FileSystem.FileSystem;
  const hasTarget = yield* fileSystem.exists(input.target);
  if (hasTarget) {
    yield* fileSystem.rename(input.target, input.backup);
  }

  const installation = yield* fileSystem
    .rename(input.staging, input.target)
    .pipe(Effect.result);
  if (Result.isFailure(installation)) {
    if (!hasTarget) {
      return yield* installation.failure;
    }

    const restoration = yield* fileSystem
      .rename(input.backup, input.target)
      .pipe(Effect.result);
    if (Result.isFailure(restoration)) {
      return yield* Effect.fail({
        installation: installation.failure,
        restoration: restoration.failure,
      });
    }
    return yield* installation.failure;
  }

  if (hasTarget) {
    yield* fileSystem.remove(input.backup, { force: true, recursive: true });
  }
});

/** Removes staging debt without deleting the only recoverable prior tree. */
const cleanupGermanSourceBundle = Effect.fn(
  "AksaraCorpus.cleanupGermanQuranSourceBundle"
)(function* (input: GermanSourceReplacement) {
  const fileSystem = yield* FileSystem.FileSystem;
  yield* fileSystem.remove(input.staging, { force: true, recursive: true });
  const hasTarget = yield* fileSystem.exists(input.target);
  if (!hasTarget) {
    return;
  }
  yield* fileSystem.remove(input.backup, { force: true, recursive: true });
});

/**
 * Writes every authenticated German artifact into one isolated staging tree.
 * Each entry pairs one pinned file with its authenticated bytes.
 */
const stageSources = Effect.fn("AksaraCorpus.stageGermanQuranSources")(
  function* (
    staging: string,
    sources: readonly (readonly [PinnedQuranFile, Uint8Array])[]
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    /** Maps one filesystem failure to the exact artifact being installed. */
    const mapWriteError = (source: PinnedQuranFile) => (cause: unknown) =>
      new GermanQuranSourceSyncError({
        cause,
        phase: "write",
        source: source.name,
      });
    yield* Effect.forEach(
      sources,
      ([source, bytes]) =>
        fileSystem
          .writeFile(path.join(staging, path.basename(source.path)), bytes)
          .pipe(Effect.mapError(mapWriteError(source))),
      { concurrency: 4, discard: true }
    );
  }
);

/** Downloads and installs the complete authenticated German source bundle. */
export const syncGermanQuranSources = Effect.fn(
  "AksaraCorpus.syncGermanQuranSources"
)(function* (repositoryRoot: string) {
  const translation = QURAN_SOURCE_POLICY.data.translations.de;
  const publication = QURAN_SOURCE_POLICY.evidence.germanPublication;
  const edition = QURAN_SOURCE_POLICY.data.names.de;
  const terms = QURAN_SOURCE_POLICY.terms.islamhouse;
  const bytes = yield* Effect.all(
    {
      edition: downloadGermanQuranSource(edition, GERMAN_QURAN_EDITION_URL),
      publication: downloadGermanQuranSource(
        publication,
        GERMAN_QURAN_PUBLICATION_URL
      ),
      terms: downloadGermanQuranSource(terms, GERMAN_QURAN_TERMS_URL),
      translation: downloadGermanQuranSource(
        translation,
        GERMAN_QURAN_SOURCE_URL
      ),
    },
    { concurrency: 4 }
  );
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const sourceRoot = path.join(repositoryRoot, "packages/corpus/quran/sources");
  const replacement = {
    backup: path.join(sourceRoot, "german-previous"),
    target: path.join(sourceRoot, "german"),
  };
  const bundleName = "German Quran source bundle";
  /** Maps an atomic bundle installation failure to its owned sync phase. */
  const writeError = (cause: unknown) =>
    new GermanQuranSourceSyncError({
      cause,
      phase: "write",
      source: bundleName,
    });
  yield* fileSystem
    .makeDirectory(sourceRoot, { recursive: true })
    .pipe(Effect.mapError(writeError));
  const staging = yield* Effect.acquireRelease(
    fileSystem
      .makeTempDirectory({ directory: sourceRoot, prefix: "german-stage-" })
      .pipe(Effect.mapError(writeError)),
    (directory) =>
      cleanupGermanSourceBundle({
        ...replacement,
        staging: directory,
      }).pipe(Effect.ignore)
  );
  yield* stageSources(staging, [
    [edition, bytes.edition],
    [publication, bytes.publication],
    [terms, bytes.terms],
    [translation, bytes.translation],
  ]);
  yield* replaceGermanSourceBundle({ ...replacement, staging }).pipe(
    Effect.mapError(writeError)
  );
  return {
    edition: {
      byteCount: bytes.edition.byteLength,
      digest: edition.artifact.digest,
      path: path.join(sourceRoot, edition.path),
    },
    publication: {
      byteCount: bytes.publication.byteLength,
      digest: publication.artifact.digest,
      path: path.join(sourceRoot, publication.path),
    },
    terms: {
      byteCount: bytes.terms.byteLength,
      digest: terms.artifact.digest,
      path: path.join(sourceRoot, terms.path),
    },
    translation: {
      byteCount: bytes.translation.byteLength,
      digest: translation.artifact.digest,
      path: path.join(sourceRoot, translation.path),
    },
  };
});

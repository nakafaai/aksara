import { createHash } from "node:crypto";
import { readBytes } from "@nakafa/aksara-utilities/http/response";
import { Duration, Effect, FileSystem, Path, Result, Schema } from "effect";
import { HttpClient } from "effect/unstable/http";

import {
  GERMAN_QURAN_EDITION_URL,
  GERMAN_QURAN_PUBLICATION_URL,
  GERMAN_QURAN_SOURCE_URL,
  GERMAN_QURAN_TERMS_URL,
  type PinnedQuranFile,
  QURAN_SOURCE_POLICY,
} from "#corpus/quran/source/policy";

const SOURCE_DOWNLOAD_TIMEOUT = Duration.seconds(60);

interface GermanSourceReplacement {
  readonly backup: string;
  readonly staging: string;
  readonly target: string;
}

/** Download, integrity, or atomic installation of one German source failed. */
export class GermanQuranSourceSyncError extends Schema.TaggedError<GermanQuranSourceSyncError>()(
  "GermanQuranSourceSyncError",
  {
    cause: Schema.Unknown,
    phase: Schema.Literals(["download", "integrity", "write"]),
    source: Schema.Trimmed.check(Schema.isNonEmpty()),
  }
) {}

/** Returns one lowercase SHA-256 digest for exact official bytes. */
function digest(bytes: Uint8Array) {
  return createHash("sha256").update(bytes).digest("hex");
}

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

/** Downloads one bounded official artifact and authenticates its exact bytes. */
const downloadSource = Effect.fn("AksaraCorpus.downloadGermanQuranSource")(
  (source: PinnedQuranFile, url: string) =>
    Effect.gen(function* () {
      const client = (yield* HttpClient.HttpClient).pipe(
        HttpClient.filterStatusOk
      );
      const response = yield* client.get(url).pipe(
        Effect.mapError(
          (cause) =>
            new GermanQuranSourceSyncError({
              cause,
              phase: "download",
              source: source.name,
            })
        )
      );
      const bytes = yield* readBytes(response, source.artifact.byteCount).pipe(
        Effect.mapError(
          (cause) =>
            new GermanQuranSourceSyncError({
              cause,
              phase: "download",
              source: source.name,
            })
        )
      );
      if (
        bytes.byteLength !== source.artifact.byteCount ||
        digest(bytes) !== source.artifact.digest.slice("sha256:".length)
      ) {
        return yield* new GermanQuranSourceSyncError({
          cause:
            "Downloaded bytes do not match the pinned Quran source policy.",
          phase: "integrity",
          source: source.name,
        });
      }
      return bytes;
    }).pipe(
      Effect.timeoutOrElse({
        duration: SOURCE_DOWNLOAD_TIMEOUT,
        orElse: () =>
          Effect.fail(
            new GermanQuranSourceSyncError({
              cause: "Official source download exceeded 60 seconds.",
              phase: "download",
              source: source.name,
            })
          ),
      })
    )
);

/** Writes every authenticated German artifact into one isolated staging tree. */
const stageSources = Effect.fn("AksaraCorpus.stageGermanQuranSources")(
  function* (
    staging: string,
    sources: readonly {
      readonly bytes: Uint8Array;
      readonly source: PinnedQuranFile;
    }[]
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
      ({ bytes, source }) =>
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
      edition: downloadSource(edition, GERMAN_QURAN_EDITION_URL),
      publication: downloadSource(publication, GERMAN_QURAN_PUBLICATION_URL),
      terms: downloadSource(terms, GERMAN_QURAN_TERMS_URL),
      translation: downloadSource(translation, GERMAN_QURAN_SOURCE_URL),
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
    { bytes: bytes.edition, source: edition },
    { bytes: bytes.publication, source: publication },
    { bytes: bytes.terms, source: terms },
    { bytes: bytes.translation, source: translation },
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

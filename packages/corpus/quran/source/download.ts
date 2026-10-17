import { readBytes } from "@nakafa/aksara-utilities/http/response";
import { Duration, Effect } from "effect";
import { HttpClient } from "effect/http";

import { GermanQuranSourceSyncError } from "#corpus/quran/source/error";
import { type PinnedQuranFile, sha256Hex } from "#corpus/quran/source/policy";

const SOURCE_DOWNLOAD_TIMEOUT = Duration.seconds(60);

/** Downloads one bounded official artifact and authenticates its exact bytes. */
export const downloadGermanQuranSource = Effect.fn(
  "AksaraCorpus.downloadGermanQuranSource"
)((source: PinnedQuranFile, url: string) =>
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
    const digest = yield* sha256Hex(bytes).pipe(
      Effect.mapError(
        (cause) =>
          new GermanQuranSourceSyncError({
            cause,
            phase: "integrity",
            source: source.name,
          })
      )
    );
    if (
      bytes.byteLength !== source.artifact.byteCount ||
      digest !== source.artifact.digest.slice("sha256:".length)
    ) {
      return yield* new GermanQuranSourceSyncError({
        cause: "Downloaded bytes do not match the pinned Quran source policy.",
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

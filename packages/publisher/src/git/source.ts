import { CompileDocumentSourceSchema } from "@nakafa/aksara-contracts/content";
import type { GitCommitSha } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseItem } from "@nakafa/aksara-contracts/release";
import { Effect, Layer, Stream } from "effect";
import { MAX_GIT_BATCH_BLOBS } from "#publisher/git/batch";
import { GitBlob, makeGitBlobLive } from "#publisher/git/blob";
import {
  PublicationSource,
  PublicationSourceError,
} from "#publisher/publication/spec";

/** Loads one bounded source batch while preserving authenticated item order. */
const loadBatch = Effect.fn("AksaraPublisher.loadGitSourceBatch")(function* (
  gitBlob: typeof GitBlob.Service,
  aksaraSha: GitCommitSha,
  items: readonly ContentReleaseItem[]
) {
  const changes = yield* Effect.forEach(items, (item) => {
    if (item.change.operation === "delete") {
      return Effect.fail(
        new PublicationSourceError({
          aksaraSha,
          cause: item,
          message: "PublicationSource accepts authenticated upsert items only.",
        })
      );
    }
    return Effect.succeed(item.change);
  });
  const blobs = yield* gitBlob
    .read({
      revision: aksaraSha,
      sourcePaths: changes.map(({ sourcePath }) => sourcePath),
    })
    .pipe(
      Effect.mapError(
        (cause) =>
          new PublicationSourceError({
            aksaraSha,
            cause,
            message: "The reviewed Aksara revision could not provide a source.",
          })
      )
    );
  return yield* Effect.forEach(changes, (change) =>
    Effect.fromNullishOr(blobs.get(change.sourcePath)).pipe(
      Effect.orDie,
      Effect.map((rawMdx) =>
        CompileDocumentSourceSchema.make({
          artifactLocale: change.artifactLocale,
          contentKey: change.contentKey,
          rawMdx,
          rendererDomain: change.rendererDomain,
          sourcePath: change.sourcePath,
        })
      )
    )
  );
});

const GitPublicationSourceFromBlob = Layer.effect(
  PublicationSource,
  GitBlob.pipe(
    Effect.map((gitBlob) =>
      PublicationSource.of({
        /** Streams sequential bounded batches without collecting the corpus. */
        loadExactRevision: ({ aksaraSha, items }) =>
          items.pipe(
            Stream.grouped(MAX_GIT_BATCH_BLOBS),
            Stream.mapEffect((batch) => loadBatch(gitBlob, aksaraSha, batch)),
            Stream.flatMap(Stream.fromIterable)
          ),
      })
    )
  )
);

/** Builds a publication source bound to one already verified checkout root. */
export function makeGitPublicationSourceLive(repositoryRoot: string) {
  return GitPublicationSourceFromBlob.pipe(
    Layer.provide(makeGitBlobLive(repositoryRoot))
  );
}

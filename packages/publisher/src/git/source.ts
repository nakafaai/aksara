import { CompileDocumentSourceSchema } from "@nakafa/aksara-contracts/content";
import type { GitCommitSha } from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import type { ContentReleaseItem } from "@nakafa/aksara-contracts/release";
import { Effect, Layer, Stream } from "effect";
import { GitBlob, makeGitBlobLive } from "#publisher/git/blob";
import {
  PublicationSource,
  PublicationSourceError,
} from "#publisher/publication/spec";

/** Loads one signed upsert identity from its immutable reviewed Git blob. */
function loadItem(
  gitBlob: typeof GitBlob.Service,
  aksaraSha: GitCommitSha,
  item: ContentReleaseItem
) {
  if (item.change.operation === "delete") {
    return Effect.fail(
      new PublicationSourceError({
        aksaraSha,
        cause: item,
        message: "PublicationSource accepts authenticated upsert items only.",
      })
    );
  }

  const { change } = item;

  return gitBlob
    .read({
      maxBytes: MAX_RAW_MDX_BYTES,
      revision: aksaraSha,
      sourcePath: change.sourcePath,
    })
    .pipe(
      Effect.map((rawMdx) =>
        CompileDocumentSourceSchema.make({
          contentKey: change.contentKey,
          locale: change.locale,
          rawMdx,
          rendererDomain: change.rendererDomain,
          sourcePath: change.sourcePath,
        })
      ),
      Effect.mapError(
        (cause) =>
          new PublicationSourceError({
            aksaraSha,
            cause,
            message: "The reviewed Aksara revision could not provide a source.",
          })
      )
    );
}

const GitPublicationSourceFromBlob = Layer.effect(
  PublicationSource,
  GitBlob.pipe(
    Effect.map((gitBlob) =>
      PublicationSource.of({
        /** Streams exact-Git sources for authenticated upsert items only. */
        loadExactRevision: ({ aksaraSha, items }) =>
          items.pipe(
            Stream.mapEffect((item) => loadItem(gitBlob, aksaraSha, item))
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

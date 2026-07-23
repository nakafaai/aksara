import {
  type ContentFamily,
  compareContentHeads,
} from "@nakafa/aksara-contracts/content";
import type { ReleaseId, Sha256Hash } from "@nakafa/aksara-contracts/ids";
import type {
  ArticleHead,
  ContentHead,
  HeadPage,
  MaterialHead,
  QuestionHead,
} from "@nakafa/aksara-contracts/release/head";
import { MAX_HEAD_PAGE_COUNT } from "@nakafa/aksara-contracts/transport/limits";
import { Chunk, Effect, Option, Stream, Tuple } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";
import {
  type PublicationTargetFailure,
  PublicationTargetProtocolError,
} from "#publisher/target/errors";

interface HeadPageState {
  readonly cursor: string | null;
  readonly last: ContentHead | undefined;
}

/** Creates one permanent contradiction for a non-canonical target page stream. */
function headPageError() {
  return new PublicationTargetProtocolError({
    reason: "response-evidence",
    stage: "heads",
  });
}

/** Proves the next page begins strictly after the prior page's final head. */
function validatePageOrder(
  previous: ContentHead | undefined,
  heads: readonly ContentHead[]
) {
  const [first] = heads;
  if (
    previous === undefined ||
    first === undefined ||
    compareContentHeads(previous, first) < 0
  ) {
    return Effect.void;
  }
  return Effect.fail(headPageError());
}

/** Derives the next exact cursor state without accepting stalled pagination. */
function nextPageState(previous: HeadPageState, page: HeadPage) {
  if (page.done) {
    return Effect.succeed(Option.none<HeadPageState>());
  }
  if (page.nextCursor === null || page.nextCursor === previous.cursor) {
    return Effect.fail(headPageError());
  }
  return Effect.succeed(
    Option.some<HeadPageState>({
      cursor: page.nextCursor,
      last: page.heads.at(-1) ?? previous.last,
    })
  );
}

/** Streams every compact article head while binding all pages to one release. */
export function streamContentHeads(
  activeReleaseId: ReleaseId,
  activeManifestHash: Sha256Hash,
  family: "article"
): Stream.Stream<ArticleHead, PublicationTargetFailure, PublicationTarget>;

/** Streams every compact material head while binding all pages to one release. */
export function streamContentHeads(
  activeReleaseId: ReleaseId,
  activeManifestHash: Sha256Hash,
  family: "material"
): Stream.Stream<MaterialHead, PublicationTargetFailure, PublicationTarget>;

/** Streams every compact question head while binding all pages to one release. */
export function streamContentHeads(
  activeReleaseId: ReleaseId,
  activeManifestHash: Sha256Hash,
  family: "question"
): Stream.Stream<QuestionHead, PublicationTargetFailure, PublicationTarget>;

/** Streams every compact family head while binding all pages to one release. */
export function streamContentHeads(
  activeReleaseId: ReleaseId,
  activeManifestHash: Sha256Hash,
  family: ContentFamily
): Stream.Stream<ContentHead, PublicationTargetFailure, PublicationTarget> {
  const initial: HeadPageState = { cursor: null, last: undefined };
  return Stream.paginateChunkEffect(initial, (state) =>
    Effect.gen(function* () {
      const target = yield* PublicationTarget;
      const page = yield* target.headPage({
        activeManifestHash,
        activeReleaseId,
        cursor: state.cursor,
        family,
        limit: MAX_HEAD_PAGE_COUNT,
      });
      if (page.family !== family) {
        return yield* Effect.fail(headPageError());
      }
      yield* validatePageOrder(state.last, page.heads);
      const next = yield* nextPageState(state, page);
      return Tuple.make(Chunk.fromIterable<ContentHead>(page.heads), next);
    })
  );
}

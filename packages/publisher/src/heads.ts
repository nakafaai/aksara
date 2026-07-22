import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import type {
  HeadPage,
  MaterialHead,
} from "@nakafa/aksara-contracts/release/head";
import { MAX_HEAD_PAGE_COUNT } from "@nakafa/aksara-contracts/transport/limits";
import { Chunk, Effect, Option, Stream } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";
import { PublicationTargetProtocolError } from "#publisher/target/errors";

interface HeadPageState {
  readonly cursor: string | null;
  readonly last: MaterialHead | undefined;
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
  previous: MaterialHead | undefined,
  heads: readonly MaterialHead[]
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
function nextPageState(page: HeadPage) {
  if (page.done) {
    return Effect.succeed(Option.none<HeadPageState>());
  }
  const last = page.heads.at(-1);
  if (page.nextCursor === null || last === undefined) {
    return Effect.fail(headPageError());
  }
  return Effect.succeed(
    Option.some<HeadPageState>({ cursor: page.nextCursor, last })
  );
}

/** Streams every compact material head while binding all pages to one release. */
export function streamMaterialHeads(activeReleaseId: ReleaseId) {
  const initial: HeadPageState = { cursor: null, last: undefined };
  return Stream.paginateChunkEffect(initial, (state) =>
    Effect.gen(function* () {
      const target = yield* PublicationTarget;
      const page = yield* target.headPage({
        activeReleaseId,
        cursor: state.cursor,
        family: "material",
        limit: MAX_HEAD_PAGE_COUNT,
      });
      yield* validatePageOrder(state.last, page.heads);
      const next = yield* nextPageState(page);
      return [Chunk.fromIterable(page.heads), next] as const;
    })
  );
}

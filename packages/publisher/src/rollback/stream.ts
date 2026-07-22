import { Buffer } from "node:buffer";
import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import {
  canonicalizeRollbackPage,
  MAX_ROLLBACK_PAGE_RECORDS,
  type RollbackPage,
  RollbackPageSchema,
  type RollbackRecord,
} from "@nakafa/aksara-contracts/release/rollback";
import { Chunk, Effect, Option, Schema, Stream, Tuple } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";
import {
  RollbackPageByteLimitError,
  RollbackPageCursorError,
  RollbackPageDecodeError,
  RollbackPageIdentityError,
  RollbackPageTotalError,
} from "#publisher/rollback/errors";
import type { PublicationTargetFailure } from "#publisher/target-errors";

/** Maximum complete rollback page bytes accepted from publication storage. */
export const MAX_ROLLBACK_PAGE_BYTES = 4 * 1024 * 1024;

interface RollbackCursor {
  readonly afterIndex: number;
  readonly total: number | undefined;
}

/** Strictly decodes one unknown target response with no excess properties. */
function decodePage(source: unknown, afterIndex: number) {
  return Schema.decodeUnknown(RollbackPageSchema)(source, {
    onExcessProperty: "error",
  }).pipe(Effect.mapError(() => new RollbackPageDecodeError({ afterIndex })));
}

/** Requires the decoded page to stay below the complete wire ceiling. */
function validatePageBytes(page: RollbackPage, afterIndex: number) {
  const actualBytes = Buffer.byteLength(canonicalizeRollbackPage(page), "utf8");
  if (actualBytes <= MAX_ROLLBACK_PAGE_BYTES) {
    return Effect.void;
  }
  return Effect.fail(
    new RollbackPageByteLimitError({
      actualBytes,
      afterIndex,
      maxBytes: MAX_ROLLBACK_PAGE_BYTES,
    })
  );
}

/** Requires every page to name the exact active release being reversed. */
function validatePageIdentity(
  page: RollbackPage,
  rollbackOf: ReleaseId,
  afterIndex: number
) {
  if (page.rollbackOf === rollbackOf) {
    return Effect.void;
  }
  return Effect.fail(
    new RollbackPageIdentityError({
      actualReleaseId: page.rollbackOf,
      afterIndex,
      expectedReleaseId: rollbackOf,
    })
  );
}

/** Requires one stable source total across every page in one replay. */
function validatePageTotal(page: RollbackPage, cursor: RollbackCursor) {
  if (cursor.total === undefined || cursor.total === page.total) {
    return Effect.void;
  }
  return Effect.fail(
    new RollbackPageTotalError({
      actualTotal: page.total,
      afterIndex: cursor.afterIndex,
      expectedTotal: cursor.total,
    })
  );
}

/** Requires the first returned record to continue the exact index cursor. */
function validatePageCursor(page: RollbackPage, afterIndex: number) {
  const expectedIndex = afterIndex + 1;
  const actualIndex = page.records[0]?.index ?? page.nextIndex + 1;
  if (actualIndex === expectedIndex) {
    return Effect.void;
  }
  return Effect.fail(
    new RollbackPageCursorError({ actualIndex, afterIndex, expectedIndex })
  );
}

/** Computes the next cursor without retaining any prior page bodies. */
function nextCursor(page: RollbackPage, cursor: RollbackCursor) {
  if (page.done) {
    return Option.none<RollbackCursor>();
  }
  return Option.some<RollbackCursor>({
    afterIndex: page.nextIndex,
    total: cursor.total ?? page.total,
  });
}

/** Loads and validates one bounded page before exposing any of its records. */
function loadPage(
  rollbackOf: ReleaseId,
  cursor: RollbackCursor
): Effect.Effect<
  readonly [Chunk.Chunk<RollbackRecord>, Option.Option<RollbackCursor>],
  | PublicationTargetFailure
  | RollbackPageByteLimitError
  | RollbackPageCursorError
  | RollbackPageDecodeError
  | RollbackPageIdentityError
  | RollbackPageTotalError,
  PublicationTarget
> {
  return PublicationTarget.pipe(
    Effect.flatMap((target) =>
      target.rollbackPage({
        afterIndex: cursor.afterIndex,
        limit: MAX_ROLLBACK_PAGE_RECORDS,
        rollbackOf,
      })
    ),
    Effect.flatMap((source) => decodePage(source, cursor.afterIndex)),
    Effect.tap((page) => validatePageBytes(page, cursor.afterIndex)),
    Effect.tap((page) =>
      validatePageIdentity(page, rollbackOf, cursor.afterIndex)
    ),
    Effect.tap((page) => validatePageTotal(page, cursor)),
    Effect.tap((page) => validatePageCursor(page, cursor.afterIndex)),
    Effect.map((page) =>
      Tuple.make(Chunk.fromIterable(page.records), nextCursor(page, cursor))
    )
  );
}

/** Replays exact prior-state records through bounded index-cursor pages. */
export function streamRollbackRecords(rollbackOf: ReleaseId) {
  const initial: RollbackCursor = { afterIndex: -1, total: undefined };
  return Stream.paginateChunkEffect(initial, (cursor) =>
    loadPage(rollbackOf, cursor)
  );
}

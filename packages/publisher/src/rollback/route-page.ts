import type { ReleaseId, Sha256Hash } from "@nakafa/aksara-contracts/ids";
import {
  MAX_ROUTE_PAGE_RECORDS,
  type RoutePage,
  RoutePageSchema,
  type RouteRollbackRecord,
} from "@nakafa/aksara-contracts/release/route-page";
import { Chunk, Effect, Option, Schema, Stream, Tuple } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";
import {
  RoutePageCursorError,
  RoutePageDecodeError,
  RoutePageIdentityError,
  RoutePageTotalError,
} from "#publisher/rollback/errors";
import type { PublicationTargetFailure } from "#publisher/target/errors";

interface RouteCursor {
  readonly afterIndex: number;
  readonly total: number;
}

/** Strictly decodes one unknown target route page. */
function decodePage(source: unknown, afterIndex: number) {
  return Schema.decodeUnknown(RoutePageSchema)(source, {
    onExcessProperty: "error",
  }).pipe(Effect.mapError(() => new RoutePageDecodeError({ afterIndex })));
}

/** Requires every page to name the exact release being reversed. */
function validateIdentity(
  page: RoutePage,
  rollbackOf: ReleaseId,
  rollbackOfManifestHash: Sha256Hash,
  afterIndex: number
) {
  if (
    page.rollbackOf === rollbackOf &&
    page.rollbackOfManifestHash === rollbackOfManifestHash
  ) {
    return Effect.void;
  }
  return Effect.fail(
    new RoutePageIdentityError({
      actualManifestHash: page.rollbackOfManifestHash,
      actualReleaseId: page.rollbackOf,
      afterIndex,
      expectedManifestHash: rollbackOfManifestHash,
      expectedReleaseId: rollbackOf,
    })
  );
}

/** Requires one stable signed total across every replayed route page. */
function validateTotal(page: RoutePage, cursor: RouteCursor) {
  if (cursor.total === page.total) {
    return Effect.void;
  }
  return Effect.fail(
    new RoutePageTotalError({
      actualTotal: page.total,
      afterIndex: cursor.afterIndex,
      expectedTotal: cursor.total,
    })
  );
}

/** Requires the first route record to continue the exact index cursor. */
function validateCursor(page: RoutePage, afterIndex: number) {
  const expectedIndex = afterIndex + 1;
  const actualIndex = page.records[0]?.current.index ?? page.nextIndex + 1;
  if (actualIndex === expectedIndex) {
    return Effect.void;
  }
  return Effect.fail(
    new RoutePageCursorError({ actualIndex, afterIndex, expectedIndex })
  );
}

/** Computes the next route cursor without retaining prior pages. */
function nextCursor(page: RoutePage, cursor: RouteCursor) {
  if (page.done) {
    return Option.none<RouteCursor>();
  }
  return Option.some<RouteCursor>({
    afterIndex: page.nextIndex,
    total: cursor.total,
  });
}

/** Loads and validates one route page before exposing its records. */
function loadPage(
  rollbackOf: ReleaseId,
  rollbackOfManifestHash: Sha256Hash,
  cursor: RouteCursor
): Effect.Effect<
  readonly [Chunk.Chunk<RouteRollbackRecord>, Option.Option<RouteCursor>],
  | PublicationTargetFailure
  | RoutePageCursorError
  | RoutePageDecodeError
  | RoutePageIdentityError
  | RoutePageTotalError,
  PublicationTarget
> {
  return PublicationTarget.pipe(
    Effect.flatMap((target) =>
      target.routePage({
        afterIndex: cursor.afterIndex,
        limit: MAX_ROUTE_PAGE_RECORDS,
        rollbackOf,
        rollbackOfManifestHash,
      })
    ),
    Effect.flatMap((source) => decodePage(source, cursor.afterIndex)),
    Effect.tap((page) =>
      validateIdentity(
        page,
        rollbackOf,
        rollbackOfManifestHash,
        cursor.afterIndex
      )
    ),
    Effect.tap((page) => validateTotal(page, cursor)),
    Effect.tap((page) => validateCursor(page, cursor.afterIndex)),
    Effect.map((page) =>
      Tuple.make(Chunk.fromIterable(page.records), nextCursor(page, cursor))
    )
  );
}

/** Replays exact prior route owners through bounded cursor pages. */
export function streamRouteRecords(
  rollbackOf: ReleaseId,
  rollbackOfManifestHash: Sha256Hash,
  expectedTotal: number
) {
  const initial: RouteCursor = { afterIndex: -1, total: expectedTotal };
  return Stream.paginateChunkEffect(initial, (cursor) =>
    loadPage(rollbackOf, rollbackOfManifestHash, cursor)
  );
}

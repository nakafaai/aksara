import { Schema } from "effect";
import {
  ContentKeySchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { ContentRouteItemSchema } from "#contracts/release/route/spec";

/** Maximum route rollback records returned by one target page. */
export const MAX_ROUTE_PAGE_RECORDS = 100;

const RouteCursorSchema = Schema.Finite.pipe(
  Schema.check(Schema.isInt()),
  Schema.check(Schema.isGreaterThanOrEqualTo(-1))
);

/** One signed route mutation paired with its exact prior owner. */
export const RouteRollbackRecordSchema = Schema.Struct({
  current: ContentRouteItemSchema,
  priorContentKey: Schema.NullOr(ContentKeySchema),
}).pipe(
  Schema.check(
    Schema.makeFilter(
      (record) =>
        record.current.change.operation === "delete"
          ? record.priorContentKey !== null
          : record.priorContentKey !== record.current.change.contentKey,
      {
        message: "Expected a route change to alter the prior binding owner.",
      }
    )
  )
);
export type RouteRollbackRecord = typeof RouteRollbackRecordSchema.Type;

/** Indexed request for one bounded route rollback page. */
export const RoutePageRequestSchema = Schema.Struct({
  afterIndex: RouteCursorSchema,
  limit: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(
      Schema.isBetween({ maximum: MAX_ROUTE_PAGE_RECORDS, minimum: 1 })
    )
  ),
  rollbackOf: ReleaseIdSchema,
  rollbackOfManifestHash: Sha256HashSchema,
});
export type RoutePageRequest = typeof RoutePageRequestSchema.Type;

/** Checks stable total and contiguous signed route indexes. */
function hasCoherentRoutePage(page: {
  readonly done: boolean;
  readonly nextIndex: number;
  readonly records: readonly RouteRollbackRecord[];
  readonly total: number;
}) {
  const [first] = page.records;
  const last = page.records.at(-1);
  if (!(first && last)) {
    return page.done && page.nextIndex === -1 && page.total === 0;
  }
  const contiguous = page.records.every(
    (record, offset) => record.current.index === first.current.index + offset
  );
  return (
    contiguous &&
    last.current.index === page.nextIndex &&
    page.nextIndex < page.total &&
    page.done === (page.nextIndex + 1 === page.total)
  );
}

/** Strict bounded response carrying prior route owners for one release. */
export const RoutePageSchema = Schema.Struct({
  done: Schema.Boolean,
  nextIndex: RouteCursorSchema,
  records: Schema.Array(RouteRollbackRecordSchema).pipe(
    Schema.check(Schema.isMaxLength(MAX_ROUTE_PAGE_RECORDS))
  ),
  rollbackOf: ReleaseIdSchema,
  rollbackOfManifestHash: Sha256HashSchema,
  total: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThanOrEqualTo(0))
  ),
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentRoutePage, {
      message:
        "Expected one contiguous route page with coherent progress evidence.",
    })
  )
);
export type RoutePage = typeof RoutePageSchema.Type;

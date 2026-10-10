import { Effect, MutableHashMap, Option, Schema, Stream } from "effect";
import { routeIdentity } from "#contracts/content";
import { PublicPathSchema } from "#contracts/ids";
import { ReleaseCountSchema } from "#contracts/release/count";
import { ReleaseDigestMismatchFields } from "#contracts/release/mismatch";
import { digestRoutes } from "#contracts/release/route/digest";
import { ContentRouteItemSchema } from "#contracts/release/route/spec";
import type { ContentReleaseManifest } from "#contracts/release/spec";

/** One streamed route failed strict wire decoding. */
export class RouteDecodeError extends Schema.TaggedError<RouteDecodeError>()(
  "RouteDecodeError",
  { routeOffset: ReleaseCountSchema }
) {}

/** One route belongs to another release or sequence position. */
export class RouteIdentityError extends Schema.TaggedError<RouteIdentityError>()(
  "RouteIdentityError",
  { routeOffset: ReleaseCountSchema }
) {}

/** Two changes in one release target the same locale-specific route. */
export class RouteDuplicateError extends Schema.TaggedError<RouteDuplicateError>()(
  "RouteDuplicateError",
  { firstIndex: ReleaseCountSchema, publicPath: PublicPathSchema }
) {}

/** The streamed route count differs from its signed manifest. */
export class RouteCountError extends Schema.TaggedError<RouteCountError>()(
  "RouteCountError",
  { actualCount: ReleaseCountSchema, expectedCount: ReleaseCountSchema }
) {}

/** The streamed route digest differs from its signed manifest. */
export class RouteDigestError extends Schema.TaggedError<RouteDigestError>()(
  "RouteDigestError",
  { ...ReleaseDigestMismatchFields }
) {}

/** The item index that first bound each route identity in one stream of routes. */
type FirstRouteIndex = MutableHashMap.MutableHashMap<string, number>;

const VerifiedContentRoutesSchema = Schema.Struct({
  count: Schema.Finite,
});

/** Count authenticated without retaining complete route rows. */
export type VerifiedContentRoutes = typeof VerifiedContentRoutesSchema.Type;

/** Decodes one route and applies release, index, and uniqueness invariants. */
function decodeRoute(
  manifest: ContentReleaseManifest,
  firstRouteIndex: FirstRouteIndex,
  source: unknown,
  routeOffset: number
) {
  return Schema.decodeUnknownEffect(ContentRouteItemSchema)(source, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(() => new RouteDecodeError({ routeOffset })),
    Effect.filterOrFail(
      (item) =>
        item.releaseId === manifest.releaseId && item.index === routeOffset,
      () => new RouteIdentityError({ routeOffset })
    ),
    Effect.flatMap((item) => {
      const identity = routeIdentity(item.change);
      const firstIndex = Option.getOrUndefined(
        MutableHashMap.get(firstRouteIndex, identity)
      );
      if (firstIndex !== undefined) {
        return Effect.fail(
          new RouteDuplicateError({
            firstIndex,
            publicPath: item.change.publicPath,
          })
        );
      }
      MutableHashMap.set(firstRouteIndex, identity, item.index);
      return Effect.succeed(item);
    })
  );
}

/** Strictly decodes one replayable canonical route stream. */
export function decodeContentRoutes<E, R>(input: {
  readonly manifest: ContentReleaseManifest;
  readonly routes: Stream.Stream<unknown, E, R>;
}) {
  return Stream.unwrap(
    Effect.sync(() => {
      const firstRouteIndex = MutableHashMap.empty<string, number>();
      return input.routes.pipe(
        Stream.zipWithIndex,
        Stream.mapEffect(([source, routeOffset]) =>
          decodeRoute(input.manifest, firstRouteIndex, source, routeOffset)
        )
      );
    })
  );
}

/** Authenticates a replayable route stream against its signed manifest. */
export const verifyContentRoutes = Effect.fn(
  "AksaraContracts.verifyContentRoutes"
)(function* <E, R>(input: {
  readonly manifest: ContentReleaseManifest;
  readonly routes: Stream.Stream<unknown, E, R>;
}) {
  const summary = yield* digestRoutes(
    input.manifest.releaseId,
    decodeContentRoutes(input)
  );
  if (summary.count !== input.manifest.routeCount) {
    return yield* new RouteCountError({
      actualCount: summary.count,
      expectedCount: input.manifest.routeCount,
    });
  }
  if (summary.digest !== input.manifest.routeDigest) {
    return yield* new RouteDigestError({
      actualDigest: summary.digest,
      expectedDigest: input.manifest.routeDigest,
      releaseId: input.manifest.releaseId,
    });
  }
  return { count: summary.count } satisfies VerifiedContentRoutes;
});

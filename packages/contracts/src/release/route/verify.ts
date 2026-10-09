import { Effect, MutableHashMap, Option, Schema, Stream } from "effect";
import { routeIdentity } from "#contracts/content";
import {
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { digestRoutes } from "#contracts/release/route/digest";
import { ContentRouteItemSchema } from "#contracts/release/route/spec";
import type { ContentReleaseManifest } from "#contracts/release/spec";

const RouteIndexSchema = Schema.Finite.pipe(
  Schema.check(Schema.isInt()),
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);

/** One streamed route failed strict wire decoding. */
export class RouteDecodeError extends Schema.TaggedError<RouteDecodeError>()(
  "RouteDecodeError",
  { routeOffset: RouteIndexSchema }
) {}

/** One route belongs to another release or sequence position. */
export class RouteIdentityError extends Schema.TaggedError<RouteIdentityError>()(
  "RouteIdentityError",
  { routeOffset: RouteIndexSchema }
) {}

/** Two changes in one release target the same locale-specific route. */
export class RouteDuplicateError extends Schema.TaggedError<RouteDuplicateError>()(
  "RouteDuplicateError",
  { firstIndex: RouteIndexSchema, publicPath: PublicPathSchema }
) {}

/** The streamed route count differs from its signed manifest. */
export class RouteCountError extends Schema.TaggedError<RouteCountError>()(
  "RouteCountError",
  { actualCount: RouteIndexSchema, expectedCount: RouteIndexSchema }
) {}

/** The streamed route digest differs from its signed manifest. */
export class RouteDigestError extends Schema.TaggedError<RouteDigestError>()(
  "RouteDigestError",
  {
    actualDigest: Sha256HashSchema,
    expectedDigest: Sha256HashSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** Creates the route state that one stream of routes shares while it decodes. */
function routeState(): {
  firstIndex: MutableHashMap.MutableHashMap<string, number>;
} {
  return { firstIndex: MutableHashMap.empty<string, number>() };
}

type RouteState = ReturnType<typeof routeState>;

const VerifiedContentRoutesSchema = Schema.Struct({
  count: Schema.Finite,
});

/** Count authenticated without retaining complete route rows. */
export type VerifiedContentRoutes = typeof VerifiedContentRoutesSchema.Type;

/** Decodes one route and applies release, index, and uniqueness invariants. */
function decodeRoute(
  manifest: ContentReleaseManifest,
  state: RouteState,
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
        MutableHashMap.get(state.firstIndex, identity)
      );
      if (firstIndex !== undefined) {
        return Effect.fail(
          new RouteDuplicateError({
            firstIndex,
            publicPath: item.change.publicPath,
          })
        );
      }
      MutableHashMap.set(state.firstIndex, identity, item.index);
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
      const state = routeState();
      return input.routes.pipe(
        Stream.zipWithIndex,
        Stream.mapEffect(([source, routeOffset]) =>
          decodeRoute(input.manifest, state, source, routeOffset)
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

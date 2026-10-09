import { routeIdentity } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  PublicPathSchema,
  type ReleaseId,
} from "@nakafa/aksara-contracts/ids";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { projectionPublicPath } from "@nakafa/aksara-contracts/projection/spec";
import {
  type ContentRouteChange,
  ContentRouteChangeSchema,
  type ContentRouteItem,
  ContentRouteItemSchema,
} from "@nakafa/aksara-contracts/release/route/spec";
import {
  Array as Arr,
  Effect,
  MutableHashMap,
  Option,
  Order,
  Schema,
  Stream,
} from "effect";
import type { PreparedContentTransition } from "#publisher/preparation/spec";

const RouteVersionSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  contentKey: ContentKeySchema,
  publicPath: Schema.optional(PublicPathSchema),
});

/** One route-bearing state on either side of a content transition. */
export type RouteVersion = typeof RouteVersionSchema.Type;

export const RouteTransitionSchema = Schema.Struct({
  current: RouteVersionSchema,
  next: RouteVersionSchema,
});

/** Exact before-and-after states used to derive immutable route versions. */
export type RouteTransition = typeof RouteTransitionSchema.Type;

const RouteOwnerSchema = Schema.Struct({
  ...RouteVersionSchema.fields,
  publicPath: PublicPathSchema,
});

type RouteOwner = typeof RouteOwnerSchema.Type;

/** Two transition rows claimed the same route on one side of the delta. */
export class RoutePlanConflictError extends Schema.TaggedError<RoutePlanConflictError>()(
  "RoutePlanConflictError",
  {
    appLocale: AppLocaleSchema,
    existingContentKey: ContentKeySchema,
    incomingContentKey: ContentKeySchema,
    publicPath: PublicPathSchema,
    side: Schema.Literals(["current", "next"]),
  }
) {}

/** Creates the two empty ownership maps that one route plan fills in transition order. */
function emptyRoutePlanState() {
  return {
    current: MutableHashMap.empty<string, RouteOwner>(),
    next: MutableHashMap.empty<string, RouteOwner>(),
  };
}

type RoutePlanState = ReturnType<typeof emptyRoutePlanState>;

const IndexedRouteChangeSchema = Schema.Struct({
  change: ContentRouteChangeSchema,
  identity: Schema.String,
});

type IndexedRouteChange = typeof IndexedRouteChangeSchema.Type;

/** Derives the exact route transition represented by one body transition. */
export function routeTransitionForContent(
  transition: PreparedContentTransition
): RouteTransition {
  const current: RouteVersion =
    transition.prior.state === "absent"
      ? {
          appLocale: AppLocaleSchema.make(transition.prior.artifactLocale),
          contentKey: transition.prior.contentKey,
        }
      : {
          appLocale: AppLocaleSchema.make(transition.prior.head.artifactLocale),
          contentKey: transition.prior.head.contentKey,
          ...("publicPath" in transition.prior.head
            ? { publicPath: transition.prior.head.publicPath }
            : {}),
        };
  const { change } = transition.record;
  const publicPath =
    "projection" in transition.record
      ? projectionPublicPath(transition.record.projection)
      : undefined;
  const next: RouteVersion =
    "projection" in transition.record &&
    "appLocale" in transition.record.projection
      ? {
          appLocale: transition.record.projection.appLocale,
          contentKey: change.contentKey,
          publicPath,
        }
      : {
          appLocale: AppLocaleSchema.make(change.artifactLocale),
          contentKey: change.contentKey,
        };
  return { current, next };
}

/** Adds one compact route owner to its exact side of the bounded plan. */
function addOwner(
  owners: MutableHashMap.MutableHashMap<string, RouteOwner>,
  side: "current" | "next",
  version: RouteVersion
) {
  if (version.publicPath === undefined) {
    return Effect.void;
  }
  const owner: RouteOwner = { ...version, publicPath: version.publicPath };
  const identity = routeIdentity(owner);
  const existing = Option.getOrUndefined(MutableHashMap.get(owners, identity));
  if (existing !== undefined) {
    return Effect.fail(
      new RoutePlanConflictError({
        appLocale: version.appLocale,
        existingContentKey: existing.contentKey,
        incomingContentKey: version.contentKey,
        publicPath: version.publicPath,
        side,
      })
    );
  }
  MutableHashMap.set(owners, identity, owner);
  return Effect.void;
}

/** Indexes one transition into compact prior and desired ownership maps. */
function indexTransition(state: RoutePlanState, transition: RouteTransition) {
  return Effect.gen(function* () {
    yield* addOwner(state.current, "current", transition.current);
    yield* addOwner(state.next, "next", transition.next);
    return state;
  });
}

/** Derives one final desired-state change for an app-locale-specific route. */
function finalChange(
  current: RouteOwner,
  next: RouteOwner | undefined
): ContentRouteChange | undefined {
  if (next === undefined) {
    return {
      appLocale: current.appLocale,
      operation: "delete",
      publicPath: current.publicPath,
    };
  }
  if (current.contentKey === next.contentKey) {
    return;
  }
  return {
    appLocale: next.appLocale,
    contentKey: next.contentKey,
    operation: "bind",
    publicPath: next.publicPath,
  };
}

/** Produces one canonical final-path delta from compact ownership maps. */
function routeChanges(state: RoutePlanState) {
  const changed: IndexedRouteChange[] = Arr.flatMap(
    Arr.fromIterable(state.current),
    ([identity, current]) => {
      const change = finalChange(
        current,
        Option.getOrUndefined(MutableHashMap.get(state.next, identity))
      );
      return change === undefined ? [] : [{ change, identity }];
    }
  );
  const created: IndexedRouteChange[] = Arr.flatMap(
    Arr.fromIterable(state.next),
    ([identity, next]) =>
      MutableHashMap.has(state.current, identity)
        ? []
        : [
            {
              change: {
                appLocale: next.appLocale,
                contentKey: next.contentKey,
                operation: "bind",
                publicPath: next.publicPath,
              },
              identity,
            },
          ]
  );
  const entries: IndexedRouteChange[] = [...changed, ...created];
  const ordered = Arr.sortWith(
    entries,
    ({ identity }) => identity,
    Order.String
  );
  return Arr.map(ordered, ({ change }) => change);
}

/** Converts replayable transitions into one canonical final-path delta stream. */
export function makeRouteItems<E, R>(
  releaseId: ReleaseId,
  transitions: Stream.Stream<RouteTransition, E, R>
): Stream.Stream<ContentRouteItem, E | RoutePlanConflictError, R> {
  return Stream.suspend(() => {
    const initial = emptyRoutePlanState();
    return Stream.unwrap(
      transitions.pipe(
        Stream.runFoldEffect(() => initial, indexTransition),
        Effect.map((state) =>
          Stream.fromIterable(routeChanges(state)).pipe(
            Stream.zipWithIndex,
            Stream.map(([change, index]) =>
              ContentRouteItemSchema.make({ change, index, releaseId })
            )
          )
        )
      )
    );
  });
}

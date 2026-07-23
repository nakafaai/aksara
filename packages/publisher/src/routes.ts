import {
  type ContentLocale,
  ContentLocaleSchema,
  routeIdentity,
} from "@nakafa/aksara-contracts/content";
import {
  type ContentKey,
  ContentKeySchema,
  type PublicPath,
  PublicPathSchema,
  type ReleaseId,
} from "@nakafa/aksara-contracts/ids";
import { projectionPublicPath } from "@nakafa/aksara-contracts/projection/spec";
import {
  type ContentRouteChange,
  type ContentRouteItem,
  ContentRouteItemSchema,
} from "@nakafa/aksara-contracts/release/route";
import { Effect, Schema, Stream } from "effect";
import type { PreparedContentTransition } from "#publisher/preparation/spec";

/** One route-bearing state on either side of a content transition. */
export interface RouteVersion {
  readonly contentKey: ContentKey;
  readonly locale: ContentLocale;
  readonly publicPath?: PublicPath | undefined;
}

/** Exact before-and-after states used to derive immutable route versions. */
export interface RouteTransition {
  readonly current: RouteVersion;
  readonly next: RouteVersion;
}

interface RouteOwner extends RouteVersion {
  readonly publicPath: PublicPath;
}

/** Two transition rows claimed the same route on one side of the delta. */
export class RoutePlanConflictError extends Schema.TaggedError<RoutePlanConflictError>()(
  "RoutePlanConflictError",
  {
    existingContentKey: ContentKeySchema,
    incomingContentKey: ContentKeySchema,
    locale: ContentLocaleSchema,
    publicPath: PublicPathSchema,
    side: Schema.Literal("current", "next"),
  }
) {}

interface RoutePlanState {
  readonly current: Map<string, RouteOwner>;
  readonly next: Map<string, RouteOwner>;
}

interface IndexedRouteChange {
  readonly change: ContentRouteChange;
  readonly identity: string;
}

/** Derives the exact route transition represented by one body transition. */
export function routeTransitionForContent(
  transition: PreparedContentTransition
): RouteTransition {
  const current: RouteVersion =
    transition.prior.state === "absent"
      ? transition.prior
      : transition.prior.head;
  const { change } = transition.record;
  const next: RouteVersion =
    "projection" in transition.record
      ? {
          contentKey: change.contentKey,
          locale: change.locale,
          publicPath: projectionPublicPath(transition.record.projection),
        }
      : { contentKey: change.contentKey, locale: change.locale };
  return { current, next };
}

/** Adds one compact route owner to its exact side of the bounded plan. */
function addOwner(
  owners: Map<string, RouteOwner>,
  side: "current" | "next",
  version: RouteVersion
) {
  if (version.publicPath === undefined) {
    return Effect.void;
  }
  const owner: RouteOwner = { ...version, publicPath: version.publicPath };
  const identity = routeIdentity(owner);
  const existing = owners.get(identity);
  if (existing !== undefined) {
    return Effect.fail(
      new RoutePlanConflictError({
        existingContentKey: existing.contentKey,
        incomingContentKey: version.contentKey,
        locale: version.locale,
        publicPath: version.publicPath,
        side,
      })
    );
  }
  owners.set(identity, owner);
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

/** Derives one final desired-state change for a locale-specific route. */
function finalChange(
  current: RouteOwner,
  next: RouteOwner | undefined
): ContentRouteChange | undefined {
  if (next === undefined) {
    return {
      locale: current.locale,
      operation: "delete",
      publicPath: current.publicPath,
    };
  }
  if (current.contentKey === next.contentKey) {
    return;
  }
  return {
    contentKey: next.contentKey,
    locale: next.locale,
    operation: "bind",
    publicPath: next.publicPath,
  };
}

/** Produces one canonical final-path delta from compact ownership maps. */
function routeChanges(state: RoutePlanState) {
  const changed: IndexedRouteChange[] = [...state.current.entries()].flatMap(
    ([identity, current]) => {
      const change = finalChange(current, state.next.get(identity));
      return change === undefined ? [] : [{ change, identity }];
    }
  );
  const created: IndexedRouteChange[] = [...state.next.entries()].flatMap(
    ([identity, next]) =>
      state.current.has(identity)
        ? []
        : [
            {
              change: {
                contentKey: next.contentKey,
                locale: next.locale,
                operation: "bind",
                publicPath: next.publicPath,
              },
              identity,
            },
          ]
  );
  return [...changed, ...created]
    .sort((left, right) => left.identity.localeCompare(right.identity))
    .map(({ change }) => change);
}

/** Converts replayable transitions into one canonical final-path delta stream. */
export function makeRouteItems<E, R>(
  releaseId: ReleaseId,
  transitions: Stream.Stream<RouteTransition, E, R>
): Stream.Stream<ContentRouteItem, E | RoutePlanConflictError, R> {
  const initial: RoutePlanState = { current: new Map(), next: new Map() };
  return Stream.unwrap(
    transitions.pipe(
      Stream.runFoldEffect(initial, indexTransition),
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
}

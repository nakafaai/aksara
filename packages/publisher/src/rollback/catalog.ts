import {
  ContentLocaleSchema,
  headIdentity,
  routeIdentity,
} from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  PublicPathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  canonicalizeMaterialHead,
  type MaterialHead,
} from "@nakafa/aksara-contracts/release/head";
import type { RollbackSnapshotState } from "@nakafa/aksara-contracts/release/rollback";
import { Effect, Option, Order, Schema, Stream, Tuple } from "effect";
import {
  type DerivedRollbackRecord,
  snapshotRollbackState,
} from "#publisher/rollback/records";

type CatalogMerge =
  | { readonly active: MaterialHead; readonly kind: "active" }
  | {
      readonly active: MaterialHead;
      readonly kind: "both";
      readonly transition: DerivedRollbackRecord;
    }
  | { readonly kind: "transition"; readonly transition: DerivedRollbackRecord };

/** A transition's signed current state disagrees with the active catalog. */
export class RollbackCatalogStateMismatchError extends Schema.TaggedError<RollbackCatalogStateMismatchError>()(
  "RollbackCatalogStateMismatchError",
  {
    contentKey: ContentKeySchema,
    locale: ContentLocaleSchema,
    reason: Schema.Literal("missing", "unexpected", "different"),
  }
) {}

/** A restored route collides with an untouched structurally shared head. */
export class RollbackCatalogRouteError extends Schema.TaggedError<RollbackCatalogRouteError>()(
  "RollbackCatalogRouteError",
  { locale: ContentLocaleSchema, publicPath: PublicPathSchema }
) {}

/** Emits the prior compact state after proving the active current state. */
function resolveMerge(merge: CatalogMerge) {
  if (merge.kind === "active") {
    return Effect.succeed(Option.some(merge.active));
  }
  const current = snapshotRollbackState(merge.transition.current);
  const prior = snapshotRollbackState(merge.transition.prior);
  const identity = merge.transition.current.item.change;
  if (merge.kind === "transition") {
    if (current.state === "material") {
      return Effect.fail(
        new RollbackCatalogStateMismatchError({
          contentKey: identity.contentKey,
          locale: identity.locale,
          reason: "missing",
        })
      );
    }
    return Effect.succeed(headFromSnapshot(prior));
  }
  if (current.state === "absent") {
    return Effect.fail(
      new RollbackCatalogStateMismatchError({
        contentKey: identity.contentKey,
        locale: identity.locale,
        reason: "unexpected",
      })
    );
  }
  if (
    canonicalizeMaterialHead(current.head) !==
    canonicalizeMaterialHead(merge.active)
  ) {
    return Effect.fail(
      new RollbackCatalogStateMismatchError({
        contentKey: identity.contentKey,
        locale: identity.locale,
        reason: "different",
      })
    );
  }
  return Effect.succeed(headFromSnapshot(prior));
}

/** Returns a restored head or an explicit absence after rollback. */
function headFromSnapshot(snapshot: RollbackSnapshotState) {
  return snapshot.state === "material"
    ? Option.some(snapshot.head)
    : Option.none<MaterialHead>();
}

/** Rejects duplicate locale-specific routes across the complete result. */
function validateResultRoute(routes: Set<string>, head: MaterialHead) {
  if (head.publicPath === undefined) {
    return Effect.succeed(Tuple.make(routes, head));
  }
  const identity = routeIdentity({
    locale: head.locale,
    publicPath: head.publicPath,
  });
  if (routes.has(identity)) {
    return Effect.fail(
      new RollbackCatalogRouteError({
        locale: head.locale,
        publicPath: head.publicPath,
      })
    );
  }
  routes.add(identity);
  return Effect.succeed(Tuple.make(routes, head));
}

/** Merges authenticated active heads with rollback transitions in one pass. */
export function mergeRollbackResult<E1, R1, E2, R2>(input: {
  readonly active: Stream.Stream<MaterialHead, E1, R1>;
  readonly transitions: Stream.Stream<DerivedRollbackRecord, E2, R2>;
}) {
  const active = input.active.pipe(
    Stream.map((head) => Tuple.make(headIdentity(head), head))
  );
  const transitions = input.transitions.pipe(
    Stream.map((transition) =>
      Tuple.make(headIdentity(transition.current.item.change), transition)
    )
  );
  return Stream.zipAllSortedByKeyWith(active, {
    onBoth: (head, transition): CatalogMerge => ({
      active: head,
      kind: "both",
      transition,
    }),
    onOther: (transition): CatalogMerge => ({ kind: "transition", transition }),
    onSelf: (head): CatalogMerge => ({ active: head, kind: "active" }),
    order: Order.string,
    other: transitions,
  }).pipe(
    Stream.mapEffect(([, merge]) => resolveMerge(merge)),
    Stream.filterMap((head) => head),
    Stream.mapAccumEffect(new Set<string>(), validateResultRoute)
  );
}

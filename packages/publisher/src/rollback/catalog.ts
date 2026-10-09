import { headIdentity, routeIdentity } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  PublicPathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  type ContentHead,
  ContentHeadSchema,
  canonicalizeContentHead,
} from "@nakafa/aksara-contracts/release/head";
import type { RollbackSnapshotState } from "@nakafa/aksara-contracts/release/rollback/spec";
import {
  Effect,
  MutableHashSet,
  Option,
  Result,
  Schema,
  Stream,
  Tuple,
} from "effect";
import { mergeSortedCatalogStreams } from "#publisher/catalog/merge";
import {
  type DerivedRollbackRecord,
  DerivedRollbackRecordSchema,
  snapshotRollbackState,
} from "#publisher/rollback/records";

const CatalogMergeSchema = Schema.Union([
  Schema.Struct({ active: ContentHeadSchema, kind: Schema.Literal("active") }),
  Schema.Struct({
    active: ContentHeadSchema,
    kind: Schema.Literal("both"),
    transition: DerivedRollbackRecordSchema,
  }),
  Schema.Struct({
    kind: Schema.Literal("transition"),
    transition: DerivedRollbackRecordSchema,
  }),
]);

type CatalogMerge = typeof CatalogMergeSchema.Type;

/** A transition's signed current state disagrees with the active catalog. */
export class RollbackCatalogStateMismatchError extends Schema.TaggedError<RollbackCatalogStateMismatchError>()(
  "RollbackCatalogStateMismatchError",
  {
    artifactLocale: ArtifactLocaleSchema,
    contentKey: ContentKeySchema,
    reason: Schema.Literals(["missing", "unexpected", "different"]),
  }
) {}

/** A restored route collides with an untouched structurally shared head. */
export class RollbackCatalogRouteError extends Schema.TaggedError<RollbackCatalogRouteError>()(
  "RollbackCatalogRouteError",
  { appLocale: AppLocaleSchema, publicPath: PublicPathSchema }
) {}

/** Emits the prior compact state after proving the active current state. */
function resolveMerge(merge: CatalogMerge) {
  if (merge.kind === "active") {
    return Effect.succeedSome(merge.active);
  }
  const current = snapshotRollbackState(merge.transition.current);
  const prior = snapshotRollbackState(merge.transition.prior);
  const identity = merge.transition.current.item.change;
  if (merge.kind === "transition") {
    if (current.state !== "absent") {
      return Effect.fail(
        new RollbackCatalogStateMismatchError({
          artifactLocale: identity.artifactLocale,
          contentKey: identity.contentKey,
          reason: "missing",
        })
      );
    }
    return Effect.succeed(headFromSnapshot(prior));
  }
  if (current.state === "absent") {
    return Effect.fail(
      new RollbackCatalogStateMismatchError({
        artifactLocale: identity.artifactLocale,
        contentKey: identity.contentKey,
        reason: "unexpected",
      })
    );
  }
  if (
    canonicalizeContentHead(current.head) !==
    canonicalizeContentHead(merge.active)
  ) {
    return Effect.fail(
      new RollbackCatalogStateMismatchError({
        artifactLocale: identity.artifactLocale,
        contentKey: identity.contentKey,
        reason: "different",
      })
    );
  }
  return Effect.succeed(headFromSnapshot(prior));
}

/** Returns a restored head or an explicit absence after rollback. */
function headFromSnapshot(snapshot: RollbackSnapshotState) {
  return snapshot.state === "absent"
    ? Option.none<ContentHead>()
    : Option.some(snapshot.head);
}

/** Rejects duplicate artifactLocale-specific routes across the complete result. */
function validateResultRoute(
  routes: MutableHashSet.MutableHashSet<string>,
  head: ContentHead
) {
  if (head.publicPath === undefined) {
    return Effect.succeed(Tuple.make(routes, [head]));
  }
  const identity = routeIdentity({
    appLocale: AppLocaleSchema.make(head.artifactLocale),
    publicPath: head.publicPath,
  });
  if (MutableHashSet.has(routes, identity)) {
    return Effect.fail(
      new RollbackCatalogRouteError({
        appLocale: AppLocaleSchema.make(head.artifactLocale),
        publicPath: head.publicPath,
      })
    );
  }
  MutableHashSet.add(routes, identity);
  return Effect.succeed(Tuple.make(routes, [head]));
}

/** Merges authenticated active heads with rollback transitions in one pass. */
export function mergeRollbackResult<E1, R1, E2, R2>(input: {
  readonly active: Stream.Stream<ContentHead, E1, R1>;
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
  return mergeSortedCatalogStreams(active, {
    onBoth: (head, transition): CatalogMerge => ({
      active: head,
      kind: "both",
      transition,
    }),
    onLeft: (head): CatalogMerge => ({ active: head, kind: "active" }),
    onRight: (transition): CatalogMerge => ({ kind: "transition", transition }),
    right: transitions,
  }).pipe(
    Stream.mapEffect(resolveMerge),
    Stream.filterMap((head) => Result.fromOption(head, () => undefined)),
    Stream.mapAccumEffect(
      () => MutableHashSet.empty<string>(),
      validateResultRoute
    )
  );
}

import { headIdentity } from "@nakafa/aksara-contracts/content";
import { hashMaterialProjection } from "@nakafa/aksara-contracts/projection/hash";
import { ContentDeleteSchema } from "@nakafa/aksara-contracts/release";
import {
  type MaterialHead,
  MaterialHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import type { RollbackSnapshotState } from "@nakafa/aksara-contracts/release/rollback";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { MaterialEntry } from "@nakafa/aksara-corpus/material/registry";
import { Effect, Order, Schema, Stream, Tuple } from "effect";
import {
  compileMaterialDocument,
  type InspectedMaterialDocument,
  inspectMaterialDocument,
} from "#publisher/material/document";
import {
  PreparedContentTransitionSchema,
  type PreparedContentUpsert,
} from "#publisher/preparation/spec";

type MaterialDiff =
  | { readonly entry: MaterialEntry; readonly kind: "current" }
  | {
      readonly entry: MaterialEntry;
      readonly head: MaterialHead;
      readonly kind: "matched";
    }
  | { readonly head: MaterialHead; readonly kind: "published" };

/** One delta transition, desired result head, or both from one catalog row. */
export const MaterialPublicationPlanSchema = Schema.Struct({
  record: Schema.optional(PreparedContentTransitionSchema),
  result: Schema.optional(MaterialHeadSchema),
}).pipe(
  Schema.filter(
    (plan) => plan.record !== undefined || plan.result !== undefined
  )
);
export type MaterialPublicationPlan = typeof MaterialPublicationPlanSchema.Type;

type PlanMaterialPublicationError =
  | Effect.Effect.Error<ReturnType<typeof compileMaterialDocument>>
  | Effect.Effect.Error<ReturnType<typeof inspectMaterialDocument>>;

type PlanMaterialPublicationContext =
  | Effect.Effect.Context<ReturnType<typeof compileMaterialDocument>>
  | Effect.Effect.Context<ReturnType<typeof inspectMaterialDocument>>;

/** Compares every authored and compiler-owned fingerprint in one matched head. */
function isUnchanged(
  entry: MaterialEntry,
  document: InspectedMaterialDocument,
  head: MaterialHead
) {
  return (
    head.compilerConfigHash === document.inspection.compilerConfigHash &&
    head.delivery === entry.delivery &&
    head.projectionHash === document.projectionHash &&
    head.publicPath === entry.route.publicPath &&
    head.rendererDomain === entry.rendererDomain &&
    head.sourceHash === document.inspection.sourceHash &&
    head.sourcePath === entry.sourcePath
  );
}

/** Builds a canonical constant-space diff from registry and published heads. */
function diffMaterialHeads<E, R>(
  entries: readonly MaterialEntry[],
  published: Stream.Stream<MaterialHead, E, R>
) {
  const current = Stream.fromIterable(entries).pipe(
    Stream.map((entry) => Tuple.make(headIdentity(entry.route), entry))
  );
  const prior = published.pipe(
    Stream.map((head) => Tuple.make(headIdentity(head), head))
  );
  return Stream.zipAllSortedByKeyWith(current, {
    onBoth: (entry, head): MaterialDiff => ({ entry, head, kind: "matched" }),
    onOther: (head): MaterialDiff => ({ head, kind: "published" }),
    onSelf: (entry): MaterialDiff => ({ entry, kind: "current" }),
    order: Order.string,
    other: prior,
  }).pipe(Stream.map(([, diff]) => diff));
}

/** Derives one complete compact head from a newly compiled upsert. */
function headFromPreparedUpsert(record: PreparedContentUpsert): MaterialHead {
  const { change, payload, projection } = record;
  return MaterialHeadSchema.make({
    artifactHash: change.artifactHash,
    compilerConfigHash: payload.compilerConfigHash,
    contentKey: change.contentKey,
    delivery: change.delivery,
    locale: change.locale,
    projectionHash: hashMaterialProjection(projection),
    publicPath: projection.publicPath,
    rendererDomain: change.rendererDomain,
    sourceHash: payload.sourceHash,
    sourcePath: change.sourcePath,
  });
}

/** Plans one deletion, unchanged head, or compiled replacement. */
const prepareDiff = Effect.fn("AksaraPublisher.prepareMaterialDiff")(function* (
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope,
  diff: MaterialDiff
) {
  if (diff.kind === "published") {
    return {
      record: {
        prior: { head: diff.head, state: "material" },
        record: {
          change: ContentDeleteSchema.make({
            contentKey: diff.head.contentKey,
            locale: diff.head.locale,
            operation: "delete",
          }),
        },
      },
    } satisfies MaterialPublicationPlan;
  }
  const document = yield* inspectMaterialDocument(
    checkoutRoot,
    rendererManifest,
    diff.entry
  );
  if (diff.kind === "matched" && isUnchanged(diff.entry, document, diff.head)) {
    return { result: diff.head } satisfies MaterialPublicationPlan;
  }
  const record = yield* compileMaterialDocument(document, rendererManifest);
  const prior: RollbackSnapshotState =
    diff.kind === "matched"
      ? { head: diff.head, state: "material" }
      : {
          contentKey: diff.entry.route.contentKey,
          locale: diff.entry.route.locale,
          state: "absent",
        };
  return {
    record: { prior, record },
    result: headFromPreparedUpsert(record),
  } satisfies MaterialPublicationPlan;
});

/** Streams complete result heads and only material delta transitions. */
export function planMaterialPublication<E, R>(input: {
  readonly checkoutRoot: string;
  readonly entries: readonly MaterialEntry[];
  readonly published: Stream.Stream<MaterialHead, E, R>;
  readonly rendererManifest: RendererManifestEnvelope;
}): Stream.Stream<
  MaterialPublicationPlan,
  E | PlanMaterialPublicationError,
  R | PlanMaterialPublicationContext
> {
  return diffMaterialHeads(input.entries, input.published).pipe(
    Stream.mapEffect((diff) =>
      prepareDiff(input.checkoutRoot, input.rendererManifest, diff)
    )
  );
}

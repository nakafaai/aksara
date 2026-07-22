import type { FileSystem, Path } from "@effect/platform";
import type { CompileContentError } from "@nakafaai/aksara-compiler/compile";
import {
  type CompileReason,
  compileIncremental,
  type IncrementalResult,
  type LocalCache,
} from "@nakafaai/aksara-compiler/incremental";
import { hashCompiledContentPayload } from "@nakafaai/aksara-contracts/artifact/verify";
import { CorpusSourcePathSchema } from "@nakafaai/aksara-contracts/ids";
import {
  canonicalizeMaterialProjection,
  MaterialMetadataSchema,
  makeMaterialLessonProjection,
} from "@nakafaai/aksara-contracts/projection/material";
import {
  ContentUpsertSchema,
  canonicalizeContentChange,
} from "@nakafaai/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafaai/aksara-contracts/renderer/contract";
import { validateRendererManifestHash } from "@nakafaai/aksara-contracts/renderer/manifest";
import { decodeMaterialRegistry } from "@nakafaai/aksara-corpus/material/registry";
import { readMaterialDocument } from "@nakafaai/aksara-corpus/material/source";
import { Effect, Schema, Stream } from "effect";
import {
  type MaterialPlanTask,
  planMaterialEntries,
} from "#publisher/material/plan";
import type {
  PreparedContentDelete,
  PreparedContentRecord,
  PreparedContentUpsert,
} from "#publisher/preparation/spec";

/** Authored material metadata does not satisfy Nakafa's exact page contract. */
export class MaterialMetadataError extends Schema.TaggedError<MaterialMetadataError>()(
  "MaterialMetadataError",
  { cause: Schema.Unknown, sourcePath: CorpusSourcePathSchema }
) {}

/** The local checkout could not provide its canonical reviewed material source. */
export class MaterialSourceError extends Schema.TaggedError<MaterialSourceError>()(
  "MaterialSourceError",
  { cause: Schema.Unknown, checkoutRoot: Schema.String }
) {}

const MaterialCheckoutSnapshotTypeId: unique symbol = Symbol(
  "@NakafaAI/AksaraMaterialCheckoutSnapshot"
);

interface MaterialSnapshotEntry {
  readonly cache: LocalCache;
  readonly publicationIdentity: string;
}

/** Opaque local acceleration state that is never a publication authority. */
export interface MaterialCheckoutSnapshot {
  readonly [MaterialCheckoutSnapshotTypeId]: readonly MaterialSnapshotEntry[];
}

/** Observable work performed for one canonical locale-specific content head. */
export type MaterialCheckoutOutcome =
  | {
      readonly kind: "compiled";
      readonly reason: CompileReason;
      readonly record: PreparedContentUpsert;
    }
  | {
      readonly kind: "deleted";
      readonly record: PreparedContentDelete;
    }
  | {
      readonly kind: "unchanged";
      readonly record: PreparedContentUpsert;
    }
  | {
      readonly kind: "updated";
      readonly record: PreparedContentUpsert;
    };

/** Every expected failure surfaced by one bounded local checkout plan. */
export type MaterialCheckoutError =
  | CompileContentError
  | Effect.Effect.Error<ReturnType<typeof validateRendererManifestHash>>
  | MaterialMetadataError
  | MaterialSourceError;

/** One fully planned local checkout with replayable canonical release records. */
export interface MaterialCheckout {
  readonly outcomes: readonly MaterialCheckoutOutcome[];
  /** Replays bounded records without exposing mutable compiler-cache state. */
  readonly records: () => Stream.Stream<PreparedContentRecord>;
  readonly snapshot: MaterialCheckoutSnapshot;
}

/** Current checkout inputs; prior state can only accelerate local compilation. */
export interface MaterialCheckoutInput {
  readonly checkoutRoot: string;
  readonly previous?: MaterialCheckoutSnapshot;
  readonly rendererManifest: unknown;
}

interface PreparedTask {
  readonly outcome: MaterialCheckoutOutcome;
  readonly snapshot: MaterialSnapshotEntry | undefined;
}

type MaterialUpsertTask = Extract<
  MaterialPlanTask,
  { readonly kind: "upsert" }
>;

/** Wraps every registry and filesystem failure at the checkout source seam. */
function mapSourceError(checkoutRoot: string) {
  return (cause: unknown) => new MaterialSourceError({ cause, checkoutRoot });
}

/** Builds the private snapshot value returned only after every task succeeds. */
function makeSnapshot(
  entries: readonly MaterialSnapshotEntry[]
): MaterialCheckoutSnapshot {
  return { [MaterialCheckoutSnapshotTypeId]: entries };
}

/** Derives prior content-head identities only from compiler-owned cache state. */
function previousHeads(previous: MaterialCheckoutSnapshot | undefined) {
  const entries = previous?.[MaterialCheckoutSnapshotTypeId] ?? [];
  return entries.map(({ cache, publicationIdentity }) => ({
    cache,
    contentKey: cache.identity.contentKey,
    locale: cache.identity.locale,
    publicationIdentity,
  }));
}

/** Canonicalizes every registry-owned field that can change publication. */
function materialPublicationIdentity(record: PreparedContentUpsert) {
  return `${JSON.stringify(
    canonicalizeContentChange(record.change)
  )}\n${canonicalizeMaterialProjection(record.projection)}`;
}

/** Classifies compilation and registry-only changes without hiding records. */
function makeUpsertOutcome(input: {
  readonly incremental: IncrementalResult;
  readonly previousPublicationIdentity: string | undefined;
  readonly publicationIdentity: string;
  readonly record: PreparedContentUpsert;
}): MaterialCheckoutOutcome {
  if (input.incremental.kind === "compiled") {
    return {
      kind: "compiled",
      reason: input.incremental.reason,
      record: input.record,
    };
  }
  if (input.publicationIdentity !== input.previousPublicationIdentity) {
    return { kind: "updated", record: input.record };
  }
  return { kind: "unchanged", record: input.record };
}

/** Compiles or reuses one source, then derives its exact material projection. */
const prepareUpsert = Effect.fn("AksaraPublisher.prepareMaterialUpsert")(
  function* (
    checkoutRoot: string,
    rendererManifest: RendererManifestEnvelope,
    task: MaterialUpsertTask
  ) {
    const source = yield* readMaterialDocument(checkoutRoot, task.entry).pipe(
      Effect.mapError(mapSourceError(checkoutRoot))
    );
    const incremental = yield* compileIncremental(
      {
        contentKey: source.route.contentKey,
        locale: source.route.locale,
        rawMdx: source.rawMdx,
        rendererDomain: source.rendererDomain,
        rendererManifest,
        sourcePath: source.sourcePath,
      },
      task.previousCache
    );
    const metadata = yield* Schema.decodeUnknown(MaterialMetadataSchema)(
      incremental.result.metadata,
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError(
        (cause) =>
          new MaterialMetadataError({ cause, sourcePath: source.sourcePath })
      )
    );
    const projection = makeMaterialLessonProjection(source.route, metadata);
    const change = ContentUpsertSchema.make({
      artifactHash: hashCompiledContentPayload(incremental.result.payload),
      contentKey: source.route.contentKey,
      delivery: source.delivery,
      locale: source.route.locale,
      operation: "upsert",
      publicPath: source.route.publicPath,
      rendererDomain: source.rendererDomain,
      sourcePath: source.sourcePath,
    });
    const record = {
      change,
      payload: incremental.result.payload,
      projection,
      source: {
        contentKey: source.route.contentKey,
        locale: source.route.locale,
        rawMdx: source.rawMdx,
        rendererDomain: source.rendererDomain,
        sourcePath: source.sourcePath,
      },
    } satisfies PreparedContentUpsert;
    const publicationIdentity = materialPublicationIdentity(record);
    const outcome = makeUpsertOutcome({
      incremental,
      previousPublicationIdentity: task.previousPublicationIdentity,
      publicationIdentity,
      record,
    });
    return {
      outcome,
      snapshot: { cache: incremental.cache, publicationIdentity },
    } satisfies PreparedTask;
  }
);

/** Converts an absent prior head to an explicit release tombstone. */
function prepareDelete(
  task: Extract<MaterialPlanTask, { readonly kind: "delete" }>
) {
  return {
    outcome: { kind: "deleted", record: { change: task.change } },
    snapshot: undefined,
  } satisfies PreparedTask;
}

/** Executes one canonical upsert or tombstone task with a uniform Effect type. */
const prepareTask = Effect.fn("AksaraPublisher.prepareMaterialTask")(function* (
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope,
  task: MaterialPlanTask
) {
  if (task.kind === "delete") {
    const deleted: PreparedTask = prepareDelete(task);
    return deleted;
  }
  const upsert: PreparedTask = yield* prepareUpsert(
    checkoutRoot,
    rendererManifest,
    task
  );
  return upsert;
});

/**
 * Plans the bounded real material slice from one working checkout.
 * Publication still recompiles exact Git sources authenticated by the release.
 */
export const prepareMaterialCheckout: (
  input: MaterialCheckoutInput
) => Effect.Effect<
  MaterialCheckout,
  MaterialCheckoutError,
  FileSystem.FileSystem | Path.Path
> = Effect.fn("AksaraPublisher.prepareMaterialCheckout")(function* (
  input: MaterialCheckoutInput
) {
  const rendererManifest = yield* validateRendererManifestHash(
    input.rendererManifest
  );
  const entries = yield* decodeMaterialRegistry().pipe(
    Effect.mapError(mapSourceError(input.checkoutRoot))
  );
  const tasks = planMaterialEntries(entries, previousHeads(input.previous));
  const prepared = yield* Effect.forEach(tasks, (task) =>
    prepareTask(input.checkoutRoot, rendererManifest, task)
  );
  const outcomes = prepared.map(({ outcome }) => outcome);
  const records = outcomes.flatMap((outcome) =>
    outcome.kind === "unchanged" ? [] : [outcome.record]
  );
  const snapshots = prepared.flatMap(({ snapshot }) =>
    snapshot === undefined ? [] : [snapshot]
  );

  return {
    outcomes,
    records: () => Stream.fromIterable(records),
    snapshot: makeSnapshot(snapshots),
  } satisfies MaterialCheckout;
});

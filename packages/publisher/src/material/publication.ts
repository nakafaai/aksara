import type { FileSystem, Path } from "@effect/platform";
import type { CompileContentError } from "@nakafa/aksara-compiler/compile";
import type { ContentSourceInspectionError } from "@nakafa/aksara-compiler/inspect";
import {
  ContentLocaleSchema,
  compareContentHeads,
  headIdentity,
} from "@nakafa/aksara-contracts/content";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { ContentDeleteSchema } from "@nakafa/aksara-contracts/release";
import type { MaterialHead } from "@nakafa/aksara-contracts/release/head";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { validateRendererManifestHash as validateRenderer } from "@nakafa/aksara-contracts/renderer/manifest";
import type { MaterialEntry } from "@nakafa/aksara-corpus/material/registry";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { Effect, Option, Order, Schema, type Scope, Stream } from "effect";
import {
  compileMaterialDocument,
  type InspectedMaterialDocument,
  inspectMaterialDocument,
  type MaterialMetadataError,
  type MaterialSourceError,
  mapMaterialSourceError,
} from "#publisher/material/document";
import {
  type PreparedContentRecord,
  PreparedContentRecordSchema,
} from "#publisher/preparation/spec";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { createReplaySpool } from "#publisher/replay/spool";

const MaterialFamilyFieldSchema = Schema.Literal(
  "contentKey",
  "locale",
  "publicPath",
  "sourcePath"
);

/** A target returned the same material identity more than once. */
export class MaterialHeadDuplicateError extends Schema.TaggedError<MaterialHeadDuplicateError>()(
  "MaterialHeadDuplicateError",
  { contentKey: ContentKeySchema, locale: ContentLocaleSchema }
) {}

/** A target returned material heads outside canonical content-head order. */
export class MaterialHeadOrderError extends Schema.TaggedError<MaterialHeadOrderError>()(
  "MaterialHeadOrderError",
  { contentKey: ContentKeySchema, locale: ContentLocaleSchema }
) {}

/** A material-head page contained a row owned by another content family. */
export class MaterialHeadFamilyError extends Schema.TaggedError<MaterialHeadFamilyError>()(
  "MaterialHeadFamilyError",
  {
    contentKey: ContentKeySchema,
    field: MaterialFamilyFieldSchema,
    locale: ContentLocaleSchema,
  }
) {}

interface HeadOrderState {
  readonly previous: MaterialHead | undefined;
}

type MaterialDiff =
  | { readonly entry: MaterialEntry; readonly kind: "current" }
  | {
      readonly entry: MaterialEntry;
      readonly head: MaterialHead;
      readonly kind: "matched";
    }
  | { readonly head: MaterialHead; readonly kind: "published" };

/** Every failure possible while replaying authoritative publication records. */
export type MaterialPublicationStreamError<E> =
  | E
  | CompileContentError
  | ContentSourceInspectionError
  | MaterialHeadDuplicateError
  | MaterialHeadFamilyError
  | MaterialHeadOrderError
  | MaterialMetadataError
  | MaterialSourceError;

/** Authoritative material plan accepted by generic release preparation. */
export interface MaterialPublication {
  /** Replays the exact delta against the supplied active material heads. */
  readonly records: () => Stream.Stream<
    PreparedContentRecord,
    ReplaySpoolError
  >;
}

/** Fresh-CI inputs pinned to one checkout, renderer, and active-head stream. */
export interface MaterialPublicationInput<E, R> {
  readonly checkoutRoot: string;
  readonly published: Stream.Stream<MaterialHead, E, R>;
  readonly rendererManifest: unknown;
}

type RendererManifestError = Effect.Effect.Error<
  ReturnType<typeof validateRendererManifestHash>
>;

/** Every failure possible before the replayable material plan is constructed. */
export type PrepareMaterialPublicationError<E> =
  | E
  | MaterialPublicationStreamError<never>
  | ReplaySpoolError
  | RendererManifestError;

/** Finds the first field proving a head does not belong to material lessons. */
function mismatchedFamilyField(
  head: MaterialHead
): typeof MaterialFamilyFieldSchema.Type | undefined {
  if (!head.contentKey.startsWith("material/lesson/")) {
    return "contentKey";
  }
  if (head.publicPath === undefined) {
    return "publicPath";
  }
  if (!head.sourcePath.startsWith("packages/corpus/material/lesson/")) {
    return "sourcePath";
  }
  if (!head.sourcePath.endsWith(`/${head.locale}.mdx`)) {
    return "locale";
  }
}

/** Validates family ownership and strict ordering before a head enters diffing. */
function validatePublishedHead(
  state: HeadOrderState,
  head: MaterialHead
): Effect.Effect<
  readonly [HeadOrderState, MaterialHead],
  MaterialHeadDuplicateError | MaterialHeadFamilyError | MaterialHeadOrderError
> {
  const field = mismatchedFamilyField(head);
  if (field !== undefined) {
    return Effect.fail(
      new MaterialHeadFamilyError({
        contentKey: head.contentKey,
        field,
        locale: head.locale,
      })
    );
  }
  const { previous } = state;
  if (previous !== undefined) {
    const comparison = compareContentHeads(previous, head);
    if (comparison === 0) {
      return Effect.fail(
        new MaterialHeadDuplicateError({
          contentKey: head.contentKey,
          locale: head.locale,
        })
      );
    }
    if (comparison > 0) {
      return Effect.fail(
        new MaterialHeadOrderError({
          contentKey: head.contentKey,
          locale: head.locale,
        })
      );
    }
  }
  return Effect.succeed([{ previous: head }, head] as const);
}

/** Proves every published material head before the constant-space merge. */
function validatePublishedHeads<E, R>(
  published: Stream.Stream<MaterialHead, E, R>
) {
  const initial: HeadOrderState = { previous: undefined };
  return published.pipe(Stream.mapAccumEffect(initial, validatePublishedHead));
}

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
    Stream.map((entry) => [headIdentity(entry.route), entry] as const)
  );
  const prior = validatePublishedHeads(published).pipe(
    Stream.map((head) => [headIdentity(head), head] as const)
  );
  return Stream.zipAllSortedByKeyWith(current, {
    onBoth: (entry, head): MaterialDiff => ({ entry, head, kind: "matched" }),
    onOther: (head): MaterialDiff => ({ head, kind: "published" }),
    onSelf: (entry): MaterialDiff => ({ entry, kind: "current" }),
    order: Order.string,
    other: prior,
  }).pipe(Stream.map(([, diff]) => diff));
}

/** Emits one tombstone or changed upsert while skipping exact fingerprints. */
const prepareDiff = Effect.fn("AksaraPublisher.prepareMaterialDiff")(function* (
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope,
  diff: MaterialDiff
) {
  if (diff.kind === "published") {
    return Option.some<PreparedContentRecord>({
      change: ContentDeleteSchema.make({
        contentKey: diff.head.contentKey,
        locale: diff.head.locale,
        operation: "delete",
      }),
    });
  }
  const document = yield* inspectMaterialDocument(
    checkoutRoot,
    rendererManifest,
    diff.entry
  );
  if (diff.kind === "matched" && isUnchanged(diff.entry, document, diff.head)) {
    return Option.none<PreparedContentRecord>();
  }
  const record = yield* compileMaterialDocument(document, rendererManifest);
  return Option.some<PreparedContentRecord>(record);
});

/**
 * Plans a fresh-CI material delta from exact Git sources and authoritative heads.
 * Unchanged sources are inspected but never passed to MDX code generation.
 */
export const prepareMaterialPublication: <E, R>(
  input: MaterialPublicationInput<E, R>
) => Effect.Effect<
  MaterialPublication,
  PrepareMaterialPublicationError<E>,
  FileSystem.FileSystem | Path.Path | R | Scope.Scope
> = Effect.fn("AksaraPublisher.prepareMaterialPublication")(function* <E, R>(
  input: MaterialPublicationInput<E, R>
) {
  const rendererManifest = yield* validateRenderer(input.rendererManifest);
  const entries = yield* decodeMaterialRegistry().pipe(
    Effect.mapError(mapMaterialSourceError(input.checkoutRoot))
  );
  const records = diffMaterialHeads(entries, input.published).pipe(
    Stream.mapEffect((diff) =>
      prepareDiff(input.checkoutRoot, rendererManifest, diff)
    ),
    Stream.filterMap((record) => record)
  );
  const spool = yield* createReplaySpool({
    prefix: "aksara-material-",
    schema: PreparedContentRecordSchema,
    stream: records,
  });
  return { records: spool.replay };
});

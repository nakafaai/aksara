import type { FileSystem, Path } from "@effect/platform";
import type { CompileContentError } from "@nakafa/aksara-compiler/compile";
import type { ContentSourceInspectionError } from "@nakafa/aksara-compiler/inspect";
import {
  ContentLocaleSchema,
  compareContentHeads,
} from "@nakafa/aksara-contracts/content";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import type { MaterialHead } from "@nakafa/aksara-contracts/release/head";
import type { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { validateRendererManifestHash as validateRenderer } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { Effect, Option, Schema, type Scope, Stream, Tuple } from "effect";
import {
  type MaterialMetadataError,
  type MaterialSourceError,
  mapMaterialSourceError,
} from "#publisher/material/document";
import {
  MaterialPublicationPlanSchema,
  planMaterialPublication,
} from "#publisher/material/plan";
import type { PreparedContentTransition } from "#publisher/preparation/spec";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { createReplaySpool } from "#publisher/replay/spool";
import {
  type RouteTransition,
  routeTransitionForContent,
} from "#publisher/routes";

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
    PreparedContentTransition,
    ReplaySpoolError
  >;
  /** Replays the complete desired compact-head catalog in canonical order. */
  readonly result: () => Stream.Stream<MaterialHead, ReplaySpoolError>;
  /** Replays route ownership independently from body publication items. */
  readonly routes: () => Stream.Stream<RouteTransition, ReplaySpoolError>;
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
  return Effect.succeed(Tuple.make({ previous: head }, head));
}

/** Proves every published material head before the constant-space merge. */
function validatePublishedHeads<E, R>(
  published: Stream.Stream<MaterialHead, E, R>
) {
  const initial: HeadOrderState = { previous: undefined };
  return published.pipe(Stream.mapAccumEffect(initial, validatePublishedHead));
}

/**
 * Plans a fresh-CI material delta from exact Git sources and authoritative heads.
 * Global signed-base verification belongs to whole-catalog composition.
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
  const plans = planMaterialPublication({
    checkoutRoot: input.checkoutRoot,
    entries,
    published: validatePublishedHeads(input.published),
    rendererManifest,
  });
  const spool = yield* createReplaySpool({
    prefix: "aksara-material-",
    schema: MaterialPublicationPlanSchema,
    stream: plans,
  });
  /** Replays canonical material transition records from the sealed spool. */
  const records = () =>
    spool
      .replay()
      .pipe(Stream.filterMap((plan) => Option.fromNullable(plan.record)));
  /** Replays the complete canonical result catalog from the sealed spool. */
  const result = () =>
    spool
      .replay()
      .pipe(Stream.filterMap((plan) => Option.fromNullable(plan.result)));
  /** Replays canonical public-route changes derived from material records. */
  const routes = () => records().pipe(Stream.map(routeTransitionForContent));
  return { records, result, routes };
});

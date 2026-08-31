import type { CompileContentError } from "@nakafa/aksara-compiler/compile";
import type { ContentSourceInspectionError } from "@nakafa/aksara-compiler/inspect";
import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { PageKeySchema } from "@nakafa/aksara-contracts/projection/page";
import type { PageHead } from "@nakafa/aksara-contracts/release/head";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { validateRendererManifestHash as validateRenderer } from "@nakafa/aksara-contracts/renderer/manifest";
import { isLowerKebab } from "@nakafa/aksara-contracts/text/syntax";
import { decodePageRegistry } from "@nakafa/aksara-corpus/pages/registry";
import type { FileSystem, Path } from "effect";
import { Effect, Result, Schema, type Scope, Stream, Tuple } from "effect";
import { constUndefined } from "effect/Function";
import {
  mapPageSourceError,
  type PageMetadataError,
  type PageSourceError,
} from "#publisher/page/document";
import {
  PagePublicationPlanSchema,
  planPagePublication,
} from "#publisher/page/plan";
import type { PreparedContentTransition } from "#publisher/preparation/spec";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { createReplaySpool } from "#publisher/replay/spool";
import {
  type RouteTransition,
  routeTransitionForContent,
} from "#publisher/routes";

const PageFamilyFieldSchema = Schema.Literals([
  "contentKey",
  "artifactLocale",
  "rendererDomain",
  "sourcePath",
]);

/** A target returned the same public page identity more than once. */
export class PageHeadDuplicateError extends Schema.TaggedError<PageHeadDuplicateError>()(
  "PageHeadDuplicateError",
  { artifactLocale: ArtifactLocaleSchema, contentKey: ContentKeySchema }
) {}

/** A target returned public page heads outside canonical content-head order. */
export class PageHeadOrderError extends Schema.TaggedError<PageHeadOrderError>()(
  "PageHeadOrderError",
  { artifactLocale: ArtifactLocaleSchema, contentKey: ContentKeySchema }
) {}

/** A public page-head response contained a row owned by another family. */
export class PageHeadFamilyError extends Schema.TaggedError<PageHeadFamilyError>()(
  "PageHeadFamilyError",
  {
    artifactLocale: ArtifactLocaleSchema,
    contentKey: ContentKeySchema,
    field: PageFamilyFieldSchema,
  }
) {}

interface HeadOrderState {
  readonly previous: PageHead | undefined;
}

/** Every failure possible while replaying authoritative page records. */
export type PagePublicationStreamError<E> =
  | E
  | CompileContentError
  | ContentSourceInspectionError
  | PageHeadDuplicateError
  | PageHeadFamilyError
  | PageHeadOrderError
  | PageMetadataError
  | PageSourceError;

/** Authoritative public page plan consumed by whole-catalog composition. */
export interface PagePublication {
  /** Replays the exact page delta against supplied active page heads. */
  readonly records: Stream.Stream<PreparedContentTransition, ReplaySpoolError>;
  /** Replays the complete desired public page catalog in canonical order. */
  readonly result: Stream.Stream<PageHead, ReplaySpoolError>;
  /** Replays public route ownership independently from page transitions. */
  readonly routes: Stream.Stream<RouteTransition, ReplaySpoolError>;
}

/** Fresh-CI inputs pinned to one checkout, renderer, and page-head stream. */
export interface PagePublicationInput<E, R> {
  readonly checkoutRoot: string;
  readonly published: Stream.Stream<PageHead, E, R>;
  readonly rebuild?: boolean | undefined;
  readonly rendererManifest: unknown;
  readonly scope?: PublicationScope | undefined;
}

type RendererManifestError = Effect.Error<
  ReturnType<typeof validateRendererManifestHash>
>;

/** Every failure possible before the replayable page plan is constructed. */
export type PreparePagePublicationError<E> =
  | E
  | PagePublicationStreamError<never>
  | ReplaySpoolError
  | RendererManifestError;

/** Finds the first field proving a head does not own its public page source. */
function mismatchedFamilyField(
  head: PageHead
): typeof PageFamilyFieldSchema.Type | undefined {
  const [family, pageKey, contentRemainder] = head.contentKey.split("/");
  if (
    family !== "pages" ||
    pageKey === undefined ||
    !Schema.is(PageKeySchema)(pageKey) ||
    contentRemainder !== undefined
  ) {
    return "contentKey";
  }
  if (head.rendererDomain !== "site") {
    return "rendererDomain";
  }
  const [packageRoot, corpus, pageFamily, sourceName, fileName, remainder] =
    head.sourcePath.split("/");
  if (
    packageRoot !== "packages" ||
    corpus !== "corpus" ||
    pageFamily !== "pages" ||
    sourceName === undefined ||
    !isLowerKebab(sourceName) ||
    fileName === undefined ||
    remainder !== undefined
  ) {
    return "sourcePath";
  }
  if (fileName !== `${head.artifactLocale}.mdx`) {
    return "artifactLocale";
  }
}

/** Validates family ownership and strict ordering before diffing one head. */
function validatePublishedHead(
  state: HeadOrderState,
  head: PageHead
): Effect.Effect<
  readonly [HeadOrderState, readonly PageHead[]],
  PageHeadDuplicateError | PageHeadFamilyError | PageHeadOrderError
> {
  const field = mismatchedFamilyField(head);
  if (field !== undefined) {
    return Effect.fail(
      new PageHeadFamilyError({
        artifactLocale: head.artifactLocale,
        contentKey: head.contentKey,
        field,
      })
    );
  }
  const { previous } = state;
  if (previous !== undefined) {
    const comparison = compareContentHeads(previous, head);
    if (comparison === 0) {
      return Effect.fail(
        new PageHeadDuplicateError({
          artifactLocale: head.artifactLocale,
          contentKey: head.contentKey,
        })
      );
    }
    if (comparison > 0) {
      return Effect.fail(
        new PageHeadOrderError({
          artifactLocale: head.artifactLocale,
          contentKey: head.contentKey,
        })
      );
    }
  }
  return Effect.succeed(Tuple.make({ previous: head }, [head]));
}

/** Proves every published public page head before the constant-space merge. */
function validatePublishedHeads<E, R>(
  published: Stream.Stream<PageHead, E, R>
) {
  const initial: HeadOrderState = { previous: undefined };
  return published.pipe(
    Stream.mapAccumEffect(() => initial, validatePublishedHead)
  );
}

/** Plans one page-family delta from exact Git sources and active heads. */
export const preparePagePublication: <E, R>(
  input: PagePublicationInput<E, R>
) => Effect.Effect<
  PagePublication,
  PreparePagePublicationError<E>,
  FileSystem.FileSystem | Path.Path | R | Scope.Scope
> = Effect.fn("AksaraPublisher.preparePagePublication")(function* <E, R>(
  input: PagePublicationInput<E, R>
) {
  const rendererManifest = yield* validateRenderer(input.rendererManifest);
  const entries = yield* decodePageRegistry().pipe(
    Effect.mapError(mapPageSourceError(input.checkoutRoot))
  );
  const plans = planPagePublication({
    checkoutRoot: input.checkoutRoot,
    entries,
    published: validatePublishedHeads(input.published),
    rebuild: input.rebuild,
    rendererManifest,
    scope: input.scope,
  });
  const spool = yield* createReplaySpool({
    prefix: "aksara-page-",
    schema: PagePublicationPlanSchema,
    stream: plans,
  });
  const records = spool.replay.pipe(
    Stream.filterMap((plan) =>
      Result.fromNullishOr(plan.record, constUndefined)
    )
  );
  const result = spool.replay.pipe(
    Stream.filterMap((plan) =>
      Result.fromNullishOr(plan.result, constUndefined)
    )
  );
  const routes = records.pipe(Stream.map(routeTransitionForContent));
  return { records, result, routes };
});

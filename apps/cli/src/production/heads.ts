import type {
  ArticleHead,
  ContentHead,
  MaterialHead,
  PageHead,
} from "@nakafa/aksara-contracts/release/head";
import {
  ArticleHeadSchema,
  ContentHeadSchema,
  canonicalizeContentHead,
  MaterialHeadSchema,
  PageHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import type { ActiveCatalogIdentity } from "@nakafa/aksara-contracts/release/identity";
import { verifyResultCatalog } from "@nakafa/aksara-contracts/release/result/digest";
import { streamContentHeads } from "@nakafa/aksara-publisher/heads";
import {
  Array as Arr,
  Cause,
  Config,
  Effect,
  FileSystem,
  Option,
  Path,
  Predicate,
  Result,
  Schema,
  String as Str,
  Stream,
} from "effect";

/**
 * The folder where a release keeps its result catalog for the next release. The
 * release workflow restores it from its cache, so a release reads the heads of
 * the catalog it builds on from Convex only when the cache does not hold them.
 */
const HeadsCacheConfig = Config.option(
  Config.NonEmptyString("AKSARA_HEADS_CACHE")
);

/** One head per line of a kept result catalog. */
const HeadLineSchema = Schema.fromJsonString(ContentHeadSchema);

/** The file that keeps the result catalog of one release. */
function catalogFile(
  path: typeof Path.Path.Service,
  folder: string,
  releaseId: string
) {
  return path.join(folder, `${releaseId}.jsonl`);
}

/** The heads of one release's catalog, by family, as the publisher reads them. */
function familyStreams(heads: readonly ContentHead[]) {
  return {
    article: Stream.fromIterable(
      Arr.filter(heads, (head): head is ArticleHead =>
        Schema.is(ArticleHeadSchema)(head)
      )
    ),
    material: Stream.fromIterable(
      Arr.filter(heads, (head): head is MaterialHead =>
        Schema.is(MaterialHeadSchema)(head)
      )
    ),
    page: Stream.fromIterable(
      Arr.filter(heads, (head): head is PageHead =>
        Schema.is(PageHeadSchema)(head)
      )
    ),
  };
}

/**
 * Reads the kept result catalog of the base and proves it is the base: it must
 * hold exactly the signed count of heads, in canonical order, with the signed
 * digest. That is the proof the publisher runs over the heads it streams from
 * Convex, so a kept catalog that passes it is the same catalog, head for head.
 */
const readKeptCatalog = Effect.fn("AksaraCli.readKeptCatalog")(function* (
  folder: string,
  base: ActiveCatalogIdentity
) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const text = yield* fs.readFileString(
    catalogFile(path, folder, base.releaseId)
  );
  const heads = yield* Effect.forEach(
    Arr.filter(Str.split(text, "\n"), Str.isNonEmpty),
    (line) => Schema.decodeEffect(HeadLineSchema)(line)
  );
  yield* verifyResultCatalog({
    expectedCount: base.resultCount,
    expectedDigest: base.resultDigest,
    heads: Stream.fromIterable(heads),
    releaseId: base.releaseId,
  });
  return heads;
});

/**
 * The heads of the catalog a release builds on, by family. With a heads cache
 * that keeps the base's result catalog and proves it against the base's signed
 * count and digest, they come from the cache and the release reads no head from
 * Convex. Otherwise, a missing file or one that fails the proof included, they
 * stream from the target, which the publisher proves the same way.
 */
export const readBaseHeads = Effect.fn("AksaraCli.readBaseHeads")(function* (
  base: ActiveCatalogIdentity
) {
  const folder = yield* HeadsCacheConfig;
  if (Option.isSome(folder)) {
    const kept = yield* Effect.result(readKeptCatalog(folder.value, base));
    if (Result.isSuccess(kept)) {
      yield* Effect.logInfo(
        `Read the ${kept.success.length} heads of ${base.releaseId} from the heads cache.`
      );
      return familyStreams(kept.success);
    }
    yield* Effect.logWarning(
      `The heads cache does not hold ${base.releaseId}; reading its heads from the target.`,
      Cause.fail(kept.failure)
    );
  }
  return {
    article: streamContentHeads(base.releaseId, base.manifestHash, "article"),
    material: streamContentHeads(base.releaseId, base.manifestHash, "material"),
    page: streamContentHeads(base.releaseId, base.manifestHash, "page"),
  };
});

/**
 * Keeps the result catalog of the release being prepared in the heads cache, so
 * the next release, which builds on it once it is active, reads none of its
 * heads from Convex. It drops every other kept catalog but the base's, which a
 * retry of this release still builds on. Without a heads cache it does nothing.
 */
export const keepResultHeads = Effect.fn("AksaraCli.keepResultHeads")(
  function* <E>(input: {
    readonly baseReleaseId: string | null;
    readonly releaseId: string;
    readonly result: Stream.Stream<ContentHead, E>;
  }) {
    const folder = yield* HeadsCacheConfig;
    if (Option.isNone(folder)) {
      return;
    }
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const heads = yield* Stream.runCollect(input.result);
    yield* fs.makeDirectory(folder.value, { recursive: true });
    yield* fs.writeFileString(
      catalogFile(path, folder.value, input.releaseId),
      Arr.join(
        Arr.map(heads, (head) => `${canonicalizeContentHead(head)}\n`),
        ""
      )
    );
    const keep = Arr.map(
      Arr.filter([input.releaseId, input.baseReleaseId], Predicate.isNotNull),
      (releaseId) => `${releaseId}.jsonl`
    );
    const stale = Arr.filter(
      yield* fs.readDirectory(folder.value),
      (name) => !Arr.contains(keep, name)
    );
    yield* Effect.forEach(
      stale,
      (name) => fs.remove(path.join(folder.value, name)),
      { discard: true }
    );
  }
);

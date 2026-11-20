import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";
import {
  ContentHeadSchema,
  canonicalizeContentHead,
  HeadPageSchema,
} from "@nakafa/aksara-contracts/release/head";
import { ActiveCatalogIdentitySchema } from "@nakafa/aksara-contracts/release/identity";
import { digestResultCatalog } from "@nakafa/aksara-contracts/release/result/digest";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import {
  Array as Arr,
  ConfigProvider,
  Effect,
  FileSystem,
  Order,
  Schema,
  Stream,
} from "effect";
import { selectSourceBase } from "#cli/production/base";
import { keepResultHeads, readBaseHeads } from "#cli/production/heads";
import { gitBundle, makeProductionTarget, releaseId } from "#test/target";

const HASH = `sha256:${"a".repeat(64)}`;

/** One strict head of the test catalog. */
function head(family: "article" | "material" | "page", name: string) {
  return Schema.decodeSync(ContentHeadSchema)({
    artifactHash: HASH,
    artifactLocale: "en",
    compilerConfigHash: HASH,
    contentKey: `${family}:${name}`,
    delivery: "public",
    family,
    projectionHash: HASH,
    publicPath: `subjects/test/${name}`,
    rendererDomain: family === "article" ? "politics" : "mathematics",
    sourceHash: HASH,
    sourcePath: `packages/corpus/test/${name}/en.mdx`,
  });
}

/** A base catalog in canonical order, as the release before it published it. */
const HEADS = [
  head("article", "a"),
  head("material", "b"),
  head("material", "c"),
  head("page", "d"),
];

/** The active base whose signed count and digest are those of `heads`. */
const baseOf = Effect.fn("test.heads.base")(function* (
  heads: readonly ContentHead[]
) {
  const base = selectSourceBase(yield* gitBundle("release-active"));
  const summary = yield* digestResultCatalog(
    base.releaseId,
    Stream.fromIterable(heads)
  );
  return yield* Schema.decodeEffect(ActiveCatalogIdentitySchema)({
    ...base,
    resultCount: summary.count,
    resultDigest: summary.digest,
  });
});

/** A target that answers each family's heads in one page and counts the pages it serves. */
function countingTarget(heads: readonly ContentHead[]) {
  const pages = { served: 0 };
  const target = PublicationTarget.of({
    ...makeProductionTarget(() => null),
    headPage: (request) =>
      Effect.suspend(() => {
        pages.served += 1;
        return Schema.decodeUnknownEffect(HeadPageSchema)({
          activeManifestHash: request.activeManifestHash,
          activeReleaseId: request.activeReleaseId,
          cursor: request.cursor,
          done: true,
          family: request.family,
          heads: Arr.filter(heads, (each) => each.family === request.family),
          nextCursor: null,
        }).pipe(Effect.orDie);
      }),
  });
  return { pages, target };
}

/** Collects every family's heads in canonical order. */
const collect = Effect.fn("test.heads.collect")(function* (
  streams: Effect.Success<ReturnType<typeof readBaseHeads>>
) {
  return Arr.fromIterable(
    yield* Stream.runCollect(
      Stream.concat(
        Stream.concat(streams.article, streams.material),
        streams.page
      )
    )
  );
});

/** Runs one effect with the heads cache in `folder`, or with none. */
const withCache = (folder: string | null) =>
  Effect.provideService(
    ConfigProvider.ConfigProvider,
    ConfigProvider.fromUnknown(
      folder === null ? {} : { AKSARA_HEADS_CACHE: folder }
    )
  );

describe("production base heads", () => {
  it.effect(
    "reads a base from the heads cache that proves it, and asks the target for none",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const folder = yield* fs.makeTempDirectoryScoped();
        const base = yield* baseOf(HEADS);
        const { pages, target } = countingTarget(HEADS);

        yield* keepResultHeads({
          baseReleaseId: null,
          releaseId: base.releaseId,
          result: Stream.fromIterable(HEADS),
        }).pipe(withCache(folder));
        const heads = yield* readBaseHeads(base).pipe(
          withCache(folder),
          Effect.flatMap(collect),
          Effect.provideService(PublicationTarget, target)
        );

        expect(heads).toEqual(HEADS);
        expect(pages.served).toBe(0);
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );

  it.effect(
    "streams the base from the target without a cache, without its file, or when the kept file fails the proof",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const folder = yield* fs.makeTempDirectoryScoped();
        const base = yield* baseOf(HEADS);
        /** Reads the base with one heads cache, counting the pages the target serves. */
        const read = (cache: string | null) => {
          const { pages, target } = countingTarget(HEADS);
          return readBaseHeads(base).pipe(
            withCache(cache),
            Effect.flatMap(collect),
            Effect.provideService(PublicationTarget, target),
            Effect.map((heads) => ({ heads, served: pages.served }))
          );
        };

        expect(yield* read(null)).toEqual({ heads: HEADS, served: 3 });
        expect(yield* read(folder)).toEqual({ heads: HEADS, served: 3 });
        yield* fs.writeFileString(
          `${folder}/${base.releaseId}.jsonl`,
          `${canonicalizeContentHead(head("material", "other"))}\n`
        );
        expect(yield* read(folder)).toEqual({ heads: HEADS, served: 3 });
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );

  it.effect(
    "keeps the release's catalog and its base's, drops every older one, and keeps nothing without a cache",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const folder = yield* fs.makeTempDirectoryScoped();
        for (const old of ["release-old", "release-active"]) {
          yield* fs.writeFileString(`${folder}/${old}.jsonl`, "");
        }

        yield* keepResultHeads({
          baseReleaseId: releaseId("release-active"),
          releaseId: releaseId("release-next"),
          result: Stream.fromIterable(HEADS),
        }).pipe(withCache(folder));
        yield* keepResultHeads({
          baseReleaseId: null,
          releaseId: releaseId("release-unkept"),
          result: Stream.fromIterable(HEADS),
        }).pipe(withCache(null));

        expect(Arr.sort(yield* fs.readDirectory(folder), Order.String)).toEqual(
          ["release-active.jsonl", "release-next.jsonl"]
        );
        expect(yield* fs.readFileString(`${folder}/release-next.jsonl`)).toBe(
          Arr.join(
            Arr.map(HEADS, (each) => `${canonicalizeContentHead(each)}\n`),
            ""
          )
        );
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );
});

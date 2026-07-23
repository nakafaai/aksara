import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Path } from "@effect/platform";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { projectionPublicPath } from "@nakafa/aksara-contracts/projection/spec";
import {
  type ArticleHead,
  ArticleHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { rendererDomains } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import { Effect, Stream } from "effect";
import { prepareArticlePublication } from "#publisher/article/publication";
import { testFileLayer } from "#test/files";

export const checkoutRoot = resolve(process.cwd(), "..", "..");
export const articleEntries = await Effect.runPromise(decodeArticleRegistry());
export const articlePaths = articleEntries.map(({ sourcePath }) => sourcePath);
export const sourceByPath = new Map(
  articlePaths.map((sourcePath) => {
    const absolutePath = resolve(checkoutRoot, sourcePath);
    return [absolutePath, readFileSync(absolutePath, "utf8")] as const;
  })
);

const baseComponents = ["ContentGrid", "InlineMath"].map((name) => ({
  name,
  version: 1,
}));
const politicsComponents = [
  "BudgetChart",
  "CabinetChart",
  "CompositionChart",
  "FundChart",
  "KimPlusElectabilityChart",
  "PorkBarrelElectabilityChart",
  "Stage",
  "StateTable",
].map((name) => ({ name, version: 1 }));

/** Creates a valid manifest while varying the real politics contract version. */
export function articleManifest(politicsVersion = 1) {
  return Effect.runPromise(
    createRendererManifest({
      base: {
        authoringComponents: baseComponents,
        supportedComponents: baseComponents,
      },
      domains: rendererDomains({
        politics: politicsComponents.map(({ name }) => ({
          name,
          version: politicsVersion,
        })),
      }),
    })
  );
}

export const rendererManifest = await articleManifest();

/** Collects article transitions through exact registry and platform layers. */
export function collectArticlePublication(input: {
  readonly heads: readonly ArticleHead[];
  readonly renderer?: unknown;
  readonly sources?: ReadonlyMap<string, string>;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareArticlePublication({
          checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: input.renderer ?? rendererManifest,
        });
        return yield* publication.records().pipe(
          Stream.runCollect,
          Effect.map((records) => [...records])
        );
      })
    ).pipe(
      Effect.provide(testFileLayer(input.sources ?? sourceByPath)),
      Effect.provide(Path.layer)
    )
  );
}

/** Collects canonical route transitions from one real article plan. */
export function collectArticleRoutes(input: {
  readonly heads: readonly ArticleHead[];
  readonly sources?: ReadonlyMap<string, string>;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareArticlePublication({
          checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest,
        });
        return yield* publication.routes().pipe(
          Stream.runCollect,
          Effect.map((routes) => [...routes])
        );
      })
    ).pipe(
      Effect.provide(testFileLayer(input.sources ?? sourceByPath)),
      Effect.provide(Path.layer)
    )
  );
}

/** Returns one authoritative article planning failure without FiberFailure. */
export function rejectArticlePublication(heads: readonly ArticleHead[]) {
  return Effect.runPromise(
    Effect.scoped(
      prepareArticlePublication({
        checkoutRoot,
        published: Stream.fromIterable(heads),
        rendererManifest,
      })
    ).pipe(
      Effect.provide(testFileLayer(sourceByPath)),
      Effect.provide(Path.layer),
      Effect.flip
    )
  );
}

/** Derives authoritative compact heads from every registered real article. */
export async function publishedArticleHeads() {
  const records = await collectArticlePublication({ heads: [] });
  return records.flatMap((transition) => {
    const { record } = transition;
    if (!("payload" in record)) {
      return [];
    }
    return [
      ArticleHeadSchema.make({
        artifactHash: record.change.artifactHash,
        compilerConfigHash: record.payload.compilerConfigHash,
        contentKey: record.change.contentKey,
        delivery: record.change.delivery,
        family: "article",
        locale: record.change.locale,
        projectionHash: hashContentProjection(record.projection),
        publicPath: projectionPublicPath(record.projection),
        rendererDomain: record.change.rendererDomain,
        sourceHash: record.payload.sourceHash,
        sourcePath: record.change.sourcePath,
      }),
    ];
  });
}

import { resolve } from "node:path";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { projectionPublicPath } from "@nakafa/aksara-contracts/projection/spec";
import {
  type PageHead,
  PageHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import {
  type PublicationScope,
  PublicationScopeSchema,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodePageRegistry } from "@nakafa/aksara-corpus/pages/registry";
import { Effect, Path, Schema, Stream } from "effect";
import { preparePagePublication } from "#publisher/page/publication";
import { testFileLayer } from "#test/files";
import { testRendererDomains } from "#test/renderer";

export const pageEntries = await Effect.runPromise(decodePageRegistry());
export const checkoutRoot = resolve(process.cwd(), "..", "..");
export const privacyPageScope = Schema.decodeSync(PublicationScopeSchema)({
  content: [
    {
      artifactLocale: "en",
      contentKey: "pages/privacy-policy",
      family: "page",
    },
    {
      artifactLocale: "id",
      contentKey: "pages/privacy-policy",
      family: "page",
    },
  ],
  families: [],
  snapshots: [],
});

/** Complete in-memory public page source map used by publisher tests. */
export const sourceByPath = new Map(
  pageEntries.map((entry) => [
    resolve(checkoutRoot, entry.sourcePath),
    `export const metadata = {
  title: "Test ${entry.route.pageKey}",
  description: "Reviewed public page fixture.",
  lastModified: "2026-08-20",
};

# Test ${entry.route.pageKey}
`,
  ])
);

/** Creates one exact test renderer while varying its compiler fingerprint. */
export function pageManifest(baseVersion = 1) {
  return Effect.runPromise(
    createRendererManifest({
      base: {
        authoringComponents: [{ name: "InlineMath", version: baseVersion }],
        supportedComponents: [{ name: "InlineMath", version: baseVersion }],
      },
      domains: testRendererDomains({}),
      publishedDomains: ["site"],
    })
  );
}

export const rendererManifest = await pageManifest();

/** Collects page transitions through the authoritative publication path. */
export function collectPagePublication(input: {
  readonly heads: readonly PageHead[];
  readonly renderer?: unknown;
  readonly scope?: PublicationScope | undefined;
  readonly sources?: ReadonlyMap<string, string>;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* preparePagePublication({
          checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: input.renderer ?? rendererManifest,
          scope: input.scope,
        });
        return yield* publication.records.pipe(
          Stream.runCollect,
          Effect.map((records) => [...records])
        );
      })
    ).pipe(
      Effect.provide([testFileLayer(input.sources ?? sourceByPath), Path.layer])
    )
  );
}

/** Collects the complete result catalog produced by one page scope. */
export function collectPageResult(input: {
  readonly heads: readonly PageHead[];
  readonly scope: PublicationScope;
  readonly sources?: ReadonlyMap<string, string>;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* preparePagePublication({
          checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest,
          scope: input.scope,
        });
        return yield* publication.result.pipe(
          Stream.runCollect,
          Effect.map((heads) => [...heads])
        );
      })
    ).pipe(
      Effect.provide([testFileLayer(input.sources ?? sourceByPath), Path.layer])
    )
  );
}

/** Collects canonical route transitions from one page publication. */
export function collectPageRoutes(input: {
  readonly heads: readonly PageHead[];
  readonly scope?: PublicationScope | undefined;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* preparePagePublication({
          checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest,
          scope: input.scope,
        });
        return yield* publication.routes.pipe(
          Stream.runCollect,
          Effect.map((routes) => [...routes])
        );
      })
    ).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]))
  );
}

/** Returns one authoritative page planning failure without FiberFailure. */
export function rejectPagePublication(
  heads: readonly PageHead[],
  scope?: PublicationScope | undefined
) {
  return Effect.runPromise(
    Effect.scoped(
      preparePagePublication({
        checkoutRoot,
        published: Stream.fromIterable(heads),
        rendererManifest,
        scope,
      })
    ).pipe(
      Effect.provide([testFileLayer(sourceByPath), Path.layer]),
      Effect.flip
    )
  );
}

/** Derives authoritative compact heads from every registered page. */
export async function publishedPageHeads() {
  const records = await collectPagePublication({ heads: [] });
  return records.flatMap((transition) => {
    const { record } = transition;
    if (!("payload" in record)) {
      return [];
    }
    return [
      PageHeadSchema.make({
        artifactHash: record.change.artifactHash,
        artifactLocale: record.change.artifactLocale,
        compilerConfigHash: record.payload.compilerConfigHash,
        contentKey: record.change.contentKey,
        delivery: record.change.delivery,
        family: "page",
        projectionHash: hashContentProjection(record.projection),
        publicPath: projectionPublicPath(record.projection),
        rendererDomain: record.change.rendererDomain,
        sourceHash: record.payload.sourceHash,
        sourcePath: record.change.sourcePath,
      }),
    ];
  });
}

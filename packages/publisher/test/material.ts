import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Path } from "@effect/platform";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { hashMaterialProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  type MaterialHead,
  MaterialHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { digestResultCatalog } from "@nakafa/aksara-contracts/release/result-digest";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { prepareMaterialPublication } from "#publisher/material/publication";
import { testFileLayer } from "#test/files";
import { rendererDomains } from "#test/renderer";

export const checkoutRoot = resolve(process.cwd(), "..", "..");
export const englishPath =
  "packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/en.mdx";
export const indonesianPath =
  "packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/id.mdx";
export const sourceByPath = new Map(
  [englishPath, indonesianPath].map((sourcePath) => {
    const absolutePath = resolve(checkoutRoot, sourcePath);
    return [absolutePath, readFileSync(absolutePath, "utf8")] as const;
  })
);

/** Creates a valid manifest while varying only real domain component versions. */
export function materialManifest(input: {
  readonly chemistry: number;
  readonly math: number;
}) {
  return Effect.runPromise(
    createRendererManifest({
      base: {
        authoringComponents: [{ name: "InlineMath", version: 1 }],
        supportedComponents: [{ name: "InlineMath", version: 1 }],
      },
      domains: rendererDomains({
        chemistry: { name: "AtomShellLab", version: input.chemistry },
        mathematics: { name: "FunctionMachine", version: input.math },
      }),
    })
  );
}

export const rendererManifest = await materialManifest({
  chemistry: 1,
  math: 1,
});

const baseReleaseId = ReleaseIdSchema.make("test-material-base");

/** Derives exact signed-root evidence for one material test catalog. */
function materialBaseCatalog(heads: readonly MaterialHead[]) {
  if (heads.length === 0) {
    return Effect.succeed(null);
  }
  return digestResultCatalog(baseReleaseId, Stream.fromIterable(heads)).pipe(
    Effect.map((summary) => ({ ...summary, releaseId: baseReleaseId }))
  );
}

/** Collects one authoritative material publication through real platform layers. */
export function collectMaterialPublication(input: {
  readonly heads: readonly MaterialHead[];
  readonly renderer?: unknown;
  readonly sources?: ReadonlyMap<string, string>;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const baseCatalog = yield* materialBaseCatalog(input.heads);
        const publication = yield* prepareMaterialPublication({
          baseCatalog,
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

/** Returns an authoritative material planning failure without FiberFailure. */
export function rejectMaterialPublication(heads: readonly MaterialHead[]) {
  return Effect.runPromise(
    Effect.scoped(
      prepareMaterialPublication({
        baseCatalog: {
          count: heads.length,
          digest: heads[0]?.artifactHash ?? rendererManifest.hash,
          releaseId: baseReleaseId,
        },
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

/** Collects first-release records through the authoritative material path. */
function collectMaterialRecords() {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const material = yield* prepareMaterialPublication({
          baseCatalog: null,
          checkoutRoot,
          published: Stream.empty,
          rendererManifest,
        });
        return yield* material.records().pipe(
          Stream.runCollect,
          Effect.map((records) => [...records])
        );
      })
    ).pipe(
      Effect.provide(testFileLayer(sourceByPath)),
      Effect.provide(Path.layer)
    )
  );
}

/** Derives authoritative compact heads from the two real prepared materials. */
export async function publishedMaterialHeads() {
  const records = await collectMaterialRecords();
  return records.flatMap((transition) => {
    const { record } = transition;
    if (!("payload" in record)) {
      return [];
    }
    return [
      MaterialHeadSchema.make({
        artifactHash: record.change.artifactHash,
        compilerConfigHash: record.payload.compilerConfigHash,
        contentKey: record.change.contentKey,
        delivery: record.change.delivery,
        locale: record.change.locale,
        projectionHash: hashMaterialProjection(record.projection),
        publicPath: record.change.publicPath,
        rendererDomain: record.change.rendererDomain,
        sourceHash: record.payload.sourceHash,
        sourcePath: record.change.sourcePath,
      }),
    ];
  });
}

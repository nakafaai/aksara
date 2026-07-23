import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Path } from "@effect/platform";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { projectionPublicPath } from "@nakafa/aksara-contracts/projection/spec";
import {
  type MaterialHead,
  MaterialHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { rendererDomains } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { prepareMaterialPublication } from "#publisher/material/publication";
import { testFileLayer } from "#test/files";
import { materialSlicePaths } from "#test/material-slice";

export const checkoutRoot = resolve(process.cwd(), "..", "..");
export const [
  atomEnglishPath,
  atomIndonesianPath,
  englishPath,
  indonesianPath,
] = materialSlicePaths;
export const sourceByPath = new Map(
  materialSlicePaths.map((sourcePath) => {
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
        authoringComponents: [
          { name: "BlockMath", version: 1 },
          { name: "InlineMath", version: 1 },
        ],
        supportedComponents: [
          { name: "BlockMath", version: 1 },
          { name: "InlineMath", version: 1 },
        ],
      },
      domains: rendererDomains({
        chemistry: [{ name: "AtomShellLab", version: input.chemistry }],
        mathematics: [{ name: "FunctionMachine", version: input.math }],
      }),
    })
  );
}

export const rendererManifest = await materialManifest({
  chemistry: 1,
  math: 1,
});

/** Collects one authoritative material publication through real platform layers. */
export function collectMaterialPublication(input: {
  readonly heads: readonly MaterialHead[];
  readonly renderer?: unknown;
  readonly sources?: ReadonlyMap<string, string>;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareMaterialPublication({
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

/** Collects canonical route transitions from one real material plan. */
export function collectMaterialRoutes(input: {
  readonly heads: readonly MaterialHead[];
  readonly renderer?: unknown;
  readonly sources?: ReadonlyMap<string, string>;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareMaterialPublication({
          checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: input.renderer ?? rendererManifest,
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

/** Returns an authoritative material planning failure without FiberFailure. */
export function rejectMaterialPublication(heads: readonly MaterialHead[]) {
  return Effect.runPromise(
    Effect.scoped(
      prepareMaterialPublication({
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

/** Derives authoritative compact heads from every registered real document. */
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
        family: "material",
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

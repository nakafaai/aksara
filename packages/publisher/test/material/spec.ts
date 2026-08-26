import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { projectionPublicPath } from "@nakafa/aksara-contracts/projection/spec";
import {
  type MaterialHead,
  MaterialHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import {
  type PublicationScope,
  PublicationScopeSchema,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Path, Stream } from "effect";
import { prepareMaterialPublication } from "#publisher/material/publication";
import { testFileLayer } from "#test/files";
import { materialSlicePaths } from "#test/material/slice";
import { testRendererDomains } from "#test/renderer";

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
export const functionContentKey = ContentKeySchema.make(
  "material/lesson/mathematics/function-composition-inverse-function/function-concept"
);
export const materialFamilyScope = PublicationScopeSchema.make({
  families: ["material"],
  snapshots: [],
});

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
          { name: "MathContainer", version: 1 },
        ],
        supportedComponents: [
          { name: "BlockMath", version: 1 },
          { name: "InlineMath", version: 1 },
          { name: "MathContainer", version: 1 },
        ],
      },
      domains: testRendererDomains({
        chemistry: [{ name: "AtomShellLab", version: input.chemistry }],
        mathematics: [{ name: "FunctionMachine", version: input.math }],
      }),
      publishedDomains: ["chemistry", "mathematics"],
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
  readonly scope?: PublicationScope | undefined;
  readonly sources?: ReadonlyMap<string, string>;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareMaterialPublication({
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

/** Collects the complete result catalog produced by one material scope. */
export function collectMaterialResult(input: {
  readonly heads: readonly MaterialHead[];
  readonly scope: PublicationScope;
  readonly sources?: ReadonlyMap<string, string>;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareMaterialPublication({
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

/** Collects canonical route transitions from one real material plan. */
export function collectMaterialRoutes(input: {
  readonly heads: readonly MaterialHead[];
  readonly renderer?: unknown;
  readonly scope?: PublicationScope | undefined;
  readonly sources?: ReadonlyMap<string, string>;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareMaterialPublication({
          checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: input.renderer ?? rendererManifest,
          scope: input.scope,
        });
        return yield* publication.routes.pipe(
          Stream.runCollect,
          Effect.map((routes) => [...routes])
        );
      })
    ).pipe(
      Effect.provide([testFileLayer(input.sources ?? sourceByPath), Path.layer])
    )
  );
}

/** Returns an authoritative material planning failure without FiberFailure. */
export function rejectMaterialPublication(
  heads: readonly MaterialHead[],
  scope?: PublicationScope | undefined
) {
  return Effect.runPromise(
    Effect.scoped(
      prepareMaterialPublication({
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
        return yield* material.records.pipe(
          Stream.runCollect,
          Effect.map((records) => [...records])
        );
      })
    ).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]))
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
        artifactLocale: record.change.artifactLocale,
        compilerConfigHash: record.payload.compilerConfigHash,
        contentKey: record.change.contentKey,
        delivery: record.change.delivery,
        family: "material",
        projectionHash: hashContentProjection(record.projection),
        publicPath: projectionPublicPath(record.projection),
        rendererDomain: record.change.rendererDomain,
        sourceHash: record.payload.sourceHash,
        sourcePath: record.change.sourcePath,
      }),
    ];
  });
}

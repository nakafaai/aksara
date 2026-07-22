import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Path } from "@effect/platform";
import { hashMaterialProjection } from "@nakafa/aksara-contracts/projection/hash";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { prepareMaterialPublication } from "#publisher/material/publication";
import { testFileLayer } from "#test/files";
import { rendererDomains } from "#test/renderer";

export const checkoutRoot = resolve(process.cwd(), "..", "..");
export const englishPath =
  "packages/corpus/material/lesson/mathematics/function-composition/inverse-function/function-concept/en.mdx";
export const indonesianPath =
  "packages/corpus/material/lesson/mathematics/function-composition/inverse-function/function-concept/id.mdx";
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

/** Derives authoritative compact heads from the two real prepared materials. */
export async function publishedMaterialHeads() {
  const records = await collectMaterialRecords();
  return records.flatMap((record) => {
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

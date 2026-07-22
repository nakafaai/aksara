import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import type { RendererManifestEnvelope } from "@nakafaai/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import {
  type MaterialCheckout,
  type MaterialCheckoutSnapshot,
  prepareMaterialCheckout,
} from "#publisher/material";

export const checkoutRoot = resolve(process.cwd(), "..", "..");
export const englishPath =
  "packages/corpus/material/mathematics/function/concept/en.mdx";
export const indonesianPath =
  "packages/corpus/material/mathematics/function/concept/id.mdx";
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
      domains: [
        {
          authoringComponents: [
            { name: "AtomShellLab", version: input.chemistry },
          ],
          name: "material-chemistry",
          supportedComponents: [
            { name: "AtomShellLab", version: input.chemistry },
          ],
        },
        {
          authoringComponents: [
            { name: "FunctionMachine", version: input.math },
          ],
          name: "material-mathematics",
          supportedComponents: [
            { name: "FunctionMachine", version: input.math },
          ],
        },
      ],
    })
  );
}

export const rendererManifest = await materialManifest({
  chemistry: 1,
  math: 1,
});

/** Provides deterministic reads for the two checked-in real MDX sources. */
export function materialFileLayer(sources: ReadonlyMap<string, string>) {
  return FileSystem.layerNoop({
    readFileString: (path) => {
      const source = sources.get(path);
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(
        new PlatformError.SystemError({
          method: "readFileString",
          module: "FileSystem",
          pathOrDescriptor: path,
          reason: "NotFound",
        })
      );
    },
  });
}

/** Runs the local material checkout only at the Vitest boundary. */
export function prepareMaterial(input: {
  readonly previous?: MaterialCheckoutSnapshot;
  readonly renderer?: RendererManifestEnvelope;
  readonly sources?: ReadonlyMap<string, string>;
}) {
  return Effect.runPromise(
    prepareMaterialCheckout({
      checkoutRoot,
      ...(input.previous === undefined ? {} : { previous: input.previous }),
      rendererManifest: input.renderer ?? rendererManifest,
    }).pipe(
      Effect.provide(materialFileLayer(input.sources ?? sourceByPath)),
      Effect.provide(Path.layer)
    )
  );
}

/** Replays prepared records only at the Vitest boundary. */
export function collectMaterialRecords(checkout: MaterialCheckout) {
  return Effect.runPromise(
    checkout.records().pipe(
      Stream.runCollect,
      Effect.map((records) => [...records])
    )
  );
}

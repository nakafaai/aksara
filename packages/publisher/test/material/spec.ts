import { NodeServices } from "@effect/platform-node";
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
} from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Context, Effect, FileSystem, Layer, Path, Stream } from "effect";
import { prepareMaterialPublication } from "#publisher/material/publication";
import { testFileLayer } from "#test/files";
import { materialSlicePaths } from "#test/material/slice";
import { testRendererDomains } from "#test/renderer";

export const [atomEnglishPath, , englishPath] = materialSlicePaths;
export const functionContentKey = ContentKeySchema.make(
  "material/lesson/mathematics/function-composition-inverse-function/function-concept"
);
export const materialFamilyScope = PublicationScopeSchema.make({
  families: ["material"],
  snapshots: [],
});

interface MaterialPublicationInput {
  readonly heads: readonly MaterialHead[];
  readonly renderer?: unknown;
  readonly scope?: PublicationScope | undefined;
  readonly sources?: ReadonlyMap<string, string>;
}

interface MaterialFixtureSource {
  readonly checkoutRoot: string;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly sources: ReadonlyMap<string, string>;
}

/** Creates a valid manifest while varying only real domain component versions. */
export const materialManifest = Effect.fn("MaterialTest.manifest")(
  (input: { readonly chemistry: number; readonly math: number }) =>
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

/** Collects material transitions with one already loaded source fixture. */
const collectMaterialPublicationFrom = Effect.fn("MaterialTest.collectFrom")(
  (fixture: MaterialFixtureSource, input: MaterialPublicationInput) =>
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareMaterialPublication({
          checkoutRoot: fixture.checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: input.renderer ?? fixture.rendererManifest,
          scope: input.scope,
        });
        return yield* publication.records.pipe(
          Stream.runCollect,
          Effect.map((records) => [...records])
        );
      })
    ).pipe(
      Effect.provide([
        testFileLayer(input.sources ?? fixture.sources),
        Path.layer,
      ])
    )
);

/** Collects the complete result catalog with one loaded source fixture. */
const collectMaterialResultFrom = Effect.fn("MaterialTest.collectResultFrom")(
  (
    fixture: MaterialFixtureSource,
    input: {
      readonly heads: readonly MaterialHead[];
      readonly scope: PublicationScope;
      readonly sources?: ReadonlyMap<string, string>;
    }
  ) =>
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareMaterialPublication({
          checkoutRoot: fixture.checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: fixture.rendererManifest,
          scope: input.scope,
        });
        return yield* publication.result.pipe(
          Stream.runCollect,
          Effect.map((heads) => [...heads])
        );
      })
    ).pipe(
      Effect.provide([
        testFileLayer(input.sources ?? fixture.sources),
        Path.layer,
      ])
    )
);

/** Collects canonical routes with one loaded source fixture. */
const collectMaterialRoutesFrom = Effect.fn("MaterialTest.collectRoutesFrom")(
  (fixture: MaterialFixtureSource, input: MaterialPublicationInput) =>
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareMaterialPublication({
          checkoutRoot: fixture.checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: input.renderer ?? fixture.rendererManifest,
          scope: input.scope,
        });
        return yield* publication.routes.pipe(
          Stream.runCollect,
          Effect.map((routes) => [...routes])
        );
      })
    ).pipe(
      Effect.provide([
        testFileLayer(input.sources ?? fixture.sources),
        Path.layer,
      ])
    )
);

/** Returns one material planning failure with one loaded source fixture. */
const rejectMaterialPublicationFrom = Effect.fn("MaterialTest.rejectFrom")(
  (
    fixture: MaterialFixtureSource,
    heads: readonly MaterialHead[],
    scope?: PublicationScope | undefined
  ) =>
    Effect.scoped(
      prepareMaterialPublication({
        checkoutRoot: fixture.checkoutRoot,
        published: Stream.fromIterable(heads),
        rendererManifest: fixture.rendererManifest,
        scope,
      })
    ).pipe(
      Effect.provide([testFileLayer(fixture.sources), Path.layer]),
      Effect.flip
    )
);

/** Derives authoritative compact heads from material publication records. */
function deriveMaterialHeads(
  records: Effect.Success<ReturnType<typeof collectMaterialPublicationFrom>>
) {
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

/** Loads the real material slice and memoizes its first publication. */
const makeMaterialTestFixtures = Effect.fn("MaterialTest.makeFixtures")(() =>
  Effect.gen(function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const workingDirectory = yield* Effect.sync(() => process.cwd());
    const checkoutRoot = path.resolve(workingDirectory, "..", "..");
    const sourceRows = yield* Effect.forEach(
      materialSlicePaths,
      (sourcePath) => {
        const absolutePath = path.resolve(checkoutRoot, sourcePath);
        return fileSystem
          .readFileString(absolutePath)
          .pipe(
            Effect.map((source) => [sourcePath, absolutePath, source] as const)
          );
      }
    );
    const absolutePaths = new Map<string, string>(
      sourceRows.map(([sourcePath, absolutePath]) => [sourcePath, absolutePath])
    );
    const sources = new Map(
      sourceRows.map(([, absolutePath, source]) => [absolutePath, source])
    );
    const rendererManifest = yield* materialManifest({
      chemistry: 1,
      math: 1,
    });
    const fixture = { checkoutRoot, rendererManifest, sources };
    const initialRecords = yield* Effect.cached(
      collectMaterialPublicationFrom(fixture, { heads: [] })
    );

    return { ...fixture, absolutePaths, initialRecords };
  })
);

/** Shared scoped material fixture for direct Effect Vitest suites. */
export class MaterialTestFixtures extends Context.Service<
  MaterialTestFixtures,
  Effect.Success<ReturnType<typeof makeMaterialTestFixtures>>
>()("AksaraPublisherTestMaterialFixtures") {}

export const materialTestLayer: Layer.Layer<MaterialTestFixtures> =
  Layer.effect(MaterialTestFixtures, makeMaterialTestFixtures()).pipe(
    Layer.provide(NodeServices.layer),
    Layer.orDie
  );

/** Collects material transitions through exact source and platform layers. */
export const collectMaterialPublication = Effect.fn("MaterialTest.collect")(
  (input: MaterialPublicationInput) =>
    Effect.flatMap(MaterialTestFixtures, (fixture) =>
      collectMaterialPublicationFrom(fixture, input)
    )
);

/** Collects the complete result catalog produced by one material scope. */
export const collectMaterialResult = Effect.fn("MaterialTest.collectResult")(
  (input: {
    readonly heads: readonly MaterialHead[];
    readonly scope: PublicationScope;
    readonly sources?: ReadonlyMap<string, string>;
  }) =>
    Effect.flatMap(MaterialTestFixtures, (fixture) =>
      collectMaterialResultFrom(fixture, input)
    )
);

/** Collects canonical route transitions from one material publication. */
export const collectMaterialRoutes = Effect.fn("MaterialTest.collectRoutes")(
  (input: MaterialPublicationInput) =>
    Effect.flatMap(MaterialTestFixtures, (fixture) =>
      collectMaterialRoutesFrom(fixture, input)
    )
);

/** Returns one authoritative material planning failure. */
export const rejectMaterialPublication = Effect.fn("MaterialTest.reject")(
  (heads: readonly MaterialHead[], scope?: PublicationScope | undefined) =>
    Effect.flatMap(MaterialTestFixtures, (fixture) =>
      rejectMaterialPublicationFrom(fixture, heads, scope)
    )
);

/** Derives authoritative compact heads from every registered real document. */
export const publishedMaterialHeads = Effect.fn("MaterialTest.publishedHeads")(
  function* () {
    const fixture = yield* MaterialTestFixtures;
    return deriveMaterialHeads(yield* fixture.initialRecords);
  }
);

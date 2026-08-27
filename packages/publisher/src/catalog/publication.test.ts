import { beforeEach, expect, layer } from "@effect/vitest";
import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type {
  ArticleHead,
  MaterialHead,
  PageHead,
  QuestionHead,
} from "@nakafa/aksara-contracts/release/head";
import { digestResultCatalog } from "@nakafa/aksara-contracts/release/result/digest";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Context, Effect, Layer, Path, Stream } from "effect";
import { vi } from "vitest";
import { prepareContentCatalog } from "#publisher/catalog/publication";
import { ArticleTestFixtures, articleTestLayer } from "#test/article";
import { testFileLayer } from "#test/files";
import { sourceByPath as materialSources } from "#test/material/spec";
import { sourceByPath as pageSources } from "#test/page";
import { sourceByPath as questionSources } from "#test/question/spec";
import { testRendererDomains } from "#test/renderer";

const compilerState = vi.hoisted(() => ({ calls: 0 }));
const baseComponents = [
  "BlockMath",
  "ContentGrid",
  "InlineMath",
  "MathContainer",
].map((name) => ({ name, version: 1 }));
vi.mock("@nakafa/aksara-compiler/compile", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@nakafa/aksara-compiler/compile")>();
  return {
    ...original,
    compileContent: (input: unknown) => {
      compilerState.calls += 1;
      return original.compileContent(input);
    },
  };
});
vi.mock("@nakafa/aksara-corpus/material/registry", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/material/registry")
    >();
  const { materialSlicePaths } = await import("#test/material/slice");
  const sourcePaths = new Set<string>(materialSlicePaths);
  return {
    ...original,
    decodeMaterialRegistry: (input?: unknown) =>
      original
        .decodeMaterialRegistry(input)
        .pipe(
          Effect.map((entries) =>
            entries.filter(({ sourcePath }) => sourcePaths.has(sourcePath))
          )
        ),
  };
});

const baseReleaseId = ReleaseIdSchema.make("test-catalog-base");

interface CatalogTestInput {
  readonly article?: readonly ArticleHead[];
  readonly base?: {
    readonly count: number;
    readonly digest: typeof Sha256HashSchema.Type;
    readonly releaseId: typeof baseReleaseId;
  } | null;
  readonly material?: readonly MaterialHead[];
  readonly page?: readonly PageHead[];
  readonly question?: readonly QuestionHead[];
}

interface CatalogFixtureSource {
  readonly checkoutRoot: string;
  readonly rendererManifest: Effect.Success<
    ReturnType<typeof createRendererManifest>
  >;
  readonly sources: ReadonlyMap<string, string>;
}

/** Builds one whole-catalog program from an already loaded source fixture. */
function catalogProgramFrom(
  fixture: CatalogFixtureSource,
  input: CatalogTestInput
) {
  return prepareContentCatalog({
    base: input.base ?? null,
    checkoutRoot: fixture.checkoutRoot,
    published: {
      article: Stream.fromIterable(input.article ?? []),
      material: Stream.fromIterable(input.material ?? []),
      page: Stream.fromIterable(input.page ?? []),
      question: Stream.fromIterable(input.question ?? []),
    },
    rendererManifest: fixture.rendererManifest,
  }).pipe(Effect.provide([testFileLayer(fixture.sources), Path.layer]));
}

/** Collects every replay while the catalog's private spool scope is alive. */
const collectCatalogFrom = Effect.fn("CatalogPublicationTest.collectFrom")(
  (fixture: CatalogFixtureSource, input: CatalogTestInput) =>
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* catalogProgramFrom(fixture, input);
        const [records, result, routes] = yield* Effect.all([
          publication.records.pipe(Stream.runCollect),
          publication.result.pipe(Stream.runCollect),
          publication.routes.pipe(Stream.runCollect),
        ]);
        return {
          records: [...records],
          result: [...result],
          routes: [...routes],
        };
      })
    )
);

/** Returns one typed catalog failure without a FiberFailure wrapper. */
const rejectCatalogFrom = Effect.fn("CatalogPublicationTest.rejectFrom")(
  (fixture: CatalogFixtureSource, input: CatalogTestInput) =>
    Effect.scoped(catalogProgramFrom(fixture, input)).pipe(Effect.flip)
);

/** Loads the complete initial catalog once for the suite. */
const makeCatalogTestFixtures = Effect.fn(
  "CatalogPublicationTest.makeFixtures"
)(() =>
  Effect.gen(function* () {
    const article = yield* ArticleTestFixtures;
    const rendererManifest = yield* createRendererManifest({
      base: {
        authoringComponents: baseComponents,
        supportedComponents: baseComponents,
      },
      domains: testRendererDomains({
        chemistry: [{ name: "AtomShellLab", version: 1 }],
        mathematics: [{ name: "FunctionMachine", version: 1 }],
        politics: [
          "KimPlusElectabilityChart",
          "MerahPutihCabinetChart",
          "MerahPutihCompositionChart",
          "NepotismStage",
          "NepotismStateTable",
          "PorkBarrelBudgetChart",
          "PorkBarrelElectabilityChart",
          "PorkBarrelFundChart",
        ].map((name) => ({ name, version: 1 })),
      }),
      publishedDomains: ["mathematics", "politics"],
    });
    const sources = new Map([
      ...article.sources,
      ...materialSources,
      ...pageSources,
      ...questionSources,
    ]);
    const source = {
      checkoutRoot: article.checkoutRoot,
      rendererManifest,
      sources,
    };
    const initial = yield* collectCatalogFrom(source, {});
    const initialHeads = initial.result;
    const base = yield* digestResultCatalog(
      baseReleaseId,
      Stream.fromIterable(initialHeads)
    ).pipe(Effect.map((summary) => ({ ...summary, releaseId: baseReleaseId })));

    return {
      ...source,
      articleHeads: initialHeads.filter(
        (head): head is ArticleHead => head.family === "article"
      ),
      base,
      initial,
      initialHeads,
      materialHeads: initialHeads.filter(
        (head): head is MaterialHead => head.family === "material"
      ),
      pageHeads: initialHeads.filter(
        (head): head is PageHead => head.family === "page"
      ),
      questionHeads: initialHeads.filter(
        (head): head is QuestionHead => head.family === "question"
      ),
    };
  })
);

class CatalogTestFixtures extends Context.Service<
  CatalogTestFixtures,
  Effect.Success<ReturnType<typeof makeCatalogTestFixtures>>
>()("AksaraPublisherCatalogTestFixtures") {}

const catalogTestLayer = Layer.effect(
  CatalogTestFixtures,
  makeCatalogTestFixtures()
).pipe(Layer.provide(articleTestLayer));
/** Collects a catalog replay through the shared suite fixture. */
const collectCatalog = Effect.fn("CatalogPublicationTest.collect")(
  (input: CatalogTestInput) =>
    Effect.flatMap(CatalogTestFixtures, (fixture) =>
      collectCatalogFrom(fixture, input)
    )
);
/** Returns one catalog planning failure through the shared suite fixture. */
const rejectCatalog = Effect.fn("CatalogPublicationTest.reject")(
  (input: CatalogTestInput) =>
    Effect.flatMap(CatalogTestFixtures, (fixture) =>
      rejectCatalogFrom(fixture, input)
    )
);
beforeEach(() => {
  compilerState.calls = 0;
});

layer(catalogTestLayer)("content catalog publication", (it) => {
  it.effect(
    "compiles each authored body once before replaying all catalog views",
    () =>
      Effect.gen(function* () {
        const fixture = yield* CatalogTestFixtures;
        const publication = yield* collectCatalog({});
        expect(compilerState.calls).toBe(publication.result.length);
        expect(publication.result).toHaveLength(fixture.initialHeads.length);
      })
  );

  it.effect("merges all four family streams in canonical order", () =>
    Effect.gen(function* () {
      const { initial, initialHeads } = yield* CatalogTestFixtures;
      expect(initial.records).toHaveLength(43);
      expect(initial.routes).toHaveLength(43);
      expect(initialHeads).toHaveLength(43);
      expect(initialHeads.map(({ family }) => family)).toEqual([
        ...Array.from({ length: 21 }, () => "article"),
        ...Array.from({ length: 4 }, () => "material"),
        ...Array.from({ length: 12 }, () => "page"),
        ...Array.from({ length: 6 }, () => "question"),
      ]);
    })
  );

  it.effect(
    "authenticates the complete base once and preserves every head",
    () =>
      Effect.gen(function* () {
        const fixture = yield* CatalogTestFixtures;
        const publication = yield* collectCatalog({
          article: fixture.articleHeads,
          base: fixture.base,
          material: fixture.materialHeads,
          page: fixture.pageHeads,
          question: fixture.questionHeads,
        });
        expect(publication.records).toEqual([]);
        expect(publication.result).toEqual(fixture.initialHeads);
        expect(compilerState.calls).toBe(0);
      })
  );

  it.effect("fails a mismatched base before compiling any family", () =>
    Effect.gen(function* () {
      const fixture = yield* CatalogTestFixtures;
      const error = yield* rejectCatalog({
        article: fixture.articleHeads,
        base: {
          ...fixture.base,
          digest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        },
        material: fixture.materialHeads,
        page: fixture.pageHeads,
        question: fixture.questionHeads,
      });
      expect(error).toMatchObject({
        _tag: "ResultCatalogDigestMismatchError",
      });
      expect(compilerState.calls).toBe(0);
    })
  );

  it.effect("rejects active heads when genesis has no signed base", () =>
    Effect.gen(function* () {
      const { articleHeads } = yield* CatalogTestFixtures;
      const error = yield* rejectCatalog({
        article: articleHeads.slice(0, 1),
      });
      expect(error).toMatchObject({
        _tag: "CatalogGenesisError",
        actualCount: 1,
      });
      expect(compilerState.calls).toBe(0);
    })
  );
});

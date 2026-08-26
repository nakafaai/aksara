import { beforeEach, describe, expect, it } from "@effect/vitest";
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
import { Effect, Path, Stream } from "effect";
import { vi } from "vitest";
import { prepareContentCatalog } from "#publisher/catalog/publication";
import { sourceByPath as articleSources, checkoutRoot } from "#test/article";
import { testFileLayer } from "#test/files";
import { sourceByPath as materialSources } from "#test/material/spec";
import { sourceByPath as pageSources } from "#test/page";
import { sourceByPath as questionSources } from "#test/question/spec";
import { testRendererDomains } from "#test/renderer";

const compilerState = vi.hoisted(() => ({ calls: 0 }));

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

const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [
        { name: "BlockMath", version: 1 },
        { name: "ContentGrid", version: 1 },
        { name: "InlineMath", version: 1 },
        { name: "MathContainer", version: 1 },
      ],
      supportedComponents: [
        { name: "BlockMath", version: 1 },
        { name: "ContentGrid", version: 1 },
        { name: "InlineMath", version: 1 },
        { name: "MathContainer", version: 1 },
      ],
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
  })
);
const sources = new Map([
  ...articleSources,
  ...materialSources,
  ...pageSources,
  ...questionSources,
]);
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

/** Builds one whole-catalog test program under its required scoped layers. */
function catalogProgram(input: CatalogTestInput) {
  return prepareContentCatalog({
    base: input.base ?? null,
    checkoutRoot,
    published: {
      article: Stream.fromIterable(input.article ?? []),
      material: Stream.fromIterable(input.material ?? []),
      page: Stream.fromIterable(input.page ?? []),
      question: Stream.fromIterable(input.question ?? []),
    },
    rendererManifest,
  }).pipe(Effect.provide([testFileLayer(sources), Path.layer]));
}

/** Collects every replay while the catalog's private spool scope is alive. */
function collectCatalog(input: CatalogTestInput) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* catalogProgram(input);
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
}

/** Returns one typed catalog failure without a FiberFailure wrapper. */
function rejectCatalog(input: CatalogTestInput) {
  return Effect.runPromise(
    Effect.scoped(catalogProgram(input)).pipe(Effect.flip)
  );
}

const initial = await collectCatalog({});
const initialHeads = initial.result;
const articleHeads = initialHeads.filter(
  (head): head is ArticleHead => head.family === "article"
);
const materialHeads = initialHeads.filter(
  (head): head is MaterialHead => head.family === "material"
);
const pageHeads = initialHeads.filter(
  (head): head is PageHead => head.family === "page"
);
const questionHeads = initialHeads.filter(
  (head): head is QuestionHead => head.family === "question"
);
const base = await Effect.runPromise(
  digestResultCatalog(baseReleaseId, Stream.fromIterable(initialHeads)).pipe(
    Effect.map((summary) => ({ ...summary, releaseId: baseReleaseId }))
  )
);

beforeEach(() => {
  compilerState.calls = 0;
});

describe("content catalog publication", () => {
  it("compiles each authored body once before replaying all catalog views", async () => {
    const publication = await collectCatalog({});

    expect(compilerState.calls).toBe(publication.result.length);
    expect(publication.result).toHaveLength(initialHeads.length);
  });

  it("merges all four family streams in canonical order", () => {
    expect(initial.records).toHaveLength(43);
    expect(initial.routes).toHaveLength(43);
    expect(initialHeads).toHaveLength(43);
    expect(
      initialHeads.slice(0, 21).every((head) => head.family === "article")
    ).toBe(true);
    expect(
      initialHeads.slice(21, 25).every((head) => head.family === "material")
    ).toBe(true);
    expect(
      initialHeads.slice(25, 37).every((head) => head.family === "page")
    ).toBe(true);
    expect(
      initialHeads.slice(37).every((head) => head.family === "question")
    ).toBe(true);
  });

  it("authenticates the complete base once and preserves every head", async () => {
    const publication = await collectCatalog({
      article: articleHeads,
      base,
      material: materialHeads,
      page: pageHeads,
      question: questionHeads,
    });

    expect(publication.records).toEqual([]);
    expect(publication.result).toEqual(initialHeads);
    expect(compilerState.calls).toBe(0);
  });

  it("fails a mismatched base before compiling any family", async () => {
    const error = await rejectCatalog({
      article: articleHeads,
      base: {
        ...base,
        digest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
      },
      material: materialHeads,
      page: pageHeads,
      question: questionHeads,
    });

    expect(error).toMatchObject({
      _tag: "ResultCatalogDigestMismatchError",
    });
    expect(compilerState.calls).toBe(0);
  });

  it("rejects active heads when genesis has no signed base", async () => {
    const error = await rejectCatalog({
      article: articleHeads.slice(0, 1),
    });

    expect(error).toMatchObject({
      _tag: "CatalogGenesisError",
      actualCount: 1,
    });
    expect(compilerState.calls).toBe(0);
  });
});

import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  compareContentHeads,
  headIdentity,
} from "@nakafa/aksara-contracts/content";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { prepareAcceptanceCatalog } from "#publisher/acceptance/catalog";
import {
  AcceptanceSourceError,
  loadAcceptanceSources,
} from "#publisher/acceptance/source";
import { planArticlePublication } from "#publisher/article/plan";
import { ReplaySpoolError } from "#publisher/replay/error";
import { makeAcceptanceTestSources } from "#test/acceptance";
import { testRendererDomains } from "#test/renderer";

const compiler = vi.hoisted(() => ({ calls: 0 }));
vi.mock("#publisher/article/plan", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("#publisher/article/plan")>();
  return {
    ...original,
    planArticlePublication: vi.fn(original.planArticlePublication),
  };
});
vi.mock("#publisher/acceptance/source", async (importOriginal) => ({
  ...(await importOriginal<typeof import("#publisher/acceptance/source")>()),
  loadAcceptanceSources: vi.fn(),
}));
vi.mock("@nakafa/aksara-compiler/compile", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@nakafa/aksara-compiler/compile")>();
  return {
    ...original,
    compileContent: (input: Parameters<typeof original.compileContent>[0]) => {
      compiler.calls += 1;
      return original.compileContent(input);
    },
  };
});

layer(NodeServices.layer)("acceptance catalog preparation", (it) => {
  it.effect(
    "rejects an incomplete genesis plan instead of silently dropping an authored body",
    () =>
      Effect.gen(function* () {
        const fixture = yield* makeAcceptanceTestSources();
        vi.mocked(loadAcceptanceSources).mockReturnValue(
          Effect.succeed(fixture.sources)
        );
        vi.mocked(planArticlePublication).mockReturnValueOnce(Stream.make({}));
        const error = yield* prepareAcceptanceCatalog(fixture).pipe(
          Effect.flip
        );
        expect(error).toBeInstanceOf(ReplaySpoolError);
        expect(error).toMatchObject({ operation: "decode" });
      })
  );
  it.effect(
    "compiles real family sources once and seals consistent repeatable catalog views",
    () =>
      Effect.gen(function* () {
        const fixture = yield* makeAcceptanceTestSources();
        vi.mocked(loadAcceptanceSources).mockReturnValue(
          Effect.succeed(fixture.sources)
        );
        compiler.calls = 0;
        const catalog = yield* prepareAcceptanceCatalog(fixture);
        const [records, result, routes, repeatedRecords, repeatedResult] =
          yield* Effect.all([
            Stream.runCollect(catalog.records),
            Stream.runCollect(catalog.result),
            Stream.runCollect(catalog.routes),
            Stream.runCollect(catalog.records),
            Stream.runCollect(catalog.result),
          ]);
        const count =
          fixture.sources.article.length +
          fixture.sources.material.length +
          fixture.sources.page.length +
          fixture.sources.tryout.entries.length;
        expect(records).toHaveLength(count);
        expect(result).toHaveLength(count);
        expect(routes).toHaveLength(count);
        expect(repeatedRecords).toEqual(records);
        expect(repeatedResult).toEqual(result);
        expect(result).toEqual([...result].sort(compareContentHeads));
        expect(new Set(result.map(headIdentity)).size).toBe(count);
        expect(result.map(({ family }) => family)).toEqual([
          ...fixture.sources.article.map(() => "article"),
          ...fixture.sources.material.map(() => "material"),
          ...fixture.sources.page.map(() => "page"),
          ...fixture.sources.tryout.entries.map(() => "question"),
        ]);
        expect(compiler.calls).toBe(count);
        expect(catalog.tryout).toBe(fixture.sources.tryout);
      })
  );

  it.effect("preserves a required-source failure before any compilation", () =>
    Effect.gen(function* () {
      const failure = new AcceptanceSourceError({
        identity: "test:missing:de",
      });
      vi.mocked(loadAcceptanceSources).mockReturnValue(Effect.fail(failure));
      compiler.calls = 0;
      const fixture = yield* makeAcceptanceTestSources();
      const error = yield* prepareAcceptanceCatalog(fixture).pipe(Effect.flip);
      expect(error).toBe(failure);
      expect(compiler.calls).toBe(0);
    })
  );

  it.effect(
    "rejects a renderer missing components required by the selected authored content",
    () =>
      Effect.gen(function* () {
        const fixture = yield* makeAcceptanceTestSources();
        vi.mocked(loadAcceptanceSources).mockReturnValue(
          Effect.succeed(fixture.sources)
        );
        const rendererManifest = yield* createRendererManifest({
          base: {
            authoringComponents: [{ name: "InlineMath", version: 1 }],
            supportedComponents: [{ name: "InlineMath", version: 1 }],
          },
          domains: testRendererDomains({}),
          publishedDomains: ["chemistry", "mathematics", "politics"],
        });
        const error = yield* prepareAcceptanceCatalog({
          ...fixture,
          rendererManifest,
        }).pipe(Effect.flip);
        expect(error).toMatchObject({ _tag: "RendererComponentMissingError" });
      })
  );
});

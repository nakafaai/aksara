import { resolve } from "node:path";
import { beforeEach, expect, layer } from "@effect/vitest";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { Context, Effect, Layer, Path, Schema, Stream } from "effect";
import { vi } from "vitest";
import {
  planQuestionPublication,
  QuestionItemJoinError,
} from "#publisher/question/plan";
import { testFileLayer } from "#test/files";
import {
  checkoutRoot,
  collectQuestionPublication,
  publishedQuestionHeads,
  questionEntries,
  rendererManifest,
  sourceByPath,
} from "#test/question/spec";

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

const fingerprintCases = [
  ["compiler config", { compilerConfigHash: `sha256:${"1".repeat(64)}` }],
  ["projection", { projectionHash: `sha256:${"2".repeat(64)}` }],
  ["source", { sourceHash: `sha256:${"3".repeat(64)}` }],
] as const;

/** Decodes a modified question head without bypassing the wire contract. */
const modifyHead = Effect.fn("QuestionPlanTest.modifyHead")((input: unknown) =>
  Schema.decodeUnknownEffect(QuestionHeadSchema)(input, {
    onExcessProperty: "error",
  })
);

/** Replaces one canonical head while preserving complete catalog order. */
function replaceHead(
  publishedHeads: readonly QuestionHead[],
  replacement: QuestionHead
) {
  return publishedHeads.map((head) =>
    head.contentKey === replacement.contentKey &&
    head.artifactLocale === replacement.artifactLocale
      ? replacement
      : head
  );
}

/** Loads real question heads before per-test compiler accounting begins. */
const makePlanTestFixtures = Effect.fn("QuestionPlanTest.makeFixtures")(() =>
  Effect.gen(function* () {
    const publishedHeads = yield* Effect.promise(publishedQuestionHeads);
    const englishEntry = yield* Effect.fromNullishOr(
      questionEntries.find(
        ({ bodyKind, artifactLocale }) =>
          bodyKind === "question" && artifactLocale === "en"
      )
    );
    const englishHead = yield* Effect.fromNullishOr(
      publishedHeads.find(
        ({ contentKey, artifactLocale }) =>
          contentKey === englishEntry.contentKey && artifactLocale === "en"
      )
    );

    return { englishEntry, englishHead, publishedHeads };
  })
);

class QuestionPlanTestFixtures extends Context.Service<
  QuestionPlanTestFixtures,
  Effect.Success<ReturnType<typeof makePlanTestFixtures>>
>()("AksaraPublisherQuestionPlanTestFixtures") {}

const planTestLayer = Layer.effect(
  QuestionPlanTestFixtures,
  makePlanTestFixtures()
);

beforeEach(() => {
  compilerState.calls = 0;
});

layer(planTestLayer)("question plan", (it) => {
  it.effect(
    "emits no records and performs no compilation for matching heads",
    () =>
      Effect.gen(function* () {
        const { publishedHeads } = yield* QuestionPlanTestFixtures;
        const records = yield* Effect.promise(() =>
          collectQuestionPublication({ heads: publishedHeads })
        );

        expect(records).toEqual([]);
        expect(compilerState.calls).toBe(0);
      })
  );

  it.effect("compiles only the real question body whose source changed", () =>
    Effect.gen(function* () {
      const { englishEntry, publishedHeads } = yield* QuestionPlanTestFixtures;
      const sources = new Map(sourceByPath);
      const absolutePath = resolve(checkoutRoot, englishEntry.sourcePath);
      const english = yield* Effect.fromNullishOr(sources.get(absolutePath));
      sources.set(absolutePath, `${english}\n`);

      const records = yield* Effect.promise(() =>
        collectQuestionPublication({
          heads: publishedHeads,
          sources,
        })
      );

      expect(records).toHaveLength(1);
      expect(records[0]?.record.change).toMatchObject({
        artifactLocale: "en",
        delivery: "authenticated",
        family: "question",
        operation: "upsert",
      });
      expect(compilerState.calls).toBe(1);
    })
  );

  it.effect.each(fingerprintCases)(
    "compiles only a head whose %s fingerprint changed",
    ([, changed]) =>
      Effect.gen(function* () {
        const fixture = yield* QuestionPlanTestFixtures;
        const head = yield* modifyHead({
          ...fixture.englishHead,
          ...changed,
        });
        const records = yield* Effect.promise(() =>
          collectQuestionPublication({
            heads: replaceHead(fixture.publishedHeads, head),
          })
        );

        expect(records).toHaveLength(1);
        expect(compilerState.calls).toBe(1);
      })
  );

  it.effect("emits one tombstone without compiling an absent source", () =>
    Effect.gen(function* () {
      const fixture = yield* QuestionPlanTestFixtures;
      const stale = yield* modifyHead({
        ...fixture.englishHead,
        contentKey:
          "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-99/question",
        sourcePath:
          "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-99/question.en.mdx",
      });
      const records = yield* Effect.promise(() =>
        collectQuestionPublication({
          heads: [...fixture.publishedHeads, stale],
        })
      );

      expect(records).toContainEqual({
        prior: { head: stale, state: "question" },
        record: {
          change: {
            artifactLocale: "en",
            contentKey: stale.contentKey,
            family: "question",
            operation: "delete",
          },
        },
      });
      expect(compilerState.calls).toBe(0);
    })
  );

  it.effect("compiles all six canonical bodies for the first release", () =>
    Effect.gen(function* () {
      const records = yield* Effect.promise(() =>
        collectQuestionPublication({ heads: [] })
      );

      expect(records).toHaveLength(6);
      expect(
        records.every(({ record }) => record.change.operation === "upsert")
      ).toBe(true);
      expect(compilerState.calls).toBe(6);
    })
  );

  it.effect("fails when a body cannot join its canonical item source", () =>
    Effect.gen(function* () {
      const { englishEntry } = yield* QuestionPlanTestFixtures;
      const error = yield* planQuestionPublication({
        checkoutRoot,
        entries: [englishEntry],
        published: Stream.empty,
        rendererManifest,
        sources: [],
      }).pipe(
        Stream.runDrain,
        Effect.provide([testFileLayer(sourceByPath), Path.layer]),
        Effect.flip
      );

      expect(error).toBeInstanceOf(QuestionItemJoinError);
      expect(error).toMatchObject({
        _tag: "QuestionItemJoinError",
        sourceRoot: englishEntry.sourceRoot,
      });
    })
  );
});

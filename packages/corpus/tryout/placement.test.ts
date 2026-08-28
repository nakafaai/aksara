import { describe, expect, it } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ActiveAppLocaleSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect, Path } from "effect";
import { selectQuestionContent } from "#corpus/question-bank/content";
import { corpusRoot, makeQuestionLayer } from "#corpus/test/question-layer";
import {
  makeTryoutPlacement,
  TryoutPlacementError,
} from "#corpus/tryout/placement";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

const promptPath = CorpusSourcePathSchema.make(
  "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/question.en.mdx"
);

/** Loads one real question and its exact source-owned placement context. */
const loadPlacementFixture = Effect.fn(
  "AksaraCorpus.test.loadPlacementFixture"
)(function* () {
  const sources = yield* decodeTryoutRegistry();
  const content = yield* selectQuestionContent(
    corpusRoot,
    sources,
    promptPath
  ).pipe(Effect.provide([makeQuestionLayer(), Path.layer]));
  const source = yield* Effect.fromNullishOr(
    sources.find(({ examKey }) => examKey === "snbt")
  );
  const track = yield* Effect.fromNullishOr(
    source.tracks.find(({ key }) => key === "2027")
  );
  const set = yield* Effect.fromNullishOr(
    track.sets.find(({ key }) => key === "set-1")
  );
  const section = yield* Effect.fromNullishOr(
    set.sections.find(({ key }) => key === "reading-and-writing-skills")
  );
  return {
    context: { section, set, source, track },
    question: content.source,
  };
});

describe("tryout placement", () => {
  it.effect("builds the canonical placement from one owned hierarchy", () =>
    Effect.gen(function* () {
      const fixture = yield* loadPlacementFixture();
      const placement = yield* makeTryoutPlacement(
        fixture.context,
        fixture.question,
        ActiveAppLocaleSchema.make("en")
      );

      expect(placement).toMatchObject({
        questionOrder: 1,
        sectionKey: "reading-and-writing-skills",
        setKey: "set-1",
        trackKey: "2027",
      });
    })
  );

  it.effect("rejects an unrelated hierarchy and out-of-range order", () =>
    Effect.gen(function* () {
      const fixture = yield* loadPlacementFixture();
      const detachedContext = {
        ...fixture.context,
        section: { ...fixture.context.section },
      };
      const outOfRange = {
        ...fixture.question,
        questionNumber: fixture.context.section.questionCount + 1,
      };
      const [owner, order] = yield* Effect.all([
        makeTryoutPlacement(
          detachedContext,
          fixture.question,
          ActiveAppLocaleSchema.make("en")
        ).pipe(Effect.flip),
        makeTryoutPlacement(
          fixture.context,
          outOfRange,
          ActiveAppLocaleSchema.make("en")
        ).pipe(Effect.flip),
      ]);

      expect(owner).toBeInstanceOf(TryoutPlacementError);
      expect(owner).toMatchObject({
        _tag: "TryoutPlacementError",
        reason: "owner",
      });
      expect(order).toBeInstanceOf(TryoutPlacementError);
      expect(order).toMatchObject({
        _tag: "TryoutPlacementError",
        reason: "order",
      });
    })
  );

  it.effect("rejects a prompt without choices in its delivered language", () =>
    Effect.gen(function* () {
      const fixture = yield* loadPlacementFixture();
      const error = yield* makeTryoutPlacement(
        fixture.context,
        { ...fixture.question, choices: { id: fixture.question.choices.id } },
        ActiveAppLocaleSchema.make("en")
      ).pipe(Effect.flip);

      expect(error).toBeInstanceOf(TryoutPlacementError);
      expect(error).toMatchObject({
        _tag: "TryoutPlacementError",
        reason: "choices",
      });
    })
  );

  it.effect(
    "builds the active German placement without mutating source rows",
    () =>
      Effect.gen(function* () {
        const fixture = yield* loadPlacementFixture();
        const placement = yield* makeTryoutPlacement(
          fixture.context,
          {
            ...fixture.question,
            choices: {
              ...fixture.question.choices,
              de: [
                { label: "Antwort A", value: true },
                { label: "Antwort B", value: false },
              ],
            },
          },
          AppLocaleSchema.make("de")
        );

        expect(placement).toMatchObject({
          answerArtifactLocale: "de",
          appLocale: "de",
          deliveryLanguage: "de",
          questionArtifactLocale: "de",
        });
      })
  );
});

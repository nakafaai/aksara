import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { indexQuestionBanks } from "#corpus/question-bank/path";
import { discoverQuestionSources } from "#corpus/question-bank/source";
import { corpusRoot, questionLayer } from "#corpus/test/question-layer";
import { loadTryoutContent } from "#corpus/tryout/content";
import { projectTryoutSources } from "#corpus/tryout/projection";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

const ENGLISH_PATH_PATTERN = /\/mathematics$/u;
const INDONESIAN_PATH_PATTERN = /\/matematika$/u;

/** Loads the exact active content and projection from one corpus scan. */
const loadContent = Effect.fn("AksaraCorpus.test.loadTryoutProjectionContent")(
  function* () {
    return yield* loadTryoutContent(corpusRoot).pipe(
      Effect.provide(questionLayer)
    );
  }
);

/** Loads reviewed hierarchy and question sources for typed failure tests. */
const loadSources = Effect.fn("AksaraCorpus.test.loadTryoutProjectionSources")(
  function* () {
    const sources = yield* decodeTryoutRegistry();
    const questionBanks = yield* indexQuestionBanks(sources);
    const questions = yield* discoverQuestionSources(
      corpusRoot,
      questionBanks
    ).pipe(Effect.provide(questionLayer));
    return [sources, questions] satisfies readonly [
      typeof sources,
      typeof questions,
    ];
  }
);

describe("tryout projection", () => {
  it.effect(
    "projects the exact active hierarchy and localized placements",
    () =>
      Effect.gen(function* () {
        const { projection } = yield* loadContent();
        const counts = Object.fromEntries(
          ["country", "exam", "track", "set", "section"].map((kind) => [
            kind,
            projection.catalog.filter(({ row }) => row.kind === kind).length,
          ])
        );
        const bodyHeads = new Set(
          projection.placements.flatMap((row) => [
            `${row.questionContentKey}\0${row.appLocale}`,
            `${row.answerContentKey}\0${row.appLocale}`,
          ])
        );

        expect(counts).toEqual({
          country: 3,
          exam: 6,
          section: 51,
          set: 15,
          track: 6,
        });
        expect(projection.catalog).toHaveLength(81);
        expect(projection.routeCount).toBe(72);
        expect(projection.placements).toHaveLength(1260);
        expect(
          new Set(
            projection.placements.map(
              ({ questionContentKey }) => questionContentKey
            )
          ).size
        ).toBe(420);
        expect(bodyHeads.size).toBe(2520);
        expect(
          projection.placements.every(
            ({ choices, scope }) =>
              scope === "server" &&
              choices.filter(({ isCorrect }) => isCorrect).length === 1
          )
        ).toBe(true);
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "reuses exact assessed-language choices across app locales",
    () =>
      Effect.gen(function* () {
        const { projection, sources: questions } = yield* loadContent();
        const english = projection.placements.filter(({ questionContentKey }) =>
          questionContentKey.includes("/snbt/english-language/")
        );
        const placement = yield* Effect.fromNullishOr(
          english.find(({ appLocale }) => appLocale === "en")
        );
        const peer = yield* Effect.fromNullishOr(
          english.find(
            ({ appLocale, questionContentKey }) =>
              appLocale === "id" &&
              questionContentKey === placement.questionContentKey
          )
        );
        const source = yield* Effect.fromNullishOr(
          questions.find(
            ({ questionKey }) =>
              `${questionKey}/question` === placement.questionContentKey
          )
        );
        const englishChoices = yield* Effect.fromNullishOr(source.choices.en);

        expect(placement.choices).toEqual(
          englishChoices.map(({ label, value }, index) => ({
            isCorrect: value,
            label,
            optionKey: `option-${index + 1}`,
            order: index + 1,
          }))
        );
        expect(peer.choices).toEqual(
          englishChoices.map(({ label, value }, index) => ({
            isCorrect: value,
            label,
            optionKey: `option-${index + 1}`,
            order: index + 1,
          }))
        );
        expect(source.choices.id).toBeUndefined();
        expect("questionLanguage" in placement).toBe(false);
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "derives graph identity from source keys for routes and internal entries",
    () =>
      Effect.gen(function* () {
        const { projection } = yield* loadContent();
        const trackEn = yield* Effect.fromNullishOr(
          projection.catalog.find(
            ({ row }) =>
              row.kind === "track" &&
              row.examKey === "tka" &&
              row.appLocale === "en"
          )?.row
        );
        const trackId = yield* Effect.fromNullishOr(
          projection.catalog.find(
            ({ row }) =>
              row.kind === "track" &&
              row.examKey === "tka" &&
              row.appLocale === "id"
          )?.row
        );
        const internal = yield* Effect.fromNullishOr(
          projection.catalog.find(
            ({ row }) =>
              row.kind === "section" &&
              row.examKey === "tka" &&
              row.setKey === "set-1" &&
              row.appLocale === "id"
          )?.row
        );

        expect(trackEn.publicPath).toMatch(ENGLISH_PATH_PATTERN);
        expect(trackId.publicPath).toMatch(INDONESIAN_PATH_PATTERN);
        expect(trackEn.graph).toMatchObject({
          conceptId: "concept:tryout:indonesia:tka:mathematics",
          learningObjectId: "lo:tryout-track:indonesia:tka:mathematics",
          lensId: "lens:tryout:indonesia:tka",
        });
        expect(trackId.graph.conceptId).toBe(trackEn.graph.conceptId);
        expect(trackId.graph.assetId).not.toBe(trackEn.graph.assetId);
        expect(internal).toMatchObject({
          graph: {
            conceptId: "concept:tryout:indonesia:tka:mathematics:mathematics",
            learningObjectId:
              "lo:tryout-section:indonesia:tka:mathematics:set-1:mathematics",
            lensId: "lens:tryout:indonesia:tka",
          },
          visibility: "internal-entry",
        });
        expect("publicPath" in internal).toBe(false);
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "excludes every physical set outside the active source registry",
    () =>
      Effect.gen(function* () {
        const { projection } = yield* loadContent();
        const snbt = projection.placements.filter(
          ({ examKey }) => examKey === "snbt"
        );
        const tka = projection.placements.filter(
          ({ examKey }) => examKey === "tka"
        );

        expect(snbt).toHaveLength(900);
        expect(tka).toHaveLength(360);
        expect(
          snbt.some(({ questionContentKey }) =>
            questionContentKey.includes("/set-3/")
          )
        ).toBe(false);
        expect(new Set(tka.map(({ setKey }) => setKey))).toEqual(
          new Set(["set-1", "set-2", "set-3"])
        );
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "rejects missing, duplicate, malformed, and colliding source facts",
    () =>
      Effect.gen(function* () {
        const [sources, questions] = yield* loadSources();
        const active = yield* Effect.fromNullishOr(
          questions.find(({ questionKey }) =>
            questionKey.includes("/snbt/general-reasoning/set-1/question-1")
          )
        );
        const activeEnglishChoices = yield* Effect.fromNullishOr(
          active.choices.en
        );
        const invalidChoices = questions.map((question) =>
          question.questionKey === active.questionKey
            ? {
                ...question,
                choices: {
                  ...question.choices,
                  en: activeEnglishChoices.map((choice) => ({
                    ...choice,
                    value: false,
                  })),
                },
              }
            : question
        );
        const failures = yield* Effect.all([
          projectTryoutSources(
            sources,
            questions.filter(
              ({ questionKey }) => questionKey !== active.questionKey
            )
          ).pipe(Effect.flip),
          projectTryoutSources(sources, [...questions, active]).pipe(
            Effect.flip
          ),
          projectTryoutSources(sources, invalidChoices).pipe(Effect.flip),
        ]);

        expect(failures.map(({ _tag }) => _tag)).toEqual([
          "TryoutQuestionMissingError",
          "TryoutQuestionDuplicateError",
          "TryoutPlacementError",
        ]);
      }),
    { timeout: 30_000 }
  );
});

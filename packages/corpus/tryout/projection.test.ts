import { describe, expect, it } from "@effect/vitest";
import { questionResponseFor } from "@nakafa/aksara-contracts/question/item";
import { Effect } from "effect";
import {
  hasValidQuestionResponse,
  loadTryoutProjectionContent,
  loadTryoutProjectionSources,
} from "#corpus/test/tryout";
import { projectTryoutSources } from "#corpus/tryout/projection";

const ENGLISH_PATH_PATTERN = /\/mathematics$/u;
const INDONESIAN_PATH_PATTERN = /\/matematika$/u;

describe("tryout projection", () => {
  it.effect(
    "projects the exact active hierarchy and localized placements",
    () =>
      Effect.gen(function* () {
        const { projection } = yield* loadTryoutProjectionContent();
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
          section: 237,
          set: 57,
          track: 12,
        });
        expect(projection.catalog).toHaveLength(315);
        expect(projection.routeCount).toBe(288);
        expect(projection.placements).toHaveLength(5475);
        expect(
          new Set(
            projection.placements.map(
              ({ questionContentKey }) => questionContentKey
            )
          ).size
        ).toBe(1825);
        expect(bodyHeads.size).toBe(10_950);
        expect(
          projection.placements.every(
            ({ response, scope }) =>
              scope === "server" && hasValidQuestionResponse(response)
          )
        ).toBe(true);
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "reuses the exact assessed-language response across app locales",
    () =>
      Effect.gen(function* () {
        const { projection, sources: questions } =
          yield* loadTryoutProjectionContent();
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
        const englishResponse = yield* questionResponseFor(
          source.item,
          placement.questionArtifactLocale
        );

        expect(placement.response).toEqual(englishResponse);
        expect(peer.response).toEqual(englishResponse);
        expect(source.item.responses.id).toBeUndefined();
        expect("questionLanguage" in placement).toBe(false);
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "derives graph identity from source keys for routes and internal entries",
    () =>
      Effect.gen(function* () {
        const { projection } = yield* loadTryoutProjectionContent();
        const trackEn = yield* Effect.fromNullishOr(
          projection.catalog.find(
            ({ row }) =>
              row.kind === "track" &&
              row.examKey === "tka" &&
              row.trackKey === "mathematics" &&
              row.appLocale === "en"
          )?.row
        );
        const trackId = yield* Effect.fromNullishOr(
          projection.catalog.find(
            ({ row }) =>
              row.kind === "track" &&
              row.examKey === "tka" &&
              row.trackKey === "mathematics" &&
              row.appLocale === "id"
          )?.row
        );
        const internal = yield* Effect.fromNullishOr(
          projection.catalog.find(
            ({ row }) =>
              row.kind === "section" &&
              row.examKey === "tka" &&
              row.sectionKey === "mathematics" &&
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
    "projects every complete active SNBT and TKA set",
    () =>
      Effect.gen(function* () {
        const { projection } = yield* loadTryoutProjectionContent();
        const snbt = projection.placements.filter(
          ({ examKey }) => examKey === "snbt"
        );
        const tka = projection.placements.filter(
          ({ examKey }) => examKey === "tka"
        );

        expect(snbt).toHaveLength(4800);
        expect(tka).toHaveLength(675);
        expect(
          Array.from({ length: 10 }, (_, index) => `set-${index + 1}`).map(
            (setKey) =>
              snbt.filter(
                ({ appLocale, setKey: placementSetKey }) =>
                  appLocale === "en" && placementSetKey === setKey
              ).length
          )
        ).toEqual(Array.from({ length: 10 }, () => 160));
        expect(
          ["mathematics", "indonesian-language", "english-language"].map(
            (trackKey) =>
              tka.filter(
                ({ appLocale, trackKey: placementTrackKey }) =>
                  appLocale === "en" && placementTrackKey === trackKey
              ).length
          )
        ).toEqual([75, 75, 75]);
        expect(new Set(snbt.map(({ setKey }) => setKey))).toEqual(
          new Set(Array.from({ length: 10 }, (_, index) => `set-${index + 1}`))
        );
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
        const [sources, questions] = yield* loadTryoutProjectionSources();
        const active = yield* Effect.fromNullishOr(
          questions.find(({ questionKey }) =>
            questionKey.includes("/snbt/general-reasoning/set-1/question-1")
          )
        );
        const activeIndonesianResponse = yield* Effect.fromNullishOr(
          active.item.responses.id
        );
        const invalidItems = questions.map((question) =>
          question.questionKey === active.questionKey
            ? {
                ...question,
                item: {
                  responses: {
                    id: activeIndonesianResponse,
                  },
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
          projectTryoutSources(sources, invalidItems).pipe(Effect.flip),
        ]);

        expect(failures.map(({ _tag }) => _tag)).toEqual([
          "TryoutQuestionMissingError",
          "TryoutQuestionDuplicateError",
          "TryoutPlacementError",
        ]);
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "rejects isolated and noncontiguous shared stimuli",
    () =>
      Effect.gen(function* () {
        const [sources, questions] = yield* loadTryoutProjectionSources();
        const groupPath = "/tka/mathematics/set-1/";
        const fifth = yield* Effect.fromNullishOr(
          questions.find(({ questionKey }) =>
            questionKey.includes(`${groupPath}question-5`)
          )
        );
        const sixth = yield* Effect.fromNullishOr(
          questions.find(({ questionKey }) =>
            questionKey.includes(`${groupPath}question-6`)
          )
        );
        const seventh = yield* Effect.fromNullishOr(
          questions.find(({ questionKey }) =>
            questionKey.includes(`${groupPath}question-7`)
          )
        );
        const stimulusKey = yield* Effect.fromNullishOr(fifth.item.stimulusKey);
        const withoutSixth = questions.map((question) => {
          if (question !== sixth) {
            return question;
          }
          const { stimulusKey: _stimulusKey, ...item } = question.item;
          return { ...question, item };
        });
        const noncontiguous = withoutSixth.map((question) =>
          question === seventh
            ? { ...question, item: { ...question.item, stimulusKey } }
            : question
        );
        const [isolated, separated] = yield* Effect.all([
          projectTryoutSources(sources, withoutSixth).pipe(Effect.flip),
          projectTryoutSources(sources, noncontiguous).pipe(Effect.flip),
        ]);

        expect([isolated, separated]).toEqual([
          expect.objectContaining({
            _tag: "TryoutStimulusGroupError",
            reason: "isolated",
            stimulusKey,
          }),
          expect.objectContaining({
            _tag: "TryoutStimulusGroupError",
            reason: "noncontiguous",
            stimulusKey,
          }),
        ]);
      }),
    { timeout: 30_000 }
  );
});

import { expect, layer } from "@effect/vitest";
import { questionResponseFor } from "@nakafa/aksara-contracts/question/item";
import { Array as Arr, Effect, HashSet, Record as Rec } from "effect";
import { realQuestionCorpusLayer } from "#corpus/test/question";
import {
  hasValidQuestionResponse,
  loadTryoutProjectionContent,
  loadTryoutProjectionSources,
} from "#corpus/test/tryout";
import { projectTryoutSources } from "#corpus/tryout/projection";

const COMPULSORY_TRACK = "compulsory-mathematics";

layer(realQuestionCorpusLayer)("tryout projection", (it) => {
  it.effect(
    "projects the exact active hierarchy and localized placements",
    () =>
      Effect.gen(function* () {
        const { projection } = yield* loadTryoutProjectionContent();
        const counts = Rec.fromEntries(
          Arr.map(["country", "exam", "track", "set", "section"], (kind) => [
            kind,
            Arr.filter(projection.catalog, ({ row }) => row.kind === kind)
              .length,
          ])
        );
        const bodyHeads = HashSet.fromIterable(
          Arr.flatMap(projection.placements, (row) => [
            `${row.questionContentKey}\0${row.appLocale}`,
            `${row.answerContentKey}\0${row.appLocale}`,
          ])
        );

        expect(counts).toEqual({
          country: 3,
          exam: 6,
          section: 240,
          set: 60,
          track: 12,
        });
        expect(projection.catalog).toHaveLength(321);
        expect(projection.routeCount).toBe(291);
        expect(projection.placements).toHaveLength(5550);
        expect(
          HashSet.size(
            HashSet.fromIterable(
              Arr.map(
                projection.placements,
                ({ questionContentKey }) => questionContentKey
              )
            )
          )
        ).toBe(1850);
        expect(HashSet.size(bodyHeads)).toBe(11_100);
        expect(
          Arr.every(
            projection.placements,
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
        const english = Arr.filter(
          projection.placements,
          ({ questionContentKey }) =>
            questionContentKey.includes("/snbt/literacy-in-english/")
        );
        const placement = yield* Effect.fromOption(
          Arr.findFirst(english, ({ appLocale }) => appLocale === "en")
        );
        const peer = yield* Effect.fromOption(
          Arr.findFirst(
            english,
            ({ appLocale, questionContentKey }) =>
              appLocale === "id" &&
              questionContentKey === placement.questionContentKey
          )
        );
        const source = yield* Effect.fromOption(
          Arr.findFirst(
            questions,
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
    "projects every complete active SNBT and TKA set",
    () =>
      Effect.gen(function* () {
        const { projection } = yield* loadTryoutProjectionContent();
        const snbt = Arr.filter(
          projection.placements,
          ({ examKey }) => examKey === "snbt"
        );
        const tka = Arr.filter(
          projection.placements,
          ({ examKey }) => examKey === "tka"
        );

        expect(snbt).toHaveLength(4800);
        expect(tka).toHaveLength(750);
        expect(
          Arr.map(
            Array.from({ length: 10 }, (_, index) => `set-${index + 1}`),
            (setKey) =>
              Arr.filter(
                snbt,
                ({ appLocale, setKey: placementSetKey }) =>
                  appLocale === "en" && placementSetKey === setKey
              ).length
          )
        ).toEqual(Array.from({ length: 10 }, () => 160));
        expect(
          Arr.map(
            [COMPULSORY_TRACK, "indonesian-language", "english-language"],
            (trackKey) =>
              Arr.filter(
                tka,
                ({ appLocale, trackKey: placementTrackKey }) =>
                  appLocale === "en" && placementTrackKey === trackKey
              ).length
          )
        ).toEqual([75, 75, 100]);
        expect(
          HashSet.fromIterable(Arr.map(snbt, ({ setKey }) => setKey))
        ).toEqual(
          HashSet.fromIterable(
            Array.from({ length: 10 }, (_, index) => `set-${index + 1}`)
          )
        );
        expect(
          HashSet.fromIterable(Arr.map(tka, ({ setKey }) => setKey))
        ).toEqual(HashSet.make("set-1", "set-2", "set-3", "set-4"));
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "rejects missing, duplicate, malformed, and colliding source facts",
    () =>
      Effect.gen(function* () {
        const [sources, questions] = yield* loadTryoutProjectionSources();
        const active = yield* Effect.fromOption(
          Arr.findFirst(questions, ({ questionKey }) =>
            questionKey.includes("/snbt/general-reasoning/set-1/question-1")
          )
        );
        const activeIndonesianResponse = yield* Effect.fromNullishOr(
          active.item.responses.id
        );
        const invalidItems = Arr.map(questions, (question) =>
          question.questionKey === active.questionKey
            ? {
                ...question,
                item: {
                  responses: {
                    en: activeIndonesianResponse,
                  },
                },
              }
            : question
        );
        const failures = yield* Effect.all([
          projectTryoutSources(
            sources,
            Arr.filter(
              questions,
              ({ questionKey }) => questionKey !== active.questionKey
            )
          ).pipe(Effect.flip),
          projectTryoutSources(sources, [...questions, active]).pipe(
            Effect.flip
          ),
          projectTryoutSources(sources, invalidItems).pipe(Effect.flip),
        ]);

        expect(Arr.map(failures, ({ _tag }) => _tag)).toEqual([
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
        const groupPath = "/tka/compulsory-mathematics/set-1/";
        const fifth = yield* Effect.fromOption(
          Arr.findFirst(questions, ({ questionKey }) =>
            questionKey.includes(`${groupPath}question-5`)
          )
        );
        const sixth = yield* Effect.fromOption(
          Arr.findFirst(questions, ({ questionKey }) =>
            questionKey.includes(`${groupPath}question-6`)
          )
        );
        const seventh = yield* Effect.fromOption(
          Arr.findFirst(questions, ({ questionKey }) =>
            questionKey.includes(`${groupPath}question-7`)
          )
        );
        const stimulusKey = yield* Effect.fromNullishOr(fifth.item.stimulusKey);
        const withoutSixth = Arr.map(questions, (question) => {
          if (question !== sixth) {
            return question;
          }
          const { stimulusKey: _stimulusKey, ...item } = question.item;
          return { ...question, item };
        });
        const noncontiguous = Arr.map(withoutSixth, (question) =>
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

  it.effect(
    "reports one invalid shared stimulus when a section has two",
    () =>
      Effect.gen(function* () {
        const [sources, questions] = yield* loadTryoutProjectionSources();
        /** Finds one question of the compulsory mathematics set 1 section by number. */
        const questionAt = (number: number) =>
          Effect.fromOption(
            Arr.findFirst(questions, ({ questionKey }) =>
              questionKey.endsWith(
                `/tka/compulsory-mathematics/set-1/question-${number}`
              )
            )
          );
        const fifth = yield* questionAt(5);
        const sixth = yield* questionAt(6);
        const eighteenth = yield* questionAt(18);
        const stimulusKey = yield* Effect.fromNullishOr(fifth.item.stimulusKey);
        const withoutStimuli = Arr.map(questions, (question) => {
          if (question !== sixth && question !== eighteenth) {
            return question;
          }
          const { stimulusKey: _stimulusKey, ...item } = question.item;
          return { ...question, item };
        });
        const failure = yield* projectTryoutSources(
          sources,
          withoutStimuli
        ).pipe(Effect.flip);

        expect(failure).toEqual(
          expect.objectContaining({
            _tag: "TryoutStimulusGroupError",
            questionKey: fifth.questionKey,
            reason: "isolated",
            stimulusKey,
          })
        );
      }),
    { timeout: 30_000 }
  );
});

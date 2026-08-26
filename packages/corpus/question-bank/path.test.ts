import { describe, expect, it } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { Effect, Schema } from "effect";

import {
  decodeQuestionDocumentPath,
  decodeQuestionPath,
  indexQuestionBanks,
  locateQuestionEntry,
  type QuestionBankIndex,
  questionSourceFiles,
} from "#corpus/question-bank/path";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";
import { defineTryoutExamSource } from "#corpus/tryout/schema";

const questionPathFixtures = Effect.gen(function* () {
  const [tryoutSources, futureSource] = yield* Effect.all([
    decodeTryoutRegistry(),
    defineTryoutExamSource({
      countryCode: "DE",
      countryKey: "germany",
      countryOrder: 2,
      countryRevision: "test",
      countryRouteSlugs: { en: "germany", id: "jerman" },
      countryTranslations: {
        en: { title: "Germany" },
        id: { title: "Jerman" },
      },
      examKey: "abitur",
      examOrder: 1,
      examRouteSlugs: { en: "abitur", id: "abitur" },
      examTranslations: {
        en: { title: "Abitur" },
        id: { title: "Abitur" },
      },
      scoringStrategy: "raw",
      sourceRevision: "test",
      tracks: [
        {
          key: "mathematics",
          kind: "subject",
          order: 1,
          routeSlugs: { en: "mathematics", id: "matematika" },
          sets: [
            {
              key: "foundation-set",
              order: 1,
              routeSlugs: { en: "foundation", id: "dasar" },
              sections: [
                {
                  key: "mathematics",
                  order: 1,
                  questionCount: 1,
                  questionSourcePath:
                    "question-bank/tryout/germany/abitur/mathematics/foundation-set",
                  rendererDomain: "mathematics",
                  routeSlugs: { en: "mathematics", id: "matematika" },
                  timeLimitSeconds: 60,
                  translations: {
                    en: { title: "Mathematics" },
                    id: { title: "Matematika" },
                  },
                },
              ],
              translations: {
                en: { title: "Foundation" },
                id: { title: "Dasar" },
              },
            },
          ],
          translations: {
            en: { title: "Mathematics" },
            id: { title: "Matematika" },
          },
        },
      ],
    }),
  ]);
  const [questionBanks, futureBanks] = yield* Effect.all([
    indexQuestionBanks(tryoutSources),
    indexQuestionBanks([futureSource]),
  ]);
  return { futureBanks, questionBanks, tryoutSources };
});

/** Returns one typed path rejection for the selected question-bank index. */
function rejectPath(questionBanks: QuestionBankIndex, path: string) {
  return decodeQuestionPath(questionBanks, path).pipe(Effect.flip);
}

describe("question path", () => {
  it("derives the exact active files without translating assessed-language prompts", () => {
    expect(
      questionSourceFiles(TryoutKeySchema.make("general-reasoning"))
    ).toEqual([
      "answer.de.mdx",
      "answer.en.mdx",
      "answer.id.mdx",
      "choices.ts",
      "question.de.mdx",
      "question.en.mdx",
      "question.id.mdx",
    ]);
    expect(
      questionSourceFiles(TryoutKeySchema.make("english-language"))
    ).toEqual([
      "answer.de.mdx",
      "answer.en.mdx",
      "answer.id.mdx",
      "choices.ts",
      "question.en.mdx",
    ]);
  });

  it("locates the terminal question below a question-prefixed bank", () => {
    expect(
      locateQuestionEntry(
        "germany/abitur/question-writing/foundation-set/question-1/choices.ts",
        "/"
      )
    ).toEqual({
      file: "choices.ts",
      root: "germany/abitur/question-writing/foundation-set/question-1",
    });
    expect(locateQuestionEntry("germany/abitur/question-writing", "/")).toBe(
      undefined
    );
  });

  it.effect(
    "derives renderer ownership from the canonical try-out sections",
    () =>
      Effect.gen(function* () {
        const { questionBanks } = yield* questionPathFixtures;
        const [plain, mathematics] = yield* Effect.all([
          decodeQuestionPath(
            questionBanks,
            "indonesia/snbt/reading-and-writing-skills/set-1/question-1"
          ),
          decodeQuestionPath(
            questionBanks,
            "indonesia/tka/mathematics/set-3/question-40"
          ),
        ]);

        expect(plain).toMatchObject({
          rendererDomain: "snbt-plain",
          setKey:
            "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1",
        });
        expect(mathematics).toMatchObject({
          questionNumber: 40,
          rendererDomain: "tka-math",
        });
      })
  );

  it.effect(
    "accepts a registered future country, exam, and generic set key",
    () =>
      Effect.gen(function* () {
        const { futureBanks } = yield* questionPathFixtures;
        const location = yield* decodeQuestionPath(
          futureBanks,
          "germany/abitur/mathematics/foundation-set/question-1"
        );

        expect(location).toMatchObject({
          questionKey:
            "question-bank/tryout/germany/abitur/mathematics/foundation-set/question-1",
          rendererDomain: "mathematics",
          setKey:
            "question-bank/tryout/germany/abitur/mathematics/foundation-set",
        });
      })
  );

  it.effect("fails closed for unknown or conflicting renderer ownership", () =>
    Effect.gen(function* () {
      const { questionBanks, tryoutSources } = yield* questionPathFixtures;
      const snbt = yield* Effect.fromNullishOr(
        tryoutSources.find(({ examKey }) => examKey === "snbt")
      );
      const track = yield* Effect.fromNullishOr(snbt.tracks[0]);
      const firstSet = yield* Effect.fromNullishOr(track.sets[0]);
      const firstSection = yield* Effect.fromNullishOr(
        firstSet.sections.find(({ key }) => key === "general-reasoning")
      );
      const conflictingDomain =
        yield* Schema.decodeEffect(RendererDomainSchema)("snbt-plain");
      const conflict = {
        ...snbt,
        tracks: [
          {
            ...track,
            sets: [
              {
                ...firstSet,
                sections: firstSet.sections.map((section) =>
                  section === firstSection
                    ? { ...section, rendererDomain: conflictingDomain }
                    : section
                ),
              },
              ...track.sets.slice(1),
            ],
          },
        ],
      };
      const [unknown, conflicting] = yield* Effect.all([
        rejectPath(
          questionBanks,
          "indonesia/snbt/unsupported/set-1/question-1"
        ),
        indexQuestionBanks([
          conflict,
          ...tryoutSources.filter((source) => source !== snbt),
        ]).pipe(Effect.flip),
      ]);

      expect([unknown, conflicting]).toEqual([
        expect.objectContaining({
          _tag: "QuestionPathError",
          reason: "renderer",
        }),
        expect.objectContaining({
          _tag: "QuestionPathError",
          reason: "renderer",
        }),
      ]);
    })
  );

  it.effect("rejects malformed physical and localized document paths", () =>
    Effect.gen(function* () {
      const { questionBanks } = yield* questionPathFixtures;
      const malformed = yield* Effect.forEach(
        [
          "indonesia/snbt/general-reasoning/set-1/question-x",
          "indonesia/snbt/reading-and/Writing-skills/set-1/question-1",
          `indonesia/snbt/general-reasoning/set-${"9".repeat(600)}/question-1`,
        ],
        (path) => rejectPath(questionBanks, path)
      );
      const bodyPath = CorpusSourcePathSchema.make(
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question.en.mdx"
      );
      const [body, invalidDocument, choicesDocument] = yield* Effect.all([
        decodeQuestionDocumentPath(questionBanks, bodyPath),
        decodeQuestionDocumentPath(
          questionBanks,
          CorpusSourcePathSchema.make(
            "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/notes.mdx"
          )
        ).pipe(Effect.flip),
        decodeQuestionDocumentPath(
          questionBanks,
          CorpusSourcePathSchema.make(
            "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/choices.ts"
          )
        ).pipe(Effect.flip),
      ]);

      expect(body).toMatchObject({
        artifactLocale: "en",
        bodyKind: "question",
        rendererDomain: "snbt-general",
        sourcePath: bodyPath,
      });
      expect([invalidDocument, choicesDocument]).toEqual([
        expect.objectContaining({ reason: "grammar" }),
        expect.objectContaining({ reason: "grammar" }),
      ]);
      expect(malformed.every(({ reason }) => reason === "grammar")).toBe(true);
    })
  );
});

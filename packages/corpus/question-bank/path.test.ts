import { describe, expect, it } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { DeliveryLanguageSchema } from "@nakafa/aksara-contracts/locale";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";

import {
  decodeQuestionDocumentPath,
  decodeQuestionPath,
  indexQuestionBanks,
  locateQuestionEntry,
  questionSourceFiles,
} from "#corpus/question-bank/path";
import { questionPathFixtures, rejectQuestionPath } from "#corpus/test/tryout";

describe("question path", () => {
  it("derives the exact active files without translating assessed-language prompts", () => {
    expect(questionSourceFiles({ kind: "app-locale" })).toEqual([
      "answer.de.mdx",
      "answer.en.mdx",
      "answer.id.mdx",
      "item.ts",
      "question.de.mdx",
      "question.en.mdx",
      "question.id.mdx",
    ]);
    expect(
      questionSourceFiles({
        kind: "fixed",
        language: DeliveryLanguageSchema.make("en"),
      })
    ).toEqual([
      "answer.de.mdx",
      "answer.en.mdx",
      "answer.id.mdx",
      "item.ts",
      "question.en.mdx",
    ]);
  });

  it("locates the terminal question below a question-prefixed bank", () => {
    expect(
      locateQuestionEntry(
        "germany/abitur/question-writing/foundation-set/question-1/item.ts",
        "/"
      )
    ).toEqual({
      file: "item.ts",
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
      const rendererConflict = {
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
      const languageConflict = {
        ...snbt,
        tracks: [
          {
            ...track,
            sets: [
              {
                ...firstSet,
                sections: firstSet.sections.map((section) =>
                  section === firstSection
                    ? {
                        ...section,
                        languagePolicy: {
                          kind: "fixed" as const,
                          language: DeliveryLanguageSchema.make("en"),
                        },
                      }
                    : section
                ),
              },
              ...track.sets.slice(1),
            ],
          },
        ],
      };
      const [unknown, renderer, language] = yield* Effect.all([
        rejectQuestionPath(
          questionBanks,
          "indonesia/snbt/unsupported/set-1/question-1"
        ),
        indexQuestionBanks([
          rendererConflict,
          ...tryoutSources.filter((source) => source !== snbt),
        ]).pipe(Effect.flip),
        indexQuestionBanks([
          languageConflict,
          ...tryoutSources.filter((source) => source !== snbt),
        ]).pipe(Effect.flip),
      ]);

      expect([unknown, renderer, language]).toEqual([
        expect.objectContaining({
          _tag: "QuestionPathError",
          reason: "renderer",
        }),
        expect.objectContaining({
          _tag: "QuestionPathError",
          reason: "renderer",
        }),
        expect.objectContaining({
          _tag: "QuestionPathError",
          reason: "language",
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
        (path) => rejectQuestionPath(questionBanks, path)
      );
      const bodyPath = CorpusSourcePathSchema.make(
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question.en.mdx"
      );
      const [body, invalidDocument, itemDocument] = yield* Effect.all([
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
            "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/item.ts"
          )
        ).pipe(Effect.flip),
      ]);

      expect(body).toMatchObject({
        artifactLocale: "en",
        bodyKind: "question",
        rendererDomain: "snbt-general",
        sourcePath: bodyPath,
      });
      expect([invalidDocument, itemDocument]).toEqual([
        expect.objectContaining({ reason: "grammar" }),
        expect.objectContaining({ reason: "grammar" }),
      ]);
      expect(malformed.every(({ reason }) => reason === "grammar")).toBe(true);
    })
  );
});

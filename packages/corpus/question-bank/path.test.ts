import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  decodeQuestionDocumentPath,
  decodeQuestionPath,
  indexQuestionBanks,
  locateQuestionEntry,
  questionAuthoringArtifactLocalesForSection,
  questionAuthoringSourceFiles,
} from "#corpus/question-bank/path";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";
import { defineTryoutExamSource } from "#corpus/tryout/schema";

const tryoutSources = await Effect.runPromise(decodeTryoutRegistry());
const questionBanks = await Effect.runPromise(
  indexQuestionBanks(tryoutSources)
);
const futureSource = await Effect.runPromise(
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
  })
);
const futureBanks = await Effect.runPromise(indexQuestionBanks([futureSource]));

/** Returns one required test node without bypassing its inferred type. */
function requireNode<Value>(value: Value | undefined, label: string): Value {
  if (value === undefined) {
    throw new Error(`Expected ${label}.`);
  }
  return value;
}

/** Returns one typed path rejection at the Vitest boundary. */
function rejectPath(path: string) {
  return Effect.runPromise(
    decodeQuestionPath(questionBanks, path).pipe(Effect.flip)
  );
}

describe("question path", () => {
  it("derives candidate files without translating assessed-language prompts", () => {
    expect(
      questionAuthoringSourceFiles(TryoutKeySchema.make("general-reasoning"))
    ).toEqual([
      "answer.de.mdx",
      "answer.en.mdx",
      "answer.id.mdx",
      "choices.de.ts",
      "choices.ts",
      "question.de.mdx",
      "question.en.mdx",
      "question.id.mdx",
    ]);
    expect(
      questionAuthoringArtifactLocalesForSection(
        TryoutKeySchema.make("english-language")
      )
    ).toEqual(["en"]);
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

  it("derives renderer ownership from the canonical try-out sections", async () => {
    const [plain, mathematics] = await Effect.runPromise(
      Effect.all([
        decodeQuestionPath(
          questionBanks,
          "indonesia/snbt/reading-and-writing-skills/set-1/question-1"
        ),
        decodeQuestionPath(
          questionBanks,
          "indonesia/tka/mathematics/set-3/question-40"
        ),
      ])
    );

    expect(plain).toMatchObject({
      rendererDomain: "snbt-plain",
      setKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1",
    });
    expect(mathematics).toMatchObject({
      questionNumber: 40,
      rendererDomain: "tka-math",
    });
  });

  it("accepts a registered future country, exam, and generic set key", async () => {
    const location = await Effect.runPromise(
      decodeQuestionPath(
        futureBanks,
        "germany/abitur/mathematics/foundation-set/question-1"
      )
    );

    expect(location).toMatchObject({
      questionKey:
        "question-bank/tryout/germany/abitur/mathematics/foundation-set/question-1",
      rendererDomain: "mathematics",
      setKey: "question-bank/tryout/germany/abitur/mathematics/foundation-set",
    });
  });

  it("fails closed for unknown or conflicting renderer ownership", async () => {
    const snbt = requireNode(
      tryoutSources.find(({ examKey }) => examKey === "snbt"),
      "SNBT source"
    );
    const track = requireNode(snbt.tracks[0], "SNBT track");
    const firstSet = requireNode(track.sets[0], "first SNBT set");
    const firstSection = requireNode(
      firstSet.sections.find(({ key }) => key === "general-reasoning"),
      "general reasoning section"
    );
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
                  ? {
                      ...section,
                      rendererDomain:
                        Schema.decodeUnknownSync(RendererDomainSchema)(
                          "snbt-plain"
                        ),
                    }
                  : section
              ),
            },
            ...track.sets.slice(1),
          ],
        },
      ],
    };
    const [unknown, conflicting] = await Promise.all([
      rejectPath("indonesia/snbt/unsupported/set-1/question-1"),
      Effect.runPromise(
        indexQuestionBanks([
          conflict,
          ...tryoutSources.filter((source) => source !== snbt),
        ]).pipe(Effect.flip)
      ),
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
  });

  it("rejects malformed physical and localized document paths", async () => {
    const malformed = await Promise.all(
      [
        "indonesia/snbt/general-reasoning/set-1/question-x",
        "indonesia/snbt/reading-and/Writing-skills/set-1/question-1",
        `indonesia/snbt/general-reasoning/set-${"9".repeat(600)}/question-1`,
      ].map(rejectPath)
    );
    const bodyPath = CorpusSourcePathSchema.make(
      "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question.en.mdx"
    );
    const [body, invalidDocument, choicesDocument] = await Promise.all([
      Effect.runPromise(decodeQuestionDocumentPath(questionBanks, bodyPath)),
      Effect.runPromise(
        decodeQuestionDocumentPath(
          questionBanks,
          CorpusSourcePathSchema.make(
            "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/notes.mdx"
          )
        ).pipe(Effect.flip)
      ),
      Effect.runPromise(
        decodeQuestionDocumentPath(
          questionBanks,
          CorpusSourcePathSchema.make(
            "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/choices.ts"
          )
        ).pipe(Effect.flip)
      ),
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
  });
});

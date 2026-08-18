import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { QuestionChoicesSchema } from "@nakafa/aksara-contracts/projection/question";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  addQuestionChoiceOverlay,
  embeddedQuestionChoiceLocales,
  QuestionChoiceLocaleError,
  questionChoiceOverlayLocale,
  questionChoiceOverlayLocales,
  questionChoiceSourceFiles,
  validateQuestionChoiceLocales,
} from "#corpus/question-bank/choice-locale";

const generalReasoning = TryoutKeySchema.make("general-reasoning");
const englishLanguage = TryoutKeySchema.make("english-language");
const indonesianLanguage = TryoutKeySchema.make("indonesian-language");
const german = AppLocaleSchema.make("de");
const sourcePath = CorpusSourcePathSchema.make(
  "packages/corpus/question-bank/example/choices.ts"
);
const baseChoices = Schema.decodeUnknownSync(QuestionChoicesSchema)({
  en: [{ label: "A", value: true }],
  id: [{ label: "B", value: true }],
});
const germanChoices = Schema.decodeUnknownSync(QuestionChoicesSchema)({
  de: [{ label: "C", value: true }],
});

describe("question choice locale", () => {
  it("derives embedded and overlay files from section language policy", () => {
    expect(embeddedQuestionChoiceLocales(generalReasoning)).toEqual([
      "en",
      "id",
    ]);
    expect(questionChoiceOverlayLocales(generalReasoning, [german])).toEqual([
      "de",
    ]);
    expect(questionChoiceSourceFiles(generalReasoning, [german])).toEqual([
      "choices.ts",
      "choices.de.ts",
    ]);
    expect(questionChoiceOverlayLocale("choices.de.ts")).toBe("de");
    expect(questionChoiceOverlayLocale("choices.en.ts")).toBeUndefined();
  });

  it("preserves the assessed language without a German choice overlay", () => {
    expect(embeddedQuestionChoiceLocales(englishLanguage)).toEqual(["en"]);
    expect(embeddedQuestionChoiceLocales(indonesianLanguage)).toEqual(["id"]);
    expect(questionChoiceOverlayLocales(englishLanguage, [german])).toEqual([]);
    expect(questionChoiceSourceFiles(indonesianLanguage, [german])).toEqual([
      "choices.ts",
    ]);
  });

  it("validates exact source closure before composing an overlay", async () => {
    const embedded = await Effect.runPromise(
      validateQuestionChoiceLocales(
        baseChoices,
        [ArtifactLocaleSchema.make("en"), ArtifactLocaleSchema.make("id")],
        sourcePath
      )
    );
    const overlay = await Effect.runPromise(
      validateQuestionChoiceLocales(
        germanChoices,
        [ArtifactLocaleSchema.make("de")],
        sourcePath
      )
    );

    expect(addQuestionChoiceOverlay(embedded, overlay, "de")).toEqual({
      ...baseChoices,
      ...germanChoices,
    });
  });

  it("reports the exact mismatched source locales", async () => {
    const error = await Effect.runPromise(
      validateQuestionChoiceLocales(
        baseChoices,
        [ArtifactLocaleSchema.make("en")],
        sourcePath
      ).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(QuestionChoiceLocaleError);
    expect(error).toMatchObject({
      actualLocales: ["en", "id"],
      expectedLocales: ["en"],
      sourcePath,
    });
  });
});

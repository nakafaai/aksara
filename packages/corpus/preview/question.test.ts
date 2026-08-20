import { resolve } from "node:path";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  type AppLocaleCode,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Layer, Path } from "effect";
import { selectQuestion } from "#corpus/preview/question";
import {
  candidateQuestionChoicesSource,
  corpusRoot,
  generalQuestionSourceFiles,
  makeQuestionLayer,
  type QuestionDirectoryRead,
  type QuestionLayerOverrides,
} from "#corpus/test/question-layer";

/** Selects one question through the real preview owner. */
function selectDocument(
  sourcePath: string,
  directoryReads: QuestionDirectoryRead[] = [],
  appLocale?: AppLocaleCode,
  overrides?: QuestionLayerOverrides
) {
  return Effect.runPromise(
    selectQuestion(
      corpusRoot,
      CorpusSourcePathSchema.make(sourcePath),
      appLocale === undefined ? undefined : AppLocaleSchema.make(appLocale)
    ).pipe(
      Effect.provide(
        Layer.merge(makeQuestionLayer(directoryReads, overrides), Path.layer)
      )
    )
  );
}

describe("question preview", () => {
  it("requires an explicit shell locale for a shared assessed prompt", async () => {
    const sharedRoot =
      "packages/corpus/question-bank/tryout/indonesia/snbt/english-language/set-1/question-1";
    const sharedPrompt = `${sharedRoot}/question.en.mdx`;
    const [german, ambiguous] = await Promise.all([
      selectDocument(sharedPrompt, [], "de"),
      Effect.runPromise(
        selectQuestion(
          corpusRoot,
          CorpusSourcePathSchema.make(sharedPrompt)
        ).pipe(
          Effect.provide(Layer.merge(makeQuestionLayer(), Path.layer)),
          Effect.flip
        )
      ),
    ]);

    expect(german.document).toMatchObject({
      identity: { artifactLocale: "en" },
      target: {
        placement: { appLocale: "de", deliveryLanguage: "en" },
      },
    });
    const [germanSource] = german.sources;
    if (germanSource.family !== "question") {
      throw new Error("Expected a question preview source.");
    }
    expect(germanSource.appLocale).toBe("de");
    expect(germanSource.dependencies[0]).toEqual({
      mode: "reload",
      sourcePath: `${sharedRoot}/choices.ts`,
    });
    expect(
      germanSource.dependencies.some(({ sourcePath }) =>
        sourcePath.endsWith("choices.de.ts")
      )
    ).toBe(false);
    expect(ambiguous).toMatchObject({ reason: "locale" });
  });

  it("watches locale-owned choices for an ordinary German prompt", async () => {
    const genericRoot =
      "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
    const genericPrompt = `${genericRoot}/question.de.mdx`;
    const files = [
      ...generalQuestionSourceFiles,
      "answer.de.mdx",
      "choices.de.ts",
      "question.de.mdx",
    ].sort();
    const german = await selectDocument(genericPrompt, [], "de", {
      directories: new Map([[resolve(corpusRoot, genericRoot), files]]),
      sources: new Map([
        [
          resolve(corpusRoot, genericRoot, "choices.de.ts"),
          candidateQuestionChoicesSource,
        ],
      ]),
    });

    expect(german.document).toMatchObject({
      identity: { artifactLocale: "de" },
      target: {
        placement: { appLocale: "de", deliveryLanguage: "de" },
      },
    });
    const [source] = german.sources;
    if (source.family !== "question") {
      throw new Error("Expected a question preview source.");
    }
    expect(source).toMatchObject({ appLocale: "de" });
    expect(source.dependencies.slice(0, 2)).toEqual([
      { mode: "reload", sourcePath: `${genericRoot}/choices.ts` },
      { mode: "reload", sourcePath: `${genericRoot}/choices.de.ts` },
    ]);
  });

  it("reads only the selected directory without recursively scanning the bank", async () => {
    const questionRoot =
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1";
    const directoryReads: QuestionDirectoryRead[] = [];

    await selectDocument(`${questionRoot}/question.en.mdx`, directoryReads);

    expect(directoryReads).toEqual([
      {
        path: `${corpusRoot}/${questionRoot}`,
        recursive: false,
      },
    ]);
  });
});

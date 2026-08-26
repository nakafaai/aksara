import { describe, expect, it } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  type AppLocaleCode,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect, Layer, Path } from "effect";
import { selectQuestion } from "#corpus/preview/question";
import {
  corpusRoot,
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
  return selectQuestion(
    corpusRoot,
    CorpusSourcePathSchema.make(sourcePath),
    appLocale === undefined ? undefined : AppLocaleSchema.make(appLocale)
  ).pipe(
    Effect.provide(
      Layer.merge(makeQuestionLayer(directoryReads, overrides), Path.layer)
    )
  );
}

describe("question preview", () => {
  it.effect(
    "requires an explicit shell locale for a shared assessed prompt",
    () =>
      Effect.gen(function* () {
        const sharedRoot =
          "packages/corpus/question-bank/tryout/indonesia/snbt/english-language/set-1/question-1";
        const sharedPrompt = `${sharedRoot}/question.en.mdx`;
        const [german, ambiguous] = yield* Effect.all([
          selectDocument(sharedPrompt, [], "de"),
          selectQuestion(
            corpusRoot,
            CorpusSourcePathSchema.make(sharedPrompt)
          ).pipe(
            Effect.provide(Layer.merge(makeQuestionLayer(), Path.layer)),
            Effect.flip
          ),
        ]);

        expect(german.document).toMatchObject({
          identity: { artifactLocale: "en" },
          target: {
            placement: { appLocale: "de", deliveryLanguage: "en" },
          },
        });
        const [germanSource] = german.sources;
        expect(germanSource.family).toBe("question");
        if (germanSource.family !== "question") {
          return;
        }
        expect(germanSource.appLocale).toBe("de");
        expect(germanSource.dependencies[0]).toEqual({
          mode: "reload",
          sourcePath: `${sharedRoot}/choices.ts`,
        });
        expect(
          germanSource.dependencies.filter(({ sourcePath }) =>
            sourcePath.endsWith("/choices.ts")
          )
        ).toHaveLength(1);
        expect(ambiguous).toMatchObject({ reason: "locale" });
      })
  );

  it.effect(
    "watches owner-co-located choices for an ordinary German prompt",
    () =>
      Effect.gen(function* () {
        const genericRoot =
          "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
        const genericPrompt = `${genericRoot}/question.de.mdx`;
        const german = yield* selectDocument(genericPrompt, [], "de");

        expect(german.document).toMatchObject({
          identity: { artifactLocale: "de" },
          target: {
            placement: { appLocale: "de", deliveryLanguage: "de" },
          },
        });
        const [source] = german.sources;
        expect(source.family).toBe("question");
        if (source.family !== "question") {
          return;
        }
        expect(source).toMatchObject({ appLocale: "de" });
        expect(source.dependencies[0]).toEqual({
          mode: "reload",
          sourcePath: `${genericRoot}/choices.ts`,
        });
      })
  );

  it.effect(
    "reads only the selected directory without recursively scanning the bank",
    () =>
      Effect.gen(function* () {
        const questionRoot =
          "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1";
        const directoryReads: QuestionDirectoryRead[] = [];

        yield* selectDocument(
          `${questionRoot}/question.en.mdx`,
          directoryReads
        );

        expect(directoryReads).toEqual([
          {
            path: `${corpusRoot}/${questionRoot}`,
            recursive: false,
          },
        ]);
      })
  );
});

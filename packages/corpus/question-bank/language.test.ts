import { expect, layer } from "@effect/vitest";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Effect, Layer, Path } from "effect";

import { decodeQuestionPath } from "#corpus/question-bank/path";
import { readQuestionItem } from "#corpus/question-bank/source";
import {
  corpusRoot,
  makeQuestionSourceLayer,
  realQuestionBanks,
  realQuestionCorpusLayer,
  validQuestionItemSource,
} from "#corpus/test/question";

/** Builds one exact-locale item module for language-policy tests. */
function itemSource(locale: AppLocaleCode) {
  return `import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    ${locale}: { kind: "single-choice", options: [{ isCorrect: true, label: "A" }, { isCorrect: false, label: "B" }] },
  },
};

export default item;`;
}

layer(Layer.merge(realQuestionCorpusLayer, TypeScriptParser.layer))(
  "question source language policy",
  (it) => {
    it.effect("requires exactly the source-owned item locales", () =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        const repositoryRoot = yield* corpusRoot;
        const banks = yield* realQuestionBanks;
        const location = yield* decodeQuestionPath(
          banks,
          "indonesia/snbt/literacy-in-english/set-1/question-1"
        );
        const sourcePath = path.join(
          repositoryRoot,
          location.sourceRoot,
          "item.ts"
        );
        /** Reads the language-section item through the synthetic source adapter. */
        const read = (source: string) =>
          readQuestionItem(repositoryRoot, location).pipe(
            Effect.provide(makeQuestionSourceLayer([], [[sourcePath, source]]))
          );
        const [item, extraLocales, wrongLocale] = yield* Effect.all(
          [
            read(itemSource("en")),
            read(
              validQuestionItemSource.replace(
                "    id:",
                '    en: { kind: "single-choice", options: [{ isCorrect: true, label: "A" }, { isCorrect: false, label: "B" }] },\n    id:'
              )
            ).pipe(Effect.flip),
            read(itemSource("id")).pipe(Effect.flip),
          ],
          { concurrency: "unbounded" }
        );

        expect(item).toEqual({
          responses: {
            en: {
              kind: "single-choice",
              options: [
                {
                  isCorrect: true,
                  label: "A",
                },
                {
                  isCorrect: false,
                  label: "B",
                },
              ],
            },
          },
        });
        expect(extraLocales).toMatchObject({
          _tag: "QuestionItemLocaleError",
          actualLocales: ["en", "id"],
          expectedLocales: ["en"],
        });
        expect(wrongLocale).toMatchObject({
          _tag: "QuestionItemLocaleError",
          actualLocales: ["id"],
          expectedLocales: ["en"],
        });
      })
    );

    it.effect("loads the fixed exam response from one owner source", () =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        const repositoryRoot = yield* corpusRoot;
        const banks = yield* realQuestionBanks;
        const root = "indonesia/snbt/general-reasoning/set-1/question-1";
        const location = yield* decodeQuestionPath(banks, root);
        const basePath = path.join(
          repositoryRoot,
          location.sourceRoot,
          "item.ts"
        );
        const item = yield* readQuestionItem(repositoryRoot, location).pipe(
          Effect.provide(
            makeQuestionSourceLayer([], [[basePath, validQuestionItemSource]])
          )
        );

        expect(item).toMatchObject({
          responses: {
            id: {
              kind: "single-choice",
              options: [
                {
                  isCorrect: true,
                  label: "A",
                },
                {
                  isCorrect: false,
                  label: "B",
                },
              ],
            },
          },
        });
      })
    );
  }
);

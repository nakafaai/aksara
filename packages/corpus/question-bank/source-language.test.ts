import { expect, layer } from "@effect/vitest";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { Effect, Path } from "effect";

import { decodeQuestionPath } from "#corpus/question-bank/path";
import { readQuestionItem } from "#corpus/question-bank/source";
import {
  corpusRoot,
  makeQuestionSourceLayer,
  realQuestionBanks,
  validQuestionItemSource,
} from "#corpus/test/question-layer";

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

layer(Path.layer)("question source language policy", (it) => {
  it.effect("requires exactly the source-owned item locales", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const location = yield* decodeQuestionPath(
        realQuestionBanks,
        "indonesia/snbt/english-language/set-1/question-1"
      );
      const sourcePath = path.join(corpusRoot, location.sourceRoot, "item.ts");
      /** Reads the language-section item through the synthetic source adapter. */
      const read = (source: string) =>
        readQuestionItem(corpusRoot, location).pipe(
          Effect.provide(
            makeQuestionSourceLayer([], new Map([[sourcePath, source]]))
          )
        );
      const [item, extraLocales, wrongLocale] = yield* Effect.all(
        [
          read(itemSource("en")),
          read(validQuestionItemSource).pipe(Effect.flip),
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
        actualLocales: ["en", "id", "de"],
        expectedLocales: ["en"],
      });
      expect(wrongLocale).toMatchObject({
        _tag: "QuestionItemLocaleError",
        actualLocales: ["id"],
        expectedLocales: ["en"],
      });
    })
  );

  it.effect("loads every general-section locale from one owner source", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const root = "indonesia/snbt/general-reasoning/set-1/question-1";
      const location = yield* decodeQuestionPath(realQuestionBanks, root);
      const basePath = path.join(corpusRoot, location.sourceRoot, "item.ts");
      const item = yield* readQuestionItem(corpusRoot, location).pipe(
        Effect.provide(
          makeQuestionSourceLayer(
            [],
            new Map([[basePath, validQuestionItemSource]])
          )
        )
      );

      expect(item).toMatchObject({
        responses: {
          de: {
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
});

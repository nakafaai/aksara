import { expect, layer } from "@effect/vitest";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { Effect, Path } from "effect";
import { decodeQuestionPath } from "#corpus/question-bank/path";
import {
  indexQuestionItems,
  readQuestionItem,
  readQuestionSource,
} from "#corpus/question-bank/source";
import {
  corpusRoot,
  discoverSyntheticQuestionSources,
  generalQuestionSourceFiles,
  invalidQuestionItemSources,
  itemForQuestion,
  makeQuestionSourceLayer,
  questionEntries,
  questionRendererCounts,
  questionTestSourceRoot,
  realQuestionBanks,
  realQuestionEntries,
  realQuestionItems,
  rejectSyntheticQuestionSources,
  validQuestionItemSource,
} from "#corpus/test/question-layer";

layer(Path.layer)("question source", (it) => {
  it.effect(
    "discovers and validates all 840 real question directories",
    () =>
      Effect.gen(function* () {
        const sources = yield* discoverSyntheticQuestionSources(
          realQuestionEntries,
          realQuestionItems
        );
        const itemsByRoot = indexQuestionItems(sources);
        const first = yield* Effect.orDie(Effect.fromNullishOr(sources[0]));

        expect(sources).toHaveLength(840);
        expect(itemsByRoot.size).toBe(840);
        expect(itemsByRoot.get(first.sourceRoot)).toBe(first.item);
        expect(new Set(sources.map(({ setKey }) => setKey)).size).toBe(38);
        for (const { count, rendererDomain } of questionRendererCounts) {
          expect(
            sources.filter((source) => source.rendererDomain === rendererDomain)
          ).toHaveLength(count);
        }
        expect(
          sources.find(({ questionKey }) =>
            questionKey.endsWith(
              "snbt/reading-and-writing-skills/set-1/question-1"
            )
          )
        ).toMatchObject({
          questionKey:
            "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1",
          setKey:
            "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1",
          sourceRoot:
            "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1",
        });
      }),
    30_000
  );

  it.effect("allows an empty checkout without inventing question sources", () =>
    Effect.gen(function* () {
      expect(yield* discoverSyntheticQuestionSources([], new Map())).toEqual(
        []
      );
    })
  );

  it.effect("rejects files outside the canonical question hierarchy", () =>
    Effect.gen(function* () {
      const error = yield* rejectSyntheticQuestionSources(
        ["notes.ts"],
        new Map()
      );

      expect(error).toMatchObject({
        _tag: "QuestionPathError",
        reason: "grammar",
      });
    })
  );

  it.effect("maps directory and item reads to typed failures", () =>
    Effect.gen(function* () {
      const root = "indonesia/snbt/general-reasoning/set-1/question-1";
      const directoryError = yield* rejectSyntheticQuestionSources(
        [],
        new Map(),
        true
      );
      const location = yield* decodeQuestionPath(realQuestionBanks, root);
      const selectedDirectoryError = yield* readQuestionSource(
        corpusRoot,
        location
      ).pipe(
        Effect.provide(makeQuestionSourceLayer([], new Map(), true)),
        Effect.flip
      );
      const itemError = yield* rejectSyntheticQuestionSources(
        questionEntries(root, generalQuestionSourceFiles),
        new Map()
      );

      expect(directoryError).toMatchObject({
        _tag: "QuestionReadError",
        path: questionTestSourceRoot,
      });
      expect(selectedDirectoryError).toMatchObject({
        _tag: "QuestionReadError",
        path: `${questionTestSourceRoot}/${root}`,
      });
      expect(itemError).toMatchObject({
        _tag: "QuestionReadError",
        path: `${questionTestSourceRoot}/${root}/item.ts`,
      });
    })
  );
  it.effect("rejects missing, replaced, and nested companion files", () =>
    Effect.gen(function* () {
      const root = "indonesia/snbt/general-reasoning/set-1/question-1";
      const [missing, replaced, nested, missingGermanPrompt] =
        yield* Effect.all(
          [
            rejectSyntheticQuestionSources(
              questionEntries(root, generalQuestionSourceFiles.slice(1)),
              new Map()
            ),
            rejectSyntheticQuestionSources(
              questionEntries(root, [
                ...generalQuestionSourceFiles.slice(0, 4),
                "wrong.mdx",
              ]),
              new Map()
            ),
            rejectSyntheticQuestionSources(
              questionEntries(root, [
                ...generalQuestionSourceFiles,
                "nested/extra.mdx",
              ]),
              new Map()
            ),
            rejectSyntheticQuestionSources(
              questionEntries(
                root,
                generalQuestionSourceFiles.filter(
                  (file) => file !== "question.de.mdx"
                )
              ),
              new Map()
            ),
          ],
          { concurrency: "unbounded" }
        );

      expect(missing._tag).toBe("QuestionFileSetError");
      expect(replaced._tag).toBe("QuestionFileSetError");
      expect(nested).toMatchObject({
        _tag: "QuestionFileSetError",
        sourcePath: `${questionTestSourceRoot}/${root}`,
      });
      expect(missingGermanPrompt._tag).toBe("QuestionFileSetError");
    })
  );
  it.effect("rejects unevaluable and invalid localized item catalogs", () =>
    Effect.gen(function* () {
      const errors = yield* Effect.forEach(
        invalidQuestionItemSources,
        (source, index) => {
          const root = `indonesia/snbt/general-reasoning/set-1/question-${index + 1}`;
          return rejectSyntheticQuestionSources(
            questionEntries(root, generalQuestionSourceFiles),
            itemForQuestion(root, source)
          );
        },
        { concurrency: "unbounded" }
      );

      expect(errors.every(({ _tag }) => _tag === "QuestionItemError")).toBe(
        true
      );
    })
  );

  it.effect("requires exactly the source-owned item locales", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const location = yield* decodeQuestionPath(
        realQuestionBanks,
        "indonesia/snbt/english-language/set-1/question-1"
      );
      const sourcePath = path.join(corpusRoot, location.sourceRoot, "item.ts");
      /** Builds one exact-locale item module for language-policy tests. */
      const itemSource = (
        locale: AppLocaleCode
      ) => `import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    ${locale}: { kind: "single-choice", options: [{ isCorrect: true, label: "A" }, { isCorrect: false, label: "B" }] },
  },
};

export default item;`;
      const englishOnly = itemSource("en");
      const indonesianOnly = itemSource("id");
      /** Reads the language-section item through the synthetic source adapter. */
      const read = (source: string) =>
        readQuestionItem(corpusRoot, location).pipe(
          Effect.provide(
            makeQuestionSourceLayer([], new Map([[sourcePath, source]]))
          )
        );
      const [item, extraLocales, wrongLocale] = yield* Effect.all(
        [
          read(englishOnly),
          read(validQuestionItemSource).pipe(Effect.flip),
          read(indonesianOnly).pipe(Effect.flip),
        ],
        { concurrency: "unbounded" }
      );

      expect(item).toEqual({
        responses: {
          en: {
            kind: "single-choice",
            options: [
              { isCorrect: true, label: "A" },
              { isCorrect: false, label: "B" },
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
              { isCorrect: true, label: "A" },
              { isCorrect: false, label: "B" },
            ],
          },
        },
      });
    })
  );

  it.effect("rejects non-contiguous numbering within each logical set", () =>
    Effect.gen(function* () {
      const first = "indonesia/snbt/general-reasoning/set-1/question-1";
      const third = "indonesia/snbt/general-reasoning/set-1/question-3";
      const entries = [
        ...questionEntries(first, generalQuestionSourceFiles),
        ...questionEntries(third, generalQuestionSourceFiles),
      ];
      const items = new Map([
        ...itemForQuestion(first),
        ...itemForQuestion(third),
      ]);
      const error = yield* rejectSyntheticQuestionSources(entries, items);

      expect(error).toMatchObject({
        _tag: "QuestionSequenceError",
        questionNumbers: [1, 3],
        setPath: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
      });
    })
  );
});

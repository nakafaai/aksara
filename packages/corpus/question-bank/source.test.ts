import { expect, layer } from "@effect/vitest";
import { Effect, Path } from "effect";
import { decodeQuestionPath } from "#corpus/question-bank/path";
import {
  discoverQuestionSources,
  indexQuestionChoices,
  readQuestionChoices,
  readQuestionSource,
} from "#corpus/question-bank/source";
import {
  choicesForQuestion,
  corpusRoot,
  generalQuestionSourceFiles,
  germanChoiceFixture,
  indonesianChoiceFixture,
  invalidQuestionChoiceSources,
  makeQuestionSourceLayer,
  questionEntries,
  questionRendererCounts,
  questionTestSourceRoot,
  realQuestionBanks,
  realQuestionChoices,
  realQuestionEntries,
  validQuestionChoicesSource,
} from "#corpus/test/question-layer";

/** Discovers synthetic question sources through the Effect test layer. */
function questionSources(
  directoryEntries: readonly string[],
  sourceFiles: ReadonlyMap<string, string>,
  failDirectory = false
) {
  return Effect.provide(
    discoverQuestionSources(corpusRoot, realQuestionBanks),
    makeQuestionSourceLayer(directoryEntries, sourceFiles, failDirectory)
  );
}

/** Flips one typed synthetic discovery failure into the success channel. */
function rejectQuestionSources(
  ...arguments_: Parameters<typeof questionSources>
) {
  return Effect.flip(questionSources(...arguments_));
}

layer(Path.layer)("question source", (it) => {
  it.effect(
    "discovers and validates all 840 real question directories",
    () =>
      Effect.gen(function* () {
        const sources = yield* questionSources(
          realQuestionEntries,
          realQuestionChoices
        );
        const choicesByRoot = indexQuestionChoices(sources);
        const first = yield* Effect.orDie(Effect.fromNullishOr(sources[0]));

        expect(sources).toHaveLength(840);
        expect(choicesByRoot.size).toBe(840);
        expect(choicesByRoot.get(first.sourceRoot)).toBe(first.choices);
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
      expect(yield* questionSources([], new Map())).toEqual([]);
    })
  );

  it.effect("rejects files outside the canonical question hierarchy", () =>
    Effect.gen(function* () {
      const error = yield* rejectQuestionSources(["notes.ts"], new Map());

      expect(error).toMatchObject({
        _tag: "QuestionPathError",
        reason: "grammar",
      });
    })
  );

  it.effect("maps directory and choice reads to typed failures", () =>
    Effect.gen(function* () {
      const root = "indonesia/snbt/general-reasoning/set-1/question-1";
      const directoryError = yield* rejectQuestionSources([], new Map(), true);
      const location = yield* decodeQuestionPath(realQuestionBanks, root);
      const selectedDirectoryError = yield* readQuestionSource(
        corpusRoot,
        location
      ).pipe(
        Effect.provide(makeQuestionSourceLayer([], new Map(), true)),
        Effect.flip
      );
      const choiceError = yield* rejectQuestionSources(
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
      expect(choiceError).toMatchObject({
        _tag: "QuestionReadError",
        path: `${questionTestSourceRoot}/${root}/choices.ts`,
      });
    })
  );
  it.effect("rejects missing, replaced, and nested companion files", () =>
    Effect.gen(function* () {
      const root = "indonesia/snbt/general-reasoning/set-1/question-1";
      const [missing, replaced, nested, missingGermanPrompt] =
        yield* Effect.all(
          [
            rejectQuestionSources(
              questionEntries(root, generalQuestionSourceFiles.slice(1)),
              new Map()
            ),
            rejectQuestionSources(
              questionEntries(root, [
                ...generalQuestionSourceFiles.slice(0, 4),
                "wrong.mdx",
              ]),
              new Map()
            ),
            rejectQuestionSources(
              questionEntries(root, [
                ...generalQuestionSourceFiles,
                "nested/extra.mdx",
              ]),
              new Map()
            ),
            rejectQuestionSources(
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
  it.effect("rejects unevaluable and invalid localized choice catalogs", () =>
    Effect.gen(function* () {
      const errors = yield* Effect.forEach(
        invalidQuestionChoiceSources,
        (source, index) => {
          const root = `indonesia/snbt/general-reasoning/set-1/question-${index + 1}`;
          return rejectQuestionSources(
            questionEntries(root, generalQuestionSourceFiles),
            choicesForQuestion(root, source)
          );
        },
        { concurrency: "unbounded" }
      );

      expect(errors.every(({ _tag }) => _tag === "QuestionChoiceError")).toBe(
        true
      );
    })
  );

  it.effect("requires exactly the section-derived choice locales", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const location = yield* decodeQuestionPath(
        realQuestionBanks,
        "indonesia/snbt/english-language/set-1/question-1"
      );
      const sourcePath = path.join(
        corpusRoot,
        location.sourceRoot,
        "choices.ts"
      );
      const englishOnly = validQuestionChoicesSource
        .replace(indonesianChoiceFixture, "")
        .replace(germanChoiceFixture, "");
      const indonesianOnly = validQuestionChoicesSource
        .replace(
          '\n  en: [{ label: "A", value: true }, { label: "B", value: false }],',
          ""
        )
        .replace(germanChoiceFixture, "");
      /** Reads the language-section choices through the synthetic source adapter. */
      const read = (source: string) =>
        readQuestionChoices(corpusRoot, location).pipe(
          Effect.provide(
            makeQuestionSourceLayer([], new Map([[sourcePath, source]]))
          )
        );
      const [choices, extraLocales, wrongLocale] = yield* Effect.all(
        [
          read(englishOnly),
          read(validQuestionChoicesSource).pipe(Effect.flip),
          read(indonesianOnly).pipe(Effect.flip),
        ],
        { concurrency: "unbounded" }
      );

      expect(choices).toEqual({
        en: [
          { label: "A", value: true },
          { label: "B", value: false },
        ],
      });
      expect(extraLocales).toMatchObject({
        _tag: "QuestionChoiceLocaleError",
        actualLocales: ["en", "id", "de"],
        expectedLocales: ["en"],
      });
      expect(wrongLocale).toMatchObject({
        _tag: "QuestionChoiceLocaleError",
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
      const basePath = path.join(corpusRoot, location.sourceRoot, "choices.ts");
      const choices = yield* readQuestionChoices(corpusRoot, location).pipe(
        Effect.provide(
          makeQuestionSourceLayer(
            [],
            new Map([[basePath, validQuestionChoicesSource]])
          )
        )
      );

      expect(choices).toMatchObject({
        de: [
          { label: "A", value: true },
          { label: "B", value: false },
        ],
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
      const choices = new Map([
        ...choicesForQuestion(first),
        ...choicesForQuestion(third),
      ]);
      const error = yield* rejectQuestionSources(entries, choices);

      expect(error).toMatchObject({
        _tag: "QuestionSequenceError",
        questionNumbers: [1, 3],
        setPath: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
      });
    })
  );
});

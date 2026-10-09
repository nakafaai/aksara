import { expect, layer } from "@effect/vitest";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Array as Arr, Effect, HashSet, MutableHashMap, Option } from "effect";
import { decodeQuestionPath } from "#corpus/question-bank/path";
import {
  indexQuestionItems,
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
  realQuestionCorpusLayer,
  realQuestionEntries,
  realQuestionItems,
  rejectSyntheticQuestionSources,
} from "#corpus/test/question";

layer(realQuestionCorpusLayer)("question source", (it) => {
  it.effect(
    "discovers and validates all 1850 real question directories",
    () =>
      Effect.gen(function* () {
        const sources = yield* discoverSyntheticQuestionSources(
          yield* realQuestionEntries,
          yield* realQuestionItems
        );
        const itemsByRoot = indexQuestionItems(sources);
        const first = yield* Effect.orDie(Effect.fromNullishOr(sources[0]));

        expect(sources).toHaveLength(1850);
        expect(MutableHashMap.size(itemsByRoot)).toBe(1850);
        expect(
          Option.getOrUndefined(
            MutableHashMap.get(itemsByRoot, first.sourceRoot)
          )
        ).toBe(first.item);
        expect(
          HashSet.size(
            HashSet.fromIterable(Arr.map(sources, ({ setKey }) => setKey))
          )
        ).toBe(80);
        for (const { count, rendererDomain } of questionRendererCounts) {
          expect(
            Arr.filter(
              sources,
              (source) => source.rendererDomain === rendererDomain
            )
          ).toHaveLength(count);
        }
        expect(
          Option.getOrUndefined(
            Arr.findFirst(sources, ({ questionKey }) =>
              questionKey.endsWith(
                "snbt/reading-comprehension-and-writing/set-1/question-1"
              )
            )
          )
        ).toMatchObject({
          questionKey:
            "question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1/question-1",
          setKey:
            "question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1",
          sourceRoot:
            "packages/corpus/question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1/question-1",
        });
      }),
    30_000
  );

  it.effect("allows an empty checkout without inventing question sources", () =>
    Effect.gen(function* () {
      expect(yield* discoverSyntheticQuestionSources([], [])).toEqual([]);
    })
  );

  it.effect("rejects files outside the canonical question hierarchy", () =>
    Effect.gen(function* () {
      const error = yield* rejectSyntheticQuestionSources(["notes.ts"], []);

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
        [],
        true
      );
      const location = yield* decodeQuestionPath(
        yield* realQuestionBanks,
        root
      );
      const selectedDirectoryError = yield* readQuestionSource(
        yield* corpusRoot,
        location
      ).pipe(
        Effect.provide([
          makeQuestionSourceLayer([], [], true),
          TypeScriptParser.layer,
        ]),
        Effect.flip
      );
      const itemError = yield* rejectSyntheticQuestionSources(
        questionEntries(root, generalQuestionSourceFiles),
        []
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
      const [missing, replaced, nested, missingAssessedPrompt] =
        yield* Effect.all(
          [
            rejectSyntheticQuestionSources(
              questionEntries(root, generalQuestionSourceFiles.slice(1)),
              []
            ),
            rejectSyntheticQuestionSources(
              questionEntries(root, [
                ...generalQuestionSourceFiles.slice(0, 4),
                "wrong.mdx",
              ]),
              []
            ),
            rejectSyntheticQuestionSources(
              questionEntries(root, [
                ...generalQuestionSourceFiles,
                "nested/extra.mdx",
              ]),
              []
            ),
            rejectSyntheticQuestionSources(
              questionEntries(
                root,
                Arr.filter(
                  generalQuestionSourceFiles,
                  (file) => file !== "question.id.mdx"
                )
              ),
              []
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
      expect(missingAssessedPrompt._tag).toBe("QuestionFileSetError");
    })
  );
  it.effect("rejects unevaluable and invalid localized item catalogs", () =>
    Effect.gen(function* () {
      const errors = yield* Effect.forEach(
        invalidQuestionItemSources,
        (source, index) =>
          Effect.gen(function* () {
            const root = `indonesia/snbt/general-reasoning/set-1/question-${index + 1}`;
            return yield* rejectSyntheticQuestionSources(
              questionEntries(root, generalQuestionSourceFiles),
              yield* itemForQuestion(root, source)
            );
          }),
        { concurrency: "unbounded" }
      );

      expect(
        Arr.every(errors, ({ _tag }) => _tag === "QuestionItemError")
      ).toBe(true);
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
      const items = [
        ...(yield* itemForQuestion(first)),
        ...(yield* itemForQuestion(third)),
      ];
      const error = yield* rejectSyntheticQuestionSources(entries, items);

      expect(error).toMatchObject({
        _tag: "QuestionSequenceError",
        questionNumbers: [1, 3],
        setPath: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
      });
    })
  );
});

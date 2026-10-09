import { expect, layer } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { QuestionKeySchema } from "@nakafa/aksara-contracts/question/identity";
import {
  Array as Arr,
  Effect,
  FileSystem,
  HashSet,
  Option,
  Order,
  Path,
} from "effect";
import {
  loadQuestionContent,
  loadSelectedQuestionContent,
  readQuestionDocument,
  selectQuestionContent,
} from "#corpus/question-bank/content";
import {
  corpusRoot,
  generalQuestionSourceFiles,
  itemForQuestion,
  makeQuestionRegistryLayer,
  makeQuestionSourceLayer,
  questionEntries,
  questionTestSourceRoot,
  realQuestionCorpusLayer,
  realQuestionEntries,
  realQuestionItems,
  realTryoutSources,
} from "#corpus/test/question";

const readingSetKey =
  "question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1";
const readingQuestionKey = `${readingSetKey}/question-1`;
const readingSourceRoot = `packages/corpus/${readingQuestionKey}`;

/** Builds one synthetic question registry Effect without hiding its error type. */
function registry(
  discoveredEntries: readonly string[],
  items: Iterable<readonly [string, string]>
) {
  return Effect.all([corpusRoot, realTryoutSources]).pipe(
    Effect.flatMap(([root, tryoutSources]) =>
      loadQuestionContent(root, tryoutSources)
    ),
    Effect.provide(makeQuestionRegistryLayer(discoveredEntries, items))
  );
}

/** Projects one synthetic question registry without leaving Effect. */
function questionRegistry(
  discoveredEntries: readonly string[],
  items: Iterable<readonly [string, string]>
) {
  return registry(discoveredEntries, items).pipe(
    Effect.map(({ entries }) => entries)
  );
}

/** Returns one typed registry rejection for native Effect composition. */
function rejectRegistry(
  discoveredEntries: readonly string[],
  items: Iterable<readonly [string, string]>
) {
  return questionRegistry(discoveredEntries, items).pipe(Effect.flip);
}

layer(realQuestionCorpusLayer)("question registry", (it) => {
  it.effect(
    "projects every real question and answer body onto its exact path",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const entries = yield* questionRegistry(
          yield* realQuestionEntries,
          yield* realQuestionItems
        );
        const globbed = yield* fileSystem.glob(
          "packages/corpus/question-bank/tryout/indonesia/**/*.mdx",
          { root: yield* corpusRoot }
        );
        const authoredPaths = Arr.sort(
          Arr.filter(globbed, (sourcePath) =>
            Arr.some(ACTIVE_APP_LOCALES, (locale) =>
              sourcePath.endsWith(`.${locale}.mdx`)
            )
          ),
          Order.String
        );
        const projectedPaths = Arr.sort(
          Arr.map(entries, ({ sourcePath }) => sourcePath),
          Order.String
        );

        expect(entries).toHaveLength(7400);
        expect(
          HashSet.size(
            HashSet.fromIterable(
              Arr.map(
                entries,
                ({ artifactLocale, contentKey }) =>
                  `${contentKey}\0${artifactLocale}`
              )
            )
          )
        ).toBe(7400);
        expect(projectedPaths).toEqual(authoredPaths);
        expect(
          Arr.map(
            ["authenticated", "entitled"],
            (delivery) =>
              Arr.filter(entries, (entry) => entry.delivery === delivery).length
          )
        ).toEqual([1850, 5550]);
        expect(
          Arr.map(
            ["en", "id", "de"],
            (locale) =>
              Arr.filter(entries, (entry) => entry.artifactLocale === locale)
                .length
          )
        ).toEqual([2150, 3400, 1850]);
        expect(
          Arr.map(
            ["snbt-general", "snbt-math", "snbt-plain", "snbt-quant", "tka-math"],
            (domain) =>
              Arr.filter(entries, (entry) => entry.rendererDomain === domain)
                .length
          )
        ).toEqual([1200, 800, 4300, 800, 300]);
        expect(
          Arr.some(entries, ({ contentKey }) =>
            contentKey.includes("snbt/general-reasoning/set-10/")
          )
        ).toBe(true);
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "reads each selected question once and preserves every required body",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const observed = {
          ...fileSystem,
          readDirectory: vi.fn(fileSystem.readDirectory),
          readFileString: vi.fn(fileSystem.readFileString),
        };
        const keys = Arr.map(
          [
            readingQuestionKey,
            readingQuestionKey,
            "question-bank/tryout/indonesia/snbt/literacy-in-english/set-1/question-1",
          ],
          (key) => QuestionKeySchema.make(key)
        );
        const { entries, sources } = yield* loadSelectedQuestionContent(
          yield* corpusRoot,
          yield* realTryoutSources,
          keys
        ).pipe(Effect.provideService(FileSystem.FileSystem, observed));
        expect(observed.readDirectory).toHaveBeenCalledTimes(2);
        expect(observed.readFileString).toHaveBeenCalledTimes(2);
        expect(sources).toHaveLength(2);
        expect(entries).toHaveLength(8);
        const question = Option.getOrUndefined(
          Arr.findFirst(
            entries,
            ({ artifactLocale, contentKey }) =>
              contentKey === `${readingQuestionKey}/question` &&
              artifactLocale === "id"
          )
        );
        const answer = Option.getOrUndefined(
          Arr.findFirst(
            entries,
            ({ artifactLocale, contentKey }) =>
              contentKey === `${readingQuestionKey}/answer` &&
              artifactLocale === "id"
          )
        );

        expect(question).toEqual({
          artifactLocale: "id",
          bodyKind: "question",
          contentKey: `${readingQuestionKey}/question`,
          delivery: "authenticated",
          languagePolicy: { kind: "fixed", language: "id" },
          peerContentKey: `${readingQuestionKey}/answer`,
          questionKey: readingQuestionKey,
          questionNumber: 1,
          rendererDomain: "snbt-plain",
          setKey: readingSetKey,
          sourcePath: `${readingSourceRoot}/question.id.mdx`,
          sourceRoot: readingSourceRoot,
        });
        expect(answer).toMatchObject({
          bodyKind: "answer",
          delivery: "entitled",
          peerContentKey: `${readingQuestionKey}/question`,
          sourcePath: `${readingSourceRoot}/answer.id.mdx`,
        });
      }),
    { timeout: 30_000 }
  );

  it.effect.each([
    [
      "packages/corpus/question-bank/tryout/indonesia/snbt/literacy-in-english/set-1/question-1/answer.id.mdx",
      "packages/corpus/question-bank/tryout/indonesia/snbt/literacy-in-english/set-1/question-1/question.en.mdx",
    ],
    [
      "packages/corpus/question-bank/tryout/indonesia/snbt/literacy-in-indonesian/set-1/question-1/answer.en.mdx",
      "packages/corpus/question-bank/tryout/indonesia/snbt/literacy-in-indonesian/set-1/question-1/question.id.mdx",
    ],
  ] as const)("selects each assessed-language prompt", ([answer, prompt]) =>
    Effect.gen(function* () {
      const selected = yield* selectQuestionContent(
        yield* corpusRoot,
        yield* realTryoutSources,
        CorpusSourcePathSchema.make(answer)
      );

      expect(selected.selected.sourcePath).toBe(answer);
      expect(Arr.map(selected.entries, ({ sourcePath }) => sourcePath)).toEqual([
        prompt,
        answer,
      ]);
    })
  );

  it.effect(
    "reads one registry-owned body byte-exactly and types missing reads",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const root = yield* corpusRoot;
        const tryoutSources = yield* realTryoutSources;
        const content = yield* loadQuestionContent(root, tryoutSources);
        const entry = yield* Effect.fromOption(
          Arr.findFirst(
            content.entries,
            ({ bodyKind, sourcePath }) =>
              bodyKind === "question" && sourcePath.endsWith("question.en.mdx")
          )
        );
        const source = yield* Effect.fromOption(
          Arr.findFirst(
            content.sources,
            ({ sourceRoot }) => sourceRoot === entry.sourceRoot
          )
        );
        const path = yield* Path.Path;
        const rawMdx = yield* fileSystem.readFileString(
          path.resolve(root, entry.sourcePath)
        );
        const [document, error] = yield* Effect.all([
          readQuestionDocument(root, entry, source.item),
          readQuestionDocument(root, entry, source.item).pipe(
            Effect.provide([makeQuestionSourceLayer([], []), Path.layer]),
            Effect.flip
          ),
        ]);

        expect(document).toMatchObject({
          rawMdx,
          sourcePath: entry.sourcePath,
        });
        expect(error).toMatchObject({
          _tag: "QuestionReadError",
          path: entry.sourcePath,
        });
      }),
    { timeout: 30_000 }
  );

  it.effect("rejects an oversized physical identity before projection", () =>
    Effect.gen(function* () {
      const root = `indonesia/snbt/general-reasoning/set-${"9".repeat(
        440
      )}/question-1`;
      const error = yield* rejectRegistry(
        questionEntries(root, generalQuestionSourceFiles),
        yield* itemForQuestion(root)
      );

      expect(error).toMatchObject({
        _tag: "QuestionPathError",
        reason: "grammar",
      });
    })
  );

  it.effect("allows an empty checkout without inventing entries", () =>
    Effect.gen(function* () {
      const entries = yield* questionRegistry([], []);
      expect(entries).toEqual([]);
    })
  );

  it.effect(
    "keeps the German explanation with the Indonesian exam prompt",
    () =>
      Effect.gen(function* () {
        const root = "indonesia/snbt/general-reasoning/set-1/question-1";
        const content = yield* registry(
          [
            root,
            ...Arr.map(generalQuestionSourceFiles, (file) => `${root}/${file}`),
          ],
          yield* itemForQuestion(root)
        );

        expect(
          Arr.map(
            Arr.filter(
              content.entries,
              ({ artifactLocale }) => artifactLocale === "de"
            ),
            ({ sourcePath }) => sourcePath
          )
        ).toEqual([`${questionTestSourceRoot}/${root}/answer.de.mdx`]);
      })
  );
});

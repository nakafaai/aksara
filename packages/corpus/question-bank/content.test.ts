import { resolve } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Effect, FileSystem, Path } from "effect";

import {
  loadQuestionContent,
  readQuestionDocument,
  selectQuestionContent,
} from "#corpus/question-bank/content";
import {
  absoluteQuestionTestSourceRoot,
  corpusRoot,
  generalQuestionSourceFiles,
  makeQuestionSourceLayer,
  questionTestSourceRoot,
  realQuestionEntries,
  realQuestionItems,
  realTryoutSources,
  validQuestionItemSource,
} from "#corpus/test/question-layer";

const readingSetKey =
  "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1";
const readingQuestionKey = `${readingSetKey}/question-1`;
const readingSourceRoot = `packages/corpus/${readingQuestionKey}`;

/** Creates recursive directory output for synthetic question directories. */
function questionEntries(...roots: readonly string[]) {
  return roots.flatMap((root) => [
    root,
    ...generalQuestionSourceFiles.map((file) => `${root}/${file}`),
  ]);
}

/** Creates localized item sources for synthetic question directories. */
function itemsFor(...roots: readonly string[]) {
  return new Map(
    roots.map((root) => [
      resolve(absoluteQuestionTestSourceRoot, root, "item.ts"),
      validQuestionItemSource,
    ])
  );
}

/** Builds one synthetic question registry Effect without hiding its error type. */
function registry(
  discoveredEntries: readonly string[],
  items: ReadonlyMap<string, string>
) {
  return loadQuestionContent(corpusRoot, realTryoutSources).pipe(
    Effect.provide([
      makeQuestionSourceLayer(discoveredEntries, items),
      Path.layer,
    ])
  );
}

/** Projects one synthetic question registry without leaving Effect. */
function questionRegistry(
  discoveredEntries: readonly string[],
  items: ReadonlyMap<string, string>
) {
  return registry(discoveredEntries, items).pipe(
    Effect.map(({ entries }) => entries)
  );
}

/** Returns one typed registry rejection for native Effect composition. */
function rejectRegistry(
  discoveredEntries: readonly string[],
  items: ReadonlyMap<string, string>
) {
  return questionRegistry(discoveredEntries, items).pipe(Effect.flip);
}

layer(NodeServices.layer)("question registry", (it) => {
  it.effect(
    "projects every real question and answer body onto its exact path",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const entries = yield* questionRegistry(
          realQuestionEntries,
          realQuestionItems
        );
        const authoredPaths = (yield* fileSystem.glob(
          "packages/corpus/question-bank/tryout/indonesia/**/*.mdx",
          { root: corpusRoot }
        ))
          .filter((sourcePath) =>
            ACTIVE_APP_LOCALES.some((locale) =>
              sourcePath.endsWith(`.${locale}.mdx`)
            )
          )
          .sort();
        const projectedPaths = entries
          .map(({ sourcePath }) => sourcePath)
          .sort();

        expect(entries).toHaveLength(9650);
        expect(
          new Set(
            entries.map(
              ({ artifactLocale, contentKey }) =>
                `${contentKey}\0${artifactLocale}`
            )
          ).size
        ).toBe(9650);
        expect(projectedPaths).toEqual(authoredPaths);
        expect(
          ["authenticated", "entitled"].map(
            (delivery) =>
              entries.filter((entry) => entry.delivery === delivery).length
          )
        ).toEqual([4175, 5475]);
        expect(
          ["en", "id", "de"].map(
            (locale) =>
              entries.filter((entry) => entry.artifactLocale === locale).length
          )
        ).toEqual([3275, 3375, 3000]);
        expect(
          [
            "snbt-general",
            "snbt-math",
            "snbt-plain",
            "snbt-quant",
            "tka-math",
          ].map(
            (domain) =>
              entries.filter((entry) => entry.rendererDomain === domain).length
          )
        ).toEqual([1800, 1200, 5000, 1200, 450]);
        expect(
          entries.some(({ contentKey }) =>
            contentKey.includes("snbt/general-reasoning/set-10/")
          )
        ).toBe(true);
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "preserves one exact source-owned section directory",
    () =>
      Effect.gen(function* () {
        const entries = yield* questionRegistry(
          realQuestionEntries,
          realQuestionItems
        );
        const question = entries.find(
          ({ artifactLocale, contentKey }) =>
            contentKey === `${readingQuestionKey}/question` &&
            artifactLocale === "en"
        );
        const answer = entries.find(
          ({ artifactLocale, contentKey }) =>
            contentKey === `${readingQuestionKey}/answer` &&
            artifactLocale === "id"
        );

        expect(question).toEqual({
          artifactLocale: "en",
          bodyKind: "question",
          contentKey: `${readingQuestionKey}/question`,
          delivery: "authenticated",
          languagePolicy: { kind: "app-locale" },
          peerContentKey: `${readingQuestionKey}/answer`,
          questionKey: readingQuestionKey,
          questionNumber: 1,
          rendererDomain: "snbt-plain",
          setKey: readingSetKey,
          sourcePath: `${readingSourceRoot}/question.en.mdx`,
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
      "packages/corpus/question-bank/tryout/indonesia/snbt/english-language/set-1/question-1/answer.id.mdx",
      "packages/corpus/question-bank/tryout/indonesia/snbt/english-language/set-1/question-1/question.en.mdx",
    ],
    [
      "packages/corpus/question-bank/tryout/indonesia/snbt/indonesian-language/set-1/question-1/answer.en.mdx",
      "packages/corpus/question-bank/tryout/indonesia/snbt/indonesian-language/set-1/question-1/question.id.mdx",
    ],
  ] as const)("selects each assessed-language prompt", ([answer, prompt]) =>
    Effect.gen(function* () {
      const selected = yield* selectQuestionContent(
        corpusRoot,
        realTryoutSources,
        CorpusSourcePathSchema.make(answer)
      );

      expect(selected.selected.sourcePath).toBe(answer);
      expect(selected.entries.map(({ sourcePath }) => sourcePath)).toEqual([
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
        const content = yield* loadQuestionContent(
          corpusRoot,
          realTryoutSources
        );
        const entry = yield* Effect.fromNullishOr(
          content.entries.find(
            ({ bodyKind, sourcePath }) =>
              bodyKind === "question" && sourcePath.endsWith("question.en.mdx")
          )
        );
        const source = yield* Effect.fromNullishOr(
          content.sources.find(
            ({ sourceRoot }) => sourceRoot === entry.sourceRoot
          )
        );
        const rawMdx = yield* fileSystem.readFileString(
          resolve(corpusRoot, entry.sourcePath)
        );
        const [document, error] = yield* Effect.all([
          readQuestionDocument(corpusRoot, entry, source.item),
          readQuestionDocument(corpusRoot, entry, source.item).pipe(
            Effect.provide([
              makeQuestionSourceLayer([], new Map()),
              Path.layer,
            ]),
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
        questionEntries(root),
        itemsFor(root)
      );

      expect(error).toMatchObject({
        _tag: "QuestionPathError",
        reason: "grammar",
      });
    })
  );

  it.effect("allows an empty checkout without inventing entries", () =>
    Effect.gen(function* () {
      const entries = yield* questionRegistry([], new Map());
      expect(entries).toEqual([]);
    })
  );

  it.effect("projects the complete active German question pair", () =>
    Effect.gen(function* () {
      const root = "indonesia/snbt/general-reasoning/set-1/question-1";
      const content = yield* registry(
        [root, ...generalQuestionSourceFiles.map((file) => `${root}/${file}`)],
        itemsFor(root)
      );

      expect(
        content.entries
          .filter(({ artifactLocale }) => artifactLocale === "de")
          .map(({ sourcePath }) => sourcePath)
      ).toEqual([
        `${questionTestSourceRoot}/${root}/answer.de.mdx`,
        `${questionTestSourceRoot}/${root}/question.de.mdx`,
      ]);
    })
  );
});

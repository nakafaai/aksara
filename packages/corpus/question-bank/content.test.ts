import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  loadQuestionContent,
  selectQuestionContent,
} from "#corpus/question-bank/content";
import { questionSourceFiles } from "#corpus/question-bank/path";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");
const sourceRoot = "packages/corpus/question-bank/tryout";
const absoluteSourceRoot = resolve(corpusRoot, sourceRoot);
const tryoutSources = await Effect.runPromise(decodeTryoutRegistry());
const realEntries = globSync("**/*", { cwd: absoluteSourceRoot });
const realChoices = new Map(
  globSync("**/choices.ts", { cwd: absoluteSourceRoot }).map((sourcePath) => {
    const absolutePath = resolve(absoluteSourceRoot, sourcePath);
    return [absolutePath, readFileSync(absolutePath, "utf8")] as const;
  })
);
const validChoices = `import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [{ label: "A", value: true }],
  id: [{ label: "A", value: true }],
};

export default choices;`;
const genericQuestionSourceFiles = questionSourceFiles(
  TryoutKeySchema.make("general-reasoning")
);

/** Creates recursive directory output for synthetic question directories. */
function questionEntries(...roots: readonly string[]) {
  return roots.flatMap((root) => [
    root,
    ...genericQuestionSourceFiles.map((file) => `${root}/${file}`),
  ]);
}

/** Creates strict source reads for synthetic or real question trees. */
function fileLayer(
  entries: readonly string[],
  choices: ReadonlyMap<string, string>
) {
  return FileSystem.layerNoop({
    readDirectory: () => Effect.succeed([...entries]),
    readFileString: (path) => {
      const source = choices.get(path);
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(
        new PlatformError.SystemError({
          method: "readFileString",
          module: "FileSystem",
          pathOrDescriptor: path,
          reason: "NotFound",
        })
      );
    },
  });
}

/** Creates localized choice sources for synthetic question directories. */
function choicesFor(...roots: readonly string[]) {
  return new Map(
    roots.map((root) => [
      resolve(absoluteSourceRoot, root, "choices.ts"),
      validChoices,
    ])
  );
}

/** Provides discovery services at the Vitest runner boundary. */
function runRegistry(
  discoveredEntries: readonly string[],
  choices: ReadonlyMap<string, string>
) {
  return Effect.runPromise(
    loadQuestionContent(corpusRoot, tryoutSources).pipe(
      Effect.map(({ entries }) => entries),
      Effect.provide([fileLayer(discoveredEntries, choices), Path.layer])
    )
  );
}

/** Returns one typed registry rejection at the Vitest runner boundary. */
function rejectRegistry(
  discoveredEntries: readonly string[],
  choices: ReadonlyMap<string, string>
) {
  return Effect.runPromise(
    loadQuestionContent(corpusRoot, tryoutSources).pipe(
      Effect.map(({ entries }) => entries),
      Effect.provide([fileLayer(discoveredEntries, choices), Path.layer]),
      Effect.flip
    )
  );
}

describe("question registry", () => {
  it("projects every real question and answer body onto its exact path", {
    timeout: 30_000,
  }, async () => {
    const entries = await runRegistry(realEntries, realChoices);
    const authoredPaths = globSync(
      "packages/corpus/question-bank/tryout/indonesia/**/*.mdx",
      { cwd: corpusRoot }
    ).sort();
    const projectedPaths = entries.map(({ sourcePath }) => sourcePath).sort();

    expect(entries).toHaveLength(3260);
    expect(
      new Set(
        entries.map(
          ({ artifactLocale, contentKey }) => `${contentKey}\0${artifactLocale}`
        )
      ).size
    ).toBe(3260);
    expect(projectedPaths).toEqual(authoredPaths);
    expect(
      entries.filter(({ delivery }) => delivery === "authenticated")
    ).toHaveLength(1580);
    expect(
      entries.filter(({ delivery }) => delivery === "entitled")
    ).toHaveLength(1680);
    expect(
      entries.filter(({ artifactLocale }) => artifactLocale === "en")
    ).toHaveLength(1620);
    expect(
      entries.filter(({ artifactLocale }) => artifactLocale === "id")
    ).toHaveLength(1640);
    expect(
      entries.filter(({ rendererDomain }) => rendererDomain === "snbt-general")
    ).toHaveLength(800);
    expect(
      entries.filter(({ rendererDomain }) => rendererDomain === "snbt-math")
    ).toHaveLength(560);
    expect(
      entries.filter(({ rendererDomain }) => rendererDomain === "snbt-plain")
    ).toHaveLength(620);
    expect(
      entries.filter(({ rendererDomain }) => rendererDomain === "snbt-quant")
    ).toHaveLength(800);
    expect(
      entries.filter(({ rendererDomain }) => rendererDomain === "tka-math")
    ).toHaveLength(480);
    expect(
      entries.some(({ contentKey }) =>
        contentKey.includes("snbt/general-reasoning/set-10/")
      )
    ).toBe(true);
  });

  it("preserves one exact source-owned section directory", {
    timeout: 30_000,
  }, async () => {
    const entries = await runRegistry(realEntries, realChoices);
    const question = entries.find(
      ({ artifactLocale, contentKey }) =>
        contentKey ===
          "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/question" &&
        artifactLocale === "en"
    );
    const answer = entries.find(
      ({ artifactLocale, contentKey }) =>
        contentKey ===
          "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/answer" &&
        artifactLocale === "id"
    );

    expect(question).toEqual({
      artifactLocale: "en",
      bodyKind: "question",
      contentKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/question",
      delivery: "authenticated",
      peerContentKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/answer",
      questionKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1",
      questionNumber: 1,
      rendererDomain: "snbt-plain",
      setKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1",
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/question.en.mdx",
      sourceRoot:
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1",
    });
    expect(answer).toMatchObject({
      bodyKind: "answer",
      delivery: "entitled",
      peerContentKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/question",
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/answer.id.mdx",
    });
  });

  it("selects assessed-language prompts by delivery language for answer preview", async () => {
    const cases = [
      {
        answer:
          "packages/corpus/question-bank/tryout/indonesia/snbt/english-language/set-1/question-1/answer.id.mdx",
        prompt:
          "packages/corpus/question-bank/tryout/indonesia/snbt/english-language/set-1/question-1/question.en.mdx",
      },
      {
        answer:
          "packages/corpus/question-bank/tryout/indonesia/snbt/indonesian-language/set-1/question-1/answer.en.mdx",
        prompt:
          "packages/corpus/question-bank/tryout/indonesia/snbt/indonesian-language/set-1/question-1/question.id.mdx",
      },
    ] as const;

    const selectedCases = await Promise.all(
      cases.map((testCase) =>
        Effect.runPromise(
          selectQuestionContent(
            corpusRoot,
            tryoutSources,
            CorpusSourcePathSchema.make(testCase.answer)
          ).pipe(Effect.provide(NodeContext.layer))
        ).then((selected) => ({ selected, testCase }))
      )
    );

    for (const { selected, testCase } of selectedCases) {
      expect(selected.selected.sourcePath).toBe(testCase.answer);
      expect(selected.entries.map(({ sourcePath }) => sourcePath)).toEqual([
        testCase.prompt,
        testCase.answer,
      ]);
    }
  });

  it("rejects an oversized physical question identity before projection", async () => {
    const root = `indonesia/snbt/general-reasoning/set-${"9".repeat(
      440
    )}/question-1`;
    const error = await rejectRegistry(questionEntries(root), choicesFor(root));

    expect(error).toMatchObject({
      _tag: "QuestionPathError",
      reason: "grammar",
    });
  });

  it("allows an empty checkout without inventing entries", async () => {
    await expect(runRegistry([], new Map())).resolves.toEqual([]);
  });
});

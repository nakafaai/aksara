import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Path } from "effect";
import {
  loadQuestionContent,
  readQuestionDocument,
  selectQuestionContent,
} from "#corpus/question-bank/content";
import {
  absoluteQuestionTestSourceRoot,
  candidateQuestionChoicesSource,
  corpusRoot,
  generalQuestionSourceFiles,
  makeQuestionSourceLayer,
  questionTestSourceRoot,
  realQuestionChoices,
  realQuestionEntries,
  realTryoutSources,
  validQuestionChoicesSource,
} from "#corpus/test/question-layer";

/** Creates recursive directory output for synthetic question directories. */
function questionEntries(...roots: readonly string[]) {
  return roots.flatMap((root) => [
    root,
    ...generalQuestionSourceFiles.map((file) => `${root}/${file}`),
  ]);
}

/** Creates localized choice sources for synthetic question directories. */
function choicesFor(...roots: readonly string[]) {
  return new Map(
    roots.map((root) => [
      resolve(absoluteQuestionTestSourceRoot, root, "choices.ts"),
      validQuestionChoicesSource,
    ])
  );
}

/** Builds one synthetic question registry Effect without hiding its error type. */
function registry(
  discoveredEntries: readonly string[],
  choices: ReadonlyMap<string, string>
) {
  return loadQuestionContent(corpusRoot, realTryoutSources).pipe(
    Effect.provide([
      makeQuestionSourceLayer(discoveredEntries, choices),
      Path.layer,
    ])
  );
}

/** Provides discovery services at the Vitest runner boundary. */
function runRegistry(
  discoveredEntries: readonly string[],
  choices: ReadonlyMap<string, string>
) {
  return Effect.runPromise(
    registry(discoveredEntries, choices).pipe(
      Effect.map(({ entries }) => entries)
    )
  );
}

/** Returns one typed registry rejection at the Vitest runner boundary. */
function rejectRegistry(
  discoveredEntries: readonly string[],
  choices: ReadonlyMap<string, string>
) {
  return Effect.runPromise(
    registry(discoveredEntries, choices).pipe(
      Effect.map(({ entries }) => entries),
      Effect.flip
    )
  );
}

describe("question registry", () => {
  it("projects every real question and answer body onto its exact path", {
    timeout: 30_000,
  }, async () => {
    const entries = await runRegistry(realQuestionEntries, realQuestionChoices);
    const authoredPaths = globSync(
      "packages/corpus/question-bank/tryout/indonesia/**/*.mdx",
      { cwd: corpusRoot }
    )
      .filter((sourcePath) =>
        ACTIVE_APP_LOCALES.some((locale) =>
          sourcePath.endsWith(`.${locale}.mdx`)
        )
      )
      .sort();
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
    const entries = await runRegistry(realQuestionEntries, realQuestionChoices);
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
            realTryoutSources,
            CorpusSourcePathSchema.make(testCase.answer)
          ).pipe(Effect.provide(NodeServices.layer))
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

  it("reads one registry-owned body byte-exactly and types missing reads", {
    timeout: 30_000,
  }, async () => {
    const content = await Effect.runPromise(
      loadQuestionContent(corpusRoot, realTryoutSources).pipe(
        Effect.provide(NodeServices.layer)
      )
    );
    const entry = content.entries.find(
      ({ bodyKind, sourcePath }) =>
        bodyKind === "question" && sourcePath.endsWith("question.en.mdx")
    );
    const source = content.sources.find(
      ({ sourceRoot: candidateRoot }) => candidateRoot === entry?.sourceRoot
    );
    if (!(entry && source)) {
      throw new Error("Expected one registry-owned question body.");
    }
    const rawMdx = readFileSync(resolve(corpusRoot, entry.sourcePath), "utf8");
    const document = await Effect.runPromise(
      readQuestionDocument(corpusRoot, entry, source.choices).pipe(
        Effect.provide(NodeServices.layer)
      )
    );
    const error = await Effect.runPromise(
      readQuestionDocument(corpusRoot, entry, source.choices).pipe(
        Effect.provide([makeQuestionSourceLayer([], new Map()), Path.layer]),
        Effect.flip
      )
    );

    expect(document).toMatchObject({ rawMdx, sourcePath: entry.sourcePath });
    expect(error).toMatchObject({
      _tag: "QuestionReadError",
      path: entry.sourcePath,
    });
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

  it("projects only the German candidate bodies that are physically present", async () => {
    const root = "indonesia/snbt/general-reasoning/set-1/question-1";
    const files = [
      ...generalQuestionSourceFiles,
      "choices.de.ts",
      "question.de.mdx",
    ];
    const choices = choicesFor(root);
    choices.set(
      resolve(absoluteQuestionTestSourceRoot, root, "choices.de.ts"),
      candidateQuestionChoicesSource
    );
    const content = await Effect.runPromise(
      registry([root, ...files.map((file) => `${root}/${file}`)], choices)
    );

    expect(
      content.candidateEntries.map(({ sourcePath }) => sourcePath)
    ).toEqual([`${questionTestSourceRoot}/${root}/question.de.mdx`]);
  });
});

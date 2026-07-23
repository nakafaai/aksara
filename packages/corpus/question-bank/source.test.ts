import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { QuestionEntrySchema } from "#corpus/question-bank/registry";
import {
  discoverQuestionSources,
  readQuestionDocument,
} from "#corpus/question-bank/source";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");
const sourceRoot = "packages/corpus/question-bank/tryout/indonesia";
const absoluteSourceRoot = resolve(corpusRoot, sourceRoot);
const realEntries = globSync("**/*", { cwd: absoluteSourceRoot });
const realChoices = new Map(
  globSync("**/choices.ts", { cwd: absoluteSourceRoot }).map((sourcePath) => {
    const absolutePath = resolve(absoluteSourceRoot, sourcePath);
    return [absolutePath, readFileSync(absolutePath, "utf8")] as const;
  })
);
const requiredFiles = [
  "answer.en.mdx",
  "answer.id.mdx",
  "choices.ts",
  "question.en.mdx",
  "question.id.mdx",
];
const validChoices = `import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [{ label: "A", value: true }, { label: "B", value: false }],
  id: [{ label: "A", value: false }, { label: "B", value: true }],
};

export default choices;`;

/** Creates recursive directory output for one synthetic question directory. */
function questionEntries(root: string, files = requiredFiles) {
  return [root, ...files.map((file) => `${root}/${file}`)];
}

/** Creates one deterministic Effect Platform filesystem test layer. */
function fileLayer(
  entries: readonly string[],
  sources: ReadonlyMap<string, string>,
  failDirectory = false
) {
  return FileSystem.layerNoop({
    readDirectory: (path) => {
      if (!failDirectory) {
        return Effect.succeed([...entries]);
      }
      return Effect.fail(systemError("readDirectory", path));
    },
    readFileString: (path) => {
      const source = sources.get(path);
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(systemError("readFileString", path));
    },
  });
}

/** Creates a stable missing-file failure for the filesystem adapter. */
function systemError(method: "readDirectory" | "readFileString", path: string) {
  return new PlatformError.SystemError({
    method,
    module: "FileSystem",
    pathOrDescriptor: path,
    reason: "NotFound",
  });
}

/** Provides the filesystem and path services at the Vitest boundary. */
function runSources(
  entries: readonly string[],
  sources: ReadonlyMap<string, string>
) {
  return Effect.runPromise(
    discoverQuestionSources(corpusRoot).pipe(
      Effect.provide(fileLayer(entries, sources)),
      Effect.provide(Path.layer)
    )
  );
}

/** Returns one typed discovery failure at the Vitest boundary. */
function rejectSources(
  entries: readonly string[],
  sources: ReadonlyMap<string, string>,
  failDirectory = false
) {
  return Effect.runPromise(
    discoverQuestionSources(corpusRoot).pipe(
      Effect.provide(fileLayer(entries, sources, failDirectory)),
      Effect.provide(Path.layer),
      Effect.flip
    )
  );
}

/** Maps a physical synthetic question root to its absolute choices source. */
function choicesFor(root: string, source = validChoices) {
  return new Map([[resolve(absoluteSourceRoot, root, "choices.ts"), source]]);
}

describe("question source", () => {
  it("discovers and validates all 840 real question directories", {
    timeout: 30_000,
  }, async () => {
    const sources = await runSources(realEntries, realChoices);

    expect(sources).toHaveLength(840);
    expect(new Set(sources.map(({ setKey }) => setKey)).size).toBe(38);
    expect(
      sources.filter(({ rendererDomain }) => rendererDomain === "snbt-general")
    ).toHaveLength(200);
    expect(
      sources.filter(({ rendererDomain }) => rendererDomain === "snbt-math")
    ).toHaveLength(140);
    expect(
      sources.filter(({ rendererDomain }) => rendererDomain === "snbt-plain")
    ).toHaveLength(180);
    expect(
      sources.filter(({ rendererDomain }) => rendererDomain === "snbt-quant")
    ).toHaveLength(200);
    expect(
      sources.filter(({ rendererDomain }) => rendererDomain === "tka-math")
    ).toHaveLength(120);
    expect(
      sources.find(({ questionKey }) =>
        questionKey.endsWith("snbt/reading-and-writing-skills/set-1/question-1")
      )
    ).toMatchObject({
      questionKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1",
      setKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1",
      sourceRoot:
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and/writing-skills/set-1/question-1",
    });
  });

  it("allows an empty checkout without inventing question sources", async () => {
    const root = "snbt/future-skill/set-1/question-1";

    await expect(runSources([], new Map())).resolves.toEqual([]);
    await expect(
      runSources(questionEntries(root), choicesFor(root))
    ).resolves.toMatchObject([{ rendererDomain: "snbt-plain" }]);
  });

  it("maps directory and choice reads to typed failures", async () => {
    const root = "snbt/general-reasoning/set-1/question-1";
    const directoryError = await rejectSources([], new Map(), true);
    const choiceError = await rejectSources(questionEntries(root), new Map());

    expect(directoryError).toMatchObject({
      _tag: "QuestionReadError",
      path: sourceRoot,
    });
    expect(choiceError).toMatchObject({
      _tag: "QuestionReadError",
      path: `${sourceRoot}/${root}/choices.ts`,
    });
  });

  it("rejects missing, replaced, and nested companion files", async () => {
    const root = "snbt/general-reasoning/set-1/question-1";
    const missing = await rejectSources(
      questionEntries(root, requiredFiles.slice(1)),
      new Map()
    );
    const replaced = await rejectSources(
      questionEntries(root, [...requiredFiles.slice(0, 4), "wrong.mdx"]),
      new Map()
    );
    const nested = await rejectSources(
      questionEntries(root, [...requiredFiles, "nested/extra.mdx"]),
      new Map()
    );

    expect(missing._tag).toBe("QuestionFileSetError");
    expect(replaced._tag).toBe("QuestionFileSetError");
    expect(nested).toMatchObject({
      _tag: "QuestionFileSetError",
      sourcePath: `${sourceRoot}/${root}`,
    });
  });

  it("rejects malformed and unsupported physical identities", async () => {
    const malformed = "snbt/general-reasoning/set-1/question-x";
    const unsupported = "tka/english/set-1/question-1";
    const overlong = `snbt/general-reasoning/set-${"9".repeat(600)}/question-1`;
    const errors = await Promise.all(
      [malformed, unsupported, overlong].map((root) =>
        rejectSources(questionEntries(root), choicesFor(root))
      )
    );
    const orphan = await rejectSources(["notes.ts"], new Map());

    expect([...errors, orphan].map(({ _tag }) => _tag)).toEqual([
      "QuestionPathError",
      "QuestionPathError",
      "QuestionPathError",
      "QuestionPathError",
    ]);
  });

  it("rejects unevaluable and invalid localized choice catalogs", async () => {
    const roots = [
      "snbt/general-reasoning/set-1/question-1",
      "snbt/general-reasoning/set-1/question-2",
      "snbt/general-reasoning/set-1/question-3",
    ];
    const invalidSources = [
      "export default choices;",
      "const choices = { broken: };",
      `const choices = {
        en: [{ label: "A", value: false }],
        id: [{ label: "A", value: true }],
      };`,
    ];
    const errors = await Promise.all(
      roots.map((root, index) =>
        rejectSources(
          questionEntries(root),
          choicesFor(root, invalidSources[index])
        )
      )
    );

    expect(errors.every(({ _tag }) => _tag === "QuestionChoiceError")).toBe(
      true
    );
  });

  it("rejects non-contiguous numbering within each logical set", async () => {
    const first = "snbt/general-reasoning/set-1/question-1";
    const third = "snbt/general-reasoning/set-1/question-3";
    const entries = [...questionEntries(first), ...questionEntries(third)];
    const choices = new Map([...choicesFor(first), ...choicesFor(third)]);
    const error = await rejectSources(entries, choices);

    expect(error).toMatchObject({
      _tag: "QuestionSequenceError",
      questionNumbers: [1, 3],
      setPath: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
    });
  });

  it("reads a registry-owned body byte-exactly and types missing reads", async () => {
    const sourcePath =
      "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question.en.mdx";
    const entry = Schema.decodeUnknownSync(QuestionEntrySchema)({
      bodyKind: "question",
      choices: {
        en: [{ label: "A", value: true }],
        id: [{ label: "A", value: true }],
      },
      contentKey:
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
      delivery: "authenticated",
      locale: "en",
      peerContentKey:
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/answer",
      questionKey:
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1",
      questionNumber: 1,
      rendererDomain: "snbt-general",
      setKey: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
      sourcePath,
    });
    const rawMdx = readFileSync(resolve(corpusRoot, sourcePath), "utf8");
    /** Reads the same registry row through a supplied source map. */
    const read = (sources: ReadonlyMap<string, string>) =>
      readQuestionDocument(corpusRoot, entry).pipe(
        Effect.provide(fileLayer([], sources)),
        Effect.provide(Path.layer)
      );
    const document = await Effect.runPromise(
      read(new Map([[resolve(corpusRoot, sourcePath), rawMdx]]))
    );
    const error = await Effect.runPromise(read(new Map()).pipe(Effect.flip));

    expect(document).toEqual({ ...entry, rawMdx });
    expect(error).toMatchObject({
      _tag: "QuestionReadError",
      path: sourcePath,
    });
  });
});

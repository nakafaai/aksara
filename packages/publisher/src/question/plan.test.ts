import { resolve } from "node:path";
import { QuestionHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Schema } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  checkoutRoot,
  collectQuestionPublication,
  publishedQuestionHeads,
  questionEntries,
  sourceByPath,
} from "#test/question";

const compilerState = vi.hoisted(() => ({ calls: 0 }));

vi.mock("@nakafa/aksara-compiler/compile", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@nakafa/aksara-compiler/compile")>();
  return {
    ...original,
    compileContent: (input: unknown) => {
      compilerState.calls += 1;
      return original.compileContent(input);
    },
  };
});

const publishedHeads = await publishedQuestionHeads();
const englishEntry = questionEntries.find(
  ({ bodyKind, locale }) => bodyKind === "question" && locale === "en"
);
if (englishEntry === undefined) {
  throw new Error("Expected the real English question.");
}
const selectedEnglishHead = publishedHeads.find(
  ({ contentKey, locale }) =>
    contentKey === englishEntry.contentKey && locale === "en"
);
if (selectedEnglishHead === undefined) {
  throw new Error("Expected the published English question.");
}
const englishHead = selectedEnglishHead;
const fingerprintCases = [
  ["compiler config", { compilerConfigHash: `sha256:${"1".repeat(64)}` }],
  ["projection", { projectionHash: `sha256:${"2".repeat(64)}` }],
  ["source", { sourceHash: `sha256:${"3".repeat(64)}` }],
] as const;

/** Decodes a modified question head without bypassing the wire contract. */
function modifyHead(input: unknown) {
  return Schema.decodeUnknownSync(QuestionHeadSchema)(input, {
    onExcessProperty: "error",
  });
}

/** Replaces one canonical head while preserving complete catalog order. */
function replaceHead(replacement: typeof englishHead) {
  return publishedHeads.map((head) =>
    head.contentKey === replacement.contentKey &&
    head.locale === replacement.locale
      ? replacement
      : head
  );
}

beforeEach(() => {
  compilerState.calls = 0;
});

describe("question plan", () => {
  it("emits no records and performs no compilation for matching heads", async () => {
    const records = await collectQuestionPublication({ heads: publishedHeads });

    expect(records).toEqual([]);
    expect(compilerState.calls).toBe(0);
  });

  it("compiles only the real question body whose source changed", async () => {
    const sources = new Map(sourceByPath);
    const absolutePath = resolve(checkoutRoot, englishEntry.sourcePath);
    const english = sources.get(absolutePath);
    expect(english).toBeDefined();
    sources.set(absolutePath, `${english}\n`);

    const records = await collectQuestionPublication({
      heads: publishedHeads,
      sources,
    });

    expect(records).toHaveLength(1);
    expect(records[0]?.record.change).toMatchObject({
      delivery: "authenticated",
      family: "question",
      locale: "en",
      operation: "upsert",
    });
    expect(compilerState.calls).toBe(1);
  });

  it.each(fingerprintCases)(
    "compiles only a head whose %s fingerprint changed",
    async (_field, changed) => {
      const head = modifyHead({ ...englishHead, ...changed });
      const records = await collectQuestionPublication({
        heads: replaceHead(head),
      });

      expect(records).toHaveLength(1);
      expect(compilerState.calls).toBe(1);
    }
  );

  it("emits one tombstone without compiling an absent source", async () => {
    const stale = modifyHead({
      ...englishHead,
      contentKey:
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-99/question",
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-99/question.en.mdx",
    });
    const records = await collectQuestionPublication({
      heads: [...publishedHeads, stale],
    });

    expect(records).toContainEqual({
      prior: { head: stale, state: "question" },
      record: {
        change: {
          contentKey: stale.contentKey,
          family: "question",
          locale: "en",
          operation: "delete",
        },
      },
    });
    expect(compilerState.calls).toBe(0);
  });

  it("compiles all four canonical bodies for the first release", async () => {
    const records = await collectQuestionPublication({ heads: [] });

    expect(records).toHaveLength(4);
    expect(
      records.every(({ record }) => record.change.operation === "upsert")
    ).toBe(true);
    expect(compilerState.calls).toBe(4);
  });
});

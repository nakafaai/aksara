import { describe, expect, it } from "@effect/vitest";
import { Exit, Option, Schema } from "effect";
import {
  readBankEntry,
  SetPathSchema,
  setPath,
  setSourcePath,
} from "#corpus/question-bank/path";

const set = "test-country/test-exam/test-section/test-set";

describe("question bank path", () => {
  it("builds a set path and the repository path of its files", () => {
    const path = setPath({
      countryKey: "test-country",
      examKey: "test-exam",
      sectionKey: "test-section",
      setKey: "test-set",
    });

    expect(path).toBe(set);
    expect(setSourcePath(path, "question-1", "item.ts")).toBe(
      `packages/corpus/question-bank/tryout/${set}/question-1/item.ts`
    );
  });

  it("accepts only four lower kebab keys as a set", () => {
    for (const candidate of [
      "test-country/test-exam/test-set",
      "test-country/test-exam/test-section/test-set/extra",
      "test-country/Test-exam/test-section/test-set",
    ]) {
      expect(Exit.isFailure(Schema.decodeExit(SetPathSchema)(candidate))).toBe(
        true
      );
    }
  });

  it("reads the files of a question and the documents of a reading", () => {
    expect(readBankEntry(`${set}/question-12/item.ts`)).toEqual(
      Option.some({ file: "item.ts", kind: "question", number: 12, set })
    );
    expect(readBankEntry(`${set}/question-1/answer.de.mdx`)).toEqual(
      Option.some({ file: "answer.de.mdx", kind: "question", number: 1, set })
    );
    expect(readBankEntry(`${set}/passage-1/stimulus.id.mdx`)).toEqual(
      Option.some({
        file: "stimulus.id.mdx",
        key: "passage-1",
        kind: "stimulus",
        set,
      })
    );
  });

  it("reads any other path as no part of the bank", () => {
    for (const path of [
      set,
      `${set}/question-1`,
      `${set}/question-1/notes.md`,
      `${set}/question-0/item.ts`,
      `${set}/question-1/stimulus.id.mdx`,
      `${set}/passage-1/question.id.mdx`,
      `${set}/Passage/stimulus.id.mdx`,
      `${set}/question-1/item.ts/extra`,
      "Test/test-exam/test-section/test-set/question-1/item.ts",
    ]) {
      expect(readBankEntry(path)).toEqual(Option.none());
    }
  });
});

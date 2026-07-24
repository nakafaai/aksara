import { describe, expect, it } from "vitest";
import { pathViolations } from "#scripts/check-paths";

describe("path policy", () => {
  it("rejects alternate toolchains, JavaScript, and long semantic names", () => {
    expect(
      pathViolations([
        ".npmrc",
        "src/legacy.jsx",
        "packages/compiler/three-word-policy.ts",
        "packages/compiler/HTTPClientPolicy.ts",
      ])
    ).toEqual([
      ".npmrc: pnpm and package.json own the toolchain contract",
      "src/legacy.jsx: hand-written JavaScript source is not allowed",
      "packages/compiler/three-word-policy.ts: three-word-policy.ts",
      "packages/compiler/HTTPClientPolicy.ts: HTTPClientPolicy.ts",
    ]);
  });

  it("allows semantic suffixes, numbers, and educational folders", () => {
    expect(
      pathViolations([
        "",
        "packages/compiler/policy.config.test.ts",
        "packages/compiler/release-2026-state.ts",
        "packages/corpus/material/lesson/very-long-source-slug/en.mdx",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/answer.id.mdx",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/choices.ts",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/question.en.mdx",
      ])
    ).toEqual([]);
  });

  it("still validates non-source paths inside educational folders", () => {
    expect(
      pathViolations([
        "packages/corpus/material/lesson/very-long-source-slug/three-word-file.mdx",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/three-word-file.ts",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-x/question-1/choices.ts",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-x/choices.ts",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/notes.ts",
        "packages/corpus/question-bank/tryout/malaysia/snbt/reading-and-writing-skills/set-1/question-1/choices.ts",
        "packages/corpus/question-bank/three-word-folder/choices.ts",
        "packages/corpus/question-bank/tryout/helpers/three-word-folder/file.ts",
        "packages/corpus/question-bank/tryout/helpers/foo/three-word-folder/file.ts",
      ])
    ).toEqual([
      "packages/corpus/material/lesson/very-long-source-slug/three-word-file.mdx: three-word-file.mdx",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/three-word-file.ts: reading-and-writing-skills",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/three-word-file.ts: three-word-file.ts",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-x/question-1/choices.ts: reading-and-writing-skills",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-x/choices.ts: reading-and-writing-skills",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/notes.ts: reading-and-writing-skills",
      "packages/corpus/question-bank/tryout/malaysia/snbt/reading-and-writing-skills/set-1/question-1/choices.ts: reading-and-writing-skills",
      "packages/corpus/question-bank/three-word-folder/choices.ts: three-word-folder",
      "packages/corpus/question-bank/tryout/helpers/three-word-folder/file.ts: three-word-folder",
      "packages/corpus/question-bank/tryout/helpers/foo/three-word-folder/file.ts: three-word-folder",
    ]);
  });
});

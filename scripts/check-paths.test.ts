import { describe, expect, it } from "@effect/vitest";
import { pathViolations } from "#scripts/check-paths";

describe("path policy", () => {
  it("rejects alternate toolchains, JavaScript, and long semantic names", () => {
    expect(
      pathViolations([
        ".npmrc",
        "src/legacy.jsx",
        "src/legacy.cjsx",
        "src/legacy.mjsx",
        "packages/compiler/three-word-policy.ts",
        "packages/compiler/HTTPClientPolicy.ts",
      ])
    ).toEqual([
      ".npmrc: pnpm and package.json own the toolchain contract",
      "src/legacy.jsx: hand-written JavaScript source is not allowed",
      "src/legacy.cjsx: hand-written JavaScript source is not allowed",
      "src/legacy.mjsx: hand-written JavaScript source is not allowed",
      "packages/compiler/three-word-policy.ts: three-word-policy.ts",
      "packages/compiler/HTTPClientPolicy.ts: HTTPClientPolicy.ts",
    ]);
  });

  it("allows semantic suffixes, numbers, and educational folders", () => {
    expect(
      pathViolations([
        "",
        "packages/compiler/policy.config.ts",
        "packages/compiler/policy.config.test.ts",
        "packages/compiler/release-2026-state.ts",
        "packages/corpus/material/lesson/very-long-source-slug/en.mdx",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/answer.id.mdx",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/item.ts",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/question.en.mdx",
        "packages/corpus/question-bank/tryout/germany/abitur/reading-and-writing-skills/foundation-set/question-1/item.ts",
        "packages/corpus/question-bank/tryout/germany/abitur/reading-and-writing-skills/foundation-set/question-1/question.en.mdx",
        "packages/corpus/question-bank/tryout/united-arab-emirates/national-school-leaving-exam/reading-and-writing-skills/foundation-set/question-1/item.ts",
        "packages/corpus/question-bank/tryout/malaysia/snbt/reading-and-writing-skills/set-1/question-1/item.ts",
      ])
    ).toEqual([]);
  });

  it("rejects orphan and every non-final Vitest test suffix", () => {
    expect(
      pathViolations([
        "packages/compiler/orphan.test.ts",
        "packages/compiler/view.ts",
        "packages/compiler/view.test.tsx",
        "packages/compiler/worker.spec.ts",
        "packages/compiler/runtime.test.mts",
        "packages/compiler/server.spec.cts",
      ])
    ).toEqual([
      "packages/compiler/orphan.test.ts: final test has no colocated packages/compiler/orphan.ts owner",
      "packages/compiler/view.test.tsx: final tests must use .test.ts",
      "packages/compiler/worker.spec.ts: final tests must use .test.ts",
      "packages/compiler/runtime.test.mts: final tests must use .test.ts",
      "packages/compiler/server.spec.cts: final tests must use .test.ts",
    ]);
  });

  it("still validates source names and folders outside educational roots", () => {
    expect(
      pathViolations([
        "packages/corpus/material/lesson/very-long-source-slug/three-word-file.mdx",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/three-word-source.mdx",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/three-word-file.ts",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-x/item.ts",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/notes.ts",
        "packages/corpus/question-bank/tryout/helpers/three-word-folder/file.ts",
        "packages/corpus/question-bank/tryout/helpers/foo/three-word-folder/file.ts",
        "packages/corpus/question-bank/three-word-folder/item.ts",
      ])
    ).toEqual([
      "packages/corpus/material/lesson/very-long-source-slug/three-word-file.mdx: three-word-file.mdx",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/three-word-source.mdx: reading-and-writing-skills",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/three-word-source.mdx: three-word-source.mdx",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/three-word-file.ts: reading-and-writing-skills",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/three-word-file.ts: three-word-file.ts",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-x/item.ts: reading-and-writing-skills",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/notes.ts: reading-and-writing-skills",
      "packages/corpus/question-bank/tryout/helpers/three-word-folder/file.ts: three-word-folder",
      "packages/corpus/question-bank/tryout/helpers/foo/three-word-folder/file.ts: three-word-folder",
      "packages/corpus/question-bank/three-word-folder/item.ts: three-word-folder",
    ]);
  });
});

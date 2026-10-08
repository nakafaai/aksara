import { afterEach, describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { pathReport, pathViolations } from "#scripts/check/paths";

const originalExitCode = process.exitCode;

afterEach(() => {
  process.exitCode = originalExitCode;
  vi.restoreAllMocks();
});

describe("path policy", () => {
  it("rejects alternate toolchains, JavaScript, and multi-word names", () => {
    expect(
      pathViolations([
        ".npmrc",
        "src/legacy.jsx",
        "src/legacy.cjsx",
        "src/legacy.mjsx",
        "packages/compiler/source-policy.ts",
        "packages/compiler/sourcePolicy.ts",
        "packages/compiler/HTTPClient.ts",
        "packages/release-notes/plan.ts",
      ])
    ).toEqual([
      ".npmrc: pnpm and package.json own the toolchain contract",
      "src/legacy.jsx: hand-written JavaScript source is not allowed",
      "src/legacy.cjsx: hand-written JavaScript source is not allowed",
      "src/legacy.mjsx: hand-written JavaScript source is not allowed",
      "packages/compiler/source-policy.ts: source-policy.ts must be one word",
      "packages/compiler/sourcePolicy.ts: sourcePolicy.ts must be one word",
      "packages/compiler/HTTPClient.ts: HTTPClient.ts must be one word",
      "packages/release-notes/plan.ts: release-notes must be one word",
    ]);
  });

  it("allows role suffixes, any extension, numbers, and conventional names", () => {
    expect(
      pathViolations([
        "",
        ".gitattributes",
        ".github/CODE_OF_CONDUCT.md",
        "CONTENT_LICENSE.md",
        "THIRD_PARTY.md",
        "pnpm-lock.yaml",
        "pnpm-workspace.yaml",
        "tsconfig.build.json",
        "packages/compiler/policy.config.ts",
        "packages/compiler/policy.config.test.ts",
        "packages/compiler/types.d.ts",
        "packages/compiler/release-2026.ts",
        "packages/corpus/quran/sources/german/edition.pdf",
        "packages/corpus/quran/sources/tanzil/text.txt",
      ])
    ).toEqual([]);
  });

  it("allows content and skill identities", () => {
    expect(
      pathViolations([
        ".agents/skills/nakafa-content/SKILL.md",
        ".claude/skills/nakafa-content",
        "packages/corpus/articles/politics/dynastic-politics/asian-values/en.mdx",
        "packages/corpus/curriculum/cambridge-international/igcse/subjects.ts",
        "packages/corpus/material/lesson/very-long-source-slug/en.mdx",
        "packages/corpus/pages/privacy-policy/en.mdx",
        "packages/corpus/question-bank/reader.ts",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1/question-1/answer.id.mdx",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1/question-1/item.ts",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1/question-1/question.en.mdx",
        "packages/corpus/question-bank/tryout/germany/abitur/reading-comprehension-and-writing/foundation-set/question-1/item.ts",
        "packages/corpus/question-bank/tryout/united-arab-emirates/national-school-leaving-exam/reading-comprehension-and-writing/foundation-set/question-1/item.ts",
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

  it("still validates files in content roots and names beside identities", () => {
    expect(
      pathViolations([
        ".agents/skills/nakafa-content/references/question-bank.md",
        "docs/THIRD_PARTY.md",
        "packages/compiler/pnpm-workspace.yaml",
        "packages/corpus/articles/source-map.ts",
        "packages/corpus/material/lesson/very-long-source-slug/worked-example.mdx",
        "packages/corpus/quran/sources/german/edition-notes.pdf",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1/question-1/three-word-source.mdx",
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1/question-x/item.ts",
        "packages/corpus/question-bank/tryout/helpers/two-words/file.ts",
        "packages/corpus/question-bank/two-words/item.ts",
      ])
    ).toEqual([
      ".agents/skills/nakafa-content/references/question-bank.md: question-bank.md must be one word",
      "docs/THIRD_PARTY.md: THIRD_PARTY.md must be one word",
      "packages/compiler/pnpm-workspace.yaml: pnpm-workspace.yaml must be one word",
      "packages/corpus/articles/source-map.ts: source-map.ts must be one word",
      "packages/corpus/material/lesson/very-long-source-slug/worked-example.mdx: worked-example.mdx must be one word",
      "packages/corpus/quran/sources/german/edition-notes.pdf: edition-notes.pdf must be one word",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1/question-1/three-word-source.mdx: reading-comprehension-and-writing must be one word",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1/question-1/three-word-source.mdx: three-word-source.mdx must be one word",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1/question-x/item.ts: reading-comprehension-and-writing must be one word",
      "packages/corpus/question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1/question-x/item.ts: question-x must be one word",
      "packages/corpus/question-bank/tryout/helpers/two-words/file.ts: two-words must be one word",
      "packages/corpus/question-bank/two-words/item.ts: two-words must be one word",
    ]);
  });

  it.effect("reports every violation through the path report", () =>
    Effect.gen(function* () {
      const write = vi
        .spyOn(process.stderr, "write")
        .mockImplementation(() => true);

      yield* pathReport(["src/legacy.jsx", "src/ok.ts"]);

      expect(write).toHaveBeenCalledWith(
        "Repository path policy violations:\nsrc/legacy.jsx: hand-written JavaScript source is not allowed\n"
      );
      expect(process.exitCode).toBe(1);
    })
  );
});

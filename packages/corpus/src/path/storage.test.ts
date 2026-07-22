import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  mapCorpusStoragePaths,
  toCorpusStoragePath,
} from "#corpus/path/storage";

/** Runs one successful storage mapping at the Vitest boundary. */
function mapPath(sourcePath: string) {
  return Effect.runPromise(toCorpusStoragePath(sourcePath));
}

/** Returns one typed storage mapping failure at the Vitest boundary. */
function rejectPath(sourcePath: string) {
  return Effect.runPromise(toCorpusStoragePath(sourcePath).pipe(Effect.flip));
}

describe("corpus storage paths", () => {
  it.each([
    [
      "packages/contents/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx",
      "packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/en.mdx",
    ],
    [
      "packages/contents/material/lesson/chemistry/basic-chemistry-laws/chemical-reaction-characteristics/en.mdx",
      "packages/corpus/material/lesson/chemistry/basic-chemistry_/laws/chemical-reaction_/characteristics/en.mdx",
    ],
    [
      "packages/contents/articles/politics/pork-barrel-politics-power/en.mdx",
      "packages/corpus/articles/politics/pork-barrel_/politics-power/en.mdx",
    ],
    [
      "packages/contents/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/answer.id.mdx",
      "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/answer.id.mdx",
    ],
    [
      "packages/contents/articles/test/long-source-file-name.ts",
      "packages/corpus/articles/test/long-source_/file-name.ts",
    ],
    [
      "packages/contents/material/lesson/computer/python-step-1/en.mdx",
      "packages/corpus/material/lesson/computer/python-step-1/en.mdx",
    ],
    [
      "packages/contents/articles/test/alpha-1-beta-gamma/en.mdx",
      "packages/corpus/articles/test/alpha-1-beta_/gamma/en.mdx",
    ],
  ] as const)("maps %s without changing identity", async (source, target) => {
    await expect(mapPath(source)).resolves.toBe(target);
  });

  it("maps an empty source set without inventing entries", async () => {
    await expect(Effect.runPromise(mapCorpusStoragePaths([]))).resolves.toEqual(
      []
    );
  });

  it("maps one unique source without entering collision handling", async () => {
    const sourcePath = "packages/contents/articles/test/en.mdx";
    await expect(
      Effect.runPromise(mapCorpusStoragePaths([sourcePath]))
    ).resolves.toEqual([
      {
        sourcePath,
        targetPath: "packages/corpus/articles/test/en.mdx",
      },
    ]);
  });

  it.each([
    ["packages/corpus/articles/test/en.mdx", "legacy-root"],
    ["packages/contents", "missing-file"],
    ["packages/contents/articles/test", "missing-file"],
    ["packages/contents/articles/../test/en.mdx", "unsafe-segment"],
    ["packages/contents/articles/test_name/en.mdx", "unsafe-segment"],
    ["packages/contents/articles/Test/en.mdx", "unsafe-segment"],
    ["packages/contents/articles/test/en", "missing-file"],
    ["packages/contents/articles/test/en.MDX", "unsafe-segment"],
  ] as const)("rejects %s as %s", async (sourcePath, reason) => {
    await expect(rejectPath(sourcePath)).resolves.toMatchObject({
      _tag: "CorpusStoragePathError",
      reason,
      sourcePath,
    });
  });

  it("rejects targets outside the bounded source-path contract", async () => {
    const sourcePath = `packages/contents/${Array.from(
      { length: 700 },
      () => "long-segment"
    ).join("/")}/en.mdx`;
    await expect(rejectPath(sourcePath)).resolves.toMatchObject({
      _tag: "CorpusStoragePathError",
      reason: "target-contract",
    });
  });

  it("keeps formerly colliding directory shapes physically distinct", async () => {
    const sources = [
      "packages/contents/articles/test/foo-bar-baz/en.mdx",
      "packages/contents/articles/test/foo-bar/baz/en.mdx",
    ];
    await expect(
      Effect.runPromise(mapCorpusStoragePaths(sources))
    ).resolves.toEqual([
      {
        sourcePath: sources[0],
        targetPath: "packages/corpus/articles/test/foo-bar_/baz/en.mdx",
      },
      {
        sourcePath: sources[1],
        targetPath: "packages/corpus/articles/test/foo-bar/baz/en.mdx",
      },
    ]);
  });

  it("keeps intermediate directory ownership distinct", async () => {
    const sources = [
      "packages/contents/articles/test/foo-bar-baz/one/en.mdx",
      "packages/contents/articles/test/foo-bar/baz/two/id.mdx",
    ];
    await expect(
      Effect.runPromise(mapCorpusStoragePaths(sources))
    ).resolves.toEqual([
      {
        sourcePath: sources[0],
        targetPath: "packages/corpus/articles/test/foo-bar_/baz/one/en.mdx",
      },
      {
        sourcePath: sources[1],
        targetPath: "packages/corpus/articles/test/foo-bar/baz/two/id.mdx",
      },
    ]);
  });

  it("shares continuation directories between sibling split files", async () => {
    const sources = [
      "packages/contents/articles/test/foo-bar-baz.ts",
      "packages/contents/articles/test/foo-bar-qux.ts",
    ];
    await expect(
      Effect.runPromise(mapCorpusStoragePaths(sources))
    ).resolves.toEqual([
      {
        sourcePath: sources[0],
        targetPath: "packages/corpus/articles/test/foo-bar_/baz.ts",
      },
      {
        sourcePath: sources[1],
        targetPath: "packages/corpus/articles/test/foo-bar_/qux.ts",
      },
    ]);
  });

  it("shares every continuation directory between deeper split files", async () => {
    const sources = [
      "packages/contents/articles/test/foo-bar-baz-qux-one.ts",
      "packages/contents/articles/test/foo-bar-baz-qux-two.ts",
    ];
    await expect(
      Effect.runPromise(mapCorpusStoragePaths(sources))
    ).resolves.toEqual([
      {
        sourcePath: sources[0],
        targetPath: "packages/corpus/articles/test/foo-bar_/baz-qux_/one.ts",
      },
      {
        sourcePath: sources[1],
        targetPath: "packages/corpus/articles/test/foo-bar_/baz-qux_/two.ts",
      },
    ]);
  });

  it("shares a continuation directory between file and directory splits", async () => {
    const sources = [
      "packages/contents/articles/test/foo-bar-baz.ts",
      "packages/contents/articles/test/foo-bar-qux/en.mdx",
    ];
    await expect(
      Effect.runPromise(mapCorpusStoragePaths(sources))
    ).resolves.toEqual([
      {
        sourcePath: sources[0],
        targetPath: "packages/corpus/articles/test/foo-bar_/baz.ts",
      },
      {
        sourcePath: sources[1],
        targetPath: "packages/corpus/articles/test/foo-bar_/qux/en.mdx",
      },
    ]);
  });
});

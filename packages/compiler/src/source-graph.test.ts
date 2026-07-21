import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  MAX_CORPUS_SOURCE_PATH_BYTES,
  planSourceGraphChanges,
} from "./source-graph.js";

const HASH_A = `sha256:${"a".repeat(64)}`;
const HASH_B = `sha256:${"b".repeat(64)}`;

function node(
  path: string,
  dependencies: readonly string[] = [],
  sourceHash = HASH_A
) {
  return { dependencies, path, sourceHash };
}

function plan(previous: unknown, current: unknown) {
  return Effect.runPromise(planSourceGraphChanges(previous, current));
}

function reject(previous: unknown, current: unknown) {
  return Effect.runPromise(
    planSourceGraphChanges(previous, current).pipe(Effect.flip)
  );
}

describe("planSourceGraphChanges", () => {
  it("selects the complete transitive reverse-dependent closure", async () => {
    const previous = [
      node("lessons/base.mdx"),
      node("lessons/middle.mdx", ["lessons/base.mdx"]),
      node("lessons/page.mdx", ["lessons/middle.mdx"]),
      node("lessons/unchanged.mdx"),
    ];
    const current = [
      node("lessons/base.mdx", [], HASH_B),
      node("lessons/middle.mdx", ["lessons/base.mdx"]),
      node("lessons/page.mdx", ["lessons/middle.mdx"]),
      node("lessons/unchanged.mdx"),
    ];

    await expect(plan(previous, current)).resolves.toEqual({
      compilePaths: [
        "lessons/base.mdx",
        "lessons/middle.mdx",
        "lessons/page.mdx",
      ],
      deletedPaths: [],
    });
  });

  it("treats a dependency-list-only delta as a changed source", async () => {
    const previous = [
      node("base.mdx"),
      node("consumer.mdx"),
      node("page.mdx", ["consumer.mdx"]),
    ];
    const current = [
      node("base.mdx"),
      node("consumer.mdx", ["base.mdx"]),
      node("page.mdx", ["consumer.mdx"]),
    ];

    await expect(plan(previous, current)).resolves.toEqual({
      compilePaths: ["consumer.mdx", "page.mdx"],
      deletedPaths: [],
    });
  });

  it("reports deletion without compiling unchanged sources", async () => {
    const previous = [node("kept.mdx"), node("removed.mdx")];
    const current = [node("kept.mdx")];

    await expect(plan(previous, current)).resolves.toEqual({
      compilePaths: [],
      deletedPaths: ["removed.mdx"],
    });
  });

  it("models a rename only as an exact delete plus add", async () => {
    const previous = [node("old-name.mdx")];
    const current = [node("new-name.mdx")];

    await expect(plan(previous, current)).resolves.toEqual({
      compilePaths: ["new-name.mdx"],
      deletedPaths: ["old-name.mdx"],
    });
  });

  it("rejects a missing internal dependency", async () => {
    const error = await reject([], [node("page.mdx", ["missing.mdx"])]);

    expect(error).toMatchObject({
      _tag: "MissingSourceDependencyError",
      dependency: "missing.mdx",
      graph: "current",
      path: "page.mdx",
    });
  });

  it("rejects dependency cycles deterministically", async () => {
    const error = await reject(
      [],
      [
        node("b.mdx", ["a.mdx"]),
        node("a.mdx", ["b.mdx"]),
        node("c.mdx", ["b.mdx"]),
      ]
    );

    expect(error).toMatchObject({
      _tag: "SourceDependencyCycleError",
      blockedPaths: ["a.mdx", "b.mdx", "c.mdx"],
      graph: "current",
    });
  });

  it("rejects duplicate source paths", async () => {
    const error = await reject(
      [],
      [node("duplicate.mdx"), node("duplicate.mdx")]
    );

    expect(error).toMatchObject({
      _tag: "DuplicateSourcePathError",
      count: 2,
      graph: "current",
      path: "duplicate.mdx",
    });
  });

  it.each([
    [["z.mdx", "a.mdx"]],
    [["a.mdx", "a.mdx"]],
  ])("rejects a non-canonical dependency list %j", async (dependencies) => {
    const error = await reject(
      [],
      [node("a.mdx"), node("z.mdx"), node("page.mdx", dependencies)]
    );

    expect(error).toMatchObject({
      _tag: "NonCanonicalSourceDependenciesError",
      dependencies,
      graph: "current",
      path: "page.mdx",
    });
  });

  it.each([
    "",
    "/root.mdx",
    "a\\b.mdx",
    "a//b.mdx",
    "./a.mdx",
    "a/../b.mdx",
    "line\nbreak.mdx",
    "tab\tname.mdx",
    `delete${String.fromCharCode(0x7f)}control.mdx`,
    `${"a".repeat(MAX_CORPUS_SOURCE_PATH_BYTES - 3)}.mdx`,
    `${"é".repeat(MAX_CORPUS_SOURCE_PATH_BYTES / 2)}.mdx`,
  ])("rejects non-canonical corpus path %j", async (path) => {
    const error = await reject([], [node(path)]);

    expect(error).toMatchObject({
      _tag: "SourceGraphContractError",
      graph: "current",
    });
  });

  it("accepts a source path at the exact UTF-8 byte ceiling", async () => {
    const path = `${"a".repeat(MAX_CORPUS_SOURCE_PATH_BYTES - 4)}.mdx`;
    const result = await plan([], [node(path)]);

    expect(result.compilePaths).toEqual([path]);
  });

  it("is independent of graph input order and sorts every output", async () => {
    const previous = [node("z.mdx"), node("a.mdx"), node("deleted.mdx")];
    const current = [
      node("z.mdx", [], HASH_B),
      node("middle.mdx"),
      node("a.mdx", [], HASH_B),
    ];
    const first = await plan(previous, current);
    const second = await plan([...previous].reverse(), [
      current[1],
      current[2],
      current[0],
    ]);

    expect(first).toEqual({
      compilePaths: ["a.mdx", "middle.mdx", "z.mdx"],
      deletedPaths: ["deleted.mdx"],
    });
    expect(second).toEqual(first);
  });
});

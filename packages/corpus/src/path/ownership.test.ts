import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  type CorpusStorageNode,
  validateStorageOwnership,
} from "#corpus/path/ownership";

/** Builds one unmistakably test-only physical ownership node. */
function node(
  sourcePath: string,
  targetPath: string,
  kind: CorpusStorageNode["kind"] = "directory",
  ownerKey = sourcePath
): CorpusStorageNode {
  return { kind, ownerKey, sourcePath, targetPath };
}

/** Returns one typed ownership collision at the Vitest boundary. */
function reject(nodes: readonly CorpusStorageNode[]) {
  return Effect.runPromise(validateStorageOwnership(nodes).pipe(Effect.flip));
}

describe("corpus storage ownership", () => {
  it("accepts distinct nodes and repeated shared continuation ownership", async () => {
    await expect(
      Effect.runPromise(
        validateStorageOwnership([
          node("source/a", "packages/corpus/a"),
          node("source/b", "packages/corpus/b"),
          node(
            "source/c",
            "packages/corpus/shared_",
            "directory",
            "continuation:packages/corpus/shared_"
          ),
          node(
            "source/d",
            "packages/corpus/shared_",
            "directory",
            "continuation:packages/corpus/shared_"
          ),
        ])
      )
    ).resolves.toBeUndefined();
  });

  it.each([
    {
      kinds: ["directory", "directory"],
      nodes: [
        node("source/a", "packages/corpus/collision"),
        node("source/b", "packages/corpus/collision"),
      ],
      targetPath: "packages/corpus/collision",
    },
    {
      kinds: ["directory", "directory"],
      nodes: [
        node("source/a", "packages/corpus/CaseFold"),
        node("source/b", "packages/corpus/casefold"),
      ],
      targetPath: "packages/corpus/casefold",
    },
    {
      kinds: ["directory", "file"],
      nodes: [
        node("source/a", "packages/corpus/body", "directory", "same-owner"),
        node("source/a", "packages/corpus/body", "file", "same-owner"),
      ],
      targetPath: "packages/corpus/body",
    },
  ] as const)(
    "rejects case-folded $kinds ownership at $targetPath",
    async ({ kinds, nodes, targetPath }) => {
      const error = await reject(nodes);
      expect(error).toMatchObject({
        _tag: "CorpusStorageCollisionError",
        nodeKinds: kinds,
        targetPath,
      });
    }
  );
});

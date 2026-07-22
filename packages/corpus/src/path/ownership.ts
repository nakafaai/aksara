import { Effect, Schema } from "effect";

/** One physical directory or file and the legacy source node that owns it. */
export interface CorpusStorageNode {
  readonly kind: "directory" | "file";
  readonly ownerKey: string;
  readonly sourcePath: string;
  readonly targetPath: string;
}

/** Distinct source nodes claim one case-folded physical corpus path. */
export class CorpusStorageCollisionError extends Schema.TaggedError<CorpusStorageCollisionError>()(
  "CorpusStorageCollisionError",
  {
    nodeKinds: Schema.Array(Schema.Literal("directory", "file")).pipe(
      Schema.minItems(2)
    ),
    sourcePaths: Schema.Array(Schema.String).pipe(Schema.minItems(2)),
    targetPath: Schema.NonEmptyTrimmedString,
  }
) {}

/** Rejects directory, file, and case-folded ownership collisions. */
export const validateStorageOwnership = Effect.fn(
  "AksaraCorpus.validateStorageOwnership"
)(function* (nodes: readonly CorpusStorageNode[]) {
  const nodeByTarget = new Map<string, CorpusStorageNode>();
  for (const node of nodes) {
    const targetPath = node.targetPath.toLowerCase();
    const existing = nodeByTarget.get(targetPath);
    if (
      existing &&
      (existing.ownerKey !== node.ownerKey || existing.kind !== node.kind)
    ) {
      return yield* new CorpusStorageCollisionError({
        nodeKinds: [existing.kind, node.kind],
        sourcePaths: [existing.sourcePath, node.sourcePath],
        targetPath,
      });
    }
    nodeByTarget.set(targetPath, node);
  }
});

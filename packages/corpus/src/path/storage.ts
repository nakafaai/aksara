import type { CorpusSourcePath } from "@nakafa/aksara-contracts/ids";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";
import {
  type CorpusStorageNode,
  validateStorageOwnership,
} from "#corpus/path/ownership";

const LEGACY_ROOT = "packages/contents";
const STORAGE_ROOT = "packages/corpus";
const SEGMENT_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const NUMERIC_WORD_PATTERN = /^\d+$/u;

/** One legacy path cannot be represented by the canonical corpus layout. */
export class CorpusStoragePathError extends Schema.TaggedError<CorpusStoragePathError>()(
  "CorpusStoragePathError",
  {
    reason: Schema.Literal(
      "legacy-root",
      "missing-file",
      "target-contract",
      "unsafe-segment"
    ),
    sourcePath: Schema.String,
  }
) {}

/** One deterministic legacy-to-corpus physical path mapping. */
export interface CorpusStorageMapping {
  readonly sourcePath: string;
  readonly targetPath: CorpusSourcePath;
}

interface PreparedStorageMapping {
  readonly mapping: CorpusStorageMapping;
  readonly nodes: readonly CorpusStorageNode[];
}

/**
 * Splits only identities above two semantic words and marks every continuation
 * chunk with `_`, which accepted legacy segments can never contain.
 */
function splitIdentity(segment: string, sourcePath: string) {
  if (!SEGMENT_PATTERN.test(segment)) {
    return Effect.fail(
      new CorpusStoragePathError({
        reason: "unsafe-segment",
        sourcePath,
      })
    );
  }
  const words = segment.split("-");
  const semanticCount = words.filter(
    (word) => !NUMERIC_WORD_PATTERN.test(word)
  ).length;
  if (semanticCount <= 2) {
    return Effect.succeed([segment]);
  }
  const groups: string[] = [];
  let group: string[] = [];
  let groupSemanticCount = 0;
  for (const word of words) {
    const semantic = !NUMERIC_WORD_PATTERN.test(word);
    if (semantic && groupSemanticCount === 2) {
      groups.push(group.join("-"));
      group = [];
      groupSemanticCount = 0;
    }
    group.push(word);
    if (semantic) {
      groupSemanticCount += 1;
    }
  }
  groups.push(group.join("-"));
  return Effect.succeed(
    groups.map((value, index) =>
      index === groups.length - 1 ? value : `${value}_`
    )
  );
}

/** Splits a file stem while preserving its role, locale, and extensions. */
const splitFile = Effect.fn("AksaraCorpus.splitStorageFile")(function* (
  fileName: string,
  sourcePath: string
) {
  const [stem, ...suffixes] = fileName.split(".");
  if (!(stem && suffixes.length > 0 && suffixes.every(Boolean))) {
    return yield* new CorpusStoragePathError({
      reason: "missing-file",
      sourcePath,
    });
  }
  if (!suffixes.every((suffix) => SEGMENT_PATTERN.test(suffix))) {
    return yield* new CorpusStoragePathError({
      reason: "unsafe-segment",
      sourcePath,
    });
  }
  const groups = yield* splitIdentity(stem, sourcePath);
  return {
    directories: groups.slice(0, -1),
    fileName: `${groups.slice(-1).join("")}.${suffixes.join(".")}`,
  };
});

/** Records every source-owned directory introduced by one mapped segment. */
function appendDirectoryNodes(
  nodes: CorpusStorageNode[],
  targetSegments: string[],
  groups: readonly string[],
  finalOwnerKey: string | null,
  sourcePath: string
) {
  for (const [index, group] of groups.entries()) {
    targetSegments.push(group);
    const targetPath = targetSegments.join("/");
    nodes.push({
      kind: "directory",
      ownerKey:
        index === groups.length - 1 && finalOwnerKey
          ? finalOwnerKey
          : `continuation:${targetPath.toLowerCase()}`,
      sourcePath,
      targetPath,
    });
  }
}

/** Prepares one mapped path plus its injective directory-node evidence. */
const prepareStorageMapping = Effect.fn("AksaraCorpus.prepareStorageMapping")(
  function* (sourcePath: string) {
    const segments = sourcePath.split("/");
    if (segments.slice(0, 2).join("/") !== LEGACY_ROOT) {
      return yield* new CorpusStoragePathError({
        reason: "legacy-root",
        sourcePath,
      });
    }
    const relative = segments.slice(2);
    const fileName = relative.at(-1);
    if (!fileName) {
      return yield* new CorpusStoragePathError({
        reason: "missing-file",
        sourcePath,
      });
    }
    const directories = relative.slice(0, -1);
    const targetSegments = [STORAGE_ROOT];
    const nodes: CorpusStorageNode[] = [
      {
        kind: "directory",
        ownerKey: LEGACY_ROOT,
        sourcePath,
        targetPath: STORAGE_ROOT,
      },
    ];
    const sourceSegments = [LEGACY_ROOT];
    for (const directory of directories) {
      sourceSegments.push(directory);
      const groups = yield* splitIdentity(directory, sourcePath);
      appendDirectoryNodes(
        nodes,
        targetSegments,
        groups,
        sourceSegments.join("/"),
        sourcePath
      );
    }
    const file = yield* splitFile(fileName, sourcePath);
    appendDirectoryNodes(
      nodes,
      targetSegments,
      file.directories,
      null,
      sourcePath
    );
    targetSegments.push(file.fileName);
    const targetPath = targetSegments.join("/");
    const decodedTarget = yield* Schema.decodeUnknown(CorpusSourcePathSchema)(
      targetPath
    ).pipe(
      Effect.mapError(
        () =>
          new CorpusStoragePathError({
            reason: "target-contract",
            sourcePath,
          })
      )
    );
    nodes.push({ kind: "file", ownerKey: sourcePath, sourcePath, targetPath });
    return {
      mapping: { sourcePath, targetPath: decodedTarget },
      nodes,
    } satisfies PreparedStorageMapping;
  }
);

/** Maps one Nakafa legacy path to its deterministic Aksara storage path. */
export const toCorpusStoragePath = Effect.fn(
  "AksaraCorpus.toCorpusStoragePath"
)((sourcePath: string) =>
  prepareStorageMapping(sourcePath).pipe(
    Effect.map(({ mapping }) => mapping.targetPath)
  )
);

/** Maps a source set and rejects file or directory-node collisions. */
export const mapCorpusStoragePaths = Effect.fn(
  "AksaraCorpus.mapCorpusStoragePaths"
)(function* (sourcePaths: readonly string[]) {
  const prepared = yield* Effect.forEach(sourcePaths, prepareStorageMapping);
  yield* validateStorageOwnership(prepared.flatMap(({ nodes }) => nodes));
  return prepared.map(({ mapping }) => mapping);
});

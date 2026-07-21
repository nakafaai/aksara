import { Buffer } from "node:buffer";
import { Sha256HashSchema } from "@nakafaai/aksara-contracts/ids";
import { Effect, Schema } from "effect";

/** UTF-8 ceiling with more than 15x headroom over today's 130-byte maximum. */
export const MAX_CORPUS_SOURCE_PATH_BYTES = 2048;
const CONTROL_CHARACTER_PATTERN = /\p{Cc}/u;

function isCanonicalCorpusSourcePath(value: string) {
  if (
    value.length === 0 ||
    Buffer.byteLength(value, "utf8") > MAX_CORPUS_SOURCE_PATH_BYTES ||
    value.startsWith("/") ||
    value.includes("\\") ||
    CONTROL_CHARACTER_PATTERN.test(value)
  ) {
    return false;
  }
  return value
    .split("/")
    .every(
      (segment) => segment.length > 0 && segment !== "." && segment !== ".."
    );
}

/** Canonical corpus-relative POSIX path without traversal or empty segments. */
export const CorpusSourcePathSchema = Schema.String.pipe(
  Schema.filter(isCanonicalCorpusSourcePath, {
    message: () => "Expected a canonical corpus-relative POSIX path.",
  }),
  Schema.brand("@NakafaAI/AksaraCorpusSourcePath")
);
export type CorpusSourcePath = typeof CorpusSourcePathSchema.Type;

/** One source and the other corpus sources it directly depends on. */
export const SourceGraphNodeSchema = Schema.Struct({
  dependencies: Schema.Array(CorpusSourcePathSchema),
  path: CorpusSourcePathSchema,
  sourceHash: Sha256HashSchema,
});
export type SourceGraphNode = typeof SourceGraphNodeSchema.Type;

/** Deterministic work selected by comparing two validated source graphs. */
export const SourceChangePlanSchema = Schema.Struct({
  compilePaths: Schema.Array(CorpusSourcePathSchema),
  deletedPaths: Schema.Array(CorpusSourcePathSchema),
});
export type SourceChangePlan = typeof SourceChangePlanSchema.Type;

const SourceGraphSideSchema = Schema.Literal("current", "previous");
type SourceGraphSide = typeof SourceGraphSideSchema.Type;

/** A graph input did not satisfy its exact schema. */
export class SourceGraphContractError extends Schema.TaggedError<SourceGraphContractError>()(
  "SourceGraphContractError",
  {
    cause: Schema.Unknown,
    graph: SourceGraphSideSchema,
  }
) {}

/** More than one graph node claimed the same canonical source path. */
export class DuplicateSourcePathError extends Schema.TaggedError<DuplicateSourcePathError>()(
  "DuplicateSourcePathError",
  {
    count: Schema.Number.pipe(Schema.int(), Schema.greaterThan(1)),
    graph: SourceGraphSideSchema,
    path: CorpusSourcePathSchema,
  }
) {}

/** Dependencies must be strictly sorted, which also makes them unique. */
export class NonCanonicalSourceDependenciesError extends Schema.TaggedError<NonCanonicalSourceDependenciesError>()(
  "NonCanonicalSourceDependenciesError",
  {
    dependencies: Schema.Array(CorpusSourcePathSchema),
    graph: SourceGraphSideSchema,
    path: CorpusSourcePathSchema,
  }
) {}

/** A source referenced a dependency absent from the same graph. */
export class MissingSourceDependencyError extends Schema.TaggedError<MissingSourceDependencyError>()(
  "MissingSourceDependencyError",
  {
    dependency: CorpusSourcePathSchema,
    graph: SourceGraphSideSchema,
    path: CorpusSourcePathSchema,
  }
) {}

/** One or more dependency cycles prevented these paths from resolving. */
export class SourceDependencyCycleError extends Schema.TaggedError<SourceDependencyCycleError>()(
  "SourceDependencyCycleError",
  {
    blockedPaths: Schema.Array(CorpusSourcePathSchema).pipe(Schema.minItems(1)),
    graph: SourceGraphSideSchema,
  }
) {}

interface ValidatedSourceGraph {
  readonly byPath: ReadonlyMap<CorpusSourcePath, SourceGraphNode>;
  readonly nodes: readonly SourceGraphNode[];
  readonly reverseDependencies: ReadonlyMap<
    CorpusSourcePath,
    readonly CorpusSourcePath[]
  >;
}

function comparePaths(left: CorpusSourcePath, right: CorpusSourcePath) {
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}

function dependenciesAreCanonical(dependencies: readonly CorpusSourcePath[]) {
  for (let index = 1; index < dependencies.length; index += 1) {
    const previous = dependencies[index - 1];
    const current = dependencies[index];
    if (
      previous === undefined ||
      current === undefined ||
      previous >= current
    ) {
      return false;
    }
  }
  return true;
}

function findDuplicatePath(nodes: readonly SourceGraphNode[]) {
  for (let index = 1; index < nodes.length; index += 1) {
    const previous = nodes[index - 1];
    const current = nodes[index];
    if (previous && current && previous.path === current.path) {
      return current.path;
    }
  }
}

function countPath(nodes: readonly SourceGraphNode[], path: CorpusSourcePath) {
  return nodes.filter((node) => node.path === path).length;
}

function buildReverseDependencies(nodes: readonly SourceGraphNode[]) {
  const reverse = new Map<CorpusSourcePath, CorpusSourcePath[]>();
  for (const node of nodes) {
    for (const dependency of node.dependencies) {
      const dependents = reverse.get(dependency);
      if (dependents) {
        dependents.push(node.path);
      } else {
        reverse.set(dependency, [node.path]);
      }
    }
  }
  return reverse;
}

function findCycleBlockedPaths(
  nodes: readonly SourceGraphNode[],
  reverseDependencies: ReadonlyMap<
    CorpusSourcePath,
    readonly CorpusSourcePath[]
  >
) {
  const unresolved = new Map(
    nodes.map((node) => [node.path, node.dependencies.length])
  );
  const ready = nodes
    .filter((node) => node.dependencies.length === 0)
    .map((node) => node.path);
  for (const resolvedPath of ready) {
    unresolved.delete(resolvedPath);
    for (const dependent of reverseDependencies.get(resolvedPath) ?? []) {
      const remaining = unresolved.get(dependent);
      if (remaining === undefined) {
        continue;
      }
      const nextRemaining = remaining - 1;
      unresolved.set(dependent, nextRemaining);
      if (nextRemaining === 0) {
        ready.push(dependent);
      }
    }
  }
  return [...unresolved.keys()].sort(comparePaths);
}

const buildValidatedSourceGraph = Effect.fn(
  "AksaraCompiler.buildValidatedSourceGraph"
)(function* (graph: SourceGraphSide, input: unknown) {
  const decoded = yield* Schema.decodeUnknown(
    Schema.Array(SourceGraphNodeSchema)
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new SourceGraphContractError({ cause, graph }))
  );
  const nodes = [...decoded].sort((left, right) =>
    comparePaths(left.path, right.path)
  );
  const duplicatePath = findDuplicatePath(nodes);
  if (duplicatePath) {
    return yield* new DuplicateSourcePathError({
      count: countPath(nodes, duplicatePath),
      graph,
      path: duplicatePath,
    });
  }
  const byPath = new Map(nodes.map((node) => [node.path, node]));
  for (const node of nodes) {
    if (!dependenciesAreCanonical(node.dependencies)) {
      return yield* new NonCanonicalSourceDependenciesError({
        dependencies: node.dependencies,
        graph,
        path: node.path,
      });
    }
    for (const dependency of node.dependencies) {
      if (!byPath.has(dependency)) {
        return yield* new MissingSourceDependencyError({
          dependency,
          graph,
          path: node.path,
        });
      }
    }
  }
  const reverseDependencies = buildReverseDependencies(nodes);
  const blockedPaths = findCycleBlockedPaths(nodes, reverseDependencies);
  if (blockedPaths.length > 0) {
    return yield* new SourceDependencyCycleError({ blockedPaths, graph });
  }
  return { byPath, nodes, reverseDependencies } satisfies ValidatedSourceGraph;
});

function dependenciesMatch(
  previous: readonly CorpusSourcePath[],
  current: readonly CorpusSourcePath[]
) {
  return (
    previous.length === current.length &&
    previous.every((dependency, index) => dependency === current[index])
  );
}

function selectCompilePaths(
  previous: ValidatedSourceGraph,
  current: ValidatedSourceGraph
) {
  const selected = new Set<CorpusSourcePath>();
  const queue: CorpusSourcePath[] = [];
  for (const node of current.nodes) {
    const oldNode = previous.byPath.get(node.path);
    if (
      oldNode &&
      oldNode.sourceHash === node.sourceHash &&
      dependenciesMatch(oldNode.dependencies, node.dependencies)
    ) {
      continue;
    }
    selected.add(node.path);
    queue.push(node.path);
  }
  for (const changedPath of queue) {
    for (const dependent of current.reverseDependencies.get(changedPath) ??
      []) {
      if (selected.has(dependent)) {
        continue;
      }
      selected.add(dependent);
      queue.push(dependent);
    }
  }
  return [...selected].sort(comparePaths);
}

/**
 * Plans compilation from exact paths and hashes. A rename is always one deleted
 * path plus one new compile path; content similarity is deliberately ignored.
 */
export const planSourceGraphChanges = Effect.fn(
  "AksaraCompiler.planSourceGraphChanges"
)(function* (previousInput: unknown, currentInput: unknown) {
  const previous = yield* buildValidatedSourceGraph("previous", previousInput);
  const current = yield* buildValidatedSourceGraph("current", currentInput);
  const deletedPaths = previous.nodes
    .filter((node) => !current.byPath.has(node.path))
    .map((node) => node.path);
  return SourceChangePlanSchema.make({
    compilePaths: selectCompilePaths(previous, current),
    deletedPaths,
  });
});

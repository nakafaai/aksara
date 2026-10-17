import { Effect, Schema } from "effect";
import { type Document, isMap, isScalar, isSeq, type YAMLMap } from "yaml";

/** A fact that a workflow verifier requires does not hold, so the workflow is refused with its reason. */
export class WorkflowError extends Schema.TaggedError<
  WorkflowError,
  { readonly brand: unique symbol }
>()(
  "WorkflowError",
  { message: Schema.String }
) {}

/** Succeeds when one required workflow fact holds, and fails with its reason otherwise. */
export function ensure(holds: boolean, reason: string) {
  return holds
    ? Effect.void
    : Effect.fail(new WorkflowError({ message: reason }));
}

/** Compares two lists of names in order, such as job names, groups, and step commands. */
export const sameNames = Schema.toEquivalence(Schema.Array(Schema.String));

/** Returns a string scalar or `undefined` for another YAML node kind. */
export function scalarText(node: unknown): string | undefined {
  if (!isScalar(node) || typeof node.value !== "string") {
    return;
  }

  return node.value;
}

/** Returns one named value from a YAML mapping. */
export function mapValue(map: YAMLMap, key: string): unknown {
  for (const item of map.items) {
    if (scalarText(item.key) === key) {
      return item.value;
    }
  }
}

/** Reads one parsed YAML document as plain data, and refuses a document that the parser cannot read as data. */
export function yamlData(
  document: Document
): Effect.Effect<unknown, WorkflowError> {
  return Effect.try({
    catch: (cause) => new WorkflowError({ message: String(cause) }),
    try: (): unknown => document.toJS(),
  });
}

/** Requires one YAML node to be a mapping, and refuses any other node with the given reason. */
export const requireMap = Effect.fn("AksaraWorkflow.requireMap")(function* (
  node: unknown,
  message: string
) {
  if (!isMap(node)) {
    return yield* new WorkflowError({ message });
  }
  return node;
});

/** Requires one YAML node to be a sequence, and refuses any other node with the given reason. */
export const requireSeq = Effect.fn("AksaraWorkflow.requireSeq")(function* (
  node: unknown,
  message: string
) {
  if (!isSeq(node)) {
    return yield* new WorkflowError({ message });
  }
  return node;
});

/** Requires one YAML node to be text, and refuses any other node with the given reason. */
export const requireText = Effect.fn("AksaraWorkflow.requireText")(function* (
  node: unknown,
  message: string
) {
  const text = scalarText(node);
  if (text === undefined) {
    return yield* new WorkflowError({ message });
  }
  return text;
});

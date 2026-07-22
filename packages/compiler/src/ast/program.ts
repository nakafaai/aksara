import type { Program } from "estree-jsx";
import type { Node as UnistNode } from "unist";

/** Narrows unknown unified data to the ESTree program shape we inspect. */
function isProgram(value: unknown): value is Program {
  if (!(typeof value === "object" && value !== null)) {
    return false;
  }
  if (!("type" in value && value.type === "Program")) {
    return false;
  }
  return "body" in value && Array.isArray(value.body);
}

/** Reads a validated ESTree program attached to one unified syntax node. */
export function readNodeProgram(node: UnistNode) {
  const { data } = node;
  if (!(data && "estree" in data)) {
    return;
  }
  return isProgram(data.estree) ? data.estree : undefined;
}

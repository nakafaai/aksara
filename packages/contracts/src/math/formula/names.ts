import { Array as Arr, HashSet } from "effect";
import type { FormulaNode } from "#contracts/math/formula/syntax";
import { FORMULA_CONSTANTS } from "#contracts/math/formula/syntax";

/** Every variable and parameter a node reads; constants are left out. */
export function formulaNames(node: FormulaNode): HashSet.HashSet<string> {
  if (node.kind === "number") {
    return HashSet.empty();
  }
  if (node.kind === "name") {
    return node.name in FORMULA_CONSTANTS
      ? HashSet.empty()
      : HashSet.make(node.name);
  }
  if (node.kind === "negate") {
    return formulaNames(node.operand);
  }
  if (node.kind === "binary") {
    return HashSet.union(formulaNames(node.left), formulaNames(node.right));
  }
  if (node.kind === "logarithm") {
    return HashSet.union(formulaNames(node.base), formulaNames(node.value));
  }
  return Arr.reduce(node.args, HashSet.empty<string>(), (names, each) =>
    HashSet.union(names, formulaNames(each))
  );
}

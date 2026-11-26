import { FIGURE_NAMES } from "@nakafa/aksara-contracts/visual/catalog";
import { Array as Arr, HashSet, Predicate } from "effect";
import type { EstreeNode, MdxNode } from "#nakafa-content/mdx/parse";
import {
  jsxComponentName,
  visitMdxNodes,
  walkEstreeDeep,
} from "#nakafa-content/mdx/parse";
import type { PointsFinding } from "#nakafa-content/points/finding";

/** Every Visual Catalog figure whose card owns its own structured footer band. */
export const CATALOG_VISUALS = HashSet.fromIterable(FIGURE_NAMES);

/** Tells whether one JSX component is a Visual Catalog figure. */
export function isCatalogVisual(name: string): boolean {
  return HashSet.has(CATALOG_VISUALS, name);
}

/** Tells whether an ESTree JSXOpeningElement passes a `footer` prop. */
function estreeHasFooterProp(node: EstreeNode): boolean {
  const opening = node.openingElement as { attributes: readonly EstreeNode[] };
  for (const attr of opening.attributes) {
    if (attr.type !== "JSXAttribute") {
      continue;
    }
    const { name } = attr.name as { name?: unknown };
    if (name === "footer") {
      return true;
    }
  }
  return false;
}

/**
 * Reports every VisualCard catalog figure in one parsed document that passes a
 * banned plain-text `footer` prop. A VisualCard may hold at most one
 * structured key-value footer band owned by the component itself, never a
 * second stacked footer or plain-text sentence band.
 */
export function findBannedFooters(tree: MdxNode): readonly PointsFinding[] {
  const findings: PointsFinding[] = [];
  visitMdxNodes(tree, (node) => {
    if (
      (node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement") &&
      Predicate.isString(node.name) &&
      isCatalogVisual(node.name)
    ) {
      if (Arr.some(node.attributes ?? [], ({ name }) => name === "footer")) {
        findings.push({
          column: node.position?.start?.column ?? 1,
          line: node.position?.start?.line ?? 1,
          message: `<${node.name}> must not pass a plain-text footer prop: a VisualCard holds at most one structured key-value footer band owned by the component itself, never a second or plain-text footer.`,
          rule: "banned-visual-footer",
        });
      }
      return;
    }
    if (
      (node.type === "mdxFlowExpression" ||
        node.type === "mdxTextExpression") &&
      node.data?.estree !== undefined
    ) {
      walkEstreeDeep(node.data.estree, (inner) => {
        if (inner.type !== "JSXElement") {
          return;
        }
        const name = jsxComponentName(inner);
        if (name === undefined || !isCatalogVisual(name)) {
          return;
        }
        if (estreeHasFooterProp(inner)) {
          const loc = (inner.loc as { start: { column: number; line: number } })
            .start;
          findings.push({
            column: loc.column + 1,
            line: loc.line,
            message: `<${name}> must not pass a plain-text footer prop: a VisualCard holds at most one structured key-value footer band owned by the component itself, never a second or plain-text footer.`,
            rule: "banned-visual-footer",
          });
        }
      });
    }
  });
  return findings;
}

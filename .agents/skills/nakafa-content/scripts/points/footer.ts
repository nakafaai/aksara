import { FIGURE_NAMES } from "@nakafa/aksara-contracts/visual/catalog";
import { Array as Arr, HashSet, Option, Predicate } from "effect";
import type {
  EstreeNode,
  MdxAttribute,
  MdxNode,
} from "#nakafa-content/mdx/parse";
import {
  attributeEstree,
  jsxComponentName,
  visitMdxNodes,
  walkEstreeDeep,
} from "#nakafa-content/mdx/parse";
import type { PointsFinding } from "#nakafa-content/points/finding";

/**
 * Every Visual Catalog figure that renders inside a VisualCard with an authored
 * footer (D3): all `FIGURE_NAMES` except embedded `Youtube` videos.
 */
export const FOOTER_VISUALS = HashSet.fromIterable(
  Arr.filter(FIGURE_NAMES, (name) => name !== "Youtube")
);

/** Tells whether one JSX component requires an authored `footer` prop. */
export function requiresVisualFooter(name: string): boolean {
  return HashSet.has(FOOTER_VISUALS, name);
}

/** Tells whether a JSX attribute carries meaningful footer text or elements. */
function hasMeaningfulFooter(attribute: MdxAttribute): boolean {
  if (Predicate.isString(attribute.value)) {
    return attribute.value.trim().length > 0;
  }
  const estree = attributeEstree(attribute);
  if (estree === undefined) {
    return false;
  }
  let meaningful = false;
  walkEstreeDeep(estree, (node) => {
    if (meaningful) {
      return;
    }
    if (
      (node.type === "JSXText" || node.type === "Literal") &&
      Predicate.isString(node.value) &&
      node.value.trim().length > 0
    ) {
      meaningful = true;
    }
  });
  return meaningful;
}

/** Tells whether an ESTree JSXOpeningElement carries a non-empty `footer` prop. */
function estreeHasFooter(node: EstreeNode): boolean {
  const opening = node.openingElement as { attributes: readonly EstreeNode[] };
  for (const attr of opening.attributes) {
    if (attr.type !== "JSXAttribute") {
      continue;
    }
    const { name } = attr.name as { name?: unknown };
    if (name !== "footer") {
      continue;
    }
    const value = attr.value as EstreeNode | null;
    if (value?.type === "Literal" && Predicate.isString(value.value)) {
      return value.value.trim().length > 0;
    }
    if (value?.type === "JSXExpressionContainer") {
      let meaningful = false;
      walkEstreeDeep(value, (inner) => {
        if (
          !meaningful &&
          (inner.type === "JSXText" || inner.type === "Literal") &&
          Predicate.isString(inner.value) &&
          inner.value.trim().length > 0
        ) {
          meaningful = true;
        }
      });
      return meaningful;
    }
  }
  return false;
}

/**
 * Reports every VisualCard catalog figure in one parsed document that is
 * missing a non-empty authored `footer` (decision D3, Rule 18).
 */
export function findMissingFooters(tree: MdxNode): readonly PointsFinding[] {
  const findings: PointsFinding[] = [];
  visitMdxNodes(tree, (node) => {
    if (
      (node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement") &&
      Predicate.isString(node.name) &&
      requiresVisualFooter(node.name)
    ) {
      const footer = Arr.findFirst(
        node.attributes ?? [],
        (attribute) => attribute.name === "footer"
      );
      if (Option.isNone(footer) || !hasMeaningfulFooter(footer.value)) {
        findings.push({
          column: node.position?.start?.column ?? 1,
          line: node.position?.start?.line ?? 1,
          message: `<${node.name}> is missing an authored footer prop (D3): write one or two short lines (<= 90 visible characters) telling the learner what to notice in this visual.`,
          rule: "missing-visual-footer",
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
        if (name === undefined || !requiresVisualFooter(name)) {
          return;
        }
        if (!estreeHasFooter(inner)) {
          const loc = (inner.loc as { start: { column: number; line: number } })
            .start;
          findings.push({
            column: loc.column + 1,
            line: loc.line,
            message: `<${name}> is missing an authored footer prop (D3): write one or two short lines (<= 90 visible characters) telling the learner what to notice in this visual.`,
            rule: "missing-visual-footer",
          });
        }
      });
    }
  });
  return findings;
}

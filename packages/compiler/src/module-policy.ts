import type { Program } from "estree-jsx";
import type { Root, RootContent } from "mdast";
import type { MdxjsEsm } from "mdast-util-mdx";
import type { UnsupportedMdxModuleOccurrence } from "./errors.js";

function isMdxjsEsm(node: RootContent): node is MdxjsEsm {
  return node.type === "mdxjsEsm";
}

function classifyModuleProgram(program: Program | null | undefined) {
  if (!program) {
    return "unknown";
  }
  let hasImport = false;
  let hasExport = false;
  for (const statement of program.body) {
    if (statement.type === "ImportDeclaration") {
      hasImport = true;
      continue;
    }
    if (
      statement.type === "ExportAllDeclaration" ||
      statement.type === "ExportDefaultDeclaration" ||
      statement.type === "ExportNamedDeclaration"
    ) {
      hasExport = true;
    }
  }
  if (hasImport && hasExport) {
    return "mixed";
  }
  if (hasImport) {
    return "import";
  }
  return hasExport ? "export" : "unknown";
}

function moduleOccurrence(node: MdxjsEsm): UnsupportedMdxModuleOccurrence {
  const start = node.position?.start;
  return {
    column: start?.column ?? 1,
    kind: classifyModuleProgram(node.data?.estree),
    line: start?.line ?? 1,
  };
}

/** Records redacted source locations for every unsupported MDX module. */
export function collectUnsupportedMdxModules(
  tree: Root,
  unsupportedModules: UnsupportedMdxModuleOccurrence[]
) {
  tree.children = tree.children.filter((node) => {
    if (!isMdxjsEsm(node)) {
      return true;
    }
    unsupportedModules.push(moduleOccurrence(node));
    return true;
  });
}

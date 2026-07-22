import { Effect } from "effect";
import type { Root } from "mdast";
import type {
  MdxJsxFlowElement,
  MdxJsxTextElement,
  MdxjsEsm,
} from "mdast-util-mdx";
import type { Node as UnistNode } from "unist";
import { visit as visitUnist } from "unist-util-visit";
import { readNodeProgram } from "#compiler/ast/program";
import { readFreeReferences } from "#compiler/ast/references";
import {
  applyMdxEdits,
  type MdxSourceEdit,
  removeMdxModule,
  renameMdxElement,
} from "#compiler/normalize/edits";
import {
  createMacroEdits,
  type MacroBinding,
  resolveMacroImport,
} from "#compiler/normalize/macros";
import {
  createModuleContracts,
  type ImportBinding,
  resolveComponentImport,
} from "#compiler/normalize/modules";
import {
  type NormalizedMdxImports,
  type NormalizeMdxImportsInput,
  rejectImport,
} from "#compiler/normalize/spec";

interface ParsedImports {
  readonly bindings: ReadonlyMap<string, ImportBinding>;
  readonly edits: readonly MdxSourceEdit[];
  readonly importNodes: ReadonlySet<MdxjsEsm>;
  readonly macroBindings: ReadonlyMap<string, MacroBinding["macroName"]>;
}

/** Adds embedded expression references that cannot become registry lookups. */
function addUnsupportedUses(
  node: UnistNode,
  bindingNames: ReadonlySet<string>,
  unsupported: Set<string>
) {
  const program = readNodeProgram(node);
  if (!program) {
    return;
  }
  for (const { name } of readFreeReferences(program)) {
    if (bindingNames.has(name)) {
      unsupported.add(name);
    }
  }
}

/** Records expression and member-tag uses within one parsed JSX element. */
function inspectElementUsage(
  node: MdxJsxFlowElement | MdxJsxTextElement,
  bindings: ReadonlyMap<string, ImportBinding>,
  names: ReadonlySet<string>,
  unsupported: Set<string>
) {
  for (const attribute of node.attributes) {
    addUnsupportedUses(attribute, names, unsupported);
    if (typeof attribute.value === "object" && attribute.value !== null) {
      addUnsupportedUses(attribute.value, names, unsupported);
    }
  }
  const { name } = node;
  if (!(name && !bindings.has(name))) {
    return;
  }
  for (const localName of names) {
    if (name.startsWith(`${localName}.`) || name.startsWith(`${localName}:`)) {
      unsupported.add(localName);
    }
  }
}

/** Collects expression references and parsed JSX elements in one tree walk. */
function collectSyntaxUsage(
  tree: Root,
  bindings: ReadonlyMap<string, ImportBinding>,
  ignoredModules: ReadonlySet<MdxjsEsm>
) {
  const elements: (MdxJsxFlowElement | MdxJsxTextElement)[] = [];
  const unsupported = new Set<string>();
  const names = new Set(bindings.keys());
  visitUnist(tree, (node) => {
    if (node.type === "mdxjsEsm" && ignoredModules.has(node)) {
      return;
    }
    addUnsupportedUses(node, names, unsupported);
    if (
      !(node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement")
    ) {
      return;
    }
    elements.push(node);
    inspectElementUsage(node, bindings, names, unsupported);
  });
  return { elements, unsupported };
}

/** Creates exact tag edits and renderer requirements from parsed JSX usage. */
const createUsageEdits = Effect.fn("AksaraCompiler.createUsageEdits")(
  function* (
    tree: Root,
    rawMdx: string,
    sourcePath: string,
    bindings: ReadonlyMap<string, ImportBinding>,
    ignoredModules: ReadonlySet<MdxjsEsm>
  ) {
    const { elements, unsupported } = collectSyntaxUsage(
      tree,
      bindings,
      ignoredModules
    );
    const [unsupportedName] = [...unsupported].sort();
    if (unsupportedName) {
      return yield* rejectImport(sourcePath, "unsupported-use", {
        binding: unsupportedName,
      });
    }
    const edits: MdxSourceEdit[] = [];
    const required = new Set<string>();
    for (const element of elements) {
      const binding =
        element.name === null ? undefined : bindings.get(element.name);
      if (!binding) {
        continue;
      }
      required.add(binding.contractName);
      if (binding.relative) {
        edits.push(
          ...(yield* renameMdxElement(
            rawMdx,
            element,
            binding.contractName,
            sourcePath
          ))
        );
      }
    }
    return { edits, required: [...required].sort() };
  }
);

/** Reads an import-only official MDX module or rejects mixed module syntax. */
const readImports = Effect.fn("AksaraCompiler.readMdxImports")(function* (
  node: MdxjsEsm,
  sourcePath: string
) {
  const program = readNodeProgram(node);
  if (!program) {
    return yield* rejectImport(sourcePath, "unknown-module");
  }
  const imports = program.body.filter(
    (statement) => statement.type === "ImportDeclaration"
  );
  if (imports.length !== 0 && imports.length !== program.body.length) {
    return yield* rejectImport(sourcePath, "mixed-module");
  }
  return imports;
});

/** Resolves reviewed import declarations and their exact removal edits. */
const parseImports = Effect.fn("AksaraCompiler.parseMdxImports")(function* (
  input: NormalizeMdxImportsInput,
  tree: Root
) {
  const contracts = yield* createModuleContracts(input);
  const bindings = new Map<string, ImportBinding>();
  const macroBindings = new Map<string, MacroBinding["macroName"]>();
  const importNodes = new Set<MdxjsEsm>();
  const edits: MdxSourceEdit[] = [];
  for (const node of tree.children) {
    if (node.type !== "mdxjsEsm") {
      continue;
    }
    const imports = yield* readImports(node, input.sourcePath);
    if (imports.length === 0) {
      continue;
    }
    for (const statement of imports) {
      const macros = yield* resolveMacroImport(statement, input.sourcePath);
      if (macros) {
        for (const binding of macros) {
          macroBindings.set(binding.localName, binding.macroName);
        }
        continue;
      }
      const resolved = yield* resolveComponentImport(
        input,
        contracts,
        statement
      );
      for (const binding of resolved) {
        bindings.set(binding.localName, binding);
      }
    }
    importNodes.add(node);
    edits.push(yield* removeMdxModule(input.rawMdx, node, input.sourcePath));
  }
  return {
    bindings,
    edits,
    importNodes,
    macroBindings,
  } satisfies ParsedImports;
});

/** Removes reviewed component imports from one official parsed MDX tree. */
export const normalizeMdxTree = Effect.fn("AksaraCompiler.normalizeMdxTree")(
  function* (input: NormalizeMdxImportsInput, tree: Root) {
    const { bindings, edits, importNodes, macroBindings } = yield* parseImports(
      input,
      tree
    );
    const usage = yield* createUsageEdits(
      tree,
      input.rawMdx,
      input.sourcePath,
      bindings,
      importNodes
    );
    const macroEdits = yield* createMacroEdits(
      tree,
      input.rawMdx,
      macroBindings,
      importNodes,
      input.sourcePath
    );
    const rawMdx = yield* applyMdxEdits(
      input.rawMdx,
      [...edits, ...usage.edits, ...macroEdits],
      input.sourcePath
    );
    return {
      rawMdx,
      requiredComponents: usage.required,
    } satisfies NormalizedMdxImports;
  }
);

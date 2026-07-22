import { Effect } from "effect";
import type { Identifier, Node, Program } from "estree-jsx";
import { SKIP, visit as visitEstree } from "estree-util-visit";
import type { Root } from "mdast";
import type { MdxjsEsm } from "mdast-util-mdx";
import { visit as visitUnist } from "unist-util-visit";
import { readNodeProgram } from "#compiler/ast/program";
import { readFreeReferences } from "#compiler/ast/references";
import {
  CIRCLE_MACRO_NAMES,
  type CircleMacroName,
  resolveCircle,
} from "#compiler/normalize/circle";
import type { MdxSourceEdit } from "#compiler/normalize/edits";
import { rejectMacro } from "#compiler/normalize/spec";
import {
  encodeStaticValue,
  evaluateStaticExpression,
} from "#compiler/normalize/value";

const COLOR_SOURCE = "@repo/design-system/lib/color";
const CIRCLE_SOURCE =
  "@repo/design-system/components/contents/mathematics/circle";
const COLOR_MACRO = "getColor";
const MACRO_MODULES = new Map<string, ReadonlySet<string>>([
  [COLOR_SOURCE, new Set([COLOR_MACRO])],
  [CIRCLE_SOURCE, new Set(CIRCLE_MACRO_NAMES)],
]);

type ImportDeclaration = Extract<
  Program["body"][number],
  { type: "ImportDeclaration" }
>;
type MacroName = CircleMacroName | typeof COLOR_MACRO;
type DirectMacroCall = Extract<Node, { type: "CallExpression" }> & {
  readonly callee: Identifier;
};

/** One exact imported migration binding and its canonical macro name. */
export interface MacroBinding {
  readonly localName: string;
  readonly macroName: MacroName;
}

/** Narrows one allowlisted string to the five measured circle macros. */
function isCircleMacro(name: string): name is CircleMacroName {
  return CIRCLE_MACRO_NAMES.some((candidate) => candidate === name);
}

/** Resolves one exact migration macro import or leaves other modules untouched. */
export const resolveMacroImport = Effect.fn(
  "AksaraCompiler.resolveMacroImport"
)(function* (statement: ImportDeclaration, sourcePath: string) {
  const importSource = statement.source.value;
  if (typeof importSource !== "string") {
    return;
  }
  const approved = MACRO_MODULES.get(importSource);
  if (!approved) {
    return;
  }
  if (statement.specifiers.length === 0) {
    return yield* rejectMacro(sourcePath, "import-shape");
  }
  return yield* Effect.forEach(statement.specifiers, (specifier) => {
    if (
      specifier.type !== "ImportSpecifier" ||
      specifier.imported.type !== "Identifier"
    ) {
      return Effect.fail(rejectMacro(sourcePath, "import-shape"));
    }
    const macroName = specifier.imported.name;
    if (
      !(
        approved.has(macroName) &&
        (macroName === COLOR_MACRO || isCircleMacro(macroName))
      )
    ) {
      return Effect.fail(rejectMacro(sourcePath, "import-binding", macroName));
    }
    if (specifier.local.name !== macroName) {
      return Effect.fail(
        rejectMacro(sourcePath, "import-binding", specifier.local.name)
      );
    }
    return Effect.succeed({
      localName: specifier.local.name,
      macroName,
    } satisfies MacroBinding);
  });
});

/** Confirms that one call targets a free imported migration binding. */
function isImportedMacroCall(
  node: Node,
  freeReferences: ReadonlySet<Identifier>,
  bindings: ReadonlyMap<string, MacroName>
): node is DirectMacroCall {
  return (
    node.type === "CallExpression" &&
    node.callee.type === "Identifier" &&
    freeReferences.has(node.callee) &&
    bindings.has(node.callee.name)
  );
}

/** Detects optional-call syntax without assuming parser-specific extensions. */
function isOptionalCall(call: DirectMacroCall) {
  return "optional" in call && call.optional === true;
}

/** Reads absolute source offsets attached by the official MDX parser. */
function callOffsets(call: DirectMacroCall) {
  if (
    !("start" in call && "end" in call) ||
    typeof call.start !== "number" ||
    typeof call.end !== "number" ||
    call.start >= call.end
  ) {
    return;
  }
  return { end: call.end, start: call.start };
}

/** Finds outermost direct macro calls and rejects every other binding use. */
const collectMacroCalls = Effect.fn("AksaraCompiler.collectMacroCalls")(
  function* (
    program: Program,
    bindings: ReadonlyMap<string, MacroName>,
    sourcePath: string
  ) {
    const freeReferences = new Set(readFreeReferences(program));
    const calls = new Map<DirectMacroCall, MacroName>();
    let unsupportedBinding: string | undefined;
    visitEstree(program, (node, key, _index, ancestors) => {
      const macroName =
        node.type === "Identifier" ? bindings.get(node.name) : undefined;
      if (
        unsupportedBinding ||
        node.type !== "Identifier" ||
        !freeReferences.has(node) ||
        !macroName
      ) {
        return;
      }
      const parent = ancestors.at(-1);
      if (
        !parent ||
        key !== "callee" ||
        !isImportedMacroCall(parent, freeReferences, bindings) ||
        isOptionalCall(parent)
      ) {
        unsupportedBinding = node.name;
        return SKIP;
      }
      const nested = ancestors
        .slice(0, -1)
        .some((ancestor) =>
          isImportedMacroCall(ancestor, freeReferences, bindings)
        );
      if (!nested) {
        calls.set(parent, macroName);
      }
    });
    if (unsupportedBinding) {
      return yield* rejectMacro(
        sourcePath,
        "unsupported-use",
        unsupportedBinding
      );
    }
    return [...calls].map(([call, macroName]) => ({ call, macroName }));
  }
);

/** Statically evaluates one outermost macro call through its exact snapshot. */
const evaluateMacroCall = Effect.fn("AksaraCompiler.evaluateMacroCall")(
  function* (
    call: DirectMacroCall,
    macroName: MacroName,
    bindings: ReadonlyMap<string, MacroName>,
    sourcePath: string
  ) {
    if (macroName === COLOR_MACRO) {
      return yield* evaluateStaticExpression(call, bindings, sourcePath);
    }
    if (call.arguments.some((argument) => argument.type === "SpreadElement")) {
      return yield* rejectMacro(sourcePath, "expression", macroName);
    }
    const arguments_ = yield* Effect.forEach(call.arguments, (argument) =>
      evaluateStaticExpression(argument, bindings, sourcePath)
    );
    const result = resolveCircle(macroName, arguments_);
    if (result === undefined) {
      return yield* rejectMacro(sourcePath, "macro-input", macroName);
    }
    return result;
  }
);

/** Creates verified literal replacements for one embedded ESTree program. */
const createProgramEdits = Effect.fn("AksaraCompiler.createProgramEdits")(
  function* (
    program: Program,
    rawMdx: string,
    bindings: ReadonlyMap<string, MacroName>,
    sourcePath: string
  ) {
    const calls = yield* collectMacroCalls(program, bindings, sourcePath);
    return yield* Effect.forEach(calls, ({ call, macroName }) =>
      Effect.gen(function* () {
        const offsets = callOffsets(call);
        if (!offsets) {
          return yield* rejectMacro(
            sourcePath,
            "source-position",
            call.callee.name
          );
        }
        const result = yield* evaluateMacroCall(
          call,
          macroName,
          bindings,
          sourcePath
        );
        const replacement = encodeStaticValue(result);
        return {
          end: offsets.end,
          expected: rawMdx.slice(offsets.start, offsets.end),
          replacement,
          start: offsets.start,
        } satisfies MdxSourceEdit;
      })
    );
  }
);

/** Creates unique outermost macro edits across one official parsed MDX tree. */
export const createMacroEdits = Effect.fn("AksaraCompiler.createMacroEdits")(
  function* (
    tree: Root,
    rawMdx: string,
    bindings: ReadonlyMap<string, MacroName>,
    ignoredModules: ReadonlySet<MdxjsEsm>,
    sourcePath: string
  ) {
    const programs = new Set<Program>();
    /** Adds one attached ESTree program exactly once. */
    function addProgram(node: Parameters<typeof readNodeProgram>[0]) {
      const program = readNodeProgram(node);
      if (program) {
        programs.add(program);
      }
    }
    visitUnist(tree, (node) => {
      if (node.type === "mdxjsEsm" && ignoredModules.has(node)) {
        return;
      }
      addProgram(node);
      if (
        node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement"
      ) {
        for (const attribute of node.attributes) {
          addProgram(attribute);
          if (typeof attribute.value === "object" && attribute.value !== null) {
            addProgram(attribute.value);
          }
        }
      }
    });
    const edits = yield* Effect.forEach(programs, (program) =>
      createProgramEdits(program, rawMdx, bindings, sourcePath)
    );
    const unique = new Map<string, MdxSourceEdit>();
    for (const edit of edits.flat()) {
      unique.set(`${edit.start}:${edit.end}`, edit);
    }
    return [...unique.values()];
  }
);

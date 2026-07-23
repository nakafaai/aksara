import { compile } from "@mdx-js/mdx";
import type { Paragraph, Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import { unified } from "unified";
import { afterEach, describe, expect, it, vi } from "vitest";
import type {
  ExecutablePolicyViolation,
  UnsupportedMdxModuleOccurrence,
} from "#compiler/errors";
import { enforceExecutablePolicy } from "#compiler/policy";

const scopeState = vi.hoisted(() => ({ withoutGlobalScope: false }));
vi.mock("eslint-scope", async (importOriginal) => {
  const original = await importOriginal<typeof import("eslint-scope")>();
  return {
    ...original,
    /** Simulates the analyzer's documented nullable global-scope result. */
    analyze(...input: Parameters<typeof original.analyze>) {
      const manager = original.analyze(...input);
      if (scopeState.withoutGlobalScope) {
        Reflect.set(manager, "globalScope", null);
      }
      return manager;
    },
  };
});
/** Runs the executable-policy plugin against one MDX fixture. */
async function inspectPolicy(
  rawMdx: string,
  allowedComponents: readonly string[] = []
) {
  const unsupportedModules: UnsupportedMdxModuleOccurrence[] = [];
  const violations: ExecutablePolicyViolation[] = [];
  await compile(rawMdx, {
    remarkPlugins: [
      enforceExecutablePolicy(
        new Set(allowedComponents),
        unsupportedModules,
        violations
      ),
    ],
  });
  return { unsupportedModules, violations };
}
/** Runs executable-policy inspection against an already constructed MDX tree. */
async function inspectTree(tree: Root) {
  const unsupportedModules: UnsupportedMdxModuleOccurrence[] = [];
  const violations: ExecutablePolicyViolation[] = [];
  await unified()
    .use(
      enforceExecutablePolicy(new Set<string>(), unsupportedModules, violations)
    )
    .run(tree);
  return { unsupportedModules, violations };
}
afterEach(() => {
  scopeState.withoutGlobalScope = false;
});

describe("enforceExecutablePolicy", () => {
  it.each([
    ["dynamic-import", undefined, '{import("./remote.ts")}'],
    ["import-meta", "import.meta", "{import.meta.url}"],
    ["require", "require", '{require("node:fs")}'],
    ["eval", "eval", '{eval("1 + 1")}'],
    ["Function", "Function", '{Function("return 1")()}'],
    ["Function", "Function", '{new Function("return 1")()}'],
    ["process", "process", "{process.env.NODE_ENV}"],
    ["globalThis", "globalThis", "{globalThis.location}"],
    ["network-global", "fetch", '{fetch("https://example.com")}'],
    ["network-global", "WebSocket", '{new WebSocket("wss://example.com")}'],
    [
      "network-global",
      "EventSource",
      '{new EventSource("https://example.com")}',
    ],
    [
      "unknown-free-global",
      "unregisteredRuntimeValue",
      "{unregisteredRuntimeValue}",
    ],
    ["unknown-free-global", "props", "{props.components.FunctionMachine({})}"],
  ] as const)("rejects %s", async (rule, identifier, rawMdx) => {
    const result = await inspectPolicy(rawMdx);
    expect(result.violations).toContainEqual(
      identifier === undefined ? { rule } : { identifier, rule }
    );
  });

  it.each([
    '<div dangerouslySetInnerHTML={{ __html: "unsafe" }} />',
    '<div {...{ dangerouslySetInnerHTML: { __html: "unsafe" } }} />',
    '{<div dangerouslySetInnerHTML={{ __html: "unsafe" }} />}',
  ])("rejects raw HTML injection through JSX", async (rawMdx) => {
    const result = await inspectPolicy(rawMdx);
    expect(result.violations).toContainEqual({
      identifier: "dangerouslySetInnerHTML",
      rule: "dangerous-jsx-attribute",
    });
  });

  it("ignores invalid attached programs and malformed JSX attributes", async () => {
    const nullProgram: Paragraph = { children: [], type: "paragraph" };
    const wrongProgram: Paragraph = { children: [], type: "paragraph" };
    const wrongBody: Paragraph = { children: [], type: "paragraph" };
    const element: MdxJsxFlowElement = {
      attributes: [],
      children: [],
      name: "Fixture",
      type: "mdxJsxFlowElement",
    };
    const missingAttributes: MdxJsxFlowElement = {
      attributes: [],
      children: [],
      name: "Fixture",
      type: "mdxJsxFlowElement",
    };
    Reflect.set(nullProgram, "data", { estree: null });
    Reflect.set(wrongProgram, "data", { estree: {} });
    Reflect.set(wrongBody, "data", {
      estree: { body: null, type: "Program" },
    });
    Reflect.set(element, "attributes", [null, {}, { type: 1 }]);
    Reflect.deleteProperty(missingAttributes, "attributes");
    const tree: Root = {
      children: [
        nullProgram,
        wrongProgram,
        wrongBody,
        element,
        missingAttributes,
      ],
      type: "root",
    };

    await expect(inspectTree(tree)).resolves.toEqual({
      unsupportedModules: [],
      violations: [],
    });
  });

  it("keeps syntax findings when analyzer global scope is unavailable", async () => {
    scopeState.withoutGlobalScope = true;

    const result = await inspectPolicy('{eval("1 + 1")}');

    expect(result.violations).toEqual([{ identifier: "eval", rule: "eval" }]);
  });

  it("keeps ordinary member access and JSX attributes", async () => {
    const result = await inspectPolicy(
      '<span title="safe">{Math.max(...[1, 2].map((value) => value * 2))}{<span xml:lang="en" />}</span>'
    );

    expect(result).toEqual({ unsupportedModules: [], violations: [] });
  });

  it("allows selected renderer components inside rich JSX attributes", async () => {
    const result = await inspectPolicy(
      `<AtomShellLab
        description={
          <>
            Capacity <InlineMath math="2n^2" />.
          </>
        }
        labels={{
          note: <>Shell <InlineMath math="K" /> is full.</>,
        }}
      />`,
      ["AtomShellLab", "InlineMath"]
    );

    expect(result.violations).toEqual([]);
  });

  it("keeps unselected JSX attribute globals forbidden", async () => {
    const result = await inspectPolicy(
      '<AtomShellLab description={<><UnknownMath math="2n^2" /></>} />',
      ["AtomShellLab", "InlineMath"]
    );

    expect(result.violations).toContainEqual({
      identifier: "UnknownMath",
      rule: "unknown-free-global",
    });
  });

  it("never lets a renderer name override privileged-global rules", async () => {
    const result = await inspectPolicy('{Function("return 1")()}', [
      "Function",
    ]);

    expect(result.violations).toContainEqual({
      identifier: "Function",
      rule: "Function",
    });
  });
});

import { compile } from "@mdx-js/mdx";
import type { Program } from "estree-jsx";
import type { Paragraph, Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import { unified } from "unified";
import { afterEach, describe, expect, it, vi } from "vitest";
import type {
  ExecutablePolicyViolation,
  UnsupportedMdxModuleOccurrence,
} from "#compiler/errors.js";
import { enforceExecutablePolicy } from "#compiler/policy.js";

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
async function inspectPolicy(rawMdx: string) {
  const unsupportedModules: UnsupportedMdxModuleOccurrence[] = [];
  const violations: ExecutablePolicyViolation[] = [];
  await compile(rawMdx, {
    remarkPlugins: [enforceExecutablePolicy(unsupportedModules, violations)],
  });
  return { unsupportedModules, violations };
}

/** Runs executable-policy inspection against an already constructed MDX tree. */
async function inspectTree(tree: Root) {
  const unsupportedModules: UnsupportedMdxModuleOccurrence[] = [];
  const violations: ExecutablePolicyViolation[] = [];
  await unified()
    .use(enforceExecutablePolicy(unsupportedModules, violations))
    .run(tree);
  return { unsupportedModules, violations };
}

afterEach(() => {
  scopeState.withoutGlobalScope = false;
});

describe("enforceExecutablePolicy", () => {
  it.each([
    ["dynamic-import", undefined, '{import("./remote.js")}'],
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
  ] as const)("rejects %s", async (rule, identifier, rawMdx) => {
    const result = await inspectPolicy(rawMdx);

    expect(result.violations).toContainEqual(
      identifier === undefined ? { rule } : { identifier, rule }
    );
  });

  it.each([
    ["constructor", '{[].filter.constructor("return process")()}'],
    ["constructor", '{({}).constructor.constructor("return process")()}'],
    ["constructor", '{Math.constructor("return process")()}'],
    ["prototype", "{Object.prototype}"],
    ["__proto__", "{({}).__proto__}"],
    ["constructor", '{({})["constructor"]}'],
  ] as const)(
    "rejects prototype-chain property %s",
    async (identifier, rawMdx) => {
      const result = await inspectPolicy(rawMdx);

      expect(result.violations).toContainEqual({
        identifier,
        rule: "prototype-chain-access",
      });
    }
  );

  it.each([
    '<div dangerouslySetInnerHTML={{ __html: "unsafe" }} />',
    '<div {...{ dangerouslySetInnerHTML: { __html: "unsafe" } }} />',
  ])("rejects raw HTML injection through JSX", async (rawMdx) => {
    const result = await inspectPolicy(rawMdx);

    expect(result.violations).toContainEqual({
      identifier: "dangerouslySetInnerHTML",
      rule: "dangerous-jsx-attribute",
    });
  });

  it.each([
    "{({})[1]}",
    ["{({})[`con$", '{"str"}uctor`]}'].join(""),
    '{<div title="safe" />}',
    '{<div xml:lang="en" />}',
  ])("keeps safe static-property and JSX forms", async (rawMdx) => {
    const result = await inspectPolicy(rawMdx);

    expect(result.violations).toEqual([]);
  });

  it("rejects static template and expression-level JSX escape paths", async () => {
    const template = await inspectPolicy("{({})[`constructor`]}");
    const jsx = await inspectPolicy(
      '{<div dangerouslySetInnerHTML={{ __html: "unsafe" }} />}'
    );

    expect(template.violations).toContainEqual({
      identifier: "constructor",
      rule: "prototype-chain-access",
    });
    expect(jsx.violations).toContainEqual({
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

  it("handles raw template keys and non-identifier member properties", async () => {
    const program: Program = {
      body: [
        {
          expression: {
            computed: true,
            object: { properties: [], type: "ObjectExpression" },
            optional: false,
            property: {
              expressions: [],
              quasis: [
                {
                  tail: true,
                  type: "TemplateElement",
                  value: { cooked: null, raw: "constructor" },
                },
              ],
              type: "TemplateLiteral",
            },
            type: "MemberExpression",
          },
          type: "ExpressionStatement",
        },
        {
          expression: {
            computed: false,
            object: { type: "ThisExpression" },
            optional: false,
            property: { name: "private", type: "PrivateIdentifier" },
            type: "MemberExpression",
          },
          type: "ExpressionStatement",
        },
      ],
      sourceType: "module",
      type: "Program",
    };
    const programNode: Paragraph = { children: [], type: "paragraph" };
    Reflect.set(programNode, "data", { estree: program });
    const tree: Root = {
      children: [programNode],
      type: "root",
    };

    const result = await inspectTree(tree);

    expect(result.violations).toEqual([
      { identifier: "constructor", rule: "prototype-chain-access" },
    ]);
  });

  it("keeps syntax findings when analyzer global scope is unavailable", async () => {
    scopeState.withoutGlobalScope = true;

    const result = await inspectPolicy('{eval("1 + 1")}');

    expect(result.violations).toEqual([{ identifier: "eval", rule: "eval" }]);
  });

  it("keeps ordinary member access and JSX attributes", async () => {
    const result = await inspectPolicy(
      '<span title="safe">{[1, 2].map((value) => value * 2).join(",")}</span>'
    );

    expect(result).toEqual({ unsupportedModules: [], violations: [] });
  });
});

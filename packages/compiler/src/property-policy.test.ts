import { compile } from "@mdx-js/mdx";
import type { Program } from "estree-jsx";
import type { Paragraph, Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { describe, expect, it } from "vitest";
import { readNodeProgram } from "#compiler/ast/program";
import type { ExecutablePolicyViolation } from "#compiler/errors";
import { inspectPropertyProgram } from "#compiler/property-policy";

/** Runs direct property-policy inspection against each attached MDX program. */
async function inspectProperties(rawMdx: string) {
  const violations: ExecutablePolicyViolation[] = [];
  /** Captures property findings from every ESTree program attached by MDX. */
  const inspectPlugin: Plugin<[], Root> = () => (tree) => {
    visit(tree, (node) => {
      const program = readNodeProgram(node);
      if (program) {
        violations.push(...inspectPropertyProgram(program));
      }
    });
  };
  await compile(rawMdx, { remarkPlugins: [inspectPlugin] });
  return violations;
}

describe("inspectPropertyProgram", () => {
  it.each([
    ["constructor", '{[].filter.constructor("return process")()}'],
    ["constructor", '{({}).constructor.constructor("return process")()}'],
    ["constructor", '{Math.constructor("return process")()}'],
    ["prototype", "{Object.prototype}"],
    ["__proto__", "{({}).__proto__}"],
    ["constructor", '{({})["constructor"]}'],
    ["constructor", '{({})["con" + "structor"]}'],
    ["constructor", '{({ "constructor": 1 })}'],
    ["constructor", ["{({})[`con$", '{"str"}uctor`]}'].join("")],
    ["constructor", "{(({ constructor }) => constructor)({})}"],
    ["constructor", '{(({ ["con" + "structor"]: value }) => value)({})}'],
    [
      "getOwnPropertyDescriptor",
      '{Object.getOwnPropertyDescriptor(Object, "constructor")}',
    ],
    ["getPrototypeOf", "{Object.getPrototypeOf([])}"],
  ] as const)(
    "rejects prototype-chain property %s",
    async (identifier, rawMdx) => {
      await expect(inspectProperties(rawMdx)).resolves.toContainEqual({
        identifier,
        rule: "prototype-chain-access",
      });
    }
  );

  it.each([
    '{((value) => ({})[value + "safe"])("key")}',
    '{((value) => ({})["safe" + value])("key")}',
    ["{((value) => ({})[`safe$", '{value}`])("key")}'].join(""),
    '{((key) => ({})[key])("constructor")}',
    "{({})[String.fromCharCode(99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114)]}",
    '{((key) => (({ [key]: value }) => value)({}))("constructor")}',
    "{(({ [String.fromCharCode(99)]: value }) => value)({})}",
  ])("rejects runtime-computed property access", async (rawMdx) => {
    await expect(inspectProperties(rawMdx)).resolves.toContainEqual({
      rule: "dynamic-property-access",
    });
  });

  it.each([
    "{({})[1]}",
    '{({})["safe"]}',
    "{(() => { const a = [4, 1, 0]; const b = [2, 3, 0]; return a.map((component, index) => component + b.at(index)); })()}",
    '{<div title="safe" />}',
    '{<div xml:lang="en" />}',
  ])("keeps safe static-property and JSX forms", async (rawMdx) => {
    await expect(inspectProperties(rawMdx)).resolves.toEqual([]);
  });

  it("rejects static template and object-form HTML injection", async () => {
    const template = await inspectProperties("{({})[`constructor`]}");
    const htmlProgram: Program = {
      body: [
        {
          expression: {
            properties: [
              {
                computed: false,
                key: { name: "dangerouslySetInnerHTML", type: "Identifier" },
                kind: "init",
                method: false,
                shorthand: false,
                type: "Property",
                value: { properties: [], type: "ObjectExpression" },
              },
            ],
            type: "ObjectExpression",
          },
          type: "ExpressionStatement",
        },
      ],
      sourceType: "module",
      type: "Program",
    };

    expect(template).toContainEqual({
      identifier: "constructor",
      rule: "prototype-chain-access",
    });
    expect(inspectPropertyProgram(htmlProgram)).toContainEqual({
      identifier: "dangerouslySetInnerHTML",
      rule: "dangerous-jsx-attribute",
    });
  });

  it("handles raw template keys and non-identifier member properties", () => {
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

    expect(inspectPropertyProgram(program)).toEqual([
      { identifier: "constructor", rule: "prototype-chain-access" },
    ]);
  });
});

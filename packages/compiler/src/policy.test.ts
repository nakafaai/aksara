import { compile } from "@mdx-js/mdx";
import { describe, expect, it } from "vitest";
import type {
  ExecutablePolicyViolation,
  UnsupportedMdxModuleOccurrence,
} from "#compiler/errors.js";
import { enforceExecutablePolicy } from "#compiler/policy.js";

async function inspectPolicy(rawMdx: string) {
  const unsupportedModules: UnsupportedMdxModuleOccurrence[] = [];
  const violations: ExecutablePolicyViolation[] = [];
  await compile(rawMdx, {
    remarkPlugins: [enforceExecutablePolicy(unsupportedModules, violations)],
  });
  return { unsupportedModules, violations };
}

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
  ] as const)("rejects prototype-chain property %s", async (identifier, rawMdx) => {
    const result = await inspectPolicy(rawMdx);

    expect(result.violations).toContainEqual({
      identifier,
      rule: "prototype-chain-access",
    });
  });

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

  it("keeps ordinary member access and JSX attributes", async () => {
    const result = await inspectPolicy(
      '<span title="safe">{[1, 2].map((value) => value * 2).join(",")}</span>'
    );

    expect(result).toEqual({ unsupportedModules: [], violations: [] });
  });
});

import { afterEach, describe, expect, it } from "@effect/vitest";
import { compile } from "@mdx-js/mdx";
import { Effect } from "effect";
import type { Paragraph, Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import { unified } from "unified";
import { vi } from "vitest";
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
const inspectPolicy = Effect.fn("ExecutablePolicyTest.inspectPolicy")(
  function* (rawMdx: string, allowedComponents: readonly string[] = []) {
    const unsupportedModules: UnsupportedMdxModuleOccurrence[] = [];
    const violations: ExecutablePolicyViolation[] = [];
    yield* Effect.promise(() =>
      compile(rawMdx, {
        remarkPlugins: [
          enforceExecutablePolicy(
            new Set(allowedComponents),
            unsupportedModules,
            violations
          ),
        ],
      })
    );
    return { unsupportedModules, violations };
  }
);
/** Runs executable-policy inspection against an already constructed MDX tree. */
const inspectTree = Effect.fn("ExecutablePolicyTest.inspectTree")(function* (
  tree: Root
) {
  const unsupportedModules: UnsupportedMdxModuleOccurrence[] = [];
  const violations: ExecutablePolicyViolation[] = [];
  yield* Effect.promise(() =>
    unified()
      .use(
        enforceExecutablePolicy(
          new Set<string>(),
          unsupportedModules,
          violations
        )
      )
      .run(tree)
  );
  return { unsupportedModules, violations };
});
afterEach(() => {
  scopeState.withoutGlobalScope = false;
});

describe("enforceExecutablePolicy", () => {
  it.effect.each([
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
  ] as const)("rejects %s", ([rule, identifier, rawMdx]) =>
    Effect.gen(function* () {
      const result = yield* inspectPolicy(rawMdx);
      expect(result.violations).toContainEqual(
        identifier === undefined ? { rule } : { identifier, rule }
      );
    })
  );

  it.effect.each([
    '<div dangerouslySetInnerHTML={{ __html: "unsafe" }} />',
    '<div {...{ dangerouslySetInnerHTML: { __html: "unsafe" } }} />',
    '{<div dangerouslySetInnerHTML={{ __html: "unsafe" }} />}',
  ])("rejects raw HTML injection through JSX", (rawMdx) =>
    Effect.gen(function* () {
      const result = yield* inspectPolicy(rawMdx);
      expect(result.violations).toContainEqual({
        identifier: "dangerouslySetInnerHTML",
        rule: "dangerous-jsx-attribute",
      });
    })
  );

  it.effect(
    "ignores invalid attached programs and malformed JSX attributes",
    () =>
      Effect.gen(function* () {
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
        expect(yield* inspectTree(tree)).toEqual({
          unsupportedModules: [],
          violations: [],
        });
      })
  );

  it.effect(
    "keeps syntax findings when analyzer global scope is unavailable",
    () =>
      Effect.gen(function* () {
        scopeState.withoutGlobalScope = true;
        const result = yield* inspectPolicy('{eval("1 + 1")}');
        expect(result.violations).toEqual([
          { identifier: "eval", rule: "eval" },
        ]);
      })
  );

  it.effect("keeps ordinary member access and JSX attributes", () =>
    Effect.gen(function* () {
      const result = yield* inspectPolicy(
        '<span title="safe">{Math.max(...[1, 2].map((value) => value * 2))}{<span xml:lang="en" />}</span>'
      );
      expect(result).toEqual({ unsupportedModules: [], violations: [] });
    })
  );

  it.effect(
    "allows selected renderer components inside rich JSX attributes",
    () =>
      Effect.gen(function* () {
        const result = yield* inspectPolicy(
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
      })
  );

  it.effect("keeps unselected JSX attribute globals forbidden", () =>
    Effect.gen(function* () {
      const result = yield* inspectPolicy(
        '<AtomShellLab description={<><UnknownMath math="2n^2" /></>} />',
        ["AtomShellLab", "InlineMath"]
      );
      expect(result.violations).toContainEqual({
        identifier: "UnknownMath",
        rule: "unknown-free-global",
      });
    })
  );

  it.effect("never lets a renderer name override privileged-global rules", () =>
    Effect.gen(function* () {
      const result = yield* inspectPolicy('{Function("return 1")()}', [
        "Function",
      ]);
      expect(result.violations).toContainEqual({
        identifier: "Function",
        rule: "Function",
      });
    })
  );
});

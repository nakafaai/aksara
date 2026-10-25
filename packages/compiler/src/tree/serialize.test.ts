import { assert, describe, it } from "@effect/vitest";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import {
  createTreeRuntime,
  TREE_FRAGMENT,
  TreeCall,
} from "#compiler/tree/runtime";
import { serializeContentTree } from "#compiler/tree/serialize";

const site = {
  contentKey: ContentKeySchema.make("test:serialize"),
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/test/serialize/en.mdx"
  ),
};

/** Serializes one fragment built from the given props. */
function serializeFragment(props: Readonly<Record<string, unknown>>) {
  return serializeContentTree(new TreeCall(TREE_FRAGMENT, props), site);
}

/** Serializes one fragment and returns the typed failure it produces. */
function rejectFragment(props: Readonly<Record<string, unknown>>) {
  return Effect.flip(serializeFragment(props));
}

/** Symbol key that JSON text cannot carry. */
const hidden = Symbol("hidden");

describe("serializeContentTree", () => {
  it.effect("serializes the subscript intrinsic tag as its own element", () =>
    Effect.gen(function* () {
      const tree = yield* serializeFragment({
        children: ["H", new TreeCall("sub", { children: "2" }), "O"],
      });

      assert.deepStrictEqual(tree.children, [
        "H",
        { $node: "element", children: ["2"], name: "sub", props: {} },
        "O",
      ]);
    })
  );

  it.effect("omits undefined props as React does and keeps null", () =>
    Effect.gen(function* () {
      const { NumberLine } = createTreeRuntime([
        "NumberLine",
      ]).useMDXComponents();
      const tree = yield* serializeFragment({
        children: [
          new TreeCall(NumberLine, {
            children: [],
            end: 3,
            labels: { max: 3, min: undefined },
            nothing: null,
            start: undefined,
          }),
        ],
      });

      assert.deepStrictEqual(tree.children, [
        {
          $node: "element",
          children: [],
          name: "NumberLine",
          props: { end: 3, labels: { max: 3 }, nothing: null },
        },
      ]);
    })
  );

  it.effect(
    "keeps text, numbers as text, flattens lists, and drops empty values",
    () =>
      Effect.gen(function* () {
        const paragraph = new TreeCall("p", { children: "b" });
        const tree = yield* serializeFragment({
          children: ["a", 1, null, false, undefined, [paragraph, [true, "c"]]],
        });

        assert.deepStrictEqual(tree, {
          $node: "element",
          children: [
            "a",
            "1",
            { $node: "element", children: ["b"], name: "p", props: {} },
            "c",
          ],
          name: "fragment",
          props: {},
        });
      })
  );

  it.effect(
    "serializes props as data and nested elements, writing -0 as 0",
    () =>
      Effect.gen(function* () {
        const { MathVisual } = createTreeRuntime([
          "MathVisual",
        ]).useMDXComponents();
        const inline = new TreeCall("em", { children: "x" });
        const tree = yield* serializeFragment({
          children: [
            new TreeCall(MathVisual, {
              children: [],
              labels: { note: inline, scale: -0 },
              values: [null, true, 2.5, "text"],
            }),
          ],
        });

        assert.deepStrictEqual(tree.children, [
          {
            $node: "element",
            children: [],
            name: "MathVisual",
            props: {
              labels: {
                note: {
                  $node: "element",
                  children: ["x"],
                  name: "em",
                  props: {},
                },
                scale: 0,
              },
              values: [null, true, 2.5, "text"],
            },
          },
        ]);
      })
  );

  it.effect("accepts each renderer component from the placeholder table", () =>
    Effect.gen(function* () {
      const { InlineMath } = createTreeRuntime([
        "InlineMath",
      ]).useMDXComponents();
      const tree = yield* serializeFragment({
        children: [new TreeCall(InlineMath, { math: "x" })],
      });

      assert.deepStrictEqual(tree.children, [
        {
          $node: "element",
          children: [],
          name: "InlineMath",
          props: { math: "x" },
        },
      ]);
    })
  );

  it.effect("names the element and prop of every rejected value", () =>
    Effect.gen(function* () {
      const { InlineMath } = createTreeRuntime([
        "InlineMath",
      ]).useMDXComponents();
      const sparse: unknown[] = [1];
      sparse[2] = 2;
      const cases: (readonly [
        Readonly<Record<string, unknown>>,
        string | null,
        string,
        string,
      ])[] = [
        [
          { children: [new TreeCall("span", {})] },
          null,
          "span",
          "unknown-element",
        ],
        [
          { children: [new TreeCall(() => undefined, {})] },
          null,
          "unknown",
          "unknown-element",
        ],
        [
          { children: [new TreeCall("p", { data: () => 1 })] },
          "data",
          "p",
          "not-json",
        ],
        [
          { children: [new TreeCall("p", { data: Symbol("x") })] },
          "data",
          "p",
          "not-json",
        ],
        [
          { children: [new TreeCall("p", { data: 1n })] },
          "data",
          "p",
          "not-json",
        ],
        [
          { children: [new TreeCall("p", { data: [undefined] })] },
          "data[0]",
          "p",
          "not-json",
        ],
        [
          {
            children: [
              new TreeCall("p", { data: { visible: 1, [hidden]: 2 } }),
            ],
          },
          "data",
          "p",
          "not-json",
        ],
        [
          { children: [new TreeCall("p", { [hidden]: 2 })] },
          String(hidden),
          "p",
          "not-json",
        ],
        [
          { children: [new TreeCall("p", { data: new Uint8Array(1) })] },
          "data",
          "p",
          "not-json",
        ],
        [
          { children: [new TreeCall("p", { data: InlineMath })] },
          "data",
          "p",
          "not-json",
        ],
        [
          { children: [new TreeCall("p", { data: sparse })] },
          "data[1]",
          "p",
          "not-json",
        ],
        [
          { children: [new TreeCall("p", { data: Number.NaN })] },
          "data",
          "p",
          "non-finite-number",
        ],
        [
          {
            children: [
              new TreeCall("p", { data: { deep: Number.POSITIVE_INFINITY } }),
            ],
          },
          "data.deep",
          "p",
          "non-finite-number",
        ],
        [
          { children: [new TreeCall("p", { $node: "x" })] },
          "$node",
          "p",
          "reserved-key",
        ],
        [
          { children: [new TreeCall("p", { data: { $node: "x" } })] },
          "data",
          "p",
          "reserved-key",
        ],
        [
          { children: [new TreeCall("p", { children: [{ text: "x" }] })] },
          "children",
          "p",
          "unsupported-child",
        ],
        [
          { children: [Number.NaN] },
          "children",
          "fragment",
          "non-finite-number",
        ],
        [{ children: [() => 1] }, "children", "fragment", "unsupported-child"],
      ];

      for (const [props, prop, element, reason] of cases) {
        const error = yield* rejectFragment(props);
        assert.strictEqual(error._tag, "ContentTreePolicyError");
        assert.strictEqual(error.prop, prop);
        assert.strictEqual(error.element, element);
        assert.strictEqual(error.reason, reason);
        assert.strictEqual(error.sourcePath, site.sourcePath);
      }
    })
  );
});

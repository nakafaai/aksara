import { describe, expect, it } from "@effect/vitest";
import { Record as Rec, Schema } from "effect";
import {
  ContentTreeElementNameSchema,
  ContentTreeSchema,
  canonicalizeContentTree,
  contentTreeComponentNames,
} from "#contracts/tree";

const decodeTree = Schema.decodeUnknownSync(ContentTreeSchema);

/** One element with the given name, props, and children, in the wire shape. */
function element(
  name: string,
  props: Record<string, unknown>,
  children: unknown[] = []
) {
  return { $node: "element", children, name, props };
}

describe("content tree", () => {
  it("decodes a fragment whose props hold data, lists, and nested elements", () => {
    const tree = decodeTree({
      $node: "element",
      children: [
        "text",
        {
          $node: "element",
          children: [],
          name: "InlineMath",
          props: {
            flags: [true, null, 2.5],
            labels: {
              note: {
                $node: "element",
                children: ["Shell"],
                name: "em",
                props: {},
              },
            },
            math: "x",
          },
        },
      ],
      name: "fragment",
      props: {},
    });

    expect(tree.name).toBe("fragment");
    expect(tree.children).toHaveLength(2);
  });

  it("requires the fragment as the root", () => {
    expect(() =>
      decodeTree({ $node: "element", children: [], name: "p", props: {} })
    ).toThrow("Expected the fragment as the content tree root.");
  });

  it("rejects the reserved element key inside a plain JSON object", () => {
    expect(() =>
      decodeTree({
        $node: "element",
        children: [],
        name: "fragment",
        props: { data: { $node: "other" } },
      })
    ).toThrow("Expected props without the reserved element key.");
  });

  it("accepts only allowed intrinsic tags and capitalized components", () => {
    const names = Schema.decodeUnknownSync(ContentTreeElementNameSchema);
    expect(names("h2")).toBe("h2");
    expect(names("fragment")).toBe("fragment");
    expect(names("InlineMath")).toBe("InlineMath");
    expect(() => names("script")).toThrow();
    expect(() => names("mystery")).toThrow();
  });

  it("canonicalizes props by code unit and keeps every list order", () => {
    const text = canonicalizeContentTree({
      $node: "element",
      children: [
        "a",
        { $node: "element", children: [], name: "br", props: {} },
      ],
      name: "fragment",
      props: {
        count: 0,
        nested: {
          alpha: [
            {
              $node: "element",
              children: [],
              name: "hr",
              props: { a: 1, b: 2 },
            },
          ],
          zeta: 1,
        },
        title: "T",
      },
    });

    expect(text).toBe(
      '{"$node":"element","name":"fragment","props":{"count":0,"nested":{"alpha":[{"$node":"element","name":"hr","props":{"a":1,"b":2},"children":[]}],"zeta":1},"title":"T"},"children":["a",{"$node":"element","name":"br","props":{},"children":[]}]}'
    );
  });

  it("signs one canonical text whatever key order the input uses", () => {
    const signed = canonicalizeContentTree(
      decodeTree(
        element("fragment", { a: "x", z: 1 }, [element("p", {}, ["hi"])])
      )
    );
    const reordered = canonicalizeContentTree(
      decodeTree(
        Rec.fromEntries([
          [
            "props",
            Rec.fromEntries([
              ["z", 1],
              ["a", "x"],
            ]),
          ],
          ["name", "fragment"],
          [
            "children",
            [
              Rec.fromEntries([
                ["props", {}],
                ["name", "p"],
                ["children", ["hi"]],
                ["$node", "element"],
              ]),
            ],
          ],
          ["$node", "element"],
        ])
      )
    );

    expect(reordered).toBe(signed);
    expect(signed).toBe(
      '{"$node":"element","name":"fragment","props":{"a":"x","z":1},"children":[{"$node":"element","name":"p","props":{},"children":["hi"]}]}'
    );
  });

  it("accepts the subscript tag that the renderer maps to sub", () => {
    const names = Schema.decodeUnknownSync(ContentTreeElementNameSchema);
    expect(names("sub")).toBe("sub");
  });

  it("lists each renderer component once, including ones nested in props", () => {
    const tree = decodeTree(
      element("fragment", {}, [
        element("InlineMath", { math: "x" }),
        element("p", {}, [
          element("LineEquation", {
            data: [{ labels: element("BlockMath", { math: "y" }) }],
          }),
          "text",
        ]),
        element("InlineMath", { math: "z" }),
        element("Table", { rows: [element("Highlight", {}, ["a"])] }),
      ])
    );

    expect(contentTreeComponentNames(tree)).toEqual([
      "InlineMath",
      "LineEquation",
      "BlockMath",
      "Table",
      "Highlight",
    ]);
  });

  it("lists no components for a tree made only of intrinsic tags", () => {
    expect(
      contentTreeComponentNames(
        decodeTree(element("fragment", {}, [element("sub", {}, ["2"])]))
      )
    ).toEqual([]);
  });
});

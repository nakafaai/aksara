import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";
import {
  ContentTreeElementNameSchema,
  ContentTreeSchema,
  canonicalizeContentTree,
} from "#contracts/tree";

const decodeTree = Schema.decodeUnknownSync(ContentTreeSchema);

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
});

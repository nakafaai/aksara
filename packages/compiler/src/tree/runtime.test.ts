import { assert, describe, it } from "@effect/vitest";
import {
  componentNameOf,
  createTreeRuntime,
  TREE_FRAGMENT,
  TreeCall,
} from "#compiler/tree/runtime";

describe("createTreeRuntime", () => {
  it("names only capitalized components and leaves intrinsic tags plain", () => {
    const components = createTreeRuntime([
      "BlockMath",
      "h2",
    ]).useMDXComponents();

    assert.strictEqual(componentNameOf(components.BlockMath), "BlockMath");
    assert.isUndefined(components.h2);
  });

  it("records each JSX call exactly as the compiled body passes it", () => {
    const runtime = createTreeRuntime([]);
    const paragraph = runtime.jsx("p", { children: "text" });
    const fragment = runtime.jsxs(runtime.Fragment, { children: [] });

    assert.instanceOf(paragraph, TreeCall);
    assert.strictEqual(paragraph.type, "p");
    assert.deepStrictEqual(paragraph.props, { children: "text" });
    assert.strictEqual(fragment.type, TREE_FRAGMENT);
  });

  it("keeps each placeholder inert if the body ever renders it", () => {
    const components = createTreeRuntime(["BlockMath"]).useMDXComponents();

    assert.isNull(components.BlockMath?.());
  });

  it("does not name any value that is not a placeholder", () => {
    assert.isUndefined(componentNameOf("BlockMath"));
    assert.isUndefined(componentNameOf(() => undefined));
  });
});

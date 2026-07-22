import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  RENDERER_DOMAINS,
  type RendererDomain,
} from "#contracts/renderer/domain";
import { normalizeRendererSelection } from "#contracts/renderer/selection";

const supported = [
  { name: "BlockMath", version: 1 },
  { name: "InlineMath", version: 1 },
  { name: "InlineMath", version: 2 },
] as const;
const authoring = [
  { name: "BlockMath", version: 1 },
  { name: "InlineMath", version: 1 },
] as const;
/** Creates one unsorted test domain capability from the canonical source. */
function rendererDomain(name: RendererDomain) {
  const componentName = name === "mathematics" ? "FunctionMachine" : undefined;
  if (!componentName) {
    return { authoringComponents: [], name, supportedComponents: [] };
  }
  const requirement = { name: componentName, version: 1 };
  return {
    authoringComponents: [requirement],
    name,
    supportedComponents: [requirement],
  };
}

const domains = RENDERER_DOMAINS.map(rendererDomain).reverse();

describe("renderer selection", () => {
  it("sorts support and domains while preserving canonical authoring pins", async () => {
    const selection = await Effect.runPromise(
      normalizeRendererSelection({
        base: {
          authoringComponents: authoring,
          supportedComponents: [...supported].reverse(),
        },
        domains,
      })
    );
    expect(selection.base.supportedComponents).toEqual(supported);
    expect(selection.domains.map(({ name }) => name)).toEqual(RENDERER_DOMAINS);
  });

  it.each([
    ["RendererAuthoringComponentMissingError", [authoring[0]]],
    [
      "RendererAuthoringComponentExtraError",
      [...authoring, { name: "Mermaid", version: 1 }],
    ],
    [
      "RendererAuthoringComponentUnsupportedError",
      [authoring[0], { name: "InlineMath", version: 3 }],
    ],
    [
      "RendererAuthoringComponentDuplicateError",
      [authoring[0], authoring[0], authoring[1]],
    ],
    ["RendererAuthoringSelectionNonCanonicalError", [...authoring].reverse()],
  ])("rejects %s", async (tag, pins) => {
    const error = await Effect.runPromise(
      normalizeRendererSelection({
        base: {
          authoringComponents: pins,
          supportedComponents: supported,
        },
        domains,
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe(tag);
  });
});

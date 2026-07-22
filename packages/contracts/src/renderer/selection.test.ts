import { Effect } from "effect";
import { describe, expect, it } from "vitest";
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
const domains = [
  {
    authoringComponents: [{ name: "FunctionMachine", version: 1 }],
    name: "material-mathematics",
    supportedComponents: [{ name: "FunctionMachine", version: 1 }],
  },
  {
    authoringComponents: [{ name: "AtomShellLab", version: 1 }],
    name: "material-chemistry",
    supportedComponents: [{ name: "AtomShellLab", version: 1 }],
  },
] as const;

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
    expect(selection.domains.map(({ name }) => name)).toEqual([
      "material-chemistry",
      "material-mathematics",
    ]);
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

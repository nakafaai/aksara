import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  CompiledContentRequirementsSchema,
  canonicalizeRendererAuthoringSelection,
  RendererCapabilitySchema,
  RendererManifestAuthoringComponentsSchema,
  sortRendererComponentRequirements,
} from "#contracts/renderer/component";

describe("renderer component", () => {
  it("sorts requirements by code-unit name and numeric version", () => {
    expect(
      sortRendererComponentRequirements([
        { name: "FunctionMachine", version: 2 },
        { name: "BlockMath", version: 1 },
        { name: "FunctionMachine", version: 1 },
      ])
    ).toEqual([
      { name: "BlockMath", version: 1 },
      { name: "FunctionMachine", version: 1 },
      { name: "FunctionMachine", version: 2 },
    ]);
  });

  it("accepts expanding versions but rejects duplicate artifact names", () => {
    const capability = {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [
        { name: "BlockMath", version: 1 },
        { name: "BlockMath", version: 2 },
      ],
    };
    expect(
      Exit.isSuccess(Schema.decodeExit(RendererCapabilitySchema)(capability))
    ).toBe(true);
    expect(
      Exit.isFailure(
        Schema.decodeExit(CompiledContentRequirementsSchema)(
          capability.supportedComponents
        )
      )
    ).toBe(true);
  });

  it("rejects invalid names, incomplete pins, duplicates, and empty sets", () => {
    expect(() =>
      Schema.decodeSync(RendererCapabilitySchema)({
        authoringComponents: [{ name: "Block-Math", version: 1 }],
        supportedComponents: [{ name: "Block-Math", version: 1 }],
      })
    ).toThrow("Expected a component name matching");
    expect(() =>
      Schema.decodeSync(RendererManifestAuthoringComponentsSchema)([
        { name: "BlockMath", version: 1 },
        { name: "BlockMath", version: 2 },
      ])
    ).toThrow("Expected exactly one authoring version");
    expect(() =>
      Schema.decodeSync(CompiledContentRequirementsSchema)([
        { name: "BlockMath", version: 1 },
        { name: "BlockMath", version: 2 },
      ])
    ).toThrow("Expected at most one version");
    expect(
      Exit.isFailure(
        Schema.decodeExit(RendererCapabilitySchema)({
          authoringComponents: [{ name: "BlockMath", version: 1 }],
          supportedComponents: [
            { name: "BlockMath", version: 1 },
            { name: "InlineMath", version: 1 },
          ],
        })
      )
    ).toBe(true);
    expect(
      Exit.isFailure(
        Schema.decodeExit(RendererCapabilitySchema)({
          authoringComponents: [],
          supportedComponents: [],
        })
      )
    ).toBe(true);
    for (const name of ["Chart.Axis", "block-math", "Block_Math", "$Block"]) {
      expect(
        Exit.isFailure(
          Schema.decodeExit(RendererCapabilitySchema)({
            authoringComponents: [{ name, version: 1 }],
            supportedComponents: [{ name, version: 1 }],
          })
        )
      ).toBe(true);
    }
  });

  it("canonicalizes selected compiler component versions", () => {
    expect(
      canonicalizeRendererAuthoringSelection([
        { name: "BlockMath", version: 1 },
        { name: "InlineMath", version: 2 },
      ])
    ).toBe(
      '[{"name":"BlockMath","version":1},{"name":"InlineMath","version":2}]'
    );
  });
});

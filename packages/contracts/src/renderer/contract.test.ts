import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  CompiledContentRequirementsSchema,
  canonicalizeRendererAuthoringSelection,
  RendererManifestAuthoringComponentsSchema,
  RendererManifestEnvelopeSchema,
  sortRendererComponentRequirements,
} from "#contracts/renderer/contract.js";

describe("renderer", () => {
  it("sorts manifest requirements by name and version", () => {
    expect(
      sortRendererComponentRequirements([
        { name: "TestWidget", version: 2 },
        { name: "BlockMath", version: 1 },
        { name: "TestWidget", version: 1 },
      ])
    ).toEqual([
      { name: "BlockMath", version: 1 },
      { name: "TestWidget", version: 1 },
      { name: "TestWidget", version: 2 },
    ]);
  });

  it("accepts expanding manifest versions but rejects duplicate artifact names", () => {
    const manifest = {
      authoringComponents: [{ name: "TestWidget", version: 1 }],
      format: "nakafa-mdx-renderer-v1",
      hash: `sha256:${"a".repeat(64)}`,
      rendererContractVersion: "1.0.0",
      supportedComponents: [
        { name: "TestWidget", version: 1 },
        { name: "TestWidget", version: 2 },
      ],
    };

    expect(
      Either.isRight(
        Schema.decodeUnknownEither(RendererManifestEnvelopeSchema)(manifest)
      )
    ).toBe(true);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(CompiledContentRequirementsSchema)(
          manifest.supportedComponents
        )
      )
    ).toBe(true);
  });

  it("rejects unsorted or duplicated manifest pairs", () => {
    const decode = Schema.decodeUnknownEither(RendererManifestEnvelopeSchema);
    const hash = `sha256:${"b".repeat(64)}`;

    expect(
      Either.isLeft(
        decode({
          authoringComponents: [
            { name: "BlockMath", version: 1 },
            { name: "NumberLine", version: 1 },
          ],
          format: "nakafa-mdx-renderer-v1",
          hash,
          rendererContractVersion: "1.0.0",
          supportedComponents: [
            { name: "NumberLine", version: 1 },
            { name: "BlockMath", version: 1 },
          ],
        })
      )
    ).toBe(true);
  });

  it("rejects member, hyphenated, underscored, and dollar component names", () => {
    const decode = Schema.decodeUnknownEither(RendererManifestEnvelopeSchema);
    const hash = `sha256:${"c".repeat(64)}`;

    for (const name of ["Chart.Axis", "block-math", "Block_Math", "$Block"]) {
      expect(
        Either.isLeft(
          decode({
            authoringComponents: [{ name, version: 1 }],
            format: "nakafa-mdx-renderer-v1",
            hash,
            rendererContractVersion: "1.0.0",
            supportedComponents: [{ name, version: 1 }],
          })
        )
      ).toBe(true);
    }
  });

  it("requires at least one renderer component in v1", () => {
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(RendererManifestEnvelopeSchema)({
          authoringComponents: [],
          format: "nakafa-mdx-renderer-v1",
          hash: `sha256:${"a".repeat(64)}`,
          rendererContractVersion: "1.0.0",
          supportedComponents: [],
        })
      )
    ).toBe(true);
    expect(
      Either.isRight(
        Schema.decodeUnknownEither(CompiledContentRequirementsSchema)([])
      )
    ).toBe(true);
  });

  it("reports exact component and selection contract failures", () => {
    expect(() =>
      Schema.decodeUnknownSync(RendererManifestEnvelopeSchema)({
        authoringComponents: [{ name: "Block-Math", version: 1 }],
        format: "nakafa-mdx-renderer-v1",
        hash: `sha256:${"a".repeat(64)}`,
        rendererContractVersion: "1.0.0",
        supportedComponents: [{ name: "Block-Math", version: 1 }],
      })
    ).toThrow("Expected a component name matching");
    expect(() =>
      Schema.decodeUnknownSync(RendererManifestAuthoringComponentsSchema)([
        { name: "BlockMath", version: 1 },
        { name: "BlockMath", version: 2 },
      ])
    ).toThrow("Expected exactly one authoring version");
    expect(() =>
      Schema.decodeUnknownSync(CompiledContentRequirementsSchema)([
        { name: "BlockMath", version: 1 },
        { name: "BlockMath", version: 2 },
      ])
    ).toThrow("Expected at most one version");
    expect(() =>
      Schema.decodeUnknownSync(RendererManifestEnvelopeSchema)({
        authoringComponents: [{ name: "BlockMath", version: 1 }],
        format: "nakafa-mdx-renderer-v1",
        hash: `sha256:${"a".repeat(64)}`,
        rendererContractVersion: "1.0.0",
        supportedComponents: [
          { name: "BlockMath", version: 1 },
          { name: "TestWidget", version: 1 },
        ],
      })
    ).toThrow("Expected one supported authoring selection");
  });

  it("canonicalizes the compiler's selected component versions", () => {
    expect(
      canonicalizeRendererAuthoringSelection([
        { name: "BlockMath", version: 1 },
        { name: "TestWidget", version: 2 },
      ])
    ).toBe(
      '[{"name":"BlockMath","version":1},{"name":"TestWidget","version":2}]'
    );
  });
});

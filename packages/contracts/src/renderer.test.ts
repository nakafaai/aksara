import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  CompiledContentRequirementsSchema,
  RendererManifestEnvelopeSchema,
  sortRendererComponentRequirements,
} from "./renderer.js";

describe("renderer", () => {
  it("sorts manifest requirements by name and version", () => {
    expect(
      sortRendererComponentRequirements([
        { name: "NumberLine", version: 2 },
        { name: "BlockMath", version: 1 },
        { name: "NumberLine", version: 1 },
      ])
    ).toEqual([
      { name: "BlockMath", version: 1 },
      { name: "NumberLine", version: 1 },
      { name: "NumberLine", version: 2 },
    ]);
  });

  it("accepts expanding manifest versions but rejects duplicate artifact names", () => {
    const manifest = {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      format: "nakafa-mdx-renderer-v1",
      hash: `sha256:${"a".repeat(64)}`,
      rendererContractVersion: "1.0.0",
      supportedComponents: [
        { name: "BlockMath", version: 1 },
        { name: "BlockMath", version: 2 },
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
});

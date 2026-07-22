import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  canonicalizeRendererManifestContract,
  RendererDomainCapabilitySchema,
  RendererManifestEnvelopeSchema,
  selectRendererDomainCapability,
  sortRendererDomains,
} from "#contracts/renderer/contract";

const hash = `sha256:${"a".repeat(64)}`;
const base = {
  authoringComponents: [{ name: "BlockMath", version: 1 }],
  supportedComponents: [{ name: "BlockMath", version: 1 }],
} as const;
const domains = [
  {
    authoringComponents: [{ name: "AtomShellLab", version: 1 }],
    name: "material-chemistry",
    supportedComponents: [{ name: "AtomShellLab", version: 1 }],
  },
  {
    authoringComponents: [{ name: "FunctionMachine", version: 1 }],
    name: "material-mathematics",
    supportedComponents: [{ name: "FunctionMachine", version: 1 }],
  },
] as const;
const manifest = {
  base,
  domains,
  format: "nakafa-mdx-renderer-v2",
  hash,
  rendererContractVersion: "2.0.0",
} as const;

describe("renderer contract", () => {
  it("selects exactly one route-owned registry", () => {
    const decoded = Schema.decodeUnknownSync(RendererManifestEnvelopeSchema)(
      manifest
    );
    expect(
      selectRendererDomainCapability(decoded, "material-chemistry").name
    ).toBe("material-chemistry");
    expect(
      selectRendererDomainCapability(decoded, "material-mathematics").name
    ).toBe("material-mathematics");
  });

  it("requires canonical domains and one registry owner per component", () => {
    const decode = Schema.decodeUnknownEither(RendererManifestEnvelopeSchema);
    expect(
      Either.isLeft(decode({ ...manifest, domains: [...domains].reverse() }))
    ).toBe(true);
    expect(
      Either.isLeft(
        decode({
          ...manifest,
          domains: [
            {
              ...domains[0],
              authoringComponents: [{ name: "BlockMath", version: 1 }],
              supportedComponents: [{ name: "BlockMath", version: 1 }],
            },
            domains[1],
          ],
        })
      )
    ).toBe(true);
  });

  it("explains incomplete capabilities in every domain schema", () => {
    const incompleteChemistry = {
      ...domains[0],
      supportedComponents: [
        ...domains[0].supportedComponents,
        { name: "MissingChemistry", version: 1 },
      ],
    };
    const incompleteMathematics = {
      ...domains[1],
      supportedComponents: [
        ...domains[1].supportedComponents,
        { name: "MissingMathematics", version: 1 },
      ],
    };
    const capability = Schema.decodeUnknownEither(
      RendererDomainCapabilitySchema
    )(incompleteChemistry);
    const chemistry = Schema.decodeUnknownEither(
      RendererManifestEnvelopeSchema
    )({
      ...manifest,
      domains: [incompleteChemistry, domains[1]],
    });
    const mathematics = Schema.decodeUnknownEither(
      RendererManifestEnvelopeSchema
    )({
      ...manifest,
      domains: [domains[0], incompleteMathematics],
    });

    expect(Either.isLeft(capability)).toBe(true);
    if (Either.isLeft(capability)) {
      expect(String(capability.left)).toContain(
        "Expected one supported authoring selection"
      );
    }
    expect(Either.isLeft(chemistry)).toBe(true);
    if (Either.isLeft(chemistry)) {
      expect(String(chemistry.left)).toContain(
        "Expected one supported authoring selection"
      );
    }
    expect(Either.isLeft(mathematics)).toBe(true);
    if (Either.isLeft(mathematics)) {
      expect(String(mathematics.left)).toContain(
        "Expected one supported authoring selection"
      );
    }
  });

  it("canonicalizes domain order independently from caller order", () => {
    const expected =
      '["nakafa-mdx-renderer-v2","2.0.0",{"authoringComponents":[{"name":"BlockMath","version":1}],"supportedComponents":[{"name":"BlockMath","version":1}]},[{"name":"material-chemistry","authoringComponents":[{"name":"AtomShellLab","version":1}],"supportedComponents":[{"name":"AtomShellLab","version":1}]},{"name":"material-mathematics","authoringComponents":[{"name":"FunctionMachine","version":1}],"supportedComponents":[{"name":"FunctionMachine","version":1}]}]]';
    expect(canonicalizeRendererManifestContract({ base, domains })).toBe(
      expected
    );
    expect(
      canonicalizeRendererManifestContract({
        base,
        domains: [...domains].reverse(),
      })
    ).toBe(expected);
    expect(sortRendererDomains([domains[0], domains[0]])).toEqual([
      domains[0],
      domains[0],
    ]);
  });
});

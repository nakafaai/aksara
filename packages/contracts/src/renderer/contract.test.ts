import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  canonicalizeRendererManifestContract,
  RendererDomainCapabilitySchema,
  RendererManifestEnvelopeSchema,
  selectRendererDomainCapability,
  sortRendererDomains,
} from "#contracts/renderer/contract";
import {
  RENDERER_DOMAINS,
  type RendererDomain,
} from "#contracts/renderer/domain";
import type { RendererDomainInput } from "#contracts/renderer/selection";

const hash = `sha256:${"a".repeat(64)}`;
const base = {
  authoringComponents: [{ name: "BlockMath", version: 1 }],
  supportedComponents: [{ name: "BlockMath", version: 1 }],
} as const;

/** Creates one canonical domain, including the two currently implemented labs. */
function domainCapability(name: RendererDomain) {
  let componentName: string | undefined;
  if (name === "chemistry") {
    componentName = "AtomShellLab";
  }
  if (name === "mathematics") {
    componentName = "FunctionMachine";
  }
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

const domains = RENDERER_DOMAINS.map(domainCapability);
const manifest = {
  base,
  domains,
  format: "nakafa-mdx-renderer-v1",
  hash,
  rendererContractVersion: "1.0.0",
} as const;

/** Reads one canonical test domain without weakening its literal identity. */
function findDomain(name: RendererDomain) {
  const domain = domains.find((candidate) => candidate.name === name);
  if (!domain) {
    throw new Error(`Missing test renderer domain: ${name}`);
  }
  return domain;
}

/** Replaces one domain while preserving the canonical domain tuple. */
function replaceDomain(name: RendererDomain, replacement: RendererDomainInput) {
  return domains.map((domain) => (domain.name === name ? replacement : domain));
}

describe("renderer contract", () => {
  it("selects every route-owned registry without a binary domain branch", () => {
    const decoded = Schema.decodeUnknownSync(RendererManifestEnvelopeSchema)(
      manifest
    );
    expect(
      RENDERER_DOMAINS.map(
        (name) => selectRendererDomainCapability(decoded, name).name
      )
    ).toEqual(RENDERER_DOMAINS);
  });

  it("requires every canonical domain while allowing empty capabilities", () => {
    const decode = Schema.decodeUnknownEither(RendererManifestEnvelopeSchema);
    const incomplete = decode({
      ...manifest,
      domains: domains.slice(0, -1),
    });
    expect(Either.isRight(decode(manifest))).toBe(true);
    expect(
      Either.isLeft(decode({ ...manifest, domains: [...domains].reverse() }))
    ).toBe(true);
    expect(Either.isLeft(incomplete)).toBe(true);
    if (Either.isLeft(incomplete)) {
      expect(String(incomplete.left)).toContain(
        "Expected every renderer domain in canonical order."
      );
    }
  });

  it("keeps base names disjoint while allowing cross-domain names", () => {
    const decode = Schema.decodeUnknownEither(RendererManifestEnvelopeSchema);
    const colliding = {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      name: "chemistry",
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    } as const;
    expect(
      Either.isLeft(
        decode({
          ...manifest,
          domains: replaceDomain("chemistry", colliding),
        })
      )
    ).toBe(true);
    const shared = {
      authoringComponents: [{ name: "SharedChart", version: 1 }],
      name: "chemistry",
      supportedComponents: [{ name: "SharedChart", version: 1 }],
    } as const;
    const sharedMathematics = { ...shared, name: "mathematics" } as const;
    const sharedDomains = replaceDomain("chemistry", shared).map((domain) =>
      domain.name === "mathematics" ? sharedMathematics : domain
    );
    expect(
      Either.isRight(decode({ ...manifest, domains: sharedDomains }))
    ).toBe(true);
  });

  it("explains incomplete domain capabilities", () => {
    const chemistry = findDomain("chemistry");
    const incomplete = {
      ...chemistry,
      supportedComponents: [
        ...chemistry.supportedComponents,
        { name: "MissingChemistry", version: 1 },
      ],
    };
    const capability = Schema.decodeUnknownEither(
      RendererDomainCapabilitySchema
    )(incomplete);
    const envelope = Schema.decodeUnknownEither(RendererManifestEnvelopeSchema)(
      { ...manifest, domains: replaceDomain("chemistry", incomplete) }
    );
    expect(Either.isLeft(capability)).toBe(true);
    if (Either.isLeft(capability)) {
      expect(String(capability.left)).toContain(
        "Expected one supported authoring selection"
      );
    }
    expect(Either.isLeft(envelope)).toBe(true);
  });

  it("canonicalizes domain order independently from caller order", () => {
    const expected =
      '["nakafa-mdx-renderer-v1","1.0.0",{"authoringComponents":[{"name":"BlockMath","version":1}],"supportedComponents":[{"name":"BlockMath","version":1}]},[{"name":"ai-ds","authoringComponents":[],"supportedComponents":[]},{"name":"biology","authoringComponents":[],"supportedComponents":[]},{"name":"chemistry","authoringComponents":[{"name":"AtomShellLab","version":1}],"supportedComponents":[{"name":"AtomShellLab","version":1}]},{"name":"mathematics","authoringComponents":[{"name":"FunctionMachine","version":1}],"supportedComponents":[{"name":"FunctionMachine","version":1}]},{"name":"physics","authoringComponents":[],"supportedComponents":[]},{"name":"politics","authoringComponents":[],"supportedComponents":[]},{"name":"snbt-general","authoringComponents":[],"supportedComponents":[]},{"name":"snbt-math","authoringComponents":[],"supportedComponents":[]},{"name":"snbt-plain","authoringComponents":[],"supportedComponents":[]},{"name":"snbt-quant","authoringComponents":[],"supportedComponents":[]},{"name":"tka-math","authoringComponents":[],"supportedComponents":[]}]]';
    expect(canonicalizeRendererManifestContract({ base, domains })).toBe(
      expected
    );
    expect(
      canonicalizeRendererManifestContract({
        base,
        domains: [...domains].reverse(),
      })
    ).toBe(expected);
    const chemistry = findDomain("chemistry");
    expect(sortRendererDomains([chemistry, chemistry])).toEqual([
      chemistry,
      chemistry,
    ]);
  });
});

import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Exit, Schema } from "effect";
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
const publishedDomains = ["mathematics"] as const;
const manifest = {
  base,
  domains,
  format: "nakafa-mdx-renderer-v1",
  hash,
  publishedDomains,
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
  it("selects every route-owned registry without a binary domain branch", async () => {
    const decoded = Schema.decodeSync(RendererManifestEnvelopeSchema)(manifest);
    const selected = await Effect.runPromise(
      Effect.forEach(RENDERER_DOMAINS, (name) =>
        selectRendererDomainCapability(decoded, name)
      )
    );
    expect(selected.map(({ name }) => name)).toEqual(RENDERER_DOMAINS);
  });

  it("accepts canonical persisted subsets and rejects malformed order", () => {
    const decode = Schema.decodeUnknownExit(RendererManifestEnvelopeSchema);
    const historical = decode({
      ...manifest,
      domains: domains.slice(0, -1),
    });
    expect(Exit.isSuccess(decode(manifest))).toBe(true);
    expect(Exit.isSuccess(historical)).toBe(true);
    const empty = decode({ ...manifest, domains: [] });
    expect(Exit.isFailure(empty)).toBe(true);
    const reversed = decode({
      ...manifest,
      domains: [...domains].reverse(),
    });
    expect(Exit.isFailure(reversed)).toBe(true);
    if (Exit.isFailure(reversed)) {
      expect(String(reversed.cause)).toContain(
        "Expected unique renderer domains in canonical order."
      );
    }
    const duplicated = decode({
      ...manifest,
      domains: domains.flatMap((domain) =>
        domain.name === "chemistry" ? [domain, domain] : [domain]
      ),
    });
    expect(Exit.isFailure(duplicated)).toBe(true);
  });

  it("returns a typed failure for a missing persisted capability", async () => {
    const historical = Schema.decodeSync(RendererManifestEnvelopeSchema)({
      ...manifest,
      domains: domains.filter(({ name }) => name !== "tka-math"),
    });
    const error = await Effect.runPromise(
      selectRendererDomainCapability(historical, "tka-math").pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "RendererDomainCapabilityMissingError",
      rendererDomain: "tka-math",
    });
  });

  it("requires one capability for every published domain", () => {
    const decoded = Schema.decodeExit(RendererManifestEnvelopeSchema)({
      ...manifest,
      domains: domains.filter(({ name }) => name !== "mathematics"),
    });
    expect(Exit.isFailure(decoded)).toBe(true);
    if (Exit.isFailure(decoded)) {
      expect(String(decoded.cause)).toContain(
        "Expected every published renderer domain to have a capability."
      );
    }
  });

  it("requires unique published domains in canonical order", () => {
    const decode = Schema.decodeUnknownExit(RendererManifestEnvelopeSchema);
    const outOfOrder = decode({
      ...manifest,
      publishedDomains: ["mathematics", "chemistry"],
    });
    expect(
      Exit.isSuccess(
        decode({
          ...manifest,
          publishedDomains: ["chemistry", "mathematics"],
        })
      )
    ).toBe(true);
    expect(Exit.isFailure(outOfOrder)).toBe(true);
    if (Exit.isFailure(outOfOrder)) {
      expect(String(outOfOrder.cause)).toContain(
        "Expected unique published renderer domains in canonical order."
      );
    }
    expect(
      Exit.isFailure(
        decode({
          ...manifest,
          publishedDomains: ["mathematics", "mathematics"],
        })
      )
    ).toBe(true);
  });

  it("keeps base names disjoint while allowing cross-domain names", () => {
    const decode = Schema.decodeUnknownExit(RendererManifestEnvelopeSchema);
    const colliding = {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      name: "chemistry",
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    } as const;
    expect(
      Exit.isFailure(
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
      Exit.isSuccess(decode({ ...manifest, domains: sharedDomains }))
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
    const capability = Schema.decodeExit(RendererDomainCapabilitySchema)(
      incomplete
    );
    const envelope = Schema.decodeExit(RendererManifestEnvelopeSchema)({
      ...manifest,
      domains: replaceDomain("chemistry", incomplete),
    });
    expect(Exit.isFailure(capability)).toBe(true);
    if (Exit.isFailure(capability)) {
      expect(String(capability.cause)).toContain(
        "Expected one supported authoring selection"
      );
    }
    expect(Exit.isFailure(envelope)).toBe(true);
  });

  it("canonicalizes domain order independently from caller order", () => {
    const expected =
      '["nakafa-mdx-renderer-v1","1.0.0",{"authoringComponents":[{"name":"BlockMath","version":1}],"supportedComponents":[{"name":"BlockMath","version":1}]},[{"name":"ai-ds","authoringComponents":[],"supportedComponents":[]},{"name":"biology","authoringComponents":[],"supportedComponents":[]},{"name":"chemistry","authoringComponents":[{"name":"AtomShellLab","version":1}],"supportedComponents":[{"name":"AtomShellLab","version":1}]},{"name":"mathematics","authoringComponents":[{"name":"FunctionMachine","version":1}],"supportedComponents":[{"name":"FunctionMachine","version":1}]},{"name":"physics","authoringComponents":[],"supportedComponents":[]},{"name":"politics","authoringComponents":[],"supportedComponents":[]},{"name":"snbt-general","authoringComponents":[],"supportedComponents":[]},{"name":"snbt-math","authoringComponents":[],"supportedComponents":[]},{"name":"snbt-plain","authoringComponents":[],"supportedComponents":[]},{"name":"snbt-quant","authoringComponents":[],"supportedComponents":[]},{"name":"tka-math","authoringComponents":[],"supportedComponents":[]}],["mathematics"]]';
    expect(
      canonicalizeRendererManifestContract({
        base,
        domains,
        publishedDomains,
      })
    ).toBe(expected);
    expect(
      canonicalizeRendererManifestContract({
        base,
        domains: [...domains].reverse(),
        publishedDomains,
      })
    ).toBe(expected);
    const chemistry = findDomain("chemistry");
    expect(sortRendererDomains([chemistry, chemistry])).toEqual([
      chemistry,
      chemistry,
    ]);
  });
});

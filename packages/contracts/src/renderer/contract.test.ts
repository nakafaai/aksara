import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";
import {
  canonicalizeRendererManifestContract,
  type RendererDomainCapability,
  RendererManifestEnvelopeSchema,
  selectRendererDomainCapability,
  sortRendererDomains,
} from "#contracts/renderer/contract";
import {
  RENDERER_DOMAINS,
  type RendererDomain,
} from "#contracts/renderer/domain";

const hash = `sha256:${"a".repeat(64)}`;
const base = ["BlockMath"] as const;

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
    return { components: [], name };
  }
  const requirement = componentName;
  return { components: [requirement], name };
}

const domains = RENDERER_DOMAINS.map(domainCapability);
const publishedDomains = ["mathematics"] as const;
const manifest = {
  base,
  domains,
  format: "nakafa-mdx-renderer",
  hash,
  publishedDomains,
} as const;

/** Replaces one domain while preserving the canonical domain tuple. */
function replaceDomain(
  name: RendererDomain,
  replacement: RendererDomainCapability
) {
  return domains.map((domain) => (domain.name === name ? replacement : domain));
}

describe("renderer contract", () => {
  it.effect(
    "selects every route-owned registry without a binary domain branch",
    () =>
      Effect.gen(function* () {
        const decoded = yield* Schema.decodeEffect(
          RendererManifestEnvelopeSchema
        )(manifest);
        const selected = yield* Effect.forEach(RENDERER_DOMAINS, (name) =>
          selectRendererDomainCapability(decoded, name)
        );
        expect(selected.map(({ name }) => name)).toEqual(RENDERER_DOMAINS);
      })
  );

  it("requires the complete domain set exactly once in canonical order", () => {
    const decode = Schema.decodeUnknownExit(RendererManifestEnvelopeSchema);
    const incomplete = decode({
      ...manifest,
      domains: domains.slice(0, -1),
    });
    expect(Exit.isSuccess(decode(manifest))).toBe(true);
    expect(Exit.isFailure(incomplete)).toBe(true);
    const empty = decode({ ...manifest, domains: [] });
    expect(Exit.isFailure(empty)).toBe(true);
    const reversed = decode({
      ...manifest,
      domains: [...domains].reverse(),
    });
    expect(Exit.isFailure(reversed)).toBe(true);
    if (Exit.isFailure(reversed)) {
      expect(String(reversed.cause)).toContain(
        "Expected every renderer domain exactly once in canonical order."
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

  it.effect("rejects a missing capability supplied directly by a caller", () =>
    Effect.gen(function* () {
      const complete = yield* Schema.decodeEffect(
        RendererManifestEnvelopeSchema
      )(manifest);
      const error = yield* selectRendererDomainCapability(
        {
          ...complete,
          domains: complete.domains.filter(({ name }) => name !== "tka-math"),
        },
        "tka-math"
      ).pipe(Effect.flip);
      expect(error).toMatchObject({
        _tag: "RendererDomainCapabilityMissingError",
        rendererDomain: "tka-math",
      });
    })
  );

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
    const colliding = { components: ["BlockMath"], name: "chemistry" } as const;
    expect(
      Exit.isFailure(
        decode({
          ...manifest,
          domains: replaceDomain("chemistry", colliding),
        })
      )
    ).toBe(true);
    const shared = { components: ["SharedChart"], name: "chemistry" } as const;
    const sharedMathematics = { ...shared, name: "mathematics" } as const;
    const sharedDomains = replaceDomain("chemistry", shared).map((domain) =>
      domain.name === "mathematics" ? sharedMathematics : domain
    );
    expect(
      Exit.isSuccess(decode({ ...manifest, domains: sharedDomains }))
    ).toBe(true);
  });

  it("canonicalizes domain order independently from caller order", () => {
    const expected = JSON.stringify([
      "nakafa-mdx-renderer",
      ["BlockMath"],
      [
        { components: [], name: "ai-ds" },
        { components: [], name: "biology" },
        { components: ["AtomShellLab"], name: "chemistry" },
        { components: ["FunctionMachine"], name: "mathematics" },
        { components: [], name: "physics" },
        { components: [], name: "politics" },
        { components: [], name: "site" },
        { components: [], name: "snbt-general" },
        { components: [], name: "snbt-math" },
        { components: [], name: "snbt-plain" },
        { components: [], name: "snbt-quant" },
        { components: [], name: "tka-math" },
      ],
      ["mathematics"],
    ]);
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
    const chemistry = domainCapability("chemistry");
    expect(sortRendererDomains([chemistry, chemistry])).toEqual([
      chemistry,
      chemistry,
    ]);
  });
});

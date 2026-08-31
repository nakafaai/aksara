import { createHash } from "node:crypto";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { RendererComponentRequirement } from "@nakafa/aksara-contracts/renderer/component";
import {
  canonicalizeRendererManifestContract,
  type RendererManifestEnvelope,
} from "@nakafa/aksara-contracts/renderer/contract";
import {
  RENDERER_DOMAINS,
  type RendererDomain,
} from "@nakafa/aksara-contracts/renderer/domain";

/** Expands sparse publisher fixtures into every canonical renderer domain. */
export function testRendererDomains(
  components: Readonly<
    Partial<Record<RendererDomain, readonly RendererComponentRequirement[]>>
  >
) {
  return RENDERER_DOMAINS.map((name) => {
    const selected = components[name] ?? [];
    return {
      authoringComponents: selected,
      name,
      supportedComponents: selected,
    };
  });
}

/** Removes one unpublished domain while preserving an authenticated envelope. */
export function historicalRendererManifest(
  manifest: RendererManifestEnvelope
): RendererManifestEnvelope {
  const omitted = manifest.domains.find(
    ({ name }) => !manifest.publishedDomains.includes(name)
  );
  if (omitted === undefined) {
    throw new Error(
      "Historical renderer fixtures require an unpublished domain."
    );
  }
  const domains = manifest.domains.filter(({ name }) => name !== omitted.name);
  const contract = {
    base: manifest.base,
    domains,
    publishedDomains: manifest.publishedDomains,
  };
  return {
    ...manifest,
    domains,
    hash: Sha256HashSchema.make(
      `sha256:${createHash("sha256")
        .update(canonicalizeRendererManifestContract(contract))
        .digest("hex")}`
    ),
  };
}

import { createHash } from "node:crypto";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { RendererComponentName } from "@nakafa/aksara-contracts/renderer/component";
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
    Partial<Record<RendererDomain, readonly RendererComponentName[]>>
  >
) {
  return RENDERER_DOMAINS.map((name) => {
    const selected = components[name] ?? [];
    return { components: selected, name };
  });
}

/** Builds a correctly hashed incomplete envelope to test ingress rejection. */
export function incompleteRendererManifest(
  manifest: RendererManifestEnvelope
): RendererManifestEnvelope {
  const domains = manifest.domains.slice(0, -1);
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

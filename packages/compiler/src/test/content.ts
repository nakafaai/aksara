import type { RendererComponentRequirement } from "@nakafa/aksara-contracts/renderer/component";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { testRendererDomains } from "#compiler/test/renderer";

interface TestRendererManifestInput {
  readonly authoringComponents: readonly RendererComponentRequirement[];
  readonly domains?: Readonly<
    Partial<Record<RendererDomain, readonly RendererComponentRequirement[]>>
  >;
  readonly publishedDomains?: readonly RendererDomain[];
  readonly supportedComponents?: readonly RendererComponentRequirement[];
}

/** Builds one complete renderer manifest Effect for compiler tests. */
export function createTestRendererManifest({
  authoringComponents,
  domains = {},
  publishedDomains = ["mathematics"],
  supportedComponents = authoringComponents,
}: TestRendererManifestInput) {
  return createRendererManifest({
    base: { authoringComponents, supportedComponents },
    domains: testRendererDomains(domains),
    publishedDomains,
  });
}

import type { RendererComponentName } from "@nakafa/aksara-contracts/renderer/component";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { testRendererDomains } from "#compiler/test/renderer";

interface TestRendererManifestInput {
  readonly components: readonly RendererComponentName[];
  readonly domains?: Readonly<
    Partial<Record<RendererDomain, readonly RendererComponentName[]>>
  >;
  readonly publishedDomains?: readonly RendererDomain[];
}

/** Builds one complete renderer manifest Effect for compiler tests. */
export function createTestRendererManifest({
  components,
  domains = {},
  publishedDomains = ["mathematics"],
}: TestRendererManifestInput) {
  return createRendererManifest({
    base: components,
    domains: testRendererDomains(domains),
    publishedDomains,
  });
}

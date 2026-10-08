import type { RendererComponentName } from "@nakafa/aksara-contracts/renderer/component";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { testRendererDomains } from "#compiler/test/renderer";

/** Builds one complete renderer manifest Effect for compiler tests. */
export function createTestRendererManifest({
  components,
  domains = {},
  publishedDomains = ["mathematics"],
}: {
  readonly components: readonly RendererComponentName[];
  readonly domains?: Readonly<
    Partial<Record<RendererDomain, readonly RendererComponentName[]>>
  >;
  readonly publishedDomains?: readonly RendererDomain[];
}) {
  return createRendererManifest({
    base: components,
    domains: testRendererDomains(domains),
    publishedDomains,
  });
}

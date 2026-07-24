import type { RendererComponentRequirement } from "@nakafa/aksara-contracts/renderer/component";
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

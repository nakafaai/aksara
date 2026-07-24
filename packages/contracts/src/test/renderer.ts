import type { RendererComponentRequirement } from "#contracts/renderer/component";
import {
  RENDERER_DOMAINS,
  type RendererDomain,
} from "#contracts/renderer/domain";

/** Expands sparse test requirements into every canonical renderer domain. */
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

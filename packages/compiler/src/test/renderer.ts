import type { RendererComponentName } from "@nakafa/aksara-contracts/renderer/component";
import {
  RENDERER_DOMAINS,
  type RendererDomain,
} from "@nakafa/aksara-contracts/renderer/domain";

/** Expands sparse compiler fixtures into every canonical renderer domain. */
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

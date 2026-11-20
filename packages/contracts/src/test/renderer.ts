import { Array as Arr } from "effect";

import type { RendererComponentName } from "#contracts/renderer/component";
import type { RendererDomain } from "#contracts/renderer/domain";
import { RENDERER_DOMAINS } from "#contracts/renderer/domain";

/** Expands sparse test requirements into every canonical renderer domain. */
export function testRendererDomains(
  components: Readonly<
    Partial<Record<RendererDomain, readonly RendererComponentName[]>>
  >
) {
  return Arr.map(RENDERER_DOMAINS, (name) => {
    const selected = components[name] ?? [];
    return { components: selected, name };
  });
}

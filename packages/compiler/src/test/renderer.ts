import type { RendererComponentName } from "@nakafa/aksara-contracts/renderer/component";
import {
  RENDERER_DOMAINS,
  type RendererDomain,
} from "@nakafa/aksara-contracts/renderer/domain";
import { Array as Arr } from "effect";

/** Expands sparse compiler fixtures into every canonical renderer domain. */
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

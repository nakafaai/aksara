import {
  RENDERER_DOMAINS,
  type RendererDomain,
} from "#contracts/renderer/domain";

interface TestRendererComponent {
  readonly name: string;
  readonly version: number;
}

/** Builds every canonical test renderer domain from explicit implementations. */
export function rendererDomains(
  components: Readonly<Partial<Record<RendererDomain, TestRendererComponent>>>
) {
  return RENDERER_DOMAINS.map((name) => {
    const component = components[name];
    if (!component) {
      return { authoringComponents: [], name, supportedComponents: [] };
    }
    return {
      authoringComponents: [component],
      name,
      supportedComponents: [component],
    };
  });
}

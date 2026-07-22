import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";

/** Builds one test-only renderer domain from one explicit component contract. */
export function rendererDomain(name: RendererDomain, componentName: string) {
  const components = [{ name: componentName, version: 1 }];
  return {
    authoringComponents: components,
    name,
    supportedComponents: components,
  };
}

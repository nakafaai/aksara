import { createHash } from "node:crypto";
import {
  AKSARA_COMPILER_VERSION,
  MDX_COMPILER_VERSION,
} from "@nakafaai/aksara-contracts/content";
import { Sha256HashSchema } from "@nakafaai/aksara-contracts/ids";
import {
  canonicalizeRendererAuthoringSelection,
  sortRendererComponentRequirements,
} from "@nakafaai/aksara-contracts/renderer/component";
import {
  type RendererManifestEnvelope,
  selectRendererDomainCapability,
} from "@nakafaai/aksara-contracts/renderer/contract";
import type { RendererDomain } from "@nakafaai/aksara-contracts/renderer/domain";

/** Stable provider identifier used by the server-owned MDX registry. */
export const MDX_PROVIDER_SOURCE = "nakafa-static-renderer-registry";

const COMPILER_CONFIG = JSON.stringify({
  compilerVersion: AKSARA_COMPILER_VERSION,
  componentDependencyExtraction: "missing-mdx-reference-v1",
  componentResolution: "base-route-domain-selection-v2",
  development: false,
  executablePolicy: "trusted-mdx-policy-v3",
  format: "mdx",
  mdxCompilerVersion: MDX_COMPILER_VERSION,
  metadataExtraction: "metadata-estree-static-v2",
  modulePolicy: "imports-and-reexports-forbidden-v1",
  outputFormat: "function-body",
  plainTextProjection: "mdast-to-string@4.0.0",
  providerImportSource: MDX_PROVIDER_SOURCE,
  remarkPlugins: [
    "remark-gfm@4.0.1",
    "remark-math@6.0.0:singleDollarTextMath=false",
  ],
  syntaxAnalysis: [
    "eslint-scope@9.1.2",
    "estree-util-visit@2.0.0",
    "unist-util-visit@5.1.0",
  ],
});

/** Binds compiler identity to tools plus selected base and domain versions. */
export function createCompilerConfigHash(
  manifest: RendererManifestEnvelope,
  rendererDomain: RendererDomain
) {
  const domain = selectRendererDomainCapability(manifest, rendererDomain);
  const authoringComponents = sortRendererComponentRequirements([
    ...manifest.base.authoringComponents,
    ...domain.authoringComponents,
  ]);
  const selection = canonicalizeRendererAuthoringSelection(authoringComponents);
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256")
      .update(`${COMPILER_CONFIG}\n${rendererDomain}\n${selection}`)
      .digest("hex")}`
  );
}

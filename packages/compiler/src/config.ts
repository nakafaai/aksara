import {
  AKSARA_COMPILER_VERSION,
  MDX_COMPILER_VERSION,
} from "@nakafa/aksara-contracts/content";
import {
  canonicalizeRendererAuthoringSelection,
  sortRendererComponentRequirements,
} from "@nakafa/aksara-contracts/renderer/component";
import {
  type RendererManifestEnvelope,
  selectRendererDomainCapability,
} from "@nakafa/aksara-contracts/renderer/contract";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect } from "effect";
import { hashUtf8 } from "#compiler/hash";

/** Stable provider identifier used by the server-owned MDX registry. */
export const MDX_PROVIDER_SOURCE = "nakafa-static-renderer-registry";

const COMPILER_CONFIG = JSON.stringify({
  compilerVersion: AKSARA_COMPILER_VERSION,
  development: false,
  format: "mdx",
  mdxCompilerVersion: MDX_COMPILER_VERSION,
  outputFormat: "function-body",
  providerImportSource: MDX_PROVIDER_SOURCE,
  remarkGfm: true,
  remarkMath: { singleDollarTextMath: false },
});

/** Binds compiler identity to its central contract and selected renderer. */
export const createCompilerConfigHash = Effect.fn(
  "AksaraCompiler.createCompilerConfigHash"
)(function* (
  manifest: RendererManifestEnvelope,
  rendererDomain: RendererDomain
) {
  const domain = yield* selectRendererDomainCapability(
    manifest,
    rendererDomain
  );
  const authoringComponents = sortRendererComponentRequirements([
    ...manifest.base.authoringComponents,
    ...domain.authoringComponents,
  ]);
  const selection = canonicalizeRendererAuthoringSelection(authoringComponents);
  return hashUtf8(`${COMPILER_CONFIG}\n${rendererDomain}\n${selection}`);
});

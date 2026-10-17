import { hashText } from "@nakafa/aksara-contracts/hash/text";
import type { RendererComponentName } from "@nakafa/aksara-contracts/renderer/component";
import {
  canonicalizeRendererManifestContract,
  type RendererManifestEnvelope,
} from "@nakafa/aksara-contracts/renderer/contract";
import {
  RENDERER_DOMAINS,
  type RendererDomain,
} from "@nakafa/aksara-contracts/renderer/domain";
import { Array as Arr, Effect } from "effect";

/** Expands sparse publisher fixtures into every canonical renderer domain. */
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

/** Builds a correctly hashed incomplete envelope to test ingress rejection. */
export const incompleteRendererManifest = Effect.fn(
  "PublisherTest.incompleteRendererManifest"
)(function* (manifest: RendererManifestEnvelope) {
  const domains = Arr.dropRight(manifest.domains, 1);
  const contract = {
    base: manifest.base,
    domains,
    publishedDomains: manifest.publishedDomains,
  };
  return {
    ...manifest,
    domains,
    hash: yield* hashText(canonicalizeRendererManifestContract(contract)),
  } satisfies RendererManifestEnvelope;
});

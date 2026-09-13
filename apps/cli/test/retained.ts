import { ContentReleaseBundleSchema as AdoptionContentReleaseBundleSchema } from "@nakafa/aksara-contracts/adoption/schema";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import type { RENDERER_DOMAINS } from "@nakafa/aksara-contracts/renderer/domain";
import { Schema } from "effect";
import { RENDERER_MANIFEST } from "#test/real";

export type RetainedDomainName = (typeof RENDERER_DOMAINS)[number];
export interface RetainedInput {
  readonly base: readonly { readonly name: string; readonly version: number }[];
  readonly domains: readonly {
    readonly name: RetainedDomainName;
    readonly supportedComponents: readonly {
      readonly name: string;
      readonly version: number;
    }[];
  }[];
  readonly publishedDomains: readonly RetainedDomainName[];
}

const RETAINED_RENDERER_HASH = Sha256HashSchema.make(
  `sha256:${"9".repeat(64)}`
);

/** Retained 0.39.0 renderer names mirroring the live renderer manifest. */
export const RETAINED_LIVE_INPUT: RetainedInput = {
  base: RENDERER_MANIFEST.base.map((name) => ({ name, version: 1 })),
  domains: RENDERER_MANIFEST.domains.map(({ components, name }) => ({
    name,
    supportedComponents: components.map((component) => ({
      name: component,
      version: 1,
    })),
  })),
  publishedDomains: RENDERER_MANIFEST.publishedDomains,
};

/** Builds one retained 0.39.0 bundle that mirrors one current release state. */
export function retainedBundle(
  release: ContentReleaseBundle["release"],
  input: RetainedInput = RETAINED_LIVE_INPUT
) {
  return Schema.decodeSync(AdoptionContentReleaseBundleSchema)({
    release: {
      keyId: release.keyId,
      manifest: {
        ...release.manifest,
        rendererContractVersion: "1.0.0",
        rendererManifestHash: RETAINED_RENDERER_HASH,
      },
      manifestHash: release.manifestHash,
      signature: release.signature,
    },
    rendererManifest: {
      base: {
        authoringComponents: input.base,
        supportedComponents: input.base,
      },
      domains: input.domains.map(({ name, supportedComponents }) => ({
        authoringComponents: supportedComponents,
        name,
        supportedComponents,
      })),
      format: "nakafa-mdx-renderer-v1",
      hash: RETAINED_RENDERER_HASH,
      publishedDomains: input.publishedDomains,
      rendererContractVersion: "1.0.0",
    },
  });
}

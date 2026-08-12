import { Schema } from "effect";

import {
  Ed25519SignatureSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { ActiveAppLocaleListSchema, type AppLocale } from "#contracts/locale";
import {
  ContentReleaseManifestFields,
  hasCoherentReleaseOrigin,
} from "#contracts/release/manifest/core";
import { SignedContentReleaseSchema } from "#contracts/release/spec";

/** Current global release format with explicit locale and review identity. */
export const CONTENT_RELEASE_V2_FORMAT = "content-release-v2";

/** Deterministic v2 transition with locale and editorial evidence. */
export const ContentReleaseManifestV2Schema = Schema.Struct({
  activeAppLocales: ActiveAppLocaleListSchema,
  ...ContentReleaseManifestFields,
  editorialReviewDigest: Sha256HashSchema,
  format: Schema.Literal(CONTENT_RELEASE_V2_FORMAT),
}).pipe(
  Schema.filter(hasCoherentReleaseOrigin, {
    message: () =>
      "Expected a new release identity and a coherent source origin.",
  })
);
export type ContentReleaseManifestV2 =
  typeof ContentReleaseManifestV2Schema.Type;

/** Immutable v2 release manifest plus asymmetric authenticity proof. */
export const SignedContentReleaseV2Schema = Schema.Struct({
  keyId: SigningKeyIdSchema,
  manifest: ContentReleaseManifestV2Schema,
  manifestHash: Sha256HashSchema,
  signature: Ed25519SignatureSchema,
});
export type SignedContentReleaseV2 = typeof SignedContentReleaseV2Schema.Type;

/** Historical and current signed release decoder for retained consumers. */
export const SignedContentReleaseWireSchema = Schema.Union(
  SignedContentReleaseV2Schema,
  SignedContentReleaseSchema
);
export type SignedContentReleaseWire =
  typeof SignedContentReleaseWireSchema.Type;

/** Checks whether one app locale is active in a current release. */
export function releaseActivatesAppLocale(
  release: SignedContentReleaseV2,
  appLocale: AppLocale
) {
  return release.manifest.activeAppLocales.includes(appLocale);
}

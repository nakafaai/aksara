import { Schema } from "effect";

import {
  type ContentFamily,
  ContentFamilySchema,
  compareContentHeads,
} from "#contracts/content";
import { ContentKeySchema } from "#contracts/ids";
import { ArtifactLocaleSchema } from "#contracts/locale";
import { compareCodeUnits } from "#contracts/text/order";

/** Exact content selection retained only to authenticate predecessor releases. */
export const PredecessorContentPublicationIdentitySchema = Schema.Struct({
  artifactLocale: ArtifactLocaleSchema,
  contentKey: ContentKeySchema,
  family: ContentFamilySchema,
});
export type PredecessorContentPublicationIdentity =
  typeof PredecessorContentPublicationIdentitySchema.Type;

/** Orders predecessor scope identities exactly as their signed release did. */
function comparePredecessorPublicationIdentities(
  left: PredecessorContentPublicationIdentity,
  right: PredecessorContentPublicationIdentity
) {
  const familyOrder = compareCodeUnits(left.family, right.family);
  return familyOrder || compareContentHeads(left, right);
}

/** Accepts only canonical predecessor identities outside selected families. */
export function hasCanonicalPredecessorContent(
  content: readonly PredecessorContentPublicationIdentity[],
  families: readonly ContentFamily[]
) {
  const ordered = content.every((identity, index) => {
    const previous = content[index - 1];
    return (
      previous === undefined ||
      comparePredecessorPublicationIdentities(previous, identity) < 0
    );
  });
  return ordered && content.every(({ family }) => !families.includes(family));
}

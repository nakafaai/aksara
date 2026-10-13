import {
  Array as Arr,
  Effect,
  Order,
  Predicate,
  Record as Rec,
  Schema,
} from "effect";

import type { ItemVersion } from "#contracts/assessment/item";
import type { StimulusVersion } from "#contracts/assessment/stimulus";
import { Sha256MismatchFields } from "#contracts/errors";
import { hashText } from "#contracts/hash/text";
import { encodeJsonText } from "#contracts/text/json";

/** Separates the hash of an item version from the hash of any other record. */
const ITEM_DOMAIN = "nakafa.aksara.assessment-item";

/** Separates the hash of a stimulus version from the hash of any other record. */
const STIMULUS_DOMAIN = "nakafa.aksara.assessment-stimulus";

/**
 * Writes a JSON value as text with the keys of every object in code-unit
 * order, so equal content always has the same bytes whatever order the keys
 * were built in.
 */
export function canonicalJson(value: unknown): string {
  if (Arr.isArray(value)) {
    return `[${Arr.join(
      Arr.map(value, (part) => canonicalJson(part)),
      ","
    )}]`;
  }
  if (Predicate.isObject(value)) {
    const members = Arr.map(
      Arr.sort(Rec.keys(value), Order.String),
      (key) => `${encodeJsonText(key)}:${canonicalJson(value[key])}`
    );
    return `{${Arr.join(members, ",")}}`;
  }
  return encodeJsonText(value);
}

/** A stored hash is not the hash of the content that carries it. */
export class VersionHashMismatchError extends Schema.TaggedError<VersionHashMismatchError>()(
  "VersionHashMismatchError",
  { ...Sha256MismatchFields }
) {}

/** Hashes the canonical encoding of one record under the domain of its kind. */
const hashRecord = (domain: string, record: unknown) =>
  hashText(`${domain}\n${canonicalJson(record)}`);

/** Computes the hash that an item version carries, from all of its other fields. */
export const hashItemVersion = Effect.fn("AksaraContracts.hashItemVersion")(
  (body: Omit<ItemVersion, "hash">) => hashRecord(ITEM_DOMAIN, body)
);

/** Computes the hash that a stimulus version carries, from all of its other fields. */
export const hashStimulusVersion = Effect.fn(
  "AksaraContracts.hashStimulusVersion"
)((body: Omit<StimulusVersion, "hash">) => hashRecord(STIMULUS_DOMAIN, body));

/** Requires an item version to carry the hash of its own content. */
export const verifyItemVersion = Effect.fn("AksaraContracts.verifyItemVersion")(
  function* (version: ItemVersion) {
    const { hash, ...body } = version;
    const actualHash = yield* hashItemVersion(body);
    if (actualHash !== hash) {
      return yield* new VersionHashMismatchError({
        actualHash,
        expectedHash: hash,
      });
    }
  }
);

/** Requires a stimulus version to carry the hash of its own content. */
export const verifyStimulusVersion = Effect.fn(
  "AksaraContracts.verifyStimulusVersion"
)(function* (version: StimulusVersion) {
  const { hash, ...body } = version;
  const actualHash = yield* hashStimulusVersion(body);
  if (actualHash !== hash) {
    return yield* new VersionHashMismatchError({
      actualHash,
      expectedHash: hash,
    });
  }
});

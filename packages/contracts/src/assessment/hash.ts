import {
  Array as Arr,
  Effect,
  Order,
  Predicate,
  Record as Rec,
  Schema,
} from "effect";

import type { ItemVersion } from "#contracts/assessment/item";
import type { Paper } from "#contracts/assessment/paper";
import type { ExamProfile } from "#contracts/assessment/profile";
import type { StimulusVersion } from "#contracts/assessment/stimulus";
import { Sha256MismatchFields } from "#contracts/errors";
import { hashText } from "#contracts/hash/text";
import { encodeJsonText } from "#contracts/text/json";

/** Separates the hash of an item version from the hash of any other record. */
const ITEM_DOMAIN = "nakafa.aksara.assessment-item";

/** Separates the hash of a stimulus version from the hash of any other record. */
const STIMULUS_DOMAIN = "nakafa.aksara.assessment-stimulus";

/** Separates the hash of an exam profile from the hash of any other record. */
const PROFILE_DOMAIN = "nakafa.aksara.assessment-profile";

/** Separates the hash of a paper from the hash of any other record. */
const PAPER_DOMAIN = "nakafa.aksara.assessment-paper";

/**
 * Writes a value that is already known to be JSON as text, with the keys of
 * every object in code-unit order. Every leaf is a string, a finite number, a
 * boolean, or null, so writing it cannot fail.
 */
function writeCanonical(value: unknown): string {
  if (Arr.isArray(value)) {
    return `[${Arr.join(
      Arr.map(value, (part) => writeCanonical(part)),
      ","
    )}]`;
  }
  if (Predicate.isObject(value)) {
    const members = Arr.map(
      Arr.sort(Rec.keys(value), Order.String),
      (key) => `${encodeJsonText(key)}:${writeCanonical(value[key])}`
    );
    return `{${Arr.join(members, ",")}}`;
  }
  return encodeJsonText(value);
}

/**
 * Writes a JSON value as text with the keys of every object in code-unit
 * order, so equal content always has the same bytes whatever order the keys
 * were built in. A value that is not JSON has no canonical text and fails with
 * a schema error: a member that is `undefined`, a date, a number that is not
 * finite, a class instance, or a cycle. Writing any of them as something else
 * would give two different values one text, and so one hash.
 */
export const canonicalJson = Effect.fn("AksaraContracts.canonicalJson")(
  function* (value: unknown) {
    const json = yield* Schema.decodeUnknownEffect(Schema.Json)(value);
    return writeCanonical(json);
  }
);

/** A stored hash is not the hash of the content that carries it. */
export class VersionHashMismatchError extends Schema.TaggedError<
  VersionHashMismatchError,
  { readonly brand: unique symbol }
>()("VersionHashMismatchError", { ...Sha256MismatchFields }) {}

/** Hashes the canonical encoding of one record under the domain of its kind. */
const hashRecord = (domain: string, record: unknown) =>
  canonicalJson(record).pipe(
    Effect.flatMap((canonical) => hashText(`${domain}\n${canonical}`))
  );

/** Computes the hash that an item version carries, from all of its other fields. */
export const hashItemVersion = Effect.fn("AksaraContracts.hashItemVersion")(
  (body: Omit<ItemVersion, "hash">) => hashRecord(ITEM_DOMAIN, body)
);

/** Computes the hash that a stimulus version carries, from all of its other fields. */
export const hashStimulusVersion = Effect.fn(
  "AksaraContracts.hashStimulusVersion"
)((body: Omit<StimulusVersion, "hash">) => hashRecord(STIMULUS_DOMAIN, body));

/**
 * Computes the hash of an exam profile, which a paper names beside its
 * identifier, so a paper follows one exact profile.
 */
export const hashExamProfile = Effect.fn("AksaraContracts.hashExamProfile")(
  (profile: ExamProfile) => hashRecord(PROFILE_DOMAIN, profile)
);

/**
 * Computes the hash of a paper, the name a frozen paper is known by: equal
 * places, profile, and readings have one hash.
 */
export const hashPaper = Effect.fn("AksaraContracts.hashPaper")(
  (paper: Paper) => hashRecord(PAPER_DOMAIN, paper)
);

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

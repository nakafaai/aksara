import { describe, expect, it } from "@effect/vitest";
import { DateTime, Effect, Record as Rec, Schema } from "effect";

import {
  canonicalJson,
  hashItemVersion,
  hashStimulusVersion,
  VersionHashMismatchError,
  verifyItemVersion,
  verifyStimulusVersion,
} from "#contracts/assessment/hash";
import { ItemVersionBodySchema } from "#contracts/assessment/item";
import { StimulusVersionBodySchema } from "#contracts/assessment/stimulus";
import { Sha256HashSchema } from "#contracts/ids";
import {
  decodeStrict,
  doc,
  note,
  paragraph,
  placeInline,
  text,
} from "#contracts/test/assessment/document";

/** SHA-256 of the domain, a newline, and the canonical text, from `shasum -a 256`. */
const ITEM_DIGEST = Sha256HashSchema.make(
  "sha256:812566f633c343caa5d319782a6254f66347c8ded9a9321ebda3b47977c2e57f"
);
const STIMULUS_DIGEST = Sha256HashSchema.make(
  "sha256:ee80e67ae1a373b035ed215b11915bcc2c3c944625dd5be0b42b627559a99b41"
);
const OTHER_DIGEST = Sha256HashSchema.make(`sha256:${"0".repeat(64)}`);

const itemBody = decodeStrict(ItemVersionBodySchema, {
  deliveryLanguage: "en",
  family: "test-item",
  interactions: [{ id: "answer", kind: "textEntry", label: "Answer" }],
  prompt: doc(
    paragraph(text("Name the capital of Indonesia."), placeInline("answer"))
  ),
  scoring: [],
});

const stimulusBody = decodeStrict(StimulusVersionBodySchema, {
  deliveryLanguage: "id",
  document: note("Bacaan."),
  id: "test/passage-1",
});

describe("canonical JSON", () => {
  it.effect(
    "writes the keys of every object in order, whatever order they were built in",
    () =>
      Effect.gen(function* () {
        const ascending = Rec.fromEntries([
          ["a", 1],
          ["b", 2],
        ]);
        const descending = Rec.fromEntries([
          ["b", 2],
          ["a", 1],
        ]);

        expect(Rec.keys(descending)).toEqual(["b", "a"]);
        expect(yield* canonicalJson(descending)).toBe(
          yield* canonicalJson(ascending)
        );
        expect(yield* canonicalJson(descending)).toBe('{"a":1,"b":2}');
        expect(
          yield* canonicalJson({
            "": "z",
            a: 1.5,
            b: [{ c: 'x"y', d: null }, true],
          })
        ).toBe('{"":"z","a":1.5,"b":[{"c":"x\\"y","d":null},true]}');
      })
  );

  it.effect("keeps the order of an array and writes a lone value as JSON", () =>
    Effect.gen(function* () {
      expect(yield* canonicalJson([2, 1])).toBe("[2,1]");
      expect(yield* canonicalJson("é")).toBe('"é"');
      expect(yield* canonicalJson(null)).toBe("null");
    })
  );

  it.effect(
    "fails with a schema error on a value that is not JSON, instead of a defect or of one text for two values",
    () =>
      Effect.gen(function* () {
        const cycle: Record<string, unknown> = {};
        cycle.self = cycle;

        for (const value of [
          undefined,
          { explanation: undefined },
          [undefined],
          DateTime.makeUnsafe(0),
          DateTime.makeUnsafe(1000),
          Number.NaN,
          Number.POSITIVE_INFINITY,
          cycle,
        ]) {
          const error = yield* canonicalJson(value).pipe(Effect.flip);

          expect(Schema.isSchemaError(error)).toBe(true);
        }
      })
  );
});

describe("item version hash", () => {
  it.effect("pins the SHA-256 of the domain and the canonical body", () =>
    Effect.gen(function* () {
      expect(yield* hashItemVersion(itemBody)).toBe(ITEM_DIGEST);
    })
  );

  it.effect("verifies a version that carries the hash of its own content", () =>
    verifyItemVersion({ ...itemBody, hash: ITEM_DIGEST })
  );

  it.effect("makes a change a new version with a new hash", () =>
    Effect.gen(function* () {
      const changed = yield* hashItemVersion({
        ...itemBody,
        deliveryLanguage: decodeStrict(
          ItemVersionBodySchema.fields.deliveryLanguage,
          "id"
        ),
      });

      expect(changed).not.toBe(ITEM_DIGEST);
    })
  );

  it.effect("fails a version whose hash is not the hash of its content", () =>
    Effect.gen(function* () {
      const error = yield* verifyItemVersion({
        ...itemBody,
        hash: OTHER_DIGEST,
      }).pipe(Effect.flip);

      expect(error).toBeInstanceOf(VersionHashMismatchError);
      expect(error).toMatchObject({
        actualHash: ITEM_DIGEST,
        expectedHash: OTHER_DIGEST,
      });
    })
  );
});

describe("stimulus version hash", () => {
  it.effect("pins the SHA-256 of its own domain and the canonical body", () =>
    Effect.gen(function* () {
      expect(yield* hashStimulusVersion(stimulusBody)).toBe(STIMULUS_DIGEST);
      yield* verifyStimulusVersion({ ...stimulusBody, hash: STIMULUS_DIGEST });
    })
  );

  it.effect("fails a version whose hash is not the hash of its content", () =>
    Effect.gen(function* () {
      const error = yield* verifyStimulusVersion({
        ...stimulusBody,
        hash: OTHER_DIGEST,
      }).pipe(Effect.flip);

      expect(error).toBeInstanceOf(VersionHashMismatchError);
      expect(error).toMatchObject({
        actualHash: STIMULUS_DIGEST,
        expectedHash: OTHER_DIGEST,
      });
    })
  );
});

import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { StimulusIdSchema } from "#contracts/assessment/identity";
import {
  StimulusSchema,
  StimulusVersionSchema,
} from "#contracts/assessment/stimulus";
import {
  decodeStrict,
  doc,
  failsStrict,
  note,
  paragraph,
  place,
  text,
} from "#contracts/test/assessment/document";
import { hash } from "#contracts/test/assessment/item";
import { PASSAGE_ID, passageVersion } from "#contracts/test/assessment/passage";

describe("stimuli", () => {
  it("decodes the shared passage of SNBT general knowledge set 10 in Indonesian", () => {
    const stimulus = { id: PASSAGE_ID, versions: [passageVersion] };
    const decoded = decodeStrict(StimulusSchema, stimulus);

    expect(Schema.encodeSync(StimulusSchema)(decoded)).toEqual(stimulus);
  });

  it("is namespaced, so passage-1 of two sets are two stimuli", () => {
    const other =
      "question-bank/tryout/indonesia/snbt/general-knowledge-and-understanding/set-3/passage-1";

    expect(Schema.is(StimulusIdSchema)(PASSAGE_ID)).toBe(true);
    expect(Schema.is(StimulusIdSchema)(other)).toBe(true);
    expect(other).not.toBe(PASSAGE_ID);
    for (const id of [
      "passage-1",
      "/passage-1",
      "set-10/",
      "Set-10/passage-1",
    ]) {
      expect(Schema.is(StimulusIdSchema)(id)).toBe(false);
    }
  });

  it("has one version for each delivery language, and the identifier of the stimulus", () => {
    const english = {
      ...passageVersion,
      deliveryLanguage: "en",
      document: note("Test-only passage (en)."),
      hash: hash("b"),
    };

    expect(
      failsStrict(StimulusSchema, {
        id: PASSAGE_ID,
        versions: [passageVersion, english],
      })
    ).toBe(false);
    expect(
      failsStrict(StimulusSchema, {
        id: PASSAGE_ID,
        versions: [passageVersion, { ...english, deliveryLanguage: "id" }],
      })
    ).toBe(true);
    expect(
      failsStrict(StimulusSchema, {
        id: PASSAGE_ID,
        versions: [passageVersion, { ...english, id: `${PASSAGE_ID}-2` }],
      })
    ).toBe(true);
    expect(failsStrict(StimulusSchema, { id: PASSAGE_ID, versions: [] })).toBe(
      true
    );
  });

  it("is a document that places no interaction, pinned by a hash", () => {
    expect(
      failsStrict(StimulusVersionSchema, {
        ...passageVersion,
        document: doc(paragraph(text("Bacaan.")), place("answer")),
      })
    ).toBe(true);
    const { hash: _hash, ...unhashed } = passageVersion;

    expect(failsStrict(StimulusVersionSchema, unhashed)).toBe(true);
    expect(
      failsStrict(StimulusVersionSchema, { ...passageVersion, hash: "abc" })
    ).toBe(true);
  });
});

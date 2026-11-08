import { assert, describe, it } from "@effect/vitest";
import { Result, Schema } from "effect";

import { SpaceMathObjectSchema } from "#contracts/math/space";

const base = [
  { x: 0, y: 0, z: 0 },
  { x: 2, y: 0, z: 0 },
  { x: 0, y: 2, z: 0 },
];

/** Decodes one space object and returns whether it passed. */
function accepts(fields: Record<string, unknown>) {
  return Result.isSuccess(
    Schema.decodeUnknownResult(SpaceMathObjectSchema)({
      appearance: "primary",
      id: "solid",
      ...fields,
    })
  );
}

describe("prisms and pyramids", () => {
  it("accepts a flat base with an offset or apex off its plane", () => {
    assert.isTrue(
      accepts({ base, kind: "prism", offset: { x: 0, y: 0, z: 1 } })
    );
    assert.isTrue(
      accepts({ apex: { x: 1, y: 1, z: 2 }, base, kind: "pyramid" })
    );
  });

  it("refuses an offset or apex in the base plane", () => {
    assert.isFalse(
      accepts({ base, kind: "prism", offset: { x: 1, y: 1, z: 0 } })
    );
    assert.isFalse(
      accepts({ apex: { x: 1, y: 1, z: 0 }, base, kind: "pyramid" })
    );
  });

  it("refuses a base that repeats a corner, leaves its plane, or has no area", () => {
    const repeated = [...base, { x: 0, y: 0, z: 0 }];
    const bent = [...base, { x: 1, y: 1, z: 1 }];
    const flat = [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
    ];
    for (const face of [repeated, bent, flat]) {
      assert.isFalse(
        accepts({ apex: { x: 0, y: 0, z: 3 }, base: face, kind: "pyramid" })
      );
    }
  });
});

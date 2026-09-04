import { assert, it } from "@effect/vitest";

import { sourceOffsetForStaticMatch } from "#nakafa-content/mdx/offset";

it("maps rendered string matches back to their authored part", () => {
  const candidate = {
    parts: [
      { range: { end: { offset: 3 }, start: { offset: 0 } }, text: "" },
      {
        range: { end: { offset: 12 }, start: { offset: 3 } },
        text: "example",
      },
    ],
    text: "example",
  };
  assert.equal(
    sourceOffsetForStaticMatch(candidate, 0, "example", "---example--"),
    3
  );
  assert.equal(
    sourceOffsetForStaticMatch(candidate, 2, "amp", "---example--"),
    5
  );
  assert.equal(
    sourceOffsetForStaticMatch(candidate, 2, "missing", "---xxxxxxx--"),
    3
  );
  assert.equal(sourceOffsetForStaticMatch(candidate, 2, "", "---example--"), 3);
  assert.equal(
    sourceOffsetForStaticMatch(
      { parts: [{ range: undefined, text: "copy" }], text: "copy" },
      0,
      "copy",
      "copy"
    ),
    undefined
  );
  assert.equal(
    sourceOffsetForStaticMatch(
      {
        parts: [{ range: { start: { offset: 4 } }, text: "copy" }],
        text: "copy",
      },
      0,
      "copy",
      "copy"
    ),
    undefined
  );
  assert.equal(
    sourceOffsetForStaticMatch(
      { parts: [{ range: { start: { offset: 7 } }, text: "a" }], text: "a" },
      2,
      "z",
      ""
    ),
    7
  );
});

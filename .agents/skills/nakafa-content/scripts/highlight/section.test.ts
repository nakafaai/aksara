import { assert, it } from "@effect/vitest";

import { splitHighlightSections } from "#nakafa-content/highlight/section";

it("measures content without parsed children as no sections", () => {
  assert.deepEqual(splitHighlightSections({ type: "root" }, 2), []);
});

it("measures a heading without a level inside the opening section", () => {
  const sections = splitHighlightSections(
    {
      children: [
        { children: [{ type: "text", value: "Intro." }], type: "paragraph" },
        { children: [{ type: "text", value: "Titled." }], type: "heading" },
      ],
      type: "root",
    },
    2
  );

  assert.equal(sections.length, 1);
  assert.equal(sections[0]?.nodes.length, 2);
});

it("splits only at headings at or above the given level", () => {
  const tree = {
    children: [
      { depth: 2, type: "heading" },
      { type: "paragraph" },
      { depth: 3, type: "heading" },
      { type: "paragraph" },
    ],
    type: "root",
  };

  assert.equal(splitHighlightSections(tree, 2).length, 1);
  assert.equal(splitHighlightSections(tree, 6).length, 2);
});

import { assert, it } from "@effect/vitest";

import {
  hasMarkedPhrase,
  splitHighlightSections,
} from "#nakafa-content/highlight/section";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

it("requires a visible phrase inside the rendered emphasis marker", () => {
  for (const source of [
    "<Highlight />",
    "**` `**",
    "<Highlight> </Highlight>",
    '<Highlight><span title="invisible" /></Highlight>',
    "{<Highlight>{null}</Highlight>}",
    '<Lab labels={{ body: <Highlight title="invisible" /> }} />',
    '<Lab labels={{ body: <Highlight><span title="invisible" /></Highlight> }} />',
    '{<Highlight>{" "}</Highlight>}',
    '<Highlight>{false ? "sample space" : null}</Highlight>',
    '<Highlight>{true ? " " : "sample space"}</Highlight>',
    '<Highlight>{visible ? "sample space" : null}</Highlight>',
    '<Highlight>{visible ? "sample space" : " "}</Highlight>',
    '<Highlight>{false && "sample space"}</Highlight>',
  ]) {
    assert.equal(hasMarkedPhrase(parseLessonMdx(source)), false, source);
  }
  for (const source of [
    "**sample space**",
    "<Highlight>{0}</Highlight>",
    "<Highlight>{`sample space`}</Highlight>",
    "**`sample space`**",
    '<Highlight>{"sample space"}</Highlight>',
    "<Highlight><span>sample space</span></Highlight>",
    "<Lab labels={{ body: <Highlight><span>sample space</span></Highlight> }} />",
    '{<Highlight>{"sample space"}</Highlight>}',
    '<Highlight>{true ? "sample space" : null}</Highlight>',
    '<Highlight>{false ? null : "sample space"}</Highlight>',
    '<Highlight>{visible ? "sample space" : "event"}</Highlight>',
    '<Highlight>{"sample " + "space"}</Highlight>',
  ]) {
    assert.equal(hasMarkedPhrase(parseLessonMdx(source)), true, source);
  }
});

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

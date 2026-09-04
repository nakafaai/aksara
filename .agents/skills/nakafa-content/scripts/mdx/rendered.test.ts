import { assert, it } from "@effect/vitest";

import type { MdxAttribute, MdxNode } from "#nakafa-content/mdx/parse";
import {
  directAttributeRange,
  renderedNodeRange,
  renderedSourceRange,
} from "#nakafa-content/mdx/rendered";

it("maps decoded entities and quoted values to authored offsets", () => {
  const source = '"&#65;nda &amp; saya"';
  assert.deepEqual(
    renderedSourceRange(
      {
        end: { offset: source.length },
        start: { offset: 0 },
      },
      "Anda & saya",
      source,
      true
    ),
    {
      end: { offset: source.length - 1 },
      rendered: {
        offsets: [1, 6, 7, 8, 9, 10, 15, 16, 17, 18, 19],
        text: "Anda & saya",
      },
      start: { offset: 1 },
    }
  );

  const adjacent = "&NotEqualTilde;&#65;nda";
  assert.deepEqual(
    renderedSourceRange(
      { end: { offset: adjacent.length }, start: { offset: 0 } },
      "≂̸Anda",
      adjacent
    ).rendered?.offsets,
    [0, 0, adjacent.indexOf("&#65;"), 20, 21, 22]
  );

  const escaped = "\\*Anda";
  assert.deepEqual(
    renderedSourceRange(
      { end: { offset: escaped.length }, start: { offset: 0 } },
      "*Anda",
      escaped
    ).rendered?.offsets,
    [1, 2, 3, 4, 5]
  );

  const continued = "> Anda\n> dapat";
  assert.deepEqual(
    renderedSourceRange(
      {
        end: { offset: continued.length },
        start: { column: 3, offset: 2 },
      },
      "Anda\ndapat",
      continued
    ).rendered?.offsets,
    [2, 3, 4, 5, 6, 9, 10, 11, 12, 13]
  );

  const singleQuoted = "'copy'";
  assert.deepEqual(
    renderedSourceRange(
      { end: { offset: singleQuoted.length }, start: { offset: 0 } },
      "copy",
      singleQuoted,
      true
    ),
    {
      end: { offset: 5 },
      start: { offset: 1 },
    }
  );
});

it("locates direct JSX string attributes with ordinary spacing", () => {
  const source = 'title = "Anda"';
  const attribute: MdxAttribute = {
    name: "title",
    position: { end: { offset: source.length }, start: { offset: 0 } },
    value: "Anda",
  };
  assert.deepEqual(directAttributeRange(attribute, source), {
    end: { offset: source.length - 1 },
    start: { offset: source.indexOf("Anda") },
  });
  assert.equal(directAttributeRange({ value: 1 }, source), undefined);
});

it("combines visible formatted-node leaves", () => {
  const source = "**Sie** &amp; du";
  const node: MdxNode = {
    children: [
      {
        children: [
          {
            position: { end: { offset: 5 }, start: { offset: 2 } },
            type: "text",
            value: "Sie",
          },
        ],
        type: "strong",
      },
      {
        position: { end: { offset: source.length }, start: { offset: 7 } },
        type: "text",
        value: " & du",
      },
    ],
    type: "link",
  };

  assert.deepEqual(renderedNodeRange(node, source), {
    end: { offset: source.length },
    rendered: {
      offsets: [2, 3, 4, 7, 8, 13, 14, 15],
      text: "Sie & du",
    },
    start: { offset: 2 },
  });
  assert.equal(renderedNodeRange({ type: "link" }, source), undefined);
  assert.deepEqual(
    renderedNodeRange(
      {
        children: [
          {
            position: { end: { offset: 4 }, start: { offset: 0 } },
            type: "text",
            value: "text",
          },
        ],
        type: "link",
      },
      "text"
    ),
    {
      end: { offset: 4 },
      rendered: { offsets: [0, 1, 2, 3], text: "text" },
      start: { offset: 0 },
    }
  );
});

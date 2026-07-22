import { createProcessor } from "@mdx-js/mdx";
import { Effect } from "effect";
import type {
  MdxJsxFlowElement,
  MdxJsxTextElement,
  MdxjsEsm,
} from "mdast-util-mdx";
import { describe, expect, it } from "vitest";
import {
  applyMdxEdits,
  removeMdxModule,
  renameMdxElement,
} from "#compiler/normalize/edits";

const SOURCE_PATH = "packages/contents/articles/protocol/en.mdx";

/** Parses protocol-only MDX through the official MDX parser. */
function parse(rawMdx: string) {
  return createProcessor().parse(rawMdx);
}

/** Returns the first parsed import module from protocol-only MDX. */
function importNode(rawMdx: string) {
  const node = parse(rawMdx).children.find(
    (child): child is MdxjsEsm => child.type === "mdxjsEsm"
  );
  if (!node) {
    throw new Error("Expected protocol MDX to contain one import module.");
  }
  return node;
}

/** Returns the first parsed flow or text JSX element. */
function jsxNode(rawMdx: string) {
  const nodes: (MdxJsxFlowElement | MdxJsxTextElement)[] = [];
  const pending = [...parse(rawMdx).children];
  while (pending.length > 0) {
    const node = pending.shift();
    if (!node) {
      continue;
    }
    if (
      node.type === "mdxJsxFlowElement" ||
      node.type === "mdxJsxTextElement"
    ) {
      nodes.push(node);
    }
    if ("children" in node) {
      pending.push(...node.children);
    }
  }
  const [node] = nodes;
  if (!node) {
    throw new Error("Expected protocol MDX to contain one JSX element.");
  }
  return node;
}

describe("MDX source edits", () => {
  it.each([
    ['import { Widget } from "./widget"\n\nBody', "Body"],
    ['import { Widget } from "./widget"\r\n\r\nBody', "Body"],
    ['import { Widget } from "./widget"\n  \nBody', "Body"],
    ['import { Widget } from "./widget"\n', ""],
    ['import { Widget } from "./widget"', ""],
  ])(
    "removes one module separator without reformatting body bytes",
    async (rawMdx, expected) => {
      const edit = await Effect.runPromise(
        removeMdxModule(rawMdx, importNode(rawMdx), SOURCE_PATH)
      );
      await expect(
        Effect.runPromise(applyMdxEdits(rawMdx, [edit], SOURCE_PATH))
      ).resolves.toBe(expected);
    }
  );

  it("renames self-closing, paired, and inline elements", async () => {
    const samples = [
      "<Widget />",
      "<Widget>Protocol</Widget>",
      "Text <Widget>protocol</Widget>.",
    ];
    const outputs = await Promise.all(
      samples.map(async (rawMdx) => {
        const edits = await Effect.runPromise(
          renameMdxElement(rawMdx, jsxNode(rawMdx), "OwnedWidget", SOURCE_PATH)
        );
        return Effect.runPromise(applyMdxEdits(rawMdx, edits, SOURCE_PATH));
      })
    );
    expect(outputs).toEqual(
      samples.map((rawMdx) => rawMdx.replaceAll("Widget", "OwnedWidget"))
    );
  });

  it("rejects absent official positions and mismatched edit bytes", async () => {
    const module = importNode('import { Widget } from "./widget"');
    const element = jsxNode("<Widget />");
    const moduleError = await Effect.runPromise(
      removeMdxModule("different", module, SOURCE_PATH).pipe(Effect.flip)
    );
    const elementError = await Effect.runPromise(
      renameMdxElement(
        "<Different />",
        element,
        "OwnedWidget",
        SOURCE_PATH
      ).pipe(Effect.flip)
    );
    expect(moduleError).toMatchObject({ reason: "module-position" });
    expect(elementError).toMatchObject({ reason: "tag-position" });
  });

  it("rejects stale and overlapping edits", async () => {
    const stale = await Effect.runPromise(
      applyMdxEdits(
        "abcd",
        [{ end: 2, expected: "wrong", replacement: "x", start: 0 }],
        SOURCE_PATH
      ).pipe(Effect.flip)
    );
    const overlap = await Effect.runPromise(
      applyMdxEdits(
        "abcd",
        [
          { end: 3, expected: "bc", replacement: "x", start: 1 },
          { end: 4, expected: "cd", replacement: "y", start: 2 },
        ],
        SOURCE_PATH
      ).pipe(Effect.flip)
    );
    expect(stale).toMatchObject({ reason: "edit-content" });
    expect(overlap).toMatchObject({ reason: "overlapping-edit" });
  });
});

import { Effect } from "effect";
import type { Root } from "mdast";
import { describe, expect, it } from "vitest";
import type { NormalizeMdxImportsInput } from "#compiler/normalize/spec";
import { normalizeMdxTree } from "#compiler/normalize/tree";

const RAW_MDX = 'import { Widget } from "./widget"';

/** Builds the smallest exact protocol contract for parsed-tree failures. */
function input(): NormalizeMdxImportsInput {
  return {
    approvedImports: [],
    rawMdx: RAW_MDX,
    relativeModules: [
      {
        exports: [{ componentName: "Widget", exportName: "Widget" }],
        rendererDomain: "politics",
        sourcePath: "packages/contents/articles/protocol/widget.tsx",
      },
    ],
    sourcePath: "packages/contents/articles/protocol/en.mdx",
    sourceRoot: "packages/contents",
  };
}

describe("normalizeMdxTree", () => {
  it("fails closed when an official tree lacks ESTree module data", async () => {
    const tree: Root = {
      children: [{ type: "mdxjsEsm", value: RAW_MDX }],
      type: "root",
    };
    const error = await Effect.runPromise(
      normalizeMdxTree(input(), tree).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ reason: "unknown-module" });
  });
});

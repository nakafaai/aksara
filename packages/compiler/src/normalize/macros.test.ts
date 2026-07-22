import { createProcessor } from "@mdx-js/mdx";
import { Effect } from "effect";
import { visit as visitEstree } from "estree-util-visit";
import type { Root } from "mdast";
import { describe, expect, it } from "vitest";
import { readNodeProgram } from "#compiler/ast/program";
import {
  createMacroEdits,
  type MacroBinding,
  resolveMacroImport,
} from "#compiler/normalize/macros";

const SOURCE_PATH = "packages/contents/articles/protocol/en.mdx";
const COLOR_SOURCE = "@repo/design-system/lib/color";
const CIRCLE_SOURCE =
  "@repo/design-system/components/contents/mathematics/circle";

/** Parses protocol-only MDX through the official processor. */
function parse(rawMdx: string) {
  return createProcessor().parse(rawMdx);
}

/** Reads the first official import declaration in protocol MDX. */
function importDeclaration(rawMdx: string) {
  const tree = parse(rawMdx);
  const module = tree.children.find((node) => node.type === "mdxjsEsm");
  const statement = module ? readNodeProgram(module)?.body[0] : undefined;
  if (statement?.type !== "ImportDeclaration") {
    throw new Error("Expected one parsed import declaration.");
  }
  return statement;
}

/** Resolves one import at the Vitest boundary. */
function resolveImport(rawMdx: string) {
  return Effect.runPromise(
    resolveMacroImport(importDeclaration(rawMdx), SOURCE_PATH)
  );
}

/** Returns one typed import rejection at the Vitest boundary. */
function rejectImport(rawMdx: string) {
  return Effect.runPromise(
    resolveMacroImport(importDeclaration(rawMdx), SOURCE_PATH).pipe(Effect.flip)
  );
}

/** Creates macro edits for one parsed protocol body. */
function createEdits(
  rawMdx: string,
  bindings: readonly MacroBinding[],
  tree: Root = parse(rawMdx)
) {
  return Effect.runPromise(
    createMacroEdits(
      tree,
      rawMdx,
      new Map(
        bindings.map(({ localName, macroName }) => [localName, macroName])
      ),
      new Set(),
      SOURCE_PATH
    )
  );
}

describe("migration macros", () => {
  it("resolves only exact named macro imports", async () => {
    await expect(
      resolveImport(`import { getColor } from "${COLOR_SOURCE}"`)
    ).resolves.toEqual([{ localName: "getColor", macroName: "getColor" }]);
    await expect(
      resolveImport(
        `import { createCircleArcLine, createCircleOutlinePoints } from "${CIRCLE_SOURCE}"`
      )
    ).resolves.toEqual([
      {
        localName: "createCircleArcLine",
        macroName: "createCircleArcLine",
      },
      {
        localName: "createCircleOutlinePoints",
        macroName: "createCircleOutlinePoints",
      },
    ]);
    await expect(
      resolveImport(
        'import { InlineMath } from "@repo/design-system/components/markdown/math"'
      )
    ).resolves.toBeUndefined();
  });

  it.each([
    `import "${COLOR_SOURCE}"`,
    `import getColor from "${COLOR_SOURCE}"`,
    `import * as color from "${COLOR_SOURCE}"`,
  ])("rejects unsupported import shape %s", async (rawMdx) => {
    await expect(rejectImport(rawMdx)).resolves.toMatchObject({
      reason: "import-shape",
    });
  });

  it.each([
    `import { getColor as color } from "${COLOR_SOURCE}"`,
    `import { randomColor } from "${COLOR_SOURCE}"`,
    `import { createCirclePoint } from "${CIRCLE_SOURCE}"`,
  ])("rejects unsupported import binding %s", async (rawMdx) => {
    await expect(rejectImport(rawMdx)).resolves.toMatchObject({
      reason: "import-binding",
    });
  });

  it("leaves a parser-specific non-string source outside the macro seam", async () => {
    const statement = importDeclaration(
      `import { getColor } from "${COLOR_SOURCE}"`
    );
    statement.source.value = null;
    await expect(
      Effect.runPromise(resolveMacroImport(statement, SOURCE_PATH))
    ).resolves.toBeUndefined();
  });

  it("expands only the outer circle call and evaluates nested getColor", async () => {
    const rawMdx =
      '{createCircleArcLine({ color: getColor("CYAN"), radius: 3, startDegrees: 0, sweepDegrees: 90, label: { text: "Arc", progress: 7 / 8 } })}';
    const edits = await createEdits(rawMdx, [
      { localName: "createCircleArcLine", macroName: "createCircleArcLine" },
      { localName: "getColor", macroName: "getColor" },
    ]);
    expect(edits).toHaveLength(1);
    expect(edits[0]?.expected).toContain("createCircleArcLine");
    expect(edits[0]?.replacement).toContain('"color":"#0891b2"');
    expect(edits[0]?.replacement).not.toContain("getColor");
  });

  it("deduplicates repeated tree attachments by exact source range", async () => {
    const rawMdx = '<Protocol color={getColor("CYAN")} />';
    const edits = await createEdits(rawMdx, [
      { localName: "getColor", macroName: "getColor" },
    ]);
    expect(edits).toHaveLength(1);
    expect(edits[0]?.replacement).toBe('"#0891b2"');
  });

  it.each(["{getColor}", '{getColor?.("CYAN")}'])(
    "rejects unsupported imported binding use %s",
    async (rawMdx) => {
      const error = await Effect.runPromise(
        createMacroEdits(
          parse(rawMdx),
          rawMdx,
          new Map([["getColor", "getColor"]]),
          new Set(),
          SOURCE_PATH
        ).pipe(Effect.flip)
      );
      expect(error).toMatchObject({ reason: "unsupported-use" });
    }
  );

  it("rejects a nested arbitrary call without executing it", async () => {
    const rawMdx = "{createCircleOutlinePoints(Math.max(1, 4))}";
    const error = await Effect.runPromise(
      createMacroEdits(
        parse(rawMdx),
        rawMdx,
        new Map([["createCircleOutlinePoints", "createCircleOutlinePoints"]]),
        new Set(),
        SOURCE_PATH
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ reason: "expression" });
  });

  it.each([
    ["{createCircleOutlinePoints(...[4])}", "expression"],
    ['{createCircleOutlinePoints("4")}', "macro-input"],
  ] as const)(
    "rejects invalid outer macro input %s",
    async (rawMdx, reason) => {
      const error = await Effect.runPromise(
        createMacroEdits(
          parse(rawMdx),
          rawMdx,
          new Map([["createCircleOutlinePoints", "createCircleOutlinePoints"]]),
          new Set(),
          SOURCE_PATH
        ).pipe(Effect.flip)
      );
      expect(error).toMatchObject({ reason });
    }
  );

  it("fails closed when official call offsets are absent", async () => {
    const rawMdx = '{getColor("CYAN")}';
    const tree = parse(rawMdx);
    for (const node of tree.children) {
      const program = readNodeProgram(node);
      if (!program) {
        continue;
      }
      visitEstree(program, (candidate) => {
        if (candidate.type === "CallExpression") {
          Reflect.deleteProperty(candidate, "start");
        }
      });
    }
    const error = await Effect.runPromise(
      createMacroEdits(
        tree,
        rawMdx,
        new Map([["getColor", "getColor"]]),
        new Set(),
        SOURCE_PATH
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ reason: "source-position" });
  });
});

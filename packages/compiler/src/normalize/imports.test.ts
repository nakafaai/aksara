import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { compileContent } from "#compiler/compile";
import { normalizeMdxImports } from "#compiler/normalize/imports";
import type { NormalizeMdxImportsInput } from "#compiler/normalize/spec";
import { rendererDomains } from "#compiler/test/renderer";

const SOURCE_ROOT = "packages/contents";
const FUNCTION_SOURCE =
  "packages/contents/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx";
const FUNCTION_MODULE =
  "packages/contents/material/lesson/mathematics/function-composition-inverse-function/function-concept/function-machine.tsx";
const FUNCTION_CONTRACT = "FunctionMachine";
const DESIGN_SOURCE = "@repo/design-system/components/markdown/math";
const CIRCLE_SOURCE =
  "@repo/design-system/components/contents/mathematics/circle";
const LINE_SOURCE =
  "@repo/design-system/components/contents/mathematics/line-equation";
const REAL_FUNCTION_MDX = readFileSync(
  resolve(
    import.meta.dirname,
    "../../../corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/en.mdx"
  ),
  "utf8"
);
const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "InlineMath", version: 1 }],
      supportedComponents: [{ name: "InlineMath", version: 1 }],
    },
    domains: rendererDomains({
      chemistry: { name: "AtomShellLab", version: 1 },
      mathematics: { name: "FunctionMachine", version: 1 },
    }),
  })
);

/** Builds one protocol input without weakening the exact source allowlists. */
function input(
  rawMdx: string,
  overrides: Partial<NormalizeMdxImportsInput> = {}
): NormalizeMdxImportsInput {
  return {
    approvedImports: [{ components: ["InlineMath"], source: DESIGN_SOURCE }],
    rawMdx,
    relativeModules: [
      {
        exports: [
          { componentName: "FunctionMachine", exportName: "FunctionMachine" },
        ],
        rendererDomain: "mathematics",
        sourcePath: FUNCTION_MODULE,
      },
    ],
    sourcePath: FUNCTION_SOURCE,
    sourceRoot: SOURCE_ROOT,
    ...overrides,
  };
}

/** Runs one successful normalizer program at the Vitest boundary. */
function normalize(value: NormalizeMdxImportsInput) {
  return Effect.runPromise(normalizeMdxImports(value));
}

/** Returns one typed normalizer failure at the Vitest boundary. */
function reject(value: NormalizeMdxImportsInput) {
  return Effect.runPromise(normalizeMdxImports(value).pipe(Effect.flip));
}

describe("MDX import normalization", () => {
  it("normalizes and compiles the byte-exact real Function Concept source", async () => {
    const rawMdx = `import { FunctionMachine } from "./function-machine";\n\n${REAL_FUNCTION_MDX}`;
    const result = await normalize(input(rawMdx));
    expect(result).toEqual({
      rawMdx: REAL_FUNCTION_MDX,
      requiredComponents: [FUNCTION_CONTRACT],
    });
    const compiled = await Effect.runPromise(
      compileContent({
        contentKey:
          "material/lesson/mathematics/function-composition-inverse-function/function-concept",
        locale: "en",
        rawMdx: result.rawMdx,
        rendererDomain: "mathematics",
        rendererManifest,
        sourcePath:
          "packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/en.mdx",
      })
    );
    expect(compiled.payload.requiredComponents).toEqual([
      { name: "FunctionMachine", version: 1 },
      { name: "InlineMath", version: 1 },
    ]);
    expect(compiled.payload.rawMdx).toBe(REAL_FUNCTION_MDX);
    const repeated = await normalize(input(result.rawMdx));
    expect(repeated).toEqual({ rawMdx: result.rawMdx, requiredComponents: [] });
  });

  it("removes approved direct imports without renaming registry tags", async () => {
    const rawMdx = `export const metadata = {}\n\nimport { InlineMath } from "${DESIGN_SOURCE}"\n\nProtocol {Math.max(1, 2)} <InlineMath math="x" />`;
    const result = await normalize(input(rawMdx));
    expect(result).toEqual({
      rawMdx:
        'export const metadata = {}\n\nProtocol {Math.max(1, 2)} <InlineMath math="x" />',
      requiredComponents: ["InlineMath"],
    });
  });

  it("expands exact color and circle imports to canonical literals", async () => {
    const rawMdx = [
      `import { createCircleArcLine, createCircleSegmentBoundaryLines } from "${CIRCLE_SOURCE}"`,
      `import { LineEquation } from "${LINE_SOURCE}"`,
      'import { getColor } from "@repo/design-system/lib/color"',
      "",
      "<LineEquation",
      "  data={[",
      '    createCircleArcLine({ color: getColor("ORANGE"), radius: 4, startDegrees: 30, sweepDegrees: 120, label: { text: "Arc", progress: 7 / 8 } }),',
      '    ...createCircleSegmentBoundaryLines({ color: getColor("LIME"), radius: 4, startDegrees: 30, sweepDegrees: 120 }),',
      "  ]}",
      "/>",
    ].join("\n");
    const result = await normalize(
      input(rawMdx, {
        approvedImports: [
          { components: ["InlineMath"], source: DESIGN_SOURCE },
          { components: ["LineEquation"], source: LINE_SOURCE },
        ],
      })
    );
    expect(result.requiredComponents).toEqual(["LineEquation"]);
    expect(result.rawMdx).not.toContain("import ");
    expect(result.rawMdx).not.toContain("createCircle");
    expect(result.rawMdx).not.toContain("getColor");
    expect(result.rawMdx).toContain("#ea580c");
    expect(result.rawMdx).toContain("#65a30d");
  });

  it("normalizes named, default, paired, and inline relative JSX", async () => {
    const sourcePath = "packages/contents/articles/protocol/example/en.mdx";
    const rawMdx = [
      'import { Graph } from "./chart"',
      'import TableChairsAnimation from "./animation"',
      "",
      "<Graph>Protocol</Graph>",
      "",
      "Text <TableChairsAnimation />.",
    ].join("\n");
    const result = await normalize(
      input(rawMdx, {
        relativeModules: [
          {
            exports: [{ componentName: "Graph", exportName: "Graph" }],
            rendererDomain: "politics",
            sourcePath: "packages/contents/articles/protocol/example/chart.tsx",
          },
          {
            exports: [
              {
                componentName: "TableChairsAnimation",
                exportName: "default",
              },
            ],
            rendererDomain: "politics",
            sourcePath:
              "packages/contents/articles/protocol/example/animation.tsx",
          },
        ],
        sourcePath,
      })
    );
    expect(result).toEqual({
      rawMdx: "<Graph>Protocol</Graph>\n\nText <TableChairsAnimation />.",
      requiredComponents: ["Graph", "TableChairsAnimation"],
    });
  });

  it.each([
    [{ sourceRoot: "packages/contents/.." }, "source-path"],
    [
      { sourcePath: "packages/contents/articles/../test/en.mdx" },
      "source-path",
    ],
    [{ sourcePath: "packages/other/articles/test/en.mdx" }, "source-path"],
    [{ sourcePath: "packages/contents/articles/test/en.ts" }, "source-path"],
  ] satisfies readonly [Partial<NormalizeMdxImportsInput>, string][])(
    "rejects invalid document ownership as %s",
    async (overrides, reason) => {
      await expect(reject(input("Protocol", overrides))).resolves.toMatchObject(
        {
          _tag: "MdxImportNormalizationError",
          reason,
        }
      );
    }
  );

  it("surfaces official MDX parser failures", async () => {
    await expect(reject(input("<Broken>"))).resolves.toMatchObject({
      _tag: "MdxImportParseError",
      sourcePath: FUNCTION_SOURCE,
    });
  });

  it("preserves fragments while renaming imported children", async () => {
    const rawMdx =
      'import { FunctionMachine } from "./function-machine"\n\n<><FunctionMachine /></>';
    const result = await normalize(input(rawMdx));
    expect(result.rawMdx).toBe(`<><${FUNCTION_CONTRACT} /></>`);
  });

  it.each([
    ['import "./function-machine"', "side-effect"],
    ['import * as FunctionMachine from "./function-machine"', "namespace"],
    ['import { FunctionMachine as Alias } from "./function-machine"', "alias"],
    ['import { Unknown } from "./function-machine"', "unknown-component"],
    ['import { Widget } from "./missing"', "unresolved"],
    [
      'import { Widget } from "../../../../../../../../../../outside"',
      "escaping",
    ],
    ['import { Widget } from "unknown-package"', "unknown-module"],
  ] as const)("rejects protocol syntax as %s", async (statement, reason) => {
    const error = await reject(input(`${statement}\n\nProtocol`));
    expect(error._tag).toBe("MdxImportNormalizationError");
    if (error._tag === "MdxImportNormalizationError") {
      expect(error.reason).toBe(reason);
    }
  });

  it.each([
    "{FunctionMachine}",
    "<div value={FunctionMachine} />",
    "<FunctionMachine.Part />",
    "<FunctionMachine:Part />",
  ])("rejects non-registry component usage", async (usage) => {
    const rawMdx = `import { FunctionMachine } from "./function-machine"\n\n${usage}`;
    await expect(reject(input(rawMdx))).resolves.toMatchObject({
      binding: "FunctionMachine",
      reason: "unsupported-use",
    });
  });

  it("does not confuse an expression-local shadow with the import binding", async () => {
    const rawMdx = [
      'import { FunctionMachine } from "./function-machine"',
      "",
      "<FunctionMachine />",
      "",
      "{(() => { const FunctionMachine = 1; return FunctionMachine; })()}",
    ].join("\n");
    const result = await normalize(input(rawMdx));
    expect(result.requiredComponents).toEqual([FUNCTION_CONTRACT]);
  });

  it("rejects mixed ESM while official parsing owns duplicate bindings", async () => {
    const mixed = await reject(
      input(
        'import { FunctionMachine } from "./function-machine"\nexport const protocol = true'
      )
    );
    const duplicate = await reject(
      input(
        'import { FunctionMachine } from "./function-machine"\n\nimport { FunctionMachine } from "./function-machine"'
      )
    );
    expect(mixed._tag).toBe("MdxImportNormalizationError");
    expect(duplicate._tag).toBe("MdxImportParseError");
    if (mixed._tag === "MdxImportNormalizationError") {
      expect(mixed.reason).toBe("mixed-module");
    }
  });

  it("rejects ambiguous relative candidates", async () => {
    const sourcePath = "packages/contents/articles/protocol/en.mdx";
    const relativeModules = [
      {
        exports: [{ componentName: "Widget", exportName: "Widget" }],
        rendererDomain: "politics",
        sourcePath: "packages/contents/articles/protocol/widget.tsx",
      },
      {
        exports: [{ componentName: "IndexWidget", exportName: "IndexWidget" }],
        rendererDomain: "politics",
        sourcePath: "packages/contents/articles/protocol/widget/index.tsx",
      },
    ] satisfies NormalizeMdxImportsInput["relativeModules"];
    await expect(
      reject(
        input('import { Widget } from "./widget"', {
          relativeModules,
          sourcePath,
        })
      )
    ).resolves.toMatchObject({ reason: "contract" });
  });
});

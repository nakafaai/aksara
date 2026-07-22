import { createProcessor } from "@mdx-js/mdx";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  createModuleContracts,
  resolveComponentImport,
} from "#compiler/normalize/modules";
import type { NormalizeMdxImportsInput } from "#compiler/normalize/spec";

const SOURCE_PATH = "packages/contents/articles/protocol/en.mdx";
const DESIGN_SOURCE = "@repo/design-system/components/markdown/math";
const MODULE_SOURCE = "packages/contents/articles/protocol/widget.tsx";

/** Builds one exact protocol contract input for module-policy tests. */
function input(
  overrides: Partial<NormalizeMdxImportsInput> = {}
): NormalizeMdxImportsInput {
  return {
    approvedImports: [{ components: ["InlineMath"], source: DESIGN_SOURCE }],
    rawMdx: "Protocol",
    relativeModules: [
      {
        exports: [{ componentName: "Widget", exportName: "Widget" }],
        rendererDomain: "politics",
        sourcePath: MODULE_SOURCE,
      },
    ],
    sourcePath: SOURCE_PATH,
    sourceRoot: "packages/contents",
    ...overrides,
  };
}

/** Returns the first official ESTree import declaration in protocol MDX. */
function importDeclaration(rawMdx: string) {
  const tree = createProcessor().parse(rawMdx);
  const module = tree.children.find((node) => node.type === "mdxjsEsm");
  const statement = module?.data?.estree?.body[0];
  if (statement?.type !== "ImportDeclaration") {
    throw new Error("Expected protocol MDX to contain one import declaration.");
  }
  return statement;
}

/** Returns one typed module-contract construction failure. */
function rejectContracts(value: NormalizeMdxImportsInput) {
  return Effect.runPromise(createModuleContracts(value).pipe(Effect.flip));
}

/** Resolves one parsed declaration through validated module contracts. */
function resolveImport(value: NormalizeMdxImportsInput, rawMdx: string) {
  return Effect.runPromise(
    Effect.gen(function* () {
      const contracts = yield* createModuleContracts(value);
      return yield* resolveComponentImport(
        value,
        contracts,
        importDeclaration(rawMdx)
      );
    })
  );
}

describe("normalization module contracts", () => {
  it.each([
    {
      approvedImports: [
        { components: ["InlineMath"], source: "unknown/module" },
      ],
    },
    { approvedImports: [{ components: [], source: DESIGN_SOURCE }] },
    {
      approvedImports: [{ components: ["inlineMath"], source: DESIGN_SOURCE }],
    },
    {
      approvedImports: [
        { components: ["InlineMath", "InlineMath"], source: DESIGN_SOURCE },
      ],
    },
    {
      approvedImports: [
        { components: ["InlineMath"], source: DESIGN_SOURCE },
        { components: ["BlockMath"], source: DESIGN_SOURCE },
      ],
    },
    {
      approvedImports: [
        { components: ["InlineMath"], source: DESIGN_SOURCE },
        {
          components: ["InlineMath"],
          source: "@repo/design-system/components/markdown/inline",
        },
      ],
    },
  ] as const)(
    "rejects malformed approved import contracts",
    async ({ approvedImports }) => {
      const error = await rejectContracts(input({ approvedImports }));
      expect(error).toMatchObject({
        _tag: "MdxImportNormalizationError",
        reason: "contract",
      });
    }
  );

  it.each([
    { relativeModules: [] },
    {
      relativeModules: [
        { exports: [], rendererDomain: "politics", sourcePath: MODULE_SOURCE },
      ],
    },
    {
      relativeModules: [
        {
          exports: [{ componentName: "Widget", exportName: "Other" }],
          rendererDomain: "politics",
          sourcePath: MODULE_SOURCE,
        },
      ],
    },
    {
      relativeModules: [
        {
          exports: [{ componentName: "widget", exportName: "widget" }],
          rendererDomain: "politics",
          sourcePath: MODULE_SOURCE,
        },
      ],
    },
    {
      relativeModules: [
        {
          exports: [{ componentName: "Widget", exportName: "Widget" }],
          rendererDomain: "politics",
          sourcePath: MODULE_SOURCE,
        },
        {
          exports: [
            { componentName: "OtherWidget", exportName: "OtherWidget" },
          ],
          rendererDomain: "politics",
          sourcePath: MODULE_SOURCE,
        },
      ],
    },
  ] as const)(
    "handles exact relative module inventories",
    async ({ relativeModules }) => {
      if (relativeModules.length === 0) {
        const contracts = await Effect.runPromise(
          createModuleContracts(input({ relativeModules }))
        );
        expect(contracts.relative.size).toBe(0);
        return;
      }
      const error = await rejectContracts(input({ relativeModules }));
      expect(error).toMatchObject({
        _tag: "MdxImportNormalizationError",
        reason: "contract",
      });
    }
  );

  it("resolves explicit TSX paths and default exports", async () => {
    const value = input({
      relativeModules: [
        {
          exports: [{ componentName: "Widget", exportName: "default" }],
          rendererDomain: "politics",
          sourcePath: MODULE_SOURCE,
        },
      ],
    });
    await expect(
      resolveImport(value, 'import Widget from "./widget.tsx"')
    ).resolves.toEqual([
      {
        contractName: "Widget",
        localName: "Widget",
        relative: true,
      },
    ]);
  });

  it("rejects default aliases and backslash escapes", async () => {
    const defaultValue = input({
      relativeModules: [
        {
          exports: [{ componentName: "Widget", exportName: "default" }],
          rendererDomain: "politics",
          sourcePath: MODULE_SOURCE,
        },
      ],
    });
    const contracts = await Effect.runPromise(createModuleContracts(input()));
    const defaultError = await Effect.runPromise(
      resolveComponentImport(
        defaultValue,
        await Effect.runPromise(createModuleContracts(defaultValue)),
        importDeclaration('import Alias from "./widget"')
      ).pipe(Effect.flip)
    );
    const escapeError = await Effect.runPromise(
      resolveComponentImport(
        input(),
        contracts,
        importDeclaration('import { Widget } from "./\\\\widget"')
      ).pipe(Effect.flip)
    );
    expect(defaultError).toMatchObject({ reason: "alias" });
    expect(escapeError).toMatchObject({ reason: "escaping" });
  });

  it("rejects string-named and non-string import sources", async () => {
    const value = input();
    const contracts = await Effect.runPromise(createModuleContracts(value));
    const namedError = await Effect.runPromise(
      resolveComponentImport(
        value,
        contracts,
        importDeclaration('import { "Widget" as Widget } from "./widget"')
      ).pipe(Effect.flip)
    );
    const statement = importDeclaration('import { Widget } from "./widget"');
    statement.source.value = null;
    const sourceError = await Effect.runPromise(
      resolveComponentImport(value, contracts, statement).pipe(Effect.flip)
    );
    expect(namedError).toMatchObject({ reason: "alias" });
    expect(sourceError).toMatchObject({ reason: "unknown-module" });
  });

  it("classifies unapproved default components without calling them aliases", async () => {
    const value = input();
    const contracts = await Effect.runPromise(createModuleContracts(value));
    const error = await Effect.runPromise(
      resolveComponentImport(
        value,
        contracts,
        importDeclaration(`import InlineMath from "${DESIGN_SOURCE}"`)
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ reason: "unknown-component" });
  });

  it("fails closed when a relative renderer name is absent", async () => {
    const value = input();
    const contracts = await Effect.runPromise(createModuleContracts(value));
    const error = await Effect.runPromise(
      resolveComponentImport(
        value,
        { ...contracts, names: new Map() },
        importDeclaration('import { Widget } from "./widget"')
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      binding: "Widget",
      reason: "contract",
    });
  });
});

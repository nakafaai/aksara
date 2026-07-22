import { createHash } from "node:crypto";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { compileContent } from "#compiler/compile";
import { rendererDomains } from "#compiler/test/renderer";

const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;

/** Adds the two real route domains to one base renderer test contract. */
function manifestInput(
  authoringComponents: readonly {
    readonly name: string;
    readonly version: number;
  }[],
  supportedComponents: readonly {
    readonly name: string;
    readonly version: number;
  }[]
) {
  return {
    base: { authoringComponents, supportedComponents },
    domains: rendererDomains({
      chemistry: { name: "AtomShellLab", version: 1 },
      mathematics: { name: "FunctionMachine", version: 1 },
    }),
  };
}

const rendererManifest = await Effect.runPromise(
  createRendererManifest(
    manifestInput(
      [
        { name: "BlockMath", version: 1 },
        { name: "InlineMath", version: 1 },
      ],
      [
        { name: "BlockMath", version: 1 },
        { name: "InlineMath", version: 1 },
        { name: "InlineMath", version: 2 },
      ]
    )
  )
);

const VALID_METADATA = "export const metadata = {}";

/** Prepends valid authored metadata to a test MDX body. */
function withMetadata(body: string, metadata = VALID_METADATA) {
  return `${metadata}\n\n${body}`;
}

/** Compiles test MDX through the public compiler boundary. */
function compileRawMdx(
  rawMdx: string,
  manifest: typeof rendererManifest = rendererManifest,
  rendererDomain: "chemistry" | "mathematics" = "mathematics"
) {
  return Effect.runPromise(
    compileContent({
      contentKey: "test:compile",
      locale: "en",
      rawMdx,
      rendererDomain,
      rendererManifest: manifest,
      sourcePath: "packages/corpus/test/compile/en.mdx",
    })
  );
}

/** Returns the typed compiler failure produced for invalid test MDX. */
function rejectRawMdx(
  rawMdx: string,
  manifest: typeof rendererManifest = rendererManifest,
  rendererDomain: "chemistry" | "mathematics" = "mathematics"
) {
  return Effect.runPromise(
    compileContent({
      contentKey: "test:compile",
      locale: "en",
      rawMdx,
      rendererDomain,
      rendererManifest: manifest,
      sourcePath: "packages/corpus/test/compile/en.mdx",
    }).pipe(Effect.flip)
  );
}

describe("compileContent", () => {
  it("selects the pinned authoring version instead of the newest support", async () => {
    const rawMdx = withMetadata(
      '## Compiler test\n\n<BlockMath math="x" />\n\n<InlineMath math="x" />'
    );
    const { metadata, payload } = await compileRawMdx(rawMdx);
    expect(payload.format).toBe("mdx-function-body-v1");
    expect(payload.compiledCode).toContain("_missingMdxReference");
    expect(payload.requiredComponents).toEqual([
      { name: "BlockMath", version: 1 },
      { name: "InlineMath", version: 1 },
    ]);
    expect(payload.plainText).toContain("Compiler test");
    expect(payload.compiledCode).not.toContain("metadata");
    expect(payload.rawMdx).toBe(rawMdx);
    expect(payload.sourceHash).toBe(
      `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`
    );
    expect(payload.byteLength).toBeGreaterThan(0);
    expect(payload).toMatchObject({
      compilerVersion: "0.1.0",
      mdxCompilerVersion: "3.1.1",
    });
    expect(payload.compilerConfigHash).toMatch(SHA256_PATTERN);
    expect(metadata).toEqual({});
  });

  it("records custom components but leaves h2 and p to the global contract", async () => {
    const { payload } = await compileRawMdx(
      withMetadata('## Heading\n\nParagraph\n\n<BlockMath math="x" />')
    );

    expect(payload.requiredComponents).toEqual([
      { name: "BlockMath", version: 1 },
    ]);
  });

  it("allows only the selected route-domain registry", async () => {
    const mathematics = await compileRawMdx(
      withMetadata("<FunctionMachine />")
    );
    const chemistryError = await rejectRawMdx(
      withMetadata("<FunctionMachine />"),
      rendererManifest,
      "chemistry"
    );

    expect(mathematics.payload.rendererDomain).toBe("mathematics");
    expect(mathematics.payload.requiredComponents).toEqual([
      { name: "FunctionMachine", version: 1 },
    ]);
    expect(chemistryError._tag).toBe("RendererComponentMissingError");
  });

  it("rejects every import before renderer component selection", async () => {
    const error = await rejectRawMdx(
      withMetadata(
        'import { readFile as TestWidget } from "node:fs"\n\n<TestWidget />'
      )
    );

    expect(error._tag).toBe("UnsupportedMdxModuleSyntaxError");
    if (error._tag === "UnsupportedMdxModuleSyntaxError") {
      expect(error.occurrences).toEqual([
        { column: 1, kind: "import", line: 3 },
      ]);
      expect(JSON.stringify(error)).not.toContain("node:fs");
      expect(String(error)).not.toContain("readFile");
    }
  });

  it("fails closed for runtime helper imports", async () => {
    const error = await rejectRawMdx(
      withMetadata(
        'import { getColor } from "./test-helper.ts"\n\n## Protocol Test\n\n{getColor(1)}'
      )
    );

    expect(error._tag).toBe("UnsupportedMdxModuleSyntaxError");
  });

  it("fails when the renderer contract omits a used component", async () => {
    const error = await rejectRawMdx(withMetadata("<UnknownWidget />"));

    expect(error._tag).toBe("RendererComponentMissingError");
  });

  it("fails before component selection when the renderer hash is tampered", async () => {
    const error = await rejectRawMdx(withMetadata('<BlockMath math="x" />'), {
      ...rendererManifest,
      hash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    });

    expect(error._tag).toBe("RendererManifestHashMismatchError");
  });

  it.each([
    ["process", "process", "{process.env.NODE_ENV}"],
    ["import-meta", "import.meta", "{import.meta.url}"],
    ["unknown-free-global", "props", "{props.components.FunctionMachine({})}"],
    ["unknown-free-global", "_missingMdxReference", "{_missingMdxReference()}"],
    [
      "prototype-chain-access",
      "constructor",
      '{[].filter.constructor("return process")()}',
    ],
    [
      "dangerous-jsx-attribute",
      "dangerouslySetInnerHTML",
      '<div dangerouslySetInnerHTML={{ __html: "unsafe" }} />',
    ],
  ] as const)(
    "surfaces typed %s failures",
    async (rule, identifier, rawMdx) => {
      const error = await rejectRawMdx(withMetadata(rawMdx));

      expect(error._tag).toBe("ExecutablePolicyError");
      if (error._tag === "ExecutablePolicyError") {
        expect(error.violations).toContainEqual({ identifier, rule });
      }
    }
  );

  it("keeps ordinary expressions, fragments, and scoped IIFEs", async () => {
    const { payload } = await compileRawMdx(
      withMetadata(
        '<><span>{1 + 2}</span>{(() => { const values = [1, 2]; return values.map((value) => value * 2).join(","); })()}</>'
      )
    );

    expect(payload.compiledCode).toContain("values.map");
  });

  it("wraps malformed authored MDX as a typed compilation failure", async () => {
    const error = await rejectRawMdx(withMetadata("<Unclosed>"));

    expect(error._tag).toBe("MdxCompilationError");
  });

  it("rejects raw MDX above the shared byte ceiling before compilation", async () => {
    const error = await rejectRawMdx(
      withMetadata("x".repeat(MAX_RAW_MDX_BYTES + 1))
    );

    expect(error).toMatchObject({
      _tag: "ContentByteLimitExceededError",
      field: "rawMdx",
      maxBytes: MAX_RAW_MDX_BYTES,
    });
  });
});

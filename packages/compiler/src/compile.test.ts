import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { findPackageJSON } from "node:module";
import { Sha256HashSchema } from "@nakafaai/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafaai/aksara-contracts/limits";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer/manifest";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { compileContent } from "#compiler/compile.js";

const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    authoringComponents: [
      { name: "BlockMath", version: 1 },
      { name: "TestWidget", version: 1 },
    ],
    supportedComponents: [
      { name: "BlockMath", version: 1 },
      { name: "TestWidget", version: 1 },
      { name: "TestWidget", version: 2 },
    ],
  })
);

const VALID_METADATA = "export const metadata = {}";

/** Prepends valid authored metadata to a test MDX body. */
function withMetadata(body: string, metadata = VALID_METADATA) {
  return `${metadata}\n\n${body}`;
}

/** Compiles test MDX through the public compiler boundary. */
function compileRawMdx(
  rawMdx: string,
  manifest: typeof rendererManifest = rendererManifest
) {
  return Effect.runPromise(
    compileContent({
      contentKey: "test:compile",
      locale: "en",
      rawMdx,
      rendererManifest: manifest,
    })
  );
}

/** Returns the typed compiler failure produced for invalid test MDX. */
function rejectRawMdx(
  rawMdx: string,
  manifest: typeof rendererManifest = rendererManifest
) {
  return Effect.runPromise(
    compileContent({
      contentKey: "test:compile",
      locale: "en",
      rawMdx,
      rendererManifest: manifest,
    }).pipe(Effect.flip)
  );
}

/** Reads an installed package version for compiler-identity assertions. */
function installedVersion(packageName: string) {
  const manifestPath = findPackageJSON(packageName, import.meta.url);
  if (!manifestPath) {
    throw new Error(`Cannot resolve installed package ${packageName}`);
  }
  return Schema.decodeUnknownSync(Schema.Struct({ version: Schema.String }))(
    JSON.parse(readFileSync(manifestPath, "utf8"))
  ).version;
}

describe("compileContent", () => {
  it("selects the pinned authoring version instead of the newest support", async () => {
    const rawMdx = withMetadata(
      '## Compiler test\n\n<BlockMath math="x" />\n\n<TestWidget />'
    );
    const payload = await compileRawMdx(rawMdx);
    expect(payload.format).toBe("mdx-function-body-v1");
    expect(payload.compiledCode).toContain("_missingMdxReference");
    expect(payload.requiredComponents).toEqual([
      { name: "BlockMath", version: 1 },
      { name: "TestWidget", version: 1 },
    ]);
    expect(payload.plainText).toContain("Compiler test");
    expect(payload.compiledCode).not.toContain("metadata");
    expect(payload.rawMdx).toBe(rawMdx);
    expect(payload.sourceHash).toBe(
      `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`
    );
    expect(payload.byteLength).toBeGreaterThan(0);
    expect(payload).toMatchObject({
      compilerConfigHash:
        "sha256:c554b9f5a571b66ec9ac46000c7dd88ca7c47b4eba238ef4c04e6a08b21fb349",
      compilerVersion: "0.1.0",
      mdxCompilerVersion: "3.1.1",
    });
  });

  it("binds compiler identity to the installed output-affecting tools", () => {
    expect(
      Object.fromEntries(
        [
          "@mdx-js/mdx",
          "eslint-scope",
          "estree-util-visit",
          "mdast-util-to-string",
          "remark-gfm",
          "remark-math",
          "unist-util-visit",
        ].map((name) => [name, installedVersion(name)])
      )
    ).toEqual({
      "@mdx-js/mdx": "3.1.1",
      "eslint-scope": "9.1.2",
      "estree-util-visit": "2.0.0",
      "mdast-util-to-string": "4.0.0",
      "remark-gfm": "4.0.1",
      "remark-math": "6.0.0",
      "unist-util-visit": "5.1.0",
    });
  });

  it("changes compiler identity only when the authoring selection changes", async () => {
    const supportedV1 = await Effect.runPromise(
      createRendererManifest({
        authoringComponents: [{ name: "TestWidget", version: 1 }],
        supportedComponents: [{ name: "TestWidget", version: 1 }],
      })
    );
    const supportedV1AndV2 = await Effect.runPromise(
      createRendererManifest({
        authoringComponents: [{ name: "TestWidget", version: 1 }],
        supportedComponents: [
          { name: "TestWidget", version: 1 },
          { name: "TestWidget", version: 2 },
        ],
      })
    );
    const authoringV2 = await Effect.runPromise(
      createRendererManifest({
        authoringComponents: [{ name: "TestWidget", version: 2 }],
        supportedComponents: [
          { name: "TestWidget", version: 1 },
          { name: "TestWidget", version: 2 },
        ],
      })
    );
    const rawMdx = withMetadata("<TestWidget />");
    /** Compiles the shared fixture against one renderer manifest. */
    const compileWith = (manifest: typeof supportedV1) =>
      Effect.runPromise(
        compileContent({
          contentKey: "test:contract-migration",
          locale: "en",
          rawMdx,
          rendererManifest: manifest,
        })
      );

    const [beforeExpand, afterExpand, afterMigrate] = await Promise.all([
      compileWith(supportedV1),
      compileWith(supportedV1AndV2),
      compileWith(authoringV2),
    ]);

    expect(beforeExpand.requiredComponents).toEqual([
      { name: "TestWidget", version: 1 },
    ]);
    expect(afterExpand.requiredComponents).toEqual(
      beforeExpand.requiredComponents
    );
    expect(afterExpand.compilerConfigHash).toBe(
      beforeExpand.compilerConfigHash
    );
    expect(afterMigrate.requiredComponents).toEqual([
      { name: "TestWidget", version: 2 },
    ]);
    expect(afterMigrate.compilerConfigHash).not.toBe(
      beforeExpand.compilerConfigHash
    );
  });

  it("records custom components but leaves h2 and p to the global contract", async () => {
    const payload = await compileRawMdx(
      withMetadata('## Heading\n\nParagraph\n\n<BlockMath math="x" />')
    );

    expect(payload.requiredComponents).toEqual([
      { name: "BlockMath", version: 1 },
    ]);
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
        'import { getColor } from "./test-helper.js"\n\n## Protocol Test\n\n{getColor(1)}'
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
    const payload = await compileRawMdx(
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

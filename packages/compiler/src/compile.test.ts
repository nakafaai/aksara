import { createHash } from "node:crypto";
import { assert, describe, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect } from "effect";
import { compileContent } from "#compiler/compile";
import { createTestRendererManifest } from "#compiler/test/content";

const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;
const VALID_METADATA = "export const metadata = {}";

const testRendererManifest = createTestRendererManifest({
  authoringComponents: [
    { name: "BlockMath", version: 1 },
    { name: "InlineMath", version: 1 },
  ],
  domains: {
    chemistry: [{ name: "AtomShellLab", version: 1 }],
    mathematics: [{ name: "FunctionMachine", version: 1 }],
  },
  supportedComponents: [
    { name: "BlockMath", version: 1 },
    { name: "InlineMath", version: 1 },
    { name: "InlineMath", version: 2 },
  ],
});

/** Prepends valid authored metadata to a test MDX body. */
function withMetadata(body: string, metadata = VALID_METADATA) {
  return `${metadata}\n\n${body}`;
}

/** Compiles test MDX with one explicit renderer contract. */
const compileWithManifest = Effect.fn("CompilerTest.compileWithManifest")(
  (
    rawMdx: string,
    rendererManifest: RendererManifestEnvelope,
    rendererDomain: RendererDomain
  ) =>
    compileContent({
      artifactLocale: "en",
      contentKey: "test:compile",
      rawMdx,
      rendererDomain,
      rendererManifest,
      sourcePath: "packages/corpus/test/compile/en.mdx",
    })
);

/** Compiles test MDX through the public compiler Effect interface. */
const compileRawMdx = Effect.fn("CompilerTest.compileRawMdx")(function* (
  rawMdx: string,
  rendererDomain: RendererDomain = "mathematics"
) {
  const rendererManifest = yield* testRendererManifest;
  return yield* compileWithManifest(rawMdx, rendererManifest, rendererDomain);
});

/** Returns the typed compiler failure produced for invalid test MDX. */
const rejectRawMdx = Effect.fn("CompilerTest.rejectRawMdx")(function* (
  rawMdx: string,
  rendererDomain: RendererDomain = "mathematics"
) {
  return yield* Effect.flip(compileRawMdx(rawMdx, rendererDomain));
});

describe("compileContent", () => {
  it.effect("selects the pinned authoring version", () =>
    Effect.gen(function* () {
      const rawMdx = withMetadata(
        '## Compiler test\n\n<BlockMath math="x" />\n\n<InlineMath math="x" />'
      );
      const { metadata, payload } = yield* compileRawMdx(rawMdx);
      assert.strictEqual(payload.format, "mdx-function-body");
      assert.ok(payload.compiledCode.includes("_missingMdxReference"));
      assert.deepStrictEqual(payload.requiredComponents, [
        { name: "BlockMath", version: 1 },
        { name: "InlineMath", version: 1 },
      ]);
      assert.ok(payload.plainText.includes("Compiler test"));
      assert.ok(!payload.compiledCode.includes("metadata"));
      assert.strictEqual(payload.rawMdx, rawMdx);
      assert.strictEqual(
        payload.sourceHash,
        `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`
      );
      assert.ok(payload.byteLength > 0);
      assert.strictEqual(payload.compilerVersion, "0.1.0");
      assert.strictEqual(payload.mdxCompilerVersion, "3.1.1");
      assert.match(payload.compilerConfigHash, SHA256_PATTERN);
      assert.deepStrictEqual(metadata, {});
    })
  );

  it.effect("records only custom component requirements", () =>
    Effect.gen(function* () {
      const { payload } = yield* compileRawMdx(
        withMetadata('## Heading\n\nParagraph\n\n<BlockMath math="x" />')
      );
      assert.deepStrictEqual(payload.requiredComponents, [
        { name: "BlockMath", version: 1 },
      ]);
    })
  );

  it.effect("rejects list items authored as headings", () =>
    Effect.gen(function* () {
      const error = yield* rejectRawMdx(withMetadata("#### 1. First item"));
      assert.strictEqual(error._tag, "AuthoredListHeadingError");
      if (error._tag === "AuthoredListHeadingError") {
        assert.deepStrictEqual(error.occurrences, [
          { column: 1, depth: 4, line: 3, marker: "1." },
        ]);
      }
    })
  );

  it.effect("allows only the selected route domain registry", () =>
    Effect.gen(function* () {
      const mathematics = yield* compileRawMdx(
        withMetadata("<FunctionMachine />")
      );
      const chemistryError = yield* rejectRawMdx(
        withMetadata("<FunctionMachine />"),
        "chemistry"
      );
      assert.strictEqual(mathematics.payload.rendererDomain, "mathematics");
      assert.deepStrictEqual(mathematics.payload.requiredComponents, [
        { name: "FunctionMachine", version: 1 },
      ]);
      assert.strictEqual(chemistryError._tag, "RendererComponentMissingError");
    })
  );

  it.effect("compiles selected components inside rich JSX attributes", () =>
    Effect.gen(function* () {
      const { payload } = yield* compileRawMdx(
        withMetadata(`<AtomShellLab
          title={<>Atomic Shell Model</>}
          description={
            <>
              Separate shell content from the maximum
              <InlineMath math="2n^2" /> capacity.
            </>
          }
          labels={{
            note: <>Shell <InlineMath math="K" /> is full.</>,
          }}
        />`),
        "chemistry"
      );
      assert.deepStrictEqual(payload.requiredComponents, [
        { name: "AtomShellLab", version: 1 },
        { name: "InlineMath", version: 1 },
      ]);
    })
  );

  it.effect("rejects imports before renderer component selection", () =>
    Effect.gen(function* () {
      const error = yield* rejectRawMdx(
        withMetadata(
          'import { readFile as TestWidget } from "node:fs"\n\n<TestWidget />'
        )
      );
      assert.strictEqual(error._tag, "UnsupportedMdxModuleSyntaxError");
      if (error._tag === "UnsupportedMdxModuleSyntaxError") {
        assert.deepStrictEqual(error.occurrences, [
          { column: 1, kind: "import", line: 3 },
        ]);
        assert.ok(!JSON.stringify(error).includes("node:fs"));
        assert.ok(!String(error).includes("readFile"));
      }
    })
  );

  it.effect("fails closed for runtime helper imports", () =>
    Effect.gen(function* () {
      const error = yield* rejectRawMdx(
        withMetadata(
          'import { getColor } from "./test-helper.ts"\n\n## Protocol Test\n\n{getColor(1)}'
        )
      );
      assert.strictEqual(error._tag, "UnsupportedMdxModuleSyntaxError");
    })
  );

  it.effect("fails when a used component is absent", () =>
    Effect.gen(function* () {
      const error = yield* rejectRawMdx(withMetadata("<UnknownWidget />"));
      assert.strictEqual(error._tag, "RendererComponentMissingError");
    })
  );

  it.effect("fails before selection when the renderer hash is tampered", () =>
    Effect.gen(function* () {
      const rendererManifest = yield* testRendererManifest;
      const error = yield* Effect.flip(
        compileWithManifest(
          withMetadata('<BlockMath math="x" />'),
          {
            ...rendererManifest,
            hash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
          },
          "mathematics"
        )
      );
      assert.strictEqual(error._tag, "RendererManifestHashMismatchError");
    })
  );

  it.effect.each([
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
  ] as const)("surfaces typed %s failures", ([rule, identifier, rawMdx]) =>
    Effect.gen(function* () {
      const error = yield* rejectRawMdx(withMetadata(rawMdx));
      assert.strictEqual(error._tag, "ExecutablePolicyError");
      if (error._tag === "ExecutablePolicyError") {
        assert.ok(
          error.violations.some(
            (violation) =>
              violation.identifier === identifier && violation.rule === rule
          )
        );
      }
    })
  );

  it.effect("rejects a runtime prototype escape property", () =>
    Effect.gen(function* () {
      const error = yield* rejectRawMdx(
        withMetadata(
          '{((key) => ({})[key][key]("return process")())("constructor")}'
        )
      );
      assert.strictEqual(error._tag, "ExecutablePolicyError");
      if (error._tag === "ExecutablePolicyError") {
        assert.ok(
          error.violations.some(
            (violation) => violation.rule === "dynamic-property-access"
          )
        );
      }
    })
  );

  it.effect("keeps ordinary expressions, fragments, and scoped IIFEs", () =>
    Effect.gen(function* () {
      const { payload } = yield* compileRawMdx(
        withMetadata(
          '<><span>{1 + 2}</span>{(() => { const values = [1, 2]; return values.map((value) => value * 2).join(","); })()}</>'
        )
      );
      assert.ok(payload.compiledCode.includes("values.map"));
    })
  );

  it.effect("wraps malformed MDX as a typed compilation failure", () =>
    Effect.gen(function* () {
      const error = yield* rejectRawMdx(withMetadata("<Unclosed>"));
      assert.strictEqual(error._tag, "MdxCompilationError");
    })
  );

  it.effect("rejects raw MDX above the byte ceiling", () =>
    Effect.gen(function* () {
      const error = yield* rejectRawMdx(
        withMetadata("x".repeat(MAX_RAW_MDX_BYTES + 1))
      );
      assert.strictEqual(error._tag, "ContentByteLimitExceededError");
      if (error._tag === "ContentByteLimitExceededError") {
        assert.strictEqual(error.field, "rawMdx");
        assert.strictEqual(error.maxBytes, MAX_RAW_MDX_BYTES);
      }
    })
  );
});

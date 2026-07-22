import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { compileContent } from "#compiler/compile";
import { inspectContentSource } from "#compiler/inspect";
import { rendererDomains } from "#compiler/test/renderer";

const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "InlineMath", version: 1 }],
      supportedComponents: [{ name: "InlineMath", version: 1 }],
    },
    domains: rendererDomains({
      mathematics: { name: "FunctionMachine", version: 1 },
    }),
  })
);
const SHA256_PREFIX = /^sha256:/u;

const request = {
  contentKey: "test:inspection",
  locale: "en",
  rawMdx: `export const metadata = { title: "Real title" }\n\n## Body`,
  rendererDomain: "mathematics",
  rendererManifest,
  sourcePath: "packages/corpus/material/test/en.mdx",
};

describe("content source inspection", () => {
  it("returns metadata and stable compiler inputs without emitted code", async () => {
    const first = await Effect.runPromise(inspectContentSource(request));
    const second = await Effect.runPromise(inspectContentSource(request));
    const compiled = await Effect.runPromise(compileContent(request));

    expect(first).toEqual(second);
    expect(first.metadata).toEqual({ title: "Real title" });
    expect(first.sourceHash).toMatch(SHA256_PREFIX);
    expect(first.compilerConfigHash).toMatch(SHA256_PREFIX);
    expect(first.sourceHash).toBe(compiled.payload.sourceHash);
    expect(first.compilerConfigHash).toBe(compiled.payload.compilerConfigHash);
    expect(first).not.toHaveProperty("compiledCode");
  });

  it("keeps malformed MDX in the typed compilation error channel", async () => {
    const error = await Effect.runPromise(
      inspectContentSource({ ...request, rawMdx: "<" }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "MdxCompilationError",
      contentKey: "test:inspection",
    });
  });

  it("rejects oversized source before parsing it", async () => {
    const error = await Effect.runPromise(
      inspectContentSource({
        ...request,
        rawMdx: "x".repeat(MAX_RAW_MDX_BYTES + 1),
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "ContentByteLimitExceededError",
      field: "rawMdx",
      maxBytes: MAX_RAW_MDX_BYTES,
    });
  });

  it("preserves static metadata failures without evaluating source code", async () => {
    const error = await Effect.runPromise(
      inspectContentSource({
        ...request,
        rawMdx: "export const metadata = getMetadata()",
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "AuthoredMetadataSyntaxError",
      reasons: ["dynamic-value"],
    });
  });
});

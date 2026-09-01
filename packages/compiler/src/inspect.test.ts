import { afterEach, assert, describe, it } from "@effect/vitest";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import { Effect } from "effect";
import { compileContent } from "#compiler/compile";
import {
  extractAuthoredBody,
  inspectContentSource,
  inspectHistoricalContentSource,
} from "#compiler/inspect";
import { createTestRendererManifest } from "#compiler/test/content";

const sourcePolicyState = vi.hoisted(() => ({ failTransformer: false }));
vi.mock("#compiler/source-policy", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("#compiler/source-policy")>();
  return {
    ...original,
    /** Adds one deterministic transformer defect for boundary coverage. */
    createSourcePolicy(
      ...input: Parameters<typeof original.createSourcePolicy>
    ) {
      const policy = original.createSourcePolicy(...input);
      if (!sourcePolicyState.failTransformer) {
        return policy;
      }
      return {
        ...policy,
        remarkPlugins: [
          () => () => {
            throw new Error("Source policy transformer failed.");
          },
          ...policy.remarkPlugins,
        ],
      };
    },
  };
});

const SHA256_PREFIX = /^sha256:/u;
const TRANSFORMER_FAILURE = /Source policy transformer failed/u;
const testRequest = createTestRendererManifest({
  authoringComponents: [{ name: "InlineMath", version: 1 }],
  domains: {
    mathematics: [{ name: "FunctionMachine", version: 1 }],
  },
}).pipe(
  Effect.map((rendererManifest) => ({
    artifactLocale: "en",
    contentKey: "test:inspection",
    rawMdx: `export const metadata = { title: "Real title" }\n\n## Body`,
    rendererDomain: "mathematics",
    rendererManifest,
    sourcePath: "packages/corpus/material/test/en.mdx",
  }))
);

afterEach(() => {
  sourcePolicyState.failTransformer = false;
});

describe("content source inspection", () => {
  it.effect(
    "recovers authenticated historical metadata without current source policy",
    () =>
      Effect.gen(function* () {
        const rawMdx =
          'export const metadata = { date: "2026-01-01", title: "Retained" }\n\n#### 1. Retained item';
        const first = yield* inspectHistoricalContentSource({
          contentKey: "test:historical-inspection",
          rawMdx,
        });
        const second = yield* inspectHistoricalContentSource({
          contentKey: "test:historical-inspection",
          rawMdx,
        });
        const invalid = yield* Effect.exit(
          inspectHistoricalContentSource({
            contentKey: "test:historical-inspection",
            extra: true,
            rawMdx,
          })
        );

        assert.deepStrictEqual(first, second);
        assert.strictEqual(first.bodyMdx, "\n\n#### 1. Retained item");
        assert.deepStrictEqual(first.metadata, {
          date: "2026-01-01",
          title: "Retained",
        });
        assert.match(first.sourceHash, SHA256_PREFIX);
        assert.strictEqual(invalid._tag, "Failure");
      })
  );

  it.effect("returns stable metadata and hashes without emitted code", () =>
    Effect.gen(function* () {
      const request = yield* testRequest;
      const first = yield* inspectContentSource(request);
      const second = yield* inspectContentSource(request);
      const compiled = yield* compileContent(request);
      assert.deepStrictEqual(first, second);
      assert.strictEqual(first.bodyMdx, "\n\n## Body");
      assert.deepStrictEqual(first.metadata, { title: "Real title" });
      assert.match(first.sourceHash, SHA256_PREFIX);
      assert.match(first.compilerConfigHash, SHA256_PREFIX);
      assert.strictEqual(first.sourceHash, compiled.payload.sourceHash);
      assert.strictEqual(
        first.compilerConfigHash,
        compiled.payload.compilerConfigHash
      );
      assert.ok(!("compiledCode" in first));
    })
  );

  it.effect("rejects list-shaped headings before reuse decisions", () =>
    Effect.gen(function* () {
      const request = yield* testRequest;
      const error = yield* Effect.flip(
        inspectContentSource({
          ...request,
          rawMdx: `${request.rawMdx}\n\n#### 1. First item`,
        })
      );
      assert.strictEqual(error._tag, "AuthoredListHeadingError");
      if (error._tag === "AuthoredListHeadingError") {
        assert.deepStrictEqual(error.occurrences, [
          { column: 1, depth: 4, line: 5, marker: "1." },
        ]);
      }
    })
  );

  it.effect("keeps malformed MDX in the typed error channel", () =>
    Effect.gen(function* () {
      const request = yield* testRequest;
      const error = yield* Effect.flip(
        inspectContentSource({ ...request, rawMdx: "<" })
      );
      assert.strictEqual(error._tag, "MdxCompilationError");
      if (error._tag === "MdxCompilationError") {
        assert.strictEqual(error.contentKey, "test:inspection");
      }
    })
  );

  it.effect(
    "maps source-policy transformer defects to compilation errors",
    () =>
      Effect.gen(function* () {
        sourcePolicyState.failTransformer = true;
        const request = yield* testRequest;
        const error = yield* Effect.flip(inspectContentSource(request));
        assert.strictEqual(error._tag, "MdxCompilationError");
        if (error._tag === "MdxCompilationError") {
          assert.strictEqual(error.contentKey, "test:inspection");
          assert.match(error.message, TRANSFORMER_FAILURE);
        }
      })
  );

  it.effect("fails when validated metadata has no source range", () =>
    Effect.gen(function* () {
      const request = yield* testRequest;
      const error = yield* Effect.flip(
        extractAuthoredBody(
          ContentKeySchema.make(request.contentKey),
          request.rawMdx,
          undefined
        )
      );
      assert.strictEqual(error._tag, "MdxCompilationError");
      assert.strictEqual(error.cause, "metadata-source-range");
      assert.strictEqual(error.contentKey, request.contentKey);
    })
  );

  it.effect("fails when parser offsets do not match source", () =>
    Effect.gen(function* () {
      const request = yield* testRequest;
      const error = yield* Effect.flip(
        inspectContentSource({
          ...request,
          rawMdx: `\uFEFF${request.rawMdx}`,
        })
      );
      assert.strictEqual(error._tag, "MdxCompilationError");
      if (error._tag === "MdxCompilationError") {
        assert.strictEqual(error.cause, "metadata-source-range");
      }
    })
  );

  it.effect("rejects oversized source before parsing", () =>
    Effect.gen(function* () {
      const request = yield* testRequest;
      const error = yield* Effect.flip(
        inspectContentSource({
          ...request,
          rawMdx: "x".repeat(MAX_RAW_MDX_BYTES + 1),
        })
      );
      assert.strictEqual(error._tag, "ContentByteLimitExceededError");
      if (error._tag === "ContentByteLimitExceededError") {
        assert.strictEqual(error.field, "rawMdx");
        assert.strictEqual(error.maxBytes, MAX_RAW_MDX_BYTES);
      }
    })
  );

  it.effect("preserves static metadata failures without evaluation", () =>
    Effect.gen(function* () {
      const request = yield* testRequest;
      const error = yield* Effect.flip(
        inspectContentSource({
          ...request,
          rawMdx: "export const metadata = getMetadata()",
        })
      );
      assert.strictEqual(error._tag, "AuthoredMetadataSyntaxError");
      if (error._tag === "AuthoredMetadataSyntaxError") {
        assert.deepStrictEqual(error.reasons, ["dynamic-value"]);
      }
    })
  );
});

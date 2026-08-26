import { assert, describe, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { type CompileReason, compileIncremental } from "#compiler/incremental";
import { createTestRendererManifest } from "#compiler/test/content";

const HASH_PATTERN = /^sha256:[a-f0-9]{64}$/;
const RAW_MDX = `export const metadata = {
  zeta: [true, null, 2, "test", { enabled: false }],
  alpha: "compiler protocol",
}

## Compiler protocol

<BlockMath math="x" />`;

/** Builds one renderer manifest Effect for compiler-cache tests. */
function createRendererFixture(blockMathVersion: 1 | 2) {
  return createTestRendererManifest({
    authoringComponents: [{ name: "BlockMath", version: blockMathVersion }],
    domains: {
      chemistry: [{ name: "AtomShellLab", version: 1 }],
      mathematics: [{ name: "FunctionMachine", version: 1 }],
    },
  });
}

const baseRequest = createRendererFixture(1).pipe(
  Effect.map((rendererManifest) => ({
    artifactLocale: "en",
    contentKey: "test:incremental",
    rawMdx: RAW_MDX,
    rendererDomain: "mathematics",
    rendererManifest,
    sourcePath: "packages/corpus/test/incremental/en.mdx",
  }))
);

/** Requires a fresh compile with the expected cache-miss classification. */
const expectCompiled = Effect.fn("IncrementalTest.expectCompiled")(function* (
  request: unknown,
  cache: unknown,
  reason: CompileReason
) {
  const result = yield* compileIncremental(request, cache);
  assert.strictEqual(result.kind, "compiled");
  if (result.kind === "compiled") {
    assert.strictEqual(result.reason, reason);
  }
  return result;
});

describe("incremental compilation", () => {
  it.effect("creates a complete identity and reuses an exact cache", () =>
    Effect.gen(function* () {
      const request = yield* baseRequest;
      const first = yield* expectCompiled(request, undefined, "missing");
      const repeated = yield* expectCompiled(request, undefined, "missing");
      const unchanged = yield* compileIncremental(request, first.cache);
      assert.deepStrictEqual(first.cache.identity, {
        artifactLocale: request.artifactLocale,
        compilerConfigHash: first.cache.identity.compilerConfigHash,
        contentKey: request.contentKey,
        rendererDomain: request.rendererDomain,
        sourceHash: first.cache.identity.sourceHash,
        sourcePath: request.sourcePath,
      });
      assert.match(first.cache.identity.sourceHash, HASH_PATTERN);
      assert.match(first.cache.identity.compilerConfigHash, HASH_PATTERN);
      assert.match(first.cache.identityHash, HASH_PATTERN);
      assert.deepStrictEqual(first.cache, repeated.cache);
      assert.deepStrictEqual(unchanged, {
        cache: first.cache,
        kind: "unchanged",
        result: first.result,
      });
    })
  );

  it.effect("recompiles when any required identity input changes", () =>
    Effect.gen(function* () {
      const request = yield* baseRequest;
      const upgradedManifest = yield* createRendererFixture(2);
      const first = yield* compileIncremental(request);
      const changedRequests = [
        { ...request, contentKey: "test:incremental-other" },
        { ...request, artifactLocale: "id" },
        { ...request, sourcePath: "packages/corpus/test/other/en.mdx" },
        { ...request, rawMdx: `${RAW_MDX}\n\nChanged protocol body.` },
        { ...request, rendererDomain: "chemistry" },
        { ...request, rendererManifest: upgradedManifest },
      ];
      yield* Effect.all(
        changedRequests.map((changedRequest) =>
          expectCompiled(changedRequest, first.cache, "changed").pipe(
            Effect.tap((result) =>
              Effect.sync(() =>
                assert.notStrictEqual(
                  result.cache.identityHash,
                  first.cache.identityHash
                )
              )
            )
          )
        ),
        { concurrency: "unbounded" }
      );
    })
  );

  it.effect("treats malformed and altered local entries as misses", () =>
    Effect.gen(function* () {
      const request = yield* baseRequest;
      const first = yield* compileIncremental(request);
      const badHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);
      const corruptEntries = [
        null,
        { ...first.cache, unexpected: true },
        { ...first.cache, identityHash: badHash },
        { ...first.cache, resultHash: badHash },
        {
          ...first.cache,
          result: {
            ...first.result,
            payload: {
              ...first.result.payload,
              compiledCode: "return { default: () => process.env };",
            },
          },
        },
        {
          ...first.cache,
          result: { ...first.result, metadata: { invalid: undefined } },
        },
        {
          ...first.cache,
          identity: { ...first.cache.identity, unexpected: true },
        },
      ];
      yield* Effect.all(
        corruptEntries.map((cache) =>
          expectCompiled(request, cache, "corrupt").pipe(
            Effect.tap((result) =>
              Effect.sync(() =>
                assert.ok(
                  !result.result.payload.compiledCode.includes("process.env")
                )
              )
            )
          )
        ),
        { concurrency: "unbounded" }
      );
    })
  );

  it.effect("rejects a result belonging to another identity", () =>
    Effect.gen(function* () {
      const request = yield* baseRequest;
      const first = yield* compileIncremental(request);
      const other = yield* compileIncremental({
        ...request,
        contentKey: "test:incremental-other",
      });
      const mixedCache = {
        ...first.cache,
        result: other.cache.result,
        resultHash: other.cache.resultHash,
      };
      yield* expectCompiled(request, mixedCache, "corrupt");
    })
  );

  it.effect("validates source and renderer before cache reuse", () =>
    Effect.gen(function* () {
      const request = yield* baseRequest;
      const first = yield* compileIncremental(request);
      const badHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);
      const rendererError = yield* Effect.flip(
        compileIncremental(
          {
            ...request,
            rendererManifest: { ...request.rendererManifest, hash: badHash },
          },
          first.cache
        )
      );
      const sourceError = yield* Effect.flip(
        compileIncremental(
          { ...request, sourcePath: "/outside.mdx" },
          first.cache
        )
      );
      const headingError = yield* Effect.flip(
        compileIncremental(
          {
            ...request,
            rawMdx: `${request.rawMdx}\n\n#### 1. Invalid heading`,
          },
          first.cache
        )
      );
      assert.strictEqual(
        rendererError._tag,
        "RendererManifestHashMismatchError"
      );
      assert.strictEqual(sourceError._tag, "ContractDecodeError");
      assert.strictEqual(headingError._tag, "AuthoredListHeadingError");
    })
  );
});

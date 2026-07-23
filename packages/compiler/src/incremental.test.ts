import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { rendererDomains } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { type CompileReason, compileIncremental } from "#compiler/incremental";

const HASH_PATTERN = /^sha256:[a-f0-9]{64}$/;
const RAW_MDX = `export const metadata = {
  zeta: [true, null, 2, "test", { enabled: false }],
  alpha: "compiler protocol",
}

## Compiler protocol

<BlockMath math="x" />`;

/** Builds one complete renderer manifest input for compiler-cache tests. */
function manifestInput(blockMathVersion: 1 | 2) {
  return {
    base: {
      authoringComponents: [{ name: "BlockMath", version: blockMathVersion }],
      supportedComponents: [{ name: "BlockMath", version: blockMathVersion }],
    },
    domains: rendererDomains({
      chemistry: [{ name: "AtomShellLab", version: 1 }],
      mathematics: [{ name: "FunctionMachine", version: 1 }],
    }),
  };
}

const rendererManifest = await Effect.runPromise(
  createRendererManifest(manifestInput(1))
);
const upgradedManifest = await Effect.runPromise(
  createRendererManifest(manifestInput(2))
);
const baseRequest = {
  contentKey: "test:incremental",
  locale: "en",
  rawMdx: RAW_MDX,
  rendererDomain: "mathematics",
  rendererManifest,
  sourcePath: "packages/corpus/test/incremental/en.mdx",
};

/** Runs the incremental compiler at the Vitest program boundary. */
function runIncremental(request: unknown, cache?: unknown) {
  return Effect.runPromise(compileIncremental(request, cache));
}

/** Requires a fresh compile with the expected cache-miss classification. */
async function expectCompiled(
  request: unknown,
  cache: unknown,
  reason: CompileReason
) {
  const result = await runIncremental(request, cache);
  expect(result.kind).toBe("compiled");
  if (result.kind === "compiled") {
    expect(result.reason).toBe(reason);
  }
  return result;
}

describe("incremental compilation", () => {
  it("creates a deterministic complete identity and reuses an exact cache", async () => {
    const first = await expectCompiled(baseRequest, undefined, "missing");
    const repeated = await expectCompiled(baseRequest, undefined, "missing");
    const unchanged = await runIncremental(baseRequest, first.cache);

    expect(first.cache.identity).toMatchObject({
      contentKey: baseRequest.contentKey,
      locale: baseRequest.locale,
      rendererDomain: baseRequest.rendererDomain,
      sourcePath: baseRequest.sourcePath,
    });
    expect(first.cache.identity.sourceHash).toMatch(HASH_PATTERN);
    expect(first.cache.identity.compilerConfigHash).toMatch(HASH_PATTERN);
    expect(first.cache.identityHash).toMatch(HASH_PATTERN);
    expect(first.cache).toEqual(repeated.cache);
    expect(unchanged).toEqual({
      cache: first.cache,
      kind: "unchanged",
      result: first.result,
    });
  });

  it("recompiles when any required identity input changes", async () => {
    const first = await runIncremental(baseRequest);
    const changedRequests = [
      { ...baseRequest, contentKey: "test:incremental-other" },
      { ...baseRequest, locale: "id" },
      {
        ...baseRequest,
        sourcePath: "packages/corpus/test/other/en.mdx",
      },
      { ...baseRequest, rawMdx: `${RAW_MDX}\n\nChanged protocol body.` },
      { ...baseRequest, rendererDomain: "chemistry" },
      { ...baseRequest, rendererManifest: upgradedManifest },
    ];

    await Promise.all(
      changedRequests.map(async (request) => {
        const result = await expectCompiled(request, first.cache, "changed");
        expect(result.cache.identityHash).not.toBe(first.cache.identityHash);
      })
    );
  });

  it("strictly treats malformed and altered local entries as cache misses", async () => {
    const first = await runIncremental(baseRequest);
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

    await Promise.all(
      corruptEntries.map(async (cache) => {
        const result = await expectCompiled(baseRequest, cache, "corrupt");
        expect(result.result.payload.compiledCode).not.toContain("process.env");
      })
    );
  });

  it("rejects a self-consistent result belonging to another identity", async () => {
    const first = await runIncremental(baseRequest);
    const other = await runIncremental({
      ...baseRequest,
      contentKey: "test:incremental-other",
    });
    const mixedCache = {
      ...first.cache,
      result: other.cache.result,
      resultHash: other.cache.resultHash,
    };

    await expectCompiled(baseRequest, mixedCache, "corrupt");
  });

  it("validates current source and renderer input before any cache hit", async () => {
    const first = await runIncremental(baseRequest);
    const badHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);
    const rendererError = await Effect.runPromise(
      compileIncremental(
        {
          ...baseRequest,
          rendererManifest: { ...rendererManifest, hash: badHash },
        },
        first.cache
      ).pipe(Effect.flip)
    );
    const sourceError = await Effect.runPromise(
      compileIncremental(
        { ...baseRequest, sourcePath: "/outside.mdx" },
        first.cache
      ).pipe(Effect.flip)
    );

    expect(rendererError._tag).toBe("RendererManifestHashMismatchError");
    expect(sourceError._tag).toBe("ContractDecodeError");
  });
});

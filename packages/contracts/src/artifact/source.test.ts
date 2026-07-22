import { type BinaryLike, createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";
import { verifyCompiledContentSourceHash } from "#contracts/artifact/source";
import { CompiledContentPayloadSchema } from "#contracts/content";

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects one deterministic authored-source hashing failure. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves hash methods while intercepting one source marker. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (String(data) === "hash-source") {
                throw new TypeError("injected source hash failure");
              }
              target.update(data);
              return receiver;
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

/** Builds one compiled payload with an authenticated raw source hash. */
function payload(rawMdx: string, sourceHash?: string) {
  return Schema.decodeUnknownSync(CompiledContentPayloadSchema)({
    byteLength: 10,
    compiledCode: "return {};",
    compilerConfigHash: `sha256:${"b".repeat(64)}`,
    compilerVersion: "0.1.0",
    contentKey: "test:source",
    format: "mdx-function-body-v1",
    locale: "en",
    mdxCompilerVersion: "3.1.1",
    plainText: "Source",
    rawMdx,
    rendererDomain: "material-mathematics",
    requiredComponents: [],
    sourceHash:
      sourceHash ??
      `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`,
  });
}

describe("artifact source", () => {
  it("accepts an exact authored source hash", async () => {
    await expect(
      Effect.runPromise(verifyCompiledContentSourceHash(payload("## Source")))
    ).resolves.toBeUndefined();
  });

  it("maps mismatch and computation failures to typed errors", async () => {
    const [mismatch, computation] = await Promise.all([
      Effect.runPromise(
        verifyCompiledContentSourceHash(
          payload("## Source", `sha256:${"f".repeat(64)}`)
        ).pipe(Effect.flip)
      ),
      Effect.runPromise(
        verifyCompiledContentSourceHash(
          payload("hash-source", `sha256:${"f".repeat(64)}`)
        ).pipe(Effect.flip)
      ),
    ]);
    expect(mismatch._tag).toBe("ArtifactSourceHashMismatchError");
    expect(computation._tag).toBe("ArtifactSourceHashComputationError");
  });
});

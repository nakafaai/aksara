import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { verifyCompiledContentSourceHash } from "#contracts/artifact/source";
import { CompiledContentPayloadSchema } from "#contracts/content";
import { hashText } from "#contracts/hash/text";

/** Builds one compiled payload with an authenticated raw source hash. */
const payload = Effect.fn("AksaraContracts.test.sourcePayload")(function* (
  rawMdx: string,
  sourceHash?: string
) {
  const hash = sourceHash ?? (yield* hashText(rawMdx));
  return yield* Schema.decodeEffect(CompiledContentPayloadSchema)({
    artifactLocale: "en",
    compilerConfigHash: `sha256:${"b".repeat(64)}`,
    compilerVersion: "0.2.0",
    contentKey: "test:source",
    contentTree: {
      $node: "element",
      children: [],
      name: "fragment",
      props: {},
    },
    format: "content-tree",
    mdxCompilerVersion: "3.1.1",
    plainText: "Source",
    rawMdx,
    rendererDomain: "mathematics",
    requiredComponents: [],
    sourceHash: hash,
  });
});

describe("artifact source", () => {
  it.effect("accepts an exact authored source hash", () =>
    Effect.gen(function* () {
      expect(
        yield* verifyCompiledContentSourceHash(yield* payload("## Source"))
      ).toBeUndefined();
    })
  );

  it.effect("pins the exact authored source hash of non-ASCII raw MDX", () =>
    Effect.gen(function* () {
      expect(
        yield* verifyCompiledContentSourceHash(
          yield* payload(
            "## Pecahan Ñandú café 😀",
            "sha256:2080c334ac43a3b624b19f1674bf757593da7213edb4900b9a689dfcddb8b115"
          )
        )
      ).toBeUndefined();
      const mismatch = yield* verifyCompiledContentSourceHash(
        yield* payload(
          "## Pecahan Ñandú café 😀",
          "sha256:2080c334ac43a3b624b19f1674bf757593da7213edb4900b9a689dfcddb8b116"
        )
      ).pipe(Effect.flip);
      expect(mismatch._tag).toBe("ArtifactSourceHashMismatchError");
    })
  );
});

import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { verifyCompiledContentSourceHash } from "#contracts/artifact/source";
import { CompiledContentPayloadSchema } from "#contracts/content";
import { hashText } from "#contracts/hash/text";
import { withDigestFailureFor } from "#contracts/test/digest";

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

  it.effect("maps mismatch and computation failures to typed errors", () =>
    Effect.gen(function* () {
      const mismatchPayload = yield* payload(
        "## Source",
        `sha256:${"f".repeat(64)}`
      );
      const failingPayload = yield* payload(
        "hash-source",
        `sha256:${"f".repeat(64)}`
      );
      const [mismatch, computation] = yield* Effect.all([
        verifyCompiledContentSourceHash(mismatchPayload).pipe(Effect.flip),
        withDigestFailureFor(
          "hash-source",
          verifyCompiledContentSourceHash(failingPayload).pipe(Effect.flip)
        ),
      ]);
      expect(mismatch._tag).toBe("ArtifactSourceHashMismatchError");
      expect(computation._tag).toBe("ArtifactSourceHashComputationError");
    })
  );
});

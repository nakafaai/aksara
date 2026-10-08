import { createHash } from "node:crypto";
import { assert, describe, expect, it } from "@effect/vitest";
import { canonicalizeCompiledContentPayload } from "@nakafa/aksara-contracts/content";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { canonicalizeRendererManifestContract } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect } from "effect";
import {
  compileValidatedContent,
  validateCompileRequest,
} from "#compiler/engine";
import { createTestRendererManifest } from "#compiler/test/content";

describe("validateCompileRequest", () => {
  it.effect("rejects an incomplete renderer even with its correct hash", () =>
    Effect.gen(function* () {
      const live = yield* createTestRendererManifest({
        components: ["BlockMath"],
      });
      const domains = live.domains.filter(({ name }) => name !== "site");
      const contract = {
        base: live.base,
        domains,
        publishedDomains: live.publishedDomains,
      };
      const incomplete = {
        ...live,
        domains,
        hash: Sha256HashSchema.make(
          `sha256:${createHash("sha256")
            .update(canonicalizeRendererManifestContract(contract))
            .digest("hex")}`
        ),
      };
      const error = yield* validateCompileRequest({
        artifactLocale: "en",
        contentKey: "test:engine",
        rawMdx: "export const metadata = {}",
        rendererDomain: "mathematics",
        rendererManifest: incomplete,
        sourcePath: "packages/corpus/test/engine/en.mdx",
      }).pipe(Effect.flip);
      assert.strictEqual(error._tag, "ContractDecodeError");
    })
  );
});

describe("compileValidatedContent", () => {
  it.effect(
    "pins the canonical payload of an out-of-order component document",
    () =>
      Effect.gen(function* () {
        const rendererManifest = yield* createTestRendererManifest({
          components: ["BlockMath", "InlineMath", "MathVisual"],
          domains: {
            chemistry: ["AtomShellLab"],
            mathematics: ["FunctionMachine"],
          },
        });
        const request = yield* validateCompileRequest({
          artifactLocale: "id",
          contentKey: "test:engine-vector",
          rawMdx: `export const metadata = {
  ratio: 0.1,
  title: "Pelajaran é ✓ 数学",
  tags: ["aljabar", { level: 2 }],
}

## Pelajaran é ✓ 数学

<InlineMath math="x" />

<BlockMath math="y" />`,
          rendererDomain: "mathematics",
          rendererManifest,
          sourcePath: "packages/corpus/test/engine/id.mdx",
        });
        const { metadata, payload } = yield* compileValidatedContent(request);
        expect(metadata).toMatchInlineSnapshot(`
          {
            "ratio": 0.1,
            "tags": [
              "aljabar",
              {
                "level": 2,
              },
            ],
            "title": "Pelajaran é ✓ 数学",
          }
        `);
        expect(payload.requiredComponents).toMatchInlineSnapshot(`
          [
            "BlockMath",
            "InlineMath",
          ]
        `);
        expect(payload.plainText).toMatchInlineSnapshot(`"Pelajaran é ✓ 数学"`);
        expect(
          createHash("sha256")
            .update(canonicalizeCompiledContentPayload(payload))
            .digest("hex")
        ).toMatchInlineSnapshot(
          `"6a1f63ff3e942fc5a7e350644f4afd2c6e0a20a68703fa8b83a0985e796ed8f6"`
        );
      })
  );
});

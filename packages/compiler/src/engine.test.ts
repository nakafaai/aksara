import { createHash } from "node:crypto";
import { assert, describe, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { canonicalizeRendererManifestContract } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect } from "effect";
import { validateCompileRequest } from "#compiler/engine";
import { createTestRendererManifest } from "#compiler/test/content";

describe("validateCompileRequest", () => {
  it.effect("accepts an authenticated historical renderer", () =>
    Effect.gen(function* () {
      const live = yield* createTestRendererManifest({
        authoringComponents: [{ name: "BlockMath", version: 1 }],
      });
      const domains = live.domains.filter(({ name }) => name !== "site");
      const contract = {
        base: live.base,
        domains,
        publishedDomains: live.publishedDomains,
      };
      const historical = {
        ...live,
        domains,
        hash: Sha256HashSchema.make(
          `sha256:${createHash("sha256")
            .update(canonicalizeRendererManifestContract(contract))
            .digest("hex")}`
        ),
      };
      const request = yield* validateCompileRequest({
        artifactLocale: "en",
        contentKey: "test:engine",
        rawMdx: "export const metadata = {}",
        rendererDomain: "mathematics",
        rendererManifest: historical,
        sourcePath: "packages/corpus/test/engine/en.mdx",
      });
      assert.deepStrictEqual(request.rendererManifest, historical);
    })
  );
});

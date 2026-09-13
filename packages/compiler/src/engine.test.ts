import { createHash } from "node:crypto";
import { assert, describe, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { canonicalizeRendererManifestContract } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect } from "effect";
import { validateCompileRequest } from "#compiler/engine";
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

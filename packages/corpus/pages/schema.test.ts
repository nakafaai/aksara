import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { definePageSource } from "#corpus/pages/schema";
import { pageSource } from "#corpus/test/page";

describe("public page source", () => {
  it("decodes one exact stable page identity", async () => {
    await expect(
      Effect.runPromise(definePageSource(pageSource()))
    ).resolves.toEqual(pageSource());
  });

  it.each([
    "articles/privacy-policy",
    "pages/Privacy-Policy",
    "pages/privacy-policy/extra",
    "pages",
  ])("rejects an invalid source-root grammar: %s", async (sourceRoot) => {
    const error = await Effect.runPromise(
      definePageSource(pageSource({ sourceRoot })).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ _tag: "PageSourceError", sourceRoot });
    expect(String(error.cause)).toContain("Invalid public page source root.");
  });

  it("keeps source ownership independent from public page identity", async () => {
    const source = pageSource({
      pageKey: "terms-of-service",
      sourceRoot: "pages/terms",
    });

    await expect(Effect.runPromise(definePageSource(source))).resolves.toEqual(
      source
    );
  });
});

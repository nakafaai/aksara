import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { definePageSource } from "#corpus/pages/schema";
import { pageSource } from "#corpus/test/page";

describe("public page source", () => {
  it.effect("decodes one exact stable page identity", () =>
    Effect.gen(function* () {
      expect(yield* definePageSource(pageSource())).toEqual(pageSource());
    })
  );

  it.effect.each([
    "articles/privacy-policy",
    "pages/Privacy-Policy",
    "pages/privacy-policy/extra",
    "pages",
  ])("rejects an invalid source-root grammar: %s", (sourceRoot) =>
    Effect.gen(function* () {
      const error = yield* definePageSource(pageSource({ sourceRoot })).pipe(
        Effect.flip
      );

      expect(error).toMatchObject({ _tag: "PageSourceError", sourceRoot });
      expect(String(error.cause)).toContain("Invalid public page source root.");
    })
  );

  it.effect(
    "keeps source ownership independent from public page identity",
    () =>
      Effect.gen(function* () {
        const source = pageSource({
          pageKey: "terms-of-service",
          sourceRoot: "pages/terms",
        });

        expect(yield* definePageSource(source)).toEqual(source);
      })
  );
});

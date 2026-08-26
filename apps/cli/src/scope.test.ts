import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { decodePublicationScopeSelectors } from "#cli/scope";

const FUNCTION_CONTENT_KEY =
  "material/lesson/mathematics/function-composition-inverse-function/function-concept";
const exactContent = `content:material:en:${FUNCTION_CONTENT_KEY}`;

/** Decodes one repeated selector collection. */
function decode(selectors: readonly string[]) {
  return decodePublicationScopeSelectors(selectors);
}

/** Returns the typed selector failure. */
function reject(selectors: readonly string[]) {
  return decodePublicationScopeSelectors(selectors).pipe(Effect.flip);
}

describe("publication scope selectors", () => {
  it.effect("decodes canonical family and snapshot selectors", () =>
    Effect.gen(function* () {
      expect(
        yield* decode(["family:material", "snapshot:program", "snapshot:quran"])
      ).toEqual({
        families: ["material"],
        snapshots: ["program", "quran"],
      });
    })
  );

  it.effect("rejects retired exact-content selectors before publication", () =>
    Effect.gen(function* () {
      expect(yield* reject([exactContent])).toMatchObject({
        _tag: "ProductionScopeDecodeError",
      });
    })
  );

  it.effect(
    "decodes one scalable whole-family selector without expansion",
    () =>
      Effect.gen(function* () {
        expect(yield* decode(["family:material", "snapshot:program"])).toEqual({
          families: ["material"],
          snapshots: ["program"],
        });
      })
  );

  it.effect.each([
    { selectors: [] },
    { selectors: ["family:material", "family:material"] },
    { selectors: ["family:question", "family:article"] },
    { selectors: ["family:material", exactContent] },
    { selectors: ["family:unknown"] },
    { selectors: ["snapshot:tryout", "snapshot:program"] },
    { selectors: ["snapshot:program", "snapshot:program"] },
    { selectors: ["snapshot:unknown"] },
    { selectors: ["unknown:material"] },
    { selectors: [`content:unknown:en:${FUNCTION_CONTENT_KEY}`] },
    { selectors: ["content:material:en"] },
    { selectors: ["material:en:function-concept"] },
  ])(
    "rejects an invalid or noncanonical selector collection %#",
    ({ selectors }) =>
      Effect.gen(function* () {
        expect(yield* reject(selectors)).toMatchObject({
          _tag: "ProductionScopeDecodeError",
        });
      })
  );
});

import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { decodePublicationScopeSelectors } from "#cli/scope";

const FUNCTION_CONTENT_KEY =
  "material/lesson/mathematics/function-composition-inverse-function/function-concept";
const english = `content:material:en:${FUNCTION_CONTENT_KEY}`;
const indonesian = `content:material:id:${FUNCTION_CONTENT_KEY}`;

/** Decodes one repeated selector collection at the test runner boundary. */
function decode(selectors: readonly string[]) {
  return Effect.runPromise(decodePublicationScopeSelectors(selectors));
}

/** Returns the typed selector failure without a FiberFailure wrapper. */
function reject(selectors: readonly string[]) {
  return Effect.runPromise(
    decodePublicationScopeSelectors(selectors).pipe(Effect.flip)
  );
}

describe("publication scope selectors", () => {
  it("decodes the exact mandatory material locales and structured families", async () => {
    await expect(
      decode([english, indonesian, "snapshot:program", "snapshot:quran"])
    ).resolves.toEqual({
      content: [
        {
          artifactLocale: "en",
          contentKey: FUNCTION_CONTENT_KEY,
          family: "material",
        },
        {
          artifactLocale: "id",
          contentKey: FUNCTION_CONTENT_KEY,
          family: "material",
        },
      ],
      families: [],
      snapshots: ["program", "quran"],
    });
  });

  it("decodes one scalable whole-family selector without expansion", async () => {
    await expect(
      decode(["family:material", "snapshot:program"])
    ).resolves.toEqual({
      content: [],
      families: ["material"],
      snapshots: ["program"],
    });
  });

  it.each([
    { selectors: [] },
    { selectors: [english, english] },
    { selectors: [indonesian, english] },
    { selectors: ["family:material", "family:material"] },
    { selectors: ["family:question", "family:article"] },
    { selectors: ["family:material", english] },
    { selectors: ["family:unknown"] },
    { selectors: ["snapshot:tryout", "snapshot:program"] },
    { selectors: ["snapshot:program", "snapshot:program"] },
    { selectors: ["snapshot:unknown"] },
    { selectors: [`content:unknown:en:${FUNCTION_CONTENT_KEY}`] },
    { selectors: ["content:material:en"] },
    { selectors: ["material:en:function-concept"] },
  ])(
    "rejects an invalid or noncanonical selector collection %#",
    async ({ selectors }) => {
      await expect(reject(selectors)).resolves.toEqual({
        _tag: "ProductionScopeDecodeError",
      });
    }
  );
});

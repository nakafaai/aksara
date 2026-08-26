import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { decodePublicationScopeSelectors } from "#cli/scope";

const FUNCTION_CONTENT_KEY =
  "material/lesson/mathematics/function-composition-inverse-function/function-concept";
const exactContent = `content:material:en:${FUNCTION_CONTENT_KEY}`;

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
  it("decodes canonical family and snapshot selectors", async () => {
    await expect(
      decode(["family:material", "snapshot:program", "snapshot:quran"])
    ).resolves.toEqual({
      content: [],
      families: ["material"],
      snapshots: ["program", "quran"],
    });
  });

  it("rejects retired exact-content selectors before publication", async () => {
    await expect(reject([exactContent])).resolves.toMatchObject({
      _tag: "ProductionScopeDecodeError",
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
    async ({ selectors }) => {
      await expect(reject(selectors)).resolves.toMatchObject({
        _tag: "ProductionScopeDecodeError",
      });
    }
  );
});
